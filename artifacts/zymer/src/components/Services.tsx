import { motion } from 'framer-motion';
import { 
  LayoutTemplate, 
  Globe, 
  ShoppingCart, 
  LayoutDashboard, 
  UserCircle, 
  AppWindow, 
  Paintbrush, 
  Workflow 
} from 'lucide-react';

const services = [
  {
    icon: LayoutTemplate,
    title: 'Landing Pages',
    desc: 'One page. One goal. Infinite conversions. We build landing pages that make visitors say yes before they reach the bottom.',
  },
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Your digital headquarters. Professional, fast, and built to establish authority in any market.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Stores',
    desc: 'Storefronts engineered to sell. Every element designed to reduce friction and maximize revenue.',
  },
  {
    icon: LayoutDashboard,
    title: 'SaaS Dashboards',
    desc: 'Complex interfaces made elegant. We turn powerful features into intuitive experiences.',
  },
  {
    icon: UserCircle,
    title: 'Portfolio & Brand',
    desc: 'Your story, told beautifully. Stand out in a world drowning in mediocrity.',
  },
  {
    icon: AppWindow,
    title: 'Web Applications',
    desc: 'From idea to working product. Full-stack applications built for scale and speed.',
  },
  {
    icon: Paintbrush,
    title: 'UI/UX Redesign',
    desc: 'Old site killing your conversions? We rebuild it into something that actually performs.',
  },
  {
    icon: Workflow,
    title: 'API & Automation',
    desc: 'Connect your tools, automate your workflows, and free your team to focus on what matters.',
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="max-w-2xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            What We Build
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Every project is a statement. Here's how we make yours impossible to ignore.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass p-8 rounded-2xl hover:-translate-y-2 hover:glow-violet transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon size={64} className="text-primary" />
                </div>
                
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold font-display mb-3 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}