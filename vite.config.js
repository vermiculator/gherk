import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "https://localhost:4321/",
  plugins: [
    react(),
    inject({
      p5: 'p5',
    }),
  ]
});