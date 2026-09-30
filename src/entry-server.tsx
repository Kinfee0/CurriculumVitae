// Entrada del prerender (ver scripts/prerender.mjs). Se compila con
// `vite build --ssr` y genera el HTML de cada página en el build, para que los
// buscadores y los bots de IA que no ejecutan JavaScript vean el contenido.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { LangProvider } from './i18n.tsx';
import { ServicePage } from './pages/ServicePage.tsx';
import { SERVICES, type ServiceId } from './servicios.ts';

export type PageId = 'home' | ServiceId;

const BASE = 'https://bastiansandoval.cl';

export function render(page: PageId = 'home') {
  return renderToString(
    <StrictMode>
      {page === 'home' ? (
        <LangProvider>
          <App />
        </LangProvider>
      ) : (
        <LangProvider fixed="es">
          <ServicePage id={page} />
        </LangProvider>
      )}
    </StrictMode>,
  );
}

/**
 * JSON-LD de las páginas de servicio, generado desde src/servicios.ts para que
 * los precios de los planes tengan una sola fuente. La home trae el suyo
 * escrito en index.html (devuelve null).
 */
export function jsonLd(page: PageId): string | null {
  if (page === 'home') return null;
  const s = SERVICES[page];
  const url = BASE + s.path;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#servicio`,
        name: s.seo.name,
        serviceType: s.seo.serviceType,
        description: s.seo.description,
        url,
        image: `${BASE}/og${s.path}.png`,
        provider: { '@type': 'Person', '@id': `${BASE}/#bastian`, name: 'Bastián Sandoval', url: `${BASE}/` },
        areaServed: { '@type': 'Country', name: 'Chile' },
        availableLanguage: 'es',
        offers: s.plans.map((plan) => ({
          '@type': 'Offer',
          name: `Plan ${plan.name}`,
          description: plan.summary,
          price: String(plan.amount),
          priceCurrency: 'CLP',
          url: `${url}#planes`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: s.seo.name },
        ],
      },
    ],
  });
}
