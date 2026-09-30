import { Check, Plus } from 'lucide-react';
import {
  AvailabilityBadge,
  ContactButton,
  FadeIn,
  HeroIn,
  Magnet,
  WHATSAPP,
} from '../components/Shared';
import { MarqueeSection } from '../components/MarqueeSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { Footer } from '../components/Footer';
import { SERVICES, type Plan, type Service, type ServiceId } from '../servicios';

const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;


const GLOWS = [
  { top: '-10%', left: '-12%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(182,0,168,0.30), transparent 70%)' },
  { bottom: '-15%', right: '-10%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(118,33,176,0.32), transparent 70%)' },
] as const;

/* --------------------------------- Teléfono -------------------------------- */

/** Mismo aparato que el recorrido de la pestaña Móvil (MobileShowcase). */
function Phone({ shot, alt, priority }: { shot: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative h-full w-fit rounded-[1.9rem] border-[6px] border-[#15161a] bg-[#15161a] shadow-[0_20px_44px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 top-[6px] z-10 h-[13px] w-[64px] -translate-x-1/2 rounded-b-xl bg-[#15161a]" />
      <img
        src={`/img/movil/${shot}.webp`}
        alt={alt}
        width={420}
        height={909}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className="block h-full w-auto rounded-[1.45rem]"
      />
    </div>
  );
}

/* ----------------------------------- Hero ---------------------------------- */

function ServiceHero({ s }: { s: Service }) {
  const links = [
    { label: 'Portafolio', href: '/' },
    { label: 'Incluye', href: '#incluye' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Planes', href: '#planes' },
    { label: 'Preguntas', href: '#preguntas' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <section className="h-screen flex flex-col relative" style={{ overflowX: 'clip', height: '100svh' }}>
      <HeroIn delay={0} y={-20} as="nav">
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-x-5 gap-y-1.5 sm:gap-3 px-6 md:px-10 pt-6 md:pt-8 relative z-20">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider whitespace-nowrap text-xs sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={s.other.href}
            className="glass-tile rounded-full text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[#D7E2EA]/15 transition-colors duration-200 whitespace-nowrap"
          >
            {s.other.label} →
          </a>
        </div>
      </HeroIn>

      <div className="overflow-visible sm:overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
        <HeroIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[12vw] sm:text-[11.5vw] lg:text-[11vw]">
            {s.heading}
            <span className="sr-only">{s.headingSr}</span>
          </h1>
        </HeroIn>
      </div>

      {/* Dos teléfonos abiertos en abanico, en el lugar del retrato de la home.
          El posicionamiento vive en un div aparte porque la animación de
          entrada sobreescribe el transform de las clases -translate-*. */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-10 md:bottom-14 z-10">
        <HeroIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div
              className="relative h-[34vh] sm:h-[min(46vh,470px)]"
              style={{
                aspectRatio: '0.8',
                filter:
                  'drop-shadow(0 30px 60px rgba(118, 33, 176, 0.35)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5))',
              }}
            >
              <div className="absolute left-0 top-[6%] h-[90%] -rotate-[8deg] origin-bottom-right">
                <Phone shot={s.phones[0]} alt={`${s.heading}: ejemplo en celular`} />
              </div>
              <div className="absolute right-0 top-0 h-[90%] rotate-[7deg] origin-bottom-left z-10">
                <Phone shot={s.phones[1]} alt={`${s.heading}: otro ejemplo en celular`} priority />
              </div>
            </div>
          </Magnet>
        </HeroIn>
      </div>

      <div className="flex justify-between items-end gap-4 pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto relative z-20">
        <HeroIn delay={0.35} y={20} className="flex flex-col items-start gap-3">
          <a href="#planes" className="hover:opacity-80 transition-opacity duration-200">
            <AvailabilityBadge label={s.badge} />
          </a>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[240px] md:max-w-[300px]"
            style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1.3rem)' }}
          >
            {s.tagline}
          </p>
        </HeroIn>
        {/* En celular el texto largo no cabe junto al tagline: ahí va "Cotizar" */}
        <HeroIn delay={0.5} y={20} className="shrink-0">
          <span className="sm:hidden">
            <ContactButton label={s.ctaShort} href={waLink(s.whatsappText)} />
          </span>
          <span className="hidden sm:inline">
            <ContactButton label={s.cta} href={waLink(s.whatsappText)} />
          </span>
        </HeroIn>
      </div>
    </section>
  );
}

/* ---------------------------------- Planes --------------------------------- */

function PlanCard({ s, plan }: { s: Service; plan: Plan }) {
  const texto = `Hola Bastián, me interesa el plan ${plan.name} de ${s.noun} (${plan.price})`;
  return (
    <div
      className={`glass-card relative rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 h-full flex flex-col ${
        plan.featured ? 'lg:-translate-y-4 ring-1 ring-[#B600A8]/60 shadow-[0_0_60px_rgba(182,0,168,0.25)]' : ''
      }`}
    >
      {plan.featured && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-white whitespace-nowrap"
          style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}
        >
          Recomendado
        </span>
      )}
      <h3 className="text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base">{plan.name}</h3>
      <p className="project-number font-black leading-none tracking-tight mt-3" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
        {plan.price}
      </p>
      <p className="text-[#D7E2EA]/60 font-light text-sm leading-snug mt-3 lg:min-h-[2.5rem]">{plan.summary}</p>
      <ul className="flex flex-col gap-3 mt-6 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[#D7E2EA]/80 font-light text-sm leading-snug">
            <Check className="w-4 h-4 shrink-0 mt-[0.15rem] text-[#3DDC84]" strokeWidth={2.2} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col items-start gap-4">
        <span className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-[0.65rem] sm:text-xs">{plan.time}</span>
        {plan.featured ? (
          <ContactButton label={`Quiero el ${plan.name}`} href={waLink(texto)} />
        ) : (
          <a
            href={waLink(texto)}
            className="glass-tile inline-block rounded-full text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm whitespace-nowrap hover:bg-[#D7E2EA]/15 transition-colors duration-200"
          >
            Quiero el {plan.name}
          </a>
        )}
      </div>
    </div>
  );
}

function PlansSection({ s }: { s: Service }) {
  return (
    <section id="planes" className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-28 md:py-32 overflow-hidden">
      {GLOWS.map((glow, i) => (
        <div key={i} className="glow-blob" style={glow} aria-hidden />
      ))}
      <div className="max-w-6xl mx-auto relative">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Planes
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={30}>
          <p className="text-[#D7E2EA]/70 font-light leading-relaxed text-center max-w-2xl mx-auto mt-6 sm:mt-8" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)' }}>
            {s.plansIntro}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-5 mt-14 sm:mt-20 items-stretch">
          {s.plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={0.12 + i * 0.1} y={40} className="h-full">
              <PlanCard s={s} plan={plan} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} y={20}>
          <div className="flex flex-wrap justify-center gap-3 mt-12 sm:mt-16">
            {s.plansCommon.map((item) => (
              <span key={item} className="glass-tile rounded-full px-4 py-2 flex items-center gap-2 text-[#D7E2EA] font-medium uppercase tracking-wide text-[0.65rem] sm:text-xs">
                <Check className="w-3.5 h-3.5 text-[#3DDC84]" strokeWidth={2.4} aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------- Qué incluye ------------------------------- */

/** Mismo formato que la sección Servicios de la home: blanca, con números gigantes. */
function IncludesSection({ s }: { s: Service }) {
  return (
    <section
      id="incluye"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {s.includesHeading}
        </h2>
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {s.includes.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              }}
            >
              <span className="text-[#0C0C0C] font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3 pt-2">
                <h3 className="text-[#0C0C0C] font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {item.title}
                </h3>
                <p className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                  {item.text}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Cómo trabajamos ----------------------------- */

/** Mismo formato que los pasos de la sección Freelance de la home. */
function StepsSection({ s }: { s: Service }) {
  return (
    <section className="bg-[#0C0C0C] relative z-10 px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 overflow-hidden">
      {GLOWS.map((glow, i) => (
        <div key={i} className="glow-blob" style={glow} aria-hidden />
      ))}
      <div className="max-w-5xl mx-auto relative">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16" style={{ fontSize: 'clamp(2.4rem, 9vw, 120px)' }}>
            Cómo trabajamos
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {s.steps.map((step, i) => (
            <FadeIn key={step.title} delay={0.1 + i * 0.08} y={30}>
              <div className="glass-tile rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 h-full flex flex-col gap-2">
                <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-sm">{step.title}</h3>
                <p className="text-[#D7E2EA]/60 font-light leading-snug text-[0.8rem] sm:text-[0.85rem]">{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.15} y={30}>
          <div className="flex justify-center mt-12 sm:mt-16">
            <ContactButton label={s.cta} href={waLink(s.whatsappText)} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------------------------- Preguntas frecuentes --------------------------- */

function FaqSection({ s }: { s: Service }) {
  return (
    <section id="preguntas" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-24">
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16" style={{ fontSize: 'clamp(2.4rem, 9vw, 120px)' }}>
          Preguntas
        </h2>
      </FadeIn>
      <div className="max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4">
        {s.faqs.map((faq, i) => (
          <FadeIn key={faq.q} delay={i * 0.06} y={24}>
            <details className="group glass-card rounded-[22px] sm:rounded-[28px] px-6 sm:px-8 py-5 sm:py-6">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-[#D7E2EA] font-medium uppercase tracking-wide text-sm sm:text-base">{faq.q}</span>
                <Plus className="w-5 h-5 shrink-0 text-[#D7E2EA]/70 transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="text-[#D7E2EA]/65 font-light leading-relaxed text-sm sm:text-[0.95rem] mt-3">{faq.a}</p>
            </details>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.1} y={20}>
        <p className="text-center text-[#D7E2EA]/60 font-light text-sm sm:text-base mt-12 sm:mt-16">
          ¿Buscas otra cosa? Mira{' '}
          <a href={s.other.href} className="text-[#D7E2EA] underline underline-offset-4 hover:opacity-70">
            {s.other.label.toLowerCase()}
          </a>{' '}
          o{' '}
          <a href="/" className="text-[#D7E2EA] underline underline-offset-4 hover:opacity-70">
            todo mi portafolio
          </a>
          .
        </p>
      </FadeIn>
    </section>
  );
}

/* ---------------------------------- Página --------------------------------- */

export function ServicePage({ id }: { id: ServiceId }) {
  const s = SERVICES[id];
  return (
    <div className="min-h-screen bg-[#0C0C0C] font-kanit" style={{ overflowX: 'clip' }}>
      <ServiceHero s={s} />
      <main>
        <MarqueeSection rows={s.marquee} className="pt-10 sm:pt-16 pb-6" />
        <PlansSection s={s} />
        <IncludesSection s={s} />
        <ProjectsSection ids={s.projects} heading={s.projectsHeading} />
        <StepsSection s={s} />
        <FaqSection s={s} />
      </main>
      <Footer />
    </div>
  );
}
