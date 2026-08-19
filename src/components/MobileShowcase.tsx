import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { useT } from '../i18n';

export type ItemMovil = {
  id: string;
  name: string;
  movil: string;
  href?: string;
};

// Alto del teléfono: se ata a la altura de la ventana y no al ancho, porque la
// tarjeta tiene ancho fijo y el ancho de pantalla no dice nada sobre el
// espacio disponible aquí. El tope subió de 470 a 620: en escritorio (donde
// sobra alto de ventana) se quedaba corto y se veía chico.
const ALTO_TEL = 'clamp(320px, 62vh, 620px)';

// Cuánto scroll dura cada proyecto antes de dar paso al siguiente. Va holgado
// porque ahora el teléfono cruza la pantalla entera y necesita tiempo de vuelo.
const TRAMO_VH = 78;

// Cuánto sube y baja el teléfono en los extremos del arco
const ARCO_Y = 120;

/**
 * Recorrido de las versiones móviles: la tarjeta queda clavada en el centro y
 * lo único que viaja es el teléfono, que cruza la pantalla completa en arco —
 * entra por una esquina, se posa en el medio y sigue de largo hacia la esquina
 * contraria cuando llega el siguiente, alternando de lado.
 *
 * La curva sale de darle a X y a Y curvas de tiempo distintas: si ambos ejes
 * usaran la misma, el teléfono viajaría en línea recta.
 */
export function MobileShowcase({ items }: { items: ItemMovil[] }) {
  const t = useT();
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start start', 'end end'],
  });

  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // El último tramo se reparte igual que los demás; el clamp evita que al
    // llegar justo al final (v === 1) el índice se pase de la lista.
    const n = Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length)));
    setI(n);
  });

  // El viaje se mide contra la ventana, no contra la tarjeta: el teléfono tiene
  // que arrancar de verdad fuera de la pantalla, no del borde de la tarjeta.
  const [viaje, setViaje] = useState(700);
  useEffect(() => {
    const medir = () => setViaje(window.innerWidth / 2 + 200);
    medir();
    window.addEventListener('resize', medir, { passive: true });
    return () => window.removeEventListener('resize', medir);
  }, []);

  const activo = items[i];
  // Alterna la esquina de entrada: par por la izquierda, impar por la derecha.
  const lado = i % 2 === 0 ? -1 : 1;

  const humo = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, filter: 'blur(14px)', scale: 0.94, y: 14 },
        animate: { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 },
        exit: { opacity: 0, filter: 'blur(18px)', scale: 1.1, y: -22 },
      };

  return (
    <div ref={railRef} style={{ height: `${items.length * TRAMO_VH}vh` }}>
      <div
        className="sticky top-0 flex items-center justify-center"
        style={{ height: '100svh' }}
      >
        {/* Sin tarjeta de vidrio detrás: acá el teléfono va suelto sobre el
            fondo de la sección, así que el único marco es el del propio
            aparato. */}
        <div className="relative w-full max-w-[400px]">
          {/* Bloque de texto: alto reservado para que el teléfono no salte
              cuando una categoría ocupa dos líneas y la siguiente una. */}
          <div className="relative mb-5 h-[74px] sm:h-[80px]">
            {/* La duración va corta a propósito: con `mode="wait"` el humo sale
                y recién entonces entra el siguiente, así que se paga dos veces
                y el título quedaría casi un segundo en blanco. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activo.id}
                initial={humo.initial}
                animate={humo.animate}
                exit={humo.exit}
                transition={{ duration: reduce ? 0.01 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 flex items-center justify-center gap-3"
              >
                <span
                  className="project-number font-black leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[0.58rem] font-light uppercase leading-tight tracking-widest text-[#D7E2EA]/60 sm:text-[0.62rem]">
                    {t.projects.cases[activo.id as keyof typeof t.projects.cases].category}
                  </span>
                  <span className="text-[0.95rem] font-medium uppercase leading-tight text-[#D7E2EA] sm:text-[1.15rem]">
                    {activo.name}
                  </span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Teléfono: cruza la pantalla de esquina a esquina. Entrante y
              saliente conviven durante el cruce, por eso van en posición
              absoluta dentro de un alto fijo. */}
          <div className="relative" style={{ height: ALTO_TEL }}>
            <AnimatePresence initial={false}>
              <motion.a
                key={activo.id}
                href={activo.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: lado * viaje, y: ARCO_Y, rotate: lado * 16 }
                }
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: -lado * viaje, y: -ARCO_Y, rotate: -lado * 16 }
                }
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : {
                        // Curvas distintas por eje = trayectoria curva. La Y
                        // llega antes que la X, así que el teléfono sube y
                        // recién después termina de cruzar.
                        x: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.75, ease: [0.34, 1.2, 0.64, 1] },
                        rotate: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.35 },
                      }
                }
                className="absolute inset-0 flex items-center justify-center"
                aria-label={activo.name}
              >
                <div
                  className="relative h-full w-fit rounded-[1.9rem] border-[6px] border-[#15161a] bg-[#15161a] shadow-[0_20px_44px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute left-1/2 top-[6px] z-10 h-[13px] w-[64px] -translate-x-1/2 rounded-b-xl bg-[#15161a]" />
                  <img
                    src={`/img/movil/${activo.movil}.webp`}
                    alt={`${activo.name} en celular`}
                    decoding="async"
                    className="block h-full w-auto rounded-[1.45rem]"
                  />
                </div>
              </motion.a>
            </AnimatePresence>
          </div>

          {/* Avance del recorrido */}
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {items.map((it, n) => (
              <span
                key={it.id}
                className="h-[3px] rounded-full transition-all duration-300"
                style={{
                  width: n === i ? 22 : 10,
                  background: n === i ? '#D7E2EA' : 'rgba(215,226,234,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
