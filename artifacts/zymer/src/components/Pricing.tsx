import React from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
    <circle cx="7.5" cy="7.5" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
    <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="5.5" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
    <circle cx="9" cy="4.5" r="1.5" fill="currentColor" opacity="0.6"/>
    <circle cx="12.5" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
    <path d="M4.5 12C4.5 12 6 14 9 14C10.5 14 11.5 13.5 11.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const styleIcons: Record<string, () => React.ReactElement> = {
  'Minimalist Clean': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.8"/><rect x="2" y="7.5" width="8" height="1.5" rx="0.75" fill="currentColor" opacity="0.5"/><rect x="2" y="11" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/></svg>
  ),
  'Corporate Professional': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7"/><path d="M5 14H11M8 11V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/></svg>
  ),
  'Modern Flat': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="8" width="5" height="6" rx="1" fill="currentColor" opacity="0.4"/><rect x="7" y="5" width="5" height="9" rx="1" fill="currentColor" opacity="0.6"/><rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.8"/></svg>
  ),
  'Glassmorphism Dark Premium': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/><circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.3"/><path d="M5 5L11 11" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>
  ),
  'Bold Editorial': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="3" rx="0.5" fill="currentColor" opacity="0.9"/><rect x="2" y="9" width="7" height="2" rx="0.5" fill="currentColor" opacity="0.5"/><rect x="2" y="13" width="10" height="1" rx="0.5" fill="currentColor" opacity="0.3"/></svg>
  ),
  'Luxury High-End': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L9.5 6.5H14L10.5 9.5L11.8 14L8 11.5L4.2 14L5.5 9.5L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8"/></svg>
  ),
  '3D Interactive Experimental': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="currentColor" strokeWidth="1.2" opacity="0.7"/><path d="M8 2V14M2 5.5L14 10.5M14 5.5L2 10.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/></svg>
  ),
};

