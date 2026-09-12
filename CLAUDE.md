# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: this is Next.js 16, not the Next.js you were trained on

APIs, conventions and file structure differ from training data. Before writing anything that touches routing, data fetching, caching or rendering, read the relevant guide under `node_modules/next/dist/docs/01-app/`. Trust deprecation notices in those docs over prior Next.js knowledge.

Two things that bite immediately in this repo:

- **Cache Components (PPR) is on** (`cacheComponents: true` in `next.config.ts`). Unstable values break the prerender. `new Date()` in a Server Component fails the build — see `components/layout/site-footer.tsx` for the `"use cache"` + `cacheLife` fix.
- **shadcn/ui here is built on Base UI, not Radix.** Composition uses `render={<Link href="/" />}`, *not* `asChild`. `cn` is imported from the `cn` package via `@/lib/utils`.

## Project

Marketing site for SERBIZ Resources Income Workers Cooperative (SRI), a Philippine payroll and accounting outsourcing cooperative serving sole proprietors, one person corporations and SMEs. Organisation facts (legal name, mission, vision, contact details) live in `lib/site-config.ts` and are transcribed from the print material in `references/Images/` — read from that module, never retype a phone number or address into a component.

**Current state: scaffold.** The shell, route boundaries, SEO routes, env validation and test harness exist. Page content and the visual theme do not. The user will supply designs and a brand palette later; until then the theme is shadcn's neutral `base-nova` default and pages are placeholders that say so. Do not invent a palette or marketing copy without being asked.

Scope decisions already made: public marketing pages only. No auth, no admin area, no backend API client, no database. Content is typed data in the repo.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — runs `lint` and `test` first via `prebuild`, then builds
- `npm run lint` / `npm run typecheck` / `npm run test` / `npm run test:watch`
- Single test file: `npx vitest run lib/env.test.ts`
- Single test by name: `npx vitest run -t "strips a trailing slash"`
- Add UI primitives with `npx shadcn@latest add <component>` rather than hand-rolling them

## Architecture

`app/` is **routes only** — segments plus `page`/`layout`/`loading`/`error`/`not-found`/`route`. Implementation lives elsewhere:

- `modules/<feature>/` — feature code (sections, forms, actions, content data). Pages compose these; they do not contain layout markup of their own.
- `components/ui/` — shadcn primitives, managed by the CLI. `components/layout/` — the site shell.
- `lib/` — cross-cutting helpers. `hooks/`, `types/` — shared client hooks and types.
- `test/setup.ts` — jsdom + Testing Library setup. Tests sit next to the code they cover as `*.test.ts(x)`.

The public shell is the `(site)` route group: `app/(site)/layout.tsx` renders `SiteHeader` and `SiteFooter` around `{children}`. It is a Server Component and must stay one. Every segment carries `loading.tsx` and `error.tsx`.

**Client components only at the leaves.** `"use client"` never goes on a layout, page or section. Extract the interactive piece into a small client component and leave the rest server-rendered so it can prerender.

`lib/env.ts` is the only place `process.env` is read. It parses with Zod, strips the trailing slash off the site URL and throws on malformed input. App code imports `env`. Anything read in the browser must be `NEXT_PUBLIC_`-prefixed and must not be a secret — Next inlines those into the client bundle.

The site URL falls back to Vercel's injected production domain when it is not set explicitly. That fallback reads a server-side variable, which is only safe because `env` is imported by the root layout, sitemap and robots and never by a client component. Importing it into a client component would make the browser and the server disagree.

New public routes must be added to `app/sitemap.ts` in the same change.

## Conventions skill

`.claude/skills/nextjs-conventions/` is the canonical spec for this stack — structure, data fetching, forms, error handling, SEO, accessibility, security, testing, CRUD blueprint. Read the relevant file under its `references/` before writing code in that area. This file summarises; the skill decides. If they disagree, update this file.

Parts of the skill assume a Laravel JSON API, Better Auth and multi-audience sessions. Those do not apply here yet — ignore them unless the project scope changes.

## Stack

Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4 (theme in `app/globals.css` via `@theme inline`, no `tailwind.config.*`) · shadcn/ui on Base UI · Zod · React Hook Form · Motion · Sonner · lodash-es · date-fns · Vitest + Testing Library.

