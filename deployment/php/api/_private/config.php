<?php
// Sender must be an existing mailbox on this cPanel account. No password needed.
return [
    'from' => 'noreply@marocsaharatrekking.com',
    'to' => 'm_assi_ni@hotmail.fr',
    'site_url' => 'https://marocsaharatrekking.com',
    'allowed_origins' => [
        'https://marocsaharatrekking.com',
        'https://www.marocsaharatrekking.com',
        'http://marocsaharatrekking.com',
        'http://www.marocsaharatrekking.com',
    ],
];
