// Run npm ci --ignore-scripts, then npm run build:romaji. No Node runtime is needed on the VPS.
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const target = path.join(root, 'outputs', 'romaji-assets');
fs.mkdirSync(target, {recursive:true});
esbuild.buildSync({
  entryPoints:[path.join(__dirname,'romaji-entry.js')],
  outfile:path.join(target,'kuroshiro-kuromoji-1.2.0-1.1.0.min.js'),
  bundle:true, minify:true, platform:'browser', target:['es2020'], legalComments:'eof',alias:{path:'path-browserify'},
});
const dictionary = path.join(path.dirname(require.resolve('kuromoji/package.json')), 'dict');
const dictionaryTarget = path.join(target, 'ipadic-0.1.2');
fs.mkdirSync(dictionaryTarget, {recursive:true});
for (const name of fs.readdirSync(dictionary)) {
  if (name.endsWith('.dat.gz')) fs.copyFileSync(path.join(dictionary,name),path.join(dictionaryTarget,name));
}
const notices = ['# Japanese romanization dependencies', '',
  'Bundled locally; loaded only when the operator requests Romaji.',
  'kuroshiro 1.2.0 / kuroshiro-analyzer-kuromoji 1.1.0 / kuromoji 0.1.2.', ''];
for (const packageName of ['kuroshiro','kuroshiro-analyzer-kuromoji','kuromoji','zlibjs','doublearray','async','lodash','path-browserify','@babel/runtime']) {
  const directory = path.dirname(require.resolve(packageName+'/package.json'));
  const manifest = JSON.parse(fs.readFileSync(path.join(directory,'package.json'),'utf8'));
  const name = fs.readdirSync(directory).find(x=>/^licen[cs]e(?:\.|$)/i.test(x));
  notices.push(`## ${packageName} ${manifest.version}`, '', name ? fs.readFileSync(path.join(directory,name),'utf8') : String(manifest.license), '');
}
// kuromoji's dictionary has its own IPADIC notice, separate from the JS Apache license.
notices.push('## IPADIC dictionary', '', fs.readFileSync(path.join(path.dirname(dictionary),'NOTICE.md'),'utf8'), '');
fs.writeFileSync(path.join(target,'NOTICES.txt'), notices.join('\n').trimEnd()+'\n');
console.log('Built local Japanese converter and IPADIC dictionary.');
