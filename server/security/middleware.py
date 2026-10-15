"""Host/origin checks, document policies and response security headers."""
from urllib.parse import urlsplit
from starlette.requests import ClientDisconnect, Request
from starlette.responses import JSONResponse
from .assets import csp_for

class SecurityHeaders:
    def __init__(self, app, settings, manifest):
        self.app, self.settings = app, settings
        self.manifest_urls = set(manifest)
        self.policy_paths = {url: path for url, path in manifest.items()
                             if path.suffix == ".html" or url == "/pitch-assets/SignalsmithStretch.mjs"}
        self.policy_mtimes = {url: path.stat().st_mtime_ns for url, path in self.policy_paths.items()}
        self.policies = {url: csp_for(path) for url, path in self.policy_paths.items()}

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)

        async def secure_send(message):
            if message["type"] == "http.response.start":
                headers = {k.lower(): v for k, v in message.get("headers", [])}
                path = self.policy_paths.get(scope["path"])
                if path:
                    try:
                        modified = path.stat().st_mtime_ns
                        if modified != self.policy_mtimes.get(scope["path"]):
                            self.policies[scope["path"]] = csp_for(path)
                            self.policy_mtimes[scope["path"]] = modified
                    except OSError:
                        pass
                headers.update({
                    b"cache-control": b"no-store", b"x-content-type-options": b"nosniff",
                    b"referrer-policy": b"strict-origin-when-cross-origin", b"x-frame-options": b"SAMEORIGIN",
                    b"content-security-policy": self.policies.get(scope["path"], csp_for(None)).encode(),
                    b"permissions-policy": b"camera=(), microphone=(), geolocation=(), display-capture=" +
                        (b"(self)" if scope["path"] in ("/manokara.html", "/manokara-tab-audio.html") else b"()"),
                })
                if (message["status"] == 200 and scope["path"].startswith("/folia-assets/")
                        and scope["path"] in self.manifest_urls):
                    # Public bundles are named by their content hash. Reuse them on mode changes.
                    headers[b"cache-control"] = b"public, max-age=31536000, immutable"
                elif (message["status"] == 200 and scope["path"].startswith("/romaji-assets/")
                      and scope["path"] in self.manifest_urls):
                    # Versioned public dictionary files can be reused on later conversions.
                    headers[b"cache-control"] = b"public, max-age=86400"
                elif (message["status"] == 200 and scope["path"].startswith("/ui-assets/")
                      and scope["path"] in self.manifest_urls):
                    headers[b"cache-control"] = b"public, max-age=86400"
                if self.settings.secure:
                    headers[b"strict-transport-security"] = b"max-age=31536000"
                message["headers"] = list(headers.items())
            await send(message)

        request = Request(scope)
        if request.headers.get("host", "").lower() != urlsplit(self.settings.origin).netloc.lower():
            return await JSONResponse({"error": "Invalid host."}, 400)(scope, receive, secure_send)
        if scope["method"] not in ("GET", "HEAD", "POST"):
            return await JSONResponse({"error": "Method not allowed."}, 405)(scope, receive, secure_send)
        if scope["method"] == "POST" and request.headers.get("origin") != self.settings.origin:
            return await JSONResponse({"error": "Invalid origin."}, 403)(scope, receive, secure_send)
        try:
            await self.app(scope, receive, secure_send)
        except ClientDisconnect:
            # The client closed the connection before its request finished.
            # Stop processing; there is no connected peer to send an error to.
            return
