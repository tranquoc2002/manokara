import { OBSSettings, SongStyleSettings, OBSAppearanceSettings } from './features/obs-output/View.jsx';
import { PlayerControls, TransposeDialogShell } from './features/player/Controls.jsx';
import { PlayerPanel, StageLyricsPreview } from './features/player/Panel.jsx';
import { LiveLyricsPanel } from './features/lyrics/View.jsx';
import { SongEditorShell, LyricSearchResults } from './features/song-editor/View.jsx';
import { SongLibrary, LibraryDialogShell } from './features/library/View.jsx';
import { Setlist } from './features/setlist/View.jsx';
import { appRuntime } from './app/feature-runtime.mjs';
import { useFeature } from './shared/use-feature-store.js';
import { mountView, disposeViews } from './app/react-roots.jsx';
import './manokara-i18n.js';
import './manokara-tour.js';
import '../outputs/manokara-core.js';
import '../outputs/manokara-audio.js';
import '../outputs/manokara-lyrics.js';
import '../outputs/manokara-lyrics-editor.js';
import '../outputs/manokara-session.js';
import './renderers/overlay.js';
import './manokara-studio.js';
import React from 'react';
import { flushSync } from 'react-dom';
import { initManokaraController } from './manokara-controller.js';
import { AppFooter, AppHeader, KaraokeWorkspaceShell, MainWorkspaceTabs, OverlayStudioHeader, OverlayStudioShell, TourOverlay } from './manokara-components.jsx';
const h = React.createElement;
function FeatureView({
  name,
  component: Component,
  shape
}) {
  const value = useFeature(name);
  return h(Component, shape === 'state' ? {
    state: value
  } : shape === 'view' ? {
    view: value
  } : value);
}
const updatePlayerPanelState = appRuntime.ui.updatePlayerPanelState;
const updateOBSSettingsState = appRuntime.ui.updateOBSSettingsState;
const updateSongEditorView = appRuntime.ui.updateSongEditorView;
const setTransposeOpen = appRuntime.ui.setTransposeOpen;
const updateTransposeState = appRuntime.ui.updateTransposeState;
const updateLibrary = appRuntime.ui.updateLibrary;
function mountLibrary(element) {
  mountView('mountLibrary', element, h(FeatureView, {
    name: 'library',
    component: SongLibrary,
    shape: 'spread'
  }));
}
function mountStudioHeader(element) {
  mountView('mountStudioHeader', element, h(OverlayStudioHeader));
}
function mountMainTabs(element) {
  mountView('mountMainTabs', element, h(MainWorkspaceTabs));
}
const updateSetlist = appRuntime.ui.updateSetlist;
function mountSetlist(element) {
  mountView('mountSetlist', element, h(FeatureView, {
    name: 'setlist',
    component: Setlist,
    shape: 'spread'
  }));
}
const updateLyricSearchResults = appRuntime.ui.updateLyricSearchResults;
function mountLyricSearchResults(element) {
  mountView('mountLyricSearchResults', element, h(FeatureView, {
    name: 'lyricSearch',
    component: LyricSearchResults,
    shape: 'spread'
  }));
}
const updatePlayerControls = appRuntime.ui.updatePlayerControls;
function mountPlayerControls(element) {
  mountView('mountPlayerControls', element, h(FeatureView, {
    name: 'playerControls',
    component: PlayerControls,
    shape: 'state'
  }));
}
function mountPlayerPanel(element) {
  mountView('mountPlayerPanel', element, h(FeatureView, {
    name: 'playerPanel',
    component: PlayerPanel,
    shape: 'state'
  }));
}
const updateLiveLyrics = appRuntime.ui.updateLiveLyrics;
function mountLiveLyrics(element) {
  mountView('mountLiveLyrics', element, h(FeatureView, {
    name: 'liveLyrics',
    component: LiveLyricsPanel,
    shape: 'state'
  }));
}
function mountOBSSettings(element) {
  mountView('mountOBSSettings', element, h(FeatureView, {
    name: 'obsSettings',
    component: OBSSettings,
    shape: 'state'
  }));
}
function mountOBSAppearance(element) {
  mountView('mountOBSAppearance', element, h(FeatureView, {
    name: 'obsSettings',
    component: OBSAppearanceSettings,
    shape: 'state'
  }));
}
function mountSongEditor(element) {
  mountView('mountSongEditor', element, h(FeatureView, {
    name: 'editorView',
    component: SongEditorShell,
    shape: 'view'
  }));
}
function mountLibraryDialog(element) {
  mountView('mountLibraryDialog', element, h(LibraryDialogShell));
}
function mountTransposeDialog(element) {
  mountView('mountTransposeDialog', element, h(FeatureView, {
    name: 'transpose',
    component: TransposeDialogShell,
    shape: 'state'
  }));
}
function mountAppFooter(element) {
  mountView('mountAppFooter', element, h(AppFooter));
}
const updateTour = appRuntime.ui.updateTour;
function mountTour(element) {
  mountView('mountTour', element, h(FeatureView, {
    name: 'tour',
    component: TourOverlay,
    shape: 'state'
  }));
}
function mountAppHeader(element) {
  mountView('mountAppHeader', element, h(AppHeader));
}
function mountKaraokeWorkspace(element) {
  mountView('mountKaraokeWorkspace', element, h(KaraokeWorkspaceShell));
}
function mountOverlayStudio(element) {
  mountView('mountOverlayStudio', element, h(OverlayStudioShell));
}
window.ManokaraReactUI = {
  mountAppFooter,
  mountLibrary,
  updateLibrary,
  mountStudioHeader,
  mountOverlayStudio,
  mountMainTabs,
  mountKaraokeWorkspace,
  mountSetlist,
  updateSetlist,
  mountLyricSearchResults,
  updateLyricSearchResults,
  mountPlayerPanel,
  updatePlayerPanelState,
  mountPlayerControls,
  updatePlayerControls,
  mountLiveLyrics,
  updateLiveLyrics,
  mountOBSSettings,
  updateOBSSettingsState,
  mountSongEditor,
  updateSongEditorView,
  mountLibraryDialog,
  mountTransposeDialog,
  mountAppHeader,
  mountTour,
  updateTour,
  setTransposeOpen,
  updateTransposeState
};
let mounted = false,
  disposed = false;
