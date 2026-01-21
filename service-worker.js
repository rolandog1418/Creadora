const CACHE_NAME = "editor-ia-v1";

const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") {
    // Navegación: primero red, luego cache
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, resp.clone());
            return resp;
          });
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Recursos: cache first
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request);
    })
  );
});
