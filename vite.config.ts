import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Usar base vazia ou './' garante que o site funcione tanto em domínios próprios quanto em subpastas do GitHub Pages
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})