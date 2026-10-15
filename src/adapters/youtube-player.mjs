// One API loader per window, with cancellable subscribers and callback cleanup.
const jobs = new WeakMap();
export function createYouTubePlayer({ window: browser = globalThis.window, document = browser.document, root }) {
  function ready(signal) {
    if (signal?.aborted) return Promise.resolve(false);
    if (browser.YT?.Player) return Promise.resolve(true);
    let job = jobs.get(browser);
    if (!job) {
      const previous = browser.onYouTubeIframeAPIReady;
      const listeners = new Set();
      let script, owned = false, timer, finished = false;
      const finish = ok => {
        if (finished) return;
        finished = true; job.result = ok; browser.clearTimeout(timer);
        if (browser.onYouTubeIframeAPIReady === callback) browser.onYouTubeIframeAPIReady = previous;
        if (!ok && owned) script?.remove();
        script?.removeEventListener('error', failed);
        jobs.delete(browser);
        for (const settle of [...listeners]) settle(ok);
        listeners.clear();
      };
      const callback = () => { try { previous?.(); } finally { finish(!!browser.YT?.Player); } };
      const failed = () => finish(false);
      job = { listeners, finish }; jobs.set(browser, job);
      browser.onYouTubeIframeAPIReady = callback;
      script = document.getElementById('ytapi');
      if (!script) {
        owned = true; script = document.createElement('script');
        script.id = 'ytapi'; script.src = 'https://www.youtube.com/iframe_api';
      }
      script.addEventListener('error', failed, { once: true });
      timer = browser.setTimeout(() => finish(false), 8000);
      if (owned) document.head.append(script);
    }
    if (job.result !== undefined) return Promise.resolve(job.result);
    return new Promise(resolve => {
      let settled = false;
      const settle = ok => { if (settled) return; settled = true; signal?.removeEventListener('abort', cancelled); job.listeners.delete(settle); resolve(ok); };
      const cancelled = () => { settle(false); if (!job.listeners.size) job.finish(false); };
      job.listeners.add(settle);
      signal?.addEventListener('abort', cancelled, { once: true });
      if (signal?.aborted) cancelled();
    });
  }
  function mount() { const node = document.createElement('div'); node.id = 'ytp'; root().replaceChildren(node); return node; }
  return {
    ready, mount,
    create: (node, options) => new browser.YT.Player(node, { width: '100%', height: '100%', ...options }),
    destroy(player) { try { player?.destroy(); } catch (_) {} },
    fallback(id, song) {
      const frame = document.createElement('iframe');
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture'; frame.allowFullscreen = true;
      const url = new URL('https://www.youtube.com/embed/' + id);
      url.searchParams.set('autoplay', '1'); url.searchParams.set('start', String(Math.floor(song.s || 0)));
      if (song.e != null) url.searchParams.set('end', String(Math.ceil(song.e)));
      frame.src = url.href; root().replaceChildren(frame);
    }
  };
}
