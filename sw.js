const CACHE_NAME = 'prayer-cache-v3'; // bump version to refresh
const urlsToPreCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// 👉 Add your Google Script App URL here
const APP_URL = "https://script.google.com/macros/s/AKfycbxYourScriptID/exec";

// Precache essential assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...urlsToPreCache, APP_URL]))
  );
});

// Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Cache-first strategy with background update
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // If request is for the Google Script iframe → cache it
  if (event.request.url.startsWith(APP_URL)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default: cache-first for everything else
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (cachedResponse) return cachedResponse;
          if (event.request.destination === 'document') {
            return new Response(
              `<h1>📴 Offline</h1><p>This page is not cached.</p>`,
              { headers: { 'Content-Type': 'text/html' } }
            );
          }
        });
      return cachedResponse || fetchPromise;
    })
  );
});
