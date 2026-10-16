function uf(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var gs = { exports: {} }, qe = {};
var Vu;
function df() {
  if (Vu) return qe;
  Vu = 1;
  var i = /* @__PURE__ */ Symbol.for("react.element"), u = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), c = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.provider"), g = /* @__PURE__ */ Symbol.for("react.context"), y = /* @__PURE__ */ Symbol.for("react.forward_ref"), d = /* @__PURE__ */ Symbol.for("react.suspense"), M = /* @__PURE__ */ Symbol.for("react.memo"), x = /* @__PURE__ */ Symbol.for("react.lazy"), C = Symbol.iterator;
  function N(k) {
    return k === null || typeof k != "object" ? null : (k = C && k[C] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var D = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, b = Object.assign, w = {};
  function S(k, L, re) {
    this.props = k, this.context = L, this.refs = w, this.updater = re || D;
  }
  S.prototype.isReactComponent = {}, S.prototype.setState = function(k, L) {
    if (typeof k != "object" && typeof k != "function" && k != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, k, L, "setState");
  }, S.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function E() {
  }
  E.prototype = S.prototype;
  function I(k, L, re) {
    this.props = k, this.context = L, this.refs = w, this.updater = re || D;
  }
  var U = I.prototype = new E();
  U.constructor = I, b(U, S.prototype), U.isPureReactComponent = !0;
  var P = Array.isArray, A = Object.prototype.hasOwnProperty, j = { current: null }, V = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Q(k, L, re) {
    var de, ge = {}, Ae = null, xe = null;
    if (L != null) for (de in L.ref !== void 0 && (xe = L.ref), L.key !== void 0 && (Ae = "" + L.key), L) A.call(L, de) && !V.hasOwnProperty(de) && (ge[de] = L[de]);
    var he = arguments.length - 2;
    if (he === 1) ge.children = re;
    else if (1 < he) {
      for (var Ne = Array(he), Se = 0; Se < he; Se++) Ne[Se] = arguments[Se + 2];
      ge.children = Ne;
    }
    if (k && k.defaultProps) for (de in he = k.defaultProps, he) ge[de] === void 0 && (ge[de] = he[de]);
    return { $$typeof: i, type: k, key: Ae, ref: xe, props: ge, _owner: j.current };
  }
  function G(k, L) {
    return { $$typeof: i, type: k.type, key: L, ref: k.ref, props: k.props, _owner: k._owner };
  }
  function $(k) {
    return typeof k == "object" && k !== null && k.$$typeof === i;
  }
  function ne(k) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(re) {
      return L[re];
    });
  }
  var Z = /\/+/g;
  function Y(k, L) {
    return typeof k == "object" && k !== null && k.key != null ? ne("" + k.key) : L.toString(36);
  }
  function J(k, L, re, de, ge) {
    var Ae = typeof k;
    (Ae === "undefined" || Ae === "boolean") && (k = null);
    var xe = !1;
    if (k === null) xe = !0;
    else switch (Ae) {
      case "string":
      case "number":
        xe = !0;
        break;
      case "object":
        switch (k.$$typeof) {
          case i:
          case u:
            xe = !0;
        }
    }
    if (xe) return xe = k, ge = ge(xe), k = de === "" ? "." + Y(xe, 0) : de, P(ge) ? (re = "", k != null && (re = k.replace(Z, "$&/") + "/"), J(ge, L, re, "", function(Se) {
      return Se;
    })) : ge != null && ($(ge) && (ge = G(ge, re + (!ge.key || xe && xe.key === ge.key ? "" : ("" + ge.key).replace(Z, "$&/") + "/") + k)), L.push(ge)), 1;
    if (xe = 0, de = de === "" ? "." : de + ":", P(k)) for (var he = 0; he < k.length; he++) {
      Ae = k[he];
      var Ne = de + Y(Ae, he);
      xe += J(Ae, L, re, Ne, ge);
    }
    else if (Ne = N(k), typeof Ne == "function") for (k = Ne.call(k), he = 0; !(Ae = k.next()).done; ) Ae = Ae.value, Ne = de + Y(Ae, he++), xe += J(Ae, L, re, Ne, ge);
    else if (Ae === "object") throw L = String(k), Error("Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead.");
    return xe;
  }
  function ie(k, L, re) {
    if (k == null) return k;
    var de = [], ge = 0;
    return J(k, de, "", "", function(Ae) {
      return L.call(re, Ae, ge++);
    }), de;
  }
  function ce(k) {
    if (k._status === -1) {
      var L = k._result;
      L = L(), L.then(function(re) {
        (k._status === 0 || k._status === -1) && (k._status = 1, k._result = re);
      }, function(re) {
        (k._status === 0 || k._status === -1) && (k._status = 2, k._result = re);
      }), k._status === -1 && (k._status = 0, k._result = L);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var te = { current: null }, v = { transition: null }, z = { ReactCurrentDispatcher: te, ReactCurrentBatchConfig: v, ReactCurrentOwner: j };
  function _() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return qe.Children = { map: ie, forEach: function(k, L, re) {
    ie(k, function() {
      L.apply(this, arguments);
    }, re);
  }, count: function(k) {
    var L = 0;
    return ie(k, function() {
      L++;
    }), L;
  }, toArray: function(k) {
    return ie(k, function(L) {
      return L;
    }) || [];
  }, only: function(k) {
    if (!$(k)) throw Error("React.Children.only expected to receive a single React element child.");
    return k;
  } }, qe.Component = S, qe.Fragment = s, qe.Profiler = p, qe.PureComponent = I, qe.StrictMode = c, qe.Suspense = d, qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z, qe.act = _, qe.cloneElement = function(k, L, re) {
    if (k == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
    var de = b({}, k.props), ge = k.key, Ae = k.ref, xe = k._owner;
    if (L != null) {
      if (L.ref !== void 0 && (Ae = L.ref, xe = j.current), L.key !== void 0 && (ge = "" + L.key), k.type && k.type.defaultProps) var he = k.type.defaultProps;
      for (Ne in L) A.call(L, Ne) && !V.hasOwnProperty(Ne) && (de[Ne] = L[Ne] === void 0 && he !== void 0 ? he[Ne] : L[Ne]);
    }
    var Ne = arguments.length - 2;
    if (Ne === 1) de.children = re;
    else if (1 < Ne) {
      he = Array(Ne);
      for (var Se = 0; Se < Ne; Se++) he[Se] = arguments[Se + 2];
      de.children = he;
    }
    return { $$typeof: i, type: k.type, key: ge, ref: Ae, props: de, _owner: xe };
  }, qe.createContext = function(k) {
    return k = { $$typeof: g, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, k.Provider = { $$typeof: f, _context: k }, k.Consumer = k;
  }, qe.createElement = Q, qe.createFactory = function(k) {
    var L = Q.bind(null, k);
    return L.type = k, L;
  }, qe.createRef = function() {
    return { current: null };
  }, qe.forwardRef = function(k) {
    return { $$typeof: y, render: k };
  }, qe.isValidElement = $, qe.lazy = function(k) {
    return { $$typeof: x, _payload: { _status: -1, _result: k }, _init: ce };
  }, qe.memo = function(k, L) {
    return { $$typeof: M, type: k, compare: L === void 0 ? null : L };
  }, qe.startTransition = function(k) {
    var L = v.transition;
    v.transition = {};
    try {
      k();
    } finally {
      v.transition = L;
    }
  }, qe.unstable_act = _, qe.useCallback = function(k, L) {
    return te.current.useCallback(k, L);
  }, qe.useContext = function(k) {
    return te.current.useContext(k);
  }, qe.useDebugValue = function() {
  }, qe.useDeferredValue = function(k) {
    return te.current.useDeferredValue(k);
  }, qe.useEffect = function(k, L) {
    return te.current.useEffect(k, L);
  }, qe.useId = function() {
    return te.current.useId();
  }, qe.useImperativeHandle = function(k, L, re) {
    return te.current.useImperativeHandle(k, L, re);
  }, qe.useInsertionEffect = function(k, L) {
    return te.current.useInsertionEffect(k, L);
  }, qe.useLayoutEffect = function(k, L) {
    return te.current.useLayoutEffect(k, L);
  }, qe.useMemo = function(k, L) {
    return te.current.useMemo(k, L);
  }, qe.useReducer = function(k, L, re) {
    return te.current.useReducer(k, L, re);
  }, qe.useRef = function(k) {
    return te.current.useRef(k);
  }, qe.useState = function(k) {
    return te.current.useState(k);
  }, qe.useSyncExternalStore = function(k, L, re) {
    return te.current.useSyncExternalStore(k, L, re);
  }, qe.useTransition = function() {
    return te.current.useTransition();
  }, qe.version = "18.3.1", qe;
}
var Yu;
function cd() {
  return Yu || (Yu = 1, gs.exports = df()), gs.exports;
}
var Be = cd();
const l = /* @__PURE__ */ uf(Be);
function ud(i = {}) {
  let u = Object.freeze({
    ...i
  });
  const s = /* @__PURE__ */ new Set();
  let c = !1;
  function p(f) {
    if (c || Object.keys(f).length === Object.keys(u).length && Object.keys(f).every((g) => Object.is(f[g], u[g]))) return !1;
    u = Object.freeze({
      ...f
    });
    for (const g of [...s]) g();
    return !0;
  }
  return {
    getSnapshot: () => u,
    patch: (f) => p({
      ...u,
      ...f
    }),
    replace: p,
    subscribe(f) {
      return c ? () => {
      } : (s.add(f), () => s.delete(f));
    },
    dispose() {
      c = !0, s.clear();
    },
    get subscriberCount() {
      return s.size;
    }
  };
}
function hf() {
  const i = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  function s(c) {
    if (!u.has(c)) {
      const p = /* @__PURE__ */ new Map();
      u.set(c, new Proxy({}, {
        get(f, g) {
          if (!(typeof g != "string" || g === "then"))
            return p.has(g) || p.set(g, (...y) => i.get(c)?.[g]?.(...y)), p.get(g);
        }
      }));
    }
    return u.get(c);
  }
  return {
    actions: s,
    bind(c, p) {
      return i.set(c, p), () => {
        i.get(c) === p && i.delete(c);
      };
    },
    dispose() {
      i.clear();
    }
  };
}
const Mo = Object.freeze({
  url: "",
  ttl: "",
  st: "",
  en: "",
  llrc: "",
  lq: "",
  lyricProvider: "auto",
  lyricSourceLabel: "",
  lyricSourceUrl: "",
  lyricCopyright: "",
  lyricSources: "[]",
  loff: "0",
  songKey: "0",
  saveToLibrary: !0,
  romajiLrc: "",
  lyricMode: "original",
  lrcEncoding: "auto",
  mcm: "",
  mcd: "",
  romajiOpen: !1,
  romajiAvailable: !1,
  romanizeBusy: !1,
  lyricsStatus: "",
  lyricsError: !1,
  lyricLoadStatus: "",
  saving: !1,
  importBusy: !1
}), ff = /* @__PURE__ */ new Set(["url", "ttl", "st", "en", "llrc", "lq", "lyricProvider", "lyricSourceLabel", "lyricSourceUrl", "lyricCopyright", "lyricSources", "loff", "songKey", "saveToLibrary", "romajiLrc", "lyricMode", "mcm", "mcd"]);
function pf() {
  const i = ud(Mo);
  let u = 0;
  function s(c) {
    const p = i.getSnapshot(), f = {};
    for (const [g, y] of Object.entries(c))
      g in Mo && (f[g] = typeof Mo[g] == "boolean" ? !!y : String(y ?? ""), (g === "llrc" || g === "romajiLrc") && (f[g] = f[g].replace(/\r\n?/g, `
`)));
    return Object.keys(f).some((g) => ff.has(g) && f[g] !== p[g]) && u++, i.patch(f);
  }
  return {
    ...i,
    patch: s,
    get: (c) => i.getSnapshot()[c],
    set(c, p) {
      return s({
        [c]: p
      }), p;
    },
    reset() {
      u++, i.replace({
        ...Mo,
        saving: i.getSnapshot().saving
      });
    },
    get revision() {
      return u;
    }
  };
}
function mf() {
  return {
    playerPanel: {
      playbackState: "ready",
      playbackLabel: "Ready when you are",
      now: "Nothing playing yet",
      time: "00:00 / 00:00",
      message: "",
      youtubeUrl: "",
      stageMode: "empty",
      stageTitle: "",
      stageNote: "",
      stageUrl: "",
      stageLinkLabel: "Open media",
      countdownVisible: !1,
      countdownTitle: "",
      countdownValue: "",
      countdownHint: "Press Play to start now",
      previewMessage: "Play a song to preview its lyrics.",
      language: "en"
    },
    obsSettings: {
      classic: !1,
      jizura: !0,
      centerFree: !1,
      shape: "wide",
      centerTitle: "",
      centerHint: "",
      randomTitle: "",
      songStyleEnabled: !1,
      songStyleSaved: !1,
      songStyleTitle: "",
      language: "en",
      obsUrl: "Connecting…"
    },
    editorView: {
      title: "Add a song",
      saveLabel: "Add to setlist",
      editing: !1
    },
    transpose: {
      key: 0,
      status: "",
      statusState: "",
      tabAudioActive: !1,
      tabAudioBusy: !1,
      open: !1
    },
    library: {
      songs: [],
      labels: {},
      playlists: [],
      activePlaylistId: "",
      busy: !1,
      status: "",
      error: !1
    },
    setlist: {
      songs: [],
      labels: {},
      formatTime: (i) => String(i),
      currentIndex: -1
    },
    playerControls: {
      play: "Play",
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      previous: "Previous song",
      next: "Next song",
      keyLabel: "Key",
      lower: "Lower key",
      raise: "Raise key",
      originalKey: "Original key",
      volumeLabel: "Volume",
      paused: !1,
      volume: 100,
      key: 0,
      canPitch: !1
    },
    liveLyrics: {
      lines: [],
      active: -1,
      empty: {
        primary: "Your words will find their place here.",
        secondary: "Add lyrics to a song to follow along."
      },
      fontSize: 16,
      mode: "original",
      modeDisabled: !0,
      romajiAvailable: !1,
      modeStatus: "Play a song to choose lyrics",
      info: "",
      syncValue: "Sync: 0.0 s",
      syncColor: "",
      syncDisabled: !0,
      labels: {}
    },
    tour: {
      open: !1,
      language: "vi",
      languageLabel: "",
      eyebrow: "",
      title: "",
      body: "",
      progress: "",
      meter: 0,
      closeLabel: "",
      skipLabel: "",
      backLabel: "",
      nextLabel: "",
      backDisabled: !0
    },
    lyricSearch: {
      state: "",
      results: [],
      providers: [],
      statuses: []
    }
  };
}
function gf(i = {}) {
  i = {
    ...mf(),
    ...i
  };
  const s = Object.fromEntries(["library", "setlist", "lyricSearch", "playerPanel", "playerControls", "liveLyrics", "obsSettings", "editorView", "transpose", "tour", "outputValues"].map((d) => [d, ud(i[d])])), c = hf(), p = pf();
  s.outputValues.replace({
    cdn: "5",
    skip: !0,
    vol: "100",
    lfx: "jizura",
    lbgmode: "transparent",
    ltheme: "effect",
    lsz: "64",
    lcol: "#ffffff",
    lclassiccolor: "#2563eb",
    lfont: "0",
    lfc: "",
    lbold: !0,
    lcenter: !1,
    lshape: "auto",
    ...i.outputValues
  });
  const f = {
    get: (d) => s.outputValues.getSnapshot()[d],
    set(d, M) {
      return s.outputValues.patch({
        [d]: M
      }), M;
    },
    patch: s.outputValues.patch
  }, g = (d) => Object.freeze((Array.isArray(d) ? d : []).map((M) => Object.freeze({
    ...Object.fromEntries(["title", "artist", "url", "libraryId", "mc", "memo", "dur", "s", "e", "mediaDuration", "lrc"].map((x) => [x, M[x]]))
  })));
  return {
    stores: s,
    draft: p,
    controls: f,
    ui: {
      updateLibrary(d, M, x = {}) {
        s.library.replace({
          ...s.library.getSnapshot(),
          ...x,
          songs: g(d),
          labels: M,
          playlists: Object.freeze((x.playlists || s.library.getSnapshot().playlists || []).map((C) => Object.freeze({
            ...C,
            songIds: Object.freeze([...C.songIds])
          })))
        });
      },
      updateSetlist(d, M, x, C) {
        s.setlist.replace({
          songs: g(d),
          currentIndex: d.indexOf(M),
          labels: x,
          formatTime: C
        });
      },
      updateLyricSearchResults(d, M, x = {}) {
        s.lyricSearch.patch({
          ...x,
          state: d,
          results: Object.freeze(M.map((C) => Object.freeze({
            ...C
          })))
        });
      },
      updatePlayerPanelState: (d) => s.playerPanel.patch(d),
      updatePlayerControls: (d) => s.playerControls.patch(d),
      updateLiveLyrics: (d) => s.liveLyrics.patch({
        ...d,
        ...d.lines ? {
          lines: Object.freeze(d.lines.map((M) => Object.freeze({
            ...M
          })))
        } : {}
      }),
      updateOBSSettingsState: (d) => s.obsSettings.patch(d),
      updateSongEditorView: (d) => s.editorView.patch(d),
      updateTransposeState: (d) => s.transpose.patch(d),
      setTransposeOpen: (d) => s.transpose.patch({
        open: !!d
      }),
      updateTour: (d) => s.tour.patch(d)
    },
    commands: c,
    dispose() {
      c.dispose(), p.dispose(), Object.values(s).forEach((d) => d.dispose());
    }
  };
}
const W = gf();
function jo(i) {
  const u = W.stores[i];
  return Be.useSyncExternalStore(u.subscribe, u.getSnapshot, u.getSnapshot);
}
function yf() {
  const i = W.draft;
  return Be.useSyncExternalStore(i.subscribe, i.getSnapshot, i.getSnapshot);
}
const dd = [
  ["System default", 'system-ui,"Segoe UI","Yu Gothic",sans-serif'],
  ["Arial", "Arial,sans-serif"],
  ["Georgia (serif)", "Georgia,serif"],
  ["Courier New", '"Courier New",monospace'],
  ["Impact", "Impact,sans-serif"],
  ["Comic Sans MS", '"Comic Sans MS",cursive'],
  ["Roboto · online", "Roboto", "Roboto:wght@400;800"],
  ["Montserrat · online", "Montserrat", "Montserrat:wght@400;800"],
  ["Be Vietnam Pro · online", '"Be Vietnam Pro"', "Be+Vietnam+Pro:wght@400;800"],
  ["Oswald · online", "Oswald", "Oswald:wght@400;700"],
  ["Playfair Display · online", '"Playfair Display"', "Playfair+Display:wght@400;800"],
  ["Pacifico · online", "Pacifico", "Pacifico"],
  ["Lobster · online", "Lobster", "Lobster"],
  ["Dancing Script · online", '"Dancing Script"', "Dancing+Script:wght@400;700"],
  ["Noto Sans JP · online", '"Noto Sans JP"', "Noto+Sans+JP:wght@400;800"]
];
l.createElement;
function vf({
  state: i
}) {
  const u = (s) => /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: `./manokara-icons.svg#${s}` }));
  return /* @__PURE__ */ l.createElement("section", { className: "tabpanel", id: "panel-green", role: "region", "aria-label": "OBS output" }, "    ", /* @__PURE__ */ l.createElement("div", { className: "output-connect" }, "      ", /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("h2", null, "Take your lyrics live."), /* @__PURE__ */ l.createElement("p", null, "Your own output for OBS or a second screen.")), "      ", /* @__PURE__ */ l.createElement("button", { className: "s", id: "lwin", type: "button", onClick: () => W.commands.actions("obs")?.openLyricsWindow() }, u("arrow-up-right"), "Open lyrics window"), "    "), "    ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "OBS Browser Source URL"), /* @__PURE__ */ l.createElement("div", { className: "obs-link" }, /* @__PURE__ */ l.createElement("input", { id: "obsurl", readOnly: !0, value: i.obsUrl, "aria-label": "OBS Browser Source URL" }), /* @__PURE__ */ l.createElement("button", { id: "copyobs", type: "button", onClick: () => W.commands.actions("obs")?.copyUrl() }, u("link"), "Copy link"))), "    ", /* @__PURE__ */ l.createElement("div", { className: "obs-note" }, /* @__PURE__ */ l.createElement("small", null, "Paste this into an OBS Browser Source. Keep it active."), /* @__PURE__ */ l.createElement("button", { className: "ghost", id: "rotateobs", type: "button", title: "Revoke the previous OBS link and create a new one", onClick: () => W.commands.actions("obs")?.rotateLink() }, "Replace link")), "    ", /* @__PURE__ */ l.createElement("button", { className: "s", id: "editLyricLayout", type: "button" }, "Edit lyric layout"), "    ", /* @__PURE__ */ l.createElement("div", { id: "obsLyricSettingsReactRoot" }), "  ");
}
function wf({
  state: i
}) {
  const u = (s) => window.ManokaraI18n?.text(s) || s;
  return /* @__PURE__ */ l.createElement("section", { className: "song-style-settings", "aria-label": u("Song animation settings") }, /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "rememberSongStyle", type: "checkbox", checked: i.songStyleSaved, disabled: !i.songStyleEnabled, onChange: (s) => W.commands.actions("obs")?.rememberSongStyle(s.target.checked) }), u("Save animation settings for this song")), /* @__PURE__ */ l.createElement("small", { id: "songStyleStatus", role: "status" }, u(i.songStyleEnabled ? i.songStyleSaved ? "Animation changes save automatically for this song." : "Using the shared animation settings." : "Select a song to save its animation settings.")), i.songStyleEnabled && /* @__PURE__ */ l.createElement("small", { className: "song-style-title", title: i.songStyleTitle }, i.songStyleTitle));
}
function kf({
  state: i
}) {
  const u = jo("outputValues"), s = (f) => /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: `./manokara-icons.svg#${f}` })), c = (f) => window.ManokaraI18n?.text(f) || f, p = (f) => W.commands.actions("obs")?.settingChanged(f.currentTarget.id);
  return /* @__PURE__ */ l.createElement(l.Fragment, null, " ", /* @__PURE__ */ l.createElement("section", { className: "section-divider", "aria-label": c("Lyric animation") }, "      ", /* @__PURE__ */ l.createElement("h3", null, "Lyric animation"), /* @__PURE__ */ l.createElement(wf, { state: i }), "      ", /* @__PURE__ */ l.createElement("div", { className: "settings-grid" }, "        ", /* @__PURE__ */ l.createElement("label", { className: "field wide" }, /* @__PURE__ */ l.createElement("span", null, "Visual style"), /* @__PURE__ */ l.createElement("select", { id: "lfx", value: u.lfx, onChange: (f) => {
    W.controls.set("lfx", f.currentTarget.value), p(f);
  } }, "          ", /* @__PURE__ */ l.createElement("option", { value: "jizura" }, "JIZURA Auto · full effects"), /* @__PURE__ */ l.createElement("option", { value: "karaoke-classic" }, "Classic karaoke · two-line sweep"), "          ", /* @__PURE__ */ l.createElement("optgroup", { label: "Folia Major · original visualizers" }, "            ", /* @__PURE__ */ l.createElement("option", { value: "folia-classic" }, "Folia · Luminous"), /* @__PURE__ */ l.createElement("option", { value: "folia-cadenza" }, "Folia · Mindscape"), /* @__PURE__ */ l.createElement("option", { value: "folia-partita" }, "Folia · Cloud Steps"), /* @__PURE__ */ l.createElement("option", { value: "folia-fume" }, "Folia · Fume"), /* @__PURE__ */ l.createElement("option", { value: "folia-tilt" }, "Folia · Tilt"), /* @__PURE__ */ l.createElement("option", { value: "folia-claddagh" }, "Folia · Claddagh"), /* @__PURE__ */ l.createElement("option", { value: "folia-monet" }, "Folia · Monet"), /* @__PURE__ */ l.createElement("option", { value: "folia-diorama" }, "Folia · Diorama"), /* @__PURE__ */ l.createElement("option", { value: "folia-pendolo" }, "Folia · Pendolo"), /* @__PURE__ */ l.createElement("option", { value: "folia-sonnet" }, "Folia · Sonnet"), /* @__PURE__ */ l.createElement("option", { value: "folia-tempera" }, "Folia · Tempera"), /* @__PURE__ */ l.createElement("option", { value: "folia-lumiere" }, "Folia · Lumiere"), "          "), "          ", /* @__PURE__ */ l.createElement("option", { value: "tempera" }, "Tempera · ink"), /* @__PURE__ */ l.createElement("option", { value: "sonnet" }, "Sonnet · kinetic focus"), /* @__PURE__ */ l.createElement("option", { value: "lumiere" }, "Lumiere · light reveal"), /* @__PURE__ */ l.createElement("option", { value: "hanabi" }, "Hanabi · character burst"), /* @__PURE__ */ l.createElement("option", { value: "clean" }, "Clean fade"), /* @__PURE__ */ l.createElement("option", { value: "word-pop" }, "Word pop"), /* @__PURE__ */ l.createElement("option", { value: "neon" }, "Neon sweep"), /* @__PURE__ */ l.createElement("option", { value: "glitch" }, "Glitch hit"), "        ")), "        ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Background"), /* @__PURE__ */ l.createElement("select", { id: "lbgmode", value: u.lbgmode, onChange: (f) => {
    W.controls.set("lbgmode", f.currentTarget.value), p(f);
  } }, /* @__PURE__ */ l.createElement("option", { value: "transparent" }, "Transparent"), /* @__PURE__ */ l.createElement("option", { value: "green" }, "Green screen"))), "        ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Color palette"), /* @__PURE__ */ l.createElement("select", { id: "ltheme", value: u.ltheme, onChange: (f) => {
    W.controls.set("ltheme", f.currentTarget.value), p(f);
  } }, /* @__PURE__ */ l.createElement("option", { value: "effect" }, "Effect palette"), /* @__PURE__ */ l.createElement("option", { value: "white" }, "White"), /* @__PURE__ */ l.createElement("option", { value: "cyan" }, "Ice cyan"), /* @__PURE__ */ l.createElement("option", { value: "rose" }, "Rose"), /* @__PURE__ */ l.createElement("option", { value: "amber" }, "Amber"), /* @__PURE__ */ l.createElement("option", { value: "violet" }, "Violet"), /* @__PURE__ */ l.createElement("option", { value: "mint" }, "Mint"))), "        ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Text size"), /* @__PURE__ */ l.createElement("div", { className: "settings-inline" }, /* @__PURE__ */ l.createElement("input", { type: "range", id: "lsz", min: "24", max: "160", "aria-label": "Output text size", disabled: i.jizura, value: u.lsz, onChange: (f) => {
    W.controls.set("lsz", f.currentTarget.value), p(f);
  } }))), "        ", /* @__PURE__ */ l.createElement("label", { className: "field", hidden: i.classic }, /* @__PURE__ */ l.createElement("span", null, "Text color"), /* @__PURE__ */ l.createElement("input", { type: "color", id: "lcol", disabled: i.jizura, value: u.lcol, onChange: (f) => {
    W.controls.set("lcol", f.currentTarget.value), p(f);
  } })), "        ", /* @__PURE__ */ l.createElement("label", { id: "classicColorField", className: "field", hidden: !i.classic }, /* @__PURE__ */ l.createElement("span", null, "Sung highlight"), /* @__PURE__ */ l.createElement("input", { type: "color", id: "lclassiccolor", value: u.lclassiccolor, onChange: (f) => {
    W.controls.set("lclassiccolor", f.currentTarget.value), p(f);
  } })), "      "), "      ", /* @__PURE__ */ l.createElement("small", { id: "classicHint", hidden: !i.classic }, "Two alternating lines, white words and a sung highlight. Enhanced LRC follows word timestamps; regular LRC estimates the sweep. Choose Sung highlight or a color palette for the sweep (blue by default)."), "      ", /* @__PURE__ */ l.createElement("div", { className: "row spaced" }, /* @__PURE__ */ l.createElement("button", { className: "s", id: "lrandom", type: "button", title: i.randomTitle, disabled: !i.jizura, onClick: () => W.commands.actions("obs")?.randomizeJizura() }, s("shuffle"), "Shuffle JIZURA style")), "      ", /* @__PURE__ */ l.createElement("div", { className: "output-reaction" }, /* @__PURE__ */ l.createElement("button", { className: "s", id: "audioReaction", type: "button" }, "Enable audio reaction"), /* @__PURE__ */ l.createElement("small", { id: "audioStatus" }, "Share the karaoke tab with tab audio enabled. No recording.")), "    "), "    ", /* @__PURE__ */ l.createElement("section", { className: "section-divider", "aria-label": "Output typography" }, "      ", /* @__PURE__ */ l.createElement("h3", null, "Type & layout"), "      ", /* @__PURE__ */ l.createElement("div", { className: "type-settings" }, "        ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Font family"), /* @__PURE__ */ l.createElement("select", { id: "lfont", disabled: i.jizura, value: u.lfont, onChange: (f) => {
    W.controls.set("lfont", f.currentTarget.value), p(f);
  } }, dd.map(([f], g) => /* @__PURE__ */ l.createElement("option", { key: g, value: g }, c(f))))), "        ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Custom font"), /* @__PURE__ */ l.createElement("input", { id: "lfc", maxLength: "120", placeholder: "An installed or Google font", disabled: i.jizura, value: u.lfc, onChange: (f) => {
    W.controls.set("lfc", f.currentTarget.value), p(f);
  } })), "        ", /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { type: "checkbox", id: "lbold", disabled: i.jizura, checked: u.lbold, onChange: (f) => {
    W.controls.set("lbold", f.currentTarget.checked), p(f);
  } }), "Bold lyrics"), "      "), "      ", /* @__PURE__ */ l.createElement("small", { className: "setting-help" }, "Fonts marked “online” load from Google Fonts. Installed fonts work locally."), "      ", /* @__PURE__ */ l.createElement("div", { id: "centerRow" }, "        ", /* @__PURE__ */ l.createElement("div", { className: "layout-options" }, "          ", /* @__PURE__ */ l.createElement("div", { className: "row" }, "            ", /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { type: "checkbox", id: "lcenter", checked: u.lcenter, onChange: (f) => {
    W.controls.set("lcenter", f.currentTarget.checked), p(f);
  } }), "Keep centre free"), "            ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Output frame"), /* @__PURE__ */ l.createElement("select", { id: "lshape", value: u.lshape, onChange: (f) => {
    W.controls.set("lshape", f.currentTarget.value), p(f);
  } }, /* @__PURE__ */ l.createElement("option", { value: "auto" }, "Automatic"), /* @__PURE__ */ l.createElement("option", { value: "wide" }, "Landscape"), /* @__PURE__ */ l.createElement("option", { value: "tall" }, "Portrait"))), "          "), "          ", /* @__PURE__ */ l.createElement("div", { className: "cf-preview", id: "cfpreview", "data-shape": i.shape, style: {
    opacity: i.centerFree ? 1 : 0.42
  }, title: i.centerTitle }, /* @__PURE__ */ l.createElement("span", { className: "cf-free" }), /* @__PURE__ */ l.createElement("i", { className: "cf-line cf-a" }), /* @__PURE__ */ l.createElement("i", { className: "cf-line cf-b" })), "        "), "        ", /* @__PURE__ */ l.createElement("small", { id: "centerHint" }, i.centerHint), "      "), "    "), "  ");
}
const Ye = l.createElement;
function bf({
  state: i
}) {
  const u = (c) => Ye("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ye("use", {
    href: `./manokara-icons.svg#${c}`
  })), s = (c) => () => W.commands.actions("player")?.[c]?.();
  return Ye(l.Fragment, null, Ye("div", {
    className: "transport-buttons"
  }, Ye("button", {
    className: "ghost icon-button",
    id: "prev",
    type: "button",
    title: i.previous,
    "aria-label": i.previous,
    onClick: s("previous")
  }, u("skip-back")), Ye("button", {
    id: "play",
    type: "button",
    onClick: s("play")
  }, u("play"), Ye("span", null, i.play)), Ye("button", {
    className: "ghost",
    id: "pause",
    type: "button",
    onClick: s("pause")
  }, u(i.paused ? "play" : "pause"), Ye("span", null, i.paused ? i.resume : i.pause)), Ye("button", {
    className: "ghost icon-button",
    id: "next",
    type: "button",
    title: i.next,
    "aria-label": i.next,
    onClick: s("next")
  }, u("skip-forward")), Ye("button", {
    className: "ghost",
    id: "stop",
    type: "button",
    onClick: s("stop")
  }, u("stop"), Ye("span", null, i.stop))), Ye("div", {
    className: "key-control",
    "aria-label": i.keyLabel
  }, Ye("span", {
    className: "key-label"
  }, i.keyLabel), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-step": "-1",
    "aria-label": i.lower,
    disabled: !i.canPitch || i.key <= -12,
    onClick: () => W.commands.actions("player")?.stepKey(-1)
  }, "−"), Ye("output", {
    "data-pitch-value": ""
  }, i.key > 0 ? `+${i.key}` : String(i.key)), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-step": "1",
    "aria-label": i.raise,
    disabled: !i.canPitch || i.key >= 12,
    onClick: () => W.commands.actions("player")?.stepKey(1)
  }, "+"), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-reset": "",
    title: i.originalKey,
    "aria-label": i.originalKey,
    disabled: !i.canPitch || i.key === 0,
    onClick: s("resetKey")
  }, "↺")), Ye("label", {
    className: "volume-control"
  }, u("speaker-high"), Ye("input", {
    type: "range",
    id: "vol",
    min: 0,
    max: 100,
    value: i.volume,
    "aria-label": i.volumeLabel,
    onChange: (c) => W.commands.actions("player")?.setVolume(Number(c.target.value))
  })));
}
function Sf({
  state: i,
  onClose: u = W.commands.actions("dialog").closeTranspose
}) {
  const s = (c) => window.ManokaraI18n?.text(c) || c;
  return Ye("div", {
    id: "transposeDialog",
    className: "modal-backdrop",
    hidden: !i.open,
    role: "presentation",
    onClick: (c) => {
      c.target === c.currentTarget && u();
    }
  }, Ye("section", {
    className: "modal-card",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "transposeTitle"
  }, Ye("div", {
    className: "pitch-details"
  }, Ye("div", null, Ye("span", {
    className: "eyebrow"
  }, "Signalsmith Stretch"), Ye("h2", {
    id: "transposeTitle"
  }, s("Song key"))), Ye("p", null, s("Raise or lower the key without changing the speed. Each song remembers its own setting.")), Ye("div", {
    className: "key-control"
  }, Ye("button", {
    className: "s",
    type: "button",
    "aria-label": s("Lower key"),
    onClick: () => W.commands.actions("player")?.stepKey(-1)
  }, "−"), Ye("output", {
    "aria-live": "polite"
  }, i.key > 0 ? `+${i.key}` : String(i.key)), Ye("button", {
    className: "s",
    type: "button",
    "aria-label": s("Raise key"),
    onClick: () => W.commands.actions("player")?.stepKey(1)
  }, "+"), Ye("button", {
    className: "ghost",
    type: "button",
    onClick: () => W.commands.actions("player")?.resetKey()
  }, s("Original key"))), Ye("small", {
    id: "pitchStatus",
    "data-state": i.statusState,
    role: "status",
    "aria-live": "polite"
  }, i.status), Ye("div", {
    className: "row tab-audio-actions"
  }, Ye("button", {
    id: "startTabAudio",
    className: "s",
    type: "button",
    onClick: () => W.commands.actions("player")?.startTabAudio()
  }, s(i.tabAudioActive ? "Open audio window" : "Start Tab Audio")), Ye("button", {
    id: "stopTabAudio",
    className: "ghost",
    type: "button",
    disabled: !i.tabAudioActive && !i.tabAudioBusy,
    onClick: () => W.commands.actions("player")?.stopTabAudio()
  }, s("Stop Tab Audio"))), Ye("p", null, s("YouTube keeps its own player. Choose the Manokara tab and share tab audio in the audio window. Keep that window open while singing.")), Ye("small", null, s("Try small shifts first (±1–4 semitones). Large shifts can change the sound of a full mix. Lyrics compensate for the processor's audio delay.")), Ye("div", {
    className: "row"
  }, Ye("button", {
    className: "s",
    id: "transposeClose",
    type: "button",
    onClick: u
  }, s("Close"))))));
}
l.createElement;
function Ef({
  message: i,
  text: u
}) {
  const s = Be.useRef(null);
  Be.useEffect(() => () => s.current?.(), []);
  const c = (p) => {
    s.current?.();
    try {
      s.current = p.currentTarget.contentWindow.ManokaraOutput?.disconnectPreview;
    } catch {
      s.current = null;
    }
  };
  return /* @__PURE__ */ l.createElement("div", { id: "stageLyricsPreview", className: "stage-lyric-preview", role: "region", "aria-label": u("Lyrics preview") }, /* @__PURE__ */ l.createElement("iframe", { id: "stageLyricsFrame", src: "./manokara-obs.html?preview=stage", title: u("Current song lyric preview"), allow: "autoplay", onLoad: c }), i && /* @__PURE__ */ l.createElement("div", { className: "stage-preview-message", role: "status" }, /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#music-notes" })), /* @__PURE__ */ l.createElement("p", null, u(i))));
}
function Cf({
  state: i
}) {
  const u = jo("outputValues"), [s, c] = Be.useState("media"), [p, f] = Be.useState(!0);
  Be.useEffect(() => {
    const x = (C) => f(C.detail === "karaoke");
    return window.addEventListener("manokara:mainviewchange", x), () => window.removeEventListener("manokara:mainviewchange", x);
  }, []);
  const g = s === "lyrics", y = g && p, d = (x) => window.ManokaraI18n?.text(x) || x, M = (x) => /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#" + x }));
  return /* @__PURE__ */ l.createElement("section", { className: "card", id: "player", "aria-label": "Karaoke player" }, /* @__PURE__ */ l.createElement("div", { className: "player-head" }, /* @__PURE__ */ l.createElement("span", { className: "eyebrow" }, "Your stage"), /* @__PURE__ */ l.createElement("div", { className: "stage-view-switch", role: "group", "aria-label": d("Stage view") }, /* @__PURE__ */ l.createElement("button", { id: "stageMediaButton", type: "button", "aria-pressed": !g, "aria-controls": "stageMediaRoot", onClick: () => c("media") }, "YouTube"), /* @__PURE__ */ l.createElement("button", { id: "stageLyricsButton", type: "button", "aria-pressed": g, "aria-controls": "stageLyricsPreview", onClick: () => c("lyrics") }, d("Lyrics preview"))), /* @__PURE__ */ l.createElement("span", { className: "playback-state", id: "playbackState", "data-state": i.playbackState }, i.playbackLabel)), /* @__PURE__ */ l.createElement("div", { id: "stage" }, /* @__PURE__ */ l.createElement("div", { id: "stageMediaRoot", inert: y ? "" : void 0, "aria-hidden": y || void 0 }), y && /* @__PURE__ */ l.createElement(Ef, { message: i.previewMessage, text: d }), !y && i.stageMode === "empty" && /* @__PURE__ */ l.createElement("div", { className: "stage-empty" }, /* @__PURE__ */ l.createElement("div", { className: "stage-glyph" }, M("waveform")), /* @__PURE__ */ l.createElement("h2", null, d("Your next song starts here.")), /* @__PURE__ */ l.createElement("p", null, d("Add a karaoke link, find your lyrics,"), /* @__PURE__ */ l.createElement("br", null), d("and let your voice take the lead.")), /* @__PURE__ */ l.createElement("button", { className: "stage-add", type: "button", onClick: () => W.commands.actions("setlist")?.openEditor() }, M("plus"), d("Add your first song"))), !y && i.stageMode === "mc" && /* @__PURE__ */ l.createElement("div", { className: "stage-empty mc-stage" }, /* @__PURE__ */ l.createElement("div", { className: "stage-glyph" }, M("microphone-stage")), /* @__PURE__ */ l.createElement("h2", null, i.stageTitle), /* @__PURE__ */ l.createElement("p", null, i.stageNote)), !y && i.stageMode === "external" && /* @__PURE__ */ l.createElement("div", { className: "stage-empty" }, /* @__PURE__ */ l.createElement("div", { className: "stage-glyph" }, M("link")), /* @__PURE__ */ l.createElement("h2", null, i.stageTitle), /* @__PURE__ */ l.createElement("p", null, i.stageNote), /* @__PURE__ */ l.createElement("a", { className: "stage-add", href: i.stageUrl, target: "_blank", rel: "noopener" }, i.stageLinkLabel, " ", M("arrow-up-right"))), !y && i.countdownVisible && /* @__PURE__ */ l.createElement("div", { id: "ov" }, /* @__PURE__ */ l.createElement("b", null, i.countdownTitle), /* @__PURE__ */ l.createElement("span", null, i.countdownValue), /* @__PURE__ */ l.createElement("small", null, i.countdownHint))), /* @__PURE__ */ l.createElement("div", { className: "now-row" }, /* @__PURE__ */ l.createElement("b", { id: "now" }, i.now), /* @__PURE__ */ l.createElement("span", { className: "mu", id: "time" }, i.time), /* @__PURE__ */ l.createElement("a", { id: "yt", href: i.youtubeUrl || "#", target: "_blank", rel: "noopener", hidden: !i.youtubeUrl }, /* @__PURE__ */ l.createElement("span", null, "Open on YouTube"), M("arrow-up-right"))), /* @__PURE__ */ l.createElement("div", { className: "transport", id: "transportReactRoot" }), /* @__PURE__ */ l.createElement("div", { className: "player-options" }, /* @__PURE__ */ l.createElement("div", { className: "row" }, /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { type: "checkbox", id: "skip", checked: u.skip, onChange: (x) => {
    W.controls.set("skip", x.currentTarget.checked);
  } }), "Skip unavailable songs"), /* @__PURE__ */ l.createElement("label", { className: "countdown-control" }, "Countdown", /* @__PURE__ */ l.createElement("input", { type: "number", id: "cdn", min: "0", max: "30", "aria-label": "Countdown seconds", value: u.cdn, onChange: (x) => {
    W.controls.set("cdn", x.currentTarget.value), W.commands.actions("obs")?.settingChanged("cdn");
  } }), "s")), /* @__PURE__ */ l.createElement("div", { id: "msg", role: "status", "aria-live": "polite" }, i.message)));
}
const Ea = Object.freeze([
  { id: "lrclib", label: "LRCLIB", enabled: !0 },
  { id: "netease", label: "NetEase", enabled: !0 },
  { id: "qq", label: "QQ Music · Better Lyrics", enabled: !0, reason: "cache_only" },
  { id: "zing", label: "Zing MP3", enabled: !0 },
  { id: "amll", label: "AMLL TTML", enabled: !0 },
  { id: "musixmatch", label: "Musixmatch", enabled: !1, reason: "needs_key" }
]), Tf = [{ id: "megalobiz", label: "Megalobiz" }], Hu = Object.freeze({
  ok: "Found lyrics",
  empty: "No lyrics found",
  partial: "Some results could not be loaded",
  stale: "Showing recent results while the source is temporarily unavailable",
  timeout: "Source took too long",
  limited: "Source rate limit reached",
  restricted: "Source requires verification",
  credentials: "API access needs attention",
  needs_key: "QQ needs a server Better Lyrics API key for uncached songs.",
  unavailable: "Source is temporarily unavailable",
  invalid: "Source returned an unreadable response"
});
function $u(i) {
  return Array.isArray(i) ? Ea.map((u) => {
    const s = i.find((c) => c && c.id === u.id);
    return { ...u, enabled: s?.enabled === !0, reason: String(s?.reason || "") };
  }) : [];
}
const qu = /\[\d{1,3}:[0-5]\d(?:[.:]\d{1,3})?\]/g, Lf = (i) => i.split(/\r?\n/).some((u) => /^\s*\[\d/.test(u) && u.match(qu) && u.replace(qu, "").trim());
function Mf(i) {
  if (!Array.isArray(i)) throw Error("Invalid lyric search results.");
  return i.slice(0, 24).filter((u) => u && typeof u.trackName == "string" && typeof u.artistName == "string").map((u) => ({
    ...u,
    syncedLyrics: typeof u.syncedLyrics == "string" && Lf(u.syncedLyrics) ? u.syncedLyrics : null,
    plainLyrics: typeof u.plainLyrics == "string" ? u.plainLyrics : null,
    sources: Ki(u.sources)
  })).filter((u) => u.syncedLyrics || u.plainLyrics).sort((u, s) => +!!s.syncedLyrics - +!!u.syncedLyrics);
}
function Vn(i) {
  try {
    const u = new URL(i);
    return (["lrclib.net", "music.163.com", "y.qq.com", "zingmp3.vn", "megalobiz.com", "www.megalobiz.com", "musixmatch.com", "www.musixmatch.com"].includes(u.hostname) || u.hostname === "github.com" && u.pathname.startsWith("/amll-dev/amll-ttml-db/")) && u.protocol === "https:" && !u.username && !u.password && (!u.port || u.port === "443") ? u.href : "";
  } catch {
    return "";
  }
}
function Wu(i = [], u = (s) => s) {
  if (!Array.isArray(i)) return "";
  const s = [];
  return (i.includes("auxiliary") || i.includes("background")) && s.push(u("TTML imports main lyrics. Supplied translations, romanization and backing vocals are omitted; you can create Romaji after importing.")), i.includes("overlap") && s.push(u("These lyrics have overlapping lines. Their timing is kept, but views with one active line may show only one part.")), i.includes("reserved_characters") && s.push(u("Literal brackets in lyric text use fullwidth characters to preserve the lyric timeline.")), i.includes("word_timing_unavailable") && s.push(u("Word timing could not be read. Line timing was loaded instead.")), s.join(" ");
}
function Ki(i) {
  if (typeof i == "string")
    try {
      i = JSON.parse(i);
    } catch {
      return [];
    }
  return Array.isArray(i) ? i.slice(0, 8).flatMap((u) => {
    const s = [...Ea, ...Tf].find((c) => c.id === u?.id);
    return s ? [{ id: s.id, label: s.label, url: Vn(u.url) }] : [];
  }) : [];
}
const Ve = l.createElement, xf = l.memo(function({
  state: u
}) {
  const {
    lines: s,
    active: c,
    empty: p,
    fontSize: f,
    mode: g,
    modeDisabled: y,
    romajiAvailable: d,
    modeStatus: M,
    info: x,
    source: C,
    syncValue: N,
    syncColor: D,
    syncDisabled: b,
    labels: w
  } = u, S = Be.useRef(null), E = Ki(C?.sources), I = window.ManokaraI18n?.text("Lyrics source") || "Lyrics source", U = Be.useRef([]);
  Be.useLayoutEffect(() => {
    if (c < 0) return;
    const j = S.current, V = U.current[c];
    j && V && (j.scrollTop = V.offsetTop - j.clientHeight / 2 + V.clientHeight / 2);
  }, [s, c]);
  const P = (j) => Ve("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ve("use", {
    href: `./manokara-icons.svg#${j}`
  })), A = (j) => () => W.commands.actions("lyrics")?.[j]?.();
  return Ve(l.Fragment, null, Ve("div", {
    className: "section-head lyrics-heading"
  }, Ve("div", {
    className: "section-title"
  }, Ve("h2", {
    id: "lyricsTitle"
  }, w.title)), Ve("div", {
    className: "row"
  }, Ve("button", {
    className: "ghost",
    id: "fm",
    type: "button",
    "aria-label": w.smaller,
    onClick: () => W.commands.actions("lyrics")?.font(-2)
  }, "A−"), Ve("button", {
    className: "ghost",
    id: "fp",
    type: "button",
    "aria-label": w.larger,
    onClick: () => W.commands.actions("lyrics")?.font(2)
  }, "A+"))), Ve("div", {
    className: "lyrics-mode-row"
  }, Ve("label", {
    htmlFor: "liveLyricMode"
  }, w.lyrics), Ve("select", {
    id: "liveLyricMode",
    "aria-label": w.chooseLyrics,
    value: g,
    disabled: y,
    onChange: (j) => W.commands.actions("lyrics")?.setMode(j.target.value)
  }, Ve("option", {
    value: "original"
  }, w.original), Ve("option", {
    value: "romaji",
    disabled: !d
  }, w.romaji), Ve("option", {
    value: "both",
    disabled: !d
  }, w.both)), Ve("small", {
    id: "liveLyricModeStatus",
    role: "status",
    "aria-live": "polite"
  }, M)), Ve("div", {
    id: "pan",
    ref: S,
    tabIndex: 0,
    "aria-label": w.currentLyrics,
    style: {
      "--ps": `${f}px`
    }
  }, p ? Ve("div", {
    className: "lyrics-empty"
  }, P("text-align-left"), Ve("span", null, p.primary, Ve("br"), p.secondary)) : s.map((j, V) => Ve("div", {
    key: `${V}:${j.t}:${j.x}`,
    className: `ln${V === c ? " cl" : ""}`,
    ref: (Q) => {
      U.current[V] = Q;
    },
    "aria-current": V === c ? "true" : void 0
  }, j.x ? j.x : P("music-notes"), j.romaji && Ve("span", {
    className: "romanized"
  }, j.romaji)))), C?.label ? Ve(
    "div",
    { className: "lyric-attribution live-lyric-source", "data-no-i18n": "" },
    I + ": ",
    E.length ? E.map((j, V) => Ve(
      l.Fragment,
      { key: `${j.id}-${V}` },
      V ? " · " : null,
      j.url ? Ve("a", { href: j.url, target: "_blank", rel: "noopener noreferrer" }, j.label + " ↗") : j.label
    )) : Vn(C.url) ? Ve("a", { href: Vn(C.url), target: "_blank", rel: "noopener noreferrer" }, C.label) : C.label,
    C.copyright ? Ve("small", null, C.copyright) : null
  ) : null, Ve("small", {
    id: "pinfo",
    className: "mu"
  }, x), Ve("div", {
    className: "lyrics-footer"
  }, Ve("div", {
    className: "sync-head"
  }, Ve("span", null, w.liveSync), Ve("b", {
    id: "offv",
    title: w.currentSync,
    style: {
      color: D
    }
  }, N)), Ve("div", {
    className: "sync-buttons"
  }, Ve("button", {
    className: "s",
    id: "lm",
    type: "button",
    disabled: b,
    onClick: () => W.commands.actions("lyrics")?.nudge(-0.5)
  }, "−0.5 s"), Ve("button", {
    className: "s",
    id: "lp",
    type: "button",
    disabled: b,
    onClick: () => W.commands.actions("lyrics")?.nudge(0.5)
  }, "+0.5 s"), Ve("button", {
    className: "ghost",
    id: "lz",
    type: "button",
    disabled: b,
    onClick: A("resetSync")
  }, w.reset)), Ve("small", {
    id: "offh"
  }, w.syncHelp), Ve("div", {
    className: "timing-action"
  }, Ve("button", {
    className: "ghost",
    id: "tap",
    type: "button",
    onClick: A("tap")
  }, P("clock"), w.setLineTime), Ve("kbd", null, "T"))));
});
l.createElement;
function Nf({ state: i, results: u, statuses: s = [] }) {
  const c = (p) => window.ManokaraI18n?.text(p) || p;
  return /* @__PURE__ */ l.createElement("div", { className: "lyric-search-output", hidden: !i, "data-no-i18n": "" }, /* @__PURE__ */ l.createElement("ol", { id: "lres", "aria-label": c("Lyric search results") }, i === "results" ? u.length ? u.map((p, f) => /* @__PURE__ */ l.createElement("li", { key: `${p.title}-${f}` }, /* @__PURE__ */ l.createElement("button", { className: "lyric-result-button", type: "button", onClick: () => W.commands.actions("editor")?.selectLyric(f) }, /* @__PURE__ */ l.createElement("span", { className: "lyric-result-copy" }, /* @__PURE__ */ l.createElement("span", null, p.title), /* @__PURE__ */ l.createElement("small", { className: p.timed ? "lyric-result-timed" : "" }, p.kind)), /* @__PURE__ */ l.createElement("small", null, p.duration)), /* @__PURE__ */ l.createElement("div", { className: "lyric-result-sources" }, (p.sources || []).map((g, y) => /* @__PURE__ */ l.createElement(l.Fragment, { key: `${g.label}-${y}` }, y > 0 ? " · " : null, g.url ? /* @__PURE__ */ l.createElement("a", { href: g.url, target: "_blank", rel: "noopener noreferrer" }, g.label, " ↗") : g.label))))) : /* @__PURE__ */ l.createElement("li", { className: "search-message" }, c(s.length ? "No lyrics returned. Some sources could not be reached." : "No results.")) : i ? /* @__PURE__ */ l.createElement("li", { className: "search-message", role: "status" }, i) : null), s.length > 0 ? /* @__PURE__ */ l.createElement("div", { className: "lyric-source-notices", role: "status" }, s.map((p) => /* @__PURE__ */ l.createElement("small", { key: p.id }, p.label, ": ", p.message))) : null);
}
function Pf({
  view: i
}) {
  const u = yf(), s = jo("lyricSearch"), c = s.providers?.length ? s.providers : Ea, p = Ki(u.lyricSources), f = (d) => window.ManokaraI18n?.text(d) || d, g = (d) => d.enabled ? d.reason === "cache_only" ? f("Cached songs only") : "" : f(d.reason === "needs_key" ? "Needs server API key" : "Disabled on server"), y = (d) => /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: `./manokara-icons.svg#${d}` }));
  return /* @__PURE__ */ l.createElement(l.Fragment, null, "    ", /* @__PURE__ */ l.createElement("div", { className: "studio-dialog-head" }, "      ", /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("span", { className: "eyebrow" }, "Manokara"), /* @__PURE__ */ l.createElement("h2", { id: "songDialogTitle" }, i.title)), "      ", /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", id: "closeSongEditor", type: "button", "aria-label": "Close song editor", onClick: () => document.getElementById("songEditorDialog")?.close() }, y("x")), "    "), "    ", /* @__PURE__ */ l.createElement("div", { id: "songEditorMount" }, "      ", /* @__PURE__ */ l.createElement("section", { className: "tabpanel", id: "panel-song", role: "region", "aria-labelledby": "songDialogTitle" }, "        ", /* @__PURE__ */ l.createElement("div", { className: "panel-intro" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("h2", { id: "ftitle" }, i.title), /* @__PURE__ */ l.createElement("p", null, "A karaoke link, a few lyrics, and you're ready."))), "        ", /* @__PURE__ */ l.createElement("div", { className: "field-grid" }, "          ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Karaoke link"), /* @__PURE__ */ l.createElement("input", { id: "url", type: "url", placeholder: "Paste a YouTube or media URL", autoComplete: "off", value: u.url, onChange: (d) => {
    W.draft.set("url", d.currentTarget.value), W.commands.actions("editor")?.urlChanged();
  } })), "          ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Song title"), /* @__PURE__ */ l.createElement("input", { id: "ttl", maxLength: "512", placeholder: "Fetched automatically", autoComplete: "off", value: u.ttl, onChange: (d) => {
    W.draft.set("ttl", d.currentTarget.value);
  } })), "        "), "        ", /* @__PURE__ */ l.createElement("div", { className: "clip-row" }, "          ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "Start at"), /* @__PURE__ */ l.createElement("input", { id: "st", placeholder: "00:00", inputMode: "decimal", value: u.st, onChange: (d) => {
    W.draft.set("st", d.currentTarget.value);
  } })), "          ", /* @__PURE__ */ l.createElement("label", { className: "field" }, /* @__PURE__ */ l.createElement("span", null, "End at"), /* @__PURE__ */ l.createElement("input", { id: "en", placeholder: "Full song", inputMode: "decimal", value: u.en, onChange: (d) => {
    W.draft.set("en", d.currentTarget.value);
  } })), "          ", /* @__PURE__ */ l.createElement("small", null, "Play the whole song or choose a section. End is optional."), "        "), "        ", /* @__PURE__ */ l.createElement("section", { className: "section-divider", "aria-label": "Song lyrics" }, "          ", /* @__PURE__ */ l.createElement("h3", null, "Bring the words along"), "          ", /* @__PURE__ */ l.createElement("div", { className: "search-row" }, /* @__PURE__ */ l.createElement(
    "input",
    {
      id: "lq",
      maxLength: "200",
      "aria-label": "Search lyrics by song or artist",
      placeholder: "Song or artist",
      value: u.lq,
      onKeyDown: (d) => {
        d.key === "Enter" && !d.nativeEvent.isComposing && (d.preventDefault(), W.commands.actions("editor")?.searchLyrics());
      },
      onChange: (d) => {
        W.draft.set("lq", d.currentTarget.value), W.commands.actions("editor")?.clearLyricSearch();
      }
    }
  ), /* @__PURE__ */ l.createElement("button", { className: "s", id: "lsearch", type: "button", "aria-busy": s.busy || !1, onClick: () => W.commands.actions("editor")?.searchLyrics() }, y("magnifying-glass"), "Find lyrics"), /* @__PURE__ */ l.createElement("button", { className: "text-link", id: "lyricsify", type: "button", title: "Search Lyricsify in a new browser tab" }, "Lyricsify", y("arrow-up-right"))), /* @__PURE__ */ l.createElement("div", { className: "lyric-source-controls", "data-no-i18n": "" }, /* @__PURE__ */ l.createElement("label", { htmlFor: "lyricProvider" }, f("Source"), /* @__PURE__ */ l.createElement("select", { id: "lyricProvider", value: u.lyricProvider, onChange: (d) => {
    W.draft.set("lyricProvider", d.currentTarget.value), W.commands.actions("editor")?.clearLyricSearch();
  } }, /* @__PURE__ */ l.createElement("option", { value: "auto" }, f("All sources")), c.map((d) => /* @__PURE__ */ l.createElement("option", { key: d.id, value: d.id, disabled: !d.enabled }, d.label, g(d) ? ` · ${g(d)}` : "")))), /* @__PURE__ */ l.createElement("small", null, f("Timed lyrics first, regardless of source."))), /* @__PURE__ */ l.createElement("p", { id: "lyricLoadStatus", className: "lyric-load-status", role: "status", "aria-live": "polite", hidden: !u.lyricLoadStatus }, u.lyricLoadStatus), /* @__PURE__ */ l.createElement("div", { id: "lyricSearchResultsReactRoot" }), u.lyricSourceLabel ? /* @__PURE__ */ l.createElement("p", { className: "lyric-attribution", "data-no-i18n": "" }, f("Lyrics source"), ": ", p.length ? p.map((d, M) => /* @__PURE__ */ l.createElement(l.Fragment, { key: `${d.id}-${M}` }, M ? " · " : null, d.url ? /* @__PURE__ */ l.createElement("a", { href: d.url, target: "_blank", rel: "noopener noreferrer" }, d.label, " ↗") : d.label)) : Vn(u.lyricSourceUrl) ? /* @__PURE__ */ l.createElement("a", { href: Vn(u.lyricSourceUrl), target: "_blank", rel: "noopener noreferrer" }, u.lyricSourceLabel, " ↗") : u.lyricSourceLabel, u.lyricCopyright ? /* @__PURE__ */ l.createElement("small", null, u.lyricCopyright) : null) : null, /* @__PURE__ */ l.createElement("div", { id: "lyricDraft" }, "            ", /* @__PURE__ */ l.createElement("div", { className: "editor-toolbar" }, "              ", /* @__PURE__ */ l.createElement("button", { className: "ghost", id: "importLrc", type: "button" }, y("upload-simple"), "Import LRC / TTML"), "              ", /* @__PURE__ */ l.createElement("input", { id: "lrcFile", type: "file", accept: ".lrc,.ttml", hidden: !0 }), "              ", /* @__PURE__ */ l.createElement("label", null, "Encoding", /* @__PURE__ */ l.createElement("select", { id: "lrcEncoding", value: u.lrcEncoding, onChange: (d) => {
    W.draft.set("lrcEncoding", d.currentTarget.value);
  } }, "                ", /* @__PURE__ */ l.createElement("option", { value: "auto" }, "Auto · UTF-8 / Shift_JIS"), /* @__PURE__ */ l.createElement("option", { value: "utf-8" }, "UTF-8"), /* @__PURE__ */ l.createElement("option", { value: "shift_jis" }, "Shift_JIS"), /* @__PURE__ */ l.createElement("option", { value: "utf-16le" }, "UTF-16LE"), "              ")), "            "), "            ", /* @__PURE__ */ l.createElement("textarea", { id: "llrc", "aria-label": "Original lyrics LRC", maxLength: "200000", placeholder: `[00:12.00] Your first line…
[00:16.50] Your next line…

Paste lyrics or drop an .lrc or .ttml file here.`, value: u.llrc, onChange: (d) => {
    W.draft.set("llrc", d.currentTarget.value), W.commands.actions("editor")?.lyricsChanged();
  } }), "            ", /* @__PURE__ */ l.createElement("div", { className: "romaji-row" }, "              ", /* @__PURE__ */ l.createElement("button", { className: "s", id: "romanize", type: "button", disabled: u.romanizeBusy || u.importBusy }, "Create Romaji"), "              ", /* @__PURE__ */ l.createElement("label", null, "Display", /* @__PURE__ */ l.createElement("select", { id: "lyricMode", value: u.lyricMode, onChange: (d) => {
    W.draft.set("lyricMode", d.currentTarget.value);
  } }, /* @__PURE__ */ l.createElement("option", { value: "original" }, "Original lyrics"), /* @__PURE__ */ l.createElement("option", { value: "romaji", disabled: !u.romajiAvailable }, "Romaji"), /* @__PURE__ */ l.createElement("option", { value: "both", disabled: !u.romajiAvailable }, "Original + Romaji"))), "            "), "            ", /* @__PURE__ */ l.createElement("details", { id: "romajiDetails", open: u.romajiOpen, onToggle: (d) => W.draft.set("romajiOpen", d.currentTarget.open) }, "              ", /* @__PURE__ */ l.createElement("summary", null, "Review / edit Romaji"), "              ", /* @__PURE__ */ l.createElement("small", null, "Edit readings only. Keep timestamps, metadata and blank lines unchanged. In dual mode, Romaji appears below the original words."), "              ", /* @__PURE__ */ l.createElement("textarea", { id: "romajiLrc", "aria-label": "Romaji lyrics LRC", maxLength: "200000", spellCheck: !1, value: u.romajiLrc, onChange: (d) => {
    W.draft.set("romajiLrc", d.currentTarget.value);
  } }), "              ", /* @__PURE__ */ l.createElement("button", { className: "s", id: "exportRomaji", type: "button" }, y("download-simple"), "Download Romaji LRC"), "            "), "            ", /* @__PURE__ */ l.createElement("small", { id: "lyricsStatus", role: "status", "aria-live": "polite", className: u.lyricsError ? "error" : "" }, u.lyricsStatus), "          "), "        "), "        ", /* @__PURE__ */ l.createElement("div", { className: "form-actions" }, "          ", /* @__PURE__ */ l.createElement("label", { className: "pitch-song-field" }, "Song key", /* @__PURE__ */ l.createElement("input", { id: "songKey", type: "number", min: "-12", max: "12", step: "1", "aria-label": "Saved song key in semitones", value: u.songKey, onChange: (d) => {
    W.draft.set("songKey", d.currentTarget.value);
  } })), "          ", /* @__PURE__ */ l.createElement("label", null, "Lyric offset", /* @__PURE__ */ l.createElement("input", { type: "number", id: "loff", step: "0.1", "aria-label": "Lyric offset in seconds", value: u.loff, onChange: (d) => {
    W.draft.set("loff", d.currentTarget.value);
  } }), "s"), "          ", /* @__PURE__ */ l.createElement("label", { className: "inline-check library-save-check" }, /* @__PURE__ */ l.createElement("input", { type: "checkbox", id: "saveToLibrary", checked: u.saveToLibrary, onChange: (d) => {
    W.draft.set("saveToLibrary", d.currentTarget.checked);
  } }), "Keep in My songs"), "          ", /* @__PURE__ */ l.createElement("div", { className: "row" }, /* @__PURE__ */ l.createElement("button", { className: "ghost", id: "cancel", type: "button", hidden: !i.editing, onClick: () => W.commands.actions("editor")?.cancel() }, "Cancel edit"), /* @__PURE__ */ l.createElement("button", { id: "add", type: "button", onClick: () => W.commands.actions("editor")?.save(), disabled: u.saving || u.importBusy }, y(i.editing ? "check" : "plus"), /* @__PURE__ */ l.createElement("span", null, i.saveLabel))), "        "), "        ", /* @__PURE__ */ l.createElement("details", { id: "mcDetails" }, "          ", /* @__PURE__ */ l.createElement("summary", null, "Add an MC break"), "          ", /* @__PURE__ */ l.createElement("div", { className: "row" }, /* @__PURE__ */ l.createElement("input", { id: "mcm", maxLength: "4096", placeholder: "Your note or announcement", "aria-label": "MC break note", value: u.mcm, onChange: (d) => {
    W.draft.set("mcm", d.currentTarget.value);
  } }), /* @__PURE__ */ l.createElement("input", { id: "mcd", placeholder: "00:30", "aria-label": "MC break duration", value: u.mcd, onChange: (d) => {
    W.draft.set("mcd", d.currentTarget.value);
  } }), /* @__PURE__ */ l.createElement("button", { className: "s", id: "addmc", type: "button", onClick: () => W.commands.actions("editor")?.addBreak() }, y("plus"), "Add break")), "        "), "      "), "    "), "  ");
}
const hd = 80, Rf = 1e4, fd = (i) => typeof i == "string" && i.length > 0 && i.length <= 256 && !/[\u0000-\u001f]/u.test(i);
function Ts(i) {
  const u = typeof i == "string" ? i.trim().replace(/\s+/gu, " ") : "";
  if (!u || u.length > hd || /[\u0000-\u001f]/u.test(u))
    throw new Error("Name your playlist (1–80 characters).");
  return u;
}
function ka(i) {
  if (!Array.isArray(i) || i.length > Rf || !i.every(fd))
    throw new Error("Invalid playlist songs.");
  return [...new Set(i)];
}
function xo(i) {
  if (!i || typeof i != "object" || Array.isArray(i) || !fd(i.playlistId)) return !1;
  try {
    return Ts(i.name) === i.name && ka(i.songIds).length === i.songIds.length && Number.isFinite(i.createdAt) && Number.isFinite(i.updatedAt);
  } catch {
    return !1;
  }
}
function Of(i, u) {
  const s = new Map(u.map((c) => [c.libraryId, c]));
  return (i?.songIds || []).map((c) => s.get(c)).filter(Boolean);
}
const Ut = (i) => /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: `./manokara-icons.svg#${i}` })), Ju = (i) => String(i || "").normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "").toLocaleLowerCase().replace(/đ/g, "d");
function If({ songs: i = [], playlists: u = [], activePlaylistId: s = "", busy: c = !1, status: p = "", error: f = !1, playlistsUnavailable: g = !1 }) {
  const y = (L) => window.ManokaraI18n?.text(L) || L, d = W.commands.actions("library"), [M, x] = Be.useState(""), [C, N] = Be.useState([]), [D, b] = Be.useState(""), [w, S] = Be.useState(null), [E, I] = Be.useState(""), U = Be.useRef(null), P = u.find((L) => L.playlistId === s), A = P ? Of(P, i) : [...i].sort((L, re) => String(L.title || L.url).localeCompare(String(re.title || re.url))), j = Ju(M.trim()), V = A.filter((L) => !j || Ju(`${L.title || ""} ${L.artist || ""}`).includes(j)), Q = new Set(A.map((L) => L.libraryId)), G = new Set(i.map((L) => L.libraryId)), $ = new Map(A.map((L, re) => [L.libraryId, re])), ne = C.filter((L) => Q.has(L)), Z = new Set(ne), Y = V.length > 0 && V.every((L) => Z.has(L.libraryId)), J = V.some((L) => Z.has(L.libraryId)), ie = u.some((L) => L.playlistId === D) ? D : "";
  Be.useEffect(() => {
    x(""), N([]), S(null);
  }, [s]), Be.useEffect(() => {
    w && (U.current?.focus(), U.current?.select());
  }, [w]);
  function ce(L, re) {
    N((de) => re ? [.../* @__PURE__ */ new Set([...de, L])] : de.filter((ge) => ge !== L));
  }
  function te(L) {
    const re = new Set(V.map((de) => de.libraryId));
    N((de) => L ? [.../* @__PURE__ */ new Set([...de, ...re])] : de.filter((ge) => !re.has(ge)));
  }
  function v(L) {
    I(L === "rename" && P?.name || ""), S({ mode: L, id: P?.playlistId, songIds: L === "create" ? [...ne] : [] });
  }
  async function z(L) {
    if (L.preventDefault(), c || !E.trim() || !w) return;
    (w.mode === "rename" ? await d.renamePlaylist(w.id, E) : await d.createPlaylist(E, w.songIds)) && S(null);
  }
  async function _() {
    ie && ne.length && await d.addToPlaylist(ie, ne) && N([]);
  }
  async function k() {
    P && ne.length && await d.removeFromPlaylist(P.playlistId, ne) && N([]);
  }
  return /* @__PURE__ */ l.createElement("div", { className: "library-workspace", "data-no-i18n": "", "aria-busy": c }, /* @__PURE__ */ l.createElement("aside", { className: "library-sidebar", "aria-label": y("Playlists") }, /* @__PURE__ */ l.createElement("div", { className: "library-sidebar-head" }, /* @__PURE__ */ l.createElement("h3", null, y("Playlists"))), /* @__PURE__ */ l.createElement("button", { type: "button", className: "library-folder", "aria-pressed": !P, onClick: () => d.selectPlaylist(""), disabled: c }, Ut("music-notes"), /* @__PURE__ */ l.createElement("span", null, y("All songs")), /* @__PURE__ */ l.createElement("small", null, i.length)), /* @__PURE__ */ l.createElement("nav", { className: "library-folders", "aria-label": y("Your playlists") }, u.map((L) => /* @__PURE__ */ l.createElement(
    "button",
    {
      key: L.playlistId,
      type: "button",
      className: "library-folder",
      title: L.name,
      "aria-pressed": L.playlistId === s,
      disabled: c || g,
      onClick: () => d.selectPlaylist(L.playlistId)
    },
    Ut("playlist"),
    /* @__PURE__ */ l.createElement("span", null, L.name),
    /* @__PURE__ */ l.createElement("small", null, L.songIds.filter((re) => G.has(re)).length)
  )), !u.length && !g ? /* @__PURE__ */ l.createElement("p", { className: "library-sidebar-hint" }, y("Group songs by language, mood, or your next stream.")) : null), /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost library-create", onClick: () => v("create"), disabled: c || g }, Ut("plus"), y("New playlist"))), /* @__PURE__ */ l.createElement("section", { className: "library-main", "aria-label": P?.name || y("All songs") }, /* @__PURE__ */ l.createElement("div", { className: "library-heading" }, /* @__PURE__ */ l.createElement("div", { className: "library-heading-copy" }, /* @__PURE__ */ l.createElement("span", { className: "eyebrow" }, y(P ? "Playlist" : "My songs")), /* @__PURE__ */ l.createElement("h3", null, P?.name || y("All songs"), /* @__PURE__ */ l.createElement("small", null, A.length))), /* @__PURE__ */ l.createElement("div", { className: "library-heading-actions" }, P ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement("button", { type: "button", className: "s", disabled: c || !A.length || g, onClick: () => d.addPlaylist(P.playlistId) }, Ut("plus"), y("Add playlist to setlist")), /* @__PURE__ */ l.createElement(
    "button",
    {
      type: "button",
      className: "ghost icon-button",
      disabled: c || g,
      onClick: () => v("rename"),
      "aria-label": y("Rename playlist"),
      title: y("Rename playlist")
    },
    Ut("pencil-simple")
  ), /* @__PURE__ */ l.createElement(
    "button",
    {
      type: "button",
      className: "ghost icon-button library-danger",
      disabled: c || g,
      onClick: () => d.deletePlaylist(P.playlistId),
      "aria-label": y("Delete playlist"),
      title: y("Delete playlist")
    },
    Ut("trash")
  )) : /* @__PURE__ */ l.createElement("small", { className: "mu" }, y("Select songs to add them to a playlist.")))), w ? /* @__PURE__ */ l.createElement("form", { className: "library-name-form", onSubmit: z, onKeyDown: (L) => {
    L.key === "Escape" && (L.preventDefault(), L.stopPropagation(), c || S(null));
  } }, /* @__PURE__ */ l.createElement("label", { className: "field", htmlFor: "libraryPlaylistName" }, /* @__PURE__ */ l.createElement("span", null, y(w.mode === "rename" ? "Rename playlist" : "New playlist")), /* @__PURE__ */ l.createElement(
    "input",
    {
      ref: U,
      id: "libraryPlaylistName",
      value: E,
      onChange: (L) => I(L.target.value),
      maxLength: hd,
      required: !0,
      disabled: c,
      placeholder: y("e.g. Japanese songs, C-pop, Late-night mood")
    }
  )), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("button", { type: "submit", className: "s", disabled: c || !E.trim() }, y(w.mode === "rename" ? "Save" : "Create playlist")), /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost", disabled: c, onClick: () => S(null) }, y("Cancel"))), w.songIds.length ? /* @__PURE__ */ l.createElement("small", { className: "mu library-name-hint" }, w.songIds.length, " ", y("selected"), " · ", y("Selected songs will be added to this playlist.")) : null) : null, /* @__PURE__ */ l.createElement("label", { className: "field library-search", htmlFor: "librarySearch" }, /* @__PURE__ */ l.createElement("span", { className: "sr-only" }, y("Search my songs")), Ut("magnifying-glass"), /* @__PURE__ */ l.createElement("input", { id: "librarySearch", type: "search", placeholder: y("Song title or artist"), value: M, onChange: (L) => x(L.target.value) })), /* @__PURE__ */ l.createElement("div", { className: "library-selection" }, /* @__PURE__ */ l.createElement("label", { className: "library-select-all" }, /* @__PURE__ */ l.createElement(
    "input",
    {
      type: "checkbox",
      checked: Y,
      disabled: c || !V.length,
      ref: (L) => {
        L && (L.indeterminate = J && !Y);
      },
      onChange: (L) => te(L.target.checked),
      "aria-label": y("Select visible songs")
    }
  ), /* @__PURE__ */ l.createElement("span", null, ne.length ? `${ne.length} ${y("selected")}` : y("Select songs"))), /* @__PURE__ */ l.createElement("div", { className: "library-selection-actions" }, /* @__PURE__ */ l.createElement("select", { value: ie, onChange: (L) => b(L.target.value), disabled: c || g || !u.length, "aria-label": y("Choose a playlist") }, /* @__PURE__ */ l.createElement("option", { value: "" }, y("Choose a playlist")), u.map((L) => /* @__PURE__ */ l.createElement("option", { key: L.playlistId, value: L.playlistId }, L.name))), /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost", disabled: c || g || !ie || !ne.length, onClick: _ }, Ut("plus"), y("Add to playlist")), P && ne.length ? /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost", disabled: c || g, onClick: k }, y("Remove selected")) : null)), /* @__PURE__ */ l.createElement("div", { className: "library-notice" + (f ? " library-notice-error" : ""), role: "status", "aria-live": "polite" }, /* @__PURE__ */ l.createElement("span", null, p || (c ? y("Saving…") : "")), f ? /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost", disabled: c, onClick: () => d.refresh() }, y("Retry")) : null), V.length ? null : /* @__PURE__ */ l.createElement("div", { id: "libraryEmpty", className: "library-empty" }, Ut(P ? "playlist" : "music-notes"), /* @__PURE__ */ l.createElement("p", null, y(j ? "No matching songs." : P ? "This playlist is empty." : "Your library is empty. Save a song from the editor to keep it here.")), P && !j ? /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost", disabled: c, onClick: () => d.selectPlaylist("") }, y("Choose songs from My songs")) : null), /* @__PURE__ */ l.createElement("ol", { id: "libraryList", "aria-label": y("Saved songs"), "data-ids": JSON.stringify(V.map((L) => L.libraryId)), hidden: !V.length }, V.map((L) => {
    const re = $.get(L.libraryId);
    return /* @__PURE__ */ l.createElement("li", { key: L.libraryId, className: Z.has(L.libraryId) ? "library-song-selected" : "" }, /* @__PURE__ */ l.createElement("input", { type: "checkbox", "aria-label": `${y("Select song")}: ${L.title || L.url}`, checked: Z.has(L.libraryId), disabled: c, onChange: (de) => ce(L.libraryId, de.target.checked) }), /* @__PURE__ */ l.createElement("div", { className: "library-song-info" }, /* @__PURE__ */ l.createElement("b", { title: L.title || L.url }, L.title || L.url), /* @__PURE__ */ l.createElement("small", null, P ? `${String(re + 1).padStart(2, "0")} · ` : "", L.artist ? `${L.artist} · ` : "", y(L.lrc ? "Lyrics saved" : "No lyrics"))), /* @__PURE__ */ l.createElement("div", { className: "library-song-actions" }, /* @__PURE__ */ l.createElement("button", { className: "s", type: "button", disabled: c, onClick: () => d.add(L.libraryId) }, Ut("plus"), y("Add to setlist")), P ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", type: "button", disabled: c || g || re === 0, onClick: () => d.movePlaylistSong(P.playlistId, L.libraryId, -1, A[re - 1]?.libraryId), "aria-label": y("Move up"), title: y("Move up") }, Ut("arrow-up")), /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", type: "button", disabled: c || g || re === A.length - 1, onClick: () => d.movePlaylistSong(P.playlistId, L.libraryId, 1, A[re + 1]?.libraryId), "aria-label": y("Move down"), title: y("Move down") }, Ut("arrow-down")), /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", type: "button", disabled: c || g, onClick: () => d.removeFromPlaylist(P.playlistId, [L.libraryId]), "aria-label": y("Remove from playlist"), title: y("Remove from playlist") }, Ut("x"))) : /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button library-danger", type: "button", disabled: c, onClick: () => d.remove(L.libraryId), "aria-label": y("Remove from My songs"), title: y("Remove from My songs") }, Ut("trash"))));
  }))));
}
function Af() {
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement("div", { className: "studio-dialog-head" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("span", { className: "eyebrow" }, "Saved on this browser"), /* @__PURE__ */ l.createElement("h2", { id: "libraryTitle" }, "My songs")), /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", id: "closeLibrary", type: "button", "aria-label": "Close song library", onClick: () => document.getElementById("libraryDialog")?.close() }, Ut("x"))), /* @__PURE__ */ l.createElement("div", { className: "library-content" }, /* @__PURE__ */ l.createElement("div", { id: "libraryReactRoot" })));
}
const tt = l.createElement;
function Bf({
  songs: i,
  currentIndex: u,
  labels: s,
  formatTime: c
}) {
  const p = (f) => tt("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, tt("use", {
    href: `./manokara-icons.svg#${f}`
  }));
  return tt(l.Fragment, null, tt("div", {
    className: "section-head setlist-head"
  }, tt("div", {
    className: "section-title"
  }, tt("h2", {
    id: "setlistTitle"
  }, s.setlist), tt("span", {
    className: "count",
    id: "setlistCount"
  }, i.length)), tt("button", {
    className: "ghost setlist-library",
    id: "openLibrary",
    type: "button",
    onClick: () => W.commands.actions("setlist")?.openLibrary(),
    "aria-haspopup": "dialog",
    "aria-controls": "libraryDialog"
  }, p("playlist"), tt("span", null, s.mySongs), tt("span", {
    className: "count",
    id: "libraryCount"
  }, s.libraryCount))), tt("button", {
    className: "s setlist-add",
    id: "openSongEditor",
    type: "button",
    onClick: () => W.commands.actions("setlist")?.openEditor(),
    title: s.addSong
  }, p("plus"), tt("span", null, s.addSong)), tt("div", {
    id: "setlistEmpty",
    className: "empty-setlist",
    hidden: i.length > 0
  }, tt("div", {
    className: "empty-icon"
  }, p("playlist")), tt("p", null, s.emptyTitle), tt("small", null, s.emptyHint)), tt("ol", {
    id: "list",
    "aria-label": s.listLabel
  }, i.map((f, g) => {
    const y = f.mc ? `${s.mcPrefix}${f.memo || s.announcement}` : f.title || f.url, d = f.mc ? f.dur : f.e != null ? f.e - (f.s || 0) : f.mediaDuration, M = f.mc ? s.mcBreak : s.kind(g, f), x = g === u, C = `${f.libraryId || f.url || f.memo || "song"}:${g}`, N = (D, b, w, S = !1) => tt("button", {
      key: D,
      className: "ghost",
      type: "button",
      "data-a": D,
      title: b,
      "aria-label": b,
      disabled: S
    }, p(w));
    return tt("li", {
      key: C,
      className: x ? "on" : "",
      "data-i": g,
      onClick: (D) => {
        const b = D.target.closest("[data-a]");
        b && W.commands.actions("setlist")?.song(g, b.dataset.a);
      }
    }, tt("span", {
      className: "song-number"
    }, String(g + 1).padStart(2, "0")), tt("button", {
      className: "t",
      type: "button",
      "data-a": "go",
      title: y,
      "aria-pressed": x
    }, tt("span", {
      className: "song-name"
    }, y)), tt("small", {
      className: "song-meta"
    }, [M, f.lrc ? s.lyricsReady : "", Number.isFinite(d) ? c(d) : ""].filter(Boolean).join(" · ")), tt("div", {
      className: "list-actions"
    }, [!f.mc && N("ed", s.edit, "pencil-simple"), N("up", s.moveUp, "arrow-up", g === 0), N("dn", s.moveDown, "arrow-down", g === i.length - 1), N("del", s.remove, "x")].filter(Boolean)));
  })), tt("div", {
    className: "setlist-footer"
  }, tt("button", {
    className: "ghost",
    id: "clr",
    type: "button",
    onClick: () => W.commands.actions("setlist")?.clear(),
    disabled: i.length === 0
  }, p("trash"), s.clear), tt("small", null, s.savedBrowser)));
}
var No = {}, ys = { exports: {} }, Zt = {}, vs = { exports: {} }, ws = {};
var Gu;
function zf() {
  return Gu || (Gu = 1, (function(i) {
    function u(v, z) {
      var _ = v.length;
      v.push(z);
      e: for (; 0 < _; ) {
        var k = _ - 1 >>> 1, L = v[k];
        if (0 < p(L, z)) v[k] = z, v[_] = L, _ = k;
        else break e;
      }
    }
    function s(v) {
      return v.length === 0 ? null : v[0];
    }
    function c(v) {
      if (v.length === 0) return null;
      var z = v[0], _ = v.pop();
      if (_ !== z) {
        v[0] = _;
        e: for (var k = 0, L = v.length, re = L >>> 1; k < re; ) {
          var de = 2 * (k + 1) - 1, ge = v[de], Ae = de + 1, xe = v[Ae];
          if (0 > p(ge, _)) Ae < L && 0 > p(xe, ge) ? (v[k] = xe, v[Ae] = _, k = Ae) : (v[k] = ge, v[de] = _, k = de);
          else if (Ae < L && 0 > p(xe, _)) v[k] = xe, v[Ae] = _, k = Ae;
          else break e;
        }
      }
      return z;
    }
    function p(v, z) {
      var _ = v.sortIndex - z.sortIndex;
      return _ !== 0 ? _ : v.id - z.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      i.unstable_now = function() {
        return f.now();
      };
    } else {
      var g = Date, y = g.now();
      i.unstable_now = function() {
        return g.now() - y;
      };
    }
    var d = [], M = [], x = 1, C = null, N = 3, D = !1, b = !1, w = !1, S = typeof setTimeout == "function" ? setTimeout : null, E = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function U(v) {
      for (var z = s(M); z !== null; ) {
        if (z.callback === null) c(M);
        else if (z.startTime <= v) c(M), z.sortIndex = z.expirationTime, u(d, z);
        else break;
        z = s(M);
      }
    }
    function P(v) {
      if (w = !1, U(v), !b) if (s(d) !== null) b = !0, ce(A);
      else {
        var z = s(M);
        z !== null && te(P, z.startTime - v);
      }
    }
    function A(v, z) {
      b = !1, w && (w = !1, E(Q), Q = -1), D = !0;
      var _ = N;
      try {
        for (U(z), C = s(d); C !== null && (!(C.expirationTime > z) || v && !ne()); ) {
          var k = C.callback;
          if (typeof k == "function") {
            C.callback = null, N = C.priorityLevel;
            var L = k(C.expirationTime <= z);
            z = i.unstable_now(), typeof L == "function" ? C.callback = L : C === s(d) && c(d), U(z);
          } else c(d);
          C = s(d);
        }
        if (C !== null) var re = !0;
        else {
          var de = s(M);
          de !== null && te(P, de.startTime - z), re = !1;
        }
        return re;
      } finally {
        C = null, N = _, D = !1;
      }
    }
    var j = !1, V = null, Q = -1, G = 5, $ = -1;
    function ne() {
      return !(i.unstable_now() - $ < G);
    }
    function Z() {
      if (V !== null) {
        var v = i.unstable_now();
        $ = v;
        var z = !0;
        try {
          z = V(!0, v);
        } finally {
          z ? Y() : (j = !1, V = null);
        }
      } else j = !1;
    }
    var Y;
    if (typeof I == "function") Y = function() {
      I(Z);
    };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), ie = J.port2;
      J.port1.onmessage = Z, Y = function() {
        ie.postMessage(null);
      };
    } else Y = function() {
      S(Z, 0);
    };
    function ce(v) {
      V = v, j || (j = !0, Y());
    }
    function te(v, z) {
      Q = S(function() {
        v(i.unstable_now());
      }, z);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(v) {
      v.callback = null;
    }, i.unstable_continueExecution = function() {
      b || D || (b = !0, ce(A));
    }, i.unstable_forceFrameRate = function(v) {
      0 > v || 125 < v ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : G = 0 < v ? Math.floor(1e3 / v) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, i.unstable_getFirstCallbackNode = function() {
      return s(d);
    }, i.unstable_next = function(v) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = N;
      }
      var _ = N;
      N = z;
      try {
        return v();
      } finally {
        N = _;
      }
    }, i.unstable_pauseExecution = function() {
    }, i.unstable_requestPaint = function() {
    }, i.unstable_runWithPriority = function(v, z) {
      switch (v) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          v = 3;
      }
      var _ = N;
      N = v;
      try {
        return z();
      } finally {
        N = _;
      }
    }, i.unstable_scheduleCallback = function(v, z, _) {
      var k = i.unstable_now();
      switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? k + _ : k) : _ = k, v) {
        case 1:
          var L = -1;
          break;
        case 2:
          L = 250;
          break;
        case 5:
          L = 1073741823;
          break;
        case 4:
          L = 1e4;
          break;
        default:
          L = 5e3;
      }
      return L = _ + L, v = { id: x++, callback: z, priorityLevel: v, startTime: _, expirationTime: L, sortIndex: -1 }, _ > k ? (v.sortIndex = _, u(M, v), s(d) === null && v === s(M) && (w ? (E(Q), Q = -1) : w = !0, te(P, _ - k))) : (v.sortIndex = L, u(d, v), b || D || (b = !0, ce(A))), v;
    }, i.unstable_shouldYield = ne, i.unstable_wrapCallback = function(v) {
      var z = N;
      return function() {
        var _ = N;
        N = z;
        try {
          return v.apply(this, arguments);
        } finally {
          N = _;
        }
      };
    };
  })(ws)), ws;
}
var Qu;
function Df() {
  return Qu || (Qu = 1, vs.exports = zf()), vs.exports;
}
var Xu;
function jf() {
  if (Xu) return Zt;
  Xu = 1;
  var i = cd(), u = Df();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = /* @__PURE__ */ new Set(), p = {};
  function f(e, t) {
    g(e, t), g(e + "Capture", t);
  }
  function g(e, t) {
    for (p[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var y = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), d = Object.prototype.hasOwnProperty, M = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, x = {}, C = {};
  function N(e) {
    return d.call(C, e) ? !0 : d.call(x, e) ? !1 : M.test(e) ? C[e] = !0 : (x[e] = !0, !1);
  }
  function D(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function b(e, t, n, r) {
    if (t === null || typeof t > "u" || D(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function w(e, t, n, r, a, o, m) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = m;
  }
  var S = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    S[e] = new w(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    S[t] = new w(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    S[e] = new w(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    S[e] = new w(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    S[e] = new w(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    S[e] = new w(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    S[e] = new w(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    S[e] = new w(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    S[e] = new w(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var E = /[\-:]([a-z])/g;
  function I(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      E,
      I
    );
    S[t] = new w(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(E, I);
    S[t] = new w(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(E, I);
    S[t] = new w(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    S[e] = new w(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), S.xlinkHref = new w("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    S[e] = new w(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function U(e, t, n, r) {
    var a = S.hasOwnProperty(t) ? S[t] : null;
    (a !== null ? a.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (b(t, n, a, r) && (n = null), r || a === null ? N(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, r = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var P = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, A = /* @__PURE__ */ Symbol.for("react.element"), j = /* @__PURE__ */ Symbol.for("react.portal"), V = /* @__PURE__ */ Symbol.for("react.fragment"), Q = /* @__PURE__ */ Symbol.for("react.strict_mode"), G = /* @__PURE__ */ Symbol.for("react.profiler"), $ = /* @__PURE__ */ Symbol.for("react.provider"), ne = /* @__PURE__ */ Symbol.for("react.context"), Z = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), J = /* @__PURE__ */ Symbol.for("react.suspense_list"), ie = /* @__PURE__ */ Symbol.for("react.memo"), ce = /* @__PURE__ */ Symbol.for("react.lazy"), te = /* @__PURE__ */ Symbol.for("react.offscreen"), v = Symbol.iterator;
  function z(e) {
    return e === null || typeof e != "object" ? null : (e = v && e[v] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var _ = Object.assign, k;
  function L(e) {
    if (k === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      k = t && t[1] || "";
    }
    return `
` + k + e;
  }
  var re = !1;
  function de(e, t) {
    if (!e || re) return "";
    re = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (H) {
          var r = H;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (H) {
          r = H;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (H) {
          r = H;
        }
        e();
      }
    } catch (H) {
      if (H && r && typeof H.stack == "string") {
        for (var a = H.stack.split(`
`), o = r.stack.split(`
`), m = a.length - 1, T = o.length - 1; 1 <= m && 0 <= T && a[m] !== o[T]; ) T--;
        for (; 1 <= m && 0 <= T; m--, T--) if (a[m] !== o[T]) {
          if (m !== 1 || T !== 1)
            do
              if (m--, T--, 0 > T || a[m] !== o[T]) {
                var O = `
` + a[m].replace(" at new ", " at ");
                return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), O;
              }
            while (1 <= m && 0 <= T);
          break;
        }
      }
    } finally {
      re = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? L(e) : "";
  }
  function ge(e) {
    switch (e.tag) {
      case 5:
        return L(e.type);
      case 16:
        return L("Lazy");
      case 13:
        return L("Suspense");
      case 19:
        return L("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = de(e.type, !1), e;
      case 11:
        return e = de(e.type.render, !1), e;
      case 1:
        return e = de(e.type, !0), e;
      default:
        return "";
    }
  }
  function Ae(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case V:
        return "Fragment";
      case j:
        return "Portal";
      case G:
        return "Profiler";
      case Q:
        return "StrictMode";
      case Y:
        return "Suspense";
      case J:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ne:
        return (e.displayName || "Context") + ".Consumer";
      case $:
        return (e._context.displayName || "Context") + ".Provider";
      case Z:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ie:
        return t = e.displayName || null, t !== null ? t : Ae(e.type) || "Memo";
      case ce:
        t = e._payload, e = e._init;
        try {
          return Ae(e(t));
        } catch {
        }
    }
    return null;
  }
  function xe(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ae(t);
      case 8:
        return t === Q ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function he(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Ne(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Se(e) {
    var t = Ne(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return a.call(this);
      }, set: function(m) {
        r = "" + m, o.call(this, m);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(m) {
        r = "" + m;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function je(e) {
    e._valueTracker || (e._valueTracker = Se(e));
  }
  function kt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = Ne(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function q(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function fe(e, t) {
    var n = t.checked;
    return _({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function ye(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = he(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Oe(e, t) {
    t = t.checked, t != null && U(e, "checked", t, !1);
  }
  function Fe(e, t) {
    Oe(e, t);
    var n = he(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? we(e, t.type, n) : t.hasOwnProperty("defaultValue") && we(e, t.type, he(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Pe(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function we(e, t, n) {
    (t !== "number" || q(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Ie = Array.isArray;
  function Le(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + he(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, r && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ue(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return _({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function He(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(s(92));
        if (Ie(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: he(n) };
  }
  function Ge(e, t) {
    var n = he(t.value), r = he(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Nn(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function sn(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Kt(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? sn(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var ur, Ur = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, a);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (ur = ur || document.createElement("div"), ur.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ur.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Pn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Rn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, gi = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Rn).forEach(function(e) {
    gi.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Rn[t] = Rn[e];
    });
  });
  function dr(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Rn.hasOwnProperty(e) && Rn[e] ? ("" + t).trim() : t + "px";
  }
  function Tt(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, a = dr(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
    }
  }
  var Vt = _({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Dt(e, t) {
    if (t) {
      if (Vt[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function Yn(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var On = null;
  function hr(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var jt = null, wn = null, In = null;
  function oe(e) {
    if (e = aa(e)) {
      if (typeof jt != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = Ua(t), jt(e.stateNode, e.type, t));
    }
  }
  function be(e) {
    wn ? In ? In.push(e) : In = [e] : wn = e;
  }
  function pe() {
    if (wn) {
      var e = wn, t = In;
      if (In = wn = null, oe(e), t) for (e = 0; e < t.length; e++) oe(t[e]);
    }
  }
  function We(e, t) {
    return e(t);
  }
  function mt() {
  }
  var rt = !1;
  function Xe(e, t, n) {
    if (rt) return e(t, n);
    rt = !0;
    try {
      return We(e, t, n);
    } finally {
      rt = !1, (wn !== null || In !== null) && (mt(), pe());
    }
  }
  function $e(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Ua(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var lt = !1;
  if (y) try {
    var Hn = {};
    Object.defineProperty(Hn, "passive", { get: function() {
      lt = !0;
    } }), window.addEventListener("test", Hn, Hn), window.removeEventListener("test", Hn, Hn);
  } catch {
    lt = !1;
  }
  function Yi(e, t, n, r, a, o, m, T, O) {
    var H = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, H);
    } catch (le) {
      this.onError(le);
    }
  }
  var Yt = !1, fr = null, Kr = !1, $n = null, Fo = { onError: function(e) {
    Yt = !0, fr = e;
  } };
  function Hi(e, t, n, r, a, o, m, T, O) {
    Yt = !1, fr = null, Yi.apply(Fo, arguments);
  }
  function en(e, t, n, r, a, o, m, T, O) {
    if (Hi.apply(this, arguments), Yt) {
      if (Yt) {
        var H = fr;
        Yt = !1, fr = null;
      } else throw Error(s(198));
      Kr || (Kr = !0, $n = H);
    }
  }
  function Ht(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Ca(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Ta(e) {
    if (Ht(e) !== e) throw Error(s(188));
  }
  function Uo(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Ht(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var o = a.alternate;
      if (o === null) {
        if (r = a.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (a.child === o.child) {
        for (o = a.child; o; ) {
          if (o === n) return Ta(a), e;
          if (o === r) return Ta(a), t;
          o = o.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) n = a, r = o;
      else {
        for (var m = !1, T = a.child; T; ) {
          if (T === n) {
            m = !0, n = a, r = o;
            break;
          }
          if (T === r) {
            m = !0, r = a, n = o;
            break;
          }
          T = T.sibling;
        }
        if (!m) {
          for (T = o.child; T; ) {
            if (T === n) {
              m = !0, n = o, r = a;
              break;
            }
            if (T === r) {
              m = !0, r = o, n = a;
              break;
            }
            T = T.sibling;
          }
          if (!m) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function La(e) {
    return e = Uo(e), e !== null ? tn(e) : null;
  }
  function tn(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = tn(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var pr = u.unstable_scheduleCallback, mr = u.unstable_cancelCallback, qn = u.unstable_shouldYield, Ko = u.unstable_requestPaint, st = u.unstable_now, Vo = u.unstable_getCurrentPriorityLevel, Vr = u.unstable_ImmediatePriority, Yr = u.unstable_UserBlockingPriority, Hr = u.unstable_NormalPriority, Ma = u.unstable_LowPriority, xa = u.unstable_IdlePriority, $r = null, Nt = null;
  function Na(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot($r, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var nn = Math.clz32 ? Math.clz32 : qr, gr = Math.log, Pa = Math.LN2;
  function qr(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (gr(e) / Pa | 0) | 0;
  }
  var An = 64, Wr = 4194304;
  function yr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function vr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, a = e.suspendedLanes, o = e.pingedLanes, m = n & 268435455;
    if (m !== 0) {
      var T = m & ~a;
      T !== 0 ? r = yr(T) : (o &= m, o !== 0 && (r = yr(o)));
    } else m = n & ~a, m !== 0 ? r = yr(m) : o !== 0 && (r = yr(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & a) === 0 && (a = r & -r, o = t & -t, a >= o || a === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - nn(t), a = 1 << n, r |= e[n], t &= ~a;
    return r;
  }
  function Wn(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ra(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var m = 31 - nn(o), T = 1 << m, O = a[m];
      O === -1 ? ((T & n) === 0 || (T & r) !== 0) && (a[m] = Wn(T, t)) : O <= t && (e.expiredLanes |= T), o &= ~T;
    }
  }
  function Jr(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Gr() {
    var e = An;
    return An <<= 1, (An & 4194240) === 0 && (An = 64), e;
  }
  function $i(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Bn(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - nn(t), e[t] = n;
  }
  function Yo(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var a = 31 - nn(n), o = 1 << a;
      t[a] = 0, r[a] = -1, e[a] = -1, n &= ~o;
    }
  }
  function Jn(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - nn(n), a = 1 << r;
      a & t | e[r] & t && (e[r] |= t), n &= ~a;
    }
  }
  var Ze = 0;
  function Oa(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Lt, Qr, Xr, wr, yi, vi = !1, wi = [], kn = null, cn = null, Pt = null, kr = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Map(), qt = [], un = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Rt(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        kn = null;
        break;
      case "dragenter":
      case "dragleave":
        cn = null;
        break;
      case "mouseover":
      case "mouseout":
        Pt = null;
        break;
      case "pointerover":
      case "pointerout":
        kr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        $t.delete(t.pointerId);
    }
  }
  function Zr(e, t, n, r, a, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [a] }, t !== null && (t = aa(t), t !== null && Qr(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Ho(e, t, n, r, a) {
    switch (t) {
      case "focusin":
        return kn = Zr(kn, e, t, n, r, a), !0;
      case "dragenter":
        return cn = Zr(cn, e, t, n, r, a), !0;
      case "mouseover":
        return Pt = Zr(Pt, e, t, n, r, a), !0;
      case "pointerover":
        var o = a.pointerId;
        return kr.set(o, Zr(kr.get(o) || null, e, t, n, r, a)), !0;
      case "gotpointercapture":
        return o = a.pointerId, $t.set(o, Zr($t.get(o) || null, e, t, n, r, a)), !0;
    }
    return !1;
  }
  function Gn(e) {
    var t = ni(e.target);
    if (t !== null) {
      var n = Ht(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = Ca(n), t !== null) {
            e.blockedOn = t, yi(e.priority, function() {
              Xr(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function dn(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Wi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        On = r, n.target.dispatchEvent(r), On = null;
      } else return t = aa(n), t !== null && Qr(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function zn(e, t, n) {
    dn(e) && n.delete(t);
  }
  function qi() {
    vi = !1, kn !== null && dn(kn) && (kn = null), cn !== null && dn(cn) && (cn = null), Pt !== null && dn(Pt) && (Pt = null), kr.forEach(zn), $t.forEach(zn);
  }
  function Dn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, vi || (vi = !0, u.unstable_scheduleCallback(u.unstable_NormalPriority, qi)));
  }
  function br(e) {
    function t(a) {
      return Dn(a, e);
    }
    if (0 < wi.length) {
      Dn(wi[0], e);
      for (var n = 1; n < wi.length; n++) {
        var r = wi[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (kn !== null && Dn(kn, e), cn !== null && Dn(cn, e), Pt !== null && Dn(Pt, e), kr.forEach(t), $t.forEach(t), n = 0; n < qt.length; n++) r = qt[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < qt.length && (n = qt[0], n.blockedOn === null); ) Gn(n), n.blockedOn === null && qt.shift();
  }
  var Qn = P.ReactCurrentBatchConfig, Xn = !0;
  function $o(e, t, n, r) {
    var a = Ze, o = Qn.transition;
    Qn.transition = null;
    try {
      Ze = 1, ki(e, t, n, r);
    } finally {
      Ze = a, Qn.transition = o;
    }
  }
  function Zn(e, t, n, r) {
    var a = Ze, o = Qn.transition;
    Qn.transition = null;
    try {
      Ze = 4, ki(e, t, n, r);
    } finally {
      Ze = a, Qn.transition = o;
    }
  }
  function ki(e, t, n, r) {
    if (Xn) {
      var a = Wi(e, t, n, r);
      if (a === null) ol(e, t, r, ei, n), Rt(e, r);
      else if (Ho(a, e, t, n, r)) r.stopPropagation();
      else if (Rt(e, r), t & 4 && -1 < un.indexOf(e)) {
        for (; a !== null; ) {
          var o = aa(a);
          if (o !== null && Lt(o), o = Wi(e, t, n, r), o === null && ol(e, t, r, ei, n), o === a) break;
          a = o;
        }
        a !== null && r.stopPropagation();
      } else ol(e, t, r, null, n);
    }
  }
  var ei = null;
  function Wi(e, t, n, r) {
    if (ei = null, e = hr(r), e = ni(e), e !== null) if (t = Ht(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = Ca(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return ei = e, null;
  }
  function Ji(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Vo()) {
          case Vr:
            return 1;
          case Yr:
            return 4;
          case Hr:
          case Ma:
            return 16;
          case xa:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var bn = null, bi = null, h = null;
  function R() {
    if (h) return h;
    var e, t = bi, n = t.length, r, a = "value" in bn ? bn.value : bn.textContent, o = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var m = n - e;
    for (r = 1; r <= m && t[n - r] === a[o - r]; r++) ;
    return h = a.slice(e, 1 < r ? 1 - r : void 0);
  }
  function X(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ee() {
    return !0;
  }
  function Te() {
    return !1;
  }
  function ve(e) {
    function t(n, r, a, o, m) {
      this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = o, this.target = m, this.currentTarget = null;
      for (var T in e) e.hasOwnProperty(T) && (n = e[T], this[T] = n ? n(o) : o[T]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ee : Te, this.isPropagationStopped = Te, this;
    }
    return _(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ee);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ee);
    }, persist: function() {
    }, isPersistent: ee }), t;
  }
  var me = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ot = ve(me), ft = _({}, me, { view: 0, detail: 0 }), Sr = ve(ft), rn, Er, gt, ti = _({}, ft, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Jo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== gt && (gt && e.type === "mousemove" ? (rn = e.screenX - gt.screenX, Er = e.screenY - gt.screenY) : Er = rn = 0, gt = e), rn);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Er;
  } }), Ia = ve(ti), qo = _({}, ti, { dataTransfer: 0 }), jd = ve(qo), _d = _({}, ft, { relatedTarget: 0 }), Wo = ve(_d), Fd = _({}, me, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ud = ve(Fd), Kd = _({}, me, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Vd = ve(Kd), Yd = _({}, me, { data: 0 }), Is = ve(Yd), Hd = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, $d = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, qd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Wd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = qd[e]) ? !!t[e] : !1;
  }
  function Jo() {
    return Wd;
  }
  var Jd = _({}, ft, { key: function(e) {
    if (e.key) {
      var t = Hd[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = X(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $d[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Jo, charCode: function(e) {
    return e.type === "keypress" ? X(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? X(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Gd = ve(Jd), Qd = _({}, ti, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), As = ve(Qd), Xd = _({}, ft, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Jo }), Zd = ve(Xd), eh = _({}, me, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), th = ve(eh), nh = _({}, ti, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), rh = ve(nh), ih = [9, 13, 27, 32], Go = y && "CompositionEvent" in window, Gi = null;
  y && "documentMode" in document && (Gi = document.documentMode);
  var ah = y && "TextEvent" in window && !Gi, Bs = y && (!Go || Gi && 8 < Gi && 11 >= Gi), zs = " ", Ds = !1;
  function js(e, t) {
    switch (e) {
      case "keyup":
        return ih.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function _s(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Si = !1;
  function oh(e, t) {
    switch (e) {
      case "compositionend":
        return _s(t);
      case "keypress":
        return t.which !== 32 ? null : (Ds = !0, zs);
      case "textInput":
        return e = t.data, e === zs && Ds ? null : e;
      default:
        return null;
    }
  }
  function lh(e, t) {
    if (Si) return e === "compositionend" || !Go && js(e, t) ? (e = R(), h = bi = bn = null, Si = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Bs && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var sh = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Fs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!sh[e.type] : t === "textarea";
  }
  function Us(e, t, n, r) {
    be(r), t = ja(t, "onChange"), 0 < t.length && (n = new Ot("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var Qi = null, Xi = null;
  function ch(e) {
    ac(e, 0);
  }
  function Aa(e) {
    var t = Mi(e);
    if (kt(t)) return e;
  }
  function uh(e, t) {
    if (e === "change") return t;
  }
  var Ks = !1;
  if (y) {
    var Qo;
    if (y) {
      var Xo = "oninput" in document;
      if (!Xo) {
        var Vs = document.createElement("div");
        Vs.setAttribute("oninput", "return;"), Xo = typeof Vs.oninput == "function";
      }
      Qo = Xo;
    } else Qo = !1;
    Ks = Qo && (!document.documentMode || 9 < document.documentMode);
  }
  function Ys() {
    Qi && (Qi.detachEvent("onpropertychange", Hs), Xi = Qi = null);
  }
  function Hs(e) {
    if (e.propertyName === "value" && Aa(Xi)) {
      var t = [];
      Us(t, Xi, e, hr(e)), Xe(ch, t);
    }
  }
  function dh(e, t, n) {
    e === "focusin" ? (Ys(), Qi = t, Xi = n, Qi.attachEvent("onpropertychange", Hs)) : e === "focusout" && Ys();
  }
  function hh(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Aa(Xi);
  }
  function fh(e, t) {
    if (e === "click") return Aa(t);
  }
  function ph(e, t) {
    if (e === "input" || e === "change") return Aa(t);
  }
  function mh(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sn = typeof Object.is == "function" ? Object.is : mh;
  function Zi(e, t) {
    if (Sn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var a = n[r];
      if (!d.call(t, a) || !Sn(e[a], t[a])) return !1;
    }
    return !0;
  }
  function $s(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function qs(e, t) {
    var n = $s(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = $s(n);
    }
  }
  function Ws(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ws(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Js() {
    for (var e = window, t = q(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = q(e.document);
    }
    return t;
  }
  function Zo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function gh(e) {
    var t = Js(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Ws(n.ownerDocument.documentElement, n)) {
      if (r !== null && Zo(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var a = n.textContent.length, o = Math.min(r.start, a);
          r = r.end === void 0 ? o : Math.min(r.end, a), !e.extend && o > r && (a = r, r = o, o = a), a = qs(n, o);
          var m = qs(
            n,
            r
          );
          a && m && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== m.node || e.focusOffset !== m.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(m.node, m.offset)) : (t.setEnd(m.node, m.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var yh = y && "documentMode" in document && 11 >= document.documentMode, Ei = null, el = null, ea = null, tl = !1;
  function Gs(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    tl || Ei == null || Ei !== q(r) || (r = Ei, "selectionStart" in r && Zo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), ea && Zi(ea, r) || (ea = r, r = ja(el, "onSelect"), 0 < r.length && (t = new Ot("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ei)));
  }
  function Ba(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Ci = { animationend: Ba("Animation", "AnimationEnd"), animationiteration: Ba("Animation", "AnimationIteration"), animationstart: Ba("Animation", "AnimationStart"), transitionend: Ba("Transition", "TransitionEnd") }, nl = {}, Qs = {};
  y && (Qs = document.createElement("div").style, "AnimationEvent" in window || (delete Ci.animationend.animation, delete Ci.animationiteration.animation, delete Ci.animationstart.animation), "TransitionEvent" in window || delete Ci.transitionend.transition);
  function za(e) {
    if (nl[e]) return nl[e];
    if (!Ci[e]) return e;
    var t = Ci[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Qs) return nl[e] = t[n];
    return e;
  }
  var Xs = za("animationend"), Zs = za("animationiteration"), ec = za("animationstart"), tc = za("transitionend"), nc = /* @__PURE__ */ new Map(), rc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Cr(e, t) {
    nc.set(e, t), f(t, [e]);
  }
  for (var rl = 0; rl < rc.length; rl++) {
    var il = rc[rl], vh = il.toLowerCase(), wh = il[0].toUpperCase() + il.slice(1);
    Cr(vh, "on" + wh);
  }
  Cr(Xs, "onAnimationEnd"), Cr(Zs, "onAnimationIteration"), Cr(ec, "onAnimationStart"), Cr("dblclick", "onDoubleClick"), Cr("focusin", "onFocus"), Cr("focusout", "onBlur"), Cr(tc, "onTransitionEnd"), g("onMouseEnter", ["mouseout", "mouseover"]), g("onMouseLeave", ["mouseout", "mouseover"]), g("onPointerEnter", ["pointerout", "pointerover"]), g("onPointerLeave", ["pointerout", "pointerover"]), f("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), f("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), f("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), f("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ta = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), kh = new Set("cancel close invalid load scroll toggle".split(" ").concat(ta));
  function ic(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, en(r, t, void 0, e), e.currentTarget = null;
  }
  function ac(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], a = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var m = r.length - 1; 0 <= m; m--) {
          var T = r[m], O = T.instance, H = T.currentTarget;
          if (T = T.listener, O !== o && a.isPropagationStopped()) break e;
          ic(a, T, H), o = O;
        }
        else for (m = 0; m < r.length; m++) {
          if (T = r[m], O = T.instance, H = T.currentTarget, T = T.listener, O !== o && a.isPropagationStopped()) break e;
          ic(a, T, H), o = O;
        }
      }
    }
    if (Kr) throw e = $n, Kr = !1, $n = null, e;
  }
  function it(e, t) {
    var n = t[hl];
    n === void 0 && (n = t[hl] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (oc(t, e, 2, !1), n.add(r));
  }
  function al(e, t, n) {
    var r = 0;
    t && (r |= 4), oc(n, e, r, t);
  }
  var Da = "_reactListening" + Math.random().toString(36).slice(2);
  function na(e) {
    if (!e[Da]) {
      e[Da] = !0, c.forEach(function(n) {
        n !== "selectionchange" && (kh.has(n) || al(n, !1, e), al(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Da] || (t[Da] = !0, al("selectionchange", !1, t));
    }
  }
  function oc(e, t, n, r) {
    switch (Ji(t)) {
      case 1:
        var a = $o;
        break;
      case 4:
        a = Zn;
        break;
      default:
        a = ki;
    }
    n = a.bind(null, t, n, e), a = void 0, !lt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
  }
  function ol(e, t, n, r, a) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var m = r.tag;
      if (m === 3 || m === 4) {
        var T = r.stateNode.containerInfo;
        if (T === a || T.nodeType === 8 && T.parentNode === a) break;
        if (m === 4) for (m = r.return; m !== null; ) {
          var O = m.tag;
          if ((O === 3 || O === 4) && (O = m.stateNode.containerInfo, O === a || O.nodeType === 8 && O.parentNode === a)) return;
          m = m.return;
        }
        for (; T !== null; ) {
          if (m = ni(T), m === null) return;
          if (O = m.tag, O === 5 || O === 6) {
            r = o = m;
            continue e;
          }
          T = T.parentNode;
        }
      }
      r = r.return;
    }
    Xe(function() {
      var H = o, le = hr(n), se = [];
      e: {
        var ae = nc.get(e);
        if (ae !== void 0) {
          var ke = Ot, Ce = e;
          switch (e) {
            case "keypress":
              if (X(n) === 0) break e;
            case "keydown":
            case "keyup":
              ke = Gd;
              break;
            case "focusin":
              Ce = "focus", ke = Wo;
              break;
            case "focusout":
              Ce = "blur", ke = Wo;
              break;
            case "beforeblur":
            case "afterblur":
              ke = Wo;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ke = Ia;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ke = jd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ke = Zd;
              break;
            case Xs:
            case Zs:
            case ec:
              ke = Ud;
              break;
            case tc:
              ke = th;
              break;
            case "scroll":
              ke = Sr;
              break;
            case "wheel":
              ke = rh;
              break;
            case "copy":
            case "cut":
            case "paste":
              ke = Vd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ke = As;
          }
          var Me = (t & 4) !== 0, ht = !Me && e === "scroll", F = Me ? ae !== null ? ae + "Capture" : null : ae;
          Me = [];
          for (var B = H, K; B !== null; ) {
            K = B;
            var ue = K.stateNode;
            if (K.tag === 5 && ue !== null && (K = ue, F !== null && (ue = $e(B, F), ue != null && Me.push(ra(B, ue, K)))), ht) break;
            B = B.return;
          }
          0 < Me.length && (ae = new ke(ae, Ce, null, n, le), se.push({ event: ae, listeners: Me }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (ae = e === "mouseover" || e === "pointerover", ke = e === "mouseout" || e === "pointerout", ae && n !== On && (Ce = n.relatedTarget || n.fromElement) && (ni(Ce) || Ce[er])) break e;
          if ((ke || ae) && (ae = le.window === le ? le : (ae = le.ownerDocument) ? ae.defaultView || ae.parentWindow : window, ke ? (Ce = n.relatedTarget || n.toElement, ke = H, Ce = Ce ? ni(Ce) : null, Ce !== null && (ht = Ht(Ce), Ce !== ht || Ce.tag !== 5 && Ce.tag !== 6) && (Ce = null)) : (ke = null, Ce = H), ke !== Ce)) {
            if (Me = Ia, ue = "onMouseLeave", F = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Me = As, ue = "onPointerLeave", F = "onPointerEnter", B = "pointer"), ht = ke == null ? ae : Mi(ke), K = Ce == null ? ae : Mi(Ce), ae = new Me(ue, B + "leave", ke, n, le), ae.target = ht, ae.relatedTarget = K, ue = null, ni(le) === H && (Me = new Me(F, B + "enter", Ce, n, le), Me.target = K, Me.relatedTarget = ht, ue = Me), ht = ue, ke && Ce) t: {
              for (Me = ke, F = Ce, B = 0, K = Me; K; K = Ti(K)) B++;
              for (K = 0, ue = F; ue; ue = Ti(ue)) K++;
              for (; 0 < B - K; ) Me = Ti(Me), B--;
              for (; 0 < K - B; ) F = Ti(F), K--;
              for (; B--; ) {
                if (Me === F || F !== null && Me === F.alternate) break t;
                Me = Ti(Me), F = Ti(F);
              }
              Me = null;
            }
            else Me = null;
            ke !== null && lc(se, ae, ke, Me, !1), Ce !== null && ht !== null && lc(se, ht, Ce, Me, !0);
          }
        }
        e: {
          if (ae = H ? Mi(H) : window, ke = ae.nodeName && ae.nodeName.toLowerCase(), ke === "select" || ke === "input" && ae.type === "file") var Re = uh;
          else if (Fs(ae)) if (Ks) Re = ph;
          else {
            Re = hh;
            var ze = dh;
          }
          else (ke = ae.nodeName) && ke.toLowerCase() === "input" && (ae.type === "checkbox" || ae.type === "radio") && (Re = fh);
          if (Re && (Re = Re(e, H))) {
            Us(se, Re, n, le);
            break e;
          }
          ze && ze(e, ae, H), e === "focusout" && (ze = ae._wrapperState) && ze.controlled && ae.type === "number" && we(ae, "number", ae.value);
        }
        switch (ze = H ? Mi(H) : window, e) {
          case "focusin":
            (Fs(ze) || ze.contentEditable === "true") && (Ei = ze, el = H, ea = null);
            break;
          case "focusout":
            ea = el = Ei = null;
            break;
          case "mousedown":
            tl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            tl = !1, Gs(se, n, le);
            break;
          case "selectionchange":
            if (yh) break;
          case "keydown":
          case "keyup":
            Gs(se, n, le);
        }
        var De;
        if (Go) e: {
          switch (e) {
            case "compositionstart":
              var _e = "onCompositionStart";
              break e;
            case "compositionend":
              _e = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _e = "onCompositionUpdate";
              break e;
          }
          _e = void 0;
        }
        else Si ? js(e, n) && (_e = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_e = "onCompositionStart");
        _e && (Bs && n.locale !== "ko" && (Si || _e !== "onCompositionStart" ? _e === "onCompositionEnd" && Si && (De = R()) : (bn = le, bi = "value" in bn ? bn.value : bn.textContent, Si = !0)), ze = ja(H, _e), 0 < ze.length && (_e = new Is(_e, e, null, n, le), se.push({ event: _e, listeners: ze }), De ? _e.data = De : (De = _s(n), De !== null && (_e.data = De)))), (De = ah ? oh(e, n) : lh(e, n)) && (H = ja(H, "onBeforeInput"), 0 < H.length && (le = new Is("onBeforeInput", "beforeinput", null, n, le), se.push({ event: le, listeners: H }), le.data = De));
      }
      ac(se, t);
    });
  }
  function ra(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function ja(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var a = e, o = a.stateNode;
      a.tag === 5 && o !== null && (a = o, o = $e(e, n), o != null && r.unshift(ra(e, o, a)), o = $e(e, t), o != null && r.push(ra(e, o, a))), e = e.return;
    }
    return r;
  }
  function Ti(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function lc(e, t, n, r, a) {
    for (var o = t._reactName, m = []; n !== null && n !== r; ) {
      var T = n, O = T.alternate, H = T.stateNode;
      if (O !== null && O === r) break;
      T.tag === 5 && H !== null && (T = H, a ? (O = $e(n, o), O != null && m.unshift(ra(n, O, T))) : a || (O = $e(n, o), O != null && m.push(ra(n, O, T)))), n = n.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var bh = /\r\n?/g, Sh = /\u0000|\uFFFD/g;
  function sc(e) {
    return (typeof e == "string" ? e : "" + e).replace(bh, `
`).replace(Sh, "");
  }
  function _a(e, t, n) {
    if (t = sc(t), sc(e) !== t && n) throw Error(s(425));
  }
  function Fa() {
  }
  var ll = null, sl = null;
  function cl(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ul = typeof setTimeout == "function" ? setTimeout : void 0, Eh = typeof clearTimeout == "function" ? clearTimeout : void 0, cc = typeof Promise == "function" ? Promise : void 0, Ch = typeof queueMicrotask == "function" ? queueMicrotask : typeof cc < "u" ? function(e) {
    return cc.resolve(null).then(e).catch(Th);
  } : ul;
  function Th(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function dl(e, t) {
    var n = t, r = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
        if (r === 0) {
          e.removeChild(a), br(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = a;
    } while (n);
    br(t);
  }
  function Tr(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function uc(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Li = Math.random().toString(36).slice(2), jn = "__reactFiber$" + Li, ia = "__reactProps$" + Li, er = "__reactContainer$" + Li, hl = "__reactEvents$" + Li, Lh = "__reactListeners$" + Li, Mh = "__reactHandles$" + Li;
  function ni(e) {
    var t = e[jn];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[er] || n[jn]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = uc(e); e !== null; ) {
          if (n = e[jn]) return n;
          e = uc(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function aa(e) {
    return e = e[jn] || e[er], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Mi(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ua(e) {
    return e[ia] || null;
  }
  var fl = [], xi = -1;
  function Lr(e) {
    return { current: e };
  }
  function at(e) {
    0 > xi || (e.current = fl[xi], fl[xi] = null, xi--);
  }
  function nt(e, t) {
    xi++, fl[xi] = e.current, e.current = t;
  }
  var Mr = {}, It = Lr(Mr), Wt = Lr(!1), ri = Mr;
  function Ni(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Mr;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var a = {}, o;
    for (o in n) a[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }
  function Jt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Ka() {
    at(Wt), at(It);
  }
  function dc(e, t, n) {
    if (It.current !== Mr) throw Error(s(168));
    nt(It, t), nt(Wt, n);
  }
  function hc(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var a in r) if (!(a in t)) throw Error(s(108, xe(e) || "Unknown", a));
    return _({}, n, r);
  }
  function Va(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Mr, ri = It.current, nt(It, e), nt(Wt, Wt.current), !0;
  }
  function fc(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = hc(e, t, ri), r.__reactInternalMemoizedMergedChildContext = e, at(Wt), at(It), nt(It, e)) : at(Wt), nt(Wt, n);
  }
  var tr = null, Ya = !1, pl = !1;
  function pc(e) {
    tr === null ? tr = [e] : tr.push(e);
  }
  function xh(e) {
    Ya = !0, pc(e);
  }
  function xr() {
    if (!pl && tr !== null) {
      pl = !0;
      var e = 0, t = Ze;
      try {
        var n = tr;
        for (Ze = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        tr = null, Ya = !1;
      } catch (a) {
        throw tr !== null && (tr = tr.slice(e + 1)), pr(Vr, xr), a;
      } finally {
        Ze = t, pl = !1;
      }
    }
    return null;
  }
  var Pi = [], Ri = 0, Ha = null, $a = 0, hn = [], fn = 0, ii = null, nr = 1, rr = "";
  function ai(e, t) {
    Pi[Ri++] = $a, Pi[Ri++] = Ha, Ha = e, $a = t;
  }
  function mc(e, t, n) {
    hn[fn++] = nr, hn[fn++] = rr, hn[fn++] = ii, ii = e;
    var r = nr;
    e = rr;
    var a = 32 - nn(r) - 1;
    r &= ~(1 << a), n += 1;
    var o = 32 - nn(t) + a;
    if (30 < o) {
      var m = a - a % 5;
      o = (r & (1 << m) - 1).toString(32), r >>= m, a -= m, nr = 1 << 32 - nn(t) + a | n << a | r, rr = o + e;
    } else nr = 1 << o | n << a | r, rr = e;
  }
  function ml(e) {
    e.return !== null && (ai(e, 1), mc(e, 1, 0));
  }
  function gl(e) {
    for (; e === Ha; ) Ha = Pi[--Ri], Pi[Ri] = null, $a = Pi[--Ri], Pi[Ri] = null;
    for (; e === ii; ) ii = hn[--fn], hn[fn] = null, rr = hn[--fn], hn[fn] = null, nr = hn[--fn], hn[fn] = null;
  }
  var an = null, on = null, ot = !1, En = null;
  function gc(e, t) {
    var n = yn(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function yc(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, an = e, on = Tr(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, an = e, on = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = ii !== null ? { id: nr, overflow: rr } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = yn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, an = e, on = null, !0) : !1;
      default:
        return !1;
    }
  }
  function yl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function vl(e) {
    if (ot) {
      var t = on;
      if (t) {
        var n = t;
        if (!yc(e, t)) {
          if (yl(e)) throw Error(s(418));
          t = Tr(n.nextSibling);
          var r = an;
          t && yc(e, t) ? gc(r, n) : (e.flags = e.flags & -4097 | 2, ot = !1, an = e);
        }
      } else {
        if (yl(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, ot = !1, an = e;
      }
    }
  }
  function vc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    an = e;
  }
  function qa(e) {
    if (e !== an) return !1;
    if (!ot) return vc(e), ot = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !cl(e.type, e.memoizedProps)), t && (t = on)) {
      if (yl(e)) throw wc(), Error(s(418));
      for (; t; ) gc(e, t), t = Tr(t.nextSibling);
    }
    if (vc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                on = Tr(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        on = null;
      }
    } else on = an ? Tr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wc() {
    for (var e = on; e; ) e = Tr(e.nextSibling);
  }
  function Oi() {
    on = an = null, ot = !1;
  }
  function wl(e) {
    En === null ? En = [e] : En.push(e);
  }
  var Nh = P.ReactCurrentBatchConfig;
  function oa(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var a = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(m) {
          var T = a.refs;
          m === null ? delete T[o] : T[o] = m;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function Wa(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function kc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function bc(e) {
    function t(F, B) {
      if (e) {
        var K = F.deletions;
        K === null ? (F.deletions = [B], F.flags |= 16) : K.push(B);
      }
    }
    function n(F, B) {
      if (!e) return null;
      for (; B !== null; ) t(F, B), B = B.sibling;
      return null;
    }
    function r(F, B) {
      for (F = /* @__PURE__ */ new Map(); B !== null; ) B.key !== null ? F.set(B.key, B) : F.set(B.index, B), B = B.sibling;
      return F;
    }
    function a(F, B) {
      return F = zr(F, B), F.index = 0, F.sibling = null, F;
    }
    function o(F, B, K) {
      return F.index = K, e ? (K = F.alternate, K !== null ? (K = K.index, K < B ? (F.flags |= 2, B) : K) : (F.flags |= 2, B)) : (F.flags |= 1048576, B);
    }
    function m(F) {
      return e && F.alternate === null && (F.flags |= 2), F;
    }
    function T(F, B, K, ue) {
      return B === null || B.tag !== 6 ? (B = us(K, F.mode, ue), B.return = F, B) : (B = a(B, K), B.return = F, B);
    }
    function O(F, B, K, ue) {
      var Re = K.type;
      return Re === V ? le(F, B, K.props.children, ue, K.key) : B !== null && (B.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === ce && kc(Re) === B.type) ? (ue = a(B, K.props), ue.ref = oa(F, B, K), ue.return = F, ue) : (ue = wo(K.type, K.key, K.props, null, F.mode, ue), ue.ref = oa(F, B, K), ue.return = F, ue);
    }
    function H(F, B, K, ue) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== K.containerInfo || B.stateNode.implementation !== K.implementation ? (B = ds(K, F.mode, ue), B.return = F, B) : (B = a(B, K.children || []), B.return = F, B);
    }
    function le(F, B, K, ue, Re) {
      return B === null || B.tag !== 7 ? (B = fi(K, F.mode, ue, Re), B.return = F, B) : (B = a(B, K), B.return = F, B);
    }
    function se(F, B, K) {
      if (typeof B == "string" && B !== "" || typeof B == "number") return B = us("" + B, F.mode, K), B.return = F, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case A:
            return K = wo(B.type, B.key, B.props, null, F.mode, K), K.ref = oa(F, null, B), K.return = F, K;
          case j:
            return B = ds(B, F.mode, K), B.return = F, B;
          case ce:
            var ue = B._init;
            return se(F, ue(B._payload), K);
        }
        if (Ie(B) || z(B)) return B = fi(B, F.mode, K, null), B.return = F, B;
        Wa(F, B);
      }
      return null;
    }
    function ae(F, B, K, ue) {
      var Re = B !== null ? B.key : null;
      if (typeof K == "string" && K !== "" || typeof K == "number") return Re !== null ? null : T(F, B, "" + K, ue);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case A:
            return K.key === Re ? O(F, B, K, ue) : null;
          case j:
            return K.key === Re ? H(F, B, K, ue) : null;
          case ce:
            return Re = K._init, ae(
              F,
              B,
              Re(K._payload),
              ue
            );
        }
        if (Ie(K) || z(K)) return Re !== null ? null : le(F, B, K, ue, null);
        Wa(F, K);
      }
      return null;
    }
    function ke(F, B, K, ue, Re) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return F = F.get(K) || null, T(B, F, "" + ue, Re);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case A:
            return F = F.get(ue.key === null ? K : ue.key) || null, O(B, F, ue, Re);
          case j:
            return F = F.get(ue.key === null ? K : ue.key) || null, H(B, F, ue, Re);
          case ce:
            var ze = ue._init;
            return ke(F, B, K, ze(ue._payload), Re);
        }
        if (Ie(ue) || z(ue)) return F = F.get(K) || null, le(B, F, ue, Re, null);
        Wa(B, ue);
      }
      return null;
    }
    function Ce(F, B, K, ue) {
      for (var Re = null, ze = null, De = B, _e = B = 0, Et = null; De !== null && _e < K.length; _e++) {
        De.index > _e ? (Et = De, De = null) : Et = De.sibling;
        var Qe = ae(F, De, K[_e], ue);
        if (Qe === null) {
          De === null && (De = Et);
          break;
        }
        e && De && Qe.alternate === null && t(F, De), B = o(Qe, B, _e), ze === null ? Re = Qe : ze.sibling = Qe, ze = Qe, De = Et;
      }
      if (_e === K.length) return n(F, De), ot && ai(F, _e), Re;
      if (De === null) {
        for (; _e < K.length; _e++) De = se(F, K[_e], ue), De !== null && (B = o(De, B, _e), ze === null ? Re = De : ze.sibling = De, ze = De);
        return ot && ai(F, _e), Re;
      }
      for (De = r(F, De); _e < K.length; _e++) Et = ke(De, F, _e, K[_e], ue), Et !== null && (e && Et.alternate !== null && De.delete(Et.key === null ? _e : Et.key), B = o(Et, B, _e), ze === null ? Re = Et : ze.sibling = Et, ze = Et);
      return e && De.forEach(function(Dr) {
        return t(F, Dr);
      }), ot && ai(F, _e), Re;
    }
    function Me(F, B, K, ue) {
      var Re = z(K);
      if (typeof Re != "function") throw Error(s(150));
      if (K = Re.call(K), K == null) throw Error(s(151));
      for (var ze = Re = null, De = B, _e = B = 0, Et = null, Qe = K.next(); De !== null && !Qe.done; _e++, Qe = K.next()) {
        De.index > _e ? (Et = De, De = null) : Et = De.sibling;
        var Dr = ae(F, De, Qe.value, ue);
        if (Dr === null) {
          De === null && (De = Et);
          break;
        }
        e && De && Dr.alternate === null && t(F, De), B = o(Dr, B, _e), ze === null ? Re = Dr : ze.sibling = Dr, ze = Dr, De = Et;
      }
      if (Qe.done) return n(
        F,
        De
      ), ot && ai(F, _e), Re;
      if (De === null) {
        for (; !Qe.done; _e++, Qe = K.next()) Qe = se(F, Qe.value, ue), Qe !== null && (B = o(Qe, B, _e), ze === null ? Re = Qe : ze.sibling = Qe, ze = Qe);
        return ot && ai(F, _e), Re;
      }
      for (De = r(F, De); !Qe.done; _e++, Qe = K.next()) Qe = ke(De, F, _e, Qe.value, ue), Qe !== null && (e && Qe.alternate !== null && De.delete(Qe.key === null ? _e : Qe.key), B = o(Qe, B, _e), ze === null ? Re = Qe : ze.sibling = Qe, ze = Qe);
      return e && De.forEach(function(cf) {
        return t(F, cf);
      }), ot && ai(F, _e), Re;
    }
    function ht(F, B, K, ue) {
      if (typeof K == "object" && K !== null && K.type === V && K.key === null && (K = K.props.children), typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case A:
            e: {
              for (var Re = K.key, ze = B; ze !== null; ) {
                if (ze.key === Re) {
                  if (Re = K.type, Re === V) {
                    if (ze.tag === 7) {
                      n(F, ze.sibling), B = a(ze, K.props.children), B.return = F, F = B;
                      break e;
                    }
                  } else if (ze.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === ce && kc(Re) === ze.type) {
                    n(F, ze.sibling), B = a(ze, K.props), B.ref = oa(F, ze, K), B.return = F, F = B;
                    break e;
                  }
                  n(F, ze);
                  break;
                } else t(F, ze);
                ze = ze.sibling;
              }
              K.type === V ? (B = fi(K.props.children, F.mode, ue, K.key), B.return = F, F = B) : (ue = wo(K.type, K.key, K.props, null, F.mode, ue), ue.ref = oa(F, B, K), ue.return = F, F = ue);
            }
            return m(F);
          case j:
            e: {
              for (ze = K.key; B !== null; ) {
                if (B.key === ze) if (B.tag === 4 && B.stateNode.containerInfo === K.containerInfo && B.stateNode.implementation === K.implementation) {
                  n(F, B.sibling), B = a(B, K.children || []), B.return = F, F = B;
                  break e;
                } else {
                  n(F, B);
                  break;
                }
                else t(F, B);
                B = B.sibling;
              }
              B = ds(K, F.mode, ue), B.return = F, F = B;
            }
            return m(F);
          case ce:
            return ze = K._init, ht(F, B, ze(K._payload), ue);
        }
        if (Ie(K)) return Ce(F, B, K, ue);
        if (z(K)) return Me(F, B, K, ue);
        Wa(F, K);
      }
      return typeof K == "string" && K !== "" || typeof K == "number" ? (K = "" + K, B !== null && B.tag === 6 ? (n(F, B.sibling), B = a(B, K), B.return = F, F = B) : (n(F, B), B = us(K, F.mode, ue), B.return = F, F = B), m(F)) : n(F, B);
    }
    return ht;
  }
  var Ii = bc(!0), Sc = bc(!1), Ja = Lr(null), Ga = null, Ai = null, kl = null;
  function bl() {
    kl = Ai = Ga = null;
  }
  function Sl(e) {
    var t = Ja.current;
    at(Ja), e._currentValue = t;
  }
  function El(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Bi(e, t) {
    Ga = e, kl = Ai = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Gt = !0), e.firstContext = null);
  }
  function pn(e) {
    var t = e._currentValue;
    if (kl !== e) if (e = { context: e, memoizedValue: t, next: null }, Ai === null) {
      if (Ga === null) throw Error(s(308));
      Ai = e, Ga.dependencies = { lanes: 0, firstContext: e };
    } else Ai = Ai.next = e;
    return t;
  }
  var oi = null;
  function Cl(e) {
    oi === null ? oi = [e] : oi.push(e);
  }
  function Ec(e, t, n, r) {
    var a = t.interleaved;
    return a === null ? (n.next = n, Cl(t)) : (n.next = a.next, a.next = n), t.interleaved = n, ir(e, r);
  }
  function ir(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Nr = !1;
  function Tl(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Cc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function ar(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Pr(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Je & 2) !== 0) {
      var a = r.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, ir(e, n);
    }
    return a = r.interleaved, a === null ? (t.next = t, Cl(r)) : (t.next = a.next, a.next = t), r.interleaved = t, ir(e, n);
  }
  function Qa(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Jn(e, n);
    }
  }
  function Tc(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var a = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var m = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? a = o = m : o = o.next = m, n = n.next;
        } while (n !== null);
        o === null ? a = o = t : o = o.next = t;
      } else a = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: a, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Xa(e, t, n, r) {
    var a = e.updateQueue;
    Nr = !1;
    var o = a.firstBaseUpdate, m = a.lastBaseUpdate, T = a.shared.pending;
    if (T !== null) {
      a.shared.pending = null;
      var O = T, H = O.next;
      O.next = null, m === null ? o = H : m.next = H, m = O;
      var le = e.alternate;
      le !== null && (le = le.updateQueue, T = le.lastBaseUpdate, T !== m && (T === null ? le.firstBaseUpdate = H : T.next = H, le.lastBaseUpdate = O));
    }
    if (o !== null) {
      var se = a.baseState;
      m = 0, le = H = O = null, T = o;
      do {
        var ae = T.lane, ke = T.eventTime;
        if ((r & ae) === ae) {
          le !== null && (le = le.next = {
            eventTime: ke,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var Ce = e, Me = T;
            switch (ae = t, ke = n, Me.tag) {
              case 1:
                if (Ce = Me.payload, typeof Ce == "function") {
                  se = Ce.call(ke, se, ae);
                  break e;
                }
                se = Ce;
                break e;
              case 3:
                Ce.flags = Ce.flags & -65537 | 128;
              case 0:
                if (Ce = Me.payload, ae = typeof Ce == "function" ? Ce.call(ke, se, ae) : Ce, ae == null) break e;
                se = _({}, se, ae);
                break e;
              case 2:
                Nr = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (e.flags |= 64, ae = a.effects, ae === null ? a.effects = [T] : ae.push(T));
        } else ke = { eventTime: ke, lane: ae, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, le === null ? (H = le = ke, O = se) : le = le.next = ke, m |= ae;
        if (T = T.next, T === null) {
          if (T = a.shared.pending, T === null) break;
          ae = T, T = ae.next, ae.next = null, a.lastBaseUpdate = ae, a.shared.pending = null;
        }
      } while (!0);
      if (le === null && (O = se), a.baseState = O, a.firstBaseUpdate = H, a.lastBaseUpdate = le, t = a.shared.interleaved, t !== null) {
        a = t;
        do
          m |= a.lane, a = a.next;
        while (a !== t);
      } else o === null && (a.shared.lanes = 0);
      ci |= m, e.lanes = m, e.memoizedState = se;
    }
  }
  function Lc(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], a = r.callback;
      if (a !== null) {
        if (r.callback = null, r = n, typeof a != "function") throw Error(s(191, a));
        a.call(r);
      }
    }
  }
  var la = {}, _n = Lr(la), sa = Lr(la), ca = Lr(la);
  function li(e) {
    if (e === la) throw Error(s(174));
    return e;
  }
  function Ll(e, t) {
    switch (nt(ca, t), nt(sa, e), nt(_n, la), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Kt(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Kt(t, e);
    }
    at(_n), nt(_n, t);
  }
  function zi() {
    at(_n), at(sa), at(ca);
  }
  function Mc(e) {
    li(ca.current);
    var t = li(_n.current), n = Kt(t, e.type);
    t !== n && (nt(sa, e), nt(_n, n));
  }
  function Ml(e) {
    sa.current === e && (at(_n), at(sa));
  }
  var ct = Lr(0);
  function Za(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var xl = [];
  function Nl() {
    for (var e = 0; e < xl.length; e++) xl[e]._workInProgressVersionPrimary = null;
    xl.length = 0;
  }
  var eo = P.ReactCurrentDispatcher, Pl = P.ReactCurrentBatchConfig, si = 0, ut = null, yt = null, bt = null, to = !1, ua = !1, da = 0, Ph = 0;
  function At() {
    throw Error(s(321));
  }
  function Rl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Sn(e[n], t[n])) return !1;
    return !0;
  }
  function Ol(e, t, n, r, a, o) {
    if (si = o, ut = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, eo.current = e === null || e.memoizedState === null ? Ah : Bh, e = n(r, a), ua) {
      o = 0;
      do {
        if (ua = !1, da = 0, 25 <= o) throw Error(s(301));
        o += 1, bt = yt = null, t.updateQueue = null, eo.current = zh, e = n(r, a);
      } while (ua);
    }
    if (eo.current = io, t = yt !== null && yt.next !== null, si = 0, bt = yt = ut = null, to = !1, t) throw Error(s(300));
    return e;
  }
  function Il() {
    var e = da !== 0;
    return da = 0, e;
  }
  function Fn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return bt === null ? ut.memoizedState = bt = e : bt = bt.next = e, bt;
  }
  function mn() {
    if (yt === null) {
      var e = ut.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = yt.next;
    var t = bt === null ? ut.memoizedState : bt.next;
    if (t !== null) bt = t, yt = e;
    else {
      if (e === null) throw Error(s(310));
      yt = e, e = { memoizedState: yt.memoizedState, baseState: yt.baseState, baseQueue: yt.baseQueue, queue: yt.queue, next: null }, bt === null ? ut.memoizedState = bt = e : bt = bt.next = e;
    }
    return bt;
  }
  function ha(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Al(e) {
    var t = mn(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = yt, a = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (a !== null) {
        var m = a.next;
        a.next = o.next, o.next = m;
      }
      r.baseQueue = a = o, n.pending = null;
    }
    if (a !== null) {
      o = a.next, r = r.baseState;
      var T = m = null, O = null, H = o;
      do {
        var le = H.lane;
        if ((si & le) === le) O !== null && (O = O.next = { lane: 0, action: H.action, hasEagerState: H.hasEagerState, eagerState: H.eagerState, next: null }), r = H.hasEagerState ? H.eagerState : e(r, H.action);
        else {
          var se = {
            lane: le,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          O === null ? (T = O = se, m = r) : O = O.next = se, ut.lanes |= le, ci |= le;
        }
        H = H.next;
      } while (H !== null && H !== o);
      O === null ? m = r : O.next = T, Sn(r, t.memoizedState) || (Gt = !0), t.memoizedState = r, t.baseState = m, t.baseQueue = O, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      a = e;
      do
        o = a.lane, ut.lanes |= o, ci |= o, a = a.next;
      while (a !== e);
    } else a === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Bl(e) {
    var t = mn(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, a = n.pending, o = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var m = a = a.next;
      do
        o = e(o, m.action), m = m.next;
      while (m !== a);
      Sn(o, t.memoizedState) || (Gt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function xc() {
  }
  function Nc(e, t) {
    var n = ut, r = mn(), a = t(), o = !Sn(r.memoizedState, a);
    if (o && (r.memoizedState = a, Gt = !0), r = r.queue, zl(Oc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || bt !== null && bt.memoizedState.tag & 1) {
      if (n.flags |= 2048, fa(9, Rc.bind(null, n, r, a, t), void 0, null), St === null) throw Error(s(349));
      (si & 30) !== 0 || Pc(n, t, a);
    }
    return a;
  }
  function Pc(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ut.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ut.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Rc(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Ic(t) && Ac(e);
  }
  function Oc(e, t, n) {
    return n(function() {
      Ic(t) && Ac(e);
    });
  }
  function Ic(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Sn(e, n);
    } catch {
      return !0;
    }
  }
  function Ac(e) {
    var t = ir(e, 1);
    t !== null && Mn(t, e, 1, -1);
  }
  function Bc(e) {
    var t = Fn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ha, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ih.bind(null, ut, e), [t.memoizedState, e];
  }
  function fa(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ut.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ut.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function zc() {
    return mn().memoizedState;
  }
  function no(e, t, n, r) {
    var a = Fn();
    ut.flags |= e, a.memoizedState = fa(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function ro(e, t, n, r) {
    var a = mn();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (yt !== null) {
      var m = yt.memoizedState;
      if (o = m.destroy, r !== null && Rl(r, m.deps)) {
        a.memoizedState = fa(t, n, o, r);
        return;
      }
    }
    ut.flags |= e, a.memoizedState = fa(1 | t, n, o, r);
  }
  function Dc(e, t) {
    return no(8390656, 8, e, t);
  }
  function zl(e, t) {
    return ro(2048, 8, e, t);
  }
  function jc(e, t) {
    return ro(4, 2, e, t);
  }
  function _c(e, t) {
    return ro(4, 4, e, t);
  }
  function Fc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Uc(e, t, n) {
    return n = n != null ? n.concat([e]) : null, ro(4, 4, Fc.bind(null, t, e), n);
  }
  function Dl() {
  }
  function Kc(e, t) {
    var n = mn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Rl(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Vc(e, t) {
    var n = mn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Rl(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Yc(e, t, n) {
    return (si & 21) === 0 ? (e.baseState && (e.baseState = !1, Gt = !0), e.memoizedState = n) : (Sn(n, t) || (n = Gr(), ut.lanes |= n, ci |= n, e.baseState = !0), t);
  }
  function Rh(e, t) {
    var n = Ze;
    Ze = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Pl.transition;
    Pl.transition = {};
    try {
      e(!1), t();
    } finally {
      Ze = n, Pl.transition = r;
    }
  }
  function Hc() {
    return mn().memoizedState;
  }
  function Oh(e, t, n) {
    var r = Ar(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, $c(e)) qc(t, n);
    else if (n = Ec(e, t, n, r), n !== null) {
      var a = Ft();
      Mn(n, e, r, a), Wc(n, t, r);
    }
  }
  function Ih(e, t, n) {
    var r = Ar(e), a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if ($c(e)) qc(t, a);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var m = t.lastRenderedState, T = o(m, n);
        if (a.hasEagerState = !0, a.eagerState = T, Sn(T, m)) {
          var O = t.interleaved;
          O === null ? (a.next = a, Cl(t)) : (a.next = O.next, O.next = a), t.interleaved = a;
          return;
        }
      } catch {
      }
      n = Ec(e, t, a, r), n !== null && (a = Ft(), Mn(n, e, r, a), Wc(n, t, r));
    }
  }
  function $c(e) {
    var t = e.alternate;
    return e === ut || t !== null && t === ut;
  }
  function qc(e, t) {
    ua = to = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Wc(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Jn(e, n);
    }
  }
  var io = { readContext: pn, useCallback: At, useContext: At, useEffect: At, useImperativeHandle: At, useInsertionEffect: At, useLayoutEffect: At, useMemo: At, useReducer: At, useRef: At, useState: At, useDebugValue: At, useDeferredValue: At, useTransition: At, useMutableSource: At, useSyncExternalStore: At, useId: At, unstable_isNewReconciler: !1 }, Ah = { readContext: pn, useCallback: function(e, t) {
    return Fn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: pn, useEffect: Dc, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, no(
      4194308,
      4,
      Fc.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return no(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return no(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Fn();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Fn();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Oh.bind(null, ut, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Fn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Bc, useDebugValue: Dl, useDeferredValue: function(e) {
    return Fn().memoizedState = e;
  }, useTransition: function() {
    var e = Bc(!1), t = e[0];
    return e = Rh.bind(null, e[1]), Fn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ut, a = Fn();
    if (ot) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), St === null) throw Error(s(349));
      (si & 30) !== 0 || Pc(r, t, n);
    }
    a.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return a.queue = o, Dc(Oc.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, fa(9, Rc.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Fn(), t = St.identifierPrefix;
    if (ot) {
      var n = rr, r = nr;
      n = (r & ~(1 << 32 - nn(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = da++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Ph++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Bh = {
    readContext: pn,
    useCallback: Kc,
    useContext: pn,
    useEffect: zl,
    useImperativeHandle: Uc,
    useInsertionEffect: jc,
    useLayoutEffect: _c,
    useMemo: Vc,
    useReducer: Al,
    useRef: zc,
    useState: function() {
      return Al(ha);
    },
    useDebugValue: Dl,
    useDeferredValue: function(e) {
      var t = mn();
      return Yc(t, yt.memoizedState, e);
    },
    useTransition: function() {
      var e = Al(ha)[0], t = mn().memoizedState;
      return [e, t];
    },
    useMutableSource: xc,
    useSyncExternalStore: Nc,
    useId: Hc,
    unstable_isNewReconciler: !1
  }, zh = { readContext: pn, useCallback: Kc, useContext: pn, useEffect: zl, useImperativeHandle: Uc, useInsertionEffect: jc, useLayoutEffect: _c, useMemo: Vc, useReducer: Bl, useRef: zc, useState: function() {
    return Bl(ha);
  }, useDebugValue: Dl, useDeferredValue: function(e) {
    var t = mn();
    return yt === null ? t.memoizedState = e : Yc(t, yt.memoizedState, e);
  }, useTransition: function() {
    var e = Bl(ha)[0], t = mn().memoizedState;
    return [e, t];
  }, useMutableSource: xc, useSyncExternalStore: Nc, useId: Hc, unstable_isNewReconciler: !1 };
  function Cn(e, t) {
    if (e && e.defaultProps) {
      t = _({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function jl(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : _({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var ao = { isMounted: function(e) {
    return (e = e._reactInternals) ? Ht(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ft(), a = Ar(e), o = ar(r, a);
    o.payload = t, n != null && (o.callback = n), t = Pr(e, o, a), t !== null && (Mn(t, e, a, r), Qa(t, e, a));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ft(), a = Ar(e), o = ar(r, a);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Pr(e, o, a), t !== null && (Mn(t, e, a, r), Qa(t, e, a));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Ft(), r = Ar(e), a = ar(n, r);
    a.tag = 2, t != null && (a.callback = t), t = Pr(e, a, r), t !== null && (Mn(t, e, r, n), Qa(t, e, r));
  } };
  function Jc(e, t, n, r, a, o, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, m) : t.prototype && t.prototype.isPureReactComponent ? !Zi(n, r) || !Zi(a, o) : !0;
  }
  function Gc(e, t, n) {
    var r = !1, a = Mr, o = t.contextType;
    return typeof o == "object" && o !== null ? o = pn(o) : (a = Jt(t) ? ri : It.current, r = t.contextTypes, o = (r = r != null) ? Ni(e, a) : Mr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ao, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function Qc(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ao.enqueueReplaceState(t, t.state, null);
  }
  function _l(e, t, n, r) {
    var a = e.stateNode;
    a.props = n, a.state = e.memoizedState, a.refs = {}, Tl(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? a.context = pn(o) : (o = Jt(t) ? ri : It.current, a.context = Ni(e, o)), a.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (jl(e, t, o, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && ao.enqueueReplaceState(a, a.state, null), Xa(e, n, a, r), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Di(e, t) {
    try {
      var n = "", r = t;
      do
        n += ge(r), r = r.return;
      while (r);
      var a = n;
    } catch (o) {
      a = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: a, digest: null };
  }
  function Fl(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Ul(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var Dh = typeof WeakMap == "function" ? WeakMap : Map;
  function Xc(e, t, n) {
    n = ar(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      fo || (fo = !0, ns = r), Ul(e, t);
    }, n;
  }
  function Zc(e, t, n) {
    n = ar(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var a = t.value;
      n.payload = function() {
        return r(a);
      }, n.callback = function() {
        Ul(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      Ul(e, t), typeof r != "function" && (Or === null ? Or = /* @__PURE__ */ new Set([this]) : Or.add(this));
      var m = t.stack;
      this.componentDidCatch(t.value, { componentStack: m !== null ? m : "" });
    }), n;
  }
  function eu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Dh();
      var a = /* @__PURE__ */ new Set();
      r.set(t, a);
    } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
    a.has(n) || (a.add(n), e = Qh.bind(null, e, t, n), t.then(e, e));
  }
  function tu(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function nu(e, t, n, r, a) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = ar(-1, 1), t.tag = 2, Pr(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
  }
  var jh = P.ReactCurrentOwner, Gt = !1;
  function _t(e, t, n, r) {
    t.child = e === null ? Sc(t, null, n, r) : Ii(t, e.child, n, r);
  }
  function ru(e, t, n, r, a) {
    n = n.render;
    var o = t.ref;
    return Bi(t, a), r = Ol(e, t, n, r, o, a), n = Il(), e !== null && !Gt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, or(e, t, a)) : (ot && n && ml(t), t.flags |= 1, _t(e, t, r, a), t.child);
  }
  function iu(e, t, n, r, a) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !cs(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, au(e, t, o, r, a)) : (e = wo(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & a) === 0) {
      var m = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Zi, n(m, r) && e.ref === t.ref) return or(e, t, a);
    }
    return t.flags |= 1, e = zr(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function au(e, t, n, r, a) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Zi(o, r) && e.ref === t.ref) if (Gt = !1, t.pendingProps = r = o, (e.lanes & a) !== 0) (e.flags & 131072) !== 0 && (Gt = !0);
      else return t.lanes = e.lanes, or(e, t, a);
    }
    return Kl(e, t, n, r, a);
  }
  function ou(e, t, n) {
    var r = t.pendingProps, a = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, nt(_i, ln), ln |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, nt(_i, ln), ln |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, nt(_i, ln), ln |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, nt(_i, ln), ln |= r;
    return _t(e, t, a, n), t.child;
  }
  function lu(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Kl(e, t, n, r, a) {
    var o = Jt(n) ? ri : It.current;
    return o = Ni(t, o), Bi(t, a), n = Ol(e, t, n, r, o, a), r = Il(), e !== null && !Gt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, or(e, t, a)) : (ot && r && ml(t), t.flags |= 1, _t(e, t, n, a), t.child);
  }
  function su(e, t, n, r, a) {
    if (Jt(n)) {
      var o = !0;
      Va(t);
    } else o = !1;
    if (Bi(t, a), t.stateNode === null) lo(e, t), Gc(t, n, r), _l(t, n, r, a), r = !0;
    else if (e === null) {
      var m = t.stateNode, T = t.memoizedProps;
      m.props = T;
      var O = m.context, H = n.contextType;
      typeof H == "object" && H !== null ? H = pn(H) : (H = Jt(n) ? ri : It.current, H = Ni(t, H));
      var le = n.getDerivedStateFromProps, se = typeof le == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      se || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (T !== r || O !== H) && Qc(t, m, r, H), Nr = !1;
      var ae = t.memoizedState;
      m.state = ae, Xa(t, r, m, a), O = t.memoizedState, T !== r || ae !== O || Wt.current || Nr ? (typeof le == "function" && (jl(t, n, le, r), O = t.memoizedState), (T = Nr || Jc(t, n, T, r, ae, O, H)) ? (se || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = O), m.props = r, m.state = O, m.context = H, r = T) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      m = t.stateNode, Cc(e, t), T = t.memoizedProps, H = t.type === t.elementType ? T : Cn(t.type, T), m.props = H, se = t.pendingProps, ae = m.context, O = n.contextType, typeof O == "object" && O !== null ? O = pn(O) : (O = Jt(n) ? ri : It.current, O = Ni(t, O));
      var ke = n.getDerivedStateFromProps;
      (le = typeof ke == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (T !== se || ae !== O) && Qc(t, m, r, O), Nr = !1, ae = t.memoizedState, m.state = ae, Xa(t, r, m, a);
      var Ce = t.memoizedState;
      T !== se || ae !== Ce || Wt.current || Nr ? (typeof ke == "function" && (jl(t, n, ke, r), Ce = t.memoizedState), (H = Nr || Jc(t, n, H, r, ae, Ce, O) || !1) ? (le || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(r, Ce, O), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(r, Ce, O)), typeof m.componentDidUpdate == "function" && (t.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || T === e.memoizedProps && ae === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || T === e.memoizedProps && ae === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = Ce), m.props = r, m.state = Ce, m.context = O, r = H) : (typeof m.componentDidUpdate != "function" || T === e.memoizedProps && ae === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || T === e.memoizedProps && ae === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Vl(e, t, n, r, o, a);
  }
  function Vl(e, t, n, r, a, o) {
    lu(e, t);
    var m = (t.flags & 128) !== 0;
    if (!r && !m) return a && fc(t, n, !1), or(e, t, o);
    r = t.stateNode, jh.current = t;
    var T = m && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && m ? (t.child = Ii(t, e.child, null, o), t.child = Ii(t, null, T, o)) : _t(e, t, T, o), t.memoizedState = r.state, a && fc(t, n, !0), t.child;
  }
  function cu(e) {
    var t = e.stateNode;
    t.pendingContext ? dc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && dc(e, t.context, !1), Ll(e, t.containerInfo);
  }
  function uu(e, t, n, r, a) {
    return Oi(), wl(a), t.flags |= 256, _t(e, t, n, r), t.child;
  }
  var Yl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Hl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function du(e, t, n) {
    var r = t.pendingProps, a = ct.current, o = !1, m = (t.flags & 128) !== 0, T;
    if ((T = m) || (T = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), T ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), nt(ct, a & 1), e === null)
      return vl(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (m = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, m = { mode: "hidden", children: m }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = m) : o = ko(m, r, 0, null), e = fi(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Hl(n), t.memoizedState = Yl, e) : $l(t, m));
    if (a = e.memoizedState, a !== null && (T = a.dehydrated, T !== null)) return _h(e, t, m, r, T, a, n);
    if (o) {
      o = r.fallback, m = t.mode, a = e.child, T = a.sibling;
      var O = { mode: "hidden", children: r.children };
      return (m & 1) === 0 && t.child !== a ? (r = t.child, r.childLanes = 0, r.pendingProps = O, t.deletions = null) : (r = zr(a, O), r.subtreeFlags = a.subtreeFlags & 14680064), T !== null ? o = zr(T, o) : (o = fi(o, m, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, m = e.child.memoizedState, m = m === null ? Hl(n) : { baseLanes: m.baseLanes | n, cachePool: null, transitions: m.transitions }, o.memoizedState = m, o.childLanes = e.childLanes & ~n, t.memoizedState = Yl, r;
    }
    return o = e.child, e = o.sibling, r = zr(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function $l(e, t) {
    return t = ko({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function oo(e, t, n, r) {
    return r !== null && wl(r), Ii(t, e.child, null, n), e = $l(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function _h(e, t, n, r, a, o, m) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Fl(Error(s(422))), oo(e, t, m, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, a = t.mode, r = ko({ mode: "visible", children: r.children }, a, 0, null), o = fi(o, a, m, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && Ii(t, e.child, null, m), t.child.memoizedState = Hl(m), t.memoizedState = Yl, o);
    if ((t.mode & 1) === 0) return oo(e, t, m, null);
    if (a.data === "$!") {
      if (r = a.nextSibling && a.nextSibling.dataset, r) var T = r.dgst;
      return r = T, o = Error(s(419)), r = Fl(o, r, void 0), oo(e, t, m, r);
    }
    if (T = (m & e.childLanes) !== 0, Gt || T) {
      if (r = St, r !== null) {
        switch (m & -m) {
          case 4:
            a = 2;
            break;
          case 16:
            a = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            a = 32;
            break;
          case 536870912:
            a = 268435456;
            break;
          default:
            a = 0;
        }
        a = (a & (r.suspendedLanes | m)) !== 0 ? 0 : a, a !== 0 && a !== o.retryLane && (o.retryLane = a, ir(e, a), Mn(r, e, a, -1));
      }
      return ss(), r = Fl(Error(s(421))), oo(e, t, m, r);
    }
    return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Xh.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, on = Tr(a.nextSibling), an = t, ot = !0, En = null, e !== null && (hn[fn++] = nr, hn[fn++] = rr, hn[fn++] = ii, nr = e.id, rr = e.overflow, ii = t), t = $l(t, r.children), t.flags |= 4096, t);
  }
  function hu(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), El(e.return, t, n);
  }
  function ql(e, t, n, r, a) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a);
  }
  function fu(e, t, n) {
    var r = t.pendingProps, a = r.revealOrder, o = r.tail;
    if (_t(e, t, r.children, n), r = ct.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && hu(e, n, t);
        else if (e.tag === 19) hu(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (nt(ct, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (a) {
      case "forwards":
        for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && Za(e) === null && (a = n), n = n.sibling;
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), ql(t, !1, a, n, o);
        break;
      case "backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && Za(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        ql(t, !0, n, null, o);
        break;
      case "together":
        ql(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function lo(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function or(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ci |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = zr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = zr(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Fh(e, t, n) {
    switch (t.tag) {
      case 3:
        cu(t), Oi();
        break;
      case 5:
        Mc(t);
        break;
      case 1:
        Jt(t.type) && Va(t);
        break;
      case 4:
        Ll(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, a = t.memoizedProps.value;
        nt(Ja, r._currentValue), r._currentValue = a;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (nt(ct, ct.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? du(e, t, n) : (nt(ct, ct.current & 1), e = or(e, t, n), e !== null ? e.sibling : null);
        nt(ct, ct.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return fu(e, t, n);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), nt(ct, ct.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, ou(e, t, n);
    }
    return or(e, t, n);
  }
  var pu, Wl, mu, gu;
  pu = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, Wl = function() {
  }, mu = function(e, t, n, r) {
    var a = e.memoizedProps;
    if (a !== r) {
      e = t.stateNode, li(_n.current);
      var o = null;
      switch (n) {
        case "input":
          a = fe(e, a), r = fe(e, r), o = [];
          break;
        case "select":
          a = _({}, a, { value: void 0 }), r = _({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          a = Ue(e, a), r = Ue(e, r), o = [];
          break;
        default:
          typeof a.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Fa);
      }
      Dt(n, r);
      var m;
      n = null;
      for (H in a) if (!r.hasOwnProperty(H) && a.hasOwnProperty(H) && a[H] != null) if (H === "style") {
        var T = a[H];
        for (m in T) T.hasOwnProperty(m) && (n || (n = {}), n[m] = "");
      } else H !== "dangerouslySetInnerHTML" && H !== "children" && H !== "suppressContentEditableWarning" && H !== "suppressHydrationWarning" && H !== "autoFocus" && (p.hasOwnProperty(H) ? o || (o = []) : (o = o || []).push(H, null));
      for (H in r) {
        var O = r[H];
        if (T = a?.[H], r.hasOwnProperty(H) && O !== T && (O != null || T != null)) if (H === "style") if (T) {
          for (m in T) !T.hasOwnProperty(m) || O && O.hasOwnProperty(m) || (n || (n = {}), n[m] = "");
          for (m in O) O.hasOwnProperty(m) && T[m] !== O[m] && (n || (n = {}), n[m] = O[m]);
        } else n || (o || (o = []), o.push(
          H,
          n
        )), n = O;
        else H === "dangerouslySetInnerHTML" ? (O = O ? O.__html : void 0, T = T ? T.__html : void 0, O != null && T !== O && (o = o || []).push(H, O)) : H === "children" ? typeof O != "string" && typeof O != "number" || (o = o || []).push(H, "" + O) : H !== "suppressContentEditableWarning" && H !== "suppressHydrationWarning" && (p.hasOwnProperty(H) ? (O != null && H === "onScroll" && it("scroll", e), o || T === O || (o = [])) : (o = o || []).push(H, O));
      }
      n && (o = o || []).push("style", n);
      var H = o;
      (t.updateQueue = H) && (t.flags |= 4);
    }
  }, gu = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function pa(e, t) {
    if (!ot) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function Bt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 14680064, r |= a.flags & 14680064, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function Uh(e, t, n) {
    var r = t.pendingProps;
    switch (gl(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Bt(t), null;
      case 1:
        return Jt(t.type) && Ka(), Bt(t), null;
      case 3:
        return r = t.stateNode, zi(), at(Wt), at(It), Nl(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (qa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, En !== null && (as(En), En = null))), Wl(e, t), Bt(t), null;
      case 5:
        Ml(t);
        var a = li(ca.current);
        if (n = t.type, e !== null && t.stateNode != null) mu(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return Bt(t), null;
          }
          if (e = li(_n.current), qa(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[jn] = t, r[ia] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                it("cancel", r), it("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                it("load", r);
                break;
              case "video":
              case "audio":
                for (a = 0; a < ta.length; a++) it(ta[a], r);
                break;
              case "source":
                it("error", r);
                break;
              case "img":
              case "image":
              case "link":
                it(
                  "error",
                  r
                ), it("load", r);
                break;
              case "details":
                it("toggle", r);
                break;
              case "input":
                ye(r, o), it("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, it("invalid", r);
                break;
              case "textarea":
                He(r, o), it("invalid", r);
            }
            Dt(n, o), a = null;
            for (var m in o) if (o.hasOwnProperty(m)) {
              var T = o[m];
              m === "children" ? typeof T == "string" ? r.textContent !== T && (o.suppressHydrationWarning !== !0 && _a(r.textContent, T, e), a = ["children", T]) : typeof T == "number" && r.textContent !== "" + T && (o.suppressHydrationWarning !== !0 && _a(
                r.textContent,
                T,
                e
              ), a = ["children", "" + T]) : p.hasOwnProperty(m) && T != null && m === "onScroll" && it("scroll", r);
            }
            switch (n) {
              case "input":
                je(r), Pe(r, o, !0);
                break;
              case "textarea":
                je(r), Nn(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Fa);
            }
            r = a, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            m = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = sn(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = m.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = m.createElement(n, { is: r.is }) : (e = m.createElement(n), n === "select" && (m = e, r.multiple ? m.multiple = !0 : r.size && (m.size = r.size))) : e = m.createElementNS(e, n), e[jn] = t, e[ia] = r, pu(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (m = Yn(n, r), n) {
                case "dialog":
                  it("cancel", e), it("close", e), a = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  it("load", e), a = r;
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < ta.length; a++) it(ta[a], e);
                  a = r;
                  break;
                case "source":
                  it("error", e), a = r;
                  break;
                case "img":
                case "image":
                case "link":
                  it(
                    "error",
                    e
                  ), it("load", e), a = r;
                  break;
                case "details":
                  it("toggle", e), a = r;
                  break;
                case "input":
                  ye(e, r), a = fe(e, r), it("invalid", e);
                  break;
                case "option":
                  a = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, a = _({}, r, { value: void 0 }), it("invalid", e);
                  break;
                case "textarea":
                  He(e, r), a = Ue(e, r), it("invalid", e);
                  break;
                default:
                  a = r;
              }
              Dt(n, a), T = a;
              for (o in T) if (T.hasOwnProperty(o)) {
                var O = T[o];
                o === "style" ? Tt(e, O) : o === "dangerouslySetInnerHTML" ? (O = O ? O.__html : void 0, O != null && Ur(e, O)) : o === "children" ? typeof O == "string" ? (n !== "textarea" || O !== "") && Pn(e, O) : typeof O == "number" && Pn(e, "" + O) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (p.hasOwnProperty(o) ? O != null && o === "onScroll" && it("scroll", e) : O != null && U(e, o, O, m));
              }
              switch (n) {
                case "input":
                  je(e), Pe(e, r, !1);
                  break;
                case "textarea":
                  je(e), Nn(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + he(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? Le(e, !!r.multiple, o, !1) : r.defaultValue != null && Le(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof a.onClick == "function" && (e.onclick = Fa);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Bt(t), null;
      case 6:
        if (e && t.stateNode != null) gu(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (n = li(ca.current), li(_n.current), qa(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[jn] = t, (o = r.nodeValue !== n) && (e = an, e !== null)) switch (e.tag) {
              case 3:
                _a(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && _a(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[jn] = t, t.stateNode = r;
        }
        return Bt(t), null;
      case 13:
        if (at(ct), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ot && on !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) wc(), Oi(), t.flags |= 98560, o = !1;
          else if (o = qa(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(s(317));
              o[jn] = t;
            } else Oi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Bt(t), o = !1;
          } else En !== null && (as(En), En = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ct.current & 1) !== 0 ? vt === 0 && (vt = 3) : ss())), t.updateQueue !== null && (t.flags |= 4), Bt(t), null);
      case 4:
        return zi(), Wl(e, t), e === null && na(t.stateNode.containerInfo), Bt(t), null;
      case 10:
        return Sl(t.type._context), Bt(t), null;
      case 17:
        return Jt(t.type) && Ka(), Bt(t), null;
      case 19:
        if (at(ct), o = t.memoizedState, o === null) return Bt(t), null;
        if (r = (t.flags & 128) !== 0, m = o.rendering, m === null) if (r) pa(o, !1);
        else {
          if (vt !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (m = Za(e), m !== null) {
              for (t.flags |= 128, pa(o, !1), r = m.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, m = o.alternate, m === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = m.childLanes, o.lanes = m.lanes, o.child = m.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = m.memoizedProps, o.memoizedState = m.memoizedState, o.updateQueue = m.updateQueue, o.type = m.type, e = m.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return nt(ct, ct.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && st() > Fi && (t.flags |= 128, r = !0, pa(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Za(m), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), pa(o, !0), o.tail === null && o.tailMode === "hidden" && !m.alternate && !ot) return Bt(t), null;
          } else 2 * st() - o.renderingStartTime > Fi && n !== 1073741824 && (t.flags |= 128, r = !0, pa(o, !1), t.lanes = 4194304);
          o.isBackwards ? (m.sibling = t.child, t.child = m) : (n = o.last, n !== null ? n.sibling = m : t.child = m, o.last = m);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = st(), t.sibling = null, n = ct.current, nt(ct, r ? n & 1 | 2 : n & 1), t) : (Bt(t), null);
      case 22:
      case 23:
        return ls(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (ln & 1073741824) !== 0 && (Bt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Bt(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Kh(e, t) {
    switch (gl(t), t.tag) {
      case 1:
        return Jt(t.type) && Ka(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zi(), at(Wt), at(It), Nl(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Ml(t), null;
      case 13:
        if (at(ct), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          Oi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return at(ct), null;
      case 4:
        return zi(), null;
      case 10:
        return Sl(t.type._context), null;
      case 22:
      case 23:
        return ls(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var so = !1, zt = !1, Vh = typeof WeakSet == "function" ? WeakSet : Set, Ee = null;
  function ji(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      dt(e, t, r);
    }
    else n.current = null;
  }
  function Jl(e, t, n) {
    try {
      n();
    } catch (r) {
      dt(e, t, r);
    }
  }
  var yu = !1;
  function Yh(e, t) {
    if (ll = Xn, e = Js(), Zo(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var a = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var m = 0, T = -1, O = -1, H = 0, le = 0, se = e, ae = null;
          t: for (; ; ) {
            for (var ke; se !== n || a !== 0 && se.nodeType !== 3 || (T = m + a), se !== o || r !== 0 && se.nodeType !== 3 || (O = m + r), se.nodeType === 3 && (m += se.nodeValue.length), (ke = se.firstChild) !== null; )
              ae = se, se = ke;
            for (; ; ) {
              if (se === e) break t;
              if (ae === n && ++H === a && (T = m), ae === o && ++le === r && (O = m), (ke = se.nextSibling) !== null) break;
              se = ae, ae = se.parentNode;
            }
            se = ke;
          }
          n = T === -1 || O === -1 ? null : { start: T, end: O };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (sl = { focusedElem: e, selectionRange: n }, Xn = !1, Ee = t; Ee !== null; ) if (t = Ee, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ee = e;
    else for (; Ee !== null; ) {
      t = Ee;
      try {
        var Ce = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Ce !== null) {
              var Me = Ce.memoizedProps, ht = Ce.memoizedState, F = t.stateNode, B = F.getSnapshotBeforeUpdate(t.elementType === t.type ? Me : Cn(t.type, Me), ht);
              F.__reactInternalSnapshotBeforeUpdate = B;
            }
            break;
          case 3:
            var K = t.stateNode.containerInfo;
            K.nodeType === 1 ? K.textContent = "" : K.nodeType === 9 && K.documentElement && K.removeChild(K.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (ue) {
        dt(t, t.return, ue);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, Ee = e;
        break;
      }
      Ee = t.return;
    }
    return Ce = yu, yu = !1, Ce;
  }
  function ma(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var a = r = r.next;
      do {
        if ((a.tag & e) === e) {
          var o = a.destroy;
          a.destroy = void 0, o !== void 0 && Jl(t, n, o);
        }
        a = a.next;
      } while (a !== r);
    }
  }
  function co(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Gl(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      e.tag, e = n, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function vu(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, vu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[jn], delete t[ia], delete t[hl], delete t[Lh], delete t[Mh])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function wu(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ku(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || wu(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ql(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Fa));
    else if (r !== 4 && (e = e.child, e !== null)) for (Ql(e, t, n), e = e.sibling; e !== null; ) Ql(e, t, n), e = e.sibling;
  }
  function Xl(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Xl(e, t, n), e = e.sibling; e !== null; ) Xl(e, t, n), e = e.sibling;
  }
  var Mt = null, Tn = !1;
  function Rr(e, t, n) {
    for (n = n.child; n !== null; ) bu(e, t, n), n = n.sibling;
  }
  function bu(e, t, n) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount($r, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        zt || ji(n, t);
      case 6:
        var r = Mt, a = Tn;
        Mt = null, Rr(e, t, n), Mt = r, Tn = a, Mt !== null && (Tn ? (e = Mt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Mt.removeChild(n.stateNode));
        break;
      case 18:
        Mt !== null && (Tn ? (e = Mt, n = n.stateNode, e.nodeType === 8 ? dl(e.parentNode, n) : e.nodeType === 1 && dl(e, n), br(e)) : dl(Mt, n.stateNode));
        break;
      case 4:
        r = Mt, a = Tn, Mt = n.stateNode.containerInfo, Tn = !0, Rr(e, t, n), Mt = r, Tn = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!zt && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          a = r = r.next;
          do {
            var o = a, m = o.destroy;
            o = o.tag, m !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Jl(n, t, m), a = a.next;
          } while (a !== r);
        }
        Rr(e, t, n);
        break;
      case 1:
        if (!zt && (ji(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (T) {
          dt(n, t, T);
        }
        Rr(e, t, n);
        break;
      case 21:
        Rr(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (zt = (r = zt) || n.memoizedState !== null, Rr(e, t, n), zt = r) : Rr(e, t, n);
        break;
      default:
        Rr(e, t, n);
    }
  }
  function Su(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Vh()), t.forEach(function(r) {
        var a = Zh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(a, a));
      });
    }
  }
  function Ln(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var a = n[r];
      try {
        var o = e, m = t, T = m;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 5:
              Mt = T.stateNode, Tn = !1;
              break e;
            case 3:
              Mt = T.stateNode.containerInfo, Tn = !0;
              break e;
            case 4:
              Mt = T.stateNode.containerInfo, Tn = !0;
              break e;
          }
          T = T.return;
        }
        if (Mt === null) throw Error(s(160));
        bu(o, m, a), Mt = null, Tn = !1;
        var O = a.alternate;
        O !== null && (O.return = null), a.return = null;
      } catch (H) {
        dt(a, t, H);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Eu(t, e), t = t.sibling;
  }
  function Eu(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ln(t, e), Un(e), r & 4) {
          try {
            ma(3, e, e.return), co(3, e);
          } catch (Me) {
            dt(e, e.return, Me);
          }
          try {
            ma(5, e, e.return);
          } catch (Me) {
            dt(e, e.return, Me);
          }
        }
        break;
      case 1:
        Ln(t, e), Un(e), r & 512 && n !== null && ji(n, n.return);
        break;
      case 5:
        if (Ln(t, e), Un(e), r & 512 && n !== null && ji(n, n.return), e.flags & 32) {
          var a = e.stateNode;
          try {
            Pn(a, "");
          } catch (Me) {
            dt(e, e.return, Me);
          }
        }
        if (r & 4 && (a = e.stateNode, a != null)) {
          var o = e.memoizedProps, m = n !== null ? n.memoizedProps : o, T = e.type, O = e.updateQueue;
          if (e.updateQueue = null, O !== null) try {
            T === "input" && o.type === "radio" && o.name != null && Oe(a, o), Yn(T, m);
            var H = Yn(T, o);
            for (m = 0; m < O.length; m += 2) {
              var le = O[m], se = O[m + 1];
              le === "style" ? Tt(a, se) : le === "dangerouslySetInnerHTML" ? Ur(a, se) : le === "children" ? Pn(a, se) : U(a, le, se, H);
            }
            switch (T) {
              case "input":
                Fe(a, o);
                break;
              case "textarea":
                Ge(a, o);
                break;
              case "select":
                var ae = a._wrapperState.wasMultiple;
                a._wrapperState.wasMultiple = !!o.multiple;
                var ke = o.value;
                ke != null ? Le(a, !!o.multiple, ke, !1) : ae !== !!o.multiple && (o.defaultValue != null ? Le(
                  a,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : Le(a, !!o.multiple, o.multiple ? [] : "", !1));
            }
            a[ia] = o;
          } catch (Me) {
            dt(e, e.return, Me);
          }
        }
        break;
      case 6:
        if (Ln(t, e), Un(e), r & 4) {
          if (e.stateNode === null) throw Error(s(162));
          a = e.stateNode, o = e.memoizedProps;
          try {
            a.nodeValue = o;
          } catch (Me) {
            dt(e, e.return, Me);
          }
        }
        break;
      case 3:
        if (Ln(t, e), Un(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          br(t.containerInfo);
        } catch (Me) {
          dt(e, e.return, Me);
        }
        break;
      case 4:
        Ln(t, e), Un(e);
        break;
      case 13:
        Ln(t, e), Un(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || (ts = st())), r & 4 && Su(e);
        break;
      case 22:
        if (le = n !== null && n.memoizedState !== null, e.mode & 1 ? (zt = (H = zt) || le, Ln(t, e), zt = H) : Ln(t, e), Un(e), r & 8192) {
          if (H = e.memoizedState !== null, (e.stateNode.isHidden = H) && !le && (e.mode & 1) !== 0) for (Ee = e, le = e.child; le !== null; ) {
            for (se = Ee = le; Ee !== null; ) {
              switch (ae = Ee, ke = ae.child, ae.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ma(4, ae, ae.return);
                  break;
                case 1:
                  ji(ae, ae.return);
                  var Ce = ae.stateNode;
                  if (typeof Ce.componentWillUnmount == "function") {
                    r = ae, n = ae.return;
                    try {
                      t = r, Ce.props = t.memoizedProps, Ce.state = t.memoizedState, Ce.componentWillUnmount();
                    } catch (Me) {
                      dt(r, n, Me);
                    }
                  }
                  break;
                case 5:
                  ji(ae, ae.return);
                  break;
                case 22:
                  if (ae.memoizedState !== null) {
                    Lu(se);
                    continue;
                  }
              }
              ke !== null ? (ke.return = ae, Ee = ke) : Lu(se);
            }
            le = le.sibling;
          }
          e: for (le = null, se = e; ; ) {
            if (se.tag === 5) {
              if (le === null) {
                le = se;
                try {
                  a = se.stateNode, H ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (T = se.stateNode, O = se.memoizedProps.style, m = O != null && O.hasOwnProperty("display") ? O.display : null, T.style.display = dr("display", m));
                } catch (Me) {
                  dt(e, e.return, Me);
                }
              }
            } else if (se.tag === 6) {
              if (le === null) try {
                se.stateNode.nodeValue = H ? "" : se.memoizedProps;
              } catch (Me) {
                dt(e, e.return, Me);
              }
            } else if ((se.tag !== 22 && se.tag !== 23 || se.memoizedState === null || se === e) && se.child !== null) {
              se.child.return = se, se = se.child;
              continue;
            }
            if (se === e) break e;
            for (; se.sibling === null; ) {
              if (se.return === null || se.return === e) break e;
              le === se && (le = null), se = se.return;
            }
            le === se && (le = null), se.sibling.return = se.return, se = se.sibling;
          }
        }
        break;
      case 19:
        Ln(t, e), Un(e), r & 4 && Su(e);
        break;
      case 21:
        break;
      default:
        Ln(
          t,
          e
        ), Un(e);
    }
  }
  function Un(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (wu(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var a = r.stateNode;
            r.flags & 32 && (Pn(a, ""), r.flags &= -33);
            var o = ku(e);
            Xl(e, o, a);
            break;
          case 3:
          case 4:
            var m = r.stateNode.containerInfo, T = ku(e);
            Ql(e, T, m);
            break;
          default:
            throw Error(s(161));
        }
      } catch (O) {
        dt(e, e.return, O);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Hh(e, t, n) {
    Ee = e, Cu(e);
  }
  function Cu(e, t, n) {
    for (var r = (e.mode & 1) !== 0; Ee !== null; ) {
      var a = Ee, o = a.child;
      if (a.tag === 22 && r) {
        var m = a.memoizedState !== null || so;
        if (!m) {
          var T = a.alternate, O = T !== null && T.memoizedState !== null || zt;
          T = so;
          var H = zt;
          if (so = m, (zt = O) && !H) for (Ee = a; Ee !== null; ) m = Ee, O = m.child, m.tag === 22 && m.memoizedState !== null ? Mu(a) : O !== null ? (O.return = m, Ee = O) : Mu(a);
          for (; o !== null; ) Ee = o, Cu(o), o = o.sibling;
          Ee = a, so = T, zt = H;
        }
        Tu(e);
      } else (a.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = a, Ee = o) : Tu(e);
    }
  }
  function Tu(e) {
    for (; Ee !== null; ) {
      var t = Ee;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              zt || co(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !zt) if (n === null) r.componentDidMount();
              else {
                var a = t.elementType === t.type ? n.memoizedProps : Cn(t.type, n.memoizedProps);
                r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && Lc(t, o, r);
              break;
            case 3:
              var m = t.updateQueue;
              if (m !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                Lc(t, m, n);
              }
              break;
            case 5:
              var T = t.stateNode;
              if (n === null && t.flags & 4) {
                n = T;
                var O = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    O.autoFocus && n.focus();
                    break;
                  case "img":
                    O.src && (n.src = O.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var H = t.alternate;
                if (H !== null) {
                  var le = H.memoizedState;
                  if (le !== null) {
                    var se = le.dehydrated;
                    se !== null && br(se);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(s(163));
          }
          zt || t.flags & 512 && Gl(t);
        } catch (ae) {
          dt(t, t.return, ae);
        }
      }
      if (t === e) {
        Ee = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, Ee = n;
        break;
      }
      Ee = t.return;
    }
  }
  function Lu(e) {
    for (; Ee !== null; ) {
      var t = Ee;
      if (t === e) {
        Ee = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Ee = n;
        break;
      }
      Ee = t.return;
    }
  }
  function Mu(e) {
    for (; Ee !== null; ) {
      var t = Ee;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              co(4, t);
            } catch (O) {
              dt(t, n, O);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var a = t.return;
              try {
                r.componentDidMount();
              } catch (O) {
                dt(t, a, O);
              }
            }
            var o = t.return;
            try {
              Gl(t);
            } catch (O) {
              dt(t, o, O);
            }
            break;
          case 5:
            var m = t.return;
            try {
              Gl(t);
            } catch (O) {
              dt(t, m, O);
            }
        }
      } catch (O) {
        dt(t, t.return, O);
      }
      if (t === e) {
        Ee = null;
        break;
      }
      var T = t.sibling;
      if (T !== null) {
        T.return = t.return, Ee = T;
        break;
      }
      Ee = t.return;
    }
  }
  var $h = Math.ceil, uo = P.ReactCurrentDispatcher, Zl = P.ReactCurrentOwner, gn = P.ReactCurrentBatchConfig, Je = 0, St = null, pt = null, xt = 0, ln = 0, _i = Lr(0), vt = 0, ga = null, ci = 0, ho = 0, es = 0, ya = null, Qt = null, ts = 0, Fi = 1 / 0, lr = null, fo = !1, ns = null, Or = null, po = !1, Ir = null, mo = 0, va = 0, rs = null, go = -1, yo = 0;
  function Ft() {
    return (Je & 6) !== 0 ? st() : go !== -1 ? go : go = st();
  }
  function Ar(e) {
    return (e.mode & 1) === 0 ? 1 : (Je & 2) !== 0 && xt !== 0 ? xt & -xt : Nh.transition !== null ? (yo === 0 && (yo = Gr()), yo) : (e = Ze, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ji(e.type)), e);
  }
  function Mn(e, t, n, r) {
    if (50 < va) throw va = 0, rs = null, Error(s(185));
    Bn(e, n, r), ((Je & 2) === 0 || e !== St) && (e === St && ((Je & 2) === 0 && (ho |= n), vt === 4 && Br(e, xt)), Xt(e, r), n === 1 && Je === 0 && (t.mode & 1) === 0 && (Fi = st() + 500, Ya && xr()));
  }
  function Xt(e, t) {
    var n = e.callbackNode;
    Ra(e, t);
    var r = vr(e, e === St ? xt : 0);
    if (r === 0) n !== null && mr(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && mr(n), t === 1) e.tag === 0 ? xh(Nu.bind(null, e)) : pc(Nu.bind(null, e)), Ch(function() {
        (Je & 6) === 0 && xr();
      }), n = null;
      else {
        switch (Oa(r)) {
          case 1:
            n = Vr;
            break;
          case 4:
            n = Yr;
            break;
          case 16:
            n = Hr;
            break;
          case 536870912:
            n = xa;
            break;
          default:
            n = Hr;
        }
        n = Du(n, xu.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function xu(e, t) {
    if (go = -1, yo = 0, (Je & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (Ui() && e.callbackNode !== n) return null;
    var r = vr(e, e === St ? xt : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = vo(e, r);
    else {
      t = r;
      var a = Je;
      Je |= 2;
      var o = Ru();
      (St !== e || xt !== t) && (lr = null, Fi = st() + 500, di(e, t));
      do
        try {
          Jh();
          break;
        } catch (T) {
          Pu(e, T);
        }
      while (!0);
      bl(), uo.current = o, Je = a, pt !== null ? t = 0 : (St = null, xt = 0, t = vt);
    }
    if (t !== 0) {
      if (t === 2 && (a = Jr(e), a !== 0 && (r = a, t = is(e, a))), t === 1) throw n = ga, di(e, 0), Br(e, r), Xt(e, st()), n;
      if (t === 6) Br(e, r);
      else {
        if (a = e.current.alternate, (r & 30) === 0 && !qh(a) && (t = vo(e, r), t === 2 && (o = Jr(e), o !== 0 && (r = o, t = is(e, o))), t === 1)) throw n = ga, di(e, 0), Br(e, r), Xt(e, st()), n;
        switch (e.finishedWork = a, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            hi(e, Qt, lr);
            break;
          case 3:
            if (Br(e, r), (r & 130023424) === r && (t = ts + 500 - st(), 10 < t)) {
              if (vr(e, 0) !== 0) break;
              if (a = e.suspendedLanes, (a & r) !== r) {
                Ft(), e.pingedLanes |= e.suspendedLanes & a;
                break;
              }
              e.timeoutHandle = ul(hi.bind(null, e, Qt, lr), t);
              break;
            }
            hi(e, Qt, lr);
            break;
          case 4:
            if (Br(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, a = -1; 0 < r; ) {
              var m = 31 - nn(r);
              o = 1 << m, m = t[m], m > a && (a = m), r &= ~o;
            }
            if (r = a, r = st() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * $h(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = ul(hi.bind(null, e, Qt, lr), r);
              break;
            }
            hi(e, Qt, lr);
            break;
          case 5:
            hi(e, Qt, lr);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Xt(e, st()), e.callbackNode === n ? xu.bind(null, e) : null;
  }
  function is(e, t) {
    var n = ya;
    return e.current.memoizedState.isDehydrated && (di(e, t).flags |= 256), e = vo(e, t), e !== 2 && (t = Qt, Qt = n, t !== null && as(t)), e;
  }
  function as(e) {
    Qt === null ? Qt = e : Qt.push.apply(Qt, e);
  }
  function qh(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var a = n[r], o = a.getSnapshot;
          a = a.value;
          try {
            if (!Sn(o(), a)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Br(e, t) {
    for (t &= ~es, t &= ~ho, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - nn(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function Nu(e) {
    if ((Je & 6) !== 0) throw Error(s(327));
    Ui();
    var t = vr(e, 0);
    if ((t & 1) === 0) return Xt(e, st()), null;
    var n = vo(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Jr(e);
      r !== 0 && (t = r, n = is(e, r));
    }
    if (n === 1) throw n = ga, di(e, 0), Br(e, t), Xt(e, st()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, hi(e, Qt, lr), Xt(e, st()), null;
  }
  function os(e, t) {
    var n = Je;
    Je |= 1;
    try {
      return e(t);
    } finally {
      Je = n, Je === 0 && (Fi = st() + 500, Ya && xr());
    }
  }
  function ui(e) {
    Ir !== null && Ir.tag === 0 && (Je & 6) === 0 && Ui();
    var t = Je;
    Je |= 1;
    var n = gn.transition, r = Ze;
    try {
      if (gn.transition = null, Ze = 1, e) return e();
    } finally {
      Ze = r, gn.transition = n, Je = t, (Je & 6) === 0 && xr();
    }
  }
  function ls() {
    ln = _i.current, at(_i);
  }
  function di(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Eh(n)), pt !== null) for (n = pt.return; n !== null; ) {
      var r = n;
      switch (gl(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Ka();
          break;
        case 3:
          zi(), at(Wt), at(It), Nl();
          break;
        case 5:
          Ml(r);
          break;
        case 4:
          zi();
          break;
        case 13:
          at(ct);
          break;
        case 19:
          at(ct);
          break;
        case 10:
          Sl(r.type._context);
          break;
        case 22:
        case 23:
          ls();
      }
      n = n.return;
    }
    if (St = e, pt = e = zr(e.current, null), xt = ln = t, vt = 0, ga = null, es = ho = ci = 0, Qt = ya = null, oi !== null) {
      for (t = 0; t < oi.length; t++) if (n = oi[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var a = r.next, o = n.pending;
        if (o !== null) {
          var m = o.next;
          o.next = a, r.next = m;
        }
        n.pending = r;
      }
      oi = null;
    }
    return e;
  }
  function Pu(e, t) {
    do {
      var n = pt;
      try {
        if (bl(), eo.current = io, to) {
          for (var r = ut.memoizedState; r !== null; ) {
            var a = r.queue;
            a !== null && (a.pending = null), r = r.next;
          }
          to = !1;
        }
        if (si = 0, bt = yt = ut = null, ua = !1, da = 0, Zl.current = null, n === null || n.return === null) {
          vt = 1, ga = t, pt = null;
          break;
        }
        e: {
          var o = e, m = n.return, T = n, O = t;
          if (t = xt, T.flags |= 32768, O !== null && typeof O == "object" && typeof O.then == "function") {
            var H = O, le = T, se = le.tag;
            if ((le.mode & 1) === 0 && (se === 0 || se === 11 || se === 15)) {
              var ae = le.alternate;
              ae ? (le.updateQueue = ae.updateQueue, le.memoizedState = ae.memoizedState, le.lanes = ae.lanes) : (le.updateQueue = null, le.memoizedState = null);
            }
            var ke = tu(m);
            if (ke !== null) {
              ke.flags &= -257, nu(ke, m, T, o, t), ke.mode & 1 && eu(o, H, t), t = ke, O = H;
              var Ce = t.updateQueue;
              if (Ce === null) {
                var Me = /* @__PURE__ */ new Set();
                Me.add(O), t.updateQueue = Me;
              } else Ce.add(O);
              break e;
            } else {
              if ((t & 1) === 0) {
                eu(o, H, t), ss();
                break e;
              }
              O = Error(s(426));
            }
          } else if (ot && T.mode & 1) {
            var ht = tu(m);
            if (ht !== null) {
              (ht.flags & 65536) === 0 && (ht.flags |= 256), nu(ht, m, T, o, t), wl(Di(O, T));
              break e;
            }
          }
          o = O = Di(O, T), vt !== 4 && (vt = 2), ya === null ? ya = [o] : ya.push(o), o = m;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var F = Xc(o, O, t);
                Tc(o, F);
                break e;
              case 1:
                T = O;
                var B = o.type, K = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof B.getDerivedStateFromError == "function" || K !== null && typeof K.componentDidCatch == "function" && (Or === null || !Or.has(K)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var ue = Zc(o, T, t);
                  Tc(o, ue);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Iu(n);
      } catch (Re) {
        t = Re, pt === n && n !== null && (pt = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Ru() {
    var e = uo.current;
    return uo.current = io, e === null ? io : e;
  }
  function ss() {
    (vt === 0 || vt === 3 || vt === 2) && (vt = 4), St === null || (ci & 268435455) === 0 && (ho & 268435455) === 0 || Br(St, xt);
  }
  function vo(e, t) {
    var n = Je;
    Je |= 2;
    var r = Ru();
    (St !== e || xt !== t) && (lr = null, di(e, t));
    do
      try {
        Wh();
        break;
      } catch (a) {
        Pu(e, a);
      }
    while (!0);
    if (bl(), Je = n, uo.current = r, pt !== null) throw Error(s(261));
    return St = null, xt = 0, vt;
  }
  function Wh() {
    for (; pt !== null; ) Ou(pt);
  }
  function Jh() {
    for (; pt !== null && !qn(); ) Ou(pt);
  }
  function Ou(e) {
    var t = zu(e.alternate, e, ln);
    e.memoizedProps = e.pendingProps, t === null ? Iu(e) : pt = t, Zl.current = null;
  }
  function Iu(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = Uh(n, t, ln), n !== null) {
          pt = n;
          return;
        }
      } else {
        if (n = Kh(n, t), n !== null) {
          n.flags &= 32767, pt = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          vt = 6, pt = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        pt = t;
        return;
      }
      pt = t = e;
    } while (t !== null);
    vt === 0 && (vt = 5);
  }
  function hi(e, t, n) {
    var r = Ze, a = gn.transition;
    try {
      gn.transition = null, Ze = 1, Gh(e, t, n, r);
    } finally {
      gn.transition = a, Ze = r;
    }
    return null;
  }
  function Gh(e, t, n, r) {
    do
      Ui();
    while (Ir !== null);
    if ((Je & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var a = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Yo(e, o), e === St && (pt = St = null, xt = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || po || (po = !0, Du(Hr, function() {
      return Ui(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = gn.transition, gn.transition = null;
      var m = Ze;
      Ze = 1;
      var T = Je;
      Je |= 4, Zl.current = null, Yh(e, n), Eu(n, e), gh(sl), Xn = !!ll, sl = ll = null, e.current = n, Hh(n), Ko(), Je = T, Ze = m, gn.transition = o;
    } else e.current = n;
    if (po && (po = !1, Ir = e, mo = a), o = e.pendingLanes, o === 0 && (Or = null), Na(n.stateNode), Xt(e, st()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, { componentStack: a.stack, digest: a.digest });
    if (fo) throw fo = !1, e = ns, ns = null, e;
    return (mo & 1) !== 0 && e.tag !== 0 && Ui(), o = e.pendingLanes, (o & 1) !== 0 ? e === rs ? va++ : (va = 0, rs = e) : va = 0, xr(), null;
  }
  function Ui() {
    if (Ir !== null) {
      var e = Oa(mo), t = gn.transition, n = Ze;
      try {
        if (gn.transition = null, Ze = 16 > e ? 16 : e, Ir === null) var r = !1;
        else {
          if (e = Ir, Ir = null, mo = 0, (Je & 6) !== 0) throw Error(s(331));
          var a = Je;
          for (Je |= 4, Ee = e.current; Ee !== null; ) {
            var o = Ee, m = o.child;
            if ((Ee.flags & 16) !== 0) {
              var T = o.deletions;
              if (T !== null) {
                for (var O = 0; O < T.length; O++) {
                  var H = T[O];
                  for (Ee = H; Ee !== null; ) {
                    var le = Ee;
                    switch (le.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ma(8, le, o);
                    }
                    var se = le.child;
                    if (se !== null) se.return = le, Ee = se;
                    else for (; Ee !== null; ) {
                      le = Ee;
                      var ae = le.sibling, ke = le.return;
                      if (vu(le), le === H) {
                        Ee = null;
                        break;
                      }
                      if (ae !== null) {
                        ae.return = ke, Ee = ae;
                        break;
                      }
                      Ee = ke;
                    }
                  }
                }
                var Ce = o.alternate;
                if (Ce !== null) {
                  var Me = Ce.child;
                  if (Me !== null) {
                    Ce.child = null;
                    do {
                      var ht = Me.sibling;
                      Me.sibling = null, Me = ht;
                    } while (Me !== null);
                  }
                }
                Ee = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && m !== null) m.return = o, Ee = m;
            else e: for (; Ee !== null; ) {
              if (o = Ee, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  ma(9, o, o.return);
              }
              var F = o.sibling;
              if (F !== null) {
                F.return = o.return, Ee = F;
                break e;
              }
              Ee = o.return;
            }
          }
          var B = e.current;
          for (Ee = B; Ee !== null; ) {
            m = Ee;
            var K = m.child;
            if ((m.subtreeFlags & 2064) !== 0 && K !== null) K.return = m, Ee = K;
            else e: for (m = B; Ee !== null; ) {
              if (T = Ee, (T.flags & 2048) !== 0) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    co(9, T);
                }
              } catch (Re) {
                dt(T, T.return, Re);
              }
              if (T === m) {
                Ee = null;
                break e;
              }
              var ue = T.sibling;
              if (ue !== null) {
                ue.return = T.return, Ee = ue;
                break e;
              }
              Ee = T.return;
            }
          }
          if (Je = a, xr(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot($r, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        Ze = n, gn.transition = t;
      }
    }
    return !1;
  }
  function Au(e, t, n) {
    t = Di(n, t), t = Xc(e, t, 1), e = Pr(e, t, 1), t = Ft(), e !== null && (Bn(e, 1, t), Xt(e, t));
  }
  function dt(e, t, n) {
    if (e.tag === 3) Au(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Au(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Or === null || !Or.has(r))) {
          e = Di(n, e), e = Zc(t, e, 1), t = Pr(t, e, 1), e = Ft(), t !== null && (Bn(t, 1, e), Xt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Qh(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Ft(), e.pingedLanes |= e.suspendedLanes & n, St === e && (xt & n) === n && (vt === 4 || vt === 3 && (xt & 130023424) === xt && 500 > st() - ts ? di(e, 0) : es |= n), Xt(e, t);
  }
  function Bu(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Wr, Wr <<= 1, (Wr & 130023424) === 0 && (Wr = 4194304)));
    var n = Ft();
    e = ir(e, t), e !== null && (Bn(e, t, n), Xt(e, n));
  }
  function Xh(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Bu(e, n);
  }
  function Zh(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(t), Bu(e, n);
  }
  var zu;
  zu = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Wt.current) Gt = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Gt = !1, Fh(e, t, n);
      Gt = (e.flags & 131072) !== 0;
    }
    else Gt = !1, ot && (t.flags & 1048576) !== 0 && mc(t, $a, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        lo(e, t), e = t.pendingProps;
        var a = Ni(t, It.current);
        Bi(t, n), a = Ol(null, t, r, e, a, n);
        var o = Il();
        return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Jt(r) ? (o = !0, Va(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Tl(t), a.updater = ao, t.stateNode = a, a._reactInternals = t, _l(t, r, e, n), t = Vl(null, t, r, !0, o, n)) : (t.tag = 0, ot && o && ml(t), _t(null, t, a, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (lo(e, t), e = t.pendingProps, a = r._init, r = a(r._payload), t.type = r, a = t.tag = tf(r), e = Cn(r, e), a) {
            case 0:
              t = Kl(null, t, r, e, n);
              break e;
            case 1:
              t = su(null, t, r, e, n);
              break e;
            case 11:
              t = ru(null, t, r, e, n);
              break e;
            case 14:
              t = iu(null, t, r, Cn(r.type, e), n);
              break e;
          }
          throw Error(s(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Cn(r, a), Kl(e, t, r, a, n);
      case 1:
        return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Cn(r, a), su(e, t, r, a, n);
      case 3:
        e: {
          if (cu(t), e === null) throw Error(s(387));
          r = t.pendingProps, o = t.memoizedState, a = o.element, Cc(e, t), Xa(t, r, null, n);
          var m = t.memoizedState;
          if (r = m.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            a = Di(Error(s(423)), t), t = uu(e, t, r, n, a);
            break e;
          } else if (r !== a) {
            a = Di(Error(s(424)), t), t = uu(e, t, r, n, a);
            break e;
          } else for (on = Tr(t.stateNode.containerInfo.firstChild), an = t, ot = !0, En = null, n = Sc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Oi(), r === a) {
              t = or(e, t, n);
              break e;
            }
            _t(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Mc(t), e === null && vl(t), r = t.type, a = t.pendingProps, o = e !== null ? e.memoizedProps : null, m = a.children, cl(r, a) ? m = null : o !== null && cl(r, o) && (t.flags |= 32), lu(e, t), _t(e, t, m, n), t.child;
      case 6:
        return e === null && vl(t), null;
      case 13:
        return du(e, t, n);
      case 4:
        return Ll(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ii(t, null, r, n) : _t(e, t, r, n), t.child;
      case 11:
        return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Cn(r, a), ru(e, t, r, a, n);
      case 7:
        return _t(e, t, t.pendingProps, n), t.child;
      case 8:
        return _t(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return _t(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, a = t.pendingProps, o = t.memoizedProps, m = a.value, nt(Ja, r._currentValue), r._currentValue = m, o !== null) if (Sn(o.value, m)) {
            if (o.children === a.children && !Wt.current) {
              t = or(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var T = o.dependencies;
            if (T !== null) {
              m = o.child;
              for (var O = T.firstContext; O !== null; ) {
                if (O.context === r) {
                  if (o.tag === 1) {
                    O = ar(-1, n & -n), O.tag = 2;
                    var H = o.updateQueue;
                    if (H !== null) {
                      H = H.shared;
                      var le = H.pending;
                      le === null ? O.next = O : (O.next = le.next, le.next = O), H.pending = O;
                    }
                  }
                  o.lanes |= n, O = o.alternate, O !== null && (O.lanes |= n), El(
                    o.return,
                    n,
                    t
                  ), T.lanes |= n;
                  break;
                }
                O = O.next;
              }
            } else if (o.tag === 10) m = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (m = o.return, m === null) throw Error(s(341));
              m.lanes |= n, T = m.alternate, T !== null && (T.lanes |= n), El(m, n, t), m = o.sibling;
            } else m = o.child;
            if (m !== null) m.return = o;
            else for (m = o; m !== null; ) {
              if (m === t) {
                m = null;
                break;
              }
              if (o = m.sibling, o !== null) {
                o.return = m.return, m = o;
                break;
              }
              m = m.return;
            }
            o = m;
          }
          _t(e, t, a.children, n), t = t.child;
        }
        return t;
      case 9:
        return a = t.type, r = t.pendingProps.children, Bi(t, n), a = pn(a), r = r(a), t.flags |= 1, _t(e, t, r, n), t.child;
      case 14:
        return r = t.type, a = Cn(r, t.pendingProps), a = Cn(r.type, a), iu(e, t, r, a, n);
      case 15:
        return au(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Cn(r, a), lo(e, t), t.tag = 1, Jt(r) ? (e = !0, Va(t)) : e = !1, Bi(t, n), Gc(t, r, a), _l(t, r, a, n), Vl(null, t, r, !0, e, n);
      case 19:
        return fu(e, t, n);
      case 22:
        return ou(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function Du(e, t) {
    return pr(e, t);
  }
  function ef(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yn(e, t, n, r) {
    return new ef(e, t, n, r);
  }
  function cs(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function tf(e) {
    if (typeof e == "function") return cs(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Z) return 11;
      if (e === ie) return 14;
    }
    return 2;
  }
  function zr(e, t) {
    var n = e.alternate;
    return n === null ? (n = yn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function wo(e, t, n, r, a, o) {
    var m = 2;
    if (r = e, typeof e == "function") cs(e) && (m = 1);
    else if (typeof e == "string") m = 5;
    else e: switch (e) {
      case V:
        return fi(n.children, a, o, t);
      case Q:
        m = 8, a |= 8;
        break;
      case G:
        return e = yn(12, n, t, a | 2), e.elementType = G, e.lanes = o, e;
      case Y:
        return e = yn(13, n, t, a), e.elementType = Y, e.lanes = o, e;
      case J:
        return e = yn(19, n, t, a), e.elementType = J, e.lanes = o, e;
      case te:
        return ko(n, a, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case $:
            m = 10;
            break e;
          case ne:
            m = 9;
            break e;
          case Z:
            m = 11;
            break e;
          case ie:
            m = 14;
            break e;
          case ce:
            m = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = yn(m, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function fi(e, t, n, r) {
    return e = yn(7, e, r, t), e.lanes = n, e;
  }
  function ko(e, t, n, r) {
    return e = yn(22, e, r, t), e.elementType = te, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function us(e, t, n) {
    return e = yn(6, e, null, t), e.lanes = n, e;
  }
  function ds(e, t, n) {
    return t = yn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function nf(e, t, n, r, a) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $i(0), this.expirationTimes = $i(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $i(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
  }
  function hs(e, t, n, r, a, o, m, T, O) {
    return e = new nf(e, t, n, T, O), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = yn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Tl(o), e;
  }
  function rf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: j, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function ju(e) {
    if (!e) return Mr;
    e = e._reactInternals;
    e: {
      if (Ht(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Jt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Jt(n)) return hc(e, n, t);
    }
    return t;
  }
  function _u(e, t, n, r, a, o, m, T, O) {
    return e = hs(n, r, !0, e, a, o, m, T, O), e.context = ju(null), n = e.current, r = Ft(), a = Ar(n), o = ar(r, a), o.callback = t ?? null, Pr(n, o, a), e.current.lanes = a, Bn(e, a, r), Xt(e, r), e;
  }
  function bo(e, t, n, r) {
    var a = t.current, o = Ft(), m = Ar(a);
    return n = ju(n), t.context === null ? t.context = n : t.pendingContext = n, t = ar(o, m), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Pr(a, t, m), e !== null && (Mn(e, a, m, o), Qa(e, a, m)), m;
  }
  function So(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Fu(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function fs(e, t) {
    Fu(e, t), (e = e.alternate) && Fu(e, t);
  }
  function af() {
    return null;
  }
  var Uu = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function ps(e) {
    this._internalRoot = e;
  }
  Eo.prototype.render = ps.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    bo(e, t, null, null);
  }, Eo.prototype.unmount = ps.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ui(function() {
        bo(null, e, null, null);
      }), t[er] = null;
    }
  };
  function Eo(e) {
    this._internalRoot = e;
  }
  Eo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = wr();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < qt.length && t !== 0 && t < qt[n].priority; n++) ;
      qt.splice(n, 0, e), n === 0 && Gn(e);
    }
  };
  function ms(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Co(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ku() {
  }
  function of(e, t, n, r, a) {
    if (a) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var H = So(m);
          o.call(H);
        };
      }
      var m = _u(t, r, e, 0, null, !1, !1, "", Ku);
      return e._reactRootContainer = m, e[er] = m.current, na(e.nodeType === 8 ? e.parentNode : e), ui(), m;
    }
    for (; a = e.lastChild; ) e.removeChild(a);
    if (typeof r == "function") {
      var T = r;
      r = function() {
        var H = So(O);
        T.call(H);
      };
    }
    var O = hs(e, 0, !1, null, null, !1, !1, "", Ku);
    return e._reactRootContainer = O, e[er] = O.current, na(e.nodeType === 8 ? e.parentNode : e), ui(function() {
      bo(t, O, n, r);
    }), O;
  }
  function To(e, t, n, r, a) {
    var o = n._reactRootContainer;
    if (o) {
      var m = o;
      if (typeof a == "function") {
        var T = a;
        a = function() {
          var O = So(m);
          T.call(O);
        };
      }
      bo(t, m, e, a);
    } else m = of(n, t, e, a, r);
    return So(m);
  }
  Lt = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = yr(t.pendingLanes);
          n !== 0 && (Jn(t, n | 1), Xt(t, st()), (Je & 6) === 0 && (Fi = st() + 500, xr()));
        }
        break;
      case 13:
        ui(function() {
          var r = ir(e, 1);
          if (r !== null) {
            var a = Ft();
            Mn(r, e, 1, a);
          }
        }), fs(e, 1);
    }
  }, Qr = function(e) {
    if (e.tag === 13) {
      var t = ir(e, 134217728);
      if (t !== null) {
        var n = Ft();
        Mn(t, e, 134217728, n);
      }
      fs(e, 134217728);
    }
  }, Xr = function(e) {
    if (e.tag === 13) {
      var t = Ar(e), n = ir(e, t);
      if (n !== null) {
        var r = Ft();
        Mn(n, e, t, r);
      }
      fs(e, t);
    }
  }, wr = function() {
    return Ze;
  }, yi = function(e, t) {
    var n = Ze;
    try {
      return Ze = e, t();
    } finally {
      Ze = n;
    }
  }, jt = function(e, t, n) {
    switch (t) {
      case "input":
        if (Fe(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var a = Ua(r);
              if (!a) throw Error(s(90));
              kt(r), Fe(r, a);
            }
          }
        }
        break;
      case "textarea":
        Ge(e, n);
        break;
      case "select":
        t = n.value, t != null && Le(e, !!n.multiple, t, !1);
    }
  }, We = os, mt = ui;
  var lf = { usingClientEntryPoint: !1, Events: [aa, Mi, Ua, be, pe, os] }, wa = { findFiberByHostInstance: ni, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, sf = { bundleType: wa.bundleType, version: wa.version, rendererPackageName: wa.rendererPackageName, rendererConfig: wa.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: P.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = La(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: wa.findFiberByHostInstance || af, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Lo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Lo.isDisabled && Lo.supportsFiber) try {
      $r = Lo.inject(sf), Nt = Lo;
    } catch {
    }
  }
  return Zt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = lf, Zt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ms(t)) throw Error(s(200));
    return rf(e, t, null, n);
  }, Zt.createRoot = function(e, t) {
    if (!ms(e)) throw Error(s(299));
    var n = !1, r = "", a = Uu;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = hs(e, 1, !1, null, null, n, !1, r, a), e[er] = t.current, na(e.nodeType === 8 ? e.parentNode : e), new ps(t);
  }, Zt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = La(t), e = e === null ? null : e.stateNode, e;
  }, Zt.flushSync = function(e) {
    return ui(e);
  }, Zt.hydrate = function(e, t, n) {
    if (!Co(t)) throw Error(s(200));
    return To(null, e, t, !0, n);
  }, Zt.hydrateRoot = function(e, t, n) {
    if (!ms(e)) throw Error(s(405));
    var r = n != null && n.hydratedSources || null, a = !1, o = "", m = Uu;
    if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (m = n.onRecoverableError)), t = _u(t, null, e, 1, n ?? null, a, !1, o, m), e[er] = t.current, na(e), r) for (e = 0; e < r.length; e++) n = r[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
      n,
      a
    );
    return new Eo(t);
  }, Zt.render = function(e, t, n) {
    if (!Co(t)) throw Error(s(200));
    return To(null, e, t, !1, n);
  }, Zt.unmountComponentAtNode = function(e) {
    if (!Co(e)) throw Error(s(40));
    return e._reactRootContainer ? (ui(function() {
      To(null, null, e, !1, function() {
        e._reactRootContainer = null, e[er] = null;
      });
    }), !0) : !1;
  }, Zt.unstable_batchedUpdates = os, Zt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Co(n)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return To(e, t, n, !1, r);
  }, Zt.version = "18.3.1-next-f1338f8080-20240426", Zt;
}
var Zu;
function pd() {
  if (Zu) return ys.exports;
  Zu = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (u) {
        console.error(u);
      }
  }
  return i(), ys.exports = jf(), ys.exports;
}
var ed;
function _f() {
  if (ed) return No;
  ed = 1;
  var i = pd();
  return No.createRoot = i.createRoot, No.hydrateRoot = i.hydrateRoot, No;
}
var Ff = _f();
const Io = /* @__PURE__ */ new Map();
function Ct(i, u, s) {
  if (!u) return;
  const c = Io.get(i);
  if (c?.element === u) return;
  c?.root.unmount();
  const p = Ff.createRoot(u);
  Io.set(i, {
    element: u,
    root: p
  }), p.render(s);
}
function Uf() {
  for (const {
    root: i
  } of [...Io.values()].reverse()) i.unmount();
  Io.clear();
}
const jr = (i) => !!i && typeof i == "object" && !Array.isArray(i), md = (i) => jr(i) && (!!i.mc || typeof i.url == "string"), ks = (i) => jr(i) && typeof i.libraryId == "string" && typeof i.url == "string", ba = (i) => Math.max(-12, Math.min(12, Math.round(Number(i) || 0))), Po = (i, u = 0) => Number.isFinite(Number(i)) ? Number(i) : u;
function Kf(i) {
  return md(i) ? {
    ...i,
    title: String(i.title || i.url || "").slice(0, 512),
    memo: String(i.memo || "").slice(0, 4096),
    lrc: String(i.lrc || ""),
    s: Math.max(0, Po(i.s)),
    e: i.e == null ? null : Po(i.e, null),
    off: Po(i.off),
    pitch: ba(i.pitch),
    dur: i.dur == null ? null : Po(i.dur, null)
  } : null;
}
const Vf = (i) => Array.isArray(i) ? i.map(Kf).filter(Boolean) : [], Yf = (i, u) => i === "_L" ? void 0 : u, gd = (i) => JSON.stringify(i, Yf), Ls = (i) => JSON.parse(gd(i)), Ms = Object.freeze(["lfont", "lfc", "lsz", "lcol", "lfx", "lshape", "lbgmode", "ltheme", "lclassiccolor"]), Hf = Object.freeze([
  "jizura",
  "karaoke-classic",
  "folia-classic",
  "folia-cadenza",
  "folia-partita",
  "folia-fume",
  "folia-tilt",
  "folia-claddagh",
  "folia-monet",
  "folia-diorama",
  "folia-pendolo",
  "folia-sonnet",
  "folia-tempera",
  "folia-lumiere",
  "tempera",
  "sonnet",
  "lumiere",
  "hanabi",
  "clean",
  "word-pop",
  "neon",
  "glitch"
]), td = {
  lfx: Hf,
  lshape: ["auto", "wide", "tall"],
  lbgmode: ["transparent", "green"],
  ltheme: ["effect", "white", "cyan", "rose", "amber", "violet", "mint"]
}, xs = Object.freeze({
  version: 1,
  lfont: "0",
  lfc: "",
  lsz: "64",
  lcol: "#ffffff",
  lfx: "jizura",
  lshape: "auto",
  lbgmode: "transparent",
  ltheme: "effect",
  lclassiccolor: "#2563eb",
  lbold: !0,
  centerFree: !1,
  themeSeed: 0
});
function yd(i, u = xs, { fontCount: s = 1 / 0 } = {}) {
  if (!jr(i)) return null;
  const c = { ...xs, ...u, version: 1 };
  for (const p of Ms) {
    let f = i[p];
    if (f != null)
      if (p === "lfx" && f === "folia-cappella" && (f = "folia-classic"), td[p])
        td[p].includes(String(f)) && (c[p] = String(f));
      else if (p === "lfont")
        /^\d+$/.test(String(f)) && Number(f) < s && (c[p] = String(Number(f)));
      else if (p === "lcol" || p === "lclassiccolor")
        /^#[a-f0-9]{6}$/i.test(f) && (c[p] = f);
      else if (p === "lsz") {
        const g = Number(f);
        Number.isFinite(g) && (c[p] = String(Math.max(24, Math.min(160, g))));
      } else c[p] = String(f).slice(0, 120);
  }
  for (const p of ["lbold", "centerFree"]) typeof i[p] == "boolean" && (c[p] = i[p]);
  return Number.isFinite(Number(i.themeSeed)) && (c.themeSeed = Number(i.themeSeed) >>> 0), c;
}
function $f(i, u) {
  const s = jr(i) ? i : {}, c = yd({ ...s, lfx: s.fxv ? s.lfx : "jizura" }, xs, u);
  return { ...s, ...c, cdn: s.cdn == null ? "5" : String(s.cdn), fxv: 1 };
}
const Kn = Object.freeze({
  setlist: "kpt2",
  outputSettings: "kpt_set",
  overlay: "manokaraOverlayV1",
  aspectLock: "manokaraOverlayAspectLock",
  theme: "manokaraTheme",
  language: "manokaraLanguage",
  preferKaraoke: "manokaraPreferKaraoke",
  recovery: "manokaraRecoveryV1"
});
function qf(i = () => globalThis.localStorage) {
  function u(g, y = null) {
    try {
      const d = i().getItem(g);
      return { value: d ?? y, status: d == null ? "missing" : "ok" };
    } catch (d) {
      return { value: y, status: "unavailable", error: d };
    }
  }
  function s(g, y, d = () => !0) {
    const M = u(g);
    if (M.status !== "ok") return { ...M, value: y };
    try {
      const x = JSON.parse(M.value);
      if (!d(x)) throw new Error("Invalid saved data");
      return { value: x, raw: M.value, status: "ok" };
    } catch (x) {
      return { value: y, raw: M.value, status: "invalid", error: x };
    }
  }
  function c(g, y) {
    try {
      return i().setItem(g, String(y)), { ok: !0 };
    } catch (d) {
      return { ok: !1, error: d };
    }
  }
  function p(g, y) {
    const d = s(Kn.recovery, { version: 1, entries: {} }, (x) => x?.version === 1 && x.entries && typeof x.entries == "object" && !Array.isArray(x.entries));
    if (d.status === "invalid" || d.status === "unavailable") throw d.error;
    if (d.value.entries[g]?.raw === y) return;
    const M = { version: 1, entries: { ...d.value.entries, [g]: { raw: y, savedAt: Date.now() } } };
    i().setItem(Kn.recovery, JSON.stringify(M));
  }
  function f(g, y, d = () => !0) {
    try {
      if (!d(y)) throw new Error("Invalid data to save");
      const M = gd(y);
      if (M === void 0) throw new Error("Data is not serializable");
      const x = s(g, null, d);
      if (x.status === "unavailable") throw x.error;
      return x.status === "invalid" && p(g, x.raw), i().setItem(g, M), { ok: !0 };
    } catch (M) {
      return { ok: !1, error: M };
    }
  }
  return { readText: u, readJson: s, writeText: c, writeJson: f };
}
const sr = Object.freeze({ database: "manokara-library", version: 1, store: "songs", keyPath: "libraryId" });
function Wf(i = () => globalThis.indexedDB) {
  let u = null, s = null, c = null, p = 0;
  function f() {
    if (u) return Promise.resolve(u);
    if (s) return s;
    const D = p, b = new Promise((S, E) => {
      let I, U = !1;
      const P = (A) => {
        U || (U = !0, E(A || new Error("Could not open song library")));
      };
      c = () => P(new Error("Song library closed"));
      try {
        const A = i();
        if (!A) throw new Error("IndexedDB unavailable");
        I = A.open(sr.database, sr.version);
      } catch (A) {
        P(A);
        return;
      }
      I.onupgradeneeded = () => {
        try {
          I.result.objectStoreNames.contains(sr.store) || I.result.createObjectStore(sr.store, { keyPath: sr.keyPath });
        } catch (A) {
          P(A), I.transaction?.abort();
        }
      }, I.onerror = () => P(I.error), I.onblocked = () => P(new Error("Song library is blocked by another page")), I.onsuccess = () => {
        const A = I.result;
        if (U || D !== p) {
          A.close();
          return;
        }
        U = !0, u = A, A.onversionchange = () => N(), A.onclose = () => {
          u === A && (u = null);
        }, S(A);
      };
    });
    s = b;
    const w = () => {
      s === b && (s = null, c = null);
    };
    return b.then(w, w), b;
  }
  async function g(D, b) {
    const w = await f();
    return new Promise((S, E) => {
      let I, U, P;
      try {
        I = w.transaction(sr.store, D), I.oncomplete = () => S(P), I.onabort = () => E(I.error || new Error("Song library transaction aborted")), I.onerror = () => E(I.error || new Error("Could not update song library")), U = b(I.objectStore(sr.store)), U.onsuccess = () => {
          P = U.result;
        }, U.onerror = () => E(U.error || new Error("Song library request failed"));
      } catch (A) {
        E(A);
        try {
          I?.abort();
        } catch {
        }
      }
    });
  }
  async function y() {
    return (await g("readonly", (D) => D.getAll()) || []).filter(ks);
  }
  async function d(D) {
    return g("readonly", (b) => b.get(D));
  }
  async function M(D) {
    if (!ks(D)) throw new Error("Invalid library song");
    const b = Ls(D);
    await g("readwrite", (w) => w.put(b));
  }
  async function x(D) {
    if (!ks(D)) throw new Error("Invalid library song");
    const b = Ls(D), w = await f();
    return new Promise((S, E) => {
      let I, U = !1;
      try {
        I = w.transaction(sr.store, "readwrite"), I.oncomplete = () => S(U), I.onabort = () => E(I.error || new Error("Song library transaction aborted")), I.onerror = () => E(I.error || new Error("Could not import song"));
        const P = I.objectStore(sr.store), A = P.get(b.libraryId);
        A.onerror = () => E(A.error || new Error("Could not read song")), A.onsuccess = () => {
          if (A.result === void 0)
            try {
              P.put(b), U = !0;
            } catch (j) {
              E(j), I.abort();
            }
        };
      } catch (P) {
        E(P);
        try {
          I?.abort();
        } catch {
        }
      }
    });
  }
  async function C(D) {
    await g("readwrite", (b) => b.delete(D));
  }
  function N() {
    p++, c?.(), c = null, s = null, u?.close(), u = null;
  }
  return { ready: f, list: y, get: d, put: M, insertMissing: x, remove: C, close: N };
}
const pi = Object.freeze({ database: "manokara-playlists", version: 1, store: "playlists", keyPath: "playlistId" });
function Jf(i = () => globalThis.indexedDB) {
  let u = null, s = null, c = null, p = 0;
  function f() {
    if (u) return Promise.resolve(u);
    if (s) return s;
    const E = p, I = new Promise((P, A) => {
      let j, V = !1;
      const Q = (G) => {
        V || (V = !0, A(G || new Error("Could not open playlists")));
      };
      c = () => Q(new Error("Playlists closed"));
      try {
        const G = i();
        if (!G) throw new Error("IndexedDB unavailable");
        j = G.open(pi.database, pi.version);
      } catch (G) {
        Q(G);
        return;
      }
      j.onupgradeneeded = () => {
        try {
          j.result.objectStoreNames.contains(pi.store) || j.result.createObjectStore(pi.store, { keyPath: pi.keyPath });
        } catch (G) {
          Q(G), j.transaction?.abort();
        }
      }, j.onerror = () => Q(j.error), j.onblocked = () => Q(new Error("Playlists are blocked by another page")), j.onsuccess = () => {
        const G = j.result;
        if (V || E !== p) {
          G.close();
          return;
        }
        V = !0, u = G, G.onversionchange = S, G.onclose = () => {
          u === G && (u = null);
        }, P(G);
      };
    });
    s = I;
    const U = () => {
      s === I && (s = null, c = null);
    };
    return I.then(U, U), I;
  }
  async function g(E, I) {
    const U = await f();
    return new Promise((P, A) => {
      let j, V;
      try {
        j = U.transaction(pi.store, E), j.oncomplete = () => P(V), j.onabort = () => A(j.error || new Error("Playlist transaction aborted")), j.onerror = () => A(j.error || new Error("Could not update playlists")), I(j.objectStore(pi.store), (Q) => {
          V = Q;
        }, (Q) => {
          A(Q);
          try {
            j.abort();
          } catch {
          }
        });
      } catch (Q) {
        A(Q);
        try {
          j?.abort();
        } catch {
        }
      }
    });
  }
  async function y() {
    return (await g("readonly", (I, U) => {
      const P = I.getAll();
      P.onsuccess = () => U(P.result);
    }) || []).filter(xo).sort((I, U) => I.createdAt - U.createdAt || I.playlistId.localeCompare(U.playlistId));
  }
  async function d(E) {
    return g("readonly", (I, U, P) => {
      const A = I.get(E);
      A.onsuccess = () => xo(A.result) ? U(A.result) : P(new Error("This playlist no longer exists."));
    });
  }
  async function M(E, I = []) {
    const U = Ts(E), P = ka(I);
    let A;
    try {
      A = globalThis.crypto.randomUUID();
    } catch {
      A = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
    const j = { playlistId: A, name: U, songIds: P, createdAt: Date.now(), updatedAt: Date.now() };
    return g("readwrite", (V, Q) => {
      V.add(j), Q(j);
    });
  }
  async function x(E, I) {
    return g("readwrite", (U, P, A) => {
      const j = U.get(E);
      j.onsuccess = () => {
        try {
          if (!xo(j.result)) throw new Error("This playlist no longer exists.");
          const V = { ...I(j.result), updatedAt: Date.now() };
          if (!xo(V)) throw new Error("Invalid playlist songs.");
          U.put(V), P(V);
        } catch (V) {
          A(V);
        }
      };
    });
  }
  function C(E, I) {
    const U = Ts(I);
    return x(E, (P) => ({ ...P, name: U }));
  }
  function N(E, I) {
    const U = ka(I);
    return x(E, (P) => ({ ...P, songIds: ka([.../* @__PURE__ */ new Set([...P.songIds, ...U])]) }));
  }
  function D(E, I) {
    const U = new Set(ka(I));
    return x(E, (P) => ({ ...P, songIds: P.songIds.filter((A) => !U.has(A)) }));
  }
  function b(E, I, U, P) {
    return U !== -1 && U !== 1 ? Promise.reject(new Error("Invalid playlist order.")) : x(E, (A) => {
      const j = [...A.songIds], V = j.indexOf(I), Q = P === void 0 ? V + U : j.indexOf(P);
      return V >= 0 && Q >= 0 && Q < j.length && (Q - V) * U > 0 && ([j[V], j[Q]] = [j[Q], j[V]]), { ...A, songIds: j };
    });
  }
  async function w(E) {
    await g("readwrite", (I) => {
      I.delete(E);
    });
  }
  function S() {
    p++, c?.(), c = null, s = null, u?.close(), u = null;
  }
  return { ready: f, list: y, get: d, create: M, rename: C, addSongs: N, removeSongs: D, moveSong: b, remove: w, close: S };
}
function Gf({ getStorage: i, getIndexedDB: u } = {}) {
  const s = qf(i), c = /* @__PURE__ */ new Set(["aspectLock", "theme", "language", "preferKaraoke"]);
  return { setlist: {
    load() {
      const y = s.readJson(Kn.setlist, [], Array.isArray);
      return { ...y, value: Vf(y.value) };
    },
    save(y) {
      return s.writeJson(Kn.setlist, y, (d) => Array.isArray(d) && d.every(md));
    }
  }, preferences: {
    get(y, d = null) {
      return c.has(y) ? s.readText(Kn[y], d).value : d;
    },
    set(y, d) {
      return c.has(y) ? s.writeText(Kn[y], d) : { ok: !1, error: new Error("Unknown preference") };
    },
    loadOutput(y) {
      const d = s.readJson(Kn.outputSettings, {}, jr);
      return { ...d, value: $f(d.value, y) };
    },
    saveOutput(y) {
      return s.writeJson(Kn.outputSettings, y, jr);
    }
  }, layout: {
    load() {
      return s.readJson(Kn.overlay, null, jr);
    },
    save(y) {
      return s.writeJson(Kn.overlay, y, jr);
    }
  }, library: Wf(u), playlists: Jf(u), local: s };
}
const et = Gf();
(() => {
  const i = {
    Source: "Nguồn",
    "All sources": "Tất cả nguồn",
    "Needs server API key": "Cần API key trên máy chủ",
    "Cached songs only": "Chỉ bài đã có trong cache",
    "QQ needs a server Better Lyrics API key for uncached songs.": "Nguồn QQ cần máy chủ bổ sung API key Better Lyrics để tìm bài chưa có trong cache.",
    "Disabled on server": "Máy chủ chưa bật",
    "Timed lyrics first, regardless of source.": "Ưu tiên lời có timecode, từ bất kỳ nguồn nào.",
    "Lyrics source": "Nguồn lời",
    "Word-timed lyrics": "Lời có mốc thời gian từng chữ",
    "TTML file": "File TTML",
    "Import LRC / TTML": "Nhập LRC / TTML",
    "Drop an LRC or TTML file here, or paste lyrics. Romaji keeps the original timing.": "Thả file LRC hoặc TTML vào đây, hoặc dán lời. Romaji sẽ giữ nguyên mốc thời gian.",
    "Choose an .lrc or .ttml file.": "Chọn file .lrc hoặc .ttml nhé.",
    "Lyric file is too large (maximum 500 KB).": "File lời quá lớn, tối đa 500 KB nhé.",
    "Import one lyric file at a time.": "Mỗi lần bạn nhập một file lời thôi nhé.",
    "Reading TTML…": "Đang đọc TTML…",
    "Reading LRC…": "Đang đọc LRC…",
    "Wait for the lyric import to finish.": "Chờ nhập lời xong một chút nhé.",
    "TTML imported. Review the lyrics, then Add/Save.": "Đã nhập TTML. Bạn xem lại lời rồi thêm hoặc lưu bài nhé.",
    "TTML import took too long. Try again.": "Nhập TTML hơi lâu rồi, bạn thử lại nhé.",
    "Could not import TTML.": "Chưa nhập được TTML, bạn thử lại nhé.",
    "Restart the updated server to import TTML files.": "Khởi động lại máy chủ sau khi cập nhật để nhập file TTML nhé.",
    "Send a TTML document.": "Hãy chọn một file TTML nhé.",
    "Invalid characters in TTML document.": "File TTML có ký tự không hợp lệ.",
    "TTML file is too large (maximum 500 KB).": "File TTML quá lớn, tối đa 500 KB nhé.",
    "TTML with DTD or entity declarations is not supported.": "Chưa hỗ trợ file TTML có khai báo DTD hoặc entity.",
    "Could not read this TTML file. Check its XML format.": "Chưa đọc được file TTML này. Bạn kiểm tra lại định dạng XML nhé.",
    "Invalid or oversized TTML document.": "File TTML không hợp lệ hoặc chứa quá nhiều nội dung.",
    "TTML nesting is too deep.": "File TTML có cấu trúc lồng nhau quá sâu.",
    "Sequential TTML timing is not supported. Use absolute AMLL timestamps.": "Chưa hỗ trợ TTML dùng mốc tương đối nối tiếp. Bạn dùng file theo định dạng AMLL với mốc thời gian tuyệt đối nhé.",
    "TTML has no lyric body.": "Không tìm thấy phần nội dung lời trong file TTML.",
    "TTML contains too many lyric lines.": "File TTML có quá nhiều dòng lời.",
    "Invalid TTML timestamp.": "File TTML có mốc thời gian không hợp lệ.",
    "Unsupported TTML timing. Use clock time or seconds, not frames or ticks.": "Chưa hỗ trợ mốc TTML theo frame hoặc tick. Bạn dùng mốc phút:giây hoặc giây nhé.",
    "Each TTML lyric line needs valid start and end times.": "Mỗi dòng TTML cần có mốc bắt đầu và kết thúc hợp lệ.",
    "Word timestamps must stay within their TTML lyric line.": "Mốc từng chữ phải nằm trong khoảng thời gian của dòng TTML tương ứng.",
    "TTML words must be ordered by their start time.": "Các chữ trong TTML cần được xếp theo thứ tự mốc bắt đầu.",
    "No timed main lyrics found in this TTML file.": "File TTML này chưa có lời chính với mốc thời gian hợp lệ.",
    "Converted TTML exceeds the lyric size limit.": "Lời sau khi chuyển từ TTML vượt giới hạn lưu trữ.",
    "TTML imports main lyrics. Supplied translations, romanization and backing vocals are omitted; you can create Romaji after importing.": "TTML hiện lấy phần lời chính, chưa kèm bản dịch, phiên âm hay bè. Bạn vẫn có thể tạo Romaji sau khi nhập nhé.",
    "These lyrics have overlapping lines. Their timing is kept, but views with one active line may show only one part.": "Bản lời này có các câu hát chồng nhau. Mốc thời gian vẫn được giữ, nhưng kiểu hiển thị một dòng có thể chỉ hiện một phần.",
    "Literal brackets in lyric text use fullwidth characters to preserve the lyric timeline.": "Dấu ngoặc trong lời được đổi sang kiểu toàn chiều rộng để không bị nhầm với mốc thời gian.",
    "Word timing could not be read. Line timing was loaded instead.": "Chưa đọc được mốc từng chữ, nên đã dùng bản lời theo dòng nhé.",
    "Found lyrics": "Đã tìm được lời",
    "No lyrics found": "Chưa tìm thấy lời",
    "Some results could not be loaded": "Một số bản lời chưa tải được",
    "Showing recent results while the source is temporarily unavailable": "Đang dùng kết quả gần đây vì nguồn này tạm lỗi",
    "Source took too long": "Nguồn này phản hồi hơi lâu",
    "Source rate limit reached": "Nguồn này đang giới hạn lượt tìm, thử lại sau nhé",
    "Source requires verification": "Nguồn này đang yêu cầu xác minh truy cập",
    "API access needs attention": "Máy chủ cần kiểm tra lại quyền truy cập API",
    "Source is temporarily unavailable": "Tạm thời chưa kết nối được nguồn này",
    "Source returned an unreadable response": "Nguồn này trả dữ liệu chưa đọc được",
    "No lyrics returned. Some sources could not be reached.": "Chưa lấy được lời. Một số nguồn đang không truy cập được.",
    "Lyric search is temporarily unavailable.": "Tạm thời chưa tìm được lời, thử lại sau nhé.",
    "Lyric search is busy. Try again in a moment.": "Tìm lời đang hơi bận, chờ một chút nhé.",
    "This lyric provider is not enabled on the server.": "Máy chủ chưa bật nguồn lời này.",
    "Restart the updated server to enable multi-source lyric search.": "Khởi động lại máy chủ sau khi cập nhật để tìm lời từ nhiều nguồn nhé.",
    "Lyric search took too long. Try again.": "Tìm lời hơi lâu rồi, bạn thử lại nhé.",
    "Enter a song or artist name (1–200 characters).": "Nhập tên bài hoặc ca sĩ, từ 1 đến 200 ký tự nhé.",
    "No lyric sources are enabled on the server.": "Máy chủ chưa bật nguồn tìm lời nào.",
    "Song animation settings": "Setting animation của bài hát",
    "Save animation settings for this song": "Lưu setting animation cho bài này",
    "Animation changes save automatically for this song.": "Chỉnh hiệu ứng ở đây sẽ tự lưu cho bài này.",
    "Using the shared animation settings.": "Đang dùng setting animation chung.",
    "Select a song to save its animation settings.": "Chọn một bài trong danh sách để lưu setting animation riêng nhé.",
    "Animation settings saved for this song. Further changes save automatically.": "Đã lưu setting animation cho bài này. Chỉnh thêm sẽ tự lưu nhé.",
    "This song now uses the shared animation settings.": "Bài này đã trở lại dùng setting animation chung.",
    "Start Tab Audio": "Bật Tab Audio",
    "Stop Tab Audio": "Dừng Tab Audio",
    "Open audio window": "Mở cửa sổ âm thanh",
    "YouTube keeps its own player. Choose the Manokara tab and share tab audio in the audio window. Keep that window open while singing.": "YouTube vẫn dùng player gốc. Bạn chọn tab Manokara và bật chia sẻ âm thanh trong cửa sổ âm thanh. Giữ cửa sổ đó mở khi hát nhé.",
    "Start Tab Audio to apply the saved key. The player is using its original sound.": "Bật Tab Audio để dùng tông đã lưu nhé. Player hiện đang phát âm thanh gốc.",
    "Choose the Manokara tab and share tab audio in the audio window.": "Chọn tab Manokara rồi bật chia sẻ âm thanh trong cửa sổ âm thanh nhé.",
    "Tab Audio stopped. The player is using its original sound.": "Đã dừng Tab Audio. Player đang phát âm thanh gốc.",
    "Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.": "Tab Audio cần Chrome hoặc Edge mới, mở qua HTTPS hoặc localhost nhé.",
    "Waiting for the browser audio picker…": "Đang chờ bạn chọn tab trong trình duyệt…",
    "Select the original Manokara tab, not a window, screen or another tab.": "Bạn chọn đúng tab Manokara đang phát nhạc nhé, đừng chọn cửa sổ, màn hình hay tab khác.",
    "Share tab audio to use Tab Audio.": "Bạn cần bật “Chia sẻ âm thanh của thẻ” để đổi tông nhé.",
    "This browser cannot silence the original tab audio. Tab Audio was stopped to avoid doubled sound.": "Trình duyệt chưa tắt được tiếng gốc của tab. Tab Audio đã dừng để tránh bị chồng hai lớp tiếng.",
    "Tab audio sharing was cancelled. The player keeps its original sound.": "Bạn đã hủy chia sẻ âm thanh. Player vẫn phát tiếng gốc nhé.",
    "Could not start Tab Audio. Try choosing the Manokara tab again.": "Chưa bật được Tab Audio. Bạn thử chọn lại tab Manokara nhé.",
    "The shared tab changed. Select Manokara again.": "Tab đang chia sẻ đã thay đổi. Bạn chọn lại Manokara nhé.",
    "Tab Audio processor stopped. The player is using its original sound.": "Bộ đổi tông vừa dừng. Player đang phát âm thanh gốc nhé.",
    "Manokara was closed. Tab Audio has stopped.": "Manokara đã đóng. Tab Audio cũng đã dừng.",
    "Reconnecting to Manokara…": "Đang nối lại với Manokara…",
    "Manokara did not reconnect. Select the tab again.": "Chưa nối lại được với Manokara. Bạn chọn tab lại nhé.",
    "Stage view": "Chế độ xem sân khấu",
    "Could not play the key-shifted audio.": "Chưa phát được âm thanh đổi tông. Bạn thử lại nhé.",
    "Key-shifted audio took too long to load.": "Âm thanh đổi tông tải hơi lâu. Bạn thử lại nhé.",
    "Key audio was interrupted. Continuing at the original key.": "Luồng âm thanh đổi tông bị ngắt. Nhạc tiếp tục ở tông gốc nhé.",
    "Lyrics preview": "Xem trước lời",
    "Current song lyric preview": "Xem trước lời của bài đang phát",
    "Play a song to preview its lyrics.": "Phát một bài để xem trước lời nhé.",
    "This song has no lyrics yet. Add lyrics in the song editor.": "Bài này chưa có lời. Bạn thêm lời trong phần soạn bài nhé.",
    "Auto-saved for this song": "Đã tự lưu cho bài này",
    "Too many requests. Try again shortly.": "Bạn vừa thử hơi nhiều lần. Chờ một chút rồi thử lại nhé.",
    "Too many video lookups. Try again shortly.": "Máy chủ đang lấy nhạc cho vài lượt phát khác. Chờ một chút nhé.",
    "YouTube stream lookup failed. Try again or open the video on YouTube.": "Chưa lấy được luồng nhạc YouTube. Thử lại sau hoặc mở video trên YouTube nhé.",
    "YouTube stream lookup failed or timed out.": "Lấy luồng nhạc YouTube bị lỗi hoặc chờ quá lâu. Thử lại sau nhé.",
    "YouTube blocked the server stream lookup. Embedded playback can still work; key shifting is unavailable for this source right now.": "YouTube đang chặn máy chủ lấy luồng nhạc. Trình phát nhúng có thể vẫn chạy, nhưng nguồn này hiện chưa đổi tông được.",
    "YouTube is limiting stream lookups. Wait a minute before trying again.": "YouTube đang hạn chế lấy luồng nhạc. Bạn chờ khoảng một phút rồi thử lại nhé.",
    'yt-dlp is outdated. Update the server environment with: python -m pip install -U "yt-dlp[default]".': 'yt-dlp trên máy chủ đã cũ. Cập nhật trong môi trường chạy server bằng: python -m pip install -U "yt-dlp[default]".',
    'YouTube needs an up-to-date JavaScript runtime and yt-dlp-ejs. Update "yt-dlp[default]" and use Node 22+ or Deno 2.3+.': 'YouTube cần bộ xử lý JavaScript và yt-dlp-ejs mới. Hãy cập nhật "yt-dlp[default]", dùng Node từ 22 hoặc Deno từ 2.3 nhé.',
    "This media link did not allow pitch processing. Playing the original key.": "Nguồn nhạc chưa cho phép đổi tông. App đang phát lại ở tông gốc nhé.",
    Key: "Tông",
    "Change song key": "Đổi tông bài hát",
    "Song key": "Tông bài hát",
    "Lower key": "Giảm tông",
    "Raise key": "Tăng tông",
    "Original key": "Tông gốc",
    "Saved song key in semitones": "Tông lưu cho bài hát (nửa cung)",
    "Raise or lower the key without changing the speed. Each song remembers its own setting.": "Tăng giảm tông mà vẫn giữ tốc độ nhạc. Mỗi bài sẽ nhớ tông bạn đã chọn.",
    "YouTube uses server playback when key shifting is on. The server needs yt-dlp, FFmpeg and Deno or Node. Media links need to allow audio processing.": "Khi đổi tông YouTube, app sẽ phát nhạc qua máy chủ. Máy chủ cần yt-dlp, FFmpeg và Deno hoặc Node. Với link media, nguồn nhạc cần cho phép xử lý âm thanh.",
    "Try small shifts first (±1–4 semitones). Large shifts can change the sound of a full mix. Lyrics compensate for the processor's audio delay.": "Bạn thử tăng giảm ít trước nhé (±1–4 nửa cung). Đổi quá nhiều có thể làm âm thanh biến dạng. Lời hát được bù độ trễ của bộ xử lý âm thanh.",
    "Play a song to change its key.": "Phát một bài để chỉnh tông nhé.",
    "Preparing key-shifted audio…": "Đang chuẩn bị nhạc đổi tông…",
    "Key applied. Saved for this song.": "Đã đổi tông và lưu cho bài hát này.",
    "Original key.": "Đang phát ở tông gốc.",
    "Media lookup timed out.": "Chưa tải được nguồn nhạc. Bạn thử lại nhé.",
    "Pitch needs Chrome or Edge on HTTPS / localhost.": "Đổi tông cần Chrome hoặc Edge, mở qua HTTPS hoặc localhost nhé.",
    "Pitch processor took too long to start. Try again.": "Bộ đổi tông khởi động hơi lâu. Bạn thử lại nhé.",
    "This media link needs CORS permission for pitch. Use a same-origin or CORS-enabled link.": "Link nhạc này chưa cho phép xử lý âm thanh. Hãy dùng link cùng máy chủ hoặc nguồn cho phép CORS nhé.",
    "Pitch processor stopped. Original key is playing; press a key button to retry.": "Bộ đổi tông vừa dừng. Nhạc đang phát ở tông gốc; bấm tăng hoặc giảm tông để thử lại nhé.",
    "This source cannot change key. Use YouTube or a media link.": "Nguồn này chưa đổi tông được. Hãy dùng YouTube hoặc link media nhé.",
    "YouTube key shifting needs server playback enabled (MANOKARA_YTDLP_ENABLED=1). See DEPLOY.md.": "Đổi tông YouTube cần bật phát qua máy chủ (MANOKARA_YTDLP_ENABLED=1). Xem hướng dẫn trong DEPLOY.md nhé.",
    "Find music on YouTube": "Tìm nhạc trên YouTube",
    "Find a song on YouTube…": "Tìm bài hát trên YouTube…",
    "Find a song on YouTube": "Tìm bài hát trên YouTube",
    "Prefer karaoke versions": "Ưu tiên phiên bản karaoke",
    "Search YouTube": "Tìm trên YouTube",
    "Close search results": "Đóng kết quả tìm kiếm",
    "YouTube search results": "Kết quả tìm trên YouTube",
    "↑ ↓ to choose · Enter to select": "↑ ↓ để chọn · Enter để dùng",
    "Search on YouTube": "Mở tìm trên YouTube",
    "Type a song or artist. Search starts after 2 characters.": "Gõ tên bài hoặc ca sĩ. Từ 2 ký tự là tự tìm; tên ngắn hơn thì bấm Enter nhé.",
    "Searching YouTube…": "Đang tìm trên YouTube…",
    "Choose a video to fill the song editor.": "Chọn một video để điền vào phần thêm bài hát.",
    "No matching videos. Try another name.": "Chưa tìm thấy video phù hợp. Thử tên khác nhé.",
    "Restart the updated server to enable YouTube search.": "Khởi động lại máy chủ sau khi cập nhật để dùng tìm kiếm YouTube nhé.",
    "YouTube search is temporarily unavailable. Try again or search on YouTube.": "Chưa tìm được trên YouTube lúc này. Thử lại hoặc bấm Mở tìm trên YouTube nhé.",
    "YouTube search took too long. Try again.": "YouTube trả lời hơi lâu. Thử lại nhé.",
    "Could not connect. Check your connection and try again.": "Chưa kết nối được. Kiểm tra mạng rồi thử lại nhé.",
    "YouTube search needs yt-dlp on the server. You can still search on YouTube.": "Máy chủ cần cài yt-dlp để tìm ngay trong app. Bạn vẫn có thể bấm Mở tìm trên YouTube nhé.",
    "YouTube search needs a working yt-dlp installation on the server.": "yt-dlp trên máy chủ chưa chạy được. Kiểm tra cài đặt rồi thử lại nhé.",
    "YouTube search is busy. Try again in a moment.": "Tìm kiếm YouTube đang bận. Chờ một chút rồi thử lại nhé.",
    "Enter a song or artist name (1–160 characters).": "Nhập tên bài hoặc ca sĩ, dài từ 1 đến 160 ký tự nhé.",
    "Too many requests. Try again shortly.": "Bạn tìm hơi nhanh rồi. Chờ một chút và thử lại nhé.",
    "Replace the current song draft with this video? Unsaved edits will be discarded.": "Đổi bài đang soạn sang video này nhé? Phần sửa chưa lưu sẽ bị bỏ.",
    "Video selected. Find lyrics if you like, then Add to setlist.": "Đã chọn video. Bạn có thể tìm thêm lời rồi bấm Thêm vào danh sách nhé.",
    "Manokara — your karaoke studio": "Manokara — góc hát của bạn",
    "Skip to studio": "Đi đến khu vực hát",
    "Connecting to OBS…": "Đang kết nối OBS…",
    "Connecting…": "Đang kết nối…",
    "Pitch and speed with Transpose": "Chỉnh tông và tốc độ bằng Transpose",
    "Switch between light and dark theme": "Đổi giao diện sáng / tối",
    "Switch color theme": "Đổi giao diện sáng / tối",
    Theme: "Giao diện",
    "Pitch, speed & loops": "Tông, tốc độ và phát lặp",
    "Make it your key.": "Hát ở tông hợp với bạn.",
    "Transpose is a browser extension for pitch, speed, and loops. Install it in the browser profile you use for Manokara.": "Transpose là tiện ích trình duyệt để chỉnh tông, tốc độ và phát lặp. Hãy cài vào trình duyệt bạn đang dùng để mở Manokara.",
    "Install Transpose using the button below.": "Bấm nút bên dưới để cài Transpose.",
    "Open Manokara in a browser window with the extension toolbar visible.": "Mở Manokara trong cửa sổ trình duyệt có thanh tiện ích.",
    "Play a song, then open Transpose from the toolbar.": "Phát một bài rồi mở Transpose trên thanh tiện ích.",
    "If the extension does not detect embedded video, allow access to Manokara and YouTube, then try its": "Nếu tiện ích chưa nhận ra video, hãy cho phép truy cập Manokara và YouTube, rồi thử chế độ",
    "mode. A new window uses your current browser profile.": "Cửa sổ mới sẽ dùng cùng hồ sơ trình duyệt của bạn.",
    "Install Transpose": "Cài Transpose",
    "Open Manokara window": "Mở cửa sổ Manokara",
    Close: "Đóng",
    "Open Manokara through its configured server URL.": "Hãy mở Manokara bằng địa chỉ máy chủ đã thiết lập.",
    "The lyric relay requires the Python server. See DEPLOY.md for setup.": "Đồng bộ lời cần máy chủ Python. Xem cách thiết lập trong DEPLOY.md.",
    Setlist: "Danh sách bài",
    "Add a song": "Thêm bài hát",
    "Every set starts somewhere.": "Bắt đầu với bài bạn thích nhé.",
    Original: "Lời gốc",
    Romaji: "Romaji",
    "Original + Romaji": "Lời gốc + Romaji",
    Lyrics: "Lời bài hát",
    "Choose lyrics for this song": "Chọn kiểu lời cho bài này",
    "Auto-saved per song": "Tự lưu theo từng bài",
    "Play a song to choose lyrics": "Phát một bài để chọn kiểu lời nhé.",
    "Lyrics options are unavailable during a break": "Không có tùy chọn lời trong khoảng nghỉ.",
    "Create Romaji in the song editor to enable it": "Tạo Romaji trong phần soạn bài để bật tùy chọn này nhé.",
    "My songs": "Kho bài hát",
    Playlists: "Playlist của bạn",
    "Your playlists": "Các playlist đã lưu",
    "All songs": "Tất cả bài hát",
    "New playlist": "Tạo playlist",
    "Create playlist": "Tạo playlist",
    "Rename playlist": "Đổi tên playlist",
    "Delete playlist": "Xóa playlist",
    "Choose a playlist": "Chọn playlist",
    "Add to playlist": "Thêm vào playlist",
    "Remove from playlist": "Bỏ khỏi playlist",
    "Add playlist to setlist": "Thêm cả playlist vào setlist",
    "Select songs": "Chọn bài hát",
    "Select song": "Chọn bài",
    "Select visible songs": "Chọn các bài đang hiển thị",
    selected: "bài đã chọn",
    "Remove selected": "Bỏ các bài đã chọn",
    "Choose songs from My songs": "Chọn bài từ Kho bài hát",
    "Select songs to add them to a playlist.": "Chọn bài rồi thêm vào playlist bạn muốn nhé.",
    "Selected songs will be added to this playlist.": "Các bài đã chọn sẽ được thêm vào playlist này.",
    "Group songs by language, mood, or your next stream.": "Gom nhạc theo ngôn ngữ, mood hay buổi stream sắp tới nhé.",
    "e.g. Japanese songs, C-pop, Late-night mood": "Ví dụ: Nhạc Nhật, Nhạc Trung, Mood đêm khuya",
    "Name your playlist (1–80 characters).": "Đặt tên playlist từ 1 đến 80 ký tự nhé.",
    "Playlist created.": "Đã tạo playlist.",
    "Playlist renamed.": "Đã đổi tên playlist.",
    "Playlist deleted. Your songs are still in My songs.": "Đã xóa playlist. Các bài vẫn được giữ trong Kho bài hát.",
    "Delete this playlist? Songs in My songs and the setlist will stay.": "Xóa playlist này nhé? Bài trong kho và setlist vẫn được giữ nguyên.",
    "Songs added to playlist.": "Đã thêm các bài vào playlist.",
    "Songs removed from playlist.": "Đã bỏ các bài đã chọn khỏi playlist.",
    "Playlist order saved.": "Đã lưu thứ tự bài trong playlist.",
    "Playlist added to setlist. Songs already there were skipped.": "Đã thêm playlist vào setlist. Các bài đã có sẵn sẽ không bị thêm trùng.",
    "These songs are already in the setlist, or are no longer in My songs.": "Các bài này đã có trong setlist hoặc đã được xóa khỏi Kho bài hát.",
    "This playlist is empty.": "Playlist này chưa có bài hát.",
    "This playlist no longer exists.": "Playlist này không còn nữa. Bạn tải lại kho bài hát nhé.",
    "Could not save the setlist. Nothing was added.": "Chưa lưu được setlist nên chưa thêm bài nào. Bạn thử lại nhé.",
    "Could not load My songs. Please try again.": "Chưa mở được Kho bài hát. Bạn thử lại nhé.",
    "Could not load playlists. Your saved songs are still available.": "Chưa tải được playlist. Các bài trong kho vẫn dùng được nhé.",
    "Changes saved, but My songs could not be refreshed. Try again.": "Đã lưu thay đổi nhưng chưa tải lại được kho. Bạn bấm thử lại nhé.",
    "Could not update My songs or playlists. Please try again.": "Chưa lưu được thay đổi trong kho hoặc playlist. Bạn thử lại nhé.",
    Retry: "Thử lại",
    Save: "Lưu",
    Cancel: "Hủy",
    "Saving…": "Đang lưu…",
    "Saved on this browser": "Lưu trên trình duyệt này",
    "Keep in My songs": "Lưu vào kho bài hát",
    "Search my songs": "Tìm trong kho bài hát",
    "Song title or artist": "Tên bài hoặc ca sĩ",
    "Your library is empty. Save a song from the editor to keep it here.": "Kho đang trống. Lưu bài từ phần soạn để giữ lại ở đây nhé.",
    "No matching songs.": "Không tìm thấy bài phù hợp.",
    "Lyrics saved": "Đã có lời",
    "No lyrics": "Chưa có lời",
    "Remove from My songs": "Xóa khỏi kho bài hát",
    Add: "Thêm",
    "This song is already in the setlist.": "Bài này đã có trong danh sách rồi.",
    "Added from My songs.": "Đã thêm bài từ kho vào danh sách.",
    "Remove this song from My songs? Copies already in a setlist will stay there.": "Xóa bài khỏi kho nhé? Bài đã nằm trong setlist vẫn được giữ nguyên.",
    "Removed from My songs. Setlist copies are unchanged.": "Đã xóa khỏi kho. Bài trong setlist vẫn được giữ nguyên.",
    "Could not update My songs. Please try again.": "Chưa cập nhật được kho bài hát. Thử lại nhé.",
    "Saved to setlist and My songs.": "Đã lưu vào setlist và kho bài hát.",
    "Saved to setlist. My songs could not be updated.": "Đã lưu vào setlist nhưng chưa cập nhật được kho bài hát.",
    "Saved to setlist.": "Đã lưu vào setlist.",
    "Add your first song, then make the evening yours.": "Thêm bài đầu tiên rồi hát theo cách của bạn.",
    "Songs in your setlist": "Các bài trong danh sách",
    "Clear setlist": "Xóa danh sách",
    "Saved in this browser": "Được lưu trên trình duyệt này",
    "Karaoke player": "Trình phát karaoke",
    "Your stage": "Sân khấu của bạn",
    "Ready when you are": "Sẵn sàng khi bạn muốn hát",
    "Your next song starts here.": "Bài hát tiếp theo bắt đầu ở đây.",
    "Add a karaoke link, find your lyrics,": "Dán link karaoke, tìm lời bài hát,",
    "and let your voice take the lead.": "rồi cất giọng thôi.",
    "Add your first song": "Thêm bài đầu tiên",
    "Nothing playing yet": "Chưa phát bài nào",
    "Open on YouTube": "Mở trên YouTube",
    "Previous song": "Bài trước",
    "Next song": "Bài tiếp",
    Play: "Phát",
    Pause: "Tạm dừng",
    Resume: "Tiếp tục",
    Stop: "Dừng",
    Volume: "Âm lượng",
    "Skip unavailable songs": "Bỏ qua bài không phát được",
    Countdown: "Đếm ngược",
    "Countdown seconds": "Số giây đếm ngược",
    "Song and output settings": "Cài đặt bài hát và đầu ra",
    "Studio tools": "Công cụ",
    "Song editor": "Soạn bài hát",
    "OBS output": "Đầu ra OBS",
    "More below": "Còn ở bên dưới",
    "A karaoke link, a few lyrics, and you're ready.": "Có link karaoke và lời bài hát là sẵn sàng rồi.",
    "Karaoke link": "Link karaoke",
    "Song title": "Tên bài hát",
    "Paste a YouTube or media URL": "Dán link YouTube hoặc file nhạc / video",
    "Fetched automatically": "Tự lấy từ link nếu có",
    "Start at": "Bắt đầu từ",
    "End at": "Kết thúc tại",
    "Full song": "Hết bài",
    "Play the whole song or choose a section. End is optional.": "Hát cả bài hoặc chọn một đoạn. Có thể để trống mốc kết thúc.",
    "Song lyrics": "Lời bài hát",
    "Bring the words along": "Thêm lời để hát cùng",
    "Search lyrics by song or artist": "Tìm lời theo tên bài hoặc ca sĩ",
    "Song or artist": "Tên bài hát hoặc ca sĩ",
    "Find lyrics": "Tìm lời",
    "Search Lyricsify in a new browser tab": "Tìm trên Lyricsify trong cửa sổ mới",
    "Lyric search results": "Kết quả tìm lời",
    "Timed lyrics loaded. Save the song to keep them.": "Đã tải lời có mốc thời gian. Lưu bài để giữ lại nhé.",
    "Plain lyrics loaded. Save the song to keep them.": "Đã tải lời chưa có mốc thời gian. Lưu bài để giữ lại nhé.",
    "Import LRC": "Nhập file LRC",
    Encoding: "Mã hóa",
    "Auto · UTF-8 / Shift_JIS": "Tự chọn · UTF-8 / Shift_JIS",
    "Original lyrics LRC": "Lời gốc dạng LRC",
    "[00:12.00] Your first line…\n[00:16.50] Your next line…\n\nPaste lyrics or drop an .lrc file here.": `[00:12.00] Câu hát đầu tiên…
[00:16.50] Câu hát tiếp theo…

Dán lời hoặc thả file .lrc vào đây.`,
    "[00:12.00] Your first line…\n[00:16.50] Your next line…\n\nPaste lyrics or drop an .lrc or .ttml file here.": `[00:12.00] Câu hát đầu tiên…
[00:16.50] Câu hát tiếp theo…

Dán lời hoặc thả file .lrc hay .ttml vào đây.`,
    "Create Romaji": "Tạo Romaji",
    Display: "Hiển thị",
    "Original lyrics": "Lời gốc",
    "Review / edit Romaji": "Xem và sửa Romaji",
    "Edit readings only. Keep timestamps, metadata and blank lines unchanged. In dual mode, Romaji appears below the original words.": "Bạn có thể sửa cách đọc, nhưng hãy giữ nguyên mốc thời gian, thông tin bài và dòng trống. Khi chọn cả hai, Romaji sẽ nằm dưới lời gốc.",
    "Romaji lyrics LRC": "Lời Romaji dạng LRC",
    "Download Romaji LRC": "Tải LRC Romaji",
    "Lyric offset": "Lệch thời gian lời",
    "Lyric offset in seconds": "Độ lệch lời tính bằng giây",
    "Cancel edit": "Hủy sửa",
    "Add to setlist": "Thêm vào danh sách",
    "Save changes": "Lưu thay đổi",
    "Edit song": "Sửa bài hát",
    "Add an MC break": "Thêm khoảng nghỉ / dẫn chuyện",
    "Your note or announcement": "Ghi chú hoặc lời dẫn của bạn",
    "MC break note": "Nội dung lời dẫn",
    "MC break duration": "Thời lượng nghỉ",
    "Add break": "Thêm khoảng nghỉ",
    "Take your lyrics live.": "Đưa lời bài hát lên màn hình.",
    "Your own output for OBS or a second screen.": "Dùng với OBS hoặc mở ở màn hình thứ hai.",
    "Open lyrics window": "Mở cửa sổ lời",
    "OBS Browser Source URL": "Link nguồn trình duyệt OBS",
    "Copy link": "Sao chép link",
    "Paste this into an OBS Browser Source. Keep it active.": "Dán vào nguồn Browser của OBS và giữ nguồn hoạt động.",
    "Revoke the previous OBS link and create a new one": "Vô hiệu hóa link OBS cũ và tạo link mới",
    "Replace link": "Đổi link",
    "Output appearance": "Giao diện đầu ra",
    "Lyric animation": "Chọn kiểu animation",
    "Visual style": "Hiệu ứng lời",
    "JIZURA Auto · full effects": "JIZURA tự động · đầy đủ hiệu ứng",
    "Folia Major · original visualizers": "Folia Major · hiệu ứng gốc",
    "Tempera · ink": "Tempera · nét mực",
    "Sonnet · kinetic focus": "Sonnet · chuyển động chữ",
    "Lumiere · light reveal": "Lumiere · ánh sáng",
    "Hanabi · character burst": "Hanabi · chữ bung nở",
    "Sung highlight": "Màu quét",
    "Classic karaoke · two-line sweep": "Karaoke cổ điển · quét màu hai dòng",
    "Two alternating lines, white words and a sung highlight. Enhanced LRC follows word timestamps; regular LRC estimates the sweep. Choose Sung highlight or a color palette for the sweep (blue by default).": "Hai dòng lời thay nhau, chữ trắng và màu quét theo câu hát. LRC có mốc từng từ sẽ quét theo mốc đó; LRC thường sẽ ước lượng nhịp quét. Chọn Màu quét hoặc bảng màu để đổi màu chạy theo lời (mặc định là xanh dương).",
    "Clean fade": "Hiện / ẩn nhẹ nhàng",
    "Word pop": "Chữ bật lên",
    "Neon sweep": "Vệt sáng neon",
    "Glitch hit": "Nhiễu glitch",
    Background: "Nền",
    Transparent: "Trong suốt",
    "Green screen": "Phông xanh",
    "Color palette": "Bảng màu",
    "Effect palette": "Màu của hiệu ứng",
    White: "Trắng",
    "Ice cyan": "Xanh băng",
    Rose: "Hồng",
    Amber: "Vàng hổ phách",
    Violet: "Tím",
    Mint: "Xanh bạc hà",
    "Text size": "Cỡ chữ",
    "Output text size": "Cỡ chữ đầu ra",
    "Text color": "Màu chữ",
    "Shuffle JIZURA style": "Đổi ngẫu nhiên kiểu JIZURA",
    "Randomize JIZURA lyric motion": "Đổi ngẫu nhiên chuyển động lời JIZURA",
    "Enable audio reaction": "Bật phản ứng theo nhạc",
    "Stop audio reaction": "Tắt phản ứng theo nhạc",
    "Share the karaoke tab with tab audio enabled. No recording.": "Chia sẻ tab karaoke và bật âm thanh của tab. Không ghi âm.",
    "Folia reacts to the selected tab audio. Lyrics follow the LRC timecodes.": "Folia đang chuyển động theo nhạc của tab bạn chọn. Lời vẫn chạy theo mốc LRC.",
    "Use Chrome or Edge over HTTPS / localhost to share tab audio.": "Dùng Chrome hoặc Edge qua HTTPS / localhost để chia sẻ âm thanh tab.",
    "No tab audio selected. Choose the karaoke tab and enable Share tab audio.": "Chưa có âm thanh. Chọn tab karaoke và bật “Chia sẻ âm thanh của tab”.",
    "Audio sharing cancelled.": "Đã hủy chia sẻ âm thanh.",
    "Output typography": "Chữ trên đầu ra",
    "Type & layout": "Phông chữ và bố cục",
    "Font family": "Phông chữ",
    "Custom font": "Phông tự chọn",
    "An installed or Google font": "Tên phông đã cài hoặc phông Google",
    "Bold lyrics": "Chữ đậm",
    "Fonts marked “online” load from Google Fonts. Installed fonts work locally.": "Phông có chữ “online” được tải từ Google Fonts. Phông đã cài trên máy dùng được ngay.",
    "Keep centre free": "Chừa trống giữa khung",
    "Output frame": "Dáng khung",
    Automatic: "Tự động",
    Landscape: "Ngang",
    Portrait: "Dọc",
    "The outlined area stays clear for a character": "Vùng được đánh dấu dành cho nhân vật hoặc video",
    "Lyrics alternate around the open centre in supported effects.": "Với hiệu ứng hỗ trợ, lời sẽ luân phiên quanh vùng trống ở giữa.",
    "Live lyrics": "Lời đang hát",
    "Smaller lyric text": "Giảm cỡ chữ lời",
    "Larger lyric text": "Tăng cỡ chữ lời",
    "A little guidance, right on cue.": "Theo lời, bắt đúng nhịp.",
    "Current song lyrics": "Lời của bài đang phát",
    "Your words will find their place here.": "Lời bài hát sẽ hiện ở đây.",
    "Add lyrics to a song to follow along.": "Thêm lời vào bài để hát theo nhé.",
    "Live sync": "Chỉnh khớp lời",
    "Current live sync offset": "Độ lệch thời gian lời hiện tại",
    "Sync: ": "Khớp lời: ",
    Reset: "Đặt lại",
    "Nudge the words to match what you hear. + shows lines earlier; − shows them later.": "Chỉnh để lời khớp với nhạc bạn nghe. + cho lời hiện sớm hơn; − cho lời hiện muộn hơn.",
    "Set line time": "Gắn thời gian cho câu",
    "Sing your way. Your setlist, your room.": "Bài bạn chọn. Góc hát của bạn.",
    "Credits & licenses": "Nguồn và giấy phép",
    "Folia notices": "Thông tin Folia",
    "Folia source": "Mã nguồn Folia",
    "Integration source": "Mã nguồn tích hợp",
    "JIZURA license": "Giấy phép JIZURA",
    "Romaji notices": "Thông tin Romaji",
    "Interface fonts & icons": "Phông và biểu tượng giao diện",
    "Browser storage is full or unavailable. Changes remain in this window only.": "Trình duyệt không lưu được nữa. Thay đổi hiện chỉ còn trong cửa sổ này.",
    "Saved to My songs. The setlist could not be saved in this browser.": "Đã lưu vào Kho bài hát, nhưng trình duyệt chưa lưu được danh sách bài.",
    "Could not save the setlist. The song was kept in My songs.": "Chưa lưu được danh sách bài nên bài này vẫn được giữ trong Kho bài hát.",
    Ready: "Sẵn sàng",
    "Starting soon": "Sắp bắt đầu",
    Paused: "Đang tạm dừng",
    Playing: "Đang phát",
    "Playback was blocked. Press Play to start the media.": "Trình duyệt đang chặn tự phát. Bấm Phát để bắt đầu nhé.",
    "Press Play to start now": "Bấm Phát để bắt đầu ngay",
    "YouTube API could not load: Pause is unavailable and lyric timing is approximate.": "Không tải được API YouTube: chưa dùng được Tạm dừng và lời chỉ chạy theo thời gian ước tính.",
    " Open it on YouTube to check.": " Mở trên YouTube để kiểm tra nhé.",
    "Embedded playback is unavailable. Trying server playback…": "Không phát nhúng được. Đang thử phát qua máy chủ…",
    "Server playback is unavailable.": "Chưa phát được qua máy chủ.",
    "Invalid video stream.": "Luồng video không hợp lệ.",
    "Server video stream was interrupted.": "Luồng video từ máy chủ bị ngắt.",
    "Server video stream could not play. Try again.": "Chưa phát được video từ máy chủ. Thử lại nhé.",
    "Playing video through the server.": "Đang phát video qua máy chủ.",
    "Invalid video ID or URL.": "Mã video hoặc link chưa đúng.",
    "Video is unavailable, private, or has been removed.": "Video không khả dụng, đang riêng tư hoặc đã bị xóa.",
    "YouTube did not receive a referrer/client identity. Open Manokara from localhost or HTTPS, not file://.": "YouTube chưa nhận được thông tin nguồn truy cập. Hãy mở Manokara qua localhost hoặc HTTPS, thay vì file://.",
    "YouTube could not play this video.": "YouTube chưa phát được video này.",
    "Setlist finished. Ready for another song?": "Đã hết danh sách. Thêm bài nữa nhé?",
    "MC break": "Khoảng nghỉ",
    "MC break · ": "Khoảng nghỉ · ",
    Announcement: "Lời dẫn",
    "Take a moment between songs.": "Nghỉ một chút giữa các bài nhé.",
    "Could not load this media.": "Không tải được nhạc / video này.",
    "Open this link to play.": "Mở link này để phát.",
    "This media opens in a new tab. Your lyric clock is running here.": "Nhạc / video sẽ mở ở tab mới. Lời vẫn chạy theo đồng hồ tại đây.",
    "Open media ": "Mở nhạc / video ",
    "Starting in ": "Bắt đầu sau ",
    " · Lyrics ready": " · Có lời",
    Media: "Nhạc / video",
    "Move up": "Đưa lên",
    "Move song up": "Đưa bài lên",
    "Move down": "Đưa xuống",
    "Move song down": "Đưa bài xuống",
    "Remove from setlist": "Xóa khỏi danh sách",
    "Removed from the setlist. The current song keeps playing until it ends or you press Stop.": "Đã xóa khỏi danh sách. Bài đang hát vẫn phát đến hết hoặc khi bạn bấm Dừng.",
    "Paste a karaoke URL first.": "Dán link karaoke trước nhé.",
    "Use valid times (mm:ss or seconds); End must be after Start.": "Nhập thời gian dạng phút:giây hoặc số giây. Mốc kết thúc cần nằm sau mốc bắt đầu.",
    "Lyrics are too long for the relay (maximum 230 KB).": "Lời quá dài để đồng bộ (tối đa 230 KB).",
    "Combined output lyrics exceed 230 KB. Shorten the LRC or choose a single display language.": "Tổng lời đầu ra vượt 230 KB. Rút ngắn LRC hoặc chọn hiển thị một ngôn ngữ nhé.",
    "Saved.": "Đã lưu.",
    "Enter a positive MC duration (mm:ss or seconds).": "Nhập thời lượng nghỉ lớn hơn 0, dạng phút:giây hoặc số giây nhé.",
    "Remove all songs?": "Xóa tất cả bài trong danh sách?",
    "Setlist cleared. The current song keeps playing until it ends or you press Stop.": "Đã xóa danh sách. Bài đang hát vẫn phát đến hết hoặc khi bạn bấm Dừng.",
    "Searching…": "Đang tìm…",
    "Timed lyrics": "Lời có mốc thời gian",
    "Plain lyrics": "Lời chưa có thời gian",
    "No results.": "Chưa tìm thấy bài phù hợp.",
    "Search failed. Check your connection.": "Chưa tìm được lời. Kiểm tra kết nối rồi thử lại nhé.",
    "Synced lyrics picked. Press Add/Save to keep them.": "Đã chọn lời có thời gian. Bấm Thêm / Lưu để giữ lại nhé.",
    "Plain text only: it will scroll roughly evenly. During playback press T to time each line.": "Lời chưa có thời gian nên sẽ chạy theo nhịp ước tính. Khi phát nhạc, bấm T để gắn thời gian cho từng câu.",
    "Pause is not available for this link.": "Link này chưa hỗ trợ tạm dừng.",
    "Add a song first.": "Thêm một bài trước nhé.",
    "Stopped. Press Play to start again.": "Đã dừng. Bấm Phát để bắt đầu lại.",
    "Extension store opened. Install it in this browser.": "Đã mở cửa hàng tiện ích. Cài vào trình duyệt này nhé.",
    "Manokara opened in this browser profile.": "Đã mở Manokara trong cùng hồ sơ trình duyệt.",
    " (lyrics earlier)": " (lời sớm hơn)",
    " (lyrics later)": " (lời muộn hơn)",
    "System default": "Mặc định của máy",
    "Reroll the JIZURA lyric-motion style for the current song": "Chọn ngẫu nhiên một kiểu chuyển động JIZURA khác cho bài hiện tại",
    "Select JIZURA to randomize its lyric-motion style": "Chọn JIZURA để đổi ngẫu nhiên kiểu chuyển động lời",
    "JIZURA lyric-motion style randomized. Click again to reroll.": "Đã đổi kiểu chuyển động JIZURA. Bấm lần nữa để chọn kiểu khác nhé.",
    "The dotted area stays clear for a character.": "Vùng nét đứt được chừa trống cho nhân vật.",
    "Enable to keep the dotted centre area clear.": "Bật để chừa trống vùng nét đứt ở giữa.",
    "Monet keeps its original lyric-rail and portrait composition; alternating placement is not applied.": "Monet giữ bố cục gốc với dải lời và khung chân dung, nên không đổi lời sang hai bên.",
    "Pendolo renders its clockwork layout as one scene, so Keep centre free is skipped.": "Pendolo dựng cả bố cục đồng hồ thành một cảnh, nên không áp dụng chừa trống giữa khung.",
    "Claddagh already arranges lyrics around an open centre; its circular layout is preserved.": "Claddagh vốn xếp lời quanh vùng trống ở giữa, nên giữ nguyên bố cục vòng tròn.",
    "This effect combines lyrics and motion in one full-frame scene, so Keep centre free is skipped to preserve the full-frame effect.": "Hiệu ứng này ghép lời và chuyển động thành một cảnh toàn khung, nên giữ bố cục gốc thay vì chừa trống giữa khung.",
    "Lyrics alternate around the open centre; the Folia background and full-frame effects stay in place.": "Lời luân phiên quanh vùng trống ở giữa. Nền và hiệu ứng toàn khung của Folia vẫn giữ nguyên.",
    "Wait for the lyric relay to connect.": "Chờ kết nối đồng bộ lời một chút nhé.",
    "Popup blocked. Please allow popups.": "Trình duyệt đang chặn cửa sổ mới. Cho phép popup để mở lời nhé.",
    "Green-screen window opened. It shares the OBS effect output.": "Đã mở cửa sổ lời. Cửa sổ dùng cùng hiệu ứng với đầu ra OBS.",
    "OBS relay connected": "Đã kết nối OBS",
    "OBS relay active · another window controls lyrics": "OBS đã kết nối · cửa sổ khác đang điều khiển lời",
    "OBS relay unavailable on file:// · ": "Chưa kết nối OBS qua file:// · ",
    "open server version": "mở bản chạy trên máy chủ",
    "Lyric relay unavailable · check deployment": "Chưa đồng bộ được lời · kiểm tra máy chủ",
    "OBS relay unavailable · start the server": "Chưa kết nối OBS · hãy khởi động máy chủ",
    "OBS URL copied.": "Đã sao chép link OBS.",
    "Select and copy the OBS URL.": "Chọn và sao chép link OBS nhé.",
    "Previous OBS link revoked. Update your OBS Browser Source with this new URL.": "Link OBS cũ đã bị vô hiệu hóa. Dán link mới này vào nguồn Browser của OBS nhé.",
    "No lyrics for this song yet.": "Bài này chưa có lời.",
    "Find or import lyrics in the song editor.": "Tìm hoặc nhập lời trong mục Soạn bài hát nhé.",
    "Plain text: scrolling is approximate. Press T on each line to time it.": "Lời chưa có thời gian nên chỉ chạy ước tính. Bấm T ở từng câu để gắn thời gian.",
    "Play a song with lyrics first.": "Phát một bài có lời trước nhé.",
    "All lines already have times.": "Tất cả câu đã có mốc thời gian rồi.",
    "Drop an LRC file here, or paste lyrics. Romaji keeps the original timing.": "Thả file LRC hoặc dán lời vào đây. Romaji sẽ giữ nguyên thời gian của lời gốc.",
    "Romaji edited. Add/Save the song to keep your changes.": "Đã sửa Romaji. Bấm Thêm / Lưu để giữ thay đổi nhé.",
    "Display mode applies when you Add/Save this song.": "Chế độ hiển thị sẽ áp dụng khi bạn Thêm / Lưu bài này.",
    "Paste or import Japanese lyrics first.": "Dán hoặc nhập lời tiếng Nhật trước nhé.",
    "Lyrics exceed the 200,000-character limit.": "Lời vượt giới hạn 200.000 ký tự.",
    "No Japanese characters found in these lyrics.": "Chưa thấy chữ tiếng Nhật trong lời này.",
    "Romaji conversion is already running.": "Romaji đang được tạo, chờ một chút nhé.",
    "Loading the local Japanese dictionary…": "Đang tải từ điển tiếng Nhật…",
    "Conversion timed out. Check that the Japanese dictionary is deployed, then try again.": "Tạo Romaji mất quá lâu. Kiểm tra từ điển tiếng Nhật trên máy chủ rồi thử lại nhé.",
    "Could not load the Japanese converter. Restart the updated server and reload this page.": "Chưa tải được bộ chuyển tiếng Nhật. Khởi động lại máy chủ đã cập nhật rồi tải lại trang nhé.",
    "Romaji conversion failed: ": "Chưa tạo được Romaji: ",
    "Romaji unavailable: ": "Romaji chưa dùng được: ",
    "Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.": "Romaji đã sẵn sàng. Kiểm tra tên riêng và cách đọc rồi Thêm / Lưu nhé. Mọi thẻ LRC gốc được giữ nguyên.",
    "Create valid Romaji before downloading.": "Tạo bản Romaji hợp lệ rồi tải xuống nhé.",
    "Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.": "Đã tải LRC Romaji với thời gian gốc. Bấm Thêm / Lưu để giữ trong danh sách bài nữa nhé.",
    "Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.": "Tìm đúng bản LRC trên Lyricsify, rồi nhập file tải về hoặc dán lời đã sao chép.",
    "Choose a .lrc file.": "Chọn file .lrc nhé.",
    "LRC file is too large (maximum 500 KB).": "File LRC quá lớn (tối đa 500 KB).",
    "Invalid or oversized text. Check the file encoding.": "Nội dung không hợp lệ hoặc quá dài. Kiểm tra mã hóa của file nhé.",
    "Import failed: ": "Chưa nhập được file: ",
    "Import one LRC file at a time.": "Nhập từng file LRC một nhé.",
    "Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.": "Đã mở Romaji đã lưu. Bạn có thể sửa chữ, nhớ giữ nguyên các thẻ LRC nhé.",
    "Saved Romaji no longer matches this LRC. Create Romaji again.": "Romaji đã lưu không còn khớp với lời gốc. Tạo lại Romaji nhé.",
    "Create Romaji again after changing the original lyrics.": "Sau khi sửa lời gốc, hãy tạo lại Romaji nhé.",
    "Keep the same number of lines as the original LRC.": "Giữ số dòng giống LRC gốc nhé.",
    "Could not open browser session.": "Chưa mở được phiên sử dụng. Thử tải lại trang nhé.",
    "Could not open your browser session.": "Chưa mở được phiên sử dụng. Thử tải lại trang nhé.",
    "Could not open a room.": "Chưa tạo được phòng hát. Thử tải lại trang nhé.",
    "Room limit reached. Try again later.": "Máy chủ đang đầy phòng. Chủ máy chủ cần tăng giới hạn phòng rồi khởi động lại.",
    "Invalid host.": "Tên miền truy cập không khớp cấu hình máy chủ.",
    "Invalid origin.": "Nguồn truy cập không khớp cấu hình máy chủ.",
    "Failed to fetch": "Trình duyệt không kết nối được tới máy chủ.",
    "Network request failed.": "Trình duyệt không kết nối được tới máy chủ.",
    "Could not replace the OBS link.": "Chưa đổi được link OBS. Thử lại nhé.",
    "Edit lyric layout": "Chỉnh bố cục lời",
    "Main workspace": "Không gian làm việc",
    "Playlist and lyrics overlays": "Overlay playlist và lời hát",
    "Previous OBS links revoked. Update both lyrics and playlist Browser Sources with their new URLs.": "Đã thu hồi các link OBS cũ. Cập nhật link mới cho cả nguồn lời và playlist trong OBS nhé.",
    Help: "Hướng dẫn",
    "Open the guided tour": "Mở hướng dẫn từng bước",
    "Interface language": "Ngôn ngữ giao diện"
  };
  let u = /^vi\b/i.test(navigator.language || "") ? "vi" : "en";
  const s = et.preferences.get("language");
  ["vi", "en"].includes(s) && (u = s);
  const c = [], p = document.title;
  function f(b) {
    if (b = String(b ?? ""), u === "en") return b;
    if (Object.hasOwn(i, b)) return i[b];
    const w = b.trim().replace(/\s+/g, " ");
    if (Object.hasOwn(i, w)) return b.replace(b.trim(), i[w]);
    let S = b.match(/^Creating Romaji… (\d+)%$/);
    if (S) return `Đang tạo Romaji… ${S[1]}%`;
    if (S = b.match(/^Imported (.+) \(([^)]+)\)\. Original timestamps and offset tags are retained\.$/), S) return `Đã nhập ${S[1]} (${S[2]}). Giữ nguyên thời gian và thẻ độ lệch gốc.`;
    if (S = b.match(/^Line (\d+): keep every timestamp and metadata tag unchanged\.$/), S) return `Dòng ${S[1]}: giữ nguyên mọi mốc thời gian và thẻ thông tin nhé.`;
    if (S = b.match(/^Line (\d+): keep blank lyric gaps unchanged\.$/), S) return `Dòng ${S[1]}: giữ nguyên khoảng trống giữa các câu nhé.`;
    if (S = b.match(/^Timed line (\d+)\.$/), S) return `Đã gắn thời gian cho câu ${S[1]}.`;
    const E = " Open it on YouTube to check.";
    if (b.endsWith(E)) return f(b.slice(0, -E.length)) + i[E];
    if (S = b.match(/^YouTube error ([^:]+): (.+)$/), S) return `Lỗi YouTube ${S[1]}: ${f(S[2])}`;
    for (const I of ["Romaji conversion failed: ", "Romaji unavailable: ", "Import failed: "])
      if (b.startsWith(I)) return i[I] + f(b.slice(I.length));
    return b;
  }
  const g = ["title", "aria-label", "placeholder", "label"];
  function y(b, w) {
    const S = document.createTreeWalker(b, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let E = b;
    do
      if (E.nodeType === 1) {
        if (E.matches("script,style,svg,[data-no-i18n]") || E.closest("script,style,svg,[data-no-i18n]")) continue;
        for (const I of g) if (E.hasAttribute(I)) {
          const U = E.getAttribute(I);
          Object.hasOwn(i, U) && w.push({
            node: E,
            attr: I,
            source: U
          });
        }
      } else if (E.nodeType === 3 && !E.parentElement?.closest("script,style,svg,[data-no-i18n]")) {
        const I = E.nodeValue, U = I.trim().replace(/\s+/g, " ");
        Object.hasOwn(i, U) && w.push({
          node: E,
          source: I
        });
      }
    while (E = S.nextNode());
  }
  function d(b, w = !1) {
    for (const {
      node: S,
      attr: E,
      source: I
    } of b)
      w && !S.isConnected || (E ? S.setAttribute(E, f(I)) : S.nodeValue = f(I));
  }
  function M(b) {
    if (u === "en") return b;
    const w = document.createElement("template");
    w.innerHTML = b;
    const S = [];
    return y(w.content, S), d(S), w.innerHTML;
  }
  function x(b) {
    return u === "en" ? b : b.replace(/\b(title|aria-label)="([^"]*)"/g, (w, S, E) => `${S}="${f(E).replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`).replace(/(^|>)([^<>]*)(?=<|$)/g, (w, S, E) => S + f(E));
  }
  function C() {
    document.documentElement.lang = u, document.title = f(p), d(c, !0);
    const b = document.querySelector("#language");
    b && (b.value = u);
  }
  function N() {
    const b = "#relayStatus,#playbackState,#now,#time,#msg,#offv,#centerHint,#audioStatus,#lyricsStatus,#lyricLoadStatus,#pitchStatus,#libraryCount,#libraryEmpty,#libraryList,#liveLyricModeStatus,[data-pitch-value],#ftitle,#songDialogTitle,#add,#pause,#stage,#pan,#lres,#list,#lrandom";
    document.querySelectorAll(b).forEach((w) => w.setAttribute("data-no-i18n", "")), y(document.body, c), document.querySelectorAll(b).forEach((w) => w.removeAttribute("data-no-i18n")), C();
  }
  function D(b) {
    !["vi", "en"].includes(b) || b === u || (u = b, et.preferences.set("language", b), C(), window.dispatchEvent(new CustomEvent("manokara:languagechange")));
  }
  window.ManokaraI18n = {
    text: f,
    html: M,
    markup: x,
    init: N,
    setLanguage: D,
    get language() {
      return u;
    }
  };
})();
function Fr(i = globalThis, u = () => performance.now()) {
  const s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), f = new AbortController();
  let g = !1, y = !1;
  function d(E) {
    E.handle != null && i[E.kind === "interval" ? "clearInterval" : E.kind === "frame" ? "cancelAnimationFrame" : "clearTimeout"](E.handle), E.handle = null;
  }
  function M(E) {
    if (g || y || !s.has(E)) return;
    const I = () => {
      g || y || !s.has(E) || (E.kind !== "interval" && (s.delete(E), E.handle = null), E.callback());
    };
    E.kind === "interval" ? E.handle = i.setInterval(I, E.ms) : E.kind === "frame" ? E.handle = i.requestAnimationFrame(I) : (E.due = u() + E.remaining, E.handle = i.setTimeout(I, E.remaining));
  }
  function x(E, I, U = 0) {
    if (g) return () => {
    };
    const P = {
      kind: E,
      callback: I,
      ms: U,
      remaining: U,
      handle: null
    };
    return s.add(P), M(P), () => {
      d(P), s.delete(P);
    };
  }
  function C(E) {
    return g ? (E(), () => {
    }) : (c.add(E), () => {
      c.delete(E) && E();
    });
  }
  function N(E, I, U, P) {
    D(E, I, U, P);
    let A = !0;
    const j = (...G) => {
      A && !g && !y && U(...G);
    };
    E.addEventListener(I, j, P);
    const V = {
      target: E,
      type: I,
      callback: U,
      capture: typeof P == "boolean" ? P : !!P?.capture
    }, Q = C(() => {
      A = !1, E.removeEventListener(I, j, {
        capture: V.capture
      }), p.delete(V);
    });
    return V.remove = Q, g || p.add(V), Q;
  }
  function D(E, I, U, P) {
    const A = typeof P == "boolean" ? P : !!P?.capture;
    for (const j of p) j.target === E && j.type === I && j.callback === U && j.capture === A && j.remove();
  }
  function b() {
    if (!(g || y)) {
      y = !0;
      for (const E of s)
        E.kind === "timeout" && (E.remaining = Math.max(0, E.due - u())), d(E);
    }
  }
  function w() {
    if (!(g || !y)) {
      y = !1;
      for (const E of s) M(E);
    }
  }
  function S() {
    if (!g) {
      g = !0, f.abort();
      for (const E of s) d(E);
      s.clear();
      for (const E of c)
        try {
          E();
        } catch {
        }
      c.clear();
    }
  }
  return {
    interval: (E, I) => x("interval", E, I),
    timeout: (E, I) => x("timeout", E, I),
    frame: (E) => x("frame", E),
    own: C,
    listen: N,
    unlisten: D,
    suspend: b,
    resume: w,
    dispose: S,
    signal: f.signal,
    get disposed() {
      return g;
    },
    get suspended() {
      return y;
    },
    get timerCount() {
      return s.size;
    },
    get activeTimerCount() {
      return [...s].filter((E) => E.handle != null).length;
    },
    get cleanupCount() {
      return c.size;
    }
  };
}
(() => {
  const i = Fr(), u = [{
    target: "#setlistSide .section-head",
    en: ["Your evening, one song at a time", "Your songs live in this list. Click a song to play it; use its small buttons to edit, reorder or remove it. The list is saved in this browser."],
    vi: ["Danh sách bài của bạn", "Các bài bạn thêm nằm ở đây. Bấm vào một bài để phát; các nút nhỏ bên cạnh giúp sửa, đổi thứ tự hoặc xóa bài. Danh sách được lưu ngay trên trình duyệt này."]
  }, {
    target: ".header-search",
    en: ["Find a song without hunting for links", "Type a song or artist here. Karaoke prefers backing-track versions; switch it off for regular videos. Pick a result or use ↑/↓ and Enter to fill the song editor. Review the song and add lyrics before saving it to the setlist."],
    vi: ["Tìm bài ngay, khỏi đi sao chép link", "Gõ tên bài hoặc ca sĩ ở đây. Bật Karaoke để ưu tiên bản nhạc hát; tắt nếu muốn tìm video thường. Bấm kết quả hoặc dùng ↑/↓ và Enter để điền vào phần thêm bài. Xem lại bài, thêm lời nếu cần rồi lưu vào danh sách nhé."]
  }, {
    tab: "song",
    target: ".field-grid",
    en: ["Start with a karaoke link", "Paste a YouTube link or a direct audio/video URL. Manokara tries to fetch the title, and you can rename it whenever you like."],
    vi: ["Bắt đầu bằng một link karaoke", "Dán link YouTube hoặc link trực tiếp đến file nhạc / video. Manokara sẽ thử lấy tên bài giúp bạn; bạn cũng có thể đặt lại tên cho dễ nhớ."]
  }, {
    tab: "song",
    target: ".clip-row",
    en: ["Sing the whole song, or just your favourite part", "Start and End accept mm:ss or seconds. Leave End empty to play to the end. Lyric time zero corresponds to your chosen start point."],
    vi: ["Hát cả bài hoặc chọn đoạn bạn thích", "Mốc bắt đầu và kết thúc nhận dạng phút:giây hoặc số giây. Để trống kết thúc nếu muốn phát hết bài. Thời gian 0 của lời tương ứng với điểm bắt đầu bạn chọn."]
  }, {
    tab: "song",
    target: ".search-row",
    en: ["Find the right lyrics", "Search by song or artist, then choose a result below. Timed lyrics follow the music; plain lyrics need timing. If LRCLIB has no match, Lyricsify opens another place to look. Choose the same version as your karaoke audio."],
    vi: ["Tìm lời đúng bản bạn hát", "Gõ tên bài hoặc ca sĩ, rồi chọn kết quả bên dưới. Lời có mốc thời gian sẽ chạy theo nhạc; lời thường cần gắn thêm thời gian. Chưa có trên LRCLIB thì thử Lyricsify nhé. Nhớ chọn bản khớp với nhạc karaoke của bạn."]
  }, {
    tab: "song",
    target: "#llrc",
    en: ["Already have an LRC? Bring it along", "Paste your lyrics here, drop an .lrc file into this area, or use Import LRC above. Keep the [mm:ss.xx] timestamps: they tell every effect when each line should appear."],
    vi: ["Có file LRC rồi thì dùng luôn", "Dán lời vào đây, thả file .lrc vào vùng này hoặc bấm Nhập file LRC ở phía trên. Giữ các mốc [phút:giây] nhé — mọi hiệu ứng dựa vào chúng để biết lúc nào hiện từng câu."]
  }, {
    tab: "song",
    target: ".romaji-row",
    en: ["Japanese lyrics, easier to read", "Create Romaji adds Latin-letter readings without changing the original timecodes. Choose Original, Romaji or Japanese + Romaji. The first run needs to load a dictionary; review names and unusual readings before saving."],
    vi: ["Lời tiếng Nhật dễ đọc hơn", "Tạo Romaji giúp thêm cách đọc bằng chữ Latin và giữ nguyên mốc thời gian gốc. Bạn chọn lời gốc, Romaji hoặc cả hai đều được. Lần đầu cần tải từ điển một chút; nhớ xem lại tên riêng và cách đọc trước khi lưu nhé."]
  }, {
    tab: "song",
    target: ".form-actions",
    en: ["Save your song", "Add to setlist keeps the link and lyrics together. Song key saves a semitone shift for this song (0 is the original key). When editing, this button becomes Save changes. A positive lyric offset makes words appear earlier; a negative value makes them appear later."],
    vi: ["Lưu bài là sẵn sàng hát", "Bấm Thêm vào danh sách để lưu cả link và lời. Tông bài hát lưu số nửa cung cần tăng giảm riêng cho bài này (0 là tông gốc). Khi sửa bài, nút sẽ thành Lưu thay đổi. Độ lệch lời dương cho chữ hiện sớm hơn, âm cho chữ hiện muộn hơn."]
  }, {
    target: ".transport",
    en: ["Take the stage", "Play starts your set. Pause/Resume, previous, next and Stop are here, alongside volume. Below, Countdown gives you a moment before a song starts; set it to 0 to start straight away."],
    vi: ["Đến lúc cất giọng rồi", "Bấm Phát để bắt đầu. Tạm dừng / Tiếp tục, bài trước, bài tiếp, Dừng và âm lượng đều ở đây. Đếm ngược bên dưới cho bạn vài giây chuẩn bị; đặt 0 nếu muốn vào bài ngay."]
  }, {
    target: ".lyrics-footer",
    en: ["Make the words match what you hear", "Follow along in Live lyrics. If words are late, tap +0.5 s; if they are early, tap −0.5 s. Reset removes the offset. For plain lyrics, press T during playback to timestamp the next untimed line (outside text fields)."],
    vi: ["Chỉnh cho lời khớp với nhạc", "Theo dõi câu đang hát trong khung lời. Lời đến muộn thì bấm +0.5 s; đến sớm thì bấm −0.5 s. Đặt lại đưa độ lệch về 0. Với lời chưa có thời gian, bấm T khi đang phát để gắn mốc cho câu tiếp theo chưa được gắn; nhớ bấm ngoài ô nhập chữ nhé."]
  }, {
    tab: "song",
    target: "#mcDetails",
    details: "#mcDetails",
    en: ["Leave a little room between songs", "Add an MC break for a note, introduction or a breather. Set its duration, then Add break. It joins your setlist and advances to the next item when its time is up."],
    vi: ["Chừa một chút thời gian giữa các bài", "Thêm khoảng nghỉ để dẫn chuyện, giới thiệu bài hoặc lấy hơi. Nhập lời nhắc, thời lượng rồi bấm Thêm khoảng nghỉ. Mục này nằm trong danh sách và sẽ chuyển tiếp khi hết giờ."]
  }, {
    tab: "output",
    target: ".obs-link",
    en: ["Send the lyrics to OBS", "Copy this link into the URL field of an OBS Browser Source. Keep the source active: disable “Shutdown source when not visible”. Keep this controller open while playing. Open lyrics window above gives you the same output in a separate window."],
    vi: ["Đưa lời sang OBS", "Sao chép link này vào ô URL của nguồn Browser trong OBS. Giữ nguồn hoạt động: tắt “Shutdown source when not visible”. Khi hát, cứ để trang điều khiển này mở. Nút Mở cửa sổ lời phía trên sẽ cho bạn cùng đầu ra trong một cửa sổ riêng."]
  }, {
    tab: "output",
    target: ".settings-grid",
    en: ["Pick a look that suits your song", "Choose JIZURA, Folia or another lyric style. Transparent keeps the glow and particles intact in OBS without chroma key; Green screen is also available. Pick a palette if you want different colours."],
    vi: ["Chọn hiệu ứng hợp với bài", "Thử JIZURA, Folia hoặc các kiểu lời khác. Nền Trong suốt giữ được ánh sáng và hạt hiệu ứng trong OBS mà không cần lọc phông xanh. Bạn vẫn có thể chọn Phông xanh hoặc đổi bảng màu theo ý thích."]
  }, {
    tab: "output",
    target: ".output-reaction",
    en: ["Let supported Folia effects feel the music", "Enable audio reaction, select the karaoke browser tab and tick Share tab audio. Only audio levels are shared, with no recording. This adds motion to supported effects; lyric timing still comes from the LRC, not automatic beat detection."],
    vi: ["Cho Folia chuyển động theo nhạc", "Bật phản ứng theo nhạc, chọn tab karaoke rồi bật chia sẻ âm thanh của tab. Chỉ mức âm thanh được gửi đi, không ghi âm. Hiệu ứng hỗ trợ sẽ phản ứng theo nhạc; thời gian lời vẫn lấy từ LRC, chưa phải tự nhận nhịp để gắn thời gian."]
  }, {
    tab: "output",
    target: ".type-settings",
    en: ["Make the type your own", "Adjust the font, size and bold setting for styles that support them. JIZURA controls its own typography, so those fields are disabled there. Use Shuffle JIZURA style above to try another motion, without changing the song."],
    vi: ["Chỉnh chữ theo ý bạn", "Bạn có thể đổi phông, cỡ và chữ đậm với những kiểu có hỗ trợ. JIZURA tự quyết định kiểu chữ nên các ô này sẽ bị khóa khi chọn JIZURA. Muốn thử chuyển động khác, bấm Đổi ngẫu nhiên kiểu JIZURA ở phía trên — bài hát vẫn giữ nguyên."]
  }, {
    tab: "output",
    target: "#centerRow",
    en: ["Leave the middle for your character", "Keep centre free puts alternating lines at the sides on wide frames, or above/below on tall ones. Some Folia scenes keep their original layout; the note here explains the selected effect. Match the frame shape to your OBS canvas."],
    vi: ["Chừa chỗ ở giữa cho nhân vật", "Chừa trống giữa khung cho lời luân phiên hai bên khi khung ngang, hoặc trên / dưới khi khung dọc. Một số cảnh Folia giữ bố cục gốc; ghi chú ở đây sẽ nói rõ với hiệu ứng bạn đang chọn. Chọn dáng khung khớp với canvas OBS nhé."]
  }, {
    target: ".header-actions",
    en: ["You are ready — come back any time", "Change the language or light/dark theme here. Key opens the built-in pitch controls: −/+ shifts by one semitone, Original key resets it. Each song remembers its key, and playback speed stays unchanged. YouTube key shifting needs server playback. Tap ? to revisit the guide."],
    vi: ["Vậy là sẵn sàng rồi nhé", "Đổi ngôn ngữ hoặc giao diện sáng / tối ở đây. Nút Tông mở bộ chỉnh ngay trong app: −/+ đổi một nửa cung, Tông gốc để đặt lại. Mỗi bài nhớ tông riêng và tốc độ nhạc vẫn giữ nguyên. Đổi tông YouTube cần bật phát qua máy chủ. Khi cần xem lại, cứ bấm ? nhé."]
  }], s = [{
    overlay: "playlist",
    target: ".studio-targets",
    en: ["Two outputs, one editor", "Playlist overlay shows the current song, setlist and next song. Lyrics overlay arranges the animated words. Each has its own OBS link. Switching between them keeps the music playing."],
    vi: ["Hai đầu ra, chỉnh ở cùng một chỗ", "Overlay playlist hiện bài đang hát, danh sách bài và bài tiếp theo. Overlay lời dùng để canh khung chữ chạy. Mỗi phần có một link OBS riêng; bạn chuyển qua lại thì nhạc vẫn chạy nhé."]
  }, {
    overlay: "playlist",
    target: "#studioPresets",
    en: ["Choose a playlist design", "Try Glass, Paper, Minimal, Card, Vinyl or Signal. Each changes the layout and visual treatment. Choosing a preset replaces the playlist appearance; you can then customize it below."],
    vi: ["Chọn kiểu playlist bạn thích", "Thử Kính mờ, Trang giấy, Tối giản, Thẻ bài hát, Đĩa nhạc hoặc Thanh tín hiệu. Mỗi kiểu có bố cục và cách trình bày riêng. Chọn mẫu sẽ thay giao diện playlist hiện tại; sau đó bạn chỉnh tiếp ở bên dưới."]
  }, {
    overlay: "playlist",
    target: "#studioFrame",
    en: ["Match your OBS canvas", "Choose a landscape or portrait frame. The preview keeps this aspect ratio. Use the displayed width and height for both OBS Browser Sources. Changing the frame scales your existing blocks."],
    vi: ["Chọn khung khớp với OBS", "Chọn khung ngang hoặc dọc; phần xem trước sẽ giữ đúng tỉ lệ đó. Nhập cùng chiều rộng và chiều cao này cho hai nguồn Browser trong OBS. Đổi khung cũng sẽ co giãn các khối bạn đã đặt."]
  }, {
    overlay: "playlist",
    target: "#studioLayoutSection",
    en: ["Move each block, or keep them together", "Separate blocks lets you position the current song, list and next song independently. One unified panel keeps them aligned so you can move and resize the whole playlist together."],
    vi: ["Tách từng khối hoặc gom cho dễ canh", "Tách từng khối cho bạn đặt bài đang hát, danh sách và bài tiếp theo ở các vị trí riêng. Gom thành một bảng giữ chúng thẳng hàng để bạn kéo và đổi kích thước cả playlist cùng lúc."]
  }, {
    overlay: "playlist",
    target: "#studioBlockSection",
    en: ["Select the part you want to edit", "Choose Now Singing, Song List or Next On. The controls below apply to that section. Show this block lets you hide it; in unified mode, position and size apply to the whole panel."],
    vi: ["Chọn phần muốn chỉnh", "Bấm Bài đang hát, Danh sách bài hoặc Bài tiếp theo rồi chỉnh ở bên dưới. Bỏ chọn Hiện khối này nếu muốn ẩn phần đó. Khi gom thành một bảng, vị trí và kích thước sẽ áp dụng cho cả bảng."]
  }, {
    overlay: "playlist",
    target: "#studioGeometry",
    en: ["Position and resize without stretching", "X and Y set the position; Width and Height set the size. Keep aspect ratio links width and height when resizing. You can also drag in the preview, resize from any of four corners or four edges, or use arrow keys; Shift moves in larger steps. Top center and Bottom center place the block quickly."],
    vi: ["Canh vị trí, đổi kích thước cho vừa", "X và Y là vị trí; Rộng và Cao là kích thước. Bật Giữ tỉ lệ rộng/cao để phóng to, thu nhỏ mà không méo khung. Bạn cũng có thể kéo trong phần xem trước, kéo một trong 4 góc hoặc 4 cạnh để đổi cỡ, hoặc dùng phím mũi tên; giữ Shift để dịch nhanh hơn. Giữa trên và Giữa dưới giúp đặt khối nhanh vào hai vị trí đó."]
  }, {
    overlay: "playlist",
    target: "#blockTypography",
    en: ["Customize the headings and text", "Rename the selected heading, adjust text size and alignment, or toggle bold. These settings are for the playlist; lyric fonts and effects have their own controls in Lyrics overlay."],
    vi: ["Chỉnh tiêu đề và chữ", "Đổi tên tiêu đề đang chọn, cỡ chữ, căn trái / giữa / phải hoặc bật chữ đậm. Đây là phần chữ của playlist; font và hiệu ứng lời hát có bộ chỉnh riêng ở Overlay lời."]
  }, {
    overlay: "playlist",
    target: "#playlistAppearance",
    en: ["Colors and list content", "Adjust text, accent and panel colors, opacity, corners and font. List content can show the whole setlist, upcoming songs or sung history. Numbers, progress and Hide when idle are optional."],
    vi: ["Đổi màu và chọn nội dung danh sách", "Chỉnh màu chữ, màu nhấn, nền, độ đậm nền, bo góc và font. Danh sách có thể hiện cả setlist, các bài sắp hát hoặc những bài đã hát. Bạn cũng có thể bật số thứ tự, tiến trình và ẩn khi chưa phát bài."]
  }, {
    overlay: "playlist",
    target: "#studioAutoScrollField",
    en: ["Let viewers see the whole list", "Auto-scroll moves long lists down and back up. Set its speed and the pause at each end below. Short lists stay still. With scrolling off, Static list limit controls how many songs appear."],
    vi: ["Cho người xem thấy hết danh sách", "Bật tự cuộn để danh sách dài chạy xuống rồi quay lên. Chỉnh tốc độ và thời gian dừng ở mỗi đầu ngay bên dưới. Danh sách ngắn sẽ đứng yên; nếu tắt cuộn, Số bài khi tắt cuộn quyết định số bài được hiện."]
  }, {
    overlay: "playlist",
    target: ".studio-preview-toolbar",
    en: ["Preview before going live", "Sample data helps you arrange the overlay without starting a song; Live data uses your current setlist and playback. Checkerboard, dark, light and scene backgrounds are only preview aids. Both overlays shows playlist and lyrics together."],
    vi: ["Xem trước rồi hãy lên sóng", "Dữ liệu mẫu giúp canh overlay mà chưa cần phát bài; Bài đang phát lấy dữ liệu thật từ phiên hát. Nền caro, tối, sáng và mẫu livestream chỉ để dễ nhìn khi chỉnh. Bật Cả hai overlay để xem playlist và lời cùng nhau."]
  }, {
    overlay: "playlist",
    target: ".studio-history-tools",
    en: ["A closer look, and a way back", "View larger opens a bigger preview. Undo and Redo move through layout edits; Reset layout restores the selected output’s layout. Your changes are saved automatically in this browser."],
    vi: ["Xem rõ hơn, sửa nhầm thì quay lại", "Xem lớn mở khung xem trước rộng hơn. Hoàn tác và Làm lại giúp lùi / tiến qua các lần chỉnh bố cục; Đặt lại bố cục đưa đầu ra đang chọn về bố cục mặc định. Các chỉnh sửa được tự lưu trong trình duyệt này."]
  }, {
    overlay: "playlist",
    target: ".studio-link",
    en: ["Add the playlist to OBS", "Copy this link into a separate OBS Browser Source for the playlist. Match its dimensions to the frame above. Keep Manokara open while singing and disable “Shutdown source when not visible” in OBS."],
    vi: ["Đưa playlist vào OBS", "Sao chép link này vào một nguồn Browser riêng cho playlist. Đặt kích thước nguồn giống khung đã chọn phía trên. Khi hát, giữ Manokara mở và tắt “Shutdown source when not visible” trong OBS nhé."]
  }, {
    overlay: "lyrics",
    target: "#studioLyricSettings",
    en: ["Style your animated lyrics here", "Choose the effect, transparency, palette, font and size here, just as in Karaoke → OBS output. These are shared settings. Classic karaoke also has a Sung highlight color; Keep centre free leaves space for your character in supported styles."],
    vi: ["Chỉnh hiệu ứng lời ngay tại đây", "Chọn hiệu ứng, nền trong suốt, bảng màu, font và cỡ chữ giống phần Đầu ra OBS ở Karaoke. Hai nơi dùng chung một bộ setting. Karaoke cổ điển có thêm Màu quét; Chừa trống giữa khung giúp dành chỗ cho nhân vật với các kiểu có hỗ trợ."]
  }, {
    overlay: "lyrics",
    target: "#studioGeometry",
    en: ["Place the lyric viewport", "The eight text effects use a compact frame fitted to the longest lines in the song; manual geometry edits turn auto-fit off. Scene effects and Keep centre free retain the full lyric viewport. Move or resize from any corner or edge; Keep aspect ratio preserves its shape. Effect and lyric content are unchanged; for Classic karaoke, word-timed LRC gives a more accurate sweep than line-only LRC."],
    vi: ["Đặt khung lời vào đúng chỗ", "Tám hiệu ứng chữ dùng khung gọn ôm theo các câu dài nhất trong bài; chỉnh vị trí hoặc cỡ thủ công sẽ tắt tự ôm. Hiệu ứng dựng cảnh và Chừa trống giữa khung giữ vùng lời đầy đủ. Kéo mọi góc hoặc cạnh để đổi cỡ; Giữ tỉ lệ rộng/cao giúp khung không bị méo. Hiệu ứng và nội dung lời vẫn giữ nguyên; Karaoke cổ điển sẽ quét sát hơn nếu LRC có mốc từng từ thay vì chỉ từng câu."]
  }, {
    overlay: "lyrics",
    target: ".studio-link",
    en: ["The lyrics have their own OBS link", "This is now the lyrics link. Copy it into your lyric Browser Source, keeping the playlist as a second source. The saved viewport and appearance apply to the lyric output."],
    vi: ["Lời hát có link OBS riêng", "Link ở đây lúc này là link lời hát. Sao chép vào nguồn Browser dành cho lời; playlist vẫn là một nguồn riêng. Đầu ra lời sẽ dùng khung và giao diện bạn đã chỉnh."]
  }, {
    overlay: "lyrics",
    target: ".studio-export",
    en: ["Save a copy of your layout", "Export layout downloads a JSON file for backup or another browser; Import layout restores one. It contains the overlay layout, not your songs. To revisit this guide, open Overlay and press ?; Karaoke has its own tour."],
    vi: ["Giữ một bản bố cục để dùng lại", "Xuất bố cục tải file JSON để cất hoặc mang sang trình duyệt khác; Nhập bố cục mở lại file đó. File này lưu bố cục overlay, không kèm danh sách bài. Muốn xem lại hướng dẫn, vào Overlay rồi bấm ?; tab Karaoke có tour riêng nhé."]
  }], c = {
    en: {
      guide: "Getting started",
      overlayGuide: "Overlay guide",
      close: "Close guide",
      skip: "Skip guide",
      back: "Back",
      next: "Next",
      done: "Let’s sing",
      overlayDone: "Done",
      step: "Step",
      of: "of",
      language: "Guide language"
    },
    vi: {
      guide: "Làm quen với Manokara",
      overlayGuide: "Hướng dẫn chỉnh Overlay",
      close: "Đóng hướng dẫn",
      skip: "Bỏ qua",
      back: "Quay lại",
      next: "Tiếp",
      done: "Bắt đầu hát thôi",
      overlayDone: "Xong",
      step: "Bước",
      of: "/",
      language: "Ngôn ngữ hướng dẫn"
    }
  };
  let p = u, f, g, y, d, M = 0, x = !1, C, N = 0, D = 0;
  const b = (Z) => document.querySelector(Z);
  function w() {
    const Z = window.visualViewport;
    return {
      left: Z?.offsetLeft || 0,
      top: Z?.offsetTop || 0,
      width: Z?.width || innerWidth,
      height: Z?.height || innerHeight
    };
  }
  function S(Z, Y) {
    const J = Z.getBoundingClientRect();
    let ie = Math.max(Y.left + 6, J.left - 6), ce = Math.max(Y.top + 6, J.top - 6), te = Math.min(Y.left + Y.width - 6, J.right + 6), v = Math.min(Y.top + Y.height - 6, J.bottom + 6);
    for (let z = Z.parentElement; z && z !== document.body; z = z.parentElement) {
      const _ = getComputedStyle(z), k = z.getBoundingClientRect();
      /auto|scroll|hidden|clip/.test(_.overflowX) && (ie = Math.max(ie, k.left), te = Math.min(te, k.right)), /auto|scroll|hidden|clip/.test(_.overflowY) && (ce = Math.max(ce, k.top), v = Math.min(v, k.bottom));
    }
    return {
      left: ie,
      top: ce,
      right: Math.max(ie, te),
      bottom: Math.max(ce, v),
      width: Math.max(0, te - ie),
      height: Math.max(0, v - ce)
    };
  }
  function E() {
    if (N = 0, !x) return;
    const Z = b(p[M].target);
    if (!Z) return;
    const Y = w(), J = S(Z, Y), ie = 16, ce = 12;
    f.style.setProperty("--tour-height", Y.height + "px"), f.style.setProperty("--tour-width", Y.width + "px"), g.style.width = Math.min(390, Y.width - ce * 2) + "px", g.style.maxHeight = Math.max(140, Math.min(Y.height - ce * 2, Y.width <= 620 && Y.height >= 500 ? Y.height * 0.6 : Y.height)) + "px";
    const te = g.getBoundingClientRect(), v = te.width, z = te.height;
    let _, k;
    if (Y.width <= 620)
      _ = Y.left + (Y.width - v) / 2, k = Y.top + Y.height - z - ce;
    else {
      const de = [{
        x: J.right + ie,
        y: J.top
      }, {
        x: J.left - v - ie,
        y: J.top
      }, {
        x: J.left,
        y: J.bottom + ie
      }, {
        x: J.left,
        y: J.top - z - ie
      }], ge = (he) => Math.max(Y.left + ce, Math.min(he, Y.left + Y.width - v - ce)), Ae = (he) => Math.max(Y.top + ce, Math.min(he, Y.top + Y.height - z - ce));
      ({
        x: _,
        y: k
      } = de.map((he) => {
        const Ne = ge(he.x), Se = Ae(he.y), je = Math.max(0, Math.min(Ne + v, J.right) - Math.max(Ne, J.left)) * Math.max(0, Math.min(Se + z, J.bottom) - Math.max(Se, J.top));
        return {
          x: Ne,
          y: Se,
          score: je + Math.abs(he.x - Ne) + Math.abs(he.y - Se)
        };
      }).sort((he, Ne) => he.score - Ne.score)[0]);
    }
    Object.assign(g.style, {
      left: _ + "px",
      top: k + "px"
    }), Object.assign(y.style, {
      left: J.left + "px",
      top: J.top + "px",
      width: J.width + "px",
      height: J.height + "px"
    });
    const L = f.querySelectorAll(".tour-mask"), re = [{
      left: 0,
      top: 0,
      width: innerWidth,
      height: J.top
    }, {
      left: 0,
      top: J.bottom,
      width: innerWidth,
      height: Math.max(0, innerHeight - J.bottom)
    }, {
      left: 0,
      top: J.top,
      width: J.left,
      height: J.height
    }, {
      left: J.right,
      top: J.top,
      width: Math.max(0, innerWidth - J.right),
      height: J.height
    }];
    L.forEach((de, ge) => {
      for (const [Ae, xe] of Object.entries(re[ge])) de.style[Ae] = Math.max(0, xe) + "px";
    });
  }
  function I() {
    x && !N && (N = i.frame(E));
  }
  function U() {
    x && (A(), I());
  }
  function P() {
    const Z = ManokaraI18n.language, Y = c[Z], [J, ie] = p[M][Z];
    W.ui.updateTour({
      open: x,
      language: Z,
      languageLabel: Y.language,
      eyebrow: p === s ? Y.overlayGuide : Y.guide,
      title: J,
      body: ie,
      progress: `${Y.step} ${M + 1} ${Y.of} ${p.length}`,
      meter: (M + 1) / p.length * 100,
      closeLabel: Y.close,
      skipLabel: Y.skip,
      backLabel: Y.back,
      nextLabel: M === p.length - 1 ? p === s ? Y.overlayDone : Y.done : Y.next,
      backDisabled: M === 0
    }), I();
  }
  function A() {
    const Z = p[M], Y = b("#tourReactRoot"), J = Z.tab === "song" ? b("#songEditorDialog") : document.body;
    Y.parentElement !== J && J.append(Y), d.showMain?.(p === s ? "playlist" : "karaoke"), Z.overlay && ManokaraStudio.view.target !== Z.overlay && ManokaraStudio.showTarget(Z.overlay), p === u && d.showTab(Z.tab || "output"), Z.details && (b(Z.details).open = !0);
    const ie = b(Z.target);
    if (ie) {
      for (let ce = ie; ce && ce !== document.body; ce = ce.parentElement)
        ce.tagName === "DETAILS" && (ce.open = !0);
      ie.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "instant"
      });
    }
  }
  function j(Z) {
    M = Math.max(0, Math.min(Z, p.length - 1));
    const Y = ++D;
    P(), A(), i.frame(() => {
      if (!x || Y !== D) return;
      E();
      const J = w(), ie = b(p[M].target);
      if (!ie) return;
      const ce = ie.getBoundingClientRect(), te = g.getBoundingClientRect();
      if (J.width <= 620 && ce.bottom > te.top - 16) {
        let v = ie.parentElement;
        for (; v && v !== document.body && !(v.scrollHeight > v.clientHeight && /auto|scroll/.test(getComputedStyle(v).overflowY)); ) v = v.parentElement;
        const z = ce.bottom - te.top + 24;
        v && v !== document.body ? v.scrollTop += z : window.scrollBy({
          top: z,
          behavior: "instant"
        }), E();
      }
      f.querySelector('[data-tour="next"]').focus({
        preventScroll: !0
      });
    });
  }
  function V(Z) {
    if (x) {
      if (Z.key === "Escape") {
        Z.preventDefault(), Z.stopImmediatePropagation(), $();
        return;
      }
      if (Z.key === "Tab") {
        const Y = [...g.querySelectorAll("button:not([disabled]),select")], J = Y[0], ie = Y.at(-1);
        Z.shiftKey && document.activeElement === J ? (Z.preventDefault(), ie.focus()) : !Z.shiftKey && document.activeElement === ie && (Z.preventDefault(), J.focus());
        return;
      }
      Z.target.tagName !== "SELECT" && (Z.key === "ArrowRight" && (Z.preventDefault(), Q()), Z.key === "ArrowLeft" && (Z.preventDefault(), j(M - 1)));
    }
  }
  function Q() {
    M === p.length - 1 ? $() : j(M + 1);
  }
  function G() {
    if (x) return;
    b("#transposeDialog").hidden || b("#transposeClose").click();
    const Z = [...document.querySelectorAll(".app-header,.main-tabs,#grid,#playlistStudio,.app-footer")];
    C = {
      focus: document.activeElement,
      main: d.main?.() || "karaoke",
      overlay: ManokaraStudio.view,
      tab: b("#songEditorDialog").open ? "song" : "output",
      details: [...document.querySelectorAll("#grid details,#playlistStudio details,#songEditorDialog details")].map((Y) => ({
        node: Y,
        open: Y.open
      })),
      scroll: [...document.querySelectorAll("main,main *,#playlistStudio,#playlistStudio *")].filter((Y) => Y.scrollHeight > Y.clientHeight || Y.scrollWidth > Y.clientWidth).map((Y) => ({
        node: Y,
        top: Y.scrollTop,
        left: Y.scrollLeft
      })),
      x: scrollX,
      y: scrollY,
      background: Z.map((Y) => ({
        node: Y,
        inert: Y.inert
      }))
    }, p = C.main === "playlist" ? s : u, C.background.forEach(({
      node: Y
    }) => Y.inert = !0), x = !0, i.listen(document, "keydown", V, !0), i.listen(document, "scroll", I, !0), i.listen(window, "resize", U), window.visualViewport?.addEventListener("resize", U), window.visualViewport?.addEventListener("scroll", I), j(0);
  }
  function $() {
    if (!x) return;
    x = !1, D++, P(), typeof N == "function" && N(), N = 0, i.unlisten(document, "keydown", V, !0), i.unlisten(document, "scroll", I, !0), i.unlisten(window, "resize", U), window.visualViewport?.removeEventListener("resize", U), window.visualViewport?.removeEventListener("scroll", I), document.body.append(b("#tourReactRoot")), C.details.forEach(({
      node: Y,
      open: J
    }) => Y.open = J), d.showTab(C.tab), d.showMain?.(C.main), ManokaraStudio.restoreView(C.overlay), C.background.forEach(({
      node: Y,
      inert: J
    }) => Y.inert = J), C.scroll.forEach(({
      node: Y,
      top: J,
      left: ie
    }) => {
      Y.scrollTop = J, Y.scrollLeft = ie;
    }), window.scrollTo({
      left: C.x,
      top: C.y,
      behavior: "instant"
    }), (C.focus?.isConnected ? C.focus : b("#help")).focus({
      preventScroll: !0
    });
  }
  function ne(Z) {
    d = Z, f = document.querySelector("#tourReactRoot .tour-overlay"), g = f.querySelector(".tour-card"), y = f.querySelector(".tour-spotlight"), W.commands.bind("tour", {
      close: $,
      back() {
        j(M - 1);
      },
      next: Q,
      setLanguage: ManokaraI18n.setLanguage
    }), window.ManokaraTourActions = W.commands.actions("tour"), i.listen(window, "manokara:languagechange", () => {
      x && P();
    });
  }
  window.ManokaraTour = {
    init: ne,
    open: G,
    close: $,
    get active() {
      return x;
    },
    dispose() {
      $(), i.dispose();
    }
  };
})();
(() => {
  function i(g, y = 180) {
    const d = [];
    let M = !1, x = 0;
    for (const N of String(g || "").split(/\r?\n/)) {
      const D = N.match(/\[offset:([+-]?\d+)\]/i);
      D && (x = Number(D[1]) / 1e3);
      const b = [...N.matchAll(/\[(\d+):(\d{2}(?:\.\d+)?)\]/g)], w = N.replace(/\[[^\]]*\]|<[^>]*>/g, "").trim(), S = [...N.matchAll(/<(\d+):(\d{2}(?:[.:]\d+)?)>/g)], E = N.match(/\[mk-end:(\d+):(\d{2}(?:\.\d+)?)\]/), I = E ? Number(E[1]) * 60 + Number(E[2]) : null, U = N.match(/\[mk-ends:([\d.,]+)\]/), P = U ? U[1].split(",").map(Number) : [];
      if (b.length) {
        M = !0;
        const A = Number(b[0][1]) * 60 + Number(b[0][2]);
        for (const j of b) {
          const V = Number(j[1]) * 60 + Number(j[2]), Q = { t: V, x: w }, G = V - A;
          I !== null && Number.isFinite(I) && I >= A && (Q.end = I + G), S.length && (Q.words = S.map(($, ne) => {
            const Z = Number($[1]) * 60 + Number($[2].replace(":", ".")) + G, Y = { t: Z, x: N.slice($.index + $[0].length, S[ne + 1]?.index).replace(/\[[^\]]*\]/g, "") }, J = P[ne] + G;
            return P.length === S.length && Number.isFinite(J) && J >= Z && (Q.end == null || J <= Q.end + 1e-3) && (Y.end = J), Y;
          })), d.push(Q);
        }
      } else w && d.push({ t: null, x: w });
    }
    const C = Math.max(1, Number(y) || 180);
    return M ? d.forEach((N) => {
      N.t !== null && (N.t += x), N.end != null && (N.end += x), N.words?.forEach((D) => {
        D.t += x, D.end != null && (D.end += x);
      });
    }) : d.forEach((N, D) => {
      N.t = D * C / d.length;
    }), { all: d, timed: M, lines: d.filter((N) => N.t !== null).sort((N, D) => N.t - D.t) };
  }
  function u(g, y = 180) {
    const d = i(g, y).lines;
    let M = !1;
    return { lines: d.map((C, N) => {
      const D = Math.max(0, C.t), b = Math.max(D + 0.01, C.end ?? d[N + 1]?.t ?? (Number(y) || 180));
      let w;
      if (C.words?.length && C.words.map((S) => S.x).join("").trim() === C.x)
        M = !0, w = C.words.filter((S) => S.x).map((S) => {
          const E = C.words[C.words.indexOf(S) + 1], I = Math.max(D, Math.min(b, S.t));
          return { text: S.x, startTime: I, endTime: Math.max(I, Math.min(b, S.end ?? E?.t ?? b)) };
        });
      else {
        const S = C.x.match(/\s+|[^\s]+/gu) || [], E = (b - D) / Math.max(1, S.length);
        w = S.map((I, U) => ({ text: I, startTime: D + U * E, endTime: U === S.length - 1 ? b : D + (U + 1) * E }));
      }
      return { id: `manokara-${N}`, fullText: C.x, startTime: D, endTime: b, words: w };
    }), isWordByWord: M };
  }
  function s() {
    const g = [];
    return {
      record(y) {
        return Number.isFinite(y) && y >= 0 && y <= 4e3 && (g.push(y), g.length > 20 && g.shift()), this.oneWay();
      },
      oneWay() {
        if (!g.length) return 0;
        const y = [...g].sort((d, M) => d - M);
        return Math.min(2e3, y[Math.floor((y.length - 1) * 0.2)] / 2);
      }
    };
  }
  function c(g) {
    const y = String(g || "").trim();
    if (!y) return null;
    if (!/^\d+(?::\d{1,2})?(?:\.\d+)?$/.test(y)) return NaN;
    const d = y.split(":");
    return d.length === 2 && Number(d[1]) >= 60 ? NaN : d.length === 2 ? Number(d[0]) * 60 + Number(d[1]) : Number(y);
  }
  function p(g) {
    try {
      const y = new URL(g), d = y.hostname.toLowerCase().replace(/^www\./, ""), M = d === "youtu.be" ? y.pathname.slice(1).split("/")[0] : ["youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com"].includes(d) ? y.searchParams.get("v") || y.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] : null;
      return /^[\w-]{11}$/.test(M || "") ? M : null;
    } catch {
      return null;
    }
  }
  function f() {
    let g = null, y = 0, d = 0;
    const M = () => performance.now(), x = (N) => Math.min(15, Math.max(0, N - y) / 1e3), C = (N, D) => Number(N.time || 0) + (N.playing && !N.paused ? x(D) + d * (1 - Math.exp(-x(D) / 1.5)) : 0);
    return {
      accept(N, D = M(), b = 0) {
        const w = { ...N }, S = Math.min(15e3, (Number.isFinite(w.stateAgeMs) ? Math.max(0, w.stateAgeMs) : 0) + Math.max(0, Math.min(2e3, Number(b) || 0))) / 1e3, E = Number(w.time) || 0;
        w.time = E + (w.playing && !w.paused ? S : 0), w.counting && !w.paused && (w.countdownRemaining = Math.max(0, Number(w.countdownRemaining || 0) - S)), w.sampledAt = Date.now();
        const I = g && g.title === w.title && g.lrc === w.lrc && g.writerId === w.writerId && g.timelineVersion === w.timelineVersion;
        let U = 0;
        if (I && !w.counting && !g.counting && g.playing && w.playing && !g.paused && !w.paused) {
          const P = C(g, D);
          Math.abs(P - w.time) <= 0.35 && (U = w.time - P, w.time = P);
        }
        return w.stateAgeMs >= 15e3 && (w.playing = !1), g = w, d = U, y = D, w;
      },
      time(N = M()) {
        return g ? C(g, N) : 0;
      },
      age(N = M()) {
        return g ? Math.max(0, N - y) + (Number(g.stateAgeMs) || 0) : 1 / 0;
      },
      countdown(N = M()) {
        return g ? Math.max(0, Number(g.countdownRemaining || 0) - (g.paused || g.stateAgeMs >= 15e3 ? 0 : x(N))) : 0;
      }
    };
  }
  globalThis.ManokaraCore = { parseLyrics: i, foliaLyrics: u, timeValue: c, youtubeId: p, createClock: f, createLatencyEstimator: s };
})();
(() => {
  const i = { audioPower: 0, audioBass: 0, audioLowMid: 0, audioMid: 0, audioVocal: 0, audioTreble: 0 };
  function u(s, c) {
    let p, f, g, y, d = !1, M = !1, x = 0, C = null;
    const N = s.onclick, D = [];
    let b = "Share the karaoke tab with tab audio enabled. No recording.";
    const w = () => {
      if (M) return;
      const I = (U) => globalThis.ManokaraI18n?.text(U) || U;
      s.textContent = I(d ? "Stop audio reaction" : "Enable audio reaction"), c.textContent = I(b);
    };
    window.addEventListener("manokara:languagechange", w);
    const S = () => {
      x++, C = null, s.disabled = !1, D.splice(0).forEach((I) => I()), d = !1, p?.getTracks().forEach((I) => I.stop()), f?.close().catch(() => {
      }), p = f = g = y = null, b = "Share the karaoke tab with tab audio enabled. No recording.", w();
    }, E = async () => {
      if (M) return;
      if (d) {
        S();
        return;
      }
      const I = ++x;
      C = I, s.disabled = !0;
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) throw Error("Use Chrome or Edge over HTTPS / localhost to share tab audio.");
        const U = await navigator.mediaDevices.getDisplayMedia({ video: !0, audio: !0, preferCurrentTab: !0 });
        if (M || I !== x) {
          U.getTracks().forEach((A) => A.stop());
          return;
        }
        if (p = U, !p.getAudioTracks().length) throw Error("No tab audio selected. Choose the karaoke tab and enable Share tab audio.");
        const P = new AudioContext({ latencyHint: "interactive" });
        if (f = P, await P.resume(), M || I !== x) {
          P.close().catch(() => {
          });
          return;
        }
        g = f.createAnalyser(), g.fftSize = 2048, g.smoothingTimeConstant = 0.55, f.createMediaStreamSource(p).connect(g), y = new Uint8Array(g.frequencyBinCount), d = !0, p.getTracks().forEach((A) => {
          const j = () => {
            I === x && S();
          };
          A.addEventListener("ended", j, { once: !0 }), D.push(() => A.removeEventListener?.("ended", j));
        }), b = "Folia reacts to the selected tab audio. Lyrics follow the LRC timecodes.", w();
      } catch (U) {
        !M && I === x && (S(), b = U.message || "Audio sharing cancelled.", w());
      } finally {
        C === I && (C = null, s.disabled = !1);
      }
    };
    return s.onclick = E, window.addEventListener("pagehide", S, { once: !0 }), w(), {
      stop: S,
      dispose() {
        M || (M = !0, S(), window.removeEventListener?.("manokara:languagechange", w), window.removeEventListener?.("pagehide", S), s.onclick === E && (s.onclick = N));
      },
      sample() {
        if (!d || f?.state !== "running" || !g) return i;
        g.getByteFrequencyData(y);
        const I = (U, P) => {
          const A = Math.max(0, Math.floor(U * g.fftSize / f.sampleRate)), j = Math.min(y.length, Math.ceil(P * g.fftSize / f.sampleRate));
          let V = 0;
          for (let Q = A; Q < j; Q++) V += (y[Q] / 255) ** 2;
          return Math.min(1, Math.sqrt(V / Math.max(1, j - A)));
        };
        return { audioPower: I(30, 1e4), audioBass: I(30, 250), audioLowMid: I(250, 500), audioMid: I(500, 2e3), audioVocal: I(2e3, 4e3), audioTreble: I(4e3, 12e3) };
      }
    };
  }
  globalThis.ManokaraAudio = { create: u };
})();
(() => {
  const i = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]/u, u = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]+/gu, s = () => /\[[^\]\r\n]*\]|<\d{1,3}:\d{2}(?:[.:]\d+)?\s*>/g, c = (b) => String(b || "").split(/\r\n|\r|\n/);
  function p(b) {
    const w = [];
    let S = 0;
    for (const E of b.matchAll(s()))
      w.push({ text: b.slice(S, E.index), token: !1 }, { text: E[0], token: !0 }), S = E.index + E[0].length;
    return w.push({ text: b.slice(S), token: !1 }), w;
  }
  function f(b, w) {
    const S = c(b), E = c(w);
    if (S.length !== E.length) return "Keep the same number of lines as the original LRC.";
    for (let I = 0; I < S.length; I++) {
      const U = (A) => [...A.matchAll(s())].map((j) => j[0]), P = (A) => p(A).filter((j) => !j.token).map((j) => j.text).join("").trim();
      if (JSON.stringify(U(S[I])) !== JSON.stringify(U(E[I]))) return `Line ${I + 1}: keep every timestamp and metadata tag unchanged.`;
      if (!!P(S[I]) != !!P(E[I])) return `Line ${I + 1}: keep blank lyric gaps unchanged.`;
    }
    return "";
  }
  async function g(b, w, S = () => {
  }) {
    const E = String(b).split(/(\r\n|\r|\n)/), I = [];
    for (let A = 0; A < E.length; A++) {
      if (/^(?:\r\n|\r|\n)$/.test(E[A])) {
        I.push(E[A]);
        continue;
      }
      const j = [], V = p(E[A]);
      for (let Q = 0; Q < V.length; Q++) {
        const G = V[Q];
        if (G.token || !i.test(G.text)) {
          j.push(G.text);
          continue;
        }
        let $ = 0;
        for (const ne of G.text.matchAll(u))
          j.push(G.text.slice($, ne.index), await w(ne[0])), $ = ne.index + ne[0].length;
        j.push(G.text.slice($)), /^<\d/.test(V[Q + 1]?.text || "") && i.test(G.text.slice(-1)) && j.push(" ");
      }
      I.push(j.join("")), A % 20 === 0 && S(Math.round((A + 1) / E.length * 100));
    }
    const U = I.join(""), P = f(b, U);
    if (P) throw Error(P);
    return U;
  }
  const y = /* @__PURE__ */ new WeakMap();
  function d(b) {
    if (!b || typeof b != "object") return !1;
    const w = b.romaji;
    if (!w || w.source !== b.lrc || typeof w.lrc != "string" || w.lrc.length > 2e5) return !1;
    const S = y.get(b);
    if (S && S.source === b.lrc && S.result === w.lrc) return S.valid;
    const E = !f(b.lrc, w.lrc);
    return y.set(b, { source: b.lrc, result: w.lrc, valid: E }), E;
  }
  function M(b) {
    return d(b) && ["romaji", "both"].includes(b.lyricMode) ? b.lyricMode : "original";
  }
  function x(b) {
    return M(b) === "romaji" ? b.romaji.lrc : String(b?.lrc || "");
  }
  const C = (b) => M(b) === "both" ? b.romaji.lrc : "";
  function N(b) {
    const w = String(b).match(/^\s*\[ti:([^\]]+)\]/im)?.[1]?.trim() || "", S = String(b).match(/^\s*\[ar:([^\]]+)\]/im)?.[1]?.trim() || "", E = String(b).match(/^\s*\[length:\s*(\d+):(\d{2}(?:\.\d+)?)\s*\]/im), I = E && Number(E[2]) < 60 ? Number(E[1]) * 60 + Number(E[2]) : void 0;
    return { title: w, artist: S, duration: I };
  }
  const D = (b) => c(b).some((w) => p(w).some((S) => !S.token && i.test(S.text)));
  globalThis.ManokaraLyrics = { romanize: g, alignmentError: f, validRomaji: d, mode: M, displayLrc: x, secondaryLrc: C, fileMetadata: N, hasJapanese: D };
})();
(() => {
  const i = ManokaraLyrics, u = (c) => document.querySelector(c);
  function s({ imported: c = () => {
  }, changed: p = () => {
  }, convertTtml: f = null, draft: g = null } = {}) {
    const y = {
      llrc: { value: "llrc" },
      romajiLrc: { value: "romajiLrc" },
      lyricMode: { value: "lyricMode" },
      ttl: { value: "ttl" },
      lq: { value: "lq" },
      lrcEncoding: { value: "lrcEncoding" },
      romajiDetails: { open: "romajiOpen" },
      romanize: { disabled: "romanizeBusy" }
    };
    function d(v) {
      const z = u(v), _ = y[v.slice(1)];
      return !g || !_ ? z : new Proxy(z, {
        get(k, L) {
          if (_[L]) return g.get(_[L]);
          const re = k[L];
          return typeof re == "function" ? re.bind(k) : re;
        },
        set(k, L, re) {
          return _[L] ? g.set(_[L], re) : k[L] = re, !0;
        }
      });
    }
    const M = [], x = /* @__PURE__ */ new Map();
    let C = !1;
    function N(v, z, _, k) {
      v.addEventListener(z, _, k), M.push(() => v.removeEventListener(z, _, k));
    }
    function D(v, z) {
      const _ = u(v), k = _.onclick;
      _.onclick = z, M.push(() => {
        _.onclick === z && (_.onclick = k);
      });
    }
    const b = d("#llrc"), w = d("#romajiLrc"), S = d("#lyricMode"), E = u("#lyricsStatus");
    let I = "", U = 0, P = null, A = null, j = 0, V = null, Q = "";
    const G = (v, z = !1) => {
      if (C) return;
      Q = v;
      const _ = globalThis.ManokaraI18n?.text(v) || v;
      g ? g.patch({ lyricsStatus: _, lyricsError: z }) : (E.textContent = _, E.classList.toggle("error", z));
    };
    N(window, "manokara:languagechange", () => G(Q, g ? g.get("lyricsError") : E.classList.contains("error")));
    function $() {
      const v = !!w.value && I === b.value && !i.alignmentError(b.value, w.value);
      if (g) g.set("romajiAvailable", v);
      else for (const z of S.options) z.disabled = z.value !== "original" && !v;
      return v;
    }
    function ne() {
      U++, A && Y(), I = "", w.value = "", S.value = "original", d("#romajiDetails").open = !1, $(), G("Drop an LRC or TTML file here, or paste lyrics. Romaji keeps the original timing.");
    }
    function Z() {
      j++, V?.abort(), V = null, g && g.set("importBusy", !1);
    }
    N(b, "input", (v) => {
      Z(), g && g.set("llrc", v.target.value), ne(), p();
    }), N(w, "input", (v) => {
      g && g.set("romajiLrc", v.target.value);
      const z = i.alignmentError(b.value, w.value);
      $(), G(z || "Romaji edited. Add/Save the song to keep your changes.", !!z);
    }), N(S, "change", (v) => {
      g && g.set("lyricMode", v.target.value), $(), G("Display mode applies when you Add/Save this song.");
    });
    function Y() {
      A && clearTimeout(A.timer), P && P.terminate(), P = null, A = null, d("#romanize").disabled = !1;
    }
    function J() {
      if (V) {
        G("Wait for the lyric import to finish.");
        return;
      }
      const v = b.value;
      if (!v.trim()) {
        G("Paste or import Japanese lyrics first.", !0);
        return;
      }
      if (v.length > 2e5) {
        G("Lyrics exceed the 200,000-character limit.", !0);
        return;
      }
      if (!i.hasJapanese(v)) {
        G("No Japanese characters found in these lyrics.", !0);
        return;
      }
      if (A) {
        G("Romaji conversion is already running.");
        return;
      }
      const z = ++U;
      d("#romanize").disabled = !0, G("Loading the local Japanese dictionary…");
      try {
        P ||= new Worker("./manokara-romaji-worker.js");
        const _ = setTimeout(() => {
          if (!A || A.id !== z) return;
          const k = z === U;
          Y(), k && G("Conversion timed out. Check that the Japanese dictionary is deployed, then try again.", !0);
        }, 12e4);
        A = { id: z, timer: _ }, P.onerror = () => {
          if (!A || A.id !== z) return;
          clearTimeout(_);
          const k = z === U;
          Y(), k && G("Could not load the Japanese converter. Restart the updated server and reload this page.", !0);
        }, P.onmessage = ({ data: k }) => {
          if (!A || k.id !== A.id) return;
          if (k.lrc === void 0 && !k.error) {
            z === U && G(k.loading ? "Loading the local Japanese dictionary…" : `Creating Romaji… ${k.progress}%`);
            return;
          }
          if (clearTimeout(_), A = null, d("#romanize").disabled = !1, z !== U || v !== b.value) return;
          if (k.error) {
            G("Romaji conversion failed: " + k.error, !0);
            return;
          }
          const L = i.alignmentError(v, k.lrc);
          if (L) {
            G(L, !0);
            return;
          }
          I = v, w.value = k.lrc, S.value = "romaji", d("#romajiDetails").open = !0, $(), G("Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.");
        }, P.postMessage({ id: z, source: v });
      } catch (_) {
        A && clearTimeout(A.timer), Y(), G("Romaji unavailable: " + _.message, !0);
      }
    }
    D("#romanize", J), D("#exportRomaji", () => {
      if (!$()) {
        G(i.alignmentError(b.value, w.value) || "Create valid Romaji before downloading.", !0);
        return;
      }
      const v = (d("#ttl").value.trim() || "lyrics").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 100), z = URL.createObjectURL(new Blob([w.value], { type: "text/plain;charset=utf-8" })), _ = document.createElement("a");
      _.href = z, _.download = v + ".romaji.lrc", document.body.appendChild(_), _.click(), _.remove(), x.set(z, setTimeout(() => {
        x.delete(z), URL.revokeObjectURL(z);
      }, 3e4)), G("Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.");
    }), D("#lyricsify", () => {
      const v = d("#lq").value.trim() || d("#ttl").value.trim(), z = new URL("https://www.lyricsify.com/" + (v ? "search" : "lrc"));
      v && z.searchParams.set("q", v), window.open(z.href, "_blank", "noopener"), G("Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.");
    });
    async function ie(v) {
      if (!v) return;
      if (!/\.(lrc|ttml)$/i.test(v.name)) {
        G("Choose an .lrc or .ttml file.", !0);
        return;
      }
      const z = /\.ttml$/i.test(v.name);
      if (v.size > (z ? 5e5 : 512e3)) {
        G("Lyric file is too large (maximum 500 KB).", !0);
        return;
      }
      Z(), A && Y();
      const _ = j, k = U, L = b.value, re = new AbortController();
      V = re, g && g.set("importBusy", !0), G(z ? "Reading TTML…" : "Reading LRC…");
      const de = () => !C && _ === j && k === U && L === b.value && !re.signal.aborted;
      try {
        const ge = new Uint8Array(await v.arrayBuffer()), Ae = d("#lrcEncoding").value;
        let xe, he = Ae;
        if (Ae === "auto")
          if (ge[0] === 255 && ge[1] === 254)
            xe = new TextDecoder("utf-16le", { fatal: !0 }).decode(ge), he = "UTF-16LE";
          else if (ge[0] === 254 && ge[1] === 255)
            xe = new TextDecoder("utf-16be", { fatal: !0 }).decode(ge), he = "UTF-16BE";
          else try {
            xe = new TextDecoder("utf-8", { fatal: !0 }).decode(ge), he = "UTF-8";
          } catch {
            xe = new TextDecoder("shift_jis", { fatal: !0 }).decode(ge), he = "Shift_JIS";
          }
        else xe = new TextDecoder(Ae, { fatal: !0 }).decode(ge);
        if (xe.length > (z ? 5e5 : 2e5) || /\u0000/.test(xe)) throw Error("Invalid or oversized text. Check the file encoding.");
        if (!de()) return;
        let Ne = null;
        if (z) {
          if (!f) throw Error("Restart the updated server to import TTML files.");
          if (Ne = await f(xe, re.signal), !de()) return;
          if (typeof Ne?.syncedLyrics != "string" || Ne.syncedLyrics.length > 2e5) throw Error("Could not read this TTML file. Check its XML format.");
          xe = Ne.syncedLyrics;
        }
        b.value = xe, ne(), p();
        const Se = i.fileMetadata(xe);
        c(Se, v.name, Ne), G(z ? "TTML imported. Review the lyrics, then Add/Save." : `Imported ${v.name} (${he}). Original timestamps and offset tags are retained.`);
      } catch (ge) {
        de() && G("Import failed: " + (ge.name === "TimeoutError" ? "TTML import took too long. Try again." : ge.message), !0);
      } finally {
        _ === j && (V = null, g && g.set("importBusy", !1));
      }
    }
    D("#importLrc", () => u("#lrcFile").click()), N(u("#lrcFile"), "change", (v) => {
      const z = v.target.files[0];
      v.target.value = "", ie(z);
    });
    const ce = u("#lyricDraft");
    let te = 0;
    return N(ce, "dragenter", (v) => {
      [...v.dataTransfer.types].includes("Files") && (v.preventDefault(), te++, ce.classList.add("dragging"));
    }), N(ce, "dragover", (v) => {
      [...v.dataTransfer.types].includes("Files") && (v.preventDefault(), v.dataTransfer.dropEffect = "copy");
    }), N(ce, "dragleave", () => {
      --te <= 0 && (te = 0, ce.classList.remove("dragging"));
    }), N(ce, "drop", (v) => {
      if (v.dataTransfer.files.length) {
        if (v.preventDefault(), te = 0, ce.classList.remove("dragging"), v.dataTransfer.files.length !== 1) {
          G("Import one lyric file at a time.", !0);
          return;
        }
        ie(v.dataTransfer.files[0]);
      }
    }), ne(), {
      reset() {
        Z(), ne();
      },
      load(v) {
        Z(), ne(), i.validRomaji(v) ? (I = b.value, w.value = v.romaji.lrc, S.value = i.mode(v), $(), d("#romajiDetails").open = S.value !== "original", G("Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.")) : v.romaji && G("Saved Romaji no longer matches this LRC. Create Romaji again.", !0);
      },
      read() {
        const v = $();
        if (S.value !== "original" && !v) throw Error(i.alignmentError(b.value, w.value) || "Create Romaji again after changing the original lyrics.");
        return { lyricMode: S.value, romaji: v ? { source: b.value, lrc: w.value } : void 0 };
      },
      // Search results replace the source, so a translation from the previous source is invalid.
      sourceReplaced() {
        Z(), ne();
      },
      dispose() {
        if (!C) {
          Z(), C = !0, U++, Y(), M.splice(0).reverse().forEach((v) => v());
          for (const [v, z] of x)
            clearTimeout(z), URL.revokeObjectURL(v);
          x.clear();
        }
      }
    };
  }
  window.ManokaraLyricsEditor = { create: s };
})();
window.ManokaraSession = (() => {
  let i;
  const u = async (f, g, y = {}) => await fetch(f, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(g),
    credentials: "same-origin",
    signal: AbortSignal.timeout(8e3),
    ...y
  }), s = async () => {
    const f = new URL(location.href), g = await u("/__session", {});
    if (!g.ok) {
      const x = await g.json();
      throw new Error(x.error || "Could not open your browser session.");
    }
    let y = f.searchParams.get("room");
    try {
      y ||= localStorage.getItem("manokaraRelayRoom");
    } catch {
    }
    /^[a-f0-9]{32}$/.test(y || "") || (y = null);
    let d = await u("/__room", { room: y });
    if (d.status === 404) {
      let x;
      try {
        x = localStorage.getItem("manokaraRelayRoom");
      } catch {
      }
      x !== y && /^[a-f0-9]{32}$/.test(x || "") && (d = await u("/__room", { room: x })), d.status === 404 && (d = await u("/__room", { room: null }));
    }
    const M = await d.json();
    if (!d.ok) throw new Error(M.error || "Could not open a room.");
    i = M;
    try {
      localStorage.setItem("manokaraRelayRoom", i.room);
    } catch {
    }
    return f.searchParams.set("room", i.room), f.hash = "", history.replaceState(history.state, "", f), i;
  }, c = navigator.locks ? navigator.locks.request("manokara-room", s) : s();
  return c.catch(() => {
  }), { ready: c, api: u, obsUrl: (f, g = "lyrics") => {
    const y = new URL(g === "playlist" ? "/manokara-playlist.html" : "/manokara-obs.html", location.origin);
    return y.searchParams.set("room", i.room), f && y.searchParams.set("popup", "1"), y.hash = new URLSearchParams({ view: i.viewToken }).toString(), y.href;
  }, async rotate() {
    await c;
    const f = await u("/__room/rotate", { room: i.room }), g = await f.json();
    if (!f.ok) throw new Error(g.error || "Could not replace the OBS link.");
    i.viewToken = g.viewToken;
  } };
})();
const Os = ["glass", "paper", "minimal", "card", "vinyl", "signal"], Qf = /* @__PURE__ */ new Set(["tempera", "sonnet", "lumiere", "hanabi", "clean", "word-pop", "neon", "glitch"]), Ao = (i) => Qf.has(i?.effect) && !i.centerFree, _r = (i) => JSON.parse(JSON.stringify(i)), vn = (i, u, s, c) => Number.isFinite(Number(i)) ? Math.min(c, Math.max(s, Number(i))) : u, bs = (i, u) => /^#[\da-f]{6}$/i.test(i || "") ? i : u;
function _o(i = "glass") {
  const u = (p, f, g, y, d, M) => ({ x: p, y: f, w: g, h: y, size: d, label: M, visible: !0, align: "left", bold: !1 }), s = {
    version: 1,
    width: 1920,
    height: 1080,
    lyric: { x: 0, y: 0, w: 1920, h: 1080, visible: !0 },
    lyricCompact: { x: 160, y: 800, w: 1600, h: 240, visible: !0, autoFit: !0 },
    playlist: {
      theme: Os.includes(i) ? i : "glass",
      foreground: "#ffffff",
      accent: "#b9dcc7",
      background: "#15221d",
      opacity: 0.72,
      radius: 22,
      font: "system",
      limit: 8,
      listMode: "all",
      numbering: !0,
      progress: !0,
      hideIdle: !1,
      layout: "separate",
      group: { x: 88, y: 88, w: 640, h: 840, visible: !0 },
      autoScroll: !1,
      scrollSpeed: 24,
      scrollPause: 2,
      blocks: { current: u(88, 88, 640, 280, 42, "Now Singing"), list: u(88, 384, 440, 528, 27, "Song List"), next: u(544, 384, 360, 208, 29, "Next On") }
    }
  }, c = s.playlist;
  return i === "paper" && (c.foreground = "#433c35", c.background = "#faf3df", c.accent = "#aa5139", c.opacity = 0.97, c.radius = 3, c.font = "serif", c.blocks = { current: u(96, 88, 580, 288, 42, "Now Singing"), list: u(96, 392, 580, 504, 28, "Song List"), next: u(700, 120, 320, 264, 30, "Next On") }), i === "minimal" && (c.opacity = 0, c.radius = 0, c.font = "geist", c.accent = "#e4f0ca", c.blocks = { current: u(96, 96, 760, 248, 52, "Now Singing"), list: u(96, 360, 560, 528, 30, "Song List"), next: u(96, 912, 760, 112, 28, "Next On") }), i === "card" && (c.accent = "#dfc3f9", c.background = "#211b32", c.radius = 28, c.opacity = 0.93, c.blocks = { current: u(96, 88, 460, 580, 38, "Now Singing"), list: u(580, 88, 460, 580, 27, "Song List"), next: u(96, 692, 460, 164, 29, "Next On") }), i === "vinyl" && (c.accent = "#efca92", c.background = "#29241f", c.opacity = 0.94, c.radius = 18, c.blocks = { current: u(96, 88, 940, 336, 42, "Now Singing"), list: u(96, 448, 520, 504, 27, "Song List"), next: u(640, 448, 396, 208, 30, "Next On") }), i === "signal" && (c.accent = "#8ee3dd", c.background = "#10282b", c.opacity = 0.92, c.radius = 16, c.blocks = { current: u(80, 836, 1100, 164, 38, "Now Singing"), list: u(80, 216, 560, 580, 28, "Song List"), next: u(1196, 836, 644, 164, 30, "Next On") }, c.blocks.list.visible = !1), s;
}
function mi(i) {
  const u = _o();
  let s = i;
  try {
    typeof s == "string" && (s = JSON.parse(s));
  } catch {
    s = null;
  }
  if (!s || typeof s != "object") return u;
  u.width = Math.round(vn(s.width, 1920, 320, 3840)), u.height = Math.round(vn(s.height, 1080, 240, 2160));
  function c(g, y) {
    g = g || {};
    const d = vn(g.w, Math.min(y.w, u.width), 32, u.width), M = vn(g.h, Math.min(y.h, u.height), 32, u.height);
    return { ...y, x: vn(g.x, Math.min(y.x, u.width - d), 0, u.width - d), y: vn(g.y, Math.min(y.y, u.height - M), 0, u.height - M), w: d, h: M, visible: g.visible !== !1 };
  }
  u.lyric = c(s.lyric, u.lyric), u.lyricCompact = { ...c(s.lyricCompact, u.lyricCompact), autoFit: s.lyricCompact?.autoFit !== !1 };
  const p = s.playlist || {}, f = u.playlist;
  f.theme = Os.includes(p.theme) ? p.theme : "glass", f.foreground = bs(p.foreground, f.foreground), f.accent = bs(p.accent, f.accent), f.background = bs(p.background, f.background), f.opacity = vn(p.opacity, f.opacity, 0, 1), f.radius = vn(p.radius, f.radius, 0, 80), f.font = ["system", "geist", "serif", "mono"].includes(p.font) ? p.font : "system", f.limit = Math.round(vn(p.limit, 8, 1, 20)), f.listMode = ["all", "upcoming", "history"].includes(p.listMode) ? p.listMode : "all", f.numbering = p.numbering !== !1, f.progress = p.progress !== !1, f.hideIdle = p.hideIdle === !0, f.layout = p.layout === "unified" ? "unified" : "separate", f.group = c(p.group, f.group), f.autoScroll = p.autoScroll === !0, f.scrollSpeed = vn(p.scrollSpeed, 24, 8, 80), f.scrollPause = vn(p.scrollPause, 2, 0, 10);
  for (const g of ["current", "list", "next"]) {
    const y = p.blocks?.[g] || {}, d = f.blocks[g];
    f.blocks[g] = { ...c(y, d), size: vn(y.size, d.size, 12, 96), label: String(y.label ?? d.label).slice(0, 80), align: ["left", "center", "right"].includes(y.align) ? y.align : "left", bold: y.bold === !0 };
  }
  return u;
}
const Ns = (i, u) => Object.assign(i.style, { left: u.x + "px", top: u.y + "px", width: u.w + "px", height: u.h + "px" });
let nd, Ps = "", rd;
document.fonts?.addEventListener("loadingdone", () => {
  Ps = "";
});
function Xf(i, u) {
  if (!Ao(u)) return i.lyric;
  const s = i.lyricCompact;
  if (!s.autoFit) return s;
  const [c, ...p] = String(u.googleFont || "").split(":"), f = p.join(":"), g = c && (!f || /^[\w;@_-]+$/.test(f)) ? "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(c).replace(/%20/g, "+") + (f ? ":" + f : "") + "&display=swap" : "", y = document.getElementById("manokara-measure-font");
  if (g) {
    if (!y || y.getAttribute("href") !== g) {
      const N = y || document.createElement("link");
      N.id = "manokara-measure-font", N.rel = "stylesheet", N.href = g, y || document.head.append(N);
    }
  } else y?.remove();
  const d = Math.max(24, Math.min(160, Number(u.size) || 64)), M = JSON.stringify([i.width, i.height, u.lrc, u.romajiLrc, u.title, u.font, u.googleFont, u.bold, d]);
  if (M !== Ps) {
    let j = function(ne, Z) {
      N.font = b + " " + d * Z + "px " + D;
      let Y = 1, J = 0;
      for (const ie of ne.split(/(\s+)/)) {
        const ce = N.measureText(ie).width;
        J && J + ce > A && (Y++, J = 0), ce > A ? (Y += Math.ceil(ce / A) - 1, J = ce % A) : J += ce;
      }
      return Y;
    };
    Ps = M, nd ??= document.createElement("canvas");
    const N = nd.getContext("2d"), D = u.font || 'system-ui,"Yu Gothic",sans-serif', b = u.bold === !1 ? 400 : 800, w = ManokaraCore.parseLyrics(u.lrc || "", u.duration).lines.map((ne) => ne.x).filter(Boolean);
    w.length || w.push(u.title || "Your song, your stage");
    const S = ManokaraCore.parseLyrics(u.romajiLrc || "", u.duration).lines.map((ne) => ne.x).filter(Boolean), E = Math.ceil(d * 0.65), I = Math.max(80, i.width * 0.92 - E * 2);
    N.font = b + " " + d + "px " + D;
    const U = Math.max(...w.map((ne) => N.measureText(ne).width), ...S.map((ne) => N.measureText(ne).width * 0.48)), P = Math.min(i.width, Math.max(160, Math.min(I, U) + E * 2)), A = Math.max(1, P - E * 2), V = Math.max(...w.map((ne) => j(ne, 1))), Q = w.length > 1 ? Math.max(...w.map((ne) => j(ne, 0.55))) : 0, G = S.length ? Math.max(...S.map((ne) => j(ne, 0.48))) : 0, $ = Math.min(i.height, Math.max(96, Math.ceil(E * 2 + d * 1.15 * (V + Q * 0.55 + G * 0.48) + d * 0.4 * ((Q ? 1 : 0) + (G ? 1 : 0)))));
    rd = { w: P, h: $ };
  }
  const { w: x, h: C } = rd;
  return { ...s, w: x, h: C, x: Math.max(0, Math.min(i.width - x, s.x + (s.w - x) / 2)), y: Math.max(0, Math.min(i.height - C, s.y + s.h - C)) };
}
function Zf(i, u, s) {
  const c = Math.min(u.clientWidth / s.width, u.clientHeight / s.height) || 1;
  return Object.assign(i.style, { width: s.width + "px", height: s.height + "px", transform: "scale(" + c + ")", left: (u.clientWidth - s.width * c) / 2 + "px", top: (u.clientHeight - s.height * c) / 2 + "px" }), c;
}
const ep = { system: 'system-ui,"Yu Gothic",sans-serif', geist: '"Geist Variable",system-ui,sans-serif', serif: 'Georgia,"Yu Mincho",serif', mono: '"Cascadia Code",Consolas,monospace' };
function tp(i) {
  const u = document.createElement("div");
  u.className = "playlist-output", i.appendChild(u);
  const s = document.createElement("div");
  s.className = "playlist-group", u.append(s);
  const c = {};
  let p = "", f = "", g = "", y = _o(), d = {}, M, x, C, N = !0, D, b = "";
  const w = matchMedia("(prefers-reduced-motion: reduce)");
  for (const Q of ["current", "list", "next"]) {
    const G = document.createElement("section");
    G.className = "playlist-block", G.dataset.block = Q;
    const $ = document.createElement("h2"), ne = document.createElement("div");
    ne.className = "playlist-content", G.append($, ne), u.append(G), c[Q] = { node: G, heading: $, content: ne };
  }
  const S = (Q, G, $) => {
    const ne = document.createElement(Q);
    return ne.textContent = G, $ && (ne.className = $), ne;
  }, E = document.createElement("div");
  E.className = "playlist-list-track", c.list.content.append(E);
  function I(Q) {
    const G = Q.playlist, $ = G.layout === "unified";
    if (u.dataset.layout = G.layout, s.hidden = !$, $) {
      Object.assign(s.style, { left: G.group.x + "px", top: G.group.y + "px", width: "640px", height: "840px", transform: "scale(" + G.group.w / 640 + "," + G.group.h / 840 + ")" });
      const ne = ["current", "list", "next"].filter((ie) => G.blocks[ie].visible);
      let Z = 0;
      const Y = { current: 280, next: 160 }, J = ne.reduce((ie, ce) => ie + (Y[ce] || 0), 0);
      for (const ie of ["current", "list", "next"]) {
        const ce = c[ie].node;
        ce.parentElement !== s && s.append(ce);
        const te = ie === "list" ? 840 - J : ie === "current" && !ne.includes("list") ? 840 - (ne.includes("next") ? 160 : 0) : Y[ie];
        Ns(ce, { x: 0, y: Z, w: 640, h: ne.length === 1 ? 840 : te }), G.blocks[ie].visible && (Z += ne.length === 1 ? 840 : te);
      }
    } else for (const [ne, { node: Z }] of Object.entries(c))
      Z.parentElement !== u && u.append(Z), Ns(Z, G.blocks[ne]);
  }
  function U() {
    D?.cancel(), D = null, b = "", E.style.transform = "";
  }
  function P() {
    const { node: Q, heading: G, content: $ } = c.list;
    if (Q.hidden) {
      N = !1;
      return;
    }
    if (!Q.clientHeight) return;
    $.style.fontSize = "", $.style.height = "";
    const ne = getComputedStyle(Q), Z = getComputedStyle(G), Y = Q.clientHeight - parseFloat(ne.paddingTop) - parseFloat(ne.paddingBottom) - G.offsetHeight - parseFloat(Z.marginBottom);
    if (y.playlist.autoScroll && !w.matches) {
      $.style.height = Math.max(0, Y) + "px", $.dataset.scroll = "true";
      const J = Math.max(0, E.scrollHeight - Math.max(0, Y));
      if (J > 1) {
        const ie = y.playlist, ce = JSON.stringify([J, ie.scrollSpeed, ie.scrollPause]);
        if (ce !== b) {
          const te = D ? (D.currentTime || 0) / D.effect.getTiming().duration % 1 : 0;
          U(), b = ce;
          const v = J / ie.scrollSpeed, z = ie.scrollPause, _ = 2 * (v + z), k = "translateY(-" + J + "px)";
          D = E.animate([{ transform: "translateY(0)", offset: 0 }, { transform: "translateY(0)", offset: z / _ }, { transform: k, offset: (z + v) / _ }, { transform: k, offset: (2 * z + v) / _ }, { transform: "translateY(0)", offset: 1 }], { duration: _ * 1e3, iterations: 1 / 0, easing: "linear" }), D.currentTime = te * _ * 1e3;
        }
      } else U();
    } else {
      delete $.dataset.scroll, U();
      let J = parseFloat(getComputedStyle(Q).fontSize);
      for (let ie = 0; ie < 2 && Y > 0 && $.scrollHeight > Y && J > 12; ie++)
        J = Math.max(12, J * Y / $.scrollHeight * 0.97), $.style.fontSize = J + "px";
    }
    N = !1;
  }
  function A(Q, G) {
    y = mi(Q), d = G || {};
    const $ = y.playlist, ne = JSON.stringify($);
    if (ne !== p) {
      p = ne, N = !0, u.dataset.theme = $.theme, u.style.color = $.foreground, u.style.fontFamily = ep[$.font], u.style.setProperty("--playlist-accent", $.accent), u.style.setProperty("--playlist-surface", $.background + Math.round($.opacity * 255).toString(16).padStart(2, "0")), u.style.setProperty("--playlist-radius", $.radius + "px"), I(y);
      for (const [k, { node: L, heading: re }] of Object.entries(c)) {
        const de = $.blocks[k], ge = $.layout === "unified" ? Math.min(y.width / 1920, y.height / 1080) : 1;
        L.style.fontSize = de.size / ge + "px", L.style.textAlign = de.align, L.style.fontWeight = de.bold ? "700" : "400", L.dataset.bold = String(de.bold), re.textContent = de.label;
      }
    }
    const Z = !!d.now;
    u.hidden = $.hideIdle && !Z || $.layout === "unified" && (!$.group.visible || !Object.values($.blocks).some((k) => k.visible));
    for (const [k, { node: L }] of Object.entries(c)) L.hidden = !$.blocks[k].visible;
    u.dataset.playing = d.status === "playing" ? "true" : "false";
    const Y = { playing: "●", paused: "Ⅱ", counting: "…", mc: "MC", ready: "○" }[d.status] || "○";
    C && C.textContent !== Y && (C.textContent = Y);
    const J = $.autoScroll && !w.matches, ie = JSON.stringify([d.now, d.next, d.videoId, d.currentIndex, d.nextIndex, d.songs, d.history, $.theme, $.progress, $.numbering, $.listMode, $.limit, J]);
    if (ie === f) {
      N && P();
      return;
    }
    f = ie, N = !0;
    const ce = c.current.content;
    if (ce.replaceChildren(), M = null, x = null, C = null, ["card", "vinyl", "signal"].includes($.theme)) {
      const k = document.createElement("div");
      k.className = "playlist-art";
      const L = S("div", "", "playlist-art-fallback");
      if (L.setAttribute("aria-hidden", "true"), L.append(S("span", "m", "playlist-art-monogram")), k.append(L), /^[\w-]{11}$/.test(d.videoId || "")) {
        const re = document.createElement("img");
        re.alt = "", re.referrerPolicy = "no-referrer", re.src = "https://i.ytimg.com/vi/" + d.videoId + "/mqdefault.jpg", re.addEventListener("error", () => re.remove(), { once: !0 }), k.append(re);
      }
      ce.append(k);
    }
    if (ce.append(S("div", d.now || "—", "playlist-song-title")), Z && (C = S("small", Y, "playlist-state"), ce.append(C)), $.numbering && d.currentIndex >= 0 && ce.append(S("small", String(d.currentIndex + 1).padStart(2, "0"), "playlist-position")), $.progress) {
      const k = S("div", "", "playlist-progress");
      M = S("i", ""), k.append(M), x = S("small", "", "playlist-time"), ce.append(k, x);
    }
    let te = Array.isArray(d.songs) ? d.songs : [];
    $.listMode === "upcoming" && (te = te.filter((k) => k.index >= d.nextIndex && d.nextIndex >= 0)), $.listMode === "history" && (te = Array.isArray(d.history) ? d.history : []);
    let v = 0;
    if ($.listMode === "all") {
      const k = te.findIndex((L) => L.index === d.currentIndex);
      k >= $.limit && (v = Math.floor(k / $.limit) * $.limit);
    }
    const z = J ? te.slice(0, 120) : te.slice(v, v + $.limit), _ = JSON.stringify([z, $.numbering]);
    if (_ !== g) {
      g = _, U(), E.replaceChildren();
      for (const k of z) {
        const L = S("div", "", "playlist-list-row");
        L.dataset.index = String(k.index), $.numbering && L.append(S("span", String(k.index + 1).padStart(2, "0"), "playlist-index")), L.append(S("span", k.title, "playlist-list-title")), E.append(L);
      }
      E.childNodes.length || E.append(S("div", "—", "playlist-empty"));
    }
    for (const k of E.querySelectorAll(".playlist-list-row")) k.dataset.current = String(Number(k.dataset.index) === d.currentIndex && $.listMode !== "history");
    c.next.content.replaceChildren(S("div", d.next || "—", "playlist-song-title")), $.numbering && d.nextIndex >= 0 && c.next.content.append(S("span", String(d.nextIndex + 1).padStart(2, "0"), "playlist-next-number")), P();
  }
  function j(Q, G) {
    if (!M) return;
    const $ = Math.max(0, Number(Q) || 0), ne = Math.max(0, Number(G) || 0);
    M.style.transform = "scaleX(" + Math.min(1, ne ? $ / ne : 0) + ")";
    const Z = (J) => Math.floor(J / 60) + ":" + String(Math.floor(J % 60)).padStart(2, "0"), Y = Z($) + (ne ? " / " + Z(ne) : "");
    x.textContent !== Y && (x.textContent = Y);
  }
  const V = () => {
    f = "", N = !0, A(y, d);
  };
  return w.addEventListener("change", V), { root: u, nodes: c, render: A, tick: j, place: I, destroy: () => {
    U(), w.removeEventListener("change", V), u.remove();
  } };
}
window.ManokaraOverlay = { themes: Os, defaults: _o, normalize: mi, clone: _r, geometry: Ns, fit: Zf, createPlaylist: tp, compactLyrics: Ao, lyricRect: Xf };
const cr = (i, u, s) => Math.min(s, Math.max(u, i)), Bo = (i) => Number.isFinite(i) ? i : 0, np = Object.freeze(["nw", "n", "ne", "e", "se", "s", "sw", "w"]);
function id(i, u, s, c) {
  return {
    ...i,
    x: cr(i.x + Bo(u), 0, c.width - i.w),
    y: cr(i.y + Bo(s), 0, c.height - i.h)
  };
}
function ad(i, u, s, c, p, f) {
  if (!np.includes(u)) return { ...i };
  s = Bo(s), c = Bo(c);
  const { x: g, y, w: d, h: M } = i, x = u.includes("w"), C = u.includes("e"), N = u.includes("n"), D = u.includes("s");
  if (p) {
    const I = x ? -1 : C ? 1 : 0, U = N ? -1 : D ? 1 : 0, P = x ? g + d : C ? g : g + d / 2, A = N ? y + M : D ? y : y + M / 2, j = 1 + (I && U ? (I * s * d + U * c * M) / (d * d + M * M) : I ? I * s / d : U * c / M), V = x ? P : C ? f.width - P : 2 * Math.min(P, f.width - P), Q = N ? A : D ? f.height - A : 2 * Math.min(A, f.height - A), G = cr(j, Math.max(32 / d, 32 / M), Math.min(V / d, Q / M)), $ = d * G, ne = M * G;
    return {
      ...i,
      x: x ? P - $ : C ? P : P - $ / 2,
      y: N ? A - ne : D ? A : A - ne / 2,
      w: $,
      h: ne
    };
  }
  const b = g + d, w = y + M, S = x ? cr(g + s, 0, b - 32) : g, E = N ? cr(y + c, 0, w - 32) : y;
  return {
    ...i,
    x: S,
    y: E,
    w: (C ? cr(b + s, S + 32, f.width) : b) - S,
    h: (D ? cr(w + c, E + 32, f.height) : w) - E
  };
}
function rp(i, u, s, c, p) {
  if (!["w", "h"].includes(u) || !Number.isFinite(s)) return { ...i };
  if (!c) return { ...i, [u]: cr(s, 32, u === "w" ? p.width - i.x : p.height - i.y) };
  const f = cr(
    s / i[u],
    Math.max(32 / i.w, 32 / i.h),
    Math.min((p.width - i.x) / i.w, (p.height - i.y) / i.h)
  );
  return { ...i, w: i.w * f, h: i.h * f };
}
function vd(i, u, s) {
  const c = _r(i), p = u / c.width, f = s / c.height;
  for (const g of [c.lyric, c.lyricCompact, c.playlist.group, ...Object.values(c.playlist.blocks)])
    g.x *= p, g.y *= f, g.w *= p, g.h *= f, g.size && (g.size *= Math.min(p, f));
  return c.width = u, c.height = s, mi(c);
}
function od(i, u, s = !1) {
  const c = _r(i), p = vd(_o(u), c.width, c.height).playlist;
  for (const f of ["layout", "autoScroll", "scrollSpeed", "scrollPause"]) p[f] = c.playlist[f];
  return s || (p.group = _r(c.playlist.group)), p.layout === "unified" && (p.blocks.list.visible = !0), c.playlist = p, mi(c);
}
function ip(i = 30) {
  const u = [], s = [];
  function c(p, f) {
    p.push(f), p.length > i && p.shift();
  }
  return {
    record(p) {
      c(u, p), s.length = 0;
    },
    undo(p) {
      return u.length ? (c(s, p), u.pop()) : null;
    },
    redo(p) {
      return s.length ? (c(u, p), s.pop()) : null;
    },
    get canUndo() {
      return u.length > 0;
    },
    get canRedo() {
      return s.length > 0;
    }
  };
}
const Ss = /* @__PURE__ */ new Set(["x", "y", "w", "h"]), ap = /* @__PURE__ */ new Set(["size", "label", "align", "bold", "visible"]), op = /* @__PURE__ */ new Set([
  "foreground",
  "accent",
  "background",
  "opacity",
  "radius",
  "font",
  "limit",
  "listMode",
  "numbering",
  "progress",
  "hideIdle",
  "autoScroll",
  "scrollSpeed",
  "scrollPause"
]);
function Sa(i) {
  if (i && typeof i == "object" && !Object.isFrozen(i)) {
    Object.freeze(i);
    for (const u of Object.values(i)) Sa(u);
  }
  return i;
}
function lp({
  repository: i,
  preferences: u,
  getScene: s = () => ({}),
  measureLyrics: c = (g, y) => Ao(y) ? g.lyricCompact : g.lyric,
  platform: p = globalThis,
  now: f = () => performance.now()
} = {}) {
  const g = Fr(p, f), y = ip(), d = /* @__PURE__ */ new Set();
  let M;
  try {
    M = i?.load().value;
  } catch {
  }
  let x = Sa(mi(M)), C = x, N = JSON.stringify(x), D = "playlist", b = "current", w = !0, S = null;
  try {
    w = u?.get("aspectLock") !== "false";
  } catch {
  }
  let E = !1, I = null, U, P;
  function A(v, z) {
    P = Object.freeze({
      document: x,
      target: D,
      selected: b,
      aspectLocked: w,
      serialized: N,
      dirty: E,
      saveError: I,
      canUndo: y.canUndo,
      canRedo: y.canRedo,
      dragging: !!S
    });
    for (const _ of d) _(P, { kind: v, ...z });
  }
  function j() {
    return D === "playlist" && x.playlist.layout === "unified";
  }
  function V() {
    return Ao(s());
  }
  function Q(v = x, z = V()) {
    return D === "lyrics" ? z ? v.lyricCompact : v.lyric : v.playlist.layout === "unified" ? v.playlist.group : v.playlist.blocks[b];
  }
  function G() {
    const v = D === "lyrics" ? c(x, s()) : Q();
    return Sa({ ...v });
  }
  function $() {
    return D === "lyrics" ? Q() : x.playlist.blocks[b];
  }
  function ne(v) {
    const z = Q(v);
    return D === "lyrics" && V() && Object.assign(z, G(), { autoFit: !1 }), z;
  }
  function Z() {
    if (g.disposed) return !E;
    if (U?.(), U = null, !E) return !0;
    let v;
    try {
      v = i?.save(_r(C));
    } catch (z) {
      v = { ok: !1, error: z };
    }
    return v?.ok ? (E = !1, I = null) : I = v?.error || new Error("Layout storage unavailable"), A("saved", { ok: !E }), !E;
  }
  function Y(v, { record: z = !0, immediate: _ = !1 } = {}) {
    v = Sa(mi(v));
    const k = JSON.stringify(v);
    return x = v, k === N ? (A("view"), !1) : (z && y.record(N), C = x, N = k, E = !0, U?.(), U = g.timeout(Z, 250), A("document"), _ && Z(), !0);
  }
  function J() {
    return S ? (x = C, S = null, A("cancel"), !0) : !1;
  }
  function ie(v, z) {
    if (g.disposed) return !1;
    J();
    const _ = _r(x);
    return v(_), Y(_, z);
  }
  function ce(v) {
    !v || g.disposed || (J(), D = v.target === "lyrics" ? "lyrics" : "playlist", b = D === "lyrics" ? "lyric" : ["current", "list", "next"].includes(v.selected) ? v.selected : "current", A("view"));
  }
  function te(v, z, _ = "") {
    return !Number.isFinite(v) || !Number.isFinite(z) ? !1 : ie((k) => {
      const L = G(), re = ne(k);
      Object.assign(re, _ ? ad(L, _, v, z, w, k) : id(L, v, z, k)), D === "lyrics" && V() && (re.autoFit = !1);
    });
  }
  return A("init"), {
    getSnapshot: () => P,
    subscribe(v) {
      return g.disposed ? () => {
      } : (d.add(v), () => d.delete(v));
    },
    get serialized() {
      return N;
    },
    get dragging() {
      return !!S;
    },
    unified: j,
    compact: V,
    displayRect: G,
    textRect: $,
    setTarget(v) {
      ce({ target: v, selected: b });
    },
    select(v) {
      g.disposed || !["current", "list", "next", "lyric", "group"].includes(v) || D === "lyrics" != (v === "lyric") && v !== "group" || (J(), v !== "group" && (b = v), A("view"));
    },
    restoreView: ce,
    setAspectLocked(v) {
      if (!g.disposed) {
        J(), w = !!v;
        try {
          u?.set("aspectLock", String(w));
        } catch {
        }
        A("view");
      }
    },
    setFrame(v) {
      const [z, _] = String(v).split("x").map(Number);
      return !Number.isFinite(z) || !Number.isFinite(_) || z < 320 || z > 3840 || _ < 240 || _ > 2160 ? !1 : ie((k) => Object.assign(k, vd(k, z, _)));
    },
    preset(v) {
      return ie((z) => Object.assign(z, od(z, v)));
    },
    reset() {
      return ie((v) => {
        D !== "lyrics" ? Object.assign(v, od(v, v.playlist.theme, !0)) : V() ? v.lyricCompact = {
          x: 0,
          y: v.height - Math.min(240, v.height),
          w: v.width,
          h: Math.min(240, v.height),
          visible: !0,
          autoFit: !0
        } : v.lyric = { x: 0, y: 0, w: v.width, h: v.height, visible: !0 };
      });
    },
    center(v) {
      return ["center", "top-center", "bottom-center"].includes(v) ? ie((z) => {
        const _ = ne(z);
        _.x = (z.width - _.w) / 2, _.y = v === "top-center" ? 0 : v === "bottom-center" ? z.height - _.h : (z.height - _.h) / 2;
      }) : !1;
    },
    setLayout(v) {
      return ie((z) => {
        if (z.playlist.layout = v, v === "unified") for (const _ of Object.values(z.playlist.blocks)) _.visible = !0;
      });
    },
    setAutoFit(v) {
      return ie((z) => Object.assign(z.lyricCompact, G(), { autoFit: !!v }));
    },
    setField(v, z) {
      return !Ss.has(v) && !ap.has(v) || (Ss.has(v) || v === "size") && !Number.isFinite(z) ? !1 : ie((_) => {
        const k = Ss.has(v) ? ne(_) : D === "lyrics" ? Q(_) : _.playlist.blocks[b];
        v === "w" || v === "h" ? Object.assign(k, rp(k, v, z, w, _)) : k[v] = z;
      });
    },
    setAppearance(v, z) {
      return op.has(v) ? ie((_) => {
        _.playlist[v] = z;
      }) : !1;
    },
    importLayout(v) {
      if (!v || v.version !== 1 || !v.playlist || !v.lyric) throw new Error("Invalid overlay layout");
      return ie((z) => Object.assign(z, mi(v)));
    },
    undo() {
      if (g.disposed) return !1;
      J();
      const v = y.undo(N);
      return v == null ? !1 : Y(v, { record: !1, immediate: !0 });
    },
    redo() {
      if (g.disposed) return !1;
      J();
      const v = y.redo(N);
      return v == null ? !1 : Y(v, { record: !1, immediate: !0 });
    },
    transform: te,
    beginGesture(v = "") {
      return g.disposed ? !1 : (J(), S = { rect: _r(G()), direction: v, locked: w, compact: V() }, A("gesture"), !0);
    },
    moveGesture(v, z) {
      if (!S || g.disposed || !Number.isFinite(v) || !Number.isFinite(z)) return !1;
      if (S.compact !== V())
        return J(), !1;
      const _ = _r(C);
      if (v || z) {
        const k = Q(_, S.compact);
        Object.assign(k, S.direction ? ad(S.rect, S.direction, v, z, S.locked, _) : id(S.rect, v, z, _)), D === "lyrics" && S.compact && (k.autoFit = !1);
      }
      return x = Sa(_), A("preview"), !0;
    },
    endGesture() {
      return !S || g.disposed ? !1 : S.compact !== V() ? (J(), !1) : (S = null, Y(x, { immediate: !0 }));
    },
    cancelGesture: J,
    flush: Z,
    dispose() {
      g.disposed || (J(), Z(), g.dispose(), d.clear());
    }
  };
}
function sp({
  model: i,
  element: u,
  scale: s,
  focus: c = () => {
  },
  platform: p = globalThis,
  now: f = () => performance.now()
}) {
  const g = Fr(p, f);
  let y = null, d = null, M = null;
  function x() {
    M?.(), M = null, d = null;
  }
  function C() {
    const w = y?.pointer;
    y = null, x(), w != null && u.hasPointerCapture(w) && u.releasePointerCapture(w);
  }
  function N() {
    M?.(), M = null;
    const w = d;
    d = null, y && w && i.moveGesture((w.x - y.x) / y.scale, (w.y - y.y) / y.scale);
  }
  function D() {
    C(), i.cancelGesture();
  }
  const b = i.subscribe((w) => {
    y && !w.dragging && C();
  });
  return {
    get active() {
      return !!y;
    },
    start(w) {
      const S = w.target.closest("[data-hit]");
      if (!S || w.button !== 0 || g.disposed) return;
      const E = s();
      if (!(E > 0)) return;
      w.preventDefault(), D(), i.select(S.dataset.hit);
      const I = w.target.closest("[data-resize]")?.dataset.resize || "";
      if (i.beginGesture(I)) {
        y = { pointer: w.pointerId, x: w.clientX, y: w.clientY, scale: E };
        try {
          u.setPointerCapture(w.pointerId);
        } catch {
          D();
        }
      }
    },
    move(w) {
      !y || y.pointer !== w.pointerId || (d = { x: w.clientX, y: w.clientY }, M || (M = g.frame(N)));
    },
    end(w) {
      if (!(!y || y.pointer !== w.pointerId)) {
        if (w.type !== "pointerup") {
          D();
          return;
        }
        d = { x: w.clientX, y: w.clientY }, N(), C(), i.endGesture(), c();
      }
    },
    cancel: D,
    dispose() {
      D(), b(), g.dispose();
    }
  };
}
const cp = (() => {
  const i = Fr(), u = ManokaraOverlay, s = lp({
    repository: et.layout,
    preferences: et.preferences,
    getScene: re,
    measureLyrics: (q, fe) => u.lyricRect(q, fe)
  });
  let c = s.getSnapshot().document, p, f, g, y, d, M, x = 1, C = "playlist", N = "current", D = "sample", b = "karaoke", w = null, S;
  const E = /* @__PURE__ */ new Set(), I = [], U = [];
  let P = performance.now(), A = "", j, V, Q = s.getSnapshot().aspectLocked;
  const G = {
    "Overlay editor": "Chỉnh overlay",
    "Design your playlist and lyrics here. OBS follows your saved layout.": "Chỉnh playlist và khung lời ngay tại đây. OBS sẽ dùng bố cục bạn đã lưu.",
    "Playlist overlay": "Overlay playlist",
    "Lyrics overlay": "Overlay lời",
    Glass: "Kính mờ",
    Paper: "Trang giấy",
    Minimal: "Tối giản",
    Card: "Thẻ bài hát",
    Vinyl: "Đĩa nhạc",
    Signal: "Thanh tín hiệu",
    "Broadcast dashboard": "Bảng setlist kính mờ",
    "A paper setlist": "Setlist trên trang giấy",
    "Let the type speak": "Chữ lớn, nền thoáng",
    "Artwork in the spotlight": "Ảnh bìa làm điểm nhấn",
    "At the turntable": "Một góc bàn đĩa",
    "A compact lower third": "Thanh nhạc ở đáy khung",
    "Output frame": "Khung đầu ra",
    "Canvas dimensions": "Kích thước khung hình",
    "Frame size": "Kích thước khung",
    "Landscape 1080p": "Khung ngang 1080p",
    "Landscape 720p": "Khung ngang 720p",
    Portrait: "Khung dọc",
    Layout: "Bố cục",
    "Panel structure": "Kiểu sắp xếp khối",
    "Choose what to edit": "Chọn khối để chỉnh",
    "Drag on preview or enter values": "Kéo ở phần xem trước hoặc nhập số",
    "Text style": "Kiểu chữ",
    "Colors and song list": "Màu sắc và danh sách bài",
    "Layout files": "Tệp bố cục",
    "Save or restore a layout": "Lưu hoặc khôi phục bố cục",
    "Layout mode": "Bố cục playlist",
    "Separate blocks": "Tách từng khối",
    "One unified panel": "Gom thành một bảng",
    "Whole playlist": "Bảng playlist",
    "Move and resize the whole panel. Select a section below to edit its text.": "Kéo và đổi kích thước cả bảng. Chọn từng phần bên dưới để chỉnh chữ.",
    "Auto-scroll song list": "Tự cuộn danh sách lên/xuống",
    "Scroll speed (px/s)": "Tốc độ cuộn (px/giây)",
    "Pause at each end (s)": "Dừng ở mỗi đầu (giây)",
    "Auto-scroll shows the whole list. Short lists stay still.": "Khi bật cuộn, toàn bộ danh sách sẽ xuất hiện lần lượt. Danh sách ngắn sẽ đứng yên.",
    "Static list limit": "Số bài khi tắt cuộn",
    Blocks: "Các khối",
    "Now Singing": "Bài đang hát",
    "Song List": "Danh sách bài",
    "Next On": "Bài tiếp theo",
    "Lyric viewport": "Vùng hiển thị lời",
    "Show this block": "Hiện khối này",
    "Position & size": "Vị trí và kích thước",
    Width: "Rộng",
    Height: "Cao",
    Typography: "Kiểu chữ",
    Heading: "Tiêu đề",
    "Text size": "Cỡ chữ",
    Alignment: "Căn chữ",
    Left: "Trái",
    Center: "Giữa",
    Right: "Phải",
    Bold: "Chữ đậm",
    Appearance: "Diện mạo",
    Text: "Chữ",
    Accent: "Màu nhấn",
    Panel: "Nền khối",
    "Panel opacity": "Độ đậm nền",
    "Corner radius": "Bo góc",
    Font: "Font",
    System: "Mặc định",
    Serif: "Có chân",
    Mono: "Đơn cách",
    "List content": "Nội dung danh sách",
    "Whole setlist": "Cả setlist",
    "Upcoming songs": "Bài sắp hát",
    "Sung history": "Các bài đã hát",
    "Visible songs": "Số bài hiển thị",
    "Show numbers": "Hiện số thứ tự",
    "Show progress": "Hiện tiến trình",
    "Hide when idle": "Ẩn khi chưa có bài đang hát",
    "Live preview": "Xem trước",
    "Sample data": "Dữ liệu mẫu",
    "Live data": "Bài đang phát",
    "Both overlays": "Cả hai overlay",
    Checkerboard: "Nền caro",
    Dark: "Nền tối",
    Light: "Nền sáng",
    "Scene guide": "Mẫu bố cục livestream",
    Undo: "Hoàn tác",
    Redo: "Làm lại",
    "Reset layout": "Đặt lại bố cục",
    "Center block": "Đặt giữa khung",
    "Copy OBS link": "Sao chép link OBS",
    "Open output": "Mở đầu ra",
    "Connecting…": "Đang kết nối…",
    "View larger": "Xem lớn",
    "Close preview": "Thu gọn",
    "Keep aspect ratio": "Giữ tỉ lệ rộng/cao",
    "No song is playing. Choose Sample data to arrange the lyrics.": "Chưa có bài đang phát. Chọn Dữ liệu mẫu để canh khung lời trước nhé.",
    "This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.": "Bài này chưa có lời LRC. Thêm lời ở Karaoke, hoặc chọn Dữ liệu mẫu để xem trước.",
    "This lyric block is hidden. Turn on Show this block to preview.": "Khung lời đang được ẩn. Bật Hiện khối này để xem trước nhé.",
    "Drag blocks to move; resize with handles. Arrow keys nudge or resize. Preview background is local; OBS remains transparent.": "Kéo khối để di chuyển, dùng tay nắm để đổi cỡ. Phím mũi tên giúp dịch hoặc đổi cỡ. Nền xem trước chỉ hiện trên trang này; OBS vẫn trong suốt.",
    "Top center": "Giữa trên",
    "Bottom center": "Giữa dưới",
    "Fit frame to lyrics": "Khung ôm sát lời",
    "Fits the longest lines in this song. Manual position or size edits turn this off.": "Khung ôm theo các câu dài nhất trong bài. Chỉnh vị trí hoặc kích thước thủ công sẽ tắt chế độ này.",
    "Text effects use a compact frame. Scene effects and Keep centre free use the full lyric viewport.": "Hiệu ứng chữ dùng khung gọn. Hiệu ứng dựng cảnh và Chừa trống giữa khung dùng vùng lời đầy đủ.",
    "Resize top left": "Kéo góc trên trái",
    "Resize top": "Kéo cạnh trên",
    "Resize top right": "Kéo góc trên phải",
    "Resize right": "Kéo cạnh phải",
    "Resize bottom right": "Kéo góc dưới phải",
    "Resize bottom": "Kéo cạnh dưới",
    "Resize bottom left": "Kéo góc dưới trái",
    "Resize left": "Kéo cạnh trái",
    "Changes saved in this browser.": "Đã lưu chỉnh sửa trong trình duyệt này.",
    "OBS link copied.": "Đã sao chép link OBS.",
    "Select and copy the link.": "Chọn rồi sao chép link nhé.",
    "Export layout": "Xuất bố cục",
    "Import layout": "Nhập bố cục",
    "Layout imported.": "Đã nhập bố cục.",
    "Could not import this layout.": "Chưa nhập được bố cục này.",
    "Playback keeps running when you switch tabs.": "Nhạc vẫn chạy khi bạn chuyển tab.",
    "Use these dimensions for both OBS Browser Sources. Keep this page open while singing.": "Dùng kích thước này cho cả hai nguồn Browser của OBS. Giữ trang mở khi hát.",
    "Lyrics effects and colors are set in Karaoke → OBS output.": "Chọn hiệu ứng và màu lời ở Karaoke → Đầu ra OBS.",
    "Lyrics appearance": "Giao diện lời hát",
    "Settings here are shared with Karaoke → OBS output.": "Chỉnh ở đây cũng cập nhật phần Đầu ra OBS trong Karaoke.",
    "Clear sung history": "Xóa lịch sử đã hát",
    "Clear the sung history for this session?": "Xóa lịch sử bài đã hát của phiên này?",
    "Preview only · no song is started": "Chỉ xem mẫu · không phát bài hát",
    "Storage unavailable. Layout remains in this window.": "Chưa lưu được vào trình duyệt. Bố cục vẫn được giữ trong cửa sổ này."
  }, $ = (q) => ManokaraI18n.language === "vi" && G[q] || q, ne = (q) => Math.round(q * 1e3) / 1e3, Z = {
    current: "Now Singing",
    list: "Song List",
    next: "Next On",
    lyric: "Lyric viewport",
    group: "Whole playlist"
  };
  function Y(q) {
    !f || i.disposed || (f.querySelector("#studioStatus").textContent = $(q));
  }
  function J() {
    s.flush();
  }
  function ie() {
    return s.unified();
  }
  function ce() {
    return s.compact();
  }
  function te() {
    return s.displayRect();
  }
  function v() {
    return s.textRect();
  }
  function z() {
    const q = b === "playlist" && C === "lyrics", fe = f.querySelector("#studioLyricControlHost");
    f.querySelector("#studioLyricSettings").hidden = !q;
    for (const {
      node: ye,
      marker: Oe
    } of U)
      q ? ye.parentElement !== fe && fe.append(ye) : ye.parentNode !== Oe.parentNode && Oe.before(ye);
  }
  function _(q) {
    f && (S?.cancel(), b = q === "playlist" ? "playlist" : "karaoke", document.getElementById("grid").hidden = b !== "karaoke", document.getElementById("playlistStudio").hidden = b !== "playlist", window.dispatchEvent(new CustomEvent("manokara:mainviewchange", {
      detail: b
    })), z(), b === "karaoke" ? (j?.open && j.close(), M?.remove(), M = null, A = "") : Se());
  }
  function k(q) {
    S?.cancel(), s.setTarget(q), window.dispatchEvent(new CustomEvent("manokara:overlaytargetchange", { detail: C }));
  }
  function L() {
    const q = (performance.now() - P) / 1e3 % 30, fe = ["I Really Want to Stay at Your House", "Open Arms", "夜に駆ける", "Một ngày bình yên", "Fly Me to the Moon", "Plastic Love", "Có em", "Pretender", "City of Stars", "Lemon", "Chúng ta của hiện tại", "Stay with Me"];
    return {
      ...w,
      ready: !0,
      title: fe[0],
      effect: w?.effect || "clean",
      lrc: w?.effect === "karaoke-classic" ? `[00:00.00]<00:00.00>Người <00:00.65>hỏi <00:01.20>anh <00:01.85>rằng <00:02.70>vì <00:03.35>sao <00:04.05>trời <00:04.85>lại <00:05.65>mưa<00:07.60>
[00:08.00]<00:08.00>Người <00:08.60>hỏi <00:09.20>vì <00:09.80>sao <00:10.40>mình <00:11.00>không <00:11.60>giữ <00:12.20>được <00:12.80>nhau <00:13.40>nữa<00:15.60>
[00:16.00]Một câu hát nối thêm một câu hát
[00:24.00]Cùng hát theo dòng lời của bạn
[00:28.00]` : `[00:00.00]Your song, your stage
[00:05.00]Let the words follow the music
[00:10.00]Một góc nhỏ cho lời hát
[00:15.00]君の歌を聞かせて
[00:20.00]Sing your way
[00:25.00]Your song, your stage`,
      romajiLrc: "",
      time: q,
      sampledAt: Date.now(),
      duration: 30,
      playing: !0,
      paused: !1,
      counting: !1,
      mc: !1,
      playlistTime: q,
      timelineVersion: 1,
      playlist: JSON.stringify({
        now: fe[0],
        next: fe[1],
        status: "playing",
        videoId: "",
        currentIndex: 0,
        nextIndex: 1,
        songs: fe.map((ye, Oe) => ({
          title: ye,
          index: Oe
        })),
        history: [{
          title: "Last song of the evening",
          index: 4
        }]
      })
    };
  }
  function re() {
    return D === "sample" ? L() : w || {
      ready: !1
    };
  }
  function de() {
    if (!g) return;
    const q = y.parentElement, fe = q.clientWidth, ye = q.clientHeight;
    if (!fe || !ye) return;
    const Oe = Math.min(fe / c.width, ye / c.height);
    y.style.width = c.width * Oe + "px", y.style.height = c.height * Oe + "px", y.style.aspectRatio = c.width + " / " + c.height, x = u.fit(g, y, c), g.style.setProperty("--studio-handle-scale", String(1 / x)), ge();
  }
  function ge() {
    for (const q of I) {
      const {
        host: fe,
        stage: ye,
        bounds: Oe,
        crop: Fe
      } = q;
      if (!fe.clientWidth || !fe.clientHeight) continue;
      const Pe = (Fe ? Math.max : Math.min)((fe.clientWidth - 16) / Oe.w, (fe.clientHeight - 12) / Oe.h);
      Object.assign(ye.style, {
        transform: "scale(" + Pe + ")",
        left: (fe.clientWidth - Oe.w * Pe) / 2 - Oe.x * Pe + "px",
        top: (fe.clientHeight - Oe.h * Pe) / 2 - Oe.y * Pe + "px"
      });
    }
  }
  function Ae() {
    for (const q of u.themes) {
      const fe = f.querySelector('[data-theme-preview="' + q + '"]'), ye = document.createElement("div");
      ye.className = "preset-canvas", fe.append(ye);
      const Oe = u.defaults(q), Fe = u.createPlaylist(ye);
      Fe.render(Oe, {
        now: "Blue hour",
        next: "Fly Me to the Moon",
        currentIndex: 0,
        nextIndex: 1,
        status: "paused",
        songs: [{
          index: 0,
          title: "Blue hour"
        }, {
          index: 1,
          title: "Fly Me to the Moon"
        }, {
          index: 2,
          title: "夜に駆ける"
        }]
      }), Fe.tick(74, 210);
      for (const Ue of ["list", "next"]) Fe.nodes[Ue].node.hidden = !0;
      const Pe = [Oe.playlist.blocks.current], we = Math.min(...Pe.map((Ue) => Ue.x)), Ie = Math.min(...Pe.map((Ue) => Ue.y)), Le = {
        x: we,
        y: Ie,
        w: Math.max(...Pe.map((Ue) => Ue.x + Ue.w)) - we,
        h: Math.max(...Pe.map((Ue) => Ue.y + Ue.h)) - Ie
      };
      q === "card" && (Le.x += 20, Le.y += 20, Le.w -= 40, Le.h = 280), I.push({
        host: fe,
        stage: ye,
        renderer: Fe,
        bounds: Le,
        crop: q === "card"
      });
    }
  }
  function xe() {
    if (j.open) {
      j.close();
      return;
    }
    const q = f.querySelector(".studio-preview-pane");
    j.append(q), j.showModal();
    const fe = q.querySelector('[data-action="expand"]'), ye = fe.querySelector("[data-studio-copy]");
    ye.dataset.studioCopy = "Close preview", ye.textContent = $("Close preview"), fe.setAttribute("aria-expanded", "true"), fe.focus(), de();
  }
  function he(q) {
    if (q && !M ? (M = document.createElement("iframe"), M.className = "studio-lyric-preview", M.title = $("Lyrics overlay"), M.allow = "autoplay", M.src = "./manokara-lyrics-view.html?preview=1", g.insertBefore(M, g.firstChild)) : !q && M && (M.remove(), M = null, A = ""), M) {
      const fe = u.lyricRect(c, re());
      u.geometry(M, fe), M.hidden = !fe.visible;
    }
  }
  function Ne() {
    if (b !== "playlist") return;
    const q = re();
    let fe = {};
    try {
      fe = JSON.parse(q.playlist || "{}");
    } catch {
    }
    d.render(c, fe), d.tick(q.playlistTime || 0, q.duration);
    const ye = f.querySelector("#studioEmpty");
    let Oe = "";
    C === "lyrics" && (te().visible ? !q.counting && !q.mc && (q.ready === !1 || !q.title ? Oe = "No song is playing. Choose Sample data to arrange the lyrics." : q.lrc?.trim() || (Oe = "This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.")) : Oe = "This lyric block is hidden. Turn on Show this block to preview.");
    const Fe = $(Oe);
    if (ye.textContent !== Fe && (ye.textContent = Fe), ye.hidden = !Oe, M) {
      const Pe = u.lyricRect(c, q);
      u.geometry(M, Pe), M.hidden = !Pe.visible;
      const we = g.querySelector('[data-hit="lyric"]');
      if (we && !S?.active && u.geometry(we, Pe), C === "lyrics" && !S?.active) {
        for (const [Ue, He] of [["x", "studioX"], ["y", "studioY"], ["w", "studioW"], ["h", "studioH"]]) {
          const Ge = f.querySelector("#" + He);
          document.activeElement !== Ge && (Ge.value = ne(Pe[Ue]));
        }
        const Le = Pe.w / Pe.h;
        f.querySelector("#studioAspectRatio").textContent = Math.abs(Le - 16 / 9) < 1e-5 ? "16:9" : Math.abs(Le - 9 / 16) < 1e-5 ? "9:16" : Math.abs(Le - 1) < 1e-5 ? "1:1" : Le.toFixed(2) + ":1";
      }
      const Ie = JSON.stringify([q.lrc, q.romajiLrc, q.effect, q.title, q.playing, q.paused, q.time, q.sampledAt, q.centerFree, q.colorTheme, q.themeSeed, q.foreground, q.size, q.font, q.bold]);
      if (Ie !== A) {
        A = Ie;
        for (const Le of E) Le(q);
      }
    }
  }
  function Se() {
    if (!f) return;
    const q = c.playlist, fe = te(), ye = v();
    z(), f.querySelectorAll("[data-target]").forEach((Le) => Le.setAttribute("aria-pressed", String(Le.dataset.target === C))), f.querySelector("#studioLayoutSection").hidden = C === "lyrics", f.querySelector("#studioGroupNote").hidden = !ie(), f.querySelector("#studioPresets").hidden = C === "lyrics", f.querySelector("#playlistAppearance").hidden = C === "lyrics", f.querySelector("#blockTypography").hidden = C === "lyrics", f.querySelector("#studioCompactSettings").hidden = C !== "lyrics", f.querySelector("#studioAutoFitField").hidden = !ce(), f.querySelector("#studioAutoFitNote").hidden = !ce(), f.querySelector("#studioAutoFit").checked = c.lyricCompact.autoFit;
    const Oe = {
      studioX: ne(fe.x),
      studioY: ne(fe.y),
      studioW: ne(fe.w),
      studioH: ne(fe.h),
      studioSize: ye.size || 64,
      studioLabel: ye.label || "",
      studioAlign: ye.align || "left",
      studioFg: q.foreground,
      studioAccent: q.accent,
      studioBg: q.background,
      studioOpacity: q.opacity,
      studioRadius: q.radius,
      studioFont: q.font,
      studioLimit: q.limit,
      studioListMode: q.listMode,
      studioFrame: c.width + "x" + c.height,
      studioLayout: q.layout,
      studioScrollSpeed: q.scrollSpeed,
      studioScrollPause: q.scrollPause
    };
    for (const [Le, Ue] of Object.entries(Oe)) {
      const He = f.querySelector("#" + Le);
      document.activeElement !== He && (He.value = Ue);
    }
    f.querySelector("#studioVisible").checked = ye.visible, f.querySelector("#studioBold").checked = !!ye.bold, f.querySelector("#studioAutoScroll").checked = q.autoScroll, f.querySelector("#studioScrollSettings").hidden = !q.autoScroll, f.querySelector("#studioLimit").disabled = q.autoScroll, f.querySelector("#studioNumbering").checked = q.numbering, f.querySelector("#studioProgress").checked = q.progress, f.querySelector("#studioHideIdle").checked = q.hideIdle, f.querySelector("#studioAspectLock").checked = Q;
    const Fe = fe.w / fe.h;
    f.querySelector("#studioAspectRatio").textContent = Math.abs(Fe - 16 / 9) < 1e-5 ? "16:9" : Math.abs(Fe - 9 / 16) < 1e-5 ? "9:16" : Math.abs(Fe - 1) < 1e-5 ? "1:1" : Fe.toFixed(2) + ":1", f.querySelectorAll("[data-theme-preset]").forEach((Le) => Le.setAttribute("aria-pressed", String(Le.dataset.themePreset === q.theme))), f.querySelector('[data-action="undo"]').disabled = !s.getSnapshot().canUndo, f.querySelector('[data-action="redo"]').disabled = !s.getSnapshot().canRedo, d.root.style.display = C === "lyrics" && !f.querySelector("#studioBoth").checked ? "none" : "", g.querySelectorAll(".studio-hit").forEach((Le) => Le.remove());
    const Pe = C === "lyrics" ? ["lyric"] : ie() ? ["group"] : ["current", "list", "next"];
    for (const Le of Pe) {
      const Ue = Le === "lyric" ? fe : Le === "group" ? q.group : q.blocks[Le];
      if (!Ue.visible) continue;
      const He = document.createElement("div");
      He.className = "studio-hit", He.dataset.hit = Le, He.tabIndex = 0, He.setAttribute("role", "group"), He.setAttribute("aria-label", $(Z[Le])), He.dataset.selected = String(Le === "group" || Le === N), u.geometry(He, Ue), He.style.zIndex = "40";
      const Ge = document.createElement("span");
      if (Ge.className = "studio-hit-label", Ge.textContent = $(Z[Le]), He.append(Ge), Le === "group" || Le === N)
        for (const [Nn, sn] of Object.entries({
          nw: "top left",
          n: "top",
          ne: "top right",
          e: "right",
          se: "bottom right",
          s: "bottom",
          sw: "bottom left",
          w: "left"
        })) {
          const Kt = document.createElement("button");
          Kt.type = "button", Kt.className = "studio-resize", Kt.dataset.resize = Nn, Kt.setAttribute("aria-label", $("Resize " + sn)), He.append(Kt);
        }
      g.append(He);
    }
    const we = f.querySelector("#studioBoth").checked;
    he(b === "playlist" && (C === "lyrics" || we)), f.querySelector("#studioSourceSize").textContent = c.width + " × " + c.height;
    const Ie = c.width / c.height;
    f.querySelector("#studioFrameBadge").textContent = c.width + " × " + c.height + " · " + (Math.abs(Ie - 16 / 9) < 1e-3 ? "16:9" : Math.abs(Ie - 9 / 16) < 1e-3 ? "9:16" : c.width + ":" + c.height), f.querySelector("#studioObsUrl").value = p.url(C === "lyrics" ? "lyrics" : "playlist") || $("Connecting…"), de(), Ne(), window.dispatchEvent(new CustomEvent("manokara:studioviewchange", {
      detail: {
        target: C,
        selected: N
      }
    }));
  }
  function je() {
    const q = te(), fe = g.querySelector('[data-hit="' + (ie() ? "group" : N) + '"]');
    fe && u.geometry(fe, q), N === "lyric" && M ? u.geometry(M, q) : ie() ? d.place(c) : d.nodes[N] && u.geometry(d.nodes[N].node, q);
    for (const [ye, Oe] of [["x", "studioX"], ["y", "studioY"], ["w", "studioW"], ["h", "studioH"]]) f.querySelector("#" + Oe).value = ne(q[ye]);
  }
  function kt(q) {
    if (f || i.disposed) return;
    p = q, f = document.getElementById("playlistStudio");
    const fe = document.getElementById("obsLyricSettingsReactRoot");
    if (fe) {
      const Pe = document.createComment("lyric-settings-home");
      fe.after(Pe), U.push({
        node: fe,
        marker: Pe
      });
    }
    g = f.querySelector("#studioCanvas"), y = f.querySelector("#studioPreview"), d = u.createPlaylist(g), Ae(), S = sp({
      model: s,
      element: y,
      scale: () => x,
      focus: () => g.querySelector('[data-hit="' + (ie() ? "group" : N) + '"]')?.focus({ preventScroll: !0 })
    }), i.own(s.subscribe((Pe, we) => {
      ({ document: c, target: C, selected: N, aspectLocked: Q } = Pe), we.kind === "saved" ? Y(we.ok ? "Changes saved in this browser." : "Storage unavailable. Layout remains in this window.") : we.kind === "preview" ? je() : (Se(), we.kind === "document" && p.changed());
    })), j = document.createElement("dialog"), j.className = "studio-large-preview", j.setAttribute("aria-labelledby", "studioPreviewTitle"), f.append(j), i.listen(j, "close", () => {
      const Pe = j.querySelector(".studio-preview-pane");
      if (!Pe) return;
      f.querySelector(".studio-body").append(Pe);
      const we = Pe.querySelector('[data-action="expand"]'), Ie = we.querySelector("[data-studio-copy]");
      Ie.dataset.studioCopy = "View larger", Ie.textContent = $("View larger"), we.setAttribute("aria-expanded", "false"), de(), b === "playlist" && we.focus({
        preventScroll: !0
      });
    }), window.ManokaraPreview = V = {
      getSnapshot: re,
      subscribe(Pe) {
        return i.disposed ? () => {
        } : (E.add(Pe), Pe(re()), () => E.delete(Pe));
      }
    }, i.listen(f, "click", async (Pe) => {
      const we = Pe.target.closest("button");
      if (!we) return;
      if (we.dataset.target) {
        k(we.dataset.target);
        return;
      }
      if (we.dataset.select) {
        s.select(we.dataset.select);
        return;
      }
      if (we.dataset.themePreset) {
        s.preset(we.dataset.themePreset);
        return;
      }
      const Ie = we.dataset.action;
      if (Ie === "expand") {
        xe();
        return;
      }
      if (["center", "top-center", "bottom-center"].includes(Ie) && s.center(Ie), Ie === "reset" && s.reset(), Ie === "undo" && s.undo(), Ie === "redo" && s.redo(), Ie === "copy") {
        const Le = p.url(C === "lyrics" ? "lyrics" : "playlist");
        if (!Le) return;
        try {
          await navigator.clipboard.writeText(Le), Y("OBS link copied.");
        } catch {
          if (!f || i.disposed) return;
          f.querySelector("#studioObsUrl").select(), Y("Select and copy the link.");
        }
      }
      if (Ie === "open") {
        const Le = p.url(C === "lyrics" ? "lyrics" : "playlist");
        if (Le) {
          const Ue = new URL(Le);
          Ue.searchParams.set("popup", "1"), window.open(Ue.href, "manokara-" + C, "width=1280,height=720");
        }
      }
      if (Ie === "history" && confirm($("Clear the sung history for this session?")) && (p.clearHistory(), Ne()), Ie === "export") {
        const Le = new Blob([JSON.stringify(c, null, 2)], {
          type: "application/json"
        }), Ue = URL.createObjectURL(Le), He = document.createElement("a");
        He.href = Ue, He.download = "manokara-overlay.json", He.click();
        const Ge = i.own(() => URL.revokeObjectURL(Ue));
        i.timeout(Ge, 1e3);
      }
      Ie === "import" && f.querySelector("#studioImport").click();
    });
    const ye = {
      studioX: "x",
      studioY: "y",
      studioW: "w",
      studioH: "h",
      studioSize: "size",
      studioLabel: "label",
      studioAlign: "align",
      studioVisible: "visible",
      studioBold: "bold"
    }, Oe = {
      studioFg: "foreground",
      studioAccent: "accent",
      studioBg: "background",
      studioOpacity: "opacity",
      studioRadius: "radius",
      studioFont: "font",
      studioLimit: "limit",
      studioListMode: "listMode",
      studioNumbering: "numbering",
      studioProgress: "progress",
      studioHideIdle: "hideIdle",
      studioAutoScroll: "autoScroll",
      studioScrollSpeed: "scrollSpeed",
      studioScrollPause: "scrollPause"
    };
    i.listen(f, "change", async (Pe) => {
      const we = Pe.target;
      if (we.id === "studioAutoFit") {
        s.setAutoFit(we.checked);
        return;
      }
      if (we.id === "studioLayout") {
        s.setLayout(we.value);
        return;
      }
      if (we.id === "studioFrame") {
        s.setFrame(we.value);
        return;
      }
      if (we.id === "studioData") {
        S.cancel(), D = we.value, P = performance.now(), A = "", Se();
        return;
      }
      if (we.id === "studioBgView") {
        y.dataset.bg = we.value;
        return;
      }
      if (we.id === "studioBoth") {
        Se();
        return;
      }
      if (we.id === "studioAspectLock") {
        s.setAspectLocked(we.checked);
        return;
      }
      if (we.id === "studioImport") {
        try {
          const Ie = we.files?.[0];
          if (!Ie) return;
          if (Ie.size > 16e3) throw Error();
          const Le = JSON.parse(await Ie.text());
          if (i.disposed) return;
          s.importLayout(Le), Y("Layout imported.");
        } catch {
          Y("Could not import this layout.");
        } finally {
          we.value = "";
        }
        return;
      }
      if (ye[we.id] || Oe[we.id]) {
        if (we.type === "number" && (!we.value || !we.checkValidity())) {
          Se();
          return;
        }
        const Ie = we.type === "checkbox" ? we.checked : we.type === "number" ? Number(we.value) : we.value;
        ye[we.id] ? s.setField(ye[we.id], Ie) : s.setAppearance(Oe[we.id], Ie), ["studioX", "studioY", "studioW", "studioH"].includes(we.id) && (we.value = ne(te()[ye[we.id]]));
      }
    }), i.listen(y, "pointerdown", S.start), i.listen(y, "pointermove", S.move), i.listen(y, "pointerup", S.end), i.listen(y, "pointercancel", S.end), i.listen(y, "lostpointercapture", S.end), i.listen(y, "keydown", (Pe) => {
      const we = Pe.target.closest("[data-hit]");
      if (!we || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(Pe.key)) return;
      Pe.preventDefault(), s.select(we.dataset.hit);
      const Ie = Pe.shiftKey ? 10 : 1, Le = {
        ArrowLeft: -Ie,
        ArrowRight: Ie
      }[Pe.key] || 0, Ue = {
        ArrowUp: -Ie,
        ArrowDown: Ie
      }[Pe.key] || 0, He = Pe.target.closest("[data-resize]")?.dataset.resize;
      s.transform(Le, Ue, He);
      const Ge = g.querySelector('[data-hit="' + (ie() ? "group" : N) + '"]');
      (He ? Ge?.querySelector('[data-resize="' + He + '"]') : Ge)?.focus({
        preventScroll: !0
      });
    });
    const Fe = new ResizeObserver(de);
    Fe.observe(y.parentElement), i.own(() => Fe.disconnect()), i.listen(window, "pagehide", () => {
      S.cancel(), J();
    }), i.listen(window, "manokara:languagechange", Se), i.listen(document.getElementById("editLyricLayout"), "click", () => {
      _("playlist"), k("lyrics");
    }), Se(), i.interval(() => {
      D === "sample" && Ne();
    }, 100);
  }
  return {
    init: kt,
    showMain: _,
    showTarget: k,
    text: $,
    get main() {
      return b;
    },
    get view() {
      return {
        target: C,
        selected: N
      };
    },
    restoreView(q) {
      S?.cancel(), s.restoreView(q);
    },
    get serialized() {
      return s.serialized;
    },
    feed(q) {
      const fe = ce();
      w = q, fe !== ce() && S?.cancel(), f && b === "playlist" && !document.getElementById("playlistStudio")?.hidden && (fe !== ce() ? Se() : D === "live" && Ne());
    },
    refresh: Se,
    dispose() {
      if (!i.disposed) {
        S?.dispose(), s.dispose(), i.dispose(), E.clear(), window.ManokaraPreview === V && delete window.ManokaraPreview, d?.destroy();
        for (const q of I)
          q.renderer.destroy(), q.stage.remove();
        I.length = 0, M?.remove(), M = null, j?.open && j.close(), j?.remove(), f = null;
      }
    }
  };
})();
window.ManokaraStudio = cp;
var Ro = pd();
function up(i = () => performance.now()) {
  let u = 0, s = null, c = 0, p = null, f = 0, g = 1;
  const y = () => u + (s == null ? 0 : Math.max(0, i() - s) / 1e3), d = () => Math.max(0, c - (p == null ? 0 : Math.max(0, i() - p) / 1e3));
  return {
    reset() {
      u = 0, s = null, c = 0, p = null, f++, g++;
    },
    start(M = 0) {
      u = Number(M) || 0, s = i();
    },
    pause() {
      u = y(), s = null, c = d(), p = null;
    },
    resume({ fallback: M = !0, countdown: x = !1 } = {}) {
      M && s == null && (s = i()), x && p == null && (p = i());
    },
    countdown(M) {
      c = Math.max(0, Number(M) || 0), p = i();
    },
    finishCountdown() {
      c = 0, p = null;
    },
    elapsed: y,
    remaining: d,
    seek() {
      f++, g++;
    },
    lyricsChanged() {
      g++;
    },
    get running() {
      return s != null;
    },
    get audioVersion() {
      return f;
    },
    get timelineVersion() {
      return g;
    }
  };
}
function dp(i, { delay: u = 0, rate: s = 1 } = {}) {
  return Math.max(0, (Number(i) || 0) - Math.max(0, Number(u) || 0) * Math.max(0.01, Number(s) || 1));
}
function hp(i, u, s = 0.8) {
  if (!i) return !1;
  const c = i.playing ? Math.max(0, u.now - i.now) / 1e3 * i.rate : 0;
  return Math.abs(u.position - i.position - c) > s;
}
function fp({
  youtube: i,
  mediaAdapter: u,
  pitchFactory: s,
  captureFactory: c,
  lookup: p,
  youtubeId: f,
  origin: g,
  options: y = () => ({}),
  output: d = {},
  callbacks: M = {},
  platform: x = globalThis,
  now: C = () => performance.now()
}) {
  const N = Fr(x, C), D = up(C);
  let b = Fr(x, C), w = null, S = "", E = !1, I = null, U = null, P = null, A = null, j = 0, V = null, Q = !1, G = 0, $ = !1, ne = null, Z = !1, Y = 0, J = "Play a song to change its key.", ie = "", ce = !1, te = 0, v = null, z = !1, _ = !1, k = !1, L = null, re = null;
  const de = /* @__PURE__ */ new Set(), ge = (oe) => d.text?.(oe) ?? oe, Ae = (oe) => d.format?.(oe) ?? String(oe), xe = (oe) => {
    !N.disposed && !N.suspended && d.message?.(oe);
  }, he = (oe) => !N.disposed && oe === G, Ne = (oe, be) => he(oe) && be === Y && !N.suspended, Se = s.create((oe) => {
    N.disposed || (w && !w.mc && (w.pitch = 0, M.persist?.(w), M.render?.()), J = oe, ye("error"));
  }), je = c({
    getState: () => ({
      key: w && !w.mc ? ba(w.pitch) : 0,
      title: w?.title || "",
      language: y().language || "en",
      enabled: !!w && !w.mc && !E && (S === "yt" ? Q : S === "media" ? !!A : !!f(w.url)),
      sequence: G,
      version: D.audioVersion
    }),
    onStatus(oe) {
      N.disposed || (oe.active && Se.element && Se.set(0).catch(() => {
      }), (ce !== oe.active || Math.abs(te - oe.delay) > 5e-3) && D.lyricsChanged(), ce = oe.active, te = oe.delay, J = oe.active ? w?.pitch ? "Key applied. Saved for this song." : "Original key." : oe.message || "Tab Audio stopped. The player is using its original sound.", ye(oe.error ? "error" : ""), oe.message && xe(J));
    }
  });
  function kt() {
    if (!z || N.disposed || N.suspended) return;
    const oe = fe();
    M.changed?.(oe);
    for (const be of de) be(oe);
  }
  function q() {
    try {
      return S === "yt" ? Number(V?.getPlaybackRate?.()) || 1 : S === "media" && A?.playbackRate || 1;
    } catch {
      return 1;
    }
  }
  function fe() {
    return Object.freeze({
      mode: S,
      counting: E,
      paused: $,
      duration: P,
      ready: Q,
      lookupPending: !!ne,
      pitchBusy: Z,
      pitchMessage: J,
      pitchStatusState: ie,
      countdownRemaining: E ? D.remaining() : 0,
      position: Tt(),
      audiblePosition: Vt(),
      playing: Ue(),
      sequence: G,
      timelineVersion: D.timelineVersion,
      audioVersion: D.audioVersion,
      captureActive: je.active,
      captureBusy: je.busy,
      captureDelay: je.delay,
      started: z,
      disposed: N.disposed,
      suspended: N.suspended,
      timers: b.timerCount,
      activeTimers: b.activeTimerCount,
      listeners: b.cleanupCount
    });
  }
  function ye(oe = null) {
    oe !== null && (ie = oe), kt(), je.sync();
  }
  function Oe() {
    kt(), je.sync();
  }
  function Fe(oe) {
    E && $ !== oe && (oe ? D.pause() : D.resume({
      fallback: !1,
      countdown: !0
    })), $ = oe, Oe();
  }
  function Pe() {
    d.countdown?.({
      visible: !!E && !!w,
      title: w?.title || "",
      remaining: E ? D.remaining() : 0
    });
  }
  function we(oe) {
    !N.disposed && !N.suspended && d.time?.(oe);
  }
  function Ie() {
    _ || N.disposed || N.suspended || (_ = !0, M.advance?.());
  }
  function Le() {
    G++, D.reset(), b.dispose(), b = Fr(x, C), je.silence(), v = null, Se.detach(), Y++, Z = !1, ne?.abort(), ne = null, i.destroy(V), V = null, Q = !1, u.release(A), A = null, j = 0, w = null, S = "", E = !1, I = null, L = re = null, U = null, P = null, $ = !1, _ = !1, u.clear(), d.time?.("00:00 / 00:00"), d.stage?.({
      youtubeUrl: "",
      stageMode: "empty",
      stageTitle: "",
      stageNote: "",
      stageUrl: "",
      countdownVisible: !1,
      countdownTitle: "",
      countdownValue: ""
    });
  }
  function Ue() {
    if (!w || w.mc || E || $) return !1;
    if (S === "media") return !!A && !A.paused && !A.ended && A.readyState >= 2;
    if (S === "yt")
      try {
        return Q && V.getPlayerState() === 1;
      } catch {
        return !1;
      }
    return D.running;
  }
  async function He() {
    const oe = A, be = G;
    if (!(!oe || Z || N.suspended))
      try {
        Se.element === oe && await Se.resume(), he(be) && A === oe && !N.suspended && await oe.play();
      } catch (pe) {
        he(be) && A === oe && !N.suspended && (Fe(!0), pe.name === "NotAllowedError" ? xe("Playback was blocked. Press Play to start the media.") : pe.name !== "AbortError" && sn("Server video stream could not play. Try again.", be));
      }
  }
  function Ge(oe) {
    if (!(!he(oe) || !E)) {
      if (E = !1, Fe(!1), I?.(), I = null, D.finishCountdown(), Pe(), U) {
        const be = U;
        U = null, Nn(be[0], be[1]);
        return;
      }
      A ? He() : S === "yt" && V && Q && V.playVideo();
    }
  }
  function Nn(oe, be) {
    if (S = "clk", E) {
      U = [oe, be];
      return;
    }
    d.stage({
      stageMode: "media"
    }), i.fallback(oe, be), D.start(), ($ || N.suspended) && D.pause(), xe("YouTube API could not load: Pause is unavailable and lyric timing is approximate.");
  }
  function sn(oe, be) {
    he(be) && (xe(oe + " Open it on YouTube to check."), Kt(be));
  }
  function Kt(oe) {
    !y().skip || L || !he(oe) || (L = b.timeout(() => {
      L = null, he(oe) && Ie();
    }, 1500));
  }
  async function ur(oe, be, pe) {
    if (!he(pe) || ne) return;
    const We = new AbortController(), mt = b.timeout(() => We.abort(new Error("Media lookup timed out.")), 55e3);
    ne = We;
    let rt = null;
    ye(), xe("Embedded playback is unavailable. Trying server playback…");
    try {
      if (!he(pe)) return;
      const Xe = await p(oe, AbortSignal.any([We.signal, b.signal]));
      if (!he(pe)) return;
      M.title?.(be, Xe.title);
      const $e = new URL(Xe.url, g);
      if ($e.origin !== g || $e.pathname !== "/__youtube/media") throw Error("Invalid video stream.");
      $e.searchParams.set("start", String(be.s || 0));
      const lt = u.create($e.href, {
        volume: y().volume
      });
      if (be.mediaDuration = Math.max(0, Xe.duration - (be.s || 0)), P = be.e != null ? be.e - (be.s || 0) : be.mediaDuration, j = 0, V) {
        try {
          V.destroy();
        } catch {
        }
        V = null;
      }
      if (Q = !1, d.stage({
        stageMode: "media"
      }), u.mount(lt), A = lt, S = "media", b.listen(lt, "play", () => {
        he(pe) && Fe(!1);
      }), b.listen(lt, "pause", () => {
        he(pe) && !E && Fe(!0);
      }), b.listen(lt, "seeked", () => {
        he(pe) && (D.seek(), Se.flush(), Oe());
      }), b.listen(lt, "ended", () => {
        he(pe) && (Tt() + 3 < be.mediaDuration && (be.e == null || Tt() + 3 < P) ? sn("Server video stream was interrupted.", pe) : Ur(pe));
      }), b.listen(lt, "error", () => sn("Server video stream could not play. Try again.", pe)), be.pitch && !je.active && !N.suspended && (rt = ++Y, Z = !0, ye(), await Se.attach(lt, be.pitch, () => Ne(pe, rt) && A === lt && !je.active), !Ne(pe, rt)) || !he(pe)) return;
      je.active && Se.element === lt && await Se.set(0), Z = !1, lt.controls = !0, J = be.pitch ? "Key applied. Saved for this song." : "Original key.", je.sync(), ye(""), D.lyricsChanged(), Pe(), xe("Playing video through the server."), !E && !$ && He();
    } catch (Xe) {
      he(pe) && !b.signal.aborted && (rt === null || Ne(pe, rt)) && sn(Xe.message, pe);
    } finally {
      mt(), ne === We && (ne = null), he(pe) && (rt === null || rt === Y) && (Z = !1, ye(ie));
    }
  }
  function Ur(oe) {
    re?.(), re = b.timeout(() => {
      re = null, he(oe) && A?.ended && Ie();
    }, Math.ceil((je.active ? je.delay : Se.delay) * 1e3));
  }
  async function Pn(oe, be, pe) {
    if (!he(pe) || N.suspended) return;
    const We = ++Y;
    if (!be.pitch || je.active) {
      je.sync(), !E && !$ && He();
      return;
    }
    Z = !0, oe.controls = !1, J = "Preparing key-shifted audio…", ye();
    try {
      if (await Se.attach(oe, be.pitch, () => Ne(pe, We) && A === oe && !je.active), !Ne(pe, We)) return;
      je.active && Se.element === oe && await Se.set(0), J = "Key applied. Saved for this song.", ye("");
    } catch (mt) {
      if (!Ne(pe, We)) return;
      be.pitch = 0, M.persist?.(w), J = mt.message, xe(J), ye("error");
    } finally {
      Ne(pe, We) && (oe.controls = !0, Z = !1, ye(ie), !E && !$ && He());
    }
  }
  function Rn() {
    N.disposed || N.suspended || (Se.element && Se.set(0), je.open());
  }
  async function gi(oe) {
    const be = w, pe = G;
    if (!be || be.mc || Z || ne || N.suspended || N.disposed) return;
    const We = ba(oe);
    if (We === ba(be.pitch)) return;
    const mt = ba(be.pitch);
    if (be.pitch = We, M.persist?.(w), M.render?.(), M.keyChanged?.(We), je.active) {
      je.sync(), J = We ? "Key applied. Saved for this song." : "Original key.", ye("");
      return;
    }
    if (S === "yt" || S === "clk" && f(be.url)) {
      if (!We) {
        J = "Original key.", ye("");
        return;
      }
      Rn();
      return;
    }
    if (!A) {
      be.pitch = mt, M.persist?.(w), J = "This source cannot change key. Use YouTube or a media link.", ye("error");
      return;
    }
    Z = !0;
    const rt = ++Y;
    J = "Preparing key-shifted audio…", ye();
    try {
      if (Se.element !== A ? We && await Se.attach(A, We, () => Ne(pe, rt) && w === be && !je.active) : await Se.set(We), !Ne(pe, rt)) return;
      je.active && Se.element && await Se.set(0), D.lyricsChanged(), J = We ? "Key applied. Saved for this song." : "Original key.", ye("");
    } catch (Xe) {
      if (!Ne(pe, rt)) return;
      be.pitch = Se.key, M.persist?.(w), J = Xe.message, ye("error"), xe(J);
    } finally {
      Ne(pe, rt) && (Z = !1, M.render?.(), ye(ie));
    }
  }
  function dr(oe, be, pe) {
    d.stage({
      stageMode: "media"
    });
    const We = i.mount();
    i.ready(b.signal).then((mt) => {
      if (!he(pe)) return;
      if (!mt) {
        Nn(oe, be);
        return;
      }
      const rt = {
        origin: g,
        autoplay: E || $ ? 0 : 1,
        start: Math.floor(be.s || 0),
        playsinline: 1,
        rel: 0
      };
      be.e != null && (rt.end = Math.ceil(be.e)), V = i.create(We, {
        videoId: oe,
        playerVars: rt,
        events: {
          onReady: (Xe) => {
            if (!he(pe)) return;
            Q = !0;
            const $e = Xe.target.getDuration();
            $e > 0 && (be.mediaDuration = Math.max(0, $e - (be.s || 0)), P = be.e != null ? be.e - (be.s || 0) : be.mediaDuration), je.sync(), J = be.pitch ? je.active ? "Key applied. Saved for this song." : "Start Tab Audio to apply the saved key. The player is using its original sound." : "Original key.", ye(""), Xe.target.setVolume(y().volume), !E && !$ && !N.suspended && Xe.target.playVideo();
          },
          onStateChange: (Xe) => {
            if (!(!he(pe) || E)) {
              if (N.suspended) {
                Xe.data === 1 && Xe.target?.pauseVideo();
                return;
              }
              Xe.data === 0 ? je.active ? (re?.(), re = b.timeout(() => {
                re = null, he(pe) && V?.getPlayerState() === 0 && Ie();
              }, Math.ceil(je.delay * 1e3))) : Ie() : Xe.data === 1 ? (M.claim?.(), Fe(!1)) : Xe.data === 2 && Fe(!0);
            }
          },
          onError: (Xe) => {
            if (!he(pe)) return;
            const $e = Number(Xe?.data);
            if ([5, 101, 150].includes($e)) {
              ur(oe, be, pe);
              return;
            }
            const lt = {
              2: "Invalid video ID or URL.",
              100: "Video is unavailable, private, or has been removed.",
              153: "YouTube did not receive a referrer/client identity. Open Manokara from localhost or HTTPS, not file://."
            }[$e] || "YouTube could not play this video.";
            sn(`YouTube error ${$e || "unknown"}: ${lt}`, pe);
          }
        }
      });
    }).catch(() => {
      he(pe) && Nn(oe, be);
    });
  }
  function Tt() {
    const oe = w;
    if (!oe || E) return 0;
    if (S === "media") return A ? A.currentTime - j : 0;
    if (S === "yt") {
      if (!V || !Q) return 0;
      try {
        return V.getCurrentTime() - (oe.s || 0);
      } catch {
        return 0;
      }
    }
    return D.elapsed();
  }
  function Vt() {
    return dp(Tt(), {
      rate: q(),
      delay: je.active ? je.delay : S === "media" ? Se.delay : 0
    });
  }
  function Dt() {
    if (!(!w || N.disposed || N.suspended)) {
      if (M.claim?.(), E) {
        Fe(!$);
        return;
      }
      if (S === "media")
        A && (A.paused ? He() : A.pause());
      else if (S === "yt") {
        if (!Q) return;
        const oe = V.getPlayerState();
        oe === 1 || oe === 3 ? V.pauseVideo() : V.playVideo();
      } else S === "clk" ? D.running ? (D.pause(), Fe(!0)) : (D.resume(), Fe(!1)) : xe("Pause is not available for this link.");
    }
  }
  function Yn(oe, {
    countdown: be = 0
  } = {}) {
    if (N.disposed || N.suspended || !oe) return !1;
    On(), Le(), w = oe, J = oe?.pitch ? "Preparing key-shifted audio…" : "Original key.", ye("");
    const pe = oe, We = G, mt = pe.mc ? null : f(pe.url), rt = !pe.mc && !mt && /\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(pe.url), Xe = mt || rt ? Math.max(0, Math.min(30, Math.floor(Number(be) || 0))) : 0;
    if (Xe > 0 && (E = !0, D.countdown(Xe)), P = pe.mc ? pe.dur : pe.e != null ? pe.e - (pe.s || 0) : null, pe.mc)
      S = "clk", D.start(), d.stage?.({
        stageMode: "mc",
        stageTitle: ge("MC break"),
        stageNote: pe.memo || ge("Take a moment between songs.")
      });
    else if (mt)
      S = "yt", d.stage?.({
        stageMode: "media",
        youtubeUrl: "https://www.youtube.com/watch?v=" + mt + "&t=" + Math.floor(pe.s || 0)
      }), dr(mt, pe, We);
    else if (rt) {
      S = "media", j = pe.s || 0, d.stage?.({
        stageMode: "media"
      });
      const $e = u.create(pe.url, {
        volume: y().volume,
        crossOrigin: !!pe.pitch && !je.active && new URL(pe.url).origin !== g
      });
      A = $e, b.listen($e, "loadedmetadata", () => {
        pe.mediaDuration = Number.isFinite($e.duration) ? Math.max(0, $e.duration - (pe.s || 0)) : void 0, $e.currentTime = pe.s || 0, P == null && pe.mediaDuration != null && (P = pe.mediaDuration);
      }), b.listen($e, "seeked", () => {
        D.seek(), Se.flush(), Oe();
      }), b.listen($e, "ended", () => Ur(We)), b.listen($e, "play", () => {
        Se.element === $e && Se.resume().catch(() => {
        }), Fe(!1);
      }), b.listen($e, "pause", () => {
        E || Fe(!0);
      }), b.listen($e, "error", () => {
        if (pe.pitch && $e.crossOrigin === "anonymous" && (pe.pitch = 0, M.persist?.(pe), M.replay?.(pe))) {
          xe("This media link did not allow pitch processing. Playing the original key.");
          return;
        }
        xe("Could not load this media."), Kt(We);
      }), u.mount($e), Pn($e, pe, We);
    } else
      S = "clk", D.start(), d.stage?.({
        stageMode: "external",
        stageTitle: ge("Open this link to play."),
        stageNote: ge("This media opens in a new tab. Your lyric clock is running here."),
        stageUrl: pe.url,
        stageLinkLabel: ge("Open media")
      });
    return E && (Pe(), we(ge("Starting in ") + Xe + " s"), I = b.interval(() => {
      if (D.remaining() <= 0) {
        Ge(We);
        return;
      }
      Pe(), we(ge("Starting in ") + Math.ceil(D.remaining()) + " s");
    }, 100)), b.interval(() => {
      if (S === "yt" && Q) {
        const $e = {
          now: C(),
          position: Tt(),
          playing: Ue(),
          rate: q()
        };
        if (hp(v, $e) && D.seek(), v = $e, P == null) {
          let lt = 0;
          try {
            lt = V.getDuration();
          } catch {
          }
          lt > 0 && (pe.mediaDuration = Math.max(0, lt - (pe.s || 0)), P = pe.e != null ? pe.e - (pe.s || 0) : pe.mediaDuration);
        }
      }
      if (Oe(), !E) {
        if (P != null && !$ && Vt() >= P) {
          Ie();
          return;
        }
        we(Ae(Tt()) + " / " + (P != null ? Ae(P) : "--:--"));
      }
    }, 250), kt(), !0;
  }
  function On() {
    z || N.disposed || (z = !0, kt());
  }
  function hr() {
    N.disposed || (Le(), J = "Play a song to change its key.", ye(""));
  }
  function jt() {
    if (!(N.disposed || N.suspended)) {
      k = !!w && !$, (E || S === "clk") && D.pause(), $ = !!w, v = null, Y++, Z = !1, b.suspend(), N.suspend(), je.suspend?.(), Se.suspend?.();
      try {
        A?.pause(), Q && V?.pauseVideo();
      } catch {
      }
    }
  }
  function wn() {
    N.disposed || !N.suspended || (N.resume(), b.resume(), je.resume?.(), k && w && (E || ($ = !1), E ? Fe(!1) : S === "clk" ? (D.resume(), Fe(!1)) : S === "media" && A ? (A.readyState >= 1 && A.currentTime < j && (A.currentTime = j), P == null && Number.isFinite(A.duration) && (w.mediaDuration = Math.max(0, A.duration - j), P = w.mediaDuration), $ = !1, Pn(A, w, G)) : S === "yt" && Q && V.playVideo()), k = !1, kt());
  }
  function In({
    preserveCapture: oe = !1
  } = {}) {
    N.disposed || (Le(), b.dispose(), N.dispose(), z = !1, je.dispose({
      preserveCapture: oe
    }), Se.dispose?.(), de.clear());
  }
  return {
    start: On,
    load: Yn,
    stop: hr,
    suspend: jt,
    resume: wn,
    dispose: In,
    changeKey: gi,
    startTabAudio: Rn,
    play() {
      !w || N.disposed || N.suspended || (E ? Ge(G) : $ && Dt());
    },
    togglePause: Dt,
    stopTabAudio: () => je.stop(),
    setVolume(oe) {
      N.disposed || (A && (A.volume = Math.max(0, Math.min(100, Number(oe) || 0)) / 100), V && Q && V.setVolume(oe), kt());
    },
    refreshSongTiming() {
      w && (P = w.mc ? w.dur : w.e != null ? w.e - (w.s || 0) : w.mediaDuration ?? null, D.lyricsChanged(), kt());
    },
    invalidateLyrics() {
      N.disposed || D.lyricsChanged();
    },
    elapsed: Tt,
    audibleElapsed: Vt,
    mediaPlaying: Ue,
    getSnapshot: fe,
    subscribe(oe) {
      return N.disposed ? () => {
      } : (de.add(oe), oe(fe()), () => de.delete(oe));
    },
    get state() {
      return fe();
    },
    get appliedKey() {
      return Se.key;
    }
  };
}
const Es = /* @__PURE__ */ new WeakMap();
function pp({ window: i = globalThis.window, document: u = i.document, root: s }) {
  function c(f) {
    if (f?.aborted) return Promise.resolve(!1);
    if (i.YT?.Player) return Promise.resolve(!0);
    let g = Es.get(i);
    if (!g) {
      const y = i.onYouTubeIframeAPIReady, d = /* @__PURE__ */ new Set();
      let M, x = !1, C, N = !1;
      const D = (S) => {
        if (!N) {
          N = !0, g.result = S, i.clearTimeout(C), i.onYouTubeIframeAPIReady === b && (i.onYouTubeIframeAPIReady = y), !S && x && M?.remove(), M?.removeEventListener("error", w), Es.delete(i);
          for (const E of [...d]) E(S);
          d.clear();
        }
      }, b = () => {
        try {
          y?.();
        } finally {
          D(!!i.YT?.Player);
        }
      }, w = () => D(!1);
      g = { listeners: d, finish: D }, Es.set(i, g), i.onYouTubeIframeAPIReady = b, M = u.getElementById("ytapi"), M || (x = !0, M = u.createElement("script"), M.id = "ytapi", M.src = "https://www.youtube.com/iframe_api"), M.addEventListener("error", w, { once: !0 }), C = i.setTimeout(() => D(!1), 8e3), x && u.head.append(M);
    }
    return g.result !== void 0 ? Promise.resolve(g.result) : new Promise((y) => {
      let d = !1;
      const M = (C) => {
        d || (d = !0, f?.removeEventListener("abort", x), g.listeners.delete(M), y(C));
      }, x = () => {
        M(!1), g.listeners.size || g.finish(!1);
      };
      g.listeners.add(M), f?.addEventListener("abort", x, { once: !0 }), f?.aborted && x();
    });
  }
  function p() {
    const f = u.createElement("div");
    return f.id = "ytp", s().replaceChildren(f), f;
  }
  return {
    ready: c,
    mount: p,
    create: (f, g) => new i.YT.Player(f, { width: "100%", height: "100%", ...g }),
    destroy(f) {
      try {
        f?.destroy();
      } catch {
      }
    },
    fallback(f, g) {
      const y = u.createElement("iframe");
      y.referrerPolicy = "strict-origin-when-cross-origin", y.allow = "autoplay; encrypted-media; picture-in-picture", y.allowFullscreen = !0;
      const d = new URL("https://www.youtube.com/embed/" + f);
      d.searchParams.set("autoplay", "1"), d.searchParams.set("start", String(Math.floor(g.s || 0))), g.e != null && d.searchParams.set("end", String(Math.ceil(g.e))), y.src = d.href, s().replaceChildren(y);
    }
  };
}
function mp({ document: i = globalThis.document, root: u }) {
  return {
    create(s, { volume: c = 100, crossOrigin: p = !1 } = {}) {
      const f = i.createElement("video");
      return p && (f.crossOrigin = "anonymous"), f.src = s, f.controls = !0, f.playsInline = !0, f.autoplay = !1, f.volume = Math.max(0, Math.min(100, Number(c) || 0)) / 100, f;
    },
    mount: (s) => u().replaceChildren(s),
    clear: () => u().replaceChildren(),
    release(s) {
      if (s)
        try {
          s.pause(), s.removeAttribute("src"), s.load();
        } catch {
        }
    }
  };
}
const Oo = /* @__PURE__ */ new Set();
let Cs = null, ld = 0;
const Vi = {
  get active() {
    return Oo.size > 0;
  },
  getSnapshot() {
    return Cs ? { ...Cs, stateAgeMs: Math.max(0, performance.now() - ld) } : { ready: !1 };
  },
  subscribe(i) {
    return Oo.add(i), i(Vi.getSnapshot()), () => Oo.delete(i);
  },
  feed(i) {
    Cs = i, ld = performance.now();
    for (const u of Oo) u(Vi.getSnapshot());
  }
};
globalThis.ManokaraStagePreview = {
  getSnapshot: () => Vi.getSnapshot(),
  subscribe: (i) => Vi.subscribe(i)
};
function gp({ getState: i, onStatus: u }) {
  let s;
  try {
    s = sessionStorage.getItem("manokaraTabAudioChannel"), (performance.getEntriesByType("navigation")[0]?.type !== "reload" || !/^[a-f0-9-]{36}$/.test(s || "")) && (s = crypto.randomUUID(), sessionStorage.setItem("manokaraTabAudioChannel", s));
  } catch {
    s = crypto.randomUUID();
  }
  let c = null, p = !1, f = !1, g = 0, y = "", d = !1, M = !1;
  const x = () => isSecureContext && !!navigator.mediaDevices?.setCaptureHandleConfig;
  function C() {
    if (!x()) return !1;
    try {
      return navigator.mediaDevices.setCaptureHandleConfig({ handle: s, exposeOrigin: !0, permittedOrigins: [location.origin] }), !0;
    } catch {
      return !1;
    }
  }
  C();
  function N(V = "", Q = !1) {
    u({ active: p, busy: f, delay: g, message: V, error: Q, open: !!c && !c.closed });
  }
  function D(V, Q) {
    !c || c.closed || c.postMessage({ type: V, channel: s, state: Q }, location.origin);
  }
  function b(V = !1) {
    if (d || M || !c || c.closed) return;
    const Q = i(), G = JSON.stringify(Q);
    (V || y !== G) && (y = G, D("manokara:tab-audio-state", Q));
  }
  function w() {
    if (M || d) return !1;
    if (!C())
      return N("Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.", !0), !1;
    if (!c || c.closed) {
      const V = new URL("./manokara-tab-audio.html", location.href);
      V.hash = new URLSearchParams({ channel: s, lang: i().language }).toString(), c = window.open(V.href, "manokara-tab-audio-" + s, "popup,width=480,height=640"), y = "";
    } else c.focus();
    return c ? (N(p ? "" : "Choose the Manokara tab and share tab audio in the audio window."), b(!0), !0) : (N("Popup blocked. Please allow popups.", !0), !1);
  }
  function S(V) {
    if (d || V.origin !== location.origin || V.data?.channel !== s) return;
    const Q = V.data;
    if (!c && Q.type === "manokara:tab-audio-hello")
      try {
        if (V.source?.opener !== window || V.source.location.pathname !== "/manokara-tab-audio.html") return;
        c = V.source, y = "";
      } catch {
        return;
      }
    if (V.source === c) {
      if (Q.type === "manokara:tab-audio-hello") {
        b(!0);
        return;
      }
      Q.type === "manokara:tab-audio-status" && (p = Q.active === !0, f = Q.busy === !0, g = p ? Math.max(0, Math.min(3, Number(Q.delay) || 0)) : 0, N(typeof Q.message == "string" ? Q.message.slice(0, 240) : "", Q.error === !0));
    }
  }
  window.addEventListener("message", S);
  const E = () => {
    c?.closed && (c = null, y = "", p = f = !1, g = 0, N("Tab Audio stopped. The player is using its original sound."));
  };
  let I = setInterval(E, 1e3);
  function U() {
    d || (D("manokara:tab-audio-suspend"), d = !0, clearInterval(I), I = null, window.removeEventListener("message", S));
  }
  function P({ preserveCapture: V = !1 } = {}) {
    if (!M) {
      if (!V) {
        D("manokara:tab-audio-stop");
        try {
          c?.close();
        } catch {
        }
      }
      U(), M = !0, p = f = !1, g = 0, window.removeEventListener("pagehide", U), window.removeEventListener("pageshow", j);
    }
  }
  function A() {
    M || !d || (d = !1, y = "", C(), window.addEventListener("message", S), I == null && (I = setInterval(E, 1e3)), b(!0));
  }
  function j(V) {
    V.persisted && A();
  }
  return window.addEventListener("pagehide", U), window.addEventListener("pageshow", j), {
    open: w,
    sync: b,
    dispose: P,
    suspend: U,
    resume: A,
    stop() {
      D("manokara:tab-audio-stop");
    },
    silence() {
      D("manokara:tab-audio-state", { ...i(), key: 0, enabled: !1 }), y = "";
    },
    get active() {
      return p;
    },
    get busy() {
      return f;
    },
    get delay() {
      return g;
    }
  };
}
const sd = /* @__PURE__ */ new Set([
  "writerId",
  "time",
  "playlistTime",
  "sampledAt",
  "playing",
  "paused",
  "counting",
  "countdownRemaining",
  "uploadDelayMs",
  "audioPower",
  "audioBass",
  "audioLowMid",
  "audioMid",
  "audioVocal",
  "audioTreble"
]);
function yp(i, u) {
  const s = Object.keys(i);
  return !!u && s.length === Object.keys(u).length && s.every((p) => Object.hasOwn(u, p) && (sd.has(p) || Object.is(i[p], u[p]))) ? { partial: !0, packet: Object.fromEntries(s.filter((p) => p === "writerId" || sd.has(p) && !Object.is(i[p], u[p])).map((p) => [p, i[p]])) } : { partial: !1, packet: i };
}
function vp() {
  if (window.ManokaraController?.active) return window.ManokaraController;
  const i = ManokaraI18n.text, u = ManokaraI18n.markup, s = (h) => document.querySelector(h), c = Fr(), {
    draft: p,
    controls: f
  } = W;
  function g(h) {
    window.ManokaraStudio?.showMain("karaoke"), h === "song" && !s("#songEditorDialog").open && s("#songEditorDialog").showModal(), h !== "song" && s("#songEditorDialog").open && s("#songEditorDialog").close();
  }
  function y() {
    b >= 0 && !confirm(i("Discard the current song edits and start a new song?")) || (b >= 0 && Ht(), g("song"), s("#panel-song").scrollTop = 0, s("#url").focus());
  }
  c.listen(s("#songEditorDialog"), "click", (h) => {
    h.target === s("#songEditorDialog") && s("#songEditorDialog").close();
  }), c.listen(s("#libraryDialog"), "click", (h) => {
    h.target === s("#libraryDialog") && s("#libraryDialog").close();
  }), c.listen(s("#songEditorDialog"), "close", () => c.frame(() => {
    const h = document.activeElement;
    !window.ManokaraTour?.active && (h === document.body || s("#songEditorDialog").contains(h)) && s("#openSongEditor")?.focus({
      preventScroll: !0
    });
  }));
  const d = (h) => (h = Math.max(0, Math.round(h)), String(Math.floor(h / 60)).padStart(2, "0") + ":" + String(h % 60).padStart(2, "0")), M = ManokaraCore.timeValue;
  let x = [], C = null, N = 0, D = -1, b = -1, w = [], S = "", E = {}, I = Ea.map((h) => ({ ...h })), U;
  const P = fp({
    youtube: pp({
      root: () => s("#stageMediaRoot")
    }),
    mediaAdapter: mp({
      root: () => s("#stageMediaRoot")
    }),
    pitchFactory: ManokaraPitch,
    captureFactory: gp,
    origin: location.origin,
    youtubeId: (h) => oe(h),
    options: () => ({
      volume: Number(f.get("vol") ?? 100),
      skip: f.get("skip"),
      language: ManokaraI18n.language
    }),
    async lookup(h, R) {
      if (await Vt, R.aborted) throw new DOMException("Cancelled", "AbortError");
      return ManokaraPitch.lookup(ManokaraSession.api, Dt("/__youtube"), h, {
        signal: R
      });
    },
    output: {
      text: i,
      format: d,
      message: (h) => te(h),
      stage: (h) => {
        c.disposed || W.ui.updatePlayerPanelState(h);
      },
      time: (h) => ne(h),
      countdown: V
    },
    callbacks: {
      changed: (h) => Yi(h),
      persist: () => ie(),
      render: () => en(),
      keyChanged: (h) => {
        b >= 0 && x[b] === C && p.set("songKey", h);
      },
      title: We,
      claim: jt,
      advance: () => Yt($e()),
      replay: (h) => {
        const R = x.indexOf(h);
        return R < 0 ? !1 : (Yt(R), !0);
      }
    }
  }), A = () => P.mediaPlaying(), j = () => P.audibleElapsed();
  function V({
    visible: h,
    title: R,
    remaining: X
  }) {
    W.ui.updatePlayerPanelState({
      countdownVisible: h,
      countdownTitle: h ? R : "",
      countdownValue: h ? String(Math.max(1, Math.ceil(X))) : "",
      countdownHint: i("Press Play to start now")
    });
  }
  function Q(h = P.getSnapshot()) {
    const R = C && !C.mc ? ManokaraPitch.clamp(C.pitch) : 0;
    return {
      play: i("Play"),
      pause: i("Pause"),
      resume: i("Resume"),
      stop: i("Stop"),
      previous: i("Previous song"),
      next: i("Next song"),
      keyLabel: i("Key"),
      lower: i("Lower key"),
      raise: i("Raise key"),
      originalKey: i("Original key"),
      volumeLabel: i("Volume"),
      paused: h.paused,
      volume: Number(f.get("vol") ?? 100),
      key: R,
      canPitch: !!C && !C.mc && !h.pitchBusy && !h.lookupPending && (h.mode !== "yt" || h.ready)
    };
  }
  function G(h) {
    W.ui.updatePlayerControls(Q(h));
  }
  const $ = (h) => W.ui.updatePlayerPanelState({
    now: String(h ?? "")
  }), ne = (h) => W.ui.updatePlayerPanelState({
    time: String(h ?? "")
  });
  function Z(h = P.getSnapshot()) {
    W.ui.updateTransposeState({
      key: C && !C.mc ? ManokaraPitch.clamp(C.pitch) : 0,
      status: i(h.pitchMessage),
      statusState: h.pitchStatusState,
      tabAudioActive: h.captureActive,
      tabAudioBusy: h.captureBusy
    }), G(h);
  }
  let Y = "";
  const J = /* @__PURE__ */ new Map();
  x = et.setlist.load().value;
  const ie = () => et.setlist.save(x).ok ? !0 : (te("Browser storage is full or unavailable. Changes remain in this window only."), !1);
  let ce = "";
  const te = (h) => {
    ce = h || "", W.ui.updatePlayerPanelState({
      message: i(ce)
    });
  }, v = ManokaraLyricsEditor.create({
    draft: p,
    imported(h, R, X) {
      p.patch({ lyricSourceLabel: "", lyricSourceUrl: "", lyricCopyright: "", lyricSources: "[]", lyricLoadStatus: "" }), X && p.patch({ lyricSourceLabel: "TTML file", lyricCopyright: X.copyright || "", lyricLoadStatus: Wu(X.warnings, i) }), Gn = h.duration, !p.get("ttl") && h.title && p.set("ttl", h.title.slice(0, 512)), p.get("lq") || p.set("lq", [h.title, h.artist].filter(Boolean).join(" "));
    },
    changed() {
      Gn = void 0;
    },
    async convertTtml(h, R) {
      if (await Vt, c.disposed || R.aborted) throw new DOMException("Cancelled", "AbortError");
      const X = await window.ManokaraSession.api(Dt("/__lyrics/import-ttml"), { ttml: h }, {
        signal: AbortSignal.any([c.signal, R, AbortSignal.timeout(15e3)])
      });
      if (X.status === 404) throw Error("Restart the updated server to import TTML files.");
      const ee = await X.json();
      if (!X.ok) throw Error(ee.error || "Could not import TTML.");
      return ee;
    }
  });
  c.own(() => v.dispose());
  let z = [], _ = [], k = "", L = !1, re = !1, de = !1, ge = "", Ae = !1, xe = 0, he = null;
  try {
    he = new BroadcastChannel("manokara-library-v1"), c.listen(he, "message", (h) => {
      h.data === "changed" && ye();
    }), c.own(() => {
      he?.close(), he = null;
    });
  } catch {
  }
  c.listen(window, "focus", () => {
    s("#libraryDialog").open && ye();
  });
  function Ne() {
    try {
      he?.postMessage("changed");
    } catch {
    }
  }
  const Se = () => {
    try {
      return crypto.randomUUID();
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
  }, je = () => et.library.list(), kt = async (h) => {
    await et.library.put(h), Ne();
  }, q = async (h) => {
    await et.library.remove(h), Ne();
  };
  function fe() {
    const h = {
      search: i("Search my songs"),
      placeholder: i("Song title or artist"),
      noMatches: i("No matching songs."),
      empty: i("Your library is empty. Save a song from the editor to keep it here."),
      listLabel: i("Saved songs"),
      lyricsSaved: i("Lyrics saved"),
      noLyrics: i("No lyrics"),
      add: i("Add"),
      remove: i("Remove from My songs")
    };
    W.ui.updateLibrary(z, h, {
      playlists: _,
      activePlaylistId: k,
      busy: de,
      playlistsUnavailable: re,
      error: Ae || L || re,
      status: i(ge || (L ? "Could not load My songs. Please try again." : re ? "Could not load playlists. Your saved songs are still available." : ""))
    }), Hi();
  }
  async function ye() {
    if (c.disposed) return;
    const h = ++xe, [R, X] = await Promise.allSettled([je(), et.playlists.list()]);
    return c.disposed || h !== xe ? !1 : (L = R.status !== "fulfilled", re = X.status !== "fulfilled", L || (z = R.value), re || (_ = X.value, k && !_.some((ee) => ee.playlistId === k) && (k = "")), fe(), !L && !re);
  }
  async function Oe(h, R = "") {
    if (c.disposed || de) return !1;
    de = !0, ge = "", Ae = !1, fe();
    try {
      const X = await h();
      if (Ne(), c.disposed) return !1;
      const ee = await ye();
      return c.disposed ? !1 : (ge = ee ? typeof X == "string" ? X : R : "Changes saved, but My songs could not be refreshed. Try again.", Ae = !ee, ge && te(ge), !0);
    } catch (X) {
      return c.disposed || (ge = [
        "Name your playlist (1–80 characters).",
        "This playlist no longer exists.",
        "Could not save the setlist. Nothing was added.",
        "Could not save the setlist. The song was kept in My songs."
      ].includes(X.message) ? X.message : "Could not update My songs or playlists. Please try again.", Ae = !0, te(ge)), !1;
    } finally {
      de = !1, c.disposed || fe();
    }
  }
  function Fe(h = "") {
    de || (k = _.some((R) => R.playlistId === h) ? h : "", ge = "", Ae = !1, fe());
  }
  function Pe(h, R = []) {
    return Oe(async () => {
      const X = new Set((await je()).map((Te) => Te.libraryId));
      k = (await et.playlists.create(h, R.filter((Te) => X.has(Te)))).playlistId;
    }, "Playlist created.");
  }
  function we(h, R) {
    return Oe(() => et.playlists.rename(h, R), "Playlist renamed.");
  }
  function Ie(h) {
    return de || !_.some((R) => R.playlistId === h) || !confirm(i("Delete this playlist? Songs in My songs and the setlist will stay.")) ? !1 : Oe(async () => {
      await et.playlists.remove(h), k === h && (k = "");
    }, "Playlist deleted. Your songs are still in My songs.");
  }
  function Le(h, R) {
    const X = new Set(R);
    return Oe(async () => {
      const ee = new Set((await je()).map((ve) => ve.libraryId)), Te = [...X].filter((ve) => ee.has(ve));
      if (!Te.length) throw new Error("No saved songs selected");
      await et.playlists.addSongs(h, Te);
    }, "Songs added to playlist.");
  }
  function Ue(h, R) {
    return Oe(() => et.playlists.removeSongs(h, R), "Songs removed from playlist.");
  }
  function He(h, R, X, ee) {
    return Oe(() => et.playlists.moveSong(h, R, X, ee), "Playlist order saved.");
  }
  async function Ge(h, R) {
    const X = new Map((await je()).map((me) => [me.libraryId, me]));
    if (c.disposed) return;
    const ee = new Set(x.map((me) => me.libraryId)), Te = [...new Set(h)].filter((me) => X.has(me) && !ee.has(me)).map((me) => ({ ...Ls(X.get(me)), librarySync: !0 }));
    if (!Te.length) return "These songs are already in the setlist, or are no longer in My songs.";
    const ve = [...x, ...Te];
    if (!et.setlist.save(ve).ok) throw new Error("Could not save the setlist. Nothing was added.");
    return x = ve, en(), R;
  }
  function Nn(h) {
    return Oe(async () => {
      const R = await et.playlists.get(h);
      return R.songIds.length ? Ge(R.songIds, "Playlist added to setlist. Songs already there were skipped.") : "This playlist is empty.";
    });
  }
  async function sn() {
    try {
      const h = new Set((await je()).map((ee) => ee.libraryId));
      if (c.disposed) return;
      const R = x.filter((ee) => !ee.mc && ee.librarySync !== !1);
      let X = !1;
      for (const ee of R)
        ee.libraryId || (ee.libraryId = Se(), X = !0);
      if (X && !ie()) {
        await ye();
        return;
      }
      for (const ee of R) {
        if (c.disposed) return;
        h.has(ee.libraryId) || (await et.library.insertMissing(ee), h.add(ee.libraryId));
      }
      await ye();
    } catch {
      L = !0, Hi();
    }
  }
  async function Kt() {
    ge = "", Ae = !1, await ye(), !c.disposed && (s("#libraryDialog").open || s("#libraryDialog").showModal(), s("#librarySearch").focus());
  }
  async function ur(h) {
    return Oe(() => Ge([h], "Added from My songs."));
  }
  async function Ur(h) {
    const R = z.find((X) => X.libraryId === h);
    return !R || de || !confirm(i("Remove this song from My songs? Copies already in a setlist will stay there.")) ? !1 : Oe(async () => {
      const X = x.map((ee) => {
        if (ee.libraryId !== h) return ee;
        const Te = {
          ...ee,
          librarySync: !1
        };
        return delete Te.libraryId, Te;
      });
      if (!et.setlist.save(X).ok)
        throw new Error("Could not save the setlist. The song was kept in My songs.");
      try {
        await q(R.libraryId);
        for (const ee of /* @__PURE__ */ new Set([...x, C])) ee?.libraryId === R.libraryId && (delete ee.libraryId, ee.librarySync = !1);
        return ie(), "Removed from My songs. Setlist copies are unchanged.";
      } catch (ee) {
        throw ie(), ee;
      }
    });
  }
  function Pn() {
    confirm(i("Remove all songs?")) && (x = [], N = 0, D = -1, Ht(), ie(), en(), C && te("Setlist cleared. The current song keeps playing until it ends or you press Stop."));
  }
  function Rn(h, R) {
    if (!Number.isInteger(h) || h < 0 || h >= x.length) return;
    if (R === "go") {
      Yt(h);
      return;
    }
    if (R === "ed") {
      qn(), S = "", w = [], tn(), g("song"), b = h, Y = "";
      const me = x[h];
      W.ui.updateSongEditorView({
        title: i("Edit song"),
        saveLabel: i("Save changes"),
        editing: !0
      }), p.set("saveToLibrary", me.librarySync !== !1), p.set("url", me.url), p.set("ttl", me.title), p.set("st", me.s ? d(me.s) : ""), p.set("en", me.e != null ? d(me.e) : ""), p.set("llrc", me.lrc || ""), p.patch({ lyricSourceLabel: me.lyricSource?.label || "", lyricSourceUrl: Vn(me.lyricSource?.url), lyricCopyright: me.lyricSource?.copyright || "", lyricSources: JSON.stringify(Ki(me.lyricSource?.sources)) }), U = me.mediaDuration ? me.mediaDuration + (me.s || 0) : void 0, p.set("lyricLoadStatus", ""), p.set("loff", me.off || 0), p.set("songKey", ManokaraPitch.clamp(me.pitch)), p.set("lq", me.title), v.load(me), s("#ftitle").scrollIntoView({
        block: "nearest"
      });
      return;
    }
    if (!["del", "up", "dn"].includes(R)) return;
    const X = b >= 0 ? x[b] : null, ee = C, Te = ee ? x.indexOf(ee) : -1, ve = Te >= 0 ? Te : N;
    if (R === "del") x.splice(h, 1);
    else {
      const me = R === "up" ? h - 1 : h + 1;
      me >= 0 && me < x.length && ([x[h], x[me]] = [x[me], x[h]]);
    }
    if (X) {
      const me = x.indexOf(X);
      me < 0 ? Ht() : b = me;
    }
    if (ee) {
      const me = x.indexOf(ee);
      me >= 0 ? N = me : Te >= 0 ? (N = ve, te("Removed from the setlist. The current song keeps playing until it ends or you press Stop.")) : R === "del" && h < N && N--;
    }
    ie(), en();
  }
  c.own(W.commands.bind("setlist", {
    openLibrary: Kt,
    openEditor: y,
    clear: Pn,
    song: Rn
  })), window.ManokaraSetlistActions = W.commands.actions("setlist"), c.own(W.commands.bind("library", {
    add: ur,
    remove: Ur,
    selectPlaylist: Fe,
    createPlaylist: Pe,
    renamePlaylist: we,
    deletePlaylist: Ie,
    addToPlaylist: Le,
    removeFromPlaylist: Ue,
    movePlaylistSong: He,
    addPlaylist: Nn,
    refresh() {
      return de ? !1 : (ge = "", Ae = !1, ye());
    }
  })), window.ManokaraLibraryActions = W.commands.actions("library"), sn();
  const gi = (() => {
    try {
      return crypto.randomUUID();
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
  })();
  let dr = "", Tt = !1;
  const Vt = window.ManokaraSession.ready.then((h) => (dr = h.room, Tt = !0, W.ui.updateOBSSettingsState({
    obsUrl: window.ManokaraSession.obsUrl(!1)
  }), window.ManokaraStudio?.refresh(), h)), Dt = (h) => {
    const R = new URL(h, location.href);
    return R.searchParams.set("room", dr), R.href;
  };
  async function Yn(h) {
    try {
      return await Vt, c.disposed && h !== "release" ? void 0 : await window.ManokaraSession.api(Dt("/__lyric-owner"), {
        writerId: gi,
        action: h
      }, {
        keepalive: h === "release",
        ...h === "release" ? {} : {
          signal: c.signal
        }
      });
    } catch {
      return;
    }
  }
  let On = !1, hr = -1 / 0;
  function jt() {
    c.disposed || c.suspended || On || performance.now() - hr < 750 || (hr = performance.now(), On = !0, Yn("claim").then((h) => {
      c.disposed || c.suspended || h?.ok && (Lt = null, Rt());
    }).finally(() => {
      On = !1;
    }));
  }
  c.listen(document, "pointerdown", (h) => {
    !ManokaraTour.active && !h.target.closest("#help") && jt();
  }, !0), c.listen(document, "keydown", (h) => {
    !ManokaraTour.active && !h.target.closest("#help") && jt();
  }, !0), location.protocol === "file:" && (s("#warn").hidden = !1);
  function wn(h) {
    return h.e != null ? Math.max(0, h.e - (h.s || 0)) : h.mediaDuration || h.ldur || 180;
  }
  function In(h) {
    const R = wn(h), X = ManokaraLyrics.displayLrc(h), ee = ManokaraLyrics.secondaryLrc(h), Te = X + "|" + ee + "|" + R;
    if (h._L && h._L.k === Te) return h._L.a;
    const ve = ManokaraCore.parseLyrics(X, R);
    if (ee) {
      const me = ManokaraCore.parseLyrics(ee, R).all;
      ve.all.forEach((Ot, ft) => Ot.romaji = me[ft]?.x !== Ot.x && me[ft]?.x || "");
    }
    return h._L = {
      k: Te,
      a: ve.lines,
      all: ve.all,
      timed: ve.timed
    }, ve.lines;
  }
  const oe = ManokaraCore.youtubeId, be = (h) => typeof h == "string" ? h.replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, 512) : "";
  function pe(h) {
    return !h.mc && (!h.title || h.title.trim() === h.url.trim());
  }
  function We(h, R) {
    c.disposed || (R = be(R), !(!R || !pe(h)) && (h.title = R, x.includes(h) && (ie(), en()), C === h && ($(R), V({
      visible: P.state.counting,
      title: C.title,
      remaining: P.state.countdownRemaining
    }))));
  }
  function mt(h) {
    const R = oe(h);
    if (!R) return Promise.resolve("");
    const X = J.get(R);
    if (X && X.expires > Date.now()) return X.promise;
    const ee = (async () => {
      try {
        const ve = await fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + R), {
          signal: AbortSignal.any([c.signal, AbortSignal.timeout(4e3)])
        });
        if (ve.ok) {
          const me = be((await ve.json()).title);
          if (me) return me;
        }
      } catch {
      }
      await Vt;
      const Te = await window.ManokaraSession.api(Dt("/__youtube/title"), {
        videoId: R
      }, {
        signal: AbortSignal.any([c.signal, AbortSignal.timeout(55e3)])
      });
      return Te.ok ? be((await Te.json()).title) : "";
    })().catch(() => "");
    for (J.delete(R), J.set(R, {
      promise: ee,
      expires: Date.now() + 9e5
    }); J.size > 64; ) J.delete(J.keys().next().value);
    return ee.then((Te) => {
      !Te && J.get(R)?.promise === ee && J.delete(R);
    }), ee;
  }
  function rt(h) {
    if (pe(h)) {
      const R = h.url;
      mt(R).then((X) => {
        h.url === R && We(h, X);
      });
    }
  }
  const Xe = () => C ? x.indexOf(C) : -1, $e = () => {
    if (!C) return 0;
    const h = Xe();
    return h >= 0 ? h + 1 : N;
  }, lt = () => {
    if (!C) return 0;
    const h = Xe();
    return Math.max(0, (h >= 0 ? h : N) - 1);
  }, Hn = () => Math.max(0, Math.min(30, Math.floor(+f.get("cdn")) || 0));
  function Yi(h = P.getSnapshot()) {
    const R = C ? h.counting ? "countdown" : h.paused ? "paused" : h.playing ? "playing" : "ready" : "ready";
    W.ui.updatePlayerPanelState({
      playbackState: R,
      previewMessage: C ? !h.counting && !C.mc && !C.lrc?.trim() ? "This song has no lyrics yet. Add lyrics in the song editor." : "" : "Play a song to preview its lyrics.",
      playbackLabel: {
        ready: i(C ? "Ready" : "Ready when you are"),
        countdown: i("Starting soon"),
        paused: i("Paused"),
        playing: i("Playing")
      }[R]
    }), Z(h);
  }
  function Yt(h) {
    if (!c.disposed) {
      if (jt(), dn = "", h < 0 || h >= x.length) {
        if (P.stop(), C) {
          const R = Xe();
          D = R >= 0 ? R : N;
        }
        h >= x.length && (D = -1), C = null, Gr(null), $(i("Nothing playing yet")), en(), Zn(), Yi(), h >= x.length && te("Setlist finished. Ready for another song?");
        return;
      }
      C = x[h], N = D = h, Gr(C), en(), te(""), $(C.mc ? i("MC break") : C.title), rt(C), P.load(C, {
        countdown: Hn()
      }), Zn();
    }
  }
  function fr() {
    return {
      title: i("Live lyrics"),
      smaller: i("Smaller lyric text"),
      larger: i("Larger lyric text"),
      lyrics: i("Lyrics"),
      chooseLyrics: i("Choose lyrics for this song"),
      original: i("Original"),
      romaji: i("Romaji"),
      both: i("Original + Romaji"),
      currentLyrics: i("Current song lyrics"),
      liveSync: i("Live sync"),
      currentSync: i("Current live sync offset"),
      reset: i("Reset"),
      syncHelp: i("Nudge the words to match what you hear. + shows lines earlier; − shows them later."),
      setLineTime: i("Set line time")
    };
  }
  function Kr(h) {
    W.ui.updateLiveLyrics(h);
  }
  function $n(h = "") {
    const R = !!C && !C.mc && ManokaraLyrics.validRomaji(C), X = R ? ManokaraLyrics.mode(C) : "original", ee = h || (C ? C.mc ? "Lyrics options are unavailable during a break" : R ? "Auto-saved for this song" : "Create Romaji in the song editor to enable it" : "Play a song to choose lyrics");
    Kr({
      mode: X,
      modeDisabled: !C || !!C.mc,
      romajiAvailable: R,
      modeStatus: i(ee),
      labels: fr()
    });
  }
  function Fo(h) {
    const R = C;
    if (!R || R.mc || h !== "original" && !ManokaraLyrics.validRomaji(R)) {
      $n();
      return;
    }
    R.lyricMode = h, b >= 0 && x[b] === R && p.set("lyricMode", h), ie(), $n(), dn = "", zn = -2, Zn(), Rt(), R.libraryId && R.librarySync !== !1 && kt(R).then(ye).catch(() => $n("Saved to setlist; My songs could not be updated"));
  }
  function Hi() {
    const h = {
      listLabel: i("Songs in your setlist"),
      mcBreak: i("MC break"),
      mcPrefix: i("MC break · "),
      announcement: i("Announcement"),
      lyricsReady: i(" · Lyrics ready").replace(/^\s*[·•]\s*/, ""),
      edit: i("Edit song"),
      moveUp: i("Move song up"),
      moveDown: i("Move song down"),
      remove: i("Remove from setlist"),
      setlist: i("Setlist"),
      mySongs: i("My songs"),
      libraryCount: L ? "!" : z.length,
      addSong: i("Add a song"),
      emptyTitle: i("Every set starts somewhere."),
      emptyHint: i("Add your first song, then make the evening yours."),
      clear: i("Clear setlist"),
      savedBrowser: i("Saved in this browser"),
      kind: (R, X) => oe(X.url) ? "YouTube" : i("Media")
    };
    W.ui.updateSetlist(x, C, h, d);
  }
  function en() {
    $r(), Z(), $n(), Hi();
  }
  function Ht() {
    qn(), S = "", w = [], tn(), b = -1, W.ui.updateSongEditorView({
      title: i("Add a song"),
      saveLabel: i("Add to setlist"),
      editing: !1
    }), Gn = void 0, U = void 0, Y = "", p.reset(), v.reset(), p.set("loff", 0), p.set("songKey", 0), p.set("saveToLibrary", !0), p.set("lyricLoadStatus", ""), s("#songEditorDialog").open && s("#songEditorDialog").close();
  }
  function Ca() {
    p.set("lyricLoadStatus", "");
  }
  async function Ta() {
    if (c.disposed || p.get("saving") || p.get("importBusy")) return;
    const h = p.get("url").trim();
    if (!/^https?:\/\//.test(h)) {
      te("Paste a karaoke URL first.");
      return;
    }
    const R = M(p.get("st")), X = M(p.get("en"));
    if (Number.isNaN(R) || Number.isNaN(X) || X != null && X <= (R || 0)) {
      te("Use valid times (mm:ss or seconds); End must be after Start.");
      return;
    }
    if (new TextEncoder().encode(JSON.stringify(p.get("llrc"))).length > 23e4) {
      te("Lyrics are too long for the relay (maximum 230 KB).");
      return;
    }
    let ee;
    try {
      ee = v.read();
    } catch (ft) {
      te(ft.message);
      return;
    }
    const Te = b >= 0 ? x[b] : null, ve = {
      title: (p.get("ttl").trim() || h).slice(0, 512),
      url: h,
      s: R || 0,
      e: X,
      lrc: p.get("llrc"),
      lyricSource: p.get("lyricSourceLabel") ? {
        label: p.get("lyricSourceLabel"),
        url: Vn(p.get("lyricSourceUrl")),
        copyright: p.get("lyricCopyright"),
        sources: Ki(p.get("lyricSources"))
      } : null,
      ...ee,
      ldur: Gn ?? (Te ? Te.ldur : void 0),
      off: +p.get("loff") || 0,
      pitch: ManokaraPitch.clamp(p.get("songKey")),
      ...Te?.lyricStyle ? {
        lyricStyle: Ra(Te.lyricStyle)
      } : {},
      ...Te?.libraryId ? {
        libraryId: Te.libraryId
      } : {}
    };
    if (new TextEncoder().encode(JSON.stringify({
      lrc: ManokaraLyrics.displayLrc(ve),
      romajiLrc: ManokaraLyrics.secondaryLrc(ve)
    })).length > 23e4) {
      te("Combined output lyrics exceed 230 KB. Shorten the LRC or choose a single display language.");
      return;
    }
    p.set("saving", !0);
    const Ot = p.revision;
    try {
      let ft = ve;
      if (b >= 0) {
        const gt = x[b], ti = gt.pitch !== ve.pitch, Ia = gt === C && (gt.url !== ve.url || gt.s !== ve.s || gt.e !== ve.e);
        if (Object.assign(gt, ve), ft = gt, delete gt._L, gt === C) {
          if (Gr(gt), P.refreshSongTiming(), $(ve.title), Ia || ti && P.state.pitchBusy) Yt(b);
          else if (ti) {
            const qo = gt.pitch;
            gt.pitch = ManokaraPitch.clamp(P.appliedKey), P.changeKey(qo);
          }
        }
      } else x.push(ve);
      const Sr = p.get("saveToLibrary");
      ft.librarySync = Sr, Sr && !ft.libraryId && (ft.libraryId = Se());
      const rn = ie();
      en();
      let Er = !1;
      if (Sr)
        try {
          await kt(ft), Er = !0, await ye();
        } catch {
          Er = !1;
        }
      !c.disposed && p.revision === Ot && Ht(), te(rn ? Sr ? Er ? "Saved to setlist and My songs." : "Saved to setlist. My songs could not be updated." : "Saved to setlist." : Er ? "Saved to My songs. The setlist could not be saved in this browser." : "Browser storage is full or unavailable. Changes remain in this window only."), rt(ft);
    } finally {
      p.set("saving", !1);
    }
  }
  function Uo() {
    const h = M(p.get("mcd"));
    if (!Number.isFinite(h) || h <= 0) {
      te("Enter a positive MC duration (mm:ss or seconds).");
      return;
    }
    x.push({
      mc: 1,
      memo: p.get("mcm"),
      dur: h
    }), p.patch({
      mcm: "",
      mcd: ""
    }), ie(), en();
  }
  async function La() {
    U = void 0;
    const h = p.revision, R = p.get("url").trim(), X = p.get("ttl"), ee = p.get("lq");
    if (!oe(R) || X.trim() && X.trim() !== R && X !== Y) return;
    const Te = await mt(R);
    c.disposed || h !== p.revision || !Te || p.get("url").trim() !== R || p.get("ttl") !== X && p.get("ttl").trim() || (p.set("ttl", Y = Te), (!p.get("lq") || p.get("lq") === ee) && p.set("lq", Te.replace(/\s*[\(\[【].*$/, "")));
  }
  function tn() {
    const h = S === "results" ? w.map((ee) => ({
      title: (ee.trackName + " — " + ee.artistName).slice(0, 700),
      kind: i(ee.wordTimed ? "Word-timed lyrics" : ee.syncedLyrics ? "Timed lyrics" : "Plain lyrics") + (["ttml", "yrc", "qrc"].includes(ee.format) ? " · " + ee.format.toUpperCase() : ""),
      timed: !!ee.syncedLyrics,
      sources: ee.sources.map((Te) => ({ label: Te.label, url: Vn(Te.url) })),
      duration: ee.duration ? d(ee.duration) : "—"
    })) : [], R = S === "results" ? "results" : S ? i(S) : "", X = S === "results" ? Object.entries(E).filter(([, ee]) => !["ok", "empty"].includes(ee)).map(([ee, Te]) => ({
      id: ee,
      label: Ea.find((ve) => ve.id === ee)?.label || ee,
      message: i(Hu[Te] || Hu.unavailable)
    })) : [];
    W.ui.updateLyricSearchResults(R, h, { providers: I, statuses: X, busy: S === "Searching…" });
  }
  let pr = null, mr = 0;
  function qn() {
    mr++, pr?.abort(), pr = null;
  }
  c.own(qn), Vt.then(async () => {
    const h = await window.ManokaraSession.api(Dt("/__lyrics/providers"), {}, {
      signal: AbortSignal.any([c.signal, AbortSignal.timeout(8e3)])
    });
    if (!h.ok) return;
    const R = await h.json();
    c.disposed || !Array.isArray(R.providers) || (I = $u(R.providers), p.get("lyricProvider") !== "auto" && !I.some((X) => X.id === p.get("lyricProvider") && X.enabled) && p.set("lyricProvider", "auto"), tn());
  }).catch(() => {
  });
  function Ko() {
    qn(), S = "", w = [], E = {}, tn();
  }
  async function st() {
    const h = p.get("lq").trim() || p.get("ttl").trim();
    if (!h) return;
    if (h.length > 200) {
      qn(), S = "Enter a song or artist name (1–200 characters).", w = [], tn();
      return;
    }
    qn();
    const R = pr = new AbortController(), X = mr, ee = p.get("lyricProvider"), Te = c.timeout(() => R.abort(), 16e3);
    p.set("lyricLoadStatus", ""), S = "Searching…", w = [], E = {}, tn();
    try {
      if (await Vt, c.disposed || X !== mr) return;
      if (R.signal.aborted) throw new DOMException("Timed out", "AbortError");
      const ve = await window.ManokaraSession.api(Dt("/__lyrics/search"), {
        query: h,
        provider: ee,
        duration: U > 0 ? U : null
      }, {
        signal: AbortSignal.any([c.signal, R.signal])
      }), me = await ve.json();
      if (c.disposed || X !== mr || h !== (p.get("lq").trim() || p.get("ttl").trim()) || ee !== p.get("lyricProvider")) return;
      if (!ve.ok) throw Error(ve.status === 404 ? "Restart the updated server to enable multi-source lyric search." : me.error || "Lyric search is temporarily unavailable.");
      w = Mf(me.results), Array.isArray(me.providers) && (I = $u(me.providers)), E = me.statuses && typeof me.statuses == "object" ? me.statuses : {}, S = I.some((Ot) => Ot.enabled) ? "results" : "No lyric sources are enabled on the server.", tn();
    } catch (ve) {
      if (c.disposed || X !== mr) return;
      S = R.signal.aborted ? "Lyric search took too long. Try again." : ve.message || "Search failed. Check your connection.", tn();
    } finally {
      Te(), pr === R && (pr = null);
    }
  }
  function Vo(h) {
    const R = w[h];
    if (!R) return;
    qn(), p.set("llrc", R.syncedLyrics || R.plainLyrics || ""), p.patch({
      lyricSourceLabel: R.sources.map((ee) => ee.label).join(" · "),
      lyricSourceUrl: Vn(R.sources.find((ee) => Vn(ee.url))?.url),
      lyricCopyright: R.copyright || "",
      lyricSources: JSON.stringify(Ki(R.sources))
    }), v.sourceReplaced(), Gn = R.duration;
    const X = !!R.syncedLyrics;
    p.set("lyricLoadStatus", [i(X ? "Timed lyrics loaded. Save the song to keep them." : "Plain lyrics loaded. Save the song to keep them."), Wu(R.warnings, i)].filter(Boolean).join(" ")), S = "", w = [], tn(), te(X ? "Synced lyrics picked. Press Add/Save to keep them." : "Plain text only: it will scroll roughly evenly. During playback press T to time each line.");
  }
  c.own(W.commands.bind("editor", {
    searchLyrics: st,
    clearLyricSearch: Ko,
    selectLyric: Vo,
    save: Ta,
    cancel: Ht,
    addBreak: Uo,
    urlChanged: La,
    lyricsChanged: Ca
  })), window.ManokaraSongEditorActions = W.commands.actions("editor"), c.own(W.commands.bind("player", {
    play() {
      if (C) {
        P.play();
        return;
      }
      if (!x.length) {
        te("Add a song first.");
        return;
      }
      Yt(D >= 0 && D < x.length ? D : 0);
    },
    pause: () => P.togglePause(),
    stop() {
      Yt(-1), te("Stopped. Press Play to start again.");
    },
    next() {
      Yt($e());
    },
    previous() {
      Yt(lt());
    },
    stepKey(h) {
      P.changeKey((C?.pitch || 0) + h);
    },
    resetKey() {
      P.changeKey(0);
    },
    startTabAudio: () => P.startTabAudio(),
    stopTabAudio: () => P.stopTabAudio(),
    setVolume(h) {
      f.set("vol", String(h)), P.setVolume(h), G();
    }
  })), window.ManokaraPlayerActions = W.commands.actions("player"), G();
  const Vr = et.preferences.get("theme");
  (Vr === "light" || Vr === "dark") && (document.documentElement.dataset.theme = Vr);
  const Yr = s("#transposeDialog"), Hr = [...document.querySelectorAll(".app-header,.main-tabs,#grid,#playlistStudio,.app-footer")];
  function Ma() {
    W.ui.setTransposeOpen(!1), Hr.forEach((h) => h.inert = !1), s("#transpose").focus();
  }
  function xa() {
    W.ui.setTransposeOpen(!0), Hr.forEach((h) => h.inert = !0), c.frame(() => s("#transposeClose").focus());
  }
  c.own(W.commands.bind("dialog", {
    openTranspose: xa,
    closeTranspose: Ma
  })), window.ManokaraDialogActions = W.commands.actions("dialog"), c.listen(Yr, "keydown", (h) => {
    if (h.key !== "Tab") return;
    const R = [...Yr.querySelectorAll("button:not([disabled]),a[href]")], X = R[0], ee = R.at(-1);
    h.shiftKey && document.activeElement === X ? (h.preventDefault(), ee.focus()) : !h.shiftKey && document.activeElement === ee && (h.preventDefault(), X.focus());
  }), c.listen(document, "keydown", (h) => {
    h.key === "Escape" && !Yr.hidden && (h.preventDefault(), Ma());
  });
  function $r() {
    const h = C, R = h && !h.mc ? Math.round((h.off || 0) * 10) / 10 : 0;
    Kr({
      syncValue: i("Sync: ") + (R > 0 ? "+" : R < 0 ? "−" : "") + Math.abs(R).toFixed(1) + " s" + (R > 0 ? i(" (lyrics earlier)") : R < 0 ? i(" (lyrics later)") : ""),
      syncColor: R ? "var(--ac)" : "",
      syncDisabled: !h || !!h.mc,
      labels: fr()
    });
  }
  function Nt(h) {
    const R = ie();
    return h.libraryId && h.librarySync !== !1 && kt(h).then(async () => {
      await ye(), R || te("Saved to My songs. The setlist could not be saved in this browser.");
    }).catch(() => te(R ? "Saved to setlist; My songs could not be updated" : "Browser storage is full or unavailable. Changes remain in this window only.")), R;
  }
  function Na(h) {
    const R = C;
    !R || R.mc || Number.isFinite(h) && (jt(), R.off = Math.round(h * 1e3) / 1e3, P.invalidateLyrics(), b >= 0 && x[b] === R && p.set("loff", R.off), $r(), Zn(), Nt(R), un(), $t(), Rt());
  }
  const nn = (h) => {
    C && Number.isFinite(h) && Na((Number(C.off) || 0) + h);
  }, gr = dd.map((h, R) => R === 0 ? [i(h[0]), ...h.slice(1)] : h), Pa = ["cdn", ...Ms], qr = et.preferences.loadOutput({
    fontCount: gr.length
  }).value;
  let An = Number(qr.themeSeed) >>> 0;
  f.patch({ ...Object.fromEntries(Pa.filter((h) => qr[h] != null).map((h) => [h, qr[h]])), lbold: qr.lbold ?? !0, lcenter: !!qr.centerFree });
  const Wr = () => {
    const h = vr();
    C && !C.mc && C.lyricStyle ? (C.lyricStyle = h, Nt(C)) : Wn = h;
    const R = {};
    Pa.forEach((X) => R[X] = X === "cdn" ? f.get("cdn") : Wn[X]), R.lbold = Wn.lbold, R.centerFree = Wn.centerFree, R.themeSeed = Wn.themeSeed, R.fxv = 1, et.preferences.saveOutput(R).ok || te("Browser storage is full or unavailable. Changes remain in this window only."), Jr();
  }, yr = Ms;
  function vr() {
    const h = {
      version: 1,
      lbold: f.get("lbold"),
      centerFree: f.get("lcenter"),
      themeSeed: An
    };
    return yr.forEach((R) => h[R] = f.get(R)), h;
  }
  let Wn = vr();
  function Ra(h) {
    return yd(h, Wn, {
      fontCount: gr.length
    });
  }
  function Jr() {
    W.ui.updateOBSSettingsState({
      songStyleEnabled: !!C && !C.mc,
      songStyleSaved: !!C && !C.mc && !!C.lyricStyle,
      songStyleTitle: C && !C.mc ? C.title : ""
    });
  }
  function Gr(h) {
    const R = Ra(h?.lyricStyle) || Wn;
    h?.lyricStyle?.lfx === "folia-cappella" && (h.lyricStyle = R, Nt(h)), f.patch({ ...Object.fromEntries(yr.map((X) => [X, R[X]])), lbold: R.lbold, lcenter: R.centerFree }), An = R.themeSeed, Bn(), Jn(), Jr();
  }
  function $i(h) {
    const R = C;
    !R || R.mc || (jt(), h ? R.lyricStyle = vr() : (delete R.lyricStyle, Gr(null)), Nt(R), Jr(), un(), $t(), Rt(), te(h ? "Animation settings saved for this song. Further changes save automatically." : "This song now uses the shared animation settings."));
  }
  function Bn() {
    const h = f.get("lfx"), R = h === "karaoke-classic", X = h === "jizura";
    W.ui.updateOBSSettingsState({
      classic: R,
      jizura: X,
      randomTitle: i(X ? "Reroll the JIZURA lyric-motion style for the current song" : "Select JIZURA to randomize its lyric-motion style"),
      language: ManokaraI18n.language
    });
  }
  function Yo() {
    if (f.get("lfx") !== "jizura") return;
    jt();
    const h = new Uint32Array(1);
    try {
      crypto.getRandomValues(h), An = h[0];
    } catch {
      An = (Date.now() ^ Math.floor(Math.random() * 4294967295)) >>> 0;
    }
    Wr(), un(), $t(), Rt(), te("JIZURA lyric-motion style randomized. Click again to reroll.");
  }
  function Jn() {
    let h = f.get("lshape");
    h === "auto" && (h = innerHeight > innerWidth * 1.1 ? "tall" : "wide");
    const R = f.get("lfx");
    let X;
    R === "folia-monet" ? X = "Monet keeps its original lyric-rail and portrait composition; alternating placement is not applied." : R === "folia-pendolo" ? X = "Pendolo renders its clockwork layout as one scene, so Keep centre free is skipped." : R === "folia-claddagh" ? X = "Claddagh already arranges lyrics around an open centre; its circular layout is preserved." : ["folia-fume", "folia-sonnet", "folia-tempera", "folia-lumiere", "folia-diorama"].includes(R) ? X = "This effect combines lyrics and motion in one full-frame scene, so Keep centre free is skipped to preserve the full-frame effect." : X = "Lyrics alternate around the open centre; the Folia background and full-frame effects stay in place.";
    const ee = f.get("lcenter");
    W.ui.updateOBSSettingsState({
      centerFree: ee,
      shape: h,
      centerTitle: i(ee ? "The dotted area stays clear for a character." : "Enable to keep the dotted centre area clear."),
      centerHint: i(X),
      language: ManokaraI18n.language
    });
  }
  Jn();
  function Ze(h) {
    jt(), h === "lclassiccolor" && f.set("ltheme", "effect"), Wr(), h === "lfx" && Bn(), ["lcenter", "lshape", "lfx"].includes(h) && Jn(), un(), $t(), Rt();
  }
  c.listen(window, "resize", Jn), Bn();
  function Oa() {
    if (!Tt) {
      te("Wait for the lyric relay to connect.");
      return;
    }
    const h = window.open(window.ManokaraSession.obsUrl(!0), "kpt-lyrics", "width=1280,height=720");
    te(h ? "Green-screen window opened. It shares the OBS effect output." : "Popup blocked. Please allow popups.");
  }
  let Lt = null, Qr = !1, Xr = null;
  const wr = [];
  let yi = null, vi = 0;
  function wi() {
    const h = C, R = A(), X = Xe(), ee = C ? $e() : D >= 0 ? D + 1 : 0;
    h || (yi = null), R && h && !h.mc && yi !== h && (yi = h, wr.push({
      song: h,
      title: String(h.title).slice(0, 160),
      index: vi++
    }), wr.length > 120 && wr.shift());
    const Te = Math.max(0, Math.floor(Math.max(0, X) / 120) * 120);
    return JSON.stringify({
      now: h ? h.mc ? i("MC break") : String(h.title).slice(0, 160) : "",
      next: x[ee] ? x[ee].mc ? i("MC break") : String(x[ee].title).slice(0, 160) : "",
      videoId: h && !h.mc && oe(h.url) || "",
      currentIndex: X,
      nextIndex: ee < x.length ? ee : -1,
      status: h ? P.state.counting ? "counting" : P.state.paused ? "paused" : h.mc ? "mc" : R ? "playing" : "ready" : "ready",
      songs: x.slice(Te, Te + 120).map((ve, me) => ({
        title: String(ve.mc ? i("MC break") : ve.title).slice(0, 160),
        index: me + Te
      })),
      history: wr.filter((ve) => ve.song !== h).map(({
        title: ve,
        index: me
      }) => ({
        title: ve,
        index: me
      }))
    });
  }
  const kn = ManokaraCore.createLatencyEstimator(), cn = ManokaraAudio.create(s("#audioReaction"), s("#audioStatus"));
  let Pt = null, kr = "";
  function $t() {
    const h = Vi.active ? un() : null;
    if (!(!Tt || Lt !== !0))
      try {
        const R = new URL(window.ManokaraSession.obsUrl(!1)).hash.slice(1), X = "manokara-live-" + dr + "-" + new URLSearchParams(R).get("view");
        X !== kr && (Pt?.close(), Pt = new BroadcastChannel(X), kr = X), Pt.postMessage({
          snapshot: h || un(),
          sentAt: Date.now()
        });
      } catch {
      }
  }
  c.interval($t, 100);
  function qt(h, R = !0, X = "") {
    const ee = s("#relayStatus");
    ee && (ee.dataset.state = h ? R ? "connected" : "inactive" : "error", h ? ee.textContent = i(R ? "OBS relay connected" : "OBS relay active · another window controls lyrics") : location.protocol === "file:" ? ee.innerHTML = u('OBS relay unavailable on file:// · <a href="http://localhost:8000/manokara.html">open server version</a>') : location.protocol === "https:" ? ee.textContent = i("Lyric relay unavailable · check deployment") + (X ? " · " + String(i(String(X))).replace(/[\r\n\x00-\x1f]/g, " ").slice(0, 120) : "") : ee.textContent = i("OBS relay unavailable · start the server"));
  }
  function un() {
    const h = C, R = f.get("lfc").trim().replace(/["<>]/g, ""), X = R ? '"' + R + '"' : (gr[+f.get("lfont")] || gr[0])[1], ee = P.state.countdownRemaining, Te = gr[+f.get("lfont")] || gr[0], ve = f.get("lfx"), me = ve === "jizura" ? "" : R || Te[2] || "", Ot = A(), ft = !P.state.counting && h && !h.mc ? j() : 0, Sr = ft + (h && !h.mc && !P.state.counting && h.off || 0), rn = {
      writerId: gi,
      ready: !0,
      title: h && !h.mc ? h.title : "",
      lrc: h && !h.mc ? ManokaraLyrics.displayLrc(h) : "",
      romajiLrc: h && !h.mc ? ManokaraLyrics.secondaryLrc(h) : "",
      time: Sr,
      sampledAt: Date.now(),
      timelineVersion: P.state.timelineVersion,
      playing: Ot,
      paused: !!P.state.paused,
      counting: !!P.state.counting,
      countdownRemaining: ee,
      duration: h && !h.mc ? wn(h) : 0,
      mc: !!(h && h.mc),
      memo: h && h.mc && h.memo || "",
      size: +f.get("lsz") || 64,
      foreground: ve === "karaoke-classic" ? f.get("lclassiccolor") : f.get("lcol"),
      themeSeed: An,
      background: f.get("lbgmode") === "green" ? "#00ff00" : "transparent",
      transparent: f.get("lbgmode") !== "green",
      bold: f.get("lbold"),
      font: X,
      googleFont: me,
      effect: ve,
      centerFree: f.get("lcenter"),
      centerShape: f.get("lshape"),
      colorTheme: f.get("ltheme")
    };
    return rn.overlay = window.ManokaraStudio.serialized, rn.playlist = wi(), rn.playlistTime = Math.max(0, ft), Object.assign(rn, Ot ? cn.sample() : {
      audioPower: 0,
      audioBass: 0,
      audioLowMid: 0,
      audioMid: 0,
      audioVocal: 0,
      audioTreble: 0
    }), window.ManokaraStudio.feed(rn), Vi.feed(rn), rn;
  }
  async function Rt() {
    if (!(c.disposed || c.suspended) && !(Qr || !Tt || Lt === "inactive")) {
      Qr = !0;
      try {
        const h = un();
        h.uploadDelayMs = kn.oneWay();
        const R = performance.now(), { partial: X, packet: ee } = yp(h, Xr), Te = new URL(Dt("/__lyric-state"));
        X && Te.searchParams.set("patch", "1");
        const ve = await window.ManokaraSession.api(Te, ee, {
          signal: c.signal
        });
        if (ve.status === 428) {
          Xr = null;
          return;
        }
        if (ve.status === 409) {
          Lt !== "inactive" && qt(!0, !1), Lt = "inactive";
          return;
        }
        if (!ve.ok) {
          const me = await ve.json().catch(() => ({}));
          throw Error(me.error || "Relay returned HTTP " + ve.status + ".");
        }
        await ve.json(), Xr = h, kn.record(performance.now() - R), Lt !== !0 && qt(!0), Lt = !0;
      } catch (h) {
        if (c.disposed) return;
        Lt !== !1 && qt(!1, !0, h.message || "Network request failed."), Lt = !1;
      } finally {
        Qr = !1;
      }
    }
  }
  async function Zr() {
    try {
      await navigator.clipboard.writeText(W.stores.obsSettings.getSnapshot().obsUrl), te("OBS URL copied.");
    } catch {
      if (c.disposed) return;
      s("#obsurl")?.select(), te("Select and copy the OBS URL.");
    }
  }
  async function Ho() {
    try {
      await window.ManokaraSession.rotate(), W.ui.updateOBSSettingsState({
        obsUrl: window.ManokaraSession.obsUrl(!1)
      }), window.ManokaraStudio.refresh(), te("Previous OBS links revoked. Update both lyrics and playlist Browser Sources with their new URLs.");
    } catch (h) {
      te(h.message);
    }
  }
  c.own(W.commands.bind("obs", {
    settingChanged: Ze,
    rememberSongStyle: $i,
    randomizeJizura: Yo,
    openLyricsWindow: Oa,
    copyUrl: Zr,
    rotateLink: Ho
  })), window.ManokaraObsActions = W.commands.actions("obs"), c.interval(Rt, 200), Vt.then(() => Rt()).catch((h) => {
    c.disposed || c.suspended || (qt(!1, !0, h.message), te(h.message));
  }), c.interval(() => {
    Lt === !0 && Yn("renew");
  }, 5e3);
  var Gn;
  let dn = "", zn = -2, qi = 16, Dn = [], br = {
    primary: "Your words will find their place here.",
    secondary: "Add lyrics to a song to follow along."
  }, Qn = "";
  function Xn(h, R, X = null, ee = "") {
    Dn = Array.isArray(h) ? h : [], br = X, Qn = ee;
    const Te = {
      lines: Dn,
      active: R,
      empty: X,
      info: ee,
      source: C && !C.mc && C.lyricSource || null,
      fontSize: qi,
      labels: fr()
    };
    W.ui.updateLiveLyrics(Te);
  }
  function $o(h) {
    qi = Math.min(40, Math.max(11, qi + h)), Xn(Dn, zn, br, Qn);
  }
  function Zn() {
    const h = C;
    if (!h || h.mc || !h.lrc) {
      const me = !!h && !h.mc, Ot = me ? "empty:no-lyrics" : "empty:no-song";
      dn !== Ot && (dn = Ot, zn = -1, Xn([], -1, {
        primary: i(me ? "No lyrics for this song yet." : "Your words will find their place here."),
        secondary: i(me ? "Find or import lyrics in the song editor." : "Add lyrics to a song to follow along.")
      }));
      return;
    }
    const R = In(h), X = h._L.k;
    X !== dn && (dn = X, zn = -2);
    const ee = P.state.counting ? -1 : j() + (h.off || 0);
    let Te = null;
    for (const me of R)
      if (me.t <= ee) Te = me;
      else break;
    const ve = Te ? h._L.all.indexOf(Te) : -1;
    ve !== zn && (zn = ve, Xn(h._L.all, ve, null, h._L.timed ? "" : i("Plain text: scrolling is approximate. Press T on each line to time it.")));
  }
  c.interval(Zn, 150);
  function ki() {
    const h = C;
    if (!h || h.mc || !h.lrc) {
      te("Play a song with lyrics first.");
      return;
    }
    const R = h.lrc.split(/\r?\n/), X = R.findIndex((me) => me.replace(/\[[^\]]*\]/g, "").trim() && !/^\s*\[\d+:\d{2}/.test(me));
    if (X < 0) {
      te("All lines already have times.");
      return;
    }
    const ee = Math.max(0, j() + (h.off || 0)), Te = "[" + String(Math.floor(ee / 60)).padStart(2, "0") + ":" + (ee % 60).toFixed(2).padStart(5, "0") + "]", ve = ManokaraLyrics.validRomaji(h) ? h.romaji.lrc.split(/\r?\n/) : null;
    R[X] = Te + R[X].trim(), h.lrc = R.join(`
`), ve && (ve[X] = Te + ve[X].trim(), h.romaji = {
      source: h.lrc,
      lrc: ve.join(`
`)
    }), P.invalidateLyrics(), Nt(h), Zn(), un(), $t(), Rt(), te("Timed line " + (X + 1) + ".");
  }
  c.own(W.commands.bind("lyrics", {
    setMode: Fo,
    font: $o,
    nudge: nn,
    resetSync() {
      Na(0);
    },
    tap: ki
  })), window.ManokaraLyricsActions = W.commands.actions("lyrics"), c.listen(document, "keydown", (h) => {
    ManokaraTour.active || !Yr.hidden || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(h.target.tagName) || h.ctrlKey || h.metaKey || h.altKey || (h.key === "t" || h.key === "T") && ki();
  });
  function ei() {
    W.ui.updatePlayerPanelState({
      language: ManokaraI18n.language
    }), en(), Yi(), Z(), Bn(), Jn(), $n(), tn(), fe(), Z(), W.ui.updateSongEditorView({
      title: i(b >= 0 ? "Edit song" : "Add a song"),
      saveLabel: i(b >= 0 ? "Save changes" : "Add to setlist"),
      editing: b >= 0
    }), C ? C.mc ? (W.ui.updatePlayerPanelState({
      stageMode: "mc",
      stageTitle: i("MC break"),
      stageNote: C.memo || i("Take a moment between songs.")
    }), $(i("MC break"))) : !oe(C.url) && !/\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(C.url) && W.ui.updatePlayerPanelState({
      stageMode: "external",
      stageTitle: i("Open this link to play."),
      stageNote: i("This media opens in a new tab. Your lyric clock is running here."),
      stageUrl: C.url,
      stageLinkLabel: i("Open media")
    }) : (W.ui.updatePlayerPanelState({
      stageMode: "empty",
      stageTitle: "",
      stageNote: "",
      stageUrl: ""
    }), $(i("Nothing playing yet"))), !C || C.mc || !C.lrc ? (dn = "", Zn()) : C._L && Xn(Dn, zn, null, C._L.timed ? "" : i("Plain text: scrolling is approximate. Press T on each line to time it.")), P.state.counting && (V({
      visible: !0,
      title: C.title,
      remaining: P.state.countdownRemaining
    }), ne(i("Starting in ") + Math.ceil(P.state.countdownRemaining) + " s")), Lt !== null ? qt(Lt === !0 || Lt === "inactive", Lt !== "inactive") : s("#relayStatus").textContent = i("Connecting to OBS…"), Tt || W.ui.updateOBSSettingsState({
      obsUrl: i("Connecting…")
    }), te(ce);
  }
  c.listen(window, "manokara:languagechange", () => {
    en(), fe(), G();
  }), ManokaraI18n.init(), ManokaraStudio.init({
    changed: () => Rt(),
    url: (h) => Tt ? ManokaraSession.obsUrl(!1, h) : "",
    clearHistory() {
      wr.length = 0, vi = 0, Rt();
    }
  }), c.listen(window, "manokara:languagechange", ei), ei(), ManokaraTour.init({
    showTab: g,
    showMain: ManokaraStudio.showMain,
    main: () => ManokaraStudio.main
  }), c.own(W.commands.bind("youtubeSearch", {
    search: async ({
      query: h,
      karaoke: R,
      signal: X
    }) => (await Vt, window.ManokaraSession.api(Dt("/__youtube/search"), {
      query: h,
      karaoke: R
    }, {
      signal: X
    }))
  })), window.ManokaraYoutubeSearchService = W.commands.actions("youtubeSearch").search;
  function Wi(h) {
    const R = s("#panel-song");
    return oe(p.get("url").trim()) === h.id ? (g("song"), R.scrollTop = 0, s(".field-grid").scrollIntoView({
      block: "nearest",
      behavior: "instant"
    }), s("#ttl").focus({
      preventScroll: !0
    }), !0) : (b >= 0 || ["url", "ttl", "st", "en", "llrc", "romajiLrc"].some((ee) => p.get(ee).trim())) && !confirm(i("Replace the current song draft with this video? Unsaved edits will be discarded.")) ? !1 : (Ht(), p.set("url", "https://www.youtube.com/watch?v=" + h.id), p.set("ttl", h.title), p.set("lq", h.title.replace(/\s*[\(\[【].*$/, "")), Gn = h.duration ?? void 0, U = h.duration ?? void 0, g("song"), R.scrollTop = 0, s(".field-grid").scrollIntoView({
      block: "nearest",
      behavior: "instant"
    }), s("#ttl").focus({
      preventScroll: !0
    }), te("Video selected. Find lyrics if you like, then Add to setlist."), !0);
  }
  c.own(W.commands.bind("youtube", {
    choose: Wi
  })), window.ManokaraYoutubeActions = W.commands.actions("youtube");
  function Ji({
    navigation: h = !1
  } = {}) {
    c.disposed || (Yn("release"), P.dispose({
      preserveCapture: h
    }), c.dispose(), Pt?.close(), Pt = null, et.library.close(), et.playlists.close(), cn.dispose?.(), window.removeEventListener("pagehide", bn), window.removeEventListener("pageshow", bi));
  }
  function bn(h) {
    h.persisted ? (P.suspend(), cn.stop?.(), un(), $t(), Rt(), c.suspend(), Pt?.close(), Pt = null) : Ji({
      navigation: !0
    });
  }
  function bi(h) {
    !h.persisted || c.disposed || (c.resume(), s("#libraryDialog").open && ye(), P.resume(), Xr = null, jt(), un(), $t(), Rt());
  }
  return window.addEventListener("pagehide", bn), window.addEventListener("pageshow", bi), window.ManokaraController = {
    dispose: Ji,
    start: () => P.start(),
    get active() {
      return !c.disposed;
    },
    getSnapshot: () => P.getSnapshot(),
    diagnostics: () => ({
      timers: c.timerCount,
      activeTimers: c.activeTimerCount,
      listeners: c.cleanupCount,
      playback: P.getSnapshot()
    })
  }, P.start(), window.ManokaraController;
}
const Ke = l.createElement;
function wp({
  results: i,
  active: u,
  onSelect: s
}) {
  const c = (p) => {
    if (!Number.isFinite(p) || p <= 0) return "";
    const f = Math.floor(p), g = Math.floor(f / 3600), y = Math.floor(f / 60) % 60, d = f % 60;
    return `${g ? `${g}:` : ""}${g ? String(y).padStart(2, "0") : y}:${String(d).padStart(2, "0")}`;
  };
  return Ke(l.Fragment, null, i.map((p, f) => {
    const g = c(p.duration);
    return Ke("div", {
      key: p.id,
      className: "youtube-result",
      id: `youtube-result-${f}`,
      tabIndex: -1,
      role: "option",
      "aria-selected": f === u,
      "aria-label": p.title + (p.channel ? ` — ${p.channel}` : "") + (g ? ` · ${g}` : ""),
      onMouseDown: (y) => {
        y.button === 0 && y.preventDefault();
      },
      onClick: () => s(f)
    }, Ke("div", {
      className: "youtube-thumbnail"
    }, Ke("img", {
      src: `https://i.ytimg.com/vi/${p.id}/mqdefault.jpg`,
      alt: "",
      loading: "lazy",
      decoding: "async",
      referrerPolicy: "no-referrer"
    }), g && Ke("span", null, g)), Ke("div", {
      className: "youtube-result-copy"
    }, Ke("strong", null, p.title), Ke("small", null, p.channel || "YouTube")), Ke("span", {
      className: "youtube-select",
      "aria-hidden": "true"
    }, "↗"));
  }));
}
function kp() {
  const [i, u] = Be.useState(""), [s, c] = Be.useState(() => et.preferences.get("preferKaraoke") !== "false"), [p, f] = Be.useState(!1), [g, y] = Be.useState([]), [d, M] = Be.useState(-1), [x, C] = Be.useState("idle"), [N, D] = Be.useState(""), [b, w] = Be.useState(!1), [S, E] = Be.useState(480), [I, U] = Be.useState(() => window.ManokaraI18n?.language || "en"), P = Be.useRef(null), A = Be.useRef(null), j = Be.useRef(null), V = Be.useRef(null), Q = Be.useRef(0), G = Be.useRef(null), $ = Be.useRef(0), ne = Be.useRef(""), Z = Be.useRef(""), Y = Be.useRef(!1), J = Be.useRef(null), ie = Be.useRef(null), ce = Be.useRef(/* @__PURE__ */ new Map()), te = (q) => window.ManokaraI18n?.text(q) || q, v = i.trim().replace(/\s+/g, " "), z = `${v}|${s}`;
  function _() {
    const q = j.current;
    if (!q || !p) return;
    const fe = q.getBoundingClientRect().top;
    E(Math.max(120, Math.min(480, innerHeight - fe - 12)));
  }
  function k() {
    clearTimeout(Q.current), $.current++, G.current?.abort(), G.current = null, ne.current = "";
  }
  function L() {
    k(), f(!1), M(-1), x === "loading" && C("idle");
  }
  J.current = L, ie.current = _;
  function re(q) {
    k(), u(q), y([]), M(-1), Z.current = "", C("idle"), D(""), f(!0);
  }
  async function de(q = v, fe = s) {
    if (Y.current) return;
    const ye = q.trim().replace(/\s+/g, " "), Oe = `${ye}|${fe}`;
    if (!ye) {
      f(!0), C("idle");
      return;
    }
    if (ne.current === Oe) {
      f(!0);
      return;
    }
    k();
    const Fe = $.current;
    y([]), M(-1), Z.current = "", D("");
    const Pe = ce.current.get(Oe);
    if (Pe && Pe.expires > Date.now()) {
      y(Pe.results), Z.current = Oe, C(Pe.results.length ? "results" : "empty"), f(!0);
      return;
    }
    const we = new AbortController();
    G.current = we, ne.current = Oe, C("loading"), f(!0);
    try {
      const Ie = W.commands.actions("youtubeSearch").search;
      if (!Ie) throw new Error("YouTube search is not ready yet.");
      const Le = await Ie({
        query: ye,
        karaoke: fe,
        signal: we.signal
      }), Ue = await Le.json();
      if (Fe !== $.current || we.signal.aborted) return;
      if (!Le.ok) throw Error(Le.status === 404 ? "Restart the updated server to enable YouTube search." : Ue.error || "YouTube search is temporarily unavailable. Try again or search on YouTube.");
      if (!Array.isArray(Ue.results)) throw Error("YouTube search is temporarily unavailable. Try again or search on YouTube.");
      const He = Ue.results.filter((Ge) => Ge && typeof Ge.id == "string" && /^[A-Za-z0-9_-]{11}$/.test(Ge.id) && typeof Ge.title == "string").slice(0, 8).map((Ge) => ({
        id: Ge.id,
        title: Ge.title.slice(0, 512),
        channel: typeof Ge.channel == "string" ? Ge.channel.slice(0, 160) : "",
        duration: typeof Ge.duration == "number" ? Ge.duration : null
      }));
      for (ce.current.delete(Oe), ce.current.set(Oe, {
        results: He,
        expires: Date.now() + 12e4
      }); ce.current.size > 30; ) ce.current.delete(ce.current.keys().next().value);
      Z.current = Oe, y(He), C(He.length ? "results" : "empty");
    } catch (Ie) {
      if (Fe !== $.current || we.signal.aborted) return;
      C("error"), D(Ie.name === "TimeoutError" ? "YouTube search took too long. Try again." : Ie.name === "TypeError" ? "Could not connect. Check your connection and try again." : Ie.message || "YouTube search is temporarily unavailable. Try again or search on YouTube."), y([]), M(-1);
    } finally {
      Fe === $.current && (G.current = null, ne.current = "");
    }
  }
  function ge(q) {
    const fe = g[q];
    fe && (W.commands.actions("youtube")?.choose(fe) !== !1 ? L() : A.current?.focus({
      preventScroll: !0
    }));
  }
  function Ae(q) {
    if (!g.length) return;
    const fe = (q + g.length) % g.length;
    M(fe), requestAnimationFrame(() => V.current?.querySelector(`#youtube-result-${fe}`)?.scrollIntoView({
      block: "nearest",
      inline: "nearest"
    }));
  }
  function xe(q) {
    Y.current || q.isComposing || (q.key === "Escape" && p ? (q.preventDefault(), q.stopPropagation(), L()) : q.key === "ArrowDown" || q.key === "ArrowUp" ? (q.preventDefault(), f(!0), g.length ? Ae(d < 0 ? q.key === "ArrowDown" ? 0 : g.length - 1 : d + (q.key === "ArrowDown" ? 1 : -1)) : v.length >= 2 && de()) : q.key === "Enter" && p && d >= 0 && (q.preventDefault(), ge(d)));
  }
  Be.useEffect(() => {
    if (!(!p || b || v.length < 2 || Z.current === z || x === "loading"))
      return Q.current = setTimeout(() => de(v, s), 850), () => clearTimeout(Q.current);
  }, [p, v, s, x, b]), Be.useEffect(() => {
    const q = () => U(window.ManokaraI18n?.language || "en"), fe = (Oe) => {
      P.current?.contains(Oe.target) || J.current?.();
    }, ye = () => ie.current?.();
    return window.addEventListener("manokara:languagechange", q), window.addEventListener("resize", ye), document.addEventListener("pointerdown", fe, !0), () => {
      window.removeEventListener("manokara:languagechange", q), window.removeEventListener("resize", ye), document.removeEventListener("pointerdown", fe, !0), k();
    };
  }, []), Be.useLayoutEffect(() => {
    p && _();
  }, [p, I]);
  const he = {
    idle: "Type a song or artist. Search starts after 2 characters.",
    loading: "Searching YouTube…",
    results: "Choose a video to fill the song editor.",
    empty: "No matching videos. Try another name."
  }, Ne = te(x === "error" ? N : he[x] || he.idle), Se = v || "karaoke", je = s && !/karaoke|カラオケ/i.test(Se) ? `${Se} karaoke` : Se, kt = `https://www.youtube.com/results?search_query=${encodeURIComponent(je)}`;
  return /* @__PURE__ */ l.createElement("div", { className: "header-search", ref: P, role: "search", "aria-label": te("Find music on YouTube") }, /* @__PURE__ */ l.createElement("form", { id: "musicSearchForm", className: "music-search-form", onSubmit: (q) => {
    q.preventDefault(), de();
  } }, /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#magnifying-glass" })), /* @__PURE__ */ l.createElement("input", { ref: A, id: "musicSearch", type: "search", maxLength: 160, placeholder: te("Find a song on YouTube…"), "aria-label": te("Find a song on YouTube"), role: "combobox", "aria-autocomplete": "list", "aria-expanded": p, "aria-activedescendant": d >= 0 ? `youtube-result-${d}` : void 0, "aria-controls": "youtubeResults", autoComplete: "off", spellCheck: !1, value: i, onChange: (q) => re(q.target.value), onFocus: () => f(!0), onKeyDown: xe, onCompositionStart: () => {
    Y.current = !0, w(!0), k();
  }, onCompositionEnd: (q) => {
    Y.current = !1, w(!1), re(q.currentTarget.value);
  } }), /* @__PURE__ */ l.createElement("label", { className: "karaoke-search-toggle", title: te("Prefer karaoke versions") }, /* @__PURE__ */ l.createElement("input", { type: "checkbox", checked: s, onChange: (q) => {
    const fe = q.target.checked;
    c(fe), et.preferences.set("preferKaraoke", String(fe)), re(i), A.current?.focus({
      preventScroll: !0
    });
  } }), /* @__PURE__ */ l.createElement("span", null, te("Karaoke"))), /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", type: "submit", "aria-label": te("Search YouTube"), title: te("Search YouTube") }, /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#caret-right" })))), /* @__PURE__ */ l.createElement("div", { ref: j, id: "musicSearchMenu", className: "music-search-menu", hidden: !p, style: {
    maxHeight: S
  }, onBlurCapture: () => setTimeout(() => {
    P.current?.contains(document.activeElement) || L();
  }, 0) }, /* @__PURE__ */ l.createElement("div", { className: "music-search-heading" }, /* @__PURE__ */ l.createElement("span", { id: "musicSearchStatus", role: "status", "aria-live": "polite" }, Ne), /* @__PURE__ */ l.createElement("button", { className: "ghost icon-button", type: "button", "aria-label": te("Close search results"), title: te("Close search results"), onClick: () => {
    A.current?.focus({
      preventScroll: !0
    }), L();
  } }, /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#x" })))), /* @__PURE__ */ l.createElement("div", { ref: V, id: "youtubeResults", className: "youtube-results", role: "listbox", "aria-label": te("YouTube search results"), "aria-busy": x === "loading" }, /* @__PURE__ */ l.createElement(wp, { results: g, active: d, onSelect: ge })), /* @__PURE__ */ l.createElement("div", { className: "music-search-footer" }, /* @__PURE__ */ l.createElement("small", null, "↑ ↓ ", te("to choose"), " · Enter ", te("to select")), /* @__PURE__ */ l.createElement("a", { href: kt, target: "_blank", rel: "noopener noreferrer" }, te("Search on YouTube"), /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#arrow-up-right" }))))));
}
function bp({
  state: i
}) {
  const u = (s) => () => W.commands.actions("tour")?.[s]?.();
  return /* @__PURE__ */ l.createElement("div", { className: "tour-overlay", hidden: !i.open }, /* @__PURE__ */ l.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ l.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ l.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ l.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ l.createElement("div", { className: "tour-spotlight", "aria-hidden": "true" }), /* @__PURE__ */ l.createElement("section", { className: "tour-card", role: "dialog", "aria-modal": "true", "aria-labelledby": "tourTitle", "aria-describedby": "tourBody" }, /* @__PURE__ */ l.createElement("div", { className: "tour-top" }, /* @__PURE__ */ l.createElement("span", { className: "tour-eyebrow" }, i.eyebrow), /* @__PURE__ */ l.createElement("select", { value: i.language, "aria-label": i.languageLabel, onChange: (s) => W.commands.actions("tour")?.setLanguage(s.target.value) }, /* @__PURE__ */ l.createElement("option", { value: "vi" }, "Tiếng Việt"), /* @__PURE__ */ l.createElement("option", { value: "en" }, "English")), /* @__PURE__ */ l.createElement("button", { className: "ghost tour-close", type: "button", "data-tour": "close", "aria-label": i.closeLabel, title: i.closeLabel, onClick: u("close") }, "×")), /* @__PURE__ */ l.createElement("p", { className: "tour-progress", "aria-live": "polite" }, i.progress), /* @__PURE__ */ l.createElement("h2", { id: "tourTitle" }, i.title), /* @__PURE__ */ l.createElement("p", { id: "tourBody" }, i.body), /* @__PURE__ */ l.createElement("div", { className: "tour-track", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("div", { className: "tour-meter", style: {
    width: `${i.meter}%`
  } })), /* @__PURE__ */ l.createElement("div", { className: "tour-actions" }, /* @__PURE__ */ l.createElement("button", { className: "ghost", type: "button", "data-tour": "skip", onClick: u("close") }, i.skipLabel), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("button", { className: "s", type: "button", "data-tour": "back", disabled: i.backDisabled, onClick: u("back") }, i.backLabel), /* @__PURE__ */ l.createElement("button", { type: "button", "data-tour": "next", onClick: u("next") }, i.nextLabel)))));
}
function Sp() {
  const [i, u] = Be.useState(() => window.ManokaraI18n?.language || "en"), s = (c) => Ke("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ke("use", {
    href: `./manokara-icons.svg#${c}`
  }));
  return Be.useEffect(() => {
    const c = () => u(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:languagechange", c), () => window.removeEventListener("manokara:languagechange", c);
  }, []), Ke("div", {
    className: "app-header-react-grid"
  }, Ke("div", {
    className: "brand"
  }, Ke("div", {
    className: "brand-mark"
  }, s("cactus")), Ke("h1", null, "manokara")), Ke(kp), Ke("div", {
    className: "header-actions"
  }, Ke("label", {
    className: "language-control"
  }, Ke("select", {
    id: "language",
    "aria-label": "Interface language",
    value: i,
    onChange: (c) => window.ManokaraI18n?.setLanguage(c.target.value)
  }, Ke("option", {
    value: "vi"
  }, "Tiếng Việt"), Ke("option", {
    value: "en"
  }, "English"))), Ke("button", {
    className: "s",
    id: "help",
    type: "button",
    title: "Open the guided tour",
    "aria-haspopup": "dialog",
    onClick: () => window.ManokaraTour?.open()
  }, Ke("span", {
    className: "help-symbol",
    "aria-hidden": "true"
  }, "?"), Ke("span", null, "Help")), Ke("div", {
    className: "connection"
  }, s("broadcast"), Ke("span", {
    id: "relayStatus",
    role: "status"
  }, "Connecting to OBS…")), Ke("button", {
    className: "s",
    id: "transpose",
    type: "button",
    title: "Change song key",
    onClick: () => W.commands.actions("dialog")?.openTranspose()
  }, s("sliders-horizontal"), Ke("span", null, "Key")), Ke("button", {
    className: "s",
    id: "theme",
    type: "button",
    title: "Switch between light and dark theme",
    "aria-label": "Switch color theme",
    onClick: () => {
      const c = document.documentElement, p = c.dataset.theme || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
      c.dataset.theme = p === "dark" ? "light" : "dark", et.preferences.set("theme", c.dataset.theme);
    }
  }, s("circle-half"), Ke("span", null, "Theme"))));
}
function Ep() {
  const [i, u] = Be.useState(() => window.ManokaraI18n?.language || "en");
  Be.useEffect(() => {
    const c = () => u(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:languagechange", c), () => window.removeEventListener("manokara:languagechange", c);
  }, []);
  const s = (c) => window.ManokaraI18n?.text(c) || c;
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement("span", { lang: i }, s("Sing your way. Your setlist, your room.")), /* @__PURE__ */ l.createElement("details", { lang: i }, /* @__PURE__ */ l.createElement("summary", null, s("Credits & licenses"), /* @__PURE__ */ l.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ l.createElement("use", { href: "./manokara-icons.svg#caret-right" }))), /* @__PURE__ */ l.createElement("div", { className: "credits-links" }, /* @__PURE__ */ l.createElement("a", { href: "/sources/FOLIA-MAJOR-NOTICE.txt" }, s("Folia notices")), /* @__PURE__ */ l.createElement("a", { href: "/sources/FOLIA-MAJOR-SOURCE.zip" }, s("Folia source")), /* @__PURE__ */ l.createElement("a", { href: "/sources/FOLIA-INTEGRATION-SOURCE/manokara-folia.tsx" }, s("Integration source")), /* @__PURE__ */ l.createElement("a", { href: "/sources/JIZURA-LICENSE.txt" }, s("JIZURA license")), /* @__PURE__ */ l.createElement("a", { href: "/romaji-assets/NOTICES.txt" }, s("Romaji notices")), /* @__PURE__ */ l.createElement("a", { href: "/ui-assets/NOTICES.txt" }, s("Interface fonts & icons")))));
}
function Cp() {
  return /* @__PURE__ */ l.createElement("main", { id: "grid", tabIndex: -1, role: "tabpanel", "aria-labelledby": "main-karaoke" }, /* @__PURE__ */ l.createElement("aside", { className: "card", id: "setlistSide", "aria-labelledby": "setlistTitle" }), /* @__PURE__ */ l.createElement("div", { id: "maincol" }, /* @__PURE__ */ l.createElement("div", { id: "playerReactRoot" })), /* @__PURE__ */ l.createElement("section", { className: "card", id: "workspace", "aria-label": "OBS output settings" }, /* @__PURE__ */ l.createElement("div", { id: "obsSettingsReactRoot" })), /* @__PURE__ */ l.createElement("aside", { className: "card", id: "side", "aria-labelledby": "lyricsTitle" }));
}
function Tp() {
  const [i, u] = Be.useState(() => window.ManokaraStudio?.view || {
    target: "playlist",
    selected: "current"
  });
  Be.useLayoutEffect(() => {
    const d = (M) => u(M.detail || window.ManokaraStudio?.view || {
      target: "playlist",
      selected: "current"
    });
    return window.addEventListener("manokara:studioviewchange", d), () => window.removeEventListener("manokara:studioviewchange", d);
  }, []);
  const s = (d) => window.ManokaraStudio?.text?.(d) || window.ManokaraI18n?.text(d) || d, c = (d) => /* @__PURE__ */ l.createElement("span", { "data-studio-copy": d }, s(d)), p = (d, M) => /* @__PURE__ */ l.createElement("option", { key: d, value: d, "data-studio-copy": M }, s(M)), f = (d, M, x = "text", C = {}) => /* @__PURE__ */ l.createElement("label", { className: "field", key: M }, /* @__PURE__ */ l.createElement("span", { "data-studio-copy": d }, s(d)), /* @__PURE__ */ l.createElement("input", { id: M, type: x, ...C })), g = {
    glass: "Broadcast dashboard",
    paper: "A paper setlist",
    minimal: "Let the type speak",
    card: "Artwork in the spotlight",
    vinyl: "At the turntable",
    signal: "A compact lower third"
  }, y = window.ManokaraOverlay?.themes || ["glass", "paper", "minimal", "card", "vinyl", "signal"];
  return /* @__PURE__ */ l.createElement("div", { className: "studio-react-shell" }, /* @__PURE__ */ l.createElement("div", { id: "studioPresets", className: "studio-presets", role: "group", "aria-label": "Playlist presets" }, y.map((d) => /* @__PURE__ */ l.createElement("button", { key: d, className: "studio-preset", "data-theme-preset": d }, /* @__PURE__ */ l.createElement("span", { className: `preset-art ${d}`, "data-theme-preview": d, "aria-hidden": "true" }), /* @__PURE__ */ l.createElement("span", { className: "preset-name", "data-studio-copy": d[0].toUpperCase() + d.slice(1) }, s(d[0].toUpperCase() + d.slice(1))), /* @__PURE__ */ l.createElement("small", { className: "preset-description", "data-studio-copy": g[d] }, s(g[d]))))), /* @__PURE__ */ l.createElement("div", { className: "studio-body" }, /* @__PURE__ */ l.createElement("section", { className: "card studio-preview-pane", "aria-labelledby": "studioPreviewTitle" }, /* @__PURE__ */ l.createElement("div", { className: "studio-preview-toolbar" }, /* @__PURE__ */ l.createElement("h3", { id: "studioPreviewTitle" }, c("Live preview")), /* @__PURE__ */ l.createElement("div", { className: "row" }, /* @__PURE__ */ l.createElement("select", { id: "studioData", "aria-label": "Preview data" }, p("sample", "Sample data"), p("live", "Live data")), /* @__PURE__ */ l.createElement("select", { id: "studioBgView", "aria-label": "Preview background" }, p("checker", "Checkerboard"), p("dark", "Dark"), p("light", "Light"), p("scene", "Scene guide")), /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioBoth", type: "checkbox" }), c("Both overlays"))), /* @__PURE__ */ l.createElement("div", { className: "studio-history-tools" }, /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "expand", "aria-haspopup": "dialog", "aria-expanded": "false" }, c("View larger")), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "undo" }, c("Undo")), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "redo" }, c("Redo")), /* @__PURE__ */ l.createElement("button", { className: "ghost", "data-action": "reset" }, c("Reset layout")))), /* @__PURE__ */ l.createElement("div", { className: "studio-preview-space" }, /* @__PURE__ */ l.createElement("div", { id: "studioPreview", className: "studio-preview", "data-bg": "checker" }, /* @__PURE__ */ l.createElement("div", { id: "studioCanvas" }), /* @__PURE__ */ l.createElement("div", { id: "studioEmpty", className: "studio-empty", role: "status", hidden: !0 })), /* @__PURE__ */ l.createElement("span", { id: "studioFrameBadge", className: "studio-frame-badge" })), /* @__PURE__ */ l.createElement("small", { className: "studio-source-note" }, c("Drag blocks to move; resize with handles. Arrow keys nudge or resize. Preview background is local; OBS remains transparent.")), /* @__PURE__ */ l.createElement("div", { className: "studio-link" }, /* @__PURE__ */ l.createElement("input", { id: "studioObsUrl", readOnly: !0, "aria-label": "Overlay OBS URL" }), /* @__PURE__ */ l.createElement("button", { "data-action": "copy" }, c("Copy OBS link")), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "open" }, c("Open output"))), /* @__PURE__ */ l.createElement("small", { className: "studio-source-note" }, /* @__PURE__ */ l.createElement("b", { id: "studioSourceSize" }), " · ", c("Use these dimensions for both OBS Browser Sources. Keep this page open while singing.")), /* @__PURE__ */ l.createElement("div", { id: "studioStatus", className: "studio-status", role: "status" })), /* @__PURE__ */ l.createElement("aside", { className: "card studio-controls", "aria-label": "Overlay settings" }, /* @__PURE__ */ l.createElement("details", { className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Output frame")), /* @__PURE__ */ l.createElement("small", null, c("Canvas dimensions"))), /* @__PURE__ */ l.createElement("label", { className: "field" }, c("Frame size"), /* @__PURE__ */ l.createElement("select", { id: "studioFrame" }, p("1920x1080", "Landscape 1080p"), p("1280x720", "Landscape 720p"), p("1080x1920", "Portrait")))), /* @__PURE__ */ l.createElement("details", { id: "studioLyricSettings", className: "studio-section studio-accordion", hidden: !0 }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Lyrics appearance")), /* @__PURE__ */ l.createElement("small", null, c("Settings here are shared with Karaoke → OBS output."))), /* @__PURE__ */ l.createElement("div", { id: "studioLyricControlHost" })), /* @__PURE__ */ l.createElement("details", { id: "studioLayoutSection", className: "studio-section studio-accordion" }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Layout")), /* @__PURE__ */ l.createElement("small", null, c("Panel structure"))), /* @__PURE__ */ l.createElement("label", { className: "field" }, c("Layout mode"), /* @__PURE__ */ l.createElement("select", { id: "studioLayout" }, p("separate", "Separate blocks"), p("unified", "One unified panel"))), /* @__PURE__ */ l.createElement("small", { id: "studioGroupNote" }, c("Move and resize the whole panel. Select a section below to edit its text."))), /* @__PURE__ */ l.createElement("details", { id: "studioBlockSection", className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Blocks")), /* @__PURE__ */ l.createElement("small", null, c("Choose what to edit"))), /* @__PURE__ */ l.createElement("div", { id: "studioBlocks", className: `studio-blocks${i.target === "lyrics" ? " studio-blocks-single" : ""}`, role: "group", "aria-label": s("Blocks") }, (i.target === "lyrics" ? ["lyric"] : ["current", "list", "next"]).map((d) => {
    const M = {
      current: "Now Singing",
      list: "Song List",
      next: "Next On",
      lyric: "Lyric viewport"
    };
    return /* @__PURE__ */ l.createElement("button", { key: d, className: "s", type: "button", "data-select": d, "aria-pressed": i.selected === d }, s(M[d]));
  })), /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioVisible", type: "checkbox" }), c("Show this block"))), /* @__PURE__ */ l.createElement("details", { id: "studioGeometry", className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Position & size")), /* @__PURE__ */ l.createElement("small", null, c("Drag on preview or enter values"))), /* @__PURE__ */ l.createElement("div", { className: "studio-fields" }, f("X", "studioX", "number", {
    min: "0",
    step: "any"
  }), f("Y", "studioY", "number", {
    min: "0",
    step: "any"
  }), f("Width", "studioW", "number", {
    min: "32",
    step: "any"
  }), f("Height", "studioH", "number", {
    min: "32",
    step: "any"
  })), /* @__PURE__ */ l.createElement("label", { className: "inline-check studio-aspect-lock" }, /* @__PURE__ */ l.createElement("input", { id: "studioAspectLock", type: "checkbox" }), c("Keep aspect ratio"), /* @__PURE__ */ l.createElement("small", { id: "studioAspectRatio" })), /* @__PURE__ */ l.createElement("div", { className: "studio-position-actions" }, /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "top-center" }, c("Top center")), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "center" }, c("Center block")), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "bottom-center" }, c("Bottom center"))), /* @__PURE__ */ l.createElement("div", { id: "studioCompactSettings" }, /* @__PURE__ */ l.createElement("label", { id: "studioAutoFitField", className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioAutoFit", type: "checkbox" }), c("Fit frame to lyrics")), /* @__PURE__ */ l.createElement("small", { id: "studioAutoFitNote" }, c("Fits the longest lines in this song. Manual position or size edits turn this off.")), /* @__PURE__ */ l.createElement("small", null, c("Text effects use a compact frame. Scene effects and Keep centre free use the full lyric viewport.")))), /* @__PURE__ */ l.createElement("details", { id: "blockTypography", className: "studio-section studio-accordion" }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Typography")), /* @__PURE__ */ l.createElement("small", null, c("Text style"))), f("Heading", "studioLabel", "text", {
    maxLength: 80
  }), /* @__PURE__ */ l.createElement("div", { className: "studio-fields" }, f("Text size", "studioSize", "number", {
    min: 12,
    max: 96
  }), /* @__PURE__ */ l.createElement("label", { className: "field" }, c("Alignment"), /* @__PURE__ */ l.createElement("select", { id: "studioAlign" }, p("left", "Left"), p("center", "Center"), p("right", "Right")))), /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioBold", type: "checkbox" }), c("Bold"))), /* @__PURE__ */ l.createElement("details", { id: "playlistAppearance", className: "studio-section studio-accordion" }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Appearance")), /* @__PURE__ */ l.createElement("small", null, c("Colors and song list"))), /* @__PURE__ */ l.createElement("div", { className: "studio-fields" }, f("Text", "studioFg", "color"), f("Accent", "studioAccent", "color"), f("Panel", "studioBg", "color"), f("Panel opacity", "studioOpacity", "number", {
    min: 0,
    max: 1,
    step: 0.05
  }), f("Corner radius", "studioRadius", "number", {
    min: 0,
    max: 80
  }), /* @__PURE__ */ l.createElement("label", { className: "field" }, c("Font"), /* @__PURE__ */ l.createElement("select", { id: "studioFont" }, p("system", "System"), p("geist", "Geist"), p("serif", "Serif"), p("mono", "Mono")))), /* @__PURE__ */ l.createElement("label", { className: "field" }, c("List content"), /* @__PURE__ */ l.createElement("select", { id: "studioListMode" }, p("all", "Whole setlist"), p("upcoming", "Upcoming songs"), p("history", "Sung history"))), f("Static list limit", "studioLimit", "number", {
    min: 1,
    max: 20
  }), /* @__PURE__ */ l.createElement("label", { id: "studioAutoScrollField", className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioAutoScroll", type: "checkbox" }), c("Auto-scroll song list")), /* @__PURE__ */ l.createElement("div", { id: "studioScrollSettings" }, /* @__PURE__ */ l.createElement("div", { className: "studio-fields" }, f("Scroll speed (px/s)", "studioScrollSpeed", "number", {
    min: 8,
    max: 80,
    step: 1
  }), f("Pause at each end (s)", "studioScrollPause", "number", {
    min: 0,
    max: 10,
    step: 0.5
  })), /* @__PURE__ */ l.createElement("small", null, c("Auto-scroll shows the whole list. Short lists stay still."))), /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioNumbering", type: "checkbox" }), c("Show numbers")), /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioProgress", type: "checkbox" }), c("Show progress")), /* @__PURE__ */ l.createElement("label", { className: "inline-check" }, /* @__PURE__ */ l.createElement("input", { id: "studioHideIdle", type: "checkbox" }), c("Hide when idle")), /* @__PURE__ */ l.createElement("button", { className: "ghost", "data-action": "history" }, c("Clear sung history"))), /* @__PURE__ */ l.createElement("details", { className: "studio-section studio-accordion studio-export" }, /* @__PURE__ */ l.createElement("summary", null, /* @__PURE__ */ l.createElement("span", null, c("Layout files")), /* @__PURE__ */ l.createElement("small", null, c("Save or restore a layout"))), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "export" }, c("Export layout")), /* @__PURE__ */ l.createElement("button", { className: "s", "data-action": "import" }, c("Import layout")), /* @__PURE__ */ l.createElement("input", { id: "studioImport", type: "file", accept: ".json,application/json", hidden: !0 })))));
}
function Lp() {
  return /* @__PURE__ */ l.createElement(Tp, null);
}
function Mp() {
  const [i, u] = Be.useState(() => window.ManokaraStudio?.view?.target || "playlist"), [s, c] = Be.useState(() => window.ManokaraI18n?.language || "en"), p = s === "vi" ? {
    eyebrow: "CHỈNH OVERLAY",
    title: "Playlist & Lyric Overlay",
    description: "Chọn giao diện, kéo các khối trên phần xem trước rồi sao chép link vào OBS.",
    playlist: "Playlist",
    lyrics: "Lời bài hát",
    tabs: "Loại overlay"
  } : {
    eyebrow: "OVERLAY STUDIO",
    title: "Playlist & Lyric Overlay",
    description: "Choose a style, arrange blocks in the preview, then copy the OBS link.",
    playlist: "Playlist",
    lyrics: "Lyrics",
    tabs: "Overlay type"
  };
  l.useEffect(() => {
    const y = (M) => u(M.detail === "lyrics" ? "lyrics" : "playlist"), d = () => c(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:overlaytargetchange", y), window.addEventListener("manokara:languagechange", d), () => {
      window.removeEventListener("manokara:overlaytargetchange", y), window.removeEventListener("manokara:languagechange", d);
    };
  }, []);
  const f = (y) => window.ManokaraStudio?.showTarget(y), g = (y) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(y.key)) return;
    y.preventDefault();
    const d = y.key === "Home" || y.key === "ArrowLeft" && i === "lyrics" ? "playlist" : y.key === "End" || y.key === "ArrowRight" && i === "playlist" ? "lyrics" : i;
    f(d), y.currentTarget.querySelector(`[data-overlay-tab="${d}"]`)?.focus();
  };
  return Ke("div", {
    className: "studio-heading"
  }, Ke("div", {
    className: "studio-heading-copy"
  }, Ke("span", {
    className: "eyebrow"
  }, p.eyebrow), Ke("h1", null, p.title), Ke("p", null, p.description)), Ke("div", {
    className: "studio-targets",
    role: "tablist",
    "aria-label": p.tabs,
    onKeyDown: g
  }, Ke("button", {
    className: "s",
    type: "button",
    role: "tab",
    "data-overlay-tab": "playlist",
    "aria-selected": i === "playlist",
    tabIndex: i === "playlist" ? 0 : -1,
    onClick: () => f("playlist")
  }, p.playlist), Ke("button", {
    className: "s",
    type: "button",
    role: "tab",
    "data-overlay-tab": "lyrics",
    "aria-selected": i === "lyrics",
    tabIndex: i === "lyrics" ? 0 : -1,
    onClick: () => f("lyrics")
  }, p.lyrics)));
}
function xp() {
  const [i, u] = Be.useState(() => window.ManokaraStudio?.main || "karaoke"), [s, c] = Be.useState(() => window.ManokaraI18n?.language || "en"), p = s === "vi" ? {
    karaoke: "Karaoke",
    overlay: "Overlay",
    name: "Không gian làm việc chính"
  } : {
    karaoke: "Karaoke",
    overlay: "Overlay",
    name: "Main workspace"
  };
  l.useEffect(() => {
    const y = (M) => u(M.detail === "playlist" ? "playlist" : "karaoke"), d = () => c(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:mainviewchange", y), window.addEventListener("manokara:languagechange", d), () => {
      window.removeEventListener("manokara:mainviewchange", y), window.removeEventListener("manokara:languagechange", d);
    };
  }, []);
  const f = (y) => window.ManokaraStudio?.showMain(y), g = (y) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(y.key)) return;
    y.preventDefault();
    const d = y.key === "Home" || y.key === "ArrowLeft" && i === "playlist" ? "karaoke" : y.key === "End" || y.key === "ArrowRight" && i === "karaoke" ? "playlist" : i;
    f(d), y.currentTarget.querySelector(`[data-main-tab="${d}"]`)?.focus();
  };
  return Ke("div", {
    className: "main-tabs-control",
    role: "tablist",
    "aria-label": p.name,
    onKeyDown: g
  }, Ke("button", {
    id: "main-karaoke",
    type: "button",
    role: "tab",
    "data-main-tab": "karaoke",
    "aria-controls": "grid",
    "aria-selected": i === "karaoke",
    tabIndex: i === "karaoke" ? 0 : -1,
    onClick: () => f("karaoke")
  }, p.karaoke), Ke("button", {
    id: "main-playlist",
    type: "button",
    role: "tab",
    "data-main-tab": "playlist",
    "aria-controls": "playlistStudio",
    "aria-selected": i === "playlist",
    tabIndex: i === "playlist" ? 0 : -1,
    title: "Playlist and lyrics overlays",
    onClick: () => f("playlist")
  }, p.overlay));
}
const wt = l.createElement;
function xn({
  name: i,
  component: u,
  shape: s
}) {
  const c = jo(i);
  return wt(u, s === "state" ? {
    state: c
  } : s === "view" ? {
    view: c
  } : c);
}
const Np = W.ui.updatePlayerPanelState, Pp = W.ui.updateOBSSettingsState, Rp = W.ui.updateSongEditorView, Op = W.ui.setTransposeOpen, Ip = W.ui.updateTransposeState, Ap = W.ui.updateLibrary;
function wd(i) {
  Ct("mountLibrary", i, wt(xn, {
    name: "library",
    component: If,
    shape: "spread"
  }));
}
function kd(i) {
  Ct("mountStudioHeader", i, wt(Mp));
}
function bd(i) {
  Ct("mountMainTabs", i, wt(xp));
}
const Bp = W.ui.updateSetlist;
function Sd(i) {
  Ct("mountSetlist", i, wt(xn, {
    name: "setlist",
    component: Bf,
    shape: "spread"
  }));
}
const zp = W.ui.updateLyricSearchResults;
function Ed(i) {
  Ct("mountLyricSearchResults", i, wt(xn, {
    name: "lyricSearch",
    component: Nf,
    shape: "spread"
  }));
}
const Dp = W.ui.updatePlayerControls;
function Cd(i) {
  Ct("mountPlayerControls", i, wt(xn, {
    name: "playerControls",
    component: bf,
    shape: "state"
  }));
}
function Td(i) {
  Ct("mountPlayerPanel", i, wt(xn, {
    name: "playerPanel",
    component: Cf,
    shape: "state"
  }));
}
const jp = W.ui.updateLiveLyrics;
function Ld(i) {
  Ct("mountLiveLyrics", i, wt(xn, {
    name: "liveLyrics",
    component: xf,
    shape: "state"
  }));
}
function Md(i) {
  Ct("mountOBSSettings", i, wt(xn, {
    name: "obsSettings",
    component: vf,
    shape: "state"
  }));
}
function _p(i) {
  Ct("mountOBSAppearance", i, wt(xn, {
    name: "obsSettings",
    component: kf,
    shape: "state"
  }));
}
function xd(i) {
  Ct("mountSongEditor", i, wt(xn, {
    name: "editorView",
    component: Pf,
    shape: "view"
  }));
}
function Nd(i) {
  Ct("mountLibraryDialog", i, wt(Af));
}
function Pd(i) {
  Ct("mountTransposeDialog", i, wt(xn, {
    name: "transpose",
    component: Sf,
    shape: "state"
  }));
}
function Rd(i) {
  Ct("mountAppFooter", i, wt(Ep));
}
const Fp = W.ui.updateTour;
function Od(i) {
  Ct("mountTour", i, wt(xn, {
    name: "tour",
    component: bp,
    shape: "state"
  }));
}
function Id(i) {
  Ct("mountAppHeader", i, wt(Sp));
}
function Ad(i) {
  Ct("mountKaraokeWorkspace", i, wt(Cp));
}
function Bd(i) {
  Ct("mountOverlayStudio", i, wt(Lp));
}
window.ManokaraReactUI = {
  mountAppFooter: Rd,
  mountLibrary: wd,
  updateLibrary: Ap,
  mountStudioHeader: kd,
  mountOverlayStudio: Bd,
  mountMainTabs: bd,
  mountKaraokeWorkspace: Ad,
  mountSetlist: Sd,
  updateSetlist: Bp,
  mountLyricSearchResults: Ed,
  updateLyricSearchResults: zp,
  mountPlayerPanel: Td,
  updatePlayerPanelState: Np,
  mountPlayerControls: Cd,
  updatePlayerControls: Dp,
  mountLiveLyrics: Ld,
  updateLiveLyrics: jp,
  mountOBSSettings: Md,
  updateOBSSettingsState: Pp,
  mountSongEditor: xd,
  updateSongEditorView: Rp,
  mountLibraryDialog: Nd,
  mountTransposeDialog: Pd,
  mountAppHeader: Id,
  mountTour: Od,
  updateTour: Fp,
  setTransposeOpen: Op,
  updateTransposeState: Ip
};
let Rs = !1, zo = !1;
const Do = () => {
  Rs || zo || (Rs = !0, Ro.flushSync(() => {
    Id(document.getElementById("appHeaderReactRoot")), Rd(document.getElementById("appFooterReactRoot")), Pd(document.getElementById("transposeDialogReactRoot")), Od(document.getElementById("tourReactRoot")), Ad(document.getElementById("karaokeReactRoot"));
  }), Ro.flushSync(() => {
    Nd(document.getElementById("libraryDialogReactRoot")), Sd(document.getElementById("setlistSide")), Td(document.getElementById("playerReactRoot")), Ld(document.getElementById("side")), Md(document.getElementById("obsSettingsReactRoot")), xd(document.getElementById("songEditorReactRoot")), bd(document.getElementById("mainTabsReactRoot")), Bd(document.getElementById("studioReactLayoutRoot"));
  }), Ro.flushSync(() => {
    _p(document.getElementById("obsLyricSettingsReactRoot")), wd(document.getElementById("libraryReactRoot")), Cd(document.getElementById("transportReactRoot")), Ed(document.getElementById("lyricSearchResultsReactRoot"));
  }), vp(), Ro.flushSync(() => {
    kd(document.getElementById("studioReactHeader"));
  }));
};
function zd({
  navigation: i = !1
} = {}) {
  zo || (zo = !0, window.ManokaraTour?.dispose(), window.ManokaraStudio?.dispose(), window.ManokaraController?.dispose({
    navigation: i
  }), Uf(), W.dispose(), window.removeEventListener("pagehide", Dd), document.removeEventListener("DOMContentLoaded", Do));
}
function Dd(i) {
  i.persisted || zd({
    navigation: !0
  });
}
window.addEventListener("pagehide", Dd);
window.ManokaraApp = {
  start: Do,
  dispose: zd,
  diagnostics: () => ({
    mounted: Rs,
    disposed: zo,
    subscriptions: Object.fromEntries(Object.entries(W.stores).map(([i, u]) => [i, u.subscriberCount])),
    draftSubscriptions: W.draft.subscriberCount
  })
};
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Do, {
  once: !0
}) : Do();
export {
  wd as mountLibrary,
  Ap as updateLibrary
};
