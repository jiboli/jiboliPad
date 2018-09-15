const version = "0.2.33";
const cacheName = `jibolipad-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `index.html`,
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

window.addEventListener('beforeinstallprompt', function(e) {
  // beforeinstallprompt Event fired

  // e.userChoice will return a Promise.
  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
  e.userChoice.then(function(choiceResult) {

    console.log(choiceResult.outcome);

    if(choiceResult.outcome == 'dismissed') {
      console.log('User cancelled home screen install');
    }
    else {
      console.log('User added to home screen');
    }
  });
});