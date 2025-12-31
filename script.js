const CACHE_NAME = 'gitalks-app-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Yükleme (Install)
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Uygulama dosyaları ve Logo önbelleğe alındı');
        return cache.addAll(urlsToCache);
      })
  );
});

// Getirme (Fetch)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
