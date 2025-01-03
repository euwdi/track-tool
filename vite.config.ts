import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
