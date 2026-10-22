const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const file = path.resolve(__dirname, '../lib/frontmatter.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const loaded = { exports: {} };
new Function('require', 'exports', compiled)(require, loaded.exports);
const { parseFrontmatter } = loaded.exports;

test('reads trek metadata types and preserves the complete MDX body', () => {
  const body = '\n# Le voyage\n\n---\n\n<Component />\n';
  const result = parseFrontmatter(`---
title: "Vallées d’Aït Bouguemez"
duration: 7
featured: true
coordinates:
  lat: 31.68
  lng: -6.45
images:
  - /treks/atlas.webp
description: >-
  Un voyage
  sur mesure.
---
${body}`);
  assert.deepEqual(result.data, {
    title: 'Vallées d’Aït Bouguemez', duration: 7, featured: true,
    coordinates: { lat: 31.68, lng: -6.45 }, images: ['/treks/atlas.webp'],
    description: 'Un voyage sur mesure.',
  });
  assert.equal(result.content, body);
});

test('supports Windows line endings, BOM and flexible durations', () => {
  assert.deepEqual(parseFrontmatter('\uFEFF---\r\nduration: Sur mesure\r\n---\r\n\r\nTexte\r\n'), {
    data: { duration: 'Sur mesure' }, content: '\r\nTexte\r\n',
  });
});

test('keeps documents without metadata and accepts empty metadata', () => {
  const content = '# Voyage\n\n---\n\nTexte';
  assert.deepEqual(parseFrontmatter(content), { data: {}, content });
  assert.deepEqual(parseFrontmatter('---\n---\nTexte'), { data: {}, content: 'Texte' });
});

test('rejects broken metadata, duplicate fields and unsupported YAML tags', () => {
  for (const source of [
    '---\ntitle: Voyage',
    '---\nimages: [broken\n---\n',
    '---\ntitle: One\ntitle: Two\n---\n',
    '---\n- title\n---\n',
    '---\ntitle: !custom value\n---\n',
  ]) assert.throws(() => parseFrontmatter(source));
});

test('limits YAML alias expansion', () => {
  const source = `---
a: &a [one, two, three, four, five, six, seven, eight, nine, ten]
b: &b [*a, *a, *a, *a, *a, *a, *a, *a, *a, *a]
c: [*b, *b, *b, *b, *b, *b, *b, *b, *b, *b]
---
`;
  assert.throws(() => parseFrontmatter(source), /alias/i);
});
