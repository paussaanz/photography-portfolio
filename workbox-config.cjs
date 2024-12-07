module.exports = {
    globDirectory: 'dist/',
    // globDirectory: 'public/',
    globPatterns: ['**/*.{html,js,css,png,jpg,svg}'],
    swDest: 'dist/service-worker.js',
    // swDest: 'public/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
    ],
  };
  