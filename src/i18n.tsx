import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'es' | 'en';

const es = {
  meta: {
    title: 'Bastián Sandoval — Desarrollador Web Full-Stack',
    description:
      'Portafolio de Bastián Sandoval, desarrollador web full-stack en Chile: e-commerce, aplicaciones a medida, SEO técnico y automatización.',
  },
  nav: {
    about: 'Sobre mí',
    services: 'Servicios',
    freelance: 'Freelance',
    projects: 'Proyectos',
    notes: 'Notas',
    contact: 'Contacto',
  },
  hero: {
    heading: 'Hola, soy Bastián',
    tagline: 'Desarrollador full-stack creando plataformas web rápidas y memorables',
    contact: 'Contáctame',
    // Más corta que freelance.badge: en el hero convive con el botón de contacto
    available: 'Disponible para proyectos',
  },
  // REVISAR antes de publicar: `facts` afirma boleta de honorarios, idiomas y
  // herramientas de reunión; `steps` promete soporte incluido las primeras
  // semanas. Ajusta cualquier punto que no quieras comprometer.
  freelance: {
    badge: 'Disponible para proyectos freelance',
    heading: 'Trabajemos juntos',
    intro:
      'Contratar a alguien remoto da miedo: no sabes si va a responder, si el precio va a cambiar a mitad de camino o si el proyecto queda amarrado a una sola persona. Así trabajo yo para que eso no pase.',
    pillars: [
      {
        title: 'Remoto, pero presente',
        text: 'Reuniones breves cuando las necesites. Quince minutos por videollamada resuelven lo que veinte correos no.',
      },
      {
        title: 'Respondo rápido',
        text: 'Si algo se cae o necesitas un ajuste, estoy. Los sitios no se caen solo de 9 a 6, así que mi ventana de respuesta tampoco.',
      },
      {
        title: 'Sin sorpresas',
        text: 'Alcance, plazo y precio claros antes de empezar. Si algo cambia, lo conversamos antes — nunca aparece en la factura.',
      },
      {
        title: 'El código queda tuyo',
        text: 'Repositorio, accesos y documentación a tu nombre desde el día uno. Nada de quedar amarrado a mí.',
      },
    ],
    stepsHeading: 'Cómo partimos',
    steps: [
      {
        title: 'Conversamos',
        text: 'Una llamada corta para entender qué necesitas. Sin costo y sin compromiso.',
      },
      {
        title: 'Te propongo',
        text: 'Alcance, plazo y precio por escrito. Sabes exactamente qué recibes antes de decidir.',
      },
      {
        title: 'Construimos',
        text: 'Avances visibles cada semana. Ves el proyecto crecer, no un silencio de un mes.',
      },
      {
        title: 'Entrego y acompaño',
        text: 'Deploy, traspaso de accesos y soporte incluido para los ajustes de las primeras semanas.',
      },
    ],
    modesHeading: 'Modalidades',
    modes: [
      { title: 'Proyecto cerrado', text: 'Precio fijo por un alcance definido.' },
      { title: 'Por horas', text: 'Para mejoras, cambios sueltos y consultoría.' },
      { title: 'Mantención mensual', text: 'Soporte continuo, monitoreo y mejoras.' },
    ],
    factsHeading: 'Datos prácticos',
    facts: [
      'Horario de Chile (GMT-3): mismo huso que la costa este de EE.UU., 5 horas de España.',
      'Español nativo e inglés técnico para leer, escribir y documentar.',
      'Reuniones por Meet, Zoom o Teams. Coordinación diaria por WhatsApp o Slack.',
      'Trabajo con boleta de honorarios.',
    ],
    cta: 'Cuéntame tu proyecto',
  },
  about: {
    heading: 'Sobre mí',
    text: 'Desarrollador full-stack en Motorman, representante oficial de Kubota y Yanmar en Chile. Construyo su ecosistema digital completo: e-commerce, catálogos con SEO, CRM interno y herramientas de venta. Me apasiona crear productos web que ayudan a los negocios a destacar. ¡Construyamos algo increíble juntos!',
  },
  services: {
    heading: 'Servicios',
    items: [
      {
        name: 'Desarrollo Web',
        description:
          'Sitios modernos, rápidos y responsivos con React, TypeScript y Tailwind: desde landing pages hasta aplicaciones completas.',
      },
      {
        name: 'E-commerce',
        description:
          'Tiendas WooCommerce y catálogos de producto con cotizadores por WhatsApp, recuperación de carritos abandonados y descuentos por volumen.',
      },
      {
        name: 'Aplicaciones a medida',
        description:
          'CRM, portales internos y dashboards con Next.js, Prisma y Supabase: flujos de aprobación, PDFs automáticos y correos transaccionales.',
      },
      {
        name: 'SEO Técnico',
        description:
          'Optimización completa para posicionar en Google: Schema.org, SEO local, sitemaps, Core Web Vitals y contenido estratégico.',
      },
      {
        name: 'Automatización',
        description:
          'Integraciones y procesos que ahorran horas de trabajo: importación de datos, generación de documentos, correos automáticos y reportes.',
      },
    ],
  },
  projects: {
    heading: 'Proyectos',
    view: 'Ver proyecto',
    internal: 'Proyecto interno',
    spinHint: '↺ Arrastra para girar',
    filters: { sites: 'Sitios web', systems: 'Portales y sistemas', mobile: 'Móvil' },
    desktopLabel: 'Escritorio',
    mobileLabel: 'Celular',
    mobileLead:
      'Así se ven en el celular. Cada sitio se arma primero para esta pantalla y desde ahí se expande al escritorio, porque es donde termina la conversación por WhatsApp.',
    caseLabels: { problem: 'Problema', solution: 'Solución', result: 'Resultado' },
    cases: {
      yanmaq: {
        category: 'Sitio corporativo · Motorman',
        problem:
          'La línea de maquinaria Yanmar no tenía un sitio propio en Chile: el catálogo vivía en PDFs y las cotizaciones dependían del teléfono.',
        solution:
          'Sitio corporativo con catálogo de 7 equipos, vistas 360°, fichas técnicas y cotización directa por WhatsApp; panel de administración con Supabase.',
        result:
          'Canal digital propio para la marca: las cotizaciones llegan por WhatsApp con el equipo ya elegido por el cliente.',
      },
      kubota: {
        category: 'Rediseño web · Motorman',
        problem:
          'La tienda actual mezcla todas las marcas: costaba posicionar "motores Kubota" y guiar al cliente al motor correcto.',
        solution:
          'Rediseño 100% Kubota: catálogo de 15 motores (13–99 HP), comparador lado a lado y SEO técnico completo con Schema.org y SEO local.',
        result:
          'Un sitio que responde exactamente lo que el cliente busca en Google: qué motor le sirve y dónde comprarlo en Chile.',
      },
      portal: {
        category: 'Portal interno · Motorman',
        problem:
          'Los avisos de la empresa, el menú del casino, los feriados y los beneficios circulaban en correos sueltos y papeles en el mural.',
        solution:
          'Portal interno al estilo Talana o Buk, con Next.js + Prisma sobre Railway: avisos, casino del día, calendario de feriados, cumpleaños del mes, beneficios y ficha de cada persona.',
        result:
          'Un solo lugar con todo lo que antes se preguntaba de boca en boca, y cada sección con su propia vista y su administración.',
      },
      motormaq: {
        category: 'Plugin WooCommerce · Motormaq',
        problem:
          'Los carritos abandonados y las cotizaciones manuales hacían perder ventas en la tienda WooCommerce.',
        solution:
          'Plugin a medida: cotizador por WhatsApp, recuperación de carritos con cupones automáticos, buscador de repuestos por máquina y descuentos por volumen.',
        result:
          'La tienda persigue sola cada carrito abandonado con cupón y recordatorio, y las cotizaciones llegan listas por WhatsApp.',
      },
      gastos: {
        category: 'App de finanzas · Personal',
        problem:
          'Llevar las finanzas de pareja en planillas: nadie las actualiza y nadie sabe quién le debe cuánto a quién.',
        solution:
          'App con React 19 + Supabase + Cloudflare Workers: gastos compartidos, presupuestos, recurrentes y balance de pareja automático.',
        result:
          'Cierre de mes en un clic: la app calcula quién debe cuánto y deja las cuentas saldadas entre los dos.',
      },
      nebuna: {
        category: 'E-commerce · Cliente',
        problem:
          'Una marca nueva de hongos adaptógenos necesitaba vender online con presupuesto acotado y sin costos fijos.',
        solution:
          'E-commerce estático ultrarrápido en Cloudflare Pages: catálogo generado por script, pedidos por WhatsApp y SEO desde el día uno.',
        result:
          'Tienda completa sin costo de hosting ni mantención, con despacho a todo Chile y carga instantánea.',
      },
      motormanWeb: {
        category: 'Sitio corporativo · Motorman',
        problem:
          'La casa matriz de Motorman corría sobre una base antigua y estática, difícil de actualizar, siendo la puerta de entrada a todas sus marcas y servicios.',
        solution:
          'Rehice la experiencia completa: recorrido por línea de negocio (maquinaria, repuestos, servicio técnico, Antipincho y cursos IPAF), movimiento en toda la página y contacto directo con el ejecutivo que corresponde.',
        result:
          'El hub que reparte hacia Yanmar, Kubota, la tienda de repuestos y los cursos, con la marca al día y cada consulta entrando por WhatsApp.',
      },
      ipaf: {
        category: 'Formación certificada · Motorman',
        problem:
          'El centro de formación vendía certificación internacional desde una página estática que no alcanzaba a explicar en qué se diferencian las cuatro categorías de curso.',
        solution:
          'Sitio dedicado a los cursos 1A, 1B, 3A y 3B: qué habilita la tarjeta PAL, descuentos por tamaño de grupo, preguntas frecuentes y cotización propia para cada curso.',
        result:
          'Cada categoría tiene su explicación y su botón de cotizar: el alumno llega sabiendo cuál necesita en vez de preguntarlo.',
      },
      mtqchile: {
        category: 'Catálogo técnico · Motormaq',
        problem:
          'La tienda online no servía a quien busca un repuesto puntual y necesita asesoría antes de comprar: neumáticos, filtros y rodados cambian según la máquina.',
        solution:
          'Sitio informativo separado de la tienda, ordenado por línea de producto y por compatibilidad con las grandes marcas, con cotización por WhatsApp y asesoría técnica gratuita.',
        result:
          'Dos caminos según el cliente: el que sabe qué quiere compra en la tienda, y el que necesita ayuda cotiza y pregunta.',
      },
      delcarpio: {
        category: 'SEO y contenido · Del Carpio',
        problem:
          'Un distribuidor de instrumentación analítica con un catálogo enorme y muy técnico que no aparecía en Google para los equipos que vendía.',
        solution:
          'Trabajé la estructura y el posicionamiento del catálogo: categorías por técnica analítica, carga y fichas de producto completas, y SEO on-page en todo el sitio.',
        result:
          'Catálogo ordenado por técnica —ICP, cromatografía, espectrometría— y encontrable por quien busca el equipo exacto.',
      },
      portalYanmaq: {
        category: 'Portal de clientes · Yanmaq',
        problem:
          'Después de comprar su máquina, el dueño quedaba sin canal propio: repuestos, mantenciones y dudas volvían todas al teléfono.',
        solution:
          'Portal privado de post-venta: cada cliente entra con su clave y encuentra su máquina, sus repuestos, su plan de mantención y las respuestas que más se preguntan.',
        result:
          'La post-venta deja de depender de llamadas y el cliente Yanmar tiene un lugar propio al que volver.',
      },
    },
  },
  brands: {
    heading: 'Han confiado en mí',
  },
  blog: {
    heading: 'Notas técnicas',
    readMore: 'Leer nota',
    items: [
      {
        href: '/blog/carritos-abandonados-woocommerce.html',
        title: 'Recuperar carritos abandonados en WooCommerce sin plugins de pago',
        summary: 'Cómo armé un módulo propio con cupones y recordatorios automáticos.',
      },
      {
        href: '/blog/seo-local-maquinaria-chile.html',
        title: 'SEO local para vender maquinaria en Chile',
        summary: 'Schema.org, Google Business y contenido que responde búsquedas reales.',
      },
      {
        href: '/blog/cotizador-whatsapp-woocommerce.html',
        title: 'Un cotizador por WhatsApp que sí convierte',
        summary: 'Por qué en Chile el checkout a veces sobra, y cómo reemplazarlo bien.',
      },
    ],
  },
  contact: {
    heading: '¿Trabajamos juntos?',
    name: 'Tu nombre',
    email: 'Tu correo',
    message: 'Cuéntame tu proyecto',
    sendWhatsApp: 'Enviar por WhatsApp',
    sendEmail: 'Enviar por correo',
    footer: '© 2026 Bastián Sandoval · Desarrollador Web Full-Stack · Santiago, Chile',
  },
};

