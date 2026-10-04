const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function getRoom(request) {
  const room = new URL(request.url).searchParams.get("room") || "";
  return /^[a-zA-Z0-9_-]{16,64}$/.test(room) ? room : null;
}

function visualSignature(state) {
  const { writerId, sampledAt, time, countdownRemaining, ...visualState } = state;
  return JSON.stringify(visualState);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/") {
      const url = new URL(request.url);
      url.pathname = "/manokara.html";
      return Response.redirect(url, 302);
    }
    if (pathname === "/__lyric-state" || pathname === "/__lyric-owner") {
      const room = getRoom(request);
      if (!room) return json({ error: "A valid Manokara room link is required." }, 400);
      const id = env.LYRIC_ROOMS.idFromName(room);
      return env.LYRIC_ROOMS.get(id).fetch(request);
    }
    return env.ASSETS.fetch(request);
  },
};

export class LyricRoom {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === "/__lyric-state" && request.method === "GET") {
      const saved = await this.ctx.storage.get("snapshot");
      return json(saved?.data || { ready: false });
    }

    if (pathname === "/__lyric-owner" && request.method === "POST") {
      const payload = await this.readJson(request, 1024);
      if (!payload || typeof payload.writerId !== "string" || !payload.writerId ||
          payload.writerId.length > 128 || !["claim", "renew", "release"].includes(payload.action)) {
        return json({ error: "Invalid writer request." }, 400);
      }

      let owner = await this.ctx.storage.get("owner");
      let accepted = false;
      if (payload.action === "claim") {
        owner = payload.writerId;
        accepted = true;
      } else if (payload.action === "renew") {
        accepted = owner === payload.writerId;
      } else {
        accepted = owner === payload.writerId;
        if (accepted) owner = null;
      }
      if (owner) await this.ctx.storage.put("owner", owner);
      else await this.ctx.storage.delete("owner");
      return json({ ok: accepted }, accepted ? 200 : 409);
    }

    if (pathname === "/__lyric-state" && request.method === "POST") {
      const payload = await this.readJson(request, 1_000_000);
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return json({ error: "Invalid lyric state." }, 400);
      }
      const writerId = payload.writerId;
      let owner = await this.ctx.storage.get("owner");
      const accepted = typeof writerId === "string" && writerId
        ? owner === writerId
        : !owner;
      if (!accepted) return json({ error: "Another Manokara window controls this room." }, 409);
      const previous = await this.ctx.storage.get("snapshot");
      const now = Date.now();
      const changed = !previous || visualSignature(previous.data) !== visualSignature(payload);
      if (changed || now - previous.storedAt >= 1000) {
        await this.ctx.storage.put("snapshot", { data: payload, storedAt: now });
      }
      return json({ ok: true });
    }

    return json({ error: "Not found." }, 404);
  }

  async readJson(request, maxBytes) {
    const declaredLength = Number(request.headers.get("Content-Length") || 0);
    if (declaredLength > maxBytes) return null;
    try {
      const text = await request.text();
      if (!text || new TextEncoder().encode(text).byteLength > maxBytes) return null;
      return JSON.parse(text);
    } catch {
      return null;
    }
  }
}
