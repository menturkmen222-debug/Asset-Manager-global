# ZYMER — MASTER BUILD PROMPT
> For: Replit AI Agent | Deploy: GitHub → Vercel | Language: English

---

## 🧠 BEFORE YOU WRITE A SINGLE LINE OF CODE — READ THIS FULLY

You are building **Zymer** — a world-class, premium web development agency website that sells custom websites to businesses globally. This is not a portfolio toy. This is a high-conversion, psychologically engineered, visually stunning digital storefront. Every pixel, every word, every interaction must feel like it was crafted by a team of 50 senior engineers and designers at a Silicon Valley unicorn.

**If any section is unclear, reason it out and make the best professional decision. Do not cut corners. Do not simplify. Do not use generic templates.**

---

## 📁 PROJECT STRUCTURE & TECH STACK

```
zymer/
├── public/
│   ├── web-logo.png          ← Main logo (already provided)
│   ├── web-logo-2.png        ← Favicon (already provided)
│   └── ai-assistant-icon.png ← AI Assistant icon (already provided)
├── src/
│   ├── app/                  ← Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       ├── chat/route.ts         ← Groq API proxy
│   │       └── contact/route.ts      ← Telegram bot + analytics
│   ├── components/
│   │   ├── Hero/
│   │   ├── FloatingScene/
│   │   ├── Services/
│   │   ├── Pricing/
│   │   ├── Testimonials/
│   │   ├── TechStack/
│   │   ├── Contact/
│   │   ├── AIAssistant/
│   │   └── Analytics/
│   ├── lib/
│   │   ├── groq.ts
│   │   ├── telegram.ts
│   │   └── analytics.ts
│   └── hooks/
│       ├── useIdleDetect.ts
│       └── useAnalytics.ts
├── .env.local                ← Environment variables
├── .env.example
├── vercel.json
├── next.config.js
├── tailwind.config.ts
└── package.json
```

**Technology Stack (mandatory — do not substitute):**
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + Framer Motion (animations) + GSAP (scroll & parallax)
- **3D / Canvas:** Three.js or React Three Fiber (for floating hero scene)
- **UI Components:** Radix UI primitives (unstyled, custom styled)
- **AI Chat:** Groq API via server-side `/api/chat` route (model: `llama3-70b-8192`)
- **Fonts:** Google Fonts — `Inter` (body) + `Syne` or `Clash Display` (headings)
- **Icons:** Lucide React + custom SVGs
- **Form handling:** React Hook Form + Zod validation
- **Analytics/Events:** Custom hook → `/api/contact` → Telegram Bot
- **Deployment:** Vercel (with Edge Runtime where applicable)

---

## 🔐 ENVIRONMENT VARIABLES

Create `.env.local` and `.env.example` with these variables:

```env
# Groq AI
GROQ_API_KEY=your_groq_api_key_here

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_USER_ID_1=your_first_telegram_user_id_here
TELEGRAM_USER_ID_2=your_second_telegram_user_id_here

# Site
NEXT_PUBLIC_SITE_URL=https://zymer.vercel.app
```

All sensitive keys are **server-side only** (no `NEXT_PUBLIC_` prefix except site URL). Never expose keys to the client.

---

## 📡 BACKEND ROUTES

### `/api/chat` — Groq AI Proxy
- Accepts: `POST { messages: [], sessionId: string }`
- Streams response from Groq (`llama3-70b-8192`)
- System prompt for the assistant:
  > *"You are Zymer's intelligent assistant. Zymer is a premium global web development agency. You help potential clients understand our services, pricing plans (Starter at $699, Growth at $1199, Enterprise custom), and the value we deliver. Be warm, professional, confident, and persuasive. Speak English. If asked about pricing or services, always highlight our value and guide them toward booking a consultation. Keep responses concise and elegant."*
- After every user message, also fire a non-blocking POST to `/api/contact` with event type `ai_chat_message`

