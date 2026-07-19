import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FileCheck2, Users } from 'lucide-react';
import { FadeIn, LiveProjectButton } from './Shared';
import { useT } from '../i18n';

const GLOWS = [
  { top: '6%', left: '-8%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(182,0,168,0.35), transparent 70%)' },
  { top: '30%', right: '-10%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(118,33,176,0.38), transparent 70%)' },
  { top: '58%', left: '-6%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(190,76,0,0.28), transparent 70%)' },
  { top: '82%', right: '-4%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(0,151,166,0.30), transparent 70%)' },
] as const;

type CaseId = 'yanmaq' | 'kubota' | 'portal' | 'motormaq' | 'gastos' | 'nebuna';

type IconTile = {
  icon: 'aprobaciones' | 'rrhh';
  title: string;
  subtitle: string;
};

type Project = {
  id: CaseId;
  number: string;
  name: string;
  href?: string;
  button?: 'view' | 'internal' | 'github';
  col1: (string | IconTile)[];
  col2: string;
};

const PROJECTS: Project[] = [
  {
    id: 'yanmaq',
    number: '01',
    name: 'Yanmaq.cl',
    href: 'https://www.yanmaq.cl',
    button: 'view',
    col1: ['yanmaq-2', 'yanmaq-3'],
    col2: 'yanmaq',
  },
  {
    id: 'kubota',
    number: '02',
    name: 'Motorman · Kubota',
    href: 'https://motoreskubota.cl',
    button: 'view',
    col1: ['kubota-2', 'kubota-comparador'],
    col2: 'kubota',
  },
  {
    id: 'portal',
    number: '03',
    name: 'Portal Motorman',
    button: 'internal',
    col1: [
      {
        icon: 'aprobaciones',
        title: 'Aprobaciones y PDFs',
        subtitle: 'Feriados, salidas y constancias con correo automático',
      },
      {
        icon: 'rrhh',
        title: 'Ventas + RRHH',
        subtitle: 'Next.js · Prisma · Railway',
      },
    ],
    col2: 'portal-login',
  },
  {
    id: 'motormaq',
    number: '04',
    name: 'Motormaq Ventas',
    href: 'https://www.motormaq.cl',
    button: 'view',
    col1: ['motormaq-2', 'motormaq-3'],
    col2: 'motormaq',
  },
  {
    id: 'gastos',
    number: '05',
    name: 'Gastos Hogar',
    href: 'https://github.com/Kinfee0',
    button: 'github',
    col1: ['gastos-nosotros', 'gastos-presupuestos'],
    col2: 'gastos-dashboard',
  },
  {
    id: 'nebuna',
    number: '06',
    name: 'Nebuna',
    href: 'https://nebuna.cl',
    button: 'view',
    col1: ['nebuna-2', 'nebuna-producto'],
    col2: 'nebuna',
  },
];

const ICONS = {
  aprobaciones: FileCheck2,
  rrhh: Users,
};

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

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const t = useT();
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index * (1 / total), 1], [1, targetScale]);
  // La tarjeta se atenúa a medida que la siguiente la va tapando
  const targetOpacity = Math.max(0.45, 1 - (total - 1 - index) * 0.12);
  const opacity = useTransform(progress, [index * (1 / total), 1], [1, targetOpacity]);
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
    <div className="h-[85vh]">
      <motion.div
        className="sticky top-24 md:top-32"
        style={{ scale, opacity, top: `calc(clamp(3.5rem, 8vh, 5rem) + ${index * 20}px)` }}
      >
        <FadeIn y={40} duration={0.7}>
          <div className="glass-card rounded-[28px] sm:rounded-[44px] md:rounded-[56px] p-4 sm:p-6 md:p-7">
            {/* Fila superior: número y textos entran por la izquierda, botón por la derecha */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-10 mb-3 sm:mb-4">
              <FadeIn x={-60} y={0} delay={0.05} duration={0.8}>
                <span
                  className="hero-heading font-black leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 6.2vw, 90px)' }}
                >
                  {project.number}
                </span>
              </FadeIn>
              <FadeIn x={-40} y={0} delay={0.15} duration={0.8} className="flex flex-col min-w-0">
                <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs md:text-sm">
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
                  <p className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-[0.6rem] md:text-[0.7rem] mb-1">
                    {col.label}
                  </p>
                  <p className="text-[#D7E2EA]/85 font-light leading-snug text-[0.7rem] md:text-[0.8rem]">
                    {col.text}
                  </p>
                </FadeIn>
              ))}
            </div>

            {/* Grilla de imágenes: columna izquierda desde la izquierda, grande desde la derecha */}
            <div className="flex gap-3 sm:gap-4 md:gap-5">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[40%]">
                <FadeIn x={-50} y={0} delay={0.25} duration={0.8}>
                  <Tile
                    item={project.col1[0]}
                    style={{ height: 'clamp(110px, min(12vw, 24vh), 180px)' }}
                  />
                </FadeIn>
                <FadeIn x={-50} y={0} delay={0.35} duration={0.8}>
                  <Tile
                    item={project.col1[1]}
                    style={{ height: 'clamp(140px, min(15.5vw, 30vh), 250px)' }}
                  />
                </FadeIn>
              </div>
              <div className="w-[60%]">
                <FadeIn x={60} y={0} delay={0.3} duration={0.8} className="h-full">
                  <Tile item={project.col2} className="h-full" />
                </FadeIn>
              </div>
            </div>
          </div>
        </FadeIn>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 overflow-hidden"
    >
      {/* Glows de color detrás de las tarjetas: hacen visible el blur del vidrio */}
      {GLOWS.map((glow, i) => (
        <div key={i} className="glow-blob" style={glow} />
      ))}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {t.projects.heading}
        </h2>
      </FadeIn>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
