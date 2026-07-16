const CACHE = 'allez-v62';

const LOCAL_ASSETS = [
  './index.html',
  './dashboard.html',
  './exercices.html',
  './nutrition.html',
  './progression.html',
  './analyse.html',
  './posture.html',
  './projection.html',
  './lifestyle.html',
  './logbook.html',
  './programme.html',
  './recettes.html',
  './recettes2.html',
  './pingpong.html',
  './comparatif-raquettes.html',
  './fiche-raquette-pingpong.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
];

// Install : mise en cache de tous les fichiers locaux
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(LOCAL_ASSETS.map(url =>
        c.add(new Request(url, { cache: 'reload' }))
      ))
    ).then(() => self.skipWaiting())
  );
});

// Activate : suppression des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch : cache-first pour les fichiers locaux, réseau pour le reste (Google Fonts etc.)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;

  if (!isLocal) {
    // Ressources externes : réseau d'abord, pas de cache (Google Fonts etc.)
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      // Pas en cache : charger depuis le réseau et mettre en cache
      return fetch(e.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Complètement hors ligne et pas en cache
        return new Response('<h1>Hors ligne</h1><p>Ouvre l\'app depuis la page d\'accueil pour accéder au contenu mis en cache.</p>', {
          headers: { 'Content-Type': 'text/html' }
        });
      });
    })
  );
});
