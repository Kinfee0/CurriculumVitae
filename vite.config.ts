import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (file: string) => fileURLToPath(new URL(file, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite no lee PORT por sí solo; esto permite fijar el puerto del dev server
  // con `PORT=3000 npm run dev` cuando el 5173 está ocupado.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  build: {
    // Multipágina: la home y las páginas de servicio (cada una con su HTML,
    // su <head> propio y su prerender en scripts/prerender.mjs)
    rollupOptions: {
      input: {
        main: page('./index.html'),
        'paginas-web-emprendedores': page('./paginas-web-emprendedores.html'),
        'menu-digital-restaurantes': page('./menu-digital-restaurantes.html'),
      },
    },
  },
})
