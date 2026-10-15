const { test } = require('node:test');
const assert = require('node:assert/strict');
const net = require('node:net');
const http = require('node:http');
const { findPort, developmentEnvironment, waitFor } = require('../scripts/dev.cjs');
const { localEnvironment } = require('../scripts/start-local.cjs');

const listen = (server, host) => new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen({ port: 0, host, exclusive: true }, () => resolve(server.address().port));
});
const close = server => new Promise(resolve => server.close(resolve));

test('built UI keeps the original browser origin despite stale development port variables', () => {
  const environment = localEnvironment({MANOKARA_PORT:'8002', MANOKARA_ORIGIN:'http://localhost:5174',
    MANOKARA_ALLOW_HTTP:'0', MANOKARA_DATA_DIR:'existing-room-data'});
  assert.equal(environment.MANOKARA_PORT, '8000');
  assert.equal(environment.MANOKARA_ORIGIN, 'http://localhost:8000');
  assert.equal(environment.MANOKARA_ALLOW_HTTP, '1');
  assert.equal(environment.MANOKARA_DATA_DIR, 'existing-room-data');
});

test('port selection skips an occupied IPv4 listener without stopping it', async () => {
  const occupied = net.createServer();
  const port = await listen(occupied, '127.0.0.1');
  try {
    const chosen = await findPort(port, ['127.0.0.1']);
    assert.ok(chosen > port && chosen < port + 100);
    assert.equal(occupied.listening, true);
    const confirmation = net.createServer();
    await new Promise((resolve, reject) => {
      confirmation.once('error', reject);
      confirmation.listen({ port: chosen, host: '127.0.0.1', exclusive: true }, resolve);
    });
    await close(confirmation);
  } finally { await close(occupied); }
});

test('localhost selection also skips occupied IPv6 listeners', async t => {
  const occupied = net.createServer();
  let port;
  try { port = await listen(occupied, '::1'); }
  catch (error) {
    if (['EAFNOSUPPORT', 'EADDRNOTAVAIL', 'EPROTONOSUPPORT'].includes(error.code)) return t.skip('IPv6 loopback unavailable');
    throw error;
  }
  try {
    const chosen = await findPort(port, ['127.0.0.1', '::1']);
    assert.ok(chosen > port);
    assert.equal(occupied.listening, true);
  } finally { await close(occupied); }
});

test('both services receive matching dev origins despite stale shell configuration', async () => {
  const base = {
    MANOKARA_ORIGIN: 'https://old.example', MANOKARA_ALLOW_HTTP: '0',
    MANOKARA_PORT: '1', MANOKARA_VITE_PORT: '2', MANOKARA_BACKEND_ORIGIN: 'http://127.0.0.1:3',
    MANOKARA_DATA_DIR: 'custom-dev-data', MANOKARA_YTDLP_ENABLED: '0', MANOKARA_YTDLP_JS_RUNTIME: 'deno',
  };
  const environment = await developmentEnvironment(base);
  assert.equal(environment.MANOKARA_ORIGIN, `http://localhost:${environment.MANOKARA_VITE_PORT}`);
  assert.equal(environment.MANOKARA_BACKEND_ORIGIN, `http://127.0.0.1:${environment.MANOKARA_PORT}`);
  assert.equal(environment.MANOKARA_ALLOW_HTTP, '1');
  assert.equal(environment.MANOKARA_DATA_DIR, 'custom-dev-data');
  assert.equal(environment.MANOKARA_YTDLP_ENABLED, '0');
  assert.equal(environment.MANOKARA_YTDLP_JS_RUNTIME, 'deno');
  assert.equal(base.MANOKARA_ALLOW_HTTP, '0');
});

test('readiness checks wait for a valid response and reject stopped servers', async () => {
  let ready = false;
  const server = http.createServer((request, response) => {
    assert.equal(request.headers.host, 'localhost:5173');
    response.writeHead(ready ? 200 : 503);
    response.end(ready ? '{"ok":true}' : '{}');
    ready = true;
  });
  const port = await listen(server, '127.0.0.1');
  try {
    await waitFor(`http://127.0.0.1:${port}/healthz`, response => response.status === 200 && JSON.parse(response.body).ok, () => false, 2000, { Host: 'localhost:5173' });
    await assert.rejects(waitFor(`http://127.0.0.1:${port}/healthz`, () => true, () => true), /stopped/);
  } finally { await close(server); }
});
