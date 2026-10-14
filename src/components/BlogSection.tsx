import { FadeIn } from './Shared';
import { useT } from '../i18n';

export function BlogSection() {
  const t = useT();
  return (
    <section id="blog" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-24">
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(2rem, 7vw, 90px)' }}
        >
          {t.blog.heading}
        </h2>
      </FadeIn>
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {t.blog.items.map((item, i) => (
          <FadeIn key={item.href} delay={i * 0.1} y={30}>
            <a
              href={item.href}
              className="glass-tile rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col gap-3 h-full hover:bg-[#D7E2EA]/10 transition-colors duration-200"
            >
              <h3 className="text-[#D7E2EA] font-medium leading-snug text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-[#D7E2EA]/60 font-light leading-relaxed text-sm">
                {item.summary}
              </p>
              <span className="text-[#D7E2EA]/80 font-medium uppercase tracking-widest text-xs mt-auto pt-2">
                {t.blog.readMore} →
              </span>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
