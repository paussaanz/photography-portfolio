import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';

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
    include: ['react-scroll'],  // Incluimos react-scroll para que Vite lo optimice
  },
});
