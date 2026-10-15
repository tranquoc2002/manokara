/** Monotonic fallback/countdown clocks; wall-clock timestamps belong to the relay. */
export function createPlaybackClock(now = () => performance.now()) {
  let position = 0, anchor = null, left = 0, countdownAnchor = null;
  let audioVersion = 0, timelineVersion = 1;
  const elapsed = () => position + (anchor == null ? 0 : Math.max(0, now() - anchor) / 1000);
  const remaining = () => Math.max(0, left - (countdownAnchor == null ? 0 : Math.max(0, now() - countdownAnchor) / 1000));
  return {
    reset() { position = 0; anchor = null; left = 0; countdownAnchor = null; audioVersion++; timelineVersion++; },
    start(positionSec = 0) { position = Number(positionSec) || 0; anchor = now(); },
    pause() { position = elapsed(); anchor = null; left = remaining(); countdownAnchor = null; },
    resume({ fallback = true, countdown = false } = {}) { if (fallback && anchor == null) anchor = now(); if (countdown && countdownAnchor == null) countdownAnchor = now(); },
    countdown(seconds) { left = Math.max(0, Number(seconds) || 0); countdownAnchor = now(); },
    finishCountdown() { left = 0; countdownAnchor = null; },
    elapsed, remaining,
    seek() { audioVersion++; timelineVersion++; },
    lyricsChanged() { timelineVersion++; },
    get running() { return anchor != null; },
    get audioVersion() { return audioVersion; }, get timelineVersion() { return timelineVersion; }
  };
}

export function audiblePosition(position, { delay = 0, rate = 1 } = {}) {
  return Math.max(0, (Number(position) || 0) - Math.max(0, Number(delay) || 0) * Math.max(.01, Number(rate) || 1));
}

export function isTimeDiscontinuity(previous, next, threshold = .8) {
  if (!previous) return false;
  const expected = previous.playing ? Math.max(0, next.now - previous.now) / 1000 * previous.rate : 0;
  return Math.abs(next.position - previous.position - expected) > threshold;
}
