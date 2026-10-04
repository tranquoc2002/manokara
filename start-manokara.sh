#!/bin/sh
export MANOKARA_ORIGIN="https://mano.del4yowo.id.vn"
export MANOKARA_DATA_DIR="$HOME/.local/state/manokara"
export MANOKARA_YTDLP_ENABLED=1
export MANOKARA_YTDLP_IMPERSONATE=chrome

umask 077
exec "$HOME/manokara/.venv/bin/python" "$HOME/manokara/outputs/manokara_server.py"