const en: typeof es = {
  meta: {
    title: 'Bastián Sandoval — Full-Stack Web Developer',
    description:
      'Portfolio of Bastián Sandoval, full-stack web developer in Chile: e-commerce, custom applications, technical SEO and automation.',
  },
  nav: {
    about: 'About',
    services: 'Services',
    freelance: 'Freelance',
    projects: 'Projects',
    notes: 'Notes',
    contact: 'Contact',
  },
  hero: {
    heading: "Hi, I'm Bastián",
    tagline: 'Full-stack developer building fast, memorable web platforms',
    contact: 'Contact me',
    available: 'Available for projects',
  },
  freelance: {
    badge: 'Available for freelance work',
    heading: "Let's work together",
    intro:
      "Hiring someone remote is scary: you don't know if they'll answer, whether the price will shift halfway through, or if the project ends up locked to one person. Here's how I work so that none of that happens.",
    pillars: [
      {
        title: 'Remote, but present',
        text: 'Short calls whenever you need them. Fifteen minutes on video settles what twenty emails cannot.',
      },
      {
        title: 'Fast to respond',
        text: "If something breaks or you need a tweak, I'm there. Sites don't only go down between 9 and 6, so neither does my response window.",
      },
      {
        title: 'No surprises',
        text: 'Scope, timeline and price agreed before we start. If something changes, we talk about it first — it never shows up in the invoice.',
      },
      {
        title: 'The code is yours',
        text: 'Repository, access and documentation in your name from day one. No lock-in to me.',
      },
    ],
    stepsHeading: 'How we start',
    steps: [
      {
        title: 'We talk',
        text: 'A short call to understand what you need. Free, no strings attached.',
      },
      {
        title: 'I send a proposal',
        text: 'Scope, timeline and price in writing. You know exactly what you get before deciding.',
      },
      {
        title: 'We build',
        text: 'Visible progress every week. You watch the project grow instead of waiting a month in silence.',
      },
      {
        title: 'I ship and stay',
        text: 'Deploy, handover of all access, and support included for the first weeks of adjustments.',
      },
    ],
    modesHeading: 'Engagement models',
    modes: [
      { title: 'Fixed project', text: 'Flat price for a defined scope.' },
      { title: 'Hourly', text: 'For improvements, one-off changes and consulting.' },
      { title: 'Monthly retainer', text: 'Ongoing support, monitoring and improvements.' },
    ],
    factsHeading: 'Practical details',
    facts: [
      'Chile time (GMT-3): same hours as the US East Coast, 5 hours from Spain.',
      'Native Spanish and technical English for reading, writing and documentation.',
      'Meetings on Meet, Zoom or Teams. Day-to-day over WhatsApp or Slack.',
      'I invoice as an independent contractor (boleta de honorarios).',
    ],
    cta: 'Tell me about your project',
  },
  about: {
    heading: 'About me',
    text: "Full-stack developer at Motorman, official Kubota and Yanmar representative in Chile. I build their entire digital ecosystem: e-commerce, SEO-ready catalogs, an internal CRM and sales tools. I love creating web products that help businesses stand out. Let's build something incredible together!",
  },
  services: {
    heading: 'Services',
    items: [
      {
        name: 'Web Development',
        description:
          'Modern, fast, responsive sites with React, TypeScript and Tailwind: from landing pages to full applications.',
      },
      {
        name: 'E-commerce',
        description:
          'WooCommerce stores and product catalogs with WhatsApp quoting, abandoned-cart recovery and volume discounts.',
      },
      {
        name: 'Custom Applications',
        description:
          'CRMs, internal portals and dashboards with Next.js, Prisma and Supabase: approval flows, automatic PDFs and transactional email.',
      },
      {
        name: 'Technical SEO',
        description:
          'Complete optimization to rank on Google: Schema.org, local SEO, sitemaps, Core Web Vitals and strategic content.',
      },
      {
        name: 'Automation',
        description:
          'Integrations and processes that save hours of work: data imports, document generation, automatic emails and reports.',
      },
    ],
  },
  projects: {
    heading: 'Projects',
    view: 'View project',
    internal: 'Internal project',
    spinHint: '↺ Drag to spin',
    filters: { sites: 'Websites', systems: 'Portals & systems', mobile: 'Mobile' },
    desktopLabel: 'Desktop',
    mobileLabel: 'Phone',
    mobileLead:
      'How they look on a phone. Every site starts at this width and expands to desktop from there, because this is where the WhatsApp conversation ends up.',
    caseLabels: { problem: 'Problem', solution: 'Solution', result: 'Result' },
    cases: {
      yanmaq: {
        category: 'Corporate site · Motorman',
        problem:
          "The Yanmar machinery line had no site of its own in Chile: the catalog lived in PDFs and quotes depended on phone calls.",
        solution:
          'Corporate site with a 7-machine catalog, 360° views, spec sheets and direct WhatsApp quoting; admin panel on Supabase.',
        result:
          'A digital channel of its own: quotes now arrive via WhatsApp with the machine already chosen by the customer.',
      },
      kubota: {
        category: 'Web redesign · Motorman',
        problem:
          'The current store mixes every brand: ranking for "Kubota engines" and guiding customers to the right engine was hard.',
        solution:
          '100% Kubota redesign: a 15-engine catalog (13–99 HP), side-by-side comparator and full technical SEO with Schema.org and local SEO.',
        result:
          'A site that answers exactly what customers search on Google: which engine fits and where to buy it in Chile.',
      },
      portal: {
        category: 'Internal portal · Motorman',
        problem:
          'Company notices, the canteen menu, public holidays and staff benefits all travelled through scattered emails and notes on a wall.',
        solution:
          'An internal portal in the vein of Talana or Buk, on Next.js + Prisma over Railway: notices, the day’s canteen menu, a holiday calendar, birthdays of the month, benefits and a record for each person.',
        result:
          'One place for everything that used to travel by word of mouth, each section with its own view and its own admin.',
      },
      motormaq: {
        category: 'WooCommerce plugin · Motormaq',
        problem:
          'Abandoned carts and manual quoting were losing sales in the WooCommerce store.',
        solution:
          'Custom plugin: WhatsApp quoting, cart recovery with automatic coupons, parts finder by machine and volume discounts.',
        result:
          'The store now chases every abandoned cart with a coupon and reminder, and quotes arrive ready via WhatsApp.',
      },
      gastos: {
        category: 'Finance app · Personal',
        problem:
          "Couple finances in spreadsheets: nobody updates them and nobody knows who owes whom.",
        solution:
          'App with React 19 + Supabase + Cloudflare Workers: shared expenses, budgets, recurring items and automatic couple balance.',
        result:
          'Month-end close in one click: the app calculates who owes what and settles the balance between both.',
      },
      nebuna: {
        category: 'E-commerce · Client',
        problem:
          'A new adaptogenic mushroom brand needed to sell online on a tight budget with no fixed costs.',
        solution:
          'Ultra-fast static e-commerce on Cloudflare Pages: script-generated catalog, WhatsApp ordering and SEO from day one.',
        result:
          'A complete store with zero hosting or maintenance costs, shipping across Chile, loading instantly.',
      },
      motormanWeb: {
        category: 'Corporate site · Motorman',
        problem:
          "Motorman's head site ran on an old static base that was hard to update, while being the front door to every brand and service they offer.",
        solution:
          'Rebuilt the whole experience: a walkthrough by business line (machinery, parts, technical service, Antipincho and IPAF courses), motion throughout, and direct contact with the right sales rep.',
        result:
          'The hub that feeds Yanmar, Kubota, the parts store and the courses, with the brand up to date and every enquiry arriving on WhatsApp.',
      },
      ipaf: {
        category: 'Certified training · Motorman',
        problem:
          'The training centre sold international certification from a static page that never quite explained how its four course categories differ.',
        solution:
          'A site devoted to courses 1A, 1B, 3A and 3B: what the PAL card unlocks, group-size discounts, FAQs and its own quote button per course.',
        result:
          'Each category has its own explanation and quote button: students arrive already knowing which one they need.',
      },
      mtqchile: {
        category: 'Technical catalog · Motormaq',
        problem:
          'The online store did not serve buyers hunting one specific part who need advice first: tyres, filters and undercarriage change with every machine.',
        solution:
          'An informational site split off from the store, organised by product line and by compatibility with the major brands, with WhatsApp quoting and free technical advice.',
        result:
          'Two paths by customer: those who know what they want buy in the store, those who need help ask first.',
      },
      delcarpio: {
        category: 'SEO & content · Del Carpio',
        problem:
          'An analytical instrumentation distributor with a huge, highly technical catalog that never surfaced on Google for the equipment it sells.',
        solution:
          'I worked the catalog structure and its ranking: categories by analytical technique, full product loading and spec sheets, and on-page SEO across the site.',
        result:
          'A catalog ordered by technique — ICP, chromatography, spectrometry — and findable by whoever searches for that exact instrument.',
      },
      portalYanmaq: {
        category: 'Customer portal · Yanmaq',
        problem:
          'Once they bought the machine, owners had no channel of their own: parts, servicing and questions all went back to the phone.',
        solution:
          'A private after-sales portal: each customer signs in and finds their machine, their parts, their service plan and answers to what they ask most.',
        result:
          'After-sales stops depending on phone calls and the Yanmar owner gets a place of their own to come back to.',
      },
    },
  },
  brands: {
    heading: "They've trusted my work",
  },
  blog: {
    heading: 'Tech notes',
    readMore: 'Read note',
    items: [
      {
        href: '/blog/carritos-abandonados-woocommerce.html',
        title: 'Recovering abandoned carts in WooCommerce without paid plugins',
        summary: 'How I built a custom module with automatic coupons and reminders. (Spanish)',
      },
      {
        href: '/blog/seo-local-maquinaria-chile.html',
        title: 'Local SEO for selling machinery in Chile',
        summary: 'Schema.org, Google Business and content that answers real searches. (Spanish)',
      },
      {
        href: '/blog/cotizador-whatsapp-woocommerce.html',
        title: 'A WhatsApp quote flow that actually converts',
        summary: 'Why checkout is sometimes the wrong tool in Chile, and what to build instead. (Spanish)',
      },
    ],
  },
  contact: {
    heading: 'Shall we work together?',
    name: 'Your name',
    email: 'Your email',
    message: 'Tell me about your project',
    sendWhatsApp: 'Send via WhatsApp',
    sendEmail: 'Send via email',
    footer: '© 2026 Bastián Sandoval · Full-Stack Web Developer · Santiago, Chile',
  },
};

export const T = { es, en };

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: 'es', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return saved === 'en' ? 'en' : 'es';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.title = T[lang].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', T[lang].meta.description);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useLang();
  return T[lang];
}
