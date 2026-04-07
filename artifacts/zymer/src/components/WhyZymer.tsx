import { motion } from 'framer-motion';

const icons = {
  Globe: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3.5 7.5H20.5M3.5 16.5H20.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5C12 5 9 3 6.5 4.5C4 6 3 9 4 11.5C3 12 2 13.5 2.5 15C3 16.5 4.5 17 5.5 17C5.5 19 7 21 9.5 21C11 21 12 20 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5C12 5 15 3 17.5 4.5C20 6 21 9 20 11.5C21 12 22 13.5 21.5 15C21 16.5 19.5 17 18.5 17C18.5 19 17 21 14.5 21C13 21 12 20 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 10H9.5M14.5 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 14H9M15 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Receipt: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4V21L7 19L10 21L12 19L14 21L17 19L20 21V4C20 3.45 19.55 3 19 3H5C4.45 3 4 3.45 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H15M9 13H15M9 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Infinity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C12 12 9.5 7 6.5 7C3.5 7 2 9 2 12C2 15 3.5 17 6.5 17C9.5 17 12 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 12C12 12 14.5 7 17.5 7C20.5 7 22 9 22 12C22 15 20.5 17 17.5 17C14.5 17 12 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  SearchCheck: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 21L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 11L10.5 13.5L14.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const reasons = [
  {
    Icon: icons.Globe,
    title: 'Global Standard, Local Understanding',
    desc: 'We operate at international standards while deeply understanding emerging markets.',
    number: '01'
  },
  {
    Icon: icons.Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Most agencies take months. We deliver in days. Not because we cut corners — because our process is engineered for excellence at velocity.',
    number: '02'
  },
  {
    Icon: icons.Brain,
    title: 'Psychology-Driven Design',
    desc: 'Every color, every word, every scroll animation is chosen based on conversion psychology. We make things persuasive.',
    number: '03'
  },
  {
    Icon: icons.Receipt,
    title: 'Transparent, No-Surprise Pricing',
    desc: "Our packages are clear. Our communication is direct. You always know what you're getting.",
    number: '04'
  },
  {
    Icon: icons.Infinity,
    title: 'Lifetime Technical Partnership',
    desc: "We don't disappear after launch. We're your technical partners. Got a question? Our AI assistant never sleeps.",
    number: '05'
  },
  {
    Icon: icons.SearchCheck,
    title: 'Built to Rank & Convert',
    desc: 'Every site is SEO-optimized, performance-tuned, and analytically wired from day one.',
    number: '06'
  }
];

export default function WhyZymer() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Why Brands Choose Zymer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            There are thousands of web agencies. Here's why the serious ones choose us.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {reasons.map((reason, i) => {
            const { Icon } = reason;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col gap-4"
              >
                {/* Icon + number row */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 rounded-2xl" />
                    <span className="relative z-10 text-primary">
                      <Icon />
                    </span>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-primary/40 select-none">{reason.number}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary/90 transition-colors duration-200">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
