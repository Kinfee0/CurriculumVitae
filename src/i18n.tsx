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
    projects: 'Proyectos',
    notes: 'Notas',
    contact: 'Contacto',
  },
  hero: {
    heading: 'Hola, soy Bastián',
    tagline: 'Desarrollador full-stack creando plataformas web rápidas y memorables',
    contact: 'Contáctame',
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
        category: 'CRM + RRHH · Interno',
        problem:
          'Ventas y RRHH operaban con planillas, papeles y correos manuales para cada solicitud del personal.',
        solution:
          'Portal interno con Next.js + Prisma: CRM de ventas, aprobaciones de feriados y salidas, PDFs oficiales y correos automáticos, desplegado en Railway.',
        result:
          'Cada aprobación genera su comprobante PDF y su correo sin intervención: menos papeleo para todo el personal.',
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
    projects: 'Projects',
    notes: 'Notes',
    contact: 'Contact',
  },
  hero: {
    heading: "Hi, I'm Bastián",
    tagline: 'Full-stack developer building fast, memorable web platforms',
    contact: 'Contact me',
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
        category: 'CRM + HR · Internal',
        problem:
          'Sales and HR ran on spreadsheets, paper forms and manual emails for every staff request.',
        solution:
          'Internal portal with Next.js + Prisma: sales CRM, leave approvals, official PDFs and automatic emails, deployed on Railway.',
        result:
          'Every approval generates its PDF receipt and email on its own: less paperwork for the whole staff.',
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
