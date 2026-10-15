import { createLifecycle } from '../../services/lifecycle.mjs';

/** Pointer/RAF adapter. Coordinates and capture stay out of the layout model. */
export function createOverlayPointer({ model, element, scale, focus = () => {}, platform = globalThis,
  now = () => performance.now() }) {
  const lifecycle = createLifecycle(platform, now);
  let active = null, pending = null, cancelFrame = null;
  function clearFrame() { cancelFrame?.(); cancelFrame = null; pending = null; }
  function release() {
    const pointer = active?.pointer; active = null; clearFrame();
    if (pointer != null && element.hasPointerCapture(pointer)) element.releasePointerCapture(pointer);
  }
  function flush() {
    cancelFrame?.(); cancelFrame = null;
    const point = pending; pending = null;
    if (active && point) model.moveGesture((point.x - active.x) / active.scale, (point.y - active.y) / active.scale);
  }
  function cancel() { release(); model.cancelGesture(); }
  const unsubscribe = model.subscribe(snapshot => { if (active && !snapshot.dragging) release(); });
  return {
    get active() { return !!active; },
    start(event) {
      const hit = event.target.closest('[data-hit]');
      if (!hit || event.button !== 0 || lifecycle.disposed) return;
      const factor = scale(); if (!(factor > 0)) return;
      event.preventDefault(); cancel(); model.select(hit.dataset.hit);
      const direction = event.target.closest('[data-resize]')?.dataset.resize || '';
      if (!model.beginGesture(direction)) return;
      active = { pointer: event.pointerId, x: event.clientX, y: event.clientY, scale: factor };
      try { element.setPointerCapture(event.pointerId); } catch (_) { cancel(); }
    },
    move(event) {
      if (!active || active.pointer !== event.pointerId) return;
      pending = { x: event.clientX, y: event.clientY };
      if (!cancelFrame) cancelFrame = lifecycle.frame(flush);
    },
    end(event) {
      if (!active || active.pointer !== event.pointerId) return;
      if (event.type !== 'pointerup') { cancel(); return; }
      pending = { x: event.clientX, y: event.clientY };
      flush(); release(); model.endGesture(); focus();
    },
    cancel,
    dispose() { cancel(); unsubscribe(); lifecycle.dispose(); }
  };
}
