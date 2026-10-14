/**
 * Genera el generador de propuestas para clientes (clientes/propuestas/) con
 * los planes y precios de src/servicios.ts, y un borrador en PDF por paquete.
 *
 *   npm run propuestas
 *
 * - clientes/propuestas/Generador-de-propuestas.html: se abre en el navegador,
 *   se completan los datos del cliente y se guarda como PDF.
 * - clientes/propuestas/borradores/*.pdf: un borrador por servicio y plan, con
 *   los datos del cliente marcados para completar.
 *
 * La carpeta clientes/ está en .gitignore: son entregables, no código.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'clientes', 'propuestas');
const borradores = join(out, 'borradores');
mkdirSync(borradores, { recursive: true });

// 1) src/servicios.ts es TypeScript: se transpila a un módulo temporal
const src = readFileSync(join(root, 'src/servicios.ts'), 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const tmpModule = join(tmpdir(), `servicios-${process.pid}.mjs`);
writeFileSync(tmpModule, js);
const { SERVICES, CARE } = await import(pathToFileURL(tmpModule).href);
rmSync(tmpModule, { force: true });

// 2) Datos para la plantilla
const days = (time) => (time.match(/(\d+)/) ?? [, '?'])[1];
const withDays = (plans) => plans.map((p) => ({ ...p, days: days(p.time) }));
// Las propuestas hablan en plural: son dos socios.
const plural = (s) =>
  s
    .split('mi infraestructura').join('nuestra infraestructura')
    .split('Te lo cotizo').join('Te lo cotizamos')
    .split('que yo la aloje, que además me encargue de tus cambios, o llevártela y publicarla tú con mi guía')
    .join('que nosotros la alojemos, que además nos encarguemos de tus cambios, o llevártela y publicarla tú con nuestra guía');
const careOptions = CARE.options.map((o) => ({ ...o, summary: plural(o.summary), features: o.features.map(plural) }));
const DATA = {
  services: {
    'paginas-web': {
      label: 'Página web',
      kicker: 'Página web',
      titulo: 'Una página web',
      noun: SERVICES['paginas-web'].noun,
      lead: 'Pensada para el celular, rápida y con tu WhatsApp a un toque, lista para que tus clientes te encuentren y te escriban.',
      material: 'Para partir necesitamos tu logo, tus colores y el material que tengas (textos y fotos). Según el plan, te ayudamos a ordenarlos o los redactamos.',
      plans: withDays(SERVICES['paginas-web'].plans),
    },
    'menu-digital': {
      label: 'Menú digital',
      kicker: 'Menú digital',
      titulo: 'Un menú digital con pedidos por WhatsApp',
      noun: SERVICES['menu-digital'].noun,
      lead: 'Una carta online donde el cliente arma su pedido y te llega completo a tu WhatsApp, sin apps ni comisiones.',
      material: 'Para partir necesitamos tu carta actual (foto, PDF o lo que tengas), tu logo, tus colores y las fotos de tus productos.',
      plans: withDays(SERVICES['menu-digital'].plans),
    },
  },
  care: { ...CARE, intro: plural(CARE.intro), options: careOptions },
  tiles: [
    ['Computador y celular', 'El diseño se adapta a ambos. Hoy casi todo se mira en el teléfono.'],
    ['Una semana de revisión', 'Al entregarte la página tienes una semana para pedir los cambios que quieras, sin costo.'],
    ['Garantía de 1 mes', 'Gratis, desde que aceptas la versión final. Cubre cualquier error o falla de lo entregado.'],
    ['Lista para Google', 'SEO básico y solicitud de indexación, para que tu página pueda encontrarse en buscadores.'],
    ['Primer mes de alojamiento', 'Queda publicada y funcionando; después eliges si nosotros la alojamos o te la llevas.'],
    ['A tu nombre', 'El código y el dominio quedan a tu nombre. No quedas amarrado a nosotros.'],
  ],
  steps: [
    ['Conversamos', 'Nos cuentas qué vendes y qué quieres mostrar. Con eso definimos el diseño y dejamos el alcance por escrito.'],
    ['Primer diseño', 'En {dias} días hábiles recibes la página lista para revisar, en versión computador y celular.'],
    ['Una semana de revisión', 'Nos dices qué no te gusta y lo ajustamos, sin costo, hasta que quedes conforme.'],
    ['Publicación y garantía', 'Aceptas la versión final, la dejamos en línea y empieza un mes de garantía gratuita.'],
  ],
  garantia:
    'Al entregarte la página tienes una semana para revisarla y pedir cambios sin costo. Cuando aceptas la versión final empieza un mes de garantía: cualquier error de lo que entregamos lo corregimos sin costo. Después, los cambios de contenido se hacen con el plan de cambios o como cambio puntual.',
  dominio: 'El dominio (por ejemplo, tunegocio.cl) se paga aparte, directo a NIC Chile: cerca de $10.000 al año. No ganamos nada con él y queda a tu nombre.',
  llevarla: 'Te entregamos la página con una guía paso a paso para publicarla en tu propia cuenta, sin mensualidad con nosotros. Si prefieres no ocuparte, el alojamiento va a nuestro cargo.',
  posicionamiento:
    'Trabajamos para que tu página sea indexada y encontrada en Google y en los asistentes de inteligencia artificial, como ChatGPT, Gemini y Perplexity. Los resultados dependen de tu rubro y de la competencia, y se cotiza aparte de la creación de la página.',
  factura: 'Emitimos factura bajo el giro de actividades de programación e informática.',
  terms: [
    'Todos los valores son en pesos chilenos y van más IVA, con factura.',
    'Forma de pago: 50% de anticipo para iniciar el proyecto y 50% al entregar la página.',
    'Alojamiento y cambios: pago mensual, trimestral (cerca de 8% menos) o anual (2 meses gratis).',
    'El primer mes de alojamiento va incluido.',
    'Un elemento es un producto, un texto, una foto o una oferta. Las solicitudes de cada mes no se acumulan.',
    'Los cambios grandes, una sección nueva o funciones nuevas se cotizan aparte.',
  ],
};

// 3) HTML autocontenido
const fonts = pathToFileURL(join(root, 'public/fonts')).href;
const template = readFileSync(join(root, 'scripts/propuesta-template.html'), 'utf8');
const html = template
  .split('__FONTS__').join(fonts)
  .replace('/*__DATA__*/ null', () => JSON.stringify(DATA));
const generador = join(out, 'Generador-de-propuestas.html');
writeFileSync(generador, html);
console.log('Generador:', generador);

// 4) Un borrador en PDF por paquete
const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = process.env.CHROME_PATH ?? CANDIDATES.find((p) => existsSync(p));
if (!browser) throw new Error('No encontré Chrome ni Edge. Exporta CHROME_PATH con la ruta al ejecutable.');

const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
for (const [id, svc] of Object.entries(DATA.services)) {
  svc.plans.forEach((plan, i) => {
    const name = `Propuesta-${slug(svc.label)}-${slug(plan.name)}.pdf`;
    const hash = new URLSearchParams({ servicio: id, plan: String(i), modo: 'pdf' }).toString();
    execFileSync(
      browser,
      [
        '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
        `--print-to-pdf=${join(borradores, name)}`, `${pathToFileURL(generador).href}#${hash}`,
      ],
      { stdio: 'ignore' }
    );
    console.log('Borrador:', name);
  });
}
