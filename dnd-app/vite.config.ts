import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/RIP_Frontend",
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://192.168.1.33:8000", // менять когда меняешь вайфай
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
      }
    }
  },
);