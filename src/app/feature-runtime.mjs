import { createFeatureStore, createCommandRegistry } from '../services/feature-store.mjs';
import { createSongDraft } from '../features/song-editor/draft.mjs';
import { createInitialFeatureState } from '../features/initial-state.mjs';
export function createFeatureRuntime(initial = {}) {
  initial = {
    ...createInitialFeatureState(),
    ...initial
  };
  const names = ['library', 'setlist', 'lyricSearch', 'playerPanel', 'playerControls', 'liveLyrics', 'obsSettings', 'editorView', 'transpose', 'tour', 'outputValues'];
  const stores = Object.fromEntries(names.map(name => [name, createFeatureStore(initial[name])])),
    commands = createCommandRegistry();
  const draft = createSongDraft();
  stores.outputValues.replace({
    cdn: '5',
    skip: true,
    vol: '100',
    lfx: 'jizura',
    lbgmode: 'transparent',
    ltheme: 'effect',
    lsz: '64',
    lcol: '#ffffff',
    lclassiccolor: '#2563eb',
    lfont: '0',
    lfc: '',
    lbold: true,
    lcenter: false,
    lshape: 'auto',
    ...initial.outputValues
  });
  const controls = {
    get: key => stores.outputValues.getSnapshot()[key],
    set(key, value) {
      stores.outputValues.patch({
        [key]: value
      });
      return value;
    },
    patch: stores.outputValues.patch
  };
  const rows = songs => Object.freeze((Array.isArray(songs) ? songs : []).map(song => Object.freeze({
    ...Object.fromEntries(['title', 'artist', 'url', 'libraryId', 'mc', 'memo', 'dur', 's', 'e', 'mediaDuration', 'lrc'].map(key => [key, song[key]]))
  })));
  const ui = {
    updateLibrary(songs, labels, details = {}) {
      stores.library.replace({
        ...stores.library.getSnapshot(),
        ...details,
        songs: rows(songs),
        labels,
        playlists: Object.freeze((details.playlists || stores.library.getSnapshot().playlists || []).map(playlist => Object.freeze({
          ...playlist, songIds: Object.freeze([...playlist.songIds])
        })))
      });
    },
    updateSetlist(songs, current, labels, formatTime) {
      stores.setlist.replace({
        songs: rows(songs),
        currentIndex: songs.indexOf(current),
        labels,
        formatTime
      });
    },
    updateLyricSearchResults(state, results, details = {}) {
      stores.lyricSearch.patch({
        ...details,
        state,
        results: Object.freeze(results.map(item => Object.freeze({
          ...item
        })))
      });
    },
    updatePlayerPanelState: patch => stores.playerPanel.patch(patch),
    updatePlayerControls: state => stores.playerControls.patch(state),
    updateLiveLyrics: patch => stores.liveLyrics.patch({
      ...patch,
      ...(patch.lines ? {
        lines: Object.freeze(patch.lines.map(line => Object.freeze({
          ...line
        })))
      } : {})
    }),
    updateOBSSettingsState: patch => stores.obsSettings.patch(patch),
    updateSongEditorView: patch => stores.editorView.patch(patch),
    updateTransposeState: patch => stores.transpose.patch(patch),
    setTransposeOpen: open => stores.transpose.patch({
      open: !!open
    }),
    updateTour: patch => stores.tour.patch(patch)
  };
  return {
    stores,
    draft,
    controls,
    ui,
    commands,
    dispose() {
      commands.dispose();
      draft.dispose();
      Object.values(stores).forEach(store => store.dispose());
    }
  };
}
export const appRuntime = createFeatureRuntime();
