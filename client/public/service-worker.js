// Triple X Adventures Service Worker
const CACHE_NAME = 'triplex-adventures-v2';
// Define core assets to cache immediately
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/images/TXA_fallback.jpg',
  '/images/TXA_fallback_optimized.jpg'
];

// Define regex patterns for assets that should be cached
const ASSET_CACHE_PATTERNS = [
  /\.(?:js|css|woff2|png|jpg|jpeg|webp|svg|gif)$/,
  /^\/(assets|images|icons)\/.*$/
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - network first strategy for production reliability
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests - use network-first for HTML
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // For all other requests, use network first in production for reliability
  event.respondWith(
    fetch(event.request.clone())
      .then((response) => {
        // Return the response if it's not valid
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the successful response for offline use
        const url = new URL(event.request.url);
        const shouldCache = ASSET_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
        
        if (shouldCache && !url.pathname.endsWith('.mp4') && !url.pathname.endsWith('.webm')) {
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => console.log('Caching error:', err));
        }

        return response;
      })
      .catch((error) => {
        console.log('Fetch failed, falling back to cache:', error);
        // Try the cache as fallback
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Fallback image for image requests
            if (event.request.destination === 'image') {
              return caches.match('/images/TXA_fallback_optimized.jpg');
            }
            
            // Generic offline fallback
            return new Response('Offline', { 
              status: 503, 
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});