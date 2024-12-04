import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
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
    }
  },
});
