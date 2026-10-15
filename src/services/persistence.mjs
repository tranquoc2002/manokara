import { isRecord, isSong, normalizeSetlist } from '../domain/song.mjs';
import { normalizeOutputSettings } from '../domain/lyric-appearance.mjs';
import { createLocalStorageAdapter, STORAGE_KEYS } from '../adapters/local-storage.mjs';
import { createSongLibrary } from '../adapters/song-library.mjs';

export function createPersistence({ getStorage, getIndexedDB } = {}) {
  const local = createLocalStorageAdapter(getStorage);
  const preferenceNames = new Set(['aspectLock', 'theme', 'language', 'preferKaraoke']);
  const setlist = {
    load() { const result = local.readJson(STORAGE_KEYS.setlist, [], Array.isArray); return { ...result, value: normalizeSetlist(result.value) }; },
    save(songs) { return local.writeJson(STORAGE_KEYS.setlist, songs, value => Array.isArray(value) && value.every(isSong)); }
  };
  const preferences = {
    get(name, fallback = null) { return preferenceNames.has(name) ? local.readText(STORAGE_KEYS[name], fallback).value : fallback; },
    set(name, value) { return preferenceNames.has(name) ? local.writeText(STORAGE_KEYS[name], value) : { ok: false, error: new Error('Unknown preference') }; },
    loadOutput(options) {
      const result = local.readJson(STORAGE_KEYS.outputSettings, {}, isRecord);
      return { ...result, value: normalizeOutputSettings(result.value, options) };
    },
    saveOutput(value) { return local.writeJson(STORAGE_KEYS.outputSettings, value, isRecord); }
  };
  const layout = {
    load() { return local.readJson(STORAGE_KEYS.overlay, null, isRecord); },
    save(value) { return local.writeJson(STORAGE_KEYS.overlay, value, isRecord); }
  };
  return { setlist, preferences, layout, library: createSongLibrary(getIndexedDB), local };
}

// A single persistence boundary shared by controller, preferences and Studio.
// Constructors do not open storage/IndexedDB until a repository is used.
export const persistence = createPersistence();
