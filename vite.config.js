import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Entry point
      name: "BalestraLibrary",
      fileName: (format) => `balestra-library.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Mark React as external
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [react()],
});