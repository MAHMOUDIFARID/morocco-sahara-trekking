<?php
// Local preview only: php -S 127.0.0.1:8080 -t out scripts/static-router.php
$root = realpath(__DIR__ . '/../out');
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (str_contains($path, '..') || preg_match('~(?:^|/)\.|^/api/_private(?:/|$)~', $path)) {
    http_response_code(403);
    exit('Forbidden');
}
if (preg_match('~^/regions(?:/|$)~', $path)) {
    header('Location: /', true, 301);
    exit;
}
if ($path === '/api/send-mail' || $path === '/api/send-mail/') {
    require $root . '/api/send-mail.php';
    exit;
}
if (is_file($root . $path)) return false;
if (is_file($root . rtrim($path, '/') . '/index.html')) {
    if (!str_ends_with($path, '/')) {
        $query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
        header('Location: ' . $path . '/' . ($query ? '?' . $query : ''), true, 301);
        exit;
    }
    readfile($root . $path . 'index.html');
    exit;
}
http_response_code(404);
readfile($root . '/404.html');