### `/api/contact` — Unified Telegram Notification Hub
Accepts a universal event payload:
```typescript
{
  type: 'form_submission' | 'ai_chat_message' | 'page_event' | 'social_click' | 'idle_trigger' | 'section_view' | 'cta_click',
  sessionId: string,
  timestamp: string,
  data: Record<string, any>
}
```

**For `form_submission`:** Send full formatted message to BOTH Telegram user IDs:
```
🚀 NEW LEAD — ZYMER

👤 Name: {name}
🏢 Business: {businessName}
📞 Phone: {phone}
📧 Email: {email}

📦 Package: {plan} ({price})
🎨 Design Style: {designStyle}
💬 Message: {message}

🕐 Time: {timestamp}
🌍 Session: {sessionId}
```

**For all analytics events:** Send to BOTH Telegram user IDs:
```
📊 ANALYTICS — ZYMER

🔔 Event: {type}
⏱ Time: {timestamp}
📱 Session: {sessionId}
📋 Details: {JSON.stringify(data, null, 2)}
```

Send to both `TELEGRAM_USER_ID_1` and `TELEGRAM_USER_ID_2` simultaneously using `Promise.all`.

---

## 🎨 VISUAL DESIGN SYSTEM

### Color Palette
```css
--color-bg-primary: #050508        /* Near-black deep space */
--color-bg-secondary: #0a0a12      /* Elevated surfaces */
--color-bg-card: #0f0f1a           /* Card backgrounds */
--color-accent-primary: #6c63ff    /* Electric violet */
--color-accent-secondary: #00d4ff  /* Cyan glow */
--color-accent-tertiary: #ff6584   /* Coral accent (sparingly) */
--color-text-primary: #f0f0ff      /* Soft white */
--color-text-secondary: #8888aa    /* Muted text */
--color-border: rgba(108,99,255,0.15) /* Subtle glowing border */
--gradient-hero: linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%)
--gradient-card: linear-gradient(145deg, rgba(108,99,255,0.08), rgba(0,212,255,0.04))
```

### Typography Scale
- **Display (H1):** Clash Display, 72px desktop / 40px mobile, weight 700
- **Heading (H2):** Syne, 48px / 28px, weight 600
- **Subheading (H3):** Inter, 24px / 18px, weight 600
- **Body:** Inter, 16px / 15px, weight 400, line-height 1.7
- **Caption:** Inter, 13px, weight 400, muted color

### Visual Language
- **Glassmorphism cards:** `backdrop-filter: blur(20px)`, semi-transparent borders with glow
- **Glow effects:** Box shadows using accent colors at 20-40% opacity
- **Grain texture overlay:** Subtle noise texture on hero (CSS or SVG filter)
- **Animated gradients:** Slow-moving aurora-like background gradients
- **Micro-interactions:** Every button, card, link has hover/focus state with smooth transition
- **Scroll-triggered animations:** Elements fade+slide in as they enter viewport (GSAP ScrollTrigger)
- **Custom cursor:** On desktop, replace default cursor with a small glowing dot that reacts to hover states

---

## 📱 MOBILE-FIRST CRITICAL RULES

> **90% of visitors are on mobile (Turkmenistan market). Mobile is the PRIMARY design target.**

1. **Viewport meta:** `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">` — This ensures the site renders at 1:1 on mobile without zoom issues.
2. **Base font size:** 16px minimum on mobile. Never smaller.
3. **Touch targets:** All buttons/links minimum 44×44px tap area.
4. **Padding:** Minimum `px-5` (20px) horizontal padding on all mobile sections.
5. **Floating scene (Hero):** On mobile, use a lighter Canvas/CSS animation (no heavy Three.js), use CSS-only particle or gradient orb animation to maintain 60fps.
6. **AI Assistant bubble:** Fixed bottom-right, 56px diameter on mobile, with safe-area insets respected (`padding-bottom: env(safe-area-inset-bottom)`).
7. **Navigation:** Full-screen overlay menu on mobile with smooth slide animation.
8. **Cards:** Single column on mobile, 2-col on tablet, 3-col on desktop.
9. **Hero text:** Ensure no text overflow. Use `clamp()` for fluid type sizing.
10. **Performance:** Lazy-load all images, use `next/image`, preload critical fonts.

