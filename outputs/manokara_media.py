"""Optional YouTube video relay: bounded processes and pipes, never media files."""

import asyncio
from dataclasses import dataclass
import ipaddress
import json
import math
import os
import re
import secrets
import shutil
import signal
import socket
import subprocess
import time
from urllib.parse import urlsplit

from starlette.exceptions import HTTPException
from starlette.responses import StreamingResponse

VIDEO_ID = re.compile(r"[A-Za-z0-9_-]{11}")
MAX_METADATA = 2 * 1024 * 1024
MAX_DURATION = 7200
MAX_TRANSFER = 256 * 1024 * 1024


@dataclass(frozen=True)
class MediaSettings:
    enabled: bool = False
    executable: str = "yt-dlp"
    ffmpeg: str = "ffmpeg"
    runtime: str = "deno"
    firefox: bool = False
    profile: str = ""
    impersonate: str = ""

    @classmethod
    def from_env(cls):
        enabled = os.environ.get("MANOKARA_YTDLP_ENABLED", "0") == "1"
        firefox = os.environ.get("MANOKARA_YTDLP_FIREFOX_COOKIES", "0") == "1"
        profile = os.environ.get("MANOKARA_YTDLP_FIREFOX_PROFILE", "")
        runtime = os.environ.get("MANOKARA_YTDLP_JS_RUNTIME", "deno")
        impersonate = os.environ.get("MANOKARA_YTDLP_IMPERSONATE", "")
        if impersonate and not re.fullmatch(r"[A-Za-z0-9_.:-]{1,80}", impersonate):
            raise ValueError("MANOKARA_YTDLP_IMPERSONATE must be a browser target such as chrome.")
        if runtime not in ("deno", "node"):
            raise ValueError("MANOKARA_YTDLP_JS_RUNTIME must be deno or node.")
        if any(c in profile for c in "\r\n\0:") or profile.startswith("-"):
            raise ValueError("MANOKARA_YTDLP_FIREFOX_PROFILE must be a Firefox profile name or path.")
        if profile and not firefox:
            raise ValueError("MANOKARA_YTDLP_FIREFOX_PROFILE requires MANOKARA_YTDLP_FIREFOX_COOKIES=1.")
        executable = os.environ.get("MANOKARA_YTDLP_PATH", "yt-dlp")
        ffmpeg = os.environ.get("MANOKARA_FFMPEG_PATH", "ffmpeg")
        if enabled:
            for name in (executable, ffmpeg, runtime):
                if not shutil.which(name):
                    raise ValueError(f"YouTube streaming requires {name}. Install yt-dlp, FFmpeg and {runtime}, or unset MANOKARA_YTDLP_ENABLED.")
            executable = shutil.which(executable)
            # yt-dlp's --ffmpeg-location takes a filesystem path, not a PATH lookup.
            ffmpeg = shutil.which(ffmpeg)
        return cls(enabled, executable, ffmpeg, runtime, firefox, profile, impersonate)


def command(settings):
    args = [settings.executable, "--ignore-config", "--no-plugin-dirs", "--no-cache-dir",
            "--no-cookies", "--no-remote-components", "--no-js-runtimes", "--js-runtimes", settings.runtime,
            "--socket-timeout", "10", "--retries", "0", "--extractor-retries", "0", "--fragment-retries", "0",
            "--no-playlist", "--no-progress", "--no-warnings", "--quiet", "--no-check-formats",
            "--use-extractors", "youtube", "--proxy", ""]
    if settings.firefox:
        args += ["--cookies-from-browser", "firefox" + (":" + settings.profile if settings.profile else "")]
    else:
        args += ["--no-cookies-from-browser"]
    if settings.impersonate:
        args += ["--impersonate", settings.impersonate]
    return args


def media_url(value):
    if not isinstance(value, str) or len(value) > 16384:
        raise HTTPException(502, "YouTube returned an invalid media address.")
    try:
        url = urlsplit(value)
        valid = (url.scheme == "https" and url.hostname and url.hostname.endswith(".googlevideo.com")
                 and url.port in (None, 443) and not url.username and not url.password and not url.fragment)
    except ValueError:
        valid = False
    if not valid:
        raise HTTPException(502, "YouTube returned an unsupported media address.")
    return url.hostname


