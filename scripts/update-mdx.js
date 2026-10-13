const fs = require("fs");
const path = require("path");

const trekImageCounts = {
  "trek-7-jours-vallees-ait-bouguemez-ait-bououli": 3,
  "trek-villages-berberes-vallee-des-roses-4-jours": 3,
  "trek-toubkal-villages-berberes-3-jours": 2,
  "randonnee-ait-bouguemez-tassaout": 1,
  "randonnee-trekking-toubkal-maroc": 3,
  "trekking-desert-marocain": 3,
  "randonnee-ait-bougmez-gorges-mgoun": 2,
  "ascension-mgoun-vallee-heureuse-ait-bouguemez": 3,
  "trekking-randonnee-siroua-maroc": 3,
  "trekking-vallee-des-roses": 1,
  "randonnee-trekking-saghro": 3,
  "trek-randonnee-village-berbere-ait-bougmaz": 0,
  "5-jours-vallees-ait-bougmez-ait-bouilli": 0,
  "vallee-ait-bouguemez-trekking-decouverte-atlas": 0,
  "trek-ascension-10j-ait-bouguemez-mgoun-ouarzazate": 0,
  "traversee-nord-sud-haut-atlas-ascension-mgoun": 0,
  "trek-ait-bougmez-sremt-3-jours": 0,
};

const MDX_DIR = path.join(__dirname, "../content/treks");

for (const [slug, count] of Object.entries(trekImageCounts)) {
  const filePath = path.join(MDX_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) continue;

  const imagePaths = count > 0
    ? Array.from({ length: count }, (_, i) => `  - "/treks/${slug}-${i + 1}.webp"`)
    : [`  - "/treks/placeholder.webp"`];

  const newBlock = `images:\n${imagePaths.join("\n")}\n`;
  const content = fs.readFileSync(filePath, "utf8");
  const updated = content.replace(/images:\r?\n(?:\s+-\s+.*\r?\n)+/, newBlock);
  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`✅ ${slug}.mdx → ${count > 0 ? count + " image(s)" : "placeholder"}`);
}
console.log("\n✨ All MDX files updated!");
