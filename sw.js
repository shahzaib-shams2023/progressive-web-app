const CACHE_NAME = 'simple-pwa-v1';

const urlsToCache = [
    '/',
    'index.html'
]

// Cache Install

// caching.js
self.addEventListener("install", event => {
  event.waitUntil(
    // Open a cache of resources.
    caches.open(CACHE_NAME).then(cache => {
      // Begins the process of fetching them. Succeeds only once all
      // resources have been stored. Even just one failing resource
      // causes the entire operation to fail.
      return cache.addAll([
        "/index.html",
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  // No "fetch" events are dispatched to the service worker until it
  // successfully installs and activates.

  // All operations on caches are async, including matching URLs, so we use
  // promises heavily. e.respondWith() even takes promises to enable this:
  event.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    }).catch(() => {
      return caches.match("/index.html");
    })
  );
});
