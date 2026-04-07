import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden
  >
    <path d="M8 1L9.85 5.8L15 5.8L10.9 8.9L12.47 14L8 11L3.53 14L5.1 8.9L1 5.8L6.15 5.8L8 1Z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M8 20C8 20 6 19 6 15C6 11 9 8 13 8L13 10.5C10.5 10.5 9 12 9 15C9 15 10 15 11 16C12 17 12 18.5 11 19.5C10 20.5 8 20 8 20Z" fill="currentColor" opacity="0.15"/>
    <path d="M20 20C20 20 18 19 18 15C18 11 21 8 25 8L25 10.5C22.5 10.5 21 12 21 15C21 15 22 15 23 16C24 17 24 18.5 23 19.5C22 20.5 20 20 20 20Z" fill="currentColor" opacity="0.15"/>
  </svg>
);

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
    company: "Turkmenistan",
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
      '(min-width: 1024px)': { active: false }
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

        <div className="lg:block" ref={emblaRef}>
          <div className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-6 ml-0">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-[0_0_85%] min-w-0 md:flex-[0_0_45%] lg:flex-none glass p-7 rounded-3xl flex flex-col h-full hover:shadow-[0_0_30px_rgba(108,99,255,0.12)] transition-shadow duration-300 border border-white/[0.05] hover:border-primary/15 relative overflow-hidden"
              >
                {/* Decorative quote mark */}
                <div className="absolute top-5 right-5 text-primary">
                  <QuoteIcon />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="text-amber-400 w-4 h-4" />
                  ))}
                </div>

                <p className="text-sm lg:text-base text-foreground/90 mb-7 flex-grow leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 mt-auto border-t border-border/40 pt-5">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
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
