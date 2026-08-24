import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { FileCheck2, Users } from 'lucide-react';
import { FadeIn, LiveProjectButton } from './Shared';
import { Spin360 } from './Spin360';
import { MobileShowcase } from './MobileShowcase';
import { useT } from '../i18n';

const GLOWS = [
  { top: '6%', left: '-8%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(182,0,168,0.35), transparent 70%)' },
  { top: '30%', right: '-10%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(118,33,176,0.38), transparent 70%)' },
  { top: '58%', left: '-6%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(190,76,0,0.28), transparent 70%)' },
  { top: '82%', right: '-4%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(0,151,166,0.30), transparent 70%)' },
] as const;

type CaseId =
  | 'yanmaq'
  | 'kubota'
  | 'motormanWeb'
  | 'mtqchile'
  | 'motormaq'
  | 'ipaf'
  | 'nebuna'
  | 'delcarpio'
  | 'portalYanmaq'
  | 'portal'
  | 'gastos';

// 'mobile' no agrupa proyectos: es una vista aparte con los mismos sitios
// vistos en el celular, así que no aparece en el campo `grupo` de ninguno.
type Grupo = 'sites' | 'systems' | 'mobile';

type IconTile = {
  icon: 'aprobaciones' | 'rrhh';
  title: string;
  subtitle: string;
};

type Project = {
  id: CaseId;
  name: string;
  grupo: Exclude<Grupo, 'mobile'>;
  href?: string;
  button?: 'view' | 'internal' | 'github';
  col1: (string | IconTile)[];
  // El visor 360 arrastrable ocupa la columna grande en vez de una captura
  col2: string | { spin: string };
  // Captura de la versión móvil, para la pestaña Móvil. Solo la tienen los
  // sitios de cara al público; los portales no entran ahí.
  movil?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'yanmaq',
    movil: 'yanmaq',
    name: 'Yanmaq.cl',
    grupo: 'sites',
    href: 'https://www.yanmaq.cl',
    button: 'view',
    col1: ['yanmaq-2026', 'yanmaq-ficha'],
    col2: { spin: '/img/360/vio35' },
  },
  {
    id: 'kubota',
    movil: 'kubota',
    name: 'Motorman · Kubota',
    grupo: 'sites',
    href: 'https://motoreskubota.cl',
    button: 'view',
    col1: ['kubota-2', 'kubota-comparador'],
    col2: 'kubota',
  },
  {
    id: 'motormanWeb',
    movil: 'motorman',
    name: 'Motorman.cl',
    grupo: 'sites',
    href: 'https://motorman.cl',
    button: 'view',
    col1: ['motorman-maquinaria', 'motorman-antipincho'],
    col2: 'motorman-2026',
  },
  {
    id: 'ipaf',
    movil: 'ipaf',
    name: 'Cursos IPAF Chile',
    grupo: 'sites',
    href: 'https://ipaf.cl',
    button: 'view',
    col1: ['ipaf-cursos', 'ipaf-beneficios'],
    col2: 'ipaf',
  },
  {
    id: 'mtqchile',
    movil: 'mtqchile',
    name: 'Motormaq Chile',
    grupo: 'sites',
    href: 'https://motormaqchile.cl',
    button: 'view',
    col1: ['mtqchile-productos', 'mtqchile-equipos'],
    col2: 'mtqchile',
  },
  {
    id: 'motormaq',
    movil: 'motormaq',
    name: 'Motormaq Ventas',
    grupo: 'sites',
    href: 'https://www.motormaq.cl',
    button: 'view',
    col1: ['motormaq-catalogo', 'motormaq-grid'],
    col2: 'motormaq-2026',
  },
  {
    id: 'nebuna',
    movil: 'nebuna',
    name: 'Nebuna',
    grupo: 'sites',
    href: 'https://nebuna.cl',
    button: 'view',
    col1: ['nebuna-2', 'nebuna-producto'],
    col2: 'nebuna',
  },
  {
    id: 'delcarpio',
    movil: 'delcarpio',
    name: 'Del Carpio',
    grupo: 'sites',
    href: 'https://www.delcarpio.cl',
    button: 'view',
    col1: ['delcarpio-productos', 'delcarpio-categoria'],
    col2: 'delcarpio',
  },
  {
    id: 'portalYanmaq',
    name: 'Portal Clientes Yanmaq',
    grupo: 'systems',
    href: 'https://www.yanmaq.cl/portal.html',
    button: 'view',
    col1: ['portal-yanmaq-login', 'yanmaq-visor360'],
    col2: 'portal-yanmaq',
  },
  {
    id: 'portal',
    name: 'Portal Motorman',
    grupo: 'systems',
    button: 'internal',
    col1: [
      {
        icon: 'aprobaciones',
        title: 'Avisos y beneficios',
        subtitle: 'Casino del día, feriados y cumpleaños del mes',
      },
      {
        icon: 'rrhh',
        title: 'Personas + Gestión',
        subtitle: 'Next.js · Prisma · Railway',
      },
    ],
    col2: 'portal-motorman',
  },
  {
    id: 'gastos',
    name: 'Gastos Hogar',
    grupo: 'systems',
    href: 'https://github.com/Kinfee0',
    button: 'github',
    col1: ['gastos-nosotros', 'gastos-presupuestos'],
    col2: 'gastos-dashboard',
  },
];

