import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
  ],
  server: {
    port: 1402,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 alias setup
    },
  },
});
