const CACHE_NAME = 'samara-app-v1';
const urlsToCache = [
  '/regal-samara/',
  '/regal-samara/index.html',
  '/regal-samara/style.css',
  '/regal-samara/musica/canço.mp3',
  '/regal-samara/musica/musicacanço1.mp3',
  '/regal-samara/musica/musicacanço2.mp3',
  '/regal-samara/musica/musicacanço3.mp3',
  '/regal-samara/musica/musicacanço4.mp3',
  '/regal-samara/musica/musicacanço5.mp3',
  '/regal-samara/musica/musicacanço6.mp3',
  '/regal-samara/musica/musicacanço7.mp3',
  '/regal-samara/musica/musicacanço8.mp3',
  '/regal-samara/musica/musicacanço9.mp3',
  '/regal-samara/fotos/fotoportada.jpeg',
  '/regal-samara/fotos/cases-joc.jpg',
  '/regal-samara/fotos/recuerdo1.jpeg',
  '/regal-samara/fotos/recuerdo2.jpeg',
  '/regal-samara/fotos/recuerdo3.jpeg',
  '/regal-samara/fotos/recuerdo4.jpeg',
  '/regal-samara/fotos/recuerdo5.jpeg',
  '/regal-samara/fotos/recuerdo6.jpeg',
  '/regal-samara/fotos/recuerdo7.jpeg',
  '/regal-samara/fotos/recuerdo8.jpeg',
  '/regal-samara/fotos/recuerdo9.jpeg',
  '/regal-samara/fotos/recuerdo10.jpeg',
  '/regal-samara/fotos/recuerdo11.jpeg',
  '/regal-samara/fotos/recuerdo12.jpeg',
  '/regal-samara/fotos/recuerdo13.jpeg',
  '/regal-samara/fotos/recuerdo14.jpeg',
  '/regal-samara/fotos/recuerdo15.jpeg',
  '/regal-samara/fotos/recuerdo16.jpeg'
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