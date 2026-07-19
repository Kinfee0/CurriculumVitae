import { useState, type FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { FadeIn, EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP } from './Shared';
import { useT } from '../i18n';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const SOCIAL = [
  { href: GITHUB_URL, icon: GithubIcon, label: 'GitHub' },
  { href: LINKEDIN_URL, icon: LinkedinIcon, label: 'LinkedIn' },
  { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
];

const inputClasses =
  'w-full rounded-2xl bg-[#D7E2EA]/5 border border-white/15 px-5 py-3.5 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8]/70 transition-colors duration-200';

export function Footer() {
  const t = useT();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const buildMessage = () =>
    `Hola Bastián, soy ${nombre} (${correo}). ${mensaje}`;

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage())}`,
      '_blank',
      'noopener'
    );
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Proyecto web — ${nombre}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  };

  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-16 sm:pt-24 pb-10 flex flex-col items-center gap-10 sm:gap-14"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 110px)' }}
        >
          {t.contact.heading}
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={30} className="w-full max-w-xl">
        <form
          className="glass-card rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col gap-4"
          onSubmit={WHATSAPP ? sendWhatsApp : sendEmail}
        >
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={t.contact.name}
            className={inputClasses}
            autoComplete="name"
          />
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder={t.contact.email}
            className={inputClasses}
            autoComplete="email"
          />
          <textarea
            required
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder={t.contact.message}
            rows={4}
            className={`${inputClasses} resize-none`}
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            {WHATSAPP ? (
              <button
                type="submit"
                className="flex-1 rounded-full px-6 py-3.5 font-medium uppercase tracking-widest text-sm text-white transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(123deg, #075E54, #25D366)' }}
              >
                {t.contact.sendWhatsApp}
              </button>
            ) : null}
            <button
              type={WHATSAPP ? 'button' : 'submit'}
              onClick={WHATSAPP ? sendEmail : undefined}
              className="flex-1 rounded-full px-6 py-3.5 font-medium uppercase tracking-widest text-sm text-white transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
              }}
            >
              {t.contact.sendEmail}
            </button>
          </div>
        </form>
      </FadeIn>

      <FadeIn delay={0.25} y={20} className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-6">
          {SOCIAL.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#D7E2EA] hover:opacity-60 transition-opacity duration-200"
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          ))}
        </div>
      </FadeIn>

      <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm tracking-wide text-center">
        {t.contact.footer}
      </p>
    </footer>
  );
}
