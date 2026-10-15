import { createRoot } from 'react-dom/client';

// During migration, legacy Studio moves existing containers between workspaces.
// Keep one root per container and release a replaced root before mounting another.
const roots = new Map();
export function mountView(name, element, view) {
  if (!element) return;
  const old = roots.get(name);
  if (old?.element === element) return;
  old?.root.unmount();
  const root = createRoot(element);
  roots.set(name, {
    element,
    root
  });
  root.render(view);
}
export function disposeViews() {
  // Child roots were inserted after parent roots; dispose them first.
  for (const {
    root
  } of [...roots.values()].reverse()) root.unmount();
  roots.clear();
}
