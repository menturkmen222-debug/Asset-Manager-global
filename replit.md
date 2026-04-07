# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### Zymer — Premium Web Agency (`artifacts/zymer`)
- React + Vite + TypeScript frontend
- URL: `/` (root)
- Full premium agency landing page with dark space/glassmorphism theme
- Features: animated hero with floating cards, services grid, pricing tiers, testimonials carousel, tech stack marquee, contact form, AI chat assistant
- AI chat uses Groq API (llama3-70b-8192) — requires `GROQ_API_KEY` secret
- Lead notifications via Telegram — requires `TELEGRAM_BOT_TOKEN`, `TELEGRAM_USER_ID_1`, `TELEGRAM_USER_ID_2`
- Analytics events sent to `/api/contact`
- Components: Nav, Hero, FloatingWidget, Services, Pricing, Testimonials, TechStack, WhyZymer, Contact, AIAssistant, Footer
- Design: dark premium (#6c63ff violet + #00c4f0 cyan palette), `.glass` glassmorphism, `.gradient-text`, `.section-badge` utility
- Typography: Syne (display), Inter (body), Menlo (mono)
- Hero: 2-column grid — left has trust badge, animated headline with gradient, checkpoints, CTAs, marquee ticker; right has floating glass cards (code snippet, traffic stat, speed score, lead notification)
- FloatingWidget: fixed bottom-left rotating testimonial/tech card
- All sections have `.section-badge` pill labels above headings

### API Server (`artifacts/api-server`)
- Express 5 backend
- URL: `/api`
- Routes:
  - `POST /api/chat` — Groq AI streaming chat proxy
  - `POST /api/contact` — Lead form submissions + analytics events → Telegram
  - `GET /api/healthz` — Health check

## Environment Secrets Required
- `GROQ_API_KEY` — for AI chat assistant
- `TELEGRAM_BOT_TOKEN` — for Telegram notifications
- `TELEGRAM_USER_ID_1` — first Telegram user to receive notifications
- `TELEGRAM_USER_ID_2` — second Telegram user to receive notifications

## Migration Notes (Vercel → Replit)
- Migrated from Vercel (serverless functions in `/api/`) to Replit (pnpm monorepo)
- Vercel serverless functions (`/api/contact.ts`, `/api/chat.ts`) replaced by Express routes in `artifacts/api-server`
- Vite dev server proxies `/api/*` to Express server on port 8080 (see `artifacts/zymer/vite.config.ts`)
- In production, path-based routing handles `/api` → Express server, `/` → Vite static build
- `vercel.json` retained for reference but not used

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
