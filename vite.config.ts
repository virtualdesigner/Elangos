import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    // During development, calls to /api/* are forwarded to the Node.js backend.
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
