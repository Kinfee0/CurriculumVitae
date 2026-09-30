import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';

export const EMAIL = 'contacto@bastiansandoval.cl';
export const GITHUB_URL = 'https://github.com/Kinfee0';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/bastiansandovals/';
// Número de WhatsApp para el formulario de contacto, formato internacional sin
// "+". Vacío = el formulario solo ofrece envío por correo.
export const WHATSAPP = '56942230004';

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* ----------------------------- useReducedMotion ----------------------------- */

// Reemplaza al de framer-motion. El de framer lee la media query en el primer
// render, así que en el servidor (prerender) da null y en el cliente true para
// quien pide menos movimiento: el árbol no coincide y React descarta el HTML
// prerenderizado. Con useSyncExternalStore la hidratación usa el valor del
// servidor (false) y justo después se corrige con el real.
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

/* ---------------------------------- FadeIn ---------------------------------- */

type FadeInProps = {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  style?: CSSProperties;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}: FadeInProps) {
  const Component = useMemo(() => motion.create(as), [as]);
  const reduce = useReducedMotion();
  return (
    <Component
      initial={{ opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay: reduce ? 0 : delay, duration: reduce ? 0.01 : duration, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

/* ---------------------------------- HeroIn ---------------------------------- */

/**
 * Entrada de los heros en CSS (.hero-in en index.css) en vez de FadeIn: misma
 * subida + fundido, mismos retrasos y misma curva, pero arranca apenas se pinta
 * el HTML prerenderizado. Con FadeIn todo el hero —y con él el LCP— quedaba
 * invisible hasta que bajaba y corría el bundle de JavaScript (~3 s en 4G).
 */
export function HeroIn({
  as: Tag = 'div',
  delay,
  y,
  className,
  children,
}: {
  as?: 'div' | 'nav';
  delay: number;
  y: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`hero-in ${className ?? ''}`}
      style={{ '--hero-delay': `${delay}s`, '--hero-y': `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------- Magnet ---------------------------------- */

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

export function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);
      if (dx < r.width / 2 + padding && dy < r.height / 2 + padding) {
        setActive(true);
        setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength, reduce]);

  return (
    <div ref={ref}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------- ContactButton ------------------------------ */

export function ContactButton({
  href = `mailto:${EMAIL}`,
  label = 'Contáctame',
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className="inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base whitespace-nowrap transition-transform duration-300 hover:scale-[1.04]"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #ffffff',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
}

/* ---------------------------- AvailabilityBadge ---------------------------- */

/** Píldora "disponible para proyectos" con punto verde pulsante. */
export function AvailabilityBadge({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`glass-tile inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 ${className}`}
    >
      <span className="relative flex w-2 h-2 shrink-0">
        <span className="pulse-dot absolute inline-flex w-full h-full rounded-full bg-[#3DDC84] opacity-75" />
        <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3DDC84]" />
      </span>
      <span className="text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem]">
        {label}
      </span>
    </span>
  );
}

/* ----------------------------- LiveProjectButton ---------------------------- */

export function LiveProjectButton({
  href,
  label = 'Ver proyecto',
  compact = false,
}: {
  href?: string;
  label?: string;
  // Botón redondo solo con ícono, para el encabezado de las tarjetas en
  // celular: la píldora con texto no cabe al lado del nombre y bajaba a una
  // fila propia.
  compact?: boolean;
}) {
  if (compact) {
    const circle =
      'glass-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#D7E2EA]';
    if (!href) {
      return (
        <span className={`${circle} opacity-60`} title={label} aria-label={label} role="img">
          <Lock className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
      );
    }
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={circle}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      >
        <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
      </motion.a>
    );
  }
  const classes =
    'glass-tile inline-block rounded-full text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base whitespace-nowrap transition-colors duration-200';
  if (!href) {
    return <span className={`${classes} opacity-60`}>{label}</span>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} hover:bg-[#D7E2EA]/15`}
    >
      {label}
    </a>
  );
}

/* ------------------------------- AnimatedText ------------------------------- */

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Una sola capa por letra. Antes eran dos (una fija al 20% y otra encima que
  // iba de 20% a 100%) y el texto quedaba duplicado en el DOM: Google y los
  // bots leían "DDeessaarrrroollllaaddoorr". Dos capas al 20% se ven como una al
  // 36% (1 − 0,8 × 0,8), así que partir de 0.36 se ve igual que antes.
  const opacity = useTransform(progress, range, [0.36, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export function AnimatedText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const total = text.length;
  let charIndex = 0;

  if (reduce) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const start = charIndex;
        charIndex += word.length + 1;
        return (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((c, ci) => {
                const i = start + ci;
                return (
                  <Char
                    key={ci}
                    char={c}
                    progress={scrollYProgress}
                    range={[i / total, Math.min(1, (i + 1) / total)]}
                  />
                );
              })}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}
