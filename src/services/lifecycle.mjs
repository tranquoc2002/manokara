/** Own timers/listeners in one scope. Disposal is terminal; suspension is reversible. */
export function createLifecycle(platform = globalThis, now = () => performance.now()) {
  const timers = new Set(),
    cleanups = new Set();
  const listeners = new Set();
  const abort = new AbortController();
  let disposed = false,
    suspended = false;
  function cancel(record) {
    if (record.handle != null) platform[record.kind === 'interval' ? 'clearInterval' : record.kind === 'frame' ? 'cancelAnimationFrame' : 'clearTimeout'](record.handle);
    record.handle = null;
  }
  function arm(record) {
    if (disposed || suspended || !timers.has(record)) return;
    const callback = () => {
      if (disposed || suspended || !timers.has(record)) return;
      if (record.kind !== 'interval') {
        timers.delete(record);
        record.handle = null;
      }
      record.callback();
    };
    if (record.kind === 'interval') record.handle = platform.setInterval(callback, record.ms);else if (record.kind === 'frame') record.handle = platform.requestAnimationFrame(callback);else {
      record.due = now() + record.remaining;
      record.handle = platform.setTimeout(callback, record.remaining);
    }
  }
  function schedule(kind, callback, ms = 0) {
    if (disposed) return () => {};
    const record = {
      kind,
      callback,
      ms,
      remaining: ms,
      handle: null
    };
    timers.add(record);
    arm(record);
    return () => {
      cancel(record);
      timers.delete(record);
    };
  }
  function own(cleanup) {
    if (disposed) {
      cleanup();
      return () => {};
    }
    cleanups.add(cleanup);
    return () => {
      if (cleanups.delete(cleanup)) cleanup();
    };
  }
  function listen(target, type, callback, options) {
    unlisten(target, type, callback, options);
    let attached = true;
    const guarded = (...args) => {
      if (attached && !disposed && !suspended) callback(...args);
    };
    target.addEventListener(type, guarded, options);
    const record = {
      target,
      type,
      callback,
      capture: typeof options === 'boolean' ? options : !!options?.capture
    };
    const remove = own(() => {
      attached = false;
      target.removeEventListener(type, guarded, {
        capture: record.capture
      });
      listeners.delete(record);
    });
    record.remove = remove;
    if (!disposed) listeners.add(record);
    return remove;
  }
  function unlisten(target, type, callback, options) {
    const capture = typeof options === 'boolean' ? options : !!options?.capture;
    for (const record of listeners) if (record.target === target && record.type === type && record.callback === callback && record.capture === capture) record.remove();
  }
  function suspend() {
    if (disposed || suspended) return;
    suspended = true;
    for (const record of timers) {
      if (record.kind === 'timeout') record.remaining = Math.max(0, record.due - now());
      cancel(record);
    }
  }
  function resume() {
    if (disposed || !suspended) return;
    suspended = false;
    for (const record of timers) arm(record);
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    abort.abort();
    for (const record of timers) cancel(record);
    timers.clear();
    for (const cleanup of cleanups) {
      try {
        cleanup();
      } catch (_) {}
    }
    cleanups.clear();
  }
  return {
    interval: (callback, ms) => schedule('interval', callback, ms),
    timeout: (callback, ms) => schedule('timeout', callback, ms),
    frame: callback => schedule('frame', callback),
    own,
    listen,
    unlisten,
    suspend,
    resume,
    dispose,
    signal: abort.signal,
    get disposed() {
      return disposed;
    },
    get suspended() {
      return suspended;
    },
    get timerCount() {
      return timers.size;
    },
    get activeTimerCount() {
      return [...timers].filter(record => record.handle != null).length;
    },
    get cleanupCount() {
      return cleanups.size;
    }
  };
}
