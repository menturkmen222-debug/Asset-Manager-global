import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  business: z.string().min(2, 'Business name is required'),
  phone: z.string().min(5, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  package: z.enum(['Starter', 'Growth', 'Enterprise']),
  style: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit about your project'),
  url: z.string().optional(),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  source: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const inputClass = "w-full bg-white/[0.04] border border-white/[0.09] hover:border-white/[0.15] focus:border-primary/60 focus:bg-white/[0.06] rounded-xl px-4 py-3.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 min-h-[52px]";

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { sessionId } = useAnalytics();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package: 'Growth',
      style: 'Modern Flat'
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'form_submission', sessionId, data })
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Submission failed');
      }
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackage = watch('package');
  const selectedStyle = watch('style');

  const packages = [
    { name: 'Starter', price: '$699', desc: '5 pages' },
    { name: 'Growth', price: '$1,199', desc: '12 pages' },
    { name: 'Enterprise', price: 'Custom', desc: 'Unlimited' },
  ];

  const styles = ['Minimalist', 'Corporate', 'Modern Flat', 'Dark Premium', 'Editorial', 'Luxury', '3D Interactive'];

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/[0.06] rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 relative">
        
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4 md:mb-5 mx-auto"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M9 6.5C9 7.06 8.74 7.56 8.32 7.88L5 10L1.68 7.88C1.26 7.56 1 7.06 1 6.5V2C1 1.45 1.45 1 2 1H8C8.55 1 9 1.45 9 2V6.5Z" stroke="currentColor" strokeWidth="1"/></svg>
            Get in Touch
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 md:mb-4 text-balance"
          >
            Let's Build Something Remarkable
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            Fill out the form below and expect a personal response within 6 hours.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                onSubmit={handleSubmit(onSubmit)}
                className="glass p-5 sm:p-7 md:p-10 rounded-3xl shadow-2xl border-primary/12 space-y-6 md:space-y-7"
              >
                
                {/* Name + Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Full Name <span className="text-primary/60">*</span></label>
                    <input 
                      {...register('name')}
                      className={inputClass}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Business Name <span className="text-primary/60">*</span></label>
                    <input 
                      {...register('business')}
                      className={inputClass}
                      placeholder="Acme Corp"
                    />
                    {errors.business && <p className="text-xs text-destructive mt-1">{errors.business.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Phone Number <span className="text-primary/60">*</span></label>
                    <input 
                      {...register('phone')}
                      type="tel"
                      inputMode="tel"
                      className={inputClass}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Email Address <span className="text-primary/60">*</span></label>
                    <input 
                      {...register('email')}
                      type="email"
                      inputMode="email"
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Package selection */}
                <div className="space-y-3">
                  <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Select Package <span className="text-primary/60">*</span></label>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {packages.map(pkg => (
                      <button
                        key={pkg.name}
                        type="button"
                        onClick={() => setValue('package', pkg.name as any)}
                        className={`relative py-3.5 md:py-4 px-3 md:px-4 rounded-xl border text-left transition-all duration-200 active:scale-[0.98] ${
                          selectedPackage === pkg.name 
                            ? 'border-primary/50 bg-primary/10 shadow-[0_0_20px_rgba(108,99,255,0.12)]' 
                            : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]'
                        }`}
                      >
                        {selectedPackage === pkg.name && (
                          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-t-xl" />
                        )}
                        <div className={`text-xs md:text-sm font-bold mb-0.5 ${selectedPackage === pkg.name ? 'text-primary' : 'text-foreground'}`}>{pkg.name}</div>
                        <div className="text-[10px] md:text-xs text-muted-foreground">{pkg.price}</div>
                        <div className="text-[10px] text-muted-foreground/60 hidden sm:block">{pkg.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style tags */}
                <div className="space-y-3">
                  <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Preferred Design Style</label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setValue('style', style)}
                        className={`px-3.5 md:px-4 py-2 rounded-full border text-[11px] md:text-xs font-medium transition-all duration-200 active:scale-[0.97] min-h-[36px] ${
                          selectedStyle === style 
                            ? 'border-[#00c4f0]/60 bg-[#00c4f0]/10 text-[#00c4f0]' 
                            : 'border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/[0.16] hover:text-foreground'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[12px] md:text-[13px] font-semibold text-foreground/80">Project Details <span className="text-primary/60">*</span></label>
                  <textarea 
                    {...register('message')}
                    rows={4}
                    className={`${inputClass} resize-none min-h-[120px]`}
                    placeholder="Tell us about your goals, current challenges, and what you want to achieve with this project..."
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group gradient-bg text-white px-7 py-4 rounded-xl font-bold text-sm glow-violet hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:scale-100 outline-none w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send My Project Brief
                        <Send size={15} />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    Response within 6 hours · No commitment
                  </p>
                </div>
                {submitError && (
                  <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                    ⚠️ {submitError}
                  </p>
                )}

              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass p-8 sm:p-12 rounded-3xl shadow-2xl border-emerald-500/20 text-center flex flex-col items-center"
              >
                <div className="relative mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/15 rounded-full flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">Brief Received!</h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-7 md:mb-8 leading-relaxed">
                  Thank you, <span className="text-foreground font-semibold">{watch('name').split(' ')[0]}</span>! We've received your project details and will personally review it. Expect a response within 6 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a href="https://t.me/zymer" target="_blank" rel="noreferrer" className="bg-[#0088cc] text-white px-6 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#0077bb] active:scale-[0.97] transition-all">
                    Message on Telegram
                  </a>
                  <a href="mailto:hello@zymer.com" className="glass text-foreground border border-white/[0.1] px-6 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/[0.05] active:scale-[0.97] transition-all">
                    hello@zymer.com
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