def select_formats(info, video_id):
    duration = info.get("duration")
    if (info.get("id") != video_id or info.get("_type", "video") != "video"
            or info.get("availability") not in ("public", "unlisted")
            or info.get("age_limit", 0) != 0 or info.get("is_live") or info.get("has_drm")
            or info.get("live_status") in ("is_live", "is_upcoming", "post_live")
            or type(duration) not in (int, float) or not math.isfinite(duration) or not 0 < duration <= MAX_DURATION):
        raise HTTPException(422, "Streaming supports public, unrestricted, recorded YouTube videos up to two hours.")
    formats = info.get("formats")
    if not isinstance(formats, list):
        raise HTTPException(502, "YouTube returned no playable formats.")
    usable = []
    for item in formats:
        if (not isinstance(item, dict) or item.get("has_drm") or item.get("protocol") not in ("https", "m3u8_native")
                or not re.fullmatch(r"[A-Za-z0-9_-]{1,30}", str(item.get("format_id", "")))):
            continue
        try:
            media_url(item.get("url"))
        except HTTPException:
            continue
        usable.append(item)
    # HLS works for videos whose ordinary signed HTTP formats return 403.
    for protocol in ("m3u8_native", "https"):
        videos = [f for f in usable if f["protocol"] == protocol and str(f.get("vcodec", "")).startswith("avc1")
                  and type(f.get("height")) is int and 0 < f["height"] <= 720]
        audios = [f for f in usable if f["protocol"] == protocol and f.get("vcodec") == "none"
                  and (str(f.get("acodec", "")).startswith("mp4a")
                       or protocol == "m3u8_native" and f.get("acodec") is None and f.get("ext") in ("mp4", "m4a"))]
        if videos and audios:
            video = max(videos, key=lambda f: f["height"])
            audio = max(audios, key=lambda f: (f.get("abr") or f.get("tbr") or 0, str(f["format_id"])))
            break
    else:
        raise HTTPException(422, "YouTube has no compatible H.264/AAC stream for this video.")
    fields = ("format_id", "url", "protocol", "ext", "vcodec", "acodec", "height", "width", "http_headers")
    selected = [{k: f[k] for k in fields if k in f} for f in (video, audio)]
    # No webpage URL, playlists, subtitles, filenames, plugins or fallback extraction.
    metadata = {k: info[k] for k in ("id", "duration", "availability", "age_limit", "extractor", "extractor_key", "http_headers") if k in info}
    metadata.update({"_type": "video", "title": "Manokara stream", "formats": selected})
    if len(json.dumps(metadata).encode()) > 65536:
        raise HTTPException(502, "YouTube stream metadata exceeded the relay limit.")
    return metadata


