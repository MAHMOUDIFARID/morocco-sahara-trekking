const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

const mapping = {
  "trek-7-jours-vallees-ait-bouguemez-ait-bououli": ["Treks (59).jpeg", "Treks (78).jpeg", "Treks (81).jpeg"],
  "trek-villages-berberes-vallee-des-roses-4-jours": ["Treks (101).jpeg", "Treks (28).jpeg", "Treks (29).jpeg"],
  "trek-toubkal-villages-berberes-3-jours": ["Treks (79).jpeg", "Treks (88).jpeg"],
  "randonnee-ait-bouguemez-tassaout": ["Treks (74).jpeg"],
  "randonnee-trekking-toubkal-maroc": ["Treks (79).jpeg", "Treks (76).jpeg", "Treks (82).jpeg"],
  "trekking-desert-marocain": ["Treks (5).jpeg", "Treks (3).jpeg", "Treks (4).jpeg"],
  "randonnee-ait-bougmez-gorges-mgoun": ["Treks (55).jpeg", "Treks (72).jpeg"],
  "ascension-mgoun-vallee-heureuse-ait-bouguemez": ["Treks (58).jpeg", "Treks (53).jpeg", "Treks (62).jpeg"],
  "trekking-randonnee-siroua-maroc": ["Treks (20).jpeg", "Treks (13).jpeg", "Treks (15).jpeg"],
  "trekking-vallee-des-roses": ["Treks (80).jpeg"],
  "randonnee-trekking-saghro": ["Treks (64).jpeg", "Treks (67).jpeg", "Treks (71).jpeg"],
  "trek-randonnee-village-berbere-ait-bougmaz": ["Treks (90).jpeg"],
  "5-jours-vallees-ait-bougmez-ait-bouilli": ["Treks (59).jpeg"],
  "vallee-ait-bouguemez-trekking-decouverte-atlas": ["Treks (59).jpeg"],
  "trek-ascension-10j-ait-bouguemez-mgoun-ouarzazate": ["Treks (58).jpeg"],
  "traversee-nord-sud-haut-atlas-ascension-mgoun": ["Treks (62).jpeg"],
  "trek-ait-bougmez-sremt-3-jours": ["Treks (78).jpeg"],
};

const SOURCE_DIR = path.join(__dirname, "../public/treks");
const OUT_DIR = path.join(__dirname, "../public/treks");

async function createPlaceholder() {
  const svg = `<svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#E5E0D8"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="36" fill="#78716C" text-anchor="middle" dy=".3em">Morocco Sahara Trekking</text>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(path.join(OUT_DIR, "placeholder.webp"));
  console.log("🖼️  Created placeholder.webp");
}

async function processImages() {
  await fs.ensureDir(OUT_DIR);
  await createPlaceholder();

  for (const [slug, images] of Object.entries(mapping)) {
    console.log(`\n📁 Processing ${slug}...`);
    for (let i = 0; i < images.length; i++) {
      const src = path.join(SOURCE_DIR, images[i]);
      const dest = path.join(OUT_DIR, `${slug}-${i + 1}.webp`);
      if (!await fs.pathExists(src)) {
        console.log(`  ⚠️  Missing: ${images[i]}`);
        continue;
      }
      try {
        await sharp(src).resize(1200, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
        console.log(`  ✅ ${images[i]} → ${slug}-${i + 1}.webp`);
      } catch (err) {
        console.error(`  ❌ ${images[i]}:`, err.message);
      }
    }
  }
  console.log("\n✨ Done!");
}

processImages().catch(console.error);
