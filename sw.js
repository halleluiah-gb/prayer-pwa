const CACHE_NAME = 'prayer-cache-v1';
const urlsToCache = [
  '/prayer-pwa/',
  '/prayer-pwa/index.html',
  '/prayer-pwa/manifest.json',
  '/prayer-pwa/style.css',
  '/prayer-pwa/icon-192.png',
  '/prayer-pwa/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => {
        return new Response("⚠️ You're offline and this resource is not cached.");
      });
    })
  );
});
