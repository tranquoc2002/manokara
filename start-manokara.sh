#!/bin/sh
# Paste the complete output of the hash-password command between the quotes below.
export MANOKARA_ORIGIN="https://mano.del4yowo.id.vn"
export MANOKARA_DATA_DIR="$HOME/.local/state/manokara"
export MANOKARA_PASSWORD_HASH=""

umask 077
exec "$HOME/manokara/.venv/bin/python" "$HOME/manokara/outputs/manokara_server.py"
