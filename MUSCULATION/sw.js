const CACHE = 'allez-v73';

const LOCAL_ASSETS = [
  './index.html',
  './core.js',
  './assets/base.css',
  './assets/fonts/inter-latin-400.woff2',
  './assets/fonts/inter-latin-500.woff2',
  './assets/fonts/inter-latin-600.woff2',
  './assets/fonts/inter-latin-700.woff2',
  './assets/fonts/inter-latin-800.woff2',
  './assets/fonts/bebas-neue-latin-400.woff2',
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

// Install : précache complet. La nouvelle version attend l'accord de l'utilisateur (bandeau « Nouvelle version disponible »),
// sauf à la toute première installation où il n'y a rien à remplacer.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(LOCAL_ASSETS.map(url => c.add(new Request(url, { cache: 'reload' }))))
    ).then(() => self.registration.active ? null : self.skipWaiting())
  );
});

// Le bandeau de core.js envoie SKIP_WAITING quand l'utilisateur choisit « Mettre à jour »
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

// Activate : suppression des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch : stale-while-revalidate pour les fichiers locaux (pages, scripts, styles, données) :
// réponse immédiate depuis le cache, mise à jour du cache en arrière-plan pour la visite suivante.
// Une adresse avec paramètre (?x=1) est servie par la page sans paramètre. Hors ligne et absent du cache : accueil.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(caches.open(CACHE).then(cache =>
    cache.match(e.request, { ignoreSearch: true }).then(cached => {
      const network = fetch(e.request).then(response => {
        if (response && response.ok && response.type === 'basic') {
          const key = url.search ? new Request(url.origin + url.pathname) : e.request;
          cache.put(key, response.clone());
        }
        return response;
      });
      if (cached) { e.waitUntil(network.catch(() => {})); return cached; }
      return network.catch(() => cache.match('./index.html').then(r => r || new Response('<h1>Hors ligne</h1>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
    })
  ));
});
