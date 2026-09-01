# What to upload

Upload **both** files to the root of your GitHub Pages repo, replacing what's there.

| File | Action |
|---|---|
| `index.html` | Replace the existing one |
| `sw.js` | **Replace the existing one.** Do not skip this. |

## Why sw.js matters

The old version of this site was a PWA. Its service worker used a *cache-first*
strategy, so once installed on a phone it kept serving its own saved copy of
`index.html`. Every new upload appeared to change nothing — which is exactly
what you saw.

Uploading only `index.html` cannot fix this, because the old worker intercepts
the request and your new file is never fetched. The browser does, however,
re-check `sw.js` itself on every visit. The replacement `sw.js` uses that one
remaining opening to wipe the caches, unregister itself, and reload the page.

Verified end to end: with only `index.html` replaced the old version still
loaded; after replacing `sw.js` too, the new version loaded and both the
service worker registrations and caches dropped to zero.

## Optional cleanup

These are leftovers from the PWA and are no longer referenced:

- `manifest.json`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`

Safe to delete. Leave `sw.js` in place until everyone has opened the site once;
after that it can go too.

## If your own phone still shows the old version

It should self-correct within a visit or two. To force it:

- **iPhone / Safari:** Settings → Safari → Advanced → Website Data → search for
  your site → swipe to delete.
- **Android / Chrome:** open the site → tap the padlock → Cookies and site data
  → Manage → Delete.

## How to tell you're on the new version

- Photos are centred, never pushed to one side
- No arrows sitting on top of the photo
- Buttons reading "Previous player" and "Next player" *below* the photo
- Sliding animation when you change player