class MediaService:
    def __init__(self, settings):
        self.settings = settings
        self.lookups = asyncio.Semaphore(4)
        self.tickets = {}
        self.processes = set()
        self.active = {}

    async def spawn(self, args):
        options = {"start_new_session": True} if os.name != "nt" else {"creationflags": subprocess.CREATE_NEW_PROCESS_GROUP}
        process = await asyncio.create_subprocess_exec(*args, stdin=asyncio.subprocess.PIPE,
                    stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.DEVNULL, limit=131072, **options)
        self.processes.add(process)
        return process

    async def stop(self, process):
        try:
            if os.name != "nt":
                # Kill FFmpeg as well, including when its yt-dlp parent has already exited.
                os.killpg(process.pid, signal.SIGKILL)
            elif process.returncode is None:
                killer = await asyncio.create_subprocess_exec("taskkill", "/PID", str(process.pid), "/T", "/F",
                            stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.DEVNULL)
                await killer.wait()
        except ProcessLookupError:
            pass
        finally:
            await process.wait()
            self.processes.discard(process)

    async def capture(self, args):
        process = await self.spawn(args)
        try:
            process.stdin.close()
            data = bytearray()
            async with asyncio.timeout(45):
                while block := await process.stdout.read(65536):
                    data.extend(block)
                    if len(data) > MAX_METADATA:
                        raise HTTPException(502, "YouTube metadata exceeded the lookup limit.")
                if await process.wait():
                    raise HTTPException(502, "YouTube stream lookup failed. Try again or open the video on YouTube.")
            return json.loads(data)
        except (TimeoutError, ValueError):
            raise HTTPException(502, "YouTube stream lookup failed or timed out.")
        finally:
            await self.stop(process)

    async def resolve(self, video_id, room_id, digest):
        if not self.settings.enabled:
            raise HTTPException(503, "Server playback is disabled. Open this video on YouTube.")
        if not isinstance(video_id, str) or not VIDEO_ID.fullmatch(video_id):
            raise HTTPException(400, "A valid YouTube video ID is required.")
        if self.lookups.locked():
            raise HTTPException(429, "Too many video lookups. Try again shortly.")
        async with self.lookups:
            info = await self.capture(command(self.settings) + ["--skip-download", "--dump-single-json", "--", "https://www.youtube.com/watch?v=" + video_id])
            if not isinstance(info, dict):
                raise HTTPException(502, "YouTube returned invalid metadata.")
            metadata = select_formats(info, video_id)
            for host in {media_url(f["url"]) for f in metadata["formats"]}:
                try:
                    addresses = await asyncio.wait_for(asyncio.get_running_loop().getaddrinfo(host, 443, type=socket.SOCK_STREAM), 5)
                except (OSError, TimeoutError):
                    raise HTTPException(502, "YouTube media address lookup failed.")
                if not addresses or any(not ipaddress.ip_address(a[4][0]).is_global for a in addresses):
                    raise HTTPException(502, "YouTube returned a non-public media address.")
        self.tickets = {key: value for key, value in self.tickets.items() if value["expires"] > time.monotonic() and value["room"] != room_id}
        if len(self.tickets) >= 128:
            raise HTTPException(429, "Too many pending videos. Try again later.")
        ticket = secrets.token_hex(16)
        self.tickets[ticket] = {"room": room_id, "digest": digest, "metadata": metadata, "expires": time.monotonic() + 900}
        return {"ticket": ticket, "duration": metadata["duration"]}

    def get_ticket(self, ticket, room_id, digest):
        entry = self.tickets.get(ticket)
        if not entry or entry["room"] != room_id or entry["digest"] != digest or entry["expires"] <= time.monotonic():
            raise HTTPException(404, "This video stream expired. Play the song again.")
        return entry

    async def open(self, ticket, room_id, digest, start):
        entry = self.get_ticket(ticket, room_id, digest)
        if not math.isfinite(start) or not 0 <= start < entry["metadata"]["duration"]:
            raise HTTPException(400, "Invalid video start time.")
        if sum(self.active.values()) >= 8 or self.active.get(digest, 0) >= 2:
            raise HTTPException(429, "Too many video streams. Stop another video and try again.")
        self.active[digest] = self.active.get(digest, 0) + 1
        metadata = entry["metadata"]
        args = command(self.settings) + ["--load-info-json", "-", "-f", "+".join(f["format_id"] for f in metadata["formats"]),
                "--downloader", "ffmpeg", "--ffmpeg-location", self.settings.ffmpeg,
                "--downloader-args", "ffmpeg_i:-protocol_whitelist https,tls,tcp -rw_timeout 15000000",
                "--downloader-args", "ffmpeg_o:-bsf:a aac_adtstoasc -movflags frag_keyframe+empty_moov+default_base_moof -f mp4",
                "--download-sections", f"*{start}-{metadata['duration']}", "--no-part", "--no-continue", "-o", "-"]
        process = None
        try:
            process = await self.spawn(args)
            process.stdin.write(json.dumps(metadata).encode())
            await process.stdin.drain()
            process.stdin.close()
            # Do not send a successful HTTP response for a failed or header-only stream.
            async with asyncio.timeout(30):
                initial = await process.stdout.readexactly(16384)
            return process, initial
        except (TimeoutError, asyncio.IncompleteReadError, OSError):
            if process:
                await self.stop(process)
            self.release(digest)
            raise HTTPException(502, "YouTube could not supply this video stream. Try again or open it on YouTube.")
        except BaseException:
            if process:
                await self.stop(process)
            self.release(digest)
            raise

    def release(self, digest):
        self.active[digest] -= 1
        if not self.active[digest]:
            del self.active[digest]

    async def stream(self, process, initial, digest, valid):
        try:
            transferred = len(initial)
            deadline = time.monotonic() + MAX_DURATION + 60
            yield initial
            while valid() and time.monotonic() < deadline:
                async with asyncio.timeout(30):
                    block = await process.stdout.read(65536)
                if not block or transferred + len(block) > MAX_TRANSFER:
                    return
                transferred += len(block)
                yield block
        except TimeoutError:
            return
        finally:
            await self.stop(process)
            self.release(digest)

    async def close(self):
        for process in list(self.processes):
            await self.stop(process)
        self.tickets.clear()


class MediaResponse(StreamingResponse):
    """Reap media processes even if sending headers fails before iteration starts."""

    def __init__(self, service, process, initial, digest, valid):
        self.service, self.process, self.digest = service, process, digest
        super().__init__(service.stream(process, initial, digest, valid), media_type="video/mp4",
                         headers={"X-Accel-Buffering": "no", "Accept-Ranges": "none"})

    async def __call__(self, scope, receive, send):
        try:
            await super().__call__(scope, receive, send)
        finally:
            await self.body_iterator.aclose()
            if self.process in self.service.processes:
                await self.service.stop(self.process)
                self.service.release(self.digest)
