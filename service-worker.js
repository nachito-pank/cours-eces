// service-worker.js

self.addEventListener('install', event => {
  console.log('Service Worker installé');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activé');
});

self.addEventListener('fetch', event => {
  // Par défaut, laisser passer les requêtes normalement
});
