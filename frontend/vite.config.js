import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // http://localhost:3000/api -> http://localhost:5000/api
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
});
