export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <img src="/web-logo.png" alt="Zymer" className="h-8 w-auto object-contain self-start" />
            <p className="text-muted-foreground text-sm mt-2">Building digital empires since 2024.</p>
            <div className="flex gap-4 mt-2">
              {['Telegram', 'TikTok', 'Instagram'].map(social => (
                <a key={social} href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                  {social}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4">© 2024 Zymer. All rights reserved.</p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3 md:items-center">
            <h4 className="text-foreground font-semibold mb-2">Navigation</h4>
            {['Services', 'Pricing', 'Tech Stack', 'Contact'].map(link => (
              <button 
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(' ', '-'))}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm text-left outline-none"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3 md:items-end">
            <h4 className="text-foreground font-semibold mb-2">Contact Us</h4>
            <a href="https://t.me/zymer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Telegram: @zymer
            </a>
            <a href="mailto:hello@zymer.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Email: hello@zymer.com
            </a>
            <span className="text-emerald-500 text-xs font-medium mt-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Response: Within 6 hours
            </span>
          </div>

        </div>

        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground font-medium tracking-wide">
            Designed & built with obsession. Powered by cutting-edge technology.
          </p>
        </div>
      </div>
    </footer>
  );
}