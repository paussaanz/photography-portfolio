import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: ["react-scroll"], // Incluimos react-scroll para que Vite lo optimice
  },
});
