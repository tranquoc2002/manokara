import { copyPersistent, isLibrarySong } from '../domain/song.mjs';

export const LIBRARY_SCHEMA = Object.freeze({ database: 'manokara-library', version: 1, store: 'songs', keyPath: 'libraryId' });

export function createSongLibrary(getIndexedDB = () => globalThis.indexedDB) {
  let database = null, opening = null, cancelOpening = null, generation = 0;
  function ready() {
    if (database) return Promise.resolve(database);
    if (opening) return opening;
    const epoch = generation;
    const task = new Promise((resolve, reject) => {
      let request, settled = false;
      const fail = error => { if (!settled) { settled = true; reject(error || new Error('Could not open song library')); } };
      cancelOpening = () => fail(new Error('Song library closed'));
      try {
        const factory = getIndexedDB();
        if (!factory) throw new Error('IndexedDB unavailable');
        request = factory.open(LIBRARY_SCHEMA.database, LIBRARY_SCHEMA.version);
      } catch (error) { fail(error); return; }
      request.onupgradeneeded = () => {
        try {
          if (!request.result.objectStoreNames.contains(LIBRARY_SCHEMA.store))
            request.result.createObjectStore(LIBRARY_SCHEMA.store, { keyPath: LIBRARY_SCHEMA.keyPath });
        } catch (error) { fail(error); request.transaction?.abort(); }
      };
      request.onerror = () => fail(request.error);
      request.onblocked = () => fail(new Error('Song library is blocked by another page'));
      request.onsuccess = () => {
        const db = request.result;
        if (settled || epoch !== generation) { db.close(); return; }
        settled = true; database = db;
        db.onversionchange = () => close();
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
      let transaction, request, value;
      try {
        transaction = db.transaction(LIBRARY_SCHEMA.store, mode);
        transaction.oncomplete = () => resolve(value);
        transaction.onabort = () => reject(transaction.error || new Error('Song library transaction aborted'));
        transaction.onerror = () => reject(transaction.error || new Error('Could not update song library'));
        request = operation(transaction.objectStore(LIBRARY_SCHEMA.store));
        request.onsuccess = () => { value = request.result; };
        request.onerror = () => reject(request.error || new Error('Song library request failed'));
      } catch (error) { reject(error); try { transaction?.abort(); } catch (_) {} }
    });
  }
  async function list() { return ((await transact('readonly', store => store.getAll())) || []).filter(isLibrarySong); }
  async function get(id) { return transact('readonly', store => store.get(id)); }
  async function put(song) {
    if (!isLibrarySong(song)) throw new Error('Invalid library song');
    // Snapshot before awaiting the database: later UI edits cannot alter this write.
    const record = copyPersistent(song);
    await transact('readwrite', store => store.put(record));
  }
  async function insertMissing(song) {
    if (!isLibrarySong(song)) throw new Error('Invalid library song');
    const record = copyPersistent(song), db = await ready();
    return new Promise((resolve, reject) => {
      let tx, inserted = false;
      try {
        tx = db.transaction(LIBRARY_SCHEMA.store, 'readwrite');
        tx.oncomplete = () => resolve(inserted);
        tx.onabort = () => reject(tx.error || new Error('Song library transaction aborted'));
        tx.onerror = () => reject(tx.error || new Error('Could not import song'));
        const store = tx.objectStore(LIBRARY_SCHEMA.store), request = store.get(record.libraryId);
        request.onerror = () => reject(request.error || new Error('Could not read song'));
        request.onsuccess = () => {
          // The read and insert share a transaction. Another tab cannot insert
          // a newer record between this check and the write.
          if (request.result !== undefined) return;
          try { store.put(record); inserted = true; }
          catch (error) { reject(error); tx.abort(); }
        };
      } catch (error) { reject(error); try { tx?.abort(); } catch (_) {} }
    });
  }
  async function remove(id) { await transact('readwrite', store => store.delete(id)); }
  function close() {
    generation++;
    cancelOpening?.(); cancelOpening = null; opening = null;
    database?.close(); database = null;
  }
  return { ready, list, get, put, insertMissing, remove, close };
}