---

## 🏗️ SECTIONS — DETAILED SPECIFICATION

---

### 1. NAVIGATION
- Fixed top, blur background on scroll (`backdrop-filter: blur(16px)`)
- Logo (web-logo.png) left side — height 36px
- Links: Services, Pricing, Tech Stack, Portfolio (placeholder), Contact
- CTA button: "Get a Free Quote" — gradient fill, rounded, with subtle glow
- Mobile: hamburger → full-screen overlay with staggered link animation
- On scroll past 50px: add subtle border-bottom with glow

---

### 2. HERO SECTION — PSYCHOLOGICAL FIRST IMPRESSION

This is the most important section. The visitor must feel: *"These people are on another level."*

**Layout:** Full viewport height (`100svh`). Split layout on desktop (text left, 3D scene right). Stacked on mobile (scene above, text below or overlapping with text on top of scene).

**Headline (desktop):**
```
We Don't Build Websites.
We Build Digital Empires.
```
*Animated: each word fades/slides in with stagger. "Digital Empires" has gradient text effect (violet→cyan).*

**Subheadline:**
```
Zymer crafts high-performance, visually breathtaking web experiences
for businesses ready to dominate their market — globally.
```

**CTA Buttons:**
- Primary: "Start Your Project" → smooth scroll to #contact (gradient bg, glow, scale on hover)
- Secondary: "See Our Packages" → smooth scroll to #pricing (ghost button, border glow)

**Social Proof Strip** (below CTAs):
```
✦ 50+ Projects Delivered  ✦ 20+ Countries  ✦ 4.9★ Client Rating  ✦ 48h Response
```
Animated horizontal marquee, subtle, small text.

**Floating Hero Scene (RIGHT SIDE desktop / TOP mobile):**

Build a visually stunning animated canvas scene. Choose the best option:

**Option A (Three.js — desktop only):**
- Floating geometric shapes (icosahedron, torus, sphere) made of wireframe/holographic material
- Slow rotation and bobbing animation
- Particle field background
- Mouse parallax: shapes subtly respond to mouse movement

**Option B (CSS/Framer Motion — mobile + desktop fallback):**
- Large glowing gradient orbs with blur, floating with `@keyframes` animation
- Layered depth with multiple orbs at different speeds and opacity
- Glassmorphism card elements floating (small mockup "browser window" cards, code snippet cards, stat cards like "↑ 340% Traffic") with subtle drop shadows
- All elements have gentle bobbing and rotating animations

**Requirement:** Must be VISUALLY STUNNING and completely original. Do not use stock animations. Think of the hero visuals on Linear.app, Vercel.com, or Framer.com — then exceed them.

---

### 3. FLOATING SCENE WIDGET (Bottom-Left Corner — SEPARATE from Hero)

A persistent floating widget visible throughout the entire site scroll, positioned `fixed bottom-6 left-6`.

**Contains two alternating cards that auto-rotate every 5 seconds:**

**Card 1 — Client Testimonial:**
```
Glassmorphism card, 280px wide, subtle glow border
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⭐⭐⭐⭐⭐
"Zymer transformed our brand online.
Sales up 3x in 2 months."
— Rustam A., CEO at TeknoMart
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Card 2 — Tech Stack Badge:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Built With Elite Technology
[Next.js] [React] [Three.js]
[Tailwind] [TypeScript] [GSAP]
"The same stack as Netflix & Airbnb"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Transition between cards: smooth fade + scale. On mobile, make cards smaller (240px).

---

### 4. SERVICES SECTION (`#services`)

**Section title:** "What We Build"
**Subtitle:** "Every project is a statement. Here's how we make yours impossible to ignore."

**8 Service Cards** (grid: 4 col desktop, 2 col tablet, 1 col mobile):

Each card has:
- Icon (Lucide or custom SVG, glow-colored)
- Title
- Description (2-3 lines, psychologically persuasive)
- Hover: card lifts, glow intensifies, icon animates