Import named from `lodash-es`, never a default `lodash` import. Use `date-fns` for date work, not raw `Date` arithmetic. Path alias `@/*` maps to the repo root.

`no-console` is an ESLint error. Give a real logger a `files:`-scoped exemption rather than a global allow-list if one becomes necessary.

## Testing

Vitest + Testing Library, jsdom. Test the seams this repo owns — Zod schemas, formatters, content data shape, server-action result mapping, form behaviour. Do not re-test Next.js, Base UI or shadcn.

Follow red → green → refactor: the failing test lands before the implementation.

### Verification baseline

Run before claiming anything works and before every commit. There are no known-failing tests — any red is a real regression.

```bash
npm run lint && npm run typecheck && npm test
```

`npm run build` runs lint and tests first via `prebuild`, so a green build implies all three. Never claim a fix works without having run the command and read the output.

## Working rules

Adapted from the egov-api workspace conventions. These bind the way work is done, not the code itself.

- **Discuss first, no code until "go".** Survey what exists, propose the design with the open questions named, settle them, then wait for the explicit word. Per feature, not per session.
- **Agree the todo list before implementing a batch.** Build it item by item; nothing is added without agreement. Once it is locked and the user says go, run it through to the end.
- **`develop` is the working branch, `main` tracks releases.** All ongoing work targets `develop`. Releases are a `develop` → `main` pull request. Remote is `git@github.com:msforbes09/serviz-website.git`.
- **Feature branches, never a base branch.** Branch off freshly fetched `origin/develop`. Never commit to `develop` or `main` directly. Check `git branch --show-current` before the first commit of every session — landing back on a base branch after a merge is exactly when the mistake happens.
- **Push explicitly the first time.** `git checkout -b <feature> origin/develop` sets the upstream to `origin/develop`, so a bare `git push` would target the base branch. Use `git push -u origin <feature-branch>`.
- **Merging is the user's call**, named per pull request, in the moment. "Proceed until merged" authorises the work up to opening the pull request, not the merge.
- **Never edit `.env` files.** Update `.env.example` and say what to set.
- **Minimal change.** Make the smallest change that delivers the ask. No opportunistic refactors, file moves or "while I'm here" cleanups — propose those separately.
- **Documentation ships with its change.** If a change affects this file, `README.md`, `TODO.md` or a plan, update it in the same commit, not afterwards.
- **Capture deferred work in `TODO.md`** the moment it is deferred — "later", "enhancement", a follow-up a design implies. Nothing put off gets lost.
- **Session notes in `.claude/sessions/YYYY-MM-DD.md`.** Read the newest at session start. At the end of a working session write what shipped, what is pending with enough detail to resume cold, and any environment gotcha.

## Engineering principles

- **KISS** — the most straightforward thing that works. No layers, abstractions or config the problem does not demand.
- **DRY** — extract shared logic; reuse what is already in `lib/`, `components/ui/` and `hooks/` before writing a new helper.
- **YAGNI** — build what the current requirement needs. No speculative props, options or "just in case" flexibility.

## Security self-review

Before opening a pull request, read the diff against this list. It is the egov-api checklist cut down to what a public marketing site actually exposes. If a change introduces a new class of risk, add an item here in the same pull request.

- **An exported server action is a public HTTP endpoint.** Its action ID ships in the client bundle. A public action — the contact form is the obvious one — must validate its input with Zod, rate-limit by a key the caller cannot forge, and escape whatever it echoes back.
- **Never trust a client-settable header** for a rate-limit key or an audit trail. The left-most `x-forwarded-for` entry and `cf-connecting-ip` are caller-supplied.
- **Escape before a `<script>`, sanitize before HTML.** JSON-LD goes through a serializer that escapes `<`, `>` and `&`; any HTML from outside the repo goes through an allow-list sanitizer once, at the source.
- **No credential or personal data reaches a log sink.** Redact at the sink, not at the call sites. Submitted contact details are personal data.
- **Mask upstream failures in production.** A 5xx message may carry internals; show a generic message and log the real one. Development shows everything.
- **Check the secret is not public.** A `NEXT_PUBLIC_` variable is inlined into the browser bundle. Anything sensitive belongs to the server half of `lib/env.ts`.
