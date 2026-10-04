# Deploy Manokara on Arch Linux

Manokara runs as a single Python process on `127.0.0.1:8000`. A separate `cloudflared` service publishes it over HTTPS. The browser handles playback; Python relays live lyrics. No Workers, Pages, public Python port, or VPS browser is required.

The included setup uses one trusted operator password, separate rooms, and read-only OBS links. All signed-in operators share the same trusted account; this is not a public multi-user service with separate user accounts.

## 1. Install the application

Run the following from your project checkout on the VPS. Use a full Arch upgrade, including security updates:

```bash
sudo pacman -Syu --needed python python-pip cloudflared
sudo useradd --system --user-group --home-dir /var/lib/manokara --shell /usr/bin/nologin manokara
sudo useradd --system --user-group --home-dir /nonexistent --shell /usr/bin/nologin cloudflared
sudo install -d -m 755 /opt/manokara
sudo cp -a outputs deploy tests requirements.txt requirements-dev.txt README.md DEPLOY.md /opt/manokara/
sudo chown -R root:root /opt/manokara
sudo chmod -R go-w /opt/manokara
sudo python -m venv /opt/manokara/.venv
sudo /opt/manokara/.venv/bin/python -m pip install -r /opt/manokara/requirements.txt
```

Create each service account only once. If a matching account already exists, check its group and privileges before reusing it. Keep `/opt/manokara` readable but writable only by the administrator; the app account must not be able to modify its executable code.

## 2. Configure the hostname and password

Choose the final hostname, for example `karaoke.example.com`. Generate a strong password hash interactively; the password is not passed on the command line or stored in the configuration:

```bash
/opt/manokara/.venv/bin/python /opt/manokara/outputs/manokara_server.py hash-password
sudo install -d -m 700 /etc/manokara
sudo install -m 600 /opt/manokara/deploy/manokara.env.example /etc/manokara/manokara.env
sudoedit /etc/manokara/manokara.env
```

Set `MANOKARA_ORIGIN` to your exact HTTPS origin, with no path or trailing slash. Replace `MANOKARA_PASSWORD_HASH` with the generated `scrypt:...` value. Keep `MANOKARA_DATA_DIR=/var/lib/manokara`. Configuration without a valid origin and password hash fails at startup.

The systemd manager reads the root-only environment file before dropping privileges. Password hashes are sensitive too; do not commit this file.

```bash
sudo install -m 644 /opt/manokara/deploy/manokara.service /etc/systemd/system/manokara.service
sudo systemctl daemon-reload
sudo systemctl enable --now manokara.service
curl --fail -H 'Host: karaoke.example.com' http://127.0.0.1:8000/healthz
```

Use your actual hostname in the `Host` header. An ordinary request to `localhost` is rejected in production because it does not match the configured hostname. `systemd` creates `/var/lib/manokara` with restricted permissions. The app has no root privileges, no external network access, a restricted filesystem, and resource limits.

## 3. Create the Cloudflare Tunnel

The following uses a locally managed named tunnel. Authenticate as the administrator; do not give the running connector your Cloudflare account certificate:

```bash
sudo cloudflared tunnel login
sudo cloudflared tunnel create manokara
```

Record the tunnel UUID and the printed credentials-file path. On a typical root installation the file is `/root/.cloudflared/UUID.json`. Use the actual UUID in the next command:

```bash
sudo install -d -m 750 -o root -g cloudflared /etc/cloudflared
sudo install -m 640 -o root -g cloudflared /root/.cloudflared/UUID.json /etc/cloudflared/UUID.json
sudo install -m 640 -o root -g cloudflared /opt/manokara/deploy/cloudflared.yml.example /etc/cloudflared/config.yml
sudoedit /etc/cloudflared/config.yml
```

Replace the UUID in `tunnel` and `credentials-file`. Set both `hostname` and `httpHostHeader` to your hostname. Keep `service: http://127.0.0.1:8000` and the final `http_status:404` rule. The tunnel's local HTTP hop stays on loopback; visitors use HTTPS through Cloudflare.

```bash
sudo cloudflared tunnel route dns manokara karaoke.example.com
sudo -u cloudflared cloudflared --config /etc/cloudflared/config.yml tunnel ingress validate
sudo install -m 644 /opt/manokara/deploy/cloudflared-manokara.service /etc/systemd/system/cloudflared-manokara.service
sudo systemctl daemon-reload
sudo systemctl enable --now cloudflared-manokara.service
```

Keep the account-wide `cert.pem` restricted to the administrator. The connector receives only the credentials for its named tunnel. Use this one tunnel service; do not also start another connector service from `cloudflared service install`.

Enable Cloudflare's HTTP-to-HTTPS redirect for the hostname. Disable Rocket Loader and HTML/JavaScript rewriting for this app: they can invalidate the content security policy's script hashes. Bypass caching on `/__*`, `/manokara.html`, `/manokara-login.html`, `/manokara-obs.html`, and `/manokara-folia.html`. The origin sends `Cache-Control: no-store` on every response; avoid any Cache Everything rule that overrides it.

