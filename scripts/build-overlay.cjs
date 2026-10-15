const path = require('node:path');
const { buildSync } = require('esbuild');
const root = path.resolve(__dirname, '..');
buildSync({
  entryPoints: [path.join(root, 'src/renderers/overlay.js')],
  outfile: path.join(root, 'outputs/manokara-overlay.js'),
  bundle: true, format: 'iife', target: 'es2020', charset: 'utf8',
  banner: { js: '/* Generated from src/renderers/overlay.js. Original Manokara layouts. */' }
});
