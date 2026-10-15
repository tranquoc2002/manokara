"""ASGI transport owns its stream reservation even when headers cannot be sent."""
from starlette.responses import StreamingResponse


class RelayResponse(StreamingResponse):
    def __init__(self, relay, lease, cookie, authorization):
        self.lease = lease
        super().__init__(relay.stream_state(lease, cookie, authorization), media_type="text/event-stream",
                         headers={"X-Accel-Buffering": "no"})

    async def __call__(self, scope, receive, send):
        try:
            await super().__call__(scope, receive, send)
        finally:
            try:
                await self.body_iterator.aclose()
            finally:
                self.lease.release()
