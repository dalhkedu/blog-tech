import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Usar './' garante que o site funcione em qualquer subpasta (flexibilidade para GitHub Pages)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})