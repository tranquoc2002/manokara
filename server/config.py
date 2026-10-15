"""Validated server configuration; independent of the working directory."""
from dataclasses import dataclass
import os
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1] / "outputs"

@dataclass(frozen=True)
class Settings:
    origin: str
    data_dir: Path
    allow_http: bool = False

    def __post_init__(self):
        url = urlsplit(self.origin)
        if (url.scheme not in ("http", "https") or not url.hostname or url.username or url.password
                or url.path or url.query or url.fragment or self.origin != self.origin.rstrip("/")):
            raise ValueError("MANOKARA_ORIGIN must be an exact origin, e.g. https://karaoke.example.com (no trailing slash).")
        if url.scheme != "https" and not (self.allow_http and url.hostname in ("localhost", "127.0.0.1", "::1")):
            raise ValueError("HTTPS is required; MANOKARA_ALLOW_HTTP=1 permits local loopback development only.")
        _ = url.port
        if self.data_dir.resolve().is_relative_to(ROOT):
            raise ValueError("MANOKARA_DATA_DIR must be outside the web assets directory.")

    @property
    def secure(self):
        return self.origin.startswith("https:")

    @property
    def cookie(self):
        return "__Host-manokara_session" if self.secure else "manokara_session"

    @classmethod
    def from_env(cls):
        state_home = Path(os.environ.get("XDG_STATE_HOME") or Path.home() / ".local" / "state")
        return cls(os.environ.get("MANOKARA_ORIGIN", ""),
                   Path(os.environ.get("MANOKARA_DATA_DIR") or state_home / "manokara").expanduser(),
                   os.environ.get("MANOKARA_ALLOW_HTTP") == "1")
