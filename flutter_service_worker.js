'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "6ed6143620056967c9790ac92cd76070",
"assets/assets/1.jpg": "5a9cf5f279034f128de0a9e40bc2beb9",
"assets/assets/2.jpg": "435e87327d5b7164174426dcfb21663a",
"assets/assets/3.jpg": "cfe4008f8ecda3a4d9db58ae837b3484",
"assets/assets/4.jpg": "1abdacc9076eb741c6b95408fcd46083",
"assets/assets/5.jpg": "f15bc7dbe00f6c75921fcda0d64bc737",
"assets/assets/bank1.png": "576bcd2c87f2787a30eb6a7cab3309e3",
"assets/assets/bank10.png": "52d14f755adc499fcb46c84c3b442d64",
"assets/assets/bank11.png": "3de0d3476afb6337a4a51221916fae18",
"assets/assets/bank12.png": "65dcaa2702f2eafd143d5003b60ef25b",
"assets/assets/bank13.png": "925f5543b0160c24f341be19ab2af4d3",
"assets/assets/bank14.png": "8cdc6a22e0d6cc7f452c63229455bac8",
"assets/assets/bank15.png": "fc1484458a48fb27c0bb08275deb2f31",
"assets/assets/bank16.png": "45e06740966b541c3f5e87063f85a3da",
"assets/assets/bank17.png": "925f5543b0160c24f341be19ab2af4d3",
"assets/assets/bank18.png": "242bb1b78a250fd2d41bae5313d6b328",
"assets/assets/bank19.png": "d3e61c5f629cc675e5e3a744d1d0b8ea",
"assets/assets/bank2.png": "b2ce90e74aa14e52824f229f04a812b3",
"assets/assets/bank20.png": "8d0f639ea9eebaa8efc5d5518f9fc348",
"assets/assets/bank21.png": "889e9ce93c8c579b6ed2ce5b06b265dc",
"assets/assets/bank3.png": "bc1b0733bd3223543ff9106e12f0f82e",
"assets/assets/bank4.png": "7b8d42a4e1b7574f6db1a809eb87b0a5",
"assets/assets/bank5.png": "3c72f1edc9a64d8e32bed7cb23753e20",
"assets/assets/bank6.png": "9de7ad06825dcb3efec706fa2a5e6364",
"assets/assets/bank7.png": "cfb93d1a841886f4c3e2a1c762754e3c",
"assets/assets/bank8.png": "c00bf8a6e122ef5b6b093fcd174872b2",
"assets/assets/bank9.png": "1fbe45d8b39178423d7b9789ca2dff1f",
"assets/assets/bankproject.png": "ab03ed75ae16ef825139706ab926aed6",
"assets/assets/Dandy.JPG": "834a51cb29674a6332543f58a8704c5f",
"assets/assets/dandy.png": "fac0f9b2dcfad93e68713cfafb5aaa78",
"assets/assets/fifthpic.png": "2349af15e85a8088d58bb3f9e9b708a1",
"assets/assets/firstpic.png": "34b89ac772d4dcca069196d4ae15cebc",
"assets/assets/fourthpic.png": "0d307c3568f029c1fd6948b7ec1e67fa",
"assets/assets/git.png": "a9d2dce7b3a81590961d8ac2ae94e134",
"assets/assets/instagram.png": "5c570427ee23f69853d28aec805eee79",
"assets/assets/lastpic.png": "8d49a658d0017ae737319c1922489a59",
"assets/assets/linkedin.png": "fd0d5546fdbdc85c76c4372a0d51f1bc",
"assets/assets/secondpic.png": "b769dc89950c2c1533d1037a0a070ed9",
"assets/assets/seventhpic.png": "8c476c389fefd8a3e7a9afa8127ae59e",
"assets/assets/sixthpic.png": "116b54b9ed5a9ecb8d2fd34e7b387d61",
"assets/assets/thirdpic.png": "b1fccadfdd148c365b7ce537b0130900",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "dfeb2274d4bf8440d2740473371564ab",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "a0e6431df7592fb31c3554cf96a2079d",
"/": "a0e6431df7592fb31c3554cf96a2079d",
"main.dart.js": "aea8f402d4f8d77c7c876de84819f53c",
"manifest.json": "1ccdc42b5b775f962de17a9c1fe39e76",
"version.json": "78c2845cb52ff4524dd307232b82020b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
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
