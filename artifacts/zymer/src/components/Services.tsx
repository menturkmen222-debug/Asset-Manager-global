import { motion } from 'framer-motion';

// Custom premium SVG icons
const icons = {
  LandingPage: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 10H10M6 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 16V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  BusinessSite: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 2C11 2 7.5 6 7.5 11C7.5 16 11 20 11 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 2C11 2 14.5 6 14.5 11C14.5 16 11 20 11 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 11H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Ecommerce: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2H4L5.5 12.5H16.5L18 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="15.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="12" y="2" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="12" y="9" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="12" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Portfolio: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 6V4.5C7 3.67 7.67 3 8.5 3H13.5C14.33 3 15 3.67 15 4.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12H20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  WebApp: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8L5 11L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 8L17 11L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 7L9.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  UIRedesign: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16L8.5 11.5L11.5 14.5L15 10.5L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 4H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Automation: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7.5 5.5L14.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14.5 12L7.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

// Background ghost icons (large, used as decorative card watermarks)
const ghostIcons = [icons.LandingPage, icons.BusinessSite, icons.Ecommerce, icons.Dashboard, icons.Portfolio, icons.WebApp, icons.UIRedesign, icons.Automation];

const services = [
  { Icon: icons.LandingPage, GhostIcon: icons.LandingPage, title: 'Landing Pages', desc: 'One page. One goal. Infinite conversions. We build landing pages that make visitors say yes before they reach the bottom.' },
  { Icon: icons.BusinessSite, GhostIcon: icons.BusinessSite, title: 'Business Websites', desc: 'Your digital headquarters. Professional, fast, and built to establish authority in any market.' },
  { Icon: icons.Ecommerce, GhostIcon: icons.Ecommerce, title: 'E-Commerce Stores', desc: 'Storefronts engineered to sell. Every element designed to reduce friction and maximize revenue.' },
  { Icon: icons.Dashboard, GhostIcon: icons.Dashboard, title: 'SaaS Dashboards', desc: 'Complex interfaces made elegant. We turn powerful features into intuitive experiences.' },
  { Icon: icons.Portfolio, GhostIcon: icons.Portfolio, title: 'Portfolio & Brand', desc: 'Your story, told beautifully. Stand out in a world drowning in mediocrity.' },
  { Icon: icons.WebApp, GhostIcon: icons.WebApp, title: 'Web Applications', desc: 'From idea to working product. Full-stack applications built for scale and speed.' },
  { Icon: icons.UIRedesign, GhostIcon: icons.UIRedesign, title: 'UI/UX Redesign', desc: 'Old site killing your conversions? We rebuild it into something that actually performs.' },
  { Icon: icons.Automation, GhostIcon: icons.Automation, title: 'API & Automation', desc: 'Connect your tools, automate your workflows, and free your team to focus on what matters.' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const { Icon, GhostIcon } = service;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative glass p-7 rounded-2xl hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] transition-all duration-300 overflow-hidden border border-white/[0.05] hover:border-primary/20"
              >
                {/* Ghost watermark icon */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 text-primary/[0.06] group-hover:text-primary/[0.1] transition-colors duration-300 pointer-events-none [&_svg]:w-full [&_svg]:h-full" aria-hidden>
                  <GhostIcon />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon container */}
                <div className="relative w-11 h-11 rounded-xl mb-6 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20" />
                  <span className="relative text-primary z-10">
                    <Icon />
                  </span>
                </div>

                <h3 className="text-base font-bold font-display mb-2.5 text-foreground">{service.title}</h3>
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
