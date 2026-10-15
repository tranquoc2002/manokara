/**
 * The existing wire/storage formats stay at version 1. These definitions document
 * the persistence boundary without introducing a new envelope or changing APIs.
 * Unknown JSON metadata on songs is retained by the repositories.
 *
 * @typedef {Object} RomajiDocument
 * @property {string} source Original LRC, including its exact timestamp tokens.
 * @property {string} lrc Converted text with the same tokens and blank gaps.
 *
 * @typedef {Object} LyricDocument
 * @property {string} lrc Original LRC. Persistence never rewrites timestamp tokens.
 * @property {'original'|'romaji'|'both'} [lyricMode]
 * @property {RomajiDocument} [romaji]
 * @property {number} off Manual offset in seconds, separate from LRC [offset:].
 *
 * @typedef {Object} LyricAppearance
 * @property {1} version
 * @property {string} lfx Effect identifier.
 * @property {string} lfont Font index stored as a string for legacy compatibility.
 * @property {string} lfc Custom font.
 * @property {string} lsz Text size stored as a string.
 * @property {string} lcol Text colour.
 * @property {string} lclassiccolor Classic karaoke highlight.
 * @property {string} ltheme Colour palette identifier.
 * @property {'transparent'|'green'} lbgmode
 * @property {'auto'|'wide'|'tall'} lshape
 * @property {boolean} lbold
 * @property {boolean} centerFree
 * @property {number} themeSeed JIZURA seed.
 *
 * @typedef {LyricDocument & Object} Song
 * @property {string} url
 * @property {string} title
 * @property {number} s Start in media seconds.
 * @property {number|null} e Optional end in media seconds.
 * @property {number} pitch Semitones, -12 to +12.
 * @property {number} [ldur] LRC source duration.
 * @property {number} [mediaDuration]
 * @property {string} [libraryId]
 * @property {boolean} [librarySync]
 * @property {LyricAppearance} [lyricStyle]
 *
 * @typedef {Object} McBreak
 * @property {number|boolean} mc
 * @property {string} memo
 * @property {number} dur
 * @typedef {Song|McBreak} SetlistEntry
 *
 * @typedef {Object} PlaybackSnapshot
 * @property {string} title
 * @property {string} lrc
 * @property {number} time
 * @property {number} sampledAt
 * @property {number} timelineVersion
 * @property {boolean} playing
 * @property {boolean} paused
 * @property {boolean} counting
 * @property {number} duration
 * @property {string} effect
 *
 * @typedef {Object} PlaybackState Application state, separate from the OBS wire snapshot above.
 * @property {''|'yt'|'media'|'clk'} mode
 * @property {number|null} duration Playable range duration, in seconds.
 * @property {number} position Position relative to the song's start.
 * @property {number} audiblePosition Position after estimated audio delay.
 * @property {number} sequence Increases on track replacement or stop.
 * @property {number} audioVersion Audio discontinuities; lyric edits leave this unchanged.
 * @property {number} timelineVersion Includes seek, offset and lyric changes.
 * @property {boolean} playing
 * @property {boolean} paused
 * @property {boolean} counting
 * @property {number} countdownRemaining
 * @property {boolean} lookupPending
 * @property {boolean} pitchBusy
 * @property {boolean} captureActive
 * @property {boolean} suspended
 * @property {boolean} disposed
 *
 * @typedef {Object} PlaybackService
 * @property {function(): void} start Idempotent startup.
 * @property {function(SetlistEntry, Object=): boolean} load
 * @property {function(): void} play
 * @property {function(): void} togglePause
 * @property {function(): void} stop
 * @property {function(): void} suspend Reversible page-cache suspension.
 * @property {function(): void} resume
 * @property {function(Object=): void} dispose Terminal resource release.
 * @property {function(): Readonly<PlaybackState>} getSnapshot
 * @property {function(Function): Function} subscribe Returns an unsubscribe function.
 *
 * @typedef {Object} OverlayConfig
 * @property {1} version
 * @property {number} width
 * @property {number} height
 * @property {Object} lyric
 * @property {Object} lyricCompact
 * @property {Object} playlist
 *
 * @typedef {Object} OverlayStudioSnapshot Cached editor state; document is deeply read-only.
 * @property {Readonly<OverlayConfig>} document Working preview during a gesture.
 * @property {string} serialized Last committed layout, used for the OBS wire snapshot.
 * @property {'playlist'|'lyrics'} target
 * @property {'current'|'list'|'next'|'lyric'} selected
 * @property {boolean} aspectLocked
 * @property {boolean} canUndo
 * @property {boolean} canRedo
 * @property {boolean} dragging
 * @property {boolean} dirty True until the committed document is successfully persisted.
 * @property {Error|null} saveError
 */
export {};
