import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

const ArrowUpRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, mobileMenuOpen ? 300 : 0);
  };

  const links = [
    { name: 'Services', href: 'services' },
    { name: 'Pricing', href: 'pricing' },
    { name: 'Tech Stack', href: 'tech-stack' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 backdrop-blur-2xl bg-background/75 border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_32px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative z-50 outline-none group"
          >
            <img src="/web-logo.png" alt="Zymer" className="h-8 transition-all duration-300 group-hover:opacity-75" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              {links.map((link, i) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 outline-none group"
                >
                  {link.name}
                  <span className="absolute inset-x-4 bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-4" />

            {/* CTA Button */}
            <button
              onClick={() => {
                trackEvent('cta_click', { button: 'nav_quote' });
                scrollTo('contact');
              }}
              className="relative group overflow-hidden flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white outline-none"
            >
              <span className="absolute inset-0 gradient-bg" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl gradient-bg scale-150" />
              <span className="relative z-10 flex items-center gap-1.5">
                Get a Free Quote
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight />
                </span>
              </span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 text-foreground outline-none w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  <CloseIcon />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  <MenuIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden"
          >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-[#050508]/97 backdrop-blur-3xl" />

            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                backgroundSize: '64px 64px'
              }}
            />

            {/* Ambient glow */}
            <div className="absolute top-[-120px] right-[-100px] w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-80px] left-[-60px] w-[350px] h-[350px] bg-[#00d4ff]/[0.05] rounded-full blur-[100px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-8 pt-28 pb-12">

              {/* Nav Links */}
              <nav className="flex flex-col flex-1 justify-center gap-0">
                {links.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.06 + 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center justify-between py-5 border-b border-white/[0.06] outline-none last:border-b-0"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-primary/40 tabular-nums w-5 leading-none pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[2.2rem] font-display font-bold text-foreground/80 group-hover:text-foreground transition-colors duration-200 leading-tight">
                        {link.name}
                      </span>
                    </div>
                    <span className="text-primary/30 group-hover:text-primary/70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={18} />
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: links.length * 0.06 + 0.18, duration: 0.3 }}
                className="pt-8 flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    trackEvent('cta_click', { button: 'nav_quote_mobile' });
                    scrollTo('contact');
                  }}
                  className="w-full gradient-bg text-white py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 glow-violet outline-none"
                >
                  Start Your Project
                  <ArrowUpRight size={15} />
                </button>
                <p className="text-center text-[11px] text-muted-foreground/50 tracking-wide">
                  Response within 6 hours · No commitment required
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
