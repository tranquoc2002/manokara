"""Compatible single-worker loopback launcher."""
import os
import sys
from .app import create_app

def main():
    if sys.argv[1:]:
        raise SystemExit("Usage: python outputs/manokara_server.py")
    import uvicorn
    try:
        app = create_app()
    except ValueError as error:
        raise SystemExit(str(error))
    port = int(os.environ.get("MANOKARA_PORT", "8000"))
    uvicorn.run(app, host="127.0.0.1", port=port, workers=1, proxy_headers=False,
                server_header=False, access_log=False, limit_concurrency=64, backlog=128,
                timeout_keep_alive=5, timeout_graceful_shutdown=10, ws="none", http="h11",
                h11_max_incomplete_event_size=16384)
