'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "8c032a5507c9d0bf2303fcba2713f728",
"assets/assets/anim1.json": "b6a331a54f98cd1745bd6a91a2541a48",
"assets/assets/anim2.json": "e4210ee26ae0b5af8afc74325694c5d0",
"assets/assets/anim3.json": "838dee70f11609332e3cb33b2b51e272",
"assets/assets/images/calculator_app_img.png": "4d7f29d98741a717a7b18b82db631547",
"assets/assets/images/news_app_img.png": "5d90b8f0866c3ccfe76d873fc4c8a58e",
"assets/assets/images/p1.jpg": "8a734a33bf6f9917f6f76373b77cab25",
"assets/assets/images/p2.jpg": "b3f588f904ae3bca8269490c86a0cd37",
"assets/assets/images/p3.jpg": "a3514294ad97d756b0686c94b6e979b3",
"assets/assets/images/p4.jpg": "2d9f7955441ef632a678e048f33e7d6b",
"assets/assets/images/p5.jpg": "b6ae441975dd3e141d608af9bd0b04dd",
"assets/assets/images/p6.jpg": "725693b4397044acfb606943485e4a0d",
"assets/assets/images/p7.jpg": "b4fe0adf8e016474d1572569cdc913eb",
"assets/assets/images/p8.jpg": "d826fac1a4c58b7b94766ce88bcfaafe",
"assets/assets/images/profile1.png": "65ad1d86289afdc099dfe94a55283bc5",
"assets/assets/images/puzzle_app_img.png": "02c52f21dd9f65099f06486702ec6498",
"assets/assets/images/recipe_app_img.png": "3a2bfd69b9fef1d0eec1aa2413b861e7",
"assets/assets/images/weather_app_img.png": "7720dcdb74dba008e953ea95a6467826",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "1b891ac169875779529f3a775721822f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d1722d5cf2c7855862f68edb85e31f88",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "613e4cc1af0eb5148b8ce409ad35446d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dd3c4233029270506ecc994d67785a37",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "27e1807a86b9e66f828c4b0efe2d4f40",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "b4d0e1327fac29fe98ab4527cf9a71aa",
"icons/Icon-512.png": "fb79b73f9bb27467933a203e144ff2aa",
"icons/Icon-maskable-192.png": "b4d0e1327fac29fe98ab4527cf9a71aa",
"icons/Icon-maskable-512.png": "fb79b73f9bb27467933a203e144ff2aa",
"index.html": "c614e09d60cbe88657e20ed06f8ee05a",
"/": "c614e09d60cbe88657e20ed06f8ee05a",
"main.dart.js": "ad501c0b91e55816e1264b52b907b3c7",
"manifest.json": "899056a032b46e9ef37e3efec0bce63a",
"splash/img/dark-1x.png": "d7bb369f7057656920a17b7f3ed821d1",
"splash/img/dark-2x.png": "446730374fc83656e129e1871b9455d1",
"splash/img/dark-3x.png": "846ebdea4c2d28128be56388532fab07",
"splash/img/dark-4x.png": "fb79b73f9bb27467933a203e144ff2aa",
"splash/img/light-1x.png": "d7bb369f7057656920a17b7f3ed821d1",
"splash/img/light-2x.png": "446730374fc83656e129e1871b9455d1",
"splash/img/light-3x.png": "846ebdea4c2d28128be56388532fab07",
"splash/img/light-4x.png": "fb79b73f9bb27467933a203e144ff2aa",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "43789265b123e8f9129747757b090735",
"version.json": "0852d1e0dfc18b545fb305798d9ec615"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
