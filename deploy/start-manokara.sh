#!/usr/bin/env bash
# Foreground launcher for root's @reboot cron. The Python process runs as manokara.
set -Eeuo pipefail
PATH=/usr/bin:/bin
umask 0077

if [[ $EUID -ne 0 ]]; then
  echo 'Run this launcher from root cron or with sudo; it drops privileges to manokara.' >&2
  exit 1
fi

app_dir=/opt/manokara
env_file=/etc/manokara/manokara.env
log_dir=/var/log/manokara

if [[ ! -f $env_file || -L $env_file || $(stat -c %u "$env_file") != 0 ]]; then
  echo 'Configuration must be a regular root-owned file: /etc/manokara/manokara.env' >&2
  exit 1
fi
env_mode=$(stat -c %a "$env_file")
if (( (8#$env_mode & 8#077) != 0 )); then
  echo 'Configuration must have mode 600 (no group/other access).' >&2
  exit 1
fi

# The administrator-owned file uses simple KEY=value assignments, shared with systemd.
set -a
source "$env_file"
set +a
unset MANOKARA_ALLOW_HTTP
export PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

if systemctl is-active --quiet manokara.service 2>/dev/null; then
  echo 'manokara.service is already running. Choose either systemd or cron.' >&2
  exit 1
fi

# Keep the lock in this parent shell for the entire lifetime of runuser/Python.
install -d -m 700 -o root -g root /run/manokara-cron
exec 9>/run/manokara-cron/app.lock
flock --nonblock 9 || exit 0
install -d -m 700 -o manokara -g manokara /var/lib/manokara
install -d -m 700 -o root -g root "$log_dir"
cd "$app_dir"
exec >>"$log_dir/server.log" 2>&1
echo "$(date --iso-8601=seconds) Starting Manokara as the manokara account."
runuser -u manokara -- "$app_dir/.venv/bin/python" "$app_dir/outputs/manokara_server.py"
