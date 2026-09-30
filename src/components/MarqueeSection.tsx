import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './Shared';

const ROW_1 = [
  'yanmaq',
  'kubota',
  'gastos-dashboard',
  'motormaq',
  'nebuna',
  'portal-login',
  'yanmaq-3',
  'kubota-comparador',
];

const ROW_2 = [
  'nebuna-producto',
  'gastos-nosotros',
  'kubota-2',
  'yanmaq-2',
  'motorman-live',
  'gastos-presupuestos',
  'nebuna-2',
  'motormaq-2',
];

const GAP = 12;

function Row({
  images,
  offset,
  direction,
  tileW,
}: {
  images: string[];
  offset: number;
  direction: 1 | -1;
  tileW: number;
}) {
  const tileH = Math.round((tileW * 270) / 420);
  // Una pasada completa de tiles, para partir el carrusel fuera de pantalla
  const setWidth = images.length * (tileW + GAP);
  const x = direction * (offset - 200) - setWidth;
  const doubled = [...images, ...images];

  return (
    <div
      className="flex gap-3"
      style={{
        width: 'max-content',
        transform: `translateX(${x}px)`,
        willChange: 'transform',
      }}
    >
      {doubled.map((name, i) => (
        <img
          key={`${name}-${i}`}
          src={`/img/shots/${name}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          width={tileW}
          height={tileH}
          className="rounded-2xl object-cover object-top"
          style={{ width: tileW, height: tileH }}
        />
      ))}
    </div>
  );
}

// `rows` permite que las páginas de servicio muestren solo sus proyectos.
// Cada fila necesita ~6 capturas para cubrir una pantalla ancha mientras se
// desplaza (se duplica una vez).
export function MarqueeSection({
  rows = [ROW_1, ROW_2],
  className = 'pt-24 sm:pt-32 md:pt-40 pb-10',
}: {
  rows?: [string[], string[]];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [tileW, setTileW] = useState(420);
  const reduce = useReducedMotion();

  // Tiles más chicos en pantallas angostas (un tile de 420px es más ancho
  // que un teléfono completo)
  useEffect(() => {
    const update = () => setTileW(window.innerWidth < 640 ? 300 : 420);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      setOffset(Math.max(0, (window.scrollY - top + window.innerHeight) * 0.3));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className={`bg-[#0C0C0C] overflow-hidden ${className}`}
    >
      <div className="flex flex-col gap-3">
        <Row images={rows[0]} offset={offset} direction={1} tileW={tileW} />
        <Row images={rows[1]} offset={offset} direction={-1} tileW={tileW} />
      </div>
    </section>
  );
}
