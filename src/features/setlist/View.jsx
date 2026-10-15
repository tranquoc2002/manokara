import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
const h = React.createElement;
export function Setlist({
  songs,
  currentIndex,
  labels,
  formatTime
}) {
  const icon = name => h('svg', {
    className: 'icon',
    'aria-hidden': 'true'
  }, h('use', {
    href: `./manokara-icons.svg#${name}`
  }));
  return h(React.Fragment, null, h('div', {
    className: 'section-head setlist-head'
  }, h('div', {
    className: 'section-title'
  }, h('h2', {
    id: 'setlistTitle'
  }, labels.setlist), h('span', {
    className: 'count',
    id: 'setlistCount'
  }, songs.length)), h('button', {
    className: 'ghost setlist-library',
    id: 'openLibrary',
    type: 'button',
    onClick: () => appRuntime.commands.actions('setlist')?.openLibrary(),
    'aria-haspopup': 'dialog',
    'aria-controls': 'libraryDialog'
  }, icon('playlist'), h('span', null, labels.mySongs), h('span', {
    className: 'count',
    id: 'libraryCount'
  }, labels.libraryCount))), h('button', {
    className: 's setlist-add',
    id: 'openSongEditor',
    type: 'button',
    onClick: () => appRuntime.commands.actions('setlist')?.openEditor(),
    title: labels.addSong
  }, icon('plus'), h('span', null, labels.addSong)), h('div', {
    id: 'setlistEmpty',
    className: 'empty-setlist',
    hidden: songs.length > 0
  }, h('div', {
    className: 'empty-icon'
  }, icon('playlist')), h('p', null, labels.emptyTitle), h('small', null, labels.emptyHint)), h('ol', {
    id: 'list',
    'aria-label': labels.listLabel
  }, songs.map((song, index) => {
    const title = song.mc ? `${labels.mcPrefix}${song.memo || labels.announcement}` : song.title || song.url;
    const duration = song.mc ? song.dur : song.e != null ? song.e - (song.s || 0) : song.mediaDuration;
    const kind = song.mc ? labels.mcBreak : labels.kind(index, song);
    const active = index === currentIndex;
    const key = `${song.libraryId || song.url || song.memo || 'song'}:${index}`;
    const action = (name, label, symbol, disabled = false) => h('button', {
      key: name,
      className: 'ghost',
      type: 'button',
      'data-a': name,
      title: label,
      'aria-label': label,
      disabled
    }, icon(symbol));
    return h('li', {
      key,
      className: active ? 'on' : '',
      'data-i': index,
      onClick: event => {
        const button = event.target.closest('[data-a]');
        if (button) appRuntime.commands.actions('setlist')?.song(index, button.dataset.a);
      }
    }, h('span', {
      className: 'song-number'
    }, String(index + 1).padStart(2, '0')), h('button', {
      className: 't',
      type: 'button',
      'data-a': 'go',
      title,
      'aria-pressed': active
    }, h('span', {
      className: 'song-name'
    }, title)), h('small', {
      className: 'song-meta'
    }, [kind, song.lrc ? labels.lyricsReady : '', Number.isFinite(duration) ? formatTime(duration) : ''].filter(Boolean).join(' · ')), h('div', {
      className: 'list-actions'
    }, [!song.mc && action('ed', labels.edit, 'pencil-simple'), action('up', labels.moveUp, 'arrow-up', index === 0), action('dn', labels.moveDown, 'arrow-down', index === songs.length - 1), action('del', labels.remove, 'x')].filter(Boolean)));
  })), h('div', {
    className: 'setlist-footer'
  }, h('button', {
    className: 'ghost',
    id: 'clr',
    type: 'button',
    onClick: () => appRuntime.commands.actions('setlist')?.clear(),
    disabled: songs.length === 0
  }, icon('trash'), labels.clear), h('small', null, labels.savedBrowser)));
}