export default function Pricing() {
  const { trackEvent } = useAnalytics();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const tiers = [
    {
      name: "Starter",
      price: "$699",
      badge: "Best for New Businesses",
      tagline: "Your first serious step into the digital world.",
      features: ["Up to 5 pages", "Mobile-responsive", "Basic SEO", "Contact form", "1 revision round", "Deployment setup", "30-day support", "Analytics"],
      delivery: "7–10 business days",
      featured: false,
    },
    {
      name: "Growth",
      price: "$1,199",
      badge: "Most Popular",
      tagline: "For businesses serious about dominating their niche.",
      features: ["Up to 12 pages", "Advanced animations", "Full mobile+tablet", "Advanced SEO", "AI Chatbot integration", "Multi-language support", "Custom forms", "Telegram/WhatsApp alerts", "Social tracking", "3 revision rounds", "60-day support", "Analytics dashboard"],
      delivery: "10–14 business days",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      badge: "For Ambitious Brands",
      tagline: "Multi-server, full-scale digital ecosystems. No limits.",
      features: ["Unlimited pages", "Custom 3D scenes", "Full-stack apps", "E-commerce + payments", "Multi-region deployment", "Dedicated PM", "Weekly calls", "24/7 priority support", "Custom CMS", "Unlimited revisions", "6-month support", "Full docs"],
      delivery: "Custom timeline",
      featured: false,
    }
  ];

  const designStyles = [
    { name: "Minimalist Clean", desc: "Clean lines, white space, Swiss typography" },
    { name: "Corporate Professional", desc: "Trusted, structured, authoritative" },
    { name: "Modern Flat", desc: "Contemporary and approachable. Bright colors, geometric shapes" },
    { name: "Glassmorphism Dark Premium", desc: "Frosted glass, neon glows, deep space backgrounds" },
    { name: "Bold Editorial", desc: "Oversized type, raw energy, magazine-grade layout" },
    { name: "Luxury High-End", desc: "Gold accents, serif fonts, silk-smooth animations" },
    { name: "3D Interactive Experimental", desc: "Three.js, WebGL, particle systems" },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative z-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 relative">

        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4 md:mb-5 mx-auto"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="3.5" height="3.5" rx="0.5"/><rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5"/><rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5"/><rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5"/></svg>
            Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 md:mb-4"
          >
            Investment, Not Cost
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground text-balance px-2"
          >
            Every package is priced to deliver returns that dwarf the investment.
          </motion.p>
        </div>

        {/* Mobile: horizontal scroll; Desktop: grid */}
        <div className="mb-10 md:mb-14">
          {/* Mobile scroll container */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5" style={{ scrollbarWidth: 'none' }}>
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`relative glass rounded-3xl flex flex-col flex-shrink-0 snap-center transition-all duration-300 ${
                  tier.featured
                    ? 'overflow-visible border-primary/35 shadow-[0_0_50px_rgba(108,99,255,0.2)]'
                    : 'overflow-hidden'
                }`}
                style={{ width: 'calc(85vw)', maxWidth: '320px' }}
              >
                {tier.featured && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-3xl" />
                )}
                {tier.featured && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                    <div className="gradient-bg text-white text-[9px] font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full shadow-lg shadow-primary/40">
                      ✦ Most Popular
                    </div>
                  </div>
                )}
                <div className={`p-6 flex flex-col h-full ${tier.featured ? 'pt-11' : 'pt-6'}`}>
                  <div className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-1.5 ${tier.featured ? 'text-primary' : 'text-muted-foreground/70'}`}>
                    {tier.badge}
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{tier.tagline}</p>

                  <div className="mb-5 pb-5 border-b border-border/30">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[2.2rem] font-bold text-foreground font-display leading-none">{tier.price}</span>
                      {tier.price !== 'Custom' && (
                        <span className="text-xs text-muted-foreground">starting</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                      {tier.delivery}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-foreground/85">
                        <span className={tier.featured ? 'text-primary' : 'text-muted-foreground'}>
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      trackEvent('cta_click', { button: `pricing_${tier.name.toLowerCase()}` });
                      scrollTo('contact');
                    }}
                    className={`group w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 outline-none flex items-center justify-center gap-2 active:scale-[0.98] ${
                      tier.featured
                        ? 'gradient-bg text-white hover:shadow-[0_0_24px_rgba(108,99,255,0.5)]'
                        : 'bg-white/[0.04] text-foreground hover:bg-white/[0.08] border border-white/[0.08]'
                    }`}
                  >
                    {tier.name === 'Enterprise' ? "Let's Talk" : "Select Package"}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-center pt-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative glass rounded-3xl flex flex-col h-full transition-all duration-300 ${
                  tier.featured
                    ? 'overflow-visible border-primary/35 shadow-[0_0_60px_rgba(108,99,255,0.22)] lg:scale-[1.04] z-10'
                    : 'overflow-hidden hover:border-primary/15 hover:shadow-[0_4px_30px_rgba(108,99,255,0.1)]'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="gradient-bg text-white text-[10px] font-bold tracking-[0.14em] uppercase px-5 py-1.5 rounded-full shadow-lg shadow-primary/40">
                      ✦ Most Popular
                    </div>
                  </div>
                )}
                <div className="p-8 flex flex-col h-full">
                  <div className={`text-[11px] font-bold tracking-[0.1em] uppercase mb-2 ${tier.featured ? 'text-primary' : 'text-muted-foreground/70'}`}>
                    {tier.badge}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 min-h-[38px] leading-relaxed">{tier.tagline}</p>

                  <div className="mb-7 pb-7 border-b border-border/30">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[2.6rem] font-bold text-foreground font-display leading-none">{tier.price}</span>
                      {tier.price !== 'Custom' && (
                        <span className="text-sm text-muted-foreground">starting</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                      {tier.delivery}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
                        <span className={tier.featured ? 'text-primary' : 'text-muted-foreground'}>
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      trackEvent('cta_click', { button: `pricing_${tier.name.toLowerCase()}` });
                      scrollTo('contact');
                    }}
                    className={`group w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 outline-none flex items-center justify-center gap-2 ${
                      tier.featured
                        ? 'gradient-bg text-white hover:shadow-[0_0_24px_rgba(108,99,255,0.5)] hover:scale-[1.02]'
                        : 'bg-white/[0.04] text-foreground hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.14]'
                    }`}
                  >
                    {tier.name === 'Enterprise' ? "Let's Talk" : "Select Package"}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          <div className="flex md:hidden justify-center gap-1.5 mt-4">
            {tiers.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === 1 ? 'bg-primary' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>

        {/* Design Styles accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass rounded-2xl overflow-hidden"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="styles" className="border-none">
              <AccordionTrigger className="hover:no-underline text-sm md:text-base font-display font-semibold px-5 md:px-7 py-4 md:py-5 hover:bg-white/[0.02] transition-colors [&[data-state=open]]:pb-4">
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <PaletteIcon />
                  </span>
                  Choose Your Visual Style
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 md:pb-6 px-5 md:px-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 pt-2">
                  {designStyles.map((style, i) => {
                    const StyleIcon = styleIcons[style.name];
                    return (
                      <div key={i} className="group flex items-start gap-3 bg-white/[0.03] hover:bg-white/[0.06] p-3.5 md:p-4 rounded-xl border border-white/[0.06] hover:border-primary/20 transition-all duration-200 cursor-default">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          {StyleIcon ? <StyleIcon /> : null}
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-200">{style.name}</h4>
                          <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">{style.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
}
