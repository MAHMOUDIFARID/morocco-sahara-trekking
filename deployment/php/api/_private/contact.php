<?php
declare(strict_types=1);

namespace TrekContact;

function result(int $status, array $body, array $headers = []): array
{
    return compact('status', 'body', 'headers');
}

function validate(mixed $value): ?array
{
    if (!$value instanceof \stdClass) return null;
    $fields = [];
    foreach (['name' => 161, 'email' => 254, 'phone' => 40, 'country' => 100, 'inquiryType' => 30, 'message' => 5000] as $key => $max) {
        $input = $value->$key ?? '';
        if (property_exists($value, $key) && !is_string($value->$key)) return null;
        $text = trim($input);
        $length = preg_match_all('/./us', $text);
        if ($length === false || $length > $max || str_contains($text, "\0")) return null;
        if ($key !== 'message' && preg_match('/[\r\n]/', $text)) return null;
        $fields[$key] = $text;
    }
    if (!$fields['name'] || !$fields['message'] || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) return null;
    if ($fields['inquiryType'] && !in_array($fields['inquiryType'], ['Trek', 'Général', 'Sur-mesure', 'Famille', 'Autre'], true)) return null;
    if (property_exists($value, 'newsletter') && !is_bool($value->newsletter)) return null;
    $fields['email'] = strtolower($fields['email']);
    $fields['inquiryType'] = $fields['inquiryType'] ?: 'Général';
    $fields['newsletter'] = ($value->newsletter ?? false) === true;
    return $fields;
}

