import { FadeIn, AnimatedText, ContactButton } from './Shared';
import { useT } from '../i18n';

const DECOR = [
  {
    src: '/img/decor/motor-yanmar.webp',
    alt: 'Motor diésel Yanmar',
    className:
      'absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[84px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: '/img/decor/logo-motorman.webp',
    alt: 'Logo Motorman',
    className:
      'absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[60px] sm:w-[120px] md:w-[150px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: '/img/decor/mascota-nebuna.webp',
    alt: 'Mascota de Nebuna',
    className:
      'absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[76px] sm:w-[150px] md:w-[190px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: '/img/decor/excavadora.webp',
    alt: 'Miniexcavadora Yanmar ViO17',
    className:
      'absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[92px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

export function AboutSection() {
  const t = useT();
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {DECOR.map((item) => (
        <FadeIn
          key={item.src}
          delay={item.delay}
          x={item.x}
          y={0}
          duration={0.9}
          className={`${item.className} pointer-events-none`}
        >
          <img src={item.src} alt={item.alt} className="w-full h-auto" loading="lazy" decoding="async" />
        </FadeIn>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-4xl relative z-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {t.about.heading}
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={t.about.text}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
          <ContactButton label={t.hero.contact} href="#contact" />
        </div>
      </div>
    </section>
  );
}
