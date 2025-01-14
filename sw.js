const CACHE_NAME = 'simple-pwa-v1';

const urlsToCache = [
    '/',
    'index.html'
]

// Cache Install

self.addEventListener("install", (event) => {
  console.log("Service Worker : Installed!")

  event.waitUntil(
      
      (async() => {
          try {
              cache_obj = await caches.open(CACHE_NAME)
              cache_obj.addAll(urlsToCache)
          }
          catch{
              console.log("error occured while caching...")
          }
      })()
  )
} )


// Cache data fetching

self.addEventListener("fetch", (event) => {
  // We only want to call event.respondWith() if this is a GET request for an HTML document.
  if (
    event.request.method === "GET" &&
    event.request.headers.get("accept").includes("text/html")
  ) {
    console.log("Handling fetch event for", event.request.url);
    event.respondWith(
      fetch(event.request).catch((e) => {
        console.error("Fetch failed; returning offline page instead.", e);
        return caches
          .open(CACHE_NAME)
          .then((cache) => cache.match(urlsToCache));
      }),
    );
  }
});

