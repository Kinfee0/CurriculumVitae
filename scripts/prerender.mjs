/**
 * Prerender de la home: inyecta el HTML de <App /> dentro de <div id="root">
 * en dist/index.html, para que Google y los bots de IA (que no ejecutan
 * JavaScript) lean proyectos, servicios y textos sin depender del bundle.
 *
 * Corre como último paso de `npm run build`, después de:
 *   vite build                                   -> dist/ (cliente)
 *   vite build --ssr src/entry-server.tsx ...    -> dist-ssr/entry-server.js
 *
 * En el navegador, src/main.tsx detecta que #root ya trae contenido y usa
 * hydrateRoot en vez de createRoot.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const ssrDir = resolve(root, 'dist-ssr');

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const placeholder = '<div id="root"></div>';
const html = await readFile(htmlPath, 'utf8');
if (!html.includes(placeholder)) {
  throw new Error(`No encontré ${placeholder} en dist/index.html (¿ya estaba prerenderizado?)`);
}
if (!appHtml.includes('<h1')) {
  throw new Error('El prerender no generó el <h1> del hero: revisa src/entry-server.tsx');
}

await writeFile(htmlPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: dist/index.html (+${(appHtml.length / 1024).toFixed(1)} KB de HTML)`);
