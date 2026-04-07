import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Code2 } from 'lucide-react';

export default function FloatingWidget() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-40 hidden lg:block pointer-events-none">
      <AnimatePresence mode="wait">
        {activeIndex === 0 ? (
          <motion.div
            key="card1"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass p-5 rounded-2xl w-80 shadow-2xl border-primary/20 pointer-events-auto"
          >
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-foreground mb-4 leading-relaxed font-medium">
              "Zymer transformed our brand. Sales up 3x in 2 months. Unbelievable quality."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass p-5 rounded-2xl w-80 shadow-2xl border-[#00d4ff]/20 pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-4 text-[#00d4ff]">
              <Code2 size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Elite Technology</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'Three.js', 'Tailwind', 'TypeScript', 'GSAP'].map((tech) => (
                <span key={tech} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
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