const CACHE = 'allez-v68';

const LOCAL_ASSETS = [
  './index.html',
  './core.js',
  './assets/base.css',
  './data/fiches.js',
  './data/nutrition.js',
  './data/programme.js',
  './data/recettes.js',
  './data/repas.js',
  './data/supplements.js',
  './analyse.html',
  './comparatif-raquettes.html',
  './dashboard.html',
  './exercices.html',
  './fiche-raquette-pingpong.html',
  './lifestyle.html',
  './logbook.html',
  './nutrition.html',
  './pingpong.html',
  './posture.html',
  './profil.html',
  './programme.html',
  './progression.html',
  './projection.html',
  './recettes.html',
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
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
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
        return caches.match('./index.html').then(r => r || new Response('<h1>Hors ligne</h1>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
      });
    })
  );
});
