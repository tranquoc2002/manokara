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
      body: JSON.stringify({password: input.value}), credentials: "same-origin",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not sign in.");
    input.value = "";
    location.replace("/manokara.html");
  } catch (error) {
    status.textContent = error.message || "Connection failed. Try again.";
  } finally {
    button.disabled = false;
  }
});
