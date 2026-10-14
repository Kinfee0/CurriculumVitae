// Entrada del prerender (ver scripts/prerender.mjs). Se compila con
// `vite build --ssr` y genera el HTML de la home en el build, para que los
// buscadores y los bots de IA que no ejecutan JavaScript vean el contenido.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { LangProvider } from './i18n.tsx';

export function render() {
  return renderToString(
    <StrictMode>
      <LangProvider>
        <App />
      </LangProvider>
    </StrictMode>,
  );
}
