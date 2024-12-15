import { defineConfig } from 'vite';
import * as path from "path";
import rollUpOptions from "./rollup.config";

export default defineConfig({
  mode: "development",
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: rollUpOptions
  },
  server: {
    port: 3000
  }
})