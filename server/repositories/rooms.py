"""SQLite credentials and room repository. Live playback is owned by RelayService."""
import hashlib
import hmac
import os
import re
import secrets
import sqlite3
import time

from starlette.exceptions import HTTPException
from ..constants import MAX_ROOMS_PER_BROWSER, MAX_SESSIONS, MAX_ROOMS, SESSION_SECONDS, ROOM_ID

class Store:
    """Bounded credentials/rooms. SQL and durable mutations stay in this repository."""

    def __init__(self, settings):
        self.on_rooms_removed = lambda room_ids: None
        self.closed = False
        db_path = settings.data_dir / "relay.sqlite3"
        try:
            settings.data_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
            if db_path.is_symlink():
                raise ValueError("The state database must not be a symlink.")
            # All runtime DB access is synchronous on one ASGI event loop. TestClient starts its own thread.
            self.db = sqlite3.connect(db_path, check_same_thread=False)
            os.chmod(db_path, 0o600)
            self._initialize()
        except (OSError, sqlite3.Error) as error:
            self.close()
            raise ValueError(
                f"Cannot open the database in {settings.data_dir}: {error}. "
                "Set MANOKARA_DATA_DIR to a directory writable by the account running the server "
                "(for example $HOME/.local/state/manokara)."
            ) from error
        except BaseException:
            self.close()
            raise

    def _initialize(self):
        self.db.executescript("""
            CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS sessions (digest TEXT PRIMARY KEY, expires REAL NOT NULL);
            CREATE TABLE IF NOT EXISTS rooms (id TEXT PRIMARY KEY, epoch INTEGER NOT NULL DEFAULT 0, owner TEXT);
        """)
        if "owner" not in {column[1] for column in self.db.execute("PRAGMA table_info(rooms)")}:
            # Legacy rooms used a shared operator credential and have no private owner.
            # They cannot safely become writable by anonymous visitors.
            self.db.execute("ALTER TABLE rooms ADD COLUMN owner TEXT")
            self.db.execute("DELETE FROM sessions")
        self.db.execute("CREATE INDEX IF NOT EXISTS room_owner ON rooms(owner)")
        self.db.execute("INSERT OR IGNORE INTO meta VALUES ('secret', ?)", (secrets.token_hex(32),))
        self.secret = bytes.fromhex(self.db.execute("SELECT value FROM meta WHERE key='secret'").fetchone()[0])
        self.db.execute("DELETE FROM meta WHERE key='password'")
        self.cleanup()

    def cleanup(self):
        self.db.execute("DELETE FROM sessions WHERE expires <= ?", (time.time(),))
        stale = self.db.execute("SELECT id FROM rooms WHERE owner IS NULL OR owner NOT IN (SELECT digest FROM sessions)").fetchall()
        self.db.execute("DELETE FROM rooms WHERE owner IS NULL OR owner NOT IN (SELECT digest FROM sessions)")
        self.db.commit()
        self.on_rooms_removed([room_id for (room_id,) in stale])

    def rotate_room(self, room_id, digest):
        self.room(room_id, digest)
        self.db.execute("UPDATE rooms SET epoch=epoch+1 WHERE id=?", (room_id,))
        self.db.commit()
        return self.view_token(room_id)

    def delete_room(self, room_id, digest):
        self.room(room_id, digest)
        self.db.execute("DELETE FROM rooms WHERE id=?", (room_id,))
        self.db.commit()
        self.on_rooms_removed([room_id])

    def close(self):
        if not self.closed:
            self.closed = True
            if hasattr(self, "db"):
                self.db.close()

    def session(self, token):
        if not token or not re.fullmatch(r"[A-Za-z0-9_-]{43}", token):
            return None
        digest = hashlib.sha256(token.encode()).hexdigest()
        row = self.db.execute("SELECT expires FROM sessions WHERE digest=?", (digest,)).fetchone()
        return digest if row and row[0] > time.time() else None

    def start_session(self, token):
        self.cleanup()
        digest = self.session(token)
        if digest:
            self.db.execute("UPDATE sessions SET expires=? WHERE digest=?", (time.time() + SESSION_SECONDS, digest))
        else:
            if self.db.execute("SELECT count(*) FROM sessions").fetchone()[0] >= MAX_SESSIONS:
                raise HTTPException(503, "Visitor limit reached. Try again later.")
            token = secrets.token_urlsafe(32)
            self.db.execute("INSERT INTO sessions VALUES (?, ?)", (hashlib.sha256(token.encode()).hexdigest(), time.time() + SESSION_SECONDS))
        self.db.commit()
        return token

    def room(self, room_id, digest=None):
        if not isinstance(room_id, str) or not ROOM_ID.fullmatch(room_id):
            raise HTTPException(404, "Room not found.")
        row = self.db.execute("""SELECT rooms.epoch, rooms.owner FROM rooms
                               JOIN sessions ON rooms.owner=sessions.digest
                               WHERE rooms.id=? AND sessions.expires>?""", (room_id, time.time())).fetchone()
        if not row or digest is not None and row[1] != digest:
            raise HTTPException(404, "Room not found.")
        return row[0]

    def owns_room(self, room_id, digest):
        return digest is not None and self.db.execute("SELECT owner FROM rooms WHERE id=?", (room_id,)).fetchone() == (digest,)

    def create_room(self, digest):
        self.cleanup()
        if self.db.execute("SELECT count(*) FROM rooms WHERE owner=?", (digest,)).fetchone()[0] >= MAX_ROOMS_PER_BROWSER:
            raise HTTPException(409, "Your room limit is reached. Reuse or delete an existing room.")
        if self.db.execute("SELECT count(*) FROM rooms").fetchone()[0] >= MAX_ROOMS:
            raise HTTPException(503, "Room limit reached. Try again later.")
        room_id = secrets.token_hex(16)
        self.db.execute("INSERT INTO rooms (id, owner) VALUES (?, ?)", (room_id, digest))
        self.db.commit()
        return room_id

    def view_token(self, room_id):
        epoch = self.room(room_id)
        return hmac.new(self.secret, f"view:{room_id}:{epoch}".encode(), hashlib.sha256).hexdigest()

    def viewer(self, room_id, authorization):
        expected = self.view_token(room_id)
        token = authorization.removeprefix("Bearer ")
        return authorization.startswith("Bearer ") and re.fullmatch(r"[a-f0-9]{64}", token) is not None and hmac.compare_digest(expected, token)
