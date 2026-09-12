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
- **Claude Design authorization.** Importing any layout needs `DesignSync`,
  which needs design-system access this session cannot grant. Run
  `/design-login` once from an interactive `claude` terminal on this machine;
  headless sessions then reuse it. This one step blocks all three imports
  below.

## Three-layout preview (decided 2026-09-12)

The client picks one of three presentations of the same content.

- **Three unguessable URLs**, one per layout, each with its own shell, sections
  and theme tokens. Variant sections live in `modules/v1-classic/` and siblings;
  the registry in `modules/previews/lib/variants.ts` maps slug to layout.

  | Layout | Send the client |
  | --- | --- |
  | v1 Classic | `/8sfz8dn5ts` |
  | v2 Warm editorial | `/u2feptyuzu` |
  | v3 Structured navy | `/4sjhdc5awq` |

  Random rather than `/v1`–`/v3` so that seeing one preview never reveals the
  others, and so no layout arrives pre-labelled as a first or second attempt.
  Nothing on a preview links to another one.

- **Our own index:** `/m796ajxcp5` lists all three. Not for the client, which
  is why it carries a random slug too — a memorable path would be trivial to
  stumble onto and would show every layout at once. Worth bookmarking.
- **One content layer.** All three read the same organisation facts from
  `lib/site-config.ts`. A variant changes presentation, never the facts.
- **Preview routes are `noindex`** and stay out of `app/sitemap.ts` until the
  client chooses. Three near-duplicate copies of one company must not be
  indexed.
- **On selection:** the winning variant is promoted to `/`, the losing routes
  and modules are deleted, and the sitemap plus indexing rules are restored.
  For v3 that means setting `basePath` in its content module to an empty
  string; the slug appears nowhere else in the code.

### Design sources

Each variant comes from its own Claude Design project. All three are pending
the authorization above.

| Variant | Project | Entry file |
| --- | --- | --- |
| v1 classic | `bbfa7f03-12da-4e2d-b9bd-9889096c1191` | `serbiz-v1-classic.html` |
| v2 | `1cc64fb6-af8e-4f02-ab35-8987bc1d1b7a` | `Serbiz Landing.dc.html` |
| v3 | `79aa69fa-d24c-4f4f-b180-30c5ecda6830` | `Serbiz Landing Page v4.dc.html` |

Files the entry pages import, which must come across with them:

- **v2** — `support.js`, `uploads/Firefly_RemoveBackground.png`.
- **v3** — `support.js`, `image-slot.js`, and under `assets/`:
  `logo-mark.png`, `logo-wordmark.png`, `permit-bir.jpg`, `permit-cda.jpg`,
  `permit-pasig.jpg`.

All three are built. Imported markup was a reference, not the deliverable:
each variant is Server Components under `modules/<variant>/`, and the
`.dc.html` runtime helpers do not ship.

### Assets still needed

These exceed the design API's 256 KiB per-file read limit, so they cannot be
pulled automatically. Export them from Claude Design and drop them in:

| Put here | From project | Files |
| --- | --- | --- |
| `public/designs/v1/` | `bbfa7f03…` `assets/` | `logo-full.jpg`, `office.jpg`, `tower.jpg`, `cert-bir.jpg`, `cert-cda.jpg`, `cert-pasig.jpg`, `ill-tax.jpg`, `ill-portal.jpg`, `ill-books.jpg`, `ill-time.jpg` |
| `public/designs/v3/` | `79aa69fa…` `assets/` | `permit-bir.jpg`, `permit-cda.jpg`, `permit-pasig.jpg` |

Nothing 404s in the meantime. The news thumbnails and the office tower now
point at the self-hosted stock photos, and the six certificate slots render a
labelled "scan to follow" card.

The certificates deliberately do **not** get a stock photo. A photograph of
some unrelated official document, sitting under a caption reading "BIR
Certificate of Registration", reads as that certificate — and placeholders have
a way of surviving to launch. Restoring a real scan is a one-line change: drop
the file in and set `src` / `image` back from `null` to its path.

### Client sign-off checklist

Nothing below is confirmed by the print material in `references/Images/`. Get
each one approved before any of this is public.

- **Office address** — 18 Philam Rd., Brgy. Kapitolyo, Pasig City 1600.
- **Office hours** — Mon–Fri, 9:00 AM – 6:00 PM.
- **Facebook page** — facebook.com/SerbizWorkersCoop.
- **CDA registration number** — 9520-10130003 1448, issued 1 February 2021. A
  registration number printed on a public page is worth checking twice.
- **Every news item and event.** All three variants carry dated posts the
  design invented: an IT consulting launch, a free BIR clinic, a fifth
  anniversary, a permit renewal drive, an annual general assembly, and a
  recurring monthly deadline calendar. None came from the cooperative.
- **Promises of service levels** — "we reply within one working day", "a
  written quote within three working days", "from first call to first payslip
  in under two weeks", "first consultation is free".
- **Claims about the team** — that members are women professionals, that
  clients have 1–80 employees, that a non-disclosure agreement is signed at
  engagement.
- **Permit scans.** The v3 and v1 permits sections show photographs of real
  registration documents, which normally carry registration numbers and
  signatures. Confirm the client wants them public.
- **Stock photography.** Every photograph is an Unsplash placeholder showing
  people who do not work at SERBIZ. Replace with real photos before launch.

## Housekeeping

- **Tests run inside the Vercel build.** `prebuild` chains lint and the test
  suite ahead of `next build`, so a test-environment quirk fails a deployment
  rather than a CI job. That is what broke the first deploy. Moving both into a
  GitHub Actions workflow, and leaving `build` as just `next build`, would
  decouple them.

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