Services:
1. **Landing Pages** — "One page. One goal. Infinite conversions. We build landing pages that make visitors say yes before they reach the bottom."
2. **Business Websites** — "Your digital headquarters. Professional, fast, and built to establish authority in any market."
3. **E-Commerce Stores** — "Storefronts engineered to sell. Every element designed to reduce friction and maximize revenue."
4. **SaaS Dashboards** — "Complex interfaces made elegant. We turn powerful features into intuitive experiences."
5. **Portfolio & Personal Brand** — "Your story, told beautifully. Stand out in a world drowning in mediocrity."
6. **Web Applications** — "From idea to working product. Full-stack applications built for scale and speed."
7. **UI/UX Redesign** — "Old site killing your conversions? We rebuild it into something that actually performs."
8. **API Integration & Automation** — "Connect your tools, automate your workflows, and free your team to focus on what matters."

---

### 5. PRICING SECTION (`#pricing`)

**Section title:** "Investment, Not Cost"
**Subtitle:** "Every package is priced to deliver returns that dwarf the investment. Choose your level of ambition."

**3 Pricing Tiers** displayed as premium cards. Middle card (Growth) should be highlighted/featured with a "Most Popular" badge and stronger glow.

---

**TIER 1 — STARTER**
- Price: `$699` (starting from)
- Badge: "Best for New Businesses"
- Tagline: *"Your first serious step into the digital world."*

**Design Styles Included:**
  - Minimalist Clean
  - Corporate Professional
  - Modern Flat

**Features:**
  - Up to 5 pages
  - Mobile-responsive design
  - Basic SEO setup
  - Contact form integration
  - 1 round of revisions
  - Deployment & hosting setup
  - 30-day post-launch support
  - Basic analytics integration
  - Delivery: 7–10 business days

---

**TIER 2 — GROWTH** ⭐ Featured
- Price: `$1,199` (starting from)
- Badge: "Most Popular"
- Tagline: *"For businesses serious about dominating their niche."*

**Design Styles Included:**
  - Glassmorphism / Dark Premium
  - Bold Editorial
  - Vibrant & Energetic
  - Luxury & High-End

**Features:**
  - Up to 12 pages
  - Advanced animations & micro-interactions
  - Full mobile & tablet optimization
  - Advanced SEO + meta optimization
  - AI Chatbot integration (Groq-powered)
  - Multi-language support (optional)
  - Custom contact & lead forms
  - Telegram / WhatsApp notification integration
  - Social media links & tracking
  - 3 rounds of revisions
  - 60-day post-launch support
  - Analytics dashboard
  - Delivery: 10–14 business days

---

**TIER 3 — ENTERPRISE**
- Price: `Custom Pricing`
- Badge: "For Ambitious Brands"
- Tagline: *"Multi-server, full-scale digital ecosystems. No limits, no compromises."*

**Design Styles Included:**
  - All styles from previous tiers
  - Avant-Garde / Experimental
  - 3D Interactive
  - Fully Custom Bespoke

**Features:**
  - Unlimited pages
  - Custom 3D scenes & WebGL experiences
  - Full-stack web application development
  - E-commerce with payment integration
  - Multi-region server deployment
  - Dedicated project manager
  - Weekly progress calls
  - Priority support (24/7)
  - Custom CMS integration
  - Unlimited revisions
  - 6-month post-launch support
  - Full documentation
  - Delivery: Custom timeline

**CTA for Enterprise:** "Let's Talk" button → scrolls to contact form.

---

**DESIGN STYLES MODAL / EXPANDABLE SECTION:**

Below the pricing cards, add an expandable section titled **"Choose Your Visual Style"**.

Show 7 design style cards, each with:
- Style name + icon
- 3-line description
- Which tier it's available in
- Example aesthetic keywords (e.g., *"Clean lines, white space, Swiss typography"*)
- Hover reveals a color palette swatch

