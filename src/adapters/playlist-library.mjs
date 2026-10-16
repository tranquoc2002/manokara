import { isPlaylist, playlistName, playlistSongIds } from '../domain/playlist.mjs';

// A separate small database preserves the existing v1 song library and its rollback path.
export const PLAYLIST_SCHEMA = Object.freeze({ database: 'manokara-playlists', version: 1, store: 'playlists', keyPath: 'playlistId' });

export function createPlaylistLibrary(getIndexedDB = () => globalThis.indexedDB) {
  let database = null, opening = null, cancelOpening = null, generation = 0;
  function ready() {
    if (database) return Promise.resolve(database);
    if (opening) return opening;
    const epoch = generation;
    const task = new Promise((resolve, reject) => {
      let request, settled = false;
      const fail = error => { if (!settled) { settled = true; reject(error || new Error('Could not open playlists')); } };
      cancelOpening = () => fail(new Error('Playlists closed'));
      try {
        const factory = getIndexedDB();
        if (!factory) throw new Error('IndexedDB unavailable');
        request = factory.open(PLAYLIST_SCHEMA.database, PLAYLIST_SCHEMA.version);
      } catch (error) { fail(error); return; }
      request.onupgradeneeded = () => {
        try {
          if (!request.result.objectStoreNames.contains(PLAYLIST_SCHEMA.store))
            request.result.createObjectStore(PLAYLIST_SCHEMA.store, { keyPath: PLAYLIST_SCHEMA.keyPath });
        } catch (error) { fail(error); request.transaction?.abort(); }
      };
      request.onerror = () => fail(request.error);
      request.onblocked = () => fail(new Error('Playlists are blocked by another page'));
      request.onsuccess = () => {
        const db = request.result;
        if (settled || epoch !== generation) { db.close(); return; }
        settled = true;
        database = db;
        db.onversionchange = close;
        db.onclose = () => { if (database === db) database = null; };
        resolve(db);
      };
    });
    opening = task;
    const clear = () => { if (opening === task) { opening = null; cancelOpening = null; } };
    task.then(clear, clear);
    return task;
  }

  async function transact(mode, operation) {
    const db = await ready();
    return new Promise((resolve, reject) => {
      let tx, result;
      try {
        tx = db.transaction(PLAYLIST_SCHEMA.store, mode);
        tx.oncomplete = () => resolve(result);
        tx.onabort = () => reject(tx.error || new Error('Playlist transaction aborted'));
        tx.onerror = () => reject(tx.error || new Error('Could not update playlists'));
        operation(tx.objectStore(PLAYLIST_SCHEMA.store), value => { result = value; }, error => {
          reject(error);
          try { tx.abort(); } catch (_) {}
        });
      } catch (error) { reject(error); try { tx?.abort(); } catch (_) {} }
    });
  }

  async function list() {
    const rows = await transact('readonly', (store, done) => {
      const request = store.getAll();
      request.onsuccess = () => done(request.result);
    });
    return (rows || []).filter(isPlaylist).sort((a, b) => a.createdAt - b.createdAt || a.playlistId.localeCompare(b.playlistId));
  }
  async function get(id) {
    return transact('readonly', (store, done, fail) => {
      const request = store.get(id);
      request.onsuccess = () => isPlaylist(request.result) ? done(request.result) : fail(new Error('This playlist no longer exists.'));
    });
  }
  async function create(name, songIds = []) {
    const clean = playlistName(name);
    const members = playlistSongIds(songIds);
    let id;
    try { id = globalThis.crypto.randomUUID(); }
    catch { id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2); }
    const record = { playlistId: id, name: clean, songIds: members, createdAt: Date.now(), updatedAt: Date.now() };
    return transact('readwrite', (store, done) => { store.add(record); done(record); });
  }
  async function mutate(id, change) {
    return transact('readwrite', (store, done, fail) => {
      const request = store.get(id);
      request.onsuccess = () => {
        try {
          if (!isPlaylist(request.result)) throw new Error('This playlist no longer exists.');
          // Read-modify-write in one transaction: edits in another tab are not overwritten.
          const next = { ...change(request.result), updatedAt: Date.now() };
          if (!isPlaylist(next)) throw new Error('Invalid playlist songs.');
          store.put(next);
          done(next);
        } catch (error) { fail(error); }
      };
    });
  }
  function rename(id, name) {
    const clean = playlistName(name);
    return mutate(id, record => ({ ...record, name: clean }));
  }
  function addSongs(id, songIds) {
    const ids = playlistSongIds(songIds);
    return mutate(id, record => ({ ...record, songIds: playlistSongIds([...new Set([...record.songIds, ...ids])]) }));
  }
  function removeSongs(id, songIds) {
    const ids = new Set(playlistSongIds(songIds));
    return mutate(id, record => ({ ...record, songIds: record.songIds.filter(songId => !ids.has(songId)) }));
  }
  function moveSong(id, songId, direction, neighborId) {
    if (direction !== -1 && direction !== 1) return Promise.reject(new Error('Invalid playlist order.'));
    return mutate(id, record => {
      const songIds = [...record.songIds], index = songIds.indexOf(songId);
      // Swap visible neighbors by ID so deleted/hidden song references cannot
      // consume an arrow click. Preserve all concurrent additions to this list.
      const target = neighborId === undefined ? index + direction : songIds.indexOf(neighborId);
      if (index >= 0 && target >= 0 && target < songIds.length && (target - index) * direction > 0)
        [songIds[index], songIds[target]] = [songIds[target], songIds[index]];
      return { ...record, songIds };
    });
  }
  async function remove(id) {
    await transact('readwrite', store => { store.delete(id); });
  }
  function close() {
    generation++;
    cancelOpening?.(); cancelOpening = null; opening = null;
    database?.close(); database = null;
  }
  return { ready, list, get, create, rename, addSongs, removeSongs, moveSong, remove, close };
}
