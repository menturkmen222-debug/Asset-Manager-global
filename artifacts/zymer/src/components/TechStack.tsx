import { motion } from 'framer-motion';

const row1 = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'Framer Motion', 'Node.js'];
const row2 = ['PostgreSQL', 'Supabase', 'Vercel', 'Groq AI', 'Stripe', 'Figma', 'Cloudflare', 'Docker'];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 relative z-10 bg-secondary/30 overflow-hidden border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold mb-4"
        >
          Built With Elite Technology
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          The same tools that power the world's most loved digital products.
        </motion.p>
      </div>

      {/* Marquees */}
      <div className="flex flex-col gap-6 relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1 (LTR) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-[marquee_30s_linear_infinite]">
            {[...row1, ...row1, ...row1].map((tech, i) => (
              <div key={i} className="mx-3 glass px-6 py-3 rounded-full text-foreground font-medium text-sm md:text-base whitespace-nowrap">
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (RTL) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-[marquee-reverse_35s_linear_infinite]">
            {[...row2, ...row2, ...row2].map((tech, i) => (
              <div key={i} className="mx-3 glass px-6 py-3 rounded-full text-foreground font-medium text-sm md:text-base whitespace-nowrap border-primary/20">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { stat: '99.9%', label: 'Uptime Guarantee' },
            { stat: '< 1s', label: 'Average Load Time' },
            { stat: '100/100', label: 'Lighthouse Score' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">{item.stat}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{item.label}</div>
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