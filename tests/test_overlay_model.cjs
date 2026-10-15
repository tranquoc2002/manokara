const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm');
const { virtualTime } = require('./playback_fixtures.cjs');
const modules = Promise.all([
  import('../src/domain/overlay-layout.mjs'), import('../src/domain/overlay-geometry.mjs'),
  import('../src/services/overlay-studio.mjs'), import('../src/features/overlay-studio/pointer-controller.mjs')
]);
async function harness(options = {}) {
  const [schema, geometry, { createOverlayStudio }, pointer] = await modules;
  const time = virtualTime(), writes = [], prefs = [], events = [];
  let failing = false, scene = { effect: 'clean' };
  const model = createOverlayStudio({
    repository: { load: () => ({ value: options.initial }), save(value) { writes.push(value); return { ok: !failing }; } },
    preferences: { get: () => options.locked === false ? 'false' : null, set: (...args) => prefs.push(args) },
    getScene: () => scene, platform: time.platform, now: time.now, ...options.ports
  });
  model.subscribe((state, event) => events.push({ state, ...event }));
  return { model, time, writes, prefs, events, schema, geometry, ...pointer,
    get doc() { return model.getSnapshot().document; },
    set failing(value) { failing = value; }, set scene(value) { scene = value; } };
}
function within(rect, frame) {
  const epsilon = 1e-8;
  assert(rect.x >= -epsilon && rect.y >= -epsilon);
  assert(rect.w >= 32 - epsilon && rect.h >= 32 - epsilon);
  assert(rect.x + rect.w <= frame.width + epsilon && rect.y + rect.h <= frame.height + epsilon);
}

