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
- **Claims about the team** — that members are women professionals, and that a
  non-disclosure agreement is signed at engagement. The "1–80 employees" claim
  has been **removed**, not queued: the cooperative says it handles well over a
  thousand, so both places that stated a bound were deleted rather than
  restated. A real range is theirs to supply if they want one back.
- **Permit scans.** The v3 and v1 permits sections show photographs of real
  registration documents, which normally carry registration numbers and
  signatures. Confirm the client wants them public.
- **Stock photography.** Every photograph is an Unsplash placeholder showing
  people who do not work at SERBIZ. Replace with real photos before launch.

## Found in the v1 review (2026-09-12)

Four things surfaced while summarising the v1 enhancement work. Two are now
done and are kept here with what shipped; two remain.

- **No social preview.** ~~Nothing in `app/` sets `openGraph`.~~ Done for v1
  only. `app/8sfz8dn5ts/opengraph-image.tsx` generates a 1200×630 card at build
  time and the page carries `openGraph` and `twitter` blocks.

  The copy on that card is deliberately not the page's own title and
  description. Those read "v1 — Classic" and "Layout preview: one long page…",
  which are ours for finding our way around; a link unfurling with them would
  announce the layout as attempt number one and undo the reason the slugs are
  random. `modules/previews/lib/preview-metadata.ts` holds the client-facing
  copy, built entirely from `site-config`, and its test fails if an internal
  variant name ever leaks back in.

  **v2 and v3 still have none.** Copy the same three files across when their
  turn comes; `preview-metadata.ts` is already shared and variant-neutral, so
  only the `opengraph-image.tsx` palette changes. The preview pages stay
  `noindex` either way — Open Graph governs unfurling, not indexing.

- ~~**The hero photograph is stock, and its alt text says otherwise.**~~ Fixed.
  The photograph that made the claim is gone, replaced by one with no people in
  it, so the alt text now describes objects on a desk and asserts nothing about
  who works at the cooperative. See the photography entry below. The image is
  still a placeholder, which the sign-off checklist covers.

- **The phone number is retyped in five components.** ~~Done.~~
  `siteConfig.contact.phones` is now a named object rather than a positional
  array, so a layout reads `phones.mobile` instead of indexing a slot it has to
  know about, and all six call sites across the three variants read it. The
  printed form is the config's "(0915) 816 2433"; the components had drifted to
  "0915 816 2433".

  `lib/site-config.test.ts` pins the displayed string and the dialable
  `mobileTel` to the same digits, which is the drift that actually happened.

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

