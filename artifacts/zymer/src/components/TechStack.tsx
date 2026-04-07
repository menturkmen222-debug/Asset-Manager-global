import { motion } from 'framer-motion';

const row1 = [
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Tailwind CSS', icon: '✦' },
  { name: 'GSAP', icon: '⚡' },
  { name: 'Three.js', icon: '◈' },
  { name: 'Framer Motion', icon: '◉' },
  { name: 'Node.js', icon: '⬡' },
];

const row2 = [
  { name: 'PostgreSQL', icon: '🗄' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Groq AI', icon: '◈' },
  { name: 'Stripe', icon: '◉' },
  { name: 'Figma', icon: '✦' },
  { name: 'Cloudflare', icon: '☁' },
  { name: 'Docker', icon: '🐳' },
];

const stats = [
  { stat: '99.9%', label: 'Uptime Guarantee', icon: '↑' },
  { stat: '< 1s', label: 'Avg Load Time', icon: '⚡' },
  { stat: '100/100', label: 'Lighthouse Score', icon: '◉' },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-28 relative z-10 overflow-hidden">
      {/* Section divider top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 mb-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-badge mb-5 mx-auto"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M3.5 5L4.5 6L6.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Tech Stack
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-3xl md:text-4xl font-display font-bold mb-4"
        >
          Built With Elite Technology
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-lg mx-auto"
        >
          The same tools that power the world's most loved digital products.
        </motion.p>
      </div>

      {/* Marquees */}
      <div className="flex flex-col gap-4 relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1 — LTR */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-[marquee_32s_linear_infinite] gap-3">
            {[...row1, ...row1, ...row1].map((tech, i) => (
              <div key={i} className="flex items-center gap-2.5 glass px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border-white/[0.06] hover:border-primary/20 transition-colors shrink-0">
                <span className="text-primary/70 text-[13px] font-mono w-4 text-center shrink-0">{tech.icon}</span>
                <span className="text-foreground/80">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — RTL */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-[marquee-reverse_38s_linear_infinite] gap-3">
            {[...row2, ...row2, ...row2].map((tech, i) => (
              <div key={i} className="flex items-center gap-2.5 glass px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border-primary/10 hover:border-primary/25 transition-colors shrink-0">
                <span className="text-[#00c4f0]/70 text-[13px] font-mono w-4 text-center shrink-0">{tech.icon}</span>
                <span className="text-foreground/80">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 md:px-12 mt-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center glass p-7 rounded-2xl hover:border-primary/15 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2 leading-none">{item.stat}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.12em] font-semibold mt-3">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
