import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Se o seu repositório for 'blog-caramelo', mude para '/blog-caramelo/'
  // Se for o repositório principal (seu-usuario.github.io), mude para '/'
  base: './', 
})