/* ---------------------------------------------------------------------------
   QB Hotness Rankings - service worker REMOVAL shim
   ---------------------------------------------------------------------------
   Earlier versions of this site were a PWA. That service worker used a
   cache-first strategy, so once installed it kept serving its own cached copy
   of index.html and every new upload appeared to change nothing.

   Deleting sw.js from the repo is not reliable on its own, and a fix placed
   inside index.html cannot help either: the old worker intercepts the request
   and the new index.html is never fetched.

   The browser DOES re-check sw.js itself on navigation, byte for byte. So this
   file replaces the old worker, wipes every cache it created, unregisters
   itself, and reloads any open tab. It has no fetch handler, so while it is
   briefly alive all requests go straight to the network.

   Upload this alongside index.html. It is safe to leave in place forever, and
   safe to delete once everyone has loaded the site at least once.
--------------------------------------------------------------------------- */

self.addEventListener('install', function(){
  // Take over immediately instead of waiting for existing tabs to close.
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil((async function(){
    try {
      // 1. Delete every cache on this origin, including the old qb-rankings-v* ones.
      if (self.caches && caches.keys) {
        var keys = await caches.keys();
        await Promise.all(keys.map(function(k){ return caches.delete(k); }));
      }

      // 2. Claim open pages so the reload below actually reaches them.
      if (self.clients && self.clients.claim) {
        await self.clients.claim();
      }

      // 3. Remove this registration so no worker remains in control.
      await self.registration.unregister();

      // 4. Reload open tabs so they fetch the real index.html from the network.
      var windows = await self.clients.matchAll({ type: 'window' });
      windows.forEach(function(client){
        if (client.navigate) { client.navigate(client.url); }
      });
    } catch (err) {
      // Nothing useful to do here; the registration is going away regardless.
    }
  })());
});

/* Deliberately no 'fetch' listener. Without one the browser bypasses this
   worker for network requests, so nothing can be served from a stale cache. */