The application already authenticates controllers. Cloudflare Access is an optional extra layer. If you add Access, ensure OBS can load its page, its JS/CSS/Folia assets, and `/__lyric-state` without an interactive Access login. A whole-hostname Access policy will otherwise block a cookie-free OBS source. Any Access bypass for the lyric endpoint still requires the app's viewer token for reads and an operator session for writes.

## 4. Use the controller and OBS

Open `https://karaoke.example.com`, sign in, and wait for "OBS relay connected." Copy the OBS URL into an OBS Browser Source. Keep the source active while streaming.

OBS URLs look like `/manokara-obs.html?room=...#view=...`. The fragment contains a read-only bearer credential; HTTP requests and referrer headers never include it. The viewer sends it in the Authorization header when polling the relay. The room ID alone grants no access. Sharing the link shares access to those lyrics, so keep it private.

"Replace OBS link" immediately revokes the previous link. Copy the replacement URL into every OBS source or lyric window that should keep working. Revocation stops future reads; it cannot erase lyrics somebody already received. OBS needs no operator cookie and cannot write, claim ownership, rotate tokens, or create rooms.

Rooms are issued by the server and remembered in browser storage. Copy an authenticated controller URL to another signed-in browser if you intentionally want it to control the same room. Clicking or typing in a controller window transfers ownership to that window. A writer lease lasts 15 seconds and renews while publishing; a closed or disconnected window cannot hold ownership indefinitely.

Operator sessions last 12 hours. Sign out invalidates the session on the server. Changing the configured password hash and restarting invalidates all operator sessions. Existing viewer links remain valid until rotated or their rooms are deleted.

Up to 128 rooms are supported. To retire a room, while signed in, run this in the controller's browser console:

```javascript
await ManokaraSession.api('/__room/delete', {
  room: new URL(location.href).searchParams.get('room')
});
location.reload();
```

Deleting a room revokes its viewer links and discards its current lyrics. Reloading creates a replacement room.

Setlists and preferences stay in local storage on the device/browser where you created them. They are not uploaded to the VPS. Live playback state resets after a server restart; an open controller publishes it again automatically. Room identities, viewer-token versions, and unexpired sessions survive restarts in `/var/lib/manokara/relay.sqlite3`. Run exactly one Python worker; live state and rate limits are deliberately local to that process.

## 5. Verify the VPS deployment

```bash
sudo systemctl status manokara.service cloudflared-manokara.service
sudo journalctl -u manokara.service -u cloudflared-manokara.service -n 100 --no-pager
sudo ss -lntp
sudo systemd-analyze verify /etc/systemd/system/manokara.service /etc/systemd/system/cloudflared-manokara.service
sudo systemd-analyze security manokara.service cloudflared-manokara.service
curl --fail https://karaoke.example.com/healthz
```

Confirm Python listens only on `127.0.0.1:8000`; the optional connector metrics listener is also on loopback. Keep port 8000 blocked by your VPS firewall and provider firewall. Tunnel requires outbound connectivity, including port 7844 for QUIC/HTTP2; it needs no public inbound HTTP/HTTPS port. Retain the inbound access you need for administration.

In a private browser, controller pages must redirect to login and a room URL without a viewer credential must not return lyrics. Verify OBS displays live lyrics, replacing its link stops the old viewer, and Folia/JIZURA still render. Check browser console messages for CSP errors. Turn off Cloudflare transformations that inject scripts before weakening the policy.

The controller and login CSP prohibit dynamic JavaScript evaluation. The Folia viewer document permits `unsafe-eval` because the bundled Pixi renderer compiles shader/uniform functions at runtime. This exception is scoped to that viewer document; lyric payloads are validated and rendered as text. Styles permit inline rules because the visualizers change them dynamically.

Access logs are disabled so URLs and room identifiers are not written by Uvicorn. Do not enable proxy debug logging that dumps Authorization or Cookie headers. For operational health, use the service logs and `/healthz`. That endpoint confirms the Python process is responding; it does not prove the tunnel, browser playback, or OBS connection is working.

## Cron alternative

Caddy is not required: the Python application serves both the frontend assets and the relay. Cloudflare handles public HTTPS and the tunnel forwards to Python over loopback. Install the application, its environment file, and the tunnel configuration as described above before choosing a startup method.

For cron instead of systemd, install `cronie` and `logrotate`, make the launchers executable, and disable the two application services:

```bash
sudo pacman -S --needed cronie logrotate
sudo chmod 755 /opt/manokara/deploy/start-manokara.sh /opt/manokara/deploy/start-cloudflared.sh
sudo systemctl disable --now manokara.service cloudflared-manokara.service
sudo install -m 644 /opt/manokara/deploy/manokara.logrotate /etc/logrotate.d/manokara
sudo systemctl enable --now logrotate.timer
sudo systemctl enable --now cronie.service
sudo crontab -e
```

Add these entries to **root's** crontab:

```cron
@reboot /opt/manokara/deploy/start-manokara.sh
@reboot /opt/manokara/deploy/start-cloudflared.sh
```

