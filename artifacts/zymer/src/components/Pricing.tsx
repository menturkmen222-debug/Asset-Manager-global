import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Pricing() {
  const { trackEvent } = useAnalytics();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tiers = [
    {
      name: "Starter",
      price: "$699",
      badge: "Best for New Businesses",
      tagline: "Your first serious step into the digital world.",
      features: [
        "Up to 5 pages",
        "Mobile-responsive",
        "Basic SEO",
        "Contact form",
        "1 revision round",
        "Deployment setup",
        "30-day support",
        "Analytics"
      ],
      delivery: "7–10 business days",
      featured: false
    },
    {
      name: "Growth",
      price: "$1,199",
      badge: "Most Popular",
      tagline: "For businesses serious about dominating their niche.",
      features: [
        "Up to 12 pages",
        "Advanced animations",
        "Full mobile+tablet",
        "Advanced SEO",
        "AI Chatbot integration",
        "Multi-language support",
        "Custom forms",
        "Telegram/WhatsApp notifications",
        "Social tracking",
        "3 revision rounds",
        "60-day support",
        "Analytics dashboard"
      ],
      delivery: "10–14 business days",
      featured: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      badge: "For Ambitious Brands",
      tagline: "Multi-server, full-scale digital ecosystems. No limits.",
      features: [
        "Unlimited pages",
        "Custom 3D scenes",
        "Full-stack apps",
        "E-commerce + payments",
        "Multi-region deployment",
        "Dedicated PM",
        "Weekly calls",
        "24/7 priority support",
        "Custom CMS",
        "Unlimited revisions",
        "6-month support",
        "Full docs"
      ],
      delivery: "Custom timeline",
      featured: false
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
    <section id="pricing" className="py-24 relative z-10 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Investment, Not Cost
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Every package is priced to deliver returns that dwarf the investment. Choose your level of ambition.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-3xl p-8 flex flex-col h-full relative ${
                tier.featured 
                  ? 'border-primary/50 shadow-[0_0_40px_rgba(108,99,255,0.2)] lg:scale-105 z-10' 
                  : 'border-border/50 hover:border-primary/30 transition-colors'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="text-primary text-sm font-semibold mb-2">{tier.badge}</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 h-10">{tier.tagline}</p>
              
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-muted-foreground">starting from</span>}
                </div>
                <div className="text-sm text-muted-foreground mt-2">Delivery: {tier.delivery}</div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  trackEvent('cta_click', { button: `pricing_${tier.name.toLowerCase()}` });
                  scrollTo('contact');
                }}
                className={`w-full py-4 rounded-xl font-semibold transition-all outline-none ${
                  tier.featured 
                    ? 'gradient-bg text-white hover:glow-violet' 
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {tier.name === 'Enterprise' ? "Let's Talk" : "Select Package"}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass rounded-2xl p-6"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="styles" className="border-none">
              <AccordionTrigger className="hover:no-underline text-lg font-display font-semibold px-2 py-0">
                Choose Your Visual Style
              </AccordionTrigger>
              <AccordionContent className="pt-6 pb-2 px-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  {designStyles.map((style, i) => (
                    <div key={i} className="bg-secondary/50 p-4 rounded-xl border border-border">
                      <h4 className="font-semibold text-foreground mb-1">{style.name}</h4>
                      <p className="text-xs text-muted-foreground">{style.desc}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
}