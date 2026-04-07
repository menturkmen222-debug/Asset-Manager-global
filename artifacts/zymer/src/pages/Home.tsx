import { useEffect } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FloatingWidget from '@/components/FloatingWidget';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import TechStack from '@/components/TechStack';
import WhyZymer from '@/components/WhyZymer';
import Contact from '@/components/Contact';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import CustomCursor from '@/components/CustomCursor';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Home() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('page_view', { page: 'home' });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('section_view', { section: entry.target.id });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-background text-foreground min-h-[100dvh] overflow-x-hidden relative">
      <CustomCursor />
      <ParticleField />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <FloatingWidget />
        <Services />
        <Pricing />
        <Testimonials />
        <TechStack />
        <WhyZymer />
        <Contact />
        <AIAssistant />
        <Footer />
      </div>
    </main>
  );
}
