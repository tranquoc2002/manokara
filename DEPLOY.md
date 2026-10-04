# Deploy Manokara

GitHub stores the source. The included GitHub Actions workflow publishes the static app and its lyric relay together to Cloudflare Workers. A per-browser room token keeps each user's OBS/lyrics state separate.

## One-time setup

1. Create a GitHub repository for this folder. Keep it private if you do not want the source published; the deployed website itself will be public to anyone with its URL.
2. In Cloudflare, create an API token that can edit Workers Scripts for the hosting account. Copy the account ID from the Cloudflare dashboard.
3. In the GitHub repository, open **Settings → Secrets and variables → Actions** and add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. Push the project to the `main` branch. The **Deploy Manokara to Cloudflare Workers** workflow publishes it and shows the `workers.dev` URL in the run logs.
5. Open the deployed URL ending with `/manokara.html`. Copy the OBS Browser Source URL shown in Manokara; it contains the room token that connects OBS and the lyric window to that session.

To use a custom domain, add it under the deployed Worker in Cloudflare **Workers & Pages → Settings → Domains & Routes**.

## Notes

- The URL's `room` value grants access to that session's live lyric state. Share the OBS URL only with people who should see/control that session.
- Song lists and preferences stay in the browser's local storage. The relay stores only the latest live playback/lyric snapshot for each room.
- `outputs/manokara_server.py` remains available for local use; the cloud relay is used only with the deployed URL.
- The Transpose controls use the browser profile already running the deployed page. A website cannot launch a separate private browser profile on a visitor's device.
