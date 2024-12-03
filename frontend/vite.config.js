import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  preview: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://financial-al.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
