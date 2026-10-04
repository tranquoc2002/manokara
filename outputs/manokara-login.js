"use strict";
document.getElementById("login").addEventListener("submit", async event => {
  event.preventDefault();
  const button = document.getElementById("submit");
  const status = document.getElementById("status");
  const input = document.getElementById("password");
  button.disabled = true;
  status.textContent = "";
  try {
    const response = await fetch("/__login", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({password: input.value}), credentials: "same-origin", signal: AbortSignal.timeout(10000),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not sign in.");
    input.value = "";
    const room = new URL(location.href).searchParams.get("room");
    location.replace("/manokara.html" + (/^[a-f0-9]{32}$/.test(room || "") ? "?room=" + room : ""));
  } catch (error) {
    status.textContent = error.message || "Connection failed. Try again.";
  } finally {
    button.disabled = false;
  }
});
