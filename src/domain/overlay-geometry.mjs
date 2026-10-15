import { clone, defaults, normalize } from './overlay-layout.mjs';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const finite = n => Number.isFinite(n) ? n : 0;
export const resizeDirections = Object.freeze(['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']);

/** Absolute displacement from the gesture's initial rectangle, in canvas pixels. */
export function moveRect(original, dx, dy, frame) {
  return { ...original, x: clamp(original.x + finite(dx), 0, frame.width - original.w),
    y: clamp(original.y + finite(dy), 0, frame.height - original.h) };
}

/** Keep the opposite edge/corner fixed; a locked side handle scales about its centre. */
export function resizeRect(original, dir, dx, dy, locked, frame) {
  if (!resizeDirections.includes(dir)) return { ...original };
  dx = finite(dx); dy = finite(dy);
  const { x, y, w, h } = original;
  const west = dir.includes('w'), east = dir.includes('e'), north = dir.includes('n'), south = dir.includes('s');
  if (locked) {
    const sx = west ? -1 : east ? 1 : 0, sy = north ? -1 : south ? 1 : 0;
    const ax = west ? x + w : east ? x : x + w / 2;
    const ay = north ? y + h : south ? y : y + h / 2;
    const factor = 1 + (sx && sy ? (sx * dx * w + sy * dy * h) / (w * w + h * h) : sx ? sx * dx / w : sy * dy / h);
    const maxW = west ? ax : east ? frame.width - ax : 2 * Math.min(ax, frame.width - ax);
    const maxH = north ? ay : south ? frame.height - ay : 2 * Math.min(ay, frame.height - ay);
    const amount = clamp(factor, Math.max(32 / w, 32 / h), Math.min(maxW / w, maxH / h));
    const nw = w * amount, nh = h * amount;
    return { ...original, x: west ? ax - nw : east ? ax : ax - nw / 2,
      y: north ? ay - nh : south ? ay : ay - nh / 2, w: nw, h: nh };
  }
  const right = x + w, bottom = y + h;
  const nx = west ? clamp(x + dx, 0, right - 32) : x;
  const ny = north ? clamp(y + dy, 0, bottom - 32) : y;
  return { ...original, x: nx, y: ny,
    w: (east ? clamp(right + dx, nx + 32, frame.width) : right) - nx,
    h: (south ? clamp(bottom + dy, ny + 32, frame.height) : bottom) - ny };
}

/** Numeric width/height edits retain the existing top-left anchor. */
export function resizeDimension(original, key, value, locked, frame) {
  if (!['w', 'h'].includes(key) || !Number.isFinite(value)) return { ...original };
  if (!locked) return { ...original, [key]: clamp(value, 32, (key === 'w' ? frame.width - original.x : frame.height - original.y)) };
  const amount = clamp(value / original[key], Math.max(32 / original.w, 32 / original.h),
    Math.min((frame.width - original.x) / original.w, (frame.height - original.y) / original.h));
  return { ...original, w: original.w * amount, h: original.h * amount };
}

export function scaleLayout(layout, width, height) {
  const next = clone(layout), sx = width / next.width, sy = height / next.height;
  for (const b of [next.lyric, next.lyricCompact, next.playlist.group, ...Object.values(next.playlist.blocks)]) {
    b.x *= sx; b.y *= sy; b.w *= sx; b.h *= sy;
    if (b.size) b.size *= Math.min(sx, sy);
  }
  next.width = width; next.height = height;
  return normalize(next);
}

/** Presets preserve group arrangement and scrolling preferences; reset restores geometry. */
export function presetLayout(layout, theme, reset = false) {
  const next = clone(layout), preset = scaleLayout(defaults(theme), next.width, next.height).playlist;
  for (const key of ['layout', 'autoScroll', 'scrollSpeed', 'scrollPause']) preset[key] = next.playlist[key];
  if (!reset) preset.group = clone(next.playlist.group);
  if (preset.layout === 'unified') preset.blocks.list.visible = true;
  next.playlist = preset;
  return normalize(next);
}
