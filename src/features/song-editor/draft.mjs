import { createFeatureStore } from '../../services/feature-store.mjs';
const defaults = Object.freeze({
  url: '',
  ttl: '',
  st: '',
  en: '',
  llrc: '',
  lq: '',
  lyricProvider: 'auto',
  lyricSourceLabel: '',
  lyricSourceUrl: '',
  lyricCopyright: '',
  lyricSources: '[]',
  loff: '0',
  songKey: '0',
  saveToLibrary: true,
  romajiLrc: '',
  lyricMode: 'original',
  lrcEncoding: 'auto',
  mcm: '',
  mcd: '',
  romajiOpen: false,
  romajiAvailable: false,
  romanizeBusy: false,
  lyricsStatus: '',
  lyricsError: false,
  lyricLoadStatus: '',
  saving: false
});
const dataFields = new Set(['url', 'ttl', 'st', 'en', 'llrc', 'lq', 'lyricProvider', 'lyricSourceLabel', 'lyricSourceUrl', 'lyricCopyright', 'lyricSources', 'loff', 'songKey', 'saveToLibrary', 'romajiLrc', 'lyricMode', 'mcm', 'mcd']);
export function createSongDraft() {
  const store = createFeatureStore(defaults);
  let revision = 0;
  function patch(values) {
    const current = store.getSnapshot(),
      next = {};
    for (const [key, value] of Object.entries(values)) {
      if (!(key in defaults)) continue;
      next[key] = typeof defaults[key] === 'boolean' ? !!value : String(value ?? '');
      // Match native textarea value semantics on imports and saved legacy drafts.
      if (key === 'llrc' || key === 'romajiLrc') next[key] = next[key].replace(/\r\n?/g, '\n');
    }
    if (Object.keys(next).some(key => dataFields.has(key) && next[key] !== current[key])) revision++;
    return store.patch(next);
  }
  return {
    ...store,
    patch,
    get: key => store.getSnapshot()[key],
    set(key, value) {
      patch({
        [key]: value
      });
      return value;
    },
    reset() {
      revision++;
      store.replace({
        ...defaults,
        saving: store.getSnapshot().saving
      });
    },
    get revision() {
      return revision;
    }
  };
}
