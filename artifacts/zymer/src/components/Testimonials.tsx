import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    quote: "I've worked with agencies in Dubai and London. Zymer is on another level. They delivered in 9 days what others quoted 2 months for. The site converts like crazy.",
    name: "Aziz M.",
    role: "Founder",
    company: "NovaTech Solutions (UAE)",
    initials: "AM"
  },
  {
    quote: "Our bounce rate dropped 60% after the redesign. Zymer didn't just build a website — they built a sales machine. Worth every cent.",
    name: "Elena K.",
    role: "CMO",
    company: "FreshMart (Kazakhstan)",
    initials: "EK"
  },
  {
    quote: "The attention to detail is insane. Every animation, every word placement — you can tell these people think deeply about what they're building. Truly world-class.",
    name: "Murad B.",
    role: "CEO",
    company: "LogiChain Ltd (Turkey)",
    initials: "MB"
  },
  {
    quote: "Three months later, our site is generating 4x more leads. Zero regrets.",
    name: "Sara J.",
    role: "Director",
    company: "PulseMedia (Germany)",
    initials: "SJ"
  },
  {
    quote: "Zymer is the first agency that actually listened. They asked smart questions and came back with something that blew my expectations. The mobile design is perfect.",
    name: "Timur N.",
    role: "Entrepreneur",
    company: "(Turkmenistan)",
    initials: "TN"
  },
  {
    quote: "Professional, fast, and brutally talented. By Thursday I had a live site that made my investors say 'wow'.",
    name: "Priya S.",
    role: "Founder",
    company: "OrionSoft (India)",
    initials: "PS"
  }
];

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 1024px)': { active: false } // disable carousel on desktop
    }
  });

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="max-w-2xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Results don't lie. Neither do our clients.
          </motion.p>
        </div>

        {/* Mobile Carousel / Desktop Grid */}
        <div className="lg:block" ref={emblaRef}>
          <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 ml-0">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-[0_0_85%] min-w-0 md:flex-[0_0_45%] lg:flex-none glass p-8 rounded-3xl flex flex-col h-full hover:glow-violet transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground lg:text-lg mb-8 flex-grow leading-relaxed">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-border pt-6">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role} • {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}