test('version-1 layouts match golden output from the pre-migration renderer', async () => {
  const [{ normalize }] = await modules;
  const fixtures = JSON.parse(fs.readFileSync(require.resolve('./fixtures/overlay-layout-v1.json')));
  for (const { input, expected } of fixtures) assert.deepEqual(normalize(input), expected);
});
test('standalone OBS build and main ESM share the exact schema and compact-effect rules', async () => {
  const [schema] = await modules;
  const context = { window: {}, document: { fonts: null } };
  vm.runInNewContext(fs.readFileSync(require.resolve('../outputs/manokara-overlay.js'), 'utf8'), context);
  const output = context.window.ManokaraOverlay;
  for (const theme of schema.themes) assert.equal(JSON.stringify(output.defaults(theme)), JSON.stringify(schema.defaults(theme)));
  for (const { input } of JSON.parse(fs.readFileSync(require.resolve('./fixtures/overlay-layout-v1.json'))))
    assert.equal(JSON.stringify(output.normalize(input)), JSON.stringify(schema.normalize(input)));
  for (const effect of ['tempera', 'sonnet', 'lumiere', 'hanabi', 'clean', 'word-pop', 'neon', 'glitch', 'jizura', 'folia', 'karaoke-classic'])
    for (const centerFree of [true, false]) assert.equal(output.compactLyrics({ effect, centerFree }), schema.compactLyrics({ effect, centerFree }));
});
test('all eight handles obey canvas bounds, opposite anchors and optional aspect lock', async () => {
  const [, { resizeRect, resizeDirections }] = await modules;
  const frame = { width: 1920, height: 1080 }, original = { x: 300, y: 200, w: 640, h: 280, visible: true };
  for (const dir of resizeDirections) for (const locked of [true, false]) for (const dx of [-10000, -40, 0, 40, 10000]) for (const dy of [-10000, -30, 0, 30, 10000]) {
    const rect = resizeRect(original, dir, dx, dy, locked, frame); within(rect, frame);
    if (locked) assert(Math.abs(rect.w / rect.h - original.w / original.h) < 1e-8);
    if (dir.includes('w')) assert(Math.abs(rect.x + rect.w - original.x - original.w) < 1e-8);
    if (dir.includes('e')) assert.equal(rect.x, original.x);
    if (dir.includes('n')) assert(Math.abs(rect.y + rect.h - original.y - original.h) < 1e-8);
    if (dir.includes('s')) assert.equal(rect.y, original.y);
    if (locked && !/[ns]/.test(dir)) assert.equal(rect.y + rect.h / 2, original.y + original.h / 2);
    if (locked && !/[we]/.test(dir)) assert.equal(rect.x + rect.w / 2, original.x + original.w / 2);
  }
});
test('move/numeric resize handle canvas edges and do not mutate their inputs', async () => {
  const [, { moveRect, resizeDimension }] = await modules;
  const frame = { width: 1920, height: 1080 }, rect = Object.freeze({ x: 1800, y: 1000, w: 100, h: 50 });
  assert.deepEqual(moveRect(rect, 1000, -10000, frame), { x: 1820, y: 0, w: 100, h: 50 });
  for (const key of ['w', 'h']) for (const value of [-500, 10000]) for (const lock of [true, false]) {
    const next = resizeDimension(rect, key, value, lock, frame); within(next, frame);
    if (lock) assert.equal(next.w / next.h, 2);
  }
});
test('model exposes cached immutable snapshots; normalization no-ops do not enter history', async () => {
  const h = await harness(), state = h.model.getSnapshot();
  assert.equal(h.model.getSnapshot(), state);
  assert(Object.isFrozen(h.doc.playlist.blocks.current));
  assert.equal(h.model.setField('x', h.doc.playlist.blocks.current.x), false);
  assert.equal(h.model.getSnapshot().canUndo, false);
  h.time.advance(1000); assert.equal(h.writes.length, 0);
  assert.equal(h.model.setField('x', NaN), false);
});
test('history is bounded to 30 commits, redo clears only after a real edit', async () => {
  const h = await harness();
  for (let n = 1; n <= 35; n++) h.model.setField('x', 88 + n);
  for (let n = 0; n < 30; n++) assert(h.model.undo());
  assert.equal(h.doc.playlist.blocks.current.x, 93);
  assert.equal(h.model.undo(), false);
  h.model.setField('x', 93); assert(h.model.getSnapshot().canRedo);
  h.model.redo(); assert.equal(h.doc.playlist.blocks.current.x, 94);
  h.model.setField('x', 400); assert.equal(h.model.getSnapshot().canRedo, false);
});
test('drag is a single transaction: no storage/relay string changes until commit', async () => {
  const h = await harness(), before = h.model.serialized;
  h.model.beginGesture();
  for (let n = 0; n < 100; n++) h.model.moveGesture(n, n);
  assert.equal(h.model.serialized, before);
  assert.equal(h.doc.playlist.blocks.current.x, 187);
  h.time.advance(1000); assert.equal(h.writes.length, 0);
  assert.equal(h.events.filter(e => e.kind === 'document').length, 0);
  assert(h.model.endGesture()); assert.equal(h.writes.length, 1);
  assert.equal(h.events.filter(e => e.kind === 'document').length, 1);
  h.model.undo(); assert.equal(h.model.serialized, before);
  assert.equal(h.model.getSnapshot().canUndo, false);
});
test('cancellation and moving back to the start preserve auto-fit and committed history', async () => {
  const h = await harness(); h.model.setTarget('lyrics');
  const before = h.model.serialized;
  h.model.beginGesture(); h.model.moveGesture(10, 20);
  assert.equal(h.doc.lyricCompact.autoFit, false);
  h.model.moveGesture(0, 0); assert.equal(h.doc.lyricCompact.autoFit, true);
  assert.equal(h.model.endGesture(), false);
  h.model.beginGesture('se'); h.model.moveGesture(100, 100); h.model.cancelGesture();
  assert.equal(h.model.serialized, before); assert.equal(h.doc.lyricCompact.autoFit, true);
  assert.equal(h.model.getSnapshot().canUndo, false); assert.equal(h.writes.length, 0);
});
test('compact editing materializes measured bounds; full scene settings stay separate', async () => {
  const measured = { x: 600, y: 800, w: 700, h: 180, visible: true };
  const h = await harness({ ports: { measureLyrics: () => measured } });
  h.model.setTarget('lyrics'); h.model.setField('w', 350);
  assert.deepEqual(h.doc.lyricCompact, { ...measured, w: 350, h: 90, autoFit: false });
  assert.equal(h.doc.lyric.w, 1920);
  h.scene = { effect: 'folia' }; h.model.setField('w', 960);
  assert.equal(h.doc.lyric.w, 960); assert.equal(h.doc.lyricCompact.w, 350);
});
test('switching selection or compact/full mode cancels in-progress gestures', async () => {
  const h = await harness(); h.model.setTarget('lyrics'); const before = h.model.serialized;
  h.model.beginGesture(); h.model.moveGesture(200, 0);
  h.scene = { effect: 'folia' }; assert.equal(h.model.moveGesture(100, 0), false);
  assert.equal(h.model.serialized, before); assert.equal(h.model.dragging, false);
  h.model.setTarget('playlist'); h.model.beginGesture(); h.model.moveGesture(100, 0);
  h.model.select('next'); assert.equal(h.model.dragging, false); assert.equal(h.model.serialized, before);
});
test('pending autosave writes the last committed layout while a new gesture is active', async () => {
  const h = await harness(); h.model.setField('x', 200);
  h.model.beginGesture(); h.model.moveGesture(300, 0); h.time.advance(250);
  assert.equal(h.doc.playlist.blocks.current.x, 500);
  assert.equal(h.writes[0].playlist.blocks.current.x, 200);
  h.model.cancelGesture(); assert.equal(h.doc.playlist.blocks.current.x, 200);
});
test('failed saves remain dirty and can be retried; dispose cancels transient work', async () => {
  const h = await harness(); h.failing = true; h.model.setField('x', 100); h.time.advance(250);
  assert.equal(h.model.getSnapshot().dirty, true); assert(h.model.getSnapshot().saveError);
  h.failing = false; assert(h.model.flush()); assert.equal(h.model.getSnapshot().dirty, false);
  h.model.setField('x', 200); h.model.beginGesture(); h.model.moveGesture(999, 0);
  h.model.dispose(); h.time.advance(500);
  assert.equal(h.writes.at(-1).playlist.blocks.current.x, 200); assert.equal(h.time.jobs.size, 0);
  const writes = h.writes.length, before = h.model.serialized;
  h.model.setField('x', 300); h.model.undo(); h.model.flush(); h.model.dispose();
  assert.equal(h.writes.length, writes); assert.equal(h.model.serialized, before);
});
test('frame/preset/reset/import preserve schema, scrolling and separate/unified geometry', async () => {
  const h = await harness(); h.model.setLayout('unified'); h.model.setField('x', 120);
  h.model.setAppearance('autoScroll', true); h.model.setAppearance('scrollSpeed', 42);
  h.model.preset('card'); assert.equal(h.doc.playlist.group.x, 120); assert(h.doc.playlist.blocks.list.visible);
  h.model.setFrame('1280x720'); assert.equal(h.doc.playlist.group.x, 80);
  assert.equal(h.doc.playlist.scrollSpeed, 42); assert(h.doc.playlist.autoScroll);
  const exported = JSON.parse(h.model.serialized);
  h.model.reset(); assert.notEqual(h.doc.playlist.group.x, 80); assert.equal(h.doc.playlist.layout, 'unified');
  h.model.importLayout(exported); assert.equal(h.model.serialized, JSON.stringify(exported));
  assert.throws(() => h.model.importLayout({ version: 2 }));
  const before = h.model.serialized; h.model.setFrame('NaNx900'); assert.equal(h.model.serialized, before);
  h.model.setTarget('lyrics'); h.model.center('top-center'); assert.equal(h.doc.lyricCompact.y, 0);
  h.model.center('bottom-center'); assert.equal(h.doc.lyricCompact.y + h.doc.lyricCompact.h, 720);
  h.model.setAspectLocked(false); assert.deepEqual(h.prefs.at(-1), ['aspectLock', 'false']);
});
async function pointerHarness() {
  const h = await harness(); let captured;
  const element = { setPointerCapture(id) { captured = id; }, hasPointerCapture: id => id === captured,
    releasePointerCapture() { captured = null; } };
  const node = { dataset: { hit: 'current' }, closest: selector => selector === '[data-hit]' ? node : null };
  const pointer = h.createOverlayPointer({ model: h.model, element, scale: () => .5, platform: h.time.platform, now: h.time.now });
  const event = (x, y, type = 'pointermove') => ({ type, clientX: x, clientY: y, pointerId: 7, button: 0, target: node, preventDefault() {} });
  return { ...h, pointer, event, get captured() { return captured; } };
}
test('pointer coalesces moves to RAF and flushes the final pointerup before commit', async () => {
  const h = await pointerHarness(); h.pointer.start(h.event(100, 100, 'pointerdown'));
  for (let n = 1; n <= 20; n++) h.pointer.move(h.event(100 + n, 100 + n));
  assert.equal(h.events.filter(e => e.kind === 'preview').length, 0);
  assert.equal(h.time.jobs.size, 1); h.time.advance(16);
  assert.equal(h.events.filter(e => e.kind === 'preview').length, 1);
  h.pointer.move(h.event(125, 125)); h.pointer.end(h.event(130, 130, 'pointerup'));
  assert.equal(h.model.getSnapshot().document.playlist.blocks.current.x, 148);
  assert.equal(h.writes.length, 1); assert.equal(h.captured, null); assert.equal(h.time.jobs.size, 0);
  h.pointer.dispose(); h.model.dispose();
});
test('pointercancel, lost capture and disposal roll back and release queued frames', async () => {
  for (const type of ['pointercancel', 'lostpointercapture', 'dispose', 'selection']) {
    const h = await pointerHarness(), before = h.model.serialized;
    h.pointer.start(h.event(100, 100, 'pointerdown')); h.pointer.move(h.event(200, 200));
    if (type === 'dispose') h.pointer.dispose();
    else if (type === 'selection') h.model.select('next');
    else h.pointer.end(h.event(200, 200, type));
    h.time.advance(1000); assert.equal(h.model.serialized, before);
    assert.equal(h.pointer.active, false); assert.equal(h.writes.length, 0); assert.equal(h.captured, null);
    assert.equal(h.time.jobs.size, 0); h.pointer.dispose(); h.model.dispose();
  }
});