const mountLibraryOnReady = () => {
  if (mounted || disposed) return;
  mounted = true;
  flushSync(() => {
    mountAppHeader(document.getElementById('appHeaderReactRoot'));
    mountAppFooter(document.getElementById('appFooterReactRoot'));
    mountTransposeDialog(document.getElementById('transposeDialogReactRoot'));
    mountTour(document.getElementById('tourReactRoot'));
    mountKaraokeWorkspace(document.getElementById('karaokeReactRoot'));
  }); // These roots live inside Karaoke regions that the first React commit adopts.
  flushSync(() => {
    mountLibraryDialog(document.getElementById('libraryDialogReactRoot'));
    mountSetlist(document.getElementById('setlistSide'));
    mountPlayerPanel(document.getElementById('playerReactRoot'));
    mountLiveLyrics(document.getElementById('side'));
    mountOBSSettings(document.getElementById('obsSettingsReactRoot'));
    mountSongEditor(document.getElementById('songEditorReactRoot'));
    mountMainTabs(document.getElementById('mainTabsReactRoot'));
    mountOverlayStudio(document.getElementById('studioReactLayoutRoot'));
  });
  flushSync(() => {
    // This container is created by OBSSettings in the previous commit.
    mountOBSAppearance(document.getElementById('obsLyricSettingsReactRoot'));
    mountLibrary(document.getElementById('libraryReactRoot'));
    mountPlayerControls(document.getElementById('transportReactRoot'));
    mountLyricSearchResults(document.getElementById('lyricSearchResultsReactRoot'));
  }); // Connect playback and storage behavior only after React has committed every control.
  initManokaraController(); // Read the restored editor target after its controller has initialized.
  flushSync(() => {
    mountStudioHeader(document.getElementById('studioReactHeader'));
  });
};
function disposeApp({
  navigation = false
} = {}) {
  if (disposed) return;
  disposed = true;
  window.ManokaraTour?.dispose();
  window.ManokaraStudio?.dispose();
  window.ManokaraController?.dispose({
    navigation
  });
  disposeViews();
  appRuntime.dispose();
  window.removeEventListener('pagehide', onPageHidden);
  document.removeEventListener('DOMContentLoaded', mountLibraryOnReady);
}
function onPageHidden(event) {
  if (!event.persisted) disposeApp({
    navigation: true
  });
}
window.addEventListener('pagehide', onPageHidden);
window.ManokaraApp = {
  start: mountLibraryOnReady,
  dispose: disposeApp,
  diagnostics: () => ({
    mounted,
    disposed,
    subscriptions: Object.fromEntries(Object.entries(appRuntime.stores).map(([name, store]) => [name, store.subscriberCount])),
    draftSubscriptions: appRuntime.draft.subscriberCount
  })
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountLibraryOnReady, {
    once: true
  });
} else {
  mountLibraryOnReady();
}
export { mountLibrary, updateLibrary };
