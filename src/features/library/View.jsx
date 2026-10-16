import React, { useEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { MAX_PLAYLIST_NAME, songsInPlaylist } from '../../domain/playlist.mjs';

const icon = name => <svg className="icon" aria-hidden="true"><use href={`./manokara-icons.svg#${name}`} /></svg>;
const fold = value => String(value || '').normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().replace(/đ/g, 'd');

export function SongLibrary({ songs = [], playlists = [], activePlaylistId = '', busy = false, status = '', error = false, playlistsUnavailable = false }) {
  const t = value => window.ManokaraI18n?.text(value) || value;
  const actions = appRuntime.commands.actions('library');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [destinationId, setDestinationId] = useState('');
  const [form, setForm] = useState(null);
  const [name, setName] = useState('');
  const nameInput = useRef(null);
  const playlist = playlists.find(row => row.playlistId === activePlaylistId);
  const members = playlist ? songsInPlaylist(playlist, songs) : [...songs].sort((a, b) => String(a.title || a.url).localeCompare(String(b.title || b.url)));
  const normalizedQuery = fold(query.trim());
  const found = members.filter(song => !normalizedQuery || fold(`${song.title || ''} ${song.artist || ''}`).includes(normalizedQuery));
  const memberIds = new Set(members.map(song => song.libraryId));
  const savedIds = new Set(songs.map(song => song.libraryId));
  const positions = new Map(members.map((song, index) => [song.libraryId, index]));
  const selectedIds = selected.filter(id => memberIds.has(id));
  const checkedIds = new Set(selectedIds);
  const allChecked = found.length > 0 && found.every(song => checkedIds.has(song.libraryId));
  const someChecked = found.some(song => checkedIds.has(song.libraryId));
  const target = playlists.some(row => row.playlistId === destinationId) ? destinationId : '';

  useEffect(() => { setQuery(''); setSelected([]); setForm(null); }, [activePlaylistId]);
  useEffect(() => { if (form) { nameInput.current?.focus(); nameInput.current?.select(); } }, [form]);
  function toggleSong(id, checked) {
    setSelected(value => checked ? [...new Set([...value, id])] : value.filter(songId => songId !== id));
  }
  function toggleFound(checked) {
    const ids = new Set(found.map(song => song.libraryId));
    setSelected(value => checked ? [...new Set([...value, ...ids])] : value.filter(id => !ids.has(id)));
  }
  function editName(mode) {
    setName(mode === 'rename' ? playlist?.name || '' : '');
    setForm({ mode, id: playlist?.playlistId, songIds: mode === 'create' ? [...selectedIds] : [] });
  }
  async function submitName(event) {
    event.preventDefault();
    if (busy || !name.trim() || !form) return;
    const saved = form.mode === 'rename' ? await actions.renamePlaylist(form.id, name) : await actions.createPlaylist(name, form.songIds);
    if (saved) setForm(null);
  }
  async function addSelected() {
    if (target && selectedIds.length && await actions.addToPlaylist(target, selectedIds)) setSelected([]);
  }
  async function removeSelected() {
    if (playlist && selectedIds.length && await actions.removeFromPlaylist(playlist.playlistId, selectedIds)) setSelected([]);
  }

  return <div className="library-workspace" data-no-i18n="" aria-busy={busy}>
    <aside className="library-sidebar" aria-label={t('Playlists')}>
      <div className="library-sidebar-head"><h3>{t('Playlists')}</h3></div>
      <button type="button" className="library-folder" aria-pressed={!playlist} onClick={() => actions.selectPlaylist('')} disabled={busy}>
        {icon('music-notes')}<span>{t('All songs')}</span><small>{songs.length}</small>
      </button>
      <nav className="library-folders" aria-label={t('Your playlists')}>
        {playlists.map(row => <button key={row.playlistId} type="button" className="library-folder" title={row.name}
          aria-pressed={row.playlistId === activePlaylistId} disabled={busy || playlistsUnavailable} onClick={() => actions.selectPlaylist(row.playlistId)}>
          {icon('playlist')}<span>{row.name}</span><small>{row.songIds.filter(id => savedIds.has(id)).length}</small>
        </button>)}
        {!playlists.length && !playlistsUnavailable ? <p className="library-sidebar-hint">{t('Group songs by language, mood, or your next stream.')}</p> : null}
      </nav>
      <button type="button" className="ghost library-create" onClick={() => editName('create')} disabled={busy || playlistsUnavailable}>
        {icon('plus')}{t('New playlist')}
      </button>
    </aside>

    <section className="library-main" aria-label={playlist?.name || t('All songs')}>
      <div className="library-heading">
        <div className="library-heading-copy"><span className="eyebrow">{playlist ? t('Playlist') : t('My songs')}</span>
          <h3>{playlist?.name || t('All songs')}<small>{members.length}</small></h3>
        </div>
        <div className="library-heading-actions">{playlist ? <>
          <button type="button" className="s" disabled={busy || !members.length || playlistsUnavailable} onClick={() => actions.addPlaylist(playlist.playlistId)}>
            {icon('plus')}{t('Add playlist to setlist')}
          </button>
          <button type="button" className="ghost icon-button" disabled={busy || playlistsUnavailable} onClick={() => editName('rename')}
            aria-label={t('Rename playlist')} title={t('Rename playlist')}>{icon('pencil-simple')}</button>
          <button type="button" className="ghost icon-button library-danger" disabled={busy || playlistsUnavailable} onClick={() => actions.deletePlaylist(playlist.playlistId)}
            aria-label={t('Delete playlist')} title={t('Delete playlist')}>{icon('trash')}</button>
        </> : <small className="mu">{t('Select songs to add them to a playlist.')}</small>}</div>
      </div>

      {form ? <form className="library-name-form" onSubmit={submitName} onKeyDown={event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (!busy) setForm(null); }
      }}>
        <label className="field" htmlFor="libraryPlaylistName"><span>{t(form.mode === 'rename' ? 'Rename playlist' : 'New playlist')}</span>
          <input ref={nameInput} id="libraryPlaylistName" value={name} onChange={event => setName(event.target.value)}
            maxLength={MAX_PLAYLIST_NAME} required disabled={busy} placeholder={t('e.g. Japanese songs, C-pop, Late-night mood')}/>
        </label>
        <div><button type="submit" className="s" disabled={busy || !name.trim()}>{t(form.mode === 'rename' ? 'Save' : 'Create playlist')}</button>
          <button type="button" className="ghost" disabled={busy} onClick={() => setForm(null)}>{t('Cancel')}</button></div>
        {form.songIds.length ? <small className="mu library-name-hint">{form.songIds.length} {t('selected')} · {t('Selected songs will be added to this playlist.')}</small> : null}
      </form> : null}

      <label className="field library-search" htmlFor="librarySearch"><span className="sr-only">{t('Search my songs')}</span>
        {icon('magnifying-glass')}<input id="librarySearch" type="search" placeholder={t('Song title or artist')} value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <div className="library-selection">
        <label className="library-select-all"><input type="checkbox" checked={allChecked} disabled={busy || !found.length}
          ref={node => { if (node) node.indeterminate = someChecked && !allChecked; }} onChange={event => toggleFound(event.target.checked)} aria-label={t('Select visible songs')} />
          <span>{selectedIds.length ? `${selectedIds.length} ${t('selected')}` : t('Select songs')}</span>
        </label>
        <div className="library-selection-actions">
          <select value={target} onChange={event => setDestinationId(event.target.value)} disabled={busy || playlistsUnavailable || !playlists.length} aria-label={t('Choose a playlist')}>
            <option value="">{t('Choose a playlist')}</option>
            {playlists.map(row => <option key={row.playlistId} value={row.playlistId}>{row.name}</option>)}
          </select>
          <button type="button" className="ghost" disabled={busy || playlistsUnavailable || !target || !selectedIds.length} onClick={addSelected}>
            {icon('plus')}{t('Add to playlist')}
          </button>
          {playlist && selectedIds.length ? <button type="button" className="ghost" disabled={busy || playlistsUnavailable} onClick={removeSelected}>{t('Remove selected')}</button> : null}
        </div>
      </div>
      <div className={'library-notice' + (error ? ' library-notice-error' : '')} role="status" aria-live="polite">
        <span>{status || (busy ? t('Saving…') : '')}</span>
        {error ? <button type="button" className="ghost" disabled={busy} onClick={() => actions.refresh()}>{t('Retry')}</button> : null}
      </div>
      {!found.length ? <div id="libraryEmpty" className="library-empty">
        {icon(playlist ? 'playlist' : 'music-notes')}
        <p>{t(normalizedQuery ? 'No matching songs.' : playlist ? 'This playlist is empty.' : 'Your library is empty. Save a song from the editor to keep it here.')}</p>
        {playlist && !normalizedQuery ? <button type="button" className="ghost" disabled={busy} onClick={() => actions.selectPlaylist('')}>{t('Choose songs from My songs')}</button> : null}
      </div> : null}
      <ol id="libraryList" aria-label={t('Saved songs')} data-ids={JSON.stringify(found.map(song => song.libraryId))} hidden={!found.length}>
        {found.map(song => {
          const position = positions.get(song.libraryId);
          return <li key={song.libraryId} className={checkedIds.has(song.libraryId) ? 'library-song-selected' : ''}>
            <input type="checkbox" aria-label={`${t('Select song')}: ${song.title || song.url}`} checked={checkedIds.has(song.libraryId)} disabled={busy} onChange={event => toggleSong(song.libraryId, event.target.checked)} />
            <div className="library-song-info"><b title={song.title || song.url}>{song.title || song.url}</b>
              <small>{playlist ? `${String(position + 1).padStart(2, '0')} · ` : ''}{song.artist ? `${song.artist} · ` : ''}{t(song.lrc ? 'Lyrics saved' : 'No lyrics')}</small>
            </div>
            <div className="library-song-actions">
              <button className="s" type="button" disabled={busy} onClick={() => actions.add(song.libraryId)}>{icon('plus')}{t('Add to setlist')}</button>
              {playlist ? <>
                <button className="ghost icon-button" type="button" disabled={busy || playlistsUnavailable || position === 0} onClick={() => actions.movePlaylistSong(playlist.playlistId, song.libraryId, -1, members[position - 1]?.libraryId)} aria-label={t('Move up')} title={t('Move up')}>{icon('arrow-up')}</button>
                <button className="ghost icon-button" type="button" disabled={busy || playlistsUnavailable || position === members.length - 1} onClick={() => actions.movePlaylistSong(playlist.playlistId, song.libraryId, 1, members[position + 1]?.libraryId)} aria-label={t('Move down')} title={t('Move down')}>{icon('arrow-down')}</button>
                <button className="ghost icon-button" type="button" disabled={busy || playlistsUnavailable} onClick={() => actions.removeFromPlaylist(playlist.playlistId, [song.libraryId])} aria-label={t('Remove from playlist')} title={t('Remove from playlist')}>{icon('x')}</button>
              </> : <button className="ghost icon-button library-danger" type="button" disabled={busy} onClick={() => actions.remove(song.libraryId)} aria-label={t('Remove from My songs')} title={t('Remove from My songs')}>{icon('trash')}</button>}
            </div>
          </li>;
        })}
      </ol>
    </section>
  </div>;
}

export function LibraryDialogShell() {
  return <>
    <div className="studio-dialog-head"><div><span className="eyebrow">Saved on this browser</span><h2 id="libraryTitle">My songs</h2></div>
      <button className="ghost icon-button" id="closeLibrary" type="button" aria-label="Close song library" onClick={() => document.getElementById('libraryDialog')?.close()}>{icon('x')}</button>
    </div>
    <div className="library-content"><div id="libraryReactRoot" /></div>
  </>;
}