Styles:
1. **Minimalist Clean** — "Less is more. Pure whitespace, sharp typography, and content that breathes."
2. **Corporate Professional** — "Trusted, structured, authoritative. Built to win enterprise clients."
3. **Modern Flat** — "Contemporary and approachable. Bright colors, geometric shapes, zero decoration."
4. **Glassmorphism Dark Premium** — "The future aesthetic. Frosted glass, neon glows, deep space backgrounds."
5. **Bold Editorial** — "Oversized type, raw energy, magazine-grade layout. You won't be ignored."
6. **Luxury High-End** — "Gold accents, serif fonts, silk-smooth animations. For brands that charge premium."
7. **3D Interactive Experimental** — "Three.js, WebGL, particle systems. For those who want to break the internet."

---

### 6. TESTIMONIALS (Inside Floating Widget + Dedicated Section)

**Section title:** "What Our Clients Say"
**Subtitle:** "Results don't lie. Neither do our clients."

**6 Testimonials** (auto-playing horizontal carousel on mobile, 3-column grid on desktop):

Craft emotionally resonant, believable testimonials:

1. **Aziz M., Founder — NovaTech Solutions (UAE)**
   ⭐⭐⭐⭐⭐
   *"I've worked with agencies in Dubai and London. Zymer is on another level. They delivered in 9 days what others quoted 2 months for. The site converts like crazy."*

2. **Elena K., CMO — FreshMart (Kazakhstan)**
   ⭐⭐⭐⭐⭐
   *"Our bounce rate dropped 60% after the redesign. Zymer didn't just build a website — they built a sales machine. Worth every cent of the $1,200 investment."*

3. **Murad B., CEO — LogiChain Ltd (Turkey)**
   ⭐⭐⭐⭐⭐
   *"The attention to detail is insane. Every animation, every word placement — you can tell these people think deeply about what they're building. Truly world-class."*

4. **Sara J., Director — PulseMedia (Germany)**
   ⭐⭐⭐⭐⭐
   *"I was skeptical about an agency I found online. Within 10 minutes of seeing their work I was sold. Three months later, our site is generating 4x more leads. Zero regrets."*

5. **Timur N., Entrepreneur (Turkmenistan)**
   ⭐⭐⭐⭐⭐
   *"Zymer is the first agency that actually listened. They asked smart questions and came back with something that blew my expectations. The mobile design is perfect."*

6. **Priya S., Founder — OrionSoft (India)**
   ⭐⭐⭐⭐⭐
   *"Professional, fast, and brutally talented. I gave them a rough idea on Monday. By Thursday I had a live site that made my investors say 'wow'. Highly recommended."*

Each testimonial card: glassmorphism style, avatar initials circle, star rating, quote, name + company + country flag emoji.

---

### 7. TECH STACK SECTION

**Section title:** "Built With Elite Technology"
**Subtitle:** "The same tools that power the world's most loved digital products."

Display technology logos in an animated infinite horizontal scroll (marquee):
Next.js, React, TypeScript, Tailwind CSS, GSAP, Three.js, Framer Motion, Node.js, PostgreSQL, Supabase, Vercel, Groq AI, Stripe, Figma, Cloudflare, Docker

Two rows scrolling in opposite directions (row 1 → left, row 2 → right).

Below the marquee, add 3 stat cards:
- **99.9%** Uptime guaranteed
- **< 1s** Average load time
- **100/100** Lighthouse score target

---

### 8. WHY ZYMER SECTION

**Section title:** "Why Brands Choose Zymer"
**Subtitle:** "There are thousands of web agencies. Here's why the serious ones choose us."

**6 Feature blocks** (alternating layout — icon+text left, then right):

1. **Global Standard, Local Understanding** — "We operate at international standards while deeply understanding Central Asian and emerging markets. Your site speaks to your audience in every language — visually and emotionally."

2. **Speed Without Sacrifice** — "Most agencies take months. We deliver in days. Not because we cut corners — but because our process is engineered for excellence at velocity."

3. **Psychology-Driven Design** — "Every color, every word, every scroll animation is chosen based on conversion psychology. We don't just make things pretty. We make them persuasive."

4. **Transparent, No-Surprise Pricing** — "Our packages are clear. Our communication is direct. You always know what you're getting, when you're getting it, and why."

