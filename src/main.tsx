import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './i18n.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)

// En producción #root ya trae el HTML prerenderizado (scripts/prerender.mjs) y
// React solo lo hidrata; con `npm run dev` llega vacío y se renderiza normal.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
