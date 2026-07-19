import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export const EMAIL = 'bastiansandovaal@gmail.com';
export const GITHUB_URL = 'https://github.com/Kinfee0';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/bastiansandovals/';
// Número de WhatsApp para el formulario de contacto, formato internacional sin
// "+". Vacío = el formulario solo ofrece envío por correo.
export const WHATSAPP = '56942230004';

const EASE = [0.25, 0.1, 0.25, 1] as const;

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

/* ----------------------------- LiveProjectButton ---------------------------- */

export function LiveProjectButton({
  href,
  label = 'Ver proyecto',
}: {
  href?: string;
  label?: string;
}) {
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
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
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
