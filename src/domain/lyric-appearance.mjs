import { isRecord } from './song.mjs';

export const LYRIC_STYLE_FIELDS = Object.freeze(['lfont', 'lfc', 'lsz', 'lcol', 'lfx', 'lshape', 'lbgmode', 'ltheme', 'lclassiccolor']);
export const LYRIC_EFFECTS = Object.freeze([
  'jizura', 'karaoke-classic', 'folia-classic', 'folia-cadenza', 'folia-partita', 'folia-fume',
  'folia-tilt', 'folia-claddagh', 'folia-monet', 'folia-diorama', 'folia-pendolo', 'folia-sonnet',
  'folia-tempera', 'folia-lumiere', 'tempera', 'sonnet', 'lumiere', 'hanabi', 'clean', 'word-pop', 'neon', 'glitch'
]);
const choices = {
  lfx: LYRIC_EFFECTS, lshape: ['auto', 'wide', 'tall'], lbgmode: ['transparent', 'green'],
  ltheme: ['effect', 'white', 'cyan', 'rose', 'amber', 'violet', 'mint']
};
export const DEFAULT_LYRIC_STYLE = Object.freeze({
  version: 1, lfont: '0', lfc: '', lsz: '64', lcol: '#ffffff', lfx: 'jizura', lshape: 'auto',
  lbgmode: 'transparent', ltheme: 'effect', lclassiccolor: '#2563eb', lbold: true, centerFree: false, themeSeed: 0
});

/** @returns {import('./contracts.mjs').LyricAppearance|null} */
export function normalizeLyricStyle(value, base = DEFAULT_LYRIC_STYLE, { fontCount = Infinity } = {}) {
  if (!isRecord(value)) return null;
  const style = { ...DEFAULT_LYRIC_STYLE, ...base, version: 1 };
  for (const key of LYRIC_STYLE_FIELDS) {
    let candidate = value[key];
    if (candidate == null) continue;
    if (key === 'lfx' && candidate === 'folia-cappella') candidate = 'folia-classic';
    if (choices[key]) {
      if (choices[key].includes(String(candidate))) style[key] = String(candidate);
    } else if (key === 'lfont') {
      if (/^\d+$/.test(String(candidate)) && Number(candidate) < fontCount) style[key] = String(Number(candidate));
    } else if (key === 'lcol' || key === 'lclassiccolor') {
      if (/^#[a-f0-9]{6}$/i.test(candidate)) style[key] = candidate;
    } else if (key === 'lsz') {
      const numeric = Number(candidate);
      if (Number.isFinite(numeric)) style[key] = String(Math.max(24, Math.min(160, numeric)));
    } else style[key] = String(candidate).slice(0, 120);
  }
  for (const key of ['lbold', 'centerFree']) if (typeof value[key] === 'boolean') style[key] = value[key];
  if (Number.isFinite(Number(value.themeSeed))) style.themeSeed = Number(value.themeSeed) >>> 0;
  return style;
}

export function normalizeOutputSettings(value, options) {
  const raw = isRecord(value) ? value : {};
  const style = normalizeLyricStyle({ ...raw, lfx: raw.fxv ? raw.lfx : 'jizura' }, DEFAULT_LYRIC_STYLE, options);
  return { ...raw, ...style, cdn: raw.cdn == null ? '5' : String(raw.cdn), fxv: 1 };
}
