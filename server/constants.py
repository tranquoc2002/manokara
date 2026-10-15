"""Existing protocol limits and identifiers; no storage/schema migration."""
import re

MAX_BODY = 393_216
MAX_ROOMS_PER_BROWSER = 8
MAX_SESSIONS = 1024
MAX_ROOMS = MAX_ROOMS_PER_BROWSER * MAX_SESSIONS
SESSION_SECONDS = 30 * 86400
WRITER_SECONDS = 15
ROOM_ID = re.compile(r"^[a-f0-9]{32}$")
EFFECTS = set("jizura karaoke-classic tempera sonnet lumiere hanabi clean word-pop neon glitch".split()) | {
    "folia-" + name for name in "classic cadenza partita fume cappella tilt claddagh monet diorama pendolo sonnet tempera lumiere".split()
}
