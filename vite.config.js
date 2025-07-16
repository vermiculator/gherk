import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    inject({
      p5: 'p5',
    }),
  ],
  base: "https://localhost:4321/",
});