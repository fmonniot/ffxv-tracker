const VERSION = 1 // Update this when the app code change, not necessary when the config change
const CACHE_NAME = 'ffxv-tracker-cache-v' + VERSION
const ROOT = "./"

const URLS_TO_CACHE = [
    // Needs to update this Service Worker
  ROOT,
  ROOT+'main.css',
  ROOT+'bundle.js',
  ROOT+'fonts/roboto-normal-latin.woff2',
  ROOT+'fonts/roboto-medium-latin.woff2',

    // Doesn't need to update this Service Worker
  ROOT+'data/config.json',
  ROOT+'data/data.json',
  ROOT+'data/hunts.json',
  ROOT+'data/side-quests.json'
];

const VERSION_KEY_TO_URL = {
  "hunter-ranks": ROOT+'data/data.json',
  "hunts": ROOT+'data/hunts.json',
  "side-quests": ROOT+'data/side-quests.json'
}

let versions = {}

self.addEventListener('install', (event) => {
  console.log("'install sw")
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE)
        }).catch((e) => {
            console.log('', e)
            return e
        })
    )
})

self.addEventListener('fetch', function(event) {

    if(event.request.url.match(/data\/config\.json/)) {
        fetch(ROOT+'data/config.json').then(function(res){ return res.json()}).then(function(config) {
            caches.open(CACHE_NAME).then((cache) => {
                Object.keys(config.versions).map(function(key) {
                    const newVersion = (typeof config.versions[key] === 'number') ? config.versions[key] : 0
                    const oldVersion = (typeof versions[key] === 'number') ? versions[key] : 0

                    console.log('Trying to update', key, 'from version', oldVersion, 'to version', newVersion)
                    if(newVersion > oldVersion) {
                        const url = VERSION_KEY_TO_URL[key]

                        if(url !== undefined) {
                            cache.add(url).then(() => {
                                console.log('updated config', key, 'from version', oldVersion, 'to version', newVersion)
                                versions[key] = newVersion
                            })
                        }
                    }
                })
            })
            
        })
    }

    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            console.log('cache hit with', response, 'and event')
            if (response) {
            return response;
            }
            return fetch(event.request);
        }
        )
    )
});