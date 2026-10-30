# Morocco Sahara Trekking

Next.js 15 source project. Production is a static export with a PHP contact endpoint, served directly from cPanel public_html. Node.js is required only on the build machine, not on the hosting account.

## Local build

```bash
npm install
npm run build
```

Upload the contents of `out/`, including `.htaccess`, to `public_html`. See README-cPanel.md for removing the previous Node application mapping, PHP mail settings, HTTPS and deployment checks.

## Verification

```bash
npm test
npm run test:php
```

The PHP tests require PHP 8.2+ and use mocked mail transport. Actual delivery must be checked on cPanel.

## Preview

```bash
npm start
```

This runs PHP's development server at http://127.0.0.1:8080 using the exported files. `npm run dev` remains available for frontend development; the Next development server does not execute PHP.
