import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite no lee PORT por sí solo; esto permite fijar el puerto del dev server
  // con `PORT=3000 npm run dev` cuando el 5173 está ocupado.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
