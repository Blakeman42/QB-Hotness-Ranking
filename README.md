# QB Hotness Rankings — mobile app setup

This folder is a ready-to-host mini app: `index.html` (your QB Hotness Rankings tool),
`manifest.json` + icons (so it installs like an app), and `sw.js` (so it
still opens with no signal, since your photos are already embedded).

## 1. Host it on GitHub Pages (free, ~5 minutes)

1. Go to github.com and sign in (or create a free account).
2. Click the **+** in the top right → **New repository**. Name it
   something like `qb-rankings`. Keep it **Public**. Create it.
3. On the new repo page, click **Add file → Upload files**, then drag in
   all 6 files from this folder (`index.html`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`). Commit.
4. Go to **Settings → Pages**. Under "Build and deployment", set
   **Source: Deploy from a branch**, branch **main**, folder **/ (root)**.
   Save.
5. Wait ~1 minute, then refresh that page — it'll show your live URL,
   something like:
   `https://<your-username>.github.io/qb-rankings/`

That URL is now permanent. Open it on your phone.

## 2. Add it to your home screen

**iPhone (Safari):** open the URL → tap the Share icon (square with an
arrow) → **Add to Home Screen** → Add.

**Android (Chrome):** open the URL → tap the **⋮** menu → **Add to Home
screen** (or you may see an "Install app" banner) → Add.

It'll now open full-screen with its own icon, no browser bar, and it'll
keep working even with no signal after the first load.

## 3. Updating it later

When you tweak the rankings: open `index.html` in the skill/tool you used
to build it, re-export, then on GitHub just click into the file →
pencil/edit icon (or re-upload it via Add file → Upload files) → Commit.
Refresh the app on your phone and it'll pick up the change within a
few seconds (the service worker checks for a new version on each load).

If a change ever seems stuck on your phone, bump the `CACHE_NAME` version
string at the top of `sw.js` (e.g. `v1` → `v2`) before re-uploading —
that forces your phone to fetch a completely fresh copy instead of the
cached one.
