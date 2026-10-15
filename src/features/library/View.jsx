import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
const h = React.createElement;
export function SongLibrary({
  songs,
  labels
}) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const found = songs.filter(song => !normalizedQuery || String(`${song.title || ''} ${song.artist || ''}`).toLocaleLowerCase().includes(normalizedQuery));
  return h(React.Fragment, null, h('label', {
    className: 'field',
    htmlFor: 'librarySearch'
  }, h('span', null, labels.search), h('input', {
    id: 'librarySearch',
    type: 'search',
    placeholder: labels.placeholder,
    value: query,
    onChange: event => setQuery(event.target.value)
  })), h('div', {
    id: 'libraryEmpty',
    className: 'library-empty',
    hidden: found.length > 0
  }, normalizedQuery ? labels.noMatches : labels.empty), h('ol', {
    id: 'libraryList',
    'aria-label': labels.listLabel,
    'data-ids': JSON.stringify(found.map(song => song.libraryId))
  }, found.map(song => h('li', {
    key: song.libraryId
  }, h('div', {
    className: 'library-song-info'
  }, h('b', null, song.title || song.url), h('small', null, song.lrc ? labels.lyricsSaved : labels.noLyrics)), h('div', {
    className: 'library-song-actions'
  }, h('button', {
    className: 's',
    type: 'button',
    onClick: () => appRuntime.commands.actions('library')?.add(song.libraryId)
  }, labels.add), h('button', {
    className: 'ghost icon-button',
    type: 'button',
    onClick: () => appRuntime.commands.actions('library')?.remove(song.libraryId),
    'aria-label': labels.remove,
    title: labels.remove
  }, h('svg', {
    className: 'icon',
    'aria-hidden': 'true'
  }, h('use', {
    href: './manokara-icons.svg#trash'
  }))))))));
}
export function LibraryDialogShell() {
  return <>    <div className="studio-dialog-head">      <div><span className="eyebrow">Saved on this browser</span><h2 id="libraryTitle">My songs</h2></div>      <button className="ghost icon-button" id="closeLibrary" type="button" aria-label="Close song library" onClick={() => document.getElementById('libraryDialog')?.close()}>        <svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#x" /></svg>      </button>    </div>    <div className="library-content">      <p className="mu">Keep songs and their lyrics here, even when you clear or replace a setlist.</p>      <div id="libraryReactRoot" />    </div>  </>;
}
