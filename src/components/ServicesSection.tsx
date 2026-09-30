import { FadeIn } from './Shared';
import { useT } from '../i18n';

export function ServicesSection() {
  const t = useT();
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {t.services.heading}
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {t.services.items.map((service, i) => (
          <FadeIn key={service.name} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              }}
            >
              <span
                className="text-[#0C0C0C] font-black leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3 pt-2">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}

        {/* Ofertas con precio: llevan a las páginas de servicio estáticas */}
        <FadeIn delay={0.1} y={30}>
          <div className="mt-12 sm:mt-16">
            <p className="text-[#0C0C0C]/60 font-medium uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">
              {t.services.offersHeading}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {t.services.offers.map((offer) => (
                <a
                  key={offer.href}
                  href={offer.href}
                  className="flex flex-col gap-2 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#0C0C0C]/15 text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white transition-colors duration-300"
                >
                  <span className="font-medium uppercase leading-snug" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}>
                    {offer.name}
                  </span>
                  <span className="font-black leading-none" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                    {offer.price}
                  </span>
                  <span className="font-medium uppercase tracking-widest text-xs mt-2 opacity-70">
                    {t.services.offersCta}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
