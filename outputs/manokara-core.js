/* Shared lyric parsing and playback clock for the controller and every output. */
(() => {
  'use strict';
  function parseLyrics(raw, duration = 180) {
    const all = [];
    let timed = false;
    let offset = 0;
    for (const line of String(raw || '').split(/\r?\n/)) {
      const offsetMatch = line.match(/\[offset:([+-]?\d+)\]/i);
      if (offsetMatch) offset = Number(offsetMatch[1]) / 1000;
      const stamps = [...line.matchAll(/\[(\d+):(\d{2}(?:\.\d+)?)\]/g)];
      const x = line.replace(/\[[^\]]*\]|<[^>]*>/g, '').trim();
      if (stamps.length) {
        timed = true;
        for (const m of stamps) all.push({ t: Number(m[1]) * 60 + Number(m[2]), x });
      } else if (x) all.push({ t: null, x });
    }
    const span = Math.max(1, Number(duration) || 180);
    if (!timed) all.forEach((line, i) => { line.t = i * span / all.length; });
    else all.forEach(line => { if (line.t !== null) line.t += offset; });
    return { all, timed, lines: all.filter(line => line.t !== null).sort((a, b) => a.t - b.t) };
  }

  function timeValue(value) {
    const text = String(value || '').trim();
    if (!text) return null;
    if (!/^\d+(?::\d{1,2})?(?:\.\d+)?$/.test(text)) return NaN;
    const parts = text.split(':');
    if (parts.length === 2 && Number(parts[1]) >= 60) return NaN;
    return parts.length === 2 ? Number(parts[0]) * 60 + Number(parts[1]) : Number(text);
  }

  function youtubeId(value) {
    try {
      const url = new URL(value), host = url.hostname.toLowerCase().replace(/^www\./, '');
      const id = host === 'youtu.be' ? url.pathname.slice(1).split('/')[0]
        : ['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com'].includes(host)
          ? url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] : null;
      return /^[\w-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  }

  function createClock() {
    let anchor = null;
    let receivedAt = 0;
    const nowMs = () => performance.now();
    const elapsed = now => Math.min(15, Math.max(0, now - receivedAt) / 1000);
    const project = (s, now) => Number(s.time || 0) + (s.playing && !s.paused ? elapsed(now) : 0);
    return {
      accept(snapshot, now = nowMs()) {
        const s = { ...snapshot };
        // server age uses the relay's clock, so a second device's wall clock need not match.
        const age = Number.isFinite(s.stateAgeMs) ? Math.min(15000, Math.max(0, s.stateAgeMs)) / 1000 : 0;
        const incoming = Number(s.time) || 0;
        s.time = incoming + (s.playing && !s.paused ? age : 0);
        if (s.counting && !s.paused) s.countdownRemaining = Math.max(0, Number(s.countdownRemaining || 0) - age);
        s.sampledAt = Date.now();
        const sameTimeline = anchor && anchor.title === s.title && anchor.lrc === s.lrc
          && anchor.writerId === s.writerId && anchor.timelineVersion === s.timelineVersion;
        if (sameTimeline && !s.counting && !anchor.counting && anchor.playing && s.playing && !anchor.paused && !s.paused) {
          const expected = project(anchor, now);
          if (Math.abs(expected - s.time) <= 0.35) s.time = expected;
        }
        if (s.stateAgeMs >= 15000) s.playing = false;
        anchor = s;
        receivedAt = now;
        return s;
      },
      time(now = nowMs()) { return anchor ? project(anchor, now) : 0; },
      countdown(now = nowMs()) {
        if (!anchor) return 0;
        return Math.max(0, Number(anchor.countdownRemaining || 0) - (anchor.paused || anchor.stateAgeMs >= 15000 ? 0 : elapsed(now)));
      },
    };
  }
  globalThis.ManokaraCore = { parseLyrics, timeValue, youtubeId, createClock };
})();
