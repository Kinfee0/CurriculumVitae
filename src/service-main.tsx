// Entrada de las páginas de servicio (paginas-web-emprendedores.html y
// menu-digital-restaurantes.html). Cuál se muestra lo dice el atributo
// data-page del #root de cada HTML.
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { LangProvider } from './i18n.tsx'
import { ServicePage } from './pages/ServicePage.tsx'
import type { ServiceId } from './servicios.ts'

const root = document.getElementById('root')!
const id = root.dataset.page as ServiceId
const app = (
  <StrictMode>
    <LangProvider fixed="es">
      <ServicePage id={id} />
    </LangProvider>
  </StrictMode>
)

// En producción #root ya trae el HTML prerenderizado (scripts/prerender.mjs)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
