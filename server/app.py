"""Application factory: dependencies, route composition and lifecycle only."""
from contextlib import asynccontextmanager

from starlette.applications import Starlette
from starlette.exceptions import HTTPException

from .config import Settings
from .http import http_error
from .routes import assets, lyrics, media, relay, sessions
from .runtime import Runtime
from .security.middleware import SecurityHeaders


def create_app(settings=None, *, media_settings=None, store_factory=None, media_factory=None, lyrics_settings=None):
    runtime = Runtime.create(settings or Settings.from_env(), media_settings=media_settings,
                             store_factory=store_factory, media_factory=media_factory, lyrics_settings=lyrics_settings)

    @asynccontextmanager
    async def lifespan(app):
        try:
            yield
        finally:
            await runtime.close()

    try:
        app = Starlette(routes=[*sessions.build_routes(runtime), *relay.build_routes(runtime),
                                *media.build_routes(runtime), *lyrics.build_routes(runtime), *assets.build_routes(runtime)],
                        exception_handlers={HTTPException: http_error}, lifespan=lifespan)
        app.state.runtime = runtime
        # Retain the previous diagnostic handles while exposing the new service explicitly.
        app.state.store, app.state.limiter, app.state.settings = runtime.store, runtime.limiter, runtime.settings
        app.state.media, app.state.relay = runtime.media, runtime.relay
        app.state.lyrics = runtime.lyrics
        app.add_middleware(SecurityHeaders, settings=runtime.settings, manifest=runtime.manifest)
        return app
    except BaseException:
        # No asynchronous processes have started during route composition.
        runtime.store.close()
        raise
