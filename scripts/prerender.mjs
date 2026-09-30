/**
 * Prerender: inyecta el HTML de cada página dentro de su <div id="root"> en
 * dist/, para que Google y los bots de IA (que no ejecutan JavaScript) lean el
 * contenido sin depender del bundle.
 *
 * Corre como último paso de `npm run build`, después de:
 *   vite build                                   -> dist/ (cliente, multipágina)
 *   vite build --ssr src/entry-server.tsx ...    -> dist-ssr/entry-server.js
 *
 * En el navegador, src/main.tsx y src/service-main.tsx detectan que #root ya
 * trae contenido y usan hydrateRoot en vez de createRoot.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ssrDir = resolve(root, 'dist-ssr');

const PAGES = [
  { file: 'dist/index.html', page: 'home' },
  { file: 'dist/paginas-web-emprendedores.html', page: 'paginas-web' },
  { file: 'dist/menu-digital-restaurantes.html', page: 'menu-digital' },
];

const { render, jsonLd } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const placeholder = /<div id="root"([^>]*)><\/div>/;

for (const { file, page } of PAGES) {
  const htmlPath = resolve(root, file);
  const html = await readFile(htmlPath, 'utf8');
  if (!placeholder.test(html)) {
    throw new Error(`No encontré <div id="root"></div> vacío en ${file} (¿ya estaba prerenderizado?)`);
  }
  const appHtml = render(page);
  if (!appHtml.includes('<h1')) {
    throw new Error(`El prerender de "${page}" no generó el <h1>: revisa src/entry-server.tsx`);
  }
  let out = html.replace(placeholder, (_, attrs) => `<div id="root"${attrs}>${appHtml}</div>`);
  // Las páginas de servicio no traen JSON-LD en su HTML: se genera desde
  // src/servicios.ts (precios de los planes) y se inserta al final del <head>
  const ld = jsonLd(page);
  if (ld) {
    if (out.includes('application/ld+json')) throw new Error(`${file} ya trae JSON-LD: quítalo del HTML`);
    out = out.replace('</head>', () => `  <script type="application/ld+json">${ld}</script>\n</head>`);
  }
  await writeFile(htmlPath, out);
  console.log(`prerender: ${file} (+${(appHtml.length / 1024).toFixed(1)} KB de HTML)`);
}

await rm(ssrDir, { recursive: true, force: true });
