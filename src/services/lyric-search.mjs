/** The search service retains provider names and LRC tokens; language belongs to the view. */
export const LYRIC_PROVIDERS = Object.freeze([
  { id: 'lrclib', label: 'LRCLIB', enabled: true },
  { id: 'netease', label: 'NetEase', enabled: true },
  { id: 'qq', label: 'QQ Music · Better Lyrics', enabled: true, reason: 'cache_only' },
  { id: 'zing', label: 'Zing MP3', enabled: true },
  { id: 'amll', label: 'AMLL TTML', enabled: true },
  { id: 'musixmatch', label: 'Musixmatch', enabled: false, reason: 'needs_key' }
]);
// Preserve attribution on previously saved songs; retired sources cannot be searched.
const legacySources = [{ id: 'megalobiz', label: 'Megalobiz' }];
export const LYRIC_SOURCE_STATUSES = Object.freeze({
  ok: 'Found lyrics', empty: 'No lyrics found', partial: 'Some results could not be loaded',
  stale: 'Showing recent results while the source is temporarily unavailable',
  timeout: 'Source took too long', limited: 'Source rate limit reached',
  restricted: 'Source requires verification', credentials: 'API access needs attention',
  needs_key: 'QQ needs a server Better Lyrics API key for uncached songs.',
  unavailable: 'Source is temporarily unavailable', invalid: 'Source returned an unreadable response'
});
export function readProviderCatalog(value) {
  if (!Array.isArray(value)) return [];
  return LYRIC_PROVIDERS.map(known => {
    const row = value.find(item => item && item.id === known.id);
    return { ...known, enabled: row?.enabled === true, reason: String(row?.reason || '') };
  });
}
const timestamp = /\[\d{1,3}:[0-5]\d(?:[.:]\d{1,3})?\]/g;
const hasTimecodes = value => value.split(/\r?\n/).some(line => /^\s*\[\d/.test(line) && line.match(timestamp) && line.replace(timestamp, '').trim());
export function readLyricResults(value) {
  if (!Array.isArray(value)) throw Error('Invalid lyric search results.');
  return value.slice(0, 24).filter(row => row && typeof row.trackName === 'string' && typeof row.artistName === 'string')
    .map(row => ({ ...row,
      syncedLyrics: typeof row.syncedLyrics === 'string' && hasTimecodes(row.syncedLyrics) ? row.syncedLyrics : null,
      plainLyrics: typeof row.plainLyrics === 'string' ? row.plainLyrics : null,
      sources: readLyricSources(row.sources)
    })).filter(row => row.syncedLyrics || row.plainLyrics)
    // Defend the timed-first invariant even against an older/misconfigured server. The sort is stable.
    .sort((a, b) => Number(!!b.syncedLyrics) - Number(!!a.syncedLyrics));
}
export function safeLyricSourceUrl(value) {
  try {
    const url = new URL(value);
    const allowed = ['lrclib.net', 'music.163.com', 'y.qq.com', 'zingmp3.vn', 'megalobiz.com', 'www.megalobiz.com', 'musixmatch.com', 'www.musixmatch.com'].includes(url.hostname) ||
      url.hostname === 'github.com' && url.pathname.startsWith('/amll-dev/amll-ttml-db/');
    return allowed && url.protocol === 'https:' && !url.username && !url.password && (!url.port || url.port === '443') ? url.href : '';
  } catch { return ''; }
}
export function lyricImportNotice(warnings = [], translate = value => value) {
  if (!Array.isArray(warnings)) return '';
  const notes = [];
  if (warnings.includes('auxiliary') || warnings.includes('background')) notes.push(translate('TTML imports main lyrics. Supplied translations, romanization and backing vocals are omitted; you can create Romaji after importing.'));
  if (warnings.includes('overlap')) notes.push(translate('These lyrics have overlapping lines. Their timing is kept, but views with one active line may show only one part.'));
  if (warnings.includes('reserved_characters')) notes.push(translate('Literal brackets in lyric text use fullwidth characters to preserve the lyric timeline.'));
  if (warnings.includes('word_timing_unavailable')) notes.push(translate('Word timing could not be read. Line timing was loaded instead.'));
  return notes.join(' ');
}
export function readLyricSources(value) {
  if (typeof value === 'string') {
    try { value = JSON.parse(value); } catch { return []; }
  }
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).flatMap(source => {
    const known = [...LYRIC_PROVIDERS, ...legacySources].find(provider => provider.id === source?.id);
    return known ? [{ id: known.id, label: known.label, url: safeLyricSourceUrl(source.url) }] : [];
  });
}
