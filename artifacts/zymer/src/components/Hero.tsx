import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

function HeroAvatar({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [error, setError] = useState(false);
  const fallbackColors = ['from-violet-500 to-indigo-600', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500'];
  const initials = alt.split(' ').map(w => w[0]).join('');

  if (error) {
    return (
      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${fallbackColors[index]} flex items-center justify-center text-[8px] font-bold text-white border-2 border-background`}>
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="w-7 h-7 rounded-full object-cover border-2 border-background"
    />
  );
}

const DiamondSep = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mx-4 opacity-30" aria-hidden>
    <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="currentColor" />
  </svg>
);

const StarIcon = ({ size = 13, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
    <path d="M7 0.5L8.73 5.18L13.5 5.18L9.62 8.18L11.09 13L7 10.18L2.91 13L4.38 8.18L0.5 5.18L5.27 5.18L7 0.5Z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8.5H14M14 8.5L9.5 4M14 8.5L9.5 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 13L6.5 8L9.5 11L14 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5 5.5H14V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 15.5C20 16.06 19.74 16.56 19.32 16.88L11 22L2.68 16.88C2.26 16.56 2 16.06 2 15.5V5C2 3.9 2.9 3 4 3H18C19.1 3 20 3.9 20 5V15.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 8H15M7 12H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const CheckSmall = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M9 10L6 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 10L12.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M5 2.5L7 4.5M13 2.5L11 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const mobileStats = [
  { label: 'Projects', value: '50+', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Rating', value: '4.9★', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  { label: 'Traffic', value: '+340%', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  { label: 'Lighthouse', value: '100/100', color: 'text-[#00c4f0]', bg: 'bg-[#00c4f0]/10', border: 'border-[#00c4f0]/20' },
];

export default function Hero() {
  const { trackEvent } = useAnalytics();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-primary/[0.14] rounded-full blur-[100px] md:blur-[130px] animate-aurora" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#00c4f0]/[0.1] rounded-full blur-[90px] md:blur-[110px] animate-aurora" style={{ animationDelay: '-6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[300px] md:h-[400px] bg-primary/[0.04] rounded-full blur-[80px] md:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 md:px-12 relative z-10 py-10 md:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start gap-5 md:gap-6">

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 glass-light px-4 py-2.5 rounded-full border border-white/10"
            >
              <div className="flex -space-x-1.5">
                {[
                  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Aziz M.' },
                  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Elena K.' },
                  { src: 'https://randomuser.me/api/portraits/men/67.jpg', alt: 'Murad B.' },
                ].map((av, i) => (
                  <HeroAvatar key={i} src={av.src} alt={av.alt} index={i} />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <StarIcon key={s} size={10} className="text-amber-400" />)}
              </div>
              <span className="text-[11px] sm:text-[12px] font-medium text-muted-foreground">
                Trusted by <span className="text-foreground font-semibold">50+</span> businesses
              </span>
            </motion.div>

            {/* Main headline */}
            <div>
              <h1 className="text-[2.15rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[3rem] xl:text-[3.75rem] font-display font-bold leading-[1.06] tracking-tight">
                {["We Don't", "Build Websites.", "We Build"].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-foreground"
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block gradient-text"
                >
                  Digital Empires.
                </motion.div>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Zymer crafts high-performance, visually breathtaking web experiences for businesses ready to dominate their market — globally.
            </motion.p>

            {/* Key proof points */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-x-4 gap-y-2"
            >
              {['Delivered in days, not months', '100/100 Lighthouse score', '24/7 support included'].map((point, i) => (
                <span key={i} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="text-emerald-400 shrink-0"><CheckSmall /></span>
                  {point}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'hero_primary' });
                  scrollTo('contact');
                }}
                className="group relative overflow-hidden gradient-bg text-white px-7 py-4 rounded-full font-semibold text-sm sm:text-base glow-violet transition-all duration-300 w-full sm:w-auto outline-none flex items-center justify-center gap-2 active:scale-[0.98] hover:scale-[1.03]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight />
                  </span>
                </span>
              </button>
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'hero_secondary' });
                  scrollTo('pricing');
                }}
                className="glass text-foreground px-7 py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto outline-none hover:border-primary/30"
              >
                See Our Packages
              </button>
            </motion.div>

            {/* Mobile Stats Grid — visible only on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="grid grid-cols-4 gap-2 w-full lg:hidden"
            >
              {mobileStats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl border ${stat.bg} ${stat.border}`}
                >
                  <span className={`text-sm sm:text-base font-bold ${stat.color} tabular-nums`}>{stat.value}</span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium tracking-wide text-center">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Marquee ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="w-full overflow-hidden border-y border-white/[0.06] py-3"
            >
              <div className="inline-flex items-center whitespace-nowrap animate-[marquee_24s_linear_infinite]">
                {[...Array(2)].map((_, loop) => (
                  <span key={loop} className="inline-flex items-center">
                    {['50+ Projects Delivered', '20+ Countries Served', '4.9★ Client Rating', '48h Turnaround', '$0 Hidden Fees'].map((item, j) => (
                      <span key={`${loop}-${j}`} className="inline-flex items-center">
                        <span className="text-[11px] font-medium text-muted-foreground tracking-wide">{item}</span>
                        <DiamondSep />
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Floating Scene — desktop only */}
          <div className="relative h-[500px] lg:h-[580px] hidden lg:block">
            <div className="absolute top-12 left-12 w-28 h-28 rounded-full bg-primary/30 blur-2xl animate-float" />
            <div className="absolute bottom-16 right-8 w-44 h-44 rounded-full bg-[#00c4f0]/20 blur-3xl animate-float-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/[0.06] blur-3xl" />

            {/* Card 1: Traffic Stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-16 right-8 glass p-5 rounded-2xl animate-float shadow-2xl"
              style={{ width: '220px' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                  <TrendUpIcon />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.1em]">Traffic Growth</div>
                  <div className="text-2xl font-bold text-foreground leading-tight">+340%</div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-8 mb-2">
                {[30, 45, 35, 60, 50, 75, 65, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.0 + i * 0.07, duration: 0.35 }}
                    className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${h}%`,
                      background: i === 7 ? 'linear-gradient(to top, #10b981, #34d399)' : 'rgba(16,185,129,0.25)'
                    }}
                  />
                ))}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">↑ After Zymer redesign</div>
            </motion.div>

            {/* Card 2: Code Snippet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[45%] left-0 -translate-y-1/2 glass p-5 rounded-2xl animate-float-slow shadow-2xl border border-primary/15 z-10"
              style={{ width: '260px' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] font-mono text-muted-foreground/60">zymer.config.ts</span>
              </div>
              <pre className="text-[11px] font-mono leading-[1.8] text-muted-foreground overflow-hidden">
                <code>
                  <span className="text-[#c792ea]">const</span> <span className="text-[#a09eff]">empire</span> = <span className="text-[#89ddf7]">new</span> <span className="text-foreground/90">Zymer</span>();{'\n'}
                  <span className="text-[#c792ea]">await</span> empire.<span className="text-[#89ddf7]">build</span>{'({' + '\n'}
                  {'  '}quality: <span className="text-emerald-400">'world-class'</span>,{'\n'}
                  {'  '}speed: <span className="text-emerald-400">'unmatched'</span>,{'\n'}
                  {'  '}design: <span className="text-emerald-400">'breathtaking'</span>{'\n'}
                  {'}'});
                </code>
              </pre>
            </motion.div>

            {/* Card 3: Speed score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-8 left-[30%] glass p-3.5 rounded-2xl flex items-center gap-3 shadow-xl animate-float z-10"
              style={{ animationDelay: '-3s' }}
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 border border-amber-500/20">
                <SpeedIcon />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground font-medium">Lighthouse Score</div>
                <div className="text-base font-bold text-foreground">100 / 100</div>
              </div>
            </motion.div>

            {/* Card 4: Lead Notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-10 right-12 glass p-4 rounded-2xl flex items-center gap-3.5 animate-float shadow-xl z-20"
              style={{ animationDelay: '-2s' }}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-white glow-sm shrink-0">
                  <LeadIcon />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
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
