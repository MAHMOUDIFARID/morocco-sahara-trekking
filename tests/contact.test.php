<?php
declare(strict_types=1);
require __DIR__ . '/../deployment/php/api/_private/contact.php';
$config = require __DIR__ . '/../deployment/php/api/_private/config.php';
$count = 0;
$stores = [];

function check(bool $ok, string $message = 'Assertion failed'): void {
    if (!$ok) throw new RuntimeException($message);
}
function test(string $name, callable $run): void {
    global $count;
    $run();
    ++$count;
    echo "PASS $name\n";
}
function freshStore(): string {
    global $stores;
    $dir = sys_get_temp_dir() . '/trek-contact-test-' . bin2hex(random_bytes(8));
    $stores[] = $dir;
    return $dir;
}
function fields(array $changes = []): array {
    return array_replace(['name' => 'Test Visitor', 'email' => 'visitor@example.test', 'phone' => '', 'country' => '', 'inquiryType' => 'Trek', 'message' => 'Quelles sont les dates disponibles ?', 'newsletter' => false], $changes);
}
function api(?int $failAt = null): Closure {
    global $config;
    $dir = freshStore();
    $sent = [];
    return static function (mixed $body, array $server = []) use ($config, $dir, $failAt, &$sent): array {
        $server = array_replace(['REQUEST_METHOD' => 'POST', 'CONTENT_TYPE' => 'application/json', 'REMOTE_ADDR' => '192.0.2.1', 'HTTP_ORIGIN' => $config['site_url']], $server);
        $send = static function (array $mail) use ($failAt, &$sent): bool {
            $sent[] = $mail;
            return count($sent) !== $failAt;
        };
        $response = TrekContact\handle($server, is_string($body) ? $body : json_encode($body, JSON_THROW_ON_ERROR), $config, $send,
            static fn(string $scope, array $limits): int => TrekContact\limit($dir, $scope, $limits, 1000));
        return [$response, $sent];
    };
}

try {
    test('valid contact delivers to the fixed team address and sends a receipt', function () {
        [$r, $sent] = api()(fields());
        check($r['status'] === 200 && count($sent) === 2);
        check($sent[0]['to'] === 'm_assi_ni@hotmail.fr' && $sent[1]['to'] === 'visitor@example.test');
        check($sent[0]['from'] === 'noreply@marocsaharatrekking.com');
        check(str_contains($sent[1]['html'], 'https://marocsaharatrekking.com'));
    });
    test('escapes HTML and records newsletter consent', function () {
        [$r, $sent] = api()(fields(['name' => '<b>Test</b>', 'message' => '<img src=x onerror=alert(1)>', 'newsletter' => true]));
        check($r['status'] === 200);
        check(str_contains($sent[0]['html'], '&lt;img') && !str_contains($sent[0]['html'], '<img'));
        check(str_contains($sent[0]['html'], 'Oui — accord reçu le'));
        check(str_contains($sent[1]['html'], '&lt;b&gt;Test&lt;/b&gt;'));
    });
    test('unchecked newsletter stays opted out', function () {
        [, $sent] = api()(fields());
        check(str_contains($sent[0]['html'], 'email : Non'));
    });
    test('rejects invalid fields, header injection, arrays and malformed JSON', function () {
        $call = api();
        foreach ([null, [], ['name' => 'Test'], fields(['email' => "a@example.test\r\nBcc: x@example.test"]), fields(['name' => "Test\nBcc: x"]), fields(['message' => 7]), fields(['newsletter' => 'yes']), fields(['message' => str_repeat('x', 5001)]), fields(['inquiryType' => 'Unknown']), '{'] as $body) {
            [$r, $sent] = $call($body);
            check($r['status'] === 400 && !$sent);
        }
    });
    test('rejects unsupported methods, content types and foreign origins', function () {
        foreach ([['REQUEST_METHOD' => 'GET'], ['CONTENT_TYPE' => 'text/plain'], ['HTTP_ORIGIN' => 'https://attacker.test']] as $i => $server) {
            [$r, $sent] = api()(fields(), $server);
            check($r['status'] === [405, 415, 403][$i] && !$sent);
        }
    });
    test('limits actual body size even without content length', function () {
        [$r, $sent] = api()(str_repeat('x', 24001));
        check($r['status'] === 413 && !$sent);
    });
    test('honeypot never sends email', function () {
        [$r, $sent] = api()(fields(['website' => 'spam']));
        check($r['status'] === 200 && !$sent);
    });
    test('repeat sender is limited with Retry-After', function () {
        $call = api();
        for ($i = 0; $i < 3; $i++) check($call(fields())[0]['status'] === 200);
        [$r, $sent] = $call(fields());
        check($r['status'] === 429 && (int)$r['headers']['Retry-After'] > 0 && count($sent) === 6);
    });
    test('independent visitors do not share a global quota', function () {
        $call = api();
        for ($i = 1; $i <= 40; $i++) check($call(fields(['email' => "visitor$i@example.test"]), ['REMOTE_ADDR' => "192.0.2.$i"])[0]['status'] === 200);
    });
    test('invalid request flooding only blocks its own IP', function () {
        $call = api();
        for ($i = 0; $i < 30; $i++) check($call('{}')[0]['status'] === 400);
        check($call('{}')[0]['status'] === 429);
        check($call(fields(), ['REMOTE_ADDR' => '192.0.2.2'])[0]['status'] === 200);
    });
    test('rotating email or spoofing forwarding headers cannot bypass the IP limit', function () {
        $call = api();
        for ($i = 0; $i < 5; $i++) check($call(fields(['email' => "sender$i@example.test"]), ['HTTP_X_FORWARDED_FOR' => "198.51.100.$i"])[0]['status'] === 200);
        check($call(fields(['email' => 'another@example.test']), ['HTTP_X_FORWARDED_FOR' => '198.51.100.99'])[0]['status'] === 429);
    });
    test('another IP cannot consume a visitors email quota', function () {
        $call = api();
        for ($i = 0; $i < 3; $i++) $call(fields());
        check($call(fields())[0]['status'] === 429);
        check($call(fields(), ['REMOTE_ADDR' => '192.0.2.2'])[0]['status'] === 200);
    });
    test('missing IP has no shared anonymous quota', function () {
        $call = api();
        for ($i = 0; $i < 3; $i++) check($call(fields(), ['REMOTE_ADDR' => ''])[0]['status'] === 200);
        check($call(fields(), ['REMOTE_ADDR' => ''])[0]['status'] === 429);
        check($call(fields(['email' => 'different@example.test']), ['REMOTE_ADDR' => ''])[0]['status'] === 200);
    });
    test('limiter persists across calls and expires', function () {
        $dir = freshStore();
        check(TrekContact\limit($dir, 'scope', ['messages' => 1], 1000) === 0);
        check(TrekContact\limit($dir, 'scope', ['messages' => 1], 1001) === 899);
        check(TrekContact\limit($dir, 'scope', ['messages' => 1], 1900) === 0);
    });
    test('admin delivery failure does not claim success or send a receipt', function () {
        [$r, $sent] = api(1)(fields());
        check($r['status'] === 500 && count($sent) === 1);
    });
    test('receipt failure preserves success after delivery to the team', function () {
        [$r, $sent] = api(2)(fields());
        check($r['status'] === 200 && count($sent) === 2);
    });
    echo "$count PHP tests passed; no real emails sent.\n";
} finally {
    foreach ($stores as $dir) {
        foreach (glob($dir . '/*.json') ?: [] as $file) unlink($file);
        if (is_dir($dir)) rmdir($dir);
    }
}
