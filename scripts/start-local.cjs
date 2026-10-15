/* Serve the built React UI at the original local site address so browser
   setlists, IndexedDB and settings remain in their existing origin. */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { available, getPage, waitFor, stopChild } = require('./dev.cjs');
const root = path.resolve(__dirname, '..');

function localEnvironment(base = process.env) {
  return {
    ...base,
    MANOKARA_PORT: '8000',
    MANOKARA_ORIGIN: 'http://localhost:8000',
    MANOKARA_ALLOW_HTTP: '1',
    MANOKARA_DATA_DIR: base.MANOKARA_DATA_DIR || path.join(base.LOCALAPPDATA || path.join(root, '.state'), 'manokara'),
    MANOKARA_YTDLP_ENABLED: base.MANOKARA_YTDLP_ENABLED ?? '1',
    MANOKARA_YTDLP_JS_RUNTIME: base.MANOKARA_YTDLP_JS_RUNTIME || 'node',
  };
}

async function main() {
  const environment = localEnvironment();
  const address = environment.MANOKARA_ORIGIN + '/manokara.html';
  const headers = { Host: 'localhost:8000' };
  const occupied = !await available(8000, '127.0.0.1') || !await available(8000, '::1', true);
  if (occupied) {
    const response = await getPage('http://127.0.0.1:8000/manokara.html', headers);
    if (response?.status === 200 && response.body.toLowerCase().includes('manokara')) {
      console.log('Manokara is already running at the original local address.');
      console.log(`Open Manokara: ${address}`);
      if (!response.body.includes('manokara-react.js')) console.log('This server is serving an older UI. Check your saved songs here first.');
      return;
    }
    throw Error(`Port 8000 is busy. Stop its existing server in its own terminal, then run npm run start again. The address stays ${address} to preserve access to your browser data.`);
  }
  const python = path.join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
  if (!fs.existsSync(python)) throw Error('Python environment missing: create .venv and install requirements.txt first.');
  if (!fs.existsSync(path.join(root, 'outputs/manokara-react.js'))) throw Error('React build missing. Run npm run build:react first.');
  const child = spawn(python, ['-u', 'outputs/manokara_server.py'], { cwd: root, env: environment, stdio: 'inherit', windowsHide: true });
  let failed = false, stopping = false, cleanup;
  const stop = () => {
    stopping = true;
    cleanup ||= stopChild(child);
    return cleanup;
  };
  const interrupted = () => { void stop(); };
  process.on('SIGINT', interrupted);
  process.on('SIGTERM', interrupted);
  child.once('error', error => { failed = true; console.error(error.message); });
  child.once('exit', code => { if (!stopping) { failed = true; process.exitCode = code || 1; } });
  try {
    await waitFor('http://127.0.0.1:8000/healthz', response => {
      if (response.status !== 200) return false;
      try { return JSON.parse(response.body).ok === true; } catch { return false; }
    }, () => failed || stopping, 20000, headers);
    console.log(`\nOpen Manokara: ${address}`);
    console.log('Use the same browser and profile as before. Press Ctrl+C to stop this server.\n');
    await new Promise(resolve => {
      if (child.exitCode !== null || child.signalCode !== null) resolve();
      else child.once('exit', resolve);
    });
  } catch (error) {
    if (!stopping || failed) { console.error(error.message); process.exitCode = 1; }
  } finally {
    await stop();
    process.off('SIGINT', interrupted);
    process.off('SIGTERM', interrupted);
  }
}

module.exports = { localEnvironment };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
