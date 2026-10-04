"use strict";
window.ManokaraSession = (() => {
  let info;
  const api = async (path, payload, options = {}) => {
    const response = await fetch(path, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload), credentials: "same-origin", signal: AbortSignal.timeout(8000), ...options,
    });
    if (response.status === 401) {
      const room = new URL(location.href).searchParams.get("room");
      location.replace("/manokara-login.html" + (/^[a-f0-9]{32}$/.test(room || "") ? "?room=" + room : ""));
    }
    return response;
  };
  const ready = (async () => {
    const url = new URL(location.href);
    let room = url.searchParams.get("room");
    try { room ||= localStorage.getItem("manokaraRelayRoom"); } catch (_) {}
    if (!/^[a-f0-9]{32}$/.test(room || "")) room = null;
    let response = await api("/__room", {room});
    if (response.status === 404) response = await api("/__room", {room: null});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not open a room.");
    info = data;
    try { localStorage.setItem("manokaraRelayRoom", info.room); } catch (_) {}
    url.searchParams.set("room", info.room);
    url.hash = "";
    history.replaceState(history.state, "", url);
    return info;
  })();
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
