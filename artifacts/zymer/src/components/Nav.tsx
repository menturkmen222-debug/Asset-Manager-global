import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { name: 'Services', href: 'services' },
    { name: 'Pricing', href: 'pricing' },
    { name: 'Tech Stack', href: 'tech-stack' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="relative z-50 outline-none">
            <img src="/web-logo.png" alt="Zymer" className="h-9" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                trackEvent('cta_click', { button: 'nav_quote' });
                scrollTo('contact');
              }}
              className="gradient-bg text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform glow-violet outline-none"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-50 text-foreground outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-display font-semibold text-foreground outline-none"
              >
                {link.name}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.1 }}
              onClick={() => {
                trackEvent('cta_click', { button: 'nav_quote_mobile' });
                scrollTo('contact');
              }}
              className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg mt-4 glow-violet outline-none"
            >
              Get a Free Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}