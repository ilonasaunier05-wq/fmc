const CACHE = 'romantasy-queen-os-v5-cache-1';
const APP_SHELL = ['./','./index.html','./styles.css','./app.js','./manifest.json','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(cache => cache.put(req, copy)).catch(()=>{});
    return res;
  }).catch(() => caches.match('./index.html'))));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(clientList => {
    for (const client of clientList) { if ('focus' in client) return client.focus(); }
    if (clients.openWindow) return clients.openWindow('./index.html');
  }));
});
