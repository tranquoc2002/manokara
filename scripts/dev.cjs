/* Start the React workspace and its Python API with matching local ports. */
const net = require('node:net');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const { spawn } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function available(port, host, optional = false) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', error => {
      if (['EADDRINUSE', 'EACCES'].includes(error.code)) resolve(false);
      else if (optional && ['EAFNOSUPPORT', 'EADDRNOTAVAIL', 'EPROTONOSUPPORT'].includes(error.code)) resolve(true);
      else reject(error);
    });
    server.listen({ port, host, exclusive: true }, () => server.close(() => resolve(true)));
  });
}

async function findPort(preferred, hosts) {
  for (let port = preferred; port < preferred + 100; port++) {
    let free = true;
    for (const host of hosts) {
      if (!await available(port, host, host === '::1')) { free = false; break; }
    }
    if (free) return port;
  }
  throw Error(`No free local port between ${preferred} and ${preferred + 99}.`);
}

async function developmentEnvironment(base = process.env) {
  const backendPort = await findPort(8000, ['127.0.0.1']);
  // Vite's localhost can resolve to IPv4 or IPv6. Check both before choosing.
  const frontendPort = await findPort(5173, ['127.0.0.1', '::1']);
  return {
    ...base,
    MANOKARA_PORT: String(backendPort),
    MANOKARA_VITE_PORT: String(frontendPort),
    MANOKARA_ORIGIN: `http://localhost:${frontendPort}`,
    MANOKARA_BACKEND_ORIGIN: `http://127.0.0.1:${backendPort}`,
    MANOKARA_ALLOW_HTTP: '1',
    MANOKARA_DATA_DIR: base.MANOKARA_DATA_DIR || path.join(base.LOCALAPPDATA || path.join(projectRoot, '.state'), 'manokara-dev'),
    MANOKARA_YTDLP_ENABLED: base.MANOKARA_YTDLP_ENABLED ?? '1',
    MANOKARA_YTDLP_JS_RUNTIME: base.MANOKARA_YTDLP_JS_RUNTIME || 'node',
  };
}

function getPage(url, headers = {}) {
  return new Promise(resolve => {
    const request = http.get(url, { headers }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { if (body.length < 100000) body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, body }));
      response.on('error', () => resolve(null));
    });
    request.setTimeout(1000, () => request.destroy());
    request.on('error', () => resolve(null));
  });
}

async function waitFor(url, accepts, failed, timeout = 20000, headers = {}) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (failed()) throw Error('A development server stopped. See its error above.');
    const response = await getPage(url, headers);
    if (failed()) throw Error('A development server stopped. See its error above.');
    if (response && accepts(response)) return;
    await sleep(200);
  }
  throw Error(`Server did not become ready: ${url}`);
}

async function stopChild(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null || !child.pid) return;
  if (process.platform === 'win32') {
    // Kill only a process created by this launcher and its own child processes.
    await new Promise(resolve => {
      const killer = spawn('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
      killer.once('error', resolve);
      killer.once('exit', resolve);
    });
  }
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGTERM');
  await Promise.race([
    new Promise(resolve => {
      if (child.exitCode !== null || child.signalCode !== null) resolve();
      else child.once('exit', resolve);
    }),
    sleep(3000),
  ]);
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
}

async function main() {
  const python = path.join(projectRoot, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
  const vite = path.join(projectRoot, 'node_modules/vite/bin/vite.js');
  if (!fs.existsSync(python)) throw Error('Python environment missing: create .venv and install requirements.txt first.');
  if (!fs.existsSync(vite)) throw Error('Vite is missing. Run npm ci first.');

  const environment = await developmentEnvironment();
  const children = [];
  let stopping = false, failure = false, stopPromise;
  const stop = () => {
    if (stopPromise) return stopPromise;
    stopping = true;
    stopPromise = Promise.all(children.map(stopChild));
    return stopPromise;
  };
  const onSignal = () => { void stop(); };
  process.on('SIGINT', onSignal);
  process.on('SIGTERM', onSignal);
  const start = (command, args) => {
    const child = spawn(command, args, { cwd: projectRoot, env: environment, stdio: 'inherit', windowsHide: true });
    children.push(child);
    child.once('error', error => {
      console.error(error.message);
      failure = true;
      process.exitCode = 1;
      void stop();
    });
    child.once('exit', (code, signal) => {
      if (stopping) return;
      failure = true;
      console.error(`Development server stopped (${signal || code}).`);
      process.exitCode = code || 1;
      void stop();
    });
    return child;
  };
  try {
    console.log(`API: ${environment.MANOKARA_BACKEND_ORIGIN}`);
    console.log(`React: ${environment.MANOKARA_ORIGIN}`);
    console.log('Busy ports are skipped. Existing servers are left running.');
    start(python, ['-u', 'outputs/manokara_server.py']);
    await waitFor(environment.MANOKARA_BACKEND_ORIGIN + '/healthz', response => {
      if (response.status !== 200) return false;
      try { return JSON.parse(response.body).ok === true; } catch { return false; }
    }, () => failure || stopping, 20000, { Host: new URL(environment.MANOKARA_ORIGIN).host });
    start(process.execPath, [vite, '--config', 'vite.dev.config.js']);
    await waitFor(environment.MANOKARA_ORIGIN + '/manokara.html', response => response.status === 200 && response.body.includes('/@vite/client'), () => failure || stopping);
    console.log(`\nOpen Manokara: ${environment.MANOKARA_ORIGIN}/manokara.html`);
    console.log('Browser storage belongs to the chosen port. Press Ctrl+C to stop both servers.\n');
    await Promise.race(children.map(child => new Promise(resolve => {
      if (child.exitCode !== null || child.signalCode !== null) resolve();
      else child.once('exit', resolve);
    })));
  } catch (error) {
    if (!stopping || failure) { console.error(error.message); process.exitCode = 1; }
  } finally {
    await stop();
    process.off('SIGINT', onSignal);
    process.off('SIGTERM', onSignal);
  }
}

module.exports = { available, findPort, developmentEnvironment, getPage, waitFor, stopChild };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
