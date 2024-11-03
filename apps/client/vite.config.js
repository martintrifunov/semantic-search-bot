import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
});
