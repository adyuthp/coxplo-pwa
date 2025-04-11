const CACHE_NAME = 'coxplo-cache-v1';
const urlsToCache = [
  '/coxplo-pwa-ultimate-with-license/',
  '/coxplo-pwa-ultimate-with-license/index.html',
  '/coxplo-pwa-ultimate-with-license/assets/css/style.css',
  '/coxplo-pwa-ultimate-with-license/assets/css/responsive.css',
  '/coxplo-pwa-ultimate-with-license/assets/js/custom.js',
  '/coxplo-pwa-ultimate-with-license/assets/img/logo-192x192.png',
  '/coxplo-pwa-ultimate-with-license/assets/img/heading-img-2.ico',
  // Add other assets you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
