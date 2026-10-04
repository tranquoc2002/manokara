import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import './i18n/config';
import './index.css';
import './manokara-folia.css';
import ObsWebSourceApp from './components/obs/ObsWebSourceApp';
import type { ObsWebAppearance } from './utils/obsWebAppearance';
import type { Line, LyricData, Theme } from './types';
import type { WebLyricSource, WebLyricSourceState } from './types/webLyricSource';

// The upstream visualizer's Pixi runtime expects the browser Buffer polyfill.
(globalThis as typeof globalThis & { Buffer?: typeof Buffer }).Buffer ??= Buffer;

type ManokaraSnapshot = {
  ready?: boolean; title?: string; lrc?: string; time?: number; sampledAt?: number;
  playing?: boolean; paused?: boolean; duration?: number; size?: number;
  foreground?: string; font?: string; bold?: boolean; effect?: string;
};

const VALID_MODES = new Set([
  'cadenza','cappella','claddagh','classic','diorama','fume','lumiere',
  'monet','partita','pendolo','sonnet','tempera','tilt',
]);

function parseLrc(raw: string, fallbackDuration: number): LyricData {
  const parsed: Array<{ startTime: number; fullText: string }> = [];
  let hasTimes = false;
  for (const sourceLine of String(raw || '').split(/\r?\n/)) {
    const stamps = [...sourceLine.matchAll(/\[(\d+):(\d{2}(?:\.\d+)?)\]/g)];
    const fullText = sourceLine.replace(/\[[^\]]*\]|<[^>]*>/g, '').trim();
    if (!fullText) continue;
    if (stamps.length) {
      hasTimes = true;
      for (const stamp of stamps) parsed.push({ startTime: Number(stamp[1]) * 60 + Number(stamp[2]), fullText });
    } else {
      parsed.push({ startTime: Number.NaN, fullText });
    }
  }
  if (!hasTimes) {
    const span = Math.max(1, Number(fallbackDuration) || 180) / Math.max(1, parsed.length);
    parsed.forEach((line, index) => { line.startTime = index * span; });
  }
  const timedLines = hasTimes ? parsed.filter((line) => Number.isFinite(line.startTime)) : parsed;
  timedLines.sort((a, b) => a.startTime - b.startTime);
  const duration = Math.max(1, Number(fallbackDuration) || 180);
  const lines: Line[] = timedLines.map((line, index) => {
    const next = timedLines[index + 1]?.startTime;
    const startTime = Math.max(0, line.startTime);
    const endTime = Math.max(startTime + 1.5, Number.isFinite(next) ? next : duration);
    const tokens = line.fullText.match(/\s+|[^\s]+/gu) || [line.fullText];
    const wordSpan = (endTime - startTime) / Math.max(1, tokens.length);
    let cursor = startTime;
    const words = tokens.map((text, wordIndex) => {
      const end = wordIndex === tokens.length - 1 ? endTime : cursor + wordSpan;
      const word = { text, startTime: cursor, endTime: Math.max(cursor + 0.01, end) };
      cursor = end;
      return word;
    });
    return { id: `manokara-${index}`, fullText: line.fullText, startTime, endTime, words };
  });
  return { lines, isWordByWord: false };
}

const emptyState: WebLyricSourceState = {
  connectionStatus: 'connecting', playerState: 'idle', track: null, lyrics: null,
  clock: { positionSec: 0, durationSec: 0, anchoredAtMs: 0, playing: false },
};

function FoliaBridge() {
  const latest = useRef<ManokaraSnapshot>({});
  const [snapshot, setSnapshot] = useState<ManokaraSnapshot | null>(null);
  const signature = useRef('');

  useEffect(() => {
    let alive = true;
    const poll = async () => {
      try {
        const response = await fetch('/__lyric-state', { cache: 'no-store' });
        if (!response.ok) return;
        const next = await response.json() as ManokaraSnapshot;
        if (!alive || !next?.ready) return;
        latest.current = next;
        const key = [next.title,next.lrc,next.duration,next.playing,next.paused,next.effect,next.size,next.foreground,next.font,next.bold].join('|');
        if (key !== signature.current) { signature.current = key; setSnapshot(next); }
      } catch { /* The main app shows relay status; retry on the next poll. */ }
    };
    void poll();
    const timer = window.setInterval(poll, 180);
    return () => { alive = false; window.clearInterval(timer); };
  }, []);

  const modeCandidate = String(snapshot?.effect || '').replace(/^folia-/, '');
  const mode = VALID_MODES.has(modeCandidate) ? modeCandidate : 'classic';
  const lines = useMemo(() => parseLrc(snapshot?.lrc || '', Number(snapshot?.duration) || 180), [snapshot?.lrc, snapshot?.duration]);
  const theme = useMemo<Theme>(() => {
    const font = String(snapshot?.font || 'system-ui, sans-serif').split(',')[0].replace(/["']/g, '').trim();
    const foreground = /^#[0-9a-f]{6}$/i.test(String(snapshot?.foreground || '')) ? String(snapshot?.foreground) : '#ffffff';
    return {
      name: 'Manokara Green Screen', backgroundColor: '#000000', primaryColor: foreground,
      accentColor: foreground, secondaryColor: '#ffffff', fontStyle: 'sans', fontFamily: font,
      fontWeight: snapshot?.bold === false ? 400 : 800, animationIntensity: 'normal',
    };
  }, [snapshot?.font, snapshot?.foreground, snapshot?.bold]);

  const state = useMemo<WebLyricSourceState>(() => {
    if (!snapshot) return emptyState;
    const playing = !!snapshot.playing && !snapshot.paused;
    return {
      connectionStatus: 'connected',
      playerState: playing ? 'playing' : snapshot.paused ? 'paused' : 'idle',
      track: snapshot.title ? { name: snapshot.title, artist: '', coverUrl: null, seed: snapshot.title } : null,
      lyrics: lines,
      clock: {
        positionSec: Number(snapshot.time) || 0,
        durationSec: Number(snapshot.duration) || 0,
        anchoredAtMs: Number(snapshot.sampledAt) || Date.now(),
        playing,
      },
    };
  }, [snapshot, lines]);

  const source = useMemo<WebLyricSource>(() => ({
    state,
    getCurrentTimeSec: (nowMs) => {
      const live = latest.current;
      const base = Number(live.time) || 0;
      const elapsed = live.playing && !live.paused ? Math.max(0, (nowMs - (Number(live.sampledAt) || nowMs)) / 1000) : 0;
      return Math.max(0, Math.min(Number(live.duration) || Infinity, base + elapsed));
    },
  }), [state]);

  const appearance = useMemo<ObsWebAppearance>(() => ({
    mode: mode as ObsWebAppearance['mode'], isDaylight: false, transparent: false, theme,
    background: { transparent: true }, visualizerOpacity: 1,
    lyricsFontScale: Math.max(0.45, Math.min(2.5, (Number(snapshot?.size) || 64) / 64)),
    subtitleFontScale: 0.55, showHarmonySubtitle: false, subtitleOverlayBackground: false,
    subtitleUpcomingLyricsBlur: true, hideTranslationSubtitle: true,
  }), [mode, theme, snapshot?.size]);

  return <ObsWebSourceApp source={source} appearance={appearance} />;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><FoliaBridge /></React.StrictMode>);
