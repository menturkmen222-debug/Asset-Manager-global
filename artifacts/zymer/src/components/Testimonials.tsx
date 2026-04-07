import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg
    width="14" height="14" viewBox="0 0 16 16" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden
  >
    <path d="M8 1L9.85 5.8L15 5.8L10.9 8.9L12.47 14L8 11L3.53 14L5.1 8.9L1 5.8L6.15 5.8L8 1Z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/20" aria-hidden>
    <path d="M0 22V13.2C0 9.73333 0.933333 6.8 2.8 4.4C4.66667 1.93333 7.46667 0.266667 11.2 0V3.6C9.2 4.13333 7.66667 5.1 6.6 6.5C5.53333 7.9 5 9.4 5 11H10V22H0ZM17 22V13.2C17 9.73333 17.9333 6.8 19.8 4.4C21.6667 1.93333 24.4667 0.266667 28.2 0V3.6C26.2 4.13333 24.6667 5.1 23.6 6.5C22.5333 7.9 22 9.4 22 11H27V22H17Z" fill="currentColor"/>
  </svg>
);

const testimonials = [
  {
    quote: "I've worked with agencies in Dubai and London. Zymer is on another level. They delivered in 9 days what others quoted 2 months for. The site converts like crazy.",
    name: "Aziz M.",
    role: "Founder",
    company: "NovaTech Solutions",
    country: "UAE",
    initials: "AM",
    gradient: "from-violet-500 to-indigo-600",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    countryFlag: "🇦🇪",
  },
  {
    quote: "Our bounce rate dropped 60% after the redesign. Zymer didn't just build a website — they built a sales machine. Worth every cent.",
    name: "Elena K.",
    role: "CMO",
    company: "FreshMart",
    country: "Kazakhstan",
    initials: "EK",
    gradient: "from-blue-500 to-cyan-500",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    countryFlag: "🇰🇿",
  },
  {
    quote: "The attention to detail is insane. Every animation, every word placement — you can tell these people think deeply about what they're building. Truly world-class.",
    name: "Murad B.",
    role: "CEO",
    company: "LogiChain Ltd",
    country: "Turkey",
    initials: "MB",
    gradient: "from-emerald-500 to-teal-500",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    countryFlag: "🇹🇷",
  },
  {
    quote: "Three months later, our site is generating 4x more leads. Zero regrets. The ROI was visible in the first week after launch.",
    name: "Sara J.",
    role: "Director",
    company: "PulseMedia",
    country: "Germany",
    initials: "SJ",
    gradient: "from-pink-500 to-rose-600",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    countryFlag: "🇩🇪",
  },
  {
    quote: "Zymer is the first agency that actually listened. They asked smart questions and came back with something that blew my expectations. The mobile design is perfect.",
    name: "Timur N.",
    role: "Entrepreneur",
    company: "Independent",
    country: "Uzbekistan",
    initials: "TN",
    gradient: "from-amber-500 to-orange-500",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    countryFlag: "🇺🇿",
  },
  {
    quote: "Professional, fast, and brutally talented. By Thursday I had a live site that made my investors say 'wow'. Best investment this quarter.",
    name: "Priya S.",
    role: "Founder",
    company: "OrionSoft",
    country: "India",
    initials: "PS",
    gradient: "from-purple-500 to-violet-600",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
    countryFlag: "🇮🇳",
  }
];

function AvatarImage({ t }: { t: typeof testimonials[0] }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0 ring-2 ring-white/10`}>
        {t.initials}
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${t.gradient} blur-md opacity-50`} />
      <img
        src={t.avatar}
        alt={t.name}
        onError={() => setImgError(true)}
        className="relative w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-white/10"
      />
      <div className="absolute -bottom-1 -right-1 text-base leading-none select-none" title={t.country}>
        {t.countryFlag}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 1024px)': { active: false }
    }
  });

  return (
    <section className="py-28 relative z-10 overflow-hidden">
      {/* Section divider top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Subtle background treatment */}
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />

      {/* Decorative floating orb */}
      <div className="absolute top-1/3 right-[-100px] w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-5"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 1L6.18 3.76L9.14 3.76L6.82 5.48L7.7 8.24L5 6.6L2.3 8.24L3.18 5.48L0.86 3.76L3.82 3.76L5 1Z"/></svg>
              Client Results
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4 text-balance"
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

          {/* Aggregate rating */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass px-6 py-4 rounded-2xl flex items-center gap-4 shrink-0 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent pointer-events-none" />
            <div className="text-center relative z-10">
              <div className="text-3xl font-bold font-display gradient-text">4.9</div>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map(s => <StarIcon key={s} className="text-amber-400" />)}
              </div>
            </div>
            <div className="border-l border-white/[0.08] pl-4 relative z-10">
              <div className="text-sm font-semibold text-foreground">Average Rating</div>
              <div className="text-xs text-muted-foreground mt-0.5">From 50+ projects</div>
            </div>
          </motion.div>
        </div>

        <div className="lg:block" ref={emblaRef}>
          <div className="flex lg:grid lg:grid-cols-3 gap-5 ml-0">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-[0_0_85%] min-w-0 md:flex-[0_0_45%] lg:flex-none glass p-7 rounded-3xl flex flex-col hover:shadow-[0_8px_40px_rgba(108,99,255,0.16)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                {/* Top border accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

                {/* Quote icon */}
                <div className="mb-4">
                  <QuoteIcon />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="text-amber-400" />
                  ))}
                </div>

                <p className="text-sm lg:text-[15px] text-foreground/85 mb-7 flex-grow leading-relaxed italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3.5 mt-auto border-t border-white/[0.06] pt-5">
                  <AvatarImage t={t} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{t.role} · {t.company}</div>
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
