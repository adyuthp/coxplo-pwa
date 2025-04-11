const CACHE_NAME = 'coxplo-cache-v1';
const urlsToCache = [
  '/coxplo-pwa/',
  '/coxplo-pwa/index.html',
  '/coxplo-pwa/assets/css/style.css',
  '/coxplo-pwa/assets/css/responsive.css',
  '/coxplo-pwa/assets/js/custom.js',
  '/coxplo-pwa/assets/img/logo-192x192.png',
  '/coxplo-pwa/assets/img/heading-img-2.ico'
  // Ensure all these files exist in the specified paths
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }).catch(err => console.error('Failed to cache files:', err))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(err => console.error('Fetch failed:', err))
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
    }).catch(err => console.error('Activation failed:', err))
  );
});
