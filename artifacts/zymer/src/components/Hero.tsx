import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

const DiamondSep = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mx-4 text-primary" aria-hidden>
    <path d="M4 0L7.46 4L4 8L0.54 4L4 0Z" fill="currentColor" opacity="0.7" />
  </svg>
);

const StarIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
    <path d="M7 0.5L8.73 5.18L13.5 5.18L9.62 8.18L11.09 13L7 10.18L2.91 13L4.38 8.18L0.5 5.18L5.27 5.18L7 0.5Z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8.5H14M14 8.5L9.5 4M14 8.5L9.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 13L6.5 8L9.5 11L14 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5 5.5H14V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 15.5C20 16.06 19.74 16.56 19.32 16.88L11 22L2.68 16.88C2.26 16.56 2 16.06 2 15.5V5C2 3.9 2.9 3 4 3H18C19.1 3 20 3.9 20 5V15.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 8H15M7 12H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export default function Hero() {
  const { trackEvent } = useAnalytics();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = "We Don't Build Websites. We Build Digital Empires.".split(" ");

  const marqueeItems = [
    { label: '50+ Projects Delivered', icon: null },
    null, // separator
    { label: '20+ Countries', icon: null },
    null,
    { label: '4.9 Client Rating', icon: 'star' },
    null,
    { label: '48h Response', icon: null },
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 md:pt-0">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-aurora" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#00d4ff]/20 rounded-full blur-[100px] mix-blend-screen animate-aurora" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start gap-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`inline-block mr-[0.3em] ${
                    word === 'Digital' || word === 'Empires.' ? 'gradient-text' : 'text-foreground'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Zymer crafts high-performance, visually breathtaking web experiences for businesses ready to dominate their market — globally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'hero_primary' });
                  scrollTo('contact');
                }}
                className="group gradient-bg text-white px-8 py-4 rounded-full font-semibold text-base hover:scale-105 transition-transform glow-violet w-full sm:w-auto outline-none flex items-center justify-center gap-2"
              >
                Start Your Project
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight />
                </span>
              </button>
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'hero_secondary' });
                  scrollTo('pricing');
                }}
                className="glass text-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-white/5 transition-colors w-full sm:w-auto outline-none"
              >
                See Our Packages
              </button>
            </motion.div>

            {/* Marquee ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="w-full overflow-hidden border-y border-border/60 py-3"
            >
              <div className="inline-flex items-center whitespace-nowrap animate-[marquee_22s_linear_infinite]">
                {[...Array(2)].map((_, loop) => (
                  <span key={loop} className="inline-flex items-center">
                    {['50+ Projects Delivered', '20+ Countries', '4.9 Rating', '48h Response'].map((item, j) => (
                      <span key={`${loop}-${j}`} className="inline-flex items-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          {item === '4.9 Rating' ? (
                            <span className="inline-flex items-center gap-1.5">
                              <StarIcon size={12} className="text-amber-400" />
                              <StarIcon size={12} className="text-amber-400" />
                              <StarIcon size={12} className="text-amber-400" />
                              <StarIcon size={12} className="text-amber-400" />
                              <StarIcon size={12} className="text-amber-400" />
                              <span className="ml-1">4.9 Rating</span>
                            </span>
                          ) : item}
                        </span>
                        <DiamondSep />
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Floating Scene */}
          <div className="relative h-[400px] lg:h-[600px] hidden md:block">
            {/* Orbs */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/40 blur-2xl animate-float" />
            <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#00d4ff]/30 blur-3xl animate-float-slow" />

            {/* Card 1: Traffic Stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-20 right-10 glass p-5 rounded-2xl w-56 animate-float shadow-2xl border border-white/[0.07]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                  <TrendUpIcon />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.12em]">Traffic Growth</div>
                  <div className="text-xl font-bold text-foreground leading-tight">+340%</div>
                </div>
              </div>
              <div className="w-full h-[3px] bg-border/60 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 2, duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                />
              </div>
            </motion.div>

            {/* Card 2: Code Snippet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-0 -translate-y-1/2 glass p-5 rounded-2xl w-68 animate-float-slow shadow-2xl border border-primary/20 z-10"
            >
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] font-mono text-muted-foreground/50">zymer.config.ts</span>
              </div>
              <pre className="text-[11px] font-mono leading-relaxed text-muted-foreground overflow-hidden">
                <code>
                  <span className="text-[#ff6584]">const</span> <span className="text-primary">empire</span> = <span className="text-[#00d4ff]">new</span> <span className="text-foreground">Zymer</span>();{'\n'}
                  <span className="text-[#ff6584]">await</span> empire.<span className="text-[#00d4ff]">build</span>{'({' + '\n'}
                  {'  '}quality: <span className="text-emerald-400">'world-class'</span>,{'\n'}
                  {'  '}speed: <span className="text-emerald-400">'unmatched'</span>,{'\n'}
                  {'  '}design: <span className="text-emerald-400">'breathtaking'</span>{'\n'}
                  {'}'});{'\n'}
                  empire.<span className="text-[#00d4ff]">launch</span>();
                </code>
              </pre>
            </motion.div>

            {/* Card 3: Lead Notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-12 right-16 glass p-4 rounded-2xl flex items-center gap-3.5 animate-float shadow-xl border border-white/[0.07] z-20"
              style={{ animationDelay: '-2s' }}
            >
              <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-white glow-violet shrink-0">
                <LeadIcon />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">New Lead Received</div>
                <div className="text-xs text-muted-foreground mt-0.5">Enterprise Package · $15k+</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
