import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configura o base para o nome do repositório no GitHub Pages
  base: '/blog-tech/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})