import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
    <path d="M7 0.5L8.5 4.8L13 4.8L9.4 7.6L10.7 12L7 9.5L3.3 12L4.6 7.6L1 4.8L5.5 4.8L7 0.5Z"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L2 8L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 5L14 8L11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 3L6.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

function ReviewAvatar({ src, alt, gradient, initials }: { src: string; alt: string; gradient: string; initials: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-[10px] font-bold text-white shrink-0 border-2 border-white/10`}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={alt} onError={() => setError(true)}
      className="w-9 h-9 rounded-full object-cover shrink-0 border-2 border-white/10" />
  );
}

const reviews = [
  {
    text: '"Zymer transformed our brand. Sales up 3x in 2 months. Unbelievable quality."',
    name: 'Rustam A.',
    role: 'CEO at TeknoMart',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    initials: 'RA',
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    text: '"Our bounce rate dropped 60% after the redesign. Built a sales machine."',
    name: 'Elena K.',
    role: 'CMO at FreshMart',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    initials: 'EK',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    text: '"The team delivered beyond expectations. ROI was visible in the first week."',
    name: 'Murad B.',
    role: 'Founder at GrowthLab',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    initials: 'MB',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const techs = ['Next.js', 'React', 'Three.js', 'Tailwind', 'TypeScript', 'GSAP'];

export default function FloatingWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => current === 0 ? 1 : 0);
      setReviewIndex(current => (current + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const review = reviews[reviewIndex];

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      {/* Outer wrapper always stays in place — only inner content fades */}
      <div className="relative w-[288px]">
        <AnimatePresence mode="sync">
          {activeIndex === 0 ? (
            <motion.div
              key={`review-${reviewIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="glass p-5 rounded-2xl shadow-2xl border border-white/[0.07]"
            >
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <StarIcon key={i} className="text-amber-400" />
                ))}
              </div>
              <p className="text-[13px] text-foreground/85 mb-4 leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <ReviewAvatar
                  src={review.avatar}
                  alt={review.name}
                  gradient={review.gradient}
                  initials={review.initials}
                />
                <div>
                  <div className="text-xs font-semibold text-foreground">{review.name}</div>
                  <div className="text-[10px] text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="glass p-5 rounded-2xl shadow-2xl border border-[#00c4f0]/12"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#00c4f0]/10 border border-[#00c4f0]/20 flex items-center justify-center text-[#00c4f0]">
                  <CodeIcon />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00c4f0]/80">Elite Technology</span>
              </div>
              <div className="text-sm font-semibold text-foreground mb-3">Start Your Project →</div>
              <div className="flex flex-wrap gap-1.5">
                {techs.map(tech => (
                  <span key={tech}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
