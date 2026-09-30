/**
 * Genera las imágenes Open Graph (1200x630) de las notas del blog y de las
 * páginas de servicio a partir de scripts/og-article.html.
 *
 *   npm run og:pages
 *
 * Un "\n" en el título fuerza un salto de línea. Para agregar una página,
 * súmala a PAGES y enlaza la imagen en el og:image / twitter:image / JSON-LD
 * de su HTML. Cada PNG pesa ~120 KB: bajo los ~300 KB sobre los que WhatsApp
 * a veces deja de mostrar el preview.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PAGES = [
  {
    out: 'public/blog/og/carritos-abandonados-woocommerce.png',
    kicker: 'Notas técnicas',
    title: 'Recuperar carritos abandonados en WooCommerce sin plugins de pago',
    tags: 'WooCommerce · PHP',
  },
  {
    out: 'public/blog/og/seo-local-maquinaria-chile.png',
    kicker: 'Notas técnicas',
    title: 'SEO local para vender maquinaria en Chile',
    tags: 'SEO · Schema.org',
  },
  {
    out: 'public/blog/og/cotizador-whatsapp-woocommerce.png',
    kicker: 'Notas técnicas',
    title: 'Un cotizador por WhatsApp que sí convierte',
    tags: 'WooCommerce · WhatsApp',
  },
  {
    out: 'public/og/paginas-web-emprendedores.png',
    kicker: 'Para emprendedores',
    title: 'Tu página web,\nlista en 3 a 7 días.\nDesde $50.000',
    tags: 'Celular · WhatsApp · Google',
  },
  {
    out: 'public/og/menu-digital-restaurantes.png',
    kicker: 'Para restaurantes',
    title: 'Menú digital con pedidos\ndirecto a tu WhatsApp.\nDesde $70.000',
    tags: 'Sin apps · Sin comisiones',
  },
];

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const template = readFileSync(join(root, 'scripts/og-article.html'), 'utf8');
const tmp = mkdtempSync(join(tmpdir(), 'og-pages-'));

try {
  PAGES.forEach(({ out, kicker, title, tags }, i) => {
    const source = join(tmp, `page-${i}.html`);
    writeFileSync(
      source,
      template
        .replaceAll('{{KICKER}}', escape(kicker))
        .replaceAll('{{TITLE}}', escape(title).replaceAll('\n', '<br />'))
        .replaceAll('{{TAGS}}', escape(tags))
    );
    execFileSync(process.execPath, [join(root, 'scripts/generate-og.mjs'), source, out, '1200', '630'], {
      stdio: 'inherit',
      cwd: root,
    });
  });
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
