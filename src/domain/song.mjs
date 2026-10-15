/** Persistent song data. Timing tokens and unknown metadata are retained. */
export const isRecord = value => !!value && typeof value === 'object' && !Array.isArray(value);
export const isSong = value => isRecord(value) && (!!value.mc || typeof value.url === 'string');
export const isLibrarySong = value => isRecord(value) && typeof value.libraryId === 'string' && typeof value.url === 'string';
export const clampSongPitch = value => Math.max(-12, Math.min(12, Math.round(Number(value) || 0)));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;

/** @returns {import('./contracts.mjs').SetlistEntry|null} */
export function normalizeSong(value) {
  if (!isSong(value)) return null;
  return {
    ...value,
    title: String(value.title || value.url || '').slice(0, 512),
    memo: String(value.memo || '').slice(0, 4096),
    lrc: String(value.lrc || ''),
    s: Math.max(0, number(value.s)),
    e: value.e == null ? null : number(value.e, null),
    off: number(value.off),
    pitch: clampSongPitch(value.pitch),
    dur: value.dur == null ? null : number(value.dur, null)
  };
}

export const normalizeSetlist = value => Array.isArray(value) ? value.map(normalizeSong).filter(Boolean) : [];

// Keep the legacy array/object formats. Parsed lyric caches are runtime data.
export const persistentReplacer = (key, value) => key === '_L' ? undefined : value;
export const serializePersistent = value => JSON.stringify(value, persistentReplacer);
export const copyPersistent = value => JSON.parse(serializePersistent(value));
