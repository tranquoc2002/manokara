#!/usr/bin/env bash
# Foreground tunnel launcher for root's @reboot cron. Connector runs as cloudflared.
set -Eeuo pipefail
PATH=/usr/bin:/bin
umask 0077

if [[ $EUID -ne 0 ]]; then
  echo 'Run this launcher from root cron or with sudo; it drops privileges to cloudflared.' >&2
  exit 1
fi
if systemctl is-active --quiet cloudflared-manokara.service 2>/dev/null; then
  echo 'cloudflared-manokara.service is already running. Choose either systemd or cron.' >&2
  exit 1
fi
install -d -m 700 -o root -g root /run/manokara-cron
exec 9>/run/manokara-cron/tunnel.lock
flock --nonblock 9 || exit 0
install -d -m 700 -o root -g root /var/log/manokara
exec >>/var/log/manokara/tunnel.log 2>&1
echo "$(date --iso-8601=seconds) Starting Cloudflare Tunnel as the cloudflared account."
runuser -u cloudflared -- /usr/bin/cloudflared --no-autoupdate --config /etc/cloudflared/config.yml tunnel run
