/** Cached immutable snapshots for React. Media time stays in playback/renderer clocks. */
export function createFeatureStore(initial = {}) {
  let snapshot = Object.freeze({
    ...initial
  });
  const listeners = new Set();
  let disposed = false;
  function replace(next) {
    if (disposed || Object.keys(next).length === Object.keys(snapshot).length && Object.keys(next).every(key => Object.is(next[key], snapshot[key]))) return false;
    snapshot = Object.freeze({
      ...next
    });
    for (const listener of [...listeners]) listener();
    return true;
  }
  return {
    getSnapshot: () => snapshot,
    patch: patch => replace({
      ...snapshot,
      ...patch
    }),
    replace,
    subscribe(listener) {
      if (disposed) return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispose() {
      disposed = true;
      listeners.clear();
    },
    get subscriberCount() {
      return listeners.size;
    }
  };
}

/** Late-bound commands let views mount before services, without global lookups. */
export function createCommandRegistry() {
  const groups = new Map(),
    proxies = new Map();
  function actions(group) {
    if (!proxies.has(group)) {
      const methods = new Map();
      proxies.set(group, new Proxy({}, {
        get(_, key) {
          if (typeof key !== 'string' || key === 'then') return undefined;
          if (!methods.has(key)) methods.set(key, (...args) => groups.get(group)?.[key]?.(...args));
          return methods.get(key);
        }
      }));
    }
    return proxies.get(group);
  }
  return {
    actions,
    bind(group, commands) {
      groups.set(group, commands);
      return () => {
        if (groups.get(group) === commands) groups.delete(group);
      };
    },
    dispose() {
      groups.clear();
    }
  };
}
