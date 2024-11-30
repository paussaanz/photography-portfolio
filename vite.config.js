import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }), // Comprime los activos con Brotli
    viteCompression({ algorithm: "gzip" }),
  ],
  build: {
    target: "esnext", // Apunta a la última versión de JavaScript
    cssCodeSplit: true, // Divide los CSS para mejorar la carga
    sourcemap: false, // Desactiva los mapas de fuente para reducir el tamaño
    minify: "esbuild", // Usa esbuild para minificación rápida
    assetsInlineLimit: 8192, // Archivos pequeños en línea para mejorar la carga
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "three", "gsap"], // Divide dependencias pesadas
        },
        entryFileNames: "assets/[name].[hash].js", // Nombres de archivo con hash
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"], // Elimina console.log y debugger en producción
  },
});
