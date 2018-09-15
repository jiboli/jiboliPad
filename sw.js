const version = "0.2.33";
const cacheName = `jibolipad-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `index.html`,
        `/#JIZxHsAIEvIVwLaQEYBtwGMoBMCmkA7cAFwEMQAaSXEDAJ1wDdTIoBHOfDgSxFzsK5UuKgQDHURuDiQQpZP1aQO+KRgBX1Wg0a44VUlAQ0EUYrgQAHdp0ITIUmXwF46dOMlLYoloS0C8G4CVO8q2jBha9Ex6AHQAUJAJiQnxSakAYnAEAOf23iCQAEIkAK80kAAUFqx0eAgAlABcKakt/oAjO5AAcuBSkACCdDxSzS1J/oDou5AAwuBWpHTE3KgAFvMjown+gH07haTcAB7z/YNw3MMbqRPTs5bziytHAKoASgAy03ALpOupP0lFxFK+Tw12w3AAZtwMKQcuAmhcxoAkXdBEKhR3M+2IUCqnj4ADYACx/VqAZF3IAARXBYMGQ6ECDFY6hIXG4QnE5IbIA===`,
        `manifest.json`,
        `styles/inline.css`,
        `scripts/app.js`,
        `scripts/clipboard.min.js`,
        `scripts/lz-string.min.js`,
        `images/icons/icon-32x32.png`,
        `images/svg/file.svg`,
        `images/svg/external-link-symbol.svg`,
        `images/svg/link-symbol.svg`,
        `images/svg/padlock.svg`,
        `images/svg/padlock-unlock.svg`,
        `images/svg/paste-from-clipboard.svg`,
        `images/svg/save-file-option.svg`,
        `images/svg/share-symbol.svg`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});