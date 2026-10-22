import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // १. Reddit को 403 ब्लक हटाउन old.reddit.com र User-Agent प्रयोग गर्ने
      '/reddit-api': {
        target: 'https://old.reddit.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/reddit-api/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        }
      },
      // २. TikWM को 531 र CORS समस्या कम गर्न
      '/tikwm-api': {
        target: 'https://www.tikwm.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tikwm-api/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
        }
      }
    },
  },
})