The launchers stay in the foreground for cron and drop privileges before starting Python or the tunnel. Each holds a `flock` lock for the process lifetime, rejects an already-running matching systemd service, and writes restricted logs to `/var/log/manokara/server.log` and `/var/log/manokara/tunnel.log`. No `nohup`, background ampersand, or Caddy process is needed in the cron entry. An app/tunnel startup order is unnecessary: the connector retries while the app is starting.

`@reboot` entries apply at the next cron startup; adding them does not start the app immediately. To start now, run each launcher in a separate terminal (it will remain attached), or reboot after installation. Check logs with:

```bash
sudo tail -n 100 /var/log/manokara/server.log /var/log/manokara/tunnel.log
sudo pgrep -a -u manokara
sudo pgrep -a -u cloudflared
```

To stop cron-managed processes:

```bash
sudo pkill -TERM -u manokara -f '/opt/manokara/outputs/manokara_server.py'
sudo pkill -TERM -u cloudflared -f '/etc/cloudflared/config.yml tunnel run'
```

Remove the cron entries before switching back to systemd. For updates, stop the cron-managed Python process first, copy/install the new files as described below, and restart it using the launcher or reboot. Cron's `@reboot` does not restart crashed processes or provide the filesystem, network, and memory sandbox from the supplied systemd units. The app still runs as an unprivileged account with its own authentication and request limits. Choose systemd if you want supervision and the additional sandbox. Log rotation uses `copytruncate` because these foreground launchers keep their log descriptors open; a small amount of log output can be lost during rotation.

## Updates and backups

Before updating, back up `/var/lib/manokara` and `/etc/manokara` securely. Stop the app before copying its SQLite database. Keep backups outside the web assets directory and restrict them to the administrator.

From the new project checkout:

```bash
sudo systemctl stop manokara.service
sudo cp -a outputs deploy tests requirements.txt requirements-dev.txt README.md DEPLOY.md /opt/manokara/
sudo chown -R root:root /opt/manokara
sudo chmod -R go-w /opt/manokara
sudo /opt/manokara/.venv/bin/python -m pip install -r /opt/manokara/requirements.txt
sudo systemctl start manokara.service
```

If service templates change, review and reinstall them, then run `systemctl daemon-reload` and restart the affected service. Always restart after modifying HTML so the CSP hashes are recomputed. Restore state backups with the manokara account as owner and directory/file modes 700/600. Keep Arch and the pinned Python dependencies updated; after a major Arch Python upgrade, recreate the virtual environment and install the requirements again.

Deployment has no dependency on GitHub Actions, Workers, Wrangler, or Pages. Remove old Cloudflare deployment secrets from GitHub and retire any existing Worker/custom-domain route in the Cloudflare dashboard so it does not conflict with this tunnel hostname. Removing repository files does not delete a previously deployed Worker.

## Local development and tests

Use a separate local virtual environment. Local HTTP must be explicitly enabled and is restricted to loopback hostnames:

```bash
python -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python outputs/manokara_server.py hash-password
export MANOKARA_ORIGIN=http://localhost:8000
export MANOKARA_ALLOW_HTTP=1
export MANOKARA_DATA_DIR="$PWD/.state"
read -r -p 'Generated password hash: ' MANOKARA_PASSWORD_HASH
export MANOKARA_PASSWORD_HASH
.venv/bin/python outputs/manokara_server.py
```

On Windows use `.venv\Scripts\python.exe` and PowerShell `$env:MANOKARA_*` assignments instead of `export`. Open the exact configured hostname. Production cookies are Secure, HttpOnly, and SameSite=Strict; the explicitly enabled local HTTP mode omits Secure. Do not use local mode on the VPS.

```bash
.venv/bin/python -m pytest tests/test_security.py
.venv/bin/python -m pip install playwright==1.63.0
.venv/bin/python -m playwright install chromium
.venv/bin/python tests/browser_smoke.py
```

The Chromium test starts and stops its own server with a temporary database. It checks login, live relay, cookie-free OBS, Folia/JIZURA, credential rotation, logout, and CSP violations. Add `--all-effects` to the Chromium command to check every bundled visualizer. External font/media providers still need to be reachable for their functionality.

## Source and notices

The public `/sources/` URLs deliberately expose the bundled Folia source archive, its integration source, and third-party licenses/notices. Links are available from the login and controller pages. Keep them when deploying updates. Arbitrary directories, Python source, dotfiles, and symlinked files are not served. See the bundled Folia notice for upstream licensing and usage terms.

Reference documentation: [Cloudflare named tunnels](https://developers.cloudflare.com/tunnel/features/locally-managed-tunnels/create-local-tunnel/), [Cloudflare private applications and Access](https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/private-web-app/), [Uvicorn settings](https://uvicorn.dev/settings/), [Arch cloudflared package](https://archlinux.org/packages/extra/x86_64/cloudflared/), and [systemd service hardening](https://man.archlinux.org/man/systemd.exec.5.en).
