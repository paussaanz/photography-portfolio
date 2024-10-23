import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
    }),
  ],
  optimizeDeps: {
    include: ["react-scroll"], // Incluimos react-scroll para que Vite lo optimice
  },
  esbuild: {
    legalComments: "none",
    logOverride: {
      eval: "silent", // Ignora las advertencias de eval
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar las advertencias específicas de 'eval'
        if (warning.code === "EVAL") {
          return;
        }
        warn(warning); // Para otras advertencias, mostrarlas como normal
      },
    },
  },
});
