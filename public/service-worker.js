// Cargar Workbox manualmente
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

// Precarga de imágenes específicas
const IMAGE_ASSETS = [
  "/images/hi/lifestyle-1.webp",
  "/images/hi/lifestyle-2.webp",
  "/images/hi/lifestyle-3.webp",
  "/images/hi/lifestyle-4.webp",
  "/images/hi/lifestyle-5.webp",
  "/images/hi/lifestyle-6.webp",
  "/images/hi/lifestyle-7.webp",
  "/images/hi/lifestyle-8.webp",
  "/images/hi/lifestyle-9.webp",
  "/images/hi/lifestyle-10.webp",
  "/images/hi/lifestyle-11.webp",
  "/images/hi/lifestyle-12.webp",
  "/images/hi/lifestyle-13.webp",
  "/images/hi/lifestyle-14.webp",
  "/images/hi/lifestyle-15.webp",
  "/images/hi/lifestyle-16.webp",
  "/images/hi/lifestyle-17.webp",
  "/images/hi/lifestyle-18.webp",
  "/images/hi/lifestyle-19.webp",
  "/images/hi/lifestyle-20.webp",
  "/images/hi/lifestyle-21.webp",
  "/images/hi/lifestyle-22.webp",
  "/images/hi/lifestyle-23.webp",
  "/images/hi/lifestyle-24.webp",
  "/images/hi/lifestyle-25.webp",
  "/images/hi/lifestyle-26.webp",
  "/images/hi/lifestyle-27.webp",
  "/images/hi/lifestyle-28.webp",
  "/images/hi/lifestyle-29.webp",
  "/images/hi/lifestyle-30.webp",
];

// Precaching gestionado por Workbox
workbox.precaching.precacheAndRoute(
  IMAGE_ASSETS.map((url) => ({ url, revision: null }))
);

// Evento de instalación con cálculo de progreso
self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");

  const total = IMAGE_ASSETS.length;
  let completed = 0;

  event.waitUntil(
    (async () => {
      const cache = await caches.open("manual-image-cache-v1");

      // Cachear imágenes una por una y enviar progreso
      for (const [index, image] of IMAGE_ASSETS.entries()) {
        try {
          await cache.add(image);
          completed += 1;
          console.log(
            "porcentaje completado",
            (completed / IMAGE_ASSETS.length) * 100
          );
          // Enviar progreso al cliente
          const progress = ((completed / total) * 100).toFixed(0);
          const clients = await self.clients.matchAll();

          console.log("PROGRESS", progress);
          clients.forEach((client) =>
            client.postMessage({
              type: "install-progress",
              progress,
            })
          );
        } catch (error) {
          console.error(`Error al cachear ${image}:`, error);
        }
      }
    })()
  );
});

// Cache dinámico para las imágenes
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);
