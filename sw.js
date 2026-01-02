const CACHE_NAME = 'v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Buraya css veya resim dosyalarını da ekleyebilirsin: './style.css' gibi
];

// Kurulum: Dosyaları önbelleğe al
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Çalıştırma: İnternet yoksa önbellekten göster
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
