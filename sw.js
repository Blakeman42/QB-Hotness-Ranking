// Bump this version string any time you update index.html and push a new
// version — that's what forces phones to fetch the fresh copy instead of
// serving the old cached one.
const CACHE_NAME = "qb-rankings-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for our own assets, network-first fallback for everything else
// (e.g. Google Fonts) so the app still opens instantly with no signal.
self.addEventListener("fetch", (event) => {
  const isOwnAsset = ASSETS.some((asset) =>
    event.request.url.endsWith(asset.replace("./", "/"))
  ) || event.request.url.endsWith("/");

  if (isOwnAsset) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
