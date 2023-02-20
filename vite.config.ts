import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages")
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants")
      },
      {
        find: "@interfaces",
        replacement: path.resolve(__dirname, "src/interfaces")
      },
      {
        find: "@types",
        replacement: path.resolve(__dirname, "src/types")
      },
      {
        find: "@states",
        replacement: path.resolve(__dirname, "src/states")
      }
    ]
  }
});
