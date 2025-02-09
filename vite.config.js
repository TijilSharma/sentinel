import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/load-data": {
        target: "https://predictivemain.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

