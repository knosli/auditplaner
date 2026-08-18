// Anliker Audit Planer - Service Worker
// Network only - immer frische Daten, kein Caching
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Clear all caches on activation
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => clients.claim())
  );
});

// Always fetch from network - no caching
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
