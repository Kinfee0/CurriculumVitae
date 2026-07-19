import { FadeIn } from './Shared';
import { useT } from '../i18n';

const LOGOS = [
  { src: '/img/logos/motorman.webp', alt: 'Motorman' },
  { src: '/img/logos/kubota.webp', alt: 'Kubota' },
  { src: '/img/logos/yanmaq.webp', alt: 'Yanmaq' },
];

const TEXT_BRANDS = ['Nebuna', 'Motormaq'];

export function BrandsSection() {
  const t = useT();
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <FadeIn delay={0} y={30}>
        <p className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-center text-xs sm:text-sm mb-8 sm:mb-10">
          {t.brands.heading}
        </p>
      </FadeIn>
      <FadeIn delay={0.15} y={20}>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16 max-w-5xl mx-auto">
          {LOGOS.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="h-8 sm:h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          ))}
          {TEXT_BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-white/70 hover:text-white transition-colors duration-300 font-black uppercase tracking-widest text-lg sm:text-2xl leading-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
