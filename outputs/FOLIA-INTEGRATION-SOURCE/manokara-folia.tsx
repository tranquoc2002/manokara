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
  playing?: boolean; paused?: boolean; counting?: boolean; mc?: boolean; duration?: number; size?: number;
  foreground?: string; font?: string; bold?: boolean; effect?: string;
};

const VALID_MODES = new Set([
  'cadenza','cappella','claddagh','classic','diorama','fume','lumiere',
  'monet','partita','pendolo','sonnet','tempera','tilt',
]);

type SharedSource = {
  time: () => number; getSnapshot: () => ManokaraSnapshot | null;
  subscribe: (fn: (snapshot: ManokaraSnapshot) => void) => () => void;
};
const shared = (window as unknown as { ManokaraFoliaSource: SharedSource }).ManokaraFoliaSource;
const core = (window as unknown as { ManokaraCore: { parseLyrics: (raw: string, duration: number) => {lines: {t: number; x: string}[]} } }).ManokaraCore;

function parseLrc(raw: string, fallbackDuration: number): LyricData {
  const parsed = core.parseLyrics(raw, fallbackDuration).lines;
  const duration = Math.max(1, fallbackDuration || 180);
  const lines: Line[] = parsed.map((line, index) => {
    const startTime = Math.max(0, line.t);
    const endTime = Math.max(startTime + 0.01, parsed[index + 1]?.t ?? duration);
    const tokens = line.x.match(/\s+|[^\s]+/gu) || [];
    const wordSpan = (endTime - startTime) / Math.max(1, tokens.length);
    const words = tokens.map((text, wordIndex) => ({
      text, startTime: startTime + wordIndex * wordSpan,
      endTime: wordIndex === tokens.length - 1 ? endTime : startTime + (wordIndex + 1) * wordSpan,
    }));
    return { id: `manokara-${index}`, fullText: line.x, startTime, endTime, words };
  });
  return { lines, isWordByWord: false };
}

const emptyState: WebLyricSourceState = {
  connectionStatus: 'connecting', playerState: 'idle', track: null, lyrics: null,
  clock: { positionSec: 0, durationSec: 0, anchoredAtMs: 0, playing: false },
};

function FoliaBridge() {
  const [snapshot, setSnapshot] = useState<ManokaraSnapshot | null>(null);
  const signature = useRef('');

  useEffect(() => shared.subscribe(next => {
    const key = JSON.stringify([next.ready,next.title,next.lrc,next.duration,next.playing,next.paused,next.counting,next.mc,next.effect,next.size,next.foreground,next.font,next.bold]);
    if (key !== signature.current) { signature.current = key; setSnapshot(next); }
  }), []);

  const modeCandidate = String(new URL(location.href).searchParams.get('mode') || snapshot?.effect || '').replace(/^folia-/, '');
  const mode = VALID_MODES.has(modeCandidate) ? modeCandidate : 'classic';
  const lines = useMemo(() => parseLrc(snapshot?.lrc || '', Number(snapshot?.duration) || 180), [snapshot?.lrc, snapshot?.duration]);
  const theme = useMemo<Theme>(() => {
    const font = String(snapshot?.font || 'system-ui, sans-serif').split(',')[0].replace(/["']/g, '').trim();
    const foreground = /^#[0-9a-f]{6}$/i.test(String(snapshot?.foreground || '')) ? String(snapshot?.foreground) : '#ffffff';
    return {
      name: 'Manokara Lyrics', backgroundColor: '#000000', primaryColor: foreground,
      accentColor: foreground, secondaryColor: '#ffffff', fontStyle: 'sans', fontFamily: font,
      fontWeight: snapshot?.bold === false ? 400 : 800, animationIntensity: 'normal',
    };
  }, [snapshot?.font, snapshot?.foreground, snapshot?.bold]);

  const track = useMemo(() => snapshot?.title ? { name: snapshot.title, artist: '', coverUrl: null, seed: snapshot.title } : null, [snapshot?.title]);
  const state = useMemo<WebLyricSourceState>(() => {
    if (!snapshot?.ready) return emptyState;
    const playing = !!snapshot.playing && !snapshot.paused;
    return {
      connectionStatus: 'connected',
      playerState: playing ? 'playing' : snapshot.paused ? 'paused' : 'idle',
      track,
      lyrics: lines,
      clock: {
        positionSec: Number(snapshot.time) || 0,
        durationSec: Number(snapshot.duration) || 0,
        anchoredAtMs: Number(snapshot.sampledAt) || Date.now(),
        playing,
      },
    };
  }, [snapshot, lines, track]);

  const source = useMemo<WebLyricSource>(() => ({
    state,
    getCurrentTimeSec: () => Math.max(0, shared.time()),
  }), [state]);

  const appearance = useMemo<ObsWebAppearance>(() => ({
    mode: mode as ObsWebAppearance['mode'], isDaylight: false, transparent: true, theme,
    background: { transparent: true }, visualizerOpacity: 1,
    lyricsFontScale: Math.max(0.45, Math.min(2.5, (Number(snapshot?.size) || 64) / 64)),
    subtitleFontScale: 0.55, showHarmonySubtitle: false, subtitleOverlayBackground: false,
    subtitleUpcomingLyricsBlur: true, hideTranslationSubtitle: true,
  }), [mode, theme, snapshot?.size]);

  if (!snapshot?.ready || !snapshot.title || !snapshot.lrc || snapshot.counting || snapshot.mc) return null;
  return <ObsWebSourceApp source={source} appearance={appearance} />;
}

createRoot(document.getElementById('root')!).render(<FoliaBridge />);
