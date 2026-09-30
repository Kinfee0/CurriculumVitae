// Contenido de las páginas de servicio (paginas-web-emprendedores.html y
// menu-digital-restaurantes.html). Solo en español: son ofertas con precio en
// pesos chilenos. Lo que él definió: tres planes (Básico, Intermedio, Full),
// solo precios "desde" (sin rangos), hosting sin mensualidad incluido (hosting
// de pago y dominio, aparte) y plazo de 3 a 7 días hábiles. Los planes se
// diferencian por secciones/productos, funciones interactivas, textos/fotos y
// diseño a medida. Precios del menú: PROPUESTA pendiente de que él confirme.
import type { CaseId } from './components/ProjectsSection';

export type ServiceId = 'paginas-web' | 'menu-digital';

export type Plan = {
  name: string;
  /** Precio para mostrar ("$120.000") */
  price: string;
  /** Precio en número, para el JSON-LD de la página */
  amount: number;
  summary: string;
  features: string[];
  time: string;
  featured?: boolean;
};

export type Service = {
  id: ServiceId;
  /** URL sin .html; la imagen OG vive en public/og + path + .png */
  path: string;
  /** Para el JSON-LD que genera el prerender (src/entry-server.tsx) */
  seo: { name: string; serviceType: string; description: string };
  /** Nombre corto para los mensajes de WhatsApp ("página web", "menú digital") */
  noun: string;
  /** Palabras del título gigante del hero (van en mayúsculas por CSS) */
  heading: string;
  /** Completa el H1 para buscadores y lectores de pantalla */
  headingSr: string;
  badge: string;
  tagline: string;
  cta: string;
  ctaShort: string;
  whatsappText: string;
  /** Capturas móviles (public/img/movil) de los dos teléfonos del hero */
  phones: [string, string];
  /** Capturas de escritorio (public/img/shots) de las dos filas del marquee */
  marquee: [string[], string[]];
  plansIntro: string;
  plans: [Plan, Plan, Plan];
  /** Lo que tienen todos los planes, en una línea bajo las tarjetas */
  plansCommon: string[];
  includesHeading: string;
  includes: { title: string; text: string }[];
  projectsHeading: string;
  projects: CaseId[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  other: { label: string; href: string };
};

const DOMINIO =
  'No. El dominio (por ejemplo, tunegocio.cl) se paga aparte; un .cl cuesta cerca de $10.000 al año en NIC Chile.';
const HOSTING =
  'No. Queda publicada en un hosting sin costo mensual. Si prefieres un hosting de pago, también se puede, y se cotiza aparte.';
const FUERA_DE_PLAN =
  'Lo conversamos y te lo cotizo aparte. Los planes son un punto de partida, no una camisa de fuerza.';
const PLAZO =
  'Depende del plan: 3 días hábiles el Básico, 5 el Intermedio y 7 el Full, contados desde que acordamos el alcance y tengo el material.';

export const SERVICES: Record<ServiceId, Service> = {
  'paginas-web': {
    id: 'paginas-web',
    path: '/paginas-web-emprendedores',
    seo: {
      name: 'Página web para emprendedores',
      serviceType: 'Diseño y desarrollo de páginas web',
      description: 'Páginas web para emprendimientos en Chile: pensadas para el celular, rápidas, con botón de WhatsApp y SEO básico. Tres planes desde $50.000, listas en 3 a 7 días hábiles.',
    },
    noun: 'página web',
    heading: 'Páginas web',
    headingSr: ' para emprendedores en Chile, desde $50.000',
    badge: 'Desde $50.000',
    tagline: 'Para emprendedores: rápidas, pensadas para el celular y con tu WhatsApp a un toque. Listas en 3 a 7 días hábiles.',
    cta: 'Cotizar por WhatsApp',
    ctaShort: 'Cotizar',
    whatsappText: 'Hola Bastián, quiero cotizar una página web para mi emprendimiento',
    phones: ['nebuna', 'gaspy'],
    marquee: [
      ['nebuna', 'sfpizza', 'mtqchile', 'gaspy', 'ipaf', 'nebuna-producto', 'kubota'],
      ['gaspy-armador', 'mtqchile-productos', 'nebuna-2', 'sfpizza-armador', 'ipaf-cursos', 'motorman-2026', 'nebuna-3'],
    ],
    plansIntro: 'Elige según lo que necesitas hoy. Todos quedan publicados, rápidos y listos para recibir clientes por WhatsApp.',
    plans: [
      {
        name: 'Básico',
        price: '$50.000',
        amount: 50000,
        summary: 'Para partir con presencia en internet.',
        features: [
          'Página de una sección: quién eres, qué ofreces y cómo contactarte',
          'Diseño limpio sobre una base probada, con tus colores y tu logo',
          'Botón de WhatsApp con el mensaje ya escrito',
          'Textos y fotos los entregas tú',
        ],
        time: 'Lista en 3 días hábiles',
      },
      {
        name: 'Intermedio',
        price: '$120.000',
        amount: 120000,
        summary: 'Para mostrar tus productos o servicios con detalle.',
        features: [
          'Hasta 5 secciones: servicios, catálogo, galería, preguntas y contacto',
          'Diseño a medida con la identidad de tu marca',
          'Animaciones suaves al recorrer la página',
          'Catálogo o galería con consulta por WhatsApp en cada producto',
          'Formulario que llega a tu WhatsApp o a tu correo',
          'Te ayudo a redactar y ordenar los textos',
        ],
        time: 'Lista en 5 días hábiles',
        featured: true,
      },
      {
        name: 'Full',
        price: '$180.000',
        amount: 180000,
        summary: 'Para vender en serio desde tu página.',
        features: [
          'Todo lo del plan Intermedio, con hasta 10 secciones',
          'Funciones interactivas: carrito que arma el pedido, filtros o cotizador',
          'Diseño 100% a medida, con animaciones como las de este portafolio',
          'Redacción de textos y edición de fotos o imágenes',
          'SEO local para aparecer en las búsquedas de tu zona',
        ],
        time: 'Lista en 7 días hábiles',
      },
    ],
    plansCommon: ['Sin mensualidad de hosting', 'El código y los accesos quedan a tu nombre', 'Ajustes de las primeras semanas incluidos'],
    includesHeading: 'Siempre incluido',
    includes: [
      { title: 'Diseño pensado para el celular', text: 'Es donde tus clientes te van a ver primero; desde ahí se adapta al computador.' },
      { title: 'Tu WhatsApp a un toque', text: 'Botones que abren la conversación con el mensaje ya escrito, para que te escriban sin pensarlo dos veces.' },
      { title: 'Carga rápida', text: 'Imágenes optimizadas y código liviano: nadie espera a una página lenta, y Google tampoco.' },
      { title: 'SEO básico para Google', text: 'Título, descripción y datos estructurados para que tu negocio aparezca bien en los resultados.' },
      { title: 'Publicada y funcionando', text: 'La dejo en línea en un hosting sin costo mensual, lista para compartir en tus redes.' },
      { title: 'Ajustes de las primeras semanas', text: 'Si algo hay que cambiar después de publicar, lo vemos sin costo extra.' },
    ],
    projectsHeading: 'Proyectos',
    projects: ['nebuna', 'sfpizza', 'gaspy', 'mtqchile'],
    steps: [
      { title: 'Conversamos', text: 'Me cuentas por WhatsApp qué vendes y qué necesitas. Sin costo y sin compromiso.' },
      { title: 'Elegimos el plan', text: 'Te propongo el que calza con lo que necesitas y lo dejamos por escrito. Sin sorpresas después.' },
      { title: 'Construyo', text: 'Entre 3 y 7 días hábiles según el plan, desde que tengo el material.' },
      { title: 'Publico y te entrego', text: 'La página queda en línea y los accesos, a tu nombre.' },
    ],
    faqs: [
      { q: '¿Qué plan me conviene?', a: 'Si solo necesitas que te encuentren y te escriban, el Básico. Si quieres mostrar productos o servicios con detalle, el Intermedio. Si quieres que la página venda sola, con carrito o cotizador, el Full. Si no sabes, conversemos y te recomiendo uno.' },
      { q: '¿El dominio está incluido?', a: DOMINIO },
      { q: '¿Tengo que pagar hosting todos los meses?', a: HOSTING },
      { q: '¿En cuánto tiempo está lista?', a: PLAZO },
      { q: '¿Y si necesito algo que no está en ningún plan?', a: FUERA_DE_PLAN },
      { q: '¿Quién es dueño de la página?', a: 'Tú. El código, el dominio y los accesos quedan a tu nombre desde el primer día; no quedas amarrado a mí.' },
    ],
    other: { label: 'Menú digital', href: '/menu-digital-restaurantes' },
  },

  'menu-digital': {
    id: 'menu-digital',
    path: '/menu-digital-restaurantes',
    seo: {
      name: 'Menú digital con pedidos por WhatsApp',
      serviceType: 'Menú digital y pedidos online para restaurantes',
      description: 'Carta online para restaurantes, pizzerías y locales de comida en Chile: el cliente arma su pedido y llega al WhatsApp del local, sin apps ni comisiones. Tres planes desde $70.000, listos en 3 a 7 días hábiles.',
    },
    noun: 'menú digital',
    heading: 'Menú digital',
    headingSr: ' con pedidos por WhatsApp para restaurantes en Chile, desde $70.000',
    badge: 'Desde $70.000',
    tagline: 'Para locales de comida: el cliente arma el pedido y te llega completo a tu WhatsApp. Sin apps ni comisiones.',
    cta: 'Cotizar por WhatsApp',
    ctaShort: 'Cotizar',
    whatsappText: 'Hola Bastián, quiero cotizar un menú digital para mi local',
    phones: ['sfpizza', 'gaspy'],
    marquee: [
      ['sfpizza', 'gaspy-armador', 'sfpizza-pedido', 'gaspy', 'sfpizza-armador', 'gaspy-pedido'],
      ['gaspy-pedido', 'sfpizza-armador', 'gaspy', 'sfpizza-pedido', 'gaspy-armador', 'sfpizza'],
    ],
    plansIntro: 'Todos los planes reciben pedidos por WhatsApp, sin apps ni comisiones. Cambia cuánto muestra tu carta y qué tan memorable es.',
    plans: [
      {
        name: 'Básico',
        price: '$70.000',
        amount: 70000,
        summary: 'Tu carta online, recibiendo pedidos.',
        features: [
          'Carta de hasta 20 productos, con foto y precio',
          'El cliente elige y te llega el pedido con el total a tu WhatsApp',
          'Link y código QR para compartir',
          'Diseño limpio con tus colores y tu logo',
          'La carta y las fotos las entregas tú',
        ],
        time: 'Lista en 3 días hábiles',
      },
      {
        name: 'Intermedio',
        price: '$140.000',
        amount: 140000,
        summary: 'La carta completa de tu local.',
        features: [
          'Hasta 60 productos, con categorías, tamaños y agregados',
          'Pedido completo: productos, total, delivery o retiro, dirección y forma de pago',
          'Horario de atención: muestra si el local está abierto o cerrado',
          'Diseño a medida con la identidad de tu local',
          'Animaciones suaves al recorrer la carta',
        ],
        time: 'Lista en 5 días hábiles',
        featured: true,
      },
      {
        name: 'Full',
        price: '$200.000',
        amount: 200000,
        summary: 'Una carta que se recuerda, como San Francisco Pizza y Gaspy Burgers.',
        features: [
          'Todo lo del plan Intermedio, sin límite de productos',
          'Armador interactivo: pizzas o burgers que se arman tocando los ingredientes',
          'Instalable como app en el celular',
          'Modo mesa: pedidos desde la mesa con QR o NFC',
          'Diseño 100% a medida, con estética propia y animaciones',
          'Edición de las fotos de tus productos',
        ],
        time: 'Lista en 7 días hábiles',
      },
    ],
    plansCommon: ['Sin comisiones por pedido', 'Sin mensualidad de hosting', 'Ajustes de las primeras semanas incluidos'],
    includesHeading: 'Siempre incluido',
    includes: [
      { title: 'Tu carta en el celular', text: 'Productos, fotos y precios, fácil de recorrer con el pulgar.' },
      { title: 'El pedido llega armado', text: 'A tu WhatsApp, con lo que pidió el cliente y el total. Nada de ida y vuelta preguntando.' },
      { title: 'Sin apps ni comisiones', text: 'Tus clientes piden desde el navegador y la venta es 100% tuya: no hay intermediarios.' },
      { title: 'Rápida y liviana', text: 'Se abre al tiro desde un link de Instagram o un código QR en la mesa.' },
      { title: 'Publicada y funcionando', text: 'La dejo en línea en un hosting sin costo mensual, con SEO básico para Google.' },
      { title: 'Ajustes de las primeras semanas', text: 'Si hay que corregir un precio o un producto después de publicar, lo vemos sin costo extra.' },
    ],
    projectsHeading: 'Proyectos',
    projects: ['sfpizza', 'gaspy'],
    steps: [
      { title: 'Conversamos', text: 'Me mandas tu carta actual (foto, PDF o lo que tengas) y me cuentas cómo recibes los pedidos hoy.' },
      { title: 'Elegimos el plan', text: 'Te propongo el que calza con tu local y lo dejamos por escrito. Sin sorpresas después.' },
      { title: 'Construyo', text: 'Entre 3 y 7 días hábiles según el plan, desde que tengo la carta y las fotos.' },
      { title: 'Publico y te entrego', text: 'La carta queda en línea, lista para Instagram, tus stickers o un QR en la mesa.' },
    ],
    faqs: [
      { q: '¿Qué plan me conviene?', a: 'Si tienes una carta corta y quieres empezar a recibir pedidos ya, el Básico. Si tienes varias categorías, tamaños o agregados, o haces delivery, el Intermedio. Si quieres que tu carta sea parte de la experiencia del local, el Full.' },
      { q: '¿Mis clientes tienen que descargar una app?', a: 'No. La carta se abre en el navegador del celular desde un link o un QR. En el plan Full también se puede instalar como app, como la de Gaspy Burgers.' },
      { q: '¿Cobras comisión por pedido?', a: 'No. Los pedidos llegan directo a tu WhatsApp y la venta es tuya completa; pagas solo el plan.' },
      { q: '¿El dominio está incluido?', a: DOMINIO },
      { q: '¿Tengo que pagar hosting todos los meses?', a: HOSTING },
      { q: '¿En cuánto tiempo está lista?', a: PLAZO },
      { q: '¿Y si necesito algo que no está en ningún plan?', a: FUERA_DE_PLAN },
    ],
    other: { label: 'Páginas web', href: '/paginas-web-emprendedores' },
  },
};
