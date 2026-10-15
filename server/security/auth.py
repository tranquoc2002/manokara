"""Browser credentials and trusted-loopback peer handling."""
import ipaddress

from starlette.exceptions import HTTPException


class BrowserAuth:
    def __init__(self, settings, store):
        self.settings, self.store = settings, store

    def browser_session(self, request):
        digest = self.store.session(request.cookies.get(self.settings.cookie))
        if not digest:
            raise HTTPException(401, "Reload the app to open your browser session. Cookies must be enabled.")
        return digest


def client_ip(request):
    peer = request.client.host if request.client else "unknown"
    if peer in ("127.0.0.1", "::1"):
        try:
            return str(ipaddress.ip_address(request.headers.get("cf-connecting-ip", peer)))
        except ValueError:
            return peer
    return peer
