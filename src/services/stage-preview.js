/* A read-only local feed for the Stage viewer. Snapshot ownership stays with
   the controller; this feed never edits settings or claims the OBS room. */
const subscribers = new Set();
let snapshot = null;
let receivedAt = 0;

export const stagePreview = {
  get active() { return subscribers.size > 0; },
  getSnapshot() {
    return snapshot ? { ...snapshot, stateAgeMs: Math.max(0, performance.now() - receivedAt) } : { ready: false };
  },
  subscribe(listener) {
    subscribers.add(listener);
    listener(stagePreview.getSnapshot());
    return () => subscribers.delete(listener);
  },
  feed(next) {
    snapshot = next;
    receivedAt = performance.now();
    for (const listener of subscribers) listener(stagePreview.getSnapshot());
  },
};

// Existing output documents consume a parent feed with this small interface.
// It carries no viewer token and opens no additional server relay connection.
globalThis.ManokaraStagePreview = {
  getSnapshot: () => stagePreview.getSnapshot(),
  subscribe: listener => stagePreview.subscribe(listener),
};
