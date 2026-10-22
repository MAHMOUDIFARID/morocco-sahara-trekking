const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadTs(relativePath) {
  const file = path.resolve(__dirname, '..', relativePath);
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const localRequire = (specifier) => specifier.startsWith('.')
    ? loadTs(path.resolve(path.dirname(file), `${specifier}.ts`))
    : require(specifier);
  vm.runInNewContext(source, { module, exports: module.exports, require: localRequire, process }, { filename: file });
  return module.exports;
}

const { getAllTreks, getFeaturedTreks, getTrekBySlug } = loadTs('lib/mdx.ts');
const { getDurationLabel, getTrekWhatsAppUrl } = loadTs('lib/trekPresentation.ts');
const vehicleSlug = 'decouverte-maroc-en-voiture';

test('vehicle programme is first in the catalogue and among the three home cards', () => {
  const all = getAllTreks();
  const home = getFeaturedTreks().slice(0, 3);
  assert.equal(all.length, 18);
  assert.equal(all[0].slug, vehicleSlug);
  assert.equal(home.length, 3);
  assert.equal(home[0].slug, vehicleSlug);
  assert.equal(new Set(home.map((trek) => trek.slug)).size, 3);
});

test('vehicle programme keeps a flexible duration and an existing cover image', () => {
  const vehicle = getTrekBySlug(vehicleSlug);
  assert.equal(vehicle.activityType, 'vehicle');
  assert.equal(vehicle.duration, 'Sur mesure');
  assert.equal(getDurationLabel(vehicle.duration), 'Sur mesure');
  assert.ok(fs.existsSync(path.resolve(__dirname, '..', 'public', vehicle.images[0].slice(1))));
  assert.ok(vehicle.content.includes('Les déplacements principaux se font en voiture.'));
  assert.equal(vehicle.notIncluded.filter((item) => item === 'Boissons et dépenses personnelles').length, 1);
  assert.equal(vehicle.notIncluded.filter((item) => item === "Pourboires pour l'équipe locale").length, 1);
  assert.equal(vehicle.price, undefined);
});

test('the 17 walking treks keep their numeric durations and formatted day counts', () => {
  const walking = getAllTreks().filter((trek) => trek.activityType === 'trek');
  assert.equal(walking.length, 17);
  for (const trek of walking) {
    assert.equal(typeof trek.duration, 'number', trek.slug);
    assert.match(getDurationLabel(trek.duration), /^\d+ jours$/);
  }
});

test('vehicle WhatsApp message requests the formula without inventing a day count', () => {
  const vehicle = getTrekBySlug(vehicleSlug);
  const url = new URL(getTrekWhatsAppUrl(vehicle.title, vehicle.duration, vehicle.activityType));
  const message = url.searchParams.get('text');
  assert.equal(url.pathname, '/212672058267');
  assert.ok(message.includes(vehicle.title));
  assert.ok(message.includes('la formule suivante'));
  assert.ok(message.includes('Durée : Sur mesure'));
  assert.doesNotMatch(message, /Sur mesure jours|Prix|€|\p{Extended_Pictographic}/u);
});

test('walking trek WhatsApp message preserves the greeting, duration and question', () => {
  const message = new URL(getTrekWhatsAppUrl('Un trek', 7)).searchParams.get('text');
  assert.equal(message, `Bonjour Mohamed,

Je suis intéressé(e) par le trek suivant :
Un trek
Durée : 7 jours

Pourriez-vous me donner plus d'informations (dates disponibles, niveau requis, ce qui est inclus) ?

Merci d'avance !`);
});
