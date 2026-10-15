import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
import { readLyricSources, safeLyricSourceUrl } from '../../services/lyric-search.mjs';
const h = React.createElement;
export const LiveLyricsPanel = React.memo(function LiveLyricsPanel({
  state
}) {
  const {
    lines,
    active,
    empty,
    fontSize,
    mode,
    modeDisabled,
    romajiAvailable,
    modeStatus,
    info,
    source,
    syncValue,
    syncColor,
    syncDisabled,
    labels
  } = state;
  const container = useRef(null);
  const sources = readLyricSources(source?.sources);
  const sourceLabel = window.ManokaraI18n?.text('Lyrics source') || 'Lyrics source';
  const lineRefs = useRef([]);
  useLayoutEffect(() => {
    if (active < 0) return;
    const host = container.current,
      line = lineRefs.current[active];
    if (host && line) host.scrollTop = line.offsetTop - host.clientHeight / 2 + line.clientHeight / 2;
  }, [lines, active]);
  const icon = name => h('svg', {
    className: 'icon',
    'aria-hidden': 'true'
  }, h('use', {
    href: `./manokara-icons.svg#${name}`
  }));
  const action = name => () => appRuntime.commands.actions('lyrics')?.[name]?.();
  return h(React.Fragment, null, h('div', {
    className: 'section-head lyrics-heading'
  }, h('div', {
    className: 'section-title'
  }, h('h2', {
    id: 'lyricsTitle'
  }, labels.title)), h('div', {
    className: 'row'
  }, h('button', {
    className: 'ghost',
    id: 'fm',
    type: 'button',
    'aria-label': labels.smaller,
    onClick: () => appRuntime.commands.actions('lyrics')?.font(-2)
  }, 'A−'), h('button', {
    className: 'ghost',
    id: 'fp',
    type: 'button',
    'aria-label': labels.larger,
    onClick: () => appRuntime.commands.actions('lyrics')?.font(2)
  }, 'A+'))), h('div', {
    className: 'lyrics-mode-row'
  }, h('label', {
    htmlFor: 'liveLyricMode'
  }, labels.lyrics), h('select', {
    id: 'liveLyricMode',
    'aria-label': labels.chooseLyrics,
    value: mode,
    disabled: modeDisabled,
    onChange: event => appRuntime.commands.actions('lyrics')?.setMode(event.target.value)
  }, h('option', {
    value: 'original'
  }, labels.original), h('option', {
    value: 'romaji',
    disabled: !romajiAvailable
  }, labels.romaji), h('option', {
    value: 'both',
    disabled: !romajiAvailable
  }, labels.both)), h('small', {
    id: 'liveLyricModeStatus',
    role: 'status',
    'aria-live': 'polite'
  }, modeStatus)), h('div', {
    id: 'pan',
    ref: container,
    tabIndex: 0,
    'aria-label': labels.currentLyrics,
    style: {
      '--ps': `${fontSize}px`
    }
  }, empty ? h('div', {
    className: 'lyrics-empty'
  }, icon('text-align-left'), h('span', null, empty.primary, h('br'), empty.secondary)) : lines.map((line, index) => h('div', {
    key: `${index}:${line.t}:${line.x}`,
    className: `ln${index === active ? ' cl' : ''}`,
    ref: element => {
      lineRefs.current[index] = element;
    },
    'aria-current': index === active ? 'true' : undefined
  }, line.x ? line.x : icon('music-notes'), line.romaji && h('span', {
    className: 'romanized'
  }, line.romaji)))), source?.label ? h('div', { className: 'lyric-attribution live-lyric-source', 'data-no-i18n': '' },
    sourceLabel + ': ', sources.length ? sources.map((item, index) => h(React.Fragment, { key: `${item.id}-${index}` },
      index ? ' · ' : null, item.url ? h('a', { href: item.url, target: '_blank', rel: 'noopener noreferrer' }, item.label + ' ↗') : item.label)) :
      safeLyricSourceUrl(source.url) ? h('a', { href: safeLyricSourceUrl(source.url), target: '_blank', rel: 'noopener noreferrer' }, source.label) : source.label,
    source.copyright ? h('small', null, source.copyright) : null) : null, h('small', {
    id: 'pinfo',
    className: 'mu'
  }, info), h('div', {
    className: 'lyrics-footer'
  }, h('div', {
    className: 'sync-head'
  }, h('span', null, labels.liveSync), h('b', {
    id: 'offv',
    title: labels.currentSync,
    style: {
      color: syncColor
    }
  }, syncValue)), h('div', {
    className: 'sync-buttons'
  }, h('button', {
    className: 's',
    id: 'lm',
    type: 'button',
    disabled: syncDisabled,
    onClick: () => appRuntime.commands.actions('lyrics')?.nudge(-.5)
  }, '−0.5 s'), h('button', {
    className: 's',
    id: 'lp',
    type: 'button',
    disabled: syncDisabled,
    onClick: () => appRuntime.commands.actions('lyrics')?.nudge(.5)
  }, '+0.5 s'), h('button', {
    className: 'ghost',
    id: 'lz',
    type: 'button',
    disabled: syncDisabled,
    onClick: action('resetSync')
  }, labels.reset)), h('small', {
    id: 'offh'
  }, labels.syncHelp), h('div', {
    className: 'timing-action'
  }, h('button', {
    className: 'ghost',
    id: 'tap',
    type: 'button',
    onClick: action('tap')
  }, icon('clock'), labels.setLineTime), h('kbd', null, 'T'))));
});
