function tf(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ls = { exports: {} }, qe = {};
var zc;
function nf() {
  if (zc) return qe;
  zc = 1;
  var a = /* @__PURE__ */ Symbol.for("react.element"), c = /* @__PURE__ */ Symbol.for("react.portal"), l = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), y = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), E = Symbol.iterator;
  function M(S) {
    return S === null || typeof S != "object" ? null : (S = E && S[E] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var O = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, k = Object.assign, v = {};
  function C(S, F, fe) {
    this.props = S, this.context = F, this.refs = v, this.updater = fe || O;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(S, F) {
    if (typeof S != "object" && typeof S != "function" && S != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, S, F, "setState");
  }, C.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function T() {
  }
  T.prototype = C.prototype;
  function A(S, F, fe) {
    this.props = S, this.context = F, this.refs = v, this.updater = fe || O;
  }
  var Q = A.prototype = new T();
  Q.constructor = A, k(Q, C.prototype), Q.isPureReactComponent = !0;
  var I = Array.isArray, _ = Object.prototype.hasOwnProperty, X = { current: null }, q = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ee(S, F, fe) {
    var be, Pe = {}, Be = null, je = null;
    if (F != null) for (be in F.ref !== void 0 && (je = F.ref), F.key !== void 0 && (Be = "" + F.key), F) _.call(F, be) && !q.hasOwnProperty(be) && (Pe[be] = F[be]);
    var me = arguments.length - 2;
    if (me === 1) Pe.children = fe;
    else if (1 < me) {
      for (var Oe = Array(me), Ee = 0; Ee < me; Ee++) Oe[Ee] = arguments[Ee + 2];
      Pe.children = Oe;
    }
    if (S && S.defaultProps) for (be in me = S.defaultProps, me) Pe[be] === void 0 && (Pe[be] = me[be]);
    return { $$typeof: a, type: S, key: Be, ref: je, props: Pe, _owner: X.current };
  }
  function se(S, F) {
    return { $$typeof: a, type: S.type, key: F, ref: S.ref, props: S.props, _owner: S._owner };
  }
  function W(S) {
    return typeof S == "object" && S !== null && S.$$typeof === a;
  }
  function le(S) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(fe) {
      return F[fe];
    });
  }
  var Z = /\/+/g;
  function V(S, F) {
    return typeof S == "object" && S !== null && S.key != null ? le("" + S.key) : F.toString(36);
  }
  function J(S, F, fe, be, Pe) {
    var Be = typeof S;
    (Be === "undefined" || Be === "boolean") && (S = null);
    var je = !1;
    if (S === null) je = !0;
    else switch (Be) {
      case "string":
      case "number":
        je = !0;
        break;
      case "object":
        switch (S.$$typeof) {
          case a:
          case c:
            je = !0;
        }
    }
    if (je) return je = S, Pe = Pe(je), S = be === "" ? "." + V(je, 0) : be, I(Pe) ? (fe = "", S != null && (fe = S.replace(Z, "$&/") + "/"), J(Pe, F, fe, "", function(Ee) {
      return Ee;
    })) : Pe != null && (W(Pe) && (Pe = se(Pe, fe + (!Pe.key || je && je.key === Pe.key ? "" : ("" + Pe.key).replace(Z, "$&/") + "/") + S)), F.push(Pe)), 1;
    if (je = 0, be = be === "" ? "." : be + ":", I(S)) for (var me = 0; me < S.length; me++) {
      Be = S[me];
      var Oe = be + V(Be, me);
      je += J(Be, F, fe, Oe, Pe);
    }
    else if (Oe = M(S), typeof Oe == "function") for (S = Oe.call(S), me = 0; !(Be = S.next()).done; ) Be = Be.value, Oe = be + V(Be, me++), je += J(Be, F, fe, Oe, Pe);
    else if (Be === "object") throw F = String(S), Error("Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead.");
    return je;
  }
  function B(S, F, fe) {
    if (S == null) return S;
    var be = [], Pe = 0;
    return J(S, be, "", "", function(Be) {
      return F.call(fe, Be, Pe++);
    }), be;
  }
  function G(S) {
    if (S._status === -1) {
      var F = S._result;
      F = F(), F.then(function(fe) {
        (S._status === 0 || S._status === -1) && (S._status = 1, S._result = fe);
      }, function(fe) {
        (S._status === 0 || S._status === -1) && (S._status = 2, S._result = fe);
      }), S._status === -1 && (S._status = 0, S._result = F);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var H = { current: null }, w = { transition: null }, j = { ReactCurrentDispatcher: H, ReactCurrentBatchConfig: w, ReactCurrentOwner: X };
  function Y() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return qe.Children = { map: B, forEach: function(S, F, fe) {
    B(S, function() {
      F.apply(this, arguments);
    }, fe);
  }, count: function(S) {
    var F = 0;
    return B(S, function() {
      F++;
    }), F;
  }, toArray: function(S) {
    return B(S, function(F) {
      return F;
    }) || [];
  }, only: function(S) {
    if (!W(S)) throw Error("React.Children.only expected to receive a single React element child.");
    return S;
  } }, qe.Component = C, qe.Fragment = l, qe.Profiler = p, qe.PureComponent = A, qe.StrictMode = u, qe.Suspense = g, qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j, qe.act = Y, qe.cloneElement = function(S, F, fe) {
    if (S == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + S + ".");
    var be = k({}, S.props), Pe = S.key, Be = S.ref, je = S._owner;
    if (F != null) {
      if (F.ref !== void 0 && (Be = F.ref, je = X.current), F.key !== void 0 && (Pe = "" + F.key), S.type && S.type.defaultProps) var me = S.type.defaultProps;
      for (Oe in F) _.call(F, Oe) && !q.hasOwnProperty(Oe) && (be[Oe] = F[Oe] === void 0 && me !== void 0 ? me[Oe] : F[Oe]);
    }
    var Oe = arguments.length - 2;
    if (Oe === 1) be.children = fe;
    else if (1 < Oe) {
      me = Array(Oe);
      for (var Ee = 0; Ee < Oe; Ee++) me[Ee] = arguments[Ee + 2];
      be.children = me;
    }
    return { $$typeof: a, type: S.type, key: Pe, ref: Be, props: be, _owner: je };
  }, qe.createContext = function(S) {
    return S = { $$typeof: y, _currentValue: S, _currentValue2: S, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, S.Provider = { $$typeof: d, _context: S }, S.Consumer = S;
  }, qe.createElement = ee, qe.createFactory = function(S) {
    var F = ee.bind(null, S);
    return F.type = S, F;
  }, qe.createRef = function() {
    return { current: null };
  }, qe.forwardRef = function(S) {
    return { $$typeof: m, render: S };
  }, qe.isValidElement = W, qe.lazy = function(S) {
    return { $$typeof: N, _payload: { _status: -1, _result: S }, _init: G };
  }, qe.memo = function(S, F) {
    return { $$typeof: L, type: S, compare: F === void 0 ? null : F };
  }, qe.startTransition = function(S) {
    var F = w.transition;
    w.transition = {};
    try {
      S();
    } finally {
      w.transition = F;
    }
  }, qe.unstable_act = Y, qe.useCallback = function(S, F) {
    return H.current.useCallback(S, F);
  }, qe.useContext = function(S) {
    return H.current.useContext(S);
  }, qe.useDebugValue = function() {
  }, qe.useDeferredValue = function(S) {
    return H.current.useDeferredValue(S);
  }, qe.useEffect = function(S, F) {
    return H.current.useEffect(S, F);
  }, qe.useId = function() {
    return H.current.useId();
  }, qe.useImperativeHandle = function(S, F, fe) {
    return H.current.useImperativeHandle(S, F, fe);
  }, qe.useInsertionEffect = function(S, F) {
    return H.current.useInsertionEffect(S, F);
  }, qe.useLayoutEffect = function(S, F) {
    return H.current.useLayoutEffect(S, F);
  }, qe.useMemo = function(S, F) {
    return H.current.useMemo(S, F);
  }, qe.useReducer = function(S, F, fe) {
    return H.current.useReducer(S, F, fe);
  }, qe.useRef = function(S) {
    return H.current.useRef(S);
  }, qe.useState = function(S) {
    return H.current.useState(S);
  }, qe.useSyncExternalStore = function(S, F, fe) {
    return H.current.useSyncExternalStore(S, F, fe);
  }, qe.useTransition = function() {
    return H.current.useTransition();
  }, qe.version = "18.3.1", qe;
}
var jc;
function td() {
  return jc || (jc = 1, ls.exports = nf()), ls.exports;
}
var ze = td();
const s = /* @__PURE__ */ tf(ze);
function nd(a = {}) {
  let c = Object.freeze({
    ...a
  });
  const l = /* @__PURE__ */ new Set();
  let u = !1;
  function p(d) {
    if (u || Object.keys(d).length === Object.keys(c).length && Object.keys(d).every((y) => Object.is(d[y], c[y]))) return !1;
    c = Object.freeze({
      ...d
    });
    for (const y of [...l]) y();
    return !0;
  }
  return {
    getSnapshot: () => c,
    patch: (d) => p({
      ...c,
      ...d
    }),
    replace: p,
    subscribe(d) {
      return u ? () => {
      } : (l.add(d), () => l.delete(d));
    },
    dispose() {
      u = !0, l.clear();
    },
    get subscriberCount() {
      return l.size;
    }
  };
}
function rf() {
  const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  function l(u) {
    if (!c.has(u)) {
      const p = /* @__PURE__ */ new Map();
      c.set(u, new Proxy({}, {
        get(d, y) {
          if (!(typeof y != "string" || y === "then"))
            return p.has(y) || p.set(y, (...m) => a.get(u)?.[y]?.(...m)), p.get(y);
        }
      }));
    }
    return c.get(u);
  }
  return {
    actions: l,
    bind(u, p) {
      return a.set(u, p), () => {
        a.get(u) === p && a.delete(u);
      };
    },
    dispose() {
      a.clear();
    }
  };
}
const ko = Object.freeze({
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
  saving: !1
}), af = /* @__PURE__ */ new Set(["url", "ttl", "st", "en", "llrc", "lq", "lyricProvider", "lyricSourceLabel", "lyricSourceUrl", "lyricCopyright", "lyricSources", "loff", "songKey", "saveToLibrary", "romajiLrc", "lyricMode", "mcm", "mcd"]);
function of() {
  const a = nd(ko);
  let c = 0;
  function l(u) {
    const p = a.getSnapshot(), d = {};
    for (const [y, m] of Object.entries(u))
      y in ko && (d[y] = typeof ko[y] == "boolean" ? !!m : String(m ?? ""), (y === "llrc" || y === "romajiLrc") && (d[y] = d[y].replace(/\r\n?/g, `
`)));
    return Object.keys(d).some((y) => af.has(y) && d[y] !== p[y]) && c++, a.patch(d);
  }
  return {
    ...a,
    patch: l,
    get: (u) => a.getSnapshot()[u],
    set(u, p) {
      return l({
        [u]: p
      }), p;
    },
    reset() {
      c++, a.replace({
        ...ko,
        saving: a.getSnapshot().saving
      });
    },
    get revision() {
      return c;
    }
  };
}
function lf() {
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
      labels: {}
    },
    setlist: {
      songs: [],
      labels: {},
      formatTime: (a) => String(a),
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
function sf(a = {}) {
  a = {
    ...lf(),
    ...a
  };
  const l = Object.fromEntries(["library", "setlist", "lyricSearch", "playerPanel", "playerControls", "liveLyrics", "obsSettings", "editorView", "transpose", "tour", "outputValues"].map((g) => [g, nd(a[g])])), u = rf(), p = of();
  l.outputValues.replace({
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
    ...a.outputValues
  });
  const d = {
    get: (g) => l.outputValues.getSnapshot()[g],
    set(g, L) {
      return l.outputValues.patch({
        [g]: L
      }), L;
    },
    patch: l.outputValues.patch
  }, y = (g) => Object.freeze((Array.isArray(g) ? g : []).map((L) => Object.freeze({
    ...Object.fromEntries(["title", "artist", "url", "libraryId", "mc", "memo", "dur", "s", "e", "mediaDuration", "lrc"].map((N) => [N, L[N]]))
  })));
  return {
    stores: l,
    draft: p,
    controls: d,
    ui: {
      updateLibrary(g, L) {
        l.library.replace({
          songs: y(g),
          labels: L
        });
      },
      updateSetlist(g, L, N, E) {
        l.setlist.replace({
          songs: y(g),
          currentIndex: g.indexOf(L),
          labels: N,
          formatTime: E
        });
      },
      updateLyricSearchResults(g, L, N = {}) {
        l.lyricSearch.patch({
          ...N,
          state: g,
          results: Object.freeze(L.map((E) => Object.freeze({
            ...E
          })))
        });
      },
      updatePlayerPanelState: (g) => l.playerPanel.patch(g),
      updatePlayerControls: (g) => l.playerControls.patch(g),
      updateLiveLyrics: (g) => l.liveLyrics.patch({
        ...g,
        ...g.lines ? {
          lines: Object.freeze(g.lines.map((L) => Object.freeze({
            ...L
          })))
        } : {}
      }),
      updateOBSSettingsState: (g) => l.obsSettings.patch(g),
      updateSongEditorView: (g) => l.editorView.patch(g),
      updateTransposeState: (g) => l.transpose.patch(g),
      setTransposeOpen: (g) => l.transpose.patch({
        open: !!g
      }),
      updateTour: (g) => l.tour.patch(g)
    },
    commands: u,
    dispose() {
      u.dispose(), p.dispose(), Object.values(l).forEach((g) => g.dispose());
    }
  };
}
const $ = sf();
function Mo(a) {
  const c = $.stores[a];
  return ze.useSyncExternalStore(c.subscribe, c.getSnapshot, c.getSnapshot);
}
function uf() {
  const a = $.draft;
  return ze.useSyncExternalStore(a.subscribe, a.getSnapshot, a.getSnapshot);
}
const rd = [
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
s.createElement;
function cf({
  state: a
}) {
  const c = (l) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: `./manokara-icons.svg#${l}` }));
  return /* @__PURE__ */ s.createElement("section", { className: "tabpanel", id: "panel-green", role: "region", "aria-label": "OBS output" }, "    ", /* @__PURE__ */ s.createElement("div", { className: "output-connect" }, "      ", /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("h2", null, "Take your lyrics live."), /* @__PURE__ */ s.createElement("p", null, "Your own output for OBS or a second screen.")), "      ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "lwin", type: "button", onClick: () => $.commands.actions("obs")?.openLyricsWindow() }, c("arrow-up-right"), "Open lyrics window"), "    "), "    ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "OBS Browser Source URL"), /* @__PURE__ */ s.createElement("div", { className: "obs-link" }, /* @__PURE__ */ s.createElement("input", { id: "obsurl", readOnly: !0, value: a.obsUrl, "aria-label": "OBS Browser Source URL" }), /* @__PURE__ */ s.createElement("button", { id: "copyobs", type: "button", onClick: () => $.commands.actions("obs")?.copyUrl() }, c("link"), "Copy link"))), "    ", /* @__PURE__ */ s.createElement("div", { className: "obs-note" }, /* @__PURE__ */ s.createElement("small", null, "Paste this into an OBS Browser Source. Keep it active."), /* @__PURE__ */ s.createElement("button", { className: "ghost", id: "rotateobs", type: "button", title: "Revoke the previous OBS link and create a new one", onClick: () => $.commands.actions("obs")?.rotateLink() }, "Replace link")), "    ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "editLyricLayout", type: "button" }, "Edit lyric layout"), "    ", /* @__PURE__ */ s.createElement("div", { id: "obsLyricSettingsReactRoot" }), "  ");
}
function df({
  state: a
}) {
  const c = (l) => window.ManokaraI18n?.text(l) || l;
  return /* @__PURE__ */ s.createElement("section", { className: "song-style-settings", "aria-label": c("Song animation settings") }, /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "rememberSongStyle", type: "checkbox", checked: a.songStyleSaved, disabled: !a.songStyleEnabled, onChange: (l) => $.commands.actions("obs")?.rememberSongStyle(l.target.checked) }), c("Save animation settings for this song")), /* @__PURE__ */ s.createElement("small", { id: "songStyleStatus", role: "status" }, c(a.songStyleEnabled ? a.songStyleSaved ? "Animation changes save automatically for this song." : "Using the shared animation settings." : "Select a song to save its animation settings.")), a.songStyleEnabled && /* @__PURE__ */ s.createElement("small", { className: "song-style-title", title: a.songStyleTitle }, a.songStyleTitle));
}
function hf({
  state: a
}) {
  const c = Mo("outputValues"), l = (d) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: `./manokara-icons.svg#${d}` })), u = (d) => window.ManokaraI18n?.text(d) || d, p = (d) => $.commands.actions("obs")?.settingChanged(d.currentTarget.id);
  return /* @__PURE__ */ s.createElement(s.Fragment, null, " ", /* @__PURE__ */ s.createElement("section", { className: "section-divider", "aria-label": u("Lyric animation") }, "      ", /* @__PURE__ */ s.createElement("h3", null, "Lyric animation"), /* @__PURE__ */ s.createElement(df, { state: a }), "      ", /* @__PURE__ */ s.createElement("div", { className: "settings-grid" }, "        ", /* @__PURE__ */ s.createElement("label", { className: "field wide" }, /* @__PURE__ */ s.createElement("span", null, "Visual style"), /* @__PURE__ */ s.createElement("select", { id: "lfx", value: c.lfx, onChange: (d) => {
    $.controls.set("lfx", d.currentTarget.value), p(d);
  } }, "          ", /* @__PURE__ */ s.createElement("option", { value: "jizura" }, "JIZURA Auto · full effects"), /* @__PURE__ */ s.createElement("option", { value: "karaoke-classic" }, "Classic karaoke · two-line sweep"), "          ", /* @__PURE__ */ s.createElement("optgroup", { label: "Folia Major · original visualizers" }, "            ", /* @__PURE__ */ s.createElement("option", { value: "folia-classic" }, "Folia · Luminous"), /* @__PURE__ */ s.createElement("option", { value: "folia-cadenza" }, "Folia · Mindscape"), /* @__PURE__ */ s.createElement("option", { value: "folia-partita" }, "Folia · Cloud Steps"), /* @__PURE__ */ s.createElement("option", { value: "folia-fume" }, "Folia · Fume"), /* @__PURE__ */ s.createElement("option", { value: "folia-tilt" }, "Folia · Tilt"), /* @__PURE__ */ s.createElement("option", { value: "folia-claddagh" }, "Folia · Claddagh"), /* @__PURE__ */ s.createElement("option", { value: "folia-monet" }, "Folia · Monet"), /* @__PURE__ */ s.createElement("option", { value: "folia-diorama" }, "Folia · Diorama"), /* @__PURE__ */ s.createElement("option", { value: "folia-pendolo" }, "Folia · Pendolo"), /* @__PURE__ */ s.createElement("option", { value: "folia-sonnet" }, "Folia · Sonnet"), /* @__PURE__ */ s.createElement("option", { value: "folia-tempera" }, "Folia · Tempera"), /* @__PURE__ */ s.createElement("option", { value: "folia-lumiere" }, "Folia · Lumiere"), "          "), "          ", /* @__PURE__ */ s.createElement("option", { value: "tempera" }, "Tempera · ink"), /* @__PURE__ */ s.createElement("option", { value: "sonnet" }, "Sonnet · kinetic focus"), /* @__PURE__ */ s.createElement("option", { value: "lumiere" }, "Lumiere · light reveal"), /* @__PURE__ */ s.createElement("option", { value: "hanabi" }, "Hanabi · character burst"), /* @__PURE__ */ s.createElement("option", { value: "clean" }, "Clean fade"), /* @__PURE__ */ s.createElement("option", { value: "word-pop" }, "Word pop"), /* @__PURE__ */ s.createElement("option", { value: "neon" }, "Neon sweep"), /* @__PURE__ */ s.createElement("option", { value: "glitch" }, "Glitch hit"), "        ")), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Background"), /* @__PURE__ */ s.createElement("select", { id: "lbgmode", value: c.lbgmode, onChange: (d) => {
    $.controls.set("lbgmode", d.currentTarget.value), p(d);
  } }, /* @__PURE__ */ s.createElement("option", { value: "transparent" }, "Transparent"), /* @__PURE__ */ s.createElement("option", { value: "green" }, "Green screen"))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Color palette"), /* @__PURE__ */ s.createElement("select", { id: "ltheme", value: c.ltheme, onChange: (d) => {
    $.controls.set("ltheme", d.currentTarget.value), p(d);
  } }, /* @__PURE__ */ s.createElement("option", { value: "effect" }, "Effect palette"), /* @__PURE__ */ s.createElement("option", { value: "white" }, "White"), /* @__PURE__ */ s.createElement("option", { value: "cyan" }, "Ice cyan"), /* @__PURE__ */ s.createElement("option", { value: "rose" }, "Rose"), /* @__PURE__ */ s.createElement("option", { value: "amber" }, "Amber"), /* @__PURE__ */ s.createElement("option", { value: "violet" }, "Violet"), /* @__PURE__ */ s.createElement("option", { value: "mint" }, "Mint"))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Text size"), /* @__PURE__ */ s.createElement("div", { className: "settings-inline" }, /* @__PURE__ */ s.createElement("input", { type: "range", id: "lsz", min: "24", max: "160", "aria-label": "Output text size", disabled: a.jizura, value: c.lsz, onChange: (d) => {
    $.controls.set("lsz", d.currentTarget.value), p(d);
  } }))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field", hidden: a.classic }, /* @__PURE__ */ s.createElement("span", null, "Text color"), /* @__PURE__ */ s.createElement("input", { type: "color", id: "lcol", disabled: a.jizura, value: c.lcol, onChange: (d) => {
    $.controls.set("lcol", d.currentTarget.value), p(d);
  } })), "        ", /* @__PURE__ */ s.createElement("label", { id: "classicColorField", className: "field", hidden: !a.classic }, /* @__PURE__ */ s.createElement("span", null, "Sung highlight"), /* @__PURE__ */ s.createElement("input", { type: "color", id: "lclassiccolor", value: c.lclassiccolor, onChange: (d) => {
    $.controls.set("lclassiccolor", d.currentTarget.value), p(d);
  } })), "      "), "      ", /* @__PURE__ */ s.createElement("small", { id: "classicHint", hidden: !a.classic }, "Two alternating lines, white words and a sung highlight. Enhanced LRC follows word timestamps; regular LRC estimates the sweep. Choose Sung highlight or a color palette for the sweep (blue by default)."), "      ", /* @__PURE__ */ s.createElement("div", { className: "row spaced" }, /* @__PURE__ */ s.createElement("button", { className: "s", id: "lrandom", type: "button", title: a.randomTitle, disabled: !a.jizura, onClick: () => $.commands.actions("obs")?.randomizeJizura() }, l("shuffle"), "Shuffle JIZURA style")), "      ", /* @__PURE__ */ s.createElement("div", { className: "output-reaction" }, /* @__PURE__ */ s.createElement("button", { className: "s", id: "audioReaction", type: "button" }, "Enable audio reaction"), /* @__PURE__ */ s.createElement("small", { id: "audioStatus" }, "Share the karaoke tab with tab audio enabled. No recording.")), "    "), "    ", /* @__PURE__ */ s.createElement("section", { className: "section-divider", "aria-label": "Output typography" }, "      ", /* @__PURE__ */ s.createElement("h3", null, "Type & layout"), "      ", /* @__PURE__ */ s.createElement("div", { className: "type-settings" }, "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Font family"), /* @__PURE__ */ s.createElement("select", { id: "lfont", disabled: a.jizura, value: c.lfont, onChange: (d) => {
    $.controls.set("lfont", d.currentTarget.value), p(d);
  } }, rd.map(([d], y) => /* @__PURE__ */ s.createElement("option", { key: y, value: y }, u(d))))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Custom font"), /* @__PURE__ */ s.createElement("input", { id: "lfc", maxLength: "120", placeholder: "An installed or Google font", disabled: a.jizura, value: c.lfc, onChange: (d) => {
    $.controls.set("lfc", d.currentTarget.value), p(d);
  } })), "        ", /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "lbold", disabled: a.jizura, checked: c.lbold, onChange: (d) => {
    $.controls.set("lbold", d.currentTarget.checked), p(d);
  } }), "Bold lyrics"), "      "), "      ", /* @__PURE__ */ s.createElement("small", { className: "setting-help" }, "Fonts marked “online” load from Google Fonts. Installed fonts work locally."), "      ", /* @__PURE__ */ s.createElement("div", { id: "centerRow" }, "        ", /* @__PURE__ */ s.createElement("div", { className: "layout-options" }, "          ", /* @__PURE__ */ s.createElement("div", { className: "row" }, "            ", /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "lcenter", checked: c.lcenter, onChange: (d) => {
    $.controls.set("lcenter", d.currentTarget.checked), p(d);
  } }), "Keep centre free"), "            ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Output frame"), /* @__PURE__ */ s.createElement("select", { id: "lshape", value: c.lshape, onChange: (d) => {
    $.controls.set("lshape", d.currentTarget.value), p(d);
  } }, /* @__PURE__ */ s.createElement("option", { value: "auto" }, "Automatic"), /* @__PURE__ */ s.createElement("option", { value: "wide" }, "Landscape"), /* @__PURE__ */ s.createElement("option", { value: "tall" }, "Portrait"))), "          "), "          ", /* @__PURE__ */ s.createElement("div", { className: "cf-preview", id: "cfpreview", "data-shape": a.shape, style: {
    opacity: a.centerFree ? 1 : 0.42
  }, title: a.centerTitle }, /* @__PURE__ */ s.createElement("span", { className: "cf-free" }), /* @__PURE__ */ s.createElement("i", { className: "cf-line cf-a" }), /* @__PURE__ */ s.createElement("i", { className: "cf-line cf-b" })), "        "), "        ", /* @__PURE__ */ s.createElement("small", { id: "centerHint" }, a.centerHint), "      "), "    "), "  ");
}
const Ye = s.createElement;
function ff({
  state: a
}) {
  const c = (u) => Ye("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ye("use", {
    href: `./manokara-icons.svg#${u}`
  })), l = (u) => () => $.commands.actions("player")?.[u]?.();
  return Ye(s.Fragment, null, Ye("div", {
    className: "transport-buttons"
  }, Ye("button", {
    className: "ghost icon-button",
    id: "prev",
    type: "button",
    title: a.previous,
    "aria-label": a.previous,
    onClick: l("previous")
  }, c("skip-back")), Ye("button", {
    id: "play",
    type: "button",
    onClick: l("play")
  }, c("play"), Ye("span", null, a.play)), Ye("button", {
    className: "ghost",
    id: "pause",
    type: "button",
    onClick: l("pause")
  }, c(a.paused ? "play" : "pause"), Ye("span", null, a.paused ? a.resume : a.pause)), Ye("button", {
    className: "ghost icon-button",
    id: "next",
    type: "button",
    title: a.next,
    "aria-label": a.next,
    onClick: l("next")
  }, c("skip-forward")), Ye("button", {
    className: "ghost",
    id: "stop",
    type: "button",
    onClick: l("stop")
  }, c("stop"), Ye("span", null, a.stop))), Ye("div", {
    className: "key-control",
    "aria-label": a.keyLabel
  }, Ye("span", {
    className: "key-label"
  }, a.keyLabel), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-step": "-1",
    "aria-label": a.lower,
    disabled: !a.canPitch || a.key <= -12,
    onClick: () => $.commands.actions("player")?.stepKey(-1)
  }, "−"), Ye("output", {
    "data-pitch-value": ""
  }, a.key > 0 ? `+${a.key}` : String(a.key)), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-step": "1",
    "aria-label": a.raise,
    disabled: !a.canPitch || a.key >= 12,
    onClick: () => $.commands.actions("player")?.stepKey(1)
  }, "+"), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-reset": "",
    title: a.originalKey,
    "aria-label": a.originalKey,
    disabled: !a.canPitch || a.key === 0,
    onClick: l("resetKey")
  }, "↺")), Ye("label", {
    className: "volume-control"
  }, c("speaker-high"), Ye("input", {
    type: "range",
    id: "vol",
    min: 0,
    max: 100,
    value: a.volume,
    "aria-label": a.volumeLabel,
    onChange: (u) => $.commands.actions("player")?.setVolume(Number(u.target.value))
  })));
}
function pf({
  state: a,
  onClose: c = $.commands.actions("dialog").closeTranspose
}) {
  const l = (u) => window.ManokaraI18n?.text(u) || u;
  return Ye("div", {
    id: "transposeDialog",
    className: "modal-backdrop",
    hidden: !a.open,
    role: "presentation",
    onClick: (u) => {
      u.target === u.currentTarget && c();
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
  }, l("Song key"))), Ye("p", null, l("Raise or lower the key without changing the speed. Each song remembers its own setting.")), Ye("div", {
    className: "key-control"
  }, Ye("button", {
    className: "s",
    type: "button",
    "aria-label": l("Lower key"),
    onClick: () => $.commands.actions("player")?.stepKey(-1)
  }, "−"), Ye("output", {
    "aria-live": "polite"
  }, a.key > 0 ? `+${a.key}` : String(a.key)), Ye("button", {
    className: "s",
    type: "button",
    "aria-label": l("Raise key"),
    onClick: () => $.commands.actions("player")?.stepKey(1)
  }, "+"), Ye("button", {
    className: "ghost",
    type: "button",
    onClick: () => $.commands.actions("player")?.resetKey()
  }, l("Original key"))), Ye("small", {
    id: "pitchStatus",
    "data-state": a.statusState,
    role: "status",
    "aria-live": "polite"
  }, a.status), Ye("div", {
    className: "row tab-audio-actions"
  }, Ye("button", {
    id: "startTabAudio",
    className: "s",
    type: "button",
    onClick: () => $.commands.actions("player")?.startTabAudio()
  }, l(a.tabAudioActive ? "Open audio window" : "Start Tab Audio")), Ye("button", {
    id: "stopTabAudio",
    className: "ghost",
    type: "button",
    disabled: !a.tabAudioActive && !a.tabAudioBusy,
    onClick: () => $.commands.actions("player")?.stopTabAudio()
  }, l("Stop Tab Audio"))), Ye("p", null, l("YouTube keeps its own player. Choose the Manokara tab and share tab audio in the audio window. Keep that window open while singing.")), Ye("small", null, l("Try small shifts first (±1–4 semitones). Large shifts can change the sound of a full mix. Lyrics compensate for the processor's audio delay.")), Ye("div", {
    className: "row"
  }, Ye("button", {
    className: "s",
    id: "transposeClose",
    type: "button",
    onClick: c
  }, l("Close"))))));
}
s.createElement;
function mf({
  message: a,
  text: c
}) {
  const l = ze.useRef(null);
  ze.useEffect(() => () => l.current?.(), []);
  const u = (p) => {
    l.current?.();
    try {
      l.current = p.currentTarget.contentWindow.ManokaraOutput?.disconnectPreview;
    } catch {
      l.current = null;
    }
  };
  return /* @__PURE__ */ s.createElement("div", { id: "stageLyricsPreview", className: "stage-lyric-preview", role: "region", "aria-label": c("Lyrics preview") }, /* @__PURE__ */ s.createElement("iframe", { id: "stageLyricsFrame", src: "./manokara-obs.html?preview=stage", title: c("Current song lyric preview"), allow: "autoplay", onLoad: u }), a && /* @__PURE__ */ s.createElement("div", { className: "stage-preview-message", role: "status" }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#music-notes" })), /* @__PURE__ */ s.createElement("p", null, c(a))));
}
function gf({
  state: a
}) {
  const c = Mo("outputValues"), [l, u] = ze.useState("media"), [p, d] = ze.useState(!0);
  ze.useEffect(() => {
    const N = (E) => d(E.detail === "karaoke");
    return window.addEventListener("manokara:mainviewchange", N), () => window.removeEventListener("manokara:mainviewchange", N);
  }, []);
  const y = l === "lyrics", m = y && p, g = (N) => window.ManokaraI18n?.text(N) || N, L = (N) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#" + N }));
  return /* @__PURE__ */ s.createElement("section", { className: "card", id: "player", "aria-label": "Karaoke player" }, /* @__PURE__ */ s.createElement("div", { className: "player-head" }, /* @__PURE__ */ s.createElement("span", { className: "eyebrow" }, "Your stage"), /* @__PURE__ */ s.createElement("div", { className: "stage-view-switch", role: "group", "aria-label": g("Stage view") }, /* @__PURE__ */ s.createElement("button", { id: "stageMediaButton", type: "button", "aria-pressed": !y, "aria-controls": "stageMediaRoot", onClick: () => u("media") }, "YouTube"), /* @__PURE__ */ s.createElement("button", { id: "stageLyricsButton", type: "button", "aria-pressed": y, "aria-controls": "stageLyricsPreview", onClick: () => u("lyrics") }, g("Lyrics preview"))), /* @__PURE__ */ s.createElement("span", { className: "playback-state", id: "playbackState", "data-state": a.playbackState }, a.playbackLabel)), /* @__PURE__ */ s.createElement("div", { id: "stage" }, /* @__PURE__ */ s.createElement("div", { id: "stageMediaRoot", inert: m ? "" : void 0, "aria-hidden": m || void 0 }), m && /* @__PURE__ */ s.createElement(mf, { message: a.previewMessage, text: g }), !m && a.stageMode === "empty" && /* @__PURE__ */ s.createElement("div", { className: "stage-empty" }, /* @__PURE__ */ s.createElement("div", { className: "stage-glyph" }, L("waveform")), /* @__PURE__ */ s.createElement("h2", null, g("Your next song starts here.")), /* @__PURE__ */ s.createElement("p", null, g("Add a karaoke link, find your lyrics,"), /* @__PURE__ */ s.createElement("br", null), g("and let your voice take the lead.")), /* @__PURE__ */ s.createElement("button", { className: "stage-add", type: "button", onClick: () => $.commands.actions("setlist")?.openEditor() }, L("plus"), g("Add your first song"))), !m && a.stageMode === "mc" && /* @__PURE__ */ s.createElement("div", { className: "stage-empty mc-stage" }, /* @__PURE__ */ s.createElement("div", { className: "stage-glyph" }, L("microphone-stage")), /* @__PURE__ */ s.createElement("h2", null, a.stageTitle), /* @__PURE__ */ s.createElement("p", null, a.stageNote)), !m && a.stageMode === "external" && /* @__PURE__ */ s.createElement("div", { className: "stage-empty" }, /* @__PURE__ */ s.createElement("div", { className: "stage-glyph" }, L("link")), /* @__PURE__ */ s.createElement("h2", null, a.stageTitle), /* @__PURE__ */ s.createElement("p", null, a.stageNote), /* @__PURE__ */ s.createElement("a", { className: "stage-add", href: a.stageUrl, target: "_blank", rel: "noopener" }, a.stageLinkLabel, " ", L("arrow-up-right"))), !m && a.countdownVisible && /* @__PURE__ */ s.createElement("div", { id: "ov" }, /* @__PURE__ */ s.createElement("b", null, a.countdownTitle), /* @__PURE__ */ s.createElement("span", null, a.countdownValue), /* @__PURE__ */ s.createElement("small", null, a.countdownHint))), /* @__PURE__ */ s.createElement("div", { className: "now-row" }, /* @__PURE__ */ s.createElement("b", { id: "now" }, a.now), /* @__PURE__ */ s.createElement("span", { className: "mu", id: "time" }, a.time), /* @__PURE__ */ s.createElement("a", { id: "yt", href: a.youtubeUrl || "#", target: "_blank", rel: "noopener", hidden: !a.youtubeUrl }, /* @__PURE__ */ s.createElement("span", null, "Open on YouTube"), L("arrow-up-right"))), /* @__PURE__ */ s.createElement("div", { className: "transport", id: "transportReactRoot" }), /* @__PURE__ */ s.createElement("div", { className: "player-options" }, /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "skip", checked: c.skip, onChange: (N) => {
    $.controls.set("skip", N.currentTarget.checked);
  } }), "Skip unavailable songs"), /* @__PURE__ */ s.createElement("label", { className: "countdown-control" }, "Countdown", /* @__PURE__ */ s.createElement("input", { type: "number", id: "cdn", min: "0", max: "30", "aria-label": "Countdown seconds", value: c.cdn, onChange: (N) => {
    $.controls.set("cdn", N.currentTarget.value), $.commands.actions("obs")?.settingChanged("cdn");
  } }), "s")), /* @__PURE__ */ s.createElement("div", { id: "msg", role: "status", "aria-live": "polite" }, a.message)));
}
const ma = Object.freeze([
  { id: "lrclib", label: "LRCLIB", enabled: !0 },
  { id: "netease", label: "NetEase", enabled: !0 },
  { id: "musixmatch", label: "Musixmatch", enabled: !1, reason: "needs_key" }
]), yf = [{ id: "megalobiz", label: "Megalobiz" }], _c = Object.freeze({
  ok: "Found lyrics",
  empty: "No lyrics found",
  partial: "Some results could not be loaded",
  timeout: "Source took too long",
  limited: "Source rate limit reached",
  restricted: "Source requires verification",
  credentials: "API access needs attention",
  unavailable: "Source is temporarily unavailable",
  invalid: "Source returned an unreadable response"
});
function Dc(a) {
  return Array.isArray(a) ? ma.map((c) => {
    const l = a.find((u) => u && u.id === c.id);
    return { ...c, enabled: l?.enabled === !0, reason: String(l?.reason || "") };
  }) : [];
}
const Fc = /\[\d{1,3}:[0-5]\d(?:[.:]\d{1,3})?\]/g, vf = (a) => a.split(/\r?\n/).some((c) => /^\s*\[\d/.test(c) && c.match(Fc) && c.replace(Fc, "").trim());
function kf(a) {
  if (!Array.isArray(a)) throw Error("Invalid lyric search results.");
  return a.slice(0, 24).filter((c) => c && typeof c.trackName == "string" && typeof c.artistName == "string").map((c) => ({
    ...c,
    syncedLyrics: typeof c.syncedLyrics == "string" && vf(c.syncedLyrics) ? c.syncedLyrics : null,
    plainLyrics: typeof c.plainLyrics == "string" ? c.plainLyrics : null,
    sources: Mi(c.sources)
  })).filter((c) => c.syncedLyrics || c.plainLyrics).sort((c, l) => +!!l.syncedLyrics - +!!c.syncedLyrics);
}
function _n(a) {
  try {
    const c = new URL(a);
    return c.protocol === "https:" && !c.username && !c.password && (!c.port || c.port === "443") && ["lrclib.net", "music.163.com", "megalobiz.com", "www.megalobiz.com", "musixmatch.com", "www.musixmatch.com"].includes(c.hostname) ? c.href : "";
  } catch {
    return "";
  }
}
function Mi(a) {
  if (typeof a == "string")
    try {
      a = JSON.parse(a);
    } catch {
      return [];
    }
  return Array.isArray(a) ? a.slice(0, 8).flatMap((c) => {
    const l = [...ma, ...yf].find((u) => u.id === c?.id);
    return l ? [{ id: l.id, label: l.label, url: _n(c.url) }] : [];
  }) : [];
}
const He = s.createElement, wf = s.memo(function({
  state: c
}) {
  const {
    lines: l,
    active: u,
    empty: p,
    fontSize: d,
    mode: y,
    modeDisabled: m,
    romajiAvailable: g,
    modeStatus: L,
    info: N,
    source: E,
    syncValue: M,
    syncColor: O,
    syncDisabled: k,
    labels: v
  } = c, C = ze.useRef(null), T = Mi(E?.sources), A = window.ManokaraI18n?.text("Lyrics source") || "Lyrics source", Q = ze.useRef([]);
  ze.useLayoutEffect(() => {
    if (u < 0) return;
    const X = C.current, q = Q.current[u];
    X && q && (X.scrollTop = q.offsetTop - X.clientHeight / 2 + q.clientHeight / 2);
  }, [l, u]);
  const I = (X) => He("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, He("use", {
    href: `./manokara-icons.svg#${X}`
  })), _ = (X) => () => $.commands.actions("lyrics")?.[X]?.();
  return He(s.Fragment, null, He("div", {
    className: "section-head lyrics-heading"
  }, He("div", {
    className: "section-title"
  }, He("h2", {
    id: "lyricsTitle"
  }, v.title)), He("div", {
    className: "row"
  }, He("button", {
    className: "ghost",
    id: "fm",
    type: "button",
    "aria-label": v.smaller,
    onClick: () => $.commands.actions("lyrics")?.font(-2)
  }, "A−"), He("button", {
    className: "ghost",
    id: "fp",
    type: "button",
    "aria-label": v.larger,
    onClick: () => $.commands.actions("lyrics")?.font(2)
  }, "A+"))), He("div", {
    className: "lyrics-mode-row"
  }, He("label", {
    htmlFor: "liveLyricMode"
  }, v.lyrics), He("select", {
    id: "liveLyricMode",
    "aria-label": v.chooseLyrics,
    value: y,
    disabled: m,
    onChange: (X) => $.commands.actions("lyrics")?.setMode(X.target.value)
  }, He("option", {
    value: "original"
  }, v.original), He("option", {
    value: "romaji",
    disabled: !g
  }, v.romaji), He("option", {
    value: "both",
    disabled: !g
  }, v.both)), He("small", {
    id: "liveLyricModeStatus",
    role: "status",
    "aria-live": "polite"
  }, L)), He("div", {
    id: "pan",
    ref: C,
    tabIndex: 0,
    "aria-label": v.currentLyrics,
    style: {
      "--ps": `${d}px`
    }
  }, p ? He("div", {
    className: "lyrics-empty"
  }, I("text-align-left"), He("span", null, p.primary, He("br"), p.secondary)) : l.map((X, q) => He("div", {
    key: `${q}:${X.t}:${X.x}`,
    className: `ln${q === u ? " cl" : ""}`,
    ref: (ee) => {
      Q.current[q] = ee;
    },
    "aria-current": q === u ? "true" : void 0
  }, X.x ? X.x : I("music-notes"), X.romaji && He("span", {
    className: "romanized"
  }, X.romaji)))), E?.label ? He(
    "div",
    { className: "lyric-attribution live-lyric-source", "data-no-i18n": "" },
    A + ": ",
    T.length ? T.map((X, q) => He(
      s.Fragment,
      { key: `${X.id}-${q}` },
      q ? " · " : null,
      X.url ? He("a", { href: X.url, target: "_blank", rel: "noopener noreferrer" }, X.label + " ↗") : X.label
    )) : _n(E.url) ? He("a", { href: _n(E.url), target: "_blank", rel: "noopener noreferrer" }, E.label) : E.label,
    E.copyright ? He("small", null, E.copyright) : null
  ) : null, He("small", {
    id: "pinfo",
    className: "mu"
  }, N), He("div", {
    className: "lyrics-footer"
  }, He("div", {
    className: "sync-head"
  }, He("span", null, v.liveSync), He("b", {
    id: "offv",
    title: v.currentSync,
    style: {
      color: O
    }
  }, M)), He("div", {
    className: "sync-buttons"
  }, He("button", {
    className: "s",
    id: "lm",
    type: "button",
    disabled: k,
    onClick: () => $.commands.actions("lyrics")?.nudge(-0.5)
  }, "−0.5 s"), He("button", {
    className: "s",
    id: "lp",
    type: "button",
    disabled: k,
    onClick: () => $.commands.actions("lyrics")?.nudge(0.5)
  }, "+0.5 s"), He("button", {
    className: "ghost",
    id: "lz",
    type: "button",
    disabled: k,
    onClick: _("resetSync")
  }, v.reset)), He("small", {
    id: "offh"
  }, v.syncHelp), He("div", {
    className: "timing-action"
  }, He("button", {
    className: "ghost",
    id: "tap",
    type: "button",
    onClick: _("tap")
  }, I("clock"), v.setLineTime), He("kbd", null, "T"))));
});
s.createElement;
function Sf({ state: a, results: c, statuses: l = [] }) {
  const u = (p) => window.ManokaraI18n?.text(p) || p;
  return /* @__PURE__ */ s.createElement("div", { className: "lyric-search-output", hidden: !a, "data-no-i18n": "" }, /* @__PURE__ */ s.createElement("ol", { id: "lres", "aria-label": u("Lyric search results") }, a === "results" ? c.length ? c.map((p, d) => /* @__PURE__ */ s.createElement("li", { key: `${p.title}-${d}` }, /* @__PURE__ */ s.createElement("button", { className: "lyric-result-button", type: "button", onClick: () => $.commands.actions("editor")?.selectLyric(d) }, /* @__PURE__ */ s.createElement("span", { className: "lyric-result-copy" }, /* @__PURE__ */ s.createElement("span", null, p.title), /* @__PURE__ */ s.createElement("small", { className: p.timed ? "lyric-result-timed" : "" }, p.kind)), /* @__PURE__ */ s.createElement("small", null, p.duration)), /* @__PURE__ */ s.createElement("div", { className: "lyric-result-sources" }, (p.sources || []).map((y, m) => /* @__PURE__ */ s.createElement(s.Fragment, { key: `${y.label}-${m}` }, m > 0 ? " · " : null, y.url ? /* @__PURE__ */ s.createElement("a", { href: y.url, target: "_blank", rel: "noopener noreferrer" }, y.label, " ↗") : y.label))))) : /* @__PURE__ */ s.createElement("li", { className: "search-message" }, u(l.length ? "No lyrics returned. Some sources could not be reached." : "No results.")) : a ? /* @__PURE__ */ s.createElement("li", { className: "search-message", role: "status" }, a) : null), l.length > 0 ? /* @__PURE__ */ s.createElement("div", { className: "lyric-source-notices", role: "status" }, l.map((p) => /* @__PURE__ */ s.createElement("small", { key: p.id }, p.label, ": ", p.message))) : null);
}
function bf({
  view: a
}) {
  const c = uf(), l = Mo("lyricSearch"), u = l.providers?.length ? l.providers : ma, p = Mi(c.lyricSources), d = (m) => window.ManokaraI18n?.text(m) || m, y = (m) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: `./manokara-icons.svg#${m}` }));
  return /* @__PURE__ */ s.createElement(s.Fragment, null, "    ", /* @__PURE__ */ s.createElement("div", { className: "studio-dialog-head" }, "      ", /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("span", { className: "eyebrow" }, "Manokara"), /* @__PURE__ */ s.createElement("h2", { id: "songDialogTitle" }, a.title)), "      ", /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", id: "closeSongEditor", type: "button", "aria-label": "Close song editor", onClick: () => document.getElementById("songEditorDialog")?.close() }, y("x")), "    "), "    ", /* @__PURE__ */ s.createElement("div", { id: "songEditorMount" }, "      ", /* @__PURE__ */ s.createElement("section", { className: "tabpanel", id: "panel-song", role: "region", "aria-labelledby": "songDialogTitle" }, "        ", /* @__PURE__ */ s.createElement("div", { className: "panel-intro" }, /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("h2", { id: "ftitle" }, a.title), /* @__PURE__ */ s.createElement("p", null, "A karaoke link, a few lyrics, and you're ready."))), "        ", /* @__PURE__ */ s.createElement("div", { className: "field-grid" }, "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Karaoke link"), /* @__PURE__ */ s.createElement("input", { id: "url", type: "url", placeholder: "Paste a YouTube or media URL", autoComplete: "off", value: c.url, onChange: (m) => {
    $.draft.set("url", m.currentTarget.value), $.commands.actions("editor")?.urlChanged();
  } })), "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Song title"), /* @__PURE__ */ s.createElement("input", { id: "ttl", maxLength: "512", placeholder: "Fetched automatically", autoComplete: "off", value: c.ttl, onChange: (m) => {
    $.draft.set("ttl", m.currentTarget.value);
  } })), "        "), "        ", /* @__PURE__ */ s.createElement("div", { className: "clip-row" }, "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Start at"), /* @__PURE__ */ s.createElement("input", { id: "st", placeholder: "00:00", inputMode: "decimal", value: c.st, onChange: (m) => {
    $.draft.set("st", m.currentTarget.value);
  } })), "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "End at"), /* @__PURE__ */ s.createElement("input", { id: "en", placeholder: "Full song", inputMode: "decimal", value: c.en, onChange: (m) => {
    $.draft.set("en", m.currentTarget.value);
  } })), "          ", /* @__PURE__ */ s.createElement("small", null, "Play the whole song or choose a section. End is optional."), "        "), "        ", /* @__PURE__ */ s.createElement("section", { className: "section-divider", "aria-label": "Song lyrics" }, "          ", /* @__PURE__ */ s.createElement("h3", null, "Bring the words along"), "          ", /* @__PURE__ */ s.createElement("div", { className: "search-row" }, /* @__PURE__ */ s.createElement(
    "input",
    {
      id: "lq",
      maxLength: "200",
      "aria-label": "Search lyrics by song or artist",
      placeholder: "Song or artist",
      value: c.lq,
      onKeyDown: (m) => {
        m.key === "Enter" && !m.nativeEvent.isComposing && (m.preventDefault(), $.commands.actions("editor")?.searchLyrics());
      },
      onChange: (m) => {
        $.draft.set("lq", m.currentTarget.value), $.commands.actions("editor")?.clearLyricSearch();
      }
    }
  ), /* @__PURE__ */ s.createElement("button", { className: "s", id: "lsearch", type: "button", "aria-busy": l.busy || !1, onClick: () => $.commands.actions("editor")?.searchLyrics() }, y("magnifying-glass"), "Find lyrics"), /* @__PURE__ */ s.createElement("button", { className: "text-link", id: "lyricsify", type: "button", title: "Search Lyricsify in a new browser tab" }, "Lyricsify", y("arrow-up-right"))), /* @__PURE__ */ s.createElement("div", { className: "lyric-source-controls", "data-no-i18n": "" }, /* @__PURE__ */ s.createElement("label", { htmlFor: "lyricProvider" }, d("Source"), /* @__PURE__ */ s.createElement("select", { id: "lyricProvider", value: c.lyricProvider, onChange: (m) => {
    $.draft.set("lyricProvider", m.currentTarget.value), $.commands.actions("editor")?.clearLyricSearch();
  } }, /* @__PURE__ */ s.createElement("option", { value: "auto" }, d("All sources")), u.map((m) => /* @__PURE__ */ s.createElement("option", { key: m.id, value: m.id, disabled: !m.enabled }, m.label, m.enabled ? "" : ` · ${d(m.reason === "needs_key" ? "Needs server API key" : "Disabled on server")}`)))), /* @__PURE__ */ s.createElement("small", null, d("Timed lyrics first, regardless of source."))), /* @__PURE__ */ s.createElement("p", { id: "lyricLoadStatus", className: "lyric-load-status", role: "status", "aria-live": "polite", hidden: !c.lyricLoadStatus }, c.lyricLoadStatus), /* @__PURE__ */ s.createElement("div", { id: "lyricSearchResultsReactRoot" }), c.lyricSourceLabel ? /* @__PURE__ */ s.createElement("p", { className: "lyric-attribution", "data-no-i18n": "" }, d("Lyrics source"), ": ", p.length ? p.map((m, g) => /* @__PURE__ */ s.createElement(s.Fragment, { key: `${m.id}-${g}` }, g ? " · " : null, m.url ? /* @__PURE__ */ s.createElement("a", { href: m.url, target: "_blank", rel: "noopener noreferrer" }, m.label, " ↗") : m.label)) : _n(c.lyricSourceUrl) ? /* @__PURE__ */ s.createElement("a", { href: _n(c.lyricSourceUrl), target: "_blank", rel: "noopener noreferrer" }, c.lyricSourceLabel, " ↗") : c.lyricSourceLabel, c.lyricCopyright ? /* @__PURE__ */ s.createElement("small", null, c.lyricCopyright) : null) : null, /* @__PURE__ */ s.createElement("div", { id: "lyricDraft" }, "            ", /* @__PURE__ */ s.createElement("div", { className: "editor-toolbar" }, "              ", /* @__PURE__ */ s.createElement("button", { className: "ghost", id: "importLrc", type: "button" }, y("upload-simple"), "Import LRC"), "              ", /* @__PURE__ */ s.createElement("input", { id: "lrcFile", type: "file", accept: ".lrc", hidden: !0 }), "              ", /* @__PURE__ */ s.createElement("label", null, "Encoding", /* @__PURE__ */ s.createElement("select", { id: "lrcEncoding", value: c.lrcEncoding, onChange: (m) => {
    $.draft.set("lrcEncoding", m.currentTarget.value);
  } }, "                ", /* @__PURE__ */ s.createElement("option", { value: "auto" }, "Auto · UTF-8 / Shift_JIS"), /* @__PURE__ */ s.createElement("option", { value: "utf-8" }, "UTF-8"), /* @__PURE__ */ s.createElement("option", { value: "shift_jis" }, "Shift_JIS"), /* @__PURE__ */ s.createElement("option", { value: "utf-16le" }, "UTF-16LE"), "              ")), "            "), "            ", /* @__PURE__ */ s.createElement("textarea", { id: "llrc", "aria-label": "Original lyrics LRC", maxLength: "200000", placeholder: `[00:12.00] Your first line…
[00:16.50] Your next line…

Paste lyrics or drop an .lrc file here.`, value: c.llrc, onChange: (m) => {
    $.draft.set("llrc", m.currentTarget.value), $.commands.actions("editor")?.lyricsChanged();
  } }), "            ", /* @__PURE__ */ s.createElement("div", { className: "romaji-row" }, "              ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "romanize", type: "button", disabled: c.romanizeBusy }, "Create Romaji"), "              ", /* @__PURE__ */ s.createElement("label", null, "Display", /* @__PURE__ */ s.createElement("select", { id: "lyricMode", value: c.lyricMode, onChange: (m) => {
    $.draft.set("lyricMode", m.currentTarget.value);
  } }, /* @__PURE__ */ s.createElement("option", { value: "original" }, "Original lyrics"), /* @__PURE__ */ s.createElement("option", { value: "romaji", disabled: !c.romajiAvailable }, "Romaji"), /* @__PURE__ */ s.createElement("option", { value: "both", disabled: !c.romajiAvailable }, "Original + Romaji"))), "            "), "            ", /* @__PURE__ */ s.createElement("details", { id: "romajiDetails", open: c.romajiOpen, onToggle: (m) => $.draft.set("romajiOpen", m.currentTarget.open) }, "              ", /* @__PURE__ */ s.createElement("summary", null, "Review / edit Romaji"), "              ", /* @__PURE__ */ s.createElement("small", null, "Edit readings only. Keep timestamps, metadata and blank lines unchanged. In dual mode, Romaji appears below the original words."), "              ", /* @__PURE__ */ s.createElement("textarea", { id: "romajiLrc", "aria-label": "Romaji lyrics LRC", maxLength: "200000", spellCheck: !1, value: c.romajiLrc, onChange: (m) => {
    $.draft.set("romajiLrc", m.currentTarget.value);
  } }), "              ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "exportRomaji", type: "button" }, y("download-simple"), "Download Romaji LRC"), "            "), "            ", /* @__PURE__ */ s.createElement("small", { id: "lyricsStatus", role: "status", "aria-live": "polite", className: c.lyricsError ? "error" : "" }, c.lyricsStatus), "          "), "        "), "        ", /* @__PURE__ */ s.createElement("div", { className: "form-actions" }, "          ", /* @__PURE__ */ s.createElement("label", { className: "pitch-song-field" }, "Song key", /* @__PURE__ */ s.createElement("input", { id: "songKey", type: "number", min: "-12", max: "12", step: "1", "aria-label": "Saved song key in semitones", value: c.songKey, onChange: (m) => {
    $.draft.set("songKey", m.currentTarget.value);
  } })), "          ", /* @__PURE__ */ s.createElement("label", null, "Lyric offset", /* @__PURE__ */ s.createElement("input", { type: "number", id: "loff", step: "0.1", "aria-label": "Lyric offset in seconds", value: c.loff, onChange: (m) => {
    $.draft.set("loff", m.currentTarget.value);
  } }), "s"), "          ", /* @__PURE__ */ s.createElement("label", { className: "inline-check library-save-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "saveToLibrary", checked: c.saveToLibrary, onChange: (m) => {
    $.draft.set("saveToLibrary", m.currentTarget.checked);
  } }), "Keep in My songs"), "          ", /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("button", { className: "ghost", id: "cancel", type: "button", hidden: !a.editing, onClick: () => $.commands.actions("editor")?.cancel() }, "Cancel edit"), /* @__PURE__ */ s.createElement("button", { id: "add", type: "button", onClick: () => $.commands.actions("editor")?.save(), disabled: c.saving }, y(a.editing ? "check" : "plus"), /* @__PURE__ */ s.createElement("span", null, a.saveLabel))), "        "), "        ", /* @__PURE__ */ s.createElement("details", { id: "mcDetails" }, "          ", /* @__PURE__ */ s.createElement("summary", null, "Add an MC break"), "          ", /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("input", { id: "mcm", maxLength: "4096", placeholder: "Your note or announcement", "aria-label": "MC break note", value: c.mcm, onChange: (m) => {
    $.draft.set("mcm", m.currentTarget.value);
  } }), /* @__PURE__ */ s.createElement("input", { id: "mcd", placeholder: "00:30", "aria-label": "MC break duration", value: c.mcd, onChange: (m) => {
    $.draft.set("mcd", m.currentTarget.value);
  } }), /* @__PURE__ */ s.createElement("button", { className: "s", id: "addmc", type: "button", onClick: () => $.commands.actions("editor")?.addBreak() }, y("plus"), "Add break")), "        "), "      "), "    "), "  ");
}
const Ut = s.createElement;
function Ef({
  songs: a,
  labels: c
}) {
  const [l, u] = ze.useState(""), p = l.trim().toLocaleLowerCase(), d = a.filter((y) => !p || `${y.title || ""} ${y.artist || ""}`.toLocaleLowerCase().includes(p));
  return Ut(s.Fragment, null, Ut("label", {
    className: "field",
    htmlFor: "librarySearch"
  }, Ut("span", null, c.search), Ut("input", {
    id: "librarySearch",
    type: "search",
    placeholder: c.placeholder,
    value: l,
    onChange: (y) => u(y.target.value)
  })), Ut("div", {
    id: "libraryEmpty",
    className: "library-empty",
    hidden: d.length > 0
  }, p ? c.noMatches : c.empty), Ut("ol", {
    id: "libraryList",
    "aria-label": c.listLabel,
    "data-ids": JSON.stringify(d.map((y) => y.libraryId))
  }, d.map((y) => Ut("li", {
    key: y.libraryId
  }, Ut("div", {
    className: "library-song-info"
  }, Ut("b", null, y.title || y.url), Ut("small", null, y.lrc ? c.lyricsSaved : c.noLyrics)), Ut("div", {
    className: "library-song-actions"
  }, Ut("button", {
    className: "s",
    type: "button",
    onClick: () => $.commands.actions("library")?.add(y.libraryId)
  }, c.add), Ut("button", {
    className: "ghost icon-button",
    type: "button",
    onClick: () => $.commands.actions("library")?.remove(y.libraryId),
    "aria-label": c.remove,
    title: c.remove
  }, Ut("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ut("use", {
    href: "./manokara-icons.svg#trash"
  }))))))));
}
function Cf() {
  return /* @__PURE__ */ s.createElement(s.Fragment, null, "    ", /* @__PURE__ */ s.createElement("div", { className: "studio-dialog-head" }, "      ", /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("span", { className: "eyebrow" }, "Saved on this browser"), /* @__PURE__ */ s.createElement("h2", { id: "libraryTitle" }, "My songs")), "      ", /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", id: "closeLibrary", type: "button", "aria-label": "Close song library", onClick: () => document.getElementById("libraryDialog")?.close() }, "        ", /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#x" })), "      "), "    "), "    ", /* @__PURE__ */ s.createElement("div", { className: "library-content" }, "      ", /* @__PURE__ */ s.createElement("p", { className: "mu" }, "Keep songs and their lyrics here, even when you clear or replace a setlist."), "      ", /* @__PURE__ */ s.createElement("div", { id: "libraryReactRoot" }), "    "), "  ");
}
const nt = s.createElement;
function Lf({
  songs: a,
  currentIndex: c,
  labels: l,
  formatTime: u
}) {
  const p = (d) => nt("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, nt("use", {
    href: `./manokara-icons.svg#${d}`
  }));
  return nt(s.Fragment, null, nt("div", {
    className: "section-head setlist-head"
  }, nt("div", {
    className: "section-title"
  }, nt("h2", {
    id: "setlistTitle"
  }, l.setlist), nt("span", {
    className: "count",
    id: "setlistCount"
  }, a.length)), nt("button", {
    className: "ghost setlist-library",
    id: "openLibrary",
    type: "button",
    onClick: () => $.commands.actions("setlist")?.openLibrary(),
    "aria-haspopup": "dialog",
    "aria-controls": "libraryDialog"
  }, p("playlist"), nt("span", null, l.mySongs), nt("span", {
    className: "count",
    id: "libraryCount"
  }, l.libraryCount))), nt("button", {
    className: "s setlist-add",
    id: "openSongEditor",
    type: "button",
    onClick: () => $.commands.actions("setlist")?.openEditor(),
    title: l.addSong
  }, p("plus"), nt("span", null, l.addSong)), nt("div", {
    id: "setlistEmpty",
    className: "empty-setlist",
    hidden: a.length > 0
  }, nt("div", {
    className: "empty-icon"
  }, p("playlist")), nt("p", null, l.emptyTitle), nt("small", null, l.emptyHint)), nt("ol", {
    id: "list",
    "aria-label": l.listLabel
  }, a.map((d, y) => {
    const m = d.mc ? `${l.mcPrefix}${d.memo || l.announcement}` : d.title || d.url, g = d.mc ? d.dur : d.e != null ? d.e - (d.s || 0) : d.mediaDuration, L = d.mc ? l.mcBreak : l.kind(y, d), N = y === c, E = `${d.libraryId || d.url || d.memo || "song"}:${y}`, M = (O, k, v, C = !1) => nt("button", {
      key: O,
      className: "ghost",
      type: "button",
      "data-a": O,
      title: k,
      "aria-label": k,
      disabled: C
    }, p(v));
    return nt("li", {
      key: E,
      className: N ? "on" : "",
      "data-i": y,
      onClick: (O) => {
        const k = O.target.closest("[data-a]");
        k && $.commands.actions("setlist")?.song(y, k.dataset.a);
      }
    }, nt("span", {
      className: "song-number"
    }, String(y + 1).padStart(2, "0")), nt("button", {
      className: "t",
      type: "button",
      "data-a": "go",
      title: m,
      "aria-pressed": N
    }, nt("span", {
      className: "song-name"
    }, m)), nt("small", {
      className: "song-meta"
    }, [L, d.lrc ? l.lyricsReady : "", Number.isFinite(g) ? u(g) : ""].filter(Boolean).join(" · ")), nt("div", {
      className: "list-actions"
    }, [!d.mc && M("ed", l.edit, "pencil-simple"), M("up", l.moveUp, "arrow-up", y === 0), M("dn", l.moveDown, "arrow-down", y === a.length - 1), M("del", l.remove, "x")].filter(Boolean)));
  })), nt("div", {
    className: "setlist-footer"
  }, nt("button", {
    className: "ghost",
    id: "clr",
    type: "button",
    onClick: () => $.commands.actions("setlist")?.clear(),
    disabled: a.length === 0
  }, p("trash"), l.clear), nt("small", null, l.savedBrowser)));
}
var wo = {}, ss = { exports: {} }, Qt = {}, us = { exports: {} }, cs = {};
var Uc;
function Tf() {
  return Uc || (Uc = 1, (function(a) {
    function c(w, j) {
      var Y = w.length;
      w.push(j);
      e: for (; 0 < Y; ) {
        var S = Y - 1 >>> 1, F = w[S];
        if (0 < p(F, j)) w[S] = j, w[Y] = F, Y = S;
        else break e;
      }
    }
    function l(w) {
      return w.length === 0 ? null : w[0];
    }
    function u(w) {
      if (w.length === 0) return null;
      var j = w[0], Y = w.pop();
      if (Y !== j) {
        w[0] = Y;
        e: for (var S = 0, F = w.length, fe = F >>> 1; S < fe; ) {
          var be = 2 * (S + 1) - 1, Pe = w[be], Be = be + 1, je = w[Be];
          if (0 > p(Pe, Y)) Be < F && 0 > p(je, Pe) ? (w[S] = je, w[Be] = Y, S = Be) : (w[S] = Pe, w[be] = Y, S = be);
          else if (Be < F && 0 > p(je, Y)) w[S] = je, w[Be] = Y, S = Be;
          else break e;
        }
      }
      return j;
    }
    function p(w, j) {
      var Y = w.sortIndex - j.sortIndex;
      return Y !== 0 ? Y : w.id - j.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var y = Date, m = y.now();
      a.unstable_now = function() {
        return y.now() - m;
      };
    }
    var g = [], L = [], N = 1, E = null, M = 3, O = !1, k = !1, v = !1, C = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, A = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Q(w) {
      for (var j = l(L); j !== null; ) {
        if (j.callback === null) u(L);
        else if (j.startTime <= w) u(L), j.sortIndex = j.expirationTime, c(g, j);
        else break;
        j = l(L);
      }
    }
    function I(w) {
      if (v = !1, Q(w), !k) if (l(g) !== null) k = !0, G(_);
      else {
        var j = l(L);
        j !== null && H(I, j.startTime - w);
      }
    }
    function _(w, j) {
      k = !1, v && (v = !1, T(ee), ee = -1), O = !0;
      var Y = M;
      try {
        for (Q(j), E = l(g); E !== null && (!(E.expirationTime > j) || w && !le()); ) {
          var S = E.callback;
          if (typeof S == "function") {
            E.callback = null, M = E.priorityLevel;
            var F = S(E.expirationTime <= j);
            j = a.unstable_now(), typeof F == "function" ? E.callback = F : E === l(g) && u(g), Q(j);
          } else u(g);
          E = l(g);
        }
        if (E !== null) var fe = !0;
        else {
          var be = l(L);
          be !== null && H(I, be.startTime - j), fe = !1;
        }
        return fe;
      } finally {
        E = null, M = Y, O = !1;
      }
    }
    var X = !1, q = null, ee = -1, se = 5, W = -1;
    function le() {
      return !(a.unstable_now() - W < se);
    }
    function Z() {
      if (q !== null) {
        var w = a.unstable_now();
        W = w;
        var j = !0;
        try {
          j = q(!0, w);
        } finally {
          j ? V() : (X = !1, q = null);
        }
      } else X = !1;
    }
    var V;
    if (typeof A == "function") V = function() {
      A(Z);
    };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), B = J.port2;
      J.port1.onmessage = Z, V = function() {
        B.postMessage(null);
      };
    } else V = function() {
      C(Z, 0);
    };
    function G(w) {
      q = w, X || (X = !0, V());
    }
    function H(w, j) {
      ee = C(function() {
        w(a.unstable_now());
      }, j);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(w) {
      w.callback = null;
    }, a.unstable_continueExecution = function() {
      k || O || (k = !0, G(_));
    }, a.unstable_forceFrameRate = function(w) {
      0 > w || 125 < w ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : se = 0 < w ? Math.floor(1e3 / w) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, a.unstable_getFirstCallbackNode = function() {
      return l(g);
    }, a.unstable_next = function(w) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = M;
      }
      var Y = M;
      M = j;
      try {
        return w();
      } finally {
        M = Y;
      }
    }, a.unstable_pauseExecution = function() {
    }, a.unstable_requestPaint = function() {
    }, a.unstable_runWithPriority = function(w, j) {
      switch (w) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          w = 3;
      }
      var Y = M;
      M = w;
      try {
        return j();
      } finally {
        M = Y;
      }
    }, a.unstable_scheduleCallback = function(w, j, Y) {
      var S = a.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? S + Y : S) : Y = S, w) {
        case 1:
          var F = -1;
          break;
        case 2:
          F = 250;
          break;
        case 5:
          F = 1073741823;
          break;
        case 4:
          F = 1e4;
          break;
        default:
          F = 5e3;
      }
      return F = Y + F, w = { id: N++, callback: j, priorityLevel: w, startTime: Y, expirationTime: F, sortIndex: -1 }, Y > S ? (w.sortIndex = Y, c(L, w), l(g) === null && w === l(L) && (v ? (T(ee), ee = -1) : v = !0, H(I, Y - S))) : (w.sortIndex = F, c(g, w), k || O || (k = !0, G(_))), w;
    }, a.unstable_shouldYield = le, a.unstable_wrapCallback = function(w) {
      var j = M;
      return function() {
        var Y = M;
        M = j;
        try {
          return w.apply(this, arguments);
        } finally {
          M = Y;
        }
      };
    };
  })(cs)), cs;
}
var Kc;
function xf() {
  return Kc || (Kc = 1, us.exports = Tf()), us.exports;
}
var Vc;
function Nf() {
  if (Vc) return Qt;
  Vc = 1;
  var a = td(), c = xf();
  function l(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var u = /* @__PURE__ */ new Set(), p = {};
  function d(e, t) {
    y(e, t), y(e + "Capture", t);
  }
  function y(e, t) {
    for (p[e] = t, e = 0; e < t.length; e++) u.add(t[e]);
  }
  var m = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, L = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, N = {}, E = {};
  function M(e) {
    return g.call(E, e) ? !0 : g.call(N, e) ? !1 : L.test(e) ? E[e] = !0 : (N[e] = !0, !1);
  }
  function O(e, t, n, r) {
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
  function k(e, t, n, r) {
    if (t === null || typeof t > "u" || O(e, t, n, r)) return !0;
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
  function v(e, t, n, r, i, o, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = f;
  }
  var C = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    C[e] = new v(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    C[t] = new v(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    C[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    C[e] = new v(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    C[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    C[e] = new v(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    C[e] = new v(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    C[e] = new v(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    C[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var T = /[\-:]([a-z])/g;
  function A(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      T,
      A
    );
    C[t] = new v(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(T, A);
    C[t] = new v(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(T, A);
    C[t] = new v(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    C[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), C.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    C[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function Q(e, t, n, r) {
    var i = C.hasOwnProperty(t) ? C[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (k(t, n, i, r) && (n = null), r || i === null ? M(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var I = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _ = /* @__PURE__ */ Symbol.for("react.element"), X = /* @__PURE__ */ Symbol.for("react.portal"), q = /* @__PURE__ */ Symbol.for("react.fragment"), ee = /* @__PURE__ */ Symbol.for("react.strict_mode"), se = /* @__PURE__ */ Symbol.for("react.profiler"), W = /* @__PURE__ */ Symbol.for("react.provider"), le = /* @__PURE__ */ Symbol.for("react.context"), Z = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), J = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), G = /* @__PURE__ */ Symbol.for("react.lazy"), H = /* @__PURE__ */ Symbol.for("react.offscreen"), w = Symbol.iterator;
  function j(e) {
    return e === null || typeof e != "object" ? null : (e = w && e[w] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Y = Object.assign, S;
  function F(e) {
    if (S === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      S = t && t[1] || "";
    }
    return `
` + S + e;
  }
  var fe = !1;
  function be(e, t) {
    if (!e || fe) return "";
    fe = !0;
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
        } catch (U) {
          var r = U;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (U) {
          r = U;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (U) {
          r = U;
        }
        e();
      }
    } catch (U) {
      if (U && r && typeof U.stack == "string") {
        for (var i = U.stack.split(`
`), o = r.stack.split(`
`), f = i.length - 1, b = o.length - 1; 1 <= f && 0 <= b && i[f] !== o[b]; ) b--;
        for (; 1 <= f && 0 <= b; f--, b--) if (i[f] !== o[b]) {
          if (f !== 1 || b !== 1)
            do
              if (f--, b--, 0 > b || i[f] !== o[b]) {
                var x = `
` + i[f].replace(" at new ", " at ");
                return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), x;
              }
            while (1 <= f && 0 <= b);
          break;
        }
      }
    } finally {
      fe = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? F(e) : "";
  }
  function Pe(e) {
    switch (e.tag) {
      case 5:
        return F(e.type);
      case 16:
        return F("Lazy");
      case 13:
        return F("Suspense");
      case 19:
        return F("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = be(e.type, !1), e;
      case 11:
        return e = be(e.type.render, !1), e;
      case 1:
        return e = be(e.type, !0), e;
      default:
        return "";
    }
  }
  function Be(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case q:
        return "Fragment";
      case X:
        return "Portal";
      case se:
        return "Profiler";
      case ee:
        return "StrictMode";
      case V:
        return "Suspense";
      case J:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case le:
        return (e.displayName || "Context") + ".Consumer";
      case W:
        return (e._context.displayName || "Context") + ".Provider";
      case Z:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case B:
        return t = e.displayName || null, t !== null ? t : Be(e.type) || "Memo";
      case G:
        t = e._payload, e = e._init;
        try {
          return Be(e(t));
        } catch {
        }
    }
    return null;
  }
  function je(e) {
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
        return Be(t);
      case 8:
        return t === ee ? "StrictMode" : "Mode";
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
  function me(e) {
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
  function Oe(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ee(e) {
    var t = Oe(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
      }, set: function(f) {
        r = "" + f, o.call(this, f);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(f) {
        r = "" + f;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Fe(e) {
    e._valueTracker || (e._valueTracker = Ee(e));
  }
  function Nt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = Oe(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function K(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function ce(e, t) {
    var n = t.checked;
    return Y({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function pe(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = me(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Re(e, t) {
    t = t.checked, t != null && Q(e, "checked", t, !1);
  }
  function _e(e, t) {
    Re(e, t);
    var n = me(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? he(e, t.type, n) : t.hasOwnProperty("defaultValue") && he(e, t.type, me(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Ce(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function he(e, t, n) {
    (t !== "number" || K(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Me = Array.isArray;
  function ge(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + me(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ke(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
    return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function $e(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(l(92));
        if (Me(n)) {
          if (1 < n.length) throw Error(l(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: me(n) };
  }
  function We(e, t) {
    var n = me(t.value), r = me(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function on(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Xt(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Bt(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Xt(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Dn, rr = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Dn = Dn || document.createElement("div"), Dn.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Dn.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Zt(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var ln = {
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
  }, Pi = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ln).forEach(function(e) {
    Pi.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), ln[t] = ln[e];
    });
  });
  function Zr(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || ln.hasOwnProperty(e) && ln[e] ? ("" + t).trim() : t + "px";
  }
  function Kt(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = Zr(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
  }
  var Vt = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Nn(e, t) {
    if (t) {
      if (Vt[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(l(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(l(62));
    }
  }
  function ir(e, t) {
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
  var sn = null;
  function Or(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Mn = null, ft = null, zt = null;
  function ae(e) {
    if (e = Xi(e)) {
      if (typeof Mn != "function") throw Error(l(280));
      var t = e.stateNode;
      t && (t = Aa(t), Mn(e.stateNode, e.type, t));
    }
  }
  function ve(e) {
    ft ? zt ? zt.push(e) : zt = [e] : ft = e;
  }
  function de() {
    if (ft) {
      var e = ft, t = zt;
      if (zt = ft = null, ae(e), t) for (e = 0; e < t.length; e++) ae(t[e]);
    }
  }
  function Qe(e, t) {
    return e(t);
  }
  function tt() {
  }
  var et = !1;
  function Xe(e, t, n) {
    if (et) return e(t, n);
    et = !0;
    try {
      return Qe(e, t, n);
    } finally {
      et = !1, (ft !== null || zt !== null) && (tt(), de());
    }
  }
  function Ue(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Aa(n);
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
    if (n && typeof n != "function") throw Error(l(231, t, typeof n));
    return n;
  }
  var st = !1;
  if (m) try {
    var Fn = {};
    Object.defineProperty(Fn, "passive", { get: function() {
      st = !0;
    } }), window.addEventListener("test", Fn, Fn), window.removeEventListener("test", Fn, Fn);
  } catch {
    st = !1;
  }
  function Po(e, t, n, r, i, o, f, b, x) {
    var U = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, U);
    } catch (re) {
      this.onError(re);
    }
  }
  var Un = !1, Kn = null, Ar = !1, ei = null, Oo = { onError: function(e) {
    Un = !0, Kn = e;
  } };
  function ga(e, t, n, r, i, o, f, b, x) {
    Un = !1, Kn = null, Po.apply(Oo, arguments);
  }
  function Ir(e, t, n, r, i, o, f, b, x) {
    if (ga.apply(this, arguments), Un) {
      if (Un) {
        var U = Kn;
        Un = !1, Kn = null;
      } else throw Error(l(198));
      Ar || (Ar = !0, ei = U);
    }
  }
  function Rn(e) {
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
  function ya(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Vn(e) {
    if (Rn(e) !== e) throw Error(l(188));
  }
  function va(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Rn(e), t === null) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var o = i.alternate;
      if (o === null) {
        if (r = i.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (o = i.child; o; ) {
          if (o === n) return Vn(i), e;
          if (o === r) return Vn(i), t;
          o = o.sibling;
        }
        throw Error(l(188));
      }
      if (n.return !== r.return) n = i, r = o;
      else {
        for (var f = !1, b = i.child; b; ) {
          if (b === n) {
            f = !0, n = i, r = o;
            break;
          }
          if (b === r) {
            f = !0, r = i, n = o;
            break;
          }
          b = b.sibling;
        }
        if (!f) {
          for (b = o.child; b; ) {
            if (b === n) {
              f = !0, n = o, r = i;
              break;
            }
            if (b === r) {
              f = !0, r = o, n = i;
              break;
            }
            b = b.sibling;
          }
          if (!f) throw Error(l(189));
        }
      }
      if (n.alternate !== r) throw Error(l(190));
    }
    if (n.tag !== 3) throw Error(l(188));
    return n.stateNode.current === n ? e : t;
  }
  function ar(e) {
    return e = va(e), e !== null ? or(e) : null;
  }
  function or(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = or(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Oi = c.unstable_scheduleCallback, Ai = c.unstable_cancelCallback, Ii = c.unstable_shouldYield, Hn = c.unstable_requestPaint, ot = c.unstable_now, Bi = c.unstable_getCurrentPriorityLevel, lr = c.unstable_ImmediatePriority, ka = c.unstable_UserBlockingPriority, Yn = c.unstable_NormalPriority, Ao = c.unstable_LowPriority, sr = c.unstable_IdlePriority, ti = null, un = null;
  function Mt(e) {
    if (un && typeof un.onCommitFiberRoot == "function") try {
      un.onCommitFiberRoot(ti, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var jt = Math.clz32 ? Math.clz32 : zi, ni = Math.log, Br = Math.LN2;
  function zi(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ni(e) / Br | 0) | 0;
  }
  var zr = 64, ri = 4194304;
  function ur(e) {
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
  function cr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, i = e.suspendedLanes, o = e.pingedLanes, f = n & 268435455;
    if (f !== 0) {
      var b = f & ~i;
      b !== 0 ? r = ur(b) : (o &= f, o !== 0 && (r = ur(o)));
    } else f = n & ~i, f !== 0 ? r = ur(f) : o !== 0 && (r = ur(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - jt(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function $n(e, t) {
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
  function wa(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var f = 31 - jt(o), b = 1 << f, x = i[f];
      x === -1 ? ((b & n) === 0 || (b & r) !== 0) && (i[f] = $n(b, t)) : x <= t && (e.expiredLanes |= b), o &= ~b;
    }
  }
  function cn(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function dr() {
    var e = zr;
    return zr <<= 1, (zr & 4194240) === 0 && (zr = 64), e;
  }
  function Ht(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function gt(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - jt(t), e[t] = n;
  }
  function Io(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - jt(n), o = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
    }
  }
  function ji(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - jt(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var Je = 0;
  function Pn(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var On, jr, _r, _i, Di, hr = !1, ii = [], Rt = null, vn = null, kn = null, Dr = /* @__PURE__ */ new Map(), fr = /* @__PURE__ */ new Map(), wn = [], Sa = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function h(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Rt = null;
        break;
      case "dragenter":
      case "dragleave":
        vn = null;
        break;
      case "mouseover":
      case "mouseout":
        kn = null;
        break;
      case "pointerover":
      case "pointerout":
        Dr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fr.delete(t.pointerId);
    }
  }
  function P(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Xi(t), t !== null && jr(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function ie(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return Rt = P(Rt, e, t, n, r, i), !0;
      case "dragenter":
        return vn = P(vn, e, t, n, r, i), !0;
      case "mouseover":
        return kn = P(kn, e, t, n, r, i), !0;
      case "pointerover":
        var o = i.pointerId;
        return Dr.set(o, P(Dr.get(o) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return o = i.pointerId, fr.set(o, P(fr.get(o) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function ne(e) {
    var t = Fr(e.target);
    if (t !== null) {
      var n = Rn(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = ya(n), t !== null) {
            e.blockedOn = t, Di(e.priority, function() {
              _r(n);
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
  function Ne(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Fi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        sn = r, n.target.dispatchEvent(r), sn = null;
      } else return t = Xi(n), t !== null && jr(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Te(e, t, n) {
    Ne(e) && n.delete(t);
  }
  function we() {
    hr = !1, Rt !== null && Ne(Rt) && (Rt = null), vn !== null && Ne(vn) && (vn = null), kn !== null && Ne(kn) && (kn = null), Dr.forEach(Te), fr.forEach(Te);
  }
  function wt(e, t) {
    e.blockedOn === t && (e.blockedOn = null, hr || (hr = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, we)));
  }
  function pt(e) {
    function t(i) {
      return wt(i, e);
    }
    if (0 < ii.length) {
      wt(ii[0], e);
      for (var n = 1; n < ii.length; n++) {
        var r = ii[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Rt !== null && wt(Rt, e), vn !== null && wt(vn, e), kn !== null && wt(kn, e), Dr.forEach(t), fr.forEach(t), n = 0; n < wn.length; n++) r = wn[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < wn.length && (n = wn[0], n.blockedOn === null); ) ne(n), n.blockedOn === null && wn.shift();
  }
  var en = I.ReactCurrentBatchConfig, Yt = !0;
  function ai(e, t, n, r) {
    var i = Je, o = en.transition;
    en.transition = null;
    try {
      Je = 1, oi(e, t, n, r);
    } finally {
      Je = i, en.transition = o;
    }
  }
  function _t(e, t, n, r) {
    var i = Je, o = en.transition;
    en.transition = null;
    try {
      Je = 4, oi(e, t, n, r);
    } finally {
      Je = i, en.transition = o;
    }
  }
  function oi(e, t, n, r) {
    if (Yt) {
      var i = Fi(e, t, n, r);
      if (i === null) Qo(e, t, r, li, n), h(e, r);
      else if (ie(i, e, t, n, r)) r.stopPropagation();
      else if (h(e, r), t & 4 && -1 < Sa.indexOf(e)) {
        for (; i !== null; ) {
          var o = Xi(i);
          if (o !== null && On(o), o = Fi(e, t, n, r), o === null && Qo(e, t, r, li, n), o === i) break;
          i = o;
        }
        i !== null && r.stopPropagation();
      } else Qo(e, t, r, null, n);
    }
  }
  var li = null;
  function Fi(e, t, n, r) {
    if (li = null, e = Or(r), e = Fr(e), e !== null) if (t = Rn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = ya(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return li = e, null;
  }
  function bs(e) {
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
        switch (Bi()) {
          case lr:
            return 1;
          case ka:
            return 4;
          case Yn:
          case Ao:
            return 16;
          case sr:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var pr = null, Bo = null, ba = null;
  function Es() {
    if (ba) return ba;
    var e, t = Bo, n = t.length, r, i = "value" in pr ? pr.value : pr.textContent, o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var f = n - e;
    for (r = 1; r <= f && t[n - r] === i[o - r]; r++) ;
    return ba = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Ea(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ca() {
    return !0;
  }
  function Cs() {
    return !1;
  }
  function tn(e) {
    function t(n, r, i, o, f) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = f, this.currentTarget = null;
      for (var b in e) e.hasOwnProperty(b) && (n = e[b], this[b] = n ? n(o) : o[b]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ca : Cs, this.isPropagationStopped = Cs, this;
    }
    return Y(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ca);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ca);
    }, persist: function() {
    }, isPersistent: Ca }), t;
  }
  var si = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, zo = tn(si), Ui = Y({}, si, { view: 0, detail: 0 }), Nd = tn(Ui), jo, _o, Ki, La = Y({}, Ui, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Fo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Ki && (Ki && e.type === "mousemove" ? (jo = e.screenX - Ki.screenX, _o = e.screenY - Ki.screenY) : _o = jo = 0, Ki = e), jo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : _o;
  } }), Ls = tn(La), Md = Y({}, La, { dataTransfer: 0 }), Rd = tn(Md), Pd = Y({}, Ui, { relatedTarget: 0 }), Do = tn(Pd), Od = Y({}, si, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ad = tn(Od), Id = Y({}, si, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Bd = tn(Id), zd = Y({}, si, { data: 0 }), Ts = tn(zd), jd = {
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
  }, _d = {
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
  }, Dd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Fd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Dd[e]) ? !!t[e] : !1;
  }
  function Fo() {
    return Fd;
  }
  var Ud = Y({}, Ui, { key: function(e) {
    if (e.key) {
      var t = jd[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ea(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _d[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Fo, charCode: function(e) {
    return e.type === "keypress" ? Ea(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ea(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Kd = tn(Ud), Vd = Y({}, La, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), xs = tn(Vd), Hd = Y({}, Ui, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Fo }), Yd = tn(Hd), $d = Y({}, si, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qd = tn($d), Wd = Y({}, La, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Jd = tn(Wd), Gd = [9, 13, 27, 32], Uo = m && "CompositionEvent" in window, Vi = null;
  m && "documentMode" in document && (Vi = document.documentMode);
  var Qd = m && "TextEvent" in window && !Vi, Ns = m && (!Uo || Vi && 8 < Vi && 11 >= Vi), Ms = " ", Rs = !1;
  function Ps(e, t) {
    switch (e) {
      case "keyup":
        return Gd.indexOf(t.keyCode) !== -1;
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
  function Os(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ui = !1;
  function Xd(e, t) {
    switch (e) {
      case "compositionend":
        return Os(t);
      case "keypress":
        return t.which !== 32 ? null : (Rs = !0, Ms);
      case "textInput":
        return e = t.data, e === Ms && Rs ? null : e;
      default:
        return null;
    }
  }
  function Zd(e, t) {
    if (ui) return e === "compositionend" || !Uo && Ps(e, t) ? (e = Es(), ba = Bo = pr = null, ui = !1, e) : null;
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
        return Ns && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var eh = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function As(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!eh[e.type] : t === "textarea";
  }
  function Is(e, t, n, r) {
    ve(r), t = Ra(t, "onChange"), 0 < t.length && (n = new zo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var Hi = null, Yi = null;
  function th(e) {
    Xs(e, 0);
  }
  function Ta(e) {
    var t = pi(e);
    if (Nt(t)) return e;
  }
  function nh(e, t) {
    if (e === "change") return t;
  }
  var Bs = !1;
  if (m) {
    var Ko;
    if (m) {
      var Vo = "oninput" in document;
      if (!Vo) {
        var zs = document.createElement("div");
        zs.setAttribute("oninput", "return;"), Vo = typeof zs.oninput == "function";
      }
      Ko = Vo;
    } else Ko = !1;
    Bs = Ko && (!document.documentMode || 9 < document.documentMode);
  }
  function js() {
    Hi && (Hi.detachEvent("onpropertychange", _s), Yi = Hi = null);
  }
  function _s(e) {
    if (e.propertyName === "value" && Ta(Yi)) {
      var t = [];
      Is(t, Yi, e, Or(e)), Xe(th, t);
    }
  }
  function rh(e, t, n) {
    e === "focusin" ? (js(), Hi = t, Yi = n, Hi.attachEvent("onpropertychange", _s)) : e === "focusout" && js();
  }
  function ih(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ta(Yi);
  }
  function ah(e, t) {
    if (e === "click") return Ta(t);
  }
  function oh(e, t) {
    if (e === "input" || e === "change") return Ta(t);
  }
  function lh(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sn = typeof Object.is == "function" ? Object.is : lh;
  function $i(e, t) {
    if (Sn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!g.call(t, i) || !Sn(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Ds(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Fs(e, t) {
    var n = Ds(e);
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
      n = Ds(n);
    }
  }
  function Us(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Us(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ks() {
    for (var e = window, t = K(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = K(e.document);
    }
    return t;
  }
  function Ho(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function sh(e) {
    var t = Ks(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Us(n.ownerDocument.documentElement, n)) {
      if (r !== null && Ho(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, o = Math.min(r.start, i);
          r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Fs(n, o);
          var f = Fs(
            n,
            r
          );
          i && f && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== f.node || e.focusOffset !== f.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(f.node, f.offset)) : (t.setEnd(f.node, f.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var uh = m && "documentMode" in document && 11 >= document.documentMode, ci = null, Yo = null, qi = null, $o = !1;
  function Vs(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    $o || ci == null || ci !== K(r) || (r = ci, "selectionStart" in r && Ho(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), qi && $i(qi, r) || (qi = r, r = Ra(Yo, "onSelect"), 0 < r.length && (t = new zo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = ci)));
  }
  function xa(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var di = { animationend: xa("Animation", "AnimationEnd"), animationiteration: xa("Animation", "AnimationIteration"), animationstart: xa("Animation", "AnimationStart"), transitionend: xa("Transition", "TransitionEnd") }, qo = {}, Hs = {};
  m && (Hs = document.createElement("div").style, "AnimationEvent" in window || (delete di.animationend.animation, delete di.animationiteration.animation, delete di.animationstart.animation), "TransitionEvent" in window || delete di.transitionend.transition);
  function Na(e) {
    if (qo[e]) return qo[e];
    if (!di[e]) return e;
    var t = di[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Hs) return qo[e] = t[n];
    return e;
  }
  var Ys = Na("animationend"), $s = Na("animationiteration"), qs = Na("animationstart"), Ws = Na("transitionend"), Js = /* @__PURE__ */ new Map(), Gs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function mr(e, t) {
    Js.set(e, t), d(t, [e]);
  }
  for (var Wo = 0; Wo < Gs.length; Wo++) {
    var Jo = Gs[Wo], ch = Jo.toLowerCase(), dh = Jo[0].toUpperCase() + Jo.slice(1);
    mr(ch, "on" + dh);
  }
  mr(Ys, "onAnimationEnd"), mr($s, "onAnimationIteration"), mr(qs, "onAnimationStart"), mr("dblclick", "onDoubleClick"), mr("focusin", "onFocus"), mr("focusout", "onBlur"), mr(Ws, "onTransitionEnd"), y("onMouseEnter", ["mouseout", "mouseover"]), y("onMouseLeave", ["mouseout", "mouseover"]), y("onPointerEnter", ["pointerout", "pointerover"]), y("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Wi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hh = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wi));
  function Qs(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Ir(r, t, void 0, e), e.currentTarget = null;
  }
  function Xs(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var f = r.length - 1; 0 <= f; f--) {
          var b = r[f], x = b.instance, U = b.currentTarget;
          if (b = b.listener, x !== o && i.isPropagationStopped()) break e;
          Qs(i, b, U), o = x;
        }
        else for (f = 0; f < r.length; f++) {
          if (b = r[f], x = b.instance, U = b.currentTarget, b = b.listener, x !== o && i.isPropagationStopped()) break e;
          Qs(i, b, U), o = x;
        }
      }
    }
    if (Ar) throw e = ei, Ar = !1, ei = null, e;
  }
  function it(e, t) {
    var n = t[rl];
    n === void 0 && (n = t[rl] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (Zs(t, e, 2, !1), n.add(r));
  }
  function Go(e, t, n) {
    var r = 0;
    t && (r |= 4), Zs(n, e, r, t);
  }
  var Ma = "_reactListening" + Math.random().toString(36).slice(2);
  function Ji(e) {
    if (!e[Ma]) {
      e[Ma] = !0, u.forEach(function(n) {
        n !== "selectionchange" && (hh.has(n) || Go(n, !1, e), Go(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ma] || (t[Ma] = !0, Go("selectionchange", !1, t));
    }
  }
  function Zs(e, t, n, r) {
    switch (bs(t)) {
      case 1:
        var i = ai;
        break;
      case 4:
        i = _t;
        break;
      default:
        i = oi;
    }
    n = i.bind(null, t, n, e), i = void 0, !st || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function Qo(e, t, n, r, i) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var f = r.tag;
      if (f === 3 || f === 4) {
        var b = r.stateNode.containerInfo;
        if (b === i || b.nodeType === 8 && b.parentNode === i) break;
        if (f === 4) for (f = r.return; f !== null; ) {
          var x = f.tag;
          if ((x === 3 || x === 4) && (x = f.stateNode.containerInfo, x === i || x.nodeType === 8 && x.parentNode === i)) return;
          f = f.return;
        }
        for (; b !== null; ) {
          if (f = Fr(b), f === null) return;
          if (x = f.tag, x === 5 || x === 6) {
            r = o = f;
            continue e;
          }
          b = b.parentNode;
        }
      }
      r = r.return;
    }
    Xe(function() {
      var U = o, re = Or(n), oe = [];
      e: {
        var te = Js.get(e);
        if (te !== void 0) {
          var ye = zo, Se = e;
          switch (e) {
            case "keypress":
              if (Ea(n) === 0) break e;
            case "keydown":
            case "keyup":
              ye = Kd;
              break;
            case "focusin":
              Se = "focus", ye = Do;
              break;
            case "focusout":
              Se = "blur", ye = Do;
              break;
            case "beforeblur":
            case "afterblur":
              ye = Do;
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
              ye = Ls;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ye = Rd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ye = Yd;
              break;
            case Ys:
            case $s:
            case qs:
              ye = Ad;
              break;
            case Ws:
              ye = qd;
              break;
            case "scroll":
              ye = Nd;
              break;
            case "wheel":
              ye = Jd;
              break;
            case "copy":
            case "cut":
            case "paste":
              ye = Bd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ye = xs;
          }
          var Le = (t & 4) !== 0, ht = !Le && e === "scroll", z = Le ? te !== null ? te + "Capture" : null : te;
          Le = [];
          for (var R = U, D; R !== null; ) {
            D = R;
            var ue = D.stateNode;
            if (D.tag === 5 && ue !== null && (D = ue, z !== null && (ue = Ue(R, z), ue != null && Le.push(Gi(R, ue, D)))), ht) break;
            R = R.return;
          }
          0 < Le.length && (te = new ye(te, Se, null, n, re), oe.push({ event: te, listeners: Le }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (te = e === "mouseover" || e === "pointerover", ye = e === "mouseout" || e === "pointerout", te && n !== sn && (Se = n.relatedTarget || n.fromElement) && (Fr(Se) || Se[qn])) break e;
          if ((ye || te) && (te = re.window === re ? re : (te = re.ownerDocument) ? te.defaultView || te.parentWindow : window, ye ? (Se = n.relatedTarget || n.toElement, ye = U, Se = Se ? Fr(Se) : null, Se !== null && (ht = Rn(Se), Se !== ht || Se.tag !== 5 && Se.tag !== 6) && (Se = null)) : (ye = null, Se = U), ye !== Se)) {
            if (Le = Ls, ue = "onMouseLeave", z = "onMouseEnter", R = "mouse", (e === "pointerout" || e === "pointerover") && (Le = xs, ue = "onPointerLeave", z = "onPointerEnter", R = "pointer"), ht = ye == null ? te : pi(ye), D = Se == null ? te : pi(Se), te = new Le(ue, R + "leave", ye, n, re), te.target = ht, te.relatedTarget = D, ue = null, Fr(re) === U && (Le = new Le(z, R + "enter", Se, n, re), Le.target = D, Le.relatedTarget = ht, ue = Le), ht = ue, ye && Se) t: {
              for (Le = ye, z = Se, R = 0, D = Le; D; D = hi(D)) R++;
              for (D = 0, ue = z; ue; ue = hi(ue)) D++;
              for (; 0 < R - D; ) Le = hi(Le), R--;
              for (; 0 < D - R; ) z = hi(z), D--;
              for (; R--; ) {
                if (Le === z || z !== null && Le === z.alternate) break t;
                Le = hi(Le), z = hi(z);
              }
              Le = null;
            }
            else Le = null;
            ye !== null && eu(oe, te, ye, Le, !1), Se !== null && ht !== null && eu(oe, ht, Se, Le, !0);
          }
        }
        e: {
          if (te = U ? pi(U) : window, ye = te.nodeName && te.nodeName.toLowerCase(), ye === "select" || ye === "input" && te.type === "file") var xe = nh;
          else if (As(te)) if (Bs) xe = oh;
          else {
            xe = ih;
            var Ae = rh;
          }
          else (ye = te.nodeName) && ye.toLowerCase() === "input" && (te.type === "checkbox" || te.type === "radio") && (xe = ah);
          if (xe && (xe = xe(e, U))) {
            Is(oe, xe, n, re);
            break e;
          }
          Ae && Ae(e, te, U), e === "focusout" && (Ae = te._wrapperState) && Ae.controlled && te.type === "number" && he(te, "number", te.value);
        }
        switch (Ae = U ? pi(U) : window, e) {
          case "focusin":
            (As(Ae) || Ae.contentEditable === "true") && (ci = Ae, Yo = U, qi = null);
            break;
          case "focusout":
            qi = Yo = ci = null;
            break;
          case "mousedown":
            $o = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            $o = !1, Vs(oe, n, re);
            break;
          case "selectionchange":
            if (uh) break;
          case "keydown":
          case "keyup":
            Vs(oe, n, re);
        }
        var Ie;
        if (Uo) e: {
          switch (e) {
            case "compositionstart":
              var De = "onCompositionStart";
              break e;
            case "compositionend":
              De = "onCompositionEnd";
              break e;
            case "compositionupdate":
              De = "onCompositionUpdate";
              break e;
          }
          De = void 0;
        }
        else ui ? Ps(e, n) && (De = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (De = "onCompositionStart");
        De && (Ns && n.locale !== "ko" && (ui || De !== "onCompositionStart" ? De === "onCompositionEnd" && ui && (Ie = Es()) : (pr = re, Bo = "value" in pr ? pr.value : pr.textContent, ui = !0)), Ae = Ra(U, De), 0 < Ae.length && (De = new Ts(De, e, null, n, re), oe.push({ event: De, listeners: Ae }), Ie ? De.data = Ie : (Ie = Os(n), Ie !== null && (De.data = Ie)))), (Ie = Qd ? Xd(e, n) : Zd(e, n)) && (U = Ra(U, "onBeforeInput"), 0 < U.length && (re = new Ts("onBeforeInput", "beforeinput", null, n, re), oe.push({ event: re, listeners: U }), re.data = Ie));
      }
      Xs(oe, t);
    });
  }
  function Gi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ra(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, o = i.stateNode;
      i.tag === 5 && o !== null && (i = o, o = Ue(e, n), o != null && r.unshift(Gi(e, o, i)), o = Ue(e, t), o != null && r.push(Gi(e, o, i))), e = e.return;
    }
    return r;
  }
  function hi(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function eu(e, t, n, r, i) {
    for (var o = t._reactName, f = []; n !== null && n !== r; ) {
      var b = n, x = b.alternate, U = b.stateNode;
      if (x !== null && x === r) break;
      b.tag === 5 && U !== null && (b = U, i ? (x = Ue(n, o), x != null && f.unshift(Gi(n, x, b))) : i || (x = Ue(n, o), x != null && f.push(Gi(n, x, b)))), n = n.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var fh = /\r\n?/g, ph = /\u0000|\uFFFD/g;
  function tu(e) {
    return (typeof e == "string" ? e : "" + e).replace(fh, `
`).replace(ph, "");
  }
  function Pa(e, t, n) {
    if (t = tu(t), tu(e) !== t && n) throw Error(l(425));
  }
  function Oa() {
  }
  var Xo = null, Zo = null;
  function el(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var tl = typeof setTimeout == "function" ? setTimeout : void 0, mh = typeof clearTimeout == "function" ? clearTimeout : void 0, nu = typeof Promise == "function" ? Promise : void 0, gh = typeof queueMicrotask == "function" ? queueMicrotask : typeof nu < "u" ? function(e) {
    return nu.resolve(null).then(e).catch(yh);
  } : tl;
  function yh(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function nl(e, t) {
    var n = t, r = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), pt(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = i;
    } while (n);
    pt(t);
  }
  function gr(e) {
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
  function ru(e) {
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
  var fi = Math.random().toString(36).slice(2), An = "__reactFiber$" + fi, Qi = "__reactProps$" + fi, qn = "__reactContainer$" + fi, rl = "__reactEvents$" + fi, vh = "__reactListeners$" + fi, kh = "__reactHandles$" + fi;
  function Fr(e) {
    var t = e[An];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[qn] || n[An]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ru(e); e !== null; ) {
          if (n = e[An]) return n;
          e = ru(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Xi(e) {
    return e = e[An] || e[qn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function pi(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(l(33));
  }
  function Aa(e) {
    return e[Qi] || null;
  }
  var il = [], mi = -1;
  function yr(e) {
    return { current: e };
  }
  function at(e) {
    0 > mi || (e.current = il[mi], il[mi] = null, mi--);
  }
  function rt(e, t) {
    mi++, il[mi] = e.current, e.current = t;
  }
  var vr = {}, Pt = yr(vr), $t = yr(!1), Ur = vr;
  function gi(e, t) {
    var n = e.type.contextTypes;
    if (!n) return vr;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, o;
    for (o in n) i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function qt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Ia() {
    at($t), at(Pt);
  }
  function iu(e, t, n) {
    if (Pt.current !== vr) throw Error(l(168));
    rt(Pt, t), rt($t, n);
  }
  function au(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(l(108, je(e) || "Unknown", i));
    return Y({}, n, r);
  }
  function Ba(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vr, Ur = Pt.current, rt(Pt, e), rt($t, $t.current), !0;
  }
  function ou(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(l(169));
    n ? (e = au(e, t, Ur), r.__reactInternalMemoizedMergedChildContext = e, at($t), at(Pt), rt(Pt, e)) : at($t), rt($t, n);
  }
  var Wn = null, za = !1, al = !1;
  function lu(e) {
    Wn === null ? Wn = [e] : Wn.push(e);
  }
  function wh(e) {
    za = !0, lu(e);
  }
  function kr() {
    if (!al && Wn !== null) {
      al = !0;
      var e = 0, t = Je;
      try {
        var n = Wn;
        for (Je = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        Wn = null, za = !1;
      } catch (i) {
        throw Wn !== null && (Wn = Wn.slice(e + 1)), Oi(lr, kr), i;
      } finally {
        Je = t, al = !1;
      }
    }
    return null;
  }
  var yi = [], vi = 0, ja = null, _a = 0, dn = [], hn = 0, Kr = null, Jn = 1, Gn = "";
  function Vr(e, t) {
    yi[vi++] = _a, yi[vi++] = ja, ja = e, _a = t;
  }
  function su(e, t, n) {
    dn[hn++] = Jn, dn[hn++] = Gn, dn[hn++] = Kr, Kr = e;
    var r = Jn;
    e = Gn;
    var i = 32 - jt(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - jt(t) + i;
    if (30 < o) {
      var f = i - i % 5;
      o = (r & (1 << f) - 1).toString(32), r >>= f, i -= f, Jn = 1 << 32 - jt(t) + i | n << i | r, Gn = o + e;
    } else Jn = 1 << o | n << i | r, Gn = e;
  }
  function ol(e) {
    e.return !== null && (Vr(e, 1), su(e, 1, 0));
  }
  function ll(e) {
    for (; e === ja; ) ja = yi[--vi], yi[vi] = null, _a = yi[--vi], yi[vi] = null;
    for (; e === Kr; ) Kr = dn[--hn], dn[hn] = null, Gn = dn[--hn], dn[hn] = null, Jn = dn[--hn], dn[hn] = null;
  }
  var nn = null, rn = null, lt = !1, bn = null;
  function uu(e, t) {
    var n = gn(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function cu(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, nn = e, rn = gr(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, nn = e, rn = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Kr !== null ? { id: Jn, overflow: Gn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = gn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, nn = e, rn = null, !0) : !1;
      default:
        return !1;
    }
  }
  function sl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ul(e) {
    if (lt) {
      var t = rn;
      if (t) {
        var n = t;
        if (!cu(e, t)) {
          if (sl(e)) throw Error(l(418));
          t = gr(n.nextSibling);
          var r = nn;
          t && cu(e, t) ? uu(r, n) : (e.flags = e.flags & -4097 | 2, lt = !1, nn = e);
        }
      } else {
        if (sl(e)) throw Error(l(418));
        e.flags = e.flags & -4097 | 2, lt = !1, nn = e;
      }
    }
  }
  function du(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    nn = e;
  }
  function Da(e) {
    if (e !== nn) return !1;
    if (!lt) return du(e), lt = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !el(e.type, e.memoizedProps)), t && (t = rn)) {
      if (sl(e)) throw hu(), Error(l(418));
      for (; t; ) uu(e, t), t = gr(t.nextSibling);
    }
    if (du(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                rn = gr(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        rn = null;
      }
    } else rn = nn ? gr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function hu() {
    for (var e = rn; e; ) e = gr(e.nextSibling);
  }
  function ki() {
    rn = nn = null, lt = !1;
  }
  function cl(e) {
    bn === null ? bn = [e] : bn.push(e);
  }
  var Sh = I.ReactCurrentBatchConfig;
  function Zi(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(l(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(l(147, e));
        var i = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(f) {
          var b = i.refs;
          f === null ? delete b[o] : b[o] = f;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(l(284));
      if (!n._owner) throw Error(l(290, e));
    }
    return e;
  }
  function Fa(e, t) {
    throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function fu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function pu(e) {
    function t(z, R) {
      if (e) {
        var D = z.deletions;
        D === null ? (z.deletions = [R], z.flags |= 16) : D.push(R);
      }
    }
    function n(z, R) {
      if (!e) return null;
      for (; R !== null; ) t(z, R), R = R.sibling;
      return null;
    }
    function r(z, R) {
      for (z = /* @__PURE__ */ new Map(); R !== null; ) R.key !== null ? z.set(R.key, R) : z.set(R.index, R), R = R.sibling;
      return z;
    }
    function i(z, R) {
      return z = xr(z, R), z.index = 0, z.sibling = null, z;
    }
    function o(z, R, D) {
      return z.index = D, e ? (D = z.alternate, D !== null ? (D = D.index, D < R ? (z.flags |= 2, R) : D) : (z.flags |= 2, R)) : (z.flags |= 1048576, R);
    }
    function f(z) {
      return e && z.alternate === null && (z.flags |= 2), z;
    }
    function b(z, R, D, ue) {
      return R === null || R.tag !== 6 ? (R = ts(D, z.mode, ue), R.return = z, R) : (R = i(R, D), R.return = z, R);
    }
    function x(z, R, D, ue) {
      var xe = D.type;
      return xe === q ? re(z, R, D.props.children, ue, D.key) : R !== null && (R.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === G && fu(xe) === R.type) ? (ue = i(R, D.props), ue.ref = Zi(z, R, D), ue.return = z, ue) : (ue = co(D.type, D.key, D.props, null, z.mode, ue), ue.ref = Zi(z, R, D), ue.return = z, ue);
    }
    function U(z, R, D, ue) {
      return R === null || R.tag !== 4 || R.stateNode.containerInfo !== D.containerInfo || R.stateNode.implementation !== D.implementation ? (R = ns(D, z.mode, ue), R.return = z, R) : (R = i(R, D.children || []), R.return = z, R);
    }
    function re(z, R, D, ue, xe) {
      return R === null || R.tag !== 7 ? (R = Qr(D, z.mode, ue, xe), R.return = z, R) : (R = i(R, D), R.return = z, R);
    }
    function oe(z, R, D) {
      if (typeof R == "string" && R !== "" || typeof R == "number") return R = ts("" + R, z.mode, D), R.return = z, R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case _:
            return D = co(R.type, R.key, R.props, null, z.mode, D), D.ref = Zi(z, null, R), D.return = z, D;
          case X:
            return R = ns(R, z.mode, D), R.return = z, R;
          case G:
            var ue = R._init;
            return oe(z, ue(R._payload), D);
        }
        if (Me(R) || j(R)) return R = Qr(R, z.mode, D, null), R.return = z, R;
        Fa(z, R);
      }
      return null;
    }
    function te(z, R, D, ue) {
      var xe = R !== null ? R.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number") return xe !== null ? null : b(z, R, "" + D, ue);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case _:
            return D.key === xe ? x(z, R, D, ue) : null;
          case X:
            return D.key === xe ? U(z, R, D, ue) : null;
          case G:
            return xe = D._init, te(
              z,
              R,
              xe(D._payload),
              ue
            );
        }
        if (Me(D) || j(D)) return xe !== null ? null : re(z, R, D, ue, null);
        Fa(z, D);
      }
      return null;
    }
    function ye(z, R, D, ue, xe) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return z = z.get(D) || null, b(R, z, "" + ue, xe);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case _:
            return z = z.get(ue.key === null ? D : ue.key) || null, x(R, z, ue, xe);
          case X:
            return z = z.get(ue.key === null ? D : ue.key) || null, U(R, z, ue, xe);
          case G:
            var Ae = ue._init;
            return ye(z, R, D, Ae(ue._payload), xe);
        }
        if (Me(ue) || j(ue)) return z = z.get(D) || null, re(R, z, ue, xe, null);
        Fa(R, ue);
      }
      return null;
    }
    function Se(z, R, D, ue) {
      for (var xe = null, Ae = null, Ie = R, De = R = 0, Et = null; Ie !== null && De < D.length; De++) {
        Ie.index > De ? (Et = Ie, Ie = null) : Et = Ie.sibling;
        var Ze = te(z, Ie, D[De], ue);
        if (Ze === null) {
          Ie === null && (Ie = Et);
          break;
        }
        e && Ie && Ze.alternate === null && t(z, Ie), R = o(Ze, R, De), Ae === null ? xe = Ze : Ae.sibling = Ze, Ae = Ze, Ie = Et;
      }
      if (De === D.length) return n(z, Ie), lt && Vr(z, De), xe;
      if (Ie === null) {
        for (; De < D.length; De++) Ie = oe(z, D[De], ue), Ie !== null && (R = o(Ie, R, De), Ae === null ? xe = Ie : Ae.sibling = Ie, Ae = Ie);
        return lt && Vr(z, De), xe;
      }
      for (Ie = r(z, Ie); De < D.length; De++) Et = ye(Ie, z, De, D[De], ue), Et !== null && (e && Et.alternate !== null && Ie.delete(Et.key === null ? De : Et.key), R = o(Et, R, De), Ae === null ? xe = Et : Ae.sibling = Et, Ae = Et);
      return e && Ie.forEach(function(Nr) {
        return t(z, Nr);
      }), lt && Vr(z, De), xe;
    }
    function Le(z, R, D, ue) {
      var xe = j(D);
      if (typeof xe != "function") throw Error(l(150));
      if (D = xe.call(D), D == null) throw Error(l(151));
      for (var Ae = xe = null, Ie = R, De = R = 0, Et = null, Ze = D.next(); Ie !== null && !Ze.done; De++, Ze = D.next()) {
        Ie.index > De ? (Et = Ie, Ie = null) : Et = Ie.sibling;
        var Nr = te(z, Ie, Ze.value, ue);
        if (Nr === null) {
          Ie === null && (Ie = Et);
          break;
        }
        e && Ie && Nr.alternate === null && t(z, Ie), R = o(Nr, R, De), Ae === null ? xe = Nr : Ae.sibling = Nr, Ae = Nr, Ie = Et;
      }
      if (Ze.done) return n(
        z,
        Ie
      ), lt && Vr(z, De), xe;
      if (Ie === null) {
        for (; !Ze.done; De++, Ze = D.next()) Ze = oe(z, Ze.value, ue), Ze !== null && (R = o(Ze, R, De), Ae === null ? xe = Ze : Ae.sibling = Ze, Ae = Ze);
        return lt && Vr(z, De), xe;
      }
      for (Ie = r(z, Ie); !Ze.done; De++, Ze = D.next()) Ze = ye(Ie, z, De, Ze.value, ue), Ze !== null && (e && Ze.alternate !== null && Ie.delete(Ze.key === null ? De : Ze.key), R = o(Ze, R, De), Ae === null ? xe = Ze : Ae.sibling = Ze, Ae = Ze);
      return e && Ie.forEach(function(ef) {
        return t(z, ef);
      }), lt && Vr(z, De), xe;
    }
    function ht(z, R, D, ue) {
      if (typeof D == "object" && D !== null && D.type === q && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case _:
            e: {
              for (var xe = D.key, Ae = R; Ae !== null; ) {
                if (Ae.key === xe) {
                  if (xe = D.type, xe === q) {
                    if (Ae.tag === 7) {
                      n(z, Ae.sibling), R = i(Ae, D.props.children), R.return = z, z = R;
                      break e;
                    }
                  } else if (Ae.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === G && fu(xe) === Ae.type) {
                    n(z, Ae.sibling), R = i(Ae, D.props), R.ref = Zi(z, Ae, D), R.return = z, z = R;
                    break e;
                  }
                  n(z, Ae);
                  break;
                } else t(z, Ae);
                Ae = Ae.sibling;
              }
              D.type === q ? (R = Qr(D.props.children, z.mode, ue, D.key), R.return = z, z = R) : (ue = co(D.type, D.key, D.props, null, z.mode, ue), ue.ref = Zi(z, R, D), ue.return = z, z = ue);
            }
            return f(z);
          case X:
            e: {
              for (Ae = D.key; R !== null; ) {
                if (R.key === Ae) if (R.tag === 4 && R.stateNode.containerInfo === D.containerInfo && R.stateNode.implementation === D.implementation) {
                  n(z, R.sibling), R = i(R, D.children || []), R.return = z, z = R;
                  break e;
                } else {
                  n(z, R);
                  break;
                }
                else t(z, R);
                R = R.sibling;
              }
              R = ns(D, z.mode, ue), R.return = z, z = R;
            }
            return f(z);
          case G:
            return Ae = D._init, ht(z, R, Ae(D._payload), ue);
        }
        if (Me(D)) return Se(z, R, D, ue);
        if (j(D)) return Le(z, R, D, ue);
        Fa(z, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" ? (D = "" + D, R !== null && R.tag === 6 ? (n(z, R.sibling), R = i(R, D), R.return = z, z = R) : (n(z, R), R = ts(D, z.mode, ue), R.return = z, z = R), f(z)) : n(z, R);
    }
    return ht;
  }
  var wi = pu(!0), mu = pu(!1), Ua = yr(null), Ka = null, Si = null, dl = null;
  function hl() {
    dl = Si = Ka = null;
  }
  function fl(e) {
    var t = Ua.current;
    at(Ua), e._currentValue = t;
  }
  function pl(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function bi(e, t) {
    Ka = e, dl = Si = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Wt = !0), e.firstContext = null);
  }
  function fn(e) {
    var t = e._currentValue;
    if (dl !== e) if (e = { context: e, memoizedValue: t, next: null }, Si === null) {
      if (Ka === null) throw Error(l(308));
      Si = e, Ka.dependencies = { lanes: 0, firstContext: e };
    } else Si = Si.next = e;
    return t;
  }
  var Hr = null;
  function ml(e) {
    Hr === null ? Hr = [e] : Hr.push(e);
  }
  function gu(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, ml(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Qn(e, r);
  }
  function Qn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var wr = !1;
  function gl(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function yu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Xn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Sr(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Ge & 2) !== 0) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Qn(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, ml(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Qn(e, n);
  }
  function Va(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, ji(e, n);
    }
  }
  function vu(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var i = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? i = o = f : o = o.next = f, n = n.next;
        } while (n !== null);
        o === null ? i = o = t : o = o.next = t;
      } else i = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Ha(e, t, n, r) {
    var i = e.updateQueue;
    wr = !1;
    var o = i.firstBaseUpdate, f = i.lastBaseUpdate, b = i.shared.pending;
    if (b !== null) {
      i.shared.pending = null;
      var x = b, U = x.next;
      x.next = null, f === null ? o = U : f.next = U, f = x;
      var re = e.alternate;
      re !== null && (re = re.updateQueue, b = re.lastBaseUpdate, b !== f && (b === null ? re.firstBaseUpdate = U : b.next = U, re.lastBaseUpdate = x));
    }
    if (o !== null) {
      var oe = i.baseState;
      f = 0, re = U = x = null, b = o;
      do {
        var te = b.lane, ye = b.eventTime;
        if ((r & te) === te) {
          re !== null && (re = re.next = {
            eventTime: ye,
            lane: 0,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null
          });
          e: {
            var Se = e, Le = b;
            switch (te = t, ye = n, Le.tag) {
              case 1:
                if (Se = Le.payload, typeof Se == "function") {
                  oe = Se.call(ye, oe, te);
                  break e;
                }
                oe = Se;
                break e;
              case 3:
                Se.flags = Se.flags & -65537 | 128;
              case 0:
                if (Se = Le.payload, te = typeof Se == "function" ? Se.call(ye, oe, te) : Se, te == null) break e;
                oe = Y({}, oe, te);
                break e;
              case 2:
                wr = !0;
            }
          }
          b.callback !== null && b.lane !== 0 && (e.flags |= 64, te = i.effects, te === null ? i.effects = [b] : te.push(b));
        } else ye = { eventTime: ye, lane: te, tag: b.tag, payload: b.payload, callback: b.callback, next: null }, re === null ? (U = re = ye, x = oe) : re = re.next = ye, f |= te;
        if (b = b.next, b === null) {
          if (b = i.shared.pending, b === null) break;
          te = b, b = te.next, te.next = null, i.lastBaseUpdate = te, i.shared.pending = null;
        }
      } while (!0);
      if (re === null && (x = oe), i.baseState = x, i.firstBaseUpdate = U, i.lastBaseUpdate = re, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          f |= i.lane, i = i.next;
        while (i !== t);
      } else o === null && (i.shared.lanes = 0);
      qr |= f, e.lanes = f, e.memoizedState = oe;
    }
  }
  function ku(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function") throw Error(l(191, i));
        i.call(r);
      }
    }
  }
  var ea = {}, In = yr(ea), ta = yr(ea), na = yr(ea);
  function Yr(e) {
    if (e === ea) throw Error(l(174));
    return e;
  }
  function yl(e, t) {
    switch (rt(na, t), rt(ta, e), rt(In, ea), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Bt(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Bt(t, e);
    }
    at(In), rt(In, t);
  }
  function Ei() {
    at(In), at(ta), at(na);
  }
  function wu(e) {
    Yr(na.current);
    var t = Yr(In.current), n = Bt(t, e.type);
    t !== n && (rt(ta, e), rt(In, n));
  }
  function vl(e) {
    ta.current === e && (at(In), at(ta));
  }
  var ut = yr(0);
  function Ya(e) {
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
  var kl = [];
  function wl() {
    for (var e = 0; e < kl.length; e++) kl[e]._workInProgressVersionPrimary = null;
    kl.length = 0;
  }
  var $a = I.ReactCurrentDispatcher, Sl = I.ReactCurrentBatchConfig, $r = 0, ct = null, yt = null, St = null, qa = !1, ra = !1, ia = 0, bh = 0;
  function Ot() {
    throw Error(l(321));
  }
  function bl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Sn(e[n], t[n])) return !1;
    return !0;
  }
  function El(e, t, n, r, i, o) {
    if ($r = o, ct = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $a.current = e === null || e.memoizedState === null ? Th : xh, e = n(r, i), ra) {
      o = 0;
      do {
        if (ra = !1, ia = 0, 25 <= o) throw Error(l(301));
        o += 1, St = yt = null, t.updateQueue = null, $a.current = Nh, e = n(r, i);
      } while (ra);
    }
    if ($a.current = Ga, t = yt !== null && yt.next !== null, $r = 0, St = yt = ct = null, qa = !1, t) throw Error(l(300));
    return e;
  }
  function Cl() {
    var e = ia !== 0;
    return ia = 0, e;
  }
  function Bn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return St === null ? ct.memoizedState = St = e : St = St.next = e, St;
  }
  function pn() {
    if (yt === null) {
      var e = ct.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = yt.next;
    var t = St === null ? ct.memoizedState : St.next;
    if (t !== null) St = t, yt = e;
    else {
      if (e === null) throw Error(l(310));
      yt = e, e = { memoizedState: yt.memoizedState, baseState: yt.baseState, baseQueue: yt.baseQueue, queue: yt.queue, next: null }, St === null ? ct.memoizedState = St = e : St = St.next = e;
    }
    return St;
  }
  function aa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ll(e) {
    var t = pn(), n = t.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = e;
    var r = yt, i = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var f = i.next;
        i.next = o.next, o.next = f;
      }
      r.baseQueue = i = o, n.pending = null;
    }
    if (i !== null) {
      o = i.next, r = r.baseState;
      var b = f = null, x = null, U = o;
      do {
        var re = U.lane;
        if (($r & re) === re) x !== null && (x = x.next = { lane: 0, action: U.action, hasEagerState: U.hasEagerState, eagerState: U.eagerState, next: null }), r = U.hasEagerState ? U.eagerState : e(r, U.action);
        else {
          var oe = {
            lane: re,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          x === null ? (b = x = oe, f = r) : x = x.next = oe, ct.lanes |= re, qr |= re;
        }
        U = U.next;
      } while (U !== null && U !== o);
      x === null ? f = r : x.next = b, Sn(r, t.memoizedState) || (Wt = !0), t.memoizedState = r, t.baseState = f, t.baseQueue = x, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        o = i.lane, ct.lanes |= o, qr |= o, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Tl(e) {
    var t = pn(), n = t.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, o = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var f = i = i.next;
      do
        o = e(o, f.action), f = f.next;
      while (f !== i);
      Sn(o, t.memoizedState) || (Wt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Su() {
  }
  function bu(e, t) {
    var n = ct, r = pn(), i = t(), o = !Sn(r.memoizedState, i);
    if (o && (r.memoizedState = i, Wt = !0), r = r.queue, xl(Lu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || St !== null && St.memoizedState.tag & 1) {
      if (n.flags |= 2048, oa(9, Cu.bind(null, n, r, i, t), void 0, null), bt === null) throw Error(l(349));
      ($r & 30) !== 0 || Eu(n, t, i);
    }
    return i;
  }
  function Eu(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ct.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ct.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Cu(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Tu(t) && xu(e);
  }
  function Lu(e, t, n) {
    return n(function() {
      Tu(t) && xu(e);
    });
  }
  function Tu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Sn(e, n);
    } catch {
      return !0;
    }
  }
  function xu(e) {
    var t = Qn(e, 1);
    t !== null && Tn(t, e, 1, -1);
  }
  function Nu(e) {
    var t = Bn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: aa, lastRenderedState: e }, t.queue = e, e = e.dispatch = Lh.bind(null, ct, e), [t.memoizedState, e];
  }
  function oa(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ct.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ct.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Mu() {
    return pn().memoizedState;
  }
  function Wa(e, t, n, r) {
    var i = Bn();
    ct.flags |= e, i.memoizedState = oa(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Ja(e, t, n, r) {
    var i = pn();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (yt !== null) {
      var f = yt.memoizedState;
      if (o = f.destroy, r !== null && bl(r, f.deps)) {
        i.memoizedState = oa(t, n, o, r);
        return;
      }
    }
    ct.flags |= e, i.memoizedState = oa(1 | t, n, o, r);
  }
  function Ru(e, t) {
    return Wa(8390656, 8, e, t);
  }
  function xl(e, t) {
    return Ja(2048, 8, e, t);
  }
  function Pu(e, t) {
    return Ja(4, 2, e, t);
  }
  function Ou(e, t) {
    return Ja(4, 4, e, t);
  }
  function Au(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Iu(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ja(4, 4, Au.bind(null, t, e), n);
  }
  function Nl() {
  }
  function Bu(e, t) {
    var n = pn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && bl(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function zu(e, t) {
    var n = pn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && bl(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function ju(e, t, n) {
    return ($r & 21) === 0 ? (e.baseState && (e.baseState = !1, Wt = !0), e.memoizedState = n) : (Sn(n, t) || (n = dr(), ct.lanes |= n, qr |= n, e.baseState = !0), t);
  }
  function Eh(e, t) {
    var n = Je;
    Je = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Sl.transition;
    Sl.transition = {};
    try {
      e(!1), t();
    } finally {
      Je = n, Sl.transition = r;
    }
  }
  function _u() {
    return pn().memoizedState;
  }
  function Ch(e, t, n) {
    var r = Lr(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Du(e)) Fu(t, n);
    else if (n = gu(e, t, n, r), n !== null) {
      var i = Ft();
      Tn(n, e, r, i), Uu(n, t, r);
    }
  }
  function Lh(e, t, n) {
    var r = Lr(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Du(e)) Fu(t, i);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var f = t.lastRenderedState, b = o(f, n);
        if (i.hasEagerState = !0, i.eagerState = b, Sn(b, f)) {
          var x = t.interleaved;
          x === null ? (i.next = i, ml(t)) : (i.next = x.next, x.next = i), t.interleaved = i;
          return;
        }
      } catch {
      }
      n = gu(e, t, i, r), n !== null && (i = Ft(), Tn(n, e, r, i), Uu(n, t, r));
    }
  }
  function Du(e) {
    var t = e.alternate;
    return e === ct || t !== null && t === ct;
  }
  function Fu(e, t) {
    ra = qa = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Uu(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, ji(e, n);
    }
  }
  var Ga = { readContext: fn, useCallback: Ot, useContext: Ot, useEffect: Ot, useImperativeHandle: Ot, useInsertionEffect: Ot, useLayoutEffect: Ot, useMemo: Ot, useReducer: Ot, useRef: Ot, useState: Ot, useDebugValue: Ot, useDeferredValue: Ot, useTransition: Ot, useMutableSource: Ot, useSyncExternalStore: Ot, useId: Ot, unstable_isNewReconciler: !1 }, Th = { readContext: fn, useCallback: function(e, t) {
    return Bn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: fn, useEffect: Ru, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Wa(
      4194308,
      4,
      Au.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return Wa(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Wa(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Bn();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Bn();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Ch.bind(null, ct, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Bn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Nu, useDebugValue: Nl, useDeferredValue: function(e) {
    return Bn().memoizedState = e;
  }, useTransition: function() {
    var e = Nu(!1), t = e[0];
    return e = Eh.bind(null, e[1]), Bn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ct, i = Bn();
    if (lt) {
      if (n === void 0) throw Error(l(407));
      n = n();
    } else {
      if (n = t(), bt === null) throw Error(l(349));
      ($r & 30) !== 0 || Eu(r, t, n);
    }
    i.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return i.queue = o, Ru(Lu.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, oa(9, Cu.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Bn(), t = bt.identifierPrefix;
    if (lt) {
      var n = Gn, r = Jn;
      n = (r & ~(1 << 32 - jt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ia++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = bh++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, xh = {
    readContext: fn,
    useCallback: Bu,
    useContext: fn,
    useEffect: xl,
    useImperativeHandle: Iu,
    useInsertionEffect: Pu,
    useLayoutEffect: Ou,
    useMemo: zu,
    useReducer: Ll,
    useRef: Mu,
    useState: function() {
      return Ll(aa);
    },
    useDebugValue: Nl,
    useDeferredValue: function(e) {
      var t = pn();
      return ju(t, yt.memoizedState, e);
    },
    useTransition: function() {
      var e = Ll(aa)[0], t = pn().memoizedState;
      return [e, t];
    },
    useMutableSource: Su,
    useSyncExternalStore: bu,
    useId: _u,
    unstable_isNewReconciler: !1
  }, Nh = { readContext: fn, useCallback: Bu, useContext: fn, useEffect: xl, useImperativeHandle: Iu, useInsertionEffect: Pu, useLayoutEffect: Ou, useMemo: zu, useReducer: Tl, useRef: Mu, useState: function() {
    return Tl(aa);
  }, useDebugValue: Nl, useDeferredValue: function(e) {
    var t = pn();
    return yt === null ? t.memoizedState = e : ju(t, yt.memoizedState, e);
  }, useTransition: function() {
    var e = Tl(aa)[0], t = pn().memoizedState;
    return [e, t];
  }, useMutableSource: Su, useSyncExternalStore: bu, useId: _u, unstable_isNewReconciler: !1 };
  function En(e, t) {
    if (e && e.defaultProps) {
      t = Y({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Ml(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : Y({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Qa = { isMounted: function(e) {
    return (e = e._reactInternals) ? Rn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ft(), i = Lr(e), o = Xn(r, i);
    o.payload = t, n != null && (o.callback = n), t = Sr(e, o, i), t !== null && (Tn(t, e, i, r), Va(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ft(), i = Lr(e), o = Xn(r, i);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Sr(e, o, i), t !== null && (Tn(t, e, i, r), Va(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Ft(), r = Lr(e), i = Xn(n, r);
    i.tag = 2, t != null && (i.callback = t), t = Sr(e, i, r), t !== null && (Tn(t, e, r, n), Va(t, e, r));
  } };
  function Ku(e, t, n, r, i, o, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, f) : t.prototype && t.prototype.isPureReactComponent ? !$i(n, r) || !$i(i, o) : !0;
  }
  function Vu(e, t, n) {
    var r = !1, i = vr, o = t.contextType;
    return typeof o == "object" && o !== null ? o = fn(o) : (i = qt(t) ? Ur : Pt.current, r = t.contextTypes, o = (r = r != null) ? gi(e, i) : vr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Qa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function Hu(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Qa.enqueueReplaceState(t, t.state, null);
  }
  function Rl(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, gl(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = fn(o) : (o = qt(t) ? Ur : Pt.current, i.context = gi(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Ml(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Qa.enqueueReplaceState(i, i.state, null), Ha(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Ci(e, t) {
    try {
      var n = "", r = t;
      do
        n += Pe(r), r = r.return;
      while (r);
      var i = n;
    } catch (o) {
      i = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function Pl(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Ol(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var Mh = typeof WeakMap == "function" ? WeakMap : Map;
  function Yu(e, t, n) {
    n = Xn(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      io || (io = !0, ql = r), Ol(e, t);
    }, n;
  }
  function $u(e, t, n) {
    n = Xn(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        Ol(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      Ol(e, t), typeof r != "function" && (Er === null ? Er = /* @__PURE__ */ new Set([this]) : Er.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), n;
  }
  function qu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Mh();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = Vh.bind(null, e, t, n), t.then(e, e));
  }
  function Wu(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ju(e, t, n, r, i) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Xn(-1, 1), t.tag = 2, Sr(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = i, e);
  }
  var Rh = I.ReactCurrentOwner, Wt = !1;
  function Dt(e, t, n, r) {
    t.child = e === null ? mu(t, null, n, r) : wi(t, e.child, n, r);
  }
  function Gu(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return bi(t, i), r = El(e, t, n, r, o, i), n = Cl(), e !== null && !Wt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Zn(e, t, i)) : (lt && n && ol(t), t.flags |= 1, Dt(e, t, r, i), t.child);
  }
  function Qu(e, t, n, r, i) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !es(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Xu(e, t, o, r, i)) : (e = co(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & i) === 0) {
      var f = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : $i, n(f, r) && e.ref === t.ref) return Zn(e, t, i);
    }
    return t.flags |= 1, e = xr(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Xu(e, t, n, r, i) {
    if (e !== null) {
      var o = e.memoizedProps;
      if ($i(o, r) && e.ref === t.ref) if (Wt = !1, t.pendingProps = r = o, (e.lanes & i) !== 0) (e.flags & 131072) !== 0 && (Wt = !0);
      else return t.lanes = e.lanes, Zn(e, t, i);
    }
    return Al(e, t, n, r, i);
  }
  function Zu(e, t, n) {
    var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, rt(Ti, an), an |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, rt(Ti, an), an |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, rt(Ti, an), an |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, rt(Ti, an), an |= r;
    return Dt(e, t, i, n), t.child;
  }
  function ec(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Al(e, t, n, r, i) {
    var o = qt(n) ? Ur : Pt.current;
    return o = gi(t, o), bi(t, i), n = El(e, t, n, r, o, i), r = Cl(), e !== null && !Wt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Zn(e, t, i)) : (lt && r && ol(t), t.flags |= 1, Dt(e, t, n, i), t.child);
  }
  function tc(e, t, n, r, i) {
    if (qt(n)) {
      var o = !0;
      Ba(t);
    } else o = !1;
    if (bi(t, i), t.stateNode === null) Za(e, t), Vu(t, n, r), Rl(t, n, r, i), r = !0;
    else if (e === null) {
      var f = t.stateNode, b = t.memoizedProps;
      f.props = b;
      var x = f.context, U = n.contextType;
      typeof U == "object" && U !== null ? U = fn(U) : (U = qt(n) ? Ur : Pt.current, U = gi(t, U));
      var re = n.getDerivedStateFromProps, oe = typeof re == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      oe || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (b !== r || x !== U) && Hu(t, f, r, U), wr = !1;
      var te = t.memoizedState;
      f.state = te, Ha(t, r, f, i), x = t.memoizedState, b !== r || te !== x || $t.current || wr ? (typeof re == "function" && (Ml(t, n, re, r), x = t.memoizedState), (b = wr || Ku(t, n, b, r, te, x, U)) ? (oe || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = x), f.props = r, f.state = x, f.context = U, r = b) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      f = t.stateNode, yu(e, t), b = t.memoizedProps, U = t.type === t.elementType ? b : En(t.type, b), f.props = U, oe = t.pendingProps, te = f.context, x = n.contextType, typeof x == "object" && x !== null ? x = fn(x) : (x = qt(n) ? Ur : Pt.current, x = gi(t, x));
      var ye = n.getDerivedStateFromProps;
      (re = typeof ye == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (b !== oe || te !== x) && Hu(t, f, r, x), wr = !1, te = t.memoizedState, f.state = te, Ha(t, r, f, i);
      var Se = t.memoizedState;
      b !== oe || te !== Se || $t.current || wr ? (typeof ye == "function" && (Ml(t, n, ye, r), Se = t.memoizedState), (U = wr || Ku(t, n, U, r, te, Se, x) || !1) ? (re || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(r, Se, x), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(r, Se, x)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || b === e.memoizedProps && te === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && te === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = Se), f.props = r, f.state = Se, f.context = x, r = U) : (typeof f.componentDidUpdate != "function" || b === e.memoizedProps && te === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && te === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Il(e, t, n, r, o, i);
  }
  function Il(e, t, n, r, i, o) {
    ec(e, t);
    var f = (t.flags & 128) !== 0;
    if (!r && !f) return i && ou(t, n, !1), Zn(e, t, o);
    r = t.stateNode, Rh.current = t;
    var b = f && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && f ? (t.child = wi(t, e.child, null, o), t.child = wi(t, null, b, o)) : Dt(e, t, b, o), t.memoizedState = r.state, i && ou(t, n, !0), t.child;
  }
  function nc(e) {
    var t = e.stateNode;
    t.pendingContext ? iu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && iu(e, t.context, !1), yl(e, t.containerInfo);
  }
  function rc(e, t, n, r, i) {
    return ki(), cl(i), t.flags |= 256, Dt(e, t, n, r), t.child;
  }
  var Bl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function zl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ic(e, t, n) {
    var r = t.pendingProps, i = ut.current, o = !1, f = (t.flags & 128) !== 0, b;
    if ((b = f) || (b = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), b ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), rt(ut, i & 1), e === null)
      return ul(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, f = { mode: "hidden", children: f }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = f) : o = ho(f, r, 0, null), e = Qr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = zl(n), t.memoizedState = Bl, e) : jl(t, f));
    if (i = e.memoizedState, i !== null && (b = i.dehydrated, b !== null)) return Ph(e, t, f, r, b, i, n);
    if (o) {
      o = r.fallback, f = t.mode, i = e.child, b = i.sibling;
      var x = { mode: "hidden", children: r.children };
      return (f & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = x, t.deletions = null) : (r = xr(i, x), r.subtreeFlags = i.subtreeFlags & 14680064), b !== null ? o = xr(b, o) : (o = Qr(o, f, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, f = e.child.memoizedState, f = f === null ? zl(n) : { baseLanes: f.baseLanes | n, cachePool: null, transitions: f.transitions }, o.memoizedState = f, o.childLanes = e.childLanes & ~n, t.memoizedState = Bl, r;
    }
    return o = e.child, e = o.sibling, r = xr(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function jl(e, t) {
    return t = ho({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Xa(e, t, n, r) {
    return r !== null && cl(r), wi(t, e.child, null, n), e = jl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ph(e, t, n, r, i, o, f) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Pl(Error(l(422))), Xa(e, t, f, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = ho({ mode: "visible", children: r.children }, i, 0, null), o = Qr(o, i, f, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && wi(t, e.child, null, f), t.child.memoizedState = zl(f), t.memoizedState = Bl, o);
    if ((t.mode & 1) === 0) return Xa(e, t, f, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var b = r.dgst;
      return r = b, o = Error(l(419)), r = Pl(o, r, void 0), Xa(e, t, f, r);
    }
    if (b = (f & e.childLanes) !== 0, Wt || b) {
      if (r = bt, r !== null) {
        switch (f & -f) {
          case 4:
            i = 2;
            break;
          case 16:
            i = 8;
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
            i = 32;
            break;
          case 536870912:
            i = 268435456;
            break;
          default:
            i = 0;
        }
        i = (i & (r.suspendedLanes | f)) !== 0 ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Qn(e, i), Tn(r, e, i, -1));
      }
      return Zl(), r = Pl(Error(l(421))), Xa(e, t, f, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Hh.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, rn = gr(i.nextSibling), nn = t, lt = !0, bn = null, e !== null && (dn[hn++] = Jn, dn[hn++] = Gn, dn[hn++] = Kr, Jn = e.id, Gn = e.overflow, Kr = t), t = jl(t, r.children), t.flags |= 4096, t);
  }
  function ac(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), pl(e.return, t, n);
  }
  function _l(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
  }
  function oc(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, o = r.tail;
    if (Dt(e, t, r.children, n), r = ut.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ac(e, n, t);
        else if (e.tag === 19) ac(e, n, t);
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
    if (rt(ut, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && Ya(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), _l(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Ya(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        _l(t, !0, n, null, o);
        break;
      case "together":
        _l(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Za(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Zn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), qr |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, n = xr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xr(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Oh(e, t, n) {
    switch (t.tag) {
      case 3:
        nc(t), ki();
        break;
      case 5:
        wu(t);
        break;
      case 1:
        qt(t.type) && Ba(t);
        break;
      case 4:
        yl(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        rt(Ua, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (rt(ut, ut.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? ic(e, t, n) : (rt(ut, ut.current & 1), e = Zn(e, t, n), e !== null ? e.sibling : null);
        rt(ut, ut.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return oc(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), rt(ut, ut.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Zu(e, t, n);
    }
    return Zn(e, t, n);
  }
  var lc, Dl, sc, uc;
  lc = function(e, t) {
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
  }, Dl = function() {
  }, sc = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, Yr(In.current);
      var o = null;
      switch (n) {
        case "input":
          i = ce(e, i), r = ce(e, r), o = [];
          break;
        case "select":
          i = Y({}, i, { value: void 0 }), r = Y({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          i = Ke(e, i), r = Ke(e, r), o = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Oa);
      }
      Nn(n, r);
      var f;
      n = null;
      for (U in i) if (!r.hasOwnProperty(U) && i.hasOwnProperty(U) && i[U] != null) if (U === "style") {
        var b = i[U];
        for (f in b) b.hasOwnProperty(f) && (n || (n = {}), n[f] = "");
      } else U !== "dangerouslySetInnerHTML" && U !== "children" && U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && U !== "autoFocus" && (p.hasOwnProperty(U) ? o || (o = []) : (o = o || []).push(U, null));
      for (U in r) {
        var x = r[U];
        if (b = i?.[U], r.hasOwnProperty(U) && x !== b && (x != null || b != null)) if (U === "style") if (b) {
          for (f in b) !b.hasOwnProperty(f) || x && x.hasOwnProperty(f) || (n || (n = {}), n[f] = "");
          for (f in x) x.hasOwnProperty(f) && b[f] !== x[f] && (n || (n = {}), n[f] = x[f]);
        } else n || (o || (o = []), o.push(
          U,
          n
        )), n = x;
        else U === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, b = b ? b.__html : void 0, x != null && b !== x && (o = o || []).push(U, x)) : U === "children" ? typeof x != "string" && typeof x != "number" || (o = o || []).push(U, "" + x) : U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && (p.hasOwnProperty(U) ? (x != null && U === "onScroll" && it("scroll", e), o || b === x || (o = [])) : (o = o || []).push(U, x));
      }
      n && (o = o || []).push("style", n);
      var U = o;
      (t.updateQueue = U) && (t.flags |= 4);
    }
  }, uc = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function la(e, t) {
    if (!lt) switch (e.tailMode) {
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
  function At(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function Ah(e, t, n) {
    var r = t.pendingProps;
    switch (ll(t), t.tag) {
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
        return At(t), null;
      case 1:
        return qt(t.type) && Ia(), At(t), null;
      case 3:
        return r = t.stateNode, Ei(), at($t), at(Pt), wl(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Da(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, bn !== null && (Gl(bn), bn = null))), Dl(e, t), At(t), null;
      case 5:
        vl(t);
        var i = Yr(na.current);
        if (n = t.type, e !== null && t.stateNode != null) sc(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(l(166));
            return At(t), null;
          }
          if (e = Yr(In.current), Da(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[An] = t, r[Qi] = o, e = (t.mode & 1) !== 0, n) {
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
                for (i = 0; i < Wi.length; i++) it(Wi[i], r);
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
                pe(r, o), it("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, it("invalid", r);
                break;
              case "textarea":
                $e(r, o), it("invalid", r);
            }
            Nn(n, o), i = null;
            for (var f in o) if (o.hasOwnProperty(f)) {
              var b = o[f];
              f === "children" ? typeof b == "string" ? r.textContent !== b && (o.suppressHydrationWarning !== !0 && Pa(r.textContent, b, e), i = ["children", b]) : typeof b == "number" && r.textContent !== "" + b && (o.suppressHydrationWarning !== !0 && Pa(
                r.textContent,
                b,
                e
              ), i = ["children", "" + b]) : p.hasOwnProperty(f) && b != null && f === "onScroll" && it("scroll", r);
            }
            switch (n) {
              case "input":
                Fe(r), Ce(r, o, !0);
                break;
              case "textarea":
                Fe(r), on(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Oa);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            f = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Xt(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = f.createElement(n, { is: r.is }) : (e = f.createElement(n), n === "select" && (f = e, r.multiple ? f.multiple = !0 : r.size && (f.size = r.size))) : e = f.createElementNS(e, n), e[An] = t, e[Qi] = r, lc(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = ir(n, r), n) {
                case "dialog":
                  it("cancel", e), it("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  it("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Wi.length; i++) it(Wi[i], e);
                  i = r;
                  break;
                case "source":
                  it("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  it(
                    "error",
                    e
                  ), it("load", e), i = r;
                  break;
                case "details":
                  it("toggle", e), i = r;
                  break;
                case "input":
                  pe(e, r), i = ce(e, r), it("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = Y({}, r, { value: void 0 }), it("invalid", e);
                  break;
                case "textarea":
                  $e(e, r), i = Ke(e, r), it("invalid", e);
                  break;
                default:
                  i = r;
              }
              Nn(n, i), b = i;
              for (o in b) if (b.hasOwnProperty(o)) {
                var x = b[o];
                o === "style" ? Kt(e, x) : o === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, x != null && rr(e, x)) : o === "children" ? typeof x == "string" ? (n !== "textarea" || x !== "") && Zt(e, x) : typeof x == "number" && Zt(e, "" + x) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (p.hasOwnProperty(o) ? x != null && o === "onScroll" && it("scroll", e) : x != null && Q(e, o, x, f));
              }
              switch (n) {
                case "input":
                  Fe(e), Ce(e, r, !1);
                  break;
                case "textarea":
                  Fe(e), on(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + me(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? ge(e, !!r.multiple, o, !1) : r.defaultValue != null && ge(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = Oa);
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
        return At(t), null;
      case 6:
        if (e && t.stateNode != null) uc(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(l(166));
          if (n = Yr(na.current), Yr(In.current), Da(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[An] = t, (o = r.nodeValue !== n) && (e = nn, e !== null)) switch (e.tag) {
              case 3:
                Pa(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Pa(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[An] = t, t.stateNode = r;
        }
        return At(t), null;
      case 13:
        if (at(ut), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (lt && rn !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) hu(), ki(), t.flags |= 98560, o = !1;
          else if (o = Da(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(l(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(l(317));
              o[An] = t;
            } else ki(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            At(t), o = !1;
          } else bn !== null && (Gl(bn), bn = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ut.current & 1) !== 0 ? vt === 0 && (vt = 3) : Zl())), t.updateQueue !== null && (t.flags |= 4), At(t), null);
      case 4:
        return Ei(), Dl(e, t), e === null && Ji(t.stateNode.containerInfo), At(t), null;
      case 10:
        return fl(t.type._context), At(t), null;
      case 17:
        return qt(t.type) && Ia(), At(t), null;
      case 19:
        if (at(ut), o = t.memoizedState, o === null) return At(t), null;
        if (r = (t.flags & 128) !== 0, f = o.rendering, f === null) if (r) la(o, !1);
        else {
          if (vt !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = Ya(e), f !== null) {
              for (t.flags |= 128, la(o, !1), r = f.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, f = o.alternate, f === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = f.childLanes, o.lanes = f.lanes, o.child = f.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = f.memoizedProps, o.memoizedState = f.memoizedState, o.updateQueue = f.updateQueue, o.type = f.type, e = f.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return rt(ut, ut.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && ot() > xi && (t.flags |= 128, r = !0, la(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Ya(f), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), la(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !lt) return At(t), null;
          } else 2 * ot() - o.renderingStartTime > xi && n !== 1073741824 && (t.flags |= 128, r = !0, la(o, !1), t.lanes = 4194304);
          o.isBackwards ? (f.sibling = t.child, t.child = f) : (n = o.last, n !== null ? n.sibling = f : t.child = f, o.last = f);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ot(), t.sibling = null, n = ut.current, rt(ut, r ? n & 1 | 2 : n & 1), t) : (At(t), null);
      case 22:
      case 23:
        return Xl(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (an & 1073741824) !== 0 && (At(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : At(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function Ih(e, t) {
    switch (ll(t), t.tag) {
      case 1:
        return qt(t.type) && Ia(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ei(), at($t), at(Pt), wl(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return vl(t), null;
      case 13:
        if (at(ut), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(l(340));
          ki();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return at(ut), null;
      case 4:
        return Ei(), null;
      case 10:
        return fl(t.type._context), null;
      case 22:
      case 23:
        return Xl(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var eo = !1, It = !1, Bh = typeof WeakSet == "function" ? WeakSet : Set, ke = null;
  function Li(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      dt(e, t, r);
    }
    else n.current = null;
  }
  function Fl(e, t, n) {
    try {
      n();
    } catch (r) {
      dt(e, t, r);
    }
  }
  var cc = !1;
  function zh(e, t) {
    if (Xo = Yt, e = Ks(), Ho(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var f = 0, b = -1, x = -1, U = 0, re = 0, oe = e, te = null;
          t: for (; ; ) {
            for (var ye; oe !== n || i !== 0 && oe.nodeType !== 3 || (b = f + i), oe !== o || r !== 0 && oe.nodeType !== 3 || (x = f + r), oe.nodeType === 3 && (f += oe.nodeValue.length), (ye = oe.firstChild) !== null; )
              te = oe, oe = ye;
            for (; ; ) {
              if (oe === e) break t;
              if (te === n && ++U === i && (b = f), te === o && ++re === r && (x = f), (ye = oe.nextSibling) !== null) break;
              oe = te, te = oe.parentNode;
            }
            oe = ye;
          }
          n = b === -1 || x === -1 ? null : { start: b, end: x };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Zo = { focusedElem: e, selectionRange: n }, Yt = !1, ke = t; ke !== null; ) if (t = ke, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, ke = e;
    else for (; ke !== null; ) {
      t = ke;
      try {
        var Se = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Se !== null) {
              var Le = Se.memoizedProps, ht = Se.memoizedState, z = t.stateNode, R = z.getSnapshotBeforeUpdate(t.elementType === t.type ? Le : En(t.type, Le), ht);
              z.__reactInternalSnapshotBeforeUpdate = R;
            }
            break;
          case 3:
            var D = t.stateNode.containerInfo;
            D.nodeType === 1 ? D.textContent = "" : D.nodeType === 9 && D.documentElement && D.removeChild(D.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(l(163));
        }
      } catch (ue) {
        dt(t, t.return, ue);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, ke = e;
        break;
      }
      ke = t.return;
    }
    return Se = cc, cc = !1, Se;
  }
  function sa(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var o = i.destroy;
          i.destroy = void 0, o !== void 0 && Fl(t, n, o);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function to(e, t) {
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
  function Ul(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      e.tag, e = n, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function dc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, dc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[An], delete t[Qi], delete t[rl], delete t[vh], delete t[kh])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function hc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function fc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || hc(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Kl(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Oa));
    else if (r !== 4 && (e = e.child, e !== null)) for (Kl(e, t, n), e = e.sibling; e !== null; ) Kl(e, t, n), e = e.sibling;
  }
  function Vl(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Vl(e, t, n), e = e.sibling; e !== null; ) Vl(e, t, n), e = e.sibling;
  }
  var Tt = null, Cn = !1;
  function br(e, t, n) {
    for (n = n.child; n !== null; ) pc(e, t, n), n = n.sibling;
  }
  function pc(e, t, n) {
    if (un && typeof un.onCommitFiberUnmount == "function") try {
      un.onCommitFiberUnmount(ti, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        It || Li(n, t);
      case 6:
        var r = Tt, i = Cn;
        Tt = null, br(e, t, n), Tt = r, Cn = i, Tt !== null && (Cn ? (e = Tt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Tt.removeChild(n.stateNode));
        break;
      case 18:
        Tt !== null && (Cn ? (e = Tt, n = n.stateNode, e.nodeType === 8 ? nl(e.parentNode, n) : e.nodeType === 1 && nl(e, n), pt(e)) : nl(Tt, n.stateNode));
        break;
      case 4:
        r = Tt, i = Cn, Tt = n.stateNode.containerInfo, Cn = !0, br(e, t, n), Tt = r, Cn = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!It && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var o = i, f = o.destroy;
            o = o.tag, f !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Fl(n, t, f), i = i.next;
          } while (i !== r);
        }
        br(e, t, n);
        break;
      case 1:
        if (!It && (Li(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (b) {
          dt(n, t, b);
        }
        br(e, t, n);
        break;
      case 21:
        br(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (It = (r = It) || n.memoizedState !== null, br(e, t, n), It = r) : br(e, t, n);
        break;
      default:
        br(e, t, n);
    }
  }
  function mc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Bh()), t.forEach(function(r) {
        var i = Yh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function Ln(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e, f = t, b = f;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 5:
              Tt = b.stateNode, Cn = !1;
              break e;
            case 3:
              Tt = b.stateNode.containerInfo, Cn = !0;
              break e;
            case 4:
              Tt = b.stateNode.containerInfo, Cn = !0;
              break e;
          }
          b = b.return;
        }
        if (Tt === null) throw Error(l(160));
        pc(o, f, i), Tt = null, Cn = !1;
        var x = i.alternate;
        x !== null && (x.return = null), i.return = null;
      } catch (U) {
        dt(i, t, U);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) gc(t, e), t = t.sibling;
  }
  function gc(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ln(t, e), zn(e), r & 4) {
          try {
            sa(3, e, e.return), to(3, e);
          } catch (Le) {
            dt(e, e.return, Le);
          }
          try {
            sa(5, e, e.return);
          } catch (Le) {
            dt(e, e.return, Le);
          }
        }
        break;
      case 1:
        Ln(t, e), zn(e), r & 512 && n !== null && Li(n, n.return);
        break;
      case 5:
        if (Ln(t, e), zn(e), r & 512 && n !== null && Li(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            Zt(i, "");
          } catch (Le) {
            dt(e, e.return, Le);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var o = e.memoizedProps, f = n !== null ? n.memoizedProps : o, b = e.type, x = e.updateQueue;
          if (e.updateQueue = null, x !== null) try {
            b === "input" && o.type === "radio" && o.name != null && Re(i, o), ir(b, f);
            var U = ir(b, o);
            for (f = 0; f < x.length; f += 2) {
              var re = x[f], oe = x[f + 1];
              re === "style" ? Kt(i, oe) : re === "dangerouslySetInnerHTML" ? rr(i, oe) : re === "children" ? Zt(i, oe) : Q(i, re, oe, U);
            }
            switch (b) {
              case "input":
                _e(i, o);
                break;
              case "textarea":
                We(i, o);
                break;
              case "select":
                var te = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var ye = o.value;
                ye != null ? ge(i, !!o.multiple, ye, !1) : te !== !!o.multiple && (o.defaultValue != null ? ge(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : ge(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Qi] = o;
          } catch (Le) {
            dt(e, e.return, Le);
          }
        }
        break;
      case 6:
        if (Ln(t, e), zn(e), r & 4) {
          if (e.stateNode === null) throw Error(l(162));
          i = e.stateNode, o = e.memoizedProps;
          try {
            i.nodeValue = o;
          } catch (Le) {
            dt(e, e.return, Le);
          }
        }
        break;
      case 3:
        if (Ln(t, e), zn(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          pt(t.containerInfo);
        } catch (Le) {
          dt(e, e.return, Le);
        }
        break;
      case 4:
        Ln(t, e), zn(e);
        break;
      case 13:
        Ln(t, e), zn(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || ($l = ot())), r & 4 && mc(e);
        break;
      case 22:
        if (re = n !== null && n.memoizedState !== null, e.mode & 1 ? (It = (U = It) || re, Ln(t, e), It = U) : Ln(t, e), zn(e), r & 8192) {
          if (U = e.memoizedState !== null, (e.stateNode.isHidden = U) && !re && (e.mode & 1) !== 0) for (ke = e, re = e.child; re !== null; ) {
            for (oe = ke = re; ke !== null; ) {
              switch (te = ke, ye = te.child, te.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  sa(4, te, te.return);
                  break;
                case 1:
                  Li(te, te.return);
                  var Se = te.stateNode;
                  if (typeof Se.componentWillUnmount == "function") {
                    r = te, n = te.return;
                    try {
                      t = r, Se.props = t.memoizedProps, Se.state = t.memoizedState, Se.componentWillUnmount();
                    } catch (Le) {
                      dt(r, n, Le);
                    }
                  }
                  break;
                case 5:
                  Li(te, te.return);
                  break;
                case 22:
                  if (te.memoizedState !== null) {
                    kc(oe);
                    continue;
                  }
              }
              ye !== null ? (ye.return = te, ke = ye) : kc(oe);
            }
            re = re.sibling;
          }
          e: for (re = null, oe = e; ; ) {
            if (oe.tag === 5) {
              if (re === null) {
                re = oe;
                try {
                  i = oe.stateNode, U ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (b = oe.stateNode, x = oe.memoizedProps.style, f = x != null && x.hasOwnProperty("display") ? x.display : null, b.style.display = Zr("display", f));
                } catch (Le) {
                  dt(e, e.return, Le);
                }
              }
            } else if (oe.tag === 6) {
              if (re === null) try {
                oe.stateNode.nodeValue = U ? "" : oe.memoizedProps;
              } catch (Le) {
                dt(e, e.return, Le);
              }
            } else if ((oe.tag !== 22 && oe.tag !== 23 || oe.memoizedState === null || oe === e) && oe.child !== null) {
              oe.child.return = oe, oe = oe.child;
              continue;
            }
            if (oe === e) break e;
            for (; oe.sibling === null; ) {
              if (oe.return === null || oe.return === e) break e;
              re === oe && (re = null), oe = oe.return;
            }
            re === oe && (re = null), oe.sibling.return = oe.return, oe = oe.sibling;
          }
        }
        break;
      case 19:
        Ln(t, e), zn(e), r & 4 && mc(e);
        break;
      case 21:
        break;
      default:
        Ln(
          t,
          e
        ), zn(e);
    }
  }
  function zn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (hc(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(l(160));
        }
        switch (r.tag) {
          case 5:
            var i = r.stateNode;
            r.flags & 32 && (Zt(i, ""), r.flags &= -33);
            var o = fc(e);
            Vl(e, o, i);
            break;
          case 3:
          case 4:
            var f = r.stateNode.containerInfo, b = fc(e);
            Kl(e, b, f);
            break;
          default:
            throw Error(l(161));
        }
      } catch (x) {
        dt(e, e.return, x);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jh(e, t, n) {
    ke = e, yc(e);
  }
  function yc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; ke !== null; ) {
      var i = ke, o = i.child;
      if (i.tag === 22 && r) {
        var f = i.memoizedState !== null || eo;
        if (!f) {
          var b = i.alternate, x = b !== null && b.memoizedState !== null || It;
          b = eo;
          var U = It;
          if (eo = f, (It = x) && !U) for (ke = i; ke !== null; ) f = ke, x = f.child, f.tag === 22 && f.memoizedState !== null ? wc(i) : x !== null ? (x.return = f, ke = x) : wc(i);
          for (; o !== null; ) ke = o, yc(o), o = o.sibling;
          ke = i, eo = b, It = U;
        }
        vc(e);
      } else (i.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = i, ke = o) : vc(e);
    }
  }
  function vc(e) {
    for (; ke !== null; ) {
      var t = ke;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              It || to(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !It) if (n === null) r.componentDidMount();
              else {
                var i = t.elementType === t.type ? n.memoizedProps : En(t.type, n.memoizedProps);
                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && ku(t, o, r);
              break;
            case 3:
              var f = t.updateQueue;
              if (f !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                ku(t, f, n);
              }
              break;
            case 5:
              var b = t.stateNode;
              if (n === null && t.flags & 4) {
                n = b;
                var x = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    x.autoFocus && n.focus();
                    break;
                  case "img":
                    x.src && (n.src = x.src);
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
                var U = t.alternate;
                if (U !== null) {
                  var re = U.memoizedState;
                  if (re !== null) {
                    var oe = re.dehydrated;
                    oe !== null && pt(oe);
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
              throw Error(l(163));
          }
          It || t.flags & 512 && Ul(t);
        } catch (te) {
          dt(t, t.return, te);
        }
      }
      if (t === e) {
        ke = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, ke = n;
        break;
      }
      ke = t.return;
    }
  }
  function kc(e) {
    for (; ke !== null; ) {
      var t = ke;
      if (t === e) {
        ke = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ke = n;
        break;
      }
      ke = t.return;
    }
  }
  function wc(e) {
    for (; ke !== null; ) {
      var t = ke;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              to(4, t);
            } catch (x) {
              dt(t, n, x);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (x) {
                dt(t, i, x);
              }
            }
            var o = t.return;
            try {
              Ul(t);
            } catch (x) {
              dt(t, o, x);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Ul(t);
            } catch (x) {
              dt(t, f, x);
            }
        }
      } catch (x) {
        dt(t, t.return, x);
      }
      if (t === e) {
        ke = null;
        break;
      }
      var b = t.sibling;
      if (b !== null) {
        b.return = t.return, ke = b;
        break;
      }
      ke = t.return;
    }
  }
  var _h = Math.ceil, no = I.ReactCurrentDispatcher, Hl = I.ReactCurrentOwner, mn = I.ReactCurrentBatchConfig, Ge = 0, bt = null, mt = null, xt = 0, an = 0, Ti = yr(0), vt = 0, ua = null, qr = 0, ro = 0, Yl = 0, ca = null, Jt = null, $l = 0, xi = 1 / 0, er = null, io = !1, ql = null, Er = null, ao = !1, Cr = null, oo = 0, da = 0, Wl = null, lo = -1, so = 0;
  function Ft() {
    return (Ge & 6) !== 0 ? ot() : lo !== -1 ? lo : lo = ot();
  }
  function Lr(e) {
    return (e.mode & 1) === 0 ? 1 : (Ge & 2) !== 0 && xt !== 0 ? xt & -xt : Sh.transition !== null ? (so === 0 && (so = dr()), so) : (e = Je, e !== 0 || (e = window.event, e = e === void 0 ? 16 : bs(e.type)), e);
  }
  function Tn(e, t, n, r) {
    if (50 < da) throw da = 0, Wl = null, Error(l(185));
    gt(e, n, r), ((Ge & 2) === 0 || e !== bt) && (e === bt && ((Ge & 2) === 0 && (ro |= n), vt === 4 && Tr(e, xt)), Gt(e, r), n === 1 && Ge === 0 && (t.mode & 1) === 0 && (xi = ot() + 500, za && kr()));
  }
  function Gt(e, t) {
    var n = e.callbackNode;
    wa(e, t);
    var r = cr(e, e === bt ? xt : 0);
    if (r === 0) n !== null && Ai(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Ai(n), t === 1) e.tag === 0 ? wh(bc.bind(null, e)) : lu(bc.bind(null, e)), gh(function() {
        (Ge & 6) === 0 && kr();
      }), n = null;
      else {
        switch (Pn(r)) {
          case 1:
            n = lr;
            break;
          case 4:
            n = ka;
            break;
          case 16:
            n = Yn;
            break;
          case 536870912:
            n = sr;
            break;
          default:
            n = Yn;
        }
        n = Rc(n, Sc.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function Sc(e, t) {
    if (lo = -1, so = 0, (Ge & 6) !== 0) throw Error(l(327));
    var n = e.callbackNode;
    if (Ni() && e.callbackNode !== n) return null;
    var r = cr(e, e === bt ? xt : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = uo(e, r);
    else {
      t = r;
      var i = Ge;
      Ge |= 2;
      var o = Cc();
      (bt !== e || xt !== t) && (er = null, xi = ot() + 500, Jr(e, t));
      do
        try {
          Uh();
          break;
        } catch (b) {
          Ec(e, b);
        }
      while (!0);
      hl(), no.current = o, Ge = i, mt !== null ? t = 0 : (bt = null, xt = 0, t = vt);
    }
    if (t !== 0) {
      if (t === 2 && (i = cn(e), i !== 0 && (r = i, t = Jl(e, i))), t === 1) throw n = ua, Jr(e, 0), Tr(e, r), Gt(e, ot()), n;
      if (t === 6) Tr(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !Dh(i) && (t = uo(e, r), t === 2 && (o = cn(e), o !== 0 && (r = o, t = Jl(e, o))), t === 1)) throw n = ua, Jr(e, 0), Tr(e, r), Gt(e, ot()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(l(345));
          case 2:
            Gr(e, Jt, er);
            break;
          case 3:
            if (Tr(e, r), (r & 130023424) === r && (t = $l + 500 - ot(), 10 < t)) {
              if (cr(e, 0) !== 0) break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                Ft(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = tl(Gr.bind(null, e, Jt, er), t);
              break;
            }
            Gr(e, Jt, er);
            break;
          case 4:
            if (Tr(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var f = 31 - jt(r);
              o = 1 << f, f = t[f], f > i && (i = f), r &= ~o;
            }
            if (r = i, r = ot() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * _h(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = tl(Gr.bind(null, e, Jt, er), r);
              break;
            }
            Gr(e, Jt, er);
            break;
          case 5:
            Gr(e, Jt, er);
            break;
          default:
            throw Error(l(329));
        }
      }
    }
    return Gt(e, ot()), e.callbackNode === n ? Sc.bind(null, e) : null;
  }
  function Jl(e, t) {
    var n = ca;
    return e.current.memoizedState.isDehydrated && (Jr(e, t).flags |= 256), e = uo(e, t), e !== 2 && (t = Jt, Jt = n, t !== null && Gl(t)), e;
  }
  function Gl(e) {
    Jt === null ? Jt = e : Jt.push.apply(Jt, e);
  }
  function Dh(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!Sn(o(), i)) return !1;
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
  function Tr(e, t) {
    for (t &= ~Yl, t &= ~ro, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - jt(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function bc(e) {
    if ((Ge & 6) !== 0) throw Error(l(327));
    Ni();
    var t = cr(e, 0);
    if ((t & 1) === 0) return Gt(e, ot()), null;
    var n = uo(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = cn(e);
      r !== 0 && (t = r, n = Jl(e, r));
    }
    if (n === 1) throw n = ua, Jr(e, 0), Tr(e, t), Gt(e, ot()), n;
    if (n === 6) throw Error(l(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Gr(e, Jt, er), Gt(e, ot()), null;
  }
  function Ql(e, t) {
    var n = Ge;
    Ge |= 1;
    try {
      return e(t);
    } finally {
      Ge = n, Ge === 0 && (xi = ot() + 500, za && kr());
    }
  }
  function Wr(e) {
    Cr !== null && Cr.tag === 0 && (Ge & 6) === 0 && Ni();
    var t = Ge;
    Ge |= 1;
    var n = mn.transition, r = Je;
    try {
      if (mn.transition = null, Je = 1, e) return e();
    } finally {
      Je = r, mn.transition = n, Ge = t, (Ge & 6) === 0 && kr();
    }
  }
  function Xl() {
    an = Ti.current, at(Ti);
  }
  function Jr(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, mh(n)), mt !== null) for (n = mt.return; n !== null; ) {
      var r = n;
      switch (ll(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Ia();
          break;
        case 3:
          Ei(), at($t), at(Pt), wl();
          break;
        case 5:
          vl(r);
          break;
        case 4:
          Ei();
          break;
        case 13:
          at(ut);
          break;
        case 19:
          at(ut);
          break;
        case 10:
          fl(r.type._context);
          break;
        case 22:
        case 23:
          Xl();
      }
      n = n.return;
    }
    if (bt = e, mt = e = xr(e.current, null), xt = an = t, vt = 0, ua = null, Yl = ro = qr = 0, Jt = ca = null, Hr !== null) {
      for (t = 0; t < Hr.length; t++) if (n = Hr[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var f = o.next;
          o.next = i, r.next = f;
        }
        n.pending = r;
      }
      Hr = null;
    }
    return e;
  }
  function Ec(e, t) {
    do {
      var n = mt;
      try {
        if (hl(), $a.current = Ga, qa) {
          for (var r = ct.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          qa = !1;
        }
        if ($r = 0, St = yt = ct = null, ra = !1, ia = 0, Hl.current = null, n === null || n.return === null) {
          vt = 1, ua = t, mt = null;
          break;
        }
        e: {
          var o = e, f = n.return, b = n, x = t;
          if (t = xt, b.flags |= 32768, x !== null && typeof x == "object" && typeof x.then == "function") {
            var U = x, re = b, oe = re.tag;
            if ((re.mode & 1) === 0 && (oe === 0 || oe === 11 || oe === 15)) {
              var te = re.alternate;
              te ? (re.updateQueue = te.updateQueue, re.memoizedState = te.memoizedState, re.lanes = te.lanes) : (re.updateQueue = null, re.memoizedState = null);
            }
            var ye = Wu(f);
            if (ye !== null) {
              ye.flags &= -257, Ju(ye, f, b, o, t), ye.mode & 1 && qu(o, U, t), t = ye, x = U;
              var Se = t.updateQueue;
              if (Se === null) {
                var Le = /* @__PURE__ */ new Set();
                Le.add(x), t.updateQueue = Le;
              } else Se.add(x);
              break e;
            } else {
              if ((t & 1) === 0) {
                qu(o, U, t), Zl();
                break e;
              }
              x = Error(l(426));
            }
          } else if (lt && b.mode & 1) {
            var ht = Wu(f);
            if (ht !== null) {
              (ht.flags & 65536) === 0 && (ht.flags |= 256), Ju(ht, f, b, o, t), cl(Ci(x, b));
              break e;
            }
          }
          o = x = Ci(x, b), vt !== 4 && (vt = 2), ca === null ? ca = [o] : ca.push(o), o = f;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var z = Yu(o, x, t);
                vu(o, z);
                break e;
              case 1:
                b = x;
                var R = o.type, D = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof R.getDerivedStateFromError == "function" || D !== null && typeof D.componentDidCatch == "function" && (Er === null || !Er.has(D)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var ue = $u(o, b, t);
                  vu(o, ue);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Tc(n);
      } catch (xe) {
        t = xe, mt === n && n !== null && (mt = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Cc() {
    var e = no.current;
    return no.current = Ga, e === null ? Ga : e;
  }
  function Zl() {
    (vt === 0 || vt === 3 || vt === 2) && (vt = 4), bt === null || (qr & 268435455) === 0 && (ro & 268435455) === 0 || Tr(bt, xt);
  }
  function uo(e, t) {
    var n = Ge;
    Ge |= 2;
    var r = Cc();
    (bt !== e || xt !== t) && (er = null, Jr(e, t));
    do
      try {
        Fh();
        break;
      } catch (i) {
        Ec(e, i);
      }
    while (!0);
    if (hl(), Ge = n, no.current = r, mt !== null) throw Error(l(261));
    return bt = null, xt = 0, vt;
  }
  function Fh() {
    for (; mt !== null; ) Lc(mt);
  }
  function Uh() {
    for (; mt !== null && !Ii(); ) Lc(mt);
  }
  function Lc(e) {
    var t = Mc(e.alternate, e, an);
    e.memoizedProps = e.pendingProps, t === null ? Tc(e) : mt = t, Hl.current = null;
  }
  function Tc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = Ah(n, t, an), n !== null) {
          mt = n;
          return;
        }
      } else {
        if (n = Ih(n, t), n !== null) {
          n.flags &= 32767, mt = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          vt = 6, mt = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        mt = t;
        return;
      }
      mt = t = e;
    } while (t !== null);
    vt === 0 && (vt = 5);
  }
  function Gr(e, t, n) {
    var r = Je, i = mn.transition;
    try {
      mn.transition = null, Je = 1, Kh(e, t, n, r);
    } finally {
      mn.transition = i, Je = r;
    }
    return null;
  }
  function Kh(e, t, n, r) {
    do
      Ni();
    while (Cr !== null);
    if ((Ge & 6) !== 0) throw Error(l(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(l(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Io(e, o), e === bt && (mt = bt = null, xt = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || ao || (ao = !0, Rc(Yn, function() {
      return Ni(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = mn.transition, mn.transition = null;
      var f = Je;
      Je = 1;
      var b = Ge;
      Ge |= 4, Hl.current = null, zh(e, n), gc(n, e), sh(Zo), Yt = !!Xo, Zo = Xo = null, e.current = n, jh(n), Hn(), Ge = b, Je = f, mn.transition = o;
    } else e.current = n;
    if (ao && (ao = !1, Cr = e, oo = i), o = e.pendingLanes, o === 0 && (Er = null), Mt(n.stateNode), Gt(e, ot()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (io) throw io = !1, e = ql, ql = null, e;
    return (oo & 1) !== 0 && e.tag !== 0 && Ni(), o = e.pendingLanes, (o & 1) !== 0 ? e === Wl ? da++ : (da = 0, Wl = e) : da = 0, kr(), null;
  }
  function Ni() {
    if (Cr !== null) {
      var e = Pn(oo), t = mn.transition, n = Je;
      try {
        if (mn.transition = null, Je = 16 > e ? 16 : e, Cr === null) var r = !1;
        else {
          if (e = Cr, Cr = null, oo = 0, (Ge & 6) !== 0) throw Error(l(331));
          var i = Ge;
          for (Ge |= 4, ke = e.current; ke !== null; ) {
            var o = ke, f = o.child;
            if ((ke.flags & 16) !== 0) {
              var b = o.deletions;
              if (b !== null) {
                for (var x = 0; x < b.length; x++) {
                  var U = b[x];
                  for (ke = U; ke !== null; ) {
                    var re = ke;
                    switch (re.tag) {
                      case 0:
                      case 11:
                      case 15:
                        sa(8, re, o);
                    }
                    var oe = re.child;
                    if (oe !== null) oe.return = re, ke = oe;
                    else for (; ke !== null; ) {
                      re = ke;
                      var te = re.sibling, ye = re.return;
                      if (dc(re), re === U) {
                        ke = null;
                        break;
                      }
                      if (te !== null) {
                        te.return = ye, ke = te;
                        break;
                      }
                      ke = ye;
                    }
                  }
                }
                var Se = o.alternate;
                if (Se !== null) {
                  var Le = Se.child;
                  if (Le !== null) {
                    Se.child = null;
                    do {
                      var ht = Le.sibling;
                      Le.sibling = null, Le = ht;
                    } while (Le !== null);
                  }
                }
                ke = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && f !== null) f.return = o, ke = f;
            else e: for (; ke !== null; ) {
              if (o = ke, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  sa(9, o, o.return);
              }
              var z = o.sibling;
              if (z !== null) {
                z.return = o.return, ke = z;
                break e;
              }
              ke = o.return;
            }
          }
          var R = e.current;
          for (ke = R; ke !== null; ) {
            f = ke;
            var D = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && D !== null) D.return = f, ke = D;
            else e: for (f = R; ke !== null; ) {
              if (b = ke, (b.flags & 2048) !== 0) try {
                switch (b.tag) {
                  case 0:
                  case 11:
                  case 15:
                    to(9, b);
                }
              } catch (xe) {
                dt(b, b.return, xe);
              }
              if (b === f) {
                ke = null;
                break e;
              }
              var ue = b.sibling;
              if (ue !== null) {
                ue.return = b.return, ke = ue;
                break e;
              }
              ke = b.return;
            }
          }
          if (Ge = i, kr(), un && typeof un.onPostCommitFiberRoot == "function") try {
            un.onPostCommitFiberRoot(ti, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        Je = n, mn.transition = t;
      }
    }
    return !1;
  }
  function xc(e, t, n) {
    t = Ci(n, t), t = Yu(e, t, 1), e = Sr(e, t, 1), t = Ft(), e !== null && (gt(e, 1, t), Gt(e, t));
  }
  function dt(e, t, n) {
    if (e.tag === 3) xc(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        xc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Er === null || !Er.has(r))) {
          e = Ci(n, e), e = $u(t, e, 1), t = Sr(t, e, 1), e = Ft(), t !== null && (gt(t, 1, e), Gt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Vh(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Ft(), e.pingedLanes |= e.suspendedLanes & n, bt === e && (xt & n) === n && (vt === 4 || vt === 3 && (xt & 130023424) === xt && 500 > ot() - $l ? Jr(e, 0) : Yl |= n), Gt(e, t);
  }
  function Nc(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = ri, ri <<= 1, (ri & 130023424) === 0 && (ri = 4194304)));
    var n = Ft();
    e = Qn(e, t), e !== null && (gt(e, t, n), Gt(e, n));
  }
  function Hh(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Nc(e, n);
  }
  function Yh(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(l(314));
    }
    r !== null && r.delete(t), Nc(e, n);
  }
  var Mc;
  Mc = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || $t.current) Wt = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Wt = !1, Oh(e, t, n);
      Wt = (e.flags & 131072) !== 0;
    }
    else Wt = !1, lt && (t.flags & 1048576) !== 0 && su(t, _a, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        Za(e, t), e = t.pendingProps;
        var i = gi(t, Pt.current);
        bi(t, n), i = El(null, t, r, e, i, n);
        var o = Cl();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, qt(r) ? (o = !0, Ba(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, gl(t), i.updater = Qa, t.stateNode = i, i._reactInternals = t, Rl(t, r, e, n), t = Il(null, t, r, !0, o, n)) : (t.tag = 0, lt && o && ol(t), Dt(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (Za(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = qh(r), e = En(r, e), i) {
            case 0:
              t = Al(null, t, r, e, n);
              break e;
            case 1:
              t = tc(null, t, r, e, n);
              break e;
            case 11:
              t = Gu(null, t, r, e, n);
              break e;
            case 14:
              t = Qu(null, t, r, En(r.type, e), n);
              break e;
          }
          throw Error(l(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : En(r, i), Al(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : En(r, i), tc(e, t, r, i, n);
      case 3:
        e: {
          if (nc(t), e === null) throw Error(l(387));
          r = t.pendingProps, o = t.memoizedState, i = o.element, yu(e, t), Ha(t, r, null, n);
          var f = t.memoizedState;
          if (r = f.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = Ci(Error(l(423)), t), t = rc(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = Ci(Error(l(424)), t), t = rc(e, t, r, n, i);
            break e;
          } else for (rn = gr(t.stateNode.containerInfo.firstChild), nn = t, lt = !0, bn = null, n = mu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (ki(), r === i) {
              t = Zn(e, t, n);
              break e;
            }
            Dt(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return wu(t), e === null && ul(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, f = i.children, el(r, i) ? f = null : o !== null && el(r, o) && (t.flags |= 32), ec(e, t), Dt(e, t, f, n), t.child;
      case 6:
        return e === null && ul(t), null;
      case 13:
        return ic(e, t, n);
      case 4:
        return yl(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = wi(t, null, r, n) : Dt(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : En(r, i), Gu(e, t, r, i, n);
      case 7:
        return Dt(e, t, t.pendingProps, n), t.child;
      case 8:
        return Dt(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Dt(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, f = i.value, rt(Ua, r._currentValue), r._currentValue = f, o !== null) if (Sn(o.value, f)) {
            if (o.children === i.children && !$t.current) {
              t = Zn(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var b = o.dependencies;
            if (b !== null) {
              f = o.child;
              for (var x = b.firstContext; x !== null; ) {
                if (x.context === r) {
                  if (o.tag === 1) {
                    x = Xn(-1, n & -n), x.tag = 2;
                    var U = o.updateQueue;
                    if (U !== null) {
                      U = U.shared;
                      var re = U.pending;
                      re === null ? x.next = x : (x.next = re.next, re.next = x), U.pending = x;
                    }
                  }
                  o.lanes |= n, x = o.alternate, x !== null && (x.lanes |= n), pl(
                    o.return,
                    n,
                    t
                  ), b.lanes |= n;
                  break;
                }
                x = x.next;
              }
            } else if (o.tag === 10) f = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (f = o.return, f === null) throw Error(l(341));
              f.lanes |= n, b = f.alternate, b !== null && (b.lanes |= n), pl(f, n, t), f = o.sibling;
            } else f = o.child;
            if (f !== null) f.return = o;
            else for (f = o; f !== null; ) {
              if (f === t) {
                f = null;
                break;
              }
              if (o = f.sibling, o !== null) {
                o.return = f.return, f = o;
                break;
              }
              f = f.return;
            }
            o = f;
          }
          Dt(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, bi(t, n), i = fn(i), r = r(i), t.flags |= 1, Dt(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = En(r, t.pendingProps), i = En(r.type, i), Qu(e, t, r, i, n);
      case 15:
        return Xu(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : En(r, i), Za(e, t), t.tag = 1, qt(r) ? (e = !0, Ba(t)) : e = !1, bi(t, n), Vu(t, r, i), Rl(t, r, i, n), Il(null, t, r, !0, e, n);
      case 19:
        return oc(e, t, n);
      case 22:
        return Zu(e, t, n);
    }
    throw Error(l(156, t.tag));
  };
  function Rc(e, t) {
    return Oi(e, t);
  }
  function $h(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gn(e, t, n, r) {
    return new $h(e, t, n, r);
  }
  function es(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function qh(e) {
    if (typeof e == "function") return es(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Z) return 11;
      if (e === B) return 14;
    }
    return 2;
  }
  function xr(e, t) {
    var n = e.alternate;
    return n === null ? (n = gn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function co(e, t, n, r, i, o) {
    var f = 2;
    if (r = e, typeof e == "function") es(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case q:
        return Qr(n.children, i, o, t);
      case ee:
        f = 8, i |= 8;
        break;
      case se:
        return e = gn(12, n, t, i | 2), e.elementType = se, e.lanes = o, e;
      case V:
        return e = gn(13, n, t, i), e.elementType = V, e.lanes = o, e;
      case J:
        return e = gn(19, n, t, i), e.elementType = J, e.lanes = o, e;
      case H:
        return ho(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case W:
            f = 10;
            break e;
          case le:
            f = 9;
            break e;
          case Z:
            f = 11;
            break e;
          case B:
            f = 14;
            break e;
          case G:
            f = 16, r = null;
            break e;
        }
        throw Error(l(130, e == null ? e : typeof e, ""));
    }
    return t = gn(f, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function Qr(e, t, n, r) {
    return e = gn(7, e, r, t), e.lanes = n, e;
  }
  function ho(e, t, n, r) {
    return e = gn(22, e, r, t), e.elementType = H, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function ts(e, t, n) {
    return e = gn(6, e, null, t), e.lanes = n, e;
  }
  function ns(e, t, n) {
    return t = gn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Wh(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ht(0), this.expirationTimes = Ht(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ht(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function rs(e, t, n, r, i, o, f, b, x) {
    return e = new Wh(e, t, n, b, x), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = gn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, gl(o), e;
  }
  function Jh(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: X, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Pc(e) {
    if (!e) return vr;
    e = e._reactInternals;
    e: {
      if (Rn(e) !== e || e.tag !== 1) throw Error(l(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (qt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(l(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (qt(n)) return au(e, n, t);
    }
    return t;
  }
  function Oc(e, t, n, r, i, o, f, b, x) {
    return e = rs(n, r, !0, e, i, o, f, b, x), e.context = Pc(null), n = e.current, r = Ft(), i = Lr(n), o = Xn(r, i), o.callback = t ?? null, Sr(n, o, i), e.current.lanes = i, gt(e, i, r), Gt(e, r), e;
  }
  function fo(e, t, n, r) {
    var i = t.current, o = Ft(), f = Lr(i);
    return n = Pc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Xn(o, f), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Sr(i, t, f), e !== null && (Tn(e, i, f, o), Va(e, i, f)), f;
  }
  function po(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Ac(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function is(e, t) {
    Ac(e, t), (e = e.alternate) && Ac(e, t);
  }
  function Gh() {
    return null;
  }
  var Ic = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function as(e) {
    this._internalRoot = e;
  }
  mo.prototype.render = as.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    fo(e, t, null, null);
  }, mo.prototype.unmount = as.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Wr(function() {
        fo(null, e, null, null);
      }), t[qn] = null;
    }
  };
  function mo(e) {
    this._internalRoot = e;
  }
  mo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = _i();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < wn.length && t !== 0 && t < wn[n].priority; n++) ;
      wn.splice(n, 0, e), n === 0 && ne(e);
    }
  };
  function os(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function go(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Bc() {
  }
  function Qh(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var U = po(f);
          o.call(U);
        };
      }
      var f = Oc(t, r, e, 0, null, !1, !1, "", Bc);
      return e._reactRootContainer = f, e[qn] = f.current, Ji(e.nodeType === 8 ? e.parentNode : e), Wr(), f;
    }
    for (; i = e.lastChild; ) e.removeChild(i);
    if (typeof r == "function") {
      var b = r;
      r = function() {
        var U = po(x);
        b.call(U);
      };
    }
    var x = rs(e, 0, !1, null, null, !1, !1, "", Bc);
    return e._reactRootContainer = x, e[qn] = x.current, Ji(e.nodeType === 8 ? e.parentNode : e), Wr(function() {
      fo(t, x, n, r);
    }), x;
  }
  function yo(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
      var f = o;
      if (typeof i == "function") {
        var b = i;
        i = function() {
          var x = po(f);
          b.call(x);
        };
      }
      fo(t, f, e, i);
    } else f = Qh(n, t, e, i, r);
    return po(f);
  }
  On = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = ur(t.pendingLanes);
          n !== 0 && (ji(t, n | 1), Gt(t, ot()), (Ge & 6) === 0 && (xi = ot() + 500, kr()));
        }
        break;
      case 13:
        Wr(function() {
          var r = Qn(e, 1);
          if (r !== null) {
            var i = Ft();
            Tn(r, e, 1, i);
          }
        }), is(e, 1);
    }
  }, jr = function(e) {
    if (e.tag === 13) {
      var t = Qn(e, 134217728);
      if (t !== null) {
        var n = Ft();
        Tn(t, e, 134217728, n);
      }
      is(e, 134217728);
    }
  }, _r = function(e) {
    if (e.tag === 13) {
      var t = Lr(e), n = Qn(e, t);
      if (n !== null) {
        var r = Ft();
        Tn(n, e, t, r);
      }
      is(e, t);
    }
  }, _i = function() {
    return Je;
  }, Di = function(e, t) {
    var n = Je;
    try {
      return Je = e, t();
    } finally {
      Je = n;
    }
  }, Mn = function(e, t, n) {
    switch (t) {
      case "input":
        if (_e(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = Aa(r);
              if (!i) throw Error(l(90));
              Nt(r), _e(r, i);
            }
          }
        }
        break;
      case "textarea":
        We(e, n);
        break;
      case "select":
        t = n.value, t != null && ge(e, !!n.multiple, t, !1);
    }
  }, Qe = Ql, tt = Wr;
  var Xh = { usingClientEntryPoint: !1, Events: [Xi, pi, Aa, ve, de, Ql] }, ha = { findFiberByHostInstance: Fr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Zh = { bundleType: ha.bundleType, version: ha.version, rendererPackageName: ha.rendererPackageName, rendererConfig: ha.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: I.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = ar(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ha.findFiberByHostInstance || Gh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vo.isDisabled && vo.supportsFiber) try {
      ti = vo.inject(Zh), un = vo;
    } catch {
    }
  }
  return Qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xh, Qt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!os(t)) throw Error(l(200));
    return Jh(e, t, null, n);
  }, Qt.createRoot = function(e, t) {
    if (!os(e)) throw Error(l(299));
    var n = !1, r = "", i = Ic;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = rs(e, 1, !1, null, null, n, !1, r, i), e[qn] = t.current, Ji(e.nodeType === 8 ? e.parentNode : e), new as(t);
  }, Qt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = ar(t), e = e === null ? null : e.stateNode, e;
  }, Qt.flushSync = function(e) {
    return Wr(e);
  }, Qt.hydrate = function(e, t, n) {
    if (!go(t)) throw Error(l(200));
    return yo(null, e, t, !0, n);
  }, Qt.hydrateRoot = function(e, t, n) {
    if (!os(e)) throw Error(l(405));
    var r = n != null && n.hydratedSources || null, i = !1, o = "", f = Ic;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (f = n.onRecoverableError)), t = Oc(t, null, e, 1, n ?? null, i, !1, o, f), e[qn] = t.current, Ji(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
      n,
      i
    );
    return new mo(t);
  }, Qt.render = function(e, t, n) {
    if (!go(t)) throw Error(l(200));
    return yo(null, e, t, !1, n);
  }, Qt.unmountComponentAtNode = function(e) {
    if (!go(e)) throw Error(l(40));
    return e._reactRootContainer ? (Wr(function() {
      yo(null, null, e, !1, function() {
        e._reactRootContainer = null, e[qn] = null;
      });
    }), !0) : !1;
  }, Qt.unstable_batchedUpdates = Ql, Qt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!go(n)) throw Error(l(200));
    if (e == null || e._reactInternals === void 0) throw Error(l(38));
    return yo(e, t, n, !1, r);
  }, Qt.version = "18.3.1-next-f1338f8080-20240426", Qt;
}
var Hc;
function id() {
  if (Hc) return ss.exports;
  Hc = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), ss.exports = Nf(), ss.exports;
}
var Yc;
function Mf() {
  if (Yc) return wo;
  Yc = 1;
  var a = id();
  return wo.createRoot = a.createRoot, wo.hydrateRoot = a.hydrateRoot, wo;
}
var Rf = Mf();
const Co = /* @__PURE__ */ new Map();
function Lt(a, c, l) {
  if (!c) return;
  const u = Co.get(a);
  if (u?.element === c) return;
  u?.root.unmount();
  const p = Rf.createRoot(c);
  Co.set(a, {
    element: c,
    root: p
  }), p.render(l);
}
function Pf() {
  for (const {
    root: a
  } of [...Co.values()].reverse()) a.unmount();
  Co.clear();
}
const Mr = (a) => !!a && typeof a == "object" && !Array.isArray(a), ad = (a) => Mr(a) && (!!a.mc || typeof a.url == "string"), ds = (a) => Mr(a) && typeof a.libraryId == "string" && typeof a.url == "string", fa = (a) => Math.max(-12, Math.min(12, Math.round(Number(a) || 0))), So = (a, c = 0) => Number.isFinite(Number(a)) ? Number(a) : c;
function Of(a) {
  return ad(a) ? {
    ...a,
    title: String(a.title || a.url || "").slice(0, 512),
    memo: String(a.memo || "").slice(0, 4096),
    lrc: String(a.lrc || ""),
    s: Math.max(0, So(a.s)),
    e: a.e == null ? null : So(a.e, null),
    off: So(a.off),
    pitch: fa(a.pitch),
    dur: a.dur == null ? null : So(a.dur, null)
  } : null;
}
const Af = (a) => Array.isArray(a) ? a.map(Of).filter(Boolean) : [], If = (a, c) => a === "_L" ? void 0 : c, od = (a) => JSON.stringify(a, If), $c = (a) => JSON.parse(od(a)), gs = Object.freeze(["lfont", "lfc", "lsz", "lcol", "lfx", "lshape", "lbgmode", "ltheme", "lclassiccolor"]), Bf = Object.freeze([
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
]), qc = {
  lfx: Bf,
  lshape: ["auto", "wide", "tall"],
  lbgmode: ["transparent", "green"],
  ltheme: ["effect", "white", "cyan", "rose", "amber", "violet", "mint"]
}, ys = Object.freeze({
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
function ld(a, c = ys, { fontCount: l = 1 / 0 } = {}) {
  if (!Mr(a)) return null;
  const u = { ...ys, ...c, version: 1 };
  for (const p of gs) {
    let d = a[p];
    if (d != null)
      if (p === "lfx" && d === "folia-cappella" && (d = "folia-classic"), qc[p])
        qc[p].includes(String(d)) && (u[p] = String(d));
      else if (p === "lfont")
        /^\d+$/.test(String(d)) && Number(d) < l && (u[p] = String(Number(d)));
      else if (p === "lcol" || p === "lclassiccolor")
        /^#[a-f0-9]{6}$/i.test(d) && (u[p] = d);
      else if (p === "lsz") {
        const y = Number(d);
        Number.isFinite(y) && (u[p] = String(Math.max(24, Math.min(160, y))));
      } else u[p] = String(d).slice(0, 120);
  }
  for (const p of ["lbold", "centerFree"]) typeof a[p] == "boolean" && (u[p] = a[p]);
  return Number.isFinite(Number(a.themeSeed)) && (u.themeSeed = Number(a.themeSeed) >>> 0), u;
}
function zf(a, c) {
  const l = Mr(a) ? a : {}, u = ld({ ...l, lfx: l.fxv ? l.lfx : "jizura" }, ys, c);
  return { ...l, ...u, cdn: l.cdn == null ? "5" : String(l.cdn), fxv: 1 };
}
const jn = Object.freeze({
  setlist: "kpt2",
  outputSettings: "kpt_set",
  overlay: "manokaraOverlayV1",
  aspectLock: "manokaraOverlayAspectLock",
  theme: "manokaraTheme",
  language: "manokaraLanguage",
  preferKaraoke: "manokaraPreferKaraoke",
  recovery: "manokaraRecoveryV1"
});
function jf(a = () => globalThis.localStorage) {
  function c(y, m = null) {
    try {
      const g = a().getItem(y);
      return { value: g ?? m, status: g == null ? "missing" : "ok" };
    } catch (g) {
      return { value: m, status: "unavailable", error: g };
    }
  }
  function l(y, m, g = () => !0) {
    const L = c(y);
    if (L.status !== "ok") return { ...L, value: m };
    try {
      const N = JSON.parse(L.value);
      if (!g(N)) throw new Error("Invalid saved data");
      return { value: N, raw: L.value, status: "ok" };
    } catch (N) {
      return { value: m, raw: L.value, status: "invalid", error: N };
    }
  }
  function u(y, m) {
    try {
      return a().setItem(y, String(m)), { ok: !0 };
    } catch (g) {
      return { ok: !1, error: g };
    }
  }
  function p(y, m) {
    const g = l(jn.recovery, { version: 1, entries: {} }, (N) => N?.version === 1 && N.entries && typeof N.entries == "object" && !Array.isArray(N.entries));
    if (g.status === "invalid" || g.status === "unavailable") throw g.error;
    if (g.value.entries[y]?.raw === m) return;
    const L = { version: 1, entries: { ...g.value.entries, [y]: { raw: m, savedAt: Date.now() } } };
    a().setItem(jn.recovery, JSON.stringify(L));
  }
  function d(y, m, g = () => !0) {
    try {
      if (!g(m)) throw new Error("Invalid data to save");
      const L = od(m);
      if (L === void 0) throw new Error("Data is not serializable");
      const N = l(y, null, g);
      if (N.status === "unavailable") throw N.error;
      return N.status === "invalid" && p(y, N.raw), a().setItem(y, L), { ok: !0 };
    } catch (L) {
      return { ok: !1, error: L };
    }
  }
  return { readText: c, readJson: l, writeText: u, writeJson: d };
}
const tr = Object.freeze({ database: "manokara-library", version: 1, store: "songs", keyPath: "libraryId" });
function _f(a = () => globalThis.indexedDB) {
  let c = null, l = null, u = null, p = 0;
  function d() {
    if (c) return Promise.resolve(c);
    if (l) return l;
    const O = p, k = new Promise((C, T) => {
      let A, Q = !1;
      const I = (_) => {
        Q || (Q = !0, T(_ || new Error("Could not open song library")));
      };
      u = () => I(new Error("Song library closed"));
      try {
        const _ = a();
        if (!_) throw new Error("IndexedDB unavailable");
        A = _.open(tr.database, tr.version);
      } catch (_) {
        I(_);
        return;
      }
      A.onupgradeneeded = () => {
        try {
          A.result.objectStoreNames.contains(tr.store) || A.result.createObjectStore(tr.store, { keyPath: tr.keyPath });
        } catch (_) {
          I(_), A.transaction?.abort();
        }
      }, A.onerror = () => I(A.error), A.onblocked = () => I(new Error("Song library is blocked by another page")), A.onsuccess = () => {
        const _ = A.result;
        if (Q || O !== p) {
          _.close();
          return;
        }
        Q = !0, c = _, _.onversionchange = () => M(), _.onclose = () => {
          c === _ && (c = null);
        }, C(_);
      };
    });
    l = k;
    const v = () => {
      l === k && (l = null, u = null);
    };
    return k.then(v, v), k;
  }
  async function y(O, k) {
    const v = await d();
    return new Promise((C, T) => {
      let A, Q, I;
      try {
        A = v.transaction(tr.store, O), A.oncomplete = () => C(I), A.onabort = () => T(A.error || new Error("Song library transaction aborted")), A.onerror = () => T(A.error || new Error("Could not update song library")), Q = k(A.objectStore(tr.store)), Q.onsuccess = () => {
          I = Q.result;
        }, Q.onerror = () => T(Q.error || new Error("Song library request failed"));
      } catch (_) {
        T(_);
        try {
          A?.abort();
        } catch {
        }
      }
    });
  }
  async function m() {
    return (await y("readonly", (O) => O.getAll()) || []).filter(ds);
  }
  async function g(O) {
    return y("readonly", (k) => k.get(O));
  }
  async function L(O) {
    if (!ds(O)) throw new Error("Invalid library song");
    const k = $c(O);
    await y("readwrite", (v) => v.put(k));
  }
  async function N(O) {
    if (!ds(O)) throw new Error("Invalid library song");
    const k = $c(O), v = await d();
    return new Promise((C, T) => {
      let A, Q = !1;
      try {
        A = v.transaction(tr.store, "readwrite"), A.oncomplete = () => C(Q), A.onabort = () => T(A.error || new Error("Song library transaction aborted")), A.onerror = () => T(A.error || new Error("Could not import song"));
        const I = A.objectStore(tr.store), _ = I.get(k.libraryId);
        _.onerror = () => T(_.error || new Error("Could not read song")), _.onsuccess = () => {
          if (_.result === void 0)
            try {
              I.put(k), Q = !0;
            } catch (X) {
              T(X), A.abort();
            }
        };
      } catch (I) {
        T(I);
        try {
          A?.abort();
        } catch {
        }
      }
    });
  }
  async function E(O) {
    await y("readwrite", (k) => k.delete(O));
  }
  function M() {
    p++, u?.(), u = null, l = null, c?.close(), c = null;
  }
  return { ready: d, list: m, get: g, put: L, insertMissing: N, remove: E, close: M };
}
function Df({ getStorage: a, getIndexedDB: c } = {}) {
  const l = jf(a), u = /* @__PURE__ */ new Set(["aspectLock", "theme", "language", "preferKaraoke"]);
  return { setlist: {
    load() {
      const m = l.readJson(jn.setlist, [], Array.isArray);
      return { ...m, value: Af(m.value) };
    },
    save(m) {
      return l.writeJson(jn.setlist, m, (g) => Array.isArray(g) && g.every(ad));
    }
  }, preferences: {
    get(m, g = null) {
      return u.has(m) ? l.readText(jn[m], g).value : g;
    },
    set(m, g) {
      return u.has(m) ? l.writeText(jn[m], g) : { ok: !1, error: new Error("Unknown preference") };
    },
    loadOutput(m) {
      const g = l.readJson(jn.outputSettings, {}, Mr);
      return { ...g, value: zf(g.value, m) };
    },
    saveOutput(m) {
      return l.writeJson(jn.outputSettings, m, Mr);
    }
  }, layout: {
    load() {
      return l.readJson(jn.overlay, null, Mr);
    },
    save(m) {
      return l.writeJson(jn.overlay, m, Mr);
    }
  }, library: _f(c), local: l };
}
const Ct = Df();
(() => {
  const a = {
    Source: "Nguồn",
    "All sources": "Tất cả nguồn",
    "Needs server API key": "Cần API key trên máy chủ",
    "Disabled on server": "Máy chủ chưa bật",
    "Timed lyrics first, regardless of source.": "Ưu tiên lời có timecode, từ bất kỳ nguồn nào.",
    "Lyrics source": "Nguồn lời",
    "Found lyrics": "Đã tìm được lời",
    "No lyrics found": "Chưa tìm thấy lời",
    "Some results could not be loaded": "Một số bản lời chưa tải được",
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
  let c = /^vi\b/i.test(navigator.language || "") ? "vi" : "en";
  const l = Ct.preferences.get("language");
  ["vi", "en"].includes(l) && (c = l);
  const u = [], p = document.title;
  function d(k) {
    if (k = String(k ?? ""), c === "en") return k;
    if (Object.hasOwn(a, k)) return a[k];
    const v = k.trim().replace(/\s+/g, " ");
    if (Object.hasOwn(a, v)) return k.replace(k.trim(), a[v]);
    let C = k.match(/^Creating Romaji… (\d+)%$/);
    if (C) return `Đang tạo Romaji… ${C[1]}%`;
    if (C = k.match(/^Imported (.+) \(([^)]+)\)\. Original timestamps and offset tags are retained\.$/), C) return `Đã nhập ${C[1]} (${C[2]}). Giữ nguyên thời gian và thẻ độ lệch gốc.`;
    if (C = k.match(/^Line (\d+): keep every timestamp and metadata tag unchanged\.$/), C) return `Dòng ${C[1]}: giữ nguyên mọi mốc thời gian và thẻ thông tin nhé.`;
    if (C = k.match(/^Line (\d+): keep blank lyric gaps unchanged\.$/), C) return `Dòng ${C[1]}: giữ nguyên khoảng trống giữa các câu nhé.`;
    if (C = k.match(/^Timed line (\d+)\.$/), C) return `Đã gắn thời gian cho câu ${C[1]}.`;
    const T = " Open it on YouTube to check.";
    if (k.endsWith(T)) return d(k.slice(0, -T.length)) + a[T];
    if (C = k.match(/^YouTube error ([^:]+): (.+)$/), C) return `Lỗi YouTube ${C[1]}: ${d(C[2])}`;
    for (const A of ["Romaji conversion failed: ", "Romaji unavailable: ", "Import failed: "])
      if (k.startsWith(A)) return a[A] + d(k.slice(A.length));
    return k;
  }
  const y = ["title", "aria-label", "placeholder", "label"];
  function m(k, v) {
    const C = document.createTreeWalker(k, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let T = k;
    do
      if (T.nodeType === 1) {
        if (T.matches("script,style,svg,[data-no-i18n]") || T.closest("script,style,svg,[data-no-i18n]")) continue;
        for (const A of y) if (T.hasAttribute(A)) {
          const Q = T.getAttribute(A);
          Object.hasOwn(a, Q) && v.push({
            node: T,
            attr: A,
            source: Q
          });
        }
      } else if (T.nodeType === 3 && !T.parentElement?.closest("script,style,svg,[data-no-i18n]")) {
        const A = T.nodeValue, Q = A.trim().replace(/\s+/g, " ");
        Object.hasOwn(a, Q) && v.push({
          node: T,
          source: A
        });
      }
    while (T = C.nextNode());
  }
  function g(k, v = !1) {
    for (const {
      node: C,
      attr: T,
      source: A
    } of k)
      v && !C.isConnected || (T ? C.setAttribute(T, d(A)) : C.nodeValue = d(A));
  }
  function L(k) {
    if (c === "en") return k;
    const v = document.createElement("template");
    v.innerHTML = k;
    const C = [];
    return m(v.content, C), g(C), v.innerHTML;
  }
  function N(k) {
    return c === "en" ? k : k.replace(/\b(title|aria-label)="([^"]*)"/g, (v, C, T) => `${C}="${d(T).replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`).replace(/(^|>)([^<>]*)(?=<|$)/g, (v, C, T) => C + d(T));
  }
  function E() {
    document.documentElement.lang = c, document.title = d(p), g(u, !0);
    const k = document.querySelector("#language");
    k && (k.value = c);
  }
  function M() {
    const k = "#relayStatus,#playbackState,#now,#time,#msg,#offv,#centerHint,#audioStatus,#lyricsStatus,#lyricLoadStatus,#pitchStatus,#libraryCount,#libraryEmpty,#libraryList,#liveLyricModeStatus,[data-pitch-value],#ftitle,#songDialogTitle,#add,#pause,#stage,#pan,#lres,#list,#lrandom";
    document.querySelectorAll(k).forEach((v) => v.setAttribute("data-no-i18n", "")), m(document.body, u), document.querySelectorAll(k).forEach((v) => v.removeAttribute("data-no-i18n")), E();
  }
  function O(k) {
    !["vi", "en"].includes(k) || k === c || (c = k, Ct.preferences.set("language", k), E(), window.dispatchEvent(new CustomEvent("manokara:languagechange")));
  }
  window.ManokaraI18n = {
    text: d,
    html: L,
    markup: N,
    init: M,
    setLanguage: O,
    get language() {
      return c;
    }
  };
})();
function Pr(a = globalThis, c = () => performance.now()) {
  const l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), d = new AbortController();
  let y = !1, m = !1;
  function g(T) {
    T.handle != null && a[T.kind === "interval" ? "clearInterval" : T.kind === "frame" ? "cancelAnimationFrame" : "clearTimeout"](T.handle), T.handle = null;
  }
  function L(T) {
    if (y || m || !l.has(T)) return;
    const A = () => {
      y || m || !l.has(T) || (T.kind !== "interval" && (l.delete(T), T.handle = null), T.callback());
    };
    T.kind === "interval" ? T.handle = a.setInterval(A, T.ms) : T.kind === "frame" ? T.handle = a.requestAnimationFrame(A) : (T.due = c() + T.remaining, T.handle = a.setTimeout(A, T.remaining));
  }
  function N(T, A, Q = 0) {
    if (y) return () => {
    };
    const I = {
      kind: T,
      callback: A,
      ms: Q,
      remaining: Q,
      handle: null
    };
    return l.add(I), L(I), () => {
      g(I), l.delete(I);
    };
  }
  function E(T) {
    return y ? (T(), () => {
    }) : (u.add(T), () => {
      u.delete(T) && T();
    });
  }
  function M(T, A, Q, I) {
    O(T, A, Q, I);
    let _ = !0;
    const X = (...se) => {
      _ && !y && !m && Q(...se);
    };
    T.addEventListener(A, X, I);
    const q = {
      target: T,
      type: A,
      callback: Q,
      capture: typeof I == "boolean" ? I : !!I?.capture
    }, ee = E(() => {
      _ = !1, T.removeEventListener(A, X, {
        capture: q.capture
      }), p.delete(q);
    });
    return q.remove = ee, y || p.add(q), ee;
  }
  function O(T, A, Q, I) {
    const _ = typeof I == "boolean" ? I : !!I?.capture;
    for (const X of p) X.target === T && X.type === A && X.callback === Q && X.capture === _ && X.remove();
  }
  function k() {
    if (!(y || m)) {
      m = !0;
      for (const T of l)
        T.kind === "timeout" && (T.remaining = Math.max(0, T.due - c())), g(T);
    }
  }
  function v() {
    if (!(y || !m)) {
      m = !1;
      for (const T of l) L(T);
    }
  }
  function C() {
    if (!y) {
      y = !0, d.abort();
      for (const T of l) g(T);
      l.clear();
      for (const T of u)
        try {
          T();
        } catch {
        }
      u.clear();
    }
  }
  return {
    interval: (T, A) => N("interval", T, A),
    timeout: (T, A) => N("timeout", T, A),
    frame: (T) => N("frame", T),
    own: E,
    listen: M,
    unlisten: O,
    suspend: k,
    resume: v,
    dispose: C,
    signal: d.signal,
    get disposed() {
      return y;
    },
    get suspended() {
      return m;
    },
    get timerCount() {
      return l.size;
    },
    get activeTimerCount() {
      return [...l].filter((T) => T.handle != null).length;
    },
    get cleanupCount() {
      return u.size;
    }
  };
}
(() => {
  const a = Pr(), c = [{
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
  }], l = [{
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
  }], u = {
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
  let p = c, d, y, m, g, L = 0, N = !1, E, M = 0, O = 0;
  const k = (Z) => document.querySelector(Z);
  function v() {
    const Z = window.visualViewport;
    return {
      left: Z?.offsetLeft || 0,
      top: Z?.offsetTop || 0,
      width: Z?.width || innerWidth,
      height: Z?.height || innerHeight
    };
  }
  function C(Z, V) {
    const J = Z.getBoundingClientRect();
    let B = Math.max(V.left + 6, J.left - 6), G = Math.max(V.top + 6, J.top - 6), H = Math.min(V.left + V.width - 6, J.right + 6), w = Math.min(V.top + V.height - 6, J.bottom + 6);
    for (let j = Z.parentElement; j && j !== document.body; j = j.parentElement) {
      const Y = getComputedStyle(j), S = j.getBoundingClientRect();
      /auto|scroll|hidden|clip/.test(Y.overflowX) && (B = Math.max(B, S.left), H = Math.min(H, S.right)), /auto|scroll|hidden|clip/.test(Y.overflowY) && (G = Math.max(G, S.top), w = Math.min(w, S.bottom));
    }
    return {
      left: B,
      top: G,
      right: Math.max(B, H),
      bottom: Math.max(G, w),
      width: Math.max(0, H - B),
      height: Math.max(0, w - G)
    };
  }
  function T() {
    if (M = 0, !N) return;
    const Z = k(p[L].target);
    if (!Z) return;
    const V = v(), J = C(Z, V), B = 16, G = 12;
    d.style.setProperty("--tour-height", V.height + "px"), d.style.setProperty("--tour-width", V.width + "px"), y.style.width = Math.min(390, V.width - G * 2) + "px", y.style.maxHeight = Math.max(140, Math.min(V.height - G * 2, V.width <= 620 && V.height >= 500 ? V.height * 0.6 : V.height)) + "px";
    const H = y.getBoundingClientRect(), w = H.width, j = H.height;
    let Y, S;
    if (V.width <= 620)
      Y = V.left + (V.width - w) / 2, S = V.top + V.height - j - G;
    else {
      const be = [{
        x: J.right + B,
        y: J.top
      }, {
        x: J.left - w - B,
        y: J.top
      }, {
        x: J.left,
        y: J.bottom + B
      }, {
        x: J.left,
        y: J.top - j - B
      }], Pe = (me) => Math.max(V.left + G, Math.min(me, V.left + V.width - w - G)), Be = (me) => Math.max(V.top + G, Math.min(me, V.top + V.height - j - G));
      ({
        x: Y,
        y: S
      } = be.map((me) => {
        const Oe = Pe(me.x), Ee = Be(me.y), Fe = Math.max(0, Math.min(Oe + w, J.right) - Math.max(Oe, J.left)) * Math.max(0, Math.min(Ee + j, J.bottom) - Math.max(Ee, J.top));
        return {
          x: Oe,
          y: Ee,
          score: Fe + Math.abs(me.x - Oe) + Math.abs(me.y - Ee)
        };
      }).sort((me, Oe) => me.score - Oe.score)[0]);
    }
    Object.assign(y.style, {
      left: Y + "px",
      top: S + "px"
    }), Object.assign(m.style, {
      left: J.left + "px",
      top: J.top + "px",
      width: J.width + "px",
      height: J.height + "px"
    });
    const F = d.querySelectorAll(".tour-mask"), fe = [{
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
    F.forEach((be, Pe) => {
      for (const [Be, je] of Object.entries(fe[Pe])) be.style[Be] = Math.max(0, je) + "px";
    });
  }
  function A() {
    N && !M && (M = a.frame(T));
  }
  function Q() {
    N && (_(), A());
  }
  function I() {
    const Z = ManokaraI18n.language, V = u[Z], [J, B] = p[L][Z];
    $.ui.updateTour({
      open: N,
      language: Z,
      languageLabel: V.language,
      eyebrow: p === l ? V.overlayGuide : V.guide,
      title: J,
      body: B,
      progress: `${V.step} ${L + 1} ${V.of} ${p.length}`,
      meter: (L + 1) / p.length * 100,
      closeLabel: V.close,
      skipLabel: V.skip,
      backLabel: V.back,
      nextLabel: L === p.length - 1 ? p === l ? V.overlayDone : V.done : V.next,
      backDisabled: L === 0
    }), A();
  }
  function _() {
    const Z = p[L], V = k("#tourReactRoot"), J = Z.tab === "song" ? k("#songEditorDialog") : document.body;
    V.parentElement !== J && J.append(V), g.showMain?.(p === l ? "playlist" : "karaoke"), Z.overlay && ManokaraStudio.view.target !== Z.overlay && ManokaraStudio.showTarget(Z.overlay), p === c && g.showTab(Z.tab || "output"), Z.details && (k(Z.details).open = !0);
    const B = k(Z.target);
    if (B) {
      for (let G = B; G && G !== document.body; G = G.parentElement)
        G.tagName === "DETAILS" && (G.open = !0);
      B.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "instant"
      });
    }
  }
  function X(Z) {
    L = Math.max(0, Math.min(Z, p.length - 1));
    const V = ++O;
    I(), _(), a.frame(() => {
      if (!N || V !== O) return;
      T();
      const J = v(), B = k(p[L].target);
      if (!B) return;
      const G = B.getBoundingClientRect(), H = y.getBoundingClientRect();
      if (J.width <= 620 && G.bottom > H.top - 16) {
        let w = B.parentElement;
        for (; w && w !== document.body && !(w.scrollHeight > w.clientHeight && /auto|scroll/.test(getComputedStyle(w).overflowY)); ) w = w.parentElement;
        const j = G.bottom - H.top + 24;
        w && w !== document.body ? w.scrollTop += j : window.scrollBy({
          top: j,
          behavior: "instant"
        }), T();
      }
      d.querySelector('[data-tour="next"]').focus({
        preventScroll: !0
      });
    });
  }
  function q(Z) {
    if (N) {
      if (Z.key === "Escape") {
        Z.preventDefault(), Z.stopImmediatePropagation(), W();
        return;
      }
      if (Z.key === "Tab") {
        const V = [...y.querySelectorAll("button:not([disabled]),select")], J = V[0], B = V.at(-1);
        Z.shiftKey && document.activeElement === J ? (Z.preventDefault(), B.focus()) : !Z.shiftKey && document.activeElement === B && (Z.preventDefault(), J.focus());
        return;
      }
      Z.target.tagName !== "SELECT" && (Z.key === "ArrowRight" && (Z.preventDefault(), ee()), Z.key === "ArrowLeft" && (Z.preventDefault(), X(L - 1)));
    }
  }
  function ee() {
    L === p.length - 1 ? W() : X(L + 1);
  }
  function se() {
    if (N) return;
    k("#transposeDialog").hidden || k("#transposeClose").click();
    const Z = [...document.querySelectorAll(".app-header,.main-tabs,#grid,#playlistStudio,.app-footer")];
    E = {
      focus: document.activeElement,
      main: g.main?.() || "karaoke",
      overlay: ManokaraStudio.view,
      tab: k("#songEditorDialog").open ? "song" : "output",
      details: [...document.querySelectorAll("#grid details,#playlistStudio details,#songEditorDialog details")].map((V) => ({
        node: V,
        open: V.open
      })),
      scroll: [...document.querySelectorAll("main,main *,#playlistStudio,#playlistStudio *")].filter((V) => V.scrollHeight > V.clientHeight || V.scrollWidth > V.clientWidth).map((V) => ({
        node: V,
        top: V.scrollTop,
        left: V.scrollLeft
      })),
      x: scrollX,
      y: scrollY,
      background: Z.map((V) => ({
        node: V,
        inert: V.inert
      }))
    }, p = E.main === "playlist" ? l : c, E.background.forEach(({
      node: V
    }) => V.inert = !0), N = !0, a.listen(document, "keydown", q, !0), a.listen(document, "scroll", A, !0), a.listen(window, "resize", Q), window.visualViewport?.addEventListener("resize", Q), window.visualViewport?.addEventListener("scroll", A), X(0);
  }
  function W() {
    if (!N) return;
    N = !1, O++, I(), typeof M == "function" && M(), M = 0, a.unlisten(document, "keydown", q, !0), a.unlisten(document, "scroll", A, !0), a.unlisten(window, "resize", Q), window.visualViewport?.removeEventListener("resize", Q), window.visualViewport?.removeEventListener("scroll", A), document.body.append(k("#tourReactRoot")), E.details.forEach(({
      node: V,
      open: J
    }) => V.open = J), g.showTab(E.tab), g.showMain?.(E.main), ManokaraStudio.restoreView(E.overlay), E.background.forEach(({
      node: V,
      inert: J
    }) => V.inert = J), E.scroll.forEach(({
      node: V,
      top: J,
      left: B
    }) => {
      V.scrollTop = J, V.scrollLeft = B;
    }), window.scrollTo({
      left: E.x,
      top: E.y,
      behavior: "instant"
    }), (E.focus?.isConnected ? E.focus : k("#help")).focus({
      preventScroll: !0
    });
  }
  function le(Z) {
    g = Z, d = document.querySelector("#tourReactRoot .tour-overlay"), y = d.querySelector(".tour-card"), m = d.querySelector(".tour-spotlight"), $.commands.bind("tour", {
      close: W,
      back() {
        X(L - 1);
      },
      next: ee,
      setLanguage: ManokaraI18n.setLanguage
    }), window.ManokaraTourActions = $.commands.actions("tour"), a.listen(window, "manokara:languagechange", () => {
      N && I();
    });
  }
  window.ManokaraTour = {
    init: le,
    open: se,
    close: W,
    get active() {
      return N;
    },
    dispose() {
      W(), a.dispose();
    }
  };
})();
(() => {
  function a(y, m = 180) {
    const g = [];
    let L = !1, N = 0;
    for (const M of String(y || "").split(/\r?\n/)) {
      const O = M.match(/\[offset:([+-]?\d+)\]/i);
      O && (N = Number(O[1]) / 1e3);
      const k = [...M.matchAll(/\[(\d+):(\d{2}(?:\.\d+)?)\]/g)], v = M.replace(/\[[^\]]*\]|<[^>]*>/g, "").trim(), C = [...M.matchAll(/<(\d+):(\d{2}(?:[.:]\d+)?)>/g)];
      if (k.length) {
        L = !0;
        const T = Number(k[0][1]) * 60 + Number(k[0][2]);
        for (const A of k) {
          const Q = Number(A[1]) * 60 + Number(A[2]), I = { t: Q, x: v };
          C.length && (I.words = C.map((_, X) => ({
            t: Number(_[1]) * 60 + Number(_[2].replace(":", ".")) + Q - T,
            x: M.slice(_.index + _[0].length, C[X + 1]?.index).replace(/\[[^\]]*\]/g, "")
          }))), g.push(I);
        }
      } else v && g.push({ t: null, x: v });
    }
    const E = Math.max(1, Number(m) || 180);
    return L ? g.forEach((M) => {
      M.t !== null && (M.t += N), M.words?.forEach((O) => O.t += N);
    }) : g.forEach((M, O) => {
      M.t = O * E / g.length;
    }), { all: g, timed: L, lines: g.filter((M) => M.t !== null).sort((M, O) => M.t - O.t) };
  }
  function c(y, m = 180) {
    const g = a(y, m).lines;
    let L = !1;
    return { lines: g.map((E, M) => {
      const O = Math.max(0, E.t), k = Math.max(O + 0.01, g[M + 1]?.t ?? (Number(m) || 180));
      let v;
      if (E.words?.length && E.words.map((C) => C.x).join("").trim() === E.x)
        L = !0, v = E.words.filter((C) => C.x).map((C) => {
          const T = E.words[E.words.indexOf(C) + 1], A = Math.max(O, Math.min(k, C.t));
          return { text: C.x, startTime: A, endTime: Math.max(A, Math.min(k, T?.t ?? k)) };
        });
      else {
        const C = E.x.match(/\s+|[^\s]+/gu) || [], T = (k - O) / Math.max(1, C.length);
        v = C.map((A, Q) => ({ text: A, startTime: O + Q * T, endTime: Q === C.length - 1 ? k : O + (Q + 1) * T }));
      }
      return { id: `manokara-${M}`, fullText: E.x, startTime: O, endTime: k, words: v };
    }), isWordByWord: L };
  }
  function l() {
    const y = [];
    return {
      record(m) {
        return Number.isFinite(m) && m >= 0 && m <= 4e3 && (y.push(m), y.length > 20 && y.shift()), this.oneWay();
      },
      oneWay() {
        if (!y.length) return 0;
        const m = [...y].sort((g, L) => g - L);
        return Math.min(2e3, m[Math.floor((m.length - 1) * 0.2)] / 2);
      }
    };
  }
  function u(y) {
    const m = String(y || "").trim();
    if (!m) return null;
    if (!/^\d+(?::\d{1,2})?(?:\.\d+)?$/.test(m)) return NaN;
    const g = m.split(":");
    return g.length === 2 && Number(g[1]) >= 60 ? NaN : g.length === 2 ? Number(g[0]) * 60 + Number(g[1]) : Number(m);
  }
  function p(y) {
    try {
      const m = new URL(y), g = m.hostname.toLowerCase().replace(/^www\./, ""), L = g === "youtu.be" ? m.pathname.slice(1).split("/")[0] : ["youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com"].includes(g) ? m.searchParams.get("v") || m.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] : null;
      return /^[\w-]{11}$/.test(L || "") ? L : null;
    } catch {
      return null;
    }
  }
  function d() {
    let y = null, m = 0, g = 0;
    const L = () => performance.now(), N = (M) => Math.min(15, Math.max(0, M - m) / 1e3), E = (M, O) => Number(M.time || 0) + (M.playing && !M.paused ? N(O) + g * (1 - Math.exp(-N(O) / 1.5)) : 0);
    return {
      accept(M, O = L(), k = 0) {
        const v = { ...M }, C = Math.min(15e3, (Number.isFinite(v.stateAgeMs) ? Math.max(0, v.stateAgeMs) : 0) + Math.max(0, Math.min(2e3, Number(k) || 0))) / 1e3, T = Number(v.time) || 0;
        v.time = T + (v.playing && !v.paused ? C : 0), v.counting && !v.paused && (v.countdownRemaining = Math.max(0, Number(v.countdownRemaining || 0) - C)), v.sampledAt = Date.now();
        const A = y && y.title === v.title && y.lrc === v.lrc && y.writerId === v.writerId && y.timelineVersion === v.timelineVersion;
        let Q = 0;
        if (A && !v.counting && !y.counting && y.playing && v.playing && !y.paused && !v.paused) {
          const I = E(y, O);
          Math.abs(I - v.time) <= 0.35 && (Q = v.time - I, v.time = I);
        }
        return v.stateAgeMs >= 15e3 && (v.playing = !1), y = v, g = Q, m = O, v;
      },
      time(M = L()) {
        return y ? E(y, M) : 0;
      },
      age(M = L()) {
        return y ? Math.max(0, M - m) + (Number(y.stateAgeMs) || 0) : 1 / 0;
      },
      countdown(M = L()) {
        return y ? Math.max(0, Number(y.countdownRemaining || 0) - (y.paused || y.stateAgeMs >= 15e3 ? 0 : N(M))) : 0;
      }
    };
  }
  globalThis.ManokaraCore = { parseLyrics: a, foliaLyrics: c, timeValue: u, youtubeId: p, createClock: d, createLatencyEstimator: l };
})();
(() => {
  const a = { audioPower: 0, audioBass: 0, audioLowMid: 0, audioMid: 0, audioVocal: 0, audioTreble: 0 };
  function c(l, u) {
    let p, d, y, m, g = !1, L = !1, N = 0, E = null;
    const M = l.onclick, O = [];
    let k = "Share the karaoke tab with tab audio enabled. No recording.";
    const v = () => {
      if (L) return;
      const A = (Q) => globalThis.ManokaraI18n?.text(Q) || Q;
      l.textContent = A(g ? "Stop audio reaction" : "Enable audio reaction"), u.textContent = A(k);
    };
    window.addEventListener("manokara:languagechange", v);
    const C = () => {
      N++, E = null, l.disabled = !1, O.splice(0).forEach((A) => A()), g = !1, p?.getTracks().forEach((A) => A.stop()), d?.close().catch(() => {
      }), p = d = y = m = null, k = "Share the karaoke tab with tab audio enabled. No recording.", v();
    }, T = async () => {
      if (L) return;
      if (g) {
        C();
        return;
      }
      const A = ++N;
      E = A, l.disabled = !0;
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) throw Error("Use Chrome or Edge over HTTPS / localhost to share tab audio.");
        const Q = await navigator.mediaDevices.getDisplayMedia({ video: !0, audio: !0, preferCurrentTab: !0 });
        if (L || A !== N) {
          Q.getTracks().forEach((_) => _.stop());
          return;
        }
        if (p = Q, !p.getAudioTracks().length) throw Error("No tab audio selected. Choose the karaoke tab and enable Share tab audio.");
        const I = new AudioContext({ latencyHint: "interactive" });
        if (d = I, await I.resume(), L || A !== N) {
          I.close().catch(() => {
          });
          return;
        }
        y = d.createAnalyser(), y.fftSize = 2048, y.smoothingTimeConstant = 0.55, d.createMediaStreamSource(p).connect(y), m = new Uint8Array(y.frequencyBinCount), g = !0, p.getTracks().forEach((_) => {
          const X = () => {
            A === N && C();
          };
          _.addEventListener("ended", X, { once: !0 }), O.push(() => _.removeEventListener?.("ended", X));
        }), k = "Folia reacts to the selected tab audio. Lyrics follow the LRC timecodes.", v();
      } catch (Q) {
        !L && A === N && (C(), k = Q.message || "Audio sharing cancelled.", v());
      } finally {
        E === A && (E = null, l.disabled = !1);
      }
    };
    return l.onclick = T, window.addEventListener("pagehide", C, { once: !0 }), v(), {
      stop: C,
      dispose() {
        L || (L = !0, C(), window.removeEventListener?.("manokara:languagechange", v), window.removeEventListener?.("pagehide", C), l.onclick === T && (l.onclick = M));
      },
      sample() {
        if (!g || d?.state !== "running" || !y) return a;
        y.getByteFrequencyData(m);
        const A = (Q, I) => {
          const _ = Math.max(0, Math.floor(Q * y.fftSize / d.sampleRate)), X = Math.min(m.length, Math.ceil(I * y.fftSize / d.sampleRate));
          let q = 0;
          for (let ee = _; ee < X; ee++) q += (m[ee] / 255) ** 2;
          return Math.min(1, Math.sqrt(q / Math.max(1, X - _)));
        };
        return { audioPower: A(30, 1e4), audioBass: A(30, 250), audioLowMid: A(250, 500), audioMid: A(500, 2e3), audioVocal: A(2e3, 4e3), audioTreble: A(4e3, 12e3) };
      }
    };
  }
  globalThis.ManokaraAudio = { create: c };
})();
(() => {
  const a = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]/u, c = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]+/gu, l = () => /\[[^\]\r\n]*\]|<\d{1,3}:\d{2}(?:[.:]\d+)?\s*>/g, u = (k) => String(k || "").split(/\r\n|\r|\n/);
  function p(k) {
    const v = [];
    let C = 0;
    for (const T of k.matchAll(l()))
      v.push({ text: k.slice(C, T.index), token: !1 }, { text: T[0], token: !0 }), C = T.index + T[0].length;
    return v.push({ text: k.slice(C), token: !1 }), v;
  }
  function d(k, v) {
    const C = u(k), T = u(v);
    if (C.length !== T.length) return "Keep the same number of lines as the original LRC.";
    for (let A = 0; A < C.length; A++) {
      const Q = (_) => [..._.matchAll(l())].map((X) => X[0]), I = (_) => p(_).filter((X) => !X.token).map((X) => X.text).join("").trim();
      if (JSON.stringify(Q(C[A])) !== JSON.stringify(Q(T[A]))) return `Line ${A + 1}: keep every timestamp and metadata tag unchanged.`;
      if (!!I(C[A]) != !!I(T[A])) return `Line ${A + 1}: keep blank lyric gaps unchanged.`;
    }
    return "";
  }
  async function y(k, v, C = () => {
  }) {
    const T = String(k).split(/(\r\n|\r|\n)/), A = [];
    for (let _ = 0; _ < T.length; _++) {
      if (/^(?:\r\n|\r|\n)$/.test(T[_])) {
        A.push(T[_]);
        continue;
      }
      const X = [], q = p(T[_]);
      for (let ee = 0; ee < q.length; ee++) {
        const se = q[ee];
        if (se.token || !a.test(se.text)) {
          X.push(se.text);
          continue;
        }
        let W = 0;
        for (const le of se.text.matchAll(c))
          X.push(se.text.slice(W, le.index), await v(le[0])), W = le.index + le[0].length;
        X.push(se.text.slice(W)), /^<\d/.test(q[ee + 1]?.text || "") && a.test(se.text.slice(-1)) && X.push(" ");
      }
      A.push(X.join("")), _ % 20 === 0 && C(Math.round((_ + 1) / T.length * 100));
    }
    const Q = A.join(""), I = d(k, Q);
    if (I) throw Error(I);
    return Q;
  }
  const m = /* @__PURE__ */ new WeakMap();
  function g(k) {
    if (!k || typeof k != "object") return !1;
    const v = k.romaji;
    if (!v || v.source !== k.lrc || typeof v.lrc != "string" || v.lrc.length > 2e5) return !1;
    const C = m.get(k);
    if (C && C.source === k.lrc && C.result === v.lrc) return C.valid;
    const T = !d(k.lrc, v.lrc);
    return m.set(k, { source: k.lrc, result: v.lrc, valid: T }), T;
  }
  function L(k) {
    return g(k) && ["romaji", "both"].includes(k.lyricMode) ? k.lyricMode : "original";
  }
  function N(k) {
    return L(k) === "romaji" ? k.romaji.lrc : String(k?.lrc || "");
  }
  const E = (k) => L(k) === "both" ? k.romaji.lrc : "";
  function M(k) {
    const v = String(k).match(/^\s*\[ti:([^\]]+)\]/im)?.[1]?.trim() || "", C = String(k).match(/^\s*\[ar:([^\]]+)\]/im)?.[1]?.trim() || "", T = String(k).match(/^\s*\[length:\s*(\d+):(\d{2}(?:\.\d+)?)\s*\]/im), A = T && Number(T[2]) < 60 ? Number(T[1]) * 60 + Number(T[2]) : void 0;
    return { title: v, artist: C, duration: A };
  }
  const O = (k) => u(k).some((v) => p(v).some((C) => !C.token && a.test(C.text)));
  globalThis.ManokaraLyrics = { romanize: y, alignmentError: d, validRomaji: g, mode: L, displayLrc: N, secondaryLrc: E, fileMetadata: M, hasJapanese: O };
})();
(() => {
  const a = ManokaraLyrics, c = (u) => document.querySelector(u);
  function l({ imported: u = () => {
  }, changed: p = () => {
  }, draft: d = null } = {}) {
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
    function m(B) {
      const G = c(B), H = y[B.slice(1)];
      return !d || !H ? G : new Proxy(G, {
        get(w, j) {
          if (H[j]) return d.get(H[j]);
          const Y = w[j];
          return typeof Y == "function" ? Y.bind(w) : Y;
        },
        set(w, j, Y) {
          return H[j] ? d.set(H[j], Y) : w[j] = Y, !0;
        }
      });
    }
    const g = [], L = /* @__PURE__ */ new Map();
    let N = !1;
    function E(B, G, H, w) {
      B.addEventListener(G, H, w), g.push(() => B.removeEventListener(G, H, w));
    }
    function M(B, G) {
      const H = c(B), w = H.onclick;
      H.onclick = G, g.push(() => {
        H.onclick === G && (H.onclick = w);
      });
    }
    const O = m("#llrc"), k = m("#romajiLrc"), v = m("#lyricMode"), C = c("#lyricsStatus");
    let T = "", A = 0, Q = null, I = null, _ = 0, X = "";
    const q = (B, G = !1) => {
      if (N) return;
      X = B;
      const H = globalThis.ManokaraI18n?.text(B) || B;
      d ? d.patch({ lyricsStatus: H, lyricsError: G }) : (C.textContent = H, C.classList.toggle("error", G));
    };
    E(window, "manokara:languagechange", () => q(X, d ? d.get("lyricsError") : C.classList.contains("error")));
    function ee() {
      const B = !!k.value && T === O.value && !a.alignmentError(O.value, k.value);
      if (d) d.set("romajiAvailable", B);
      else for (const G of v.options) G.disabled = G.value !== "original" && !B;
      return B;
    }
    function se() {
      A++, I && W(), T = "", k.value = "", v.value = "original", m("#romajiDetails").open = !1, ee(), q("Drop an LRC file here, or paste lyrics. Romaji keeps the original timing.");
    }
    E(O, "input", (B) => {
      d && d.set("llrc", B.target.value), se(), p();
    }), E(k, "input", (B) => {
      d && d.set("romajiLrc", B.target.value);
      const G = a.alignmentError(O.value, k.value);
      ee(), q(G || "Romaji edited. Add/Save the song to keep your changes.", !!G);
    }), E(v, "change", (B) => {
      d && d.set("lyricMode", B.target.value), ee(), q("Display mode applies when you Add/Save this song.");
    });
    function W() {
      I && clearTimeout(I.timer), Q && Q.terminate(), Q = null, I = null, m("#romanize").disabled = !1;
    }
    function le() {
      const B = O.value;
      if (!B.trim()) {
        q("Paste or import Japanese lyrics first.", !0);
        return;
      }
      if (B.length > 2e5) {
        q("Lyrics exceed the 200,000-character limit.", !0);
        return;
      }
      if (!a.hasJapanese(B)) {
        q("No Japanese characters found in these lyrics.", !0);
        return;
      }
      if (I) {
        q("Romaji conversion is already running.");
        return;
      }
      const G = ++A;
      m("#romanize").disabled = !0, q("Loading the local Japanese dictionary…");
      try {
        Q ||= new Worker("./manokara-romaji-worker.js");
        const H = setTimeout(() => {
          if (!I || I.id !== G) return;
          const w = G === A;
          W(), w && q("Conversion timed out. Check that the Japanese dictionary is deployed, then try again.", !0);
        }, 12e4);
        I = { id: G, timer: H }, Q.onerror = () => {
          if (!I || I.id !== G) return;
          clearTimeout(H);
          const w = G === A;
          W(), w && q("Could not load the Japanese converter. Restart the updated server and reload this page.", !0);
        }, Q.onmessage = ({ data: w }) => {
          if (!I || w.id !== I.id) return;
          if (w.lrc === void 0 && !w.error) {
            G === A && q(w.loading ? "Loading the local Japanese dictionary…" : `Creating Romaji… ${w.progress}%`);
            return;
          }
          if (clearTimeout(H), I = null, m("#romanize").disabled = !1, G !== A || B !== O.value) return;
          if (w.error) {
            q("Romaji conversion failed: " + w.error, !0);
            return;
          }
          const j = a.alignmentError(B, w.lrc);
          if (j) {
            q(j, !0);
            return;
          }
          T = B, k.value = w.lrc, v.value = "romaji", m("#romajiDetails").open = !0, ee(), q("Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.");
        }, Q.postMessage({ id: G, source: B });
      } catch (H) {
        I && clearTimeout(I.timer), W(), q("Romaji unavailable: " + H.message, !0);
      }
    }
    M("#romanize", le), M("#exportRomaji", () => {
      if (!ee()) {
        q(a.alignmentError(O.value, k.value) || "Create valid Romaji before downloading.", !0);
        return;
      }
      const B = (m("#ttl").value.trim() || "lyrics").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 100), G = URL.createObjectURL(new Blob([k.value], { type: "text/plain;charset=utf-8" })), H = document.createElement("a");
      H.href = G, H.download = B + ".romaji.lrc", document.body.appendChild(H), H.click(), H.remove(), L.set(G, setTimeout(() => {
        L.delete(G), URL.revokeObjectURL(G);
      }, 3e4)), q("Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.");
    }), M("#lyricsify", () => {
      const B = m("#lq").value.trim() || m("#ttl").value.trim(), G = new URL("https://www.lyricsify.com/" + (B ? "search" : "lrc"));
      B && G.searchParams.set("q", B), window.open(G.href, "_blank", "noopener"), q("Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.");
    });
    async function Z(B) {
      if (!B) return;
      if (!/\.lrc$/i.test(B.name)) {
        q("Choose a .lrc file.", !0);
        return;
      }
      if (B.size > 512e3) {
        q("LRC file is too large (maximum 500 KB).", !0);
        return;
      }
      const G = ++_, H = A, w = O.value;
      try {
        const j = new Uint8Array(await B.arrayBuffer()), Y = m("#lrcEncoding").value;
        let S, F = Y;
        if (Y === "auto")
          if (j[0] === 255 && j[1] === 254)
            S = new TextDecoder("utf-16le", { fatal: !0 }).decode(j), F = "UTF-16LE";
          else if (j[0] === 254 && j[1] === 255)
            S = new TextDecoder("utf-16be", { fatal: !0 }).decode(j), F = "UTF-16BE";
          else try {
            S = new TextDecoder("utf-8", { fatal: !0 }).decode(j), F = "UTF-8";
          } catch {
            S = new TextDecoder("shift_jis", { fatal: !0 }).decode(j), F = "Shift_JIS";
          }
        else S = new TextDecoder(Y, { fatal: !0 }).decode(j);
        if (S.length > 2e5 || /\u0000/.test(S)) throw Error("Invalid or oversized text. Check the file encoding.");
        if (G !== _ || H !== A || w !== O.value) return;
        O.value = S, se(), p();
        const fe = a.fileMetadata(S);
        u(fe, B.name), q(`Imported ${B.name} (${F}). Original timestamps and offset tags are retained.`);
      } catch (j) {
        G === _ && q("Import failed: " + j.message, !0);
      }
    }
    M("#importLrc", () => c("#lrcFile").click()), E(c("#lrcFile"), "change", (B) => {
      const G = B.target.files[0];
      B.target.value = "", Z(G);
    });
    const V = c("#lyricDraft");
    let J = 0;
    return E(V, "dragenter", (B) => {
      [...B.dataTransfer.types].includes("Files") && (B.preventDefault(), J++, V.classList.add("dragging"));
    }), E(V, "dragover", (B) => {
      [...B.dataTransfer.types].includes("Files") && (B.preventDefault(), B.dataTransfer.dropEffect = "copy");
    }), E(V, "dragleave", () => {
      --J <= 0 && (J = 0, V.classList.remove("dragging"));
    }), E(V, "drop", (B) => {
      if (B.dataTransfer.files.length) {
        if (B.preventDefault(), J = 0, V.classList.remove("dragging"), B.dataTransfer.files.length !== 1) {
          q("Import one LRC file at a time.", !0);
          return;
        }
        Z(B.dataTransfer.files[0]);
      }
    }), se(), {
      reset() {
        _++, se();
      },
      load(B) {
        _++, se(), a.validRomaji(B) ? (T = O.value, k.value = B.romaji.lrc, v.value = a.mode(B), ee(), m("#romajiDetails").open = v.value !== "original", q("Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.")) : B.romaji && q("Saved Romaji no longer matches this LRC. Create Romaji again.", !0);
      },
      read() {
        const B = ee();
        if (v.value !== "original" && !B) throw Error(a.alignmentError(O.value, k.value) || "Create Romaji again after changing the original lyrics.");
        return { lyricMode: v.value, romaji: B ? { source: O.value, lrc: k.value } : void 0 };
      },
      // Search results replace the source, so a translation from the previous source is invalid.
      sourceReplaced() {
        _++, se();
      },
      dispose() {
        if (!N) {
          N = !0, A++, _++, W(), g.splice(0).reverse().forEach((B) => B());
          for (const [B, G] of L)
            clearTimeout(G), URL.revokeObjectURL(B);
          L.clear();
        }
      }
    };
  }
  window.ManokaraLyricsEditor = { create: l };
})();
window.ManokaraSession = (() => {
  let a;
  const c = async (d, y, m = {}) => await fetch(d, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(y),
    credentials: "same-origin",
    signal: AbortSignal.timeout(8e3),
    ...m
  }), l = async () => {
    const d = new URL(location.href), y = await c("/__session", {});
    if (!y.ok) {
      const N = await y.json();
      throw new Error(N.error || "Could not open your browser session.");
    }
    let m = d.searchParams.get("room");
    try {
      m ||= localStorage.getItem("manokaraRelayRoom");
    } catch {
    }
    /^[a-f0-9]{32}$/.test(m || "") || (m = null);
    let g = await c("/__room", { room: m });
    if (g.status === 404) {
      let N;
      try {
        N = localStorage.getItem("manokaraRelayRoom");
      } catch {
      }
      N !== m && /^[a-f0-9]{32}$/.test(N || "") && (g = await c("/__room", { room: N })), g.status === 404 && (g = await c("/__room", { room: null }));
    }
    const L = await g.json();
    if (!g.ok) throw new Error(L.error || "Could not open a room.");
    a = L;
    try {
      localStorage.setItem("manokaraRelayRoom", a.room);
    } catch {
    }
    return d.searchParams.set("room", a.room), d.hash = "", history.replaceState(history.state, "", d), a;
  }, u = navigator.locks ? navigator.locks.request("manokara-room", l) : l();
  return u.catch(() => {
  }), { ready: u, api: c, obsUrl: (d, y = "lyrics") => {
    const m = new URL(y === "playlist" ? "/manokara-playlist.html" : "/manokara-obs.html", location.origin);
    return m.searchParams.set("room", a.room), d && m.searchParams.set("popup", "1"), m.hash = new URLSearchParams({ view: a.viewToken }).toString(), m.href;
  }, async rotate() {
    await u;
    const d = await c("/__room/rotate", { room: a.room }), y = await d.json();
    if (!d.ok) throw new Error(y.error || "Could not replace the OBS link.");
    a.viewToken = y.viewToken;
  } };
})();
const Ss = ["glass", "paper", "minimal", "card", "vinyl", "signal"], Ff = /* @__PURE__ */ new Set(["tempera", "sonnet", "lumiere", "hanabi", "clean", "word-pop", "neon", "glitch"]), Lo = (a) => Ff.has(a?.effect) && !a.centerFree, Rr = (a) => JSON.parse(JSON.stringify(a)), yn = (a, c, l, u) => Number.isFinite(Number(a)) ? Math.min(u, Math.max(l, Number(a))) : c, hs = (a, c) => /^#[\da-f]{6}$/i.test(a || "") ? a : c;
function Ro(a = "glass") {
  const c = (p, d, y, m, g, L) => ({ x: p, y: d, w: y, h: m, size: g, label: L, visible: !0, align: "left", bold: !1 }), l = {
    version: 1,
    width: 1920,
    height: 1080,
    lyric: { x: 0, y: 0, w: 1920, h: 1080, visible: !0 },
    lyricCompact: { x: 160, y: 800, w: 1600, h: 240, visible: !0, autoFit: !0 },
    playlist: {
      theme: Ss.includes(a) ? a : "glass",
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
      blocks: { current: c(88, 88, 640, 280, 42, "Now Singing"), list: c(88, 384, 440, 528, 27, "Song List"), next: c(544, 384, 360, 208, 29, "Next On") }
    }
  }, u = l.playlist;
  return a === "paper" && (u.foreground = "#433c35", u.background = "#faf3df", u.accent = "#aa5139", u.opacity = 0.97, u.radius = 3, u.font = "serif", u.blocks = { current: c(96, 88, 580, 288, 42, "Now Singing"), list: c(96, 392, 580, 504, 28, "Song List"), next: c(700, 120, 320, 264, 30, "Next On") }), a === "minimal" && (u.opacity = 0, u.radius = 0, u.font = "geist", u.accent = "#e4f0ca", u.blocks = { current: c(96, 96, 760, 248, 52, "Now Singing"), list: c(96, 360, 560, 528, 30, "Song List"), next: c(96, 912, 760, 112, 28, "Next On") }), a === "card" && (u.accent = "#dfc3f9", u.background = "#211b32", u.radius = 28, u.opacity = 0.93, u.blocks = { current: c(96, 88, 460, 580, 38, "Now Singing"), list: c(580, 88, 460, 580, 27, "Song List"), next: c(96, 692, 460, 164, 29, "Next On") }), a === "vinyl" && (u.accent = "#efca92", u.background = "#29241f", u.opacity = 0.94, u.radius = 18, u.blocks = { current: c(96, 88, 940, 336, 42, "Now Singing"), list: c(96, 448, 520, 504, 27, "Song List"), next: c(640, 448, 396, 208, 30, "Next On") }), a === "signal" && (u.accent = "#8ee3dd", u.background = "#10282b", u.opacity = 0.92, u.radius = 16, u.blocks = { current: c(80, 836, 1100, 164, 38, "Now Singing"), list: c(80, 216, 560, 580, 28, "Song List"), next: c(1196, 836, 644, 164, 30, "Next On") }, u.blocks.list.visible = !1), l;
}
function Xr(a) {
  const c = Ro();
  let l = a;
  try {
    typeof l == "string" && (l = JSON.parse(l));
  } catch {
    l = null;
  }
  if (!l || typeof l != "object") return c;
  c.width = Math.round(yn(l.width, 1920, 320, 3840)), c.height = Math.round(yn(l.height, 1080, 240, 2160));
  function u(y, m) {
    y = y || {};
    const g = yn(y.w, Math.min(m.w, c.width), 32, c.width), L = yn(y.h, Math.min(m.h, c.height), 32, c.height);
    return { ...m, x: yn(y.x, Math.min(m.x, c.width - g), 0, c.width - g), y: yn(y.y, Math.min(m.y, c.height - L), 0, c.height - L), w: g, h: L, visible: y.visible !== !1 };
  }
  c.lyric = u(l.lyric, c.lyric), c.lyricCompact = { ...u(l.lyricCompact, c.lyricCompact), autoFit: l.lyricCompact?.autoFit !== !1 };
  const p = l.playlist || {}, d = c.playlist;
  d.theme = Ss.includes(p.theme) ? p.theme : "glass", d.foreground = hs(p.foreground, d.foreground), d.accent = hs(p.accent, d.accent), d.background = hs(p.background, d.background), d.opacity = yn(p.opacity, d.opacity, 0, 1), d.radius = yn(p.radius, d.radius, 0, 80), d.font = ["system", "geist", "serif", "mono"].includes(p.font) ? p.font : "system", d.limit = Math.round(yn(p.limit, 8, 1, 20)), d.listMode = ["all", "upcoming", "history"].includes(p.listMode) ? p.listMode : "all", d.numbering = p.numbering !== !1, d.progress = p.progress !== !1, d.hideIdle = p.hideIdle === !0, d.layout = p.layout === "unified" ? "unified" : "separate", d.group = u(p.group, d.group), d.autoScroll = p.autoScroll === !0, d.scrollSpeed = yn(p.scrollSpeed, 24, 8, 80), d.scrollPause = yn(p.scrollPause, 2, 0, 10);
  for (const y of ["current", "list", "next"]) {
    const m = p.blocks?.[y] || {}, g = d.blocks[y];
    d.blocks[y] = { ...u(m, g), size: yn(m.size, g.size, 12, 96), label: String(m.label ?? g.label).slice(0, 80), align: ["left", "center", "right"].includes(m.align) ? m.align : "left", bold: m.bold === !0 };
  }
  return c;
}
const vs = (a, c) => Object.assign(a.style, { left: c.x + "px", top: c.y + "px", width: c.w + "px", height: c.h + "px" });
let Wc, ks = "", Jc;
document.fonts?.addEventListener("loadingdone", () => {
  ks = "";
});
function Uf(a, c) {
  if (!Lo(c)) return a.lyric;
  const l = a.lyricCompact;
  if (!l.autoFit) return l;
  const [u, ...p] = String(c.googleFont || "").split(":"), d = p.join(":"), y = u && (!d || /^[\w;@_-]+$/.test(d)) ? "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(u).replace(/%20/g, "+") + (d ? ":" + d : "") + "&display=swap" : "", m = document.getElementById("manokara-measure-font");
  if (y) {
    if (!m || m.getAttribute("href") !== y) {
      const M = m || document.createElement("link");
      M.id = "manokara-measure-font", M.rel = "stylesheet", M.href = y, m || document.head.append(M);
    }
  } else m?.remove();
  const g = Math.max(24, Math.min(160, Number(c.size) || 64)), L = JSON.stringify([a.width, a.height, c.lrc, c.romajiLrc, c.title, c.font, c.googleFont, c.bold, g]);
  if (L !== ks) {
    let X = function(le, Z) {
      M.font = k + " " + g * Z + "px " + O;
      let V = 1, J = 0;
      for (const B of le.split(/(\s+)/)) {
        const G = M.measureText(B).width;
        J && J + G > _ && (V++, J = 0), G > _ ? (V += Math.ceil(G / _) - 1, J = G % _) : J += G;
      }
      return V;
    };
    ks = L, Wc ??= document.createElement("canvas");
    const M = Wc.getContext("2d"), O = c.font || 'system-ui,"Yu Gothic",sans-serif', k = c.bold === !1 ? 400 : 800, v = ManokaraCore.parseLyrics(c.lrc || "", c.duration).lines.map((le) => le.x).filter(Boolean);
    v.length || v.push(c.title || "Your song, your stage");
    const C = ManokaraCore.parseLyrics(c.romajiLrc || "", c.duration).lines.map((le) => le.x).filter(Boolean), T = Math.ceil(g * 0.65), A = Math.max(80, a.width * 0.92 - T * 2);
    M.font = k + " " + g + "px " + O;
    const Q = Math.max(...v.map((le) => M.measureText(le).width), ...C.map((le) => M.measureText(le).width * 0.48)), I = Math.min(a.width, Math.max(160, Math.min(A, Q) + T * 2)), _ = Math.max(1, I - T * 2), q = Math.max(...v.map((le) => X(le, 1))), ee = v.length > 1 ? Math.max(...v.map((le) => X(le, 0.55))) : 0, se = C.length ? Math.max(...C.map((le) => X(le, 0.48))) : 0, W = Math.min(a.height, Math.max(96, Math.ceil(T * 2 + g * 1.15 * (q + ee * 0.55 + se * 0.48) + g * 0.4 * ((ee ? 1 : 0) + (se ? 1 : 0)))));
    Jc = { w: I, h: W };
  }
  const { w: N, h: E } = Jc;
  return { ...l, w: N, h: E, x: Math.max(0, Math.min(a.width - N, l.x + (l.w - N) / 2)), y: Math.max(0, Math.min(a.height - E, l.y + l.h - E)) };
}
function Kf(a, c, l) {
  const u = Math.min(c.clientWidth / l.width, c.clientHeight / l.height) || 1;
  return Object.assign(a.style, { width: l.width + "px", height: l.height + "px", transform: "scale(" + u + ")", left: (c.clientWidth - l.width * u) / 2 + "px", top: (c.clientHeight - l.height * u) / 2 + "px" }), u;
}
const Vf = { system: 'system-ui,"Yu Gothic",sans-serif', geist: '"Geist Variable",system-ui,sans-serif', serif: 'Georgia,"Yu Mincho",serif', mono: '"Cascadia Code",Consolas,monospace' };
function Hf(a) {
  const c = document.createElement("div");
  c.className = "playlist-output", a.appendChild(c);
  const l = document.createElement("div");
  l.className = "playlist-group", c.append(l);
  const u = {};
  let p = "", d = "", y = "", m = Ro(), g = {}, L, N, E, M = !0, O, k = "";
  const v = matchMedia("(prefers-reduced-motion: reduce)");
  for (const ee of ["current", "list", "next"]) {
    const se = document.createElement("section");
    se.className = "playlist-block", se.dataset.block = ee;
    const W = document.createElement("h2"), le = document.createElement("div");
    le.className = "playlist-content", se.append(W, le), c.append(se), u[ee] = { node: se, heading: W, content: le };
  }
  const C = (ee, se, W) => {
    const le = document.createElement(ee);
    return le.textContent = se, W && (le.className = W), le;
  }, T = document.createElement("div");
  T.className = "playlist-list-track", u.list.content.append(T);
  function A(ee) {
    const se = ee.playlist, W = se.layout === "unified";
    if (c.dataset.layout = se.layout, l.hidden = !W, W) {
      Object.assign(l.style, { left: se.group.x + "px", top: se.group.y + "px", width: "640px", height: "840px", transform: "scale(" + se.group.w / 640 + "," + se.group.h / 840 + ")" });
      const le = ["current", "list", "next"].filter((B) => se.blocks[B].visible);
      let Z = 0;
      const V = { current: 280, next: 160 }, J = le.reduce((B, G) => B + (V[G] || 0), 0);
      for (const B of ["current", "list", "next"]) {
        const G = u[B].node;
        G.parentElement !== l && l.append(G);
        const H = B === "list" ? 840 - J : B === "current" && !le.includes("list") ? 840 - (le.includes("next") ? 160 : 0) : V[B];
        vs(G, { x: 0, y: Z, w: 640, h: le.length === 1 ? 840 : H }), se.blocks[B].visible && (Z += le.length === 1 ? 840 : H);
      }
    } else for (const [le, { node: Z }] of Object.entries(u))
      Z.parentElement !== c && c.append(Z), vs(Z, se.blocks[le]);
  }
  function Q() {
    O?.cancel(), O = null, k = "", T.style.transform = "";
  }
  function I() {
    const { node: ee, heading: se, content: W } = u.list;
    if (ee.hidden) {
      M = !1;
      return;
    }
    if (!ee.clientHeight) return;
    W.style.fontSize = "", W.style.height = "";
    const le = getComputedStyle(ee), Z = getComputedStyle(se), V = ee.clientHeight - parseFloat(le.paddingTop) - parseFloat(le.paddingBottom) - se.offsetHeight - parseFloat(Z.marginBottom);
    if (m.playlist.autoScroll && !v.matches) {
      W.style.height = Math.max(0, V) + "px", W.dataset.scroll = "true";
      const J = Math.max(0, T.scrollHeight - Math.max(0, V));
      if (J > 1) {
        const B = m.playlist, G = JSON.stringify([J, B.scrollSpeed, B.scrollPause]);
        if (G !== k) {
          const H = O ? (O.currentTime || 0) / O.effect.getTiming().duration % 1 : 0;
          Q(), k = G;
          const w = J / B.scrollSpeed, j = B.scrollPause, Y = 2 * (w + j), S = "translateY(-" + J + "px)";
          O = T.animate([{ transform: "translateY(0)", offset: 0 }, { transform: "translateY(0)", offset: j / Y }, { transform: S, offset: (j + w) / Y }, { transform: S, offset: (2 * j + w) / Y }, { transform: "translateY(0)", offset: 1 }], { duration: Y * 1e3, iterations: 1 / 0, easing: "linear" }), O.currentTime = H * Y * 1e3;
        }
      } else Q();
    } else {
      delete W.dataset.scroll, Q();
      let J = parseFloat(getComputedStyle(ee).fontSize);
      for (let B = 0; B < 2 && V > 0 && W.scrollHeight > V && J > 12; B++)
        J = Math.max(12, J * V / W.scrollHeight * 0.97), W.style.fontSize = J + "px";
    }
    M = !1;
  }
  function _(ee, se) {
    m = Xr(ee), g = se || {};
    const W = m.playlist, le = JSON.stringify(W);
    if (le !== p) {
      p = le, M = !0, c.dataset.theme = W.theme, c.style.color = W.foreground, c.style.fontFamily = Vf[W.font], c.style.setProperty("--playlist-accent", W.accent), c.style.setProperty("--playlist-surface", W.background + Math.round(W.opacity * 255).toString(16).padStart(2, "0")), c.style.setProperty("--playlist-radius", W.radius + "px"), A(m);
      for (const [S, { node: F, heading: fe }] of Object.entries(u)) {
        const be = W.blocks[S], Pe = W.layout === "unified" ? Math.min(m.width / 1920, m.height / 1080) : 1;
        F.style.fontSize = be.size / Pe + "px", F.style.textAlign = be.align, F.style.fontWeight = be.bold ? "700" : "400", F.dataset.bold = String(be.bold), fe.textContent = be.label;
      }
    }
    const Z = !!g.now;
    c.hidden = W.hideIdle && !Z || W.layout === "unified" && (!W.group.visible || !Object.values(W.blocks).some((S) => S.visible));
    for (const [S, { node: F }] of Object.entries(u)) F.hidden = !W.blocks[S].visible;
    c.dataset.playing = g.status === "playing" ? "true" : "false";
    const V = { playing: "●", paused: "Ⅱ", counting: "…", mc: "MC", ready: "○" }[g.status] || "○";
    E && E.textContent !== V && (E.textContent = V);
    const J = W.autoScroll && !v.matches, B = JSON.stringify([g.now, g.next, g.videoId, g.currentIndex, g.nextIndex, g.songs, g.history, W.theme, W.progress, W.numbering, W.listMode, W.limit, J]);
    if (B === d) {
      M && I();
      return;
    }
    d = B, M = !0;
    const G = u.current.content;
    if (G.replaceChildren(), L = null, N = null, E = null, ["card", "vinyl", "signal"].includes(W.theme)) {
      const S = document.createElement("div");
      S.className = "playlist-art";
      const F = C("div", "", "playlist-art-fallback");
      if (F.setAttribute("aria-hidden", "true"), F.append(C("span", "m", "playlist-art-monogram")), S.append(F), /^[\w-]{11}$/.test(g.videoId || "")) {
        const fe = document.createElement("img");
        fe.alt = "", fe.referrerPolicy = "no-referrer", fe.src = "https://i.ytimg.com/vi/" + g.videoId + "/mqdefault.jpg", fe.addEventListener("error", () => fe.remove(), { once: !0 }), S.append(fe);
      }
      G.append(S);
    }
    if (G.append(C("div", g.now || "—", "playlist-song-title")), Z && (E = C("small", V, "playlist-state"), G.append(E)), W.numbering && g.currentIndex >= 0 && G.append(C("small", String(g.currentIndex + 1).padStart(2, "0"), "playlist-position")), W.progress) {
      const S = C("div", "", "playlist-progress");
      L = C("i", ""), S.append(L), N = C("small", "", "playlist-time"), G.append(S, N);
    }
    let H = Array.isArray(g.songs) ? g.songs : [];
    W.listMode === "upcoming" && (H = H.filter((S) => S.index >= g.nextIndex && g.nextIndex >= 0)), W.listMode === "history" && (H = Array.isArray(g.history) ? g.history : []);
    let w = 0;
    if (W.listMode === "all") {
      const S = H.findIndex((F) => F.index === g.currentIndex);
      S >= W.limit && (w = Math.floor(S / W.limit) * W.limit);
    }
    const j = J ? H.slice(0, 120) : H.slice(w, w + W.limit), Y = JSON.stringify([j, W.numbering]);
    if (Y !== y) {
      y = Y, Q(), T.replaceChildren();
      for (const S of j) {
        const F = C("div", "", "playlist-list-row");
        F.dataset.index = String(S.index), W.numbering && F.append(C("span", String(S.index + 1).padStart(2, "0"), "playlist-index")), F.append(C("span", S.title, "playlist-list-title")), T.append(F);
      }
      T.childNodes.length || T.append(C("div", "—", "playlist-empty"));
    }
    for (const S of T.querySelectorAll(".playlist-list-row")) S.dataset.current = String(Number(S.dataset.index) === g.currentIndex && W.listMode !== "history");
    u.next.content.replaceChildren(C("div", g.next || "—", "playlist-song-title")), W.numbering && g.nextIndex >= 0 && u.next.content.append(C("span", String(g.nextIndex + 1).padStart(2, "0"), "playlist-next-number")), I();
  }
  function X(ee, se) {
    if (!L) return;
    const W = Math.max(0, Number(ee) || 0), le = Math.max(0, Number(se) || 0);
    L.style.transform = "scaleX(" + Math.min(1, le ? W / le : 0) + ")";
    const Z = (J) => Math.floor(J / 60) + ":" + String(Math.floor(J % 60)).padStart(2, "0"), V = Z(W) + (le ? " / " + Z(le) : "");
    N.textContent !== V && (N.textContent = V);
  }
  const q = () => {
    d = "", M = !0, _(m, g);
  };
  return v.addEventListener("change", q), { root: c, nodes: u, render: _, tick: X, place: A, destroy: () => {
    Q(), v.removeEventListener("change", q), c.remove();
  } };
}
window.ManokaraOverlay = { themes: Ss, defaults: Ro, normalize: Xr, clone: Rr, geometry: vs, fit: Kf, createPlaylist: Hf, compactLyrics: Lo, lyricRect: Uf };
const nr = (a, c, l) => Math.min(l, Math.max(c, a)), To = (a) => Number.isFinite(a) ? a : 0, Yf = Object.freeze(["nw", "n", "ne", "e", "se", "s", "sw", "w"]);
function Gc(a, c, l, u) {
  return {
    ...a,
    x: nr(a.x + To(c), 0, u.width - a.w),
    y: nr(a.y + To(l), 0, u.height - a.h)
  };
}
function Qc(a, c, l, u, p, d) {
  if (!Yf.includes(c)) return { ...a };
  l = To(l), u = To(u);
  const { x: y, y: m, w: g, h: L } = a, N = c.includes("w"), E = c.includes("e"), M = c.includes("n"), O = c.includes("s");
  if (p) {
    const A = N ? -1 : E ? 1 : 0, Q = M ? -1 : O ? 1 : 0, I = N ? y + g : E ? y : y + g / 2, _ = M ? m + L : O ? m : m + L / 2, X = 1 + (A && Q ? (A * l * g + Q * u * L) / (g * g + L * L) : A ? A * l / g : Q * u / L), q = N ? I : E ? d.width - I : 2 * Math.min(I, d.width - I), ee = M ? _ : O ? d.height - _ : 2 * Math.min(_, d.height - _), se = nr(X, Math.max(32 / g, 32 / L), Math.min(q / g, ee / L)), W = g * se, le = L * se;
    return {
      ...a,
      x: N ? I - W : E ? I : I - W / 2,
      y: M ? _ - le : O ? _ : _ - le / 2,
      w: W,
      h: le
    };
  }
  const k = y + g, v = m + L, C = N ? nr(y + l, 0, k - 32) : y, T = M ? nr(m + u, 0, v - 32) : m;
  return {
    ...a,
    x: C,
    y: T,
    w: (E ? nr(k + l, C + 32, d.width) : k) - C,
    h: (O ? nr(v + u, T + 32, d.height) : v) - T
  };
}
function $f(a, c, l, u, p) {
  if (!["w", "h"].includes(c) || !Number.isFinite(l)) return { ...a };
  if (!u) return { ...a, [c]: nr(l, 32, c === "w" ? p.width - a.x : p.height - a.y) };
  const d = nr(
    l / a[c],
    Math.max(32 / a.w, 32 / a.h),
    Math.min((p.width - a.x) / a.w, (p.height - a.y) / a.h)
  );
  return { ...a, w: a.w * d, h: a.h * d };
}
function sd(a, c, l) {
  const u = Rr(a), p = c / u.width, d = l / u.height;
  for (const y of [u.lyric, u.lyricCompact, u.playlist.group, ...Object.values(u.playlist.blocks)])
    y.x *= p, y.y *= d, y.w *= p, y.h *= d, y.size && (y.size *= Math.min(p, d));
  return u.width = c, u.height = l, Xr(u);
}
function Xc(a, c, l = !1) {
  const u = Rr(a), p = sd(Ro(c), u.width, u.height).playlist;
  for (const d of ["layout", "autoScroll", "scrollSpeed", "scrollPause"]) p[d] = u.playlist[d];
  return l || (p.group = Rr(u.playlist.group)), p.layout === "unified" && (p.blocks.list.visible = !0), u.playlist = p, Xr(u);
}
function qf(a = 30) {
  const c = [], l = [];
  function u(p, d) {
    p.push(d), p.length > a && p.shift();
  }
  return {
    record(p) {
      u(c, p), l.length = 0;
    },
    undo(p) {
      return c.length ? (u(l, p), c.pop()) : null;
    },
    redo(p) {
      return l.length ? (u(c, p), l.pop()) : null;
    },
    get canUndo() {
      return c.length > 0;
    },
    get canRedo() {
      return l.length > 0;
    }
  };
}
const fs = /* @__PURE__ */ new Set(["x", "y", "w", "h"]), Wf = /* @__PURE__ */ new Set(["size", "label", "align", "bold", "visible"]), Jf = /* @__PURE__ */ new Set([
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
function pa(a) {
  if (a && typeof a == "object" && !Object.isFrozen(a)) {
    Object.freeze(a);
    for (const c of Object.values(a)) pa(c);
  }
  return a;
}
function Gf({
  repository: a,
  preferences: c,
  getScene: l = () => ({}),
  measureLyrics: u = (y, m) => Lo(m) ? y.lyricCompact : y.lyric,
  platform: p = globalThis,
  now: d = () => performance.now()
} = {}) {
  const y = Pr(p, d), m = qf(), g = /* @__PURE__ */ new Set();
  let L;
  try {
    L = a?.load().value;
  } catch {
  }
  let N = pa(Xr(L)), E = N, M = JSON.stringify(N), O = "playlist", k = "current", v = !0, C = null;
  try {
    v = c?.get("aspectLock") !== "false";
  } catch {
  }
  let T = !1, A = null, Q, I;
  function _(w, j) {
    I = Object.freeze({
      document: N,
      target: O,
      selected: k,
      aspectLocked: v,
      serialized: M,
      dirty: T,
      saveError: A,
      canUndo: m.canUndo,
      canRedo: m.canRedo,
      dragging: !!C
    });
    for (const Y of g) Y(I, { kind: w, ...j });
  }
  function X() {
    return O === "playlist" && N.playlist.layout === "unified";
  }
  function q() {
    return Lo(l());
  }
  function ee(w = N, j = q()) {
    return O === "lyrics" ? j ? w.lyricCompact : w.lyric : w.playlist.layout === "unified" ? w.playlist.group : w.playlist.blocks[k];
  }
  function se() {
    const w = O === "lyrics" ? u(N, l()) : ee();
    return pa({ ...w });
  }
  function W() {
    return O === "lyrics" ? ee() : N.playlist.blocks[k];
  }
  function le(w) {
    const j = ee(w);
    return O === "lyrics" && q() && Object.assign(j, se(), { autoFit: !1 }), j;
  }
  function Z() {
    if (y.disposed) return !T;
    if (Q?.(), Q = null, !T) return !0;
    let w;
    try {
      w = a?.save(Rr(E));
    } catch (j) {
      w = { ok: !1, error: j };
    }
    return w?.ok ? (T = !1, A = null) : A = w?.error || new Error("Layout storage unavailable"), _("saved", { ok: !T }), !T;
  }
  function V(w, { record: j = !0, immediate: Y = !1 } = {}) {
    w = pa(Xr(w));
    const S = JSON.stringify(w);
    return N = w, S === M ? (_("view"), !1) : (j && m.record(M), E = N, M = S, T = !0, Q?.(), Q = y.timeout(Z, 250), _("document"), Y && Z(), !0);
  }
  function J() {
    return C ? (N = E, C = null, _("cancel"), !0) : !1;
  }
  function B(w, j) {
    if (y.disposed) return !1;
    J();
    const Y = Rr(N);
    return w(Y), V(Y, j);
  }
  function G(w) {
    !w || y.disposed || (J(), O = w.target === "lyrics" ? "lyrics" : "playlist", k = O === "lyrics" ? "lyric" : ["current", "list", "next"].includes(w.selected) ? w.selected : "current", _("view"));
  }
  function H(w, j, Y = "") {
    return !Number.isFinite(w) || !Number.isFinite(j) ? !1 : B((S) => {
      const F = se(), fe = le(S);
      Object.assign(fe, Y ? Qc(F, Y, w, j, v, S) : Gc(F, w, j, S)), O === "lyrics" && q() && (fe.autoFit = !1);
    });
  }
  return _("init"), {
    getSnapshot: () => I,
    subscribe(w) {
      return y.disposed ? () => {
      } : (g.add(w), () => g.delete(w));
    },
    get serialized() {
      return M;
    },
    get dragging() {
      return !!C;
    },
    unified: X,
    compact: q,
    displayRect: se,
    textRect: W,
    setTarget(w) {
      G({ target: w, selected: k });
    },
    select(w) {
      y.disposed || !["current", "list", "next", "lyric", "group"].includes(w) || O === "lyrics" != (w === "lyric") && w !== "group" || (J(), w !== "group" && (k = w), _("view"));
    },
    restoreView: G,
    setAspectLocked(w) {
      if (!y.disposed) {
        J(), v = !!w;
        try {
          c?.set("aspectLock", String(v));
        } catch {
        }
        _("view");
      }
    },
    setFrame(w) {
      const [j, Y] = String(w).split("x").map(Number);
      return !Number.isFinite(j) || !Number.isFinite(Y) || j < 320 || j > 3840 || Y < 240 || Y > 2160 ? !1 : B((S) => Object.assign(S, sd(S, j, Y)));
    },
    preset(w) {
      return B((j) => Object.assign(j, Xc(j, w)));
    },
    reset() {
      return B((w) => {
        O !== "lyrics" ? Object.assign(w, Xc(w, w.playlist.theme, !0)) : q() ? w.lyricCompact = {
          x: 0,
          y: w.height - Math.min(240, w.height),
          w: w.width,
          h: Math.min(240, w.height),
          visible: !0,
          autoFit: !0
        } : w.lyric = { x: 0, y: 0, w: w.width, h: w.height, visible: !0 };
      });
    },
    center(w) {
      return ["center", "top-center", "bottom-center"].includes(w) ? B((j) => {
        const Y = le(j);
        Y.x = (j.width - Y.w) / 2, Y.y = w === "top-center" ? 0 : w === "bottom-center" ? j.height - Y.h : (j.height - Y.h) / 2;
      }) : !1;
    },
    setLayout(w) {
      return B((j) => {
        if (j.playlist.layout = w, w === "unified") for (const Y of Object.values(j.playlist.blocks)) Y.visible = !0;
      });
    },
    setAutoFit(w) {
      return B((j) => Object.assign(j.lyricCompact, se(), { autoFit: !!w }));
    },
    setField(w, j) {
      return !fs.has(w) && !Wf.has(w) || (fs.has(w) || w === "size") && !Number.isFinite(j) ? !1 : B((Y) => {
        const S = fs.has(w) ? le(Y) : O === "lyrics" ? ee(Y) : Y.playlist.blocks[k];
        w === "w" || w === "h" ? Object.assign(S, $f(S, w, j, v, Y)) : S[w] = j;
      });
    },
    setAppearance(w, j) {
      return Jf.has(w) ? B((Y) => {
        Y.playlist[w] = j;
      }) : !1;
    },
    importLayout(w) {
      if (!w || w.version !== 1 || !w.playlist || !w.lyric) throw new Error("Invalid overlay layout");
      return B((j) => Object.assign(j, Xr(w)));
    },
    undo() {
      if (y.disposed) return !1;
      J();
      const w = m.undo(M);
      return w == null ? !1 : V(w, { record: !1, immediate: !0 });
    },
    redo() {
      if (y.disposed) return !1;
      J();
      const w = m.redo(M);
      return w == null ? !1 : V(w, { record: !1, immediate: !0 });
    },
    transform: H,
    beginGesture(w = "") {
      return y.disposed ? !1 : (J(), C = { rect: Rr(se()), direction: w, locked: v, compact: q() }, _("gesture"), !0);
    },
    moveGesture(w, j) {
      if (!C || y.disposed || !Number.isFinite(w) || !Number.isFinite(j)) return !1;
      if (C.compact !== q())
        return J(), !1;
      const Y = Rr(E);
      if (w || j) {
        const S = ee(Y, C.compact);
        Object.assign(S, C.direction ? Qc(C.rect, C.direction, w, j, C.locked, Y) : Gc(C.rect, w, j, Y)), O === "lyrics" && C.compact && (S.autoFit = !1);
      }
      return N = pa(Y), _("preview"), !0;
    },
    endGesture() {
      return !C || y.disposed ? !1 : C.compact !== q() ? (J(), !1) : (C = null, V(N, { immediate: !0 }));
    },
    cancelGesture: J,
    flush: Z,
    dispose() {
      y.disposed || (J(), Z(), y.dispose(), g.clear());
    }
  };
}
function Qf({
  model: a,
  element: c,
  scale: l,
  focus: u = () => {
  },
  platform: p = globalThis,
  now: d = () => performance.now()
}) {
  const y = Pr(p, d);
  let m = null, g = null, L = null;
  function N() {
    L?.(), L = null, g = null;
  }
  function E() {
    const v = m?.pointer;
    m = null, N(), v != null && c.hasPointerCapture(v) && c.releasePointerCapture(v);
  }
  function M() {
    L?.(), L = null;
    const v = g;
    g = null, m && v && a.moveGesture((v.x - m.x) / m.scale, (v.y - m.y) / m.scale);
  }
  function O() {
    E(), a.cancelGesture();
  }
  const k = a.subscribe((v) => {
    m && !v.dragging && E();
  });
  return {
    get active() {
      return !!m;
    },
    start(v) {
      const C = v.target.closest("[data-hit]");
      if (!C || v.button !== 0 || y.disposed) return;
      const T = l();
      if (!(T > 0)) return;
      v.preventDefault(), O(), a.select(C.dataset.hit);
      const A = v.target.closest("[data-resize]")?.dataset.resize || "";
      if (a.beginGesture(A)) {
        m = { pointer: v.pointerId, x: v.clientX, y: v.clientY, scale: T };
        try {
          c.setPointerCapture(v.pointerId);
        } catch {
          O();
        }
      }
    },
    move(v) {
      !m || m.pointer !== v.pointerId || (g = { x: v.clientX, y: v.clientY }, L || (L = y.frame(M)));
    },
    end(v) {
      if (!(!m || m.pointer !== v.pointerId)) {
        if (v.type !== "pointerup") {
          O();
          return;
        }
        g = { x: v.clientX, y: v.clientY }, M(), E(), a.endGesture(), u();
      }
    },
    cancel: O,
    dispose() {
      O(), k(), y.dispose();
    }
  };
}
const Xf = (() => {
  const a = Pr(), c = ManokaraOverlay, l = Gf({
    repository: Ct.layout,
    preferences: Ct.preferences,
    getScene: fe,
    measureLyrics: (K, ce) => c.lyricRect(K, ce)
  });
  let u = l.getSnapshot().document, p, d, y, m, g, L, N = 1, E = "playlist", M = "current", O = "sample", k = "karaoke", v = null, C;
  const T = /* @__PURE__ */ new Set(), A = [], Q = [];
  let I = performance.now(), _ = "", X, q, ee = l.getSnapshot().aspectLocked;
  const se = {
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
  }, W = (K) => ManokaraI18n.language === "vi" && se[K] || K, le = (K) => Math.round(K * 1e3) / 1e3, Z = {
    current: "Now Singing",
    list: "Song List",
    next: "Next On",
    lyric: "Lyric viewport",
    group: "Whole playlist"
  };
  function V(K) {
    !d || a.disposed || (d.querySelector("#studioStatus").textContent = W(K));
  }
  function J() {
    l.flush();
  }
  function B() {
    return l.unified();
  }
  function G() {
    return l.compact();
  }
  function H() {
    return l.displayRect();
  }
  function w() {
    return l.textRect();
  }
  function j() {
    const K = k === "playlist" && E === "lyrics", ce = d.querySelector("#studioLyricControlHost");
    d.querySelector("#studioLyricSettings").hidden = !K;
    for (const {
      node: pe,
      marker: Re
    } of Q)
      K ? pe.parentElement !== ce && ce.append(pe) : pe.parentNode !== Re.parentNode && Re.before(pe);
  }
  function Y(K) {
    d && (C?.cancel(), k = K === "playlist" ? "playlist" : "karaoke", document.getElementById("grid").hidden = k !== "karaoke", document.getElementById("playlistStudio").hidden = k !== "playlist", window.dispatchEvent(new CustomEvent("manokara:mainviewchange", {
      detail: k
    })), j(), k === "karaoke" ? (X?.open && X.close(), L?.remove(), L = null, _ = "") : Ee());
  }
  function S(K) {
    C?.cancel(), l.setTarget(K), window.dispatchEvent(new CustomEvent("manokara:overlaytargetchange", { detail: E }));
  }
  function F() {
    const K = (performance.now() - I) / 1e3 % 30, ce = ["I Really Want to Stay at Your House", "Open Arms", "夜に駆ける", "Một ngày bình yên", "Fly Me to the Moon", "Plastic Love", "Có em", "Pretender", "City of Stars", "Lemon", "Chúng ta của hiện tại", "Stay with Me"];
    return {
      ...v,
      ready: !0,
      title: ce[0],
      effect: v?.effect || "clean",
      lrc: v?.effect === "karaoke-classic" ? `[00:00.00]<00:00.00>Người <00:00.65>hỏi <00:01.20>anh <00:01.85>rằng <00:02.70>vì <00:03.35>sao <00:04.05>trời <00:04.85>lại <00:05.65>mưa<00:07.60>
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
      time: K,
      sampledAt: Date.now(),
      duration: 30,
      playing: !0,
      paused: !1,
      counting: !1,
      mc: !1,
      playlistTime: K,
      timelineVersion: 1,
      playlist: JSON.stringify({
        now: ce[0],
        next: ce[1],
        status: "playing",
        videoId: "",
        currentIndex: 0,
        nextIndex: 1,
        songs: ce.map((pe, Re) => ({
          title: pe,
          index: Re
        })),
        history: [{
          title: "Last song of the evening",
          index: 4
        }]
      })
    };
  }
  function fe() {
    return O === "sample" ? F() : v || {
      ready: !1
    };
  }
  function be() {
    if (!y) return;
    const K = m.parentElement, ce = K.clientWidth, pe = K.clientHeight;
    if (!ce || !pe) return;
    const Re = Math.min(ce / u.width, pe / u.height);
    m.style.width = u.width * Re + "px", m.style.height = u.height * Re + "px", m.style.aspectRatio = u.width + " / " + u.height, N = c.fit(y, m, u), y.style.setProperty("--studio-handle-scale", String(1 / N)), Pe();
  }
  function Pe() {
    for (const K of A) {
      const {
        host: ce,
        stage: pe,
        bounds: Re,
        crop: _e
      } = K;
      if (!ce.clientWidth || !ce.clientHeight) continue;
      const Ce = (_e ? Math.max : Math.min)((ce.clientWidth - 16) / Re.w, (ce.clientHeight - 12) / Re.h);
      Object.assign(pe.style, {
        transform: "scale(" + Ce + ")",
        left: (ce.clientWidth - Re.w * Ce) / 2 - Re.x * Ce + "px",
        top: (ce.clientHeight - Re.h * Ce) / 2 - Re.y * Ce + "px"
      });
    }
  }
  function Be() {
    for (const K of c.themes) {
      const ce = d.querySelector('[data-theme-preview="' + K + '"]'), pe = document.createElement("div");
      pe.className = "preset-canvas", ce.append(pe);
      const Re = c.defaults(K), _e = c.createPlaylist(pe);
      _e.render(Re, {
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
      }), _e.tick(74, 210);
      for (const Ke of ["list", "next"]) _e.nodes[Ke].node.hidden = !0;
      const Ce = [Re.playlist.blocks.current], he = Math.min(...Ce.map((Ke) => Ke.x)), Me = Math.min(...Ce.map((Ke) => Ke.y)), ge = {
        x: he,
        y: Me,
        w: Math.max(...Ce.map((Ke) => Ke.x + Ke.w)) - he,
        h: Math.max(...Ce.map((Ke) => Ke.y + Ke.h)) - Me
      };
      K === "card" && (ge.x += 20, ge.y += 20, ge.w -= 40, ge.h = 280), A.push({
        host: ce,
        stage: pe,
        renderer: _e,
        bounds: ge,
        crop: K === "card"
      });
    }
  }
  function je() {
    if (X.open) {
      X.close();
      return;
    }
    const K = d.querySelector(".studio-preview-pane");
    X.append(K), X.showModal();
    const ce = K.querySelector('[data-action="expand"]'), pe = ce.querySelector("[data-studio-copy]");
    pe.dataset.studioCopy = "Close preview", pe.textContent = W("Close preview"), ce.setAttribute("aria-expanded", "true"), ce.focus(), be();
  }
  function me(K) {
    if (K && !L ? (L = document.createElement("iframe"), L.className = "studio-lyric-preview", L.title = W("Lyrics overlay"), L.allow = "autoplay", L.src = "./manokara-lyrics-view.html?preview=1", y.insertBefore(L, y.firstChild)) : !K && L && (L.remove(), L = null, _ = ""), L) {
      const ce = c.lyricRect(u, fe());
      c.geometry(L, ce), L.hidden = !ce.visible;
    }
  }
  function Oe() {
    if (k !== "playlist") return;
    const K = fe();
    let ce = {};
    try {
      ce = JSON.parse(K.playlist || "{}");
    } catch {
    }
    g.render(u, ce), g.tick(K.playlistTime || 0, K.duration);
    const pe = d.querySelector("#studioEmpty");
    let Re = "";
    E === "lyrics" && (H().visible ? !K.counting && !K.mc && (K.ready === !1 || !K.title ? Re = "No song is playing. Choose Sample data to arrange the lyrics." : K.lrc?.trim() || (Re = "This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.")) : Re = "This lyric block is hidden. Turn on Show this block to preview.");
    const _e = W(Re);
    if (pe.textContent !== _e && (pe.textContent = _e), pe.hidden = !Re, L) {
      const Ce = c.lyricRect(u, K);
      c.geometry(L, Ce), L.hidden = !Ce.visible;
      const he = y.querySelector('[data-hit="lyric"]');
      if (he && !C?.active && c.geometry(he, Ce), E === "lyrics" && !C?.active) {
        for (const [Ke, $e] of [["x", "studioX"], ["y", "studioY"], ["w", "studioW"], ["h", "studioH"]]) {
          const We = d.querySelector("#" + $e);
          document.activeElement !== We && (We.value = le(Ce[Ke]));
        }
        const ge = Ce.w / Ce.h;
        d.querySelector("#studioAspectRatio").textContent = Math.abs(ge - 16 / 9) < 1e-5 ? "16:9" : Math.abs(ge - 9 / 16) < 1e-5 ? "9:16" : Math.abs(ge - 1) < 1e-5 ? "1:1" : ge.toFixed(2) + ":1";
      }
      const Me = JSON.stringify([K.lrc, K.romajiLrc, K.effect, K.title, K.playing, K.paused, K.time, K.sampledAt, K.centerFree, K.colorTheme, K.themeSeed, K.foreground, K.size, K.font, K.bold]);
      if (Me !== _) {
        _ = Me;
        for (const ge of T) ge(K);
      }
    }
  }
  function Ee() {
    if (!d) return;
    const K = u.playlist, ce = H(), pe = w();
    j(), d.querySelectorAll("[data-target]").forEach((ge) => ge.setAttribute("aria-pressed", String(ge.dataset.target === E))), d.querySelector("#studioLayoutSection").hidden = E === "lyrics", d.querySelector("#studioGroupNote").hidden = !B(), d.querySelector("#studioPresets").hidden = E === "lyrics", d.querySelector("#playlistAppearance").hidden = E === "lyrics", d.querySelector("#blockTypography").hidden = E === "lyrics", d.querySelector("#studioCompactSettings").hidden = E !== "lyrics", d.querySelector("#studioAutoFitField").hidden = !G(), d.querySelector("#studioAutoFitNote").hidden = !G(), d.querySelector("#studioAutoFit").checked = u.lyricCompact.autoFit;
    const Re = {
      studioX: le(ce.x),
      studioY: le(ce.y),
      studioW: le(ce.w),
      studioH: le(ce.h),
      studioSize: pe.size || 64,
      studioLabel: pe.label || "",
      studioAlign: pe.align || "left",
      studioFg: K.foreground,
      studioAccent: K.accent,
      studioBg: K.background,
      studioOpacity: K.opacity,
      studioRadius: K.radius,
      studioFont: K.font,
      studioLimit: K.limit,
      studioListMode: K.listMode,
      studioFrame: u.width + "x" + u.height,
      studioLayout: K.layout,
      studioScrollSpeed: K.scrollSpeed,
      studioScrollPause: K.scrollPause
    };
    for (const [ge, Ke] of Object.entries(Re)) {
      const $e = d.querySelector("#" + ge);
      document.activeElement !== $e && ($e.value = Ke);
    }
    d.querySelector("#studioVisible").checked = pe.visible, d.querySelector("#studioBold").checked = !!pe.bold, d.querySelector("#studioAutoScroll").checked = K.autoScroll, d.querySelector("#studioScrollSettings").hidden = !K.autoScroll, d.querySelector("#studioLimit").disabled = K.autoScroll, d.querySelector("#studioNumbering").checked = K.numbering, d.querySelector("#studioProgress").checked = K.progress, d.querySelector("#studioHideIdle").checked = K.hideIdle, d.querySelector("#studioAspectLock").checked = ee;
    const _e = ce.w / ce.h;
    d.querySelector("#studioAspectRatio").textContent = Math.abs(_e - 16 / 9) < 1e-5 ? "16:9" : Math.abs(_e - 9 / 16) < 1e-5 ? "9:16" : Math.abs(_e - 1) < 1e-5 ? "1:1" : _e.toFixed(2) + ":1", d.querySelectorAll("[data-theme-preset]").forEach((ge) => ge.setAttribute("aria-pressed", String(ge.dataset.themePreset === K.theme))), d.querySelector('[data-action="undo"]').disabled = !l.getSnapshot().canUndo, d.querySelector('[data-action="redo"]').disabled = !l.getSnapshot().canRedo, g.root.style.display = E === "lyrics" && !d.querySelector("#studioBoth").checked ? "none" : "", y.querySelectorAll(".studio-hit").forEach((ge) => ge.remove());
    const Ce = E === "lyrics" ? ["lyric"] : B() ? ["group"] : ["current", "list", "next"];
    for (const ge of Ce) {
      const Ke = ge === "lyric" ? ce : ge === "group" ? K.group : K.blocks[ge];
      if (!Ke.visible) continue;
      const $e = document.createElement("div");
      $e.className = "studio-hit", $e.dataset.hit = ge, $e.tabIndex = 0, $e.setAttribute("role", "group"), $e.setAttribute("aria-label", W(Z[ge])), $e.dataset.selected = String(ge === "group" || ge === M), c.geometry($e, Ke), $e.style.zIndex = "40";
      const We = document.createElement("span");
      if (We.className = "studio-hit-label", We.textContent = W(Z[ge]), $e.append(We), ge === "group" || ge === M)
        for (const [on, Xt] of Object.entries({
          nw: "top left",
          n: "top",
          ne: "top right",
          e: "right",
          se: "bottom right",
          s: "bottom",
          sw: "bottom left",
          w: "left"
        })) {
          const Bt = document.createElement("button");
          Bt.type = "button", Bt.className = "studio-resize", Bt.dataset.resize = on, Bt.setAttribute("aria-label", W("Resize " + Xt)), $e.append(Bt);
        }
      y.append($e);
    }
    const he = d.querySelector("#studioBoth").checked;
    me(k === "playlist" && (E === "lyrics" || he)), d.querySelector("#studioSourceSize").textContent = u.width + " × " + u.height;
    const Me = u.width / u.height;
    d.querySelector("#studioFrameBadge").textContent = u.width + " × " + u.height + " · " + (Math.abs(Me - 16 / 9) < 1e-3 ? "16:9" : Math.abs(Me - 9 / 16) < 1e-3 ? "9:16" : u.width + ":" + u.height), d.querySelector("#studioObsUrl").value = p.url(E === "lyrics" ? "lyrics" : "playlist") || W("Connecting…"), be(), Oe(), window.dispatchEvent(new CustomEvent("manokara:studioviewchange", {
      detail: {
        target: E,
        selected: M
      }
    }));
  }
  function Fe() {
    const K = H(), ce = y.querySelector('[data-hit="' + (B() ? "group" : M) + '"]');
    ce && c.geometry(ce, K), M === "lyric" && L ? c.geometry(L, K) : B() ? g.place(u) : g.nodes[M] && c.geometry(g.nodes[M].node, K);
    for (const [pe, Re] of [["x", "studioX"], ["y", "studioY"], ["w", "studioW"], ["h", "studioH"]]) d.querySelector("#" + Re).value = le(K[pe]);
  }
  function Nt(K) {
    if (d || a.disposed) return;
    p = K, d = document.getElementById("playlistStudio");
    const ce = document.getElementById("obsLyricSettingsReactRoot");
    if (ce) {
      const Ce = document.createComment("lyric-settings-home");
      ce.after(Ce), Q.push({
        node: ce,
        marker: Ce
      });
    }
    y = d.querySelector("#studioCanvas"), m = d.querySelector("#studioPreview"), g = c.createPlaylist(y), Be(), C = Qf({
      model: l,
      element: m,
      scale: () => N,
      focus: () => y.querySelector('[data-hit="' + (B() ? "group" : M) + '"]')?.focus({ preventScroll: !0 })
    }), a.own(l.subscribe((Ce, he) => {
      ({ document: u, target: E, selected: M, aspectLocked: ee } = Ce), he.kind === "saved" ? V(he.ok ? "Changes saved in this browser." : "Storage unavailable. Layout remains in this window.") : he.kind === "preview" ? Fe() : (Ee(), he.kind === "document" && p.changed());
    })), X = document.createElement("dialog"), X.className = "studio-large-preview", X.setAttribute("aria-labelledby", "studioPreviewTitle"), d.append(X), a.listen(X, "close", () => {
      const Ce = X.querySelector(".studio-preview-pane");
      if (!Ce) return;
      d.querySelector(".studio-body").append(Ce);
      const he = Ce.querySelector('[data-action="expand"]'), Me = he.querySelector("[data-studio-copy]");
      Me.dataset.studioCopy = "View larger", Me.textContent = W("View larger"), he.setAttribute("aria-expanded", "false"), be(), k === "playlist" && he.focus({
        preventScroll: !0
      });
    }), window.ManokaraPreview = q = {
      getSnapshot: fe,
      subscribe(Ce) {
        return a.disposed ? () => {
        } : (T.add(Ce), Ce(fe()), () => T.delete(Ce));
      }
    }, a.listen(d, "click", async (Ce) => {
      const he = Ce.target.closest("button");
      if (!he) return;
      if (he.dataset.target) {
        S(he.dataset.target);
        return;
      }
      if (he.dataset.select) {
        l.select(he.dataset.select);
        return;
      }
      if (he.dataset.themePreset) {
        l.preset(he.dataset.themePreset);
        return;
      }
      const Me = he.dataset.action;
      if (Me === "expand") {
        je();
        return;
      }
      if (["center", "top-center", "bottom-center"].includes(Me) && l.center(Me), Me === "reset" && l.reset(), Me === "undo" && l.undo(), Me === "redo" && l.redo(), Me === "copy") {
        const ge = p.url(E === "lyrics" ? "lyrics" : "playlist");
        if (!ge) return;
        try {
          await navigator.clipboard.writeText(ge), V("OBS link copied.");
        } catch {
          if (!d || a.disposed) return;
          d.querySelector("#studioObsUrl").select(), V("Select and copy the link.");
        }
      }
      if (Me === "open") {
        const ge = p.url(E === "lyrics" ? "lyrics" : "playlist");
        if (ge) {
          const Ke = new URL(ge);
          Ke.searchParams.set("popup", "1"), window.open(Ke.href, "manokara-" + E, "width=1280,height=720");
        }
      }
      if (Me === "history" && confirm(W("Clear the sung history for this session?")) && (p.clearHistory(), Oe()), Me === "export") {
        const ge = new Blob([JSON.stringify(u, null, 2)], {
          type: "application/json"
        }), Ke = URL.createObjectURL(ge), $e = document.createElement("a");
        $e.href = Ke, $e.download = "manokara-overlay.json", $e.click();
        const We = a.own(() => URL.revokeObjectURL(Ke));
        a.timeout(We, 1e3);
      }
      Me === "import" && d.querySelector("#studioImport").click();
    });
    const pe = {
      studioX: "x",
      studioY: "y",
      studioW: "w",
      studioH: "h",
      studioSize: "size",
      studioLabel: "label",
      studioAlign: "align",
      studioVisible: "visible",
      studioBold: "bold"
    }, Re = {
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
    a.listen(d, "change", async (Ce) => {
      const he = Ce.target;
      if (he.id === "studioAutoFit") {
        l.setAutoFit(he.checked);
        return;
      }
      if (he.id === "studioLayout") {
        l.setLayout(he.value);
        return;
      }
      if (he.id === "studioFrame") {
        l.setFrame(he.value);
        return;
      }
      if (he.id === "studioData") {
        C.cancel(), O = he.value, I = performance.now(), _ = "", Ee();
        return;
      }
      if (he.id === "studioBgView") {
        m.dataset.bg = he.value;
        return;
      }
      if (he.id === "studioBoth") {
        Ee();
        return;
      }
      if (he.id === "studioAspectLock") {
        l.setAspectLocked(he.checked);
        return;
      }
      if (he.id === "studioImport") {
        try {
          const Me = he.files?.[0];
          if (!Me) return;
          if (Me.size > 16e3) throw Error();
          const ge = JSON.parse(await Me.text());
          if (a.disposed) return;
          l.importLayout(ge), V("Layout imported.");
        } catch {
          V("Could not import this layout.");
        } finally {
          he.value = "";
        }
        return;
      }
      if (pe[he.id] || Re[he.id]) {
        if (he.type === "number" && (!he.value || !he.checkValidity())) {
          Ee();
          return;
        }
        const Me = he.type === "checkbox" ? he.checked : he.type === "number" ? Number(he.value) : he.value;
        pe[he.id] ? l.setField(pe[he.id], Me) : l.setAppearance(Re[he.id], Me), ["studioX", "studioY", "studioW", "studioH"].includes(he.id) && (he.value = le(H()[pe[he.id]]));
      }
    }), a.listen(m, "pointerdown", C.start), a.listen(m, "pointermove", C.move), a.listen(m, "pointerup", C.end), a.listen(m, "pointercancel", C.end), a.listen(m, "lostpointercapture", C.end), a.listen(m, "keydown", (Ce) => {
      const he = Ce.target.closest("[data-hit]");
      if (!he || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(Ce.key)) return;
      Ce.preventDefault(), l.select(he.dataset.hit);
      const Me = Ce.shiftKey ? 10 : 1, ge = {
        ArrowLeft: -Me,
        ArrowRight: Me
      }[Ce.key] || 0, Ke = {
        ArrowUp: -Me,
        ArrowDown: Me
      }[Ce.key] || 0, $e = Ce.target.closest("[data-resize]")?.dataset.resize;
      l.transform(ge, Ke, $e);
      const We = y.querySelector('[data-hit="' + (B() ? "group" : M) + '"]');
      ($e ? We?.querySelector('[data-resize="' + $e + '"]') : We)?.focus({
        preventScroll: !0
      });
    });
    const _e = new ResizeObserver(be);
    _e.observe(m.parentElement), a.own(() => _e.disconnect()), a.listen(window, "pagehide", () => {
      C.cancel(), J();
    }), a.listen(window, "manokara:languagechange", Ee), a.listen(document.getElementById("editLyricLayout"), "click", () => {
      Y("playlist"), S("lyrics");
    }), Ee(), a.interval(() => {
      O === "sample" && Oe();
    }, 100);
  }
  return {
    init: Nt,
    showMain: Y,
    showTarget: S,
    text: W,
    get main() {
      return k;
    },
    get view() {
      return {
        target: E,
        selected: M
      };
    },
    restoreView(K) {
      C?.cancel(), l.restoreView(K);
    },
    get serialized() {
      return l.serialized;
    },
    feed(K) {
      const ce = G();
      v = K, ce !== G() && C?.cancel(), d && k === "playlist" && !document.getElementById("playlistStudio")?.hidden && (ce !== G() ? Ee() : O === "live" && Oe());
    },
    refresh: Ee,
    dispose() {
      if (!a.disposed) {
        C?.dispose(), l.dispose(), a.dispose(), T.clear(), window.ManokaraPreview === q && delete window.ManokaraPreview, g?.destroy();
        for (const K of A)
          K.renderer.destroy(), K.stage.remove();
        A.length = 0, L?.remove(), L = null, X?.open && X.close(), X?.remove(), d = null;
      }
    }
  };
})();
window.ManokaraStudio = Xf;
var bo = id();
function Zf(a = () => performance.now()) {
  let c = 0, l = null, u = 0, p = null, d = 0, y = 1;
  const m = () => c + (l == null ? 0 : Math.max(0, a() - l) / 1e3), g = () => Math.max(0, u - (p == null ? 0 : Math.max(0, a() - p) / 1e3));
  return {
    reset() {
      c = 0, l = null, u = 0, p = null, d++, y++;
    },
    start(L = 0) {
      c = Number(L) || 0, l = a();
    },
    pause() {
      c = m(), l = null, u = g(), p = null;
    },
    resume({ fallback: L = !0, countdown: N = !1 } = {}) {
      L && l == null && (l = a()), N && p == null && (p = a());
    },
    countdown(L) {
      u = Math.max(0, Number(L) || 0), p = a();
    },
    finishCountdown() {
      u = 0, p = null;
    },
    elapsed: m,
    remaining: g,
    seek() {
      d++, y++;
    },
    lyricsChanged() {
      y++;
    },
    get running() {
      return l != null;
    },
    get audioVersion() {
      return d;
    },
    get timelineVersion() {
      return y;
    }
  };
}
function ep(a, { delay: c = 0, rate: l = 1 } = {}) {
  return Math.max(0, (Number(a) || 0) - Math.max(0, Number(c) || 0) * Math.max(0.01, Number(l) || 1));
}
function tp(a, c, l = 0.8) {
  if (!a) return !1;
  const u = a.playing ? Math.max(0, c.now - a.now) / 1e3 * a.rate : 0;
  return Math.abs(c.position - a.position - u) > l;
}
function np({
  youtube: a,
  mediaAdapter: c,
  pitchFactory: l,
  captureFactory: u,
  lookup: p,
  youtubeId: d,
  origin: y,
  options: m = () => ({}),
  output: g = {},
  callbacks: L = {},
  platform: N = globalThis,
  now: E = () => performance.now()
}) {
  const M = Pr(N, E), O = Zf(E);
  let k = Pr(N, E), v = null, C = "", T = !1, A = null, Q = null, I = null, _ = null, X = 0, q = null, ee = !1, se = 0, W = !1, le = null, Z = !1, V = 0, J = "Play a song to change its key.", B = "", G = !1, H = 0, w = null, j = !1, Y = !1, S = !1, F = null, fe = null;
  const be = /* @__PURE__ */ new Set(), Pe = (ae) => g.text?.(ae) ?? ae, Be = (ae) => g.format?.(ae) ?? String(ae), je = (ae) => {
    !M.disposed && !M.suspended && g.message?.(ae);
  }, me = (ae) => !M.disposed && ae === se, Oe = (ae, ve) => me(ae) && ve === V && !M.suspended, Ee = l.create((ae) => {
    M.disposed || (v && !v.mc && (v.pitch = 0, L.persist?.(v), L.render?.()), J = ae, pe("error"));
  }), Fe = u({
    getState: () => ({
      key: v && !v.mc ? fa(v.pitch) : 0,
      title: v?.title || "",
      language: m().language || "en",
      enabled: !!v && !v.mc && !T && (C === "yt" ? ee : C === "media" ? !!_ : !!d(v.url)),
      sequence: se,
      version: O.audioVersion
    }),
    onStatus(ae) {
      M.disposed || (ae.active && Ee.element && Ee.set(0).catch(() => {
      }), (G !== ae.active || Math.abs(H - ae.delay) > 5e-3) && O.lyricsChanged(), G = ae.active, H = ae.delay, J = ae.active ? v?.pitch ? "Key applied. Saved for this song." : "Original key." : ae.message || "Tab Audio stopped. The player is using its original sound.", pe(ae.error ? "error" : ""), ae.message && je(J));
    }
  });
  function Nt() {
    if (!j || M.disposed || M.suspended) return;
    const ae = ce();
    L.changed?.(ae);
    for (const ve of be) ve(ae);
  }
  function K() {
    try {
      return C === "yt" ? Number(q?.getPlaybackRate?.()) || 1 : C === "media" && _?.playbackRate || 1;
    } catch {
      return 1;
    }
  }
  function ce() {
    return Object.freeze({
      mode: C,
      counting: T,
      paused: W,
      duration: I,
      ready: ee,
      lookupPending: !!le,
      pitchBusy: Z,
      pitchMessage: J,
      pitchStatusState: B,
      countdownRemaining: T ? O.remaining() : 0,
      position: Kt(),
      audiblePosition: Vt(),
      playing: Ke(),
      sequence: se,
      timelineVersion: O.timelineVersion,
      audioVersion: O.audioVersion,
      captureActive: Fe.active,
      captureBusy: Fe.busy,
      captureDelay: Fe.delay,
      started: j,
      disposed: M.disposed,
      suspended: M.suspended,
      timers: k.timerCount,
      activeTimers: k.activeTimerCount,
      listeners: k.cleanupCount
    });
  }
  function pe(ae = null) {
    ae !== null && (B = ae), Nt(), Fe.sync();
  }
  function Re() {
    Nt(), Fe.sync();
  }
  function _e(ae) {
    T && W !== ae && (ae ? O.pause() : O.resume({
      fallback: !1,
      countdown: !0
    })), W = ae, Re();
  }
  function Ce() {
    g.countdown?.({
      visible: !!T && !!v,
      title: v?.title || "",
      remaining: T ? O.remaining() : 0
    });
  }
  function he(ae) {
    !M.disposed && !M.suspended && g.time?.(ae);
  }
  function Me() {
    Y || M.disposed || M.suspended || (Y = !0, L.advance?.());
  }
  function ge() {
    se++, O.reset(), k.dispose(), k = Pr(N, E), Fe.silence(), w = null, Ee.detach(), V++, Z = !1, le?.abort(), le = null, a.destroy(q), q = null, ee = !1, c.release(_), _ = null, X = 0, v = null, C = "", T = !1, A = null, F = fe = null, Q = null, I = null, W = !1, Y = !1, c.clear(), g.time?.("00:00 / 00:00"), g.stage?.({
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
  function Ke() {
    if (!v || v.mc || T || W) return !1;
    if (C === "media") return !!_ && !_.paused && !_.ended && _.readyState >= 2;
    if (C === "yt")
      try {
        return ee && q.getPlayerState() === 1;
      } catch {
        return !1;
      }
    return O.running;
  }
  async function $e() {
    const ae = _, ve = se;
    if (!(!ae || Z || M.suspended))
      try {
        Ee.element === ae && await Ee.resume(), me(ve) && _ === ae && !M.suspended && await ae.play();
      } catch (de) {
        me(ve) && _ === ae && !M.suspended && (_e(!0), de.name === "NotAllowedError" ? je("Playback was blocked. Press Play to start the media.") : de.name !== "AbortError" && Xt("Server video stream could not play. Try again.", ve));
      }
  }
  function We(ae) {
    if (!(!me(ae) || !T)) {
      if (T = !1, _e(!1), A?.(), A = null, O.finishCountdown(), Ce(), Q) {
        const ve = Q;
        Q = null, on(ve[0], ve[1]);
        return;
      }
      _ ? $e() : C === "yt" && q && ee && q.playVideo();
    }
  }
  function on(ae, ve) {
    if (C = "clk", T) {
      Q = [ae, ve];
      return;
    }
    g.stage({
      stageMode: "media"
    }), a.fallback(ae, ve), O.start(), (W || M.suspended) && O.pause(), je("YouTube API could not load: Pause is unavailable and lyric timing is approximate.");
  }
  function Xt(ae, ve) {
    me(ve) && (je(ae + " Open it on YouTube to check."), Bt(ve));
  }
  function Bt(ae) {
    !m().skip || F || !me(ae) || (F = k.timeout(() => {
      F = null, me(ae) && Me();
    }, 1500));
  }
  async function Dn(ae, ve, de) {
    if (!me(de) || le) return;
    const Qe = new AbortController(), tt = k.timeout(() => Qe.abort(new Error("Media lookup timed out.")), 55e3);
    le = Qe;
    let et = null;
    pe(), je("Embedded playback is unavailable. Trying server playback…");
    try {
      if (!me(de)) return;
      const Xe = await p(ae, AbortSignal.any([Qe.signal, k.signal]));
      if (!me(de)) return;
      L.title?.(ve, Xe.title);
      const Ue = new URL(Xe.url, y);
      if (Ue.origin !== y || Ue.pathname !== "/__youtube/media") throw Error("Invalid video stream.");
      Ue.searchParams.set("start", String(ve.s || 0));
      const st = c.create(Ue.href, {
        volume: m().volume
      });
      if (ve.mediaDuration = Math.max(0, Xe.duration - (ve.s || 0)), I = ve.e != null ? ve.e - (ve.s || 0) : ve.mediaDuration, X = 0, q) {
        try {
          q.destroy();
        } catch {
        }
        q = null;
      }
      if (ee = !1, g.stage({
        stageMode: "media"
      }), c.mount(st), _ = st, C = "media", k.listen(st, "play", () => {
        me(de) && _e(!1);
      }), k.listen(st, "pause", () => {
        me(de) && !T && _e(!0);
      }), k.listen(st, "seeked", () => {
        me(de) && (O.seek(), Ee.flush(), Re());
      }), k.listen(st, "ended", () => {
        me(de) && (Kt() + 3 < ve.mediaDuration && (ve.e == null || Kt() + 3 < I) ? Xt("Server video stream was interrupted.", de) : rr(de));
      }), k.listen(st, "error", () => Xt("Server video stream could not play. Try again.", de)), ve.pitch && !Fe.active && !M.suspended && (et = ++V, Z = !0, pe(), await Ee.attach(st, ve.pitch, () => Oe(de, et) && _ === st && !Fe.active), !Oe(de, et)) || !me(de)) return;
      Fe.active && Ee.element === st && await Ee.set(0), Z = !1, st.controls = !0, J = ve.pitch ? "Key applied. Saved for this song." : "Original key.", Fe.sync(), pe(""), O.lyricsChanged(), Ce(), je("Playing video through the server."), !T && !W && $e();
    } catch (Xe) {
      me(de) && !k.signal.aborted && (et === null || Oe(de, et)) && Xt(Xe.message, de);
    } finally {
      tt(), le === Qe && (le = null), me(de) && (et === null || et === V) && (Z = !1, pe(B));
    }
  }
  function rr(ae) {
    fe?.(), fe = k.timeout(() => {
      fe = null, me(ae) && _?.ended && Me();
    }, Math.ceil((Fe.active ? Fe.delay : Ee.delay) * 1e3));
  }
  async function Zt(ae, ve, de) {
    if (!me(de) || M.suspended) return;
    const Qe = ++V;
    if (!ve.pitch || Fe.active) {
      Fe.sync(), !T && !W && $e();
      return;
    }
    Z = !0, ae.controls = !1, J = "Preparing key-shifted audio…", pe();
    try {
      if (await Ee.attach(ae, ve.pitch, () => Oe(de, Qe) && _ === ae && !Fe.active), !Oe(de, Qe)) return;
      Fe.active && Ee.element === ae && await Ee.set(0), J = "Key applied. Saved for this song.", pe("");
    } catch (tt) {
      if (!Oe(de, Qe)) return;
      ve.pitch = 0, L.persist?.(v), J = tt.message, je(J), pe("error");
    } finally {
      Oe(de, Qe) && (ae.controls = !0, Z = !1, pe(B), !T && !W && $e());
    }
  }
  function ln() {
    M.disposed || M.suspended || (Ee.element && Ee.set(0), Fe.open());
  }
  async function Pi(ae) {
    const ve = v, de = se;
    if (!ve || ve.mc || Z || le || M.suspended || M.disposed) return;
    const Qe = fa(ae);
    if (Qe === fa(ve.pitch)) return;
    const tt = fa(ve.pitch);
    if (ve.pitch = Qe, L.persist?.(v), L.render?.(), L.keyChanged?.(Qe), Fe.active) {
      Fe.sync(), J = Qe ? "Key applied. Saved for this song." : "Original key.", pe("");
      return;
    }
    if (C === "yt" || C === "clk" && d(ve.url)) {
      if (!Qe) {
        J = "Original key.", pe("");
        return;
      }
      ln();
      return;
    }
    if (!_) {
      ve.pitch = tt, L.persist?.(v), J = "This source cannot change key. Use YouTube or a media link.", pe("error");
      return;
    }
    Z = !0;
    const et = ++V;
    J = "Preparing key-shifted audio…", pe();
    try {
      if (Ee.element !== _ ? Qe && await Ee.attach(_, Qe, () => Oe(de, et) && v === ve && !Fe.active) : await Ee.set(Qe), !Oe(de, et)) return;
      Fe.active && Ee.element && await Ee.set(0), O.lyricsChanged(), J = Qe ? "Key applied. Saved for this song." : "Original key.", pe("");
    } catch (Xe) {
      if (!Oe(de, et)) return;
      ve.pitch = Ee.key, L.persist?.(v), J = Xe.message, pe("error"), je(J);
    } finally {
      Oe(de, et) && (Z = !1, L.render?.(), pe(B));
    }
  }
  function Zr(ae, ve, de) {
    g.stage({
      stageMode: "media"
    });
    const Qe = a.mount();
    a.ready(k.signal).then((tt) => {
      if (!me(de)) return;
      if (!tt) {
        on(ae, ve);
        return;
      }
      const et = {
        origin: y,
        autoplay: T || W ? 0 : 1,
        start: Math.floor(ve.s || 0),
        playsinline: 1,
        rel: 0
      };
      ve.e != null && (et.end = Math.ceil(ve.e)), q = a.create(Qe, {
        videoId: ae,
        playerVars: et,
        events: {
          onReady: (Xe) => {
            if (!me(de)) return;
            ee = !0;
            const Ue = Xe.target.getDuration();
            Ue > 0 && (ve.mediaDuration = Math.max(0, Ue - (ve.s || 0)), I = ve.e != null ? ve.e - (ve.s || 0) : ve.mediaDuration), Fe.sync(), J = ve.pitch ? Fe.active ? "Key applied. Saved for this song." : "Start Tab Audio to apply the saved key. The player is using its original sound." : "Original key.", pe(""), Xe.target.setVolume(m().volume), !T && !W && !M.suspended && Xe.target.playVideo();
          },
          onStateChange: (Xe) => {
            if (!(!me(de) || T)) {
              if (M.suspended) {
                Xe.data === 1 && Xe.target?.pauseVideo();
                return;
              }
              Xe.data === 0 ? Fe.active ? (fe?.(), fe = k.timeout(() => {
                fe = null, me(de) && q?.getPlayerState() === 0 && Me();
              }, Math.ceil(Fe.delay * 1e3))) : Me() : Xe.data === 1 ? (L.claim?.(), _e(!1)) : Xe.data === 2 && _e(!0);
            }
          },
          onError: (Xe) => {
            if (!me(de)) return;
            const Ue = Number(Xe?.data);
            if ([5, 101, 150].includes(Ue)) {
              Dn(ae, ve, de);
              return;
            }
            const st = {
              2: "Invalid video ID or URL.",
              100: "Video is unavailable, private, or has been removed.",
              153: "YouTube did not receive a referrer/client identity. Open Manokara from localhost or HTTPS, not file://."
            }[Ue] || "YouTube could not play this video.";
            Xt(`YouTube error ${Ue || "unknown"}: ${st}`, de);
          }
        }
      });
    }).catch(() => {
      me(de) && on(ae, ve);
    });
  }
  function Kt() {
    const ae = v;
    if (!ae || T) return 0;
    if (C === "media") return _ ? _.currentTime - X : 0;
    if (C === "yt") {
      if (!q || !ee) return 0;
      try {
        return q.getCurrentTime() - (ae.s || 0);
      } catch {
        return 0;
      }
    }
    return O.elapsed();
  }
  function Vt() {
    return ep(Kt(), {
      rate: K(),
      delay: Fe.active ? Fe.delay : C === "media" ? Ee.delay : 0
    });
  }
  function Nn() {
    if (!(!v || M.disposed || M.suspended)) {
      if (L.claim?.(), T) {
        _e(!W);
        return;
      }
      if (C === "media")
        _ && (_.paused ? $e() : _.pause());
      else if (C === "yt") {
        if (!ee) return;
        const ae = q.getPlayerState();
        ae === 1 || ae === 3 ? q.pauseVideo() : q.playVideo();
      } else C === "clk" ? O.running ? (O.pause(), _e(!0)) : (O.resume(), _e(!1)) : je("Pause is not available for this link.");
    }
  }
  function ir(ae, {
    countdown: ve = 0
  } = {}) {
    if (M.disposed || M.suspended || !ae) return !1;
    sn(), ge(), v = ae, J = ae?.pitch ? "Preparing key-shifted audio…" : "Original key.", pe("");
    const de = ae, Qe = se, tt = de.mc ? null : d(de.url), et = !de.mc && !tt && /\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(de.url), Xe = tt || et ? Math.max(0, Math.min(30, Math.floor(Number(ve) || 0))) : 0;
    if (Xe > 0 && (T = !0, O.countdown(Xe)), I = de.mc ? de.dur : de.e != null ? de.e - (de.s || 0) : null, de.mc)
      C = "clk", O.start(), g.stage?.({
        stageMode: "mc",
        stageTitle: Pe("MC break"),
        stageNote: de.memo || Pe("Take a moment between songs.")
      });
    else if (tt)
      C = "yt", g.stage?.({
        stageMode: "media",
        youtubeUrl: "https://www.youtube.com/watch?v=" + tt + "&t=" + Math.floor(de.s || 0)
      }), Zr(tt, de, Qe);
    else if (et) {
      C = "media", X = de.s || 0, g.stage?.({
        stageMode: "media"
      });
      const Ue = c.create(de.url, {
        volume: m().volume,
        crossOrigin: !!de.pitch && !Fe.active && new URL(de.url).origin !== y
      });
      _ = Ue, k.listen(Ue, "loadedmetadata", () => {
        de.mediaDuration = Number.isFinite(Ue.duration) ? Math.max(0, Ue.duration - (de.s || 0)) : void 0, Ue.currentTime = de.s || 0, I == null && de.mediaDuration != null && (I = de.mediaDuration);
      }), k.listen(Ue, "seeked", () => {
        O.seek(), Ee.flush(), Re();
      }), k.listen(Ue, "ended", () => rr(Qe)), k.listen(Ue, "play", () => {
        Ee.element === Ue && Ee.resume().catch(() => {
        }), _e(!1);
      }), k.listen(Ue, "pause", () => {
        T || _e(!0);
      }), k.listen(Ue, "error", () => {
        if (de.pitch && Ue.crossOrigin === "anonymous" && (de.pitch = 0, L.persist?.(de), L.replay?.(de))) {
          je("This media link did not allow pitch processing. Playing the original key.");
          return;
        }
        je("Could not load this media."), Bt(Qe);
      }), c.mount(Ue), Zt(Ue, de, Qe);
    } else
      C = "clk", O.start(), g.stage?.({
        stageMode: "external",
        stageTitle: Pe("Open this link to play."),
        stageNote: Pe("This media opens in a new tab. Your lyric clock is running here."),
        stageUrl: de.url,
        stageLinkLabel: Pe("Open media")
      });
    return T && (Ce(), he(Pe("Starting in ") + Xe + " s"), A = k.interval(() => {
      if (O.remaining() <= 0) {
        We(Qe);
        return;
      }
      Ce(), he(Pe("Starting in ") + Math.ceil(O.remaining()) + " s");
    }, 100)), k.interval(() => {
      if (C === "yt" && ee) {
        const Ue = {
          now: E(),
          position: Kt(),
          playing: Ke(),
          rate: K()
        };
        if (tp(w, Ue) && O.seek(), w = Ue, I == null) {
          let st = 0;
          try {
            st = q.getDuration();
          } catch {
          }
          st > 0 && (de.mediaDuration = Math.max(0, st - (de.s || 0)), I = de.e != null ? de.e - (de.s || 0) : de.mediaDuration);
        }
      }
      if (Re(), !T) {
        if (I != null && !W && Vt() >= I) {
          Me();
          return;
        }
        he(Be(Kt()) + " / " + (I != null ? Be(I) : "--:--"));
      }
    }, 250), Nt(), !0;
  }
  function sn() {
    j || M.disposed || (j = !0, Nt());
  }
  function Or() {
    M.disposed || (ge(), J = "Play a song to change its key.", pe(""));
  }
  function Mn() {
    if (!(M.disposed || M.suspended)) {
      S = !!v && !W, (T || C === "clk") && O.pause(), W = !!v, w = null, V++, Z = !1, k.suspend(), M.suspend(), Fe.suspend?.(), Ee.suspend?.();
      try {
        _?.pause(), ee && q?.pauseVideo();
      } catch {
      }
    }
  }
  function ft() {
    M.disposed || !M.suspended || (M.resume(), k.resume(), Fe.resume?.(), S && v && (T || (W = !1), T ? _e(!1) : C === "clk" ? (O.resume(), _e(!1)) : C === "media" && _ ? (_.readyState >= 1 && _.currentTime < X && (_.currentTime = X), I == null && Number.isFinite(_.duration) && (v.mediaDuration = Math.max(0, _.duration - X), I = v.mediaDuration), W = !1, Zt(_, v, se)) : C === "yt" && ee && q.playVideo()), S = !1, Nt());
  }
  function zt({
    preserveCapture: ae = !1
  } = {}) {
    M.disposed || (ge(), k.dispose(), M.dispose(), j = !1, Fe.dispose({
      preserveCapture: ae
    }), Ee.dispose?.(), be.clear());
  }
  return {
    start: sn,
    load: ir,
    stop: Or,
    suspend: Mn,
    resume: ft,
    dispose: zt,
    changeKey: Pi,
    startTabAudio: ln,
    play() {
      !v || M.disposed || M.suspended || (T ? We(se) : W && Nn());
    },
    togglePause: Nn,
    stopTabAudio: () => Fe.stop(),
    setVolume(ae) {
      M.disposed || (_ && (_.volume = Math.max(0, Math.min(100, Number(ae) || 0)) / 100), q && ee && q.setVolume(ae), Nt());
    },
    refreshSongTiming() {
      v && (I = v.mc ? v.dur : v.e != null ? v.e - (v.s || 0) : v.mediaDuration ?? null, O.lyricsChanged(), Nt());
    },
    invalidateLyrics() {
      M.disposed || O.lyricsChanged();
    },
    elapsed: Kt,
    audibleElapsed: Vt,
    mediaPlaying: Ke,
    getSnapshot: ce,
    subscribe(ae) {
      return M.disposed ? () => {
      } : (be.add(ae), ae(ce()), () => be.delete(ae));
    },
    get state() {
      return ce();
    },
    get appliedKey() {
      return Ee.key;
    }
  };
}
const ps = /* @__PURE__ */ new WeakMap();
function rp({ window: a = globalThis.window, document: c = a.document, root: l }) {
  function u(d) {
    if (d?.aborted) return Promise.resolve(!1);
    if (a.YT?.Player) return Promise.resolve(!0);
    let y = ps.get(a);
    if (!y) {
      const m = a.onYouTubeIframeAPIReady, g = /* @__PURE__ */ new Set();
      let L, N = !1, E, M = !1;
      const O = (C) => {
        if (!M) {
          M = !0, y.result = C, a.clearTimeout(E), a.onYouTubeIframeAPIReady === k && (a.onYouTubeIframeAPIReady = m), !C && N && L?.remove(), L?.removeEventListener("error", v), ps.delete(a);
          for (const T of [...g]) T(C);
          g.clear();
        }
      }, k = () => {
        try {
          m?.();
        } finally {
          O(!!a.YT?.Player);
        }
      }, v = () => O(!1);
      y = { listeners: g, finish: O }, ps.set(a, y), a.onYouTubeIframeAPIReady = k, L = c.getElementById("ytapi"), L || (N = !0, L = c.createElement("script"), L.id = "ytapi", L.src = "https://www.youtube.com/iframe_api"), L.addEventListener("error", v, { once: !0 }), E = a.setTimeout(() => O(!1), 8e3), N && c.head.append(L);
    }
    return y.result !== void 0 ? Promise.resolve(y.result) : new Promise((m) => {
      let g = !1;
      const L = (E) => {
        g || (g = !0, d?.removeEventListener("abort", N), y.listeners.delete(L), m(E));
      }, N = () => {
        L(!1), y.listeners.size || y.finish(!1);
      };
      y.listeners.add(L), d?.addEventListener("abort", N, { once: !0 }), d?.aborted && N();
    });
  }
  function p() {
    const d = c.createElement("div");
    return d.id = "ytp", l().replaceChildren(d), d;
  }
  return {
    ready: u,
    mount: p,
    create: (d, y) => new a.YT.Player(d, { width: "100%", height: "100%", ...y }),
    destroy(d) {
      try {
        d?.destroy();
      } catch {
      }
    },
    fallback(d, y) {
      const m = c.createElement("iframe");
      m.referrerPolicy = "strict-origin-when-cross-origin", m.allow = "autoplay; encrypted-media; picture-in-picture", m.allowFullscreen = !0;
      const g = new URL("https://www.youtube.com/embed/" + d);
      g.searchParams.set("autoplay", "1"), g.searchParams.set("start", String(Math.floor(y.s || 0))), y.e != null && g.searchParams.set("end", String(Math.ceil(y.e))), m.src = g.href, l().replaceChildren(m);
    }
  };
}
function ip({ document: a = globalThis.document, root: c }) {
  return {
    create(l, { volume: u = 100, crossOrigin: p = !1 } = {}) {
      const d = a.createElement("video");
      return p && (d.crossOrigin = "anonymous"), d.src = l, d.controls = !0, d.playsInline = !0, d.autoplay = !1, d.volume = Math.max(0, Math.min(100, Number(u) || 0)) / 100, d;
    },
    mount: (l) => c().replaceChildren(l),
    clear: () => c().replaceChildren(),
    release(l) {
      if (l)
        try {
          l.pause(), l.removeAttribute("src"), l.load();
        } catch {
        }
    }
  };
}
const Eo = /* @__PURE__ */ new Set();
let ms = null, Zc = 0;
const Ri = {
  get active() {
    return Eo.size > 0;
  },
  getSnapshot() {
    return ms ? { ...ms, stateAgeMs: Math.max(0, performance.now() - Zc) } : { ready: !1 };
  },
  subscribe(a) {
    return Eo.add(a), a(Ri.getSnapshot()), () => Eo.delete(a);
  },
  feed(a) {
    ms = a, Zc = performance.now();
    for (const c of Eo) c(Ri.getSnapshot());
  }
};
globalThis.ManokaraStagePreview = {
  getSnapshot: () => Ri.getSnapshot(),
  subscribe: (a) => Ri.subscribe(a)
};
function ap({ getState: a, onStatus: c }) {
  let l;
  try {
    l = sessionStorage.getItem("manokaraTabAudioChannel"), (performance.getEntriesByType("navigation")[0]?.type !== "reload" || !/^[a-f0-9-]{36}$/.test(l || "")) && (l = crypto.randomUUID(), sessionStorage.setItem("manokaraTabAudioChannel", l));
  } catch {
    l = crypto.randomUUID();
  }
  let u = null, p = !1, d = !1, y = 0, m = "", g = !1, L = !1;
  const N = () => isSecureContext && !!navigator.mediaDevices?.setCaptureHandleConfig;
  function E() {
    if (!N()) return !1;
    try {
      return navigator.mediaDevices.setCaptureHandleConfig({ handle: l, exposeOrigin: !0, permittedOrigins: [location.origin] }), !0;
    } catch {
      return !1;
    }
  }
  E();
  function M(q = "", ee = !1) {
    c({ active: p, busy: d, delay: y, message: q, error: ee, open: !!u && !u.closed });
  }
  function O(q, ee) {
    !u || u.closed || u.postMessage({ type: q, channel: l, state: ee }, location.origin);
  }
  function k(q = !1) {
    if (g || L || !u || u.closed) return;
    const ee = a(), se = JSON.stringify(ee);
    (q || m !== se) && (m = se, O("manokara:tab-audio-state", ee));
  }
  function v() {
    if (L || g) return !1;
    if (!E())
      return M("Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.", !0), !1;
    if (!u || u.closed) {
      const q = new URL("./manokara-tab-audio.html", location.href);
      q.hash = new URLSearchParams({ channel: l, lang: a().language }).toString(), u = window.open(q.href, "manokara-tab-audio-" + l, "popup,width=480,height=640"), m = "";
    } else u.focus();
    return u ? (M(p ? "" : "Choose the Manokara tab and share tab audio in the audio window."), k(!0), !0) : (M("Popup blocked. Please allow popups.", !0), !1);
  }
  function C(q) {
    if (g || q.origin !== location.origin || q.data?.channel !== l) return;
    const ee = q.data;
    if (!u && ee.type === "manokara:tab-audio-hello")
      try {
        if (q.source?.opener !== window || q.source.location.pathname !== "/manokara-tab-audio.html") return;
        u = q.source, m = "";
      } catch {
        return;
      }
    if (q.source === u) {
      if (ee.type === "manokara:tab-audio-hello") {
        k(!0);
        return;
      }
      ee.type === "manokara:tab-audio-status" && (p = ee.active === !0, d = ee.busy === !0, y = p ? Math.max(0, Math.min(3, Number(ee.delay) || 0)) : 0, M(typeof ee.message == "string" ? ee.message.slice(0, 240) : "", ee.error === !0));
    }
  }
  window.addEventListener("message", C);
  const T = () => {
    u?.closed && (u = null, m = "", p = d = !1, y = 0, M("Tab Audio stopped. The player is using its original sound."));
  };
  let A = setInterval(T, 1e3);
  function Q() {
    g || (O("manokara:tab-audio-suspend"), g = !0, clearInterval(A), A = null, window.removeEventListener("message", C));
  }
  function I({ preserveCapture: q = !1 } = {}) {
    if (!L) {
      if (!q) {
        O("manokara:tab-audio-stop");
        try {
          u?.close();
        } catch {
        }
      }
      Q(), L = !0, p = d = !1, y = 0, window.removeEventListener("pagehide", Q), window.removeEventListener("pageshow", X);
    }
  }
  function _() {
    L || !g || (g = !1, m = "", E(), window.addEventListener("message", C), A == null && (A = setInterval(T, 1e3)), k(!0));
  }
  function X(q) {
    q.persisted && _();
  }
  return window.addEventListener("pagehide", Q), window.addEventListener("pageshow", X), {
    open: v,
    sync: k,
    dispose: I,
    suspend: Q,
    resume: _,
    stop() {
      O("manokara:tab-audio-stop");
    },
    silence() {
      O("manokara:tab-audio-state", { ...a(), key: 0, enabled: !1 }), m = "";
    },
    get active() {
      return p;
    },
    get busy() {
      return d;
    },
    get delay() {
      return y;
    }
  };
}
const ed = /* @__PURE__ */ new Set([
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
function op(a, c) {
  const l = Object.keys(a);
  return !!c && l.length === Object.keys(c).length && l.every((p) => Object.hasOwn(c, p) && (ed.has(p) || Object.is(a[p], c[p]))) ? { partial: !0, packet: Object.fromEntries(l.filter((p) => p === "writerId" || ed.has(p) && !Object.is(a[p], c[p])).map((p) => [p, a[p]])) } : { partial: !1, packet: a };
}
function lp() {
  if (window.ManokaraController?.active) return window.ManokaraController;
  const a = ManokaraI18n.text, c = ManokaraI18n.markup, l = (h) => document.querySelector(h), u = Pr(), {
    draft: p,
    controls: d
  } = $;
  function y(h) {
    window.ManokaraStudio?.showMain("karaoke"), h === "song" && !l("#songEditorDialog").open && l("#songEditorDialog").showModal(), h !== "song" && l("#songEditorDialog").open && l("#songEditorDialog").close();
  }
  function m() {
    k >= 0 && !confirm(a("Discard the current song edits and start a new song?")) || (k >= 0 && zt(), y("song"), l("#panel-song").scrollTop = 0, l("#url").focus());
  }
  u.listen(l("#songEditorDialog"), "click", (h) => {
    h.target === l("#songEditorDialog") && l("#songEditorDialog").close();
  }), u.listen(l("#libraryDialog"), "click", (h) => {
    h.target === l("#libraryDialog") && l("#libraryDialog").close();
  }), u.listen(l("#songEditorDialog"), "close", () => u.frame(() => {
    const h = document.activeElement;
    !window.ManokaraTour?.active && (h === document.body || l("#songEditorDialog").contains(h)) && l("#openSongEditor")?.focus({
      preventScroll: !0
    });
  }));
  const g = (h) => (h = Math.max(0, Math.round(h)), String(Math.floor(h / 60)).padStart(2, "0") + ":" + String(h % 60).padStart(2, "0")), L = ManokaraCore.timeValue;
  let N = [], E = null, M = 0, O = -1, k = -1, v = [], C = "", T = {}, A = ma.map((h) => ({ ...h })), Q;
  const I = np({
    youtube: rp({
      root: () => l("#stageMediaRoot")
    }),
    mediaAdapter: ip({
      root: () => l("#stageMediaRoot")
    }),
    pitchFactory: ManokaraPitch,
    captureFactory: ap,
    origin: location.origin,
    youtubeId: (h) => We(h),
    options: () => ({
      volume: Number(d.get("vol") ?? 100),
      skip: d.get("skip"),
      language: ManokaraI18n.language
    }),
    async lookup(h, P) {
      if (await Re, P.aborted) throw new DOMException("Cancelled", "AbortError");
      return ManokaraPitch.lookup(ManokaraSession.api, _e("/__youtube"), h, {
        signal: P
      });
    },
    output: {
      text: a,
      format: g,
      message: (h) => H(h),
      stage: (h) => {
        u.disposed || $.ui.updatePlayerPanelState(h);
      },
      time: (h) => le(h),
      countdown: q
    },
    callbacks: {
      changed: (h) => Kt(h),
      persist: () => B(),
      render: () => ft(),
      keyChanged: (h) => {
        k >= 0 && N[k] === E && p.set("songKey", h);
      },
      title: Bt,
      claim: ge,
      advance: () => Vt(ln()),
      replay: (h) => {
        const P = N.indexOf(h);
        return P < 0 ? !1 : (Vt(P), !0);
      }
    }
  }), _ = () => I.mediaPlaying(), X = () => I.audibleElapsed();
  function q({
    visible: h,
    title: P,
    remaining: ie
  }) {
    $.ui.updatePlayerPanelState({
      countdownVisible: h,
      countdownTitle: h ? P : "",
      countdownValue: h ? String(Math.max(1, Math.ceil(ie))) : "",
      countdownHint: a("Press Play to start now")
    });
  }
  function ee(h = I.getSnapshot()) {
    const P = E && !E.mc ? ManokaraPitch.clamp(E.pitch) : 0;
    return {
      play: a("Play"),
      pause: a("Pause"),
      resume: a("Resume"),
      stop: a("Stop"),
      previous: a("Previous song"),
      next: a("Next song"),
      keyLabel: a("Key"),
      lower: a("Lower key"),
      raise: a("Raise key"),
      originalKey: a("Original key"),
      volumeLabel: a("Volume"),
      paused: h.paused,
      volume: Number(d.get("vol") ?? 100),
      key: P,
      canPitch: !!E && !E.mc && !h.pitchBusy && !h.lookupPending && (h.mode !== "yt" || h.ready)
    };
  }
  function se(h) {
    $.ui.updatePlayerControls(ee(h));
  }
  const W = (h) => $.ui.updatePlayerPanelState({
    now: String(h ?? "")
  }), le = (h) => $.ui.updatePlayerPanelState({
    time: String(h ?? "")
  });
  function Z(h = I.getSnapshot()) {
    $.ui.updateTransposeState({
      key: E && !E.mc ? ManokaraPitch.clamp(E.pitch) : 0,
      status: a(h.pitchMessage),
      statusState: h.pitchStatusState,
      tabAudioActive: h.captureActive,
      tabAudioBusy: h.captureBusy
    }), se(h);
  }
  let V = "";
  const J = /* @__PURE__ */ new Map();
  N = Ct.setlist.load().value;
  const B = () => Ct.setlist.save(N).ok ? !0 : (H("Browser storage is full or unavailable. Changes remain in this window only."), !1);
  let G = "";
  const H = (h) => {
    G = h || "", $.ui.updatePlayerPanelState({
      message: a(G)
    });
  }, w = ManokaraLyricsEditor.create({
    draft: p,
    imported(h) {
      p.patch({ lyricSourceLabel: "", lyricSourceUrl: "", lyricCopyright: "", lyricSources: "[]" }), Je = h.duration, !p.get("ttl") && h.title && p.set("ttl", h.title.slice(0, 512)), p.get("lq") || p.set("lq", [h.title, h.artist].filter(Boolean).join(" "));
    },
    changed() {
      Je = void 0;
    }
  });
  u.own(() => w.dispose());
  let j = [], Y = !1;
  const S = () => {
    try {
      return crypto.randomUUID();
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
  }, F = () => Ct.library.list(), fe = (h) => Ct.library.put(h), be = (h) => Ct.library.remove(h);
  function Pe() {
    const h = {
      search: a("Search my songs"),
      placeholder: a("Song title or artist"),
      noMatches: a("No matching songs."),
      empty: a("Your library is empty. Save a song from the editor to keep it here."),
      listLabel: a("Saved songs"),
      lyricsSaved: a("Lyrics saved"),
      noLyrics: a("No lyrics"),
      add: a("Add"),
      remove: a("Remove from My songs")
    };
    $.ui.updateLibrary(j, h), Mn();
  }
  async function Be() {
    if (!u.disposed)
      try {
        if (j = (await F()).filter((h) => h && typeof h.libraryId == "string" && typeof h.url == "string"), u.disposed) return;
        Y = !1, Pe();
      } catch {
        Y = !0, Mn();
      }
  }
  async function je() {
    try {
      const h = new Set((await F()).map((ne) => ne.libraryId));
      if (u.disposed) return;
      const P = N.filter((ne) => !ne.mc && ne.librarySync !== !1);
      let ie = !1;
      for (const ne of P)
        ne.libraryId || (ne.libraryId = S(), ie = !0);
      if (ie && !B()) {
        await Be();
        return;
      }
      for (const ne of P) {
        if (u.disposed) return;
        h.has(ne.libraryId) || (await Ct.library.insertMissing(ne), h.add(ne.libraryId));
      }
      await Be();
    } catch {
      Y = !0, Mn();
    }
  }
  async function me() {
    await Be(), !u.disposed && (l("#libraryDialog").showModal(), l("#librarySearch").focus());
  }
  async function Oe(h) {
    const P = j.find((Ne) => Ne.libraryId === h);
    if (!P) return;
    if (N.some((Ne) => Ne.libraryId === P.libraryId)) {
      H("This song is already in the setlist.");
      return;
    }
    const ie = {
      ...P,
      librarySync: !0
    };
    delete ie._L, N.push(ie);
    const ne = B();
    ft(), l("#libraryDialog").close(), ne && H("Added from My songs.");
  }
  async function Ee(h) {
    const P = j.find((ne) => ne.libraryId === h);
    if (!P || !confirm(a("Remove this song from My songs? Copies already in a setlist will stay there."))) return;
    const ie = N.map((ne) => {
      if (ne.libraryId !== h) return ne;
      const Ne = {
        ...ne,
        librarySync: !1
      };
      return delete Ne.libraryId, Ne;
    });
    if (!Ct.setlist.save(ie).ok) {
      H("Could not save the setlist. The song was kept in My songs.");
      return;
    }
    try {
      await be(P.libraryId);
      for (const ne of /* @__PURE__ */ new Set([...N, E])) ne?.libraryId === P.libraryId && (delete ne.libraryId, ne.librarySync = !1);
      B(), await Be(), H("Removed from My songs. Setlist copies are unchanged.");
    } catch {
      B(), H("Could not update My songs. Please try again.");
    }
  }
  function Fe() {
    confirm(a("Remove all songs?")) && (N = [], M = 0, O = -1, zt(), B(), ft(), E && H("Setlist cleared. The current song keeps playing until it ends or you press Stop."));
  }
  function Nt(h, P) {
    if (!Number.isInteger(h) || h < 0 || h >= N.length) return;
    if (P === "go") {
      Vt(h);
      return;
    }
    if (P === "ed") {
      Ue(), C = "", v = [], tt(), y("song"), k = h, V = "";
      const we = N[h];
      $.ui.updateSongEditorView({
        title: a("Edit song"),
        saveLabel: a("Save changes"),
        editing: !0
      }), p.set("saveToLibrary", we.librarySync !== !1), p.set("url", we.url), p.set("ttl", we.title), p.set("st", we.s ? g(we.s) : ""), p.set("en", we.e != null ? g(we.e) : ""), p.set("llrc", we.lrc || ""), p.patch({ lyricSourceLabel: we.lyricSource?.label || "", lyricSourceUrl: _n(we.lyricSource?.url), lyricCopyright: we.lyricSource?.copyright || "", lyricSources: JSON.stringify(Mi(we.lyricSource?.sources)) }), Q = we.mediaDuration ? we.mediaDuration + (we.s || 0) : void 0, p.set("lyricLoadStatus", ""), p.set("loff", we.off || 0), p.set("songKey", ManokaraPitch.clamp(we.pitch)), p.set("lq", we.title), w.load(we), l("#ftitle").scrollIntoView({
        block: "nearest"
      });
      return;
    }
    if (!["del", "up", "dn"].includes(P)) return;
    const ie = k >= 0 ? N[k] : null, ne = E, Ne = ne ? N.indexOf(ne) : -1, Te = Ne >= 0 ? Ne : M;
    if (P === "del") N.splice(h, 1);
    else {
      const we = P === "up" ? h - 1 : h + 1;
      we >= 0 && we < N.length && ([N[h], N[we]] = [N[we], N[h]]);
    }
    if (ie) {
      const we = N.indexOf(ie);
      we < 0 ? zt() : k = we;
    }
    if (ne) {
      const we = N.indexOf(ne);
      we >= 0 ? M = we : Ne >= 0 ? (M = Te, H("Removed from the setlist. The current song keeps playing until it ends or you press Stop.")) : P === "del" && h < M && M--;
    }
    B(), ft();
  }
  u.own($.commands.bind("setlist", {
    openLibrary: me,
    openEditor: m,
    clear: Fe,
    song: Nt
  })), window.ManokaraSetlistActions = $.commands.actions("setlist"), u.own($.commands.bind("library", {
    add: Oe,
    remove: Ee
  })), window.ManokaraLibraryActions = $.commands.actions("library"), je();
  const K = (() => {
    try {
      return crypto.randomUUID();
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
  })();
  let ce = "", pe = !1;
  const Re = window.ManokaraSession.ready.then((h) => (ce = h.room, pe = !0, $.ui.updateOBSSettingsState({
    obsUrl: window.ManokaraSession.obsUrl(!1)
  }), window.ManokaraStudio?.refresh(), h)), _e = (h) => {
    const P = new URL(h, location.href);
    return P.searchParams.set("room", ce), P.href;
  };
  async function Ce(h) {
    try {
      return await Re, u.disposed && h !== "release" ? void 0 : await window.ManokaraSession.api(_e("/__lyric-owner"), {
        writerId: K,
        action: h
      }, {
        keepalive: h === "release",
        ...h === "release" ? {} : {
          signal: u.signal
        }
      });
    } catch {
      return;
    }
  }
  let he = !1, Me = -1 / 0;
  function ge() {
    u.disposed || u.suspended || he || performance.now() - Me < 750 || (Me = performance.now(), he = !0, Ce("claim").then((h) => {
      u.disposed || u.suspended || h?.ok && (Mt = null, gt());
    }).finally(() => {
      he = !1;
    }));
  }
  u.listen(document, "pointerdown", (h) => {
    !ManokaraTour.active && !h.target.closest("#help") && ge();
  }, !0), u.listen(document, "keydown", (h) => {
    !ManokaraTour.active && !h.target.closest("#help") && ge();
  }, !0), location.protocol === "file:" && (l("#warn").hidden = !1);
  function Ke(h) {
    return h.e != null ? Math.max(0, h.e - (h.s || 0)) : h.mediaDuration || h.ldur || 180;
  }
  function $e(h) {
    const P = Ke(h), ie = ManokaraLyrics.displayLrc(h), ne = ManokaraLyrics.secondaryLrc(h), Ne = ie + "|" + ne + "|" + P;
    if (h._L && h._L.k === Ne) return h._L.a;
    const Te = ManokaraCore.parseLyrics(ie, P);
    if (ne) {
      const we = ManokaraCore.parseLyrics(ne, P).all;
      Te.all.forEach((wt, pt) => wt.romaji = we[pt]?.x !== wt.x && we[pt]?.x || "");
    }
    return h._L = {
      k: Ne,
      a: Te.lines,
      all: Te.all,
      timed: Te.timed
    }, Te.lines;
  }
  const We = ManokaraCore.youtubeId, on = (h) => typeof h == "string" ? h.replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, 512) : "";
  function Xt(h) {
    return !h.mc && (!h.title || h.title.trim() === h.url.trim());
  }
  function Bt(h, P) {
    u.disposed || (P = on(P), !(!P || !Xt(h)) && (h.title = P, N.includes(h) && (B(), ft()), E === h && (W(P), q({
      visible: I.state.counting,
      title: E.title,
      remaining: I.state.countdownRemaining
    }))));
  }
  function Dn(h) {
    const P = We(h);
    if (!P) return Promise.resolve("");
    const ie = J.get(P);
    if (ie && ie.expires > Date.now()) return ie.promise;
    const ne = (async () => {
      try {
        const Te = await fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + P), {
          signal: AbortSignal.any([u.signal, AbortSignal.timeout(4e3)])
        });
        if (Te.ok) {
          const we = on((await Te.json()).title);
          if (we) return we;
        }
      } catch {
      }
      await Re;
      const Ne = await window.ManokaraSession.api(_e("/__youtube/title"), {
        videoId: P
      }, {
        signal: AbortSignal.any([u.signal, AbortSignal.timeout(55e3)])
      });
      return Ne.ok ? on((await Ne.json()).title) : "";
    })().catch(() => "");
    for (J.delete(P), J.set(P, {
      promise: ne,
      expires: Date.now() + 9e5
    }); J.size > 64; ) J.delete(J.keys().next().value);
    return ne.then((Ne) => {
      !Ne && J.get(P)?.promise === ne && J.delete(P);
    }), ne;
  }
  function rr(h) {
    if (Xt(h)) {
      const P = h.url;
      Dn(P).then((ie) => {
        h.url === P && Bt(h, ie);
      });
    }
  }
  const Zt = () => E ? N.indexOf(E) : -1, ln = () => {
    if (!E) return 0;
    const h = Zt();
    return h >= 0 ? h + 1 : M;
  }, Pi = () => {
    if (!E) return 0;
    const h = Zt();
    return Math.max(0, (h >= 0 ? h : M) - 1);
  }, Zr = () => Math.max(0, Math.min(30, Math.floor(+d.get("cdn")) || 0));
  function Kt(h = I.getSnapshot()) {
    const P = E ? h.counting ? "countdown" : h.paused ? "paused" : h.playing ? "playing" : "ready" : "ready";
    $.ui.updatePlayerPanelState({
      playbackState: P,
      previewMessage: E ? !h.counting && !E.mc && !E.lrc?.trim() ? "This song has no lyrics yet. Add lyrics in the song editor." : "" : "Play a song to preview its lyrics.",
      playbackLabel: {
        ready: a(E ? "Ready" : "Ready when you are"),
        countdown: a("Starting soon"),
        paused: a("Paused"),
        playing: a("Playing")
      }[P]
    }), Z(h);
  }
  function Vt(h) {
    if (!u.disposed) {
      if (ge(), Pn = "", h < 0 || h >= N.length) {
        if (I.stop(), E) {
          const P = Zt();
          O = P >= 0 ? P : M;
        }
        h >= N.length && (O = -1), E = null, lr(null), W(a("Nothing playing yet")), ft(), Rt(), Kt(), h >= N.length && H("Setlist finished. Ready for another song?");
        return;
      }
      E = N[h], M = O = h, lr(E), ft(), H(""), W(E.mc ? a("MC break") : E.title), rr(E), I.load(E, {
        countdown: Zr()
      }), Rt();
    }
  }
  function Nn() {
    return {
      title: a("Live lyrics"),
      smaller: a("Smaller lyric text"),
      larger: a("Larger lyric text"),
      lyrics: a("Lyrics"),
      chooseLyrics: a("Choose lyrics for this song"),
      original: a("Original"),
      romaji: a("Romaji"),
      both: a("Original + Romaji"),
      currentLyrics: a("Current song lyrics"),
      liveSync: a("Live sync"),
      currentSync: a("Current live sync offset"),
      reset: a("Reset"),
      syncHelp: a("Nudge the words to match what you hear. + shows lines earlier; − shows them later."),
      setLineTime: a("Set line time")
    };
  }
  function ir(h) {
    $.ui.updateLiveLyrics(h);
  }
  function sn(h = "") {
    const P = !!E && !E.mc && ManokaraLyrics.validRomaji(E), ie = P ? ManokaraLyrics.mode(E) : "original", ne = h || (E ? E.mc ? "Lyrics options are unavailable during a break" : P ? "Auto-saved for this song" : "Create Romaji in the song editor to enable it" : "Play a song to choose lyrics");
    ir({
      mode: ie,
      modeDisabled: !E || !!E.mc,
      romajiAvailable: P,
      modeStatus: a(ne),
      labels: Nn()
    });
  }
  function Or(h) {
    const P = E;
    if (!P || P.mc || h !== "original" && !ManokaraLyrics.validRomaji(P)) {
      sn();
      return;
    }
    P.lyricMode = h, k >= 0 && N[k] === P && p.set("lyricMode", h), B(), sn(), Pn = "", On = -2, Rt(), gt(), P.libraryId && P.librarySync !== !1 && fe(P).then(Be).catch(() => sn("Saved to setlist; My songs could not be updated"));
  }
  function Mn() {
    const h = {
      listLabel: a("Songs in your setlist"),
      mcBreak: a("MC break"),
      mcPrefix: a("MC break · "),
      announcement: a("Announcement"),
      lyricsReady: a(" · Lyrics ready").replace(/^\s*[·•]\s*/, ""),
      edit: a("Edit song"),
      moveUp: a("Move song up"),
      moveDown: a("Move song down"),
      remove: a("Remove from setlist"),
      setlist: a("Setlist"),
      mySongs: a("My songs"),
      libraryCount: Y ? "!" : j.length,
      addSong: a("Add a song"),
      emptyTitle: a("Every set starts somewhere."),
      emptyHint: a("Add your first song, then make the evening yours."),
      clear: a("Clear setlist"),
      savedBrowser: a("Saved in this browser"),
      kind: (P, ie) => We(ie.url) ? "YouTube" : a("Media")
    };
    $.ui.updateSetlist(N, E, h, g);
  }
  function ft() {
    ga(), Z(), sn(), Mn();
  }
  function zt() {
    Ue(), C = "", v = [], tt(), k = -1, $.ui.updateSongEditorView({
      title: a("Add a song"),
      saveLabel: a("Add to setlist"),
      editing: !1
    }), Je = void 0, Q = void 0, V = "", p.reset(), w.reset(), p.set("loff", 0), p.set("songKey", 0), p.set("saveToLibrary", !0), p.set("lyricLoadStatus", ""), l("#songEditorDialog").open && l("#songEditorDialog").close();
  }
  function ae() {
    p.set("lyricLoadStatus", "");
  }
  async function ve() {
    if (u.disposed || p.get("saving")) return;
    const h = p.get("url").trim();
    if (!/^https?:\/\//.test(h)) {
      H("Paste a karaoke URL first.");
      return;
    }
    const P = L(p.get("st")), ie = L(p.get("en"));
    if (Number.isNaN(P) || Number.isNaN(ie) || ie != null && ie <= (P || 0)) {
      H("Use valid times (mm:ss or seconds); End must be after Start.");
      return;
    }
    if (new TextEncoder().encode(JSON.stringify(p.get("llrc"))).length > 23e4) {
      H("Lyrics are too long for the relay (maximum 230 KB).");
      return;
    }
    let ne;
    try {
      ne = w.read();
    } catch (pt) {
      H(pt.message);
      return;
    }
    const Ne = k >= 0 ? N[k] : null, Te = {
      title: (p.get("ttl").trim() || h).slice(0, 512),
      url: h,
      s: P || 0,
      e: ie,
      lrc: p.get("llrc"),
      lyricSource: p.get("lyricSourceLabel") ? {
        label: p.get("lyricSourceLabel"),
        url: _n(p.get("lyricSourceUrl")),
        copyright: p.get("lyricCopyright"),
        sources: Mi(p.get("lyricSources"))
      } : null,
      ...ne,
      ldur: Je ?? (Ne ? Ne.ldur : void 0),
      off: +p.get("loff") || 0,
      pitch: ManokaraPitch.clamp(p.get("songKey")),
      ...Ne?.lyricStyle ? {
        lyricStyle: ot(Ne.lyricStyle)
      } : {},
      ...Ne?.libraryId ? {
        libraryId: Ne.libraryId
      } : {}
    };
    if (new TextEncoder().encode(JSON.stringify({
      lrc: ManokaraLyrics.displayLrc(Te),
      romajiLrc: ManokaraLyrics.secondaryLrc(Te)
    })).length > 23e4) {
      H("Combined output lyrics exceed 230 KB. Shorten the LRC or choose a single display language.");
      return;
    }
    p.set("saving", !0);
    const wt = p.revision;
    try {
      let pt = Te;
      if (k >= 0) {
        const _t = N[k], oi = _t.pitch !== Te.pitch, li = _t === E && (_t.url !== Te.url || _t.s !== Te.s || _t.e !== Te.e);
        if (Object.assign(_t, Te), pt = _t, delete _t._L, _t === E) {
          if (lr(_t), I.refreshSongTiming(), W(Te.title), li || oi && I.state.pitchBusy) Vt(k);
          else if (oi) {
            const Fi = _t.pitch;
            _t.pitch = ManokaraPitch.clamp(I.appliedKey), I.changeKey(Fi);
          }
        }
      } else N.push(Te);
      const en = p.get("saveToLibrary");
      pt.librarySync = en, en && !pt.libraryId && (pt.libraryId = S());
      const Yt = B();
      ft();
      let ai = !1;
      if (en)
        try {
          await fe(pt), ai = !0, await Be();
        } catch {
          ai = !1;
        }
      !u.disposed && p.revision === wt && zt(), H(Yt ? en ? ai ? "Saved to setlist and My songs." : "Saved to setlist. My songs could not be updated." : "Saved to setlist." : ai ? "Saved to My songs. The setlist could not be saved in this browser." : "Browser storage is full or unavailable. Changes remain in this window only."), rr(pt);
    } finally {
      p.set("saving", !1);
    }
  }
  function de() {
    const h = L(p.get("mcd"));
    if (!Number.isFinite(h) || h <= 0) {
      H("Enter a positive MC duration (mm:ss or seconds).");
      return;
    }
    N.push({
      mc: 1,
      memo: p.get("mcm"),
      dur: h
    }), p.patch({
      mcm: "",
      mcd: ""
    }), B(), ft();
  }
  async function Qe() {
    Q = void 0;
    const h = p.revision, P = p.get("url").trim(), ie = p.get("ttl"), ne = p.get("lq");
    if (!We(P) || ie.trim() && ie.trim() !== P && ie !== V) return;
    const Ne = await Dn(P);
    u.disposed || h !== p.revision || !Ne || p.get("url").trim() !== P || p.get("ttl") !== ie && p.get("ttl").trim() || (p.set("ttl", V = Ne), (!p.get("lq") || p.get("lq") === ne) && p.set("lq", Ne.replace(/\s*[\(\[【].*$/, "")));
  }
  function tt() {
    const h = C === "results" ? v.map((ne) => ({
      title: (ne.trackName + " — " + ne.artistName).slice(0, 700),
      kind: a(ne.syncedLyrics ? "Timed lyrics" : "Plain lyrics"),
      timed: !!ne.syncedLyrics,
      sources: ne.sources.map((Ne) => ({ label: Ne.label, url: _n(Ne.url) })),
      duration: ne.duration ? g(ne.duration) : "—"
    })) : [], P = C === "results" ? "results" : C ? a(C) : "", ie = C === "results" ? Object.entries(T).filter(([, ne]) => !["ok", "empty"].includes(ne)).map(([ne, Ne]) => ({
      id: ne,
      label: ma.find((Te) => Te.id === ne)?.label || ne,
      message: a(_c[Ne] || _c.unavailable)
    })) : [];
    $.ui.updateLyricSearchResults(P, h, { providers: A, statuses: ie, busy: C === "Searching…" });
  }
  let et = null, Xe = 0;
  function Ue() {
    Xe++, et?.abort(), et = null;
  }
  u.own(Ue), Re.then(async () => {
    const h = await window.ManokaraSession.api(_e("/__lyrics/providers"), {}, {
      signal: AbortSignal.any([u.signal, AbortSignal.timeout(8e3)])
    });
    if (!h.ok) return;
    const P = await h.json();
    u.disposed || !Array.isArray(P.providers) || (A = Dc(P.providers), p.get("lyricProvider") !== "auto" && !A.some((ie) => ie.id === p.get("lyricProvider") && ie.enabled) && p.set("lyricProvider", "auto"), tt());
  }).catch(() => {
  });
  function st() {
    Ue(), C = "", v = [], T = {}, tt();
  }
  async function Fn() {
    const h = p.get("lq").trim() || p.get("ttl").trim();
    if (!h) return;
    if (h.length > 200) {
      Ue(), C = "Enter a song or artist name (1–200 characters).", v = [], tt();
      return;
    }
    Ue();
    const P = et = new AbortController(), ie = Xe, ne = p.get("lyricProvider"), Ne = u.timeout(() => P.abort(), 16e3);
    p.set("lyricLoadStatus", ""), C = "Searching…", v = [], T = {}, tt();
    try {
      if (await Re, u.disposed || ie !== Xe) return;
      if (P.signal.aborted) throw new DOMException("Timed out", "AbortError");
      const Te = await window.ManokaraSession.api(_e("/__lyrics/search"), {
        query: h,
        provider: ne,
        duration: Q > 0 ? Q : null
      }, {
        signal: AbortSignal.any([u.signal, P.signal])
      }), we = await Te.json();
      if (u.disposed || ie !== Xe || h !== (p.get("lq").trim() || p.get("ttl").trim()) || ne !== p.get("lyricProvider")) return;
      if (!Te.ok) throw Error(Te.status === 404 ? "Restart the updated server to enable multi-source lyric search." : we.error || "Lyric search is temporarily unavailable.");
      v = kf(we.results), Array.isArray(we.providers) && (A = Dc(we.providers)), T = we.statuses && typeof we.statuses == "object" ? we.statuses : {}, C = A.some((wt) => wt.enabled) ? "results" : "No lyric sources are enabled on the server.", tt();
    } catch (Te) {
      if (u.disposed || ie !== Xe) return;
      C = P.signal.aborted ? "Lyric search took too long. Try again." : Te.message || "Search failed. Check your connection.", tt();
    } finally {
      Ne(), et === P && (et = null);
    }
  }
  function Po(h) {
    const P = v[h];
    if (!P) return;
    Ue(), p.set("llrc", P.syncedLyrics || P.plainLyrics || ""), p.patch({
      lyricSourceLabel: P.sources.map((ne) => ne.label).join(" · "),
      lyricSourceUrl: _n(P.sources.find((ne) => _n(ne.url))?.url),
      lyricCopyright: P.copyright || "",
      lyricSources: JSON.stringify(Mi(P.sources))
    }), w.sourceReplaced(), Je = P.duration;
    const ie = !!P.syncedLyrics;
    p.set("lyricLoadStatus", a(ie ? "Timed lyrics loaded. Save the song to keep them." : "Plain lyrics loaded. Save the song to keep them.")), C = "", v = [], tt(), H(ie ? "Synced lyrics picked. Press Add/Save to keep them." : "Plain text only: it will scroll roughly evenly. During playback press T to time each line.");
  }
  u.own($.commands.bind("editor", {
    searchLyrics: Fn,
    clearLyricSearch: st,
    selectLyric: Po,
    save: ve,
    cancel: zt,
    addBreak: de,
    urlChanged: Qe,
    lyricsChanged: ae
  })), window.ManokaraSongEditorActions = $.commands.actions("editor"), u.own($.commands.bind("player", {
    play() {
      if (E) {
        I.play();
        return;
      }
      if (!N.length) {
        H("Add a song first.");
        return;
      }
      Vt(O >= 0 && O < N.length ? O : 0);
    },
    pause: () => I.togglePause(),
    stop() {
      Vt(-1), H("Stopped. Press Play to start again.");
    },
    next() {
      Vt(ln());
    },
    previous() {
      Vt(Pi());
    },
    stepKey(h) {
      I.changeKey((E?.pitch || 0) + h);
    },
    resetKey() {
      I.changeKey(0);
    },
    startTabAudio: () => I.startTabAudio(),
    stopTabAudio: () => I.stopTabAudio(),
    setVolume(h) {
      d.set("vol", String(h)), I.setVolume(h), se();
    }
  })), window.ManokaraPlayerActions = $.commands.actions("player"), se();
  const Un = Ct.preferences.get("theme");
  (Un === "light" || Un === "dark") && (document.documentElement.dataset.theme = Un);
  const Kn = l("#transposeDialog"), Ar = [...document.querySelectorAll(".app-header,.main-tabs,#grid,#playlistStudio,.app-footer")];
  function ei() {
    $.ui.setTransposeOpen(!1), Ar.forEach((h) => h.inert = !1), l("#transpose").focus();
  }
  function Oo() {
    $.ui.setTransposeOpen(!0), Ar.forEach((h) => h.inert = !0), u.frame(() => l("#transposeClose").focus());
  }
  u.own($.commands.bind("dialog", {
    openTranspose: Oo,
    closeTranspose: ei
  })), window.ManokaraDialogActions = $.commands.actions("dialog"), u.listen(Kn, "keydown", (h) => {
    if (h.key !== "Tab") return;
    const P = [...Kn.querySelectorAll("button:not([disabled]),a[href]")], ie = P[0], ne = P.at(-1);
    h.shiftKey && document.activeElement === ie ? (h.preventDefault(), ne.focus()) : !h.shiftKey && document.activeElement === ne && (h.preventDefault(), ie.focus());
  }), u.listen(document, "keydown", (h) => {
    h.key === "Escape" && !Kn.hidden && (h.preventDefault(), ei());
  });
  function ga() {
    const h = E, P = h && !h.mc ? Math.round((h.off || 0) * 10) / 10 : 0;
    ir({
      syncValue: a("Sync: ") + (P > 0 ? "+" : P < 0 ? "−" : "") + Math.abs(P).toFixed(1) + " s" + (P > 0 ? a(" (lyrics earlier)") : P < 0 ? a(" (lyrics later)") : ""),
      syncColor: P ? "var(--ac)" : "",
      syncDisabled: !h || !!h.mc,
      labels: Nn()
    });
  }
  function Ir(h) {
    const P = B();
    return h.libraryId && h.librarySync !== !1 && fe(h).then(async () => {
      await Be(), P || H("Saved to My songs. The setlist could not be saved in this browser.");
    }).catch(() => H(P ? "Saved to setlist; My songs could not be updated" : "Browser storage is full or unavailable. Changes remain in this window only.")), P;
  }
  function Rn(h) {
    const P = E;
    !P || P.mc || Number.isFinite(h) && (ge(), P.off = Math.round(h * 1e3) / 1e3, I.invalidateLyrics(), k >= 0 && N[k] === P && p.set("loff", P.off), ga(), Rt(), Ir(P), Ht(), cn(), gt());
  }
  const ya = (h) => {
    E && Number.isFinite(h) && Rn((Number(E.off) || 0) + h);
  }, Vn = rd.map((h, P) => P === 0 ? [a(h[0]), ...h.slice(1)] : h), va = ["cdn", ...gs], ar = Ct.preferences.loadOutput({
    fontCount: Vn.length
  }).value;
  let or = Number(ar.themeSeed) >>> 0;
  d.patch({ ...Object.fromEntries(va.filter((h) => ar[h] != null).map((h) => [h, ar[h]])), lbold: ar.lbold ?? !0, lcenter: !!ar.centerFree });
  const Oi = () => {
    const h = Ii();
    E && !E.mc && E.lyricStyle ? (E.lyricStyle = h, Ir(E)) : Hn = h;
    const P = {};
    va.forEach((ie) => P[ie] = ie === "cdn" ? d.get("cdn") : Hn[ie]), P.lbold = Hn.lbold, P.centerFree = Hn.centerFree, P.themeSeed = Hn.themeSeed, P.fxv = 1, Ct.preferences.saveOutput(P).ok || H("Browser storage is full or unavailable. Changes remain in this window only."), Bi();
  }, Ai = gs;
  function Ii() {
    const h = {
      version: 1,
      lbold: d.get("lbold"),
      centerFree: d.get("lcenter"),
      themeSeed: or
    };
    return Ai.forEach((P) => h[P] = d.get(P)), h;
  }
  let Hn = Ii();
  function ot(h) {
    return ld(h, Hn, {
      fontCount: Vn.length
    });
  }
  function Bi() {
    $.ui.updateOBSSettingsState({
      songStyleEnabled: !!E && !E.mc,
      songStyleSaved: !!E && !E.mc && !!E.lyricStyle,
      songStyleTitle: E && !E.mc ? E.title : ""
    });
  }
  function lr(h) {
    const P = ot(h?.lyricStyle) || Hn;
    h?.lyricStyle?.lfx === "folia-cappella" && (h.lyricStyle = P, Ir(h)), d.patch({ ...Object.fromEntries(Ai.map((ie) => [ie, P[ie]])), lbold: P.lbold, lcenter: P.centerFree }), or = P.themeSeed, Yn(), sr(), Bi();
  }
  function ka(h) {
    const P = E;
    !P || P.mc || (ge(), h ? P.lyricStyle = Ii() : (delete P.lyricStyle, lr(null)), Ir(P), Bi(), Ht(), cn(), gt(), H(h ? "Animation settings saved for this song. Further changes save automatically." : "This song now uses the shared animation settings."));
  }
  function Yn() {
    const h = d.get("lfx"), P = h === "karaoke-classic", ie = h === "jizura";
    $.ui.updateOBSSettingsState({
      classic: P,
      jizura: ie,
      randomTitle: a(ie ? "Reroll the JIZURA lyric-motion style for the current song" : "Select JIZURA to randomize its lyric-motion style"),
      language: ManokaraI18n.language
    });
  }
  function Ao() {
    if (d.get("lfx") !== "jizura") return;
    ge();
    const h = new Uint32Array(1);
    try {
      crypto.getRandomValues(h), or = h[0];
    } catch {
      or = (Date.now() ^ Math.floor(Math.random() * 4294967295)) >>> 0;
    }
    Oi(), Ht(), cn(), gt(), H("JIZURA lyric-motion style randomized. Click again to reroll.");
  }
  function sr() {
    let h = d.get("lshape");
    h === "auto" && (h = innerHeight > innerWidth * 1.1 ? "tall" : "wide");
    const P = d.get("lfx");
    let ie;
    P === "folia-monet" ? ie = "Monet keeps its original lyric-rail and portrait composition; alternating placement is not applied." : P === "folia-pendolo" ? ie = "Pendolo renders its clockwork layout as one scene, so Keep centre free is skipped." : P === "folia-claddagh" ? ie = "Claddagh already arranges lyrics around an open centre; its circular layout is preserved." : ["folia-fume", "folia-sonnet", "folia-tempera", "folia-lumiere", "folia-diorama"].includes(P) ? ie = "This effect combines lyrics and motion in one full-frame scene, so Keep centre free is skipped to preserve the full-frame effect." : ie = "Lyrics alternate around the open centre; the Folia background and full-frame effects stay in place.";
    const ne = d.get("lcenter");
    $.ui.updateOBSSettingsState({
      centerFree: ne,
      shape: h,
      centerTitle: a(ne ? "The dotted area stays clear for a character." : "Enable to keep the dotted centre area clear."),
      centerHint: a(ie),
      language: ManokaraI18n.language
    });
  }
  sr();
  function ti(h) {
    ge(), h === "lclassiccolor" && d.set("ltheme", "effect"), Oi(), h === "lfx" && Yn(), ["lcenter", "lshape", "lfx"].includes(h) && sr(), Ht(), cn(), gt();
  }
  u.listen(window, "resize", sr), Yn();
  function un() {
    if (!pe) {
      H("Wait for the lyric relay to connect.");
      return;
    }
    const h = window.open(window.ManokaraSession.obsUrl(!0), "kpt-lyrics", "width=1280,height=720");
    H(h ? "Green-screen window opened. It shares the OBS effect output." : "Popup blocked. Please allow popups.");
  }
  let Mt = null, jt = !1, ni = null;
  const Br = [];
  let zi = null, zr = 0;
  function ri() {
    const h = E, P = _(), ie = Zt(), ne = E ? ln() : O >= 0 ? O + 1 : 0;
    h || (zi = null), P && h && !h.mc && zi !== h && (zi = h, Br.push({
      song: h,
      title: String(h.title).slice(0, 160),
      index: zr++
    }), Br.length > 120 && Br.shift());
    const Ne = Math.max(0, Math.floor(Math.max(0, ie) / 120) * 120);
    return JSON.stringify({
      now: h ? h.mc ? a("MC break") : String(h.title).slice(0, 160) : "",
      next: N[ne] ? N[ne].mc ? a("MC break") : String(N[ne].title).slice(0, 160) : "",
      videoId: h && !h.mc && We(h.url) || "",
      currentIndex: ie,
      nextIndex: ne < N.length ? ne : -1,
      status: h ? I.state.counting ? "counting" : I.state.paused ? "paused" : h.mc ? "mc" : P ? "playing" : "ready" : "ready",
      songs: N.slice(Ne, Ne + 120).map((Te, we) => ({
        title: String(Te.mc ? a("MC break") : Te.title).slice(0, 160),
        index: we + Ne
      })),
      history: Br.filter((Te) => Te.song !== h).map(({
        title: Te,
        index: we
      }) => ({
        title: Te,
        index: we
      }))
    });
  }
  const ur = ManokaraCore.createLatencyEstimator(), cr = ManokaraAudio.create(l("#audioReaction"), l("#audioStatus"));
  let $n = null, wa = "";
  function cn() {
    const h = Ri.active ? Ht() : null;
    if (!(!pe || Mt !== !0))
      try {
        const P = new URL(window.ManokaraSession.obsUrl(!1)).hash.slice(1), ie = "manokara-live-" + ce + "-" + new URLSearchParams(P).get("view");
        ie !== wa && ($n?.close(), $n = new BroadcastChannel(ie), wa = ie), $n.postMessage({
          snapshot: h || Ht(),
          sentAt: Date.now()
        });
      } catch {
      }
  }
  u.interval(cn, 100);
  function dr(h, P = !0, ie = "") {
    const ne = l("#relayStatus");
    ne && (ne.dataset.state = h ? P ? "connected" : "inactive" : "error", h ? ne.textContent = a(P ? "OBS relay connected" : "OBS relay active · another window controls lyrics") : location.protocol === "file:" ? ne.innerHTML = c('OBS relay unavailable on file:// · <a href="http://localhost:8000/manokara.html">open server version</a>') : location.protocol === "https:" ? ne.textContent = a("Lyric relay unavailable · check deployment") + (ie ? " · " + String(a(String(ie))).replace(/[\r\n\x00-\x1f]/g, " ").slice(0, 120) : "") : ne.textContent = a("OBS relay unavailable · start the server"));
  }
  function Ht() {
    const h = E, P = d.get("lfc").trim().replace(/["<>]/g, ""), ie = P ? '"' + P + '"' : (Vn[+d.get("lfont")] || Vn[0])[1], ne = I.state.countdownRemaining, Ne = Vn[+d.get("lfont")] || Vn[0], Te = d.get("lfx"), we = Te === "jizura" ? "" : P || Ne[2] || "", wt = _(), pt = !I.state.counting && h && !h.mc ? X() : 0, en = pt + (h && !h.mc && !I.state.counting && h.off || 0), Yt = {
      writerId: K,
      ready: !0,
      title: h && !h.mc ? h.title : "",
      lrc: h && !h.mc ? ManokaraLyrics.displayLrc(h) : "",
      romajiLrc: h && !h.mc ? ManokaraLyrics.secondaryLrc(h) : "",
      time: en,
      sampledAt: Date.now(),
      timelineVersion: I.state.timelineVersion,
      playing: wt,
      paused: !!I.state.paused,
      counting: !!I.state.counting,
      countdownRemaining: ne,
      duration: h && !h.mc ? Ke(h) : 0,
      mc: !!(h && h.mc),
      memo: h && h.mc && h.memo || "",
      size: +d.get("lsz") || 64,
      foreground: Te === "karaoke-classic" ? d.get("lclassiccolor") : d.get("lcol"),
      themeSeed: or,
      background: d.get("lbgmode") === "green" ? "#00ff00" : "transparent",
      transparent: d.get("lbgmode") !== "green",
      bold: d.get("lbold"),
      font: ie,
      googleFont: we,
      effect: Te,
      centerFree: d.get("lcenter"),
      centerShape: d.get("lshape"),
      colorTheme: d.get("ltheme")
    };
    return Yt.overlay = window.ManokaraStudio.serialized, Yt.playlist = ri(), Yt.playlistTime = Math.max(0, pt), Object.assign(Yt, wt ? cr.sample() : {
      audioPower: 0,
      audioBass: 0,
      audioLowMid: 0,
      audioMid: 0,
      audioVocal: 0,
      audioTreble: 0
    }), window.ManokaraStudio.feed(Yt), Ri.feed(Yt), Yt;
  }
  async function gt() {
    if (!(u.disposed || u.suspended) && !(jt || !pe || Mt === "inactive")) {
      jt = !0;
      try {
        const h = Ht();
        h.uploadDelayMs = ur.oneWay();
        const P = performance.now(), { partial: ie, packet: ne } = op(h, ni), Ne = new URL(_e("/__lyric-state"));
        ie && Ne.searchParams.set("patch", "1");
        const Te = await window.ManokaraSession.api(Ne, ne, {
          signal: u.signal
        });
        if (Te.status === 428) {
          ni = null;
          return;
        }
        if (Te.status === 409) {
          Mt !== "inactive" && dr(!0, !1), Mt = "inactive";
          return;
        }
        if (!Te.ok) {
          const we = await Te.json().catch(() => ({}));
          throw Error(we.error || "Relay returned HTTP " + Te.status + ".");
        }
        await Te.json(), ni = h, ur.record(performance.now() - P), Mt !== !0 && dr(!0), Mt = !0;
      } catch (h) {
        if (u.disposed) return;
        Mt !== !1 && dr(!1, !0, h.message || "Network request failed."), Mt = !1;
      } finally {
        jt = !1;
      }
    }
  }
  async function Io() {
    try {
      await navigator.clipboard.writeText($.stores.obsSettings.getSnapshot().obsUrl), H("OBS URL copied.");
    } catch {
      if (u.disposed) return;
      l("#obsurl")?.select(), H("Select and copy the OBS URL.");
    }
  }
  async function ji() {
    try {
      await window.ManokaraSession.rotate(), $.ui.updateOBSSettingsState({
        obsUrl: window.ManokaraSession.obsUrl(!1)
      }), window.ManokaraStudio.refresh(), H("Previous OBS links revoked. Update both lyrics and playlist Browser Sources with their new URLs.");
    } catch (h) {
      H(h.message);
    }
  }
  u.own($.commands.bind("obs", {
    settingChanged: ti,
    rememberSongStyle: ka,
    randomizeJizura: Ao,
    openLyricsWindow: un,
    copyUrl: Io,
    rotateLink: ji
  })), window.ManokaraObsActions = $.commands.actions("obs"), u.interval(gt, 200), Re.then(() => gt()).catch((h) => {
    u.disposed || u.suspended || (dr(!1, !0, h.message), H(h.message));
  }), u.interval(() => {
    Mt === !0 && Ce("renew");
  }, 5e3);
  var Je;
  let Pn = "", On = -2, jr = 16, _r = [], _i = {
    primary: "Your words will find their place here.",
    secondary: "Add lyrics to a song to follow along."
  }, Di = "";
  function hr(h, P, ie = null, ne = "") {
    _r = Array.isArray(h) ? h : [], _i = ie, Di = ne;
    const Ne = {
      lines: _r,
      active: P,
      empty: ie,
      info: ne,
      source: E && !E.mc && E.lyricSource || null,
      fontSize: jr,
      labels: Nn()
    };
    $.ui.updateLiveLyrics(Ne);
  }
  function ii(h) {
    jr = Math.min(40, Math.max(11, jr + h)), hr(_r, On, _i, Di);
  }
  function Rt() {
    const h = E;
    if (!h || h.mc || !h.lrc) {
      const we = !!h && !h.mc, wt = we ? "empty:no-lyrics" : "empty:no-song";
      Pn !== wt && (Pn = wt, On = -1, hr([], -1, {
        primary: a(we ? "No lyrics for this song yet." : "Your words will find their place here."),
        secondary: a(we ? "Find or import lyrics in the song editor." : "Add lyrics to a song to follow along.")
      }));
      return;
    }
    const P = $e(h), ie = h._L.k;
    ie !== Pn && (Pn = ie, On = -2);
    const ne = I.state.counting ? -1 : X() + (h.off || 0);
    let Ne = null;
    for (const we of P)
      if (we.t <= ne) Ne = we;
      else break;
    const Te = Ne ? h._L.all.indexOf(Ne) : -1;
    Te !== On && (On = Te, hr(h._L.all, Te, null, h._L.timed ? "" : a("Plain text: scrolling is approximate. Press T on each line to time it.")));
  }
  u.interval(Rt, 150);
  function vn() {
    const h = E;
    if (!h || h.mc || !h.lrc) {
      H("Play a song with lyrics first.");
      return;
    }
    const P = h.lrc.split(/\r?\n/), ie = P.findIndex((we) => we.replace(/\[[^\]]*\]/g, "").trim() && !/^\s*\[\d+:\d{2}/.test(we));
    if (ie < 0) {
      H("All lines already have times.");
      return;
    }
    const ne = Math.max(0, X() + (h.off || 0)), Ne = "[" + String(Math.floor(ne / 60)).padStart(2, "0") + ":" + (ne % 60).toFixed(2).padStart(5, "0") + "]", Te = ManokaraLyrics.validRomaji(h) ? h.romaji.lrc.split(/\r?\n/) : null;
    P[ie] = Ne + P[ie].trim(), h.lrc = P.join(`
`), Te && (Te[ie] = Ne + Te[ie].trim(), h.romaji = {
      source: h.lrc,
      lrc: Te.join(`
`)
    }), I.invalidateLyrics(), Ir(h), Rt(), Ht(), cn(), gt(), H("Timed line " + (ie + 1) + ".");
  }
  u.own($.commands.bind("lyrics", {
    setMode: Or,
    font: ii,
    nudge: ya,
    resetSync() {
      Rn(0);
    },
    tap: vn
  })), window.ManokaraLyricsActions = $.commands.actions("lyrics"), u.listen(document, "keydown", (h) => {
    ManokaraTour.active || !Kn.hidden || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(h.target.tagName) || h.ctrlKey || h.metaKey || h.altKey || (h.key === "t" || h.key === "T") && vn();
  });
  function kn() {
    $.ui.updatePlayerPanelState({
      language: ManokaraI18n.language
    }), ft(), Kt(), Z(), Yn(), sr(), sn(), tt(), Pe(), Z(), $.ui.updateSongEditorView({
      title: a(k >= 0 ? "Edit song" : "Add a song"),
      saveLabel: a(k >= 0 ? "Save changes" : "Add to setlist"),
      editing: k >= 0
    }), E ? E.mc ? ($.ui.updatePlayerPanelState({
      stageMode: "mc",
      stageTitle: a("MC break"),
      stageNote: E.memo || a("Take a moment between songs.")
    }), W(a("MC break"))) : !We(E.url) && !/\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(E.url) && $.ui.updatePlayerPanelState({
      stageMode: "external",
      stageTitle: a("Open this link to play."),
      stageNote: a("This media opens in a new tab. Your lyric clock is running here."),
      stageUrl: E.url,
      stageLinkLabel: a("Open media")
    }) : ($.ui.updatePlayerPanelState({
      stageMode: "empty",
      stageTitle: "",
      stageNote: "",
      stageUrl: ""
    }), W(a("Nothing playing yet"))), !E || E.mc || !E.lrc ? (Pn = "", Rt()) : E._L && hr(_r, On, null, E._L.timed ? "" : a("Plain text: scrolling is approximate. Press T on each line to time it.")), I.state.counting && (q({
      visible: !0,
      title: E.title,
      remaining: I.state.countdownRemaining
    }), le(a("Starting in ") + Math.ceil(I.state.countdownRemaining) + " s")), Mt !== null ? dr(Mt === !0 || Mt === "inactive", Mt !== "inactive") : l("#relayStatus").textContent = a("Connecting to OBS…"), pe || $.ui.updateOBSSettingsState({
      obsUrl: a("Connecting…")
    }), H(G);
  }
  u.listen(window, "manokara:languagechange", () => {
    ft(), Pe(), se();
  }), ManokaraI18n.init(), ManokaraStudio.init({
    changed: () => gt(),
    url: (h) => pe ? ManokaraSession.obsUrl(!1, h) : "",
    clearHistory() {
      Br.length = 0, zr = 0, gt();
    }
  }), u.listen(window, "manokara:languagechange", kn), kn(), ManokaraTour.init({
    showTab: y,
    showMain: ManokaraStudio.showMain,
    main: () => ManokaraStudio.main
  }), u.own($.commands.bind("youtubeSearch", {
    search: async ({
      query: h,
      karaoke: P,
      signal: ie
    }) => (await Re, window.ManokaraSession.api(_e("/__youtube/search"), {
      query: h,
      karaoke: P
    }, {
      signal: ie
    }))
  })), window.ManokaraYoutubeSearchService = $.commands.actions("youtubeSearch").search;
  function Dr(h) {
    const P = l("#panel-song");
    return We(p.get("url").trim()) === h.id ? (y("song"), P.scrollTop = 0, l(".field-grid").scrollIntoView({
      block: "nearest",
      behavior: "instant"
    }), l("#ttl").focus({
      preventScroll: !0
    }), !0) : (k >= 0 || ["url", "ttl", "st", "en", "llrc", "romajiLrc"].some((ne) => p.get(ne).trim())) && !confirm(a("Replace the current song draft with this video? Unsaved edits will be discarded.")) ? !1 : (zt(), p.set("url", "https://www.youtube.com/watch?v=" + h.id), p.set("ttl", h.title), p.set("lq", h.title.replace(/\s*[\(\[【].*$/, "")), Je = h.duration ?? void 0, Q = h.duration ?? void 0, y("song"), P.scrollTop = 0, l(".field-grid").scrollIntoView({
      block: "nearest",
      behavior: "instant"
    }), l("#ttl").focus({
      preventScroll: !0
    }), H("Video selected. Find lyrics if you like, then Add to setlist."), !0);
  }
  u.own($.commands.bind("youtube", {
    choose: Dr
  })), window.ManokaraYoutubeActions = $.commands.actions("youtube");
  function fr({
    navigation: h = !1
  } = {}) {
    u.disposed || (Ce("release"), I.dispose({
      preserveCapture: h
    }), u.dispose(), $n?.close(), $n = null, Ct.library.close(), cr.dispose?.(), window.removeEventListener("pagehide", wn), window.removeEventListener("pageshow", Sa));
  }
  function wn(h) {
    h.persisted ? (I.suspend(), cr.stop?.(), Ht(), cn(), gt(), u.suspend(), $n?.close(), $n = null) : fr({
      navigation: !0
    });
  }
  function Sa(h) {
    !h.persisted || u.disposed || (u.resume(), I.resume(), ni = null, ge(), Ht(), cn(), gt());
  }
  return window.addEventListener("pagehide", wn), window.addEventListener("pageshow", Sa), window.ManokaraController = {
    dispose: fr,
    start: () => I.start(),
    get active() {
      return !u.disposed;
    },
    getSnapshot: () => I.getSnapshot(),
    diagnostics: () => ({
      timers: u.timerCount,
      activeTimers: u.activeTimerCount,
      listeners: u.cleanupCount,
      playback: I.getSnapshot()
    })
  }, I.start(), window.ManokaraController;
}
const Ve = s.createElement;
function sp({
  results: a,
  active: c,
  onSelect: l
}) {
  const u = (p) => {
    if (!Number.isFinite(p) || p <= 0) return "";
    const d = Math.floor(p), y = Math.floor(d / 3600), m = Math.floor(d / 60) % 60, g = d % 60;
    return `${y ? `${y}:` : ""}${y ? String(m).padStart(2, "0") : m}:${String(g).padStart(2, "0")}`;
  };
  return Ve(s.Fragment, null, a.map((p, d) => {
    const y = u(p.duration);
    return Ve("div", {
      key: p.id,
      className: "youtube-result",
      id: `youtube-result-${d}`,
      tabIndex: -1,
      role: "option",
      "aria-selected": d === c,
      "aria-label": p.title + (p.channel ? ` — ${p.channel}` : "") + (y ? ` · ${y}` : ""),
      onMouseDown: (m) => {
        m.button === 0 && m.preventDefault();
      },
      onClick: () => l(d)
    }, Ve("div", {
      className: "youtube-thumbnail"
    }, Ve("img", {
      src: `https://i.ytimg.com/vi/${p.id}/mqdefault.jpg`,
      alt: "",
      loading: "lazy",
      decoding: "async",
      referrerPolicy: "no-referrer"
    }), y && Ve("span", null, y)), Ve("div", {
      className: "youtube-result-copy"
    }, Ve("strong", null, p.title), Ve("small", null, p.channel || "YouTube")), Ve("span", {
      className: "youtube-select",
      "aria-hidden": "true"
    }, "↗"));
  }));
}
function up() {
  const [a, c] = ze.useState(""), [l, u] = ze.useState(() => Ct.preferences.get("preferKaraoke") !== "false"), [p, d] = ze.useState(!1), [y, m] = ze.useState([]), [g, L] = ze.useState(-1), [N, E] = ze.useState("idle"), [M, O] = ze.useState(""), [k, v] = ze.useState(!1), [C, T] = ze.useState(480), [A, Q] = ze.useState(() => window.ManokaraI18n?.language || "en"), I = ze.useRef(null), _ = ze.useRef(null), X = ze.useRef(null), q = ze.useRef(null), ee = ze.useRef(0), se = ze.useRef(null), W = ze.useRef(0), le = ze.useRef(""), Z = ze.useRef(""), V = ze.useRef(!1), J = ze.useRef(null), B = ze.useRef(null), G = ze.useRef(/* @__PURE__ */ new Map()), H = (K) => window.ManokaraI18n?.text(K) || K, w = a.trim().replace(/\s+/g, " "), j = `${w}|${l}`;
  function Y() {
    const K = X.current;
    if (!K || !p) return;
    const ce = K.getBoundingClientRect().top;
    T(Math.max(120, Math.min(480, innerHeight - ce - 12)));
  }
  function S() {
    clearTimeout(ee.current), W.current++, se.current?.abort(), se.current = null, le.current = "";
  }
  function F() {
    S(), d(!1), L(-1), N === "loading" && E("idle");
  }
  J.current = F, B.current = Y;
  function fe(K) {
    S(), c(K), m([]), L(-1), Z.current = "", E("idle"), O(""), d(!0);
  }
  async function be(K = w, ce = l) {
    if (V.current) return;
    const pe = K.trim().replace(/\s+/g, " "), Re = `${pe}|${ce}`;
    if (!pe) {
      d(!0), E("idle");
      return;
    }
    if (le.current === Re) {
      d(!0);
      return;
    }
    S();
    const _e = W.current;
    m([]), L(-1), Z.current = "", O("");
    const Ce = G.current.get(Re);
    if (Ce && Ce.expires > Date.now()) {
      m(Ce.results), Z.current = Re, E(Ce.results.length ? "results" : "empty"), d(!0);
      return;
    }
    const he = new AbortController();
    se.current = he, le.current = Re, E("loading"), d(!0);
    try {
      const Me = $.commands.actions("youtubeSearch").search;
      if (!Me) throw new Error("YouTube search is not ready yet.");
      const ge = await Me({
        query: pe,
        karaoke: ce,
        signal: he.signal
      }), Ke = await ge.json();
      if (_e !== W.current || he.signal.aborted) return;
      if (!ge.ok) throw Error(ge.status === 404 ? "Restart the updated server to enable YouTube search." : Ke.error || "YouTube search is temporarily unavailable. Try again or search on YouTube.");
      if (!Array.isArray(Ke.results)) throw Error("YouTube search is temporarily unavailable. Try again or search on YouTube.");
      const $e = Ke.results.filter((We) => We && typeof We.id == "string" && /^[A-Za-z0-9_-]{11}$/.test(We.id) && typeof We.title == "string").slice(0, 8).map((We) => ({
        id: We.id,
        title: We.title.slice(0, 512),
        channel: typeof We.channel == "string" ? We.channel.slice(0, 160) : "",
        duration: typeof We.duration == "number" ? We.duration : null
      }));
      for (G.current.delete(Re), G.current.set(Re, {
        results: $e,
        expires: Date.now() + 12e4
      }); G.current.size > 30; ) G.current.delete(G.current.keys().next().value);
      Z.current = Re, m($e), E($e.length ? "results" : "empty");
    } catch (Me) {
      if (_e !== W.current || he.signal.aborted) return;
      E("error"), O(Me.name === "TimeoutError" ? "YouTube search took too long. Try again." : Me.name === "TypeError" ? "Could not connect. Check your connection and try again." : Me.message || "YouTube search is temporarily unavailable. Try again or search on YouTube."), m([]), L(-1);
    } finally {
      _e === W.current && (se.current = null, le.current = "");
    }
  }
  function Pe(K) {
    const ce = y[K];
    ce && ($.commands.actions("youtube")?.choose(ce) !== !1 ? F() : _.current?.focus({
      preventScroll: !0
    }));
  }
  function Be(K) {
    if (!y.length) return;
    const ce = (K + y.length) % y.length;
    L(ce), requestAnimationFrame(() => q.current?.querySelector(`#youtube-result-${ce}`)?.scrollIntoView({
      block: "nearest",
      inline: "nearest"
    }));
  }
  function je(K) {
    V.current || K.isComposing || (K.key === "Escape" && p ? (K.preventDefault(), K.stopPropagation(), F()) : K.key === "ArrowDown" || K.key === "ArrowUp" ? (K.preventDefault(), d(!0), y.length ? Be(g < 0 ? K.key === "ArrowDown" ? 0 : y.length - 1 : g + (K.key === "ArrowDown" ? 1 : -1)) : w.length >= 2 && be()) : K.key === "Enter" && p && g >= 0 && (K.preventDefault(), Pe(g)));
  }
  ze.useEffect(() => {
    if (!(!p || k || w.length < 2 || Z.current === j || N === "loading"))
      return ee.current = setTimeout(() => be(w, l), 850), () => clearTimeout(ee.current);
  }, [p, w, l, N, k]), ze.useEffect(() => {
    const K = () => Q(window.ManokaraI18n?.language || "en"), ce = (Re) => {
      I.current?.contains(Re.target) || J.current?.();
    }, pe = () => B.current?.();
    return window.addEventListener("manokara:languagechange", K), window.addEventListener("resize", pe), document.addEventListener("pointerdown", ce, !0), () => {
      window.removeEventListener("manokara:languagechange", K), window.removeEventListener("resize", pe), document.removeEventListener("pointerdown", ce, !0), S();
    };
  }, []), ze.useLayoutEffect(() => {
    p && Y();
  }, [p, A]);
  const me = {
    idle: "Type a song or artist. Search starts after 2 characters.",
    loading: "Searching YouTube…",
    results: "Choose a video to fill the song editor.",
    empty: "No matching videos. Try another name."
  }, Oe = H(N === "error" ? M : me[N] || me.idle), Ee = w || "karaoke", Fe = l && !/karaoke|カラオケ/i.test(Ee) ? `${Ee} karaoke` : Ee, Nt = `https://www.youtube.com/results?search_query=${encodeURIComponent(Fe)}`;
  return /* @__PURE__ */ s.createElement("div", { className: "header-search", ref: I, role: "search", "aria-label": H("Find music on YouTube") }, /* @__PURE__ */ s.createElement("form", { id: "musicSearchForm", className: "music-search-form", onSubmit: (K) => {
    K.preventDefault(), be();
  } }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#magnifying-glass" })), /* @__PURE__ */ s.createElement("input", { ref: _, id: "musicSearch", type: "search", maxLength: 160, placeholder: H("Find a song on YouTube…"), "aria-label": H("Find a song on YouTube"), role: "combobox", "aria-autocomplete": "list", "aria-expanded": p, "aria-activedescendant": g >= 0 ? `youtube-result-${g}` : void 0, "aria-controls": "youtubeResults", autoComplete: "off", spellCheck: !1, value: a, onChange: (K) => fe(K.target.value), onFocus: () => d(!0), onKeyDown: je, onCompositionStart: () => {
    V.current = !0, v(!0), S();
  }, onCompositionEnd: (K) => {
    V.current = !1, v(!1), fe(K.currentTarget.value);
  } }), /* @__PURE__ */ s.createElement("label", { className: "karaoke-search-toggle", title: H("Prefer karaoke versions") }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", checked: l, onChange: (K) => {
    const ce = K.target.checked;
    u(ce), Ct.preferences.set("preferKaraoke", String(ce)), fe(a), _.current?.focus({
      preventScroll: !0
    });
  } }), /* @__PURE__ */ s.createElement("span", null, H("Karaoke"))), /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", type: "submit", "aria-label": H("Search YouTube"), title: H("Search YouTube") }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#caret-right" })))), /* @__PURE__ */ s.createElement("div", { ref: X, id: "musicSearchMenu", className: "music-search-menu", hidden: !p, style: {
    maxHeight: C
  }, onBlurCapture: () => setTimeout(() => {
    I.current?.contains(document.activeElement) || F();
  }, 0) }, /* @__PURE__ */ s.createElement("div", { className: "music-search-heading" }, /* @__PURE__ */ s.createElement("span", { id: "musicSearchStatus", role: "status", "aria-live": "polite" }, Oe), /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", type: "button", "aria-label": H("Close search results"), title: H("Close search results"), onClick: () => {
    _.current?.focus({
      preventScroll: !0
    }), F();
  } }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#x" })))), /* @__PURE__ */ s.createElement("div", { ref: q, id: "youtubeResults", className: "youtube-results", role: "listbox", "aria-label": H("YouTube search results"), "aria-busy": N === "loading" }, /* @__PURE__ */ s.createElement(sp, { results: y, active: g, onSelect: Pe })), /* @__PURE__ */ s.createElement("div", { className: "music-search-footer" }, /* @__PURE__ */ s.createElement("small", null, "↑ ↓ ", H("to choose"), " · Enter ", H("to select")), /* @__PURE__ */ s.createElement("a", { href: Nt, target: "_blank", rel: "noopener noreferrer" }, H("Search on YouTube"), /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#arrow-up-right" }))))));
}
function cp({
  state: a
}) {
  const c = (l) => () => $.commands.actions("tour")?.[l]?.();
  return /* @__PURE__ */ s.createElement("div", { className: "tour-overlay", hidden: !a.open }, /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-spotlight", "aria-hidden": "true" }), /* @__PURE__ */ s.createElement("section", { className: "tour-card", role: "dialog", "aria-modal": "true", "aria-labelledby": "tourTitle", "aria-describedby": "tourBody" }, /* @__PURE__ */ s.createElement("div", { className: "tour-top" }, /* @__PURE__ */ s.createElement("span", { className: "tour-eyebrow" }, a.eyebrow), /* @__PURE__ */ s.createElement("select", { value: a.language, "aria-label": a.languageLabel, onChange: (l) => $.commands.actions("tour")?.setLanguage(l.target.value) }, /* @__PURE__ */ s.createElement("option", { value: "vi" }, "Tiếng Việt"), /* @__PURE__ */ s.createElement("option", { value: "en" }, "English")), /* @__PURE__ */ s.createElement("button", { className: "ghost tour-close", type: "button", "data-tour": "close", "aria-label": a.closeLabel, title: a.closeLabel, onClick: c("close") }, "×")), /* @__PURE__ */ s.createElement("p", { className: "tour-progress", "aria-live": "polite" }, a.progress), /* @__PURE__ */ s.createElement("h2", { id: "tourTitle" }, a.title), /* @__PURE__ */ s.createElement("p", { id: "tourBody" }, a.body), /* @__PURE__ */ s.createElement("div", { className: "tour-track", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("div", { className: "tour-meter", style: {
    width: `${a.meter}%`
  } })), /* @__PURE__ */ s.createElement("div", { className: "tour-actions" }, /* @__PURE__ */ s.createElement("button", { className: "ghost", type: "button", "data-tour": "skip", onClick: c("close") }, a.skipLabel), /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("button", { className: "s", type: "button", "data-tour": "back", disabled: a.backDisabled, onClick: c("back") }, a.backLabel), /* @__PURE__ */ s.createElement("button", { type: "button", "data-tour": "next", onClick: c("next") }, a.nextLabel)))));
}
function dp() {
  const [a, c] = ze.useState(() => window.ManokaraI18n?.language || "en"), l = (u) => Ve("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ve("use", {
    href: `./manokara-icons.svg#${u}`
  }));
  return ze.useEffect(() => {
    const u = () => c(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:languagechange", u), () => window.removeEventListener("manokara:languagechange", u);
  }, []), Ve("div", {
    className: "app-header-react-grid"
  }, Ve("div", {
    className: "brand"
  }, Ve("div", {
    className: "brand-mark"
  }, l("cactus")), Ve("h1", null, "manokara")), Ve(up), Ve("div", {
    className: "header-actions"
  }, Ve("label", {
    className: "language-control"
  }, Ve("select", {
    id: "language",
    "aria-label": "Interface language",
    value: a,
    onChange: (u) => window.ManokaraI18n?.setLanguage(u.target.value)
  }, Ve("option", {
    value: "vi"
  }, "Tiếng Việt"), Ve("option", {
    value: "en"
  }, "English"))), Ve("button", {
    className: "s",
    id: "help",
    type: "button",
    title: "Open the guided tour",
    "aria-haspopup": "dialog",
    onClick: () => window.ManokaraTour?.open()
  }, Ve("span", {
    className: "help-symbol",
    "aria-hidden": "true"
  }, "?"), Ve("span", null, "Help")), Ve("div", {
    className: "connection"
  }, l("broadcast"), Ve("span", {
    id: "relayStatus",
    role: "status"
  }, "Connecting to OBS…")), Ve("button", {
    className: "s",
    id: "transpose",
    type: "button",
    title: "Change song key",
    onClick: () => $.commands.actions("dialog")?.openTranspose()
  }, l("sliders-horizontal"), Ve("span", null, "Key")), Ve("button", {
    className: "s",
    id: "theme",
    type: "button",
    title: "Switch between light and dark theme",
    "aria-label": "Switch color theme",
    onClick: () => {
      const u = document.documentElement, p = u.dataset.theme || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
      u.dataset.theme = p === "dark" ? "light" : "dark", Ct.preferences.set("theme", u.dataset.theme);
    }
  }, l("circle-half"), Ve("span", null, "Theme"))));
}
function hp() {
  const [a, c] = ze.useState(() => window.ManokaraI18n?.language || "en");
  ze.useEffect(() => {
    const u = () => c(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:languagechange", u), () => window.removeEventListener("manokara:languagechange", u);
  }, []);
  const l = (u) => window.ManokaraI18n?.text(u) || u;
  return /* @__PURE__ */ s.createElement(s.Fragment, null, /* @__PURE__ */ s.createElement("span", { lang: a }, l("Sing your way. Your setlist, your room.")), /* @__PURE__ */ s.createElement("details", { lang: a }, /* @__PURE__ */ s.createElement("summary", null, l("Credits & licenses"), /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#caret-right" }))), /* @__PURE__ */ s.createElement("div", { className: "credits-links" }, /* @__PURE__ */ s.createElement("a", { href: "/sources/FOLIA-MAJOR-NOTICE.txt" }, l("Folia notices")), /* @__PURE__ */ s.createElement("a", { href: "/sources/FOLIA-MAJOR-SOURCE.zip" }, l("Folia source")), /* @__PURE__ */ s.createElement("a", { href: "/sources/FOLIA-INTEGRATION-SOURCE/manokara-folia.tsx" }, l("Integration source")), /* @__PURE__ */ s.createElement("a", { href: "/sources/JIZURA-LICENSE.txt" }, l("JIZURA license")), /* @__PURE__ */ s.createElement("a", { href: "/romaji-assets/NOTICES.txt" }, l("Romaji notices")), /* @__PURE__ */ s.createElement("a", { href: "/ui-assets/NOTICES.txt" }, l("Interface fonts & icons")))));
}
function fp() {
  return /* @__PURE__ */ s.createElement("main", { id: "grid", tabIndex: -1, role: "tabpanel", "aria-labelledby": "main-karaoke" }, /* @__PURE__ */ s.createElement("aside", { className: "card", id: "setlistSide", "aria-labelledby": "setlistTitle" }), /* @__PURE__ */ s.createElement("div", { id: "maincol" }, /* @__PURE__ */ s.createElement("div", { id: "playerReactRoot" })), /* @__PURE__ */ s.createElement("section", { className: "card", id: "workspace", "aria-label": "OBS output settings" }, /* @__PURE__ */ s.createElement("div", { id: "obsSettingsReactRoot" })), /* @__PURE__ */ s.createElement("aside", { className: "card", id: "side", "aria-labelledby": "lyricsTitle" }));
}
function pp() {
  const [a, c] = ze.useState(() => window.ManokaraStudio?.view || {
    target: "playlist",
    selected: "current"
  });
  ze.useLayoutEffect(() => {
    const g = (L) => c(L.detail || window.ManokaraStudio?.view || {
      target: "playlist",
      selected: "current"
    });
    return window.addEventListener("manokara:studioviewchange", g), () => window.removeEventListener("manokara:studioviewchange", g);
  }, []);
  const l = (g) => window.ManokaraStudio?.text?.(g) || window.ManokaraI18n?.text(g) || g, u = (g) => /* @__PURE__ */ s.createElement("span", { "data-studio-copy": g }, l(g)), p = (g, L) => /* @__PURE__ */ s.createElement("option", { key: g, value: g, "data-studio-copy": L }, l(L)), d = (g, L, N = "text", E = {}) => /* @__PURE__ */ s.createElement("label", { className: "field", key: L }, /* @__PURE__ */ s.createElement("span", { "data-studio-copy": g }, l(g)), /* @__PURE__ */ s.createElement("input", { id: L, type: N, ...E })), y = {
    glass: "Broadcast dashboard",
    paper: "A paper setlist",
    minimal: "Let the type speak",
    card: "Artwork in the spotlight",
    vinyl: "At the turntable",
    signal: "A compact lower third"
  }, m = window.ManokaraOverlay?.themes || ["glass", "paper", "minimal", "card", "vinyl", "signal"];
  return /* @__PURE__ */ s.createElement("div", { className: "studio-react-shell" }, /* @__PURE__ */ s.createElement("div", { id: "studioPresets", className: "studio-presets", role: "group", "aria-label": "Playlist presets" }, m.map((g) => /* @__PURE__ */ s.createElement("button", { key: g, className: "studio-preset", "data-theme-preset": g }, /* @__PURE__ */ s.createElement("span", { className: `preset-art ${g}`, "data-theme-preview": g, "aria-hidden": "true" }), /* @__PURE__ */ s.createElement("span", { className: "preset-name", "data-studio-copy": g[0].toUpperCase() + g.slice(1) }, l(g[0].toUpperCase() + g.slice(1))), /* @__PURE__ */ s.createElement("small", { className: "preset-description", "data-studio-copy": y[g] }, l(y[g]))))), /* @__PURE__ */ s.createElement("div", { className: "studio-body" }, /* @__PURE__ */ s.createElement("section", { className: "card studio-preview-pane", "aria-labelledby": "studioPreviewTitle" }, /* @__PURE__ */ s.createElement("div", { className: "studio-preview-toolbar" }, /* @__PURE__ */ s.createElement("h3", { id: "studioPreviewTitle" }, u("Live preview")), /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("select", { id: "studioData", "aria-label": "Preview data" }, p("sample", "Sample data"), p("live", "Live data")), /* @__PURE__ */ s.createElement("select", { id: "studioBgView", "aria-label": "Preview background" }, p("checker", "Checkerboard"), p("dark", "Dark"), p("light", "Light"), p("scene", "Scene guide")), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioBoth", type: "checkbox" }), u("Both overlays"))), /* @__PURE__ */ s.createElement("div", { className: "studio-history-tools" }, /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "expand", "aria-haspopup": "dialog", "aria-expanded": "false" }, u("View larger")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "undo" }, u("Undo")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "redo" }, u("Redo")), /* @__PURE__ */ s.createElement("button", { className: "ghost", "data-action": "reset" }, u("Reset layout")))), /* @__PURE__ */ s.createElement("div", { className: "studio-preview-space" }, /* @__PURE__ */ s.createElement("div", { id: "studioPreview", className: "studio-preview", "data-bg": "checker" }, /* @__PURE__ */ s.createElement("div", { id: "studioCanvas" }), /* @__PURE__ */ s.createElement("div", { id: "studioEmpty", className: "studio-empty", role: "status", hidden: !0 })), /* @__PURE__ */ s.createElement("span", { id: "studioFrameBadge", className: "studio-frame-badge" })), /* @__PURE__ */ s.createElement("small", { className: "studio-source-note" }, u("Drag blocks to move; resize with handles. Arrow keys nudge or resize. Preview background is local; OBS remains transparent.")), /* @__PURE__ */ s.createElement("div", { className: "studio-link" }, /* @__PURE__ */ s.createElement("input", { id: "studioObsUrl", readOnly: !0, "aria-label": "Overlay OBS URL" }), /* @__PURE__ */ s.createElement("button", { "data-action": "copy" }, u("Copy OBS link")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "open" }, u("Open output"))), /* @__PURE__ */ s.createElement("small", { className: "studio-source-note" }, /* @__PURE__ */ s.createElement("b", { id: "studioSourceSize" }), " · ", u("Use these dimensions for both OBS Browser Sources. Keep this page open while singing.")), /* @__PURE__ */ s.createElement("div", { id: "studioStatus", className: "studio-status", role: "status" })), /* @__PURE__ */ s.createElement("aside", { className: "card studio-controls", "aria-label": "Overlay settings" }, /* @__PURE__ */ s.createElement("details", { className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Output frame")), /* @__PURE__ */ s.createElement("small", null, u("Canvas dimensions"))), /* @__PURE__ */ s.createElement("label", { className: "field" }, u("Frame size"), /* @__PURE__ */ s.createElement("select", { id: "studioFrame" }, p("1920x1080", "Landscape 1080p"), p("1280x720", "Landscape 720p"), p("1080x1920", "Portrait")))), /* @__PURE__ */ s.createElement("details", { id: "studioLyricSettings", className: "studio-section studio-accordion", hidden: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Lyrics appearance")), /* @__PURE__ */ s.createElement("small", null, u("Settings here are shared with Karaoke → OBS output."))), /* @__PURE__ */ s.createElement("div", { id: "studioLyricControlHost" })), /* @__PURE__ */ s.createElement("details", { id: "studioLayoutSection", className: "studio-section studio-accordion" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Layout")), /* @__PURE__ */ s.createElement("small", null, u("Panel structure"))), /* @__PURE__ */ s.createElement("label", { className: "field" }, u("Layout mode"), /* @__PURE__ */ s.createElement("select", { id: "studioLayout" }, p("separate", "Separate blocks"), p("unified", "One unified panel"))), /* @__PURE__ */ s.createElement("small", { id: "studioGroupNote" }, u("Move and resize the whole panel. Select a section below to edit its text."))), /* @__PURE__ */ s.createElement("details", { id: "studioBlockSection", className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Blocks")), /* @__PURE__ */ s.createElement("small", null, u("Choose what to edit"))), /* @__PURE__ */ s.createElement("div", { id: "studioBlocks", className: `studio-blocks${a.target === "lyrics" ? " studio-blocks-single" : ""}`, role: "group", "aria-label": l("Blocks") }, (a.target === "lyrics" ? ["lyric"] : ["current", "list", "next"]).map((g) => {
    const L = {
      current: "Now Singing",
      list: "Song List",
      next: "Next On",
      lyric: "Lyric viewport"
    };
    return /* @__PURE__ */ s.createElement("button", { key: g, className: "s", type: "button", "data-select": g, "aria-pressed": a.selected === g }, l(L[g]));
  })), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioVisible", type: "checkbox" }), u("Show this block"))), /* @__PURE__ */ s.createElement("details", { id: "studioGeometry", className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Position & size")), /* @__PURE__ */ s.createElement("small", null, u("Drag on preview or enter values"))), /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("X", "studioX", "number", {
    min: "0",
    step: "any"
  }), d("Y", "studioY", "number", {
    min: "0",
    step: "any"
  }), d("Width", "studioW", "number", {
    min: "32",
    step: "any"
  }), d("Height", "studioH", "number", {
    min: "32",
    step: "any"
  })), /* @__PURE__ */ s.createElement("label", { className: "inline-check studio-aspect-lock" }, /* @__PURE__ */ s.createElement("input", { id: "studioAspectLock", type: "checkbox" }), u("Keep aspect ratio"), /* @__PURE__ */ s.createElement("small", { id: "studioAspectRatio" })), /* @__PURE__ */ s.createElement("div", { className: "studio-position-actions" }, /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "top-center" }, u("Top center")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "center" }, u("Center block")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "bottom-center" }, u("Bottom center"))), /* @__PURE__ */ s.createElement("div", { id: "studioCompactSettings" }, /* @__PURE__ */ s.createElement("label", { id: "studioAutoFitField", className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioAutoFit", type: "checkbox" }), u("Fit frame to lyrics")), /* @__PURE__ */ s.createElement("small", { id: "studioAutoFitNote" }, u("Fits the longest lines in this song. Manual position or size edits turn this off.")), /* @__PURE__ */ s.createElement("small", null, u("Text effects use a compact frame. Scene effects and Keep centre free use the full lyric viewport.")))), /* @__PURE__ */ s.createElement("details", { id: "blockTypography", className: "studio-section studio-accordion" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Typography")), /* @__PURE__ */ s.createElement("small", null, u("Text style"))), d("Heading", "studioLabel", "text", {
    maxLength: 80
  }), /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("Text size", "studioSize", "number", {
    min: 12,
    max: 96
  }), /* @__PURE__ */ s.createElement("label", { className: "field" }, u("Alignment"), /* @__PURE__ */ s.createElement("select", { id: "studioAlign" }, p("left", "Left"), p("center", "Center"), p("right", "Right")))), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioBold", type: "checkbox" }), u("Bold"))), /* @__PURE__ */ s.createElement("details", { id: "playlistAppearance", className: "studio-section studio-accordion" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Appearance")), /* @__PURE__ */ s.createElement("small", null, u("Colors and song list"))), /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("Text", "studioFg", "color"), d("Accent", "studioAccent", "color"), d("Panel", "studioBg", "color"), d("Panel opacity", "studioOpacity", "number", {
    min: 0,
    max: 1,
    step: 0.05
  }), d("Corner radius", "studioRadius", "number", {
    min: 0,
    max: 80
  }), /* @__PURE__ */ s.createElement("label", { className: "field" }, u("Font"), /* @__PURE__ */ s.createElement("select", { id: "studioFont" }, p("system", "System"), p("geist", "Geist"), p("serif", "Serif"), p("mono", "Mono")))), /* @__PURE__ */ s.createElement("label", { className: "field" }, u("List content"), /* @__PURE__ */ s.createElement("select", { id: "studioListMode" }, p("all", "Whole setlist"), p("upcoming", "Upcoming songs"), p("history", "Sung history"))), d("Static list limit", "studioLimit", "number", {
    min: 1,
    max: 20
  }), /* @__PURE__ */ s.createElement("label", { id: "studioAutoScrollField", className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioAutoScroll", type: "checkbox" }), u("Auto-scroll song list")), /* @__PURE__ */ s.createElement("div", { id: "studioScrollSettings" }, /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("Scroll speed (px/s)", "studioScrollSpeed", "number", {
    min: 8,
    max: 80,
    step: 1
  }), d("Pause at each end (s)", "studioScrollPause", "number", {
    min: 0,
    max: 10,
    step: 0.5
  })), /* @__PURE__ */ s.createElement("small", null, u("Auto-scroll shows the whole list. Short lists stay still."))), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioNumbering", type: "checkbox" }), u("Show numbers")), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioProgress", type: "checkbox" }), u("Show progress")), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioHideIdle", type: "checkbox" }), u("Hide when idle")), /* @__PURE__ */ s.createElement("button", { className: "ghost", "data-action": "history" }, u("Clear sung history"))), /* @__PURE__ */ s.createElement("details", { className: "studio-section studio-accordion studio-export" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, u("Layout files")), /* @__PURE__ */ s.createElement("small", null, u("Save or restore a layout"))), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "export" }, u("Export layout")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "import" }, u("Import layout")), /* @__PURE__ */ s.createElement("input", { id: "studioImport", type: "file", accept: ".json,application/json", hidden: !0 })))));
}
function mp() {
  return /* @__PURE__ */ s.createElement(pp, null);
}
function gp() {
  const [a, c] = ze.useState(() => window.ManokaraStudio?.view?.target || "playlist"), [l, u] = ze.useState(() => window.ManokaraI18n?.language || "en"), p = l === "vi" ? {
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
  s.useEffect(() => {
    const m = (L) => c(L.detail === "lyrics" ? "lyrics" : "playlist"), g = () => u(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:overlaytargetchange", m), window.addEventListener("manokara:languagechange", g), () => {
      window.removeEventListener("manokara:overlaytargetchange", m), window.removeEventListener("manokara:languagechange", g);
    };
  }, []);
  const d = (m) => window.ManokaraStudio?.showTarget(m), y = (m) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(m.key)) return;
    m.preventDefault();
    const g = m.key === "Home" || m.key === "ArrowLeft" && a === "lyrics" ? "playlist" : m.key === "End" || m.key === "ArrowRight" && a === "playlist" ? "lyrics" : a;
    d(g), m.currentTarget.querySelector(`[data-overlay-tab="${g}"]`)?.focus();
  };
  return Ve("div", {
    className: "studio-heading"
  }, Ve("div", {
    className: "studio-heading-copy"
  }, Ve("span", {
    className: "eyebrow"
  }, p.eyebrow), Ve("h1", null, p.title), Ve("p", null, p.description)), Ve("div", {
    className: "studio-targets",
    role: "tablist",
    "aria-label": p.tabs,
    onKeyDown: y
  }, Ve("button", {
    className: "s",
    type: "button",
    role: "tab",
    "data-overlay-tab": "playlist",
    "aria-selected": a === "playlist",
    tabIndex: a === "playlist" ? 0 : -1,
    onClick: () => d("playlist")
  }, p.playlist), Ve("button", {
    className: "s",
    type: "button",
    role: "tab",
    "data-overlay-tab": "lyrics",
    "aria-selected": a === "lyrics",
    tabIndex: a === "lyrics" ? 0 : -1,
    onClick: () => d("lyrics")
  }, p.lyrics)));
}
function yp() {
  const [a, c] = ze.useState(() => window.ManokaraStudio?.main || "karaoke"), [l, u] = ze.useState(() => window.ManokaraI18n?.language || "en"), p = l === "vi" ? {
    karaoke: "Karaoke",
    overlay: "Overlay",
    name: "Không gian làm việc chính"
  } : {
    karaoke: "Karaoke",
    overlay: "Overlay",
    name: "Main workspace"
  };
  s.useEffect(() => {
    const m = (L) => c(L.detail === "playlist" ? "playlist" : "karaoke"), g = () => u(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:mainviewchange", m), window.addEventListener("manokara:languagechange", g), () => {
      window.removeEventListener("manokara:mainviewchange", m), window.removeEventListener("manokara:languagechange", g);
    };
  }, []);
  const d = (m) => window.ManokaraStudio?.showMain(m), y = (m) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(m.key)) return;
    m.preventDefault();
    const g = m.key === "Home" || m.key === "ArrowLeft" && a === "playlist" ? "karaoke" : m.key === "End" || m.key === "ArrowRight" && a === "karaoke" ? "playlist" : a;
    d(g), m.currentTarget.querySelector(`[data-main-tab="${g}"]`)?.focus();
  };
  return Ve("div", {
    className: "main-tabs-control",
    role: "tablist",
    "aria-label": p.name,
    onKeyDown: y
  }, Ve("button", {
    id: "main-karaoke",
    type: "button",
    role: "tab",
    "data-main-tab": "karaoke",
    "aria-controls": "grid",
    "aria-selected": a === "karaoke",
    tabIndex: a === "karaoke" ? 0 : -1,
    onClick: () => d("karaoke")
  }, p.karaoke), Ve("button", {
    id: "main-playlist",
    type: "button",
    role: "tab",
    "data-main-tab": "playlist",
    "aria-controls": "playlistStudio",
    "aria-selected": a === "playlist",
    tabIndex: a === "playlist" ? 0 : -1,
    title: "Playlist and lyrics overlays",
    onClick: () => d("playlist")
  }, p.overlay));
}
const kt = s.createElement;
function xn({
  name: a,
  component: c,
  shape: l
}) {
  const u = Mo(a);
  return kt(c, l === "state" ? {
    state: u
  } : l === "view" ? {
    view: u
  } : u);
}
const vp = $.ui.updatePlayerPanelState, kp = $.ui.updateOBSSettingsState, wp = $.ui.updateSongEditorView, Sp = $.ui.setTransposeOpen, bp = $.ui.updateTransposeState, Ep = $.ui.updateLibrary;
function ud(a) {
  Lt("mountLibrary", a, kt(xn, {
    name: "library",
    component: Ef,
    shape: "spread"
  }));
}
function cd(a) {
  Lt("mountStudioHeader", a, kt(gp));
}
function dd(a) {
  Lt("mountMainTabs", a, kt(yp));
}
const Cp = $.ui.updateSetlist;
function hd(a) {
  Lt("mountSetlist", a, kt(xn, {
    name: "setlist",
    component: Lf,
    shape: "spread"
  }));
}
const Lp = $.ui.updateLyricSearchResults;
function fd(a) {
  Lt("mountLyricSearchResults", a, kt(xn, {
    name: "lyricSearch",
    component: Sf,
    shape: "spread"
  }));
}
const Tp = $.ui.updatePlayerControls;
function pd(a) {
  Lt("mountPlayerControls", a, kt(xn, {
    name: "playerControls",
    component: ff,
    shape: "state"
  }));
}
function md(a) {
  Lt("mountPlayerPanel", a, kt(xn, {
    name: "playerPanel",
    component: gf,
    shape: "state"
  }));
}
const xp = $.ui.updateLiveLyrics;
function gd(a) {
  Lt("mountLiveLyrics", a, kt(xn, {
    name: "liveLyrics",
    component: wf,
    shape: "state"
  }));
}
function yd(a) {
  Lt("mountOBSSettings", a, kt(xn, {
    name: "obsSettings",
    component: cf,
    shape: "state"
  }));
}
function Np(a) {
  Lt("mountOBSAppearance", a, kt(xn, {
    name: "obsSettings",
    component: hf,
    shape: "state"
  }));
}
function vd(a) {
  Lt("mountSongEditor", a, kt(xn, {
    name: "editorView",
    component: bf,
    shape: "view"
  }));
}
function kd(a) {
  Lt("mountLibraryDialog", a, kt(Cf));
}
function wd(a) {
  Lt("mountTransposeDialog", a, kt(xn, {
    name: "transpose",
    component: pf,
    shape: "state"
  }));
}
function Sd(a) {
  Lt("mountAppFooter", a, kt(hp));
}
const Mp = $.ui.updateTour;
function bd(a) {
  Lt("mountTour", a, kt(xn, {
    name: "tour",
    component: cp,
    shape: "state"
  }));
}
function Ed(a) {
  Lt("mountAppHeader", a, kt(dp));
}
function Cd(a) {
  Lt("mountKaraokeWorkspace", a, kt(fp));
}
function Ld(a) {
  Lt("mountOverlayStudio", a, kt(mp));
}
window.ManokaraReactUI = {
  mountAppFooter: Sd,
  mountLibrary: ud,
  updateLibrary: Ep,
  mountStudioHeader: cd,
  mountOverlayStudio: Ld,
  mountMainTabs: dd,
  mountKaraokeWorkspace: Cd,
  mountSetlist: hd,
  updateSetlist: Cp,
  mountLyricSearchResults: fd,
  updateLyricSearchResults: Lp,
  mountPlayerPanel: md,
  updatePlayerPanelState: vp,
  mountPlayerControls: pd,
  updatePlayerControls: Tp,
  mountLiveLyrics: gd,
  updateLiveLyrics: xp,
  mountOBSSettings: yd,
  updateOBSSettingsState: kp,
  mountSongEditor: vd,
  updateSongEditorView: wp,
  mountLibraryDialog: kd,
  mountTransposeDialog: wd,
  mountAppHeader: Ed,
  mountTour: bd,
  updateTour: Mp,
  setTransposeOpen: Sp,
  updateTransposeState: bp
};
let ws = !1, xo = !1;
const No = () => {
  ws || xo || (ws = !0, bo.flushSync(() => {
    Ed(document.getElementById("appHeaderReactRoot")), Sd(document.getElementById("appFooterReactRoot")), wd(document.getElementById("transposeDialogReactRoot")), bd(document.getElementById("tourReactRoot")), Cd(document.getElementById("karaokeReactRoot"));
  }), bo.flushSync(() => {
    kd(document.getElementById("libraryDialogReactRoot")), hd(document.getElementById("setlistSide")), md(document.getElementById("playerReactRoot")), gd(document.getElementById("side")), yd(document.getElementById("obsSettingsReactRoot")), vd(document.getElementById("songEditorReactRoot")), dd(document.getElementById("mainTabsReactRoot")), Ld(document.getElementById("studioReactLayoutRoot"));
  }), bo.flushSync(() => {
    Np(document.getElementById("obsLyricSettingsReactRoot")), ud(document.getElementById("libraryReactRoot")), pd(document.getElementById("transportReactRoot")), fd(document.getElementById("lyricSearchResultsReactRoot"));
  }), lp(), bo.flushSync(() => {
    cd(document.getElementById("studioReactHeader"));
  }));
};
function Td({
  navigation: a = !1
} = {}) {
  xo || (xo = !0, window.ManokaraTour?.dispose(), window.ManokaraStudio?.dispose(), window.ManokaraController?.dispose({
    navigation: a
  }), Pf(), $.dispose(), window.removeEventListener("pagehide", xd), document.removeEventListener("DOMContentLoaded", No));
}
function xd(a) {
  a.persisted || Td({
    navigation: !0
  });
}
window.addEventListener("pagehide", xd);
window.ManokaraApp = {
  start: No,
  dispose: Td,
  diagnostics: () => ({
    mounted: ws,
    disposed: xo,
    subscriptions: Object.fromEntries(Object.entries($.stores).map(([a, c]) => [a, c.subscriberCount])),
    draftSubscriptions: $.draft.subscriberCount
  })
};
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", No, {
  once: !0
}) : No();
export {
  ud as mountLibrary,
  Ep as updateLibrary
};
