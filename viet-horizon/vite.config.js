import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 5188,
    open: false,
    host: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
});
