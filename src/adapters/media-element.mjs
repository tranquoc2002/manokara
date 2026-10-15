export function createMediaElement({ document = globalThis.document, root }) {
  return {
    create(url, { volume = 100, crossOrigin = false } = {}) {
      const element = document.createElement('video');
      if (crossOrigin) element.crossOrigin = 'anonymous';
      element.src = url; element.controls = true; element.playsInline = true; element.autoplay = false;
      element.volume = Math.max(0, Math.min(100, Number(volume) || 0)) / 100;
      return element;
    },
    mount: element => root().replaceChildren(element),
    clear: () => root().replaceChildren(),
    release(element) {
      if (!element) return;
      try { element.pause(); element.removeAttribute('src'); element.load(); } catch (_) {}
    }
  };
}
