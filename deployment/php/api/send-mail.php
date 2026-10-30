<?php
declare(strict_types=1);

ini_set('display_errors', '0');
require __DIR__ . '/_private/contact.php';
$config = require __DIR__ . '/_private/config.php';

try {
    $body = file_get_contents('php://input', false, null, 0, 24001);
    $response = TrekContact\handle(
        $_SERVER,
        $body === false ? '' : $body,
        $config,
        'TrekContact\\deliver',
        static fn(string $scope, array $limits): int => TrekContact\limit(
            __DIR__ . '/_private/rate-limits', $scope, $limits, time()
        )
    );
} catch (Throwable $error) {
    error_log('Contact endpoint unavailable: ' . get_class($error));
    $response = TrekContact\result(503, ['error' => 'Le formulaire est momentanément indisponible. Contactez-nous sur WhatsApp.']);
}

http_response_code($response['status']);
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
foreach ($response['headers'] as $name => $value) header($name . ': ' . $value);
echo json_encode($response['body'], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
