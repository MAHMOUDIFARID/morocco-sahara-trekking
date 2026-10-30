const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'out');
if (!fs.existsSync(path.join(out, 'index.html'))) {
  throw new Error('Static export missing. Run next build first.');
}
fs.cpSync(path.join(root, 'deployment/php'), out, { recursive: true });
for (const name of ['index.html', '404.html', 'treks/index.html', 'contact/index.html', 'api/send-mail.php', '.htaccess']) {
  if (!fs.existsSync(path.join(out, name))) throw new Error(`Missing export file: ${name}`);
}
console.log('Static site and PHP contact endpoint ready in out/. Upload its contents to public_html.');
