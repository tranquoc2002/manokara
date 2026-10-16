/** Playlists reference library songs; lyric text and animation settings have one owner. */
export const MAX_PLAYLIST_NAME = 80;
export const MAX_PLAYLIST_SONGS = 10000;
const validId = value => typeof value === 'string' && value.length > 0 && value.length <= 256 && !/[\u0000-\u001f]/u.test(value);

export function playlistName(value) {
  const name = typeof value === 'string' ? value.trim().replace(/\s+/gu, ' ') : '';
  if (!name || name.length > MAX_PLAYLIST_NAME || /[\u0000-\u001f]/u.test(name))
    throw new Error('Name your playlist (1–80 characters).');
  return name;
}

export function playlistSongIds(value) {
  if (!Array.isArray(value) || value.length > MAX_PLAYLIST_SONGS || !value.every(validId))
    throw new Error('Invalid playlist songs.');
  return [...new Set(value)];
}

export function isPlaylist(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !validId(value.playlistId)) return false;
  try {
    return playlistName(value.name) === value.name && playlistSongIds(value.songIds).length === value.songIds.length &&
      Number.isFinite(value.createdAt) && Number.isFinite(value.updatedAt);
  } catch { return false; }
}

export function songsInPlaylist(playlist, songs) {
  const byId = new Map(songs.map(song => [song.libraryId, song]));
  return (playlist?.songIds || []).map(id => byId.get(id)).filter(Boolean);
}