5. **Lifetime Technical Partnership** — "We don't disappear after launch. We're your technical partners. Got a question at 2am? Our AI assistant never sleeps."

6. **Built to Rank & Convert** — "Beautiful and functional is the baseline. Every site is SEO-optimized, performance-tuned, and analytically wired from day one."

---

### 9. CONTACT / ORDER SECTION (`#contact`)

**Section title:** "Let's Build Something Remarkable"
**Subtitle:** "Fill out the form below and expect a personal response within 6 hours. We take every project seriously."

**Form Fields:**

REQUIRED fields:
- **Full Name** (text input) — placeholder: "Your full name"
- **Business Name** (text input) — placeholder: "Your company or project name"
- **Phone Number** (tel input with country code selector) — placeholder: "+993 XX XXX XXX"
- **Email Address** (email input) — placeholder: "you@company.com"
- **Select Package** (styled select/radio group):
  - [ ] Starter — from $699
  - [ ] Growth — from $1,199
  - [ ] Enterprise — Custom pricing
- **Preferred Design Style** (visual selector with style name + icon, multi-select allowed)
- **Your Message** (textarea, 5 rows) — placeholder: "Tell us about your project, your goals, and any specific requirements..."

OPTIONAL fields (clearly marked "Optional"):
- **Website URL** (if they have an existing site) — placeholder: "https://yoursite.com"
- **Budget Range** (select): Under $700 / $700–$1,200 / $1,200–$3,000 / $3,000+
- **Deadline** (date picker or select): ASAP / 1 week / 2 weeks / 1 month / Flexible
- **How did you find us?** (select): Google / Social Media / Friend Referral / Telegram / Other

**Submit Button:**
- Full-width on mobile
- Text: "Send My Project Brief →"
- Gradient background (violet→cyan)
- On hover: scale up slightly, glow intensifies
- On click: show loading spinner with "Sending..." text
- On success: replace form with a beautiful success state:

```
✅ SUCCESS CARD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Your brief has been received!

Thank you, {firstName}! We've received your project
details and our team will personally review it.

⏱ You'll hear from us within 6 hours.

In the meantime, feel free to reach out via:
[Telegram button] [Email button]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

On form submission:
1. Validate all required fields with Zod (show inline errors, not alerts)
2. POST to `/api/contact` with `type: 'form_submission'`
3. Server sends Telegram message to both user IDs
4. Return success/error response to client

---

### 10. AI ASSISTANT

**Icon:** Use `ai-assistant-icon.png`
**Position:** Fixed `bottom-6 right-6` (mobile) / `bottom-8 right-8` (desktop)
**Size:** 56px diameter button with glow ring animation

**Idle Trigger Logic:**
- Track user inactivity with `useIdleDetect` hook
- After **30 seconds** of no interaction (no mouse move, no scroll, no click, no keypress):
- Animate a speech bubble appearing above the assistant icon
- Bubble content (rotate through these randomly):
  - "👋 Need help choosing a plan?"
  - "💡 Got questions? I'm here!"
  - "🚀 Ready to start your project?"
  - "✨ Want to see examples of our work?"
- Bubble animation: scale from 0 + fade in, with a small bounce
- Dismiss: clicking anywhere on page dismisses bubble (but doesn't open chat)

**Chat Window:**
- Slides up from bottom-right (Framer Motion spring animation)
- Width: 360px desktop / full-width mobile (bottom sheet)
- Header: Zymer logo + "Zymer Assistant" + online indicator (green dot) + close button
- Messages area: scrollable, with typing indicator (3 bouncing dots) while waiting for response
- Input: text field + send button
- Streaming responses (use `ReadableStream` from API route)
- First message auto-sent when chat opens: *"Hi! 👋 I'm Zymer's AI assistant. I can help you choose the right package, answer questions about our process, or just chat about your project idea. What brings you here today?"*

**Analytics:** Every AI message (user or assistant) fires analytics event to Telegram.

---

### 11. ANALYTICS TRACKING

Create `useAnalytics` hook and fire events to `/api/contact` for:

| Event | Trigger |
|-------|---------|
| `page_view` | On initial load |
| `section_view` | When section enters viewport (IntersectionObserver) |
| `cta_click` | Any CTA button click |
| `social_click` | Telegram/TikTok/Instagram icon clicks |
| `ai_chat_open` | AI chat window opened |
| `ai_chat_message` | Each message sent |
| `idle_trigger` | Idle bubble shown |
| `pricing_hover` | Hovering over pricing card |
| `form_start` | First field focused |
| `form_submit` | Form submitted |
| `form_success` | Successful submission |

Each event payload includes: `sessionId` (generated once per session, stored in `sessionStorage`), `timestamp`, `userAgent`, `referrer`, and event-specific data.

All events are sent as non-blocking background requests (use `navigator.sendBeacon` where possible, fallback to `fetch` with `keepalive: true`).

---

### 12. FOOTER

Split into 3 columns (stacked on mobile):

**Column 1:**
- Zymer logo (web-logo.png)
- Tagline: "Building digital empires since 2024."
- Social icons (Telegram, TikTok, Instagram) — clicking fires `social_click` analytics event
- Copyright: © 2024 Zymer. All rights reserved.

**Column 2 — Navigation:**
- Services
- Pricing
- Tech Stack
- Contact

**Column 3 — Contact:**
- Telegram: @zymer (link)
- Email: hello@zymer.com
- Response time: Within 6 hours

**Bottom bar:** 
```
Designed & built with obsession. Powered by cutting-edge technology.
```

---

## 🤖 AI ASSISTANT DETAILED IMPLEMENTATION

```typescript
// /api/chat/route.ts
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are Zymer's AI assistant. Zymer is a premium global web development agency that builds world-class websites for businesses. 

