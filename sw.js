const CACHE_NAME = 'simple-pwa-v1';

const urlsToCache = [
    '/',
    'index.html'
]

// Cache Install

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open("v1")
        .then((cache) =>
          cache.addAll([
            "/",
            "/index.html",
          ]),
        ),
    );
  });

// Cache data fetching

self.addEventListener('fetch' , (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response){
                return response
            }
            return fetch(event.request)
        })
    )
})
