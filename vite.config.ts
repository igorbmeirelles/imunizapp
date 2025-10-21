import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mais Vacinas",
        short_name: "Mais Vacinas",
        description: "Aplicativo Mais Vacinas",
        theme_color: "#F1FCFF",
        icons: [
          {
            src: "./public/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./public/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
