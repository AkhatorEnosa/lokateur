import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-ip': {
        target: 'https://freeipapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ip/, '/api/json/'),
      },
    },
  },
})