/** Bounded, locked file buckets shared across PHP workers; no global sender quota. */
function limit(string $directory, string $scope, array $limits, int $now): int
{
    if (!is_dir($directory) && !@mkdir($directory, 0750, true) && !is_dir($directory)) {
        throw new \RuntimeException('Rate storage unavailable');
    }
    $id = hash('sha256', $scope);
    // At most 256 files with 128 identities per file. No email/IP stored in clear text.
    $file = @fopen($directory . '/' . substr($id, 0, 2) . '.json', 'c+');
    if ($file === false) throw new \RuntimeException('Rate storage unavailable');
    try {
        if (!flock($file, LOCK_EX)) throw new \RuntimeException('Rate lock unavailable');
        $raw = stream_get_contents($file);
        $all = $raw ? json_decode($raw, true, 512, JSON_THROW_ON_ERROR) : [];
        foreach ($all as $key => $bucket) {
            if ($bucket['reset'] <= $now) unset($all[$key]);
        }
        $bucket = $all[$id] ?? ['reset' => $now + 900, 'counts' => []];
        foreach ($limits as $key => $max) {
            if (($bucket['counts'][$key] ?? 0) >= $max) return max(1, $bucket['reset'] - $now);
        }
        foreach ($limits as $key => $max) $bucket['counts'][$key] = ($bucket['counts'][$key] ?? 0) + 1;
        unset($all[$id]);
        if (count($all) >= 128) unset($all[array_key_first($all)]);
        $all[$id] = $bucket;
        $encoded = json_encode($all, JSON_THROW_ON_ERROR);
        rewind($file);
        if (!ftruncate($file, 0) || fwrite($file, $encoded) !== strlen($encoded) || !fflush($file)) {
            throw new \RuntimeException('Rate write failed');
        }
        return 0;
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function throttled(int $seconds): array
{
    return result(429, ['error' => 'Trop de demandes. Veuillez réessayer dans quelques minutes ou nous contacter sur WhatsApp.'], ['Retry-After' => (string)$seconds]);
}

function html(string $text): string
{
    return htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function handle(array $server, string $raw, array $config, callable $send, callable $limiter): array
{
    if (($server['REQUEST_METHOD'] ?? '') !== 'POST') return result(405, ['error' => 'Méthode non autorisée.'], ['Allow' => 'POST']);
    $origin = $server['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) return result(403, ['error' => 'Origine de la demande non autorisée.']);
    if (strtolower(trim(explode(';', $server['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') return result(415, ['error' => 'Format de demande non valide.']);

    // REMOTE_ADDR is set by the web server. Never trust visitor-provided forwarding headers.
    $ip = filter_var($server['REMOTE_ADDR'] ?? '', FILTER_VALIDATE_IP) ?: null;
    if ($ip) {
        $retry = $limiter('ip:' . $ip, ['requests' => 30]);
        if ($retry) return throttled($retry);
    }
    if (strlen($raw) > 24000 || (int)($server['CONTENT_LENGTH'] ?? 0) > 24000) return result(413, ['error' => 'Votre message est trop volumineux.']);
    try {
        $body = json_decode($raw, false, 32, JSON_THROW_ON_ERROR);
    } catch (\JsonException $error) {
        return result(400, ['error' => 'Format de demande non valide.']);
    }
    if ($body instanceof \stdClass && !empty($body->website)) return result(200, ['success' => true]);
    $contact = validate($body);
    if ($contact === null) return result(400, ['error' => 'Veuillez vérifier votre nom, votre adresse email et votre message (5 000 caractères maximum).']);
    $emailKey = hash('sha256', $contact['email']);
    $limits = ['email:' . $emailKey => 3];
    if ($ip) $limits['messages'] = 5;
    $retry = $limiter($ip ? 'ip:' . $ip : 'email:' . $emailKey, $limits);
    if ($retry) return throttled($retry);

    foreach (['from', 'to'] as $key) {
        if (!filter_var($config[$key] ?? '', FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $config[$key])) {
            return result(503, ['error' => 'Le formulaire est momentanément indisponible. Contactez-nous sur WhatsApp.']);
        }
    }
    $consent = $contact['newsletter'] ? 'Oui — accord reçu le ' . gmdate('c') : 'Non';
    $text = "Nom : {$contact['name']}\nEmail : {$contact['email']}\nTéléphone : {$contact['phone']}\nPays : {$contact['country']}\nType de demande : {$contact['inquiryType']}\nOffres et mises à jour par email : {$consent}\n\n{$contact['message']}";
    $admin = [
        'to' => $config['to'], 'from' => $config['from'], 'replyTo' => $contact['email'],
        'subject' => 'Nouveau message — ' . $contact['inquiryType'],
        'html' => '<div style="font-family:Arial,sans-serif;white-space:pre-wrap">' . html($text) . '</div>',
    ];
    try {
        if (!$send($admin)) throw new \RuntimeException('Mail not accepted');
    } catch (\Throwable $error) {
        error_log('Contact: delivery to the team failed.');
        return result(500, ['error' => "Erreur lors de l'envoi du message. Veuillez réessayer ou nous contacter sur WhatsApp."]);
    }
    try {
        $accepted = $send([
            'to' => $contact['email'], 'from' => $config['from'], 'replyTo' => $config['to'],
            'subject' => 'Merci pour votre message — Morocco Sahara Trekking',
            'html' => '<div style="font-family:Arial,sans-serif"><h2>Merci ' . html($contact['name']) . ' !</h2><p>Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p><p>Vous pouvez aussi nous contacter sur <a href="https://wa.me/212672058267">WhatsApp</a>.</p><p>Mohamed &amp; l’équipe Morocco Sahara Trekking<br><a href="' . html($config['site_url']) . '">' . html($config['site_url']) . '</a></p></div>',
        ]);
        if (!$accepted) error_log('Contact: visitor receipt failed; the team received the request.');
    } catch (\Throwable $error) {
        error_log('Contact: visitor receipt failed; the team received the request.');
    }
    return result(200, ['success' => true]);
}

/** Use cPanel's local mail transport; mail() acceptance does not prove inbox delivery. */
function deliver(array $mail): bool
{
    if (!function_exists('mail')) return false;
    foreach (['to', 'from', 'replyTo'] as $field) {
        if (!filter_var($mail[$field], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $mail[$field])) return false;
    }
    // The envelope sender is fixed configuration, never user input or a shell argument.
    if (!preg_match('/\A[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\z/D', $mail['from'])) return false;
    $subject = '=?UTF-8?B?' . base64_encode($mail['subject']) . '?=';
    $headers = [
        'From' => 'MOROCCO SAHARA TREKKING <' . $mail['from'] . '>',
        'Reply-To' => $mail['replyTo'],
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/html; charset=UTF-8',
        'Content-Transfer-Encoding' => 'base64',
    ];
    return @mail($mail['to'], $subject, chunk_split(base64_encode($mail['html']), 76, "\r\n"), $headers, '-f' . $mail['from']);
}
