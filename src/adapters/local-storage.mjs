import { serializePersistent } from '../domain/song.mjs';

export const STORAGE_KEYS = Object.freeze({
  setlist: 'kpt2', outputSettings: 'kpt_set', overlay: 'manokaraOverlayV1',
  aspectLock: 'manokaraOverlayAspectLock', theme: 'manokaraTheme', language: 'manokaraLanguage',
  preferKaraoke: 'manokaraPreferKaraoke', recovery: 'manokaraRecoveryV1'
});

/** Access is lazy so blocked browser storage never prevents UI initialization. */
export function createLocalStorageAdapter(getStorage = () => globalThis.localStorage) {
  function readText(key, fallback = null) {
    try {
      const value = getStorage().getItem(key);
      return { value: value == null ? fallback : value, status: value == null ? 'missing' : 'ok' };
    } catch (error) { return { value: fallback, status: 'unavailable', error }; }
  }
  function readJson(key, fallback, validate = () => true) {
    const result = readText(key);
    if (result.status !== 'ok') return { ...result, value: fallback };
    try {
      const value = JSON.parse(result.value);
      if (!validate(value)) throw new Error('Invalid saved data');
      return { value, raw: result.value, status: 'ok' };
    } catch (error) { return { value: fallback, raw: result.value, status: 'invalid', error }; }
  }
  function writeText(key, value) {
    try { getStorage().setItem(key, String(value)); return { ok: true }; }
    catch (error) { return { ok: false, error }; }
  }
  function preserveInvalid(key, raw) {
    const previous = readJson(STORAGE_KEYS.recovery, { version: 1, entries: {} }, value =>
      value?.version === 1 && value.entries && typeof value.entries === 'object' && !Array.isArray(value.entries));
    if (previous.status === 'invalid' || previous.status === 'unavailable') throw previous.error;
    if (previous.value.entries[key]?.raw === raw) return;
    const copy = { version: 1, entries: { ...previous.value.entries, [key]: { raw, savedAt: Date.now() } } };
    // If making a recovery copy fails, leave the original entry intact.
    getStorage().setItem(STORAGE_KEYS.recovery, JSON.stringify(copy));
  }
  function writeJson(key, value, validate = () => true) {
    try {
      if (!validate(value)) throw new Error('Invalid data to save');
      const serialized = serializePersistent(value);
      if (serialized === undefined) throw new Error('Data is not serializable');
      const previous = readJson(key, null, validate);
      if (previous.status === 'unavailable') throw previous.error;
      if (previous.status === 'invalid') preserveInvalid(key, previous.raw);
      getStorage().setItem(key, serialized);
      return { ok: true };
    } catch (error) { return { ok: false, error }; }
  }
  return { readText, readJson, writeText, writeJson };
}
