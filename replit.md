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
- Full premium agency landing page with dark space theme
- Features: animated hero, services, pricing, testimonials, tech stack, contact form, AI chat assistant
- AI chat uses Groq API (llama3-70b-8192) — requires `GROQ_API_KEY` secret
- Lead notifications via Telegram — requires `TELEGRAM_BOT_TOKEN`, `TELEGRAM_USER_ID_1`, `TELEGRAM_USER_ID_2`
- Analytics events sent to `/api/contact`
- Components: Nav, Hero, FloatingWidget, Services, Pricing, Testimonials, TechStack, WhyZymer, Contact, AIAssistant, Footer

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

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
