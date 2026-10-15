"""Compatible Manokara entry point. Run one worker on loopback."""
from pathlib import Path
import sys

# Also support launch by absolute filename from outside the repository.
_project = str(Path(__file__).resolve().parents[1])
if _project not in sys.path:
    sys.path.insert(0, _project)

# Public aliases retained for local tooling and the existing smoke harness.
import asyncio
import hashlib
import sqlite3
from server.app import create_app
from server.cli import main
from server.config import ROOT, Settings
from server.constants import (MAX_BODY, MAX_ROOMS_PER_BROWSER, MAX_SESSIONS, MAX_ROOMS,
                              SESSION_SECONDS, WRITER_SECONDS, ROOM_ID, EFFECTS)
from server.http import read_json
from server.repositories.rooms import Store
from server.schemas.snapshot import snapshot
from server.schemas.overlay import overlay_config, playlist_data
from server.security.assets import asset_manifest, safe_asset, csp_for
from server.security.limiter import Limiter
from server.security.middleware import SecurityHeaders
from server.services.media import MediaResponse, MediaService, MediaSettings

if __name__ == "__main__":
    main()
