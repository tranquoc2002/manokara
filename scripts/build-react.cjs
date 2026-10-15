// Both entry points must use the same layout schema, including builds with hooks disabled.
const path = require('node:path');
const { spawnSync } = require('node:child_process');
require('./build-overlay.cjs');
const result = spawnSync(process.execPath, [path.join(path.dirname(require.resolve('vite/package.json')), 'bin/vite.js'), 'build'], {
  cwd: path.resolve(__dirname, '..'), stdio: 'inherit'
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
