import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["7db2-2804-8234-8001-ec00-9c84-15eb-9e13-7a0.ngrok-free.app"],
  },
});
