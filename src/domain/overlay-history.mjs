/** Bounded history of committed version-1 layout strings. Transient drags never enter it. */
export function createOverlayHistory(limit = 30) {
  const past = [], future = [];
  function push(list, value) { list.push(value); if (list.length > limit) list.shift(); }
  return {
    record(before) { push(past, before); future.length = 0; },
    undo(current) { if (!past.length) return null; push(future, current); return past.pop(); },
    redo(current) { if (!future.length) return null; push(past, current); return future.pop(); },
    get canUndo() { return past.length > 0; }, get canRedo() { return future.length > 0; }
  };
}
