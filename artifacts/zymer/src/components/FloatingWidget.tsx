import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden
  >
    <path d="M7 0.5L8.5 4.8L13 4.8L9.4 7.6L10.7 12L7 9.5L3.3 12L4.6 7.6L1 4.8L5.5 4.8L7 0.5Z"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L2 8L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 5L14 8L11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 3L6.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const techs = ['Next.js', 'React', 'Three.js', 'Tailwind', 'TypeScript', 'GSAP'];

export default function FloatingWidget() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === 0 ? 1 : 0));
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-40 hidden lg:block pointer-events-none">
      <AnimatePresence mode="wait">
        {activeIndex === 0 ? (
          <motion.div
            key="card1"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass p-5 rounded-2xl w-[280px] shadow-2xl border border-white/[0.07] pointer-events-auto"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} className="text-amber-400" />
              ))}
            </div>

            <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
              "Zymer transformed our brand. Sales up 3x in 2 months. Unbelievable quality."
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                RA
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Rustam A.</div>
                <div className="text-[10px] text-muted-foreground">CEO at TeknoMart</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="card2"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass p-5 rounded-2xl w-[280px] shadow-2xl border border-[#00d4ff]/15 pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff]">
                <CodeIcon />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00d4ff]">Elite Technology</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-secondary/70 border border-border/60 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
