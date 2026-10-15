function nf(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ls = { exports: {} }, qe = {};
var zc;
function rf() {
  if (zc) return qe;
  zc = 1;
  var a = /* @__PURE__ */ Symbol.for("react.element"), u = /* @__PURE__ */ Symbol.for("react.portal"), l = /* @__PURE__ */ Symbol.for("react.fragment"), c = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), g = /* @__PURE__ */ Symbol.for("react.context"), v = /* @__PURE__ */ Symbol.for("react.forward_ref"), h = /* @__PURE__ */ Symbol.for("react.suspense"), C = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), T = Symbol.iterator;
  function x(k) {
    return k === null || typeof k != "object" ? null : (k = T && k[T] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var A = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, S = Object.assign, w = {};
  function b(k, F, ce) {
    this.props = k, this.context = F, this.refs = w, this.updater = ce || A;
  }
  b.prototype.isReactComponent = {}, b.prototype.setState = function(k, F) {
    if (typeof k != "object" && typeof k != "function" && k != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, k, F, "setState");
  }, b.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function L() {
  }
  L.prototype = b.prototype;
  function I(k, F, ce) {
    this.props = k, this.context = F, this.refs = w, this.updater = ce || A;
  }
  var W = I.prototype = new L();
  W.constructor = I, S(W, b.prototype), W.isPureReactComponent = !0;
  var B = Array.isArray, z = Object.prototype.hasOwnProperty, q = { current: null }, J = { key: !0, ref: !0, __self: !0, __source: !0 };
  function te(k, F, ce) {
    var ke, ve = {}, Ie = null, Ne = null;
    if (F != null) for (ke in F.ref !== void 0 && (Ne = F.ref), F.key !== void 0 && (Ie = "" + F.key), F) z.call(F, ke) && !J.hasOwnProperty(ke) && (ve[ke] = F[ke]);
    var fe = arguments.length - 2;
    if (fe === 1) ve.children = ce;
    else if (1 < fe) {
      for (var Pe = Array(fe), be = 0; be < fe; be++) Pe[be] = arguments[be + 2];
      ve.children = Pe;
    }
    if (k && k.defaultProps) for (ke in fe = k.defaultProps, fe) ve[ke] === void 0 && (ve[ke] = fe[ke]);
    return { $$typeof: a, type: k, key: Ie, ref: Ne, props: ve, _owner: q.current };
  }
  function X(k, F) {
    return { $$typeof: a, type: k.type, key: F, ref: k.ref, props: k.props, _owner: k._owner };
  }
  function H(k) {
    return typeof k == "object" && k !== null && k.$$typeof === a;
  }
  function ae(k) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(ce) {
      return F[ce];
    });
  }
  var G = /\/+/g;
  function K(k, F) {
    return typeof k == "object" && k !== null && k.key != null ? ae("" + k.key) : F.toString(36);
  }
  function $(k, F, ce, ke, ve) {
    var Ie = typeof k;
    (Ie === "undefined" || Ie === "boolean") && (k = null);
    var Ne = !1;
    if (k === null) Ne = !0;
    else switch (Ie) {
      case "string":
      case "number":
        Ne = !0;
        break;
      case "object":
        switch (k.$$typeof) {
          case a:
          case u:
            Ne = !0;
        }
    }
    if (Ne) return Ne = k, ve = ve(Ne), k = ke === "" ? "." + K(Ne, 0) : ke, B(ve) ? (ce = "", k != null && (ce = k.replace(G, "$&/") + "/"), $(ve, F, ce, "", function(be) {
      return be;
    })) : ve != null && (H(ve) && (ve = X(ve, ce + (!ve.key || Ne && Ne.key === ve.key ? "" : ("" + ve.key).replace(G, "$&/") + "/") + k)), F.push(ve)), 1;
    if (Ne = 0, ke = ke === "" ? "." : ke + ":", B(k)) for (var fe = 0; fe < k.length; fe++) {
      Ie = k[fe];
      var Pe = ke + K(Ie, fe);
      Ne += $(Ie, F, ce, Pe, ve);
    }
    else if (Pe = x(k), typeof Pe == "function") for (k = Pe.call(k), fe = 0; !(Ie = k.next()).done; ) Ie = Ie.value, Pe = ke + K(Ie, fe++), Ne += $(Ie, F, ce, Pe, ve);
    else if (Ie === "object") throw F = String(k), Error("Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead.");
    return Ne;
  }
  function re(k, F, ce) {
    if (k == null) return k;
    var ke = [], ve = 0;
    return $(k, ke, "", "", function(Ie) {
      return F.call(ce, Ie, ve++);
    }), ke;
  }
  function se(k) {
    if (k._status === -1) {
      var F = k._result;
      F = F(), F.then(function(ce) {
        (k._status === 0 || k._status === -1) && (k._status = 1, k._result = ce);
      }, function(ce) {
        (k._status === 0 || k._status === -1) && (k._status = 2, k._result = ce);
      }), k._status === -1 && (k._status = 0, k._result = F);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var Q = { current: null }, y = { transition: null }, O = { ReactCurrentDispatcher: Q, ReactCurrentBatchConfig: y, ReactCurrentOwner: q };
  function _() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return qe.Children = { map: re, forEach: function(k, F, ce) {
    re(k, function() {
      F.apply(this, arguments);
    }, ce);
  }, count: function(k) {
    var F = 0;
    return re(k, function() {
      F++;
    }), F;
  }, toArray: function(k) {
    return re(k, function(F) {
      return F;
    }) || [];
  }, only: function(k) {
    if (!H(k)) throw Error("React.Children.only expected to receive a single React element child.");
    return k;
  } }, qe.Component = b, qe.Fragment = l, qe.Profiler = p, qe.PureComponent = I, qe.StrictMode = c, qe.Suspense = h, qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O, qe.act = _, qe.cloneElement = function(k, F, ce) {
    if (k == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
    var ke = S({}, k.props), ve = k.key, Ie = k.ref, Ne = k._owner;
    if (F != null) {
      if (F.ref !== void 0 && (Ie = F.ref, Ne = q.current), F.key !== void 0 && (ve = "" + F.key), k.type && k.type.defaultProps) var fe = k.type.defaultProps;
      for (Pe in F) z.call(F, Pe) && !J.hasOwnProperty(Pe) && (ke[Pe] = F[Pe] === void 0 && fe !== void 0 ? fe[Pe] : F[Pe]);
    }
    var Pe = arguments.length - 2;
    if (Pe === 1) ke.children = ce;
    else if (1 < Pe) {
      fe = Array(Pe);
      for (var be = 0; be < Pe; be++) fe[be] = arguments[be + 2];
      ke.children = fe;
    }
    return { $$typeof: a, type: k.type, key: ve, ref: Ie, props: ke, _owner: Ne };
  }, qe.createContext = function(k) {
    return k = { $$typeof: g, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, k.Provider = { $$typeof: d, _context: k }, k.Consumer = k;
  }, qe.createElement = te, qe.createFactory = function(k) {
    var F = te.bind(null, k);
    return F.type = k, F;
  }, qe.createRef = function() {
    return { current: null };
  }, qe.forwardRef = function(k) {
    return { $$typeof: v, render: k };
  }, qe.isValidElement = H, qe.lazy = function(k) {
    return { $$typeof: N, _payload: { _status: -1, _result: k }, _init: se };
  }, qe.memo = function(k, F) {
    return { $$typeof: C, type: k, compare: F === void 0 ? null : F };
  }, qe.startTransition = function(k) {
    var F = y.transition;
    y.transition = {};
    try {
      k();
    } finally {
      y.transition = F;
    }
  }, qe.unstable_act = _, qe.useCallback = function(k, F) {
    return Q.current.useCallback(k, F);
  }, qe.useContext = function(k) {
    return Q.current.useContext(k);
  }, qe.useDebugValue = function() {
  }, qe.useDeferredValue = function(k) {
    return Q.current.useDeferredValue(k);
  }, qe.useEffect = function(k, F) {
    return Q.current.useEffect(k, F);
  }, qe.useId = function() {
    return Q.current.useId();
  }, qe.useImperativeHandle = function(k, F, ce) {
    return Q.current.useImperativeHandle(k, F, ce);
  }, qe.useInsertionEffect = function(k, F) {
    return Q.current.useInsertionEffect(k, F);
  }, qe.useLayoutEffect = function(k, F) {
    return Q.current.useLayoutEffect(k, F);
  }, qe.useMemo = function(k, F) {
    return Q.current.useMemo(k, F);
  }, qe.useReducer = function(k, F, ce) {
    return Q.current.useReducer(k, F, ce);
  }, qe.useRef = function(k) {
    return Q.current.useRef(k);
  }, qe.useState = function(k) {
    return Q.current.useState(k);
  }, qe.useSyncExternalStore = function(k, F, ce) {
    return Q.current.useSyncExternalStore(k, F, ce);
  }, qe.useTransition = function() {
    return Q.current.useTransition();
  }, qe.version = "18.3.1", qe;
}
var jc;
function nd() {
  return jc || (jc = 1, ls.exports = rf()), ls.exports;
}
var _e = nd();
const s = /* @__PURE__ */ nf(_e);
function rd(a = {}) {
  let u = Object.freeze({
    ...a
  });
  const l = /* @__PURE__ */ new Set();
  let c = !1;
  function p(d) {
    if (c || Object.keys(d).length === Object.keys(u).length && Object.keys(d).every((g) => Object.is(d[g], u[g]))) return !1;
    u = Object.freeze({
      ...d
    });
    for (const g of [...l]) g();
    return !0;
  }
  return {
    getSnapshot: () => u,
    patch: (d) => p({
      ...u,
      ...d
    }),
    replace: p,
    subscribe(d) {
      return c ? () => {
      } : (l.add(d), () => l.delete(d));
    },
    dispose() {
      c = !0, l.clear();
    },
    get subscriberCount() {
      return l.size;
    }
  };
}
function af() {
  const a = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  function l(c) {
    if (!u.has(c)) {
      const p = /* @__PURE__ */ new Map();
      u.set(c, new Proxy({}, {
        get(d, g) {
          if (!(typeof g != "string" || g === "then"))
            return p.has(g) || p.set(g, (...v) => a.get(c)?.[g]?.(...v)), p.get(g);
        }
      }));
    }
    return u.get(c);
  }
  return {
    actions: l,
    bind(c, p) {
      return a.set(c, p), () => {
        a.get(c) === p && a.delete(c);
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
  saving: !1,
  importBusy: !1
}), of = /* @__PURE__ */ new Set(["url", "ttl", "st", "en", "llrc", "lq", "lyricProvider", "lyricSourceLabel", "lyricSourceUrl", "lyricCopyright", "lyricSources", "loff", "songKey", "saveToLibrary", "romajiLrc", "lyricMode", "mcm", "mcd"]);
function lf() {
  const a = rd(ko);
  let u = 0;
  function l(c) {
    const p = a.getSnapshot(), d = {};
    for (const [g, v] of Object.entries(c))
      g in ko && (d[g] = typeof ko[g] == "boolean" ? !!v : String(v ?? ""), (g === "llrc" || g === "romajiLrc") && (d[g] = d[g].replace(/\r\n?/g, `
`)));
    return Object.keys(d).some((g) => of.has(g) && d[g] !== p[g]) && u++, a.patch(d);
  }
  return {
    ...a,
    patch: l,
    get: (c) => a.getSnapshot()[c],
    set(c, p) {
      return l({
        [c]: p
      }), p;
    },
    reset() {
      u++, a.replace({
        ...ko,
        saving: a.getSnapshot().saving
      });
    },
    get revision() {
      return u;
    }
  };
}
function sf() {
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
function uf(a = {}) {
  a = {
    ...sf(),
    ...a
  };
  const l = Object.fromEntries(["library", "setlist", "lyricSearch", "playerPanel", "playerControls", "liveLyrics", "obsSettings", "editorView", "transpose", "tour", "outputValues"].map((h) => [h, rd(a[h])])), c = af(), p = lf();
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
    get: (h) => l.outputValues.getSnapshot()[h],
    set(h, C) {
      return l.outputValues.patch({
        [h]: C
      }), C;
    },
    patch: l.outputValues.patch
  }, g = (h) => Object.freeze((Array.isArray(h) ? h : []).map((C) => Object.freeze({
    ...Object.fromEntries(["title", "artist", "url", "libraryId", "mc", "memo", "dur", "s", "e", "mediaDuration", "lrc"].map((N) => [N, C[N]]))
  })));
  return {
    stores: l,
    draft: p,
    controls: d,
    ui: {
      updateLibrary(h, C) {
        l.library.replace({
          songs: g(h),
          labels: C
        });
      },
      updateSetlist(h, C, N, T) {
        l.setlist.replace({
          songs: g(h),
          currentIndex: h.indexOf(C),
          labels: N,
          formatTime: T
        });
      },
      updateLyricSearchResults(h, C, N = {}) {
        l.lyricSearch.patch({
          ...N,
          state: h,
          results: Object.freeze(C.map((T) => Object.freeze({
            ...T
          })))
        });
      },
      updatePlayerPanelState: (h) => l.playerPanel.patch(h),
      updatePlayerControls: (h) => l.playerControls.patch(h),
      updateLiveLyrics: (h) => l.liveLyrics.patch({
        ...h,
        ...h.lines ? {
          lines: Object.freeze(h.lines.map((C) => Object.freeze({
            ...C
          })))
        } : {}
      }),
      updateOBSSettingsState: (h) => l.obsSettings.patch(h),
      updateSongEditorView: (h) => l.editorView.patch(h),
      updateTransposeState: (h) => l.transpose.patch(h),
      setTransposeOpen: (h) => l.transpose.patch({
        open: !!h
      }),
      updateTour: (h) => l.tour.patch(h)
    },
    commands: c,
    dispose() {
      c.dispose(), p.dispose(), Object.values(l).forEach((h) => h.dispose());
    }
  };
}
const Y = uf();
function No(a) {
  const u = Y.stores[a];
  return _e.useSyncExternalStore(u.subscribe, u.getSnapshot, u.getSnapshot);
}
function cf() {
  const a = Y.draft;
  return _e.useSyncExternalStore(a.subscribe, a.getSnapshot, a.getSnapshot);
}
const id = [
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
function df({
  state: a
}) {
  const u = (l) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: `./manokara-icons.svg#${l}` }));
  return /* @__PURE__ */ s.createElement("section", { className: "tabpanel", id: "panel-green", role: "region", "aria-label": "OBS output" }, "    ", /* @__PURE__ */ s.createElement("div", { className: "output-connect" }, "      ", /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("h2", null, "Take your lyrics live."), /* @__PURE__ */ s.createElement("p", null, "Your own output for OBS or a second screen.")), "      ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "lwin", type: "button", onClick: () => Y.commands.actions("obs")?.openLyricsWindow() }, u("arrow-up-right"), "Open lyrics window"), "    "), "    ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "OBS Browser Source URL"), /* @__PURE__ */ s.createElement("div", { className: "obs-link" }, /* @__PURE__ */ s.createElement("input", { id: "obsurl", readOnly: !0, value: a.obsUrl, "aria-label": "OBS Browser Source URL" }), /* @__PURE__ */ s.createElement("button", { id: "copyobs", type: "button", onClick: () => Y.commands.actions("obs")?.copyUrl() }, u("link"), "Copy link"))), "    ", /* @__PURE__ */ s.createElement("div", { className: "obs-note" }, /* @__PURE__ */ s.createElement("small", null, "Paste this into an OBS Browser Source. Keep it active."), /* @__PURE__ */ s.createElement("button", { className: "ghost", id: "rotateobs", type: "button", title: "Revoke the previous OBS link and create a new one", onClick: () => Y.commands.actions("obs")?.rotateLink() }, "Replace link")), "    ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "editLyricLayout", type: "button" }, "Edit lyric layout"), "    ", /* @__PURE__ */ s.createElement("div", { id: "obsLyricSettingsReactRoot" }), "  ");
}
function hf({
  state: a
}) {
  const u = (l) => window.ManokaraI18n?.text(l) || l;
  return /* @__PURE__ */ s.createElement("section", { className: "song-style-settings", "aria-label": u("Song animation settings") }, /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "rememberSongStyle", type: "checkbox", checked: a.songStyleSaved, disabled: !a.songStyleEnabled, onChange: (l) => Y.commands.actions("obs")?.rememberSongStyle(l.target.checked) }), u("Save animation settings for this song")), /* @__PURE__ */ s.createElement("small", { id: "songStyleStatus", role: "status" }, u(a.songStyleEnabled ? a.songStyleSaved ? "Animation changes save automatically for this song." : "Using the shared animation settings." : "Select a song to save its animation settings.")), a.songStyleEnabled && /* @__PURE__ */ s.createElement("small", { className: "song-style-title", title: a.songStyleTitle }, a.songStyleTitle));
}
function ff({
  state: a
}) {
  const u = No("outputValues"), l = (d) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: `./manokara-icons.svg#${d}` })), c = (d) => window.ManokaraI18n?.text(d) || d, p = (d) => Y.commands.actions("obs")?.settingChanged(d.currentTarget.id);
  return /* @__PURE__ */ s.createElement(s.Fragment, null, " ", /* @__PURE__ */ s.createElement("section", { className: "section-divider", "aria-label": c("Lyric animation") }, "      ", /* @__PURE__ */ s.createElement("h3", null, "Lyric animation"), /* @__PURE__ */ s.createElement(hf, { state: a }), "      ", /* @__PURE__ */ s.createElement("div", { className: "settings-grid" }, "        ", /* @__PURE__ */ s.createElement("label", { className: "field wide" }, /* @__PURE__ */ s.createElement("span", null, "Visual style"), /* @__PURE__ */ s.createElement("select", { id: "lfx", value: u.lfx, onChange: (d) => {
    Y.controls.set("lfx", d.currentTarget.value), p(d);
  } }, "          ", /* @__PURE__ */ s.createElement("option", { value: "jizura" }, "JIZURA Auto · full effects"), /* @__PURE__ */ s.createElement("option", { value: "karaoke-classic" }, "Classic karaoke · two-line sweep"), "          ", /* @__PURE__ */ s.createElement("optgroup", { label: "Folia Major · original visualizers" }, "            ", /* @__PURE__ */ s.createElement("option", { value: "folia-classic" }, "Folia · Luminous"), /* @__PURE__ */ s.createElement("option", { value: "folia-cadenza" }, "Folia · Mindscape"), /* @__PURE__ */ s.createElement("option", { value: "folia-partita" }, "Folia · Cloud Steps"), /* @__PURE__ */ s.createElement("option", { value: "folia-fume" }, "Folia · Fume"), /* @__PURE__ */ s.createElement("option", { value: "folia-tilt" }, "Folia · Tilt"), /* @__PURE__ */ s.createElement("option", { value: "folia-claddagh" }, "Folia · Claddagh"), /* @__PURE__ */ s.createElement("option", { value: "folia-monet" }, "Folia · Monet"), /* @__PURE__ */ s.createElement("option", { value: "folia-diorama" }, "Folia · Diorama"), /* @__PURE__ */ s.createElement("option", { value: "folia-pendolo" }, "Folia · Pendolo"), /* @__PURE__ */ s.createElement("option", { value: "folia-sonnet" }, "Folia · Sonnet"), /* @__PURE__ */ s.createElement("option", { value: "folia-tempera" }, "Folia · Tempera"), /* @__PURE__ */ s.createElement("option", { value: "folia-lumiere" }, "Folia · Lumiere"), "          "), "          ", /* @__PURE__ */ s.createElement("option", { value: "tempera" }, "Tempera · ink"), /* @__PURE__ */ s.createElement("option", { value: "sonnet" }, "Sonnet · kinetic focus"), /* @__PURE__ */ s.createElement("option", { value: "lumiere" }, "Lumiere · light reveal"), /* @__PURE__ */ s.createElement("option", { value: "hanabi" }, "Hanabi · character burst"), /* @__PURE__ */ s.createElement("option", { value: "clean" }, "Clean fade"), /* @__PURE__ */ s.createElement("option", { value: "word-pop" }, "Word pop"), /* @__PURE__ */ s.createElement("option", { value: "neon" }, "Neon sweep"), /* @__PURE__ */ s.createElement("option", { value: "glitch" }, "Glitch hit"), "        ")), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Background"), /* @__PURE__ */ s.createElement("select", { id: "lbgmode", value: u.lbgmode, onChange: (d) => {
    Y.controls.set("lbgmode", d.currentTarget.value), p(d);
  } }, /* @__PURE__ */ s.createElement("option", { value: "transparent" }, "Transparent"), /* @__PURE__ */ s.createElement("option", { value: "green" }, "Green screen"))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Color palette"), /* @__PURE__ */ s.createElement("select", { id: "ltheme", value: u.ltheme, onChange: (d) => {
    Y.controls.set("ltheme", d.currentTarget.value), p(d);
  } }, /* @__PURE__ */ s.createElement("option", { value: "effect" }, "Effect palette"), /* @__PURE__ */ s.createElement("option", { value: "white" }, "White"), /* @__PURE__ */ s.createElement("option", { value: "cyan" }, "Ice cyan"), /* @__PURE__ */ s.createElement("option", { value: "rose" }, "Rose"), /* @__PURE__ */ s.createElement("option", { value: "amber" }, "Amber"), /* @__PURE__ */ s.createElement("option", { value: "violet" }, "Violet"), /* @__PURE__ */ s.createElement("option", { value: "mint" }, "Mint"))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Text size"), /* @__PURE__ */ s.createElement("div", { className: "settings-inline" }, /* @__PURE__ */ s.createElement("input", { type: "range", id: "lsz", min: "24", max: "160", "aria-label": "Output text size", disabled: a.jizura, value: u.lsz, onChange: (d) => {
    Y.controls.set("lsz", d.currentTarget.value), p(d);
  } }))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field", hidden: a.classic }, /* @__PURE__ */ s.createElement("span", null, "Text color"), /* @__PURE__ */ s.createElement("input", { type: "color", id: "lcol", disabled: a.jizura, value: u.lcol, onChange: (d) => {
    Y.controls.set("lcol", d.currentTarget.value), p(d);
  } })), "        ", /* @__PURE__ */ s.createElement("label", { id: "classicColorField", className: "field", hidden: !a.classic }, /* @__PURE__ */ s.createElement("span", null, "Sung highlight"), /* @__PURE__ */ s.createElement("input", { type: "color", id: "lclassiccolor", value: u.lclassiccolor, onChange: (d) => {
    Y.controls.set("lclassiccolor", d.currentTarget.value), p(d);
  } })), "      "), "      ", /* @__PURE__ */ s.createElement("small", { id: "classicHint", hidden: !a.classic }, "Two alternating lines, white words and a sung highlight. Enhanced LRC follows word timestamps; regular LRC estimates the sweep. Choose Sung highlight or a color palette for the sweep (blue by default)."), "      ", /* @__PURE__ */ s.createElement("div", { className: "row spaced" }, /* @__PURE__ */ s.createElement("button", { className: "s", id: "lrandom", type: "button", title: a.randomTitle, disabled: !a.jizura, onClick: () => Y.commands.actions("obs")?.randomizeJizura() }, l("shuffle"), "Shuffle JIZURA style")), "      ", /* @__PURE__ */ s.createElement("div", { className: "output-reaction" }, /* @__PURE__ */ s.createElement("button", { className: "s", id: "audioReaction", type: "button" }, "Enable audio reaction"), /* @__PURE__ */ s.createElement("small", { id: "audioStatus" }, "Share the karaoke tab with tab audio enabled. No recording.")), "    "), "    ", /* @__PURE__ */ s.createElement("section", { className: "section-divider", "aria-label": "Output typography" }, "      ", /* @__PURE__ */ s.createElement("h3", null, "Type & layout"), "      ", /* @__PURE__ */ s.createElement("div", { className: "type-settings" }, "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Font family"), /* @__PURE__ */ s.createElement("select", { id: "lfont", disabled: a.jizura, value: u.lfont, onChange: (d) => {
    Y.controls.set("lfont", d.currentTarget.value), p(d);
  } }, id.map(([d], g) => /* @__PURE__ */ s.createElement("option", { key: g, value: g }, c(d))))), "        ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Custom font"), /* @__PURE__ */ s.createElement("input", { id: "lfc", maxLength: "120", placeholder: "An installed or Google font", disabled: a.jizura, value: u.lfc, onChange: (d) => {
    Y.controls.set("lfc", d.currentTarget.value), p(d);
  } })), "        ", /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "lbold", disabled: a.jizura, checked: u.lbold, onChange: (d) => {
    Y.controls.set("lbold", d.currentTarget.checked), p(d);
  } }), "Bold lyrics"), "      "), "      ", /* @__PURE__ */ s.createElement("small", { className: "setting-help" }, "Fonts marked “online” load from Google Fonts. Installed fonts work locally."), "      ", /* @__PURE__ */ s.createElement("div", { id: "centerRow" }, "        ", /* @__PURE__ */ s.createElement("div", { className: "layout-options" }, "          ", /* @__PURE__ */ s.createElement("div", { className: "row" }, "            ", /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "lcenter", checked: u.lcenter, onChange: (d) => {
    Y.controls.set("lcenter", d.currentTarget.checked), p(d);
  } }), "Keep centre free"), "            ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Output frame"), /* @__PURE__ */ s.createElement("select", { id: "lshape", value: u.lshape, onChange: (d) => {
    Y.controls.set("lshape", d.currentTarget.value), p(d);
  } }, /* @__PURE__ */ s.createElement("option", { value: "auto" }, "Automatic"), /* @__PURE__ */ s.createElement("option", { value: "wide" }, "Landscape"), /* @__PURE__ */ s.createElement("option", { value: "tall" }, "Portrait"))), "          "), "          ", /* @__PURE__ */ s.createElement("div", { className: "cf-preview", id: "cfpreview", "data-shape": a.shape, style: {
    opacity: a.centerFree ? 1 : 0.42
  }, title: a.centerTitle }, /* @__PURE__ */ s.createElement("span", { className: "cf-free" }), /* @__PURE__ */ s.createElement("i", { className: "cf-line cf-a" }), /* @__PURE__ */ s.createElement("i", { className: "cf-line cf-b" })), "        "), "        ", /* @__PURE__ */ s.createElement("small", { id: "centerHint" }, a.centerHint), "      "), "    "), "  ");
}
const Ye = s.createElement;
function pf({
  state: a
}) {
  const u = (c) => Ye("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ye("use", {
    href: `./manokara-icons.svg#${c}`
  })), l = (c) => () => Y.commands.actions("player")?.[c]?.();
  return Ye(s.Fragment, null, Ye("div", {
    className: "transport-buttons"
  }, Ye("button", {
    className: "ghost icon-button",
    id: "prev",
    type: "button",
    title: a.previous,
    "aria-label": a.previous,
    onClick: l("previous")
  }, u("skip-back")), Ye("button", {
    id: "play",
    type: "button",
    onClick: l("play")
  }, u("play"), Ye("span", null, a.play)), Ye("button", {
    className: "ghost",
    id: "pause",
    type: "button",
    onClick: l("pause")
  }, u(a.paused ? "play" : "pause"), Ye("span", null, a.paused ? a.resume : a.pause)), Ye("button", {
    className: "ghost icon-button",
    id: "next",
    type: "button",
    title: a.next,
    "aria-label": a.next,
    onClick: l("next")
  }, u("skip-forward")), Ye("button", {
    className: "ghost",
    id: "stop",
    type: "button",
    onClick: l("stop")
  }, u("stop"), Ye("span", null, a.stop))), Ye("div", {
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
    onClick: () => Y.commands.actions("player")?.stepKey(-1)
  }, "−"), Ye("output", {
    "data-pitch-value": ""
  }, a.key > 0 ? `+${a.key}` : String(a.key)), Ye("button", {
    className: "ghost",
    type: "button",
    "data-pitch-step": "1",
    "aria-label": a.raise,
    disabled: !a.canPitch || a.key >= 12,
    onClick: () => Y.commands.actions("player")?.stepKey(1)
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
  }, u("speaker-high"), Ye("input", {
    type: "range",
    id: "vol",
    min: 0,
    max: 100,
    value: a.volume,
    "aria-label": a.volumeLabel,
    onChange: (c) => Y.commands.actions("player")?.setVolume(Number(c.target.value))
  })));
}
function mf({
  state: a,
  onClose: u = Y.commands.actions("dialog").closeTranspose
}) {
  const l = (c) => window.ManokaraI18n?.text(c) || c;
  return Ye("div", {
    id: "transposeDialog",
    className: "modal-backdrop",
    hidden: !a.open,
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
  }, l("Song key"))), Ye("p", null, l("Raise or lower the key without changing the speed. Each song remembers its own setting.")), Ye("div", {
    className: "key-control"
  }, Ye("button", {
    className: "s",
    type: "button",
    "aria-label": l("Lower key"),
    onClick: () => Y.commands.actions("player")?.stepKey(-1)
  }, "−"), Ye("output", {
    "aria-live": "polite"
  }, a.key > 0 ? `+${a.key}` : String(a.key)), Ye("button", {
    className: "s",
    type: "button",
    "aria-label": l("Raise key"),
    onClick: () => Y.commands.actions("player")?.stepKey(1)
  }, "+"), Ye("button", {
    className: "ghost",
    type: "button",
    onClick: () => Y.commands.actions("player")?.resetKey()
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
    onClick: () => Y.commands.actions("player")?.startTabAudio()
  }, l(a.tabAudioActive ? "Open audio window" : "Start Tab Audio")), Ye("button", {
    id: "stopTabAudio",
    className: "ghost",
    type: "button",
    disabled: !a.tabAudioActive && !a.tabAudioBusy,
    onClick: () => Y.commands.actions("player")?.stopTabAudio()
  }, l("Stop Tab Audio"))), Ye("p", null, l("YouTube keeps its own player. Choose the Manokara tab and share tab audio in the audio window. Keep that window open while singing.")), Ye("small", null, l("Try small shifts first (±1–4 semitones). Large shifts can change the sound of a full mix. Lyrics compensate for the processor's audio delay.")), Ye("div", {
    className: "row"
  }, Ye("button", {
    className: "s",
    id: "transposeClose",
    type: "button",
    onClick: u
  }, l("Close"))))));
}
s.createElement;
function gf({
  message: a,
  text: u
}) {
  const l = _e.useRef(null);
  _e.useEffect(() => () => l.current?.(), []);
  const c = (p) => {
    l.current?.();
    try {
      l.current = p.currentTarget.contentWindow.ManokaraOutput?.disconnectPreview;
    } catch {
      l.current = null;
    }
  };
  return /* @__PURE__ */ s.createElement("div", { id: "stageLyricsPreview", className: "stage-lyric-preview", role: "region", "aria-label": u("Lyrics preview") }, /* @__PURE__ */ s.createElement("iframe", { id: "stageLyricsFrame", src: "./manokara-obs.html?preview=stage", title: u("Current song lyric preview"), allow: "autoplay", onLoad: c }), a && /* @__PURE__ */ s.createElement("div", { className: "stage-preview-message", role: "status" }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#music-notes" })), /* @__PURE__ */ s.createElement("p", null, u(a))));
}
function yf({
  state: a
}) {
  const u = No("outputValues"), [l, c] = _e.useState("media"), [p, d] = _e.useState(!0);
  _e.useEffect(() => {
    const N = (T) => d(T.detail === "karaoke");
    return window.addEventListener("manokara:mainviewchange", N), () => window.removeEventListener("manokara:mainviewchange", N);
  }, []);
  const g = l === "lyrics", v = g && p, h = (N) => window.ManokaraI18n?.text(N) || N, C = (N) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#" + N }));
  return /* @__PURE__ */ s.createElement("section", { className: "card", id: "player", "aria-label": "Karaoke player" }, /* @__PURE__ */ s.createElement("div", { className: "player-head" }, /* @__PURE__ */ s.createElement("span", { className: "eyebrow" }, "Your stage"), /* @__PURE__ */ s.createElement("div", { className: "stage-view-switch", role: "group", "aria-label": h("Stage view") }, /* @__PURE__ */ s.createElement("button", { id: "stageMediaButton", type: "button", "aria-pressed": !g, "aria-controls": "stageMediaRoot", onClick: () => c("media") }, "YouTube"), /* @__PURE__ */ s.createElement("button", { id: "stageLyricsButton", type: "button", "aria-pressed": g, "aria-controls": "stageLyricsPreview", onClick: () => c("lyrics") }, h("Lyrics preview"))), /* @__PURE__ */ s.createElement("span", { className: "playback-state", id: "playbackState", "data-state": a.playbackState }, a.playbackLabel)), /* @__PURE__ */ s.createElement("div", { id: "stage" }, /* @__PURE__ */ s.createElement("div", { id: "stageMediaRoot", inert: v ? "" : void 0, "aria-hidden": v || void 0 }), v && /* @__PURE__ */ s.createElement(gf, { message: a.previewMessage, text: h }), !v && a.stageMode === "empty" && /* @__PURE__ */ s.createElement("div", { className: "stage-empty" }, /* @__PURE__ */ s.createElement("div", { className: "stage-glyph" }, C("waveform")), /* @__PURE__ */ s.createElement("h2", null, h("Your next song starts here.")), /* @__PURE__ */ s.createElement("p", null, h("Add a karaoke link, find your lyrics,"), /* @__PURE__ */ s.createElement("br", null), h("and let your voice take the lead.")), /* @__PURE__ */ s.createElement("button", { className: "stage-add", type: "button", onClick: () => Y.commands.actions("setlist")?.openEditor() }, C("plus"), h("Add your first song"))), !v && a.stageMode === "mc" && /* @__PURE__ */ s.createElement("div", { className: "stage-empty mc-stage" }, /* @__PURE__ */ s.createElement("div", { className: "stage-glyph" }, C("microphone-stage")), /* @__PURE__ */ s.createElement("h2", null, a.stageTitle), /* @__PURE__ */ s.createElement("p", null, a.stageNote)), !v && a.stageMode === "external" && /* @__PURE__ */ s.createElement("div", { className: "stage-empty" }, /* @__PURE__ */ s.createElement("div", { className: "stage-glyph" }, C("link")), /* @__PURE__ */ s.createElement("h2", null, a.stageTitle), /* @__PURE__ */ s.createElement("p", null, a.stageNote), /* @__PURE__ */ s.createElement("a", { className: "stage-add", href: a.stageUrl, target: "_blank", rel: "noopener" }, a.stageLinkLabel, " ", C("arrow-up-right"))), !v && a.countdownVisible && /* @__PURE__ */ s.createElement("div", { id: "ov" }, /* @__PURE__ */ s.createElement("b", null, a.countdownTitle), /* @__PURE__ */ s.createElement("span", null, a.countdownValue), /* @__PURE__ */ s.createElement("small", null, a.countdownHint))), /* @__PURE__ */ s.createElement("div", { className: "now-row" }, /* @__PURE__ */ s.createElement("b", { id: "now" }, a.now), /* @__PURE__ */ s.createElement("span", { className: "mu", id: "time" }, a.time), /* @__PURE__ */ s.createElement("a", { id: "yt", href: a.youtubeUrl || "#", target: "_blank", rel: "noopener", hidden: !a.youtubeUrl }, /* @__PURE__ */ s.createElement("span", null, "Open on YouTube"), C("arrow-up-right"))), /* @__PURE__ */ s.createElement("div", { className: "transport", id: "transportReactRoot" }), /* @__PURE__ */ s.createElement("div", { className: "player-options" }, /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "skip", checked: u.skip, onChange: (N) => {
    Y.controls.set("skip", N.currentTarget.checked);
  } }), "Skip unavailable songs"), /* @__PURE__ */ s.createElement("label", { className: "countdown-control" }, "Countdown", /* @__PURE__ */ s.createElement("input", { type: "number", id: "cdn", min: "0", max: "30", "aria-label": "Countdown seconds", value: u.cdn, onChange: (N) => {
    Y.controls.set("cdn", N.currentTarget.value), Y.commands.actions("obs")?.settingChanged("cdn");
  } }), "s")), /* @__PURE__ */ s.createElement("div", { id: "msg", role: "status", "aria-live": "polite" }, a.message)));
}
const ma = Object.freeze([
  { id: "lrclib", label: "LRCLIB", enabled: !0 },
  { id: "netease", label: "NetEase", enabled: !0 },
  { id: "qq", label: "QQ Music · Better Lyrics", enabled: !0, reason: "cache_only" },
  { id: "zing", label: "Zing MP3", enabled: !0 },
  { id: "amll", label: "AMLL TTML", enabled: !0 },
  { id: "musixmatch", label: "Musixmatch", enabled: !1, reason: "needs_key" }
]), vf = [{ id: "megalobiz", label: "Megalobiz" }], _c = Object.freeze({
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
function Dc(a) {
  return Array.isArray(a) ? ma.map((u) => {
    const l = a.find((c) => c && c.id === u.id);
    return { ...u, enabled: l?.enabled === !0, reason: String(l?.reason || "") };
  }) : [];
}
const Fc = /\[\d{1,3}:[0-5]\d(?:[.:]\d{1,3})?\]/g, kf = (a) => a.split(/\r?\n/).some((u) => /^\s*\[\d/.test(u) && u.match(Fc) && u.replace(Fc, "").trim());
function wf(a) {
  if (!Array.isArray(a)) throw Error("Invalid lyric search results.");
  return a.slice(0, 24).filter((u) => u && typeof u.trackName == "string" && typeof u.artistName == "string").map((u) => ({
    ...u,
    syncedLyrics: typeof u.syncedLyrics == "string" && kf(u.syncedLyrics) ? u.syncedLyrics : null,
    plainLyrics: typeof u.plainLyrics == "string" ? u.plainLyrics : null,
    sources: Ni(u.sources)
  })).filter((u) => u.syncedLyrics || u.plainLyrics).sort((u, l) => +!!l.syncedLyrics - +!!u.syncedLyrics);
}
function _n(a) {
  try {
    const u = new URL(a);
    return (["lrclib.net", "music.163.com", "y.qq.com", "zingmp3.vn", "megalobiz.com", "www.megalobiz.com", "musixmatch.com", "www.musixmatch.com"].includes(u.hostname) || u.hostname === "github.com" && u.pathname.startsWith("/amll-dev/amll-ttml-db/")) && u.protocol === "https:" && !u.username && !u.password && (!u.port || u.port === "443") ? u.href : "";
  } catch {
    return "";
  }
}
function Uc(a = [], u = (l) => l) {
  if (!Array.isArray(a)) return "";
  const l = [];
  return (a.includes("auxiliary") || a.includes("background")) && l.push(u("TTML imports main lyrics. Supplied translations, romanization and backing vocals are omitted; you can create Romaji after importing.")), a.includes("overlap") && l.push(u("These lyrics have overlapping lines. Their timing is kept, but views with one active line may show only one part.")), a.includes("reserved_characters") && l.push(u("Literal brackets in lyric text use fullwidth characters to preserve the lyric timeline.")), a.includes("word_timing_unavailable") && l.push(u("Word timing could not be read. Line timing was loaded instead.")), l.join(" ");
}
function Ni(a) {
  if (typeof a == "string")
    try {
      a = JSON.parse(a);
    } catch {
      return [];
    }
  return Array.isArray(a) ? a.slice(0, 8).flatMap((u) => {
    const l = [...ma, ...vf].find((c) => c.id === u?.id);
    return l ? [{ id: l.id, label: l.label, url: _n(u.url) }] : [];
  }) : [];
}
const He = s.createElement, Sf = s.memo(function({
  state: u
}) {
  const {
    lines: l,
    active: c,
    empty: p,
    fontSize: d,
    mode: g,
    modeDisabled: v,
    romajiAvailable: h,
    modeStatus: C,
    info: N,
    source: T,
    syncValue: x,
    syncColor: A,
    syncDisabled: S,
    labels: w
  } = u, b = _e.useRef(null), L = Ni(T?.sources), I = window.ManokaraI18n?.text("Lyrics source") || "Lyrics source", W = _e.useRef([]);
  _e.useLayoutEffect(() => {
    if (c < 0) return;
    const q = b.current, J = W.current[c];
    q && J && (q.scrollTop = J.offsetTop - q.clientHeight / 2 + J.clientHeight / 2);
  }, [l, c]);
  const B = (q) => He("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, He("use", {
    href: `./manokara-icons.svg#${q}`
  })), z = (q) => () => Y.commands.actions("lyrics")?.[q]?.();
  return He(s.Fragment, null, He("div", {
    className: "section-head lyrics-heading"
  }, He("div", {
    className: "section-title"
  }, He("h2", {
    id: "lyricsTitle"
  }, w.title)), He("div", {
    className: "row"
  }, He("button", {
    className: "ghost",
    id: "fm",
    type: "button",
    "aria-label": w.smaller,
    onClick: () => Y.commands.actions("lyrics")?.font(-2)
  }, "A−"), He("button", {
    className: "ghost",
    id: "fp",
    type: "button",
    "aria-label": w.larger,
    onClick: () => Y.commands.actions("lyrics")?.font(2)
  }, "A+"))), He("div", {
    className: "lyrics-mode-row"
  }, He("label", {
    htmlFor: "liveLyricMode"
  }, w.lyrics), He("select", {
    id: "liveLyricMode",
    "aria-label": w.chooseLyrics,
    value: g,
    disabled: v,
    onChange: (q) => Y.commands.actions("lyrics")?.setMode(q.target.value)
  }, He("option", {
    value: "original"
  }, w.original), He("option", {
    value: "romaji",
    disabled: !h
  }, w.romaji), He("option", {
    value: "both",
    disabled: !h
  }, w.both)), He("small", {
    id: "liveLyricModeStatus",
    role: "status",
    "aria-live": "polite"
  }, C)), He("div", {
    id: "pan",
    ref: b,
    tabIndex: 0,
    "aria-label": w.currentLyrics,
    style: {
      "--ps": `${d}px`
    }
  }, p ? He("div", {
    className: "lyrics-empty"
  }, B("text-align-left"), He("span", null, p.primary, He("br"), p.secondary)) : l.map((q, J) => He("div", {
    key: `${J}:${q.t}:${q.x}`,
    className: `ln${J === c ? " cl" : ""}`,
    ref: (te) => {
      W.current[J] = te;
    },
    "aria-current": J === c ? "true" : void 0
  }, q.x ? q.x : B("music-notes"), q.romaji && He("span", {
    className: "romanized"
  }, q.romaji)))), T?.label ? He(
    "div",
    { className: "lyric-attribution live-lyric-source", "data-no-i18n": "" },
    I + ": ",
    L.length ? L.map((q, J) => He(
      s.Fragment,
      { key: `${q.id}-${J}` },
      J ? " · " : null,
      q.url ? He("a", { href: q.url, target: "_blank", rel: "noopener noreferrer" }, q.label + " ↗") : q.label
    )) : _n(T.url) ? He("a", { href: _n(T.url), target: "_blank", rel: "noopener noreferrer" }, T.label) : T.label,
    T.copyright ? He("small", null, T.copyright) : null
  ) : null, He("small", {
    id: "pinfo",
    className: "mu"
  }, N), He("div", {
    className: "lyrics-footer"
  }, He("div", {
    className: "sync-head"
  }, He("span", null, w.liveSync), He("b", {
    id: "offv",
    title: w.currentSync,
    style: {
      color: A
    }
  }, x)), He("div", {
    className: "sync-buttons"
  }, He("button", {
    className: "s",
    id: "lm",
    type: "button",
    disabled: S,
    onClick: () => Y.commands.actions("lyrics")?.nudge(-0.5)
  }, "−0.5 s"), He("button", {
    className: "s",
    id: "lp",
    type: "button",
    disabled: S,
    onClick: () => Y.commands.actions("lyrics")?.nudge(0.5)
  }, "+0.5 s"), He("button", {
    className: "ghost",
    id: "lz",
    type: "button",
    disabled: S,
    onClick: z("resetSync")
  }, w.reset)), He("small", {
    id: "offh"
  }, w.syncHelp), He("div", {
    className: "timing-action"
  }, He("button", {
    className: "ghost",
    id: "tap",
    type: "button",
    onClick: z("tap")
  }, B("clock"), w.setLineTime), He("kbd", null, "T"))));
});
s.createElement;
function bf({ state: a, results: u, statuses: l = [] }) {
  const c = (p) => window.ManokaraI18n?.text(p) || p;
  return /* @__PURE__ */ s.createElement("div", { className: "lyric-search-output", hidden: !a, "data-no-i18n": "" }, /* @__PURE__ */ s.createElement("ol", { id: "lres", "aria-label": c("Lyric search results") }, a === "results" ? u.length ? u.map((p, d) => /* @__PURE__ */ s.createElement("li", { key: `${p.title}-${d}` }, /* @__PURE__ */ s.createElement("button", { className: "lyric-result-button", type: "button", onClick: () => Y.commands.actions("editor")?.selectLyric(d) }, /* @__PURE__ */ s.createElement("span", { className: "lyric-result-copy" }, /* @__PURE__ */ s.createElement("span", null, p.title), /* @__PURE__ */ s.createElement("small", { className: p.timed ? "lyric-result-timed" : "" }, p.kind)), /* @__PURE__ */ s.createElement("small", null, p.duration)), /* @__PURE__ */ s.createElement("div", { className: "lyric-result-sources" }, (p.sources || []).map((g, v) => /* @__PURE__ */ s.createElement(s.Fragment, { key: `${g.label}-${v}` }, v > 0 ? " · " : null, g.url ? /* @__PURE__ */ s.createElement("a", { href: g.url, target: "_blank", rel: "noopener noreferrer" }, g.label, " ↗") : g.label))))) : /* @__PURE__ */ s.createElement("li", { className: "search-message" }, c(l.length ? "No lyrics returned. Some sources could not be reached." : "No results.")) : a ? /* @__PURE__ */ s.createElement("li", { className: "search-message", role: "status" }, a) : null), l.length > 0 ? /* @__PURE__ */ s.createElement("div", { className: "lyric-source-notices", role: "status" }, l.map((p) => /* @__PURE__ */ s.createElement("small", { key: p.id }, p.label, ": ", p.message))) : null);
}
function Ef({
  view: a
}) {
  const u = cf(), l = No("lyricSearch"), c = l.providers?.length ? l.providers : ma, p = Ni(u.lyricSources), d = (h) => window.ManokaraI18n?.text(h) || h, g = (h) => h.enabled ? h.reason === "cache_only" ? d("Cached songs only") : "" : d(h.reason === "needs_key" ? "Needs server API key" : "Disabled on server"), v = (h) => /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: `./manokara-icons.svg#${h}` }));
  return /* @__PURE__ */ s.createElement(s.Fragment, null, "    ", /* @__PURE__ */ s.createElement("div", { className: "studio-dialog-head" }, "      ", /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("span", { className: "eyebrow" }, "Manokara"), /* @__PURE__ */ s.createElement("h2", { id: "songDialogTitle" }, a.title)), "      ", /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", id: "closeSongEditor", type: "button", "aria-label": "Close song editor", onClick: () => document.getElementById("songEditorDialog")?.close() }, v("x")), "    "), "    ", /* @__PURE__ */ s.createElement("div", { id: "songEditorMount" }, "      ", /* @__PURE__ */ s.createElement("section", { className: "tabpanel", id: "panel-song", role: "region", "aria-labelledby": "songDialogTitle" }, "        ", /* @__PURE__ */ s.createElement("div", { className: "panel-intro" }, /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("h2", { id: "ftitle" }, a.title), /* @__PURE__ */ s.createElement("p", null, "A karaoke link, a few lyrics, and you're ready."))), "        ", /* @__PURE__ */ s.createElement("div", { className: "field-grid" }, "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Karaoke link"), /* @__PURE__ */ s.createElement("input", { id: "url", type: "url", placeholder: "Paste a YouTube or media URL", autoComplete: "off", value: u.url, onChange: (h) => {
    Y.draft.set("url", h.currentTarget.value), Y.commands.actions("editor")?.urlChanged();
  } })), "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Song title"), /* @__PURE__ */ s.createElement("input", { id: "ttl", maxLength: "512", placeholder: "Fetched automatically", autoComplete: "off", value: u.ttl, onChange: (h) => {
    Y.draft.set("ttl", h.currentTarget.value);
  } })), "        "), "        ", /* @__PURE__ */ s.createElement("div", { className: "clip-row" }, "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "Start at"), /* @__PURE__ */ s.createElement("input", { id: "st", placeholder: "00:00", inputMode: "decimal", value: u.st, onChange: (h) => {
    Y.draft.set("st", h.currentTarget.value);
  } })), "          ", /* @__PURE__ */ s.createElement("label", { className: "field" }, /* @__PURE__ */ s.createElement("span", null, "End at"), /* @__PURE__ */ s.createElement("input", { id: "en", placeholder: "Full song", inputMode: "decimal", value: u.en, onChange: (h) => {
    Y.draft.set("en", h.currentTarget.value);
  } })), "          ", /* @__PURE__ */ s.createElement("small", null, "Play the whole song or choose a section. End is optional."), "        "), "        ", /* @__PURE__ */ s.createElement("section", { className: "section-divider", "aria-label": "Song lyrics" }, "          ", /* @__PURE__ */ s.createElement("h3", null, "Bring the words along"), "          ", /* @__PURE__ */ s.createElement("div", { className: "search-row" }, /* @__PURE__ */ s.createElement(
    "input",
    {
      id: "lq",
      maxLength: "200",
      "aria-label": "Search lyrics by song or artist",
      placeholder: "Song or artist",
      value: u.lq,
      onKeyDown: (h) => {
        h.key === "Enter" && !h.nativeEvent.isComposing && (h.preventDefault(), Y.commands.actions("editor")?.searchLyrics());
      },
      onChange: (h) => {
        Y.draft.set("lq", h.currentTarget.value), Y.commands.actions("editor")?.clearLyricSearch();
      }
    }
  ), /* @__PURE__ */ s.createElement("button", { className: "s", id: "lsearch", type: "button", "aria-busy": l.busy || !1, onClick: () => Y.commands.actions("editor")?.searchLyrics() }, v("magnifying-glass"), "Find lyrics"), /* @__PURE__ */ s.createElement("button", { className: "text-link", id: "lyricsify", type: "button", title: "Search Lyricsify in a new browser tab" }, "Lyricsify", v("arrow-up-right"))), /* @__PURE__ */ s.createElement("div", { className: "lyric-source-controls", "data-no-i18n": "" }, /* @__PURE__ */ s.createElement("label", { htmlFor: "lyricProvider" }, d("Source"), /* @__PURE__ */ s.createElement("select", { id: "lyricProvider", value: u.lyricProvider, onChange: (h) => {
    Y.draft.set("lyricProvider", h.currentTarget.value), Y.commands.actions("editor")?.clearLyricSearch();
  } }, /* @__PURE__ */ s.createElement("option", { value: "auto" }, d("All sources")), c.map((h) => /* @__PURE__ */ s.createElement("option", { key: h.id, value: h.id, disabled: !h.enabled }, h.label, g(h) ? ` · ${g(h)}` : "")))), /* @__PURE__ */ s.createElement("small", null, d("Timed lyrics first, regardless of source."))), /* @__PURE__ */ s.createElement("p", { id: "lyricLoadStatus", className: "lyric-load-status", role: "status", "aria-live": "polite", hidden: !u.lyricLoadStatus }, u.lyricLoadStatus), /* @__PURE__ */ s.createElement("div", { id: "lyricSearchResultsReactRoot" }), u.lyricSourceLabel ? /* @__PURE__ */ s.createElement("p", { className: "lyric-attribution", "data-no-i18n": "" }, d("Lyrics source"), ": ", p.length ? p.map((h, C) => /* @__PURE__ */ s.createElement(s.Fragment, { key: `${h.id}-${C}` }, C ? " · " : null, h.url ? /* @__PURE__ */ s.createElement("a", { href: h.url, target: "_blank", rel: "noopener noreferrer" }, h.label, " ↗") : h.label)) : _n(u.lyricSourceUrl) ? /* @__PURE__ */ s.createElement("a", { href: _n(u.lyricSourceUrl), target: "_blank", rel: "noopener noreferrer" }, u.lyricSourceLabel, " ↗") : u.lyricSourceLabel, u.lyricCopyright ? /* @__PURE__ */ s.createElement("small", null, u.lyricCopyright) : null) : null, /* @__PURE__ */ s.createElement("div", { id: "lyricDraft" }, "            ", /* @__PURE__ */ s.createElement("div", { className: "editor-toolbar" }, "              ", /* @__PURE__ */ s.createElement("button", { className: "ghost", id: "importLrc", type: "button" }, v("upload-simple"), "Import LRC / TTML"), "              ", /* @__PURE__ */ s.createElement("input", { id: "lrcFile", type: "file", accept: ".lrc,.ttml", hidden: !0 }), "              ", /* @__PURE__ */ s.createElement("label", null, "Encoding", /* @__PURE__ */ s.createElement("select", { id: "lrcEncoding", value: u.lrcEncoding, onChange: (h) => {
    Y.draft.set("lrcEncoding", h.currentTarget.value);
  } }, "                ", /* @__PURE__ */ s.createElement("option", { value: "auto" }, "Auto · UTF-8 / Shift_JIS"), /* @__PURE__ */ s.createElement("option", { value: "utf-8" }, "UTF-8"), /* @__PURE__ */ s.createElement("option", { value: "shift_jis" }, "Shift_JIS"), /* @__PURE__ */ s.createElement("option", { value: "utf-16le" }, "UTF-16LE"), "              ")), "            "), "            ", /* @__PURE__ */ s.createElement("textarea", { id: "llrc", "aria-label": "Original lyrics LRC", maxLength: "200000", placeholder: `[00:12.00] Your first line…
[00:16.50] Your next line…

Paste lyrics or drop an .lrc or .ttml file here.`, value: u.llrc, onChange: (h) => {
    Y.draft.set("llrc", h.currentTarget.value), Y.commands.actions("editor")?.lyricsChanged();
  } }), "            ", /* @__PURE__ */ s.createElement("div", { className: "romaji-row" }, "              ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "romanize", type: "button", disabled: u.romanizeBusy || u.importBusy }, "Create Romaji"), "              ", /* @__PURE__ */ s.createElement("label", null, "Display", /* @__PURE__ */ s.createElement("select", { id: "lyricMode", value: u.lyricMode, onChange: (h) => {
    Y.draft.set("lyricMode", h.currentTarget.value);
  } }, /* @__PURE__ */ s.createElement("option", { value: "original" }, "Original lyrics"), /* @__PURE__ */ s.createElement("option", { value: "romaji", disabled: !u.romajiAvailable }, "Romaji"), /* @__PURE__ */ s.createElement("option", { value: "both", disabled: !u.romajiAvailable }, "Original + Romaji"))), "            "), "            ", /* @__PURE__ */ s.createElement("details", { id: "romajiDetails", open: u.romajiOpen, onToggle: (h) => Y.draft.set("romajiOpen", h.currentTarget.open) }, "              ", /* @__PURE__ */ s.createElement("summary", null, "Review / edit Romaji"), "              ", /* @__PURE__ */ s.createElement("small", null, "Edit readings only. Keep timestamps, metadata and blank lines unchanged. In dual mode, Romaji appears below the original words."), "              ", /* @__PURE__ */ s.createElement("textarea", { id: "romajiLrc", "aria-label": "Romaji lyrics LRC", maxLength: "200000", spellCheck: !1, value: u.romajiLrc, onChange: (h) => {
    Y.draft.set("romajiLrc", h.currentTarget.value);
  } }), "              ", /* @__PURE__ */ s.createElement("button", { className: "s", id: "exportRomaji", type: "button" }, v("download-simple"), "Download Romaji LRC"), "            "), "            ", /* @__PURE__ */ s.createElement("small", { id: "lyricsStatus", role: "status", "aria-live": "polite", className: u.lyricsError ? "error" : "" }, u.lyricsStatus), "          "), "        "), "        ", /* @__PURE__ */ s.createElement("div", { className: "form-actions" }, "          ", /* @__PURE__ */ s.createElement("label", { className: "pitch-song-field" }, "Song key", /* @__PURE__ */ s.createElement("input", { id: "songKey", type: "number", min: "-12", max: "12", step: "1", "aria-label": "Saved song key in semitones", value: u.songKey, onChange: (h) => {
    Y.draft.set("songKey", h.currentTarget.value);
  } })), "          ", /* @__PURE__ */ s.createElement("label", null, "Lyric offset", /* @__PURE__ */ s.createElement("input", { type: "number", id: "loff", step: "0.1", "aria-label": "Lyric offset in seconds", value: u.loff, onChange: (h) => {
    Y.draft.set("loff", h.currentTarget.value);
  } }), "s"), "          ", /* @__PURE__ */ s.createElement("label", { className: "inline-check library-save-check" }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", id: "saveToLibrary", checked: u.saveToLibrary, onChange: (h) => {
    Y.draft.set("saveToLibrary", h.currentTarget.checked);
  } }), "Keep in My songs"), "          ", /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("button", { className: "ghost", id: "cancel", type: "button", hidden: !a.editing, onClick: () => Y.commands.actions("editor")?.cancel() }, "Cancel edit"), /* @__PURE__ */ s.createElement("button", { id: "add", type: "button", onClick: () => Y.commands.actions("editor")?.save(), disabled: u.saving || u.importBusy }, v(a.editing ? "check" : "plus"), /* @__PURE__ */ s.createElement("span", null, a.saveLabel))), "        "), "        ", /* @__PURE__ */ s.createElement("details", { id: "mcDetails" }, "          ", /* @__PURE__ */ s.createElement("summary", null, "Add an MC break"), "          ", /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("input", { id: "mcm", maxLength: "4096", placeholder: "Your note or announcement", "aria-label": "MC break note", value: u.mcm, onChange: (h) => {
    Y.draft.set("mcm", h.currentTarget.value);
  } }), /* @__PURE__ */ s.createElement("input", { id: "mcd", placeholder: "00:30", "aria-label": "MC break duration", value: u.mcd, onChange: (h) => {
    Y.draft.set("mcd", h.currentTarget.value);
  } }), /* @__PURE__ */ s.createElement("button", { className: "s", id: "addmc", type: "button", onClick: () => Y.commands.actions("editor")?.addBreak() }, v("plus"), "Add break")), "        "), "      "), "    "), "  ");
}
const Ut = s.createElement;
function Tf({
  songs: a,
  labels: u
}) {
  const [l, c] = _e.useState(""), p = l.trim().toLocaleLowerCase(), d = a.filter((g) => !p || `${g.title || ""} ${g.artist || ""}`.toLocaleLowerCase().includes(p));
  return Ut(s.Fragment, null, Ut("label", {
    className: "field",
    htmlFor: "librarySearch"
  }, Ut("span", null, u.search), Ut("input", {
    id: "librarySearch",
    type: "search",
    placeholder: u.placeholder,
    value: l,
    onChange: (g) => c(g.target.value)
  })), Ut("div", {
    id: "libraryEmpty",
    className: "library-empty",
    hidden: d.length > 0
  }, p ? u.noMatches : u.empty), Ut("ol", {
    id: "libraryList",
    "aria-label": u.listLabel,
    "data-ids": JSON.stringify(d.map((g) => g.libraryId))
  }, d.map((g) => Ut("li", {
    key: g.libraryId
  }, Ut("div", {
    className: "library-song-info"
  }, Ut("b", null, g.title || g.url), Ut("small", null, g.lrc ? u.lyricsSaved : u.noLyrics)), Ut("div", {
    className: "library-song-actions"
  }, Ut("button", {
    className: "s",
    type: "button",
    onClick: () => Y.commands.actions("library")?.add(g.libraryId)
  }, u.add), Ut("button", {
    className: "ghost icon-button",
    type: "button",
    onClick: () => Y.commands.actions("library")?.remove(g.libraryId),
    "aria-label": u.remove,
    title: u.remove
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
  currentIndex: u,
  labels: l,
  formatTime: c
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
    onClick: () => Y.commands.actions("setlist")?.openLibrary(),
    "aria-haspopup": "dialog",
    "aria-controls": "libraryDialog"
  }, p("playlist"), nt("span", null, l.mySongs), nt("span", {
    className: "count",
    id: "libraryCount"
  }, l.libraryCount))), nt("button", {
    className: "s setlist-add",
    id: "openSongEditor",
    type: "button",
    onClick: () => Y.commands.actions("setlist")?.openEditor(),
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
  }, a.map((d, g) => {
    const v = d.mc ? `${l.mcPrefix}${d.memo || l.announcement}` : d.title || d.url, h = d.mc ? d.dur : d.e != null ? d.e - (d.s || 0) : d.mediaDuration, C = d.mc ? l.mcBreak : l.kind(g, d), N = g === u, T = `${d.libraryId || d.url || d.memo || "song"}:${g}`, x = (A, S, w, b = !1) => nt("button", {
      key: A,
      className: "ghost",
      type: "button",
      "data-a": A,
      title: S,
      "aria-label": S,
      disabled: b
    }, p(w));
    return nt("li", {
      key: T,
      className: N ? "on" : "",
      "data-i": g,
      onClick: (A) => {
        const S = A.target.closest("[data-a]");
        S && Y.commands.actions("setlist")?.song(g, S.dataset.a);
      }
    }, nt("span", {
      className: "song-number"
    }, String(g + 1).padStart(2, "0")), nt("button", {
      className: "t",
      type: "button",
      "data-a": "go",
      title: v,
      "aria-pressed": N
    }, nt("span", {
      className: "song-name"
    }, v)), nt("small", {
      className: "song-meta"
    }, [C, d.lrc ? l.lyricsReady : "", Number.isFinite(h) ? c(h) : ""].filter(Boolean).join(" · ")), nt("div", {
      className: "list-actions"
    }, [!d.mc && x("ed", l.edit, "pencil-simple"), x("up", l.moveUp, "arrow-up", g === 0), x("dn", l.moveDown, "arrow-down", g === a.length - 1), x("del", l.remove, "x")].filter(Boolean)));
  })), nt("div", {
    className: "setlist-footer"
  }, nt("button", {
    className: "ghost",
    id: "clr",
    type: "button",
    onClick: () => Y.commands.actions("setlist")?.clear(),
    disabled: a.length === 0
  }, p("trash"), l.clear), nt("small", null, l.savedBrowser)));
}
var wo = {}, ss = { exports: {} }, Qt = {}, us = { exports: {} }, cs = {};
var Kc;
function Mf() {
  return Kc || (Kc = 1, (function(a) {
    function u(y, O) {
      var _ = y.length;
      y.push(O);
      e: for (; 0 < _; ) {
        var k = _ - 1 >>> 1, F = y[k];
        if (0 < p(F, O)) y[k] = O, y[_] = F, _ = k;
        else break e;
      }
    }
    function l(y) {
      return y.length === 0 ? null : y[0];
    }
    function c(y) {
      if (y.length === 0) return null;
      var O = y[0], _ = y.pop();
      if (_ !== O) {
        y[0] = _;
        e: for (var k = 0, F = y.length, ce = F >>> 1; k < ce; ) {
          var ke = 2 * (k + 1) - 1, ve = y[ke], Ie = ke + 1, Ne = y[Ie];
          if (0 > p(ve, _)) Ie < F && 0 > p(Ne, ve) ? (y[k] = Ne, y[Ie] = _, k = Ie) : (y[k] = ve, y[ke] = _, k = ke);
          else if (Ie < F && 0 > p(Ne, _)) y[k] = Ne, y[Ie] = _, k = Ie;
          else break e;
        }
      }
      return O;
    }
    function p(y, O) {
      var _ = y.sortIndex - O.sortIndex;
      return _ !== 0 ? _ : y.id - O.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var g = Date, v = g.now();
      a.unstable_now = function() {
        return g.now() - v;
      };
    }
    var h = [], C = [], N = 1, T = null, x = 3, A = !1, S = !1, w = !1, b = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function W(y) {
      for (var O = l(C); O !== null; ) {
        if (O.callback === null) c(C);
        else if (O.startTime <= y) c(C), O.sortIndex = O.expirationTime, u(h, O);
        else break;
        O = l(C);
      }
    }
    function B(y) {
      if (w = !1, W(y), !S) if (l(h) !== null) S = !0, se(z);
      else {
        var O = l(C);
        O !== null && Q(B, O.startTime - y);
      }
    }
    function z(y, O) {
      S = !1, w && (w = !1, L(te), te = -1), A = !0;
      var _ = x;
      try {
        for (W(O), T = l(h); T !== null && (!(T.expirationTime > O) || y && !ae()); ) {
          var k = T.callback;
          if (typeof k == "function") {
            T.callback = null, x = T.priorityLevel;
            var F = k(T.expirationTime <= O);
            O = a.unstable_now(), typeof F == "function" ? T.callback = F : T === l(h) && c(h), W(O);
          } else c(h);
          T = l(h);
        }
        if (T !== null) var ce = !0;
        else {
          var ke = l(C);
          ke !== null && Q(B, ke.startTime - O), ce = !1;
        }
        return ce;
      } finally {
        T = null, x = _, A = !1;
      }
    }
    var q = !1, J = null, te = -1, X = 5, H = -1;
    function ae() {
      return !(a.unstable_now() - H < X);
    }
    function G() {
      if (J !== null) {
        var y = a.unstable_now();
        H = y;
        var O = !0;
        try {
          O = J(!0, y);
        } finally {
          O ? K() : (q = !1, J = null);
        }
      } else q = !1;
    }
    var K;
    if (typeof I == "function") K = function() {
      I(G);
    };
    else if (typeof MessageChannel < "u") {
      var $ = new MessageChannel(), re = $.port2;
      $.port1.onmessage = G, K = function() {
        re.postMessage(null);
      };
    } else K = function() {
      b(G, 0);
    };
    function se(y) {
      J = y, q || (q = !0, K());
    }
    function Q(y, O) {
      te = b(function() {
        y(a.unstable_now());
      }, O);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(y) {
      y.callback = null;
    }, a.unstable_continueExecution = function() {
      S || A || (S = !0, se(z));
    }, a.unstable_forceFrameRate = function(y) {
      0 > y || 125 < y ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : X = 0 < y ? Math.floor(1e3 / y) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, a.unstable_getFirstCallbackNode = function() {
      return l(h);
    }, a.unstable_next = function(y) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = x;
      }
      var _ = x;
      x = O;
      try {
        return y();
      } finally {
        x = _;
      }
    }, a.unstable_pauseExecution = function() {
    }, a.unstable_requestPaint = function() {
    }, a.unstable_runWithPriority = function(y, O) {
      switch (y) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          y = 3;
      }
      var _ = x;
      x = y;
      try {
        return O();
      } finally {
        x = _;
      }
    }, a.unstable_scheduleCallback = function(y, O, _) {
      var k = a.unstable_now();
      switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? k + _ : k) : _ = k, y) {
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
      return F = _ + F, y = { id: N++, callback: O, priorityLevel: y, startTime: _, expirationTime: F, sortIndex: -1 }, _ > k ? (y.sortIndex = _, u(C, y), l(h) === null && y === l(C) && (w ? (L(te), te = -1) : w = !0, Q(B, _ - k))) : (y.sortIndex = F, u(h, y), S || A || (S = !0, se(z))), y;
    }, a.unstable_shouldYield = ae, a.unstable_wrapCallback = function(y) {
      var O = x;
      return function() {
        var _ = x;
        x = O;
        try {
          return y.apply(this, arguments);
        } finally {
          x = _;
        }
      };
    };
  })(cs)), cs;
}
var Vc;
function xf() {
  return Vc || (Vc = 1, us.exports = Mf()), us.exports;
}
var Hc;
function Nf() {
  if (Hc) return Qt;
  Hc = 1;
  var a = nd(), u = xf();
  function l(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = /* @__PURE__ */ new Set(), p = {};
  function d(e, t) {
    g(e, t), g(e + "Capture", t);
  }
  function g(e, t) {
    for (p[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var v = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), h = Object.prototype.hasOwnProperty, C = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, N = {}, T = {};
  function x(e) {
    return h.call(T, e) ? !0 : h.call(N, e) ? !1 : C.test(e) ? T[e] = !0 : (N[e] = !0, !1);
  }
  function A(e, t, n, r) {
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
  function S(e, t, n, r) {
    if (t === null || typeof t > "u" || A(e, t, n, r)) return !0;
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
  function w(e, t, n, r, i, o, m) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = m;
  }
  var b = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    b[e] = new w(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    b[t] = new w(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    b[e] = new w(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    b[e] = new w(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    b[e] = new w(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    b[e] = new w(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    b[e] = new w(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    b[e] = new w(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    b[e] = new w(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var L = /[\-:]([a-z])/g;
  function I(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      L,
      I
    );
    b[t] = new w(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(L, I);
    b[t] = new w(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(L, I);
    b[t] = new w(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    b[e] = new w(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), b.xlinkHref = new w("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    b[e] = new w(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function W(e, t, n, r) {
    var i = b.hasOwnProperty(t) ? b[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (S(t, n, i, r) && (n = null), r || i === null ? x(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var B = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, z = /* @__PURE__ */ Symbol.for("react.element"), q = /* @__PURE__ */ Symbol.for("react.portal"), J = /* @__PURE__ */ Symbol.for("react.fragment"), te = /* @__PURE__ */ Symbol.for("react.strict_mode"), X = /* @__PURE__ */ Symbol.for("react.profiler"), H = /* @__PURE__ */ Symbol.for("react.provider"), ae = /* @__PURE__ */ Symbol.for("react.context"), G = /* @__PURE__ */ Symbol.for("react.forward_ref"), K = /* @__PURE__ */ Symbol.for("react.suspense"), $ = /* @__PURE__ */ Symbol.for("react.suspense_list"), re = /* @__PURE__ */ Symbol.for("react.memo"), se = /* @__PURE__ */ Symbol.for("react.lazy"), Q = /* @__PURE__ */ Symbol.for("react.offscreen"), y = Symbol.iterator;
  function O(e) {
    return e === null || typeof e != "object" ? null : (e = y && e[y] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var _ = Object.assign, k;
  function F(e) {
    if (k === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      k = t && t[1] || "";
    }
    return `
` + k + e;
  }
  var ce = !1;
  function ke(e, t) {
    if (!e || ce) return "";
    ce = !0;
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
`), m = i.length - 1, E = o.length - 1; 1 <= m && 0 <= E && i[m] !== o[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (i[m] !== o[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || i[m] !== o[E]) {
                var M = `
` + i[m].replace(" at new ", " at ");
                return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), M;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      ce = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? F(e) : "";
  }
  function ve(e) {
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
        return e = ke(e.type, !1), e;
      case 11:
        return e = ke(e.type.render, !1), e;
      case 1:
        return e = ke(e.type, !0), e;
      default:
        return "";
    }
  }
  function Ie(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case J:
        return "Fragment";
      case q:
        return "Portal";
      case X:
        return "Profiler";
      case te:
        return "StrictMode";
      case K:
        return "Suspense";
      case $:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ae:
        return (e.displayName || "Context") + ".Consumer";
      case H:
        return (e._context.displayName || "Context") + ".Provider";
      case G:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case re:
        return t = e.displayName || null, t !== null ? t : Ie(e.type) || "Memo";
      case se:
        t = e._payload, e = e._init;
        try {
          return Ie(e(t));
        } catch {
        }
    }
    return null;
  }
  function Ne(e) {
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
        return Ie(t);
      case 8:
        return t === te ? "StrictMode" : "Mode";
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
  function fe(e) {
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
  function Pe(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function be(e) {
    var t = Pe(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
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
  function Fe(e) {
    e._valueTracker || (e._valueTracker = be(e));
  }
  function xt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = Pe(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function V(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function de(e, t) {
    var n = t.checked;
    return _({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function me(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = fe(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Ae(e, t) {
    t = t.checked, t != null && W(e, "checked", t, !1);
  }
  function je(e, t) {
    Ae(e, t);
    var n = fe(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? pe(e, t.type, n) : t.hasOwnProperty("defaultValue") && pe(e, t.type, fe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Ce(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function pe(e, t, n) {
    (t !== "number" || V(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Oe = Array.isArray;
  function ge(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + fe(n), t = null, i = 0; i < e.length; i++) {
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
    return _({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function $e(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(l(92));
        if (Oe(n)) {
          if (1 < n.length) throw Error(l(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: fe(n) };
  }
  function We(e, t) {
    var n = fe(t.value), r = fe(t.defaultValue);
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
  var Vt = _({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function xn(e, t) {
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
  var Nn = null, ft = null, zt = null;
  function oe(e) {
    if (e = Xi(e)) {
      if (typeof Nn != "function") throw Error(l(280));
      var t = e.stateNode;
      t && (t = Aa(t), Nn(e.stateNode, e.type, t));
    }
  }
  function we(e) {
    ft ? zt ? zt.push(e) : zt = [e] : ft = e;
  }
  function he() {
    if (ft) {
      var e = ft, t = zt;
      if (zt = ft = null, oe(e), t) for (e = 0; e < t.length; e++) oe(t[e]);
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
      et = !1, (ft !== null || zt !== null) && (tt(), he());
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
  if (v) try {
    var Fn = {};
    Object.defineProperty(Fn, "passive", { get: function() {
      st = !0;
    } }), window.addEventListener("test", Fn, Fn), window.removeEventListener("test", Fn, Fn);
  } catch {
    st = !1;
  }
  function Po(e, t, n, r, i, o, m, E, M) {
    var U = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, U);
    } catch (ie) {
      this.onError(ie);
    }
  }
  var Un = !1, Kn = null, Ar = !1, ei = null, Oo = { onError: function(e) {
    Un = !0, Kn = e;
  } };
  function ga(e, t, n, r, i, o, m, E, M) {
    Un = !1, Kn = null, Po.apply(Oo, arguments);
  }
  function Ir(e, t, n, r, i, o, m, E, M) {
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
        for (var m = !1, E = i.child; E; ) {
          if (E === n) {
            m = !0, n = i, r = o;
            break;
          }
          if (E === r) {
            m = !0, r = i, n = o;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = o.child; E; ) {
            if (E === n) {
              m = !0, n = o, r = i;
              break;
            }
            if (E === r) {
              m = !0, r = o, n = i;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(l(189));
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
  var Oi = u.unstable_scheduleCallback, Ai = u.unstable_cancelCallback, Ii = u.unstable_shouldYield, Hn = u.unstable_requestPaint, ot = u.unstable_now, Bi = u.unstable_getCurrentPriorityLevel, lr = u.unstable_ImmediatePriority, ka = u.unstable_UserBlockingPriority, Yn = u.unstable_NormalPriority, Ao = u.unstable_LowPriority, sr = u.unstable_IdlePriority, ti = null, un = null;
  function Nt(e) {
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
    var r = 0, i = e.suspendedLanes, o = e.pingedLanes, m = n & 268435455;
    if (m !== 0) {
      var E = m & ~i;
      E !== 0 ? r = ur(E) : (o &= m, o !== 0 && (r = ur(o)));
    } else m = n & ~i, m !== 0 ? r = ur(m) : o !== 0 && (r = ur(o));
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
      var m = 31 - jt(o), E = 1 << m, M = i[m];
      M === -1 ? ((E & n) === 0 || (E & r) !== 0) && (i[m] = $n(E, t)) : M <= t && (e.expiredLanes |= E), o &= ~E;
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
  function f(e, t) {
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
  function R(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Xi(t), t !== null && jr(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function ee(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return Rt = R(Rt, e, t, n, r, i), !0;
      case "dragenter":
        return vn = R(vn, e, t, n, r, i), !0;
      case "mouseover":
        return kn = R(kn, e, t, n, r, i), !0;
      case "pointerover":
        var o = i.pointerId;
        return Dr.set(o, R(Dr.get(o) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return o = i.pointerId, fr.set(o, R(fr.get(o) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function Z(e) {
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
  function Re(e) {
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
  function Me(e, t, n) {
    Re(e) && n.delete(t);
  }
  function Ee() {
    hr = !1, Rt !== null && Re(Rt) && (Rt = null), vn !== null && Re(vn) && (vn = null), kn !== null && Re(kn) && (kn = null), Dr.forEach(Me), fr.forEach(Me);
  }
  function wt(e, t) {
    e.blockedOn === t && (e.blockedOn = null, hr || (hr = !0, u.unstable_scheduleCallback(u.unstable_NormalPriority, Ee)));
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
    for (; 0 < wn.length && (n = wn[0], n.blockedOn === null); ) Z(n), n.blockedOn === null && wn.shift();
  }
  var en = B.ReactCurrentBatchConfig, Yt = !0;
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
      if (i === null) Qo(e, t, r, li, n), f(e, r);
      else if (ee(i, e, t, n, r)) r.stopPropagation();
      else if (f(e, r), t & 4 && -1 < Sa.indexOf(e)) {
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
    var m = n - e;
    for (r = 1; r <= m && t[n - r] === i[o - r]; r++) ;
    return ba = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Ea(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ta() {
    return !0;
  }
  function Ts() {
    return !1;
  }
  function tn(e) {
    function t(n, r, i, o, m) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = m, this.currentTarget = null;
      for (var E in e) e.hasOwnProperty(E) && (n = e[E], this[E] = n ? n(o) : o[E]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ta : Ts, this.isPropagationStopped = Ts, this;
    }
    return _(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ta);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ta);
    }, persist: function() {
    }, isPersistent: Ta }), t;
  }
  var si = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, zo = tn(si), Ui = _({}, si, { view: 0, detail: 0 }), Nd = tn(Ui), jo, _o, Ki, Ca = _({}, Ui, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Fo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Ki && (Ki && e.type === "mousemove" ? (jo = e.screenX - Ki.screenX, _o = e.screenY - Ki.screenY) : _o = jo = 0, Ki = e), jo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : _o;
  } }), Cs = tn(Ca), Rd = _({}, Ca, { dataTransfer: 0 }), Pd = tn(Rd), Od = _({}, Ui, { relatedTarget: 0 }), Do = tn(Od), Ad = _({}, si, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Id = tn(Ad), Bd = _({}, si, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), zd = tn(Bd), jd = _({}, si, { data: 0 }), Ls = tn(jd), _d = {
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
  }, Dd = {
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
  }, Fd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Ud(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Fd[e]) ? !!t[e] : !1;
  }
  function Fo() {
    return Ud;
  }
  var Kd = _({}, Ui, { key: function(e) {
    if (e.key) {
      var t = _d[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ea(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Dd[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Fo, charCode: function(e) {
    return e.type === "keypress" ? Ea(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ea(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Vd = tn(Kd), Hd = _({}, Ca, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ms = tn(Hd), Yd = _({}, Ui, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Fo }), $d = tn(Yd), qd = _({}, si, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Wd = tn(qd), Jd = _({}, Ca, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gd = tn(Jd), Qd = [9, 13, 27, 32], Uo = v && "CompositionEvent" in window, Vi = null;
  v && "documentMode" in document && (Vi = document.documentMode);
  var Xd = v && "TextEvent" in window && !Vi, xs = v && (!Uo || Vi && 8 < Vi && 11 >= Vi), Ns = " ", Rs = !1;
  function Ps(e, t) {
    switch (e) {
      case "keyup":
        return Qd.indexOf(t.keyCode) !== -1;
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
  function Zd(e, t) {
    switch (e) {
      case "compositionend":
        return Os(t);
      case "keypress":
        return t.which !== 32 ? null : (Rs = !0, Ns);
      case "textInput":
        return e = t.data, e === Ns && Rs ? null : e;
      default:
        return null;
    }
  }
  function eh(e, t) {
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
        return xs && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var th = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function As(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!th[e.type] : t === "textarea";
  }
  function Is(e, t, n, r) {
    we(r), t = Ra(t, "onChange"), 0 < t.length && (n = new zo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var Hi = null, Yi = null;
  function nh(e) {
    Xs(e, 0);
  }
  function La(e) {
    var t = pi(e);
    if (xt(t)) return e;
  }
  function rh(e, t) {
    if (e === "change") return t;
  }
  var Bs = !1;
  if (v) {
    var Ko;
    if (v) {
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
    if (e.propertyName === "value" && La(Yi)) {
      var t = [];
      Is(t, Yi, e, Or(e)), Xe(nh, t);
    }
  }
  function ih(e, t, n) {
    e === "focusin" ? (js(), Hi = t, Yi = n, Hi.attachEvent("onpropertychange", _s)) : e === "focusout" && js();
  }
  function ah(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return La(Yi);
  }
  function oh(e, t) {
    if (e === "click") return La(t);
  }
  function lh(e, t) {
    if (e === "input" || e === "change") return La(t);
  }
  function sh(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sn = typeof Object.is == "function" ? Object.is : sh;
  function $i(e, t) {
    if (Sn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!h.call(t, i) || !Sn(e[i], t[i])) return !1;
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
    for (var e = window, t = V(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = V(e.document);
    }
    return t;
  }
  function Ho(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function uh(e) {
    var t = Ks(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Us(n.ownerDocument.documentElement, n)) {
      if (r !== null && Ho(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, o = Math.min(r.start, i);
          r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Fs(n, o);
          var m = Fs(
            n,
            r
          );
          i && m && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== m.node || e.focusOffset !== m.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(m.node, m.offset)) : (t.setEnd(m.node, m.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var ch = v && "documentMode" in document && 11 >= document.documentMode, ci = null, Yo = null, qi = null, $o = !1;
  function Vs(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    $o || ci == null || ci !== V(r) || (r = ci, "selectionStart" in r && Ho(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), qi && $i(qi, r) || (qi = r, r = Ra(Yo, "onSelect"), 0 < r.length && (t = new zo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = ci)));
  }
  function Ma(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var di = { animationend: Ma("Animation", "AnimationEnd"), animationiteration: Ma("Animation", "AnimationIteration"), animationstart: Ma("Animation", "AnimationStart"), transitionend: Ma("Transition", "TransitionEnd") }, qo = {}, Hs = {};
  v && (Hs = document.createElement("div").style, "AnimationEvent" in window || (delete di.animationend.animation, delete di.animationiteration.animation, delete di.animationstart.animation), "TransitionEvent" in window || delete di.transitionend.transition);
  function xa(e) {
    if (qo[e]) return qo[e];
    if (!di[e]) return e;
    var t = di[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Hs) return qo[e] = t[n];
    return e;
  }
  var Ys = xa("animationend"), $s = xa("animationiteration"), qs = xa("animationstart"), Ws = xa("transitionend"), Js = /* @__PURE__ */ new Map(), Gs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function mr(e, t) {
    Js.set(e, t), d(t, [e]);
  }
  for (var Wo = 0; Wo < Gs.length; Wo++) {
    var Jo = Gs[Wo], dh = Jo.toLowerCase(), hh = Jo[0].toUpperCase() + Jo.slice(1);
    mr(dh, "on" + hh);
  }
  mr(Ys, "onAnimationEnd"), mr($s, "onAnimationIteration"), mr(qs, "onAnimationStart"), mr("dblclick", "onDoubleClick"), mr("focusin", "onFocus"), mr("focusout", "onBlur"), mr(Ws, "onTransitionEnd"), g("onMouseEnter", ["mouseout", "mouseover"]), g("onMouseLeave", ["mouseout", "mouseover"]), g("onPointerEnter", ["pointerout", "pointerover"]), g("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Wi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), fh = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wi));
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
        if (t) for (var m = r.length - 1; 0 <= m; m--) {
          var E = r[m], M = E.instance, U = E.currentTarget;
          if (E = E.listener, M !== o && i.isPropagationStopped()) break e;
          Qs(i, E, U), o = M;
        }
        else for (m = 0; m < r.length; m++) {
          if (E = r[m], M = E.instance, U = E.currentTarget, E = E.listener, M !== o && i.isPropagationStopped()) break e;
          Qs(i, E, U), o = M;
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
  var Na = "_reactListening" + Math.random().toString(36).slice(2);
  function Ji(e) {
    if (!e[Na]) {
      e[Na] = !0, c.forEach(function(n) {
        n !== "selectionchange" && (fh.has(n) || Go(n, !1, e), Go(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Na] || (t[Na] = !0, Go("selectionchange", !1, t));
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
      var m = r.tag;
      if (m === 3 || m === 4) {
        var E = r.stateNode.containerInfo;
        if (E === i || E.nodeType === 8 && E.parentNode === i) break;
        if (m === 4) for (m = r.return; m !== null; ) {
          var M = m.tag;
          if ((M === 3 || M === 4) && (M = m.stateNode.containerInfo, M === i || M.nodeType === 8 && M.parentNode === i)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = Fr(E), m === null) return;
          if (M = m.tag, M === 5 || M === 6) {
            r = o = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      r = r.return;
    }
    Xe(function() {
      var U = o, ie = Or(n), le = [];
      e: {
        var ne = Js.get(e);
        if (ne !== void 0) {
          var ye = zo, Te = e;
          switch (e) {
            case "keypress":
              if (Ea(n) === 0) break e;
            case "keydown":
            case "keyup":
              ye = Vd;
              break;
            case "focusin":
              Te = "focus", ye = Do;
              break;
            case "focusout":
              Te = "blur", ye = Do;
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
              ye = Cs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ye = Pd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ye = $d;
              break;
            case Ys:
            case $s:
            case qs:
              ye = Id;
              break;
            case Ws:
              ye = Wd;
              break;
            case "scroll":
              ye = Nd;
              break;
            case "wheel":
              ye = Gd;
              break;
            case "copy":
            case "cut":
            case "paste":
              ye = zd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ye = Ms;
          }
          var Le = (t & 4) !== 0, ht = !Le && e === "scroll", j = Le ? ne !== null ? ne + "Capture" : null : ne;
          Le = [];
          for (var P = U, D; P !== null; ) {
            D = P;
            var ue = D.stateNode;
            if (D.tag === 5 && ue !== null && (D = ue, j !== null && (ue = Ue(P, j), ue != null && Le.push(Gi(P, ue, D)))), ht) break;
            P = P.return;
          }
          0 < Le.length && (ne = new ye(ne, Te, null, n, ie), le.push({ event: ne, listeners: Le }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (ne = e === "mouseover" || e === "pointerover", ye = e === "mouseout" || e === "pointerout", ne && n !== sn && (Te = n.relatedTarget || n.fromElement) && (Fr(Te) || Te[qn])) break e;
          if ((ye || ne) && (ne = ie.window === ie ? ie : (ne = ie.ownerDocument) ? ne.defaultView || ne.parentWindow : window, ye ? (Te = n.relatedTarget || n.toElement, ye = U, Te = Te ? Fr(Te) : null, Te !== null && (ht = Rn(Te), Te !== ht || Te.tag !== 5 && Te.tag !== 6) && (Te = null)) : (ye = null, Te = U), ye !== Te)) {
            if (Le = Cs, ue = "onMouseLeave", j = "onMouseEnter", P = "mouse", (e === "pointerout" || e === "pointerover") && (Le = Ms, ue = "onPointerLeave", j = "onPointerEnter", P = "pointer"), ht = ye == null ? ne : pi(ye), D = Te == null ? ne : pi(Te), ne = new Le(ue, P + "leave", ye, n, ie), ne.target = ht, ne.relatedTarget = D, ue = null, Fr(ie) === U && (Le = new Le(j, P + "enter", Te, n, ie), Le.target = D, Le.relatedTarget = ht, ue = Le), ht = ue, ye && Te) t: {
              for (Le = ye, j = Te, P = 0, D = Le; D; D = hi(D)) P++;
              for (D = 0, ue = j; ue; ue = hi(ue)) D++;
              for (; 0 < P - D; ) Le = hi(Le), P--;
              for (; 0 < D - P; ) j = hi(j), D--;
              for (; P--; ) {
                if (Le === j || j !== null && Le === j.alternate) break t;
                Le = hi(Le), j = hi(j);
              }
              Le = null;
            }
            else Le = null;
            ye !== null && eu(le, ne, ye, Le, !1), Te !== null && ht !== null && eu(le, ht, Te, Le, !0);
          }
        }
        e: {
          if (ne = U ? pi(U) : window, ye = ne.nodeName && ne.nodeName.toLowerCase(), ye === "select" || ye === "input" && ne.type === "file") var xe = rh;
          else if (As(ne)) if (Bs) xe = lh;
          else {
            xe = ah;
            var Be = ih;
          }
          else (ye = ne.nodeName) && ye.toLowerCase() === "input" && (ne.type === "checkbox" || ne.type === "radio") && (xe = oh);
          if (xe && (xe = xe(e, U))) {
            Is(le, xe, n, ie);
            break e;
          }
          Be && Be(e, ne, U), e === "focusout" && (Be = ne._wrapperState) && Be.controlled && ne.type === "number" && pe(ne, "number", ne.value);
        }
        switch (Be = U ? pi(U) : window, e) {
          case "focusin":
            (As(Be) || Be.contentEditable === "true") && (ci = Be, Yo = U, qi = null);
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
            $o = !1, Vs(le, n, ie);
            break;
          case "selectionchange":
            if (ch) break;
          case "keydown":
          case "keyup":
            Vs(le, n, ie);
        }
        var ze;
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
        De && (xs && n.locale !== "ko" && (ui || De !== "onCompositionStart" ? De === "onCompositionEnd" && ui && (ze = Es()) : (pr = ie, Bo = "value" in pr ? pr.value : pr.textContent, ui = !0)), Be = Ra(U, De), 0 < Be.length && (De = new Ls(De, e, null, n, ie), le.push({ event: De, listeners: Be }), ze ? De.data = ze : (ze = Os(n), ze !== null && (De.data = ze)))), (ze = Xd ? Zd(e, n) : eh(e, n)) && (U = Ra(U, "onBeforeInput"), 0 < U.length && (ie = new Ls("onBeforeInput", "beforeinput", null, n, ie), le.push({ event: ie, listeners: U }), ie.data = ze));
      }
      Xs(le, t);
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
    for (var o = t._reactName, m = []; n !== null && n !== r; ) {
      var E = n, M = E.alternate, U = E.stateNode;
      if (M !== null && M === r) break;
      E.tag === 5 && U !== null && (E = U, i ? (M = Ue(n, o), M != null && m.unshift(Gi(n, M, E))) : i || (M = Ue(n, o), M != null && m.push(Gi(n, M, E)))), n = n.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var ph = /\r\n?/g, mh = /\u0000|\uFFFD/g;
  function tu(e) {
    return (typeof e == "string" ? e : "" + e).replace(ph, `
`).replace(mh, "");
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
  var tl = typeof setTimeout == "function" ? setTimeout : void 0, gh = typeof clearTimeout == "function" ? clearTimeout : void 0, nu = typeof Promise == "function" ? Promise : void 0, yh = typeof queueMicrotask == "function" ? queueMicrotask : typeof nu < "u" ? function(e) {
    return nu.resolve(null).then(e).catch(vh);
  } : tl;
  function vh(e) {
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
  var fi = Math.random().toString(36).slice(2), An = "__reactFiber$" + fi, Qi = "__reactProps$" + fi, qn = "__reactContainer$" + fi, rl = "__reactEvents$" + fi, kh = "__reactListeners$" + fi, wh = "__reactHandles$" + fi;
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
    for (var i in r) if (!(i in t)) throw Error(l(108, Ne(e) || "Unknown", i));
    return _({}, n, r);
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
  function Sh(e) {
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
      var m = i - i % 5;
      o = (r & (1 << m) - 1).toString(32), r >>= m, i -= m, Jn = 1 << 32 - jt(t) + i | n << i | r, Gn = o + e;
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
  var bh = B.ReactCurrentBatchConfig;
  function Zi(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(l(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(l(147, e));
        var i = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(m) {
          var E = i.refs;
          m === null ? delete E[o] : E[o] = m;
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
    function t(j, P) {
      if (e) {
        var D = j.deletions;
        D === null ? (j.deletions = [P], j.flags |= 16) : D.push(P);
      }
    }
    function n(j, P) {
      if (!e) return null;
      for (; P !== null; ) t(j, P), P = P.sibling;
      return null;
    }
    function r(j, P) {
      for (j = /* @__PURE__ */ new Map(); P !== null; ) P.key !== null ? j.set(P.key, P) : j.set(P.index, P), P = P.sibling;
      return j;
    }
    function i(j, P) {
      return j = Mr(j, P), j.index = 0, j.sibling = null, j;
    }
    function o(j, P, D) {
      return j.index = D, e ? (D = j.alternate, D !== null ? (D = D.index, D < P ? (j.flags |= 2, P) : D) : (j.flags |= 2, P)) : (j.flags |= 1048576, P);
    }
    function m(j) {
      return e && j.alternate === null && (j.flags |= 2), j;
    }
    function E(j, P, D, ue) {
      return P === null || P.tag !== 6 ? (P = ts(D, j.mode, ue), P.return = j, P) : (P = i(P, D), P.return = j, P);
    }
    function M(j, P, D, ue) {
      var xe = D.type;
      return xe === J ? ie(j, P, D.props.children, ue, D.key) : P !== null && (P.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === se && fu(xe) === P.type) ? (ue = i(P, D.props), ue.ref = Zi(j, P, D), ue.return = j, ue) : (ue = co(D.type, D.key, D.props, null, j.mode, ue), ue.ref = Zi(j, P, D), ue.return = j, ue);
    }
    function U(j, P, D, ue) {
      return P === null || P.tag !== 4 || P.stateNode.containerInfo !== D.containerInfo || P.stateNode.implementation !== D.implementation ? (P = ns(D, j.mode, ue), P.return = j, P) : (P = i(P, D.children || []), P.return = j, P);
    }
    function ie(j, P, D, ue, xe) {
      return P === null || P.tag !== 7 ? (P = Qr(D, j.mode, ue, xe), P.return = j, P) : (P = i(P, D), P.return = j, P);
    }
    function le(j, P, D) {
      if (typeof P == "string" && P !== "" || typeof P == "number") return P = ts("" + P, j.mode, D), P.return = j, P;
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case z:
            return D = co(P.type, P.key, P.props, null, j.mode, D), D.ref = Zi(j, null, P), D.return = j, D;
          case q:
            return P = ns(P, j.mode, D), P.return = j, P;
          case se:
            var ue = P._init;
            return le(j, ue(P._payload), D);
        }
        if (Oe(P) || O(P)) return P = Qr(P, j.mode, D, null), P.return = j, P;
        Fa(j, P);
      }
      return null;
    }
    function ne(j, P, D, ue) {
      var xe = P !== null ? P.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number") return xe !== null ? null : E(j, P, "" + D, ue);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case z:
            return D.key === xe ? M(j, P, D, ue) : null;
          case q:
            return D.key === xe ? U(j, P, D, ue) : null;
          case se:
            return xe = D._init, ne(
              j,
              P,
              xe(D._payload),
              ue
            );
        }
        if (Oe(D) || O(D)) return xe !== null ? null : ie(j, P, D, ue, null);
        Fa(j, D);
      }
      return null;
    }
    function ye(j, P, D, ue, xe) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return j = j.get(D) || null, E(P, j, "" + ue, xe);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case z:
            return j = j.get(ue.key === null ? D : ue.key) || null, M(P, j, ue, xe);
          case q:
            return j = j.get(ue.key === null ? D : ue.key) || null, U(P, j, ue, xe);
          case se:
            var Be = ue._init;
            return ye(j, P, D, Be(ue._payload), xe);
        }
        if (Oe(ue) || O(ue)) return j = j.get(D) || null, ie(P, j, ue, xe, null);
        Fa(P, ue);
      }
      return null;
    }
    function Te(j, P, D, ue) {
      for (var xe = null, Be = null, ze = P, De = P = 0, Et = null; ze !== null && De < D.length; De++) {
        ze.index > De ? (Et = ze, ze = null) : Et = ze.sibling;
        var Ze = ne(j, ze, D[De], ue);
        if (Ze === null) {
          ze === null && (ze = Et);
          break;
        }
        e && ze && Ze.alternate === null && t(j, ze), P = o(Ze, P, De), Be === null ? xe = Ze : Be.sibling = Ze, Be = Ze, ze = Et;
      }
      if (De === D.length) return n(j, ze), lt && Vr(j, De), xe;
      if (ze === null) {
        for (; De < D.length; De++) ze = le(j, D[De], ue), ze !== null && (P = o(ze, P, De), Be === null ? xe = ze : Be.sibling = ze, Be = ze);
        return lt && Vr(j, De), xe;
      }
      for (ze = r(j, ze); De < D.length; De++) Et = ye(ze, j, De, D[De], ue), Et !== null && (e && Et.alternate !== null && ze.delete(Et.key === null ? De : Et.key), P = o(Et, P, De), Be === null ? xe = Et : Be.sibling = Et, Be = Et);
      return e && ze.forEach(function(xr) {
        return t(j, xr);
      }), lt && Vr(j, De), xe;
    }
    function Le(j, P, D, ue) {
      var xe = O(D);
      if (typeof xe != "function") throw Error(l(150));
      if (D = xe.call(D), D == null) throw Error(l(151));
      for (var Be = xe = null, ze = P, De = P = 0, Et = null, Ze = D.next(); ze !== null && !Ze.done; De++, Ze = D.next()) {
        ze.index > De ? (Et = ze, ze = null) : Et = ze.sibling;
        var xr = ne(j, ze, Ze.value, ue);
        if (xr === null) {
          ze === null && (ze = Et);
          break;
        }
        e && ze && xr.alternate === null && t(j, ze), P = o(xr, P, De), Be === null ? xe = xr : Be.sibling = xr, Be = xr, ze = Et;
      }
      if (Ze.done) return n(
        j,
        ze
      ), lt && Vr(j, De), xe;
      if (ze === null) {
        for (; !Ze.done; De++, Ze = D.next()) Ze = le(j, Ze.value, ue), Ze !== null && (P = o(Ze, P, De), Be === null ? xe = Ze : Be.sibling = Ze, Be = Ze);
        return lt && Vr(j, De), xe;
      }
      for (ze = r(j, ze); !Ze.done; De++, Ze = D.next()) Ze = ye(ze, j, De, Ze.value, ue), Ze !== null && (e && Ze.alternate !== null && ze.delete(Ze.key === null ? De : Ze.key), P = o(Ze, P, De), Be === null ? xe = Ze : Be.sibling = Ze, Be = Ze);
      return e && ze.forEach(function(tf) {
        return t(j, tf);
      }), lt && Vr(j, De), xe;
    }
    function ht(j, P, D, ue) {
      if (typeof D == "object" && D !== null && D.type === J && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case z:
            e: {
              for (var xe = D.key, Be = P; Be !== null; ) {
                if (Be.key === xe) {
                  if (xe = D.type, xe === J) {
                    if (Be.tag === 7) {
                      n(j, Be.sibling), P = i(Be, D.props.children), P.return = j, j = P;
                      break e;
                    }
                  } else if (Be.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === se && fu(xe) === Be.type) {
                    n(j, Be.sibling), P = i(Be, D.props), P.ref = Zi(j, Be, D), P.return = j, j = P;
                    break e;
                  }
                  n(j, Be);
                  break;
                } else t(j, Be);
                Be = Be.sibling;
              }
              D.type === J ? (P = Qr(D.props.children, j.mode, ue, D.key), P.return = j, j = P) : (ue = co(D.type, D.key, D.props, null, j.mode, ue), ue.ref = Zi(j, P, D), ue.return = j, j = ue);
            }
            return m(j);
          case q:
            e: {
              for (Be = D.key; P !== null; ) {
                if (P.key === Be) if (P.tag === 4 && P.stateNode.containerInfo === D.containerInfo && P.stateNode.implementation === D.implementation) {
                  n(j, P.sibling), P = i(P, D.children || []), P.return = j, j = P;
                  break e;
                } else {
                  n(j, P);
                  break;
                }
                else t(j, P);
                P = P.sibling;
              }
              P = ns(D, j.mode, ue), P.return = j, j = P;
            }
            return m(j);
          case se:
            return Be = D._init, ht(j, P, Be(D._payload), ue);
        }
        if (Oe(D)) return Te(j, P, D, ue);
        if (O(D)) return Le(j, P, D, ue);
        Fa(j, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" ? (D = "" + D, P !== null && P.tag === 6 ? (n(j, P.sibling), P = i(P, D), P.return = j, j = P) : (n(j, P), P = ts(D, j.mode, ue), P.return = j, j = P), m(j)) : n(j, P);
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
          var m = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? i = o = m : o = o.next = m, n = n.next;
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
    var o = i.firstBaseUpdate, m = i.lastBaseUpdate, E = i.shared.pending;
    if (E !== null) {
      i.shared.pending = null;
      var M = E, U = M.next;
      M.next = null, m === null ? o = U : m.next = U, m = M;
      var ie = e.alternate;
      ie !== null && (ie = ie.updateQueue, E = ie.lastBaseUpdate, E !== m && (E === null ? ie.firstBaseUpdate = U : E.next = U, ie.lastBaseUpdate = M));
    }
    if (o !== null) {
      var le = i.baseState;
      m = 0, ie = U = M = null, E = o;
      do {
        var ne = E.lane, ye = E.eventTime;
        if ((r & ne) === ne) {
          ie !== null && (ie = ie.next = {
            eventTime: ye,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var Te = e, Le = E;
            switch (ne = t, ye = n, Le.tag) {
              case 1:
                if (Te = Le.payload, typeof Te == "function") {
                  le = Te.call(ye, le, ne);
                  break e;
                }
                le = Te;
                break e;
              case 3:
                Te.flags = Te.flags & -65537 | 128;
              case 0:
                if (Te = Le.payload, ne = typeof Te == "function" ? Te.call(ye, le, ne) : Te, ne == null) break e;
                le = _({}, le, ne);
                break e;
              case 2:
                wr = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (e.flags |= 64, ne = i.effects, ne === null ? i.effects = [E] : ne.push(E));
        } else ye = { eventTime: ye, lane: ne, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, ie === null ? (U = ie = ye, M = le) : ie = ie.next = ye, m |= ne;
        if (E = E.next, E === null) {
          if (E = i.shared.pending, E === null) break;
          ne = E, E = ne.next, ne.next = null, i.lastBaseUpdate = ne, i.shared.pending = null;
        }
      } while (!0);
      if (ie === null && (M = le), i.baseState = M, i.firstBaseUpdate = U, i.lastBaseUpdate = ie, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          m |= i.lane, i = i.next;
        while (i !== t);
      } else o === null && (i.shared.lanes = 0);
      qr |= m, e.lanes = m, e.memoizedState = le;
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
  var $a = B.ReactCurrentDispatcher, Sl = B.ReactCurrentBatchConfig, $r = 0, ct = null, yt = null, St = null, qa = !1, ra = !1, ia = 0, Eh = 0;
  function Ot() {
    throw Error(l(321));
  }
  function bl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Sn(e[n], t[n])) return !1;
    return !0;
  }
  function El(e, t, n, r, i, o) {
    if ($r = o, ct = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $a.current = e === null || e.memoizedState === null ? Mh : xh, e = n(r, i), ra) {
      o = 0;
      do {
        if (ra = !1, ia = 0, 25 <= o) throw Error(l(301));
        o += 1, St = yt = null, t.updateQueue = null, $a.current = Nh, e = n(r, i);
      } while (ra);
    }
    if ($a.current = Ga, t = yt !== null && yt.next !== null, $r = 0, St = yt = ct = null, qa = !1, t) throw Error(l(300));
    return e;
  }
  function Tl() {
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
  function Cl(e) {
    var t = pn(), n = t.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = e;
    var r = yt, i = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var m = i.next;
        i.next = o.next, o.next = m;
      }
      r.baseQueue = i = o, n.pending = null;
    }
    if (i !== null) {
      o = i.next, r = r.baseState;
      var E = m = null, M = null, U = o;
      do {
        var ie = U.lane;
        if (($r & ie) === ie) M !== null && (M = M.next = { lane: 0, action: U.action, hasEagerState: U.hasEagerState, eagerState: U.eagerState, next: null }), r = U.hasEagerState ? U.eagerState : e(r, U.action);
        else {
          var le = {
            lane: ie,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          M === null ? (E = M = le, m = r) : M = M.next = le, ct.lanes |= ie, qr |= ie;
        }
        U = U.next;
      } while (U !== null && U !== o);
      M === null ? m = r : M.next = E, Sn(r, t.memoizedState) || (Wt = !0), t.memoizedState = r, t.baseState = m, t.baseQueue = M, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        o = i.lane, ct.lanes |= o, qr |= o, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Ll(e) {
    var t = pn(), n = t.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, o = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var m = i = i.next;
      do
        o = e(o, m.action), m = m.next;
      while (m !== i);
      Sn(o, t.memoizedState) || (Wt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Su() {
  }
  function bu(e, t) {
    var n = ct, r = pn(), i = t(), o = !Sn(r.memoizedState, i);
    if (o && (r.memoizedState = i, Wt = !0), r = r.queue, Ml(Cu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || St !== null && St.memoizedState.tag & 1) {
      if (n.flags |= 2048, oa(9, Tu.bind(null, n, r, i, t), void 0, null), bt === null) throw Error(l(349));
      ($r & 30) !== 0 || Eu(n, t, i);
    }
    return i;
  }
  function Eu(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ct.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ct.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Tu(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Lu(t) && Mu(e);
  }
  function Cu(e, t, n) {
    return n(function() {
      Lu(t) && Mu(e);
    });
  }
  function Lu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Sn(e, n);
    } catch {
      return !0;
    }
  }
  function Mu(e) {
    var t = Qn(e, 1);
    t !== null && Ln(t, e, 1, -1);
  }
  function xu(e) {
    var t = Bn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: aa, lastRenderedState: e }, t.queue = e, e = e.dispatch = Lh.bind(null, ct, e), [t.memoizedState, e];
  }
  function oa(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ct.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ct.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Nu() {
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
      var m = yt.memoizedState;
      if (o = m.destroy, r !== null && bl(r, m.deps)) {
        i.memoizedState = oa(t, n, o, r);
        return;
      }
    }
    ct.flags |= e, i.memoizedState = oa(1 | t, n, o, r);
  }
  function Ru(e, t) {
    return Wa(8390656, 8, e, t);
  }
  function Ml(e, t) {
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
  function xl() {
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
  function Th(e, t) {
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
    var r = Cr(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Du(e)) Fu(t, n);
    else if (n = gu(e, t, n, r), n !== null) {
      var i = Ft();
      Ln(n, e, r, i), Uu(n, t, r);
    }
  }
  function Lh(e, t, n) {
    var r = Cr(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Du(e)) Fu(t, i);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var m = t.lastRenderedState, E = o(m, n);
        if (i.hasEagerState = !0, i.eagerState = E, Sn(E, m)) {
          var M = t.interleaved;
          M === null ? (i.next = i, ml(t)) : (i.next = M.next, M.next = i), t.interleaved = i;
          return;
        }
      } catch {
      }
      n = gu(e, t, i, r), n !== null && (i = Ft(), Ln(n, e, r, i), Uu(n, t, r));
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
  var Ga = { readContext: fn, useCallback: Ot, useContext: Ot, useEffect: Ot, useImperativeHandle: Ot, useInsertionEffect: Ot, useLayoutEffect: Ot, useMemo: Ot, useReducer: Ot, useRef: Ot, useState: Ot, useDebugValue: Ot, useDeferredValue: Ot, useTransition: Ot, useMutableSource: Ot, useSyncExternalStore: Ot, useId: Ot, unstable_isNewReconciler: !1 }, Mh = { readContext: fn, useCallback: function(e, t) {
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
  }, useState: xu, useDebugValue: xl, useDeferredValue: function(e) {
    return Bn().memoizedState = e;
  }, useTransition: function() {
    var e = xu(!1), t = e[0];
    return e = Th.bind(null, e[1]), Bn().memoizedState = e, [t, e];
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
    return i.queue = o, Ru(Cu.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, oa(9, Tu.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Bn(), t = bt.identifierPrefix;
    if (lt) {
      var n = Gn, r = Jn;
      n = (r & ~(1 << 32 - jt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ia++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Eh++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, xh = {
    readContext: fn,
    useCallback: Bu,
    useContext: fn,
    useEffect: Ml,
    useImperativeHandle: Iu,
    useInsertionEffect: Pu,
    useLayoutEffect: Ou,
    useMemo: zu,
    useReducer: Cl,
    useRef: Nu,
    useState: function() {
      return Cl(aa);
    },
    useDebugValue: xl,
    useDeferredValue: function(e) {
      var t = pn();
      return ju(t, yt.memoizedState, e);
    },
    useTransition: function() {
      var e = Cl(aa)[0], t = pn().memoizedState;
      return [e, t];
    },
    useMutableSource: Su,
    useSyncExternalStore: bu,
    useId: _u,
    unstable_isNewReconciler: !1
  }, Nh = { readContext: fn, useCallback: Bu, useContext: fn, useEffect: Ml, useImperativeHandle: Iu, useInsertionEffect: Pu, useLayoutEffect: Ou, useMemo: zu, useReducer: Ll, useRef: Nu, useState: function() {
    return Ll(aa);
  }, useDebugValue: xl, useDeferredValue: function(e) {
    var t = pn();
    return yt === null ? t.memoizedState = e : ju(t, yt.memoizedState, e);
  }, useTransition: function() {
    var e = Ll(aa)[0], t = pn().memoizedState;
    return [e, t];
  }, useMutableSource: Su, useSyncExternalStore: bu, useId: _u, unstable_isNewReconciler: !1 };
  function En(e, t) {
    if (e && e.defaultProps) {
      t = _({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Nl(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : _({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Qa = { isMounted: function(e) {
    return (e = e._reactInternals) ? Rn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ft(), i = Cr(e), o = Xn(r, i);
    o.payload = t, n != null && (o.callback = n), t = Sr(e, o, i), t !== null && (Ln(t, e, i, r), Va(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ft(), i = Cr(e), o = Xn(r, i);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Sr(e, o, i), t !== null && (Ln(t, e, i, r), Va(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Ft(), r = Cr(e), i = Xn(n, r);
    i.tag = 2, t != null && (i.callback = t), t = Sr(e, i, r), t !== null && (Ln(t, e, r, n), Va(t, e, r));
  } };
  function Ku(e, t, n, r, i, o, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, m) : t.prototype && t.prototype.isPureReactComponent ? !$i(n, r) || !$i(i, o) : !0;
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
    typeof o == "object" && o !== null ? i.context = fn(o) : (o = qt(t) ? Ur : Pt.current, i.context = gi(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Nl(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Qa.enqueueReplaceState(i, i.state, null), Ha(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Ti(e, t) {
    try {
      var n = "", r = t;
      do
        n += ve(r), r = r.return;
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
  var Rh = typeof WeakMap == "function" ? WeakMap : Map;
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
      var m = t.stack;
      this.componentDidCatch(t.value, { componentStack: m !== null ? m : "" });
    }), n;
  }
  function qu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Rh();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = Hh.bind(null, e, t, n), t.then(e, e));
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
  var Ph = B.ReactCurrentOwner, Wt = !1;
  function Dt(e, t, n, r) {
    t.child = e === null ? mu(t, null, n, r) : wi(t, e.child, n, r);
  }
  function Gu(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return bi(t, i), r = El(e, t, n, r, o, i), n = Tl(), e !== null && !Wt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Zn(e, t, i)) : (lt && n && ol(t), t.flags |= 1, Dt(e, t, r, i), t.child);
  }
  function Qu(e, t, n, r, i) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !es(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Xu(e, t, o, r, i)) : (e = co(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & i) === 0) {
      var m = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : $i, n(m, r) && e.ref === t.ref) return Zn(e, t, i);
    }
    return t.flags |= 1, e = Mr(o, r), e.ref = t.ref, e.return = t, t.child = e;
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
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, rt(Li, an), an |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, rt(Li, an), an |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, rt(Li, an), an |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, rt(Li, an), an |= r;
    return Dt(e, t, i, n), t.child;
  }
  function ec(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Al(e, t, n, r, i) {
    var o = qt(n) ? Ur : Pt.current;
    return o = gi(t, o), bi(t, i), n = El(e, t, n, r, o, i), r = Tl(), e !== null && !Wt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Zn(e, t, i)) : (lt && r && ol(t), t.flags |= 1, Dt(e, t, n, i), t.child);
  }
  function tc(e, t, n, r, i) {
    if (qt(n)) {
      var o = !0;
      Ba(t);
    } else o = !1;
    if (bi(t, i), t.stateNode === null) Za(e, t), Vu(t, n, r), Rl(t, n, r, i), r = !0;
    else if (e === null) {
      var m = t.stateNode, E = t.memoizedProps;
      m.props = E;
      var M = m.context, U = n.contextType;
      typeof U == "object" && U !== null ? U = fn(U) : (U = qt(n) ? Ur : Pt.current, U = gi(t, U));
      var ie = n.getDerivedStateFromProps, le = typeof ie == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      le || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== r || M !== U) && Hu(t, m, r, U), wr = !1;
      var ne = t.memoizedState;
      m.state = ne, Ha(t, r, m, i), M = t.memoizedState, E !== r || ne !== M || $t.current || wr ? (typeof ie == "function" && (Nl(t, n, ie, r), M = t.memoizedState), (E = wr || Ku(t, n, E, r, ne, M, U)) ? (le || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = M), m.props = r, m.state = M, m.context = U, r = E) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      m = t.stateNode, yu(e, t), E = t.memoizedProps, U = t.type === t.elementType ? E : En(t.type, E), m.props = U, le = t.pendingProps, ne = m.context, M = n.contextType, typeof M == "object" && M !== null ? M = fn(M) : (M = qt(n) ? Ur : Pt.current, M = gi(t, M));
      var ye = n.getDerivedStateFromProps;
      (ie = typeof ye == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== le || ne !== M) && Hu(t, m, r, M), wr = !1, ne = t.memoizedState, m.state = ne, Ha(t, r, m, i);
      var Te = t.memoizedState;
      E !== le || ne !== Te || $t.current || wr ? (typeof ye == "function" && (Nl(t, n, ye, r), Te = t.memoizedState), (U = wr || Ku(t, n, U, r, ne, Te, M) || !1) ? (ie || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(r, Te, M), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(r, Te, M)), typeof m.componentDidUpdate == "function" && (t.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === e.memoizedProps && ne === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === e.memoizedProps && ne === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = Te), m.props = r, m.state = Te, m.context = M, r = U) : (typeof m.componentDidUpdate != "function" || E === e.memoizedProps && ne === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === e.memoizedProps && ne === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Il(e, t, n, r, o, i);
  }
  function Il(e, t, n, r, i, o) {
    ec(e, t);
    var m = (t.flags & 128) !== 0;
    if (!r && !m) return i && ou(t, n, !1), Zn(e, t, o);
    r = t.stateNode, Ph.current = t;
    var E = m && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && m ? (t.child = wi(t, e.child, null, o), t.child = wi(t, null, E, o)) : Dt(e, t, E, o), t.memoizedState = r.state, i && ou(t, n, !0), t.child;
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
    var r = t.pendingProps, i = ut.current, o = !1, m = (t.flags & 128) !== 0, E;
    if ((E = m) || (E = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), E ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), rt(ut, i & 1), e === null)
      return ul(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (m = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, m = { mode: "hidden", children: m }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = m) : o = ho(m, r, 0, null), e = Qr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = zl(n), t.memoizedState = Bl, e) : jl(t, m));
    if (i = e.memoizedState, i !== null && (E = i.dehydrated, E !== null)) return Oh(e, t, m, r, E, i, n);
    if (o) {
      o = r.fallback, m = t.mode, i = e.child, E = i.sibling;
      var M = { mode: "hidden", children: r.children };
      return (m & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = M, t.deletions = null) : (r = Mr(i, M), r.subtreeFlags = i.subtreeFlags & 14680064), E !== null ? o = Mr(E, o) : (o = Qr(o, m, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, m = e.child.memoizedState, m = m === null ? zl(n) : { baseLanes: m.baseLanes | n, cachePool: null, transitions: m.transitions }, o.memoizedState = m, o.childLanes = e.childLanes & ~n, t.memoizedState = Bl, r;
    }
    return o = e.child, e = o.sibling, r = Mr(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function jl(e, t) {
    return t = ho({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Xa(e, t, n, r) {
    return r !== null && cl(r), wi(t, e.child, null, n), e = jl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Oh(e, t, n, r, i, o, m) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Pl(Error(l(422))), Xa(e, t, m, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = ho({ mode: "visible", children: r.children }, i, 0, null), o = Qr(o, i, m, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && wi(t, e.child, null, m), t.child.memoizedState = zl(m), t.memoizedState = Bl, o);
    if ((t.mode & 1) === 0) return Xa(e, t, m, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var E = r.dgst;
      return r = E, o = Error(l(419)), r = Pl(o, r, void 0), Xa(e, t, m, r);
    }
    if (E = (m & e.childLanes) !== 0, Wt || E) {
      if (r = bt, r !== null) {
        switch (m & -m) {
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
        i = (i & (r.suspendedLanes | m)) !== 0 ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Qn(e, i), Ln(r, e, i, -1));
      }
      return Zl(), r = Pl(Error(l(421))), Xa(e, t, m, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Yh.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, rn = gr(i.nextSibling), nn = t, lt = !0, bn = null, e !== null && (dn[hn++] = Jn, dn[hn++] = Gn, dn[hn++] = Kr, Jn = e.id, Gn = e.overflow, Kr = t), t = jl(t, r.children), t.flags |= 4096, t);
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
      for (e = t.child, n = Mr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Mr(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Ah(e, t, n) {
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
          i = de(e, i), r = de(e, r), o = [];
          break;
        case "select":
          i = _({}, i, { value: void 0 }), r = _({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          i = Ke(e, i), r = Ke(e, r), o = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Oa);
      }
      xn(n, r);
      var m;
      n = null;
      for (U in i) if (!r.hasOwnProperty(U) && i.hasOwnProperty(U) && i[U] != null) if (U === "style") {
        var E = i[U];
        for (m in E) E.hasOwnProperty(m) && (n || (n = {}), n[m] = "");
      } else U !== "dangerouslySetInnerHTML" && U !== "children" && U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && U !== "autoFocus" && (p.hasOwnProperty(U) ? o || (o = []) : (o = o || []).push(U, null));
      for (U in r) {
        var M = r[U];
        if (E = i?.[U], r.hasOwnProperty(U) && M !== E && (M != null || E != null)) if (U === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || M && M.hasOwnProperty(m) || (n || (n = {}), n[m] = "");
          for (m in M) M.hasOwnProperty(m) && E[m] !== M[m] && (n || (n = {}), n[m] = M[m]);
        } else n || (o || (o = []), o.push(
          U,
          n
        )), n = M;
        else U === "dangerouslySetInnerHTML" ? (M = M ? M.__html : void 0, E = E ? E.__html : void 0, M != null && E !== M && (o = o || []).push(U, M)) : U === "children" ? typeof M != "string" && typeof M != "number" || (o = o || []).push(U, "" + M) : U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && (p.hasOwnProperty(U) ? (M != null && U === "onScroll" && it("scroll", e), o || E === M || (o = [])) : (o = o || []).push(U, M));
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
  function Ih(e, t, n) {
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
                me(r, o), it("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, it("invalid", r);
                break;
              case "textarea":
                $e(r, o), it("invalid", r);
            }
            xn(n, o), i = null;
            for (var m in o) if (o.hasOwnProperty(m)) {
              var E = o[m];
              m === "children" ? typeof E == "string" ? r.textContent !== E && (o.suppressHydrationWarning !== !0 && Pa(r.textContent, E, e), i = ["children", E]) : typeof E == "number" && r.textContent !== "" + E && (o.suppressHydrationWarning !== !0 && Pa(
                r.textContent,
                E,
                e
              ), i = ["children", "" + E]) : p.hasOwnProperty(m) && E != null && m === "onScroll" && it("scroll", r);
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
            m = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Xt(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = m.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = m.createElement(n, { is: r.is }) : (e = m.createElement(n), n === "select" && (m = e, r.multiple ? m.multiple = !0 : r.size && (m.size = r.size))) : e = m.createElementNS(e, n), e[An] = t, e[Qi] = r, lc(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (m = ir(n, r), n) {
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
                  me(e, r), i = de(e, r), it("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = _({}, r, { value: void 0 }), it("invalid", e);
                  break;
                case "textarea":
                  $e(e, r), i = Ke(e, r), it("invalid", e);
                  break;
                default:
                  i = r;
              }
              xn(n, i), E = i;
              for (o in E) if (E.hasOwnProperty(o)) {
                var M = E[o];
                o === "style" ? Kt(e, M) : o === "dangerouslySetInnerHTML" ? (M = M ? M.__html : void 0, M != null && rr(e, M)) : o === "children" ? typeof M == "string" ? (n !== "textarea" || M !== "") && Zt(e, M) : typeof M == "number" && Zt(e, "" + M) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (p.hasOwnProperty(o) ? M != null && o === "onScroll" && it("scroll", e) : M != null && W(e, o, M, m));
              }
              switch (n) {
                case "input":
                  Fe(e), Ce(e, r, !1);
                  break;
                case "textarea":
                  Fe(e), on(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + fe(r.value));
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
        if (r = (t.flags & 128) !== 0, m = o.rendering, m === null) if (r) la(o, !1);
        else {
          if (vt !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (m = Ya(e), m !== null) {
              for (t.flags |= 128, la(o, !1), r = m.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, m = o.alternate, m === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = m.childLanes, o.lanes = m.lanes, o.child = m.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = m.memoizedProps, o.memoizedState = m.memoizedState, o.updateQueue = m.updateQueue, o.type = m.type, e = m.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return rt(ut, ut.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && ot() > Mi && (t.flags |= 128, r = !0, la(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Ya(m), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), la(o, !0), o.tail === null && o.tailMode === "hidden" && !m.alternate && !lt) return At(t), null;
          } else 2 * ot() - o.renderingStartTime > Mi && n !== 1073741824 && (t.flags |= 128, r = !0, la(o, !1), t.lanes = 4194304);
          o.isBackwards ? (m.sibling = t.child, t.child = m) : (n = o.last, n !== null ? n.sibling = m : t.child = m, o.last = m);
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
  function Bh(e, t) {
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
  var eo = !1, It = !1, zh = typeof WeakSet == "function" ? WeakSet : Set, Se = null;
  function Ci(e, t) {
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
  function jh(e, t) {
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
          var m = 0, E = -1, M = -1, U = 0, ie = 0, le = e, ne = null;
          t: for (; ; ) {
            for (var ye; le !== n || i !== 0 && le.nodeType !== 3 || (E = m + i), le !== o || r !== 0 && le.nodeType !== 3 || (M = m + r), le.nodeType === 3 && (m += le.nodeValue.length), (ye = le.firstChild) !== null; )
              ne = le, le = ye;
            for (; ; ) {
              if (le === e) break t;
              if (ne === n && ++U === i && (E = m), ne === o && ++ie === r && (M = m), (ye = le.nextSibling) !== null) break;
              le = ne, ne = le.parentNode;
            }
            le = ye;
          }
          n = E === -1 || M === -1 ? null : { start: E, end: M };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Zo = { focusedElem: e, selectionRange: n }, Yt = !1, Se = t; Se !== null; ) if (t = Se, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Se = e;
    else for (; Se !== null; ) {
      t = Se;
      try {
        var Te = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Te !== null) {
              var Le = Te.memoizedProps, ht = Te.memoizedState, j = t.stateNode, P = j.getSnapshotBeforeUpdate(t.elementType === t.type ? Le : En(t.type, Le), ht);
              j.__reactInternalSnapshotBeforeUpdate = P;
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
        e.return = t.return, Se = e;
        break;
      }
      Se = t.return;
    }
    return Te = cc, cc = !1, Te;
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
    t !== null && (e.alternate = null, dc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[An], delete t[Qi], delete t[rl], delete t[kh], delete t[wh])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
  var Lt = null, Tn = !1;
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
        It || Ci(n, t);
      case 6:
        var r = Lt, i = Tn;
        Lt = null, br(e, t, n), Lt = r, Tn = i, Lt !== null && (Tn ? (e = Lt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Lt.removeChild(n.stateNode));
        break;
      case 18:
        Lt !== null && (Tn ? (e = Lt, n = n.stateNode, e.nodeType === 8 ? nl(e.parentNode, n) : e.nodeType === 1 && nl(e, n), pt(e)) : nl(Lt, n.stateNode));
        break;
      case 4:
        r = Lt, i = Tn, Lt = n.stateNode.containerInfo, Tn = !0, br(e, t, n), Lt = r, Tn = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!It && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var o = i, m = o.destroy;
            o = o.tag, m !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Fl(n, t, m), i = i.next;
          } while (i !== r);
        }
        br(e, t, n);
        break;
      case 1:
        if (!It && (Ci(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (E) {
          dt(n, t, E);
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
      n === null && (n = e.stateNode = new zh()), t.forEach(function(r) {
        var i = $h.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function Cn(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e, m = t, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              Lt = E.stateNode, Tn = !1;
              break e;
            case 3:
              Lt = E.stateNode.containerInfo, Tn = !0;
              break e;
            case 4:
              Lt = E.stateNode.containerInfo, Tn = !0;
              break e;
          }
          E = E.return;
        }
        if (Lt === null) throw Error(l(160));
        pc(o, m, i), Lt = null, Tn = !1;
        var M = i.alternate;
        M !== null && (M.return = null), i.return = null;
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
        if (Cn(t, e), zn(e), r & 4) {
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
        Cn(t, e), zn(e), r & 512 && n !== null && Ci(n, n.return);
        break;
      case 5:
        if (Cn(t, e), zn(e), r & 512 && n !== null && Ci(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            Zt(i, "");
          } catch (Le) {
            dt(e, e.return, Le);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var o = e.memoizedProps, m = n !== null ? n.memoizedProps : o, E = e.type, M = e.updateQueue;
          if (e.updateQueue = null, M !== null) try {
            E === "input" && o.type === "radio" && o.name != null && Ae(i, o), ir(E, m);
            var U = ir(E, o);
            for (m = 0; m < M.length; m += 2) {
              var ie = M[m], le = M[m + 1];
              ie === "style" ? Kt(i, le) : ie === "dangerouslySetInnerHTML" ? rr(i, le) : ie === "children" ? Zt(i, le) : W(i, ie, le, U);
            }
            switch (E) {
              case "input":
                je(i, o);
                break;
              case "textarea":
                We(i, o);
                break;
              case "select":
                var ne = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var ye = o.value;
                ye != null ? ge(i, !!o.multiple, ye, !1) : ne !== !!o.multiple && (o.defaultValue != null ? ge(
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
        if (Cn(t, e), zn(e), r & 4) {
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
        if (Cn(t, e), zn(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          pt(t.containerInfo);
        } catch (Le) {
          dt(e, e.return, Le);
        }
        break;
      case 4:
        Cn(t, e), zn(e);
        break;
      case 13:
        Cn(t, e), zn(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || ($l = ot())), r & 4 && mc(e);
        break;
      case 22:
        if (ie = n !== null && n.memoizedState !== null, e.mode & 1 ? (It = (U = It) || ie, Cn(t, e), It = U) : Cn(t, e), zn(e), r & 8192) {
          if (U = e.memoizedState !== null, (e.stateNode.isHidden = U) && !ie && (e.mode & 1) !== 0) for (Se = e, ie = e.child; ie !== null; ) {
            for (le = Se = ie; Se !== null; ) {
              switch (ne = Se, ye = ne.child, ne.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  sa(4, ne, ne.return);
                  break;
                case 1:
                  Ci(ne, ne.return);
                  var Te = ne.stateNode;
                  if (typeof Te.componentWillUnmount == "function") {
                    r = ne, n = ne.return;
                    try {
                      t = r, Te.props = t.memoizedProps, Te.state = t.memoizedState, Te.componentWillUnmount();
                    } catch (Le) {
                      dt(r, n, Le);
                    }
                  }
                  break;
                case 5:
                  Ci(ne, ne.return);
                  break;
                case 22:
                  if (ne.memoizedState !== null) {
                    kc(le);
                    continue;
                  }
              }
              ye !== null ? (ye.return = ne, Se = ye) : kc(le);
            }
            ie = ie.sibling;
          }
          e: for (ie = null, le = e; ; ) {
            if (le.tag === 5) {
              if (ie === null) {
                ie = le;
                try {
                  i = le.stateNode, U ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (E = le.stateNode, M = le.memoizedProps.style, m = M != null && M.hasOwnProperty("display") ? M.display : null, E.style.display = Zr("display", m));
                } catch (Le) {
                  dt(e, e.return, Le);
                }
              }
            } else if (le.tag === 6) {
              if (ie === null) try {
                le.stateNode.nodeValue = U ? "" : le.memoizedProps;
              } catch (Le) {
                dt(e, e.return, Le);
              }
            } else if ((le.tag !== 22 && le.tag !== 23 || le.memoizedState === null || le === e) && le.child !== null) {
              le.child.return = le, le = le.child;
              continue;
            }
            if (le === e) break e;
            for (; le.sibling === null; ) {
              if (le.return === null || le.return === e) break e;
              ie === le && (ie = null), le = le.return;
            }
            ie === le && (ie = null), le.sibling.return = le.return, le = le.sibling;
          }
        }
        break;
      case 19:
        Cn(t, e), zn(e), r & 4 && mc(e);
        break;
      case 21:
        break;
      default:
        Cn(
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
            var m = r.stateNode.containerInfo, E = fc(e);
            Kl(e, E, m);
            break;
          default:
            throw Error(l(161));
        }
      } catch (M) {
        dt(e, e.return, M);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function _h(e, t, n) {
    Se = e, yc(e);
  }
  function yc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; Se !== null; ) {
      var i = Se, o = i.child;
      if (i.tag === 22 && r) {
        var m = i.memoizedState !== null || eo;
        if (!m) {
          var E = i.alternate, M = E !== null && E.memoizedState !== null || It;
          E = eo;
          var U = It;
          if (eo = m, (It = M) && !U) for (Se = i; Se !== null; ) m = Se, M = m.child, m.tag === 22 && m.memoizedState !== null ? wc(i) : M !== null ? (M.return = m, Se = M) : wc(i);
          for (; o !== null; ) Se = o, yc(o), o = o.sibling;
          Se = i, eo = E, It = U;
        }
        vc(e);
      } else (i.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = i, Se = o) : vc(e);
    }
  }
  function vc(e) {
    for (; Se !== null; ) {
      var t = Se;
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
              var m = t.updateQueue;
              if (m !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                ku(t, m, n);
              }
              break;
            case 5:
              var E = t.stateNode;
              if (n === null && t.flags & 4) {
                n = E;
                var M = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    M.autoFocus && n.focus();
                    break;
                  case "img":
                    M.src && (n.src = M.src);
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
                  var ie = U.memoizedState;
                  if (ie !== null) {
                    var le = ie.dehydrated;
                    le !== null && pt(le);
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
        } catch (ne) {
          dt(t, t.return, ne);
        }
      }
      if (t === e) {
        Se = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, Se = n;
        break;
      }
      Se = t.return;
    }
  }
  function kc(e) {
    for (; Se !== null; ) {
      var t = Se;
      if (t === e) {
        Se = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Se = n;
        break;
      }
      Se = t.return;
    }
  }
  function wc(e) {
    for (; Se !== null; ) {
      var t = Se;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              to(4, t);
            } catch (M) {
              dt(t, n, M);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (M) {
                dt(t, i, M);
              }
            }
            var o = t.return;
            try {
              Ul(t);
            } catch (M) {
              dt(t, o, M);
            }
            break;
          case 5:
            var m = t.return;
            try {
              Ul(t);
            } catch (M) {
              dt(t, m, M);
            }
        }
      } catch (M) {
        dt(t, t.return, M);
      }
      if (t === e) {
        Se = null;
        break;
      }
      var E = t.sibling;
      if (E !== null) {
        E.return = t.return, Se = E;
        break;
      }
      Se = t.return;
    }
  }
  var Dh = Math.ceil, no = B.ReactCurrentDispatcher, Hl = B.ReactCurrentOwner, mn = B.ReactCurrentBatchConfig, Ge = 0, bt = null, mt = null, Mt = 0, an = 0, Li = yr(0), vt = 0, ua = null, qr = 0, ro = 0, Yl = 0, ca = null, Jt = null, $l = 0, Mi = 1 / 0, er = null, io = !1, ql = null, Er = null, ao = !1, Tr = null, oo = 0, da = 0, Wl = null, lo = -1, so = 0;
  function Ft() {
    return (Ge & 6) !== 0 ? ot() : lo !== -1 ? lo : lo = ot();
  }
  function Cr(e) {
    return (e.mode & 1) === 0 ? 1 : (Ge & 2) !== 0 && Mt !== 0 ? Mt & -Mt : bh.transition !== null ? (so === 0 && (so = dr()), so) : (e = Je, e !== 0 || (e = window.event, e = e === void 0 ? 16 : bs(e.type)), e);
  }
  function Ln(e, t, n, r) {
    if (50 < da) throw da = 0, Wl = null, Error(l(185));
    gt(e, n, r), ((Ge & 2) === 0 || e !== bt) && (e === bt && ((Ge & 2) === 0 && (ro |= n), vt === 4 && Lr(e, Mt)), Gt(e, r), n === 1 && Ge === 0 && (t.mode & 1) === 0 && (Mi = ot() + 500, za && kr()));
  }
  function Gt(e, t) {
    var n = e.callbackNode;
    wa(e, t);
    var r = cr(e, e === bt ? Mt : 0);
    if (r === 0) n !== null && Ai(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Ai(n), t === 1) e.tag === 0 ? Sh(bc.bind(null, e)) : lu(bc.bind(null, e)), yh(function() {
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
    if (xi() && e.callbackNode !== n) return null;
    var r = cr(e, e === bt ? Mt : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = uo(e, r);
    else {
      t = r;
      var i = Ge;
      Ge |= 2;
      var o = Tc();
      (bt !== e || Mt !== t) && (er = null, Mi = ot() + 500, Jr(e, t));
      do
        try {
          Kh();
          break;
        } catch (E) {
          Ec(e, E);
        }
      while (!0);
      hl(), no.current = o, Ge = i, mt !== null ? t = 0 : (bt = null, Mt = 0, t = vt);
    }
    if (t !== 0) {
      if (t === 2 && (i = cn(e), i !== 0 && (r = i, t = Jl(e, i))), t === 1) throw n = ua, Jr(e, 0), Lr(e, r), Gt(e, ot()), n;
      if (t === 6) Lr(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !Fh(i) && (t = uo(e, r), t === 2 && (o = cn(e), o !== 0 && (r = o, t = Jl(e, o))), t === 1)) throw n = ua, Jr(e, 0), Lr(e, r), Gt(e, ot()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(l(345));
          case 2:
            Gr(e, Jt, er);
            break;
          case 3:
            if (Lr(e, r), (r & 130023424) === r && (t = $l + 500 - ot(), 10 < t)) {
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
            if (Lr(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var m = 31 - jt(r);
              o = 1 << m, m = t[m], m > i && (i = m), r &= ~o;
            }
            if (r = i, r = ot() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Dh(r / 1960)) - r, 10 < r) {
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
  function Fh(e) {
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
  function Lr(e, t) {
    for (t &= ~Yl, t &= ~ro, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - jt(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function bc(e) {
    if ((Ge & 6) !== 0) throw Error(l(327));
    xi();
    var t = cr(e, 0);
    if ((t & 1) === 0) return Gt(e, ot()), null;
    var n = uo(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = cn(e);
      r !== 0 && (t = r, n = Jl(e, r));
    }
    if (n === 1) throw n = ua, Jr(e, 0), Lr(e, t), Gt(e, ot()), n;
    if (n === 6) throw Error(l(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Gr(e, Jt, er), Gt(e, ot()), null;
  }
  function Ql(e, t) {
    var n = Ge;
    Ge |= 1;
    try {
      return e(t);
    } finally {
      Ge = n, Ge === 0 && (Mi = ot() + 500, za && kr());
    }
  }
  function Wr(e) {
    Tr !== null && Tr.tag === 0 && (Ge & 6) === 0 && xi();
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
    an = Li.current, at(Li);
  }
  function Jr(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, gh(n)), mt !== null) for (n = mt.return; n !== null; ) {
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
    if (bt = e, mt = e = Mr(e.current, null), Mt = an = t, vt = 0, ua = null, Yl = ro = qr = 0, Jt = ca = null, Hr !== null) {
      for (t = 0; t < Hr.length; t++) if (n = Hr[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var m = o.next;
          o.next = i, r.next = m;
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
          var o = e, m = n.return, E = n, M = t;
          if (t = Mt, E.flags |= 32768, M !== null && typeof M == "object" && typeof M.then == "function") {
            var U = M, ie = E, le = ie.tag;
            if ((ie.mode & 1) === 0 && (le === 0 || le === 11 || le === 15)) {
              var ne = ie.alternate;
              ne ? (ie.updateQueue = ne.updateQueue, ie.memoizedState = ne.memoizedState, ie.lanes = ne.lanes) : (ie.updateQueue = null, ie.memoizedState = null);
            }
            var ye = Wu(m);
            if (ye !== null) {
              ye.flags &= -257, Ju(ye, m, E, o, t), ye.mode & 1 && qu(o, U, t), t = ye, M = U;
              var Te = t.updateQueue;
              if (Te === null) {
                var Le = /* @__PURE__ */ new Set();
                Le.add(M), t.updateQueue = Le;
              } else Te.add(M);
              break e;
            } else {
              if ((t & 1) === 0) {
                qu(o, U, t), Zl();
                break e;
              }
              M = Error(l(426));
            }
          } else if (lt && E.mode & 1) {
            var ht = Wu(m);
            if (ht !== null) {
              (ht.flags & 65536) === 0 && (ht.flags |= 256), Ju(ht, m, E, o, t), cl(Ti(M, E));
              break e;
            }
          }
          o = M = Ti(M, E), vt !== 4 && (vt = 2), ca === null ? ca = [o] : ca.push(o), o = m;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var j = Yu(o, M, t);
                vu(o, j);
                break e;
              case 1:
                E = M;
                var P = o.type, D = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof P.getDerivedStateFromError == "function" || D !== null && typeof D.componentDidCatch == "function" && (Er === null || !Er.has(D)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var ue = $u(o, E, t);
                  vu(o, ue);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Lc(n);
      } catch (xe) {
        t = xe, mt === n && n !== null && (mt = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Tc() {
    var e = no.current;
    return no.current = Ga, e === null ? Ga : e;
  }
  function Zl() {
    (vt === 0 || vt === 3 || vt === 2) && (vt = 4), bt === null || (qr & 268435455) === 0 && (ro & 268435455) === 0 || Lr(bt, Mt);
  }
  function uo(e, t) {
    var n = Ge;
    Ge |= 2;
    var r = Tc();
    (bt !== e || Mt !== t) && (er = null, Jr(e, t));
    do
      try {
        Uh();
        break;
      } catch (i) {
        Ec(e, i);
      }
    while (!0);
    if (hl(), Ge = n, no.current = r, mt !== null) throw Error(l(261));
    return bt = null, Mt = 0, vt;
  }
  function Uh() {
    for (; mt !== null; ) Cc(mt);
  }
  function Kh() {
    for (; mt !== null && !Ii(); ) Cc(mt);
  }
  function Cc(e) {
    var t = Nc(e.alternate, e, an);
    e.memoizedProps = e.pendingProps, t === null ? Lc(e) : mt = t, Hl.current = null;
  }
  function Lc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = Ih(n, t, an), n !== null) {
          mt = n;
          return;
        }
      } else {
        if (n = Bh(n, t), n !== null) {
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
      mn.transition = null, Je = 1, Vh(e, t, n, r);
    } finally {
      mn.transition = i, Je = r;
    }
    return null;
  }
  function Vh(e, t, n, r) {
    do
      xi();
    while (Tr !== null);
    if ((Ge & 6) !== 0) throw Error(l(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(l(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Io(e, o), e === bt && (mt = bt = null, Mt = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || ao || (ao = !0, Rc(Yn, function() {
      return xi(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = mn.transition, mn.transition = null;
      var m = Je;
      Je = 1;
      var E = Ge;
      Ge |= 4, Hl.current = null, jh(e, n), gc(n, e), uh(Zo), Yt = !!Xo, Zo = Xo = null, e.current = n, _h(n), Hn(), Ge = E, Je = m, mn.transition = o;
    } else e.current = n;
    if (ao && (ao = !1, Tr = e, oo = i), o = e.pendingLanes, o === 0 && (Er = null), Nt(n.stateNode), Gt(e, ot()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (io) throw io = !1, e = ql, ql = null, e;
    return (oo & 1) !== 0 && e.tag !== 0 && xi(), o = e.pendingLanes, (o & 1) !== 0 ? e === Wl ? da++ : (da = 0, Wl = e) : da = 0, kr(), null;
  }
  function xi() {
    if (Tr !== null) {
      var e = Pn(oo), t = mn.transition, n = Je;
      try {
        if (mn.transition = null, Je = 16 > e ? 16 : e, Tr === null) var r = !1;
        else {
          if (e = Tr, Tr = null, oo = 0, (Ge & 6) !== 0) throw Error(l(331));
          var i = Ge;
          for (Ge |= 4, Se = e.current; Se !== null; ) {
            var o = Se, m = o.child;
            if ((Se.flags & 16) !== 0) {
              var E = o.deletions;
              if (E !== null) {
                for (var M = 0; M < E.length; M++) {
                  var U = E[M];
                  for (Se = U; Se !== null; ) {
                    var ie = Se;
                    switch (ie.tag) {
                      case 0:
                      case 11:
                      case 15:
                        sa(8, ie, o);
                    }
                    var le = ie.child;
                    if (le !== null) le.return = ie, Se = le;
                    else for (; Se !== null; ) {
                      ie = Se;
                      var ne = ie.sibling, ye = ie.return;
                      if (dc(ie), ie === U) {
                        Se = null;
                        break;
                      }
                      if (ne !== null) {
                        ne.return = ye, Se = ne;
                        break;
                      }
                      Se = ye;
                    }
                  }
                }
                var Te = o.alternate;
                if (Te !== null) {
                  var Le = Te.child;
                  if (Le !== null) {
                    Te.child = null;
                    do {
                      var ht = Le.sibling;
                      Le.sibling = null, Le = ht;
                    } while (Le !== null);
                  }
                }
                Se = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && m !== null) m.return = o, Se = m;
            else e: for (; Se !== null; ) {
              if (o = Se, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  sa(9, o, o.return);
              }
              var j = o.sibling;
              if (j !== null) {
                j.return = o.return, Se = j;
                break e;
              }
              Se = o.return;
            }
          }
          var P = e.current;
          for (Se = P; Se !== null; ) {
            m = Se;
            var D = m.child;
            if ((m.subtreeFlags & 2064) !== 0 && D !== null) D.return = m, Se = D;
            else e: for (m = P; Se !== null; ) {
              if (E = Se, (E.flags & 2048) !== 0) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    to(9, E);
                }
              } catch (xe) {
                dt(E, E.return, xe);
              }
              if (E === m) {
                Se = null;
                break e;
              }
              var ue = E.sibling;
              if (ue !== null) {
                ue.return = E.return, Se = ue;
                break e;
              }
              Se = E.return;
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
  function Mc(e, t, n) {
    t = Ti(n, t), t = Yu(e, t, 1), e = Sr(e, t, 1), t = Ft(), e !== null && (gt(e, 1, t), Gt(e, t));
  }
  function dt(e, t, n) {
    if (e.tag === 3) Mc(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Mc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Er === null || !Er.has(r))) {
          e = Ti(n, e), e = $u(t, e, 1), t = Sr(t, e, 1), e = Ft(), t !== null && (gt(t, 1, e), Gt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Hh(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Ft(), e.pingedLanes |= e.suspendedLanes & n, bt === e && (Mt & n) === n && (vt === 4 || vt === 3 && (Mt & 130023424) === Mt && 500 > ot() - $l ? Jr(e, 0) : Yl |= n), Gt(e, t);
  }
  function xc(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = ri, ri <<= 1, (ri & 130023424) === 0 && (ri = 4194304)));
    var n = Ft();
    e = Qn(e, t), e !== null && (gt(e, t, n), Gt(e, n));
  }
  function Yh(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), xc(e, n);
  }
  function $h(e, t) {
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
    r !== null && r.delete(t), xc(e, n);
  }
  var Nc;
  Nc = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || $t.current) Wt = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Wt = !1, Ah(e, t, n);
      Wt = (e.flags & 131072) !== 0;
    }
    else Wt = !1, lt && (t.flags & 1048576) !== 0 && su(t, _a, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        Za(e, t), e = t.pendingProps;
        var i = gi(t, Pt.current);
        bi(t, n), i = El(null, t, r, e, i, n);
        var o = Tl();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, qt(r) ? (o = !0, Ba(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, gl(t), i.updater = Qa, t.stateNode = i, i._reactInternals = t, Rl(t, r, e, n), t = Il(null, t, r, !0, o, n)) : (t.tag = 0, lt && o && ol(t), Dt(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (Za(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = Wh(r), e = En(r, e), i) {
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
          var m = t.memoizedState;
          if (r = m.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = Ti(Error(l(423)), t), t = rc(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = Ti(Error(l(424)), t), t = rc(e, t, r, n, i);
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
        return wu(t), e === null && ul(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, m = i.children, el(r, i) ? m = null : o !== null && el(r, o) && (t.flags |= 32), ec(e, t), Dt(e, t, m, n), t.child;
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
          if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, m = i.value, rt(Ua, r._currentValue), r._currentValue = m, o !== null) if (Sn(o.value, m)) {
            if (o.children === i.children && !$t.current) {
              t = Zn(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var E = o.dependencies;
            if (E !== null) {
              m = o.child;
              for (var M = E.firstContext; M !== null; ) {
                if (M.context === r) {
                  if (o.tag === 1) {
                    M = Xn(-1, n & -n), M.tag = 2;
                    var U = o.updateQueue;
                    if (U !== null) {
                      U = U.shared;
                      var ie = U.pending;
                      ie === null ? M.next = M : (M.next = ie.next, ie.next = M), U.pending = M;
                    }
                  }
                  o.lanes |= n, M = o.alternate, M !== null && (M.lanes |= n), pl(
                    o.return,
                    n,
                    t
                  ), E.lanes |= n;
                  break;
                }
                M = M.next;
              }
            } else if (o.tag === 10) m = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (m = o.return, m === null) throw Error(l(341));
              m.lanes |= n, E = m.alternate, E !== null && (E.lanes |= n), pl(m, n, t), m = o.sibling;
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
  function qh(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gn(e, t, n, r) {
    return new qh(e, t, n, r);
  }
  function es(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Wh(e) {
    if (typeof e == "function") return es(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === G) return 11;
      if (e === re) return 14;
    }
    return 2;
  }
  function Mr(e, t) {
    var n = e.alternate;
    return n === null ? (n = gn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function co(e, t, n, r, i, o) {
    var m = 2;
    if (r = e, typeof e == "function") es(e) && (m = 1);
    else if (typeof e == "string") m = 5;
    else e: switch (e) {
      case J:
        return Qr(n.children, i, o, t);
      case te:
        m = 8, i |= 8;
        break;
      case X:
        return e = gn(12, n, t, i | 2), e.elementType = X, e.lanes = o, e;
      case K:
        return e = gn(13, n, t, i), e.elementType = K, e.lanes = o, e;
      case $:
        return e = gn(19, n, t, i), e.elementType = $, e.lanes = o, e;
      case Q:
        return ho(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case H:
            m = 10;
            break e;
          case ae:
            m = 9;
            break e;
          case G:
            m = 11;
            break e;
          case re:
            m = 14;
            break e;
          case se:
            m = 16, r = null;
            break e;
        }
        throw Error(l(130, e == null ? e : typeof e, ""));
    }
    return t = gn(m, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function Qr(e, t, n, r) {
    return e = gn(7, e, r, t), e.lanes = n, e;
  }
  function ho(e, t, n, r) {
    return e = gn(22, e, r, t), e.elementType = Q, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function ts(e, t, n) {
    return e = gn(6, e, null, t), e.lanes = n, e;
  }
  function ns(e, t, n) {
    return t = gn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Jh(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ht(0), this.expirationTimes = Ht(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ht(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function rs(e, t, n, r, i, o, m, E, M) {
    return e = new Jh(e, t, n, E, M), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = gn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, gl(o), e;
  }
  function Gh(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: q, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
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
  function Oc(e, t, n, r, i, o, m, E, M) {
    return e = rs(n, r, !0, e, i, o, m, E, M), e.context = Pc(null), n = e.current, r = Ft(), i = Cr(n), o = Xn(r, i), o.callback = t ?? null, Sr(n, o, i), e.current.lanes = i, gt(e, i, r), Gt(e, r), e;
  }
  function fo(e, t, n, r) {
    var i = t.current, o = Ft(), m = Cr(i);
    return n = Pc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Xn(o, m), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Sr(i, t, m), e !== null && (Ln(e, i, m, o), Va(e, i, m)), m;
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
  function Qh() {
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
      wn.splice(n, 0, e), n === 0 && Z(e);
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
  function Xh(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var U = po(m);
          o.call(U);
        };
      }
      var m = Oc(t, r, e, 0, null, !1, !1, "", Bc);
      return e._reactRootContainer = m, e[qn] = m.current, Ji(e.nodeType === 8 ? e.parentNode : e), Wr(), m;
    }
    for (; i = e.lastChild; ) e.removeChild(i);
    if (typeof r == "function") {
      var E = r;
      r = function() {
        var U = po(M);
        E.call(U);
      };
    }
    var M = rs(e, 0, !1, null, null, !1, !1, "", Bc);
    return e._reactRootContainer = M, e[qn] = M.current, Ji(e.nodeType === 8 ? e.parentNode : e), Wr(function() {
      fo(t, M, n, r);
    }), M;
  }
  function yo(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
      var m = o;
      if (typeof i == "function") {
        var E = i;
        i = function() {
          var M = po(m);
          E.call(M);
        };
      }
      fo(t, m, e, i);
    } else m = Xh(n, t, e, i, r);
    return po(m);
  }
  On = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = ur(t.pendingLanes);
          n !== 0 && (ji(t, n | 1), Gt(t, ot()), (Ge & 6) === 0 && (Mi = ot() + 500, kr()));
        }
        break;
      case 13:
        Wr(function() {
          var r = Qn(e, 1);
          if (r !== null) {
            var i = Ft();
            Ln(r, e, 1, i);
          }
        }), is(e, 1);
    }
  }, jr = function(e) {
    if (e.tag === 13) {
      var t = Qn(e, 134217728);
      if (t !== null) {
        var n = Ft();
        Ln(t, e, 134217728, n);
      }
      is(e, 134217728);
    }
  }, _r = function(e) {
    if (e.tag === 13) {
      var t = Cr(e), n = Qn(e, t);
      if (n !== null) {
        var r = Ft();
        Ln(n, e, t, r);
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
  }, Nn = function(e, t, n) {
    switch (t) {
      case "input":
        if (je(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = Aa(r);
              if (!i) throw Error(l(90));
              xt(r), je(r, i);
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
  var Zh = { usingClientEntryPoint: !1, Events: [Xi, pi, Aa, we, he, Ql] }, ha = { findFiberByHostInstance: Fr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ef = { bundleType: ha.bundleType, version: ha.version, rendererPackageName: ha.rendererPackageName, rendererConfig: ha.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: B.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = ar(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ha.findFiberByHostInstance || Qh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vo.isDisabled && vo.supportsFiber) try {
      ti = vo.inject(ef), un = vo;
    } catch {
    }
  }
  return Qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zh, Qt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!os(t)) throw Error(l(200));
    return Gh(e, t, null, n);
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
    var r = n != null && n.hydratedSources || null, i = !1, o = "", m = Ic;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (m = n.onRecoverableError)), t = Oc(t, null, e, 1, n ?? null, i, !1, o, m), e[qn] = t.current, Ji(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
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
var Yc;
function ad() {
  if (Yc) return ss.exports;
  Yc = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return a(), ss.exports = Nf(), ss.exports;
}
var $c;
function Rf() {
  if ($c) return wo;
  $c = 1;
  var a = ad();
  return wo.createRoot = a.createRoot, wo.hydrateRoot = a.hydrateRoot, wo;
}
var Pf = Rf();
const To = /* @__PURE__ */ new Map();
function Ct(a, u, l) {
  if (!u) return;
  const c = To.get(a);
  if (c?.element === u) return;
  c?.root.unmount();
  const p = Pf.createRoot(u);
  To.set(a, {
    element: u,
    root: p
  }), p.render(l);
}
function Of() {
  for (const {
    root: a
  } of [...To.values()].reverse()) a.unmount();
  To.clear();
}
const Nr = (a) => !!a && typeof a == "object" && !Array.isArray(a), od = (a) => Nr(a) && (!!a.mc || typeof a.url == "string"), ds = (a) => Nr(a) && typeof a.libraryId == "string" && typeof a.url == "string", fa = (a) => Math.max(-12, Math.min(12, Math.round(Number(a) || 0))), So = (a, u = 0) => Number.isFinite(Number(a)) ? Number(a) : u;
function Af(a) {
  return od(a) ? {
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
const If = (a) => Array.isArray(a) ? a.map(Af).filter(Boolean) : [], Bf = (a, u) => a === "_L" ? void 0 : u, ld = (a) => JSON.stringify(a, Bf), qc = (a) => JSON.parse(ld(a)), gs = Object.freeze(["lfont", "lfc", "lsz", "lcol", "lfx", "lshape", "lbgmode", "ltheme", "lclassiccolor"]), zf = Object.freeze([
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
]), Wc = {
  lfx: zf,
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
function sd(a, u = ys, { fontCount: l = 1 / 0 } = {}) {
  if (!Nr(a)) return null;
  const c = { ...ys, ...u, version: 1 };
  for (const p of gs) {
    let d = a[p];
    if (d != null)
      if (p === "lfx" && d === "folia-cappella" && (d = "folia-classic"), Wc[p])
        Wc[p].includes(String(d)) && (c[p] = String(d));
      else if (p === "lfont")
        /^\d+$/.test(String(d)) && Number(d) < l && (c[p] = String(Number(d)));
      else if (p === "lcol" || p === "lclassiccolor")
        /^#[a-f0-9]{6}$/i.test(d) && (c[p] = d);
      else if (p === "lsz") {
        const g = Number(d);
        Number.isFinite(g) && (c[p] = String(Math.max(24, Math.min(160, g))));
      } else c[p] = String(d).slice(0, 120);
  }
  for (const p of ["lbold", "centerFree"]) typeof a[p] == "boolean" && (c[p] = a[p]);
  return Number.isFinite(Number(a.themeSeed)) && (c.themeSeed = Number(a.themeSeed) >>> 0), c;
}
function jf(a, u) {
  const l = Nr(a) ? a : {}, c = sd({ ...l, lfx: l.fxv ? l.lfx : "jizura" }, ys, u);
  return { ...l, ...c, cdn: l.cdn == null ? "5" : String(l.cdn), fxv: 1 };
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
function _f(a = () => globalThis.localStorage) {
  function u(g, v = null) {
    try {
      const h = a().getItem(g);
      return { value: h ?? v, status: h == null ? "missing" : "ok" };
    } catch (h) {
      return { value: v, status: "unavailable", error: h };
    }
  }
  function l(g, v, h = () => !0) {
    const C = u(g);
    if (C.status !== "ok") return { ...C, value: v };
    try {
      const N = JSON.parse(C.value);
      if (!h(N)) throw new Error("Invalid saved data");
      return { value: N, raw: C.value, status: "ok" };
    } catch (N) {
      return { value: v, raw: C.value, status: "invalid", error: N };
    }
  }
  function c(g, v) {
    try {
      return a().setItem(g, String(v)), { ok: !0 };
    } catch (h) {
      return { ok: !1, error: h };
    }
  }
  function p(g, v) {
    const h = l(jn.recovery, { version: 1, entries: {} }, (N) => N?.version === 1 && N.entries && typeof N.entries == "object" && !Array.isArray(N.entries));
    if (h.status === "invalid" || h.status === "unavailable") throw h.error;
    if (h.value.entries[g]?.raw === v) return;
    const C = { version: 1, entries: { ...h.value.entries, [g]: { raw: v, savedAt: Date.now() } } };
    a().setItem(jn.recovery, JSON.stringify(C));
  }
  function d(g, v, h = () => !0) {
    try {
      if (!h(v)) throw new Error("Invalid data to save");
      const C = ld(v);
      if (C === void 0) throw new Error("Data is not serializable");
      const N = l(g, null, h);
      if (N.status === "unavailable") throw N.error;
      return N.status === "invalid" && p(g, N.raw), a().setItem(g, C), { ok: !0 };
    } catch (C) {
      return { ok: !1, error: C };
    }
  }
  return { readText: u, readJson: l, writeText: c, writeJson: d };
}
const tr = Object.freeze({ database: "manokara-library", version: 1, store: "songs", keyPath: "libraryId" });
function Df(a = () => globalThis.indexedDB) {
  let u = null, l = null, c = null, p = 0;
  function d() {
    if (u) return Promise.resolve(u);
    if (l) return l;
    const A = p, S = new Promise((b, L) => {
      let I, W = !1;
      const B = (z) => {
        W || (W = !0, L(z || new Error("Could not open song library")));
      };
      c = () => B(new Error("Song library closed"));
      try {
        const z = a();
        if (!z) throw new Error("IndexedDB unavailable");
        I = z.open(tr.database, tr.version);
      } catch (z) {
        B(z);
        return;
      }
      I.onupgradeneeded = () => {
        try {
          I.result.objectStoreNames.contains(tr.store) || I.result.createObjectStore(tr.store, { keyPath: tr.keyPath });
        } catch (z) {
          B(z), I.transaction?.abort();
        }
      }, I.onerror = () => B(I.error), I.onblocked = () => B(new Error("Song library is blocked by another page")), I.onsuccess = () => {
        const z = I.result;
        if (W || A !== p) {
          z.close();
          return;
        }
        W = !0, u = z, z.onversionchange = () => x(), z.onclose = () => {
          u === z && (u = null);
        }, b(z);
      };
    });
    l = S;
    const w = () => {
      l === S && (l = null, c = null);
    };
    return S.then(w, w), S;
  }
  async function g(A, S) {
    const w = await d();
    return new Promise((b, L) => {
      let I, W, B;
      try {
        I = w.transaction(tr.store, A), I.oncomplete = () => b(B), I.onabort = () => L(I.error || new Error("Song library transaction aborted")), I.onerror = () => L(I.error || new Error("Could not update song library")), W = S(I.objectStore(tr.store)), W.onsuccess = () => {
          B = W.result;
        }, W.onerror = () => L(W.error || new Error("Song library request failed"));
      } catch (z) {
        L(z);
        try {
          I?.abort();
        } catch {
        }
      }
    });
  }
  async function v() {
    return (await g("readonly", (A) => A.getAll()) || []).filter(ds);
  }
  async function h(A) {
    return g("readonly", (S) => S.get(A));
  }
  async function C(A) {
    if (!ds(A)) throw new Error("Invalid library song");
    const S = qc(A);
    await g("readwrite", (w) => w.put(S));
  }
  async function N(A) {
    if (!ds(A)) throw new Error("Invalid library song");
    const S = qc(A), w = await d();
    return new Promise((b, L) => {
      let I, W = !1;
      try {
        I = w.transaction(tr.store, "readwrite"), I.oncomplete = () => b(W), I.onabort = () => L(I.error || new Error("Song library transaction aborted")), I.onerror = () => L(I.error || new Error("Could not import song"));
        const B = I.objectStore(tr.store), z = B.get(S.libraryId);
        z.onerror = () => L(z.error || new Error("Could not read song")), z.onsuccess = () => {
          if (z.result === void 0)
            try {
              B.put(S), W = !0;
            } catch (q) {
              L(q), I.abort();
            }
        };
      } catch (B) {
        L(B);
        try {
          I?.abort();
        } catch {
        }
      }
    });
  }
  async function T(A) {
    await g("readwrite", (S) => S.delete(A));
  }
  function x() {
    p++, c?.(), c = null, l = null, u?.close(), u = null;
  }
  return { ready: d, list: v, get: h, put: C, insertMissing: N, remove: T, close: x };
}
function Ff({ getStorage: a, getIndexedDB: u } = {}) {
  const l = _f(a), c = /* @__PURE__ */ new Set(["aspectLock", "theme", "language", "preferKaraoke"]);
  return { setlist: {
    load() {
      const v = l.readJson(jn.setlist, [], Array.isArray);
      return { ...v, value: If(v.value) };
    },
    save(v) {
      return l.writeJson(jn.setlist, v, (h) => Array.isArray(h) && h.every(od));
    }
  }, preferences: {
    get(v, h = null) {
      return c.has(v) ? l.readText(jn[v], h).value : h;
    },
    set(v, h) {
      return c.has(v) ? l.writeText(jn[v], h) : { ok: !1, error: new Error("Unknown preference") };
    },
    loadOutput(v) {
      const h = l.readJson(jn.outputSettings, {}, Nr);
      return { ...h, value: jf(h.value, v) };
    },
    saveOutput(v) {
      return l.writeJson(jn.outputSettings, v, Nr);
    }
  }, layout: {
    load() {
      return l.readJson(jn.overlay, null, Nr);
    },
    save(v) {
      return l.writeJson(jn.overlay, v, Nr);
    }
  }, library: Df(u), local: l };
}
const Tt = Ff();
(() => {
  const a = {
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
  const l = Tt.preferences.get("language");
  ["vi", "en"].includes(l) && (u = l);
  const c = [], p = document.title;
  function d(S) {
    if (S = String(S ?? ""), u === "en") return S;
    if (Object.hasOwn(a, S)) return a[S];
    const w = S.trim().replace(/\s+/g, " ");
    if (Object.hasOwn(a, w)) return S.replace(S.trim(), a[w]);
    let b = S.match(/^Creating Romaji… (\d+)%$/);
    if (b) return `Đang tạo Romaji… ${b[1]}%`;
    if (b = S.match(/^Imported (.+) \(([^)]+)\)\. Original timestamps and offset tags are retained\.$/), b) return `Đã nhập ${b[1]} (${b[2]}). Giữ nguyên thời gian và thẻ độ lệch gốc.`;
    if (b = S.match(/^Line (\d+): keep every timestamp and metadata tag unchanged\.$/), b) return `Dòng ${b[1]}: giữ nguyên mọi mốc thời gian và thẻ thông tin nhé.`;
    if (b = S.match(/^Line (\d+): keep blank lyric gaps unchanged\.$/), b) return `Dòng ${b[1]}: giữ nguyên khoảng trống giữa các câu nhé.`;
    if (b = S.match(/^Timed line (\d+)\.$/), b) return `Đã gắn thời gian cho câu ${b[1]}.`;
    const L = " Open it on YouTube to check.";
    if (S.endsWith(L)) return d(S.slice(0, -L.length)) + a[L];
    if (b = S.match(/^YouTube error ([^:]+): (.+)$/), b) return `Lỗi YouTube ${b[1]}: ${d(b[2])}`;
    for (const I of ["Romaji conversion failed: ", "Romaji unavailable: ", "Import failed: "])
      if (S.startsWith(I)) return a[I] + d(S.slice(I.length));
    return S;
  }
  const g = ["title", "aria-label", "placeholder", "label"];
  function v(S, w) {
    const b = document.createTreeWalker(S, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let L = S;
    do
      if (L.nodeType === 1) {
        if (L.matches("script,style,svg,[data-no-i18n]") || L.closest("script,style,svg,[data-no-i18n]")) continue;
        for (const I of g) if (L.hasAttribute(I)) {
          const W = L.getAttribute(I);
          Object.hasOwn(a, W) && w.push({
            node: L,
            attr: I,
            source: W
          });
        }
      } else if (L.nodeType === 3 && !L.parentElement?.closest("script,style,svg,[data-no-i18n]")) {
        const I = L.nodeValue, W = I.trim().replace(/\s+/g, " ");
        Object.hasOwn(a, W) && w.push({
          node: L,
          source: I
        });
      }
    while (L = b.nextNode());
  }
  function h(S, w = !1) {
    for (const {
      node: b,
      attr: L,
      source: I
    } of S)
      w && !b.isConnected || (L ? b.setAttribute(L, d(I)) : b.nodeValue = d(I));
  }
  function C(S) {
    if (u === "en") return S;
    const w = document.createElement("template");
    w.innerHTML = S;
    const b = [];
    return v(w.content, b), h(b), w.innerHTML;
  }
  function N(S) {
    return u === "en" ? S : S.replace(/\b(title|aria-label)="([^"]*)"/g, (w, b, L) => `${b}="${d(L).replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`).replace(/(^|>)([^<>]*)(?=<|$)/g, (w, b, L) => b + d(L));
  }
  function T() {
    document.documentElement.lang = u, document.title = d(p), h(c, !0);
    const S = document.querySelector("#language");
    S && (S.value = u);
  }
  function x() {
    const S = "#relayStatus,#playbackState,#now,#time,#msg,#offv,#centerHint,#audioStatus,#lyricsStatus,#lyricLoadStatus,#pitchStatus,#libraryCount,#libraryEmpty,#libraryList,#liveLyricModeStatus,[data-pitch-value],#ftitle,#songDialogTitle,#add,#pause,#stage,#pan,#lres,#list,#lrandom";
    document.querySelectorAll(S).forEach((w) => w.setAttribute("data-no-i18n", "")), v(document.body, c), document.querySelectorAll(S).forEach((w) => w.removeAttribute("data-no-i18n")), T();
  }
  function A(S) {
    !["vi", "en"].includes(S) || S === u || (u = S, Tt.preferences.set("language", S), T(), window.dispatchEvent(new CustomEvent("manokara:languagechange")));
  }
  window.ManokaraI18n = {
    text: d,
    html: C,
    markup: N,
    init: x,
    setLanguage: A,
    get language() {
      return u;
    }
  };
})();
function Pr(a = globalThis, u = () => performance.now()) {
  const l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), d = new AbortController();
  let g = !1, v = !1;
  function h(L) {
    L.handle != null && a[L.kind === "interval" ? "clearInterval" : L.kind === "frame" ? "cancelAnimationFrame" : "clearTimeout"](L.handle), L.handle = null;
  }
  function C(L) {
    if (g || v || !l.has(L)) return;
    const I = () => {
      g || v || !l.has(L) || (L.kind !== "interval" && (l.delete(L), L.handle = null), L.callback());
    };
    L.kind === "interval" ? L.handle = a.setInterval(I, L.ms) : L.kind === "frame" ? L.handle = a.requestAnimationFrame(I) : (L.due = u() + L.remaining, L.handle = a.setTimeout(I, L.remaining));
  }
  function N(L, I, W = 0) {
    if (g) return () => {
    };
    const B = {
      kind: L,
      callback: I,
      ms: W,
      remaining: W,
      handle: null
    };
    return l.add(B), C(B), () => {
      h(B), l.delete(B);
    };
  }
  function T(L) {
    return g ? (L(), () => {
    }) : (c.add(L), () => {
      c.delete(L) && L();
    });
  }
  function x(L, I, W, B) {
    A(L, I, W, B);
    let z = !0;
    const q = (...X) => {
      z && !g && !v && W(...X);
    };
    L.addEventListener(I, q, B);
    const J = {
      target: L,
      type: I,
      callback: W,
      capture: typeof B == "boolean" ? B : !!B?.capture
    }, te = T(() => {
      z = !1, L.removeEventListener(I, q, {
        capture: J.capture
      }), p.delete(J);
    });
    return J.remove = te, g || p.add(J), te;
  }
  function A(L, I, W, B) {
    const z = typeof B == "boolean" ? B : !!B?.capture;
    for (const q of p) q.target === L && q.type === I && q.callback === W && q.capture === z && q.remove();
  }
  function S() {
    if (!(g || v)) {
      v = !0;
      for (const L of l)
        L.kind === "timeout" && (L.remaining = Math.max(0, L.due - u())), h(L);
    }
  }
  function w() {
    if (!(g || !v)) {
      v = !1;
      for (const L of l) C(L);
    }
  }
  function b() {
    if (!g) {
      g = !0, d.abort();
      for (const L of l) h(L);
      l.clear();
      for (const L of c)
        try {
          L();
        } catch {
        }
      c.clear();
    }
  }
  return {
    interval: (L, I) => N("interval", L, I),
    timeout: (L, I) => N("timeout", L, I),
    frame: (L) => N("frame", L),
    own: T,
    listen: x,
    unlisten: A,
    suspend: S,
    resume: w,
    dispose: b,
    signal: d.signal,
    get disposed() {
      return g;
    },
    get suspended() {
      return v;
    },
    get timerCount() {
      return l.size;
    },
    get activeTimerCount() {
      return [...l].filter((L) => L.handle != null).length;
    },
    get cleanupCount() {
      return c.size;
    }
  };
}
(() => {
  const a = Pr(), u = [{
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
  let p = u, d, g, v, h, C = 0, N = !1, T, x = 0, A = 0;
  const S = (G) => document.querySelector(G);
  function w() {
    const G = window.visualViewport;
    return {
      left: G?.offsetLeft || 0,
      top: G?.offsetTop || 0,
      width: G?.width || innerWidth,
      height: G?.height || innerHeight
    };
  }
  function b(G, K) {
    const $ = G.getBoundingClientRect();
    let re = Math.max(K.left + 6, $.left - 6), se = Math.max(K.top + 6, $.top - 6), Q = Math.min(K.left + K.width - 6, $.right + 6), y = Math.min(K.top + K.height - 6, $.bottom + 6);
    for (let O = G.parentElement; O && O !== document.body; O = O.parentElement) {
      const _ = getComputedStyle(O), k = O.getBoundingClientRect();
      /auto|scroll|hidden|clip/.test(_.overflowX) && (re = Math.max(re, k.left), Q = Math.min(Q, k.right)), /auto|scroll|hidden|clip/.test(_.overflowY) && (se = Math.max(se, k.top), y = Math.min(y, k.bottom));
    }
    return {
      left: re,
      top: se,
      right: Math.max(re, Q),
      bottom: Math.max(se, y),
      width: Math.max(0, Q - re),
      height: Math.max(0, y - se)
    };
  }
  function L() {
    if (x = 0, !N) return;
    const G = S(p[C].target);
    if (!G) return;
    const K = w(), $ = b(G, K), re = 16, se = 12;
    d.style.setProperty("--tour-height", K.height + "px"), d.style.setProperty("--tour-width", K.width + "px"), g.style.width = Math.min(390, K.width - se * 2) + "px", g.style.maxHeight = Math.max(140, Math.min(K.height - se * 2, K.width <= 620 && K.height >= 500 ? K.height * 0.6 : K.height)) + "px";
    const Q = g.getBoundingClientRect(), y = Q.width, O = Q.height;
    let _, k;
    if (K.width <= 620)
      _ = K.left + (K.width - y) / 2, k = K.top + K.height - O - se;
    else {
      const ke = [{
        x: $.right + re,
        y: $.top
      }, {
        x: $.left - y - re,
        y: $.top
      }, {
        x: $.left,
        y: $.bottom + re
      }, {
        x: $.left,
        y: $.top - O - re
      }], ve = (fe) => Math.max(K.left + se, Math.min(fe, K.left + K.width - y - se)), Ie = (fe) => Math.max(K.top + se, Math.min(fe, K.top + K.height - O - se));
      ({
        x: _,
        y: k
      } = ke.map((fe) => {
        const Pe = ve(fe.x), be = Ie(fe.y), Fe = Math.max(0, Math.min(Pe + y, $.right) - Math.max(Pe, $.left)) * Math.max(0, Math.min(be + O, $.bottom) - Math.max(be, $.top));
        return {
          x: Pe,
          y: be,
          score: Fe + Math.abs(fe.x - Pe) + Math.abs(fe.y - be)
        };
      }).sort((fe, Pe) => fe.score - Pe.score)[0]);
    }
    Object.assign(g.style, {
      left: _ + "px",
      top: k + "px"
    }), Object.assign(v.style, {
      left: $.left + "px",
      top: $.top + "px",
      width: $.width + "px",
      height: $.height + "px"
    });
    const F = d.querySelectorAll(".tour-mask"), ce = [{
      left: 0,
      top: 0,
      width: innerWidth,
      height: $.top
    }, {
      left: 0,
      top: $.bottom,
      width: innerWidth,
      height: Math.max(0, innerHeight - $.bottom)
    }, {
      left: 0,
      top: $.top,
      width: $.left,
      height: $.height
    }, {
      left: $.right,
      top: $.top,
      width: Math.max(0, innerWidth - $.right),
      height: $.height
    }];
    F.forEach((ke, ve) => {
      for (const [Ie, Ne] of Object.entries(ce[ve])) ke.style[Ie] = Math.max(0, Ne) + "px";
    });
  }
  function I() {
    N && !x && (x = a.frame(L));
  }
  function W() {
    N && (z(), I());
  }
  function B() {
    const G = ManokaraI18n.language, K = c[G], [$, re] = p[C][G];
    Y.ui.updateTour({
      open: N,
      language: G,
      languageLabel: K.language,
      eyebrow: p === l ? K.overlayGuide : K.guide,
      title: $,
      body: re,
      progress: `${K.step} ${C + 1} ${K.of} ${p.length}`,
      meter: (C + 1) / p.length * 100,
      closeLabel: K.close,
      skipLabel: K.skip,
      backLabel: K.back,
      nextLabel: C === p.length - 1 ? p === l ? K.overlayDone : K.done : K.next,
      backDisabled: C === 0
    }), I();
  }
  function z() {
    const G = p[C], K = S("#tourReactRoot"), $ = G.tab === "song" ? S("#songEditorDialog") : document.body;
    K.parentElement !== $ && $.append(K), h.showMain?.(p === l ? "playlist" : "karaoke"), G.overlay && ManokaraStudio.view.target !== G.overlay && ManokaraStudio.showTarget(G.overlay), p === u && h.showTab(G.tab || "output"), G.details && (S(G.details).open = !0);
    const re = S(G.target);
    if (re) {
      for (let se = re; se && se !== document.body; se = se.parentElement)
        se.tagName === "DETAILS" && (se.open = !0);
      re.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "instant"
      });
    }
  }
  function q(G) {
    C = Math.max(0, Math.min(G, p.length - 1));
    const K = ++A;
    B(), z(), a.frame(() => {
      if (!N || K !== A) return;
      L();
      const $ = w(), re = S(p[C].target);
      if (!re) return;
      const se = re.getBoundingClientRect(), Q = g.getBoundingClientRect();
      if ($.width <= 620 && se.bottom > Q.top - 16) {
        let y = re.parentElement;
        for (; y && y !== document.body && !(y.scrollHeight > y.clientHeight && /auto|scroll/.test(getComputedStyle(y).overflowY)); ) y = y.parentElement;
        const O = se.bottom - Q.top + 24;
        y && y !== document.body ? y.scrollTop += O : window.scrollBy({
          top: O,
          behavior: "instant"
        }), L();
      }
      d.querySelector('[data-tour="next"]').focus({
        preventScroll: !0
      });
    });
  }
  function J(G) {
    if (N) {
      if (G.key === "Escape") {
        G.preventDefault(), G.stopImmediatePropagation(), H();
        return;
      }
      if (G.key === "Tab") {
        const K = [...g.querySelectorAll("button:not([disabled]),select")], $ = K[0], re = K.at(-1);
        G.shiftKey && document.activeElement === $ ? (G.preventDefault(), re.focus()) : !G.shiftKey && document.activeElement === re && (G.preventDefault(), $.focus());
        return;
      }
      G.target.tagName !== "SELECT" && (G.key === "ArrowRight" && (G.preventDefault(), te()), G.key === "ArrowLeft" && (G.preventDefault(), q(C - 1)));
    }
  }
  function te() {
    C === p.length - 1 ? H() : q(C + 1);
  }
  function X() {
    if (N) return;
    S("#transposeDialog").hidden || S("#transposeClose").click();
    const G = [...document.querySelectorAll(".app-header,.main-tabs,#grid,#playlistStudio,.app-footer")];
    T = {
      focus: document.activeElement,
      main: h.main?.() || "karaoke",
      overlay: ManokaraStudio.view,
      tab: S("#songEditorDialog").open ? "song" : "output",
      details: [...document.querySelectorAll("#grid details,#playlistStudio details,#songEditorDialog details")].map((K) => ({
        node: K,
        open: K.open
      })),
      scroll: [...document.querySelectorAll("main,main *,#playlistStudio,#playlistStudio *")].filter((K) => K.scrollHeight > K.clientHeight || K.scrollWidth > K.clientWidth).map((K) => ({
        node: K,
        top: K.scrollTop,
        left: K.scrollLeft
      })),
      x: scrollX,
      y: scrollY,
      background: G.map((K) => ({
        node: K,
        inert: K.inert
      }))
    }, p = T.main === "playlist" ? l : u, T.background.forEach(({
      node: K
    }) => K.inert = !0), N = !0, a.listen(document, "keydown", J, !0), a.listen(document, "scroll", I, !0), a.listen(window, "resize", W), window.visualViewport?.addEventListener("resize", W), window.visualViewport?.addEventListener("scroll", I), q(0);
  }
  function H() {
    if (!N) return;
    N = !1, A++, B(), typeof x == "function" && x(), x = 0, a.unlisten(document, "keydown", J, !0), a.unlisten(document, "scroll", I, !0), a.unlisten(window, "resize", W), window.visualViewport?.removeEventListener("resize", W), window.visualViewport?.removeEventListener("scroll", I), document.body.append(S("#tourReactRoot")), T.details.forEach(({
      node: K,
      open: $
    }) => K.open = $), h.showTab(T.tab), h.showMain?.(T.main), ManokaraStudio.restoreView(T.overlay), T.background.forEach(({
      node: K,
      inert: $
    }) => K.inert = $), T.scroll.forEach(({
      node: K,
      top: $,
      left: re
    }) => {
      K.scrollTop = $, K.scrollLeft = re;
    }), window.scrollTo({
      left: T.x,
      top: T.y,
      behavior: "instant"
    }), (T.focus?.isConnected ? T.focus : S("#help")).focus({
      preventScroll: !0
    });
  }
  function ae(G) {
    h = G, d = document.querySelector("#tourReactRoot .tour-overlay"), g = d.querySelector(".tour-card"), v = d.querySelector(".tour-spotlight"), Y.commands.bind("tour", {
      close: H,
      back() {
        q(C - 1);
      },
      next: te,
      setLanguage: ManokaraI18n.setLanguage
    }), window.ManokaraTourActions = Y.commands.actions("tour"), a.listen(window, "manokara:languagechange", () => {
      N && B();
    });
  }
  window.ManokaraTour = {
    init: ae,
    open: X,
    close: H,
    get active() {
      return N;
    },
    dispose() {
      H(), a.dispose();
    }
  };
})();
(() => {
  function a(g, v = 180) {
    const h = [];
    let C = !1, N = 0;
    for (const x of String(g || "").split(/\r?\n/)) {
      const A = x.match(/\[offset:([+-]?\d+)\]/i);
      A && (N = Number(A[1]) / 1e3);
      const S = [...x.matchAll(/\[(\d+):(\d{2}(?:\.\d+)?)\]/g)], w = x.replace(/\[[^\]]*\]|<[^>]*>/g, "").trim(), b = [...x.matchAll(/<(\d+):(\d{2}(?:[.:]\d+)?)>/g)], L = x.match(/\[mk-end:(\d+):(\d{2}(?:\.\d+)?)\]/), I = L ? Number(L[1]) * 60 + Number(L[2]) : null, W = x.match(/\[mk-ends:([\d.,]+)\]/), B = W ? W[1].split(",").map(Number) : [];
      if (S.length) {
        C = !0;
        const z = Number(S[0][1]) * 60 + Number(S[0][2]);
        for (const q of S) {
          const J = Number(q[1]) * 60 + Number(q[2]), te = { t: J, x: w }, X = J - z;
          I !== null && Number.isFinite(I) && I >= z && (te.end = I + X), b.length && (te.words = b.map((H, ae) => {
            const G = Number(H[1]) * 60 + Number(H[2].replace(":", ".")) + X, K = { t: G, x: x.slice(H.index + H[0].length, b[ae + 1]?.index).replace(/\[[^\]]*\]/g, "") }, $ = B[ae] + X;
            return B.length === b.length && Number.isFinite($) && $ >= G && (te.end == null || $ <= te.end + 1e-3) && (K.end = $), K;
          })), h.push(te);
        }
      } else w && h.push({ t: null, x: w });
    }
    const T = Math.max(1, Number(v) || 180);
    return C ? h.forEach((x) => {
      x.t !== null && (x.t += N), x.end != null && (x.end += N), x.words?.forEach((A) => {
        A.t += N, A.end != null && (A.end += N);
      });
    }) : h.forEach((x, A) => {
      x.t = A * T / h.length;
    }), { all: h, timed: C, lines: h.filter((x) => x.t !== null).sort((x, A) => x.t - A.t) };
  }
  function u(g, v = 180) {
    const h = a(g, v).lines;
    let C = !1;
    return { lines: h.map((T, x) => {
      const A = Math.max(0, T.t), S = Math.max(A + 0.01, T.end ?? h[x + 1]?.t ?? (Number(v) || 180));
      let w;
      if (T.words?.length && T.words.map((b) => b.x).join("").trim() === T.x)
        C = !0, w = T.words.filter((b) => b.x).map((b) => {
          const L = T.words[T.words.indexOf(b) + 1], I = Math.max(A, Math.min(S, b.t));
          return { text: b.x, startTime: I, endTime: Math.max(I, Math.min(S, b.end ?? L?.t ?? S)) };
        });
      else {
        const b = T.x.match(/\s+|[^\s]+/gu) || [], L = (S - A) / Math.max(1, b.length);
        w = b.map((I, W) => ({ text: I, startTime: A + W * L, endTime: W === b.length - 1 ? S : A + (W + 1) * L }));
      }
      return { id: `manokara-${x}`, fullText: T.x, startTime: A, endTime: S, words: w };
    }), isWordByWord: C };
  }
  function l() {
    const g = [];
    return {
      record(v) {
        return Number.isFinite(v) && v >= 0 && v <= 4e3 && (g.push(v), g.length > 20 && g.shift()), this.oneWay();
      },
      oneWay() {
        if (!g.length) return 0;
        const v = [...g].sort((h, C) => h - C);
        return Math.min(2e3, v[Math.floor((v.length - 1) * 0.2)] / 2);
      }
    };
  }
  function c(g) {
    const v = String(g || "").trim();
    if (!v) return null;
    if (!/^\d+(?::\d{1,2})?(?:\.\d+)?$/.test(v)) return NaN;
    const h = v.split(":");
    return h.length === 2 && Number(h[1]) >= 60 ? NaN : h.length === 2 ? Number(h[0]) * 60 + Number(h[1]) : Number(v);
  }
  function p(g) {
    try {
      const v = new URL(g), h = v.hostname.toLowerCase().replace(/^www\./, ""), C = h === "youtu.be" ? v.pathname.slice(1).split("/")[0] : ["youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com"].includes(h) ? v.searchParams.get("v") || v.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] : null;
      return /^[\w-]{11}$/.test(C || "") ? C : null;
    } catch {
      return null;
    }
  }
  function d() {
    let g = null, v = 0, h = 0;
    const C = () => performance.now(), N = (x) => Math.min(15, Math.max(0, x - v) / 1e3), T = (x, A) => Number(x.time || 0) + (x.playing && !x.paused ? N(A) + h * (1 - Math.exp(-N(A) / 1.5)) : 0);
    return {
      accept(x, A = C(), S = 0) {
        const w = { ...x }, b = Math.min(15e3, (Number.isFinite(w.stateAgeMs) ? Math.max(0, w.stateAgeMs) : 0) + Math.max(0, Math.min(2e3, Number(S) || 0))) / 1e3, L = Number(w.time) || 0;
        w.time = L + (w.playing && !w.paused ? b : 0), w.counting && !w.paused && (w.countdownRemaining = Math.max(0, Number(w.countdownRemaining || 0) - b)), w.sampledAt = Date.now();
        const I = g && g.title === w.title && g.lrc === w.lrc && g.writerId === w.writerId && g.timelineVersion === w.timelineVersion;
        let W = 0;
        if (I && !w.counting && !g.counting && g.playing && w.playing && !g.paused && !w.paused) {
          const B = T(g, A);
          Math.abs(B - w.time) <= 0.35 && (W = w.time - B, w.time = B);
        }
        return w.stateAgeMs >= 15e3 && (w.playing = !1), g = w, h = W, v = A, w;
      },
      time(x = C()) {
        return g ? T(g, x) : 0;
      },
      age(x = C()) {
        return g ? Math.max(0, x - v) + (Number(g.stateAgeMs) || 0) : 1 / 0;
      },
      countdown(x = C()) {
        return g ? Math.max(0, Number(g.countdownRemaining || 0) - (g.paused || g.stateAgeMs >= 15e3 ? 0 : N(x))) : 0;
      }
    };
  }
  globalThis.ManokaraCore = { parseLyrics: a, foliaLyrics: u, timeValue: c, youtubeId: p, createClock: d, createLatencyEstimator: l };
})();
(() => {
  const a = { audioPower: 0, audioBass: 0, audioLowMid: 0, audioMid: 0, audioVocal: 0, audioTreble: 0 };
  function u(l, c) {
    let p, d, g, v, h = !1, C = !1, N = 0, T = null;
    const x = l.onclick, A = [];
    let S = "Share the karaoke tab with tab audio enabled. No recording.";
    const w = () => {
      if (C) return;
      const I = (W) => globalThis.ManokaraI18n?.text(W) || W;
      l.textContent = I(h ? "Stop audio reaction" : "Enable audio reaction"), c.textContent = I(S);
    };
    window.addEventListener("manokara:languagechange", w);
    const b = () => {
      N++, T = null, l.disabled = !1, A.splice(0).forEach((I) => I()), h = !1, p?.getTracks().forEach((I) => I.stop()), d?.close().catch(() => {
      }), p = d = g = v = null, S = "Share the karaoke tab with tab audio enabled. No recording.", w();
    }, L = async () => {
      if (C) return;
      if (h) {
        b();
        return;
      }
      const I = ++N;
      T = I, l.disabled = !0;
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) throw Error("Use Chrome or Edge over HTTPS / localhost to share tab audio.");
        const W = await navigator.mediaDevices.getDisplayMedia({ video: !0, audio: !0, preferCurrentTab: !0 });
        if (C || I !== N) {
          W.getTracks().forEach((z) => z.stop());
          return;
        }
        if (p = W, !p.getAudioTracks().length) throw Error("No tab audio selected. Choose the karaoke tab and enable Share tab audio.");
        const B = new AudioContext({ latencyHint: "interactive" });
        if (d = B, await B.resume(), C || I !== N) {
          B.close().catch(() => {
          });
          return;
        }
        g = d.createAnalyser(), g.fftSize = 2048, g.smoothingTimeConstant = 0.55, d.createMediaStreamSource(p).connect(g), v = new Uint8Array(g.frequencyBinCount), h = !0, p.getTracks().forEach((z) => {
          const q = () => {
            I === N && b();
          };
          z.addEventListener("ended", q, { once: !0 }), A.push(() => z.removeEventListener?.("ended", q));
        }), S = "Folia reacts to the selected tab audio. Lyrics follow the LRC timecodes.", w();
      } catch (W) {
        !C && I === N && (b(), S = W.message || "Audio sharing cancelled.", w());
      } finally {
        T === I && (T = null, l.disabled = !1);
      }
    };
    return l.onclick = L, window.addEventListener("pagehide", b, { once: !0 }), w(), {
      stop: b,
      dispose() {
        C || (C = !0, b(), window.removeEventListener?.("manokara:languagechange", w), window.removeEventListener?.("pagehide", b), l.onclick === L && (l.onclick = x));
      },
      sample() {
        if (!h || d?.state !== "running" || !g) return a;
        g.getByteFrequencyData(v);
        const I = (W, B) => {
          const z = Math.max(0, Math.floor(W * g.fftSize / d.sampleRate)), q = Math.min(v.length, Math.ceil(B * g.fftSize / d.sampleRate));
          let J = 0;
          for (let te = z; te < q; te++) J += (v[te] / 255) ** 2;
          return Math.min(1, Math.sqrt(J / Math.max(1, q - z)));
        };
        return { audioPower: I(30, 1e4), audioBass: I(30, 250), audioLowMid: I(250, 500), audioMid: I(500, 2e3), audioVocal: I(2e3, 4e3), audioTreble: I(4e3, 12e3) };
      }
    };
  }
  globalThis.ManokaraAudio = { create: u };
})();
(() => {
  const a = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]/u, u = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]+/gu, l = () => /\[[^\]\r\n]*\]|<\d{1,3}:\d{2}(?:[.:]\d+)?\s*>/g, c = (S) => String(S || "").split(/\r\n|\r|\n/);
  function p(S) {
    const w = [];
    let b = 0;
    for (const L of S.matchAll(l()))
      w.push({ text: S.slice(b, L.index), token: !1 }, { text: L[0], token: !0 }), b = L.index + L[0].length;
    return w.push({ text: S.slice(b), token: !1 }), w;
  }
  function d(S, w) {
    const b = c(S), L = c(w);
    if (b.length !== L.length) return "Keep the same number of lines as the original LRC.";
    for (let I = 0; I < b.length; I++) {
      const W = (z) => [...z.matchAll(l())].map((q) => q[0]), B = (z) => p(z).filter((q) => !q.token).map((q) => q.text).join("").trim();
      if (JSON.stringify(W(b[I])) !== JSON.stringify(W(L[I]))) return `Line ${I + 1}: keep every timestamp and metadata tag unchanged.`;
      if (!!B(b[I]) != !!B(L[I])) return `Line ${I + 1}: keep blank lyric gaps unchanged.`;
    }
    return "";
  }
  async function g(S, w, b = () => {
  }) {
    const L = String(S).split(/(\r\n|\r|\n)/), I = [];
    for (let z = 0; z < L.length; z++) {
      if (/^(?:\r\n|\r|\n)$/.test(L[z])) {
        I.push(L[z]);
        continue;
      }
      const q = [], J = p(L[z]);
      for (let te = 0; te < J.length; te++) {
        const X = J[te];
        if (X.token || !a.test(X.text)) {
          q.push(X.text);
          continue;
        }
        let H = 0;
        for (const ae of X.text.matchAll(u))
          q.push(X.text.slice(H, ae.index), await w(ae[0])), H = ae.index + ae[0].length;
        q.push(X.text.slice(H)), /^<\d/.test(J[te + 1]?.text || "") && a.test(X.text.slice(-1)) && q.push(" ");
      }
      I.push(q.join("")), z % 20 === 0 && b(Math.round((z + 1) / L.length * 100));
    }
    const W = I.join(""), B = d(S, W);
    if (B) throw Error(B);
    return W;
  }
  const v = /* @__PURE__ */ new WeakMap();
  function h(S) {
    if (!S || typeof S != "object") return !1;
    const w = S.romaji;
    if (!w || w.source !== S.lrc || typeof w.lrc != "string" || w.lrc.length > 2e5) return !1;
    const b = v.get(S);
    if (b && b.source === S.lrc && b.result === w.lrc) return b.valid;
    const L = !d(S.lrc, w.lrc);
    return v.set(S, { source: S.lrc, result: w.lrc, valid: L }), L;
  }
  function C(S) {
    return h(S) && ["romaji", "both"].includes(S.lyricMode) ? S.lyricMode : "original";
  }
  function N(S) {
    return C(S) === "romaji" ? S.romaji.lrc : String(S?.lrc || "");
  }
  const T = (S) => C(S) === "both" ? S.romaji.lrc : "";
  function x(S) {
    const w = String(S).match(/^\s*\[ti:([^\]]+)\]/im)?.[1]?.trim() || "", b = String(S).match(/^\s*\[ar:([^\]]+)\]/im)?.[1]?.trim() || "", L = String(S).match(/^\s*\[length:\s*(\d+):(\d{2}(?:\.\d+)?)\s*\]/im), I = L && Number(L[2]) < 60 ? Number(L[1]) * 60 + Number(L[2]) : void 0;
    return { title: w, artist: b, duration: I };
  }
  const A = (S) => c(S).some((w) => p(w).some((b) => !b.token && a.test(b.text)));
  globalThis.ManokaraLyrics = { romanize: g, alignmentError: d, validRomaji: h, mode: C, displayLrc: N, secondaryLrc: T, fileMetadata: x, hasJapanese: A };
})();
(() => {
  const a = ManokaraLyrics, u = (c) => document.querySelector(c);
  function l({ imported: c = () => {
  }, changed: p = () => {
  }, convertTtml: d = null, draft: g = null } = {}) {
    const v = {
      llrc: { value: "llrc" },
      romajiLrc: { value: "romajiLrc" },
      lyricMode: { value: "lyricMode" },
      ttl: { value: "ttl" },
      lq: { value: "lq" },
      lrcEncoding: { value: "lrcEncoding" },
      romajiDetails: { open: "romajiOpen" },
      romanize: { disabled: "romanizeBusy" }
    };
    function h(y) {
      const O = u(y), _ = v[y.slice(1)];
      return !g || !_ ? O : new Proxy(O, {
        get(k, F) {
          if (_[F]) return g.get(_[F]);
          const ce = k[F];
          return typeof ce == "function" ? ce.bind(k) : ce;
        },
        set(k, F, ce) {
          return _[F] ? g.set(_[F], ce) : k[F] = ce, !0;
        }
      });
    }
    const C = [], N = /* @__PURE__ */ new Map();
    let T = !1;
    function x(y, O, _, k) {
      y.addEventListener(O, _, k), C.push(() => y.removeEventListener(O, _, k));
    }
    function A(y, O) {
      const _ = u(y), k = _.onclick;
      _.onclick = O, C.push(() => {
        _.onclick === O && (_.onclick = k);
      });
    }
    const S = h("#llrc"), w = h("#romajiLrc"), b = h("#lyricMode"), L = u("#lyricsStatus");
    let I = "", W = 0, B = null, z = null, q = 0, J = null, te = "";
    const X = (y, O = !1) => {
      if (T) return;
      te = y;
      const _ = globalThis.ManokaraI18n?.text(y) || y;
      g ? g.patch({ lyricsStatus: _, lyricsError: O }) : (L.textContent = _, L.classList.toggle("error", O));
    };
    x(window, "manokara:languagechange", () => X(te, g ? g.get("lyricsError") : L.classList.contains("error")));
    function H() {
      const y = !!w.value && I === S.value && !a.alignmentError(S.value, w.value);
      if (g) g.set("romajiAvailable", y);
      else for (const O of b.options) O.disabled = O.value !== "original" && !y;
      return y;
    }
    function ae() {
      W++, z && K(), I = "", w.value = "", b.value = "original", h("#romajiDetails").open = !1, H(), X("Drop an LRC or TTML file here, or paste lyrics. Romaji keeps the original timing.");
    }
    function G() {
      q++, J?.abort(), J = null, g && g.set("importBusy", !1);
    }
    x(S, "input", (y) => {
      G(), g && g.set("llrc", y.target.value), ae(), p();
    }), x(w, "input", (y) => {
      g && g.set("romajiLrc", y.target.value);
      const O = a.alignmentError(S.value, w.value);
      H(), X(O || "Romaji edited. Add/Save the song to keep your changes.", !!O);
    }), x(b, "change", (y) => {
      g && g.set("lyricMode", y.target.value), H(), X("Display mode applies when you Add/Save this song.");
    });
    function K() {
      z && clearTimeout(z.timer), B && B.terminate(), B = null, z = null, h("#romanize").disabled = !1;
    }
    function $() {
      if (J) {
        X("Wait for the lyric import to finish.");
        return;
      }
      const y = S.value;
      if (!y.trim()) {
        X("Paste or import Japanese lyrics first.", !0);
        return;
      }
      if (y.length > 2e5) {
        X("Lyrics exceed the 200,000-character limit.", !0);
        return;
      }
      if (!a.hasJapanese(y)) {
        X("No Japanese characters found in these lyrics.", !0);
        return;
      }
      if (z) {
        X("Romaji conversion is already running.");
        return;
      }
      const O = ++W;
      h("#romanize").disabled = !0, X("Loading the local Japanese dictionary…");
      try {
        B ||= new Worker("./manokara-romaji-worker.js");
        const _ = setTimeout(() => {
          if (!z || z.id !== O) return;
          const k = O === W;
          K(), k && X("Conversion timed out. Check that the Japanese dictionary is deployed, then try again.", !0);
        }, 12e4);
        z = { id: O, timer: _ }, B.onerror = () => {
          if (!z || z.id !== O) return;
          clearTimeout(_);
          const k = O === W;
          K(), k && X("Could not load the Japanese converter. Restart the updated server and reload this page.", !0);
        }, B.onmessage = ({ data: k }) => {
          if (!z || k.id !== z.id) return;
          if (k.lrc === void 0 && !k.error) {
            O === W && X(k.loading ? "Loading the local Japanese dictionary…" : `Creating Romaji… ${k.progress}%`);
            return;
          }
          if (clearTimeout(_), z = null, h("#romanize").disabled = !1, O !== W || y !== S.value) return;
          if (k.error) {
            X("Romaji conversion failed: " + k.error, !0);
            return;
          }
          const F = a.alignmentError(y, k.lrc);
          if (F) {
            X(F, !0);
            return;
          }
          I = y, w.value = k.lrc, b.value = "romaji", h("#romajiDetails").open = !0, H(), X("Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.");
        }, B.postMessage({ id: O, source: y });
      } catch (_) {
        z && clearTimeout(z.timer), K(), X("Romaji unavailable: " + _.message, !0);
      }
    }
    A("#romanize", $), A("#exportRomaji", () => {
      if (!H()) {
        X(a.alignmentError(S.value, w.value) || "Create valid Romaji before downloading.", !0);
        return;
      }
      const y = (h("#ttl").value.trim() || "lyrics").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 100), O = URL.createObjectURL(new Blob([w.value], { type: "text/plain;charset=utf-8" })), _ = document.createElement("a");
      _.href = O, _.download = y + ".romaji.lrc", document.body.appendChild(_), _.click(), _.remove(), N.set(O, setTimeout(() => {
        N.delete(O), URL.revokeObjectURL(O);
      }, 3e4)), X("Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.");
    }), A("#lyricsify", () => {
      const y = h("#lq").value.trim() || h("#ttl").value.trim(), O = new URL("https://www.lyricsify.com/" + (y ? "search" : "lrc"));
      y && O.searchParams.set("q", y), window.open(O.href, "_blank", "noopener"), X("Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.");
    });
    async function re(y) {
      if (!y) return;
      if (!/\.(lrc|ttml)$/i.test(y.name)) {
        X("Choose an .lrc or .ttml file.", !0);
        return;
      }
      const O = /\.ttml$/i.test(y.name);
      if (y.size > (O ? 5e5 : 512e3)) {
        X("Lyric file is too large (maximum 500 KB).", !0);
        return;
      }
      G(), z && K();
      const _ = q, k = W, F = S.value, ce = new AbortController();
      J = ce, g && g.set("importBusy", !0), X(O ? "Reading TTML…" : "Reading LRC…");
      const ke = () => !T && _ === q && k === W && F === S.value && !ce.signal.aborted;
      try {
        const ve = new Uint8Array(await y.arrayBuffer()), Ie = h("#lrcEncoding").value;
        let Ne, fe = Ie;
        if (Ie === "auto")
          if (ve[0] === 255 && ve[1] === 254)
            Ne = new TextDecoder("utf-16le", { fatal: !0 }).decode(ve), fe = "UTF-16LE";
          else if (ve[0] === 254 && ve[1] === 255)
            Ne = new TextDecoder("utf-16be", { fatal: !0 }).decode(ve), fe = "UTF-16BE";
          else try {
            Ne = new TextDecoder("utf-8", { fatal: !0 }).decode(ve), fe = "UTF-8";
          } catch {
            Ne = new TextDecoder("shift_jis", { fatal: !0 }).decode(ve), fe = "Shift_JIS";
          }
        else Ne = new TextDecoder(Ie, { fatal: !0 }).decode(ve);
        if (Ne.length > (O ? 5e5 : 2e5) || /\u0000/.test(Ne)) throw Error("Invalid or oversized text. Check the file encoding.");
        if (!ke()) return;
        let Pe = null;
        if (O) {
          if (!d) throw Error("Restart the updated server to import TTML files.");
          if (Pe = await d(Ne, ce.signal), !ke()) return;
          if (typeof Pe?.syncedLyrics != "string" || Pe.syncedLyrics.length > 2e5) throw Error("Could not read this TTML file. Check its XML format.");
          Ne = Pe.syncedLyrics;
        }
        S.value = Ne, ae(), p();
        const be = a.fileMetadata(Ne);
        c(be, y.name, Pe), X(O ? "TTML imported. Review the lyrics, then Add/Save." : `Imported ${y.name} (${fe}). Original timestamps and offset tags are retained.`);
      } catch (ve) {
        ke() && X("Import failed: " + (ve.name === "TimeoutError" ? "TTML import took too long. Try again." : ve.message), !0);
      } finally {
        _ === q && (J = null, g && g.set("importBusy", !1));
      }
    }
    A("#importLrc", () => u("#lrcFile").click()), x(u("#lrcFile"), "change", (y) => {
      const O = y.target.files[0];
      y.target.value = "", re(O);
    });
    const se = u("#lyricDraft");
    let Q = 0;
    return x(se, "dragenter", (y) => {
      [...y.dataTransfer.types].includes("Files") && (y.preventDefault(), Q++, se.classList.add("dragging"));
    }), x(se, "dragover", (y) => {
      [...y.dataTransfer.types].includes("Files") && (y.preventDefault(), y.dataTransfer.dropEffect = "copy");
    }), x(se, "dragleave", () => {
      --Q <= 0 && (Q = 0, se.classList.remove("dragging"));
    }), x(se, "drop", (y) => {
      if (y.dataTransfer.files.length) {
        if (y.preventDefault(), Q = 0, se.classList.remove("dragging"), y.dataTransfer.files.length !== 1) {
          X("Import one lyric file at a time.", !0);
          return;
        }
        re(y.dataTransfer.files[0]);
      }
    }), ae(), {
      reset() {
        G(), ae();
      },
      load(y) {
        G(), ae(), a.validRomaji(y) ? (I = S.value, w.value = y.romaji.lrc, b.value = a.mode(y), H(), h("#romajiDetails").open = b.value !== "original", X("Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.")) : y.romaji && X("Saved Romaji no longer matches this LRC. Create Romaji again.", !0);
      },
      read() {
        const y = H();
        if (b.value !== "original" && !y) throw Error(a.alignmentError(S.value, w.value) || "Create Romaji again after changing the original lyrics.");
        return { lyricMode: b.value, romaji: y ? { source: S.value, lrc: w.value } : void 0 };
      },
      // Search results replace the source, so a translation from the previous source is invalid.
      sourceReplaced() {
        G(), ae();
      },
      dispose() {
        if (!T) {
          G(), T = !0, W++, K(), C.splice(0).reverse().forEach((y) => y());
          for (const [y, O] of N)
            clearTimeout(O), URL.revokeObjectURL(y);
          N.clear();
        }
      }
    };
  }
  window.ManokaraLyricsEditor = { create: l };
})();
window.ManokaraSession = (() => {
  let a;
  const u = async (d, g, v = {}) => await fetch(d, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(g),
    credentials: "same-origin",
    signal: AbortSignal.timeout(8e3),
    ...v
  }), l = async () => {
    const d = new URL(location.href), g = await u("/__session", {});
    if (!g.ok) {
      const N = await g.json();
      throw new Error(N.error || "Could not open your browser session.");
    }
    let v = d.searchParams.get("room");
    try {
      v ||= localStorage.getItem("manokaraRelayRoom");
    } catch {
    }
    /^[a-f0-9]{32}$/.test(v || "") || (v = null);
    let h = await u("/__room", { room: v });
    if (h.status === 404) {
      let N;
      try {
        N = localStorage.getItem("manokaraRelayRoom");
      } catch {
      }
      N !== v && /^[a-f0-9]{32}$/.test(N || "") && (h = await u("/__room", { room: N })), h.status === 404 && (h = await u("/__room", { room: null }));
    }
    const C = await h.json();
    if (!h.ok) throw new Error(C.error || "Could not open a room.");
    a = C;
    try {
      localStorage.setItem("manokaraRelayRoom", a.room);
    } catch {
    }
    return d.searchParams.set("room", a.room), d.hash = "", history.replaceState(history.state, "", d), a;
  }, c = navigator.locks ? navigator.locks.request("manokara-room", l) : l();
  return c.catch(() => {
  }), { ready: c, api: u, obsUrl: (d, g = "lyrics") => {
    const v = new URL(g === "playlist" ? "/manokara-playlist.html" : "/manokara-obs.html", location.origin);
    return v.searchParams.set("room", a.room), d && v.searchParams.set("popup", "1"), v.hash = new URLSearchParams({ view: a.viewToken }).toString(), v.href;
  }, async rotate() {
    await c;
    const d = await u("/__room/rotate", { room: a.room }), g = await d.json();
    if (!d.ok) throw new Error(g.error || "Could not replace the OBS link.");
    a.viewToken = g.viewToken;
  } };
})();
const Ss = ["glass", "paper", "minimal", "card", "vinyl", "signal"], Uf = /* @__PURE__ */ new Set(["tempera", "sonnet", "lumiere", "hanabi", "clean", "word-pop", "neon", "glitch"]), Co = (a) => Uf.has(a?.effect) && !a.centerFree, Rr = (a) => JSON.parse(JSON.stringify(a)), yn = (a, u, l, c) => Number.isFinite(Number(a)) ? Math.min(c, Math.max(l, Number(a))) : u, hs = (a, u) => /^#[\da-f]{6}$/i.test(a || "") ? a : u;
function Ro(a = "glass") {
  const u = (p, d, g, v, h, C) => ({ x: p, y: d, w: g, h: v, size: h, label: C, visible: !0, align: "left", bold: !1 }), l = {
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
      blocks: { current: u(88, 88, 640, 280, 42, "Now Singing"), list: u(88, 384, 440, 528, 27, "Song List"), next: u(544, 384, 360, 208, 29, "Next On") }
    }
  }, c = l.playlist;
  return a === "paper" && (c.foreground = "#433c35", c.background = "#faf3df", c.accent = "#aa5139", c.opacity = 0.97, c.radius = 3, c.font = "serif", c.blocks = { current: u(96, 88, 580, 288, 42, "Now Singing"), list: u(96, 392, 580, 504, 28, "Song List"), next: u(700, 120, 320, 264, 30, "Next On") }), a === "minimal" && (c.opacity = 0, c.radius = 0, c.font = "geist", c.accent = "#e4f0ca", c.blocks = { current: u(96, 96, 760, 248, 52, "Now Singing"), list: u(96, 360, 560, 528, 30, "Song List"), next: u(96, 912, 760, 112, 28, "Next On") }), a === "card" && (c.accent = "#dfc3f9", c.background = "#211b32", c.radius = 28, c.opacity = 0.93, c.blocks = { current: u(96, 88, 460, 580, 38, "Now Singing"), list: u(580, 88, 460, 580, 27, "Song List"), next: u(96, 692, 460, 164, 29, "Next On") }), a === "vinyl" && (c.accent = "#efca92", c.background = "#29241f", c.opacity = 0.94, c.radius = 18, c.blocks = { current: u(96, 88, 940, 336, 42, "Now Singing"), list: u(96, 448, 520, 504, 27, "Song List"), next: u(640, 448, 396, 208, 30, "Next On") }), a === "signal" && (c.accent = "#8ee3dd", c.background = "#10282b", c.opacity = 0.92, c.radius = 16, c.blocks = { current: u(80, 836, 1100, 164, 38, "Now Singing"), list: u(80, 216, 560, 580, 28, "Song List"), next: u(1196, 836, 644, 164, 30, "Next On") }, c.blocks.list.visible = !1), l;
}
function Xr(a) {
  const u = Ro();
  let l = a;
  try {
    typeof l == "string" && (l = JSON.parse(l));
  } catch {
    l = null;
  }
  if (!l || typeof l != "object") return u;
  u.width = Math.round(yn(l.width, 1920, 320, 3840)), u.height = Math.round(yn(l.height, 1080, 240, 2160));
  function c(g, v) {
    g = g || {};
    const h = yn(g.w, Math.min(v.w, u.width), 32, u.width), C = yn(g.h, Math.min(v.h, u.height), 32, u.height);
    return { ...v, x: yn(g.x, Math.min(v.x, u.width - h), 0, u.width - h), y: yn(g.y, Math.min(v.y, u.height - C), 0, u.height - C), w: h, h: C, visible: g.visible !== !1 };
  }
  u.lyric = c(l.lyric, u.lyric), u.lyricCompact = { ...c(l.lyricCompact, u.lyricCompact), autoFit: l.lyricCompact?.autoFit !== !1 };
  const p = l.playlist || {}, d = u.playlist;
  d.theme = Ss.includes(p.theme) ? p.theme : "glass", d.foreground = hs(p.foreground, d.foreground), d.accent = hs(p.accent, d.accent), d.background = hs(p.background, d.background), d.opacity = yn(p.opacity, d.opacity, 0, 1), d.radius = yn(p.radius, d.radius, 0, 80), d.font = ["system", "geist", "serif", "mono"].includes(p.font) ? p.font : "system", d.limit = Math.round(yn(p.limit, 8, 1, 20)), d.listMode = ["all", "upcoming", "history"].includes(p.listMode) ? p.listMode : "all", d.numbering = p.numbering !== !1, d.progress = p.progress !== !1, d.hideIdle = p.hideIdle === !0, d.layout = p.layout === "unified" ? "unified" : "separate", d.group = c(p.group, d.group), d.autoScroll = p.autoScroll === !0, d.scrollSpeed = yn(p.scrollSpeed, 24, 8, 80), d.scrollPause = yn(p.scrollPause, 2, 0, 10);
  for (const g of ["current", "list", "next"]) {
    const v = p.blocks?.[g] || {}, h = d.blocks[g];
    d.blocks[g] = { ...c(v, h), size: yn(v.size, h.size, 12, 96), label: String(v.label ?? h.label).slice(0, 80), align: ["left", "center", "right"].includes(v.align) ? v.align : "left", bold: v.bold === !0 };
  }
  return u;
}
const vs = (a, u) => Object.assign(a.style, { left: u.x + "px", top: u.y + "px", width: u.w + "px", height: u.h + "px" });
let Jc, ks = "", Gc;
document.fonts?.addEventListener("loadingdone", () => {
  ks = "";
});
function Kf(a, u) {
  if (!Co(u)) return a.lyric;
  const l = a.lyricCompact;
  if (!l.autoFit) return l;
  const [c, ...p] = String(u.googleFont || "").split(":"), d = p.join(":"), g = c && (!d || /^[\w;@_-]+$/.test(d)) ? "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(c).replace(/%20/g, "+") + (d ? ":" + d : "") + "&display=swap" : "", v = document.getElementById("manokara-measure-font");
  if (g) {
    if (!v || v.getAttribute("href") !== g) {
      const x = v || document.createElement("link");
      x.id = "manokara-measure-font", x.rel = "stylesheet", x.href = g, v || document.head.append(x);
    }
  } else v?.remove();
  const h = Math.max(24, Math.min(160, Number(u.size) || 64)), C = JSON.stringify([a.width, a.height, u.lrc, u.romajiLrc, u.title, u.font, u.googleFont, u.bold, h]);
  if (C !== ks) {
    let q = function(ae, G) {
      x.font = S + " " + h * G + "px " + A;
      let K = 1, $ = 0;
      for (const re of ae.split(/(\s+)/)) {
        const se = x.measureText(re).width;
        $ && $ + se > z && (K++, $ = 0), se > z ? (K += Math.ceil(se / z) - 1, $ = se % z) : $ += se;
      }
      return K;
    };
    ks = C, Jc ??= document.createElement("canvas");
    const x = Jc.getContext("2d"), A = u.font || 'system-ui,"Yu Gothic",sans-serif', S = u.bold === !1 ? 400 : 800, w = ManokaraCore.parseLyrics(u.lrc || "", u.duration).lines.map((ae) => ae.x).filter(Boolean);
    w.length || w.push(u.title || "Your song, your stage");
    const b = ManokaraCore.parseLyrics(u.romajiLrc || "", u.duration).lines.map((ae) => ae.x).filter(Boolean), L = Math.ceil(h * 0.65), I = Math.max(80, a.width * 0.92 - L * 2);
    x.font = S + " " + h + "px " + A;
    const W = Math.max(...w.map((ae) => x.measureText(ae).width), ...b.map((ae) => x.measureText(ae).width * 0.48)), B = Math.min(a.width, Math.max(160, Math.min(I, W) + L * 2)), z = Math.max(1, B - L * 2), J = Math.max(...w.map((ae) => q(ae, 1))), te = w.length > 1 ? Math.max(...w.map((ae) => q(ae, 0.55))) : 0, X = b.length ? Math.max(...b.map((ae) => q(ae, 0.48))) : 0, H = Math.min(a.height, Math.max(96, Math.ceil(L * 2 + h * 1.15 * (J + te * 0.55 + X * 0.48) + h * 0.4 * ((te ? 1 : 0) + (X ? 1 : 0)))));
    Gc = { w: B, h: H };
  }
  const { w: N, h: T } = Gc;
  return { ...l, w: N, h: T, x: Math.max(0, Math.min(a.width - N, l.x + (l.w - N) / 2)), y: Math.max(0, Math.min(a.height - T, l.y + l.h - T)) };
}
function Vf(a, u, l) {
  const c = Math.min(u.clientWidth / l.width, u.clientHeight / l.height) || 1;
  return Object.assign(a.style, { width: l.width + "px", height: l.height + "px", transform: "scale(" + c + ")", left: (u.clientWidth - l.width * c) / 2 + "px", top: (u.clientHeight - l.height * c) / 2 + "px" }), c;
}
const Hf = { system: 'system-ui,"Yu Gothic",sans-serif', geist: '"Geist Variable",system-ui,sans-serif', serif: 'Georgia,"Yu Mincho",serif', mono: '"Cascadia Code",Consolas,monospace' };
function Yf(a) {
  const u = document.createElement("div");
  u.className = "playlist-output", a.appendChild(u);
  const l = document.createElement("div");
  l.className = "playlist-group", u.append(l);
  const c = {};
  let p = "", d = "", g = "", v = Ro(), h = {}, C, N, T, x = !0, A, S = "";
  const w = matchMedia("(prefers-reduced-motion: reduce)");
  for (const te of ["current", "list", "next"]) {
    const X = document.createElement("section");
    X.className = "playlist-block", X.dataset.block = te;
    const H = document.createElement("h2"), ae = document.createElement("div");
    ae.className = "playlist-content", X.append(H, ae), u.append(X), c[te] = { node: X, heading: H, content: ae };
  }
  const b = (te, X, H) => {
    const ae = document.createElement(te);
    return ae.textContent = X, H && (ae.className = H), ae;
  }, L = document.createElement("div");
  L.className = "playlist-list-track", c.list.content.append(L);
  function I(te) {
    const X = te.playlist, H = X.layout === "unified";
    if (u.dataset.layout = X.layout, l.hidden = !H, H) {
      Object.assign(l.style, { left: X.group.x + "px", top: X.group.y + "px", width: "640px", height: "840px", transform: "scale(" + X.group.w / 640 + "," + X.group.h / 840 + ")" });
      const ae = ["current", "list", "next"].filter((re) => X.blocks[re].visible);
      let G = 0;
      const K = { current: 280, next: 160 }, $ = ae.reduce((re, se) => re + (K[se] || 0), 0);
      for (const re of ["current", "list", "next"]) {
        const se = c[re].node;
        se.parentElement !== l && l.append(se);
        const Q = re === "list" ? 840 - $ : re === "current" && !ae.includes("list") ? 840 - (ae.includes("next") ? 160 : 0) : K[re];
        vs(se, { x: 0, y: G, w: 640, h: ae.length === 1 ? 840 : Q }), X.blocks[re].visible && (G += ae.length === 1 ? 840 : Q);
      }
    } else for (const [ae, { node: G }] of Object.entries(c))
      G.parentElement !== u && u.append(G), vs(G, X.blocks[ae]);
  }
  function W() {
    A?.cancel(), A = null, S = "", L.style.transform = "";
  }
  function B() {
    const { node: te, heading: X, content: H } = c.list;
    if (te.hidden) {
      x = !1;
      return;
    }
    if (!te.clientHeight) return;
    H.style.fontSize = "", H.style.height = "";
    const ae = getComputedStyle(te), G = getComputedStyle(X), K = te.clientHeight - parseFloat(ae.paddingTop) - parseFloat(ae.paddingBottom) - X.offsetHeight - parseFloat(G.marginBottom);
    if (v.playlist.autoScroll && !w.matches) {
      H.style.height = Math.max(0, K) + "px", H.dataset.scroll = "true";
      const $ = Math.max(0, L.scrollHeight - Math.max(0, K));
      if ($ > 1) {
        const re = v.playlist, se = JSON.stringify([$, re.scrollSpeed, re.scrollPause]);
        if (se !== S) {
          const Q = A ? (A.currentTime || 0) / A.effect.getTiming().duration % 1 : 0;
          W(), S = se;
          const y = $ / re.scrollSpeed, O = re.scrollPause, _ = 2 * (y + O), k = "translateY(-" + $ + "px)";
          A = L.animate([{ transform: "translateY(0)", offset: 0 }, { transform: "translateY(0)", offset: O / _ }, { transform: k, offset: (O + y) / _ }, { transform: k, offset: (2 * O + y) / _ }, { transform: "translateY(0)", offset: 1 }], { duration: _ * 1e3, iterations: 1 / 0, easing: "linear" }), A.currentTime = Q * _ * 1e3;
        }
      } else W();
    } else {
      delete H.dataset.scroll, W();
      let $ = parseFloat(getComputedStyle(te).fontSize);
      for (let re = 0; re < 2 && K > 0 && H.scrollHeight > K && $ > 12; re++)
        $ = Math.max(12, $ * K / H.scrollHeight * 0.97), H.style.fontSize = $ + "px";
    }
    x = !1;
  }
  function z(te, X) {
    v = Xr(te), h = X || {};
    const H = v.playlist, ae = JSON.stringify(H);
    if (ae !== p) {
      p = ae, x = !0, u.dataset.theme = H.theme, u.style.color = H.foreground, u.style.fontFamily = Hf[H.font], u.style.setProperty("--playlist-accent", H.accent), u.style.setProperty("--playlist-surface", H.background + Math.round(H.opacity * 255).toString(16).padStart(2, "0")), u.style.setProperty("--playlist-radius", H.radius + "px"), I(v);
      for (const [k, { node: F, heading: ce }] of Object.entries(c)) {
        const ke = H.blocks[k], ve = H.layout === "unified" ? Math.min(v.width / 1920, v.height / 1080) : 1;
        F.style.fontSize = ke.size / ve + "px", F.style.textAlign = ke.align, F.style.fontWeight = ke.bold ? "700" : "400", F.dataset.bold = String(ke.bold), ce.textContent = ke.label;
      }
    }
    const G = !!h.now;
    u.hidden = H.hideIdle && !G || H.layout === "unified" && (!H.group.visible || !Object.values(H.blocks).some((k) => k.visible));
    for (const [k, { node: F }] of Object.entries(c)) F.hidden = !H.blocks[k].visible;
    u.dataset.playing = h.status === "playing" ? "true" : "false";
    const K = { playing: "●", paused: "Ⅱ", counting: "…", mc: "MC", ready: "○" }[h.status] || "○";
    T && T.textContent !== K && (T.textContent = K);
    const $ = H.autoScroll && !w.matches, re = JSON.stringify([h.now, h.next, h.videoId, h.currentIndex, h.nextIndex, h.songs, h.history, H.theme, H.progress, H.numbering, H.listMode, H.limit, $]);
    if (re === d) {
      x && B();
      return;
    }
    d = re, x = !0;
    const se = c.current.content;
    if (se.replaceChildren(), C = null, N = null, T = null, ["card", "vinyl", "signal"].includes(H.theme)) {
      const k = document.createElement("div");
      k.className = "playlist-art";
      const F = b("div", "", "playlist-art-fallback");
      if (F.setAttribute("aria-hidden", "true"), F.append(b("span", "m", "playlist-art-monogram")), k.append(F), /^[\w-]{11}$/.test(h.videoId || "")) {
        const ce = document.createElement("img");
        ce.alt = "", ce.referrerPolicy = "no-referrer", ce.src = "https://i.ytimg.com/vi/" + h.videoId + "/mqdefault.jpg", ce.addEventListener("error", () => ce.remove(), { once: !0 }), k.append(ce);
      }
      se.append(k);
    }
    if (se.append(b("div", h.now || "—", "playlist-song-title")), G && (T = b("small", K, "playlist-state"), se.append(T)), H.numbering && h.currentIndex >= 0 && se.append(b("small", String(h.currentIndex + 1).padStart(2, "0"), "playlist-position")), H.progress) {
      const k = b("div", "", "playlist-progress");
      C = b("i", ""), k.append(C), N = b("small", "", "playlist-time"), se.append(k, N);
    }
    let Q = Array.isArray(h.songs) ? h.songs : [];
    H.listMode === "upcoming" && (Q = Q.filter((k) => k.index >= h.nextIndex && h.nextIndex >= 0)), H.listMode === "history" && (Q = Array.isArray(h.history) ? h.history : []);
    let y = 0;
    if (H.listMode === "all") {
      const k = Q.findIndex((F) => F.index === h.currentIndex);
      k >= H.limit && (y = Math.floor(k / H.limit) * H.limit);
    }
    const O = $ ? Q.slice(0, 120) : Q.slice(y, y + H.limit), _ = JSON.stringify([O, H.numbering]);
    if (_ !== g) {
      g = _, W(), L.replaceChildren();
      for (const k of O) {
        const F = b("div", "", "playlist-list-row");
        F.dataset.index = String(k.index), H.numbering && F.append(b("span", String(k.index + 1).padStart(2, "0"), "playlist-index")), F.append(b("span", k.title, "playlist-list-title")), L.append(F);
      }
      L.childNodes.length || L.append(b("div", "—", "playlist-empty"));
    }
    for (const k of L.querySelectorAll(".playlist-list-row")) k.dataset.current = String(Number(k.dataset.index) === h.currentIndex && H.listMode !== "history");
    c.next.content.replaceChildren(b("div", h.next || "—", "playlist-song-title")), H.numbering && h.nextIndex >= 0 && c.next.content.append(b("span", String(h.nextIndex + 1).padStart(2, "0"), "playlist-next-number")), B();
  }
  function q(te, X) {
    if (!C) return;
    const H = Math.max(0, Number(te) || 0), ae = Math.max(0, Number(X) || 0);
    C.style.transform = "scaleX(" + Math.min(1, ae ? H / ae : 0) + ")";
    const G = ($) => Math.floor($ / 60) + ":" + String(Math.floor($ % 60)).padStart(2, "0"), K = G(H) + (ae ? " / " + G(ae) : "");
    N.textContent !== K && (N.textContent = K);
  }
  const J = () => {
    d = "", x = !0, z(v, h);
  };
  return w.addEventListener("change", J), { root: u, nodes: c, render: z, tick: q, place: I, destroy: () => {
    W(), w.removeEventListener("change", J), u.remove();
  } };
}
window.ManokaraOverlay = { themes: Ss, defaults: Ro, normalize: Xr, clone: Rr, geometry: vs, fit: Vf, createPlaylist: Yf, compactLyrics: Co, lyricRect: Kf };
const nr = (a, u, l) => Math.min(l, Math.max(u, a)), Lo = (a) => Number.isFinite(a) ? a : 0, $f = Object.freeze(["nw", "n", "ne", "e", "se", "s", "sw", "w"]);
function Qc(a, u, l, c) {
  return {
    ...a,
    x: nr(a.x + Lo(u), 0, c.width - a.w),
    y: nr(a.y + Lo(l), 0, c.height - a.h)
  };
}
function Xc(a, u, l, c, p, d) {
  if (!$f.includes(u)) return { ...a };
  l = Lo(l), c = Lo(c);
  const { x: g, y: v, w: h, h: C } = a, N = u.includes("w"), T = u.includes("e"), x = u.includes("n"), A = u.includes("s");
  if (p) {
    const I = N ? -1 : T ? 1 : 0, W = x ? -1 : A ? 1 : 0, B = N ? g + h : T ? g : g + h / 2, z = x ? v + C : A ? v : v + C / 2, q = 1 + (I && W ? (I * l * h + W * c * C) / (h * h + C * C) : I ? I * l / h : W * c / C), J = N ? B : T ? d.width - B : 2 * Math.min(B, d.width - B), te = x ? z : A ? d.height - z : 2 * Math.min(z, d.height - z), X = nr(q, Math.max(32 / h, 32 / C), Math.min(J / h, te / C)), H = h * X, ae = C * X;
    return {
      ...a,
      x: N ? B - H : T ? B : B - H / 2,
      y: x ? z - ae : A ? z : z - ae / 2,
      w: H,
      h: ae
    };
  }
  const S = g + h, w = v + C, b = N ? nr(g + l, 0, S - 32) : g, L = x ? nr(v + c, 0, w - 32) : v;
  return {
    ...a,
    x: b,
    y: L,
    w: (T ? nr(S + l, b + 32, d.width) : S) - b,
    h: (A ? nr(w + c, L + 32, d.height) : w) - L
  };
}
function qf(a, u, l, c, p) {
  if (!["w", "h"].includes(u) || !Number.isFinite(l)) return { ...a };
  if (!c) return { ...a, [u]: nr(l, 32, u === "w" ? p.width - a.x : p.height - a.y) };
  const d = nr(
    l / a[u],
    Math.max(32 / a.w, 32 / a.h),
    Math.min((p.width - a.x) / a.w, (p.height - a.y) / a.h)
  );
  return { ...a, w: a.w * d, h: a.h * d };
}
function ud(a, u, l) {
  const c = Rr(a), p = u / c.width, d = l / c.height;
  for (const g of [c.lyric, c.lyricCompact, c.playlist.group, ...Object.values(c.playlist.blocks)])
    g.x *= p, g.y *= d, g.w *= p, g.h *= d, g.size && (g.size *= Math.min(p, d));
  return c.width = u, c.height = l, Xr(c);
}
function Zc(a, u, l = !1) {
  const c = Rr(a), p = ud(Ro(u), c.width, c.height).playlist;
  for (const d of ["layout", "autoScroll", "scrollSpeed", "scrollPause"]) p[d] = c.playlist[d];
  return l || (p.group = Rr(c.playlist.group)), p.layout === "unified" && (p.blocks.list.visible = !0), c.playlist = p, Xr(c);
}
function Wf(a = 30) {
  const u = [], l = [];
  function c(p, d) {
    p.push(d), p.length > a && p.shift();
  }
  return {
    record(p) {
      c(u, p), l.length = 0;
    },
    undo(p) {
      return u.length ? (c(l, p), u.pop()) : null;
    },
    redo(p) {
      return l.length ? (c(u, p), l.pop()) : null;
    },
    get canUndo() {
      return u.length > 0;
    },
    get canRedo() {
      return l.length > 0;
    }
  };
}
const fs = /* @__PURE__ */ new Set(["x", "y", "w", "h"]), Jf = /* @__PURE__ */ new Set(["size", "label", "align", "bold", "visible"]), Gf = /* @__PURE__ */ new Set([
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
    for (const u of Object.values(a)) pa(u);
  }
  return a;
}
function Qf({
  repository: a,
  preferences: u,
  getScene: l = () => ({}),
  measureLyrics: c = (g, v) => Co(v) ? g.lyricCompact : g.lyric,
  platform: p = globalThis,
  now: d = () => performance.now()
} = {}) {
  const g = Pr(p, d), v = Wf(), h = /* @__PURE__ */ new Set();
  let C;
  try {
    C = a?.load().value;
  } catch {
  }
  let N = pa(Xr(C)), T = N, x = JSON.stringify(N), A = "playlist", S = "current", w = !0, b = null;
  try {
    w = u?.get("aspectLock") !== "false";
  } catch {
  }
  let L = !1, I = null, W, B;
  function z(y, O) {
    B = Object.freeze({
      document: N,
      target: A,
      selected: S,
      aspectLocked: w,
      serialized: x,
      dirty: L,
      saveError: I,
      canUndo: v.canUndo,
      canRedo: v.canRedo,
      dragging: !!b
    });
    for (const _ of h) _(B, { kind: y, ...O });
  }
  function q() {
    return A === "playlist" && N.playlist.layout === "unified";
  }
  function J() {
    return Co(l());
  }
  function te(y = N, O = J()) {
    return A === "lyrics" ? O ? y.lyricCompact : y.lyric : y.playlist.layout === "unified" ? y.playlist.group : y.playlist.blocks[S];
  }
  function X() {
    const y = A === "lyrics" ? c(N, l()) : te();
    return pa({ ...y });
  }
  function H() {
    return A === "lyrics" ? te() : N.playlist.blocks[S];
  }
  function ae(y) {
    const O = te(y);
    return A === "lyrics" && J() && Object.assign(O, X(), { autoFit: !1 }), O;
  }
  function G() {
    if (g.disposed) return !L;
    if (W?.(), W = null, !L) return !0;
    let y;
    try {
      y = a?.save(Rr(T));
    } catch (O) {
      y = { ok: !1, error: O };
    }
    return y?.ok ? (L = !1, I = null) : I = y?.error || new Error("Layout storage unavailable"), z("saved", { ok: !L }), !L;
  }
  function K(y, { record: O = !0, immediate: _ = !1 } = {}) {
    y = pa(Xr(y));
    const k = JSON.stringify(y);
    return N = y, k === x ? (z("view"), !1) : (O && v.record(x), T = N, x = k, L = !0, W?.(), W = g.timeout(G, 250), z("document"), _ && G(), !0);
  }
  function $() {
    return b ? (N = T, b = null, z("cancel"), !0) : !1;
  }
  function re(y, O) {
    if (g.disposed) return !1;
    $();
    const _ = Rr(N);
    return y(_), K(_, O);
  }
  function se(y) {
    !y || g.disposed || ($(), A = y.target === "lyrics" ? "lyrics" : "playlist", S = A === "lyrics" ? "lyric" : ["current", "list", "next"].includes(y.selected) ? y.selected : "current", z("view"));
  }
  function Q(y, O, _ = "") {
    return !Number.isFinite(y) || !Number.isFinite(O) ? !1 : re((k) => {
      const F = X(), ce = ae(k);
      Object.assign(ce, _ ? Xc(F, _, y, O, w, k) : Qc(F, y, O, k)), A === "lyrics" && J() && (ce.autoFit = !1);
    });
  }
  return z("init"), {
    getSnapshot: () => B,
    subscribe(y) {
      return g.disposed ? () => {
      } : (h.add(y), () => h.delete(y));
    },
    get serialized() {
      return x;
    },
    get dragging() {
      return !!b;
    },
    unified: q,
    compact: J,
    displayRect: X,
    textRect: H,
    setTarget(y) {
      se({ target: y, selected: S });
    },
    select(y) {
      g.disposed || !["current", "list", "next", "lyric", "group"].includes(y) || A === "lyrics" != (y === "lyric") && y !== "group" || ($(), y !== "group" && (S = y), z("view"));
    },
    restoreView: se,
    setAspectLocked(y) {
      if (!g.disposed) {
        $(), w = !!y;
        try {
          u?.set("aspectLock", String(w));
        } catch {
        }
        z("view");
      }
    },
    setFrame(y) {
      const [O, _] = String(y).split("x").map(Number);
      return !Number.isFinite(O) || !Number.isFinite(_) || O < 320 || O > 3840 || _ < 240 || _ > 2160 ? !1 : re((k) => Object.assign(k, ud(k, O, _)));
    },
    preset(y) {
      return re((O) => Object.assign(O, Zc(O, y)));
    },
    reset() {
      return re((y) => {
        A !== "lyrics" ? Object.assign(y, Zc(y, y.playlist.theme, !0)) : J() ? y.lyricCompact = {
          x: 0,
          y: y.height - Math.min(240, y.height),
          w: y.width,
          h: Math.min(240, y.height),
          visible: !0,
          autoFit: !0
        } : y.lyric = { x: 0, y: 0, w: y.width, h: y.height, visible: !0 };
      });
    },
    center(y) {
      return ["center", "top-center", "bottom-center"].includes(y) ? re((O) => {
        const _ = ae(O);
        _.x = (O.width - _.w) / 2, _.y = y === "top-center" ? 0 : y === "bottom-center" ? O.height - _.h : (O.height - _.h) / 2;
      }) : !1;
    },
    setLayout(y) {
      return re((O) => {
        if (O.playlist.layout = y, y === "unified") for (const _ of Object.values(O.playlist.blocks)) _.visible = !0;
      });
    },
    setAutoFit(y) {
      return re((O) => Object.assign(O.lyricCompact, X(), { autoFit: !!y }));
    },
    setField(y, O) {
      return !fs.has(y) && !Jf.has(y) || (fs.has(y) || y === "size") && !Number.isFinite(O) ? !1 : re((_) => {
        const k = fs.has(y) ? ae(_) : A === "lyrics" ? te(_) : _.playlist.blocks[S];
        y === "w" || y === "h" ? Object.assign(k, qf(k, y, O, w, _)) : k[y] = O;
      });
    },
    setAppearance(y, O) {
      return Gf.has(y) ? re((_) => {
        _.playlist[y] = O;
      }) : !1;
    },
    importLayout(y) {
      if (!y || y.version !== 1 || !y.playlist || !y.lyric) throw new Error("Invalid overlay layout");
      return re((O) => Object.assign(O, Xr(y)));
    },
    undo() {
      if (g.disposed) return !1;
      $();
      const y = v.undo(x);
      return y == null ? !1 : K(y, { record: !1, immediate: !0 });
    },
    redo() {
      if (g.disposed) return !1;
      $();
      const y = v.redo(x);
      return y == null ? !1 : K(y, { record: !1, immediate: !0 });
    },
    transform: Q,
    beginGesture(y = "") {
      return g.disposed ? !1 : ($(), b = { rect: Rr(X()), direction: y, locked: w, compact: J() }, z("gesture"), !0);
    },
    moveGesture(y, O) {
      if (!b || g.disposed || !Number.isFinite(y) || !Number.isFinite(O)) return !1;
      if (b.compact !== J())
        return $(), !1;
      const _ = Rr(T);
      if (y || O) {
        const k = te(_, b.compact);
        Object.assign(k, b.direction ? Xc(b.rect, b.direction, y, O, b.locked, _) : Qc(b.rect, y, O, _)), A === "lyrics" && b.compact && (k.autoFit = !1);
      }
      return N = pa(_), z("preview"), !0;
    },
    endGesture() {
      return !b || g.disposed ? !1 : b.compact !== J() ? ($(), !1) : (b = null, K(N, { immediate: !0 }));
    },
    cancelGesture: $,
    flush: G,
    dispose() {
      g.disposed || ($(), G(), g.dispose(), h.clear());
    }
  };
}
function Xf({
  model: a,
  element: u,
  scale: l,
  focus: c = () => {
  },
  platform: p = globalThis,
  now: d = () => performance.now()
}) {
  const g = Pr(p, d);
  let v = null, h = null, C = null;
  function N() {
    C?.(), C = null, h = null;
  }
  function T() {
    const w = v?.pointer;
    v = null, N(), w != null && u.hasPointerCapture(w) && u.releasePointerCapture(w);
  }
  function x() {
    C?.(), C = null;
    const w = h;
    h = null, v && w && a.moveGesture((w.x - v.x) / v.scale, (w.y - v.y) / v.scale);
  }
  function A() {
    T(), a.cancelGesture();
  }
  const S = a.subscribe((w) => {
    v && !w.dragging && T();
  });
  return {
    get active() {
      return !!v;
    },
    start(w) {
      const b = w.target.closest("[data-hit]");
      if (!b || w.button !== 0 || g.disposed) return;
      const L = l();
      if (!(L > 0)) return;
      w.preventDefault(), A(), a.select(b.dataset.hit);
      const I = w.target.closest("[data-resize]")?.dataset.resize || "";
      if (a.beginGesture(I)) {
        v = { pointer: w.pointerId, x: w.clientX, y: w.clientY, scale: L };
        try {
          u.setPointerCapture(w.pointerId);
        } catch {
          A();
        }
      }
    },
    move(w) {
      !v || v.pointer !== w.pointerId || (h = { x: w.clientX, y: w.clientY }, C || (C = g.frame(x)));
    },
    end(w) {
      if (!(!v || v.pointer !== w.pointerId)) {
        if (w.type !== "pointerup") {
          A();
          return;
        }
        h = { x: w.clientX, y: w.clientY }, x(), T(), a.endGesture(), c();
      }
    },
    cancel: A,
    dispose() {
      A(), S(), g.dispose();
    }
  };
}
const Zf = (() => {
  const a = Pr(), u = ManokaraOverlay, l = Qf({
    repository: Tt.layout,
    preferences: Tt.preferences,
    getScene: ce,
    measureLyrics: (V, de) => u.lyricRect(V, de)
  });
  let c = l.getSnapshot().document, p, d, g, v, h, C, N = 1, T = "playlist", x = "current", A = "sample", S = "karaoke", w = null, b;
  const L = /* @__PURE__ */ new Set(), I = [], W = [];
  let B = performance.now(), z = "", q, J, te = l.getSnapshot().aspectLocked;
  const X = {
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
  }, H = (V) => ManokaraI18n.language === "vi" && X[V] || V, ae = (V) => Math.round(V * 1e3) / 1e3, G = {
    current: "Now Singing",
    list: "Song List",
    next: "Next On",
    lyric: "Lyric viewport",
    group: "Whole playlist"
  };
  function K(V) {
    !d || a.disposed || (d.querySelector("#studioStatus").textContent = H(V));
  }
  function $() {
    l.flush();
  }
  function re() {
    return l.unified();
  }
  function se() {
    return l.compact();
  }
  function Q() {
    return l.displayRect();
  }
  function y() {
    return l.textRect();
  }
  function O() {
    const V = S === "playlist" && T === "lyrics", de = d.querySelector("#studioLyricControlHost");
    d.querySelector("#studioLyricSettings").hidden = !V;
    for (const {
      node: me,
      marker: Ae
    } of W)
      V ? me.parentElement !== de && de.append(me) : me.parentNode !== Ae.parentNode && Ae.before(me);
  }
  function _(V) {
    d && (b?.cancel(), S = V === "playlist" ? "playlist" : "karaoke", document.getElementById("grid").hidden = S !== "karaoke", document.getElementById("playlistStudio").hidden = S !== "playlist", window.dispatchEvent(new CustomEvent("manokara:mainviewchange", {
      detail: S
    })), O(), S === "karaoke" ? (q?.open && q.close(), C?.remove(), C = null, z = "") : be());
  }
  function k(V) {
    b?.cancel(), l.setTarget(V), window.dispatchEvent(new CustomEvent("manokara:overlaytargetchange", { detail: T }));
  }
  function F() {
    const V = (performance.now() - B) / 1e3 % 30, de = ["I Really Want to Stay at Your House", "Open Arms", "夜に駆ける", "Một ngày bình yên", "Fly Me to the Moon", "Plastic Love", "Có em", "Pretender", "City of Stars", "Lemon", "Chúng ta của hiện tại", "Stay with Me"];
    return {
      ...w,
      ready: !0,
      title: de[0],
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
      time: V,
      sampledAt: Date.now(),
      duration: 30,
      playing: !0,
      paused: !1,
      counting: !1,
      mc: !1,
      playlistTime: V,
      timelineVersion: 1,
      playlist: JSON.stringify({
        now: de[0],
        next: de[1],
        status: "playing",
        videoId: "",
        currentIndex: 0,
        nextIndex: 1,
        songs: de.map((me, Ae) => ({
          title: me,
          index: Ae
        })),
        history: [{
          title: "Last song of the evening",
          index: 4
        }]
      })
    };
  }
  function ce() {
    return A === "sample" ? F() : w || {
      ready: !1
    };
  }
  function ke() {
    if (!g) return;
    const V = v.parentElement, de = V.clientWidth, me = V.clientHeight;
    if (!de || !me) return;
    const Ae = Math.min(de / c.width, me / c.height);
    v.style.width = c.width * Ae + "px", v.style.height = c.height * Ae + "px", v.style.aspectRatio = c.width + " / " + c.height, N = u.fit(g, v, c), g.style.setProperty("--studio-handle-scale", String(1 / N)), ve();
  }
  function ve() {
    for (const V of I) {
      const {
        host: de,
        stage: me,
        bounds: Ae,
        crop: je
      } = V;
      if (!de.clientWidth || !de.clientHeight) continue;
      const Ce = (je ? Math.max : Math.min)((de.clientWidth - 16) / Ae.w, (de.clientHeight - 12) / Ae.h);
      Object.assign(me.style, {
        transform: "scale(" + Ce + ")",
        left: (de.clientWidth - Ae.w * Ce) / 2 - Ae.x * Ce + "px",
        top: (de.clientHeight - Ae.h * Ce) / 2 - Ae.y * Ce + "px"
      });
    }
  }
  function Ie() {
    for (const V of u.themes) {
      const de = d.querySelector('[data-theme-preview="' + V + '"]'), me = document.createElement("div");
      me.className = "preset-canvas", de.append(me);
      const Ae = u.defaults(V), je = u.createPlaylist(me);
      je.render(Ae, {
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
      }), je.tick(74, 210);
      for (const Ke of ["list", "next"]) je.nodes[Ke].node.hidden = !0;
      const Ce = [Ae.playlist.blocks.current], pe = Math.min(...Ce.map((Ke) => Ke.x)), Oe = Math.min(...Ce.map((Ke) => Ke.y)), ge = {
        x: pe,
        y: Oe,
        w: Math.max(...Ce.map((Ke) => Ke.x + Ke.w)) - pe,
        h: Math.max(...Ce.map((Ke) => Ke.y + Ke.h)) - Oe
      };
      V === "card" && (ge.x += 20, ge.y += 20, ge.w -= 40, ge.h = 280), I.push({
        host: de,
        stage: me,
        renderer: je,
        bounds: ge,
        crop: V === "card"
      });
    }
  }
  function Ne() {
    if (q.open) {
      q.close();
      return;
    }
    const V = d.querySelector(".studio-preview-pane");
    q.append(V), q.showModal();
    const de = V.querySelector('[data-action="expand"]'), me = de.querySelector("[data-studio-copy]");
    me.dataset.studioCopy = "Close preview", me.textContent = H("Close preview"), de.setAttribute("aria-expanded", "true"), de.focus(), ke();
  }
  function fe(V) {
    if (V && !C ? (C = document.createElement("iframe"), C.className = "studio-lyric-preview", C.title = H("Lyrics overlay"), C.allow = "autoplay", C.src = "./manokara-lyrics-view.html?preview=1", g.insertBefore(C, g.firstChild)) : !V && C && (C.remove(), C = null, z = ""), C) {
      const de = u.lyricRect(c, ce());
      u.geometry(C, de), C.hidden = !de.visible;
    }
  }
  function Pe() {
    if (S !== "playlist") return;
    const V = ce();
    let de = {};
    try {
      de = JSON.parse(V.playlist || "{}");
    } catch {
    }
    h.render(c, de), h.tick(V.playlistTime || 0, V.duration);
    const me = d.querySelector("#studioEmpty");
    let Ae = "";
    T === "lyrics" && (Q().visible ? !V.counting && !V.mc && (V.ready === !1 || !V.title ? Ae = "No song is playing. Choose Sample data to arrange the lyrics." : V.lrc?.trim() || (Ae = "This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.")) : Ae = "This lyric block is hidden. Turn on Show this block to preview.");
    const je = H(Ae);
    if (me.textContent !== je && (me.textContent = je), me.hidden = !Ae, C) {
      const Ce = u.lyricRect(c, V);
      u.geometry(C, Ce), C.hidden = !Ce.visible;
      const pe = g.querySelector('[data-hit="lyric"]');
      if (pe && !b?.active && u.geometry(pe, Ce), T === "lyrics" && !b?.active) {
        for (const [Ke, $e] of [["x", "studioX"], ["y", "studioY"], ["w", "studioW"], ["h", "studioH"]]) {
          const We = d.querySelector("#" + $e);
          document.activeElement !== We && (We.value = ae(Ce[Ke]));
        }
        const ge = Ce.w / Ce.h;
        d.querySelector("#studioAspectRatio").textContent = Math.abs(ge - 16 / 9) < 1e-5 ? "16:9" : Math.abs(ge - 9 / 16) < 1e-5 ? "9:16" : Math.abs(ge - 1) < 1e-5 ? "1:1" : ge.toFixed(2) + ":1";
      }
      const Oe = JSON.stringify([V.lrc, V.romajiLrc, V.effect, V.title, V.playing, V.paused, V.time, V.sampledAt, V.centerFree, V.colorTheme, V.themeSeed, V.foreground, V.size, V.font, V.bold]);
      if (Oe !== z) {
        z = Oe;
        for (const ge of L) ge(V);
      }
    }
  }
  function be() {
    if (!d) return;
    const V = c.playlist, de = Q(), me = y();
    O(), d.querySelectorAll("[data-target]").forEach((ge) => ge.setAttribute("aria-pressed", String(ge.dataset.target === T))), d.querySelector("#studioLayoutSection").hidden = T === "lyrics", d.querySelector("#studioGroupNote").hidden = !re(), d.querySelector("#studioPresets").hidden = T === "lyrics", d.querySelector("#playlistAppearance").hidden = T === "lyrics", d.querySelector("#blockTypography").hidden = T === "lyrics", d.querySelector("#studioCompactSettings").hidden = T !== "lyrics", d.querySelector("#studioAutoFitField").hidden = !se(), d.querySelector("#studioAutoFitNote").hidden = !se(), d.querySelector("#studioAutoFit").checked = c.lyricCompact.autoFit;
    const Ae = {
      studioX: ae(de.x),
      studioY: ae(de.y),
      studioW: ae(de.w),
      studioH: ae(de.h),
      studioSize: me.size || 64,
      studioLabel: me.label || "",
      studioAlign: me.align || "left",
      studioFg: V.foreground,
      studioAccent: V.accent,
      studioBg: V.background,
      studioOpacity: V.opacity,
      studioRadius: V.radius,
      studioFont: V.font,
      studioLimit: V.limit,
      studioListMode: V.listMode,
      studioFrame: c.width + "x" + c.height,
      studioLayout: V.layout,
      studioScrollSpeed: V.scrollSpeed,
      studioScrollPause: V.scrollPause
    };
    for (const [ge, Ke] of Object.entries(Ae)) {
      const $e = d.querySelector("#" + ge);
      document.activeElement !== $e && ($e.value = Ke);
    }
    d.querySelector("#studioVisible").checked = me.visible, d.querySelector("#studioBold").checked = !!me.bold, d.querySelector("#studioAutoScroll").checked = V.autoScroll, d.querySelector("#studioScrollSettings").hidden = !V.autoScroll, d.querySelector("#studioLimit").disabled = V.autoScroll, d.querySelector("#studioNumbering").checked = V.numbering, d.querySelector("#studioProgress").checked = V.progress, d.querySelector("#studioHideIdle").checked = V.hideIdle, d.querySelector("#studioAspectLock").checked = te;
    const je = de.w / de.h;
    d.querySelector("#studioAspectRatio").textContent = Math.abs(je - 16 / 9) < 1e-5 ? "16:9" : Math.abs(je - 9 / 16) < 1e-5 ? "9:16" : Math.abs(je - 1) < 1e-5 ? "1:1" : je.toFixed(2) + ":1", d.querySelectorAll("[data-theme-preset]").forEach((ge) => ge.setAttribute("aria-pressed", String(ge.dataset.themePreset === V.theme))), d.querySelector('[data-action="undo"]').disabled = !l.getSnapshot().canUndo, d.querySelector('[data-action="redo"]').disabled = !l.getSnapshot().canRedo, h.root.style.display = T === "lyrics" && !d.querySelector("#studioBoth").checked ? "none" : "", g.querySelectorAll(".studio-hit").forEach((ge) => ge.remove());
    const Ce = T === "lyrics" ? ["lyric"] : re() ? ["group"] : ["current", "list", "next"];
    for (const ge of Ce) {
      const Ke = ge === "lyric" ? de : ge === "group" ? V.group : V.blocks[ge];
      if (!Ke.visible) continue;
      const $e = document.createElement("div");
      $e.className = "studio-hit", $e.dataset.hit = ge, $e.tabIndex = 0, $e.setAttribute("role", "group"), $e.setAttribute("aria-label", H(G[ge])), $e.dataset.selected = String(ge === "group" || ge === x), u.geometry($e, Ke), $e.style.zIndex = "40";
      const We = document.createElement("span");
      if (We.className = "studio-hit-label", We.textContent = H(G[ge]), $e.append(We), ge === "group" || ge === x)
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
          Bt.type = "button", Bt.className = "studio-resize", Bt.dataset.resize = on, Bt.setAttribute("aria-label", H("Resize " + Xt)), $e.append(Bt);
        }
      g.append($e);
    }
    const pe = d.querySelector("#studioBoth").checked;
    fe(S === "playlist" && (T === "lyrics" || pe)), d.querySelector("#studioSourceSize").textContent = c.width + " × " + c.height;
    const Oe = c.width / c.height;
    d.querySelector("#studioFrameBadge").textContent = c.width + " × " + c.height + " · " + (Math.abs(Oe - 16 / 9) < 1e-3 ? "16:9" : Math.abs(Oe - 9 / 16) < 1e-3 ? "9:16" : c.width + ":" + c.height), d.querySelector("#studioObsUrl").value = p.url(T === "lyrics" ? "lyrics" : "playlist") || H("Connecting…"), ke(), Pe(), window.dispatchEvent(new CustomEvent("manokara:studioviewchange", {
      detail: {
        target: T,
        selected: x
      }
    }));
  }
  function Fe() {
    const V = Q(), de = g.querySelector('[data-hit="' + (re() ? "group" : x) + '"]');
    de && u.geometry(de, V), x === "lyric" && C ? u.geometry(C, V) : re() ? h.place(c) : h.nodes[x] && u.geometry(h.nodes[x].node, V);
    for (const [me, Ae] of [["x", "studioX"], ["y", "studioY"], ["w", "studioW"], ["h", "studioH"]]) d.querySelector("#" + Ae).value = ae(V[me]);
  }
  function xt(V) {
    if (d || a.disposed) return;
    p = V, d = document.getElementById("playlistStudio");
    const de = document.getElementById("obsLyricSettingsReactRoot");
    if (de) {
      const Ce = document.createComment("lyric-settings-home");
      de.after(Ce), W.push({
        node: de,
        marker: Ce
      });
    }
    g = d.querySelector("#studioCanvas"), v = d.querySelector("#studioPreview"), h = u.createPlaylist(g), Ie(), b = Xf({
      model: l,
      element: v,
      scale: () => N,
      focus: () => g.querySelector('[data-hit="' + (re() ? "group" : x) + '"]')?.focus({ preventScroll: !0 })
    }), a.own(l.subscribe((Ce, pe) => {
      ({ document: c, target: T, selected: x, aspectLocked: te } = Ce), pe.kind === "saved" ? K(pe.ok ? "Changes saved in this browser." : "Storage unavailable. Layout remains in this window.") : pe.kind === "preview" ? Fe() : (be(), pe.kind === "document" && p.changed());
    })), q = document.createElement("dialog"), q.className = "studio-large-preview", q.setAttribute("aria-labelledby", "studioPreviewTitle"), d.append(q), a.listen(q, "close", () => {
      const Ce = q.querySelector(".studio-preview-pane");
      if (!Ce) return;
      d.querySelector(".studio-body").append(Ce);
      const pe = Ce.querySelector('[data-action="expand"]'), Oe = pe.querySelector("[data-studio-copy]");
      Oe.dataset.studioCopy = "View larger", Oe.textContent = H("View larger"), pe.setAttribute("aria-expanded", "false"), ke(), S === "playlist" && pe.focus({
        preventScroll: !0
      });
    }), window.ManokaraPreview = J = {
      getSnapshot: ce,
      subscribe(Ce) {
        return a.disposed ? () => {
        } : (L.add(Ce), Ce(ce()), () => L.delete(Ce));
      }
    }, a.listen(d, "click", async (Ce) => {
      const pe = Ce.target.closest("button");
      if (!pe) return;
      if (pe.dataset.target) {
        k(pe.dataset.target);
        return;
      }
      if (pe.dataset.select) {
        l.select(pe.dataset.select);
        return;
      }
      if (pe.dataset.themePreset) {
        l.preset(pe.dataset.themePreset);
        return;
      }
      const Oe = pe.dataset.action;
      if (Oe === "expand") {
        Ne();
        return;
      }
      if (["center", "top-center", "bottom-center"].includes(Oe) && l.center(Oe), Oe === "reset" && l.reset(), Oe === "undo" && l.undo(), Oe === "redo" && l.redo(), Oe === "copy") {
        const ge = p.url(T === "lyrics" ? "lyrics" : "playlist");
        if (!ge) return;
        try {
          await navigator.clipboard.writeText(ge), K("OBS link copied.");
        } catch {
          if (!d || a.disposed) return;
          d.querySelector("#studioObsUrl").select(), K("Select and copy the link.");
        }
      }
      if (Oe === "open") {
        const ge = p.url(T === "lyrics" ? "lyrics" : "playlist");
        if (ge) {
          const Ke = new URL(ge);
          Ke.searchParams.set("popup", "1"), window.open(Ke.href, "manokara-" + T, "width=1280,height=720");
        }
      }
      if (Oe === "history" && confirm(H("Clear the sung history for this session?")) && (p.clearHistory(), Pe()), Oe === "export") {
        const ge = new Blob([JSON.stringify(c, null, 2)], {
          type: "application/json"
        }), Ke = URL.createObjectURL(ge), $e = document.createElement("a");
        $e.href = Ke, $e.download = "manokara-overlay.json", $e.click();
        const We = a.own(() => URL.revokeObjectURL(Ke));
        a.timeout(We, 1e3);
      }
      Oe === "import" && d.querySelector("#studioImport").click();
    });
    const me = {
      studioX: "x",
      studioY: "y",
      studioW: "w",
      studioH: "h",
      studioSize: "size",
      studioLabel: "label",
      studioAlign: "align",
      studioVisible: "visible",
      studioBold: "bold"
    }, Ae = {
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
      const pe = Ce.target;
      if (pe.id === "studioAutoFit") {
        l.setAutoFit(pe.checked);
        return;
      }
      if (pe.id === "studioLayout") {
        l.setLayout(pe.value);
        return;
      }
      if (pe.id === "studioFrame") {
        l.setFrame(pe.value);
        return;
      }
      if (pe.id === "studioData") {
        b.cancel(), A = pe.value, B = performance.now(), z = "", be();
        return;
      }
      if (pe.id === "studioBgView") {
        v.dataset.bg = pe.value;
        return;
      }
      if (pe.id === "studioBoth") {
        be();
        return;
      }
      if (pe.id === "studioAspectLock") {
        l.setAspectLocked(pe.checked);
        return;
      }
      if (pe.id === "studioImport") {
        try {
          const Oe = pe.files?.[0];
          if (!Oe) return;
          if (Oe.size > 16e3) throw Error();
          const ge = JSON.parse(await Oe.text());
          if (a.disposed) return;
          l.importLayout(ge), K("Layout imported.");
        } catch {
          K("Could not import this layout.");
        } finally {
          pe.value = "";
        }
        return;
      }
      if (me[pe.id] || Ae[pe.id]) {
        if (pe.type === "number" && (!pe.value || !pe.checkValidity())) {
          be();
          return;
        }
        const Oe = pe.type === "checkbox" ? pe.checked : pe.type === "number" ? Number(pe.value) : pe.value;
        me[pe.id] ? l.setField(me[pe.id], Oe) : l.setAppearance(Ae[pe.id], Oe), ["studioX", "studioY", "studioW", "studioH"].includes(pe.id) && (pe.value = ae(Q()[me[pe.id]]));
      }
    }), a.listen(v, "pointerdown", b.start), a.listen(v, "pointermove", b.move), a.listen(v, "pointerup", b.end), a.listen(v, "pointercancel", b.end), a.listen(v, "lostpointercapture", b.end), a.listen(v, "keydown", (Ce) => {
      const pe = Ce.target.closest("[data-hit]");
      if (!pe || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(Ce.key)) return;
      Ce.preventDefault(), l.select(pe.dataset.hit);
      const Oe = Ce.shiftKey ? 10 : 1, ge = {
        ArrowLeft: -Oe,
        ArrowRight: Oe
      }[Ce.key] || 0, Ke = {
        ArrowUp: -Oe,
        ArrowDown: Oe
      }[Ce.key] || 0, $e = Ce.target.closest("[data-resize]")?.dataset.resize;
      l.transform(ge, Ke, $e);
      const We = g.querySelector('[data-hit="' + (re() ? "group" : x) + '"]');
      ($e ? We?.querySelector('[data-resize="' + $e + '"]') : We)?.focus({
        preventScroll: !0
      });
    });
    const je = new ResizeObserver(ke);
    je.observe(v.parentElement), a.own(() => je.disconnect()), a.listen(window, "pagehide", () => {
      b.cancel(), $();
    }), a.listen(window, "manokara:languagechange", be), a.listen(document.getElementById("editLyricLayout"), "click", () => {
      _("playlist"), k("lyrics");
    }), be(), a.interval(() => {
      A === "sample" && Pe();
    }, 100);
  }
  return {
    init: xt,
    showMain: _,
    showTarget: k,
    text: H,
    get main() {
      return S;
    },
    get view() {
      return {
        target: T,
        selected: x
      };
    },
    restoreView(V) {
      b?.cancel(), l.restoreView(V);
    },
    get serialized() {
      return l.serialized;
    },
    feed(V) {
      const de = se();
      w = V, de !== se() && b?.cancel(), d && S === "playlist" && !document.getElementById("playlistStudio")?.hidden && (de !== se() ? be() : A === "live" && Pe());
    },
    refresh: be,
    dispose() {
      if (!a.disposed) {
        b?.dispose(), l.dispose(), a.dispose(), L.clear(), window.ManokaraPreview === J && delete window.ManokaraPreview, h?.destroy();
        for (const V of I)
          V.renderer.destroy(), V.stage.remove();
        I.length = 0, C?.remove(), C = null, q?.open && q.close(), q?.remove(), d = null;
      }
    }
  };
})();
window.ManokaraStudio = Zf;
var bo = ad();
function ep(a = () => performance.now()) {
  let u = 0, l = null, c = 0, p = null, d = 0, g = 1;
  const v = () => u + (l == null ? 0 : Math.max(0, a() - l) / 1e3), h = () => Math.max(0, c - (p == null ? 0 : Math.max(0, a() - p) / 1e3));
  return {
    reset() {
      u = 0, l = null, c = 0, p = null, d++, g++;
    },
    start(C = 0) {
      u = Number(C) || 0, l = a();
    },
    pause() {
      u = v(), l = null, c = h(), p = null;
    },
    resume({ fallback: C = !0, countdown: N = !1 } = {}) {
      C && l == null && (l = a()), N && p == null && (p = a());
    },
    countdown(C) {
      c = Math.max(0, Number(C) || 0), p = a();
    },
    finishCountdown() {
      c = 0, p = null;
    },
    elapsed: v,
    remaining: h,
    seek() {
      d++, g++;
    },
    lyricsChanged() {
      g++;
    },
    get running() {
      return l != null;
    },
    get audioVersion() {
      return d;
    },
    get timelineVersion() {
      return g;
    }
  };
}
function tp(a, { delay: u = 0, rate: l = 1 } = {}) {
  return Math.max(0, (Number(a) || 0) - Math.max(0, Number(u) || 0) * Math.max(0.01, Number(l) || 1));
}
function np(a, u, l = 0.8) {
  if (!a) return !1;
  const c = a.playing ? Math.max(0, u.now - a.now) / 1e3 * a.rate : 0;
  return Math.abs(u.position - a.position - c) > l;
}
function rp({
  youtube: a,
  mediaAdapter: u,
  pitchFactory: l,
  captureFactory: c,
  lookup: p,
  youtubeId: d,
  origin: g,
  options: v = () => ({}),
  output: h = {},
  callbacks: C = {},
  platform: N = globalThis,
  now: T = () => performance.now()
}) {
  const x = Pr(N, T), A = ep(T);
  let S = Pr(N, T), w = null, b = "", L = !1, I = null, W = null, B = null, z = null, q = 0, J = null, te = !1, X = 0, H = !1, ae = null, G = !1, K = 0, $ = "Play a song to change its key.", re = "", se = !1, Q = 0, y = null, O = !1, _ = !1, k = !1, F = null, ce = null;
  const ke = /* @__PURE__ */ new Set(), ve = (oe) => h.text?.(oe) ?? oe, Ie = (oe) => h.format?.(oe) ?? String(oe), Ne = (oe) => {
    !x.disposed && !x.suspended && h.message?.(oe);
  }, fe = (oe) => !x.disposed && oe === X, Pe = (oe, we) => fe(oe) && we === K && !x.suspended, be = l.create((oe) => {
    x.disposed || (w && !w.mc && (w.pitch = 0, C.persist?.(w), C.render?.()), $ = oe, me("error"));
  }), Fe = c({
    getState: () => ({
      key: w && !w.mc ? fa(w.pitch) : 0,
      title: w?.title || "",
      language: v().language || "en",
      enabled: !!w && !w.mc && !L && (b === "yt" ? te : b === "media" ? !!z : !!d(w.url)),
      sequence: X,
      version: A.audioVersion
    }),
    onStatus(oe) {
      x.disposed || (oe.active && be.element && be.set(0).catch(() => {
      }), (se !== oe.active || Math.abs(Q - oe.delay) > 5e-3) && A.lyricsChanged(), se = oe.active, Q = oe.delay, $ = oe.active ? w?.pitch ? "Key applied. Saved for this song." : "Original key." : oe.message || "Tab Audio stopped. The player is using its original sound.", me(oe.error ? "error" : ""), oe.message && Ne($));
    }
  });
  function xt() {
    if (!O || x.disposed || x.suspended) return;
    const oe = de();
    C.changed?.(oe);
    for (const we of ke) we(oe);
  }
  function V() {
    try {
      return b === "yt" ? Number(J?.getPlaybackRate?.()) || 1 : b === "media" && z?.playbackRate || 1;
    } catch {
      return 1;
    }
  }
  function de() {
    return Object.freeze({
      mode: b,
      counting: L,
      paused: H,
      duration: B,
      ready: te,
      lookupPending: !!ae,
      pitchBusy: G,
      pitchMessage: $,
      pitchStatusState: re,
      countdownRemaining: L ? A.remaining() : 0,
      position: Kt(),
      audiblePosition: Vt(),
      playing: Ke(),
      sequence: X,
      timelineVersion: A.timelineVersion,
      audioVersion: A.audioVersion,
      captureActive: Fe.active,
      captureBusy: Fe.busy,
      captureDelay: Fe.delay,
      started: O,
      disposed: x.disposed,
      suspended: x.suspended,
      timers: S.timerCount,
      activeTimers: S.activeTimerCount,
      listeners: S.cleanupCount
    });
  }
  function me(oe = null) {
    oe !== null && (re = oe), xt(), Fe.sync();
  }
  function Ae() {
    xt(), Fe.sync();
  }
  function je(oe) {
    L && H !== oe && (oe ? A.pause() : A.resume({
      fallback: !1,
      countdown: !0
    })), H = oe, Ae();
  }
  function Ce() {
    h.countdown?.({
      visible: !!L && !!w,
      title: w?.title || "",
      remaining: L ? A.remaining() : 0
    });
  }
  function pe(oe) {
    !x.disposed && !x.suspended && h.time?.(oe);
  }
  function Oe() {
    _ || x.disposed || x.suspended || (_ = !0, C.advance?.());
  }
  function ge() {
    X++, A.reset(), S.dispose(), S = Pr(N, T), Fe.silence(), y = null, be.detach(), K++, G = !1, ae?.abort(), ae = null, a.destroy(J), J = null, te = !1, u.release(z), z = null, q = 0, w = null, b = "", L = !1, I = null, F = ce = null, W = null, B = null, H = !1, _ = !1, u.clear(), h.time?.("00:00 / 00:00"), h.stage?.({
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
    if (!w || w.mc || L || H) return !1;
    if (b === "media") return !!z && !z.paused && !z.ended && z.readyState >= 2;
    if (b === "yt")
      try {
        return te && J.getPlayerState() === 1;
      } catch {
        return !1;
      }
    return A.running;
  }
  async function $e() {
    const oe = z, we = X;
    if (!(!oe || G || x.suspended))
      try {
        be.element === oe && await be.resume(), fe(we) && z === oe && !x.suspended && await oe.play();
      } catch (he) {
        fe(we) && z === oe && !x.suspended && (je(!0), he.name === "NotAllowedError" ? Ne("Playback was blocked. Press Play to start the media.") : he.name !== "AbortError" && Xt("Server video stream could not play. Try again.", we));
      }
  }
  function We(oe) {
    if (!(!fe(oe) || !L)) {
      if (L = !1, je(!1), I?.(), I = null, A.finishCountdown(), Ce(), W) {
        const we = W;
        W = null, on(we[0], we[1]);
        return;
      }
      z ? $e() : b === "yt" && J && te && J.playVideo();
    }
  }
  function on(oe, we) {
    if (b = "clk", L) {
      W = [oe, we];
      return;
    }
    h.stage({
      stageMode: "media"
    }), a.fallback(oe, we), A.start(), (H || x.suspended) && A.pause(), Ne("YouTube API could not load: Pause is unavailable and lyric timing is approximate.");
  }
  function Xt(oe, we) {
    fe(we) && (Ne(oe + " Open it on YouTube to check."), Bt(we));
  }
  function Bt(oe) {
    !v().skip || F || !fe(oe) || (F = S.timeout(() => {
      F = null, fe(oe) && Oe();
    }, 1500));
  }
  async function Dn(oe, we, he) {
    if (!fe(he) || ae) return;
    const Qe = new AbortController(), tt = S.timeout(() => Qe.abort(new Error("Media lookup timed out.")), 55e3);
    ae = Qe;
    let et = null;
    me(), Ne("Embedded playback is unavailable. Trying server playback…");
    try {
      if (!fe(he)) return;
      const Xe = await p(oe, AbortSignal.any([Qe.signal, S.signal]));
      if (!fe(he)) return;
      C.title?.(we, Xe.title);
      const Ue = new URL(Xe.url, g);
      if (Ue.origin !== g || Ue.pathname !== "/__youtube/media") throw Error("Invalid video stream.");
      Ue.searchParams.set("start", String(we.s || 0));
      const st = u.create(Ue.href, {
        volume: v().volume
      });
      if (we.mediaDuration = Math.max(0, Xe.duration - (we.s || 0)), B = we.e != null ? we.e - (we.s || 0) : we.mediaDuration, q = 0, J) {
        try {
          J.destroy();
        } catch {
        }
        J = null;
      }
      if (te = !1, h.stage({
        stageMode: "media"
      }), u.mount(st), z = st, b = "media", S.listen(st, "play", () => {
        fe(he) && je(!1);
      }), S.listen(st, "pause", () => {
        fe(he) && !L && je(!0);
      }), S.listen(st, "seeked", () => {
        fe(he) && (A.seek(), be.flush(), Ae());
      }), S.listen(st, "ended", () => {
        fe(he) && (Kt() + 3 < we.mediaDuration && (we.e == null || Kt() + 3 < B) ? Xt("Server video stream was interrupted.", he) : rr(he));
      }), S.listen(st, "error", () => Xt("Server video stream could not play. Try again.", he)), we.pitch && !Fe.active && !x.suspended && (et = ++K, G = !0, me(), await be.attach(st, we.pitch, () => Pe(he, et) && z === st && !Fe.active), !Pe(he, et)) || !fe(he)) return;
      Fe.active && be.element === st && await be.set(0), G = !1, st.controls = !0, $ = we.pitch ? "Key applied. Saved for this song." : "Original key.", Fe.sync(), me(""), A.lyricsChanged(), Ce(), Ne("Playing video through the server."), !L && !H && $e();
    } catch (Xe) {
      fe(he) && !S.signal.aborted && (et === null || Pe(he, et)) && Xt(Xe.message, he);
    } finally {
      tt(), ae === Qe && (ae = null), fe(he) && (et === null || et === K) && (G = !1, me(re));
    }
  }
  function rr(oe) {
    ce?.(), ce = S.timeout(() => {
      ce = null, fe(oe) && z?.ended && Oe();
    }, Math.ceil((Fe.active ? Fe.delay : be.delay) * 1e3));
  }
  async function Zt(oe, we, he) {
    if (!fe(he) || x.suspended) return;
    const Qe = ++K;
    if (!we.pitch || Fe.active) {
      Fe.sync(), !L && !H && $e();
      return;
    }
    G = !0, oe.controls = !1, $ = "Preparing key-shifted audio…", me();
    try {
      if (await be.attach(oe, we.pitch, () => Pe(he, Qe) && z === oe && !Fe.active), !Pe(he, Qe)) return;
      Fe.active && be.element === oe && await be.set(0), $ = "Key applied. Saved for this song.", me("");
    } catch (tt) {
      if (!Pe(he, Qe)) return;
      we.pitch = 0, C.persist?.(w), $ = tt.message, Ne($), me("error");
    } finally {
      Pe(he, Qe) && (oe.controls = !0, G = !1, me(re), !L && !H && $e());
    }
  }
  function ln() {
    x.disposed || x.suspended || (be.element && be.set(0), Fe.open());
  }
  async function Pi(oe) {
    const we = w, he = X;
    if (!we || we.mc || G || ae || x.suspended || x.disposed) return;
    const Qe = fa(oe);
    if (Qe === fa(we.pitch)) return;
    const tt = fa(we.pitch);
    if (we.pitch = Qe, C.persist?.(w), C.render?.(), C.keyChanged?.(Qe), Fe.active) {
      Fe.sync(), $ = Qe ? "Key applied. Saved for this song." : "Original key.", me("");
      return;
    }
    if (b === "yt" || b === "clk" && d(we.url)) {
      if (!Qe) {
        $ = "Original key.", me("");
        return;
      }
      ln();
      return;
    }
    if (!z) {
      we.pitch = tt, C.persist?.(w), $ = "This source cannot change key. Use YouTube or a media link.", me("error");
      return;
    }
    G = !0;
    const et = ++K;
    $ = "Preparing key-shifted audio…", me();
    try {
      if (be.element !== z ? Qe && await be.attach(z, Qe, () => Pe(he, et) && w === we && !Fe.active) : await be.set(Qe), !Pe(he, et)) return;
      Fe.active && be.element && await be.set(0), A.lyricsChanged(), $ = Qe ? "Key applied. Saved for this song." : "Original key.", me("");
    } catch (Xe) {
      if (!Pe(he, et)) return;
      we.pitch = be.key, C.persist?.(w), $ = Xe.message, me("error"), Ne($);
    } finally {
      Pe(he, et) && (G = !1, C.render?.(), me(re));
    }
  }
  function Zr(oe, we, he) {
    h.stage({
      stageMode: "media"
    });
    const Qe = a.mount();
    a.ready(S.signal).then((tt) => {
      if (!fe(he)) return;
      if (!tt) {
        on(oe, we);
        return;
      }
      const et = {
        origin: g,
        autoplay: L || H ? 0 : 1,
        start: Math.floor(we.s || 0),
        playsinline: 1,
        rel: 0
      };
      we.e != null && (et.end = Math.ceil(we.e)), J = a.create(Qe, {
        videoId: oe,
        playerVars: et,
        events: {
          onReady: (Xe) => {
            if (!fe(he)) return;
            te = !0;
            const Ue = Xe.target.getDuration();
            Ue > 0 && (we.mediaDuration = Math.max(0, Ue - (we.s || 0)), B = we.e != null ? we.e - (we.s || 0) : we.mediaDuration), Fe.sync(), $ = we.pitch ? Fe.active ? "Key applied. Saved for this song." : "Start Tab Audio to apply the saved key. The player is using its original sound." : "Original key.", me(""), Xe.target.setVolume(v().volume), !L && !H && !x.suspended && Xe.target.playVideo();
          },
          onStateChange: (Xe) => {
            if (!(!fe(he) || L)) {
              if (x.suspended) {
                Xe.data === 1 && Xe.target?.pauseVideo();
                return;
              }
              Xe.data === 0 ? Fe.active ? (ce?.(), ce = S.timeout(() => {
                ce = null, fe(he) && J?.getPlayerState() === 0 && Oe();
              }, Math.ceil(Fe.delay * 1e3))) : Oe() : Xe.data === 1 ? (C.claim?.(), je(!1)) : Xe.data === 2 && je(!0);
            }
          },
          onError: (Xe) => {
            if (!fe(he)) return;
            const Ue = Number(Xe?.data);
            if ([5, 101, 150].includes(Ue)) {
              Dn(oe, we, he);
              return;
            }
            const st = {
              2: "Invalid video ID or URL.",
              100: "Video is unavailable, private, or has been removed.",
              153: "YouTube did not receive a referrer/client identity. Open Manokara from localhost or HTTPS, not file://."
            }[Ue] || "YouTube could not play this video.";
            Xt(`YouTube error ${Ue || "unknown"}: ${st}`, he);
          }
        }
      });
    }).catch(() => {
      fe(he) && on(oe, we);
    });
  }
  function Kt() {
    const oe = w;
    if (!oe || L) return 0;
    if (b === "media") return z ? z.currentTime - q : 0;
    if (b === "yt") {
      if (!J || !te) return 0;
      try {
        return J.getCurrentTime() - (oe.s || 0);
      } catch {
        return 0;
      }
    }
    return A.elapsed();
  }
  function Vt() {
    return tp(Kt(), {
      rate: V(),
      delay: Fe.active ? Fe.delay : b === "media" ? be.delay : 0
    });
  }
  function xn() {
    if (!(!w || x.disposed || x.suspended)) {
      if (C.claim?.(), L) {
        je(!H);
        return;
      }
      if (b === "media")
        z && (z.paused ? $e() : z.pause());
      else if (b === "yt") {
        if (!te) return;
        const oe = J.getPlayerState();
        oe === 1 || oe === 3 ? J.pauseVideo() : J.playVideo();
      } else b === "clk" ? A.running ? (A.pause(), je(!0)) : (A.resume(), je(!1)) : Ne("Pause is not available for this link.");
    }
  }
  function ir(oe, {
    countdown: we = 0
  } = {}) {
    if (x.disposed || x.suspended || !oe) return !1;
    sn(), ge(), w = oe, $ = oe?.pitch ? "Preparing key-shifted audio…" : "Original key.", me("");
    const he = oe, Qe = X, tt = he.mc ? null : d(he.url), et = !he.mc && !tt && /\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(he.url), Xe = tt || et ? Math.max(0, Math.min(30, Math.floor(Number(we) || 0))) : 0;
    if (Xe > 0 && (L = !0, A.countdown(Xe)), B = he.mc ? he.dur : he.e != null ? he.e - (he.s || 0) : null, he.mc)
      b = "clk", A.start(), h.stage?.({
        stageMode: "mc",
        stageTitle: ve("MC break"),
        stageNote: he.memo || ve("Take a moment between songs.")
      });
    else if (tt)
      b = "yt", h.stage?.({
        stageMode: "media",
        youtubeUrl: "https://www.youtube.com/watch?v=" + tt + "&t=" + Math.floor(he.s || 0)
      }), Zr(tt, he, Qe);
    else if (et) {
      b = "media", q = he.s || 0, h.stage?.({
        stageMode: "media"
      });
      const Ue = u.create(he.url, {
        volume: v().volume,
        crossOrigin: !!he.pitch && !Fe.active && new URL(he.url).origin !== g
      });
      z = Ue, S.listen(Ue, "loadedmetadata", () => {
        he.mediaDuration = Number.isFinite(Ue.duration) ? Math.max(0, Ue.duration - (he.s || 0)) : void 0, Ue.currentTime = he.s || 0, B == null && he.mediaDuration != null && (B = he.mediaDuration);
      }), S.listen(Ue, "seeked", () => {
        A.seek(), be.flush(), Ae();
      }), S.listen(Ue, "ended", () => rr(Qe)), S.listen(Ue, "play", () => {
        be.element === Ue && be.resume().catch(() => {
        }), je(!1);
      }), S.listen(Ue, "pause", () => {
        L || je(!0);
      }), S.listen(Ue, "error", () => {
        if (he.pitch && Ue.crossOrigin === "anonymous" && (he.pitch = 0, C.persist?.(he), C.replay?.(he))) {
          Ne("This media link did not allow pitch processing. Playing the original key.");
          return;
        }
        Ne("Could not load this media."), Bt(Qe);
      }), u.mount(Ue), Zt(Ue, he, Qe);
    } else
      b = "clk", A.start(), h.stage?.({
        stageMode: "external",
        stageTitle: ve("Open this link to play."),
        stageNote: ve("This media opens in a new tab. Your lyric clock is running here."),
        stageUrl: he.url,
        stageLinkLabel: ve("Open media")
      });
    return L && (Ce(), pe(ve("Starting in ") + Xe + " s"), I = S.interval(() => {
      if (A.remaining() <= 0) {
        We(Qe);
        return;
      }
      Ce(), pe(ve("Starting in ") + Math.ceil(A.remaining()) + " s");
    }, 100)), S.interval(() => {
      if (b === "yt" && te) {
        const Ue = {
          now: T(),
          position: Kt(),
          playing: Ke(),
          rate: V()
        };
        if (np(y, Ue) && A.seek(), y = Ue, B == null) {
          let st = 0;
          try {
            st = J.getDuration();
          } catch {
          }
          st > 0 && (he.mediaDuration = Math.max(0, st - (he.s || 0)), B = he.e != null ? he.e - (he.s || 0) : he.mediaDuration);
        }
      }
      if (Ae(), !L) {
        if (B != null && !H && Vt() >= B) {
          Oe();
          return;
        }
        pe(Ie(Kt()) + " / " + (B != null ? Ie(B) : "--:--"));
      }
    }, 250), xt(), !0;
  }
  function sn() {
    O || x.disposed || (O = !0, xt());
  }
  function Or() {
    x.disposed || (ge(), $ = "Play a song to change its key.", me(""));
  }
  function Nn() {
    if (!(x.disposed || x.suspended)) {
      k = !!w && !H, (L || b === "clk") && A.pause(), H = !!w, y = null, K++, G = !1, S.suspend(), x.suspend(), Fe.suspend?.(), be.suspend?.();
      try {
        z?.pause(), te && J?.pauseVideo();
      } catch {
      }
    }
  }
  function ft() {
    x.disposed || !x.suspended || (x.resume(), S.resume(), Fe.resume?.(), k && w && (L || (H = !1), L ? je(!1) : b === "clk" ? (A.resume(), je(!1)) : b === "media" && z ? (z.readyState >= 1 && z.currentTime < q && (z.currentTime = q), B == null && Number.isFinite(z.duration) && (w.mediaDuration = Math.max(0, z.duration - q), B = w.mediaDuration), H = !1, Zt(z, w, X)) : b === "yt" && te && J.playVideo()), k = !1, xt());
  }
  function zt({
    preserveCapture: oe = !1
  } = {}) {
    x.disposed || (ge(), S.dispose(), x.dispose(), O = !1, Fe.dispose({
      preserveCapture: oe
    }), be.dispose?.(), ke.clear());
  }
  return {
    start: sn,
    load: ir,
    stop: Or,
    suspend: Nn,
    resume: ft,
    dispose: zt,
    changeKey: Pi,
    startTabAudio: ln,
    play() {
      !w || x.disposed || x.suspended || (L ? We(X) : H && xn());
    },
    togglePause: xn,
    stopTabAudio: () => Fe.stop(),
    setVolume(oe) {
      x.disposed || (z && (z.volume = Math.max(0, Math.min(100, Number(oe) || 0)) / 100), J && te && J.setVolume(oe), xt());
    },
    refreshSongTiming() {
      w && (B = w.mc ? w.dur : w.e != null ? w.e - (w.s || 0) : w.mediaDuration ?? null, A.lyricsChanged(), xt());
    },
    invalidateLyrics() {
      x.disposed || A.lyricsChanged();
    },
    elapsed: Kt,
    audibleElapsed: Vt,
    mediaPlaying: Ke,
    getSnapshot: de,
    subscribe(oe) {
      return x.disposed ? () => {
      } : (ke.add(oe), oe(de()), () => ke.delete(oe));
    },
    get state() {
      return de();
    },
    get appliedKey() {
      return be.key;
    }
  };
}
const ps = /* @__PURE__ */ new WeakMap();
function ip({ window: a = globalThis.window, document: u = a.document, root: l }) {
  function c(d) {
    if (d?.aborted) return Promise.resolve(!1);
    if (a.YT?.Player) return Promise.resolve(!0);
    let g = ps.get(a);
    if (!g) {
      const v = a.onYouTubeIframeAPIReady, h = /* @__PURE__ */ new Set();
      let C, N = !1, T, x = !1;
      const A = (b) => {
        if (!x) {
          x = !0, g.result = b, a.clearTimeout(T), a.onYouTubeIframeAPIReady === S && (a.onYouTubeIframeAPIReady = v), !b && N && C?.remove(), C?.removeEventListener("error", w), ps.delete(a);
          for (const L of [...h]) L(b);
          h.clear();
        }
      }, S = () => {
        try {
          v?.();
        } finally {
          A(!!a.YT?.Player);
        }
      }, w = () => A(!1);
      g = { listeners: h, finish: A }, ps.set(a, g), a.onYouTubeIframeAPIReady = S, C = u.getElementById("ytapi"), C || (N = !0, C = u.createElement("script"), C.id = "ytapi", C.src = "https://www.youtube.com/iframe_api"), C.addEventListener("error", w, { once: !0 }), T = a.setTimeout(() => A(!1), 8e3), N && u.head.append(C);
    }
    return g.result !== void 0 ? Promise.resolve(g.result) : new Promise((v) => {
      let h = !1;
      const C = (T) => {
        h || (h = !0, d?.removeEventListener("abort", N), g.listeners.delete(C), v(T));
      }, N = () => {
        C(!1), g.listeners.size || g.finish(!1);
      };
      g.listeners.add(C), d?.addEventListener("abort", N, { once: !0 }), d?.aborted && N();
    });
  }
  function p() {
    const d = u.createElement("div");
    return d.id = "ytp", l().replaceChildren(d), d;
  }
  return {
    ready: c,
    mount: p,
    create: (d, g) => new a.YT.Player(d, { width: "100%", height: "100%", ...g }),
    destroy(d) {
      try {
        d?.destroy();
      } catch {
      }
    },
    fallback(d, g) {
      const v = u.createElement("iframe");
      v.referrerPolicy = "strict-origin-when-cross-origin", v.allow = "autoplay; encrypted-media; picture-in-picture", v.allowFullscreen = !0;
      const h = new URL("https://www.youtube.com/embed/" + d);
      h.searchParams.set("autoplay", "1"), h.searchParams.set("start", String(Math.floor(g.s || 0))), g.e != null && h.searchParams.set("end", String(Math.ceil(g.e))), v.src = h.href, l().replaceChildren(v);
    }
  };
}
function ap({ document: a = globalThis.document, root: u }) {
  return {
    create(l, { volume: c = 100, crossOrigin: p = !1 } = {}) {
      const d = a.createElement("video");
      return p && (d.crossOrigin = "anonymous"), d.src = l, d.controls = !0, d.playsInline = !0, d.autoplay = !1, d.volume = Math.max(0, Math.min(100, Number(c) || 0)) / 100, d;
    },
    mount: (l) => u().replaceChildren(l),
    clear: () => u().replaceChildren(),
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
let ms = null, ed = 0;
const Ri = {
  get active() {
    return Eo.size > 0;
  },
  getSnapshot() {
    return ms ? { ...ms, stateAgeMs: Math.max(0, performance.now() - ed) } : { ready: !1 };
  },
  subscribe(a) {
    return Eo.add(a), a(Ri.getSnapshot()), () => Eo.delete(a);
  },
  feed(a) {
    ms = a, ed = performance.now();
    for (const u of Eo) u(Ri.getSnapshot());
  }
};
globalThis.ManokaraStagePreview = {
  getSnapshot: () => Ri.getSnapshot(),
  subscribe: (a) => Ri.subscribe(a)
};
function op({ getState: a, onStatus: u }) {
  let l;
  try {
    l = sessionStorage.getItem("manokaraTabAudioChannel"), (performance.getEntriesByType("navigation")[0]?.type !== "reload" || !/^[a-f0-9-]{36}$/.test(l || "")) && (l = crypto.randomUUID(), sessionStorage.setItem("manokaraTabAudioChannel", l));
  } catch {
    l = crypto.randomUUID();
  }
  let c = null, p = !1, d = !1, g = 0, v = "", h = !1, C = !1;
  const N = () => isSecureContext && !!navigator.mediaDevices?.setCaptureHandleConfig;
  function T() {
    if (!N()) return !1;
    try {
      return navigator.mediaDevices.setCaptureHandleConfig({ handle: l, exposeOrigin: !0, permittedOrigins: [location.origin] }), !0;
    } catch {
      return !1;
    }
  }
  T();
  function x(J = "", te = !1) {
    u({ active: p, busy: d, delay: g, message: J, error: te, open: !!c && !c.closed });
  }
  function A(J, te) {
    !c || c.closed || c.postMessage({ type: J, channel: l, state: te }, location.origin);
  }
  function S(J = !1) {
    if (h || C || !c || c.closed) return;
    const te = a(), X = JSON.stringify(te);
    (J || v !== X) && (v = X, A("manokara:tab-audio-state", te));
  }
  function w() {
    if (C || h) return !1;
    if (!T())
      return x("Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.", !0), !1;
    if (!c || c.closed) {
      const J = new URL("./manokara-tab-audio.html", location.href);
      J.hash = new URLSearchParams({ channel: l, lang: a().language }).toString(), c = window.open(J.href, "manokara-tab-audio-" + l, "popup,width=480,height=640"), v = "";
    } else c.focus();
    return c ? (x(p ? "" : "Choose the Manokara tab and share tab audio in the audio window."), S(!0), !0) : (x("Popup blocked. Please allow popups.", !0), !1);
  }
  function b(J) {
    if (h || J.origin !== location.origin || J.data?.channel !== l) return;
    const te = J.data;
    if (!c && te.type === "manokara:tab-audio-hello")
      try {
        if (J.source?.opener !== window || J.source.location.pathname !== "/manokara-tab-audio.html") return;
        c = J.source, v = "";
      } catch {
        return;
      }
    if (J.source === c) {
      if (te.type === "manokara:tab-audio-hello") {
        S(!0);
        return;
      }
      te.type === "manokara:tab-audio-status" && (p = te.active === !0, d = te.busy === !0, g = p ? Math.max(0, Math.min(3, Number(te.delay) || 0)) : 0, x(typeof te.message == "string" ? te.message.slice(0, 240) : "", te.error === !0));
    }
  }
  window.addEventListener("message", b);
  const L = () => {
    c?.closed && (c = null, v = "", p = d = !1, g = 0, x("Tab Audio stopped. The player is using its original sound."));
  };
  let I = setInterval(L, 1e3);
  function W() {
    h || (A("manokara:tab-audio-suspend"), h = !0, clearInterval(I), I = null, window.removeEventListener("message", b));
  }
  function B({ preserveCapture: J = !1 } = {}) {
    if (!C) {
      if (!J) {
        A("manokara:tab-audio-stop");
        try {
          c?.close();
        } catch {
        }
      }
      W(), C = !0, p = d = !1, g = 0, window.removeEventListener("pagehide", W), window.removeEventListener("pageshow", q);
    }
  }
  function z() {
    C || !h || (h = !1, v = "", T(), window.addEventListener("message", b), I == null && (I = setInterval(L, 1e3)), S(!0));
  }
  function q(J) {
    J.persisted && z();
  }
  return window.addEventListener("pagehide", W), window.addEventListener("pageshow", q), {
    open: w,
    sync: S,
    dispose: B,
    suspend: W,
    resume: z,
    stop() {
      A("manokara:tab-audio-stop");
    },
    silence() {
      A("manokara:tab-audio-state", { ...a(), key: 0, enabled: !1 }), v = "";
    },
    get active() {
      return p;
    },
    get busy() {
      return d;
    },
    get delay() {
      return g;
    }
  };
}
const td = /* @__PURE__ */ new Set([
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
function lp(a, u) {
  const l = Object.keys(a);
  return !!u && l.length === Object.keys(u).length && l.every((p) => Object.hasOwn(u, p) && (td.has(p) || Object.is(a[p], u[p]))) ? { partial: !0, packet: Object.fromEntries(l.filter((p) => p === "writerId" || td.has(p) && !Object.is(a[p], u[p])).map((p) => [p, a[p]])) } : { partial: !1, packet: a };
}
function sp() {
  if (window.ManokaraController?.active) return window.ManokaraController;
  const a = ManokaraI18n.text, u = ManokaraI18n.markup, l = (f) => document.querySelector(f), c = Pr(), {
    draft: p,
    controls: d
  } = Y;
  function g(f) {
    window.ManokaraStudio?.showMain("karaoke"), f === "song" && !l("#songEditorDialog").open && l("#songEditorDialog").showModal(), f !== "song" && l("#songEditorDialog").open && l("#songEditorDialog").close();
  }
  function v() {
    S >= 0 && !confirm(a("Discard the current song edits and start a new song?")) || (S >= 0 && zt(), g("song"), l("#panel-song").scrollTop = 0, l("#url").focus());
  }
  c.listen(l("#songEditorDialog"), "click", (f) => {
    f.target === l("#songEditorDialog") && l("#songEditorDialog").close();
  }), c.listen(l("#libraryDialog"), "click", (f) => {
    f.target === l("#libraryDialog") && l("#libraryDialog").close();
  }), c.listen(l("#songEditorDialog"), "close", () => c.frame(() => {
    const f = document.activeElement;
    !window.ManokaraTour?.active && (f === document.body || l("#songEditorDialog").contains(f)) && l("#openSongEditor")?.focus({
      preventScroll: !0
    });
  }));
  const h = (f) => (f = Math.max(0, Math.round(f)), String(Math.floor(f / 60)).padStart(2, "0") + ":" + String(f % 60).padStart(2, "0")), C = ManokaraCore.timeValue;
  let N = [], T = null, x = 0, A = -1, S = -1, w = [], b = "", L = {}, I = ma.map((f) => ({ ...f })), W;
  const B = rp({
    youtube: ip({
      root: () => l("#stageMediaRoot")
    }),
    mediaAdapter: ap({
      root: () => l("#stageMediaRoot")
    }),
    pitchFactory: ManokaraPitch,
    captureFactory: op,
    origin: location.origin,
    youtubeId: (f) => We(f),
    options: () => ({
      volume: Number(d.get("vol") ?? 100),
      skip: d.get("skip"),
      language: ManokaraI18n.language
    }),
    async lookup(f, R) {
      if (await Ae, R.aborted) throw new DOMException("Cancelled", "AbortError");
      return ManokaraPitch.lookup(ManokaraSession.api, je("/__youtube"), f, {
        signal: R
      });
    },
    output: {
      text: a,
      format: h,
      message: (f) => Q(f),
      stage: (f) => {
        c.disposed || Y.ui.updatePlayerPanelState(f);
      },
      time: (f) => ae(f),
      countdown: J
    },
    callbacks: {
      changed: (f) => Kt(f),
      persist: () => re(),
      render: () => ft(),
      keyChanged: (f) => {
        S >= 0 && N[S] === T && p.set("songKey", f);
      },
      title: Bt,
      claim: ge,
      advance: () => Vt(ln()),
      replay: (f) => {
        const R = N.indexOf(f);
        return R < 0 ? !1 : (Vt(R), !0);
      }
    }
  }), z = () => B.mediaPlaying(), q = () => B.audibleElapsed();
  function J({
    visible: f,
    title: R,
    remaining: ee
  }) {
    Y.ui.updatePlayerPanelState({
      countdownVisible: f,
      countdownTitle: f ? R : "",
      countdownValue: f ? String(Math.max(1, Math.ceil(ee))) : "",
      countdownHint: a("Press Play to start now")
    });
  }
  function te(f = B.getSnapshot()) {
    const R = T && !T.mc ? ManokaraPitch.clamp(T.pitch) : 0;
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
      paused: f.paused,
      volume: Number(d.get("vol") ?? 100),
      key: R,
      canPitch: !!T && !T.mc && !f.pitchBusy && !f.lookupPending && (f.mode !== "yt" || f.ready)
    };
  }
  function X(f) {
    Y.ui.updatePlayerControls(te(f));
  }
  const H = (f) => Y.ui.updatePlayerPanelState({
    now: String(f ?? "")
  }), ae = (f) => Y.ui.updatePlayerPanelState({
    time: String(f ?? "")
  });
  function G(f = B.getSnapshot()) {
    Y.ui.updateTransposeState({
      key: T && !T.mc ? ManokaraPitch.clamp(T.pitch) : 0,
      status: a(f.pitchMessage),
      statusState: f.pitchStatusState,
      tabAudioActive: f.captureActive,
      tabAudioBusy: f.captureBusy
    }), X(f);
  }
  let K = "";
  const $ = /* @__PURE__ */ new Map();
  N = Tt.setlist.load().value;
  const re = () => Tt.setlist.save(N).ok ? !0 : (Q("Browser storage is full or unavailable. Changes remain in this window only."), !1);
  let se = "";
  const Q = (f) => {
    se = f || "", Y.ui.updatePlayerPanelState({
      message: a(se)
    });
  }, y = ManokaraLyricsEditor.create({
    draft: p,
    imported(f, R, ee) {
      p.patch({ lyricSourceLabel: "", lyricSourceUrl: "", lyricCopyright: "", lyricSources: "[]", lyricLoadStatus: "" }), ee && p.patch({ lyricSourceLabel: "TTML file", lyricCopyright: ee.copyright || "", lyricLoadStatus: Uc(ee.warnings, a) }), Je = f.duration, !p.get("ttl") && f.title && p.set("ttl", f.title.slice(0, 512)), p.get("lq") || p.set("lq", [f.title, f.artist].filter(Boolean).join(" "));
    },
    changed() {
      Je = void 0;
    },
    async convertTtml(f, R) {
      if (await Ae, c.disposed || R.aborted) throw new DOMException("Cancelled", "AbortError");
      const ee = await window.ManokaraSession.api(je("/__lyrics/import-ttml"), { ttml: f }, {
        signal: AbortSignal.any([c.signal, R, AbortSignal.timeout(15e3)])
      });
      if (ee.status === 404) throw Error("Restart the updated server to import TTML files.");
      const Z = await ee.json();
      if (!ee.ok) throw Error(Z.error || "Could not import TTML.");
      return Z;
    }
  });
  c.own(() => y.dispose());
  let O = [], _ = !1;
  const k = () => {
    try {
      return crypto.randomUUID();
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
  }, F = () => Tt.library.list(), ce = (f) => Tt.library.put(f), ke = (f) => Tt.library.remove(f);
  function ve() {
    const f = {
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
    Y.ui.updateLibrary(O, f), Nn();
  }
  async function Ie() {
    if (!c.disposed)
      try {
        if (O = (await F()).filter((f) => f && typeof f.libraryId == "string" && typeof f.url == "string"), c.disposed) return;
        _ = !1, ve();
      } catch {
        _ = !0, Nn();
      }
  }
  async function Ne() {
    try {
      const f = new Set((await F()).map((Z) => Z.libraryId));
      if (c.disposed) return;
      const R = N.filter((Z) => !Z.mc && Z.librarySync !== !1);
      let ee = !1;
      for (const Z of R)
        Z.libraryId || (Z.libraryId = k(), ee = !0);
      if (ee && !re()) {
        await Ie();
        return;
      }
      for (const Z of R) {
        if (c.disposed) return;
        f.has(Z.libraryId) || (await Tt.library.insertMissing(Z), f.add(Z.libraryId));
      }
      await Ie();
    } catch {
      _ = !0, Nn();
    }
  }
  async function fe() {
    await Ie(), !c.disposed && (l("#libraryDialog").showModal(), l("#librarySearch").focus());
  }
  async function Pe(f) {
    const R = O.find((Re) => Re.libraryId === f);
    if (!R) return;
    if (N.some((Re) => Re.libraryId === R.libraryId)) {
      Q("This song is already in the setlist.");
      return;
    }
    const ee = {
      ...R,
      librarySync: !0
    };
    delete ee._L, N.push(ee);
    const Z = re();
    ft(), l("#libraryDialog").close(), Z && Q("Added from My songs.");
  }
  async function be(f) {
    const R = O.find((Z) => Z.libraryId === f);
    if (!R || !confirm(a("Remove this song from My songs? Copies already in a setlist will stay there."))) return;
    const ee = N.map((Z) => {
      if (Z.libraryId !== f) return Z;
      const Re = {
        ...Z,
        librarySync: !1
      };
      return delete Re.libraryId, Re;
    });
    if (!Tt.setlist.save(ee).ok) {
      Q("Could not save the setlist. The song was kept in My songs.");
      return;
    }
    try {
      await ke(R.libraryId);
      for (const Z of /* @__PURE__ */ new Set([...N, T])) Z?.libraryId === R.libraryId && (delete Z.libraryId, Z.librarySync = !1);
      re(), await Ie(), Q("Removed from My songs. Setlist copies are unchanged.");
    } catch {
      re(), Q("Could not update My songs. Please try again.");
    }
  }
  function Fe() {
    confirm(a("Remove all songs?")) && (N = [], x = 0, A = -1, zt(), re(), ft(), T && Q("Setlist cleared. The current song keeps playing until it ends or you press Stop."));
  }
  function xt(f, R) {
    if (!Number.isInteger(f) || f < 0 || f >= N.length) return;
    if (R === "go") {
      Vt(f);
      return;
    }
    if (R === "ed") {
      Ue(), b = "", w = [], tt(), g("song"), S = f, K = "";
      const Ee = N[f];
      Y.ui.updateSongEditorView({
        title: a("Edit song"),
        saveLabel: a("Save changes"),
        editing: !0
      }), p.set("saveToLibrary", Ee.librarySync !== !1), p.set("url", Ee.url), p.set("ttl", Ee.title), p.set("st", Ee.s ? h(Ee.s) : ""), p.set("en", Ee.e != null ? h(Ee.e) : ""), p.set("llrc", Ee.lrc || ""), p.patch({ lyricSourceLabel: Ee.lyricSource?.label || "", lyricSourceUrl: _n(Ee.lyricSource?.url), lyricCopyright: Ee.lyricSource?.copyright || "", lyricSources: JSON.stringify(Ni(Ee.lyricSource?.sources)) }), W = Ee.mediaDuration ? Ee.mediaDuration + (Ee.s || 0) : void 0, p.set("lyricLoadStatus", ""), p.set("loff", Ee.off || 0), p.set("songKey", ManokaraPitch.clamp(Ee.pitch)), p.set("lq", Ee.title), y.load(Ee), l("#ftitle").scrollIntoView({
        block: "nearest"
      });
      return;
    }
    if (!["del", "up", "dn"].includes(R)) return;
    const ee = S >= 0 ? N[S] : null, Z = T, Re = Z ? N.indexOf(Z) : -1, Me = Re >= 0 ? Re : x;
    if (R === "del") N.splice(f, 1);
    else {
      const Ee = R === "up" ? f - 1 : f + 1;
      Ee >= 0 && Ee < N.length && ([N[f], N[Ee]] = [N[Ee], N[f]]);
    }
    if (ee) {
      const Ee = N.indexOf(ee);
      Ee < 0 ? zt() : S = Ee;
    }
    if (Z) {
      const Ee = N.indexOf(Z);
      Ee >= 0 ? x = Ee : Re >= 0 ? (x = Me, Q("Removed from the setlist. The current song keeps playing until it ends or you press Stop.")) : R === "del" && f < x && x--;
    }
    re(), ft();
  }
  c.own(Y.commands.bind("setlist", {
    openLibrary: fe,
    openEditor: v,
    clear: Fe,
    song: xt
  })), window.ManokaraSetlistActions = Y.commands.actions("setlist"), c.own(Y.commands.bind("library", {
    add: Pe,
    remove: be
  })), window.ManokaraLibraryActions = Y.commands.actions("library"), Ne();
  const V = (() => {
    try {
      return crypto.randomUUID();
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
  })();
  let de = "", me = !1;
  const Ae = window.ManokaraSession.ready.then((f) => (de = f.room, me = !0, Y.ui.updateOBSSettingsState({
    obsUrl: window.ManokaraSession.obsUrl(!1)
  }), window.ManokaraStudio?.refresh(), f)), je = (f) => {
    const R = new URL(f, location.href);
    return R.searchParams.set("room", de), R.href;
  };
  async function Ce(f) {
    try {
      return await Ae, c.disposed && f !== "release" ? void 0 : await window.ManokaraSession.api(je("/__lyric-owner"), {
        writerId: V,
        action: f
      }, {
        keepalive: f === "release",
        ...f === "release" ? {} : {
          signal: c.signal
        }
      });
    } catch {
      return;
    }
  }
  let pe = !1, Oe = -1 / 0;
  function ge() {
    c.disposed || c.suspended || pe || performance.now() - Oe < 750 || (Oe = performance.now(), pe = !0, Ce("claim").then((f) => {
      c.disposed || c.suspended || f?.ok && (Nt = null, gt());
    }).finally(() => {
      pe = !1;
    }));
  }
  c.listen(document, "pointerdown", (f) => {
    !ManokaraTour.active && !f.target.closest("#help") && ge();
  }, !0), c.listen(document, "keydown", (f) => {
    !ManokaraTour.active && !f.target.closest("#help") && ge();
  }, !0), location.protocol === "file:" && (l("#warn").hidden = !1);
  function Ke(f) {
    return f.e != null ? Math.max(0, f.e - (f.s || 0)) : f.mediaDuration || f.ldur || 180;
  }
  function $e(f) {
    const R = Ke(f), ee = ManokaraLyrics.displayLrc(f), Z = ManokaraLyrics.secondaryLrc(f), Re = ee + "|" + Z + "|" + R;
    if (f._L && f._L.k === Re) return f._L.a;
    const Me = ManokaraCore.parseLyrics(ee, R);
    if (Z) {
      const Ee = ManokaraCore.parseLyrics(Z, R).all;
      Me.all.forEach((wt, pt) => wt.romaji = Ee[pt]?.x !== wt.x && Ee[pt]?.x || "");
    }
    return f._L = {
      k: Re,
      a: Me.lines,
      all: Me.all,
      timed: Me.timed
    }, Me.lines;
  }
  const We = ManokaraCore.youtubeId, on = (f) => typeof f == "string" ? f.replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, 512) : "";
  function Xt(f) {
    return !f.mc && (!f.title || f.title.trim() === f.url.trim());
  }
  function Bt(f, R) {
    c.disposed || (R = on(R), !(!R || !Xt(f)) && (f.title = R, N.includes(f) && (re(), ft()), T === f && (H(R), J({
      visible: B.state.counting,
      title: T.title,
      remaining: B.state.countdownRemaining
    }))));
  }
  function Dn(f) {
    const R = We(f);
    if (!R) return Promise.resolve("");
    const ee = $.get(R);
    if (ee && ee.expires > Date.now()) return ee.promise;
    const Z = (async () => {
      try {
        const Me = await fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + R), {
          signal: AbortSignal.any([c.signal, AbortSignal.timeout(4e3)])
        });
        if (Me.ok) {
          const Ee = on((await Me.json()).title);
          if (Ee) return Ee;
        }
      } catch {
      }
      await Ae;
      const Re = await window.ManokaraSession.api(je("/__youtube/title"), {
        videoId: R
      }, {
        signal: AbortSignal.any([c.signal, AbortSignal.timeout(55e3)])
      });
      return Re.ok ? on((await Re.json()).title) : "";
    })().catch(() => "");
    for ($.delete(R), $.set(R, {
      promise: Z,
      expires: Date.now() + 9e5
    }); $.size > 64; ) $.delete($.keys().next().value);
    return Z.then((Re) => {
      !Re && $.get(R)?.promise === Z && $.delete(R);
    }), Z;
  }
  function rr(f) {
    if (Xt(f)) {
      const R = f.url;
      Dn(R).then((ee) => {
        f.url === R && Bt(f, ee);
      });
    }
  }
  const Zt = () => T ? N.indexOf(T) : -1, ln = () => {
    if (!T) return 0;
    const f = Zt();
    return f >= 0 ? f + 1 : x;
  }, Pi = () => {
    if (!T) return 0;
    const f = Zt();
    return Math.max(0, (f >= 0 ? f : x) - 1);
  }, Zr = () => Math.max(0, Math.min(30, Math.floor(+d.get("cdn")) || 0));
  function Kt(f = B.getSnapshot()) {
    const R = T ? f.counting ? "countdown" : f.paused ? "paused" : f.playing ? "playing" : "ready" : "ready";
    Y.ui.updatePlayerPanelState({
      playbackState: R,
      previewMessage: T ? !f.counting && !T.mc && !T.lrc?.trim() ? "This song has no lyrics yet. Add lyrics in the song editor." : "" : "Play a song to preview its lyrics.",
      playbackLabel: {
        ready: a(T ? "Ready" : "Ready when you are"),
        countdown: a("Starting soon"),
        paused: a("Paused"),
        playing: a("Playing")
      }[R]
    }), G(f);
  }
  function Vt(f) {
    if (!c.disposed) {
      if (ge(), Pn = "", f < 0 || f >= N.length) {
        if (B.stop(), T) {
          const R = Zt();
          A = R >= 0 ? R : x;
        }
        f >= N.length && (A = -1), T = null, lr(null), H(a("Nothing playing yet")), ft(), Rt(), Kt(), f >= N.length && Q("Setlist finished. Ready for another song?");
        return;
      }
      T = N[f], x = A = f, lr(T), ft(), Q(""), H(T.mc ? a("MC break") : T.title), rr(T), B.load(T, {
        countdown: Zr()
      }), Rt();
    }
  }
  function xn() {
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
  function ir(f) {
    Y.ui.updateLiveLyrics(f);
  }
  function sn(f = "") {
    const R = !!T && !T.mc && ManokaraLyrics.validRomaji(T), ee = R ? ManokaraLyrics.mode(T) : "original", Z = f || (T ? T.mc ? "Lyrics options are unavailable during a break" : R ? "Auto-saved for this song" : "Create Romaji in the song editor to enable it" : "Play a song to choose lyrics");
    ir({
      mode: ee,
      modeDisabled: !T || !!T.mc,
      romajiAvailable: R,
      modeStatus: a(Z),
      labels: xn()
    });
  }
  function Or(f) {
    const R = T;
    if (!R || R.mc || f !== "original" && !ManokaraLyrics.validRomaji(R)) {
      sn();
      return;
    }
    R.lyricMode = f, S >= 0 && N[S] === R && p.set("lyricMode", f), re(), sn(), Pn = "", On = -2, Rt(), gt(), R.libraryId && R.librarySync !== !1 && ce(R).then(Ie).catch(() => sn("Saved to setlist; My songs could not be updated"));
  }
  function Nn() {
    const f = {
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
      libraryCount: _ ? "!" : O.length,
      addSong: a("Add a song"),
      emptyTitle: a("Every set starts somewhere."),
      emptyHint: a("Add your first song, then make the evening yours."),
      clear: a("Clear setlist"),
      savedBrowser: a("Saved in this browser"),
      kind: (R, ee) => We(ee.url) ? "YouTube" : a("Media")
    };
    Y.ui.updateSetlist(N, T, f, h);
  }
  function ft() {
    ga(), G(), sn(), Nn();
  }
  function zt() {
    Ue(), b = "", w = [], tt(), S = -1, Y.ui.updateSongEditorView({
      title: a("Add a song"),
      saveLabel: a("Add to setlist"),
      editing: !1
    }), Je = void 0, W = void 0, K = "", p.reset(), y.reset(), p.set("loff", 0), p.set("songKey", 0), p.set("saveToLibrary", !0), p.set("lyricLoadStatus", ""), l("#songEditorDialog").open && l("#songEditorDialog").close();
  }
  function oe() {
    p.set("lyricLoadStatus", "");
  }
  async function we() {
    if (c.disposed || p.get("saving") || p.get("importBusy")) return;
    const f = p.get("url").trim();
    if (!/^https?:\/\//.test(f)) {
      Q("Paste a karaoke URL first.");
      return;
    }
    const R = C(p.get("st")), ee = C(p.get("en"));
    if (Number.isNaN(R) || Number.isNaN(ee) || ee != null && ee <= (R || 0)) {
      Q("Use valid times (mm:ss or seconds); End must be after Start.");
      return;
    }
    if (new TextEncoder().encode(JSON.stringify(p.get("llrc"))).length > 23e4) {
      Q("Lyrics are too long for the relay (maximum 230 KB).");
      return;
    }
    let Z;
    try {
      Z = y.read();
    } catch (pt) {
      Q(pt.message);
      return;
    }
    const Re = S >= 0 ? N[S] : null, Me = {
      title: (p.get("ttl").trim() || f).slice(0, 512),
      url: f,
      s: R || 0,
      e: ee,
      lrc: p.get("llrc"),
      lyricSource: p.get("lyricSourceLabel") ? {
        label: p.get("lyricSourceLabel"),
        url: _n(p.get("lyricSourceUrl")),
        copyright: p.get("lyricCopyright"),
        sources: Ni(p.get("lyricSources"))
      } : null,
      ...Z,
      ldur: Je ?? (Re ? Re.ldur : void 0),
      off: +p.get("loff") || 0,
      pitch: ManokaraPitch.clamp(p.get("songKey")),
      ...Re?.lyricStyle ? {
        lyricStyle: ot(Re.lyricStyle)
      } : {},
      ...Re?.libraryId ? {
        libraryId: Re.libraryId
      } : {}
    };
    if (new TextEncoder().encode(JSON.stringify({
      lrc: ManokaraLyrics.displayLrc(Me),
      romajiLrc: ManokaraLyrics.secondaryLrc(Me)
    })).length > 23e4) {
      Q("Combined output lyrics exceed 230 KB. Shorten the LRC or choose a single display language.");
      return;
    }
    p.set("saving", !0);
    const wt = p.revision;
    try {
      let pt = Me;
      if (S >= 0) {
        const _t = N[S], oi = _t.pitch !== Me.pitch, li = _t === T && (_t.url !== Me.url || _t.s !== Me.s || _t.e !== Me.e);
        if (Object.assign(_t, Me), pt = _t, delete _t._L, _t === T) {
          if (lr(_t), B.refreshSongTiming(), H(Me.title), li || oi && B.state.pitchBusy) Vt(S);
          else if (oi) {
            const Fi = _t.pitch;
            _t.pitch = ManokaraPitch.clamp(B.appliedKey), B.changeKey(Fi);
          }
        }
      } else N.push(Me);
      const en = p.get("saveToLibrary");
      pt.librarySync = en, en && !pt.libraryId && (pt.libraryId = k());
      const Yt = re();
      ft();
      let ai = !1;
      if (en)
        try {
          await ce(pt), ai = !0, await Ie();
        } catch {
          ai = !1;
        }
      !c.disposed && p.revision === wt && zt(), Q(Yt ? en ? ai ? "Saved to setlist and My songs." : "Saved to setlist. My songs could not be updated." : "Saved to setlist." : ai ? "Saved to My songs. The setlist could not be saved in this browser." : "Browser storage is full or unavailable. Changes remain in this window only."), rr(pt);
    } finally {
      p.set("saving", !1);
    }
  }
  function he() {
    const f = C(p.get("mcd"));
    if (!Number.isFinite(f) || f <= 0) {
      Q("Enter a positive MC duration (mm:ss or seconds).");
      return;
    }
    N.push({
      mc: 1,
      memo: p.get("mcm"),
      dur: f
    }), p.patch({
      mcm: "",
      mcd: ""
    }), re(), ft();
  }
  async function Qe() {
    W = void 0;
    const f = p.revision, R = p.get("url").trim(), ee = p.get("ttl"), Z = p.get("lq");
    if (!We(R) || ee.trim() && ee.trim() !== R && ee !== K) return;
    const Re = await Dn(R);
    c.disposed || f !== p.revision || !Re || p.get("url").trim() !== R || p.get("ttl") !== ee && p.get("ttl").trim() || (p.set("ttl", K = Re), (!p.get("lq") || p.get("lq") === Z) && p.set("lq", Re.replace(/\s*[\(\[【].*$/, "")));
  }
  function tt() {
    const f = b === "results" ? w.map((Z) => ({
      title: (Z.trackName + " — " + Z.artistName).slice(0, 700),
      kind: a(Z.wordTimed ? "Word-timed lyrics" : Z.syncedLyrics ? "Timed lyrics" : "Plain lyrics") + (["ttml", "yrc", "qrc"].includes(Z.format) ? " · " + Z.format.toUpperCase() : ""),
      timed: !!Z.syncedLyrics,
      sources: Z.sources.map((Re) => ({ label: Re.label, url: _n(Re.url) })),
      duration: Z.duration ? h(Z.duration) : "—"
    })) : [], R = b === "results" ? "results" : b ? a(b) : "", ee = b === "results" ? Object.entries(L).filter(([, Z]) => !["ok", "empty"].includes(Z)).map(([Z, Re]) => ({
      id: Z,
      label: ma.find((Me) => Me.id === Z)?.label || Z,
      message: a(_c[Re] || _c.unavailable)
    })) : [];
    Y.ui.updateLyricSearchResults(R, f, { providers: I, statuses: ee, busy: b === "Searching…" });
  }
  let et = null, Xe = 0;
  function Ue() {
    Xe++, et?.abort(), et = null;
  }
  c.own(Ue), Ae.then(async () => {
    const f = await window.ManokaraSession.api(je("/__lyrics/providers"), {}, {
      signal: AbortSignal.any([c.signal, AbortSignal.timeout(8e3)])
    });
    if (!f.ok) return;
    const R = await f.json();
    c.disposed || !Array.isArray(R.providers) || (I = Dc(R.providers), p.get("lyricProvider") !== "auto" && !I.some((ee) => ee.id === p.get("lyricProvider") && ee.enabled) && p.set("lyricProvider", "auto"), tt());
  }).catch(() => {
  });
  function st() {
    Ue(), b = "", w = [], L = {}, tt();
  }
  async function Fn() {
    const f = p.get("lq").trim() || p.get("ttl").trim();
    if (!f) return;
    if (f.length > 200) {
      Ue(), b = "Enter a song or artist name (1–200 characters).", w = [], tt();
      return;
    }
    Ue();
    const R = et = new AbortController(), ee = Xe, Z = p.get("lyricProvider"), Re = c.timeout(() => R.abort(), 16e3);
    p.set("lyricLoadStatus", ""), b = "Searching…", w = [], L = {}, tt();
    try {
      if (await Ae, c.disposed || ee !== Xe) return;
      if (R.signal.aborted) throw new DOMException("Timed out", "AbortError");
      const Me = await window.ManokaraSession.api(je("/__lyrics/search"), {
        query: f,
        provider: Z,
        duration: W > 0 ? W : null
      }, {
        signal: AbortSignal.any([c.signal, R.signal])
      }), Ee = await Me.json();
      if (c.disposed || ee !== Xe || f !== (p.get("lq").trim() || p.get("ttl").trim()) || Z !== p.get("lyricProvider")) return;
      if (!Me.ok) throw Error(Me.status === 404 ? "Restart the updated server to enable multi-source lyric search." : Ee.error || "Lyric search is temporarily unavailable.");
      w = wf(Ee.results), Array.isArray(Ee.providers) && (I = Dc(Ee.providers)), L = Ee.statuses && typeof Ee.statuses == "object" ? Ee.statuses : {}, b = I.some((wt) => wt.enabled) ? "results" : "No lyric sources are enabled on the server.", tt();
    } catch (Me) {
      if (c.disposed || ee !== Xe) return;
      b = R.signal.aborted ? "Lyric search took too long. Try again." : Me.message || "Search failed. Check your connection.", tt();
    } finally {
      Re(), et === R && (et = null);
    }
  }
  function Po(f) {
    const R = w[f];
    if (!R) return;
    Ue(), p.set("llrc", R.syncedLyrics || R.plainLyrics || ""), p.patch({
      lyricSourceLabel: R.sources.map((Z) => Z.label).join(" · "),
      lyricSourceUrl: _n(R.sources.find((Z) => _n(Z.url))?.url),
      lyricCopyright: R.copyright || "",
      lyricSources: JSON.stringify(Ni(R.sources))
    }), y.sourceReplaced(), Je = R.duration;
    const ee = !!R.syncedLyrics;
    p.set("lyricLoadStatus", [a(ee ? "Timed lyrics loaded. Save the song to keep them." : "Plain lyrics loaded. Save the song to keep them."), Uc(R.warnings, a)].filter(Boolean).join(" ")), b = "", w = [], tt(), Q(ee ? "Synced lyrics picked. Press Add/Save to keep them." : "Plain text only: it will scroll roughly evenly. During playback press T to time each line.");
  }
  c.own(Y.commands.bind("editor", {
    searchLyrics: Fn,
    clearLyricSearch: st,
    selectLyric: Po,
    save: we,
    cancel: zt,
    addBreak: he,
    urlChanged: Qe,
    lyricsChanged: oe
  })), window.ManokaraSongEditorActions = Y.commands.actions("editor"), c.own(Y.commands.bind("player", {
    play() {
      if (T) {
        B.play();
        return;
      }
      if (!N.length) {
        Q("Add a song first.");
        return;
      }
      Vt(A >= 0 && A < N.length ? A : 0);
    },
    pause: () => B.togglePause(),
    stop() {
      Vt(-1), Q("Stopped. Press Play to start again.");
    },
    next() {
      Vt(ln());
    },
    previous() {
      Vt(Pi());
    },
    stepKey(f) {
      B.changeKey((T?.pitch || 0) + f);
    },
    resetKey() {
      B.changeKey(0);
    },
    startTabAudio: () => B.startTabAudio(),
    stopTabAudio: () => B.stopTabAudio(),
    setVolume(f) {
      d.set("vol", String(f)), B.setVolume(f), X();
    }
  })), window.ManokaraPlayerActions = Y.commands.actions("player"), X();
  const Un = Tt.preferences.get("theme");
  (Un === "light" || Un === "dark") && (document.documentElement.dataset.theme = Un);
  const Kn = l("#transposeDialog"), Ar = [...document.querySelectorAll(".app-header,.main-tabs,#grid,#playlistStudio,.app-footer")];
  function ei() {
    Y.ui.setTransposeOpen(!1), Ar.forEach((f) => f.inert = !1), l("#transpose").focus();
  }
  function Oo() {
    Y.ui.setTransposeOpen(!0), Ar.forEach((f) => f.inert = !0), c.frame(() => l("#transposeClose").focus());
  }
  c.own(Y.commands.bind("dialog", {
    openTranspose: Oo,
    closeTranspose: ei
  })), window.ManokaraDialogActions = Y.commands.actions("dialog"), c.listen(Kn, "keydown", (f) => {
    if (f.key !== "Tab") return;
    const R = [...Kn.querySelectorAll("button:not([disabled]),a[href]")], ee = R[0], Z = R.at(-1);
    f.shiftKey && document.activeElement === ee ? (f.preventDefault(), Z.focus()) : !f.shiftKey && document.activeElement === Z && (f.preventDefault(), ee.focus());
  }), c.listen(document, "keydown", (f) => {
    f.key === "Escape" && !Kn.hidden && (f.preventDefault(), ei());
  });
  function ga() {
    const f = T, R = f && !f.mc ? Math.round((f.off || 0) * 10) / 10 : 0;
    ir({
      syncValue: a("Sync: ") + (R > 0 ? "+" : R < 0 ? "−" : "") + Math.abs(R).toFixed(1) + " s" + (R > 0 ? a(" (lyrics earlier)") : R < 0 ? a(" (lyrics later)") : ""),
      syncColor: R ? "var(--ac)" : "",
      syncDisabled: !f || !!f.mc,
      labels: xn()
    });
  }
  function Ir(f) {
    const R = re();
    return f.libraryId && f.librarySync !== !1 && ce(f).then(async () => {
      await Ie(), R || Q("Saved to My songs. The setlist could not be saved in this browser.");
    }).catch(() => Q(R ? "Saved to setlist; My songs could not be updated" : "Browser storage is full or unavailable. Changes remain in this window only.")), R;
  }
  function Rn(f) {
    const R = T;
    !R || R.mc || Number.isFinite(f) && (ge(), R.off = Math.round(f * 1e3) / 1e3, B.invalidateLyrics(), S >= 0 && N[S] === R && p.set("loff", R.off), ga(), Rt(), Ir(R), Ht(), cn(), gt());
  }
  const ya = (f) => {
    T && Number.isFinite(f) && Rn((Number(T.off) || 0) + f);
  }, Vn = id.map((f, R) => R === 0 ? [a(f[0]), ...f.slice(1)] : f), va = ["cdn", ...gs], ar = Tt.preferences.loadOutput({
    fontCount: Vn.length
  }).value;
  let or = Number(ar.themeSeed) >>> 0;
  d.patch({ ...Object.fromEntries(va.filter((f) => ar[f] != null).map((f) => [f, ar[f]])), lbold: ar.lbold ?? !0, lcenter: !!ar.centerFree });
  const Oi = () => {
    const f = Ii();
    T && !T.mc && T.lyricStyle ? (T.lyricStyle = f, Ir(T)) : Hn = f;
    const R = {};
    va.forEach((ee) => R[ee] = ee === "cdn" ? d.get("cdn") : Hn[ee]), R.lbold = Hn.lbold, R.centerFree = Hn.centerFree, R.themeSeed = Hn.themeSeed, R.fxv = 1, Tt.preferences.saveOutput(R).ok || Q("Browser storage is full or unavailable. Changes remain in this window only."), Bi();
  }, Ai = gs;
  function Ii() {
    const f = {
      version: 1,
      lbold: d.get("lbold"),
      centerFree: d.get("lcenter"),
      themeSeed: or
    };
    return Ai.forEach((R) => f[R] = d.get(R)), f;
  }
  let Hn = Ii();
  function ot(f) {
    return sd(f, Hn, {
      fontCount: Vn.length
    });
  }
  function Bi() {
    Y.ui.updateOBSSettingsState({
      songStyleEnabled: !!T && !T.mc,
      songStyleSaved: !!T && !T.mc && !!T.lyricStyle,
      songStyleTitle: T && !T.mc ? T.title : ""
    });
  }
  function lr(f) {
    const R = ot(f?.lyricStyle) || Hn;
    f?.lyricStyle?.lfx === "folia-cappella" && (f.lyricStyle = R, Ir(f)), d.patch({ ...Object.fromEntries(Ai.map((ee) => [ee, R[ee]])), lbold: R.lbold, lcenter: R.centerFree }), or = R.themeSeed, Yn(), sr(), Bi();
  }
  function ka(f) {
    const R = T;
    !R || R.mc || (ge(), f ? R.lyricStyle = Ii() : (delete R.lyricStyle, lr(null)), Ir(R), Bi(), Ht(), cn(), gt(), Q(f ? "Animation settings saved for this song. Further changes save automatically." : "This song now uses the shared animation settings."));
  }
  function Yn() {
    const f = d.get("lfx"), R = f === "karaoke-classic", ee = f === "jizura";
    Y.ui.updateOBSSettingsState({
      classic: R,
      jizura: ee,
      randomTitle: a(ee ? "Reroll the JIZURA lyric-motion style for the current song" : "Select JIZURA to randomize its lyric-motion style"),
      language: ManokaraI18n.language
    });
  }
  function Ao() {
    if (d.get("lfx") !== "jizura") return;
    ge();
    const f = new Uint32Array(1);
    try {
      crypto.getRandomValues(f), or = f[0];
    } catch {
      or = (Date.now() ^ Math.floor(Math.random() * 4294967295)) >>> 0;
    }
    Oi(), Ht(), cn(), gt(), Q("JIZURA lyric-motion style randomized. Click again to reroll.");
  }
  function sr() {
    let f = d.get("lshape");
    f === "auto" && (f = innerHeight > innerWidth * 1.1 ? "tall" : "wide");
    const R = d.get("lfx");
    let ee;
    R === "folia-monet" ? ee = "Monet keeps its original lyric-rail and portrait composition; alternating placement is not applied." : R === "folia-pendolo" ? ee = "Pendolo renders its clockwork layout as one scene, so Keep centre free is skipped." : R === "folia-claddagh" ? ee = "Claddagh already arranges lyrics around an open centre; its circular layout is preserved." : ["folia-fume", "folia-sonnet", "folia-tempera", "folia-lumiere", "folia-diorama"].includes(R) ? ee = "This effect combines lyrics and motion in one full-frame scene, so Keep centre free is skipped to preserve the full-frame effect." : ee = "Lyrics alternate around the open centre; the Folia background and full-frame effects stay in place.";
    const Z = d.get("lcenter");
    Y.ui.updateOBSSettingsState({
      centerFree: Z,
      shape: f,
      centerTitle: a(Z ? "The dotted area stays clear for a character." : "Enable to keep the dotted centre area clear."),
      centerHint: a(ee),
      language: ManokaraI18n.language
    });
  }
  sr();
  function ti(f) {
    ge(), f === "lclassiccolor" && d.set("ltheme", "effect"), Oi(), f === "lfx" && Yn(), ["lcenter", "lshape", "lfx"].includes(f) && sr(), Ht(), cn(), gt();
  }
  c.listen(window, "resize", sr), Yn();
  function un() {
    if (!me) {
      Q("Wait for the lyric relay to connect.");
      return;
    }
    const f = window.open(window.ManokaraSession.obsUrl(!0), "kpt-lyrics", "width=1280,height=720");
    Q(f ? "Green-screen window opened. It shares the OBS effect output." : "Popup blocked. Please allow popups.");
  }
  let Nt = null, jt = !1, ni = null;
  const Br = [];
  let zi = null, zr = 0;
  function ri() {
    const f = T, R = z(), ee = Zt(), Z = T ? ln() : A >= 0 ? A + 1 : 0;
    f || (zi = null), R && f && !f.mc && zi !== f && (zi = f, Br.push({
      song: f,
      title: String(f.title).slice(0, 160),
      index: zr++
    }), Br.length > 120 && Br.shift());
    const Re = Math.max(0, Math.floor(Math.max(0, ee) / 120) * 120);
    return JSON.stringify({
      now: f ? f.mc ? a("MC break") : String(f.title).slice(0, 160) : "",
      next: N[Z] ? N[Z].mc ? a("MC break") : String(N[Z].title).slice(0, 160) : "",
      videoId: f && !f.mc && We(f.url) || "",
      currentIndex: ee,
      nextIndex: Z < N.length ? Z : -1,
      status: f ? B.state.counting ? "counting" : B.state.paused ? "paused" : f.mc ? "mc" : R ? "playing" : "ready" : "ready",
      songs: N.slice(Re, Re + 120).map((Me, Ee) => ({
        title: String(Me.mc ? a("MC break") : Me.title).slice(0, 160),
        index: Ee + Re
      })),
      history: Br.filter((Me) => Me.song !== f).map(({
        title: Me,
        index: Ee
      }) => ({
        title: Me,
        index: Ee
      }))
    });
  }
  const ur = ManokaraCore.createLatencyEstimator(), cr = ManokaraAudio.create(l("#audioReaction"), l("#audioStatus"));
  let $n = null, wa = "";
  function cn() {
    const f = Ri.active ? Ht() : null;
    if (!(!me || Nt !== !0))
      try {
        const R = new URL(window.ManokaraSession.obsUrl(!1)).hash.slice(1), ee = "manokara-live-" + de + "-" + new URLSearchParams(R).get("view");
        ee !== wa && ($n?.close(), $n = new BroadcastChannel(ee), wa = ee), $n.postMessage({
          snapshot: f || Ht(),
          sentAt: Date.now()
        });
      } catch {
      }
  }
  c.interval(cn, 100);
  function dr(f, R = !0, ee = "") {
    const Z = l("#relayStatus");
    Z && (Z.dataset.state = f ? R ? "connected" : "inactive" : "error", f ? Z.textContent = a(R ? "OBS relay connected" : "OBS relay active · another window controls lyrics") : location.protocol === "file:" ? Z.innerHTML = u('OBS relay unavailable on file:// · <a href="http://localhost:8000/manokara.html">open server version</a>') : location.protocol === "https:" ? Z.textContent = a("Lyric relay unavailable · check deployment") + (ee ? " · " + String(a(String(ee))).replace(/[\r\n\x00-\x1f]/g, " ").slice(0, 120) : "") : Z.textContent = a("OBS relay unavailable · start the server"));
  }
  function Ht() {
    const f = T, R = d.get("lfc").trim().replace(/["<>]/g, ""), ee = R ? '"' + R + '"' : (Vn[+d.get("lfont")] || Vn[0])[1], Z = B.state.countdownRemaining, Re = Vn[+d.get("lfont")] || Vn[0], Me = d.get("lfx"), Ee = Me === "jizura" ? "" : R || Re[2] || "", wt = z(), pt = !B.state.counting && f && !f.mc ? q() : 0, en = pt + (f && !f.mc && !B.state.counting && f.off || 0), Yt = {
      writerId: V,
      ready: !0,
      title: f && !f.mc ? f.title : "",
      lrc: f && !f.mc ? ManokaraLyrics.displayLrc(f) : "",
      romajiLrc: f && !f.mc ? ManokaraLyrics.secondaryLrc(f) : "",
      time: en,
      sampledAt: Date.now(),
      timelineVersion: B.state.timelineVersion,
      playing: wt,
      paused: !!B.state.paused,
      counting: !!B.state.counting,
      countdownRemaining: Z,
      duration: f && !f.mc ? Ke(f) : 0,
      mc: !!(f && f.mc),
      memo: f && f.mc && f.memo || "",
      size: +d.get("lsz") || 64,
      foreground: Me === "karaoke-classic" ? d.get("lclassiccolor") : d.get("lcol"),
      themeSeed: or,
      background: d.get("lbgmode") === "green" ? "#00ff00" : "transparent",
      transparent: d.get("lbgmode") !== "green",
      bold: d.get("lbold"),
      font: ee,
      googleFont: Ee,
      effect: Me,
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
    if (!(c.disposed || c.suspended) && !(jt || !me || Nt === "inactive")) {
      jt = !0;
      try {
        const f = Ht();
        f.uploadDelayMs = ur.oneWay();
        const R = performance.now(), { partial: ee, packet: Z } = lp(f, ni), Re = new URL(je("/__lyric-state"));
        ee && Re.searchParams.set("patch", "1");
        const Me = await window.ManokaraSession.api(Re, Z, {
          signal: c.signal
        });
        if (Me.status === 428) {
          ni = null;
          return;
        }
        if (Me.status === 409) {
          Nt !== "inactive" && dr(!0, !1), Nt = "inactive";
          return;
        }
        if (!Me.ok) {
          const Ee = await Me.json().catch(() => ({}));
          throw Error(Ee.error || "Relay returned HTTP " + Me.status + ".");
        }
        await Me.json(), ni = f, ur.record(performance.now() - R), Nt !== !0 && dr(!0), Nt = !0;
      } catch (f) {
        if (c.disposed) return;
        Nt !== !1 && dr(!1, !0, f.message || "Network request failed."), Nt = !1;
      } finally {
        jt = !1;
      }
    }
  }
  async function Io() {
    try {
      await navigator.clipboard.writeText(Y.stores.obsSettings.getSnapshot().obsUrl), Q("OBS URL copied.");
    } catch {
      if (c.disposed) return;
      l("#obsurl")?.select(), Q("Select and copy the OBS URL.");
    }
  }
  async function ji() {
    try {
      await window.ManokaraSession.rotate(), Y.ui.updateOBSSettingsState({
        obsUrl: window.ManokaraSession.obsUrl(!1)
      }), window.ManokaraStudio.refresh(), Q("Previous OBS links revoked. Update both lyrics and playlist Browser Sources with their new URLs.");
    } catch (f) {
      Q(f.message);
    }
  }
  c.own(Y.commands.bind("obs", {
    settingChanged: ti,
    rememberSongStyle: ka,
    randomizeJizura: Ao,
    openLyricsWindow: un,
    copyUrl: Io,
    rotateLink: ji
  })), window.ManokaraObsActions = Y.commands.actions("obs"), c.interval(gt, 200), Ae.then(() => gt()).catch((f) => {
    c.disposed || c.suspended || (dr(!1, !0, f.message), Q(f.message));
  }), c.interval(() => {
    Nt === !0 && Ce("renew");
  }, 5e3);
  var Je;
  let Pn = "", On = -2, jr = 16, _r = [], _i = {
    primary: "Your words will find their place here.",
    secondary: "Add lyrics to a song to follow along."
  }, Di = "";
  function hr(f, R, ee = null, Z = "") {
    _r = Array.isArray(f) ? f : [], _i = ee, Di = Z;
    const Re = {
      lines: _r,
      active: R,
      empty: ee,
      info: Z,
      source: T && !T.mc && T.lyricSource || null,
      fontSize: jr,
      labels: xn()
    };
    Y.ui.updateLiveLyrics(Re);
  }
  function ii(f) {
    jr = Math.min(40, Math.max(11, jr + f)), hr(_r, On, _i, Di);
  }
  function Rt() {
    const f = T;
    if (!f || f.mc || !f.lrc) {
      const Ee = !!f && !f.mc, wt = Ee ? "empty:no-lyrics" : "empty:no-song";
      Pn !== wt && (Pn = wt, On = -1, hr([], -1, {
        primary: a(Ee ? "No lyrics for this song yet." : "Your words will find their place here."),
        secondary: a(Ee ? "Find or import lyrics in the song editor." : "Add lyrics to a song to follow along.")
      }));
      return;
    }
    const R = $e(f), ee = f._L.k;
    ee !== Pn && (Pn = ee, On = -2);
    const Z = B.state.counting ? -1 : q() + (f.off || 0);
    let Re = null;
    for (const Ee of R)
      if (Ee.t <= Z) Re = Ee;
      else break;
    const Me = Re ? f._L.all.indexOf(Re) : -1;
    Me !== On && (On = Me, hr(f._L.all, Me, null, f._L.timed ? "" : a("Plain text: scrolling is approximate. Press T on each line to time it.")));
  }
  c.interval(Rt, 150);
  function vn() {
    const f = T;
    if (!f || f.mc || !f.lrc) {
      Q("Play a song with lyrics first.");
      return;
    }
    const R = f.lrc.split(/\r?\n/), ee = R.findIndex((Ee) => Ee.replace(/\[[^\]]*\]/g, "").trim() && !/^\s*\[\d+:\d{2}/.test(Ee));
    if (ee < 0) {
      Q("All lines already have times.");
      return;
    }
    const Z = Math.max(0, q() + (f.off || 0)), Re = "[" + String(Math.floor(Z / 60)).padStart(2, "0") + ":" + (Z % 60).toFixed(2).padStart(5, "0") + "]", Me = ManokaraLyrics.validRomaji(f) ? f.romaji.lrc.split(/\r?\n/) : null;
    R[ee] = Re + R[ee].trim(), f.lrc = R.join(`
`), Me && (Me[ee] = Re + Me[ee].trim(), f.romaji = {
      source: f.lrc,
      lrc: Me.join(`
`)
    }), B.invalidateLyrics(), Ir(f), Rt(), Ht(), cn(), gt(), Q("Timed line " + (ee + 1) + ".");
  }
  c.own(Y.commands.bind("lyrics", {
    setMode: Or,
    font: ii,
    nudge: ya,
    resetSync() {
      Rn(0);
    },
    tap: vn
  })), window.ManokaraLyricsActions = Y.commands.actions("lyrics"), c.listen(document, "keydown", (f) => {
    ManokaraTour.active || !Kn.hidden || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(f.target.tagName) || f.ctrlKey || f.metaKey || f.altKey || (f.key === "t" || f.key === "T") && vn();
  });
  function kn() {
    Y.ui.updatePlayerPanelState({
      language: ManokaraI18n.language
    }), ft(), Kt(), G(), Yn(), sr(), sn(), tt(), ve(), G(), Y.ui.updateSongEditorView({
      title: a(S >= 0 ? "Edit song" : "Add a song"),
      saveLabel: a(S >= 0 ? "Save changes" : "Add to setlist"),
      editing: S >= 0
    }), T ? T.mc ? (Y.ui.updatePlayerPanelState({
      stageMode: "mc",
      stageTitle: a("MC break"),
      stageNote: T.memo || a("Take a moment between songs.")
    }), H(a("MC break"))) : !We(T.url) && !/\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(T.url) && Y.ui.updatePlayerPanelState({
      stageMode: "external",
      stageTitle: a("Open this link to play."),
      stageNote: a("This media opens in a new tab. Your lyric clock is running here."),
      stageUrl: T.url,
      stageLinkLabel: a("Open media")
    }) : (Y.ui.updatePlayerPanelState({
      stageMode: "empty",
      stageTitle: "",
      stageNote: "",
      stageUrl: ""
    }), H(a("Nothing playing yet"))), !T || T.mc || !T.lrc ? (Pn = "", Rt()) : T._L && hr(_r, On, null, T._L.timed ? "" : a("Plain text: scrolling is approximate. Press T on each line to time it.")), B.state.counting && (J({
      visible: !0,
      title: T.title,
      remaining: B.state.countdownRemaining
    }), ae(a("Starting in ") + Math.ceil(B.state.countdownRemaining) + " s")), Nt !== null ? dr(Nt === !0 || Nt === "inactive", Nt !== "inactive") : l("#relayStatus").textContent = a("Connecting to OBS…"), me || Y.ui.updateOBSSettingsState({
      obsUrl: a("Connecting…")
    }), Q(se);
  }
  c.listen(window, "manokara:languagechange", () => {
    ft(), ve(), X();
  }), ManokaraI18n.init(), ManokaraStudio.init({
    changed: () => gt(),
    url: (f) => me ? ManokaraSession.obsUrl(!1, f) : "",
    clearHistory() {
      Br.length = 0, zr = 0, gt();
    }
  }), c.listen(window, "manokara:languagechange", kn), kn(), ManokaraTour.init({
    showTab: g,
    showMain: ManokaraStudio.showMain,
    main: () => ManokaraStudio.main
  }), c.own(Y.commands.bind("youtubeSearch", {
    search: async ({
      query: f,
      karaoke: R,
      signal: ee
    }) => (await Ae, window.ManokaraSession.api(je("/__youtube/search"), {
      query: f,
      karaoke: R
    }, {
      signal: ee
    }))
  })), window.ManokaraYoutubeSearchService = Y.commands.actions("youtubeSearch").search;
  function Dr(f) {
    const R = l("#panel-song");
    return We(p.get("url").trim()) === f.id ? (g("song"), R.scrollTop = 0, l(".field-grid").scrollIntoView({
      block: "nearest",
      behavior: "instant"
    }), l("#ttl").focus({
      preventScroll: !0
    }), !0) : (S >= 0 || ["url", "ttl", "st", "en", "llrc", "romajiLrc"].some((Z) => p.get(Z).trim())) && !confirm(a("Replace the current song draft with this video? Unsaved edits will be discarded.")) ? !1 : (zt(), p.set("url", "https://www.youtube.com/watch?v=" + f.id), p.set("ttl", f.title), p.set("lq", f.title.replace(/\s*[\(\[【].*$/, "")), Je = f.duration ?? void 0, W = f.duration ?? void 0, g("song"), R.scrollTop = 0, l(".field-grid").scrollIntoView({
      block: "nearest",
      behavior: "instant"
    }), l("#ttl").focus({
      preventScroll: !0
    }), Q("Video selected. Find lyrics if you like, then Add to setlist."), !0);
  }
  c.own(Y.commands.bind("youtube", {
    choose: Dr
  })), window.ManokaraYoutubeActions = Y.commands.actions("youtube");
  function fr({
    navigation: f = !1
  } = {}) {
    c.disposed || (Ce("release"), B.dispose({
      preserveCapture: f
    }), c.dispose(), $n?.close(), $n = null, Tt.library.close(), cr.dispose?.(), window.removeEventListener("pagehide", wn), window.removeEventListener("pageshow", Sa));
  }
  function wn(f) {
    f.persisted ? (B.suspend(), cr.stop?.(), Ht(), cn(), gt(), c.suspend(), $n?.close(), $n = null) : fr({
      navigation: !0
    });
  }
  function Sa(f) {
    !f.persisted || c.disposed || (c.resume(), B.resume(), ni = null, ge(), Ht(), cn(), gt());
  }
  return window.addEventListener("pagehide", wn), window.addEventListener("pageshow", Sa), window.ManokaraController = {
    dispose: fr,
    start: () => B.start(),
    get active() {
      return !c.disposed;
    },
    getSnapshot: () => B.getSnapshot(),
    diagnostics: () => ({
      timers: c.timerCount,
      activeTimers: c.activeTimerCount,
      listeners: c.cleanupCount,
      playback: B.getSnapshot()
    })
  }, B.start(), window.ManokaraController;
}
const Ve = s.createElement;
function up({
  results: a,
  active: u,
  onSelect: l
}) {
  const c = (p) => {
    if (!Number.isFinite(p) || p <= 0) return "";
    const d = Math.floor(p), g = Math.floor(d / 3600), v = Math.floor(d / 60) % 60, h = d % 60;
    return `${g ? `${g}:` : ""}${g ? String(v).padStart(2, "0") : v}:${String(h).padStart(2, "0")}`;
  };
  return Ve(s.Fragment, null, a.map((p, d) => {
    const g = c(p.duration);
    return Ve("div", {
      key: p.id,
      className: "youtube-result",
      id: `youtube-result-${d}`,
      tabIndex: -1,
      role: "option",
      "aria-selected": d === u,
      "aria-label": p.title + (p.channel ? ` — ${p.channel}` : "") + (g ? ` · ${g}` : ""),
      onMouseDown: (v) => {
        v.button === 0 && v.preventDefault();
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
    }), g && Ve("span", null, g)), Ve("div", {
      className: "youtube-result-copy"
    }, Ve("strong", null, p.title), Ve("small", null, p.channel || "YouTube")), Ve("span", {
      className: "youtube-select",
      "aria-hidden": "true"
    }, "↗"));
  }));
}
function cp() {
  const [a, u] = _e.useState(""), [l, c] = _e.useState(() => Tt.preferences.get("preferKaraoke") !== "false"), [p, d] = _e.useState(!1), [g, v] = _e.useState([]), [h, C] = _e.useState(-1), [N, T] = _e.useState("idle"), [x, A] = _e.useState(""), [S, w] = _e.useState(!1), [b, L] = _e.useState(480), [I, W] = _e.useState(() => window.ManokaraI18n?.language || "en"), B = _e.useRef(null), z = _e.useRef(null), q = _e.useRef(null), J = _e.useRef(null), te = _e.useRef(0), X = _e.useRef(null), H = _e.useRef(0), ae = _e.useRef(""), G = _e.useRef(""), K = _e.useRef(!1), $ = _e.useRef(null), re = _e.useRef(null), se = _e.useRef(/* @__PURE__ */ new Map()), Q = (V) => window.ManokaraI18n?.text(V) || V, y = a.trim().replace(/\s+/g, " "), O = `${y}|${l}`;
  function _() {
    const V = q.current;
    if (!V || !p) return;
    const de = V.getBoundingClientRect().top;
    L(Math.max(120, Math.min(480, innerHeight - de - 12)));
  }
  function k() {
    clearTimeout(te.current), H.current++, X.current?.abort(), X.current = null, ae.current = "";
  }
  function F() {
    k(), d(!1), C(-1), N === "loading" && T("idle");
  }
  $.current = F, re.current = _;
  function ce(V) {
    k(), u(V), v([]), C(-1), G.current = "", T("idle"), A(""), d(!0);
  }
  async function ke(V = y, de = l) {
    if (K.current) return;
    const me = V.trim().replace(/\s+/g, " "), Ae = `${me}|${de}`;
    if (!me) {
      d(!0), T("idle");
      return;
    }
    if (ae.current === Ae) {
      d(!0);
      return;
    }
    k();
    const je = H.current;
    v([]), C(-1), G.current = "", A("");
    const Ce = se.current.get(Ae);
    if (Ce && Ce.expires > Date.now()) {
      v(Ce.results), G.current = Ae, T(Ce.results.length ? "results" : "empty"), d(!0);
      return;
    }
    const pe = new AbortController();
    X.current = pe, ae.current = Ae, T("loading"), d(!0);
    try {
      const Oe = Y.commands.actions("youtubeSearch").search;
      if (!Oe) throw new Error("YouTube search is not ready yet.");
      const ge = await Oe({
        query: me,
        karaoke: de,
        signal: pe.signal
      }), Ke = await ge.json();
      if (je !== H.current || pe.signal.aborted) return;
      if (!ge.ok) throw Error(ge.status === 404 ? "Restart the updated server to enable YouTube search." : Ke.error || "YouTube search is temporarily unavailable. Try again or search on YouTube.");
      if (!Array.isArray(Ke.results)) throw Error("YouTube search is temporarily unavailable. Try again or search on YouTube.");
      const $e = Ke.results.filter((We) => We && typeof We.id == "string" && /^[A-Za-z0-9_-]{11}$/.test(We.id) && typeof We.title == "string").slice(0, 8).map((We) => ({
        id: We.id,
        title: We.title.slice(0, 512),
        channel: typeof We.channel == "string" ? We.channel.slice(0, 160) : "",
        duration: typeof We.duration == "number" ? We.duration : null
      }));
      for (se.current.delete(Ae), se.current.set(Ae, {
        results: $e,
        expires: Date.now() + 12e4
      }); se.current.size > 30; ) se.current.delete(se.current.keys().next().value);
      G.current = Ae, v($e), T($e.length ? "results" : "empty");
    } catch (Oe) {
      if (je !== H.current || pe.signal.aborted) return;
      T("error"), A(Oe.name === "TimeoutError" ? "YouTube search took too long. Try again." : Oe.name === "TypeError" ? "Could not connect. Check your connection and try again." : Oe.message || "YouTube search is temporarily unavailable. Try again or search on YouTube."), v([]), C(-1);
    } finally {
      je === H.current && (X.current = null, ae.current = "");
    }
  }
  function ve(V) {
    const de = g[V];
    de && (Y.commands.actions("youtube")?.choose(de) !== !1 ? F() : z.current?.focus({
      preventScroll: !0
    }));
  }
  function Ie(V) {
    if (!g.length) return;
    const de = (V + g.length) % g.length;
    C(de), requestAnimationFrame(() => J.current?.querySelector(`#youtube-result-${de}`)?.scrollIntoView({
      block: "nearest",
      inline: "nearest"
    }));
  }
  function Ne(V) {
    K.current || V.isComposing || (V.key === "Escape" && p ? (V.preventDefault(), V.stopPropagation(), F()) : V.key === "ArrowDown" || V.key === "ArrowUp" ? (V.preventDefault(), d(!0), g.length ? Ie(h < 0 ? V.key === "ArrowDown" ? 0 : g.length - 1 : h + (V.key === "ArrowDown" ? 1 : -1)) : y.length >= 2 && ke()) : V.key === "Enter" && p && h >= 0 && (V.preventDefault(), ve(h)));
  }
  _e.useEffect(() => {
    if (!(!p || S || y.length < 2 || G.current === O || N === "loading"))
      return te.current = setTimeout(() => ke(y, l), 850), () => clearTimeout(te.current);
  }, [p, y, l, N, S]), _e.useEffect(() => {
    const V = () => W(window.ManokaraI18n?.language || "en"), de = (Ae) => {
      B.current?.contains(Ae.target) || $.current?.();
    }, me = () => re.current?.();
    return window.addEventListener("manokara:languagechange", V), window.addEventListener("resize", me), document.addEventListener("pointerdown", de, !0), () => {
      window.removeEventListener("manokara:languagechange", V), window.removeEventListener("resize", me), document.removeEventListener("pointerdown", de, !0), k();
    };
  }, []), _e.useLayoutEffect(() => {
    p && _();
  }, [p, I]);
  const fe = {
    idle: "Type a song or artist. Search starts after 2 characters.",
    loading: "Searching YouTube…",
    results: "Choose a video to fill the song editor.",
    empty: "No matching videos. Try another name."
  }, Pe = Q(N === "error" ? x : fe[N] || fe.idle), be = y || "karaoke", Fe = l && !/karaoke|カラオケ/i.test(be) ? `${be} karaoke` : be, xt = `https://www.youtube.com/results?search_query=${encodeURIComponent(Fe)}`;
  return /* @__PURE__ */ s.createElement("div", { className: "header-search", ref: B, role: "search", "aria-label": Q("Find music on YouTube") }, /* @__PURE__ */ s.createElement("form", { id: "musicSearchForm", className: "music-search-form", onSubmit: (V) => {
    V.preventDefault(), ke();
  } }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#magnifying-glass" })), /* @__PURE__ */ s.createElement("input", { ref: z, id: "musicSearch", type: "search", maxLength: 160, placeholder: Q("Find a song on YouTube…"), "aria-label": Q("Find a song on YouTube"), role: "combobox", "aria-autocomplete": "list", "aria-expanded": p, "aria-activedescendant": h >= 0 ? `youtube-result-${h}` : void 0, "aria-controls": "youtubeResults", autoComplete: "off", spellCheck: !1, value: a, onChange: (V) => ce(V.target.value), onFocus: () => d(!0), onKeyDown: Ne, onCompositionStart: () => {
    K.current = !0, w(!0), k();
  }, onCompositionEnd: (V) => {
    K.current = !1, w(!1), ce(V.currentTarget.value);
  } }), /* @__PURE__ */ s.createElement("label", { className: "karaoke-search-toggle", title: Q("Prefer karaoke versions") }, /* @__PURE__ */ s.createElement("input", { type: "checkbox", checked: l, onChange: (V) => {
    const de = V.target.checked;
    c(de), Tt.preferences.set("preferKaraoke", String(de)), ce(a), z.current?.focus({
      preventScroll: !0
    });
  } }), /* @__PURE__ */ s.createElement("span", null, Q("Karaoke"))), /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", type: "submit", "aria-label": Q("Search YouTube"), title: Q("Search YouTube") }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#caret-right" })))), /* @__PURE__ */ s.createElement("div", { ref: q, id: "musicSearchMenu", className: "music-search-menu", hidden: !p, style: {
    maxHeight: b
  }, onBlurCapture: () => setTimeout(() => {
    B.current?.contains(document.activeElement) || F();
  }, 0) }, /* @__PURE__ */ s.createElement("div", { className: "music-search-heading" }, /* @__PURE__ */ s.createElement("span", { id: "musicSearchStatus", role: "status", "aria-live": "polite" }, Pe), /* @__PURE__ */ s.createElement("button", { className: "ghost icon-button", type: "button", "aria-label": Q("Close search results"), title: Q("Close search results"), onClick: () => {
    z.current?.focus({
      preventScroll: !0
    }), F();
  } }, /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#x" })))), /* @__PURE__ */ s.createElement("div", { ref: J, id: "youtubeResults", className: "youtube-results", role: "listbox", "aria-label": Q("YouTube search results"), "aria-busy": N === "loading" }, /* @__PURE__ */ s.createElement(up, { results: g, active: h, onSelect: ve })), /* @__PURE__ */ s.createElement("div", { className: "music-search-footer" }, /* @__PURE__ */ s.createElement("small", null, "↑ ↓ ", Q("to choose"), " · Enter ", Q("to select")), /* @__PURE__ */ s.createElement("a", { href: xt, target: "_blank", rel: "noopener noreferrer" }, Q("Search on YouTube"), /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#arrow-up-right" }))))));
}
function dp({
  state: a
}) {
  const u = (l) => () => Y.commands.actions("tour")?.[l]?.();
  return /* @__PURE__ */ s.createElement("div", { className: "tour-overlay", hidden: !a.open }, /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-mask" }), /* @__PURE__ */ s.createElement("div", { className: "tour-spotlight", "aria-hidden": "true" }), /* @__PURE__ */ s.createElement("section", { className: "tour-card", role: "dialog", "aria-modal": "true", "aria-labelledby": "tourTitle", "aria-describedby": "tourBody" }, /* @__PURE__ */ s.createElement("div", { className: "tour-top" }, /* @__PURE__ */ s.createElement("span", { className: "tour-eyebrow" }, a.eyebrow), /* @__PURE__ */ s.createElement("select", { value: a.language, "aria-label": a.languageLabel, onChange: (l) => Y.commands.actions("tour")?.setLanguage(l.target.value) }, /* @__PURE__ */ s.createElement("option", { value: "vi" }, "Tiếng Việt"), /* @__PURE__ */ s.createElement("option", { value: "en" }, "English")), /* @__PURE__ */ s.createElement("button", { className: "ghost tour-close", type: "button", "data-tour": "close", "aria-label": a.closeLabel, title: a.closeLabel, onClick: u("close") }, "×")), /* @__PURE__ */ s.createElement("p", { className: "tour-progress", "aria-live": "polite" }, a.progress), /* @__PURE__ */ s.createElement("h2", { id: "tourTitle" }, a.title), /* @__PURE__ */ s.createElement("p", { id: "tourBody" }, a.body), /* @__PURE__ */ s.createElement("div", { className: "tour-track", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("div", { className: "tour-meter", style: {
    width: `${a.meter}%`
  } })), /* @__PURE__ */ s.createElement("div", { className: "tour-actions" }, /* @__PURE__ */ s.createElement("button", { className: "ghost", type: "button", "data-tour": "skip", onClick: u("close") }, a.skipLabel), /* @__PURE__ */ s.createElement("div", null, /* @__PURE__ */ s.createElement("button", { className: "s", type: "button", "data-tour": "back", disabled: a.backDisabled, onClick: u("back") }, a.backLabel), /* @__PURE__ */ s.createElement("button", { type: "button", "data-tour": "next", onClick: u("next") }, a.nextLabel)))));
}
function hp() {
  const [a, u] = _e.useState(() => window.ManokaraI18n?.language || "en"), l = (c) => Ve("svg", {
    className: "icon",
    "aria-hidden": "true"
  }, Ve("use", {
    href: `./manokara-icons.svg#${c}`
  }));
  return _e.useEffect(() => {
    const c = () => u(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:languagechange", c), () => window.removeEventListener("manokara:languagechange", c);
  }, []), Ve("div", {
    className: "app-header-react-grid"
  }, Ve("div", {
    className: "brand"
  }, Ve("div", {
    className: "brand-mark"
  }, l("cactus")), Ve("h1", null, "manokara")), Ve(cp), Ve("div", {
    className: "header-actions"
  }, Ve("label", {
    className: "language-control"
  }, Ve("select", {
    id: "language",
    "aria-label": "Interface language",
    value: a,
    onChange: (c) => window.ManokaraI18n?.setLanguage(c.target.value)
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
    onClick: () => Y.commands.actions("dialog")?.openTranspose()
  }, l("sliders-horizontal"), Ve("span", null, "Key")), Ve("button", {
    className: "s",
    id: "theme",
    type: "button",
    title: "Switch between light and dark theme",
    "aria-label": "Switch color theme",
    onClick: () => {
      const c = document.documentElement, p = c.dataset.theme || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
      c.dataset.theme = p === "dark" ? "light" : "dark", Tt.preferences.set("theme", c.dataset.theme);
    }
  }, l("circle-half"), Ve("span", null, "Theme"))));
}
function fp() {
  const [a, u] = _e.useState(() => window.ManokaraI18n?.language || "en");
  _e.useEffect(() => {
    const c = () => u(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:languagechange", c), () => window.removeEventListener("manokara:languagechange", c);
  }, []);
  const l = (c) => window.ManokaraI18n?.text(c) || c;
  return /* @__PURE__ */ s.createElement(s.Fragment, null, /* @__PURE__ */ s.createElement("span", { lang: a }, l("Sing your way. Your setlist, your room.")), /* @__PURE__ */ s.createElement("details", { lang: a }, /* @__PURE__ */ s.createElement("summary", null, l("Credits & licenses"), /* @__PURE__ */ s.createElement("svg", { className: "icon", "aria-hidden": "true" }, /* @__PURE__ */ s.createElement("use", { href: "./manokara-icons.svg#caret-right" }))), /* @__PURE__ */ s.createElement("div", { className: "credits-links" }, /* @__PURE__ */ s.createElement("a", { href: "/sources/FOLIA-MAJOR-NOTICE.txt" }, l("Folia notices")), /* @__PURE__ */ s.createElement("a", { href: "/sources/FOLIA-MAJOR-SOURCE.zip" }, l("Folia source")), /* @__PURE__ */ s.createElement("a", { href: "/sources/FOLIA-INTEGRATION-SOURCE/manokara-folia.tsx" }, l("Integration source")), /* @__PURE__ */ s.createElement("a", { href: "/sources/JIZURA-LICENSE.txt" }, l("JIZURA license")), /* @__PURE__ */ s.createElement("a", { href: "/romaji-assets/NOTICES.txt" }, l("Romaji notices")), /* @__PURE__ */ s.createElement("a", { href: "/ui-assets/NOTICES.txt" }, l("Interface fonts & icons")))));
}
function pp() {
  return /* @__PURE__ */ s.createElement("main", { id: "grid", tabIndex: -1, role: "tabpanel", "aria-labelledby": "main-karaoke" }, /* @__PURE__ */ s.createElement("aside", { className: "card", id: "setlistSide", "aria-labelledby": "setlistTitle" }), /* @__PURE__ */ s.createElement("div", { id: "maincol" }, /* @__PURE__ */ s.createElement("div", { id: "playerReactRoot" })), /* @__PURE__ */ s.createElement("section", { className: "card", id: "workspace", "aria-label": "OBS output settings" }, /* @__PURE__ */ s.createElement("div", { id: "obsSettingsReactRoot" })), /* @__PURE__ */ s.createElement("aside", { className: "card", id: "side", "aria-labelledby": "lyricsTitle" }));
}
function mp() {
  const [a, u] = _e.useState(() => window.ManokaraStudio?.view || {
    target: "playlist",
    selected: "current"
  });
  _e.useLayoutEffect(() => {
    const h = (C) => u(C.detail || window.ManokaraStudio?.view || {
      target: "playlist",
      selected: "current"
    });
    return window.addEventListener("manokara:studioviewchange", h), () => window.removeEventListener("manokara:studioviewchange", h);
  }, []);
  const l = (h) => window.ManokaraStudio?.text?.(h) || window.ManokaraI18n?.text(h) || h, c = (h) => /* @__PURE__ */ s.createElement("span", { "data-studio-copy": h }, l(h)), p = (h, C) => /* @__PURE__ */ s.createElement("option", { key: h, value: h, "data-studio-copy": C }, l(C)), d = (h, C, N = "text", T = {}) => /* @__PURE__ */ s.createElement("label", { className: "field", key: C }, /* @__PURE__ */ s.createElement("span", { "data-studio-copy": h }, l(h)), /* @__PURE__ */ s.createElement("input", { id: C, type: N, ...T })), g = {
    glass: "Broadcast dashboard",
    paper: "A paper setlist",
    minimal: "Let the type speak",
    card: "Artwork in the spotlight",
    vinyl: "At the turntable",
    signal: "A compact lower third"
  }, v = window.ManokaraOverlay?.themes || ["glass", "paper", "minimal", "card", "vinyl", "signal"];
  return /* @__PURE__ */ s.createElement("div", { className: "studio-react-shell" }, /* @__PURE__ */ s.createElement("div", { id: "studioPresets", className: "studio-presets", role: "group", "aria-label": "Playlist presets" }, v.map((h) => /* @__PURE__ */ s.createElement("button", { key: h, className: "studio-preset", "data-theme-preset": h }, /* @__PURE__ */ s.createElement("span", { className: `preset-art ${h}`, "data-theme-preview": h, "aria-hidden": "true" }), /* @__PURE__ */ s.createElement("span", { className: "preset-name", "data-studio-copy": h[0].toUpperCase() + h.slice(1) }, l(h[0].toUpperCase() + h.slice(1))), /* @__PURE__ */ s.createElement("small", { className: "preset-description", "data-studio-copy": g[h] }, l(g[h]))))), /* @__PURE__ */ s.createElement("div", { className: "studio-body" }, /* @__PURE__ */ s.createElement("section", { className: "card studio-preview-pane", "aria-labelledby": "studioPreviewTitle" }, /* @__PURE__ */ s.createElement("div", { className: "studio-preview-toolbar" }, /* @__PURE__ */ s.createElement("h3", { id: "studioPreviewTitle" }, c("Live preview")), /* @__PURE__ */ s.createElement("div", { className: "row" }, /* @__PURE__ */ s.createElement("select", { id: "studioData", "aria-label": "Preview data" }, p("sample", "Sample data"), p("live", "Live data")), /* @__PURE__ */ s.createElement("select", { id: "studioBgView", "aria-label": "Preview background" }, p("checker", "Checkerboard"), p("dark", "Dark"), p("light", "Light"), p("scene", "Scene guide")), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioBoth", type: "checkbox" }), c("Both overlays"))), /* @__PURE__ */ s.createElement("div", { className: "studio-history-tools" }, /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "expand", "aria-haspopup": "dialog", "aria-expanded": "false" }, c("View larger")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "undo" }, c("Undo")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "redo" }, c("Redo")), /* @__PURE__ */ s.createElement("button", { className: "ghost", "data-action": "reset" }, c("Reset layout")))), /* @__PURE__ */ s.createElement("div", { className: "studio-preview-space" }, /* @__PURE__ */ s.createElement("div", { id: "studioPreview", className: "studio-preview", "data-bg": "checker" }, /* @__PURE__ */ s.createElement("div", { id: "studioCanvas" }), /* @__PURE__ */ s.createElement("div", { id: "studioEmpty", className: "studio-empty", role: "status", hidden: !0 })), /* @__PURE__ */ s.createElement("span", { id: "studioFrameBadge", className: "studio-frame-badge" })), /* @__PURE__ */ s.createElement("small", { className: "studio-source-note" }, c("Drag blocks to move; resize with handles. Arrow keys nudge or resize. Preview background is local; OBS remains transparent.")), /* @__PURE__ */ s.createElement("div", { className: "studio-link" }, /* @__PURE__ */ s.createElement("input", { id: "studioObsUrl", readOnly: !0, "aria-label": "Overlay OBS URL" }), /* @__PURE__ */ s.createElement("button", { "data-action": "copy" }, c("Copy OBS link")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "open" }, c("Open output"))), /* @__PURE__ */ s.createElement("small", { className: "studio-source-note" }, /* @__PURE__ */ s.createElement("b", { id: "studioSourceSize" }), " · ", c("Use these dimensions for both OBS Browser Sources. Keep this page open while singing.")), /* @__PURE__ */ s.createElement("div", { id: "studioStatus", className: "studio-status", role: "status" })), /* @__PURE__ */ s.createElement("aside", { className: "card studio-controls", "aria-label": "Overlay settings" }, /* @__PURE__ */ s.createElement("details", { className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Output frame")), /* @__PURE__ */ s.createElement("small", null, c("Canvas dimensions"))), /* @__PURE__ */ s.createElement("label", { className: "field" }, c("Frame size"), /* @__PURE__ */ s.createElement("select", { id: "studioFrame" }, p("1920x1080", "Landscape 1080p"), p("1280x720", "Landscape 720p"), p("1080x1920", "Portrait")))), /* @__PURE__ */ s.createElement("details", { id: "studioLyricSettings", className: "studio-section studio-accordion", hidden: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Lyrics appearance")), /* @__PURE__ */ s.createElement("small", null, c("Settings here are shared with Karaoke → OBS output."))), /* @__PURE__ */ s.createElement("div", { id: "studioLyricControlHost" })), /* @__PURE__ */ s.createElement("details", { id: "studioLayoutSection", className: "studio-section studio-accordion" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Layout")), /* @__PURE__ */ s.createElement("small", null, c("Panel structure"))), /* @__PURE__ */ s.createElement("label", { className: "field" }, c("Layout mode"), /* @__PURE__ */ s.createElement("select", { id: "studioLayout" }, p("separate", "Separate blocks"), p("unified", "One unified panel"))), /* @__PURE__ */ s.createElement("small", { id: "studioGroupNote" }, c("Move and resize the whole panel. Select a section below to edit its text."))), /* @__PURE__ */ s.createElement("details", { id: "studioBlockSection", className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Blocks")), /* @__PURE__ */ s.createElement("small", null, c("Choose what to edit"))), /* @__PURE__ */ s.createElement("div", { id: "studioBlocks", className: `studio-blocks${a.target === "lyrics" ? " studio-blocks-single" : ""}`, role: "group", "aria-label": l("Blocks") }, (a.target === "lyrics" ? ["lyric"] : ["current", "list", "next"]).map((h) => {
    const C = {
      current: "Now Singing",
      list: "Song List",
      next: "Next On",
      lyric: "Lyric viewport"
    };
    return /* @__PURE__ */ s.createElement("button", { key: h, className: "s", type: "button", "data-select": h, "aria-pressed": a.selected === h }, l(C[h]));
  })), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioVisible", type: "checkbox" }), c("Show this block"))), /* @__PURE__ */ s.createElement("details", { id: "studioGeometry", className: "studio-section studio-accordion", open: !0 }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Position & size")), /* @__PURE__ */ s.createElement("small", null, c("Drag on preview or enter values"))), /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("X", "studioX", "number", {
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
  })), /* @__PURE__ */ s.createElement("label", { className: "inline-check studio-aspect-lock" }, /* @__PURE__ */ s.createElement("input", { id: "studioAspectLock", type: "checkbox" }), c("Keep aspect ratio"), /* @__PURE__ */ s.createElement("small", { id: "studioAspectRatio" })), /* @__PURE__ */ s.createElement("div", { className: "studio-position-actions" }, /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "top-center" }, c("Top center")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "center" }, c("Center block")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "bottom-center" }, c("Bottom center"))), /* @__PURE__ */ s.createElement("div", { id: "studioCompactSettings" }, /* @__PURE__ */ s.createElement("label", { id: "studioAutoFitField", className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioAutoFit", type: "checkbox" }), c("Fit frame to lyrics")), /* @__PURE__ */ s.createElement("small", { id: "studioAutoFitNote" }, c("Fits the longest lines in this song. Manual position or size edits turn this off.")), /* @__PURE__ */ s.createElement("small", null, c("Text effects use a compact frame. Scene effects and Keep centre free use the full lyric viewport.")))), /* @__PURE__ */ s.createElement("details", { id: "blockTypography", className: "studio-section studio-accordion" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Typography")), /* @__PURE__ */ s.createElement("small", null, c("Text style"))), d("Heading", "studioLabel", "text", {
    maxLength: 80
  }), /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("Text size", "studioSize", "number", {
    min: 12,
    max: 96
  }), /* @__PURE__ */ s.createElement("label", { className: "field" }, c("Alignment"), /* @__PURE__ */ s.createElement("select", { id: "studioAlign" }, p("left", "Left"), p("center", "Center"), p("right", "Right")))), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioBold", type: "checkbox" }), c("Bold"))), /* @__PURE__ */ s.createElement("details", { id: "playlistAppearance", className: "studio-section studio-accordion" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Appearance")), /* @__PURE__ */ s.createElement("small", null, c("Colors and song list"))), /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("Text", "studioFg", "color"), d("Accent", "studioAccent", "color"), d("Panel", "studioBg", "color"), d("Panel opacity", "studioOpacity", "number", {
    min: 0,
    max: 1,
    step: 0.05
  }), d("Corner radius", "studioRadius", "number", {
    min: 0,
    max: 80
  }), /* @__PURE__ */ s.createElement("label", { className: "field" }, c("Font"), /* @__PURE__ */ s.createElement("select", { id: "studioFont" }, p("system", "System"), p("geist", "Geist"), p("serif", "Serif"), p("mono", "Mono")))), /* @__PURE__ */ s.createElement("label", { className: "field" }, c("List content"), /* @__PURE__ */ s.createElement("select", { id: "studioListMode" }, p("all", "Whole setlist"), p("upcoming", "Upcoming songs"), p("history", "Sung history"))), d("Static list limit", "studioLimit", "number", {
    min: 1,
    max: 20
  }), /* @__PURE__ */ s.createElement("label", { id: "studioAutoScrollField", className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioAutoScroll", type: "checkbox" }), c("Auto-scroll song list")), /* @__PURE__ */ s.createElement("div", { id: "studioScrollSettings" }, /* @__PURE__ */ s.createElement("div", { className: "studio-fields" }, d("Scroll speed (px/s)", "studioScrollSpeed", "number", {
    min: 8,
    max: 80,
    step: 1
  }), d("Pause at each end (s)", "studioScrollPause", "number", {
    min: 0,
    max: 10,
    step: 0.5
  })), /* @__PURE__ */ s.createElement("small", null, c("Auto-scroll shows the whole list. Short lists stay still."))), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioNumbering", type: "checkbox" }), c("Show numbers")), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioProgress", type: "checkbox" }), c("Show progress")), /* @__PURE__ */ s.createElement("label", { className: "inline-check" }, /* @__PURE__ */ s.createElement("input", { id: "studioHideIdle", type: "checkbox" }), c("Hide when idle")), /* @__PURE__ */ s.createElement("button", { className: "ghost", "data-action": "history" }, c("Clear sung history"))), /* @__PURE__ */ s.createElement("details", { className: "studio-section studio-accordion studio-export" }, /* @__PURE__ */ s.createElement("summary", null, /* @__PURE__ */ s.createElement("span", null, c("Layout files")), /* @__PURE__ */ s.createElement("small", null, c("Save or restore a layout"))), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "export" }, c("Export layout")), /* @__PURE__ */ s.createElement("button", { className: "s", "data-action": "import" }, c("Import layout")), /* @__PURE__ */ s.createElement("input", { id: "studioImport", type: "file", accept: ".json,application/json", hidden: !0 })))));
}
function gp() {
  return /* @__PURE__ */ s.createElement(mp, null);
}
function yp() {
  const [a, u] = _e.useState(() => window.ManokaraStudio?.view?.target || "playlist"), [l, c] = _e.useState(() => window.ManokaraI18n?.language || "en"), p = l === "vi" ? {
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
    const v = (C) => u(C.detail === "lyrics" ? "lyrics" : "playlist"), h = () => c(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:overlaytargetchange", v), window.addEventListener("manokara:languagechange", h), () => {
      window.removeEventListener("manokara:overlaytargetchange", v), window.removeEventListener("manokara:languagechange", h);
    };
  }, []);
  const d = (v) => window.ManokaraStudio?.showTarget(v), g = (v) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(v.key)) return;
    v.preventDefault();
    const h = v.key === "Home" || v.key === "ArrowLeft" && a === "lyrics" ? "playlist" : v.key === "End" || v.key === "ArrowRight" && a === "playlist" ? "lyrics" : a;
    d(h), v.currentTarget.querySelector(`[data-overlay-tab="${h}"]`)?.focus();
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
    onKeyDown: g
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
function vp() {
  const [a, u] = _e.useState(() => window.ManokaraStudio?.main || "karaoke"), [l, c] = _e.useState(() => window.ManokaraI18n?.language || "en"), p = l === "vi" ? {
    karaoke: "Karaoke",
    overlay: "Overlay",
    name: "Không gian làm việc chính"
  } : {
    karaoke: "Karaoke",
    overlay: "Overlay",
    name: "Main workspace"
  };
  s.useEffect(() => {
    const v = (C) => u(C.detail === "playlist" ? "playlist" : "karaoke"), h = () => c(window.ManokaraI18n?.language || "en");
    return window.addEventListener("manokara:mainviewchange", v), window.addEventListener("manokara:languagechange", h), () => {
      window.removeEventListener("manokara:mainviewchange", v), window.removeEventListener("manokara:languagechange", h);
    };
  }, []);
  const d = (v) => window.ManokaraStudio?.showMain(v), g = (v) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(v.key)) return;
    v.preventDefault();
    const h = v.key === "Home" || v.key === "ArrowLeft" && a === "playlist" ? "karaoke" : v.key === "End" || v.key === "ArrowRight" && a === "karaoke" ? "playlist" : a;
    d(h), v.currentTarget.querySelector(`[data-main-tab="${h}"]`)?.focus();
  };
  return Ve("div", {
    className: "main-tabs-control",
    role: "tablist",
    "aria-label": p.name,
    onKeyDown: g
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
function Mn({
  name: a,
  component: u,
  shape: l
}) {
  const c = No(a);
  return kt(u, l === "state" ? {
    state: c
  } : l === "view" ? {
    view: c
  } : c);
}
const kp = Y.ui.updatePlayerPanelState, wp = Y.ui.updateOBSSettingsState, Sp = Y.ui.updateSongEditorView, bp = Y.ui.setTransposeOpen, Ep = Y.ui.updateTransposeState, Tp = Y.ui.updateLibrary;
function cd(a) {
  Ct("mountLibrary", a, kt(Mn, {
    name: "library",
    component: Tf,
    shape: "spread"
  }));
}
function dd(a) {
  Ct("mountStudioHeader", a, kt(yp));
}
function hd(a) {
  Ct("mountMainTabs", a, kt(vp));
}
const Cp = Y.ui.updateSetlist;
function fd(a) {
  Ct("mountSetlist", a, kt(Mn, {
    name: "setlist",
    component: Lf,
    shape: "spread"
  }));
}
const Lp = Y.ui.updateLyricSearchResults;
function pd(a) {
  Ct("mountLyricSearchResults", a, kt(Mn, {
    name: "lyricSearch",
    component: bf,
    shape: "spread"
  }));
}
const Mp = Y.ui.updatePlayerControls;
function md(a) {
  Ct("mountPlayerControls", a, kt(Mn, {
    name: "playerControls",
    component: pf,
    shape: "state"
  }));
}
function gd(a) {
  Ct("mountPlayerPanel", a, kt(Mn, {
    name: "playerPanel",
    component: yf,
    shape: "state"
  }));
}
const xp = Y.ui.updateLiveLyrics;
function yd(a) {
  Ct("mountLiveLyrics", a, kt(Mn, {
    name: "liveLyrics",
    component: Sf,
    shape: "state"
  }));
}
function vd(a) {
  Ct("mountOBSSettings", a, kt(Mn, {
    name: "obsSettings",
    component: df,
    shape: "state"
  }));
}
function Np(a) {
  Ct("mountOBSAppearance", a, kt(Mn, {
    name: "obsSettings",
    component: ff,
    shape: "state"
  }));
}
function kd(a) {
  Ct("mountSongEditor", a, kt(Mn, {
    name: "editorView",
    component: Ef,
    shape: "view"
  }));
}
function wd(a) {
  Ct("mountLibraryDialog", a, kt(Cf));
}
function Sd(a) {
  Ct("mountTransposeDialog", a, kt(Mn, {
    name: "transpose",
    component: mf,
    shape: "state"
  }));
}
function bd(a) {
  Ct("mountAppFooter", a, kt(fp));
}
const Rp = Y.ui.updateTour;
function Ed(a) {
  Ct("mountTour", a, kt(Mn, {
    name: "tour",
    component: dp,
    shape: "state"
  }));
}
function Td(a) {
  Ct("mountAppHeader", a, kt(hp));
}
function Cd(a) {
  Ct("mountKaraokeWorkspace", a, kt(pp));
}
function Ld(a) {
  Ct("mountOverlayStudio", a, kt(gp));
}
window.ManokaraReactUI = {
  mountAppFooter: bd,
  mountLibrary: cd,
  updateLibrary: Tp,
  mountStudioHeader: dd,
  mountOverlayStudio: Ld,
  mountMainTabs: hd,
  mountKaraokeWorkspace: Cd,
  mountSetlist: fd,
  updateSetlist: Cp,
  mountLyricSearchResults: pd,
  updateLyricSearchResults: Lp,
  mountPlayerPanel: gd,
  updatePlayerPanelState: kp,
  mountPlayerControls: md,
  updatePlayerControls: Mp,
  mountLiveLyrics: yd,
  updateLiveLyrics: xp,
  mountOBSSettings: vd,
  updateOBSSettingsState: wp,
  mountSongEditor: kd,
  updateSongEditorView: Sp,
  mountLibraryDialog: wd,
  mountTransposeDialog: Sd,
  mountAppHeader: Td,
  mountTour: Ed,
  updateTour: Rp,
  setTransposeOpen: bp,
  updateTransposeState: Ep
};
let ws = !1, Mo = !1;
const xo = () => {
  ws || Mo || (ws = !0, bo.flushSync(() => {
    Td(document.getElementById("appHeaderReactRoot")), bd(document.getElementById("appFooterReactRoot")), Sd(document.getElementById("transposeDialogReactRoot")), Ed(document.getElementById("tourReactRoot")), Cd(document.getElementById("karaokeReactRoot"));
  }), bo.flushSync(() => {
    wd(document.getElementById("libraryDialogReactRoot")), fd(document.getElementById("setlistSide")), gd(document.getElementById("playerReactRoot")), yd(document.getElementById("side")), vd(document.getElementById("obsSettingsReactRoot")), kd(document.getElementById("songEditorReactRoot")), hd(document.getElementById("mainTabsReactRoot")), Ld(document.getElementById("studioReactLayoutRoot"));
  }), bo.flushSync(() => {
    Np(document.getElementById("obsLyricSettingsReactRoot")), cd(document.getElementById("libraryReactRoot")), md(document.getElementById("transportReactRoot")), pd(document.getElementById("lyricSearchResultsReactRoot"));
  }), sp(), bo.flushSync(() => {
    dd(document.getElementById("studioReactHeader"));
  }));
};
function Md({
  navigation: a = !1
} = {}) {
  Mo || (Mo = !0, window.ManokaraTour?.dispose(), window.ManokaraStudio?.dispose(), window.ManokaraController?.dispose({
    navigation: a
  }), Of(), Y.dispose(), window.removeEventListener("pagehide", xd), document.removeEventListener("DOMContentLoaded", xo));
}
function xd(a) {
  a.persisted || Md({
    navigation: !0
  });
}
window.addEventListener("pagehide", xd);
window.ManokaraApp = {
  start: xo,
  dispose: Md,
  diagnostics: () => ({
    mounted: ws,
    disposed: Mo,
    subscriptions: Object.fromEntries(Object.entries(Y.stores).map(([a, u]) => [a, u.subscriberCount])),
    draftSubscriptions: Y.draft.subscriberCount
  })
};
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", xo, {
  once: !0
}) : xo();
export {
  cd as mountLibrary,
  Tp as updateLibrary
};
