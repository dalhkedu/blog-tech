import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Substitua 'nome-do-repositorio' pelo nome exato do seu repo no GitHub.
  // Exemplo: se o repo for https://github.com/usuario/meu-blog, use '/meu-blog/'
  // Se for um repo de usuário (usuario.github.io), deixe apenas '/'
  base: '/nome-do-repositorio/', 
})