import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({

  base: '/', // Se for um subdiretório, altere para '/meuapp/'
  css: ['~/assets/css/main.css'],
  
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ['www.bobflows.com']
  },
  define: {
    __APP_ENV__: JSON.stringify(process.env.VITE_APP_ENV || 'development'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