Services: Landing pages, business websites, e-commerce, SaaS dashboards, web apps, UI/UX redesign, API integrations.

Pricing:
- Starter: from $699 (up to 5 pages, basic SEO, contact form, 30-day support)
- Growth: from $1,199 (up to 12 pages, animations, AI chatbot, SEO, 60-day support)  
- Enterprise: Custom pricing (unlimited, full-stack, multi-server, 6-month support)

Process: Client fills contact form → response within 6 hours → project kickoff → delivery in 7–21 days.

Your personality: Warm, confident, knowledgeable, briefly witty. Never salesy or pushy. Help the user find the right solution for their needs. Always guide conversations toward booking a consultation via the contact form. Respond in English. Keep responses to 2-4 sentences unless more detail is needed.`

export async function POST(request: Request) {
  const { messages, sessionId } = await request.json()
  
  const stream = groq.chat.completions.stream({
    model: 'llama3-70b-8192',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ],
    stream: true,
    max_tokens: 400,
  })

  return new Response(stream.toReadableStream())
}
```

---

## 📊 TELEGRAM BOT IMPLEMENTATION

```typescript
// /lib/telegram.ts
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

export async function sendTelegramMessage(text: string) {
  const userIds = [
    process.env.TELEGRAM_USER_ID_1,
    process.env.TELEGRAM_USER_ID_2,
  ].filter(Boolean)

  await Promise.all(
    userIds.map(chatId =>
      fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      })
    )
  )
}

export function formatLeadMessage(data: any): string {
  return `🚀 <b>NEW LEAD — ZYMER</b>

👤 <b>Name:</b> ${data.name}
🏢 <b>Business:</b> ${data.businessName}
📞 <b>Phone:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}

📦 <b>Package:</b> ${data.plan}
🎨 <b>Design Style:</b> ${data.designStyle}
💬 <b>Message:</b> ${data.message}

${data.website ? `🌐 <b>Current Site:</b> ${data.website}` : ''}
${data.budget ? `💰 <b>Budget:</b> ${data.budget}` : ''}
${data.deadline ? `⏱ <b>Deadline:</b> ${data.deadline}` : ''}
${data.source ? `📣 <b>Found us via:</b> ${data.source}` : ''}

