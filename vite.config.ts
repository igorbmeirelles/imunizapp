import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
