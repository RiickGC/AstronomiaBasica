import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/newsletter/',
  build: {
    outDir: 'ebook/dist/newsletter',
    emptyOutDir: true,
  }
});
