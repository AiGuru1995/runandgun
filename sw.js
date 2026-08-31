const CACHE_NAME = 'run-and-gun-v5';
const FILES = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png',
  './hero_green.png', './hero_green_left.png', './hero_blue.png', './hero_blue_left.png',
  './hero_red.png', './hero_red_left.png', './hero_black.png', './hero_black_left.png',
  './enemy.png', './enemy_left.png', './enemy_flyer.png', './enemy_flyer_left.png',
  './enemy_turret.png', './boss.png', './boss_left.png', './background.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(cached=>cached || fetch(e.request)));
});
