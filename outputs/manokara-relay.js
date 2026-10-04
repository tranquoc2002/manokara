/* Live, authenticated OBS updates; streaming with bounded polling fallback. */
(() => {
  'use strict';
  function connect({url, token, receive, revoked}) {
    const latency = ManokaraCore.createLatencyEstimator();
    const headers = token ? {Authorization:'Bearer ' + token} : {};
    let stopped = false, controller, scene, retryTimer, watchdog, probeTimer;
    const deliver = (next, delay = latency.oneWay()) => { scene = next; receive(next, delay); };
    const stop = () => { stopped = true; controller?.abort(); clearTimeout(retryTimer); clearInterval(watchdog); clearInterval(probeTimer); };
    const invalid = response => response.status === 401 || response.status === 404;
    async function probe() {
      const started = performance.now();
      try {
        const r = await fetch('/healthz', {cache:'no-store', credentials:'omit', signal:AbortSignal.timeout(4000)});
        if (r.ok) { await r.json(); latency.record(performance.now() - started); }
      } catch (_) {}
    }
    async function poll() {
      const started = performance.now();
      const r = await fetch(url, {headers, cache:'no-store', credentials:'omit', signal:AbortSignal.timeout(4000)});
      if (invalid(r)) { stop(); revoked(); return; }
      if (r.ok) { const next = await r.json(); latency.record(performance.now() - started); if (!stopped) deliver(next); }
    }
    async function stream() {
      if (stopped) return;
      controller = new AbortController();
      let lastChunk = performance.now();
      watchdog = setInterval(() => { if (performance.now() - lastChunk > 12000) controller.abort(); }, 2000);
      try {
        const target = new URL(url, location.href); target.searchParams.set('stream', '1');
        const r = await fetch(target, {headers, cache:'no-store', credentials:'omit', signal:controller.signal});
        if (invalid(r)) { stop(); revoked(); return; }
        if (!r.ok || !r.headers.get('content-type')?.includes('text/event-stream') || !r.body) throw Error('stream unavailable');
        const reader = r.body.getReader(), decoder = new TextDecoder();
        let buffer = '';
        while (!stopped) {
          const {value, done} = await reader.read();
          if (done) break;
          lastChunk = performance.now(); buffer += decoder.decode(value, {stream:true});
          let boundary, newest;
          while ((boundary = buffer.indexOf('\n\n')) >= 0) {
            const event = buffer.slice(0,boundary); buffer = buffer.slice(boundary+2);
            if (event.startsWith('event: revoked')) { stop(); revoked(); return; }
            const data = event.split('\n').filter(line => line.startsWith('data: ')).map(line => line.slice(6)).join('\n');
            if (data) { const packet = JSON.parse(data); scene = packet.state || {...scene, ...packet.patch}; newest = scene; }
          }
          // Several buffered events should cause one render, never replay old frames.
          if (newest && !stopped) deliver(newest);
          if (buffer.length > 300000) throw Error('oversized relay event');
        }
      } catch (_) {} finally {
        controller.abort(); clearInterval(watchdog);
        if (!stopped) retryTimer = setTimeout(fallback, 200);
      }
    }
    let failures = 0;
    async function fallback() {
      if (stopped) return;
      try { await poll(); } catch (_) {}
      if (stopped) return;
      if (++failures % 10 === 0) stream();
      else retryTimer = setTimeout(fallback, 200);
    }
    (async () => { try { await poll(); } catch (_) {} if (!stopped) stream(); })();
    probeTimer = setInterval(probe, 15000);
    window.addEventListener('pagehide', stop, {once:true});
    return {stop, latency:() => latency.oneWay()};
  }
  globalThis.ManokaraRelay = {connect};
})();
