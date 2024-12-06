import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/", // Ajusta según tu entorno de despliegue
  plugins: [
    react(),
    // Compresión Brotli
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240, // Comprime archivos mayores a 10KB
      deleteOriginFile: false,
    }),
    // Compresión Gzip
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
      deleteOriginFile: false,
    }),
    // Visualizador de Bundle
    // visualizer({
    //   filename: "./bundle-stats.html",
    //   open: false, // Cambia a true si quieres abrir automáticamente el informe
    // }),
  ],
  build: {
    target: "es2021", // Objetivo de compatibilidad
    cssCodeSplit: true, // Divide CSS para mejorar el rendimiento
    sourcemap: false, // Desactiva mapas de origen para producción
    minify: "terser", // Usa Terser para una minificación más avanzada
    terserOptions: {
      compress: {
        drop_console: true, // Elimina console.log
        drop_debugger: true, // Elimina debugger
        ecma: 2020, // Usa la última especificación ECMAScript compatible
        module: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
    },
    assetsInlineLimit: 4096, // Tamaño límite para incluir assets como base64
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react"; // React en un chunk separado
            if (id.includes("framer-motion")) return "framer-motion"; // Framer Motion en otro
            if (id.includes("gsap")) return "gsap"; // GSAP en su propio chunk
            if (id.includes("three")) return "three"; // Three.js en su chunk
            if (id.includes("@react-three")) return "react-three"; // Agrupa @react-three
            return "vendor"; // Agrupa las demás dependencias
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"], // Incluye dependencias clave
    exclude: ["three/examples/jsm"], // Excluye partes innecesarias
  },
  esbuild: {
    drop: ["console", "debugger"], // Elimina console.log y debugger
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"), // Configura entorno de producción
    },
  },
  server: {
    port: 3000, // Cambia el puerto si es necesario
    open: true, // Abre el navegador automáticamente
    cors: true, // Habilita CORS
  },
});
