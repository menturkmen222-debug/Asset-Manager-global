const TelegramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 8.5L8 10L7 13.5L10 11L13.5 5L4 8.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 12.5 5.5 16 6V9C16 9 13.5 9 12 7.5V13C12 15.2 10.2 17 8 17C5.8 17 4 15.2 4 13C4 10.8 5.8 9 8 9C8.4 9 8.7 9.06 9 9.15V12.2C8.7 12.08 8.37 12 8 12C7.45 12 7 12.45 7 13C7 13.55 7.45 14 8 14C8.55 14 9 13.55 9 13V2H12Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="13" cy="5" r="1" fill="currentColor"/>
  </svg>
);

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const socials = [
  { name: 'Telegram', Icon: TelegramIcon, href: 'https://t.me/zymer' },
  { name: 'TikTok', Icon: TikTokIcon, href: '#' },
  { name: 'Instagram', Icon: InstagramIcon, href: '#' },
];

const navLinks = ['Services', 'Pricing', 'Tech Stack', 'Contact'];

export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="outline-none w-fit"
            >
              <img src="/web-logo.png" alt="Zymer" className="h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              Building digital empires since 2024. Trusted by 50+ businesses globally.
            </p>
            <div className="flex gap-2">
              {socials.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-xl glass-light border-white/[0.07] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/25 hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-3 md:items-center">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 mb-2">Navigation</h4>
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(' ', '-'))}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 outline-none text-left md:text-center"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Col 3 — Contact */}
          <div className="flex flex-col gap-3 md:items-end">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 mb-2">Get in Touch</h4>
            <a
              href="https://t.me/zymer"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              @zymer on Telegram
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight />
              </span>
            </a>
            <a
              href="mailto:hello@zymer.com"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              hello@zymer.com
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight />
              </span>
            </a>
            <span className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-500 font-medium">Available · Response within 6h</span>
            </span>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground/40 tracking-wide text-center md:text-left">
            © {new Date().getFullYear()} Zymer. All rights reserved. Designed & built with obsession.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="text-[11px] text-muted-foreground/35 tracking-wide">Premium Web Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
