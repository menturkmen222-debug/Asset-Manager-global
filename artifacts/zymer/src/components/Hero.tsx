import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import AsteroidField from './AsteroidField';

function HeroAvatar({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [error, setError] = useState(false);
  const fallbackColors = ['from-violet-500 to-indigo-600', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500'];
  const initials = alt.split(' ').map(w => w[0]).join('');
  if (error) {
    return (
      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${fallbackColors[index]} flex items-center justify-center text-[7px] font-bold text-white border-2 border-background`}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={alt} onError={() => setError(true)}
      className="w-6 h-6 rounded-full object-cover border-2 border-background" />
  );
}

const DiamondSep = () => (
  <svg width="5" height="5" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="inline-block align-middle mx-3 opacity-25" aria-hidden>
    <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="currentColor" />
  </svg>
);

const StarIcon = ({ size = 11, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
    <path d="M7 0.5L8.73 5.18L13.5 5.18L9.62 8.18L11.09 13L7 10.18L2.91 13L4.38 8.18L0.5 5.18L5.27 5.18L7 0.5Z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8.5H14M14 8.5L9.5 4M14 8.5L9.5 13" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 13L6.5 8L9.5 11L14 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5 5.5H14V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 15.5C20 16.06 19.74 16.56 19.32 16.88L11 22L2.68 16.88C2.26 16.56 2 16.06 2 15.5V5C2 3.9 2.9 3 4 3H18C19.1 3 20 3.9 20 5V15.5Z"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 8H15M7 12H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const CheckSmall = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M9 10L6 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 10L12.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const marqueeItems = ['50+ Projects Delivered', '20+ Countries Served', '4.9★ Client Rating', '48h Turnaround', '$0 Hidden Fees'];

export default function Hero() {
  const { trackEvent } = useAnalytics();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden pt-16">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AsteroidField />
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/[0.13] rounded-full blur-[120px] animate-aurora" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00c4f0]/[0.09] rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '-6s' }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content area — fills space between nav and marquee */}
      <div className="flex-1 flex items-center relative z-10 overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full py-6 lg:py-8">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-10 items-center">

            {/* Left column */}
            <div className="flex flex-col gap-3 md:gap-4">

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 glass-light px-3.5 py-2 rounded-full border border-white/10 self-start"
              >
                <div className="flex -space-x-1.5">
                  {[
                    { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Aziz M.' },
                    { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Elena K.' },
                    { src: 'https://randomuser.me/api/portraits/men/67.jpg', alt: 'Murad B.' },
                  ].map((av, i) => <HeroAvatar key={i} src={av.src} alt={av.alt} index={i} />)}
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <StarIcon key={s} size={9} className="text-amber-400" />)}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Trusted by <span className="text-foreground font-semibold">50+</span> businesses
                </span>
              </motion.div>

              {/* Headline */}
              <div>
                <h1 className="font-display font-bold leading-[1.05] tracking-tight"
                  style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.75rem)' }}>
                  {["We Don't", "Build Websites.", "We Build"].map((line, i) => (
                    <motion.div key={i} className="block text-foreground"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.18 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                      {line}
                    </motion.div>
                  ))}
                  <motion.div className="block gradient-text"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}>
                    Digital Empires.
                  </motion.div>
                </h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.6 }}
                className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed"
              >
                Zymer crafts high-performance, visually breathtaking web experiences for businesses ready to dominate their market — globally.
              </motion.p>

              {/* Check points */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-wrap gap-x-4 gap-y-1.5"
              >
                {['Delivered in days, not months', '100/100 Lighthouse score', '24/7 support included'].map((point, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="text-emerald-400 shrink-0"><CheckSmall /></span>
                    {point}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-2.5 pt-1"
              >
                <button
                  onClick={() => { trackEvent('cta_click', { button: 'hero_primary' }); scrollTo('contact'); }}
                  className="group relative overflow-hidden gradient-bg text-white px-6 py-3.5 rounded-full font-semibold text-sm glow-violet transition-all duration-300 outline-none flex items-center justify-center gap-2 active:scale-[0.98] hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRight /></span>
                  </span>
                </button>
                <button
                  onClick={() => { trackEvent('cta_click', { button: 'hero_secondary' }); scrollTo('pricing'); }}
                  className="glass text-foreground px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 outline-none hover:border-primary/30"
                >
                  See Our Packages
                </button>
              </motion.div>

              {/* Mobile stats — mobile only */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.72 }}
                className="grid grid-cols-4 gap-1.5 lg:hidden pt-1"
              >
                {[
                  { label: 'Projects', value: '50+', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
                  { label: 'Rating', value: '4.9★', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
                  { label: 'Traffic', value: '+340%', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
                  { label: 'Speed', value: '100/100', color: 'text-[#00c4f0]', bg: 'bg-[#00c4f0]/10', border: 'border-[#00c4f0]/20' },
                ].map((s, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border ${s.bg} ${s.border}`}>
                    <span className={`text-xs font-bold ${s.color} tabular-nums`}>{s.value}</span>
                    <span className="text-[9px] text-muted-foreground font-medium text-center">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right floating scene — desktop only */}
            <div className="relative hidden lg:block" style={{ height: 'clamp(380px, 50svh, 540px)' }}>
              {/* Glow blobs */}
              <div className="absolute top-[15%] left-[20%] w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-float pointer-events-none" />
              <div className="absolute bottom-[20%] right-[15%] w-28 h-28 rounded-full bg-[#00c4f0]/12 blur-3xl animate-float-slow pointer-events-none" />

              {/* Speed badge — top center-left anchor */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[4%] left-[38%] glass px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl animate-float z-10"
                style={{ animationDelay: '-3s' }}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 border border-amber-500/20 shrink-0">
                  <SpeedIcon />
                </div>
                <div>
                  <div className="text-[9px] text-muted-foreground font-medium">Lighthouse Score</div>
                  <div className="text-sm font-bold text-foreground">100 / 100</div>
                </div>
              </motion.div>

              {/* Traffic card — right, slightly lower */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[16%] right-0 glass p-4 rounded-2xl animate-float shadow-2xl w-[195px]"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                    <TrendUpIcon />
                  </div>
                  <div>
                    <div className="text-[9px] text-muted-foreground font-semibold uppercase tracking-[0.1em]">Traffic Growth</div>
                    <div className="text-xl font-bold text-foreground leading-tight">+340%</div>
                  </div>
                </div>
                <div className="flex items-end gap-0.5 h-7 mb-1.5">
                  {[30, 45, 35, 60, 50, 75, 65, 85].map((h, i) => (
                    <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ delay: 1.0 + i * 0.06, duration: 0.3 }}
                      className="flex-1 rounded-[3px] origin-bottom"
                      style={{ height: `${h}%`, background: i === 7 ? 'linear-gradient(to top, #10b981, #34d399)' : 'rgba(16,185,129,0.22)' }}
                    />
                  ))}
                </div>
                <div className="text-[9px] text-emerald-400 font-medium">↑ After Zymer redesign</div>
              </motion.div>

              {/* Code card — left, middle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[30%] left-0 glass p-4 rounded-2xl animate-float-slow shadow-2xl border border-primary/15 z-10 w-[235px]"
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  <span className="ml-1.5 text-[9px] font-mono text-muted-foreground/55">zymer.config.ts</span>
                </div>
                <pre className="text-[10px] font-mono leading-[1.75] text-muted-foreground overflow-hidden">
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

              {/* Lead notification — bottom center-left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-[5%] left-[10%] glass p-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl z-20"
                style={{ animationDelay: '-2s' }}
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white glow-sm">
                    <LeadIcon />
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">New Lead Received</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Enterprise Package · $15k+</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Full-width marquee — seamless infinite loop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 shrink-0 w-full border-t border-white/[0.07] py-3 bg-background/20 backdrop-blur-sm overflow-hidden"
      >
        {/* 6 copies: animates -1/6 of total = exactly 1 copy, always fills viewport */}
        <div
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{ animation: 'marquee-strip 32s linear infinite' }}
        >
          {[0, 1, 2, 3, 4, 5].map(loop => (
            <span key={loop} className="flex items-center shrink-0">
              {marqueeItems.map((item, j) => (
                <span key={j} className="flex items-center shrink-0">
                  <span className="text-[11px] font-medium text-muted-foreground/70 tracking-wide px-1">{item}</span>
                  <DiamondSep />
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes marquee-strip {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-16.6667%); }
        }
      `}</style>
    </section>
  );
}
