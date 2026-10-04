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
      const wordTags = [...line.matchAll(/<(\d+):(\d{2}(?:[.:]\d+)?)>/g)];
      if (stamps.length) {
        timed = true;
        const firstTime = Number(stamps[0][1]) * 60 + Number(stamps[0][2]);
        for (const m of stamps) {
          const t = Number(m[1]) * 60 + Number(m[2]);
          const entry = { t, x };
          if (wordTags.length) entry.words = wordTags.map((tag, i) => ({
            t: Number(tag[1]) * 60 + Number(tag[2].replace(':', '.')) + t - firstTime,
            x: line.slice(tag.index + tag[0].length, wordTags[i + 1]?.index).replace(/\[[^\]]*\]/g, ''),
          }));
          all.push(entry);
        }
      } else if (x) all.push({ t: null, x });
    }
    const span = Math.max(1, Number(duration) || 180);
    if (!timed) all.forEach((line, i) => { line.t = i * span / all.length; });
    else all.forEach(line => { if (line.t !== null) line.t += offset; line.words?.forEach(word => word.t += offset); });
    return { all, timed, lines: all.filter(line => line.t !== null).sort((a, b) => a.t - b.t) };
  }

  // Build Folia's word contract once per lyric edit, preserving real Enhanced LRC timings.
  function foliaLyrics(raw, duration = 180) {
    const parsed = parseLyrics(raw, duration).lines;
    let isWordByWord = false;
    const lines = parsed.map((line, index) => {
      const startTime = Math.max(0, line.t);
      const endTime = Math.max(startTime + .01, parsed[index + 1]?.t ?? (Number(duration) || 180));
      let words;
      if (line.words?.length && line.words.map(word => word.x).join('').trim() === line.x) {
        isWordByWord = true;
        words = line.words.filter(word => word.x).map(word => {
          const next = line.words[line.words.indexOf(word) + 1];
          const start = Math.max(startTime, Math.min(endTime, word.t));
          return {text:word.x, startTime:start, endTime:Math.max(start, Math.min(endTime, next?.t ?? endTime))};
        });
      } else {
        const tokens = line.x.match(/\s+|[^\s]+/gu) || [];
        const span = (endTime - startTime) / Math.max(1, tokens.length);
        words = tokens.map((text, i) => ({text, startTime:startTime + i * span, endTime:i === tokens.length - 1 ? endTime : startTime + (i + 1) * span}));
      }
      return {id:`manokara-${index}`, fullText:line.x, startTime, endTime, words};
    });
    return {lines, isWordByWord};
  }

  function createLatencyEstimator() {
    const samples = [];
    return {
      record(rtt) {
        if (Number.isFinite(rtt) && rtt >= 0 && rtt <= 4000) {
          samples.push(rtt); if (samples.length > 20) samples.shift();
        }
        return this.oneWay();
      },
      oneWay() {
        if (!samples.length) return 0;
        const sorted = [...samples].sort((a,b) => a-b);
        return Math.min(2000, sorted[Math.floor((sorted.length - 1) * .2)] / 2);
      },
    };
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
    let correction = 0;
    const nowMs = () => performance.now();
    const elapsed = now => Math.min(15, Math.max(0, now - receivedAt) / 1000);
    const project = (s, now) => Number(s.time || 0) + (s.playing && !s.paused ? elapsed(now) + correction * (1 - Math.exp(-elapsed(now) / 1.5)) : 0);
    return {
      accept(snapshot, now = nowMs(), transitMs = 0) {
        const s = { ...snapshot };
        // server age uses the relay's clock, so a second device's wall clock need not match.
        const age = Math.min(15000, (Number.isFinite(s.stateAgeMs) ? Math.max(0, s.stateAgeMs) : 0) + Math.max(0, Math.min(2000, Number(transitMs) || 0))) / 1000;
        const incoming = Number(s.time) || 0;
        s.time = incoming + (s.playing && !s.paused ? age : 0);
        if (s.counting && !s.paused) s.countdownRemaining = Math.max(0, Number(s.countdownRemaining || 0) - age);
        s.sampledAt = Date.now();
        const sameTimeline = anchor && anchor.title === s.title && anchor.lrc === s.lrc
          && anchor.writerId === s.writerId && anchor.timelineVersion === s.timelineVersion;
        let nextCorrection = 0;
        if (sameTimeline && !s.counting && !anchor.counting && anchor.playing && s.playing && !anchor.paused && !s.paused) {
          const expected = project(anchor, now);
          if (Math.abs(expected - s.time) <= 0.35) { nextCorrection = s.time - expected; s.time = expected; }
        }
        if (s.stateAgeMs >= 15000) s.playing = false;
        anchor = s;
        correction = nextCorrection;
        receivedAt = now;
        return s;
      },
      time(now = nowMs()) { return anchor ? project(anchor, now) : 0; },
      age(now = nowMs()) { return anchor ? Math.max(0, now - receivedAt) + (Number(anchor.stateAgeMs) || 0) : Infinity; },
      countdown(now = nowMs()) {
        if (!anchor) return 0;
        return Math.max(0, Number(anchor.countdownRemaining || 0) - (anchor.paused || anchor.stateAgeMs >= 15000 ? 0 : elapsed(now)));
      },
    };
  }
  globalThis.ManokaraCore = { parseLyrics, foliaLyrics, timeValue, youtubeId, createClock, createLatencyEstimator };
})();