🕐 <b>Submitted:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ashgabat' })}
🔗 <b>Session:</b> <code>${data.sessionId}</code>`
}

export function formatAnalyticsMessage(event: any): string {
  return `📊 <b>ANALYTICS — ZYMER</b>

🔔 <b>Event:</b> ${event.type}
⏱ <b>Time:</b> ${new Date(event.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Ashgabat' })}
📱 <b>Session:</b> <code>${event.sessionId}</code>
📋 <b>Details:</b> <pre>${JSON.stringify(event.data, null, 2)}</pre>`
}
```

---

## 🚀 PERFORMANCE REQUIREMENTS

- Lighthouse Performance score: **90+** on mobile
- Lighthouse Accessibility: **95+**
- Core Web Vitals: All green
- First Contentful Paint: < 1.5s
- Total Blocking Time: < 200ms
- Images: All via `next/image` with proper sizes and formats (WebP)
- Fonts: Preloaded, `font-display: swap`
- CSS: No unused styles (Tailwind purge)
- JS: Code-split by route, lazy-load heavy components (Three.js, GSAP)
- No layout shift (CLS = 0)

---

## 📝 COPY GUIDELINES

Every piece of text on the site must follow these principles:

1. **Power words first** — "Transform", "Dominate", "Ignite", "Unleash", "Elite", "World-class"
2. **Specificity over vagueness** — "340% traffic increase" not "significant growth"
3. **Address the fear** — "No more embarrassing websites that lose clients at first glance"
4. **Social proof always nearby** — Every section should hint at proven results
5. **Global + trustworthy** — Mention international clients, countries, global standards
6. **Emotional urgency** — "Every day without the right website is a day your competitors are winning"
7. **No jargon without explanation** — Technical terms always followed by benefit
8. **Second person** — Address the visitor as "you" / "your business"

---

## 🗂️ VERCEL DEPLOYMENT CONFIG

```json
// vercel.json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## ✅ QUALITY CHECKLIST (Verify before considering complete)

Before calling this project "done", verify every item:

- [ ] All env variables referenced in code exist in `.env.example`
- [ ] No API keys hardcoded anywhere in source
- [ ] Telegram messages send to BOTH user IDs simultaneously
- [ ] AI chat streams properly and shows typing indicator
- [ ] Idle detection fires at 30 seconds and shows bubble
- [ ] All analytics events fire and arrive in Telegram
- [ ] Contact form validates all required fields with inline error messages
- [ ] Success state shows after form submission
- [ ] All images use `next/image`
- [ ] Mobile layout tested at 375px, 390px, 414px widths
- [ ] No horizontal scroll on mobile
- [ ] All buttons have hover AND active states
- [ ] Smooth scroll for all anchor links
- [ ] Custom cursor works on desktop only (hidden on touch devices)
- [ ] Three.js / canvas scene falls back gracefully on low-end devices
- [ ] `robots.txt` and `sitemap.xml` generated
- [ ] `favicon.ico` set from web-logo-2.png
- [ ] `og:image` meta tag set for social sharing
- [ ] Page title and meta description set
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] Build succeeds (`next build` with no errors)
- [ ] All links work (no 404s)
- [ ] Pricing toggle works smoothly
- [ ] Design style selector is interactive and beautiful
- [ ] Footer social icons are clickable and fire analytics
- [ ] Site works without JavaScript (basic content visible)

---

## 🔥 FINAL INSTRUCTION TO AI AGENT

**Read this entire prompt before writing a single line of code.**

Then:
1. Plan your component tree
2. Set up the project structure
3. Build in this order: Layout → Hero → Navigation → Services → Pricing → Testimonials → Contact → AI Assistant → Analytics → Footer
4. Test each component before moving to the next
5. Run full mobile test at end
6. Verify all environment variables are wired correctly
7. Run `next build` and fix all errors before finishing

**This website is the face of a web development business. It must be flawless. It must be extraordinary. It must make visitors feel that hiring Zymer is the most obvious decision they could make.**

Make every senior developer who looks at this code nod in respect. Make every visitor who opens this site feel they've discovered something exceptional.

**Now build it. 🚀**
