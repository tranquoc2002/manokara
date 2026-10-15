export function createInitialFeatureState() {
  return {
    playerPanel: {
      playbackState: 'ready',
      playbackLabel: 'Ready when you are',
      now: 'Nothing playing yet',
      time: '00:00 / 00:00',
      message: '',
      youtubeUrl: '',
      stageMode: 'empty',
      stageTitle: '',
      stageNote: '',
      stageUrl: '',
      stageLinkLabel: 'Open media',
      countdownVisible: false,
      countdownTitle: '',
      countdownValue: '',
      countdownHint: 'Press Play to start now',
      previewMessage: 'Play a song to preview its lyrics.',
      language: 'en'
    },
    obsSettings: {
      classic: false,
      jizura: true,
      centerFree: false,
      shape: 'wide',
      centerTitle: '',
      centerHint: '',
      randomTitle: '',
      songStyleEnabled: false,
      songStyleSaved: false,
      songStyleTitle: '',
      language: 'en',
      obsUrl: 'Connecting…'
    },
    editorView: {
      title: 'Add a song',
      saveLabel: 'Add to setlist',
      editing: false
    },
    transpose: {
      key: 0,
      status: '',
      statusState: '',
      tabAudioActive: false,
      tabAudioBusy: false,
      open: false
    },
    library: {
      songs: [],
      labels: {}
    },
    setlist: {
      songs: [],
      labels: {},
      formatTime: value => String(value),
      currentIndex: -1
    },
    playerControls: {
      play: 'Play',
      pause: 'Pause',
      resume: 'Resume',
      stop: 'Stop',
      previous: 'Previous song',
      next: 'Next song',
      keyLabel: 'Key',
      lower: 'Lower key',
      raise: 'Raise key',
      originalKey: 'Original key',
      volumeLabel: 'Volume',
      paused: false,
      volume: 100,
      key: 0,
      canPitch: false
    },
    liveLyrics: {
      lines: [],
      active: -1,
      empty: {
        primary: 'Your words will find their place here.',
        secondary: 'Add lyrics to a song to follow along.'
      },
      fontSize: 16,
      mode: 'original',
      modeDisabled: true,
      romajiAvailable: false,
      modeStatus: 'Play a song to choose lyrics',
      info: '',
      syncValue: 'Sync: 0.0 s',
      syncColor: '',
      syncDisabled: true,
      labels: {}
    },
    tour: {
      open: false,
      language: 'vi',
      languageLabel: '',
      eyebrow: '',
      title: '',
      body: '',
      progress: '',
      meter: 0,
      closeLabel: '',
      skipLabel: '',
      backLabel: '',
      nextLabel: '',
      backDisabled: true
    },
    lyricSearch: {
      state: '',
      results: [],
      providers: [],
      statuses: []
    }
  };
}
