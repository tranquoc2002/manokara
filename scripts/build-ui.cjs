/* Bundle the controller's pinned, local font and Phosphor icon assets. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'outputs');
const ui = path.join(output, 'ui-assets');
const icons = path.join(root, 'node_modules/@phosphor-icons/core');
const font = path.join(root, 'node_modules/@fontsource-variable/geist');
const names = ['cactus', 'microphone-stage', 'music-notes', 'playlist', 'play', 'pause', 'stop',
  'skip-back', 'skip-forward', 'speaker-high', 'plus', 'trash', 'pencil-simple',
  'arrow-up', 'arrow-down', 'x', 'arrow-up-right', 'magnifying-glass', 'upload-simple',
  'download-simple', 'monitor-play', 'sliders-horizontal', 'shuffle', 'broadcast',
  'check', 'circle-half', 'text-align-left', 'link', 'clock', 'waveform', 'text-aa',
  'arrow-counter-clockwise', 'caret-right'];
fs.mkdirSync(ui, { recursive: true });
const symbols = names.map(name => {
  const svg = fs.readFileSync(path.join(icons, `assets/regular/${name}.svg`), 'utf8');
  const body = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return `<symbol id="${name}" viewBox="0 0 256 256">${body}</symbol>`;
});
fs.writeFileSync(path.join(output, 'manokara-icons.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg"><!-- Phosphor Icons, regular weight, MIT. See /ui-assets/NOTICES.txt. --><defs>${symbols.join('')}</defs></svg>\n`);
const css = fs.readFileSync(path.join(font, 'index.css'), 'utf8');
for (const [, filename] of css.matchAll(/\.\/files\/([^)'"\s]+)/g)) {
  fs.copyFileSync(path.join(font, 'files', filename), path.join(ui, filename));
}
fs.writeFileSync(path.join(ui, 'geist.css'), css.replaceAll('./files/', './'));
fs.writeFileSync(path.join(ui, 'NOTICES.txt'),
  'Manokara controller assets\n\nPhosphor Icons 2.1.1\nhttps://github.com/phosphor-icons/core\n\n' +
  fs.readFileSync(path.join(icons, 'LICENSE'), 'utf8') +
  '\n\nGeist variable font, Fontsource package 5.3.0\nhttps://github.com/vercel/geist-font\n\n' +
  fs.readFileSync(path.join(font, 'LICENSE'), 'utf8'));
console.log(`Bundled ${names.length} icons and the local Geist font subsets.`);
