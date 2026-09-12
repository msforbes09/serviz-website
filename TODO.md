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

## Found in the v1 review (2026-09-12)

Four things surfaced while summarising the v1 enhancement work. Ordered by when
they start to matter, not by size.

- **No social preview.** Nothing in `app/` sets `openGraph` beyond
  `metadataBase`, and there is no `opengraph-image`. The three preview links are
  about to be sent to the client, and in Messenger, Viber or Slack they will
  render as bare URLs with no title card. This is the most time-sensitive of the
  four purely because of what happens this week. A single `opengraph-image.tsx`
  under each preview route, or one shared image at the root, covers it. Keep the
  preview pages `noindex` regardless — Open Graph governs link unfurling, not
  indexing, so the two settings do not conflict.

- ~~**The hero photograph is stock, and its alt text says otherwise.**~~ Fixed.
  The photograph that made the claim is gone, replaced by one with no people in
  it, so the alt text now describes objects on a desk and asserts nothing about
  who works at the cooperative. See the photography entry below. The image is
  still a placeholder, which the sign-off checklist covers.

- **The phone number is retyped in five components.** `lib/site-config.ts` opens
  by saying never to retype a phone number or address into a component, and five
  components do exactly that, across all three variants: v1 `sections.tsx` and
  `contact.tsx`, v2 `contact.tsx`, v3 `home-sections.tsx`, `site-footer.tsx` and
  `contact-sections.tsx`. They have already drifted — the config says
  "(0915) 816 2433" and the components say "0915 816 2433". Add a display-format
  field to the config and read it. Small, and it is precisely the drift the rule
  exists to prevent.

- **The contact form only opens a mail client.** See the Queued entry below,
  which now records why this is worse than a cosmetic gap.

## Found in the v1 interface review (2026-09-12)

The interface review of `feat/v1-egov-devices` raised six findings. Five were
fixed in that branch. What is left is the part of the colour finding that a
minimal fix deliberately did not take.

- **The v1 orange still fails 4.5:1 for small text and for button labels.**
  `--color-v1-orange` in `app/globals.css` was darkened from `#f26a1b` to
  `#e36419` so that the accent phrase closing every heading clears the 3:1 that
  heading text needs. Small text needs 4.5:1 and two uses still fall short:

  | Use | Measured | Needs |
  | --- | --- | --- |
  | Eyebrow labels, 14px semibold, six of them | 3.29:1 on paper, 3.06:1 on the FAQ mint | 4.5:1 |
  | White label on the orange button fill | 3.44:1 | 4.5:1 |

  `#b34e14` clears 4.5:1 on all three v1 backgrounds and would retire both rows,
  but it reads as burnt sienna rather than the brand orange, so it is a change
  the client should see rather than one to make during a review. Decide it
  alongside the brand palette entry at the top of this file, and apply the same
  check to v2's `--color-v2-orange` and v3's `--color-v3-rust`, which were never
  measured.

