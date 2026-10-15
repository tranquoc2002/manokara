const { test } = require('node:test');
const assert = require('node:assert/strict');
const modules = Promise.all([
  import('../src/domain/song.mjs'), import('../src/domain/lyric-appearance.mjs'),
  import('../src/adapters/local-storage.mjs'), import('../src/adapters/song-library.mjs'),
  import('../src/services/persistence.mjs')
]);
const lrc = '[ti:夜の歌]\r\n[offset:-120]\r\n[00:01.230][00:05.00]<00:01.230>君<00:01.800>の歌\r\n[00:08.000]\r\n';
const song = extra => ({ title: '夜の歌', url: 'https://www.youtube.com/watch?v=dz3sM6ygX_g', lrc, s: 0, e: null, off: -.25, pitch: -3, ...extra });
function memoryStorage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return { values, getItem: key => values.get(key) ?? null, setItem(key, value) { values.set(key, String(value)); } };
}

// Explicit request/commit events allow us to verify that request success alone
// cannot report a successful save. Browser cases exercise real IndexedDB too.
function indexedDbFixture({ abort = false, blocked = false } = {}) {
  const records = new Map(), transactions = [];
  let opens = 0, closes = 0, openRequest;
  const database = {
    objectStoreNames: { contains: () => true },
    close() { closes++; },
    transaction() {
      let operation, input;
      const request = {}, transaction = {
        objectStore: () => ({
          getAll() { operation = 'list'; return request; },
          get(id) { operation = 'get'; input = id; return request; },
          put(value) { operation = 'put'; input = structuredClone(value); return request; },
          delete(id) { operation = 'delete'; input = id; return request; }
        }),
        abort() { transaction.error = new Error('Abort'); transaction.onabort?.(); },
        requestSuccess() {
          request.result = operation === 'list' ? [...records.values()].map(value => structuredClone(value)) :
            operation === 'get' ? structuredClone(records.get(input)) : undefined;
          request.onsuccess?.();
        },
        commit() {
          if (abort) { transaction.abort(); return; }
          if (operation === 'put') records.set(input.libraryId, input);
          if (operation === 'delete') records.delete(input);
          transaction.oncomplete?.();
        }
      };
      transactions.push(transaction);
      return transaction;
    }
  };
  const factory = { open(name, version) {
    assert.equal(name, 'manokara-library'); assert.equal(version, 1); opens++;
    openRequest = { result: database };
    const request = openRequest;
    queueMicrotask(() => blocked ? request.onblocked?.() : request.onsuccess?.());
    return request;
  } };
  return { factory, records, transactions, database, get opens() { return opens; }, get closes() { return closes; }, get openRequest() { return openRequest; } };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('song normalization preserves exact LRC, Romaji, animation and unknown metadata', async () => {
  const [domain] = await modules;
  const input = song({ romaji: { source: lrc, lrc: lrc.replace('君', 'kimi') }, lyricMode: 'both',
    lyricStyle: { version: 1, lfx: 'jizura', themeSeed: 123 }, custom: { future: 'keep me' }, mediaDuration: 285 });
  const value = domain.normalizeSong(input);
  assert.equal(value.lrc, lrc); assert.deepEqual(value.romaji, input.romaji);
  assert.deepEqual(value.lyricStyle, input.lyricStyle); assert.deepEqual(value.custom, input.custom);
  assert.equal(value.mediaDuration, 285); assert.equal(value.off, -.25); assert.equal(value.pitch, -3);
  assert.equal(input.s, 0);
});

test('legacy numeric fields and MC entries retain their behavior', async () => {
  const [domain] = await modules;
  const values = domain.normalizeSetlist([song({ s: '-2', e: '285', off: '1.125', pitch: '30' }),
    { mc: 1, memo: 'Chào mọi người', dur: '30' }, null, [], { unrelated: true }]);
  assert.equal(values.length, 2); assert.equal(values[0].s, 0); assert.equal(values[0].e, 285);
  assert.equal(values[0].off, 1.125); assert.equal(values[0].pitch, 12); assert.equal(values[1].dur, 30);
  assert.deepEqual(domain.normalizeSetlist({ songs: [] }), []);
});

test('serialization strips only runtime lyric caches and keeps enhanced timecodes', async () => {
  const [domain] = await modules;
  const value = song({ _L: { a: [1, 2] }, romaji: { source: lrc, lrc } });
  const roundTrip = domain.copyPersistent(value);
  assert.equal(roundTrip.lrc, lrc); assert.deepEqual(roundTrip.romaji, value.romaji);
  assert.ok(!('_L' in roundTrip)); assert.ok('_L' in value);
});

test('appearance validation is independent of DOM and maps retired Cappella', async () => {
  const [, appearance] = await modules;
  const base = { ...appearance.DEFAULT_LYRIC_STYLE, lfx: 'clean', themeSeed: 7 };
  const value = appearance.normalizeLyricStyle({ lfx: 'folia-cappella', lcol: '#fb7185',
    lclassiccolor: 'invalid', lfont: '200', lsz: '500', lbold: false, centerFree: true, themeSeed: 123 }, base, { fontCount: 15 });
  assert.equal(value.lfx, 'folia-classic'); assert.equal(value.lcol, '#fb7185');
  assert.equal(value.lclassiccolor, '#2563eb'); assert.equal(value.lfont, '0'); assert.equal(value.lsz, '160');
  assert.equal(value.lbold, false); assert.equal(value.centerFree, true); assert.equal(value.themeSeed, 123);
  assert.equal(base.lfx, 'clean'); assert.equal(appearance.normalizeLyricStyle([]), null);
});

test('legacy output preferences respect fxv and preserve future metadata', async () => {
  const [, appearance] = await modules;
  assert.equal(appearance.normalizeOutputSettings({ lfx: 'clean' }).lfx, 'jizura');
  const value = appearance.normalizeOutputSettings({ fxv: 1, lfx: 'clean', cdn: '0', ltheme: 'custom', future: 2 });
  assert.equal(value.lfx, 'clean'); assert.equal(value.cdn, '0'); assert.equal(value.ltheme, 'effect'); assert.equal(value.future, 2);
});

test('repositories read legacy keys without writing or adding a new data envelope', async () => {
  const [, , , , { createPersistence }] = await modules;
  const original = JSON.stringify([song({ libraryId: 'old', lyricStyle: { lfx: 'neon' } })]);
  const storage = memoryStorage({ kpt2: original, kpt_set: '{"fxv":1,"lfx":"clean"}', manokaraLanguage: 'vi', manokaraOverlayV1: '{"version":1,"width":1920,"playlist":{},"lyric":{}}' });
  const repo = createPersistence({ getStorage: () => storage });
  const value = repo.setlist.load();
  assert.equal(value.status, 'ok'); assert.equal(value.value[0].lrc, lrc);
  assert.equal(repo.preferences.get('language'), 'vi'); assert.equal(repo.preferences.loadOutput().value.lfx, 'clean');
  assert.equal(repo.layout.load().value.version, 1); assert.equal(storage.getItem('kpt2'), original);
  assert.equal(storage.values.size, 4);
  assert.equal(repo.setlist.save(value.value).ok, true);
  assert.ok(Array.isArray(JSON.parse(storage.getItem('kpt2'))));
});

test('invalid JSON remains untouched on read and is preserved before a replacement', async () => {
  const [, , , , { createPersistence }] = await modules;
  const original = '[{"url":"https://example.com","lrc":"[00:05]unfinished';
  const storage = memoryStorage({ kpt2: original });
  const repo = createPersistence({ getStorage: () => storage });
  assert.equal(repo.setlist.load().status, 'invalid'); assert.equal(storage.getItem('kpt2'), original);
  assert.equal(repo.setlist.save([song()]).ok, true);
  assert.equal(JSON.parse(storage.getItem('manokaraRecoveryV1')).entries.kpt2.raw, original);
  assert.equal(JSON.parse(storage.getItem('kpt2'))[0].lrc, lrc);
});

test('partly malformed arrays retain valid songs and preserve raw data on save', async () => {
  const [, , , , { createPersistence }] = await modules;
  const original = JSON.stringify([song(), null, { unexpected: true }]);
  const storage = memoryStorage({ kpt2: original });
  const repo = createPersistence({ getStorage: () => storage });
  const loaded = repo.setlist.load().value;
  assert.equal(loaded.length, 1); assert.equal(storage.getItem('kpt2'), original);
  assert.equal(repo.setlist.save(loaded).ok, true);
  assert.equal(JSON.parse(storage.getItem('manokaraRecoveryV1')).entries.kpt2.raw, original);
});

test('failed recovery copy never overwrites the original damaged data', async () => {
  const [, , , , { createPersistence }] = await modules;
  const storage = memoryStorage({ kpt2: 'not json' });
  storage.setItem = () => { throw new Error('QuotaExceededError'); };
  const repo = createPersistence({ getStorage: () => storage });
  assert.equal(repo.setlist.save([song()]).ok, false); assert.equal(storage.getItem('kpt2'), 'not json');
});

test('denied storage and invalid data return failures instead of throwing during initialization', async () => {
  const [, , , , { createPersistence }] = await modules;
  const repo = createPersistence({ getStorage: () => { throw new Error('SecurityError'); } });
  assert.equal(repo.setlist.load().status, 'unavailable'); assert.deepEqual(repo.setlist.load().value, []);
  assert.equal(repo.preferences.get('theme'), null); assert.equal(repo.preferences.loadOutput().value.lfx, 'jizura');
  assert.equal(repo.setlist.save([song()]).ok, false); assert.equal(repo.layout.save({ version: 1 }).ok, false);
  const storage = memoryStorage();
  const valid = createPersistence({ getStorage: () => storage });
  assert.equal(valid.setlist.save({ not: 'an array' }).ok, false);
  assert.equal(valid.preferences.set('notAKey', 'value').ok, false); assert.equal(storage.values.size, 0);
});

test('output and overlay retain legacy object formats and independently recover invalid records', async () => {
  const [, , , , { createPersistence }] = await modules;
  const storage = memoryStorage({ kpt_set: 'null', manokaraOverlayV1: '{broken' });
  const repo = createPersistence({ getStorage: () => storage });
  assert.equal(repo.preferences.saveOutput({ fxv: 1, lfx: 'clean', cdn: '2' }).ok, true);
  assert.equal(repo.layout.save({ version: 1, width: 1920, height: 1080, playlist: {}, lyric: {} }).ok, true);
  const saved = JSON.parse(storage.getItem('manokaraRecoveryV1'));
  assert.equal(saved.entries.kpt_set.raw, 'null'); assert.equal(saved.entries.manokaraOverlayV1.raw, '{broken');
  assert.equal(JSON.parse(storage.getItem('kpt_set')).lfx, 'clean');
  assert.equal(JSON.parse(storage.getItem('manokaraOverlayV1')).version, 1);
});

test('library only reports success after commit and saves an immutable snapshot', async () => {
  const [, , , { createSongLibrary }] = await modules;
  const fixture = indexedDbFixture(), repo = createSongLibrary(() => fixture.factory);
  const input = song({ libraryId: 'a', _L: { runtime: true } });
  let completed = false;
  const saving = repo.put(input).then(() => { completed = true; });
  input.lrc = 'Changed after save started';
  await settle();
  const transaction = fixture.transactions[0]; transaction.requestSuccess();
  await settle(); assert.equal(completed, false); assert.equal(fixture.records.size, 0);
  transaction.commit(); await saving;
  assert.equal(completed, true); assert.equal(fixture.records.get('a').lrc, lrc);
  assert.ok(!('_L' in fixture.records.get('a'))); repo.close();
});

test('successful request followed by transaction abort rejects without reporting saved', async () => {
  const [, , , { createSongLibrary }] = await modules;
  const fixture = indexedDbFixture({ abort: true }), repo = createSongLibrary(() => fixture.factory);
  const saving = repo.put(song({ libraryId: 'a' }));
  const assertion = assert.rejects(saving, /Abort/);
  await settle(); fixture.transactions[0].requestSuccess(); fixture.transactions[0].commit();
  await assertion; assert.equal(fixture.records.size, 0); repo.close();
});

test('library open failure, blocked upgrade and unavailable IndexedDB are handled', async () => {
  const [, , , { createSongLibrary }] = await modules;
  await assert.rejects(createSongLibrary(() => undefined).ready(), /unavailable/);
  await assert.rejects(createSongLibrary(() => { throw new Error('SecurityError'); }).ready(), /SecurityError/);
  const fixture = indexedDbFixture({ blocked: true }), repo = createSongLibrary(() => fixture.factory);
  await assert.rejects(repo.ready(), /blocked/);
  fixture.openRequest.onsuccess(); assert.equal(fixture.closes, 1);
  await assert.rejects(repo.put({ url: 'x' }), /Invalid library song/);
});

test('library shares one connection, reopens after close and cleans up on version change', async () => {
  const [, , , { createSongLibrary }] = await modules;
  const fixture = indexedDbFixture(), repo = createSongLibrary(() => fixture.factory);
  await Promise.all([repo.ready(), repo.ready()]); assert.equal(fixture.opens, 1);
  fixture.database.onversionchange(); assert.equal(fixture.closes, 1);
  await repo.ready(); assert.equal(fixture.opens, 2);
  const saving = repo.put(song({ libraryId: 'a' }));
  await settle(); fixture.transactions[0].requestSuccess(); fixture.transactions[0].commit(); await saving;
  const listing = repo.list();
  await settle(); fixture.transactions[1].requestSuccess(); fixture.transactions[1].commit();
  assert.equal((await listing)[0].libraryId, 'a');
  const deleting = repo.remove('a');
  await settle(); fixture.transactions[2].requestSuccess(); fixture.transactions[2].commit(); await deleting;
  assert.equal(fixture.records.size, 0); repo.close();
});

test('startup import checks and inserts atomically without replacing an existing library song', async () => {
  const [, , , { createSongLibrary }] = await modules;
  const fixture = indexedDbFixture(), repo = createSongLibrary(() => fixture.factory);
  fixture.records.set('a', song({ libraryId: 'a', lrc: 'Newer words', off: 9 }));
  const existing = repo.insertMissing(song({ libraryId: 'a' }));
  await settle(); fixture.transactions[0].requestSuccess(); fixture.transactions[0].commit();
  assert.equal(await existing, false); assert.equal(fixture.records.get('a').lrc, 'Newer words');
  const missing = repo.insertMissing(song({ libraryId: 'b' }));
  await settle(); fixture.transactions[1].requestSuccess(); fixture.transactions[1].commit();
  assert.equal(await missing, true); assert.equal(fixture.records.get('b').lrc, lrc); repo.close();
});
