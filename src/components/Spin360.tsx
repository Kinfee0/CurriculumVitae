import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Visor 360 arrastrable, el mismo recurso que está en vivo en yanmaq.cl:
 * 20 fotos de la máquina que se van alternando.
 *
 * Los 20 frames se montan apilados y solo se cambia cuál es visible, en vez de
 * ir reemplazando el src de una sola <img>: así no parpadea la primera vuelta
 * mientras el navegador todavía está bajando las fotos.
 */
export function Spin360({
  base,
  total = 20,
  alt,
  hint,
  className,
}: {
  base: string;
  total?: number;
  alt: string;
  hint: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [arrastrando, setArrastrando] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tocado, setTocado] = useState(false);
  const reduce = useReducedMotion();

  // El arrastre se lleva en refs: si viviera en el estado, cada movimiento del
  // dedo dispararía un render extra y el giro se sentiría pegajoso.
  const inicioX = useRef(0);
  const inicioFrame = useRef(0);

  // Solo gira mientras está a la vista: fuera de pantalla el intervalo sería
  // trabajo perdido en el hilo principal.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Giro automático, hasta que el visitante toma el control arrastrando
  useEffect(() => {
    if (!visible || arrastrando || tocado || reduce) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % total), 110);
    return () => clearInterval(id);
  }, [visible, arrastrando, tocado, reduce, total]);

  const alFrame = (n: number) => setFrame(((n % total) + total) % total);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden select-none touch-pan-y ${className ?? ''}`}
      style={{
        // Blanco puro a propósito: las fotos traen fondo #fff, y cualquier
        // degradado detrás deja un rectángulo visible donde termina la foto.
        background: '#fff',
        cursor: arrastrando ? 'grabbing' : 'grab',
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        setArrastrando(true);
        setTocado(true);
        inicioX.current = e.clientX;
        inicioFrame.current = frame;
      }}
      onPointerMove={(e) => {
        if (!arrastrando) return;
        alFrame(inicioFrame.current - Math.round((e.clientX - inicioX.current) / 12));
      }}
      onPointerUp={() => setArrastrando(false)}
      onPointerLeave={() => setArrastrando(false)}
    >
      {Array.from({ length: total }, (_, i) => (
        <img
          key={i}
          src={`${base}/${String(i + 1).padStart(2, '0')}.webp`}
          alt={i === 0 ? alt : ''}
          aria-hidden={i !== 0}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ opacity: i === frame ? 1 : 0 }}
        />
      ))}
      <span
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/55 text-white text-[0.6rem] sm:text-[0.7rem] font-medium px-3 py-1 whitespace-nowrap transition-opacity duration-300"
        style={{ opacity: tocado ? 0 : 1 }}
      >
        {hint}
      </span>
    </div>
  );
}
