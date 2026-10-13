const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const DIR = path.join(__dirname, '../public/treks');

async function generate() {
  const files = await fs.readdir(DIR);
  const webps = files.filter(f => f.endsWith('.webp'));
  const blurMap = {};

  for (const file of webps) {
    const src = path.join(DIR, file);
    const buffer = await sharp(src).resize(10, 10).webp({ quality: 20 }).toBuffer();
    const base64 = `data:image/webp;base64,${buffer.toString('base64')}`;
    const key = file.replace(/\.webp$/, '');
    blurMap[key] = base64;
  }

  // Also generate for hero images, CTA, and guide
  for (const file of ['place1', 'place2', 'place3', 'place4', 'Mohamed']) {
    const src = path.join(__dirname, '../public', `${file}.webp`);
    if (await fs.pathExists(src)) {
      const buffer = await sharp(src).resize(10, 10).webp({ quality: 20 }).toBuffer();
      blurMap[file] = `data:image/webp;base64,${buffer.toString('base64')}`;
    }
  }

  // Default neutral desert beige blur placeholder
  const fallbackBuffer = await sharp({
    create: { width: 10, height: 10, channels: 3, background: { r: 229, g: 224, b: 216 } }
  }).webp({ quality: 20 }).toBuffer();
  const fallback = `data:image/webp;base64,${fallbackBuffer.toString('base64')}`;

  const tsContent = `export const DEFAULT_BLUR = ${JSON.stringify(fallback)};

export const blurData: Record<string, string> = ${JSON.stringify(blurMap, null, 2)};

export function getBlurData(keyOrPath?: string): string {
  if (!keyOrPath) return DEFAULT_BLUR;
  const cleanKey = keyOrPath.replace(/^\\/?(treks\\/)?/, '').replace(/\\.(webp|jpg|jpeg|png)$/, '');
  return blurData[cleanKey] || blurData[keyOrPath] || DEFAULT_BLUR;
}
`;

  await fs.writeFile(path.join(__dirname, '../lib/blurData.ts'), tsContent, 'utf8');
  console.log(`Generated lib/blurData.ts with ${Object.keys(blurMap).length} entries.`);
}

generate().catch(console.error);
