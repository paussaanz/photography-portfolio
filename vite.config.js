import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import prerender from "vite-plugin-prerender";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }),
    viteCompression({ algorithm: "gzip" }),
    prerender({
      routes: ["/", "/about", "/contact", "/portfolio"], // Rutas comunes
    }),
  ],
  build: {
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "three", "gsap"],
        },
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
