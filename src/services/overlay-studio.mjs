import { clone, compactLyrics, normalize } from '../domain/overlay-layout.mjs';
import { moveRect, resizeRect, resizeDimension, scaleLayout, presetLayout } from '../domain/overlay-geometry.mjs';
import { createOverlayHistory } from '../domain/overlay-history.mjs';
import { createLifecycle } from './lifecycle.mjs';

const geometryFields = new Set(['x', 'y', 'w', 'h']);
const textFields = new Set(['size', 'label', 'align', 'bold', 'visible']);
const appearanceFields = new Set(['foreground', 'accent', 'background', 'opacity', 'radius', 'font',
  'limit', 'listMode', 'numbering', 'progress', 'hideIdle', 'autoScroll', 'scrollSpeed', 'scrollPause']);
function freeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value); for (const child of Object.values(value)) freeze(child);
  }
  return value;
}

/** Application model. Browser measurement and persistence enter through explicit ports. */
export function createOverlayStudio({ repository, preferences, getScene = () => ({}),
  measureLyrics = (layout, scene) => compactLyrics(scene) ? layout.lyricCompact : layout.lyric,
  platform = globalThis, now = () => performance.now() } = {}) {
  const lifecycle = createLifecycle(platform, now), history = createOverlayHistory(), listeners = new Set();
  let initial;
  try { initial = repository?.load().value; } catch (_) { /* Keep recovery in the repository. */ }
  let document = freeze(normalize(initial)), committed = document, serialized = JSON.stringify(document);
  let target = 'playlist', selected = 'current', aspectLocked = true, gesture = null;
  try { aspectLocked = preferences?.get('aspectLock') !== 'false'; } catch (_) {}
  let dirty = false, saveError = null, cancelSave, snapshot;
  function publish(kind, detail) {
    snapshot = Object.freeze({ document, target, selected, aspectLocked, serialized, dirty, saveError,
      canUndo: history.canUndo, canRedo: history.canRedo, dragging: !!gesture });
    for (const listener of listeners) listener(snapshot, { kind, ...detail });
  }
  function unified() { return target === 'playlist' && document.playlist.layout === 'unified'; }
  function compact() { return compactLyrics(getScene()); }
  function slot(layout = document, lyricCompact = compact()) {
    return target === 'lyrics' ? lyricCompact ? layout.lyricCompact : layout.lyric
      : layout.playlist.layout === 'unified' ? layout.playlist.group : layout.playlist.blocks[selected];
  }
  function displayRect() {
    const rect = target === 'lyrics' ? measureLyrics(document, getScene()) : slot();
    // Measurement may return the stored object; callers always receive a read-only copy.
    return freeze({ ...rect });
  }
  function textRect() { return target === 'lyrics' ? slot() : document.playlist.blocks[selected]; }
  function editable(layout) {
    const rect = slot(layout);
    if (target === 'lyrics' && compact()) Object.assign(rect, displayRect(), { autoFit: false });
    return rect;
  }
  function flush() {
    if (lifecycle.disposed) return !dirty;
    cancelSave?.(); cancelSave = null;
    if (!dirty) return true;
    let result;
    try { result = repository?.save(clone(committed)); } catch (error) { result = { ok: false, error }; }
    if (result?.ok) { dirty = false; saveError = null; }
    else saveError = result?.error || new Error('Layout storage unavailable');
    publish('saved', { ok: !dirty });
    return !dirty;
  }
  function commit(next, { record = true, immediate = false } = {}) {
    next = freeze(normalize(next));
    const value = JSON.stringify(next);
    document = next;
    if (value === serialized) { publish('view'); return false; }
    if (record) history.record(serialized);
    committed = document; serialized = value; dirty = true;
    cancelSave?.(); cancelSave = lifecycle.timeout(flush, 250);
    publish('document');
    if (immediate) flush();
    return true;
  }
  function cancelGesture() {
    if (!gesture) return false;
    document = committed; gesture = null; publish('cancel'); return true;
  }
  function change(mutator, options) {
    if (lifecycle.disposed) return false;
    cancelGesture();
    const next = clone(document);
    mutator(next);
    return commit(next, options);
  }
  function restoreView(view) {
    if (!view || lifecycle.disposed) return;
    cancelGesture();
    target = view.target === 'lyrics' ? 'lyrics' : 'playlist';
    selected = target === 'lyrics' ? 'lyric' : ['current', 'list', 'next'].includes(view.selected) ? view.selected : 'current';
    publish('view');
  }
  function transform(dx, dy, dir = '') {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return false;
    return change(next => {
      const original = displayRect(), rect = editable(next);
      Object.assign(rect, dir ? resizeRect(original, dir, dx, dy, aspectLocked, next) : moveRect(original, dx, dy, next));
      if (target === 'lyrics' && compact()) rect.autoFit = false;
    });
  }
  publish('init');
  return {
    getSnapshot: () => snapshot,
    subscribe(fn) { if (lifecycle.disposed) return () => {}; listeners.add(fn); return () => listeners.delete(fn); },
    get serialized() { return serialized; }, get dragging() { return !!gesture; },
    unified, compact, displayRect, textRect,
    setTarget(name) { restoreView({ target: name, selected }); },
    select(name) {
      if (lifecycle.disposed || !['current', 'list', 'next', 'lyric', 'group'].includes(name)) return;
      if ((target === 'lyrics') !== (name === 'lyric')) { if (name !== 'group') return; }
      cancelGesture(); if (name !== 'group') selected = name; publish('view');
    },
    restoreView,
    setAspectLocked(value) {
      if (lifecycle.disposed) return;
      cancelGesture(); aspectLocked = !!value;
      try { preferences?.set('aspectLock', String(aspectLocked)); } catch (_) {}
      publish('view');
    },
    setFrame(value) {
      const [w, h] = String(value).split('x').map(Number);
      if (!Number.isFinite(w) || !Number.isFinite(h) || w < 320 || w > 3840 || h < 240 || h > 2160) return false;
      return change(next => Object.assign(next, scaleLayout(next, w, h)));
    },
    preset(theme) { return change(next => Object.assign(next, presetLayout(next, theme))); },
    reset() {
      return change(next => {
        if (target !== 'lyrics') Object.assign(next, presetLayout(next, next.playlist.theme, true));
        else if (compact()) next.lyricCompact = { x: 0, y: next.height - Math.min(240, next.height),
          w: next.width, h: Math.min(240, next.height), visible: true, autoFit: true };
        else next.lyric = { x: 0, y: 0, w: next.width, h: next.height, visible: true };
      });
    },
    center(position) {
      if (!['center', 'top-center', 'bottom-center'].includes(position)) return false;
      return change(next => {
        const rect = editable(next); rect.x = (next.width - rect.w) / 2;
        rect.y = position === 'top-center' ? 0 : position === 'bottom-center' ? next.height - rect.h : (next.height - rect.h) / 2;
      });
    },
    setLayout(value) {
      return change(next => {
        next.playlist.layout = value;
        if (value === 'unified') for (const rect of Object.values(next.playlist.blocks)) rect.visible = true;
      });
    },
    setAutoFit(value) { return change(next => Object.assign(next.lyricCompact, displayRect(), { autoFit: !!value })); },
    setField(key, value) {
      if (!geometryFields.has(key) && !textFields.has(key)) return false;
      if ((geometryFields.has(key) || key === 'size') && !Number.isFinite(value)) return false;
      return change(next => {
        const rect = geometryFields.has(key) ? editable(next) : target === 'lyrics' ? slot(next) : next.playlist.blocks[selected];
        if (key === 'w' || key === 'h') Object.assign(rect, resizeDimension(rect, key, value, aspectLocked, next));
        else rect[key] = value;
      });
    },
    setAppearance(key, value) {
      if (!appearanceFields.has(key)) return false;
      return change(next => { next.playlist[key] = value; });
    },
    importLayout(raw) {
      if (!raw || raw.version !== 1 || !raw.playlist || !raw.lyric) throw new Error('Invalid overlay layout');
      return change(next => Object.assign(next, normalize(raw)));
    },
    undo() {
      if (lifecycle.disposed) return false;
      cancelGesture(); const before = history.undo(serialized);
      return before == null ? false : commit(before, { record: false, immediate: true });
    },
    redo() {
      if (lifecycle.disposed) return false;
      cancelGesture(); const after = history.redo(serialized);
      return after == null ? false : commit(after, { record: false, immediate: true });
    },
    transform,
    beginGesture(direction = '') {
      if (lifecycle.disposed) return false;
      cancelGesture();
      gesture = { rect: clone(displayRect()), direction, locked: aspectLocked, compact: compact() };
      publish('gesture'); return true;
    },
    moveGesture(dx, dy) {
      if (!gesture || lifecycle.disposed || !Number.isFinite(dx) || !Number.isFinite(dy)) return false;
      if (gesture.compact !== compact()) { cancelGesture(); return false; }
      // Each move starts from the original committed document, so moving back restores auto-fit too.
      const next = clone(committed);
      if (dx || dy) {
        const rect = slot(next, gesture.compact);
        Object.assign(rect, gesture.direction
          ? resizeRect(gesture.rect, gesture.direction, dx, dy, gesture.locked, next)
          : moveRect(gesture.rect, dx, dy, next));
        if (target === 'lyrics' && gesture.compact) rect.autoFit = false;
      }
      document = freeze(next); publish('preview'); return true;
    },
    endGesture() {
      if (!gesture || lifecycle.disposed) return false;
      if (gesture.compact !== compact()) { cancelGesture(); return false; }
      gesture = null; return commit(document, { immediate: true });
    },
    cancelGesture,
    flush,
    dispose() {
      if (lifecycle.disposed) return;
      cancelGesture(); flush(); lifecycle.dispose(); listeners.clear();
    }
  };
}