const GRUPOS: Grupo[] = ['sites', 'systems', 'mobile'];

const ICONS = {
  aprobaciones: FileCheck2,
  rrhh: Users,
};

// Ángulos de reposo del mazo: la tarjeta activa siempre está derecha (0°) y se
// va ladeando a medida que la siguiente la entierra, como naipes apilados a
// mano. El signo alterna para que el mazo se abra hacia los dos lados.
const TILT = [-2, 1.5, -1.2, 1.8, -1.6, 1.1];

function Tile({
  item,
  className,
  style,
}: {
  item: string | IconTile;
  className?: string;
  style?: React.CSSProperties;
}) {
  const radius = 'rounded-[22px] sm:rounded-[40px] md:rounded-[52px]';
  if (typeof item === 'string') {
    return (
      <img
        src={`/img/shots/${item}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${radius} object-cover object-top w-full ${className ?? ''}`}
        style={style}
      />
    );
  }
  const Icon = ICONS[item.icon];
  return (
    <div
      className={`${radius} glass-tile w-full flex flex-col items-center justify-center gap-2 sm:gap-3 text-center px-6 ${className ?? ''}`}
      style={style}
    >
      <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-[#D7E2EA]" strokeWidth={1.5} />
      <p className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xs sm:text-sm">
        {item.title}
      </p>
      <p className="text-[#D7E2EA]/60 font-light text-[0.65rem] sm:text-xs leading-snug">
        {item.subtitle}
      </p>
    </div>
  );
}

// Geometría del mazo. Se calcula UNA vez para todas las tarjetas (con la más
// alta): si cada una la calculara con su propia altura, el escalón del montón
// saldría desparejo, porque los textos de cada caso no miden lo mismo.
type Deck = {
  cajaH: number | null; // distancia de scroll entre una tarjeta y la siguiente
  base: number; // dónde se posa el primer naipe
  paso: number; // cuánto asoma el borde de cada naipe enterrado
  // Cuántos bordes llega a mostrar el abanico. Se satura a propósito: con 8
  // tarjetas y un notebook de 720px no cabe un escalón por tarjeta, y forzarlo
  // aplasta el abanico a cero. Un mazo real tampoco muestra ocho cantos.
  escalones: number;
};

const MAX_ESCALONES = 4;

function ProjectCard({
  project,
  index,
  total,
  progress,
  deck,
  onCard,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  deck: Deck;
  onCard: (index: number, el: HTMLDivElement | null) => void;
}) {
  const t = useT();
  const reduce = useReducedMotion();
  // Cuántas tarjetas quedarán encima de esta al final del mazo
  const encima = total - 1 - index;
  const start = index * (1 / total);
  const tilt = TILT[index % TILT.length];

  // Al ser enterrada, la tarjeta se encoge, se ladea y se corre un poco hacia
  // el lado del ladeo: es lo que hace que el montón se lea como un mazo de
  // naipes y no como un simple stack alineado.
  // El encogido también se satura: con 8 tarjetas, un 3% por naipe dejaría la
  // primera al 79% y se vería deforme al lado de la de arriba.
  const scale = useTransform(progress, [start, 1], [1, 1 - Math.min(encima, 5) * 0.03]);
  const rotate = useTransform(progress, [start, 1], [0, reduce ? 0 : tilt]);
  const x = useTransform(progress, [start, 1], [0, reduce ? 0 : tilt * 4]);
  // Sombra que le proyecta encima la tarjeta siguiente. Va como capa negra y no
  // como opacity de la tarjeta: bajarle la opacidad al vidrio deja ver la
  // tarjeta de abajo y el montón se ensucia. Entra rápido —dentro del tramo en
  // que llega el naipe siguiente— porque el vidrio difumina lo que tiene detrás
  // y una tarjeta enterrada con capturas claras deja la de arriba lechosa.
  const shade = useTransform(
    progress,
    [start, Math.min(1, start + 1.15 / total)],
    [0, encima > 0 ? 0.55 : 0]
  );

  const caso = t.projects.cases[project.id];
  const buttonLabel =
    project.button === 'internal'
      ? t.projects.internal
      : project.button === 'github'
        ? 'GitHub'
        : t.projects.view;

  const caseCols = [
    { label: t.projects.caseLabels.problem, text: caso.problem },
    { label: t.projects.caseLabels.solution, text: caso.solution },
    { label: t.projects.caseLabels.result, text: caso.result },
  ];

  return (
    // Todas las cajas son `sticky top-0` dentro del MISMO contenedor: por eso
    // una tarjeta sigue clavada cuando la siguiente llega y se le pone encima.
    // (Con un riel por tarjeta el apilado es imposible: cada naipe se va justo
    // antes de que aparezca el que sigue.) Y van pointer-events-none porque si
    // no, las cajas de los naipes siguientes taparían los enlaces de los
    // anteriores aunque sean transparentes.
    <div className="sticky top-0 pointer-events-none" style={{ height: deck.cajaH ?? '100vh' }}>
      <motion.div
        className="relative pointer-events-auto"
        style={{
          scale,
          rotate,
          x,
          top: deck.base + deck.paso * Math.min(index, deck.escalones),
          // Anclado arriba: si escalara desde el centro, el borde superior de
          // cada naipe enterrado bajaría justo lo que lo separa del de encima y
          // el mazo se vería como una sola tarjeta.
          transformOrigin: 'top center',
          transformPerspective: 1600,
        }}
      >
        {/* Reparto: la tarjeta llega desde abajo y de costado, ladeada, y se
            endereza al caer sobre el mazo. */}
        <motion.div
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 90, x: tilt * 14, rotate: tilt * 3, scale: 0.92 }
          }
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 85, damping: 15, mass: 0.9 }
          }
          style={{ willChange: 'transform' }}
        >
          <div
            ref={(el) => onCard(index, el)}
            className="glass-card relative rounded-[28px] sm:rounded-[44px] md:rounded-[56px] p-4 sm:p-6 md:p-7"
          >
            {/* Sombra del naipe que se le viene encima */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 rounded-[28px] sm:rounded-[44px] md:rounded-[56px] bg-black"
              style={{ opacity: shade }}
              aria-hidden
            />
            {/* Fila superior: número y textos entran por la izquierda, botón por la derecha */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-10 mb-3 sm:mb-4">
              <FadeIn x={-60} y={0} delay={0.05} duration={0.8}>
                <span
                  className="project-number font-black leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 6.2vw, 90px)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </FadeIn>
              <FadeIn x={-40} y={0} delay={0.15} duration={0.8} className="flex flex-col min-w-0">
                <span
                  className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs md:text-sm"
                >
                  {caso.category}
                </span>
                <h3
                  className="text-[#D7E2EA] font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.1rem)' }}
                >
                  {project.name}
                </h3>
              </FadeIn>
              <FadeIn x={50} y={0} delay={0.2} duration={0.8} className="ml-auto">
                <LiveProjectButton
                  href={project.button === 'internal' ? undefined : project.href}
                  label={buttonLabel}
                />
              </FadeIn>
            </div>

            {/* Caso de estudio: columnas escalonadas de abajo hacia arriba */}
            <div className="hidden sm:grid grid-cols-3 gap-4 md:gap-6 mb-3 md:mb-4">
              {caseCols.map((col, i) => (
                <FadeIn key={col.label} y={24} delay={0.25 + i * 0.1} duration={0.7}>
                  <p className="text-[#E0AFFF]/90 font-semibold uppercase tracking-wide text-[0.7rem] md:text-[0.8rem] mb-1.5">
                    {col.label}
                  </p>
                  <p className="text-[#D7E2EA] font-normal leading-relaxed text-[0.82rem] md:text-[0.95rem]">
                    {col.text}
                  </p>
                </FadeIn>
              ))}
            </div>

            {
              /* Grilla de imágenes: columna izquierda desde la izquierda, grande desde la derecha */
              <div className="flex gap-3 sm:gap-4 md:gap-5">
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[40%]">
                  <FadeIn x={-50} y={0} delay={0.25} duration={0.8}>
                    <Tile
                      item={project.col1[0]}
                      style={{ height: 'clamp(100px, min(11vw, 19vh), 170px)' }}
                    />
                  </FadeIn>
                  <FadeIn x={-50} y={0} delay={0.35} duration={0.8}>
                    <Tile
                      item={project.col1[1]}
                      style={{ height: 'clamp(130px, min(14vw, 24vh), 230px)' }}
                    />
                  </FadeIn>
                </div>
                <div className="w-[60%]">
                  <FadeIn x={60} y={0} delay={0.3} duration={0.8} className="h-full">
                    {typeof project.col2 === 'object' ? (
                      <Spin360
                        base={project.col2.spin}
                        alt={`${project.name} — vista 360°`}
                        hint={t.projects.spinHint}
                        className="h-full rounded-[22px] sm:rounded-[40px] md:rounded-[52px]"
                      />
                    ) : (
                      <Tile item={project.col2} className="h-full" />
                    )}
                  </FadeIn>
                </div>
              </div>
            }
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [grupo, setGrupo] = useState<Grupo>('sites');
  // La pestaña Móvil no usa el mazo: es un recorrido donde la tarjeta queda
  // fija y va cambiando el teléfono. Por eso el mazo no recibe nada ahí.
  const esMovil = grupo === 'mobile';
  const visibles = esMovil ? [] : PROJECTS.filter((p) => p.grupo === grupo);
  const proyectosMovil = PROJECTS.filter((p) => p.movil).map((p) => ({
    id: p.id,
    name: p.name,
    movil: p.movil as string,
    href: p.href,
  }));

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const onCard = useCallback((i: number, el: HTMLDivElement | null) => {
    cardsRef.current[i] = el;
  }, []);
  const [deck, setDeck] = useState<Deck>({ cajaH: null, base: 0, paso: 0, escalones: 0 });

  const total = visibles.length;
  useEffect(() => {
    // Al cambiar de pestaña se desmontan tarjetas: hay que soltar las refs
    // viejas o la más alta del grupo anterior seguiría mandando en la medición.
    cardsRef.current.length = total;
    const els = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const update = () => {
      // offsetHeight ignora el scale de framer-motion (getBoundingClientRect no)
      const alto = Math.max(...els.map((el) => el.offsetHeight));
      const vh = window.innerHeight;
      const escalones = Math.min(total - 1, MAX_ESCALONES);
      // El escalón se reparte el aire que sobra, pero nunca baja de 9px: por
      // debajo de eso el abanico deja de leerse y el mazo parece una tarjeta.
      const sobra = Math.max(0, vh - alto - 24);
      const paso = Math.max(9, Math.min(24, sobra / Math.max(1, escalones)));
      const base = Math.max(10, Math.min(88, (vh - alto - paso * escalones) / 2));
      setDeck({
        cajaH: Math.round(Math.min(vh, alto + 260)),
        base: Math.round(base),
        paso: Math.round(paso),
        escalones,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    els.forEach((el) => ro.observe(el));
    window.addEventListener('resize', update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [total]);

  // Cambiar de pestaña acorta el mazo: sin esto el visitante queda flotando en
  // un tramo de scroll que ya no existe y ve la sección vacía.
  const cambiarGrupo = (g: Grupo) => {
    if (g === grupo) return;
    setGrupo(g);
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 40, behavior: 'smooth' });
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      // overflow-x-clip y NO overflow-x-hidden: el teléfono de la pestaña Móvil
      // sale de la pantalla y hay que recortarlo, pero `hidden` convierte al
      // elemento en contenedor de scroll y eso anula el position:sticky del
      // mazo en las otras dos pestañas. `clip` recorta sin crear scroll.
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 overflow-x-clip px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      {/* Glows de color detrás de las tarjetas: hacen visible el blur del vidrio.
          IMPORTANTE: el overflow-hidden vive en este contenedor y NO en la
          <section>. Un ancestro con overflow:hidden anula position:sticky, y eso
          rompía por completo el apilado de las tarjetas. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {GLOWS.map((glow, i) => (
          <div key={i} className="glow-blob" style={glow} />
        ))}
      </div>
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {t.projects.heading}
        </h2>
      </FadeIn>

      {/* Pestañas: separan los sitios de cara al público de los sistemas con
          login, que son dos encargos distintos para quien viene a contratar. */}
      <FadeIn delay={0.1} y={24}>
        <div
          role="tablist"
          aria-label={t.projects.heading}
          className="glass-tile relative z-10 mx-auto mb-12 sm:mb-16 md:mb-20 flex w-fit gap-1 rounded-full p-1"
        >
          {GRUPOS.map((g) => {
            const activo = g === grupo;
            return (
              <button
                key={g}
                role="tab"
                aria-selected={activo}
                onClick={() => cambiarGrupo(g)}
                className={`relative rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 sm:px-7 sm:py-2.5 sm:text-sm ${
                  activo ? 'text-[#0C0C0C]' : 'text-[#D7E2EA]/70 hover:text-[#D7E2EA]'
                }`}
              >
                {activo && (
                  <motion.span
                    layoutId="pestana-activa"
                    className="absolute inset-0 rounded-full bg-[#D7E2EA]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">
                  {t.projects.filters[g]}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {esMovil ? (
        <div className="relative z-10 mx-auto max-w-6xl">
          <FadeIn y={24} delay={0.05}>
            <p className="mx-auto -mt-4 mb-10 max-w-2xl text-center text-sm font-light leading-relaxed text-[#D7E2EA]/75 sm:text-base">
              {t.projects.mobileLead}
            </p>
          </FadeIn>
          <MobileShowcase items={proyectosMovil} />
        </div>
      ) : (
        <div ref={containerRef} className="max-w-6xl mx-auto relative">
          {visibles.map((project, i) => (
            <ProjectCard
              key={`${grupo}-${project.id}`}
              project={project}
              index={i}
              total={total}
              progress={scrollYProgress}
              deck={deck}
              onCard={onCard}
            />
          ))}
          {/* Cola del mazo: sin ella la última tarjeta se despega apenas llega,
              porque el sticky termina donde termina el contenedor. Va como div y
              no como padding: Chrome no cuenta el padding para el sticky. */}
          <div aria-hidden className="h-[45vh]" />
        </div>
      )}
    </section>
  );
}
