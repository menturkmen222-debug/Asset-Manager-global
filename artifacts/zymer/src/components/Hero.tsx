import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Hero() {
  const { trackEvent } = useAnalytics();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleWords = "We Don't Build Websites. We Build Digital Empires.".split(" ");

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 md:pt-0">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-aurora" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#00d4ff]/20 rounded-full blur-[100px] mix-blend-screen animate-aurora" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start gap-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`inline-block mr-[0.3em] ${
                    word === 'Digital' || word === 'Empires.' ? 'gradient-text' : 'text-foreground'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Zymer crafts high-performance, visually breathtaking web experiences for businesses ready to dominate their market — globally.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'hero_primary' });
                  scrollTo('contact');
                }}
                className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform glow-violet w-full sm:w-auto outline-none"
              >
                Start Your Project
              </button>
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'hero_secondary' });
                  scrollTo('pricing');
                }}
                className="glass text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-colors w-full sm:w-auto outline-none"
              >
                See Our Packages
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="w-full mt-8 overflow-hidden whitespace-nowrap border-y border-border py-4"
            >
              <div className="inline-block animate-[marquee_20s_linear_infinite]">
                <span className="text-sm font-medium text-muted-foreground mx-4">50+ Projects Delivered</span>
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">20+ Countries</span>
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">4.9★ Client Rating</span>
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">48h Response</span>
                {/* Duplicate for seamless loop */}
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">50+ Projects Delivered</span>
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">20+ Countries</span>
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">4.9★ Client Rating</span>
                <span className="text-sm font-medium text-primary mx-4">✦</span>
                <span className="text-sm font-medium text-muted-foreground mx-4">48h Response</span>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Scene */}
          <div className="relative h-[400px] lg:h-[600px] hidden md:block">
            {/* Orb 1 */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/40 blur-2xl animate-float" />
            {/* Orb 2 */}
            <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#00d4ff]/30 blur-3xl animate-float-slow" />
            
            {/* Card 1: Traffic Stat */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute top-20 right-10 glass p-6 rounded-2xl w-64 animate-float shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">TRAFFIC</div>
                  <div className="text-2xl font-bold text-foreground">↑ 340%</div>
                </div>
              </div>
              <div className="w-full h-1 bg-border rounded-full mt-4 overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-500 rounded-full" />
              </div>
            </motion.div>

            {/* Card 2: Code Snippet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute top-1/2 left-0 -translate-y-1/2 glass p-5 rounded-2xl w-72 animate-float-slow shadow-2xl backdrop-blur-3xl z-10 border-primary/30"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <pre className="text-xs font-mono text-muted-foreground overflow-hidden">
                <code>
                  <span className="text-[#ff6584]">const</span> <span className="text-primary">empire</span> = <span className="text-[#00d4ff]">new</span> Zymer();{'\n'}
                  <span className="text-[#ff6584]">await</span> empire.<span className="text-[#00d4ff]">build</span>({'{'}{'\n'}
                  {'  '}quality: <span className="text-emerald-400">'world-class'</span>,{'\n'}
                  {'  '}speed: <span className="text-emerald-400">'unmatched'</span>{'\n'}
                  {'}'});{'\n'}
                  empire.<span className="text-[#00d4ff]">launch</span>();
                </code>
              </pre>
            </motion.div>

            {/* Card 3: Notification */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="absolute bottom-10 right-20 glass p-4 rounded-xl flex items-center gap-4 animate-float shadow-xl z-20"
              style={{ animationDelay: '-2s' }}
            >
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white glow-violet">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><polyline points="15,9 18,9 18,11"/><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">New Lead Received</div>
                <div className="text-xs text-muted-foreground">Enterprise Package • $15k+</div>
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