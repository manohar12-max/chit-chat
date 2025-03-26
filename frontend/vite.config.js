
import tailwindcss from '@tailwindcss/vite'
import path from "node:path"; // Fix the path import
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Keep React plugin

export default defineConfig({
  plugins: [react(),tailwindcss(),], // No need for TailwindCSS plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure the alias is correct
    },
  },
  
});

