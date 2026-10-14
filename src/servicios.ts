// Contenido de las páginas de servicio (paginas-web-emprendedores.html y
// menu-digital-restaurantes.html). Solo en español: son ofertas con precio en
// pesos chilenos. Lo que él definió: tres planes (Básico, Intermedio, Full),
// solo precios "desde" (sin rangos), primer mes de alojamiento incluido y
// después alojamiento/cuidado mensual opcional (CARE; o se lleva la página con
// una guía), dominio aparte y plazo de 3 a 7 días hábiles. Los planes se
// diferencian por qué hace la página (presenta / muestra y recoge consultas /
// hace algo), secciones o productos, diseño (base / propio / desde cero) y
// quién pone textos y fotos. Precios del menú: PROPUESTA pendiente de que él confirme.
import type { CaseId } from './components/ProjectsSection';

export type ServiceId = 'paginas-web' | 'menu-digital';

export type Plan = {
  name: string;
  /** Precio para mostrar ("$119.990") */
  price: string;
  /** Precio en número, para el JSON-LD de la página */
  amount: number;
  summary: string;
  features: string[];
  time: string;
  featured?: boolean;
};

export type CareOption = {
  name: string;
  /** "$10.000" o "$20.000 a $60.000" (más IVA) */
  price: string;
  /** Lo que va después del precio: "/mes + IVA" */
  unit: string;
  summary: string;
  features: string[];
  /** Pago trimestral y anual, ya con descuento (más IVA). Solo las suscripciones. */
  periods?: { quarter: string; year: string };
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
  'No. El dominio (por ejemplo, tunegocio.cl) se paga aparte, directo a NIC Chile: cerca de $10.000 al año. No gano nada con él y queda a tu nombre.';
const HOSTING =
  'El primer mes de alojamiento va incluido. Después, si quieres que yo la aloje, son $10.000 + IVA al mes, o $20.000 + IVA si además quieres cambios de contenido. Puedes pagar cada mes, cada tres meses o al año con descuento. Si prefieres no tener mensualidad, te la entrego con una guía y la publicas en tu propia cuenta.';
const FACTURA =
  'Sí. Emito factura por el plan y por el alojamiento. Los precios publicados son más IVA.';
const LLEVARLA =
  'Sí. Te entrego la página con una guía paso a paso para publicarla en tu propia cuenta, sin mensualidad conmigo. Si prefieres no ocuparte, el alojamiento va a mi cargo.';
const GARANTIA =
  'Al entregarte la página tienes una semana para revisarla y pedir cambios sin costo. Cuando aceptas la versión final empieza un mes de garantía: cualquier error de lo que entregué lo corrijo sin costo. Después, los cambios de contenido se hacen con el plan de cambios o como cambio puntual.';

/** Lo que viene después de publicar. Igual para las dos páginas de servicio. */
export const CARE: {
  heading: string;
  intro: string;
  options: [CareOption, CareOption, CareOption];
  notes: string[];
} = {
  heading: 'Después de publicar',
  intro: 'El primer mes de alojamiento va incluido. Después eliges: que yo la aloje, que además me encargue de tus cambios, o llevártela y publicarla tú con mi guía.',
  options: [
    {
      name: 'Alojamiento',
      price: '$10.000',
      unit: '/mes + IVA',
      summary: 'Tu página siempre en línea.',
      features: ['Publicada en mi infraestructura, con HTTPS', 'Respaldo de la página', 'Tu dominio conectado y funcionando'],
      periods: { quarter: '$27.500', year: '$100.000' },
    },
    {
      name: 'Alojamiento + cambios',
      price: '$20.000',
      unit: '/mes + IVA',
      summary: 'Para una página que cambia seguido.',
      features: [
        'Todo lo del Alojamiento',
        'Cambios de contenido razonables: productos, precios, textos, fotos u ofertas',
        'Respuesta en 1 día hábil',
      ],
      periods: { quarter: '$55.000', year: '$200.000' },
    },
    {
      name: 'Cambio puntual',
      price: '$20.000 a $60.000',
      unit: '+ IVA, sin suscripción',
      summary: 'Pagas solo cuando necesitas un cambio.',
      features: ['Según la cantidad de productos, noticias o textos a cambiar', 'Te lo cotizo por WhatsApp antes de hacerlo'],
    },
  ],
  notes: [
    'Valores + IVA, con factura. Pago trimestral con cerca de 8% menos; anual con 2 meses gratis.',
    'El dominio (.cl, cerca de $10.000 al año) se paga aparte, directo a NIC Chile; yo no gano nada con él y queda a tu nombre.',
    'Los cambios grandes o funciones nuevas se cotizan aparte.',
  ],
};
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
      description: 'Páginas web para emprendimientos en Chile: pensadas para el celular, rápidas, con botón de WhatsApp y SEO básico. Tres planes desde $69.990 + IVA, listas en 3 a 7 días hábiles.',
    },
    noun: 'página web',
    heading: 'Páginas web',
    headingSr: ' para emprendedores en Chile, desde $69.990 + IVA',
    badge: 'Desde $69.990 + IVA',
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
        price: '$69.990',
        amount: 69990,
        summary: 'Presenta tu negocio y lleva a tus clientes a WhatsApp.',
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
        price: '$119.990',
        amount: 119990,
        summary: 'Muestra tu oferta con detalle y recibe consultas.',
        features: [
          'Hasta 5 secciones: servicios, catálogo, galería, preguntas y contacto',
          'Diseño propio de tu marca sobre la base: tu paleta, tu tipografía y tus fotos',
          'Catálogo o galería con consulta por WhatsApp en cada producto',
          'Formulario que llega a tu WhatsApp o a tu correo',
          'Te ayudo a redactar y ordenar los textos',
        ],
        time: 'Lista en 5 días hábiles',
        featured: true,
      },
      {
        name: 'Full',
        price: '$179.990',
        amount: 179990,
        summary: 'Hace cosas por ti: arma pedidos, cotiza, filtra.',
        features: [
          'Todo lo del plan Intermedio, con hasta 10 secciones',
          'Funciones que trabajan por ti: carrito que arma el pedido, filtros o cotizador',
          'Diseño desde cero, con animaciones como las de este portafolio',
          'Redacción de textos y edición de fotos o imágenes',
          'SEO local para aparecer en las búsquedas de tu zona',
        ],
        time: 'Lista en 7 días hábiles',
      },
    ],
    plansCommon: ['Precios + IVA, con factura', 'Primer mes de alojamiento incluido', 'El código y el dominio quedan a tu nombre', 'Una semana de revisión y un mes de garantía'],
    includesHeading: 'Siempre incluido',
    includes: [
      { title: 'Diseño pensado para el celular', text: 'Es donde tus clientes te van a ver primero; desde ahí se adapta al computador.' },
      { title: 'Tu WhatsApp a un toque', text: 'Botones que abren la conversación con el mensaje ya escrito, para que te escriban sin pensarlo dos veces.' },
      { title: 'Carga rápida', text: 'Imágenes optimizadas y código liviano: nadie espera a una página lenta, y Google tampoco.' },
      { title: 'SEO básico para Google', text: 'Título, descripción y datos estructurados para que tu negocio aparezca bien en los resultados.' },
      { title: 'Publicada y funcionando', text: 'La dejo en línea y funcionando, con el primer mes de alojamiento incluido, lista para compartir en tus redes.' },
      { title: 'Una semana de revisión y un mes de garantía', text: 'Tienes una semana para revisarla y pedir cambios sin costo. Al aceptar la versión final, un mes de garantía para cualquier error.' },
    ],
    projectsHeading: 'Proyectos',
    projects: ['nebuna', 'sfpizza', 'gaspy', 'mtqchile'],
    steps: [
      { title: 'Conversamos', text: 'Me cuentas por WhatsApp qué vendes y qué necesitas. Sin costo y sin compromiso.' },
      { title: 'Elegimos el plan', text: 'Te propongo el que calza con lo que necesitas y lo dejamos por escrito. Sin sorpresas después.' },
      { title: 'Construyo', text: 'Entre 3 y 7 días hábiles según el plan, desde que tengo el material.' },
      { title: 'Publico y te entrego', text: 'La página queda en línea y el dominio, a tu nombre. Tienes una semana para pedir cambios sin costo.' },
    ],
    faqs: [
      { q: '¿Qué plan me conviene?', a: 'Si solo necesitas que te encuentren y te escriban, el Básico. Si quieres mostrar tus productos o servicios con detalle y que te consulten, el Intermedio. Si quieres que el cliente haga algo en la página (arme su pedido, cotice, filtre) y a ti te llegue resuelto, el Full. Si no sabes, conversemos y te recomiendo uno.' },
      { q: '¿Cuál es la diferencia entre el Intermedio y el Full?', a: 'En el Intermedio el cliente mira y te escribe. En el Full el cliente hace algo en la página, como armar su pedido, cotizar o filtrar, y a ti te llega resuelto.' },
      { q: '¿El dominio está incluido?', a: DOMINIO },
      { q: '¿Tengo que pagar hosting todos los meses?', a: HOSTING },
      { q: '¿Puedo llevarme la página y publicarla yo?', a: LLEVARLA },
      { q: '¿Emites factura? ¿Los precios incluyen IVA?', a: FACTURA },
      { q: '¿Qué pasa si algo falla o no me gusta?', a: GARANTIA },
      { q: '¿En cuánto tiempo está lista?', a: PLAZO },
      { q: '¿Y si necesito algo que no está en ningún plan?', a: FUERA_DE_PLAN },
      { q: '¿Quién es dueño de la página?', a: 'Tú. El código y el dominio quedan a tu nombre desde el primer día y no quedas amarrado a mí: si dejas el alojamiento, te entrego la página con una guía para publicarla por tu cuenta.' },
    ],
    other: { label: 'Menú digital', href: '/menu-digital-restaurantes' },
  },

  'menu-digital': {
    id: 'menu-digital',
    path: '/menu-digital-restaurantes',
    seo: {
      name: 'Menú digital con pedidos por WhatsApp',
      serviceType: 'Menú digital y pedidos online para restaurantes',
      description: 'Carta online para restaurantes, pizzerías y locales de comida en Chile: el cliente arma su pedido y llega al WhatsApp del local, sin apps ni comisiones. Tres planes desde $89.990 + IVA, listos en 3 a 7 días hábiles.',
    },
    noun: 'menú digital',
    heading: 'Menú digital',
    headingSr: ' con pedidos por WhatsApp para restaurantes en Chile, desde $89.990 + IVA',
    badge: 'Desde $89.990 + IVA',
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
        price: '$89.990',
        amount: 89990,
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
        price: '$139.990',
        amount: 139990,
        summary: 'La carta completa de tu local.',
        features: [
          'Hasta 60 productos, con categorías, tamaños y agregados',
          'Pedido completo: productos, total, delivery o retiro, dirección y forma de pago',
          'Horario de atención: muestra si el local está abierto o cerrado',
          'Diseño propio con la identidad de tu local: tu paleta, tu tipografía y tus fotos',
        ],
        time: 'Lista en 5 días hábiles',
        featured: true,
      },
      {
        name: 'Full',
        price: '$199.990',
        amount: 199990,
        summary: 'Una carta que se recuerda, como San Francisco Pizza y Gaspy Burgers.',
        features: [
          'Todo lo del plan Intermedio, sin límite de productos',
          'Armador interactivo: pizzas o burgers que se arman tocando los ingredientes',
          'Instalable como app en el celular',
          'Modo mesa: pedidos desde la mesa con QR o NFC',
          'Diseño desde cero, con estética propia y animaciones',
          'Edición de las fotos de tus productos',
        ],
        time: 'Lista en 7 días hábiles',
      },
    ],
    plansCommon: ['Precios + IVA, con factura', 'Sin comisiones por pedido', 'Primer mes de alojamiento incluido', 'Una semana de revisión y un mes de garantía'],
    includesHeading: 'Siempre incluido',
    includes: [
      { title: 'Tu carta en el celular', text: 'Productos, fotos y precios, fácil de recorrer con el pulgar.' },
      { title: 'El pedido llega armado', text: 'A tu WhatsApp, con lo que pidió el cliente y el total. Nada de ida y vuelta preguntando.' },
      { title: 'Sin apps ni comisiones', text: 'Tus clientes piden desde el navegador y la venta es 100% tuya: no hay intermediarios.' },
      { title: 'Rápida y liviana', text: 'Se abre al tiro desde un link de Instagram o un código QR en la mesa.' },
      { title: 'Publicada y funcionando', text: 'La dejo en línea y funcionando, con el primer mes de alojamiento incluido y SEO básico para Google.' },
      { title: 'Una semana de revisión y un mes de garantía', text: 'Tienes una semana para revisarla y corregir precios o productos sin costo. Al aceptar la versión final, un mes de garantía para cualquier error.' },
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
      { q: '¿Qué plan me conviene?', a: 'Si tienes una carta corta y quieres empezar a recibir pedidos ya, el Básico. Si tienes varias categorías, tamaños o agregados, o haces delivery, el Intermedio. Si tus clientes arman su producto (una pizza, una burger) o piden desde la mesa, el Full.' },
      { q: '¿Cuál es la diferencia entre el Intermedio y el Full?', a: 'En el Intermedio el cliente elige de tu carta. En el Full el cliente arma su pedido tocando ingredientes, o pide desde la mesa con un QR o NFC.' },
      { q: '¿Mis clientes tienen que descargar una app?', a: 'No. La carta se abre en el navegador del celular desde un link o un QR. En el plan Full también se puede instalar como app, como la de Gaspy Burgers.' },
      { q: '¿Cobras comisión por pedido?', a: 'No. Los pedidos llegan directo a tu WhatsApp y la venta es tuya completa; pagas solo el plan.' },
      { q: '¿El dominio está incluido?', a: DOMINIO },
      { q: '¿Tengo que pagar hosting todos los meses?', a: HOSTING },
      { q: '¿Puedo llevarme la página y publicarla yo?', a: LLEVARLA },
      { q: '¿Emites factura? ¿Los precios incluyen IVA?', a: FACTURA },
      { q: '¿Qué pasa si algo falla o no me gusta?', a: GARANTIA },
      { q: '¿En cuánto tiempo está lista?', a: PLAZO },
      { q: '¿Y si necesito algo que no está en ningún plan?', a: FUERA_DE_PLAN },
    ],
    other: { label: 'Páginas web', href: '/paginas-web-emprendedores' },
  },
};
