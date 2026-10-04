"use strict";
window.ManokaraSession = (() => {
  let info;
  const api = async (path, payload, options = {}) => {
    const response = await fetch(path, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload), credentials: "same-origin", signal: AbortSignal.timeout(8000), ...options,
    });
    return response;
  };
  const initialize = async () => {
    const url = new URL(location.href);
    const session = await api("/__session", {});
    if (!session.ok) {
      const data = await session.json();
      throw new Error(data.error || "Could not open your browser session.");
    }
    let room = url.searchParams.get("room");
    try { room ||= localStorage.getItem("manokaraRelayRoom"); } catch (_) {}
    if (!/^[a-f0-9]{32}$/.test(room || "")) room = null;
    let response = await api("/__room", {room});
    if (response.status === 404) {
      // A shared controller URL must never grant access to somebody else's room.
      let saved;
      try { saved = localStorage.getItem("manokaraRelayRoom"); } catch (_) {}
      if (saved !== room && /^[a-f0-9]{32}$/.test(saved || "")) {
        response = await api("/__room", {room: saved});
      }
      if (response.status === 404) response = await api("/__room", {room: null});
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not open a room.");
    info = data;
    try { localStorage.setItem("manokaraRelayRoom", info.room); } catch (_) {}
    url.searchParams.set("room", info.room);
    url.hash = "";
    history.replaceState(history.state, "", url);
    return info;
  };
  // Serialize first visits in separate tabs so they share one browser identity.
  const ready = navigator.locks
    ? navigator.locks.request("manokara-room", initialize)
    : initialize();
  // The controller displays the error; mark the shared promise handled until it subscribes.
  ready.catch(() => {});
  const obsUrl = popup => {
    const url = new URL("/manokara-obs.html", location.origin);
    url.searchParams.set("room", info.room);
    if (popup) url.searchParams.set("popup", "1");
    // Fragments are never sent in HTTP requests or Referer headers.
    url.hash = new URLSearchParams({view: info.viewToken}).toString();
    return url.href;
  };
  return {ready, api, obsUrl, async rotate() {
    await ready;
    const response = await api("/__room/rotate", {room: info.room});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not replace the OBS link.");
    info.viewToken = data.viewToken;
  }};
})();
