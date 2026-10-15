import { useSyncExternalStore } from 'react';
import { appRuntime } from '../app/feature-runtime.mjs';
export function useFeature(name) {
  const store = appRuntime.stores[name];
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
export function useSongDraft() {
  const store = appRuntime.draft;
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
