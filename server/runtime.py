"""Composition and resource ownership for one application instance."""
from dataclasses import dataclass

from .config import Settings
from .repositories.rooms import Store
from .security.assets import asset_manifest
from .security.auth import BrowserAuth
from .security.limiter import Limiter
from .services.media import MediaService, MediaSettings
from .services.lyrics import LyricsService, LyricsSettings
from .services.relay import RelayService, RoomService


@dataclass
class Runtime:
    settings: Settings
    store: Store
    limiter: Limiter
    media: MediaService
    relay: RelayService
    auth: BrowserAuth
    rooms: RoomService
    manifest: dict
    lyrics: LyricsService
    closed: bool = False

    @classmethod
    def create(cls, settings, *, media_settings=None, store_factory=None, media_factory=None, lyrics_settings=None):
        # Validate optional tools and collect assets before opening SQLite.
        media_settings = media_settings if media_settings is not None else MediaSettings.from_env()
        lyrics_settings = lyrics_settings if lyrics_settings is not None else LyricsSettings.from_env()
        manifest = asset_manifest()
        store = (store_factory or Store)(settings)
        try:
            media = (media_factory or MediaService)(media_settings)
            relay = RelayService(store)
            store.on_rooms_removed = relay.remove_rooms
            # Compatibility diagnostic view only; repository methods never own/mutate live scenes.
            store.live = relay.rooms
            return cls(settings, store, Limiter(), media, relay, BrowserAuth(settings, store),
                       RoomService(store, relay), manifest, LyricsService(lyrics_settings))
        except BaseException:
            store.close()
            raise

    async def close(self):
        if self.closed:
            return
        self.closed = True
        self.relay.close()
        try:
            try:
                await self.lyrics.close()
            finally:
                await self.media.close()
        finally:
            self.store.close()
