/* EcoBridge service worker: lets the site open without internet after the first visit */
const CACHE = 'ecobridge-v1';
const CORE = [
  'index.html', 'portfolio-details.html', 'service-details.html',
  'assets/css/main.css', 'assets/js/main.js', 'assets/js/accessibility.js', 'assets/js/details-data.js', 'assets/js/details.js',
  'assets/vendor/bootstrap/css/bootstrap.min.css',
  'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  'assets/vendor/bootstrap-icons/bootstrap-icons.css',
  'assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff2',
  'assets/vendor/aos/aos.css', 'assets/vendor/aos/aos.js',
  'assets/vendor/glightbox/css/glightbox.min.css', 'assets/vendor/glightbox/js/glightbox.min.js',
  'assets/vendor/imagesloaded/imagesloaded.pkgd.min.js', 'assets/vendor/isotope-layout/isotope.pkgd.min.js',
  'assets/vendor/php-email-form/validate.js',
  'assets/img/logo.png', 'assets/img/favicon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
