const CACHE_NAME = 'samara-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/musica/canço.mp3',
  '/musica/musicacanço1.mp3',
  '/musica/musicacanço2.mp3',
  '/musica/musicacanço3.mp3',
  '/musica/musicacanço4.mp3',
  '/musica/musicacanço5.mp3',
  '/musica/musicacanço6.mp3',
  '/musica/musicacanço7.mp3',
  '/musica/musicacanço8.mp3',
  '/musica/musicacanço9.mp3',
  '/fotos/fotoportada.jpeg',
  '/fotos/cases-joc.jpg',
  '/fotos/recuerdo1.jpeg',
  '/fotos/recuerdo2.jpeg',
  '/fotos/recuerdo3.jpeg',
  '/fotos/recuerdo4.jpeg',
  '/fotos/recuerdo5.jpeg',
  '/fotos/recuerdo6.jpeg',
  '/fotos/recuerdo7.jpeg',
  '/fotos/recuerdo8.jpeg',
  '/fotos/recuerdo9.jpeg',
  '/fotos/recuerdo10.jpeg',
  '/fotos/recuerdo11.jpeg',
  '/fotos/recuerdo12.jpeg',
  '/fotos/recuerdo13.jpeg',
  '/fotos/recuerdo14.jpeg',
  '/fotos/recuerdo15.jpeg',
  '/fotos/recuerdo16.jpeg'
];

// Instal·lació del Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache obert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activació del Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminant cache antic:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptació de peticions
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retorna la resposta del cache si existeix
        if (response) {
          return response;
        }
        
        // Si no està al cache, fa la petició a la xarxa
        return fetch(event.request).then(
          function(response) {
            // Comprova si la resposta és vàlida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la resposta per poder-la guardar al cache
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
}); 