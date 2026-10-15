"""Process-local scene/lease service. Mutations are synchronous on one ASGI loop."""
import asyncio
import json
import time

from starlette.exceptions import HTTPException

from ..constants import WRITER_SECONDS
from ..schemas.snapshot import snapshot


class ViewerLease:
    """Idempotent capacity release, including failure before streaming starts."""
    def __init__(self, service, room_id):
        self.service, self.room_id, self.released = service, room_id, False

    def release(self):
        if self.released:
            return
        self.released = True
        remaining = self.service.active_streams.get(self.room_id, 0) - 1
        if remaining > 0:
            self.service.active_streams[self.room_id] = remaining
        else:
            self.service.active_streams.pop(self.room_id, None)


class RelayService:
    def __init__(self, store, clock=time.monotonic):
        self.store, self.clock = store, clock
        self.rooms, self.active_streams = {}, {}
        self.closed = False

    def room(self, room_id):
        return self.rooms.setdefault(room_id, {"owner": None, "until": 0, "snapshot": {"ready": False},
                                               "revision": 0, "changed": asyncio.Event()})

    def scene(self, room):
        result = dict(room["snapshot"])
        if "received_at" in room:
            result["stateAgeMs"] = max(0, (self.clock() - room["received_at"]) * 1000) + result.pop("uploadDelayMs", 0)
        return result

    def authorize_reader(self, room_id, cookie, authorization):
        self.store.room(room_id)
        if not self.store.owns_room(room_id, self.store.session(cookie)) and not self.store.viewer(room_id, authorization):
            raise HTTPException(401, "Use this room's controller browser or a valid OBS link.")

    def claim(self, room_id, writer, action):
        if not isinstance(writer, str) or not 1 <= len(writer) <= 128 or action not in ("claim", "renew", "release"):
            raise HTTPException(400, "Invalid writer request.")
        room = self.room(room_id)
        accepted = action == "claim" or (room["owner"] == writer and room["until"] > self.clock())
        if accepted:
            room["owner"] = None if action == "release" else writer
            room["until"] = self.clock() + WRITER_SECONDS
        return accepted

    def publish(self, room_id, payload, partial=False):
        # No await between lease validation and replacement: two writers cannot interleave here.
        payload = snapshot(payload)
        room = self.room(room_id)
        if partial and (room["owner"] is None or room["until"] <= self.clock() or not room["snapshot"].get("ready")):
            raise HTTPException(428, "Send a complete lyric scene after restart or lease expiry.")
        if room["owner"] is None or room["until"] <= self.clock():
            room["owner"] = payload["writerId"]
        if room["owner"] != payload["writerId"]:
            raise HTTPException(409, "Another window controls this room. Click the app to take control.")
        if partial:
            payload = snapshot({**room["snapshot"], **payload})
        room["until"] = self.clock() + WRITER_SECONDS
        room["snapshot"] = {key: value for key, value in payload.items() if key != "writerId"}
        room["received_at"] = self.clock()
        room["revision"] += 1
        self.wake(room_id)

    def wake(self, room_id):
        room = self.rooms.get(room_id)
        if room:
            # Every wake starts a fresh generation, including token rotation without a new scene.
            # Waiting on an already-set Event may complete without yielding, starving the ASGI loop.
            changed = room["changed"]
            room["changed"] = asyncio.Event()
            changed.set()

    def remove_rooms(self, room_ids):
        for room_id in room_ids:
            room = self.rooms.pop(room_id, None)
            if room:
                room["changed"].set()

    def reserve_stream(self, room_id):
        if self.active_streams.get(room_id, 0) >= 8 or sum(self.active_streams.values()) >= 128:
            raise HTTPException(429, "Too many live lyric viewers.")
        self.active_streams[room_id] = self.active_streams.get(room_id, 0) + 1
        return ViewerLease(self, room_id)

    async def stream_state(self, lease, cookie, authorization):
        # One latest scene, no playback backlog. Recheck revocation after every update/heartbeat.
        room_id = lease.room_id
        previous, revision = None, -1
        try:
            while True:
                try:
                    valid = not self.closed
                    if valid:
                        self.authorize_reader(room_id, cookie, authorization)
                except HTTPException:
                    valid = False
                if not valid:
                    yield 'event: revoked\ndata: {}\n\n'
                    return
                room = self.room(room_id)
                changed = room["changed"]
                if revision != room["revision"]:
                    scene = self.scene(room)
                    packet = {"state": scene} if previous is None or previous.keys() - scene.keys() else {
                        "patch": {k: v for k, v in scene.items() if previous.get(k) != v}}
                    previous, revision = scene, room["revision"]
                    yield 'data: ' + json.dumps(packet, ensure_ascii=False, separators=(',', ':')) + '\n\n'
                try:
                    await asyncio.wait_for(changed.wait(), timeout=5)
                except TimeoutError:
                    yield ': heartbeat\n\n'
        finally:
            lease.release()

    def close(self):
        self.closed = True
        for room in self.rooms.values():
            room["changed"].set()


class RoomService:
    """Coordinate durable room changes with in-memory viewers."""
    def __init__(self, store, relay):
        self.store, self.relay = store, relay

    def rotate(self, room_id, digest):
        token = self.store.rotate_room(room_id, digest)
        self.relay.wake(room_id)
        return {"room": room_id, "viewToken": token}

    def delete(self, room_id, digest):
        self.store.delete_room(room_id, digest)
