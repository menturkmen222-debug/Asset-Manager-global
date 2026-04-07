import { motion } from 'framer-motion';
import { Globe2, Zap, BrainCircuit, Receipt, Infinity, SearchCheck } from 'lucide-react';

const reasons = [
  {
    icon: Globe2,
    title: 'Global Standard, Local Understanding',
    desc: 'We operate at international standards while deeply understanding emerging markets.'
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Most agencies take months. We deliver in days. Not because we cut corners — because our process is engineered for excellence at velocity.'
  },
  {
    icon: BrainCircuit,
    title: 'Psychology-Driven Design',
    desc: 'Every color, every word, every scroll animation is chosen based on conversion psychology. We make things persuasive.'
  },
  {
    icon: Receipt,
    title: 'Transparent, No-Surprise Pricing',
    desc: 'Our packages are clear. Our communication is direct. You always know what you\'re getting.'
  },
  {
    icon: Infinity,
    title: 'Lifetime Technical Partnership',
    desc: 'We don\'t disappear after launch. We\'re your technical partners. Got a question? Our AI assistant never sleeps.'
  },
  {
    icon: SearchCheck,
    title: 'Built to Rank & Convert',
    desc: 'Every site is SEO-optimized, performance-tuned, and analytically wired from day one.'
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}