- **A mission band now breaks the middle of the v1 page.** Measured before
  changing anything: the page is 786 words, which is not heavy, but five
  consecutive sections used the same shape — eyebrow, heading, then a grid of
  title-plus-paragraph blocks — and only three of nine sections carried any
  photograph, all at the top or the bottom. Services through Permits had no
  image at all.

  `Mission` in `modules/v1-classic/components/sections.tsx` is a full-bleed band
  between How it works and Permits. It carries `siteConfig.mission`, which comes
  from the flyers and appeared nowhere on v1, so the band earns its height
  rather than filling it. The photograph is Metro Manila at dusk, which is also
  the first Philippine-specific image on a page built for a Pasig City
  cooperative.

  | Detail | Value |
  | --- | --- |
  | File | `public/designs/stock/metro-manila.jpg`, 1800×640 |
  | Unsplash | [Urban city photo during golden hour](https://unsplash.com/photos/urban-city-photo-during-golden-hour-wRDEHYSyEGI) |
  | Scrim | Forest at 78% |

  **78% is measured, not chosen.** It is the lightest tint that still clears
  4.5:1 for white text against the brightest pixel in that specific photograph,
  a near-white cloud at rgb(244, 247, 241). Re-measure if the picture is ever
  swapped: the number belongs to the image, not to the design. The eyebrow is
  white rather than the peach used on the other dark section, because at 14px
  peach never reaches 4.5:1 over this photograph at any usable tint; the brand
  accent there is a rule, which carries no text and owes no ratio.

- **The v1 motto is retyped, like the phone number was.** The white card over
  the Why SERBIZ photograph reads "Empowering excellence / through
  collaboration" as a literal string, while `siteConfig.motto` holds
  "Empowering Excellence through Collaboration". Reading from the config is a
  one-line change but alters the visible capitalisation, so it is a copy
  decision rather than a refactor. Same class of problem as the phone number,
  found while adding the mission band.

- **v1 spacing was audited and re-tuned.** The 8pt grid was already sound; what
  varied was how consistently one relationship got spaced. Three problems, all
  measured before changing anything:

  | Relationship | Was | Now |
  | --- | --- | --- |
  | Section vertical padding | 80 | 96 |
  | Section intro to body | 40 / 48 / 56 | 48 |
  | Card gutter | 16, against 24px card padding | 24 |
  | Tagline, the one typographic pause | 96 | 128 |
  | Hero bottom padding | 48 | 96 |

  The card gutter was the worst of them: 16px between cards that each carry 24px
  of internal padding makes a grid read as one dense block, because the space
  between cards is tighter than the space inside them.

  **The scroll margin had to move with the padding.** `scroll-mt-8` was 32px
  precisely because sections carried 80px of padding under a 69px nav. At 96px
  padding it is `scroll-mt-4`, which holds the landing at the same 43px below
  the nav. Verified on all seven anchors at both 375px and 1440px: every section
  lands at 16px with the first line 43–44px clear. The arithmetic table in
  `.claude/sessions/2026-09-12.md` now records all three states.

  Column counts were checked before widening the gutters: Services and News both
  stay at four columns at 1440, so nothing reflowed. Two-column gutters stayed at
  48 and the contact form's internal field gap stayed at 16 — different
  relationships, correctly spaced differently.

- **v1 service copy was trimmed by subtraction.** Service bodies went from 109
  words to 87, about 20%, without a single sentence being rewritten. The content
  file records two tiers of copy — services, mission and permits from the
  flyers; news and FAQ invented by the design tool — and inside each service
  body there was a consistent shape: a list of deliverables from the flyer
  followed by an editorial tail in design-tool voice.

  Only the tails came off: "On time every cutoff", "you can actually read",
  "whichever your RDO needs", "with a checklist you can follow". Three of those
  were unconfirmed service-level promises, so cutting them shortened the page
  *and* shrank the sign-off surface.

  The rule was **subtract, never rewrite.** Cutting cannot invent a fact;
  rewriting can. Every remaining sentence is the original words minus some, and
  every deliverable noun from the flyers survived.

  Two headcount claims were deleted outright rather than trimmed, on the
  cooperative's own correction that it handles well over a thousand employees:
  "for teams under 100" in the HR service, and "Most clients have between 1 and
  80 employees" in the FAQ. No replacement range was invented.

  Expectations, measured: this is 22 words against a page of roughly 900. The
  page's weight is structural — fourteen title-plus-paragraph pairs across
  Services, Why and How — not volumetric. Trimming was worth doing because it is
  free and lowers risk, not because it fixes the feeling.

- **v1 service cards are now icon-led.** The tile went from a 44px accent beside
  the heading to the 64px element the card is built around, with the title and
  the trimmed body sitting under it as a caption at 18px and 14px.

  This only works because the copy was trimmed first. At paragraph length a
  caption treatment is just small paragraphs; at 9–17 words it reads as a label
  under a graphic. Card heights settled at 268 on desktop and 248 on a phone.

  The tile alpha went 12% → 18%. At 12% the seven steps of the ramp were
  indistinguishable and the tiles read as grey, which was fine when the tile was
  a whisper beside a heading and wrong when it is the thing carrying the card.

  The ramp was also re-pitched from 10% to 16% per card. At 10% the seventh tile
  reached only 60% orange and the progression died in ochre without arriving at
  the brand colour that makes it legible. It now resolves to `rgb(219, 100, 27)`
  against a brand orange of `rgb(227, 100, 25)`.

  **Solid tiles were built and rejected.** At full strength the midpoints of a
  forest-to-orange blend are olive and khaki, which read as muddy rather than as
  either brand colour, and a row of seven saturated squares fought the section
  above it. The wash keeps the ramp legible without the weight: the glyph
  carries the colour at full strength and the tile only tints behind it.

  | Card | Tile | Glyph on tile |
  | --- | --- | --- |
  | 1 Payroll | `rgb(207, 218, 208)` | 8.41 |
  | 4 HR | `rgb(228, 222, 209)` | 6.22 |
  | 7 IT | `rgb(245, 223, 207)` | 4.35 |

  The glyph takes 28% ink because the ramp walks toward a light colour. At full
  tint the last card's orange glyph on its own peach tint measured 2.79:1 and
  looked washed out. The ink holds every step above 4.3 while leaving the tile
  alone, so the section stays light.

  **The percentage is clamped** with `min(100%, …)`. A `color-mix` given more
  than 100% is invalid and drops the whole declaration, so at 16% per card an
  eighth service would have silently left a tile with no background rather than
  just extending the ramp.

  Click-to-expand cards were considered and declined. Unlike hover it is
  perfectly accessible, and the FAQ on this page already does it. It was
  declined on content grounds: after the trim the bodies are lists of specifics
  — SSS, PhilHealth and Pag-IBIG remittances, BIR returns, DTI or SEC, 201 files
  — and those are the only concrete, differentiating content on the page. The
  titles alone are generic. A second accordion would also have swapped a
  repetitive grid for a repetitive stack.

- **v1's scroll reveals are now JavaScript-driven.** `animation-timeline:
  view()` is unsupported in older Safari and Firefox, where the CSS-only reveal
  does nothing at all — correct, but it means many visitors saw no entrance,
  which is what prompted this. `components/motion/reveal-controller.tsx` is a
  render-nothing client component mounted once in v1's layout, so every section
  it animates stays a Server Component.

  **The design rule is that nothing is hidden until the script is running and
  able to show it again.** The stylesheet holds no resting `opacity: 0`; the
  hidden state is gated behind `data-reveal-ready`, which only the controller
  sets. No JavaScript, a thrown error, a browser without `IntersectionObserver`,
  or reduced motion all leave the page plainly visible.

  That is the inverse of e.gov.ph, which ships `opacity: 0` in the markup and
  waits on an observer. The gap worth knowing about is an observer that *exists
  but never fires* — a hidden or backgrounded tab does exactly that, and it is
  the state e.gov.ph was measured in with seven elements inside the viewport
  still invisible. A `sweep()` covers it: it reveals anything currently in the
  viewport regardless of the observer, and runs before arming, on
  `visibilitychange`, and once on a 1.2s timeout.

  **v2 and v3 still use the CSS-only path.** Move them over the same way when
  their turn comes; the controller is variant-neutral and only needs mounting.


- **v1 entrance variants, and the tagline moved onto a clock.** Four changes,
  all on the JavaScript path so none depends on scroll-timeline support:

  | Variant | Shape | Where |
  | --- | --- | --- |
  | `.reveal-x` | `translateX(--from-x)` | Why SERBIZ photo column, from the left |
  | `.reveal-scale` | `scale(0.92)` | The mission band |
  | `.enter-x` | `translateX(--from-x)`, no opacity | The hero photograph |
  | tagline | word fill on `transition-delay` | Replaces the scroll-linked version |

  `scale(0.92)` is measured off e.gov.ph's Solution section, which mixes
  `translateY(32px)` and `scale(0.92)` in one block.

  **The tagline is the one that fixes a visible fault.** It was scroll-linked,
  so each word's colour was a function of scroll position and stopping mid-page
  parked a word half-coloured — the client sent a screenshot of exactly that,
  "us?" sitting pale grey. On the observer it runs on a clock and finishes once
  started.

  `.enter-x` deliberately supplies **only** a starting position, no `transition`
  of its own, unlike its `.enter-*` siblings. The hero image already carries a
  Tailwind `duration-*` for its hover, and these rules are unlayered — a
  `transition` here would outrank that utility and silently retime the hover.
  That trap has now bitten three times; letting the call site own the transition
  is the way out.

  **The load cascade was then matched to e.gov.ph by measurement.** Their
  above-fold sequence is eight elements arriving 100ms apart, spanning roughly
  300ms to 1000ms, with the sideways slides leading and the headline following.
  The stagger is now 100ms and the duration 0.75s. Their 300ms dead time before
  the first element is hydration latency before Framer Motion can run, not a
  designed pause, and was deliberately not copied.

  **The hero composition enters as one object.** The entrance moved from the
  photograph to its wrapper, so the orange offset block, the framed photo and
  the caption card slide in together rather than the photo alone. Still
  transform-only, so the LCP image inside never fades.


- **v1 hero builds item by item, the FAQ enters one at a time, and the primary
  CTA glints.** Three more things measured off e.gov.ph.

  The hero's CTA row and trust row used to enter as two blocks. Each item now
  has its own step: badge, headline, lede, button, phone, then the three
  badges — eight steps at 100ms, the last landing at 1.45s. The reference for
  this was their stats row (40M+ downloads, 700M+ transactions) entering one at
  a time. **The stats themselves were not built:** those are real figures for
  them, and the rule against inventing numbers already covers it. The slot is
  ready if the client supplies a client count.

  The seven FAQ items enter from the right, one at a time. A new
  `--reveal-gap` custom property lets one list widen the JS-path stagger
  without touching the global 60ms; the FAQ sets 100ms, because at 60ms seven
  items read as one wave. From the right and not the left, since the list sits
  to the right of the intro column and arriving from that edge never crosses
  the text.

  `.v1-shine` sweeps a white band across the hero CTA once, 1.5s after load —
  right as the cascade finishes — and again on hover. Measured: e.gov.ph's
  band is 70px across a 139px button and **loops every 3.5s**. Ours does not.
  Looping decoration competes with content for attention, which is why the v3
  logo drift was removed; a single pass at the end of the cascade sits inside
  the delight budget and hover is feedback. If the loop is wanted, it is
  `animation-iteration-count: infinite` plus a longer duration to carry the
  rest between passes. No `from` keyframe and no fill, so a browser that never
  runs it shows a plain button and the band snaps back off-screen unseen.

  The `.v1-shine` class is variant-neutral in substance and one addition away
  from the nav pill or v2/v3's CTAs.


## Housekeeping

- **Tests run inside the Vercel build.** `prebuild` chains lint and the test
  suite ahead of `next build`, so a test-environment quirk fails a deployment
  rather than a CI job. That is what broke the first deploy, and then the
  second: Vercel sets `NODE_ENV=production` for the whole build, Vitest only
  defaults it to "test" when unset, and the inherited value made Vite resolve
  React's production bundle where `act` throws. 19 render tests failed on
  Vercel while all 63 passed locally.

  `vitest.config.mts` now pins `NODE_ENV` before Vite resolves anything, and
  `test/environment.test.ts` fails loudly if the pin is removed. Reproduce
  either state with `NODE_ENV=production npm run build`.

  The structural fix still stands: moving lint and tests into a GitHub Actions
  workflow, leaving `build` as just `next build`, would stop a test quirk from
  reading as a failed deployment at all. Twice now the symptom has looked like
  an infrastructure problem when it was a test-environment one.

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
