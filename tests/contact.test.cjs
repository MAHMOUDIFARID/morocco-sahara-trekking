const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the real TypeScript modules without an SMTP connection or a test framework.
function loadContact({ failAt, env = {} } = {}) {
  const messages = [];
  const cache = new Map();
  let transport;
  function load(relativePath) {
    const file = path.resolve(__dirname, '..', relativePath);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(source, {
      module, exports: module.exports,
      require(id) {
        if (id === 'next/server') return { NextResponse: { json: (value, options) => Response.json(value, options) } };
        if (id === 'nodemailer') return { createTransport(options) {
          transport = options;
          return { async sendMail(message) {
            messages.push(message);
            if (messages.length === failAt) throw new Error('Simulated SMTP failure');
          } };
        } };
        if (id.startsWith('@/')) return load(`${id.slice(2)}.ts`);
        return require(id);
      },
      process: { env: { SMTP_USER: 'sender@example.test', SMTP_PASS: 'test-only-password', ...env } },
      console: { error() {} }, Request, Response, TextDecoder, URL, Error,
    }, { filename: file });
    return module.exports;
  }
  const route = load('app/api/send-mail/route.ts');
  return { ...route, helpers: load('lib/contact.ts'), messages, transport };
}

const valid = { name: 'Test Visitor', email: 'visitor@example.test', message: 'Bonjour, quelles sont les dates disponibles ?', inquiryType: 'Trek', newsletter: false };
function request(body = valid, headers = {}) {
  return new Request('http://localhost:3000/api/send-mail', {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body),
  });
}

test('rejects invalid fields and malformed JSON before sending any email', async () => {
  const api = loadContact();
  for (const body of [null, [], {}, { ...valid, name: '  ' }, { ...valid, email: 'bad' }, { ...valid, email: 'a@test.com,b@test.com' }, { ...valid, name: 'Test\r\nBcc: attacker' }, { ...valid, message: 42 }, { ...valid, newsletter: 'yes' }, { ...valid, inquiryType: 'Injected' }, { ...valid, message: 'x'.repeat(5001) }]) {
    assert.equal((await api.POST(request(body))).status, 400);
  }
  const malformed = new Request('http://localhost:3000/api/send-mail', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' });
  assert.equal((await api.POST(malformed)).status, 400);
  assert.equal(api.messages.length, 0);
});

test('rejects oversized bodies even without Content-Length', async () => {
  const api = loadContact();
  assert.equal((await api.POST(request({ ...valid, message: 'x'.repeat(25000) }))).status, 413);
  assert.equal(api.messages.length, 0);
});

test('rejects foreign origins and non-JSON submissions', async () => {
  const api = loadContact();
  assert.equal((await api.POST(request(valid, { origin: 'https://other.example' }))).status, 403);
  assert.equal((await api.POST(request(valid, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal(api.messages.length, 0);
});

test('honeypot submissions do not send emails', async () => {
  const api = loadContact();
  assert.equal((await api.POST(request({ ...valid, website: 'spam.example' }))).status, 200);
  assert.equal(api.messages.length, 0);
});

test('escapes HTML, records newsletter consent and keeps the WhatsApp number', async () => {
  const api = loadContact();
  const response = await api.POST(request({ ...valid, name: '<b>Test</b>', message: '<img src=x onerror=alert(1)>', newsletter: true }, { origin: 'https://moroccosaharatrekking.com' }));
  assert.equal(response.status, 200);
  assert.equal(api.messages.length, 2);
  assert.match(api.messages[0].html, /&lt;img/);
  assert.doesNotMatch(api.messages[0].html, /<img/);
  assert.match(api.messages[0].html, /Oui — accord reçu le \d{4}-/);
  assert.match(api.messages[1].html, /&lt;b&gt;Test/);
  assert.match(api.messages[1].html, /https:\/\/wa.me\/212672058267/);
  assert.match(api.messages[1].html, /https:\/\/moroccosaharatrekking.com/);
});

test('an unchecked newsletter choice stays opted out', async () => {
  const api = loadContact();
  await api.POST(request(valid));
  assert.match(api.messages[0].text, /Offres et mises à jour par email : Non/);
});

test('rate limits repeat senders and returns Retry-After', async () => {
  const api = loadContact();
  for (let i = 0; i < 3; i++) assert.equal((await api.POST(request())).status, 200);
  const blocked = await api.POST(request());
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get('retry-after')) > 0);
  assert.equal(api.messages.length, 6);
});

test('global send limit applies even if email and IP headers keep changing', async () => {
  const api = loadContact();
  for (let i = 0; i < 30; i++) assert.equal((await api.POST(request({ ...valid, email: `visitor${i}@example.test` }, { 'x-forwarded-for': `192.0.2.${i}` }))).status, 200);
  assert.equal((await api.POST(request({ ...valid, email: 'another@example.test' }))).status, 429);
  assert.equal(api.messages.length, 60);
});

test('configured trusted proxy IP also limits rotating email addresses', async () => {
  const api = loadContact({ env: { CONTACT_TRUSTED_IP_HEADER: 'x-forwarded-for' } });
  for (let i = 0; i < 5; i++) assert.equal((await api.POST(request({ ...valid, email: `visitor${i}@example.test` }, { 'x-forwarded-for': '192.0.2.1' }))).status, 200);
  assert.equal((await api.POST(request({ ...valid, email: 'another@example.test' }, { 'x-forwarded-for': '192.0.2.1' }))).status, 429);
});

test('rate limit expires and rejected attempts do not consume other buckets', () => {
  const limiter = loadContact().helpers.createContactLimiter();
  assert.equal(limiter([{ key: 'a', max: 1 }], 0), 0);
  assert.equal(limiter([{ key: 'a', max: 1 }, { key: 'b', max: 1 }], 1000), 899);
  assert.equal(limiter([{ key: 'b', max: 1 }], 1000), 0);
  assert.equal(limiter([{ key: 'a', max: 1 }], 900000), 0);
});

test('requires valid TLS certificates and encryption', () => {
  const api = loadContact();
  assert.equal(api.transport.tls.rejectUnauthorized, true);
  assert.equal(api.transport.requireTLS, true);
  const ssl = loadContact({ env: { SMTP_PORT: '465' } });
  assert.equal(ssl.transport.secure, true);
});

test('admin delivery failure returns an error without sending a receipt', async () => {
  const api = loadContact({ failAt: 1 });
  assert.equal((await api.POST(request())).status, 500);
  assert.equal(api.messages.length, 1);
});

test('receipt failure still reports success after the admin received the request', async () => {
  const api = loadContact({ failAt: 2 });
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
});

test('missing SMTP credentials returns a useful unavailable response', async () => {
  const api = loadContact({ env: { SMTP_PASS: '' } });
  assert.equal((await api.POST(request())).status, 503);
  assert.equal(api.messages.length, 0);
});
