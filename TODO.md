# TODO

Deferred work. Add an entry the moment something is put off — see the working
rules in `CLAUDE.md`.

## Blocked on the user

- **Brand palette.** The theme is still shadcn's neutral `base-nova` default.
  Three colours are owed (primary, secondary, tertiary) before any UI work.
  The SERBIZ logo and flyers in `references/Images/` read as deep green, orange
  and light green. Applies to the `:root` and `.dark` blocks in
  `app/globals.css`.
- **Page designs.** Home, about, services, why us, FAQs and contact are
  placeholders. Sections get built under `modules/landing/` and
  `modules/site/`, not inline in a page.
- **Claude Design authorization.** Importing a layout needs `DesignSync`, which
  needs design-system access this session cannot grant. Run `/design-login`
  once from an interactive `claude` terminal on this machine; headless sessions
  then reuse it. Blocking the v1 import from
  `claude.ai/design/p/bbfa7f03-12da-4e2d-b9bd-9889096c1191`.
- **v2 and v3 designs.** Only `serbiz-v1-classic.html` exists so far. Their
  routes and modules get created when their designs land, not before.

## Three-layout preview (decided 2026-09-12)

The client picks one of three presentations of the same content.

- **Three URL prefixes.** `/v1`, `/v2`, `/v3`, each with its own shell,
  sections and theme tokens, all live at once so one link compares them.
  Variant sections live in `modules/v1-classic/` and siblings.
- **One content layer.** All three read the same organisation facts from
  `lib/site-config.ts`. A variant changes presentation, never the facts.
- **Preview routes are `noindex`** and stay out of `app/sitemap.ts` until the
  client chooses. Three near-duplicate copies of one company must not be
  indexed.
- **On selection:** the winning variant is promoted to `/`, the losing routes
  and modules are deleted, and the sitemap plus indexing rules are restored.

## Housekeeping

- **Repository name spelling.** The remote is `msforbes09/serviz-website` while
  the brand, the package name and every string in `lib/site-config.ts` are
  SERBIZ with a b. Rename the repository if that was a typo; ignore this entry
  if it was deliberate.
- **Repository is public.** Nothing sensitive is committed today, but the
  contact form work will introduce a destination and possibly a key — those go
  in `.env`, never in the tree.

## Queued

- **Contact form.** Needs a destination decided (email, webhook or inbox) and
  a rate-limit key before the server action is written. Covered by the security
  self-review checklist in `CLAUDE.md`.
- **Organization JSON-LD.** `lib/site-config.ts` already holds the legal name,
  contact points, mission and vision. Ship structured data with the real home
  page, using an escaping serializer rather than bare `JSON.stringify`.
- **Sitemap entries.** `app/sitemap.ts` lists only the home page. Every new
  public route is added there in the same change.
- **Shared UI blocks.** `AppFormField`, `PageHeader` and `EmptyState` are not
  built yet. Add each one when the first real use appears, not before.
