import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

import path from "node:path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
