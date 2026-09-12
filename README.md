# SERBIZ Website

Marketing site for **SERBIZ Resources Income Workers Cooperative (SRI)**, a payroll
and accounting outsourcing cooperative serving sole proprietors, one person
corporations and SMEs in the Philippines.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Lints, tests, then builds for production |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |

## Status

Scaffold stage. The shell, boundaries, SEO routes and test harness are in place;
page content and the visual theme are pending design. Brand source material is
in `references/Images/`.

Architecture and conventions for this repo are documented in `CLAUDE.md`.