- **The two v1 photographs were swapped, and the replacements are people-free.**
  Both slots previously ran at the wrong declared size, which stretched them:
  the hero file was 877×390 behind a declared 900×700, and the tower was 900×600
  behind a declared 900×1000. Both now declare what they actually are.

  | Slot | File | Unsplash |
  | --- | --- | --- |
  | Hero | `public/designs/stock/hero-workspace.jpg`, 940×940 | [Modern office space with plants and artwork](https://unsplash.com/photos/modern-office-space-with-plants-and-artwork-xTmez98cqAM) |
  | Why SERBIZ | `public/designs/stock/small-shop.jpg`, 1100×1000 | [Sunlit cafe interior with wooden furniture](https://unsplash.com/photos/sunlit-cafe-interior-with-wooden-furniture-yDduhQk5-7k) |

  The hero file is square because the hero slot is: see the layout entry below.
  Both files are cut to the size the slot actually renders at 2x, so
  `next/image` serves them without upscaling or wasted bytes.

  The old office tower was replaced on content grounds, not taste: it showed a
  corporate skyline directly beside a heading promising SERBIZ is *not* scaled
  down from a big firm. Choosing photographs without people also retires the
  sign-off objection about images of people who do not work at the cooperative,
  for these two slots only. Both remain placeholders.

  Two files are now unreferenced and were deliberately left in place:
  `public/designs/v1/office.jpg`, which the assets table above still expects
  from Claude Design, and `public/designs/stock/office-tower.jpg`. Delete them
  once the layout choice is settled.

  Small legible signage appears in the shop interior, and the poster in it reads
  as an East Asian script. Nothing in either photograph is Philippine-specific.

- **The v1 hero grid was rebalanced, with measurements.** The polish pass gave
  the text column `1.6fr` to stop the headline breaking into six lines. It
  worked, but it took the width out of the photograph, which went from 552px
  wide in the original even-column design to 425px. The image was also pinned
  at `min-h-[320px]` beside a 608px text column, leaving ~290px of empty space.

  Measured at a 1440px viewport, the headline holds five lines down to 634px of
  text column and breaks to six below it:

  | Text column | Headline lines | Image width |
  | --- | --- | --- |
  | 552 | 6 | 552 |
  | 602 | 6 | 502 |
  | **634** | **5** | **470** |
  | 679 | 5 | 425 |

  So the ratio is now `1.35fr`, the break-even point, and the image is
  `aspect-[5/4]` and stays centred: 468×374, within a few pixels of the height
  the original even-column design gave it. The width the headline freed up is
  spent on presence rather than on height. Filling the column (468×606) and a
  square (468×468) were both built and rejected as too heavy.

  Re-measure before copying the ratio to v2 or v3: both have different headline
  lengths and type scales, so 1.35fr is a v1 number, not a house one.

- **The pointer spotlight was removed.** `SpotlightCard`, its test and the
  `.v1-spotlight` rules in `app/globals.css` are gone, and the service and news
  cards are plain `<article>` elements again. It was one of the four devices
  taken from e.gov.ph and it is the one that did not earn its keep here: a glow
  that only exists on hover-capable devices, on a site whose visitors are mostly
  on phones.

  Two things travelled with it. The news card needed `overflow-hidden` back at
  the call site, since `SpotlightCard` had been supplying it and without it the
  photo's square corners break out of the rounded border. And an interface-review
  finding about the glow leaving an empty flex item on touch devices is now moot
  rather than fixed.

  The other three e.gov.ph devices stay: two-tone headlines, the connected step
  nodes and the icon ramp. Update the PR description on [#6](https://github.com/msforbes09/serviz-website/pull/6)
  before it merges, since it still lists four.

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

- **Contact form.** Every variant's form builds a `mailto:` and hands off to the
  visitor's mail client. On a phone with no mail account configured, pressing
  the button does nothing at all — no error, no fallback, and the enquiry is
  lost silently. That makes this a functional gap rather than a rough edge, and
  the biggest one standing between the chosen layout and launch. Needs a
  destination decided (email, webhook or inbox) and a rate-limit key before the
  server action is written. Covered by the security self-review checklist in
  `CLAUDE.md`: an exported server action is a public HTTP endpoint.
- **Organization JSON-LD.** `lib/site-config.ts` already holds the legal name,
  contact points, mission and vision. Ship structured data with the real home
  page, using an escaping serializer rather than bare `JSON.stringify`.
- **Sitemap entries.** `app/sitemap.ts` lists only the home page. Every new
  public route is added there in the same change.
- **Active section in the v1 nav.** Smooth scrolling and correct landing
  positions went in on 2026-09-12; the missing half is showing which section the
  visitor is currently in. Doable with a scroll-driven CSS animation rather than
  an observer, in keeping with the rest of v1's motion. Raised and not taken at
  the time.
- **Shared UI blocks.** `AppFormField`, `PageHeader` and `EmptyState` are not
  built yet. Add each one when the first real use appears, not before.
