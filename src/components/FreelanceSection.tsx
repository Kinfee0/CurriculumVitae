import { Clock, FileSignature, MonitorSmartphone, KeyRound } from 'lucide-react';
import { FadeIn, ContactButton, AvailabilityBadge } from './Shared';
import { useT } from '../i18n';

const GLOWS = [
  {
    top: '-10%',
    left: '-12%',
    width: 520,
    height: 520,
    background: 'radial-gradient(circle, rgba(182,0,168,0.30), transparent 70%)',
  },
  {
    bottom: '-15%',
    right: '-10%',
    width: 560,
    height: 560,
    background: 'radial-gradient(circle, rgba(118,33,176,0.32), transparent 70%)',
  },
] as const;

const PILLAR_ICONS = [MonitorSmartphone, Clock, FileSignature, KeyRound];

export function FreelanceSection() {
  const t = useT();

  return (
    <section
      id="freelance"
      className="bg-[#0C0C0C] relative z-10 px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 overflow-hidden"
    >
      {GLOWS.map((glow, i) => (
        <div key={i} className="glow-blob" style={glow} />
      ))}

      <div className="max-w-5xl mx-auto relative">
        {/* Badge de disponibilidad con punto pulsante */}
        <FadeIn delay={0} y={30}>
          <div className="flex justify-center mb-6 sm:mb-8">
            <AvailabilityBadge label={t.freelance.badge} />
          </div>
        </FadeIn>

        <FadeIn delay={0.08} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 10vw, 130px)' }}
          >
            {t.freelance.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.16} y={30}>
          <p
            className="text-[#D7E2EA]/70 font-light leading-relaxed text-center max-w-2xl mx-auto mt-6 sm:mt-8"
            style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)' }}
          >
            {t.freelance.intro}
          </p>
        </FadeIn>

        {/* Pilares: las cuatro objeciones típicas al contratar remoto */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-12 sm:mt-16">
          {t.freelance.pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <FadeIn key={pillar.title} delay={0.1 + i * 0.08} y={30}>
                <div className="glass-card rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 h-full flex flex-col gap-3">
                  <Icon
                    className="w-7 h-7 sm:w-8 sm:h-8 text-[#D7E2EA]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-sm sm:text-base">
                    {pillar.title}
                  </h3>
                  <p className="text-[#D7E2EA]/65 font-light leading-relaxed text-sm sm:text-[0.95rem]">
                    {pillar.text}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Proceso: cuatro pasos numerados */}
        <FadeIn delay={0.1} y={30}>
          <h3 className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-center text-xs sm:text-sm mt-16 sm:mt-24 mb-8 sm:mb-10">
            {t.freelance.stepsHeading}
          </h3>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.freelance.steps.map((step, i) => (
            <FadeIn key={step.title} delay={0.1 + i * 0.08} y={30}>
              <div className="glass-tile rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 h-full flex flex-col gap-2">
                <span
                  className="hero-heading font-black leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-sm">
                  {step.title}
                </h4>
                <p className="text-[#D7E2EA]/60 font-light leading-snug text-[0.8rem] sm:text-[0.85rem]">
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Modalidades y datos prácticos */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 mt-16 sm:mt-20">
          <FadeIn delay={0.1} y={30}>
            <div className="glass-card rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 h-full">
              <h3 className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-xs sm:text-sm mb-5">
                {t.freelance.modesHeading}
              </h3>
              <ul className="flex flex-col gap-4">
                {t.freelance.modes.map((mode) => (
                  <li key={mode.title} className="flex flex-col gap-0.5">
                    <span className="text-[#D7E2EA] font-medium uppercase tracking-wide text-sm">
                      {mode.title}
                    </span>
                    <span className="text-[#D7E2EA]/60 font-light text-sm">{mode.text}</span>
                  </li>
                ))}
              </ul>
              {/* Cuando definas un piso de precio, va aquí: "Proyectos desde $X" */}
            </div>
          </FadeIn>

          <FadeIn delay={0.18} y={30}>
            <div className="glass-card rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 h-full">
              <h3 className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-xs sm:text-sm mb-5">
                {t.freelance.factsHeading}
              </h3>
              <ul className="flex flex-col gap-3">
                {t.freelance.facts.map((fact) => (
                  <li
                    key={fact}
                    className="text-[#D7E2EA]/70 font-light text-sm leading-relaxed flex gap-3"
                  >
                    <span className="text-[#B600A8] mt-[0.15rem]" aria-hidden>
                      —
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} y={30}>
          <div className="flex justify-center mt-12 sm:mt-16">
            <ContactButton label={t.freelance.cta} href="#contact" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
