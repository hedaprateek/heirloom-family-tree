/* Optional offline support; caches only public website files, never family data. */
const CACHE_PREFIX = 'heirloom-offline-';
const CACHE = CACHE_PREFIX + 'v1';
const BASE = new URL('./', self.location.href);
const SHELL = ['index.html', 'pwa.js', 'site.webmanifest', 'vendor/qrcode.js',
  'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'guide.html', 'privacy.html'];
const SHELL_URLS = new Set(SHELL.map(path => new URL(path, BASE).href));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL.map(path => new URL(path, BASE).href))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for(const key of await caches.keys()){
      if(key.startsWith(CACHE_PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if(event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting();
});

async function publicFile(request, url){
  const cache = await caches.open(CACHE);
  const key = url.pathname === BASE.pathname ? new URL('index.html', BASE).href : url.origin + url.pathname;
  // A shared family link's fragment and view options never enter the public cache.
  const cached = await cache.match(key);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(request, {signal:controller.signal});
    if(response.ok && response.type !== 'opaque') await cache.put(key, response.clone());
    if(response.ok || !cached) return response;
  } catch(error){ if(!cached) throw error; }
  finally {clearTimeout(timeout);}
  return cached;
}
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if(url.origin !== BASE.origin) return;
  const key = url.origin + url.pathname;
  if(url.pathname === BASE.pathname || SHELL_URLS.has(key)){
    event.respondWith(publicFile(event.request, url));
  }
});
