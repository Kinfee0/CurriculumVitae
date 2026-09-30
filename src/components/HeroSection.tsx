import { HeroIn, Magnet, ContactButton, AvailabilityBadge } from './Shared';
import { useLang, useT } from '../i18n';
import bastianPhoto from '../assets/bastian-cutout.webp';

export function HeroSection() {
  const t = useT();
  const { lang, setLang } = useLang();

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.freelance, href: '#freelance' },
    { label: t.nav.notes, href: '/blog/' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip', height: '100svh' }}
    >
      {/* Navbar */}
      <HeroIn delay={0} y={-20} as="nav">
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-x-5 gap-y-1.5 sm:gap-3 px-6 md:px-10 pt-6 md:pt-8 relative z-20">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider whitespace-nowrap text-xs sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="glass-tile rounded-full text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[#D7E2EA]/15 transition-colors duration-200"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </HeroIn>

      {/* Hero heading: en escritorio el overflow-hidden hace que suba "desde una
          ranura"; en móvil va visible porque el título (37px) quedaba entero
          dentro del desplazamiento inicial de 40px. */}
      <div className="overflow-visible sm:overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
        <HeroIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[9.5vw] sm:text-[9.6vw] md:text-[9.7vw] lg:text-[9.8vw]">
            {t.hero.heading}
            <span className="sr-only">{t.hero.headingSr}</span>
          </h1>
        </HeroIn>
      </div>

      {/* Retrato: el posicionamiento vive en un div aparte porque la animación
          de entrada sobreescribe el transform de las clases -translate-* */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-10 md:bottom-14 z-10 w-[190px] sm:w-[240px] md:w-[290px] lg:w-[330px]">
        <HeroIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={bastianPhoto}
              alt="Bastián Sandoval"
              width={611}
              height={897}
              className="w-full h-auto max-h-[52vh] object-contain"
              fetchPriority="high"
              decoding="async"
              style={{
                filter:
                  'drop-shadow(0 30px 60px rgba(118, 33, 176, 0.35)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5))',
              }}
            />
          </Magnet>
        </HeroIn>
      </div>

      {/* Barra inferior */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto relative z-20">
        <HeroIn delay={0.35} y={20} className="flex flex-col items-start gap-3">
          <a href="#freelance" className="hover:opacity-80 transition-opacity duration-200">
            <AvailabilityBadge label={t.hero.available} />
          </a>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {t.hero.tagline}
          </p>
        </HeroIn>
        <HeroIn delay={0.5} y={20}>
          <ContactButton label={t.hero.contact} href="#contact" />
        </HeroIn>
      </div>
    </section>
  );
}
