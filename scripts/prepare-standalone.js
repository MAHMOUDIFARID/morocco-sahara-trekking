const fs = require('fs-extra');
const path = require('path');

async function prepareStandalone() {
  const root = path.join(__dirname, '..');
  const staticSrc = path.join(root, '.next/static');
  const staticDest = path.join(root, '.next/standalone/.next/static');
  const publicSrc = path.join(root, 'public');
  const publicDest = path.join(root, '.next/standalone/public');

  if (await fs.pathExists(staticSrc)) {
    await fs.copy(staticSrc, staticDest);
    console.log('✅ Copied .next/static to .next/standalone/.next/static');
  }

  if (await fs.pathExists(publicSrc)) {
    await fs.copy(publicSrc, publicDest);
    console.log('✅ Copied public to .next/standalone/public');
  }
}

prepareStandalone().catch(console.error);
