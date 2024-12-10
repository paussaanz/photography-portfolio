import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest", // Para usar tu propio `service-worker.js`
      injectManifest: {
        swSrc: "./public/service-worker.js", // Tu SW personalizado
      },
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  build: {
    target: "es2021",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    assetsInlineLimit: 4096,
    manifest: true, // Ayuda a vincular los archivos generados
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react"; // React and React DOM in a separate chunk
            if (id.includes("gsap")) return "gsap"; // GSAP in its own chunk
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("three")) return "three"; // Separate chunk for Three.js
            // return "vendor"; // Group remaining dependencies
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
    exclude: ["three/examples/jsm", "three-mesh-bvh"], // Exclude unused parts
  },
  esbuild: {
    // drop: ["console", "debugger"],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
});
