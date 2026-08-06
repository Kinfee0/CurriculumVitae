# Portafolio — Bastián Sandoval

Landing page de portafolio personal, adaptada de una plantilla de "3D creator"
a un portafolio de desarrollador web full-stack, con proyectos reales de
Motorman (Yanmaq, Kubota, Portal interno, Motormaq) y personales (Gastos
Hogar, Nebuna).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 3.4
- Framer Motion (fade-ins, foto magnética, texto revelado por scroll, tarjetas apiladas)
- lucide-react + SVGs inline para íconos de marca

## Correr en local

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build de producción

```bash
npm run build    # genera dist/, listo para Cloudflare Pages / Vercel / Netlify
```

## Estructura de contenido

| Sección | Archivo | Notas |
|---|---|---|
| Hero | `src/components/HeroSection.tsx` | Foto en `src/assets/bastian.webp`, botón de contacto a mailto |
| Marquee | `src/components/MarqueeSection.tsx` | Capturas reales en `public/img/shots/*.webp` |
| Sobre mí | `src/components/AboutSection.tsx` | Texto animado + decoraciones en `public/img/decor/` |
| Servicios | `src/components/ServicesSection.tsx` | Lista `SERVICES` |
| Proyectos | `src/components/ProjectsSection.tsx` | Lista `PROJECTS` (tarjetas apiladas con scroll) |
| Freelance | `src/components/FreelanceSection.tsx` | Pilares, proceso, modalidades y datos prácticos |
| Contacto | `src/components/Footer.tsx` | Email, GitHub y LinkedIn |

Datos de contacto centralizados en `src/components/Shared.tsx`
(`EMAIL`, `GITHUB_URL`, `LINKEDIN_URL`).

## Imagen para redes (Open Graph)

`public/og.png` (1200×630) es lo que se ve al compartir el link en LinkedIn,
WhatsApp o X. Se genera rasterizando `scripts/og-source.html` con el Chrome o
Edge que ya tengas instalado:

```bash
npm run og
```

Edita `scripts/og-source.html` y vuelve a correr el comando para cambiarla.
Si el navegador está en otra ruta, exporta `CHROME_PATH`.

## Dominio

El sitio asume `https://bastiansandoval.cl`. Si publicas en otro dominio,
reemplaza esa cadena en:

- `index.html` (canonical, `og:url`, `og:image`, `twitter:image` y JSON-LD)
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/og-source.html` (el texto de la imagen) → luego `npm run og`

Las URLs de `og:image` deben ser absolutas: las redes sociales no resuelven
rutas relativas y el preview sale sin imagen.

## Notas

- Las capturas de los sitios se tomaron en julio 2026 (motorman.cl, yanmaq.cl,
  nebuna.cl, motormaq.cl, portal en Railway y apps locales). Para actualizarlas,
  reemplaza los archivos en `public/img/shots/` manteniendo los nombres.
- La tarjeta "Motorman · Kubota" muestra el rediseño (carpeta local
  `motoreskubota`), publicado en https://motoreskubota.cl.
