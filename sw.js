self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('prayer-cache').then((cache) => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      './style.css',
      './icon-192.png',
      './icon-512.png'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});