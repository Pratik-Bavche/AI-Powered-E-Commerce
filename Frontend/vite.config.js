import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000,
    host: true,
    // Proxy API requests to the backend during development so the browser treats
    // them as same-origin and httpOnly cookies can be set by the server.
    proxy: {
      '/api': {
        //target: 'http://localhost:8000',
        target:"https://ai-powered-e-commerce-server.vercel.app/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  }
})
