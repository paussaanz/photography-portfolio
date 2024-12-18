import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import ViteReactPages from "vite-plugin-react-pages";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    ViteReactPages(), // Agregar el plugin para manejar las páginas React automáticamente
    VitePWA({
      strategies: "injectManifest", // Usa tu propio ⁠service-worker.js⁠
      injectManifest: {
        swSrc: "./public/service-worker.js", // Tu archivo SW personalizado
      },
      selfDestroying: true, // Deshabilita el auto-registro de VitePWA
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240, // Solo comprimir archivos mayores a 10KB
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
            if (id.includes("react")) return "react"; // React y React DOM en un chunk separado
            if (id.includes("gsap")) return "gsap"; // GSAP en su propio chunk
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("three")) return "three"; // Chunk separado para Three.js
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
    exclude: ["three/examples/jsm", "three-mesh-bvh"], // Excluir partes no utilizadas
  },
  esbuild: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
});
