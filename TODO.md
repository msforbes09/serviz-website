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

  | Layout             | Send the client |
  | ------------------ | --------------- |
  | v1 Classic         | `/8sfz8dn5ts`   |
  | v2 Warm editorial  | `/u2feptyuzu`   |
  | v3 Structured navy | `/4sjhdc5awq`   |

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

| Variant    | Project                                | Entry file                       |
| ---------- | -------------------------------------- | -------------------------------- |
| v1 classic | `bbfa7f03-12da-4e2d-b9bd-9889096c1191` | `serbiz-v1-classic.html`         |
| v2         | `1cc64fb6-af8e-4f02-ab35-8987bc1d1b7a` | `Serbiz Landing.dc.html`         |
| v3         | `79aa69fa-d24c-4f4f-b180-30c5ecda6830` | `Serbiz Landing Page v4.dc.html` |

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

| Put here             | From project          | Files                                                                                                                                                          |
| -------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/designs/v1/` | `bbfa7f03…` `assets/` | `logo-full.jpg`, `office.jpg`, `tower.jpg`, `cert-bir.jpg`, `cert-cda.jpg`, `cert-pasig.jpg`, `ill-tax.jpg`, `ill-portal.jpg`, `ill-books.jpg`, `ill-time.jpg` |
| `public/designs/v3/` | `79aa69fa…` `assets/` | `permit-bir.jpg`, `permit-cda.jpg`, `permit-pasig.jpg`                                                                                                         |

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
- **Web & Software Development (2026-09-13).** Card 06 in v3 and the seventh
  v1 service were "IT Consultant", invented by the design. They now describe
  custom websites, portals and business systems "built with our development
  partner, a full-stack web developer focused on backend systems". That
  partner is the user, and the cooperative has not yet agreed to offer it.
  The copy names the partnership, not the partner. On a yes, add the name or
  brand and a link (`modules/v3-navy/lib/content.ts` detail "06",
  `modules/v1-classic/lib/content.ts` service and FAQ). On a no, drop card
  06 and the FAQ entry. The v3 hero kicker and lede say "Software" in place
  of "IT" for the same reason.
- **News items and events.** v1 and v3 now show four posts transcribed from
  the cooperative's Facebook page (2026-09-13; `lib/news.ts`, newest first:
  the Galing Kooperatiba onsite validation, the SERBIZ Cares fire relief, the
  e-waste drop box, and the Thailand planning trip), with the bodies condensed
  from the captions. v3's invented monthly deadline calendar is gone; its
  side column now carries the e-waste drop box as the one standing item.
  The cooperative should still read the condensed wording. **v2 still
  carries the invented posts.**
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
  The four news photos are placeholders matched to each post, not the
  Facebook photos: `news-handshake.jpg` (already in the repo),
  `news-donation.jpg`, `news-ewaste.jpg` and `news-thailand.jpg` (Unsplash
  free licence, fetched 2026-09-13 at 1400×800). The e-waste photo shows
  legible brand names on old graphics cards. Swap in the real Facebook photos
  when the cooperative supplies them. `news-anniversary.jpg`, `news-clinic.jpg`,
  `news-it.jpg`, `news-laptops.jpg`, `v3-news-desk.jpg` and
  `v3-news-ledgers.jpg` are now unreferenced by v1 and v3.
- **Tax Compliance and HR Support item lists (v3, 2026-09-13).** The flyers
  describe each in one paragraph; the services page now shows them as
  numbered items like Payroll and Accounting, so the paragraphs were split
  into four tax items and three HR items in `modules/v3-navy/lib/content.ts`.
  The wording is derived, not transcribed — "Reportorial Requirements",
  "Online or Onsite", "Employee Records (201 files)" and the rest — and the
  cooperative should confirm each line describes something it actually does.
- **v1 skip link removed (2026-09-13)** at the client's request, after seeing
  it appear on keyboard focus. Keyboard visitors now tab through the whole nav
  to reach content, which an accessibility audit will flag. Restore it if that
  matters at launch: it was a `SectionLink` to `#main` in
  `app/8sfz8dn5ts/layout.tsx`, `sr-only` until focused.
- **v3 skip link removed (2026-09-13)**, same request, same consequence. It was
  a plain `<a href="#main">` in `app/4sjhdc5awq/layout.tsx`, `sr-only` until
  focused; `<main id="main">` is still there for it to come back to.
- **v3 nav pill on back/forward (2026-09-13).** The pill is a Motion
  shared-layout element measured in page coordinates. A route change from a
  scrolled page made it slide up from below the fold, because the window
  jumped to the top between the old pill's snapshot and the new one's
  measurement. Fixed for link presses by scrolling to the top on the click
  itself (`modules/v3-navy/components/route-top.tsx`). Back and forward do
  not come through a click and the browser restores scroll during them, so
  the same slide can still show there. `layoutRoot` on the bar was tried and
  did not help. Revisit if it is noticed.
- **Browser tab titles (2026-09-13).** Both home pages now inherit the root
  default title, so the two tabs read identically and name no layout; v3's
  inner pages are "About | SERBIZ" and so on. `page-titles.test.ts` pins it.
  Our own index still shows the internal names.

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

  **v3 has its card** (`app/4sjhdc5awq/opengraph-image.tsx`, navy with a rust
  edge, plus `openGraph` and `twitter` on its layout), checked rendering on
  2026-09-13. **v2 still has none.** Copy the same three files across when its
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

- **The v1 orange still fails 4.5:1 for small text and for button labels,
  by choice.** `--color-v1-orange` in `app/globals.css` is `#e36419`, darkened
  from the print `#f26a1b` so the accent phrase closing every heading clears
  the 3:1 that heading text needs. Small text needs 4.5:1 and two uses fall
  short:

  | Use                                        | Measured                                | Needs |
  | ------------------------------------------ | --------------------------------------- | ----- |
  | Eyebrow labels, 14px semibold, six of them | 3.29:1 on paper, 3.06:1 on the FAQ mint | 4.5:1 |
  | White label on the orange button fill      | 3.44:1                                  | 4.5:1 |

  `#b64f14` clears both (4.88 on paper, 5.10 under white, 4.53 on the FAQ
  mint) and was applied on 2026-09-13; the user looked at it and preferred
  the brighter orange, so it was reverted the same day. Decided, not
  forgotten: an accessibility audit will flag the two rows above. If that
  matters at launch, the option that keeps the brighter orange in view is two
  tokens — `#b64f14` for eyebrow labels and button fills, `#e36419` for
  heading accents and decorative shapes.

  v3's `--color-v3-rust` _was_ measured in an earlier pass, contrary to what
  this entry used to say: `#c14d2a` is 4.56:1 on the v3 paper and 4.81:1 under
  white, both clear. Re-measured 2026-09-13. The one tight pair is the rust
  numeral on a navy circle in the services sidebar at 3.04:1, which is bold
  and large enough for the 3:1 that applies, and the brighter rust hover fill
  drops a button label to 3.64:1 while hovered. Both left alone.
  v2's `--color-v2-orange` is still unmeasured.

- **The two v1 photographs were swapped, and the replacements are people-free.**
  Both slots previously ran at the wrong declared size, which stretched them:
  the hero file was 877×390 behind a declared 900×700, and the tower was 900×600
  behind a declared 900×1000. Both now declare what they actually are.

  | Slot       | File                                               | Unsplash                                                                                                                           |
  | ---------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
  | Hero       | `public/designs/stock/hero-workspace.jpg`, 940×940 | [Modern office space with plants and artwork](https://unsplash.com/photos/modern-office-space-with-plants-and-artwork-xTmez98cqAM) |
  | Why SERBIZ | `public/designs/stock/small-shop.jpg`, 1100×1000   | [Sunlit cafe interior with wooden furniture](https://unsplash.com/photos/sunlit-cafe-interior-with-wooden-furniture-yDduhQk5-7k)   |

  The hero file is square because the hero slot is: see the layout entry below.
  Both files are cut to the size the slot actually renders at 2x, so
  `next/image` serves them without upscaling or wasted bytes.

  The old office tower was replaced on content grounds, not taste: it showed a
  corporate skyline directly beside a heading promising SERBIZ is _not_ scaled
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
  | ----------- | -------------- | ----------- |
  | 552         | 6              | 552         |
  | 602         | 6              | 502         |
  | **634**     | **5**          | **470**     |
  | 679         | 5              | 425         |

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

  | Detail   | Value                                                                                                              |
  | -------- | ------------------------------------------------------------------------------------------------------------------ |
  | File     | `public/designs/stock/metro-manila.jpg`, 1800×640                                                                  |
  | Unsplash | [Urban city photo during golden hour](https://unsplash.com/photos/urban-city-photo-during-golden-hour-wRDEHYSyEGI) |
  | Scrim    | Forest at 78%                                                                                                      |

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

  | Relationship                       | Was                           | Now |
  | ---------------------------------- | ----------------------------- | --- |
  | Section vertical padding           | 80                            | 96  |
  | Section intro to body              | 40 / 48 / 56                  | 48  |
  | Card gutter                        | 16, against 24px card padding | 24  |
  | Tagline, the one typographic pause | 96                            | 128 |
  | Hero bottom padding                | 48                            | 96  |

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
  _and_ shrank the sign-off surface.

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

  | Card      | Tile                 | Glyph on tile |
  | --------- | -------------------- | ------------- |
  | 1 Payroll | `rgb(207, 218, 208)` | 8.41          |
  | 4 HR      | `rgb(228, 222, 209)` | 6.22          |
  | 7 IT      | `rgb(245, 223, 207)` | 4.35          |

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

## The v3 enhancement round (2026-09-13)

Seven items agreed with the client, all shipped on `feat/v3-pass`:

- The "We work with" strip enters as one piece after the hero, stacks one
  audience per line on phones, and has no dot separators at any width.
- The rust wedges in the hero and the Why SERBIZ band are desktop-only. On a
  phone they ran under the buttons and the reasons list.
- Every "email us" call to action — hero, header (desktop and mobile menu),
  services "Ask us", home banner — opens a quick-message modal
  (`modules/v3-navy/components/quick-message-dialog.tsx`, on the shadcn
  `dialog` primitive) instead of a bare `mailto:`. The modal reuses the contact
  page's form and presets the subject to the button pressed: "Consultation
  request", "Quote request", "Service inquiry". Links that display the address
  itself (contact rows, footer) stay plain `mailto:`. Still a mail-client
  hand-off: the Queued contact-form entry below is unchanged.
- Tax and HR get a full section each, image plus items (sign-off entry above).
- Services 05–07 return to the compact "Other services offered" grid. Each card
  carries its anchor, so the home grid's links still land.
- The v3 Open Graph card was verified rather than added — it already existed.
- A reload starts at the top so the entrance animations play:
  `lib/start-reload-at-top.ts`, injected from the root layout with
  `next/script` `beforeInteractive`. **Do not move it into a segment layout as
  a bare `<script>`**: that made the router fall back to a full document load
  on every client navigation into v3, which lost the hash landing on the
  services page. Site-wide by construction, so v1 and v2 get it too.

Second round, same day, also shipped:

- Entrance order on the first screen: kicker, headline, lede, steel bars,
  audience strip, then both hero buttons together, then the promise card
  last. The photo slides at once, as it always did — the client asked for
  that kept. The card's delay is an inline style because the unlayered
  `.enter-slide` rule would beat any utility.
- The mobile menu closes on a tap anywhere outside the panel and its toggle,
  which covers the logo on the home page, where a route change never fires.
- The hero kicker puts "Pasig City" on its own line on phones, dash dropped.
- The footer keeps its auto-fit grid (one column on phones, the client
  preferred it) but the page links are a wrapped row, two or three lines
  rather than five deep. Contact links wrap anywhere so the Facebook handle
  never pushes the page sideways.
- The quick-message modal has a 60% black scrim, a light ring, a deep shadow
  and a rust top bar. `DialogContent` in `components/ui/dialog.tsx` gained an
  `overlayClassName` prop for the scrim; re-add it if the shadcn CLI ever
  overwrites the file.

Suggested in the same round and **deferred**, in rough order of value:

- **A call option in the hero.** The hero offers email only; Filipino SMEs
  often prefer a call or Viber. A "Call us" secondary button, and a Viber link
  if the cooperative has one, likely converts better than a second email path.
- **Real permit scans.** The permits flyer in `references/Images/` shows the
  BIR certificate, the CDA certificate and the Mayor's permit. Cropping those
  would replace the three "scan to follow" placeholders. Low resolution, but
  real.
- **The news page carries invented content.** Reduce it to the Facebook link
  and a "follow us for filing reminders" note until real posts arrive.
- **Registration badges in the hero**, as v1 has: CDA, BIR, Pasig permit. All
  three are flyer facts.
- **A "how it works" strip** after the services grid. Copy needs the
  cooperative.
- **Phone number in the mobile menu** as a tap-to-call line.
- **Soften the unverified promises** ("reply within one working day", "first
  consultation is free") or mark them visibly until confirmed.
- **A jump list on the services page**, one pill per service; the anchors
  already exist.
- **Contrast check** on rust-button labels once the palette is final, plus
  focus rings inside the new modal.

## The v3 pass (2026-09-12)

Checked v3 against the seven defects the v1 playbook says to look for, rather
than assuming. **Three did not exist here**: no fixed-column grids, no hard
`<br>` in a heading, no gradient-clipped text. The scroll-margin arithmetic is
moot because v3 is multi-page with no in-page anchors, and mission, vision and
motto are already on the about page, so v3 needs no equivalent of v1's mission
band. Its body copy is 117 words across the whole variant against 109 in v1's
services section alone, so there was nothing to trim.

**Fixed:**

- **Navigation pill.** The glass treatment is gone — the gradient, the inset
  highlights and the outer glow — leaving a solid navy pill. The animation is
  now a Motion shared-layout element: one `motion.span` with a `layoutId` that
  is the same on every item, so Motion animates between the boxes. That deleted
  the manual measurement entirely: pixel offsets in state, a resize listener, a
  re-measure once web fonts settled, and a transition on `width`, which triggers
  layout every frame. The spring is `{ duration: 0.45, bounce: 0.22 }` and
  carries velocity through an interruption. First use of `motion` in the repo,
  which was already a declared dependency.
- **Mobile menu** now closes on Escape and returns focus to the toggle. It is a
  dropdown panel, not a full-screen overlay, so it owes no focus trap, scroll
  lock or `aria-modal` — that is v1's contract, not this one. Two tests, red
  first.
- **Skip link and `<main id>`**, which v3 had neither of.
- **Focus ring.** v3 had _zero_ `focus-visible` declarations; every ring was the
  browser default on a variant built around navy panels. `.v3-root` now scopes
  one, with `--v3-focus-ring` restated on the hero, the navy section, the footer
  and the contact form. Measures 13.87 on navy and 16.66 on the darkest panel.
- **Open Graph.** One card on the layout, inherited by all five routes. Every v3
  page title starts with "v3 — ", so without this a shared link would announce
  the layout as a numbered attempt. Navy ground with the wordmark on a white
  chip, matching the lockup the footer already uses.
- **`--color-v3-rust` darkened** from `#c9502c` to `#c14d2a`. Ten eyebrow labels
  use it at 12–15px where 4.5:1 is required and it measured 4.26. Now 4.56, and
  the white-on-rust button label goes from exactly 4.5 to 4.81.
- **Staggers.** Seven card grids gained `reveal-step` with an index, and the
  hero text column was split so the eyebrow, headline, lede and buttons arrive
  in reading order instead of as one block.

- **Imagery.** The four v3 photographs containing people were replaced with
  people-free ones, which retires the sign-off objection about images of people
  who do not work at the cooperative for the whole variant. v1 and v3 are now
  both people-free; **v2 has not been checked.**

  | Slot                   | Was                                                | Now                                                                     |
  | ---------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
  | Home hero              | `hero-office.jpg`, four people in a startup office | `v3-hero-corridor.jpg`, a corridor whose navy wall is near the v3 token |
  | About                  | `team-meeting.jpg`, a single portrait              | `v3-about-workspace.jpg`, an open plan office of empty desks            |
  | News, year-end payroll | `news-paperwork.jpg`, hands signing                | `v3-news-ledgers.jpg`, budget sheets and a pen                          |
  | News, weekly reminders | `news-handshake.jpg`, a handshake                  | `v3-news-desk.jpg`, stacked ledgers on a sunlit desk                    |

  The about slot had a second fault worth recording: its alt text read
  "Colleagues talking in a meeting room" while the file was a single portrait by
  a window. The alt described a scene that was not in the picture.

  Rejected candidates and why: two architectural options were clearly CGI
  renders; one filing shot carried Japanese signage, the same region mismatch as
  the Swahili shop sign rejected for v1; one desk shot ran six colours and fought
  v3's navy-and-rust discipline.

- **Hero photograph now settles rather than fading.** `.enter-zoom` scales it
  from 1.06 with **no opacity**, because it is `priority` and therefore the LCP
  element: fading from zero pushes the LCP timestamp out by the length of the
  transition. Its wrapper used to carry `.enter-rise`, which faded the whole
  subtree including the photograph — the same fault v1 was built to avoid. Each
  child now animates on its own terms.

**Checked and deliberately not changed:**

- **The contact form.** An earlier read of this called it unvalidated. That was
  wrong: it uses native `required` on name and message with no `noValidate`, so
  the browser blocks submit, focuses the first invalid field and announces the
  message. Replacing that with custom handling would be a regression.
- **Spacing.** v1's worst finding was a card gutter narrower than the cards' own
  padding. v3's is the reverse — 20px gutters against 16px padding — and its
  section rhythm varies only 80 to 88. Nothing worth changing.
- **Two-tone headlines and the icon ramp.** v1 design devices. Copying them
  makes the three previews converge, which defeats showing the client three
  distinct presentations.

- **A gooey metaball nav pill** was built and rejected. It produced the two-lobe
  liquid shape the client asked about, but only reads as liquid between adjacent
  items — posed at the widest jump the blobs never bridge — and it costs back the
  measurement the `layoutId` version deleted. Closed as PR #10.

- **Services payroll image replaced.** `payroll-desk.jpg` showed a **United
  States IRS withholding form** — wrong jurisdiction for a Philippine
  cooperative. v3 now points at `v3-payroll-planner.jpg`, a blank monthly
  planner, which suits a group whose promise is "paid on time, every cut-off"
  and dates itself to nothing. Two calendar candidates were rejected for
  exactly that reason: one read "Aug 2022", the other "JUIN 2016" — a legible
  stale date on a live page is a credibility problem, and the second was in
  French besides. The declared `width`/`height` were also corrected from 920×690
  to the file's real 1120×840.

  **`payroll-desk.jpg` is still referenced by v2**, which has had no pass at
  all, so the US form is still live there.

- **The v3 hero lost its floating logo mark** at the user's request, which
  orphaned the `v3-drift` keyframes; those were removed with it. The photograph
  now also zooms to 1.04 on hover, sharing the single `transform` transition the
  entrance already uses. Written as an arbitrary `[transform:scale(1.04)]`
  rather than Tailwind's `scale-*`, because v4's scale utilities set the
  separate `scale` property, which the entrance does not transition — two
  properties would have needed two transitions.

- **`overflow: hidden` silently breaks a `view()` scroll timeline.** It
  establishes a scroll container, so `animation-timeline: view()` on anything
  inside resolves against a box that never scrolls — the animation sits at a
  fixed progress and the element is simply always in its end state. Measured on
  v3's home page: of 18 reveals below the fold, **4 were already fully visible**,
  and all four shared one ancestor, the navy section with `overflow-hidden`. The
  healthy ones had no clipped ancestor at all.

  `overflow: clip` clips identically and does **not** create a scroll container,
  so it is the fix. v3's four clipping sections now use it and the count is 0.

  **v1 and v2 had it too**, and it was measured rather than assumed: v1 had 1
  dead reveal of 31 below the fold, v2 had 4 of 22. Both are fixed in a separate
  pull request, [#11](https://github.com/msforbes09/serviz-website/pull/11),
  kept apart from the v3 work because v1 is already merged and client-facing.

- **A side-entrance variant now exists.** `.reveal-x` swaps the keyframes for a
  horizontal path, with direction from `--from-x` at the call site, borrowed
  from e.gov.ph's mix of `translateX(48px)` and `translateY(-20px)` among
  otherwise upward reveals. Used on two v3 two-column blocks only, where the
  text column enters from its own side while the list beside it keeps the
  upward stagger. Both sides sliding reads as busy.

- **Bolder wordmark, "SRI" removed, v1 round ported to v3 (2026-09-13).**

  - **Orbitron 900** replaces Michroma for the SERBIZ word on the v1 and v3
    headers and the v3 footer. Michroma matched the print logo's shape but
    ships one light weight and read thin beside the mark; Orbitron's black
    weight is the nearest Google face with the print logo's mass. Zen Dots,
    Bruno Ace SC and synthesised bolds were on the sheet and rejected. 21px,
    tracking 0.06em. v3 keeps Outfit for headings.
  - **"SRI" is gone** at the user's request. `siteConfig.shortName` is
    removed, with its five call sites (v1 footer, v2 footer and Why SERBIZ,
    v3 footer copyright, the placeholder home). The two logo PNGs that spell
    it out — `public/designs/v1/logo-full.png` and
    `public/designs/v3/logo-wordmark.png` — are no longer referenced: the v3
    footer and both Open Graph cards now set mark plus text. The files stay
    in the tree for the record; delete them if the client confirms the
    abbreviation is retired for good. README and CLAUDE.md updated.
  - **v1 footer alignment.** The mark sat vertically centred beside a
    two-line name; it now sits on the first line, and on phones the lockup
    stacks and centres with the links row.
  - **v3 port of the v1 round.** Hero padding 40px over 56px; hero, page
    banners, section intros, CTA banner, about, services, news headings and
    contact details centred below `md` with lists and cards left; hero
    buttons, CTA banner buttons, the services "Ask us" and the contact submit
    full width on phones. The mobile menu now derives its open state from the
    route it was opened on, so any navigation — the header logo included —
    closes it without an effect setting state.

- **v1 enhancements (2026-09-13).** Five asks after the v3 round, same
  branch.

  - **Hero top space.** Padding was 64px over 96px and, on a tall window, the
    floor's slack pooled above the badge. Now 32px over 64px with the content
    still centred, so the slack splits: at 1280×1100 it measures 196px above
    the badge and 228px below the badge list. At 768 tall the content is
    taller than the floor, so nothing changes there.
  - **Centred on phones.** Below `md` the hero text block and every
    section's eyebrow, heading and intro are centred; cards, lists, the FAQ
    and the contact rows stay left, since centred body text beside an icon
    reads badly (the address row showed this and was reverted to left).
  - **Full-width buttons on phones.** The hero's primary button and the
    contact form's submit stretch to the column; the phone link centres
    beneath. The services grid's green card is already full width in the
    single column.
  - **Logo closes the menu.** From inside the open overlay the logo used to
    scroll to the top and leave the menu covering the page. It now closes the
    menu first and scrolls once the body lock lifts, the way section links
    already defer. Test red first.
  - **Wordmark in Michroma.** The print logo is a wide, squared, futuristic
    sans. Michroma, Orbitron and Audiowide were shown side by side; Michroma
    is the closest and replaces Outfit for the SERBIZ word only. 19px at its
    single weight, tracking 0.08em, so the lockup keeps the width the 22px
    Outfit setting had. Outfit is no longer loaded by v1; v3 still uses it.
    **Awaiting the user's eye on the real header** — swap back to Orbitron or
    Audiowide is a one-line change in `modules/v1-classic/lib/fonts.ts`.

- **v3 motion, first screen, services mirror and skeletons (2026-09-13).**
  Four asks from the user after comparing v3 with v1.

  - **Entrance, emphasised with variety.** The hero now cascades nine steps
    (eyebrow, headline, lede, each button on its own, four steel dashes) and
    the audience strip follows as steps 9–13, so the first screen arrives in
    reading order. The photo composition slides in from the right like v1's
    on top of its settle, and the rust wedge sweeps in from the edge —
    transform only, so the LCP photograph is never faded. The four page
    banners step kicker, title and lede instead of fading as one block, and
    their rust corner sweeps in the same way. Two scroll-reveal variants were
    added next to `.reveal` and `.reveal-x`: `.reveal-down` (a heading drops
    24px as the cards under it rise) and `.reveal-scale` (a banner or card
    settles from 0.94). Both carry the scroll-timeline and observer paths and
    sit inside the same guards. `.v3-root` sets `--from-y: 44px` and
    `--reveal-gap: 90ms`, so every v3 reveal travels further and staggers
    wider than v1's 32px and 60ms without any call site restating it.
  - **Full first screen.** `HomeOpening` wraps the hero and the "We work with"
    strip in a column with a floor of `100svh` less `--v3-nav-height`, hero
    content centred, strip pinned at the bottom. The header is now set to the
    token — 67px on desktop, 69px below the nav breakpoint where the menu
    toggle is the tallest child — and `home-hero.test.tsx` pins both sides to
    it. Measured: opening bottom lands exactly on the viewport at 1024×768.
  - **Services page mirrors the home grid.** Seven anchored sections in the
    home order and numbering, derived from `serviceCards` through one
    `serviceSections` list so the two cannot drift (`content.test.ts`). Tax
    Compliance is card 03, so it is now section 03 and no longer item four of
    Accounting. Every home card links to its section, which lands 16px under
    the sticky header. No copy was written: the four body-only sections reuse
    the old "other services" lines. `serviceGroups` and `otherServices` are
    gone.
  - **Loading skeletons.** v3's 60vh navy slab, which the user saw on load and
    read as a broken page, is now shaped like the hero on the same height
    floor: rust wedge, faint bars where the kicker, headline, lede and
    buttons sit, a photo block, and a white band where the strip goes. v1's
    got the same treatment on its paper ground. `loading.test.tsx` covers
    both. Note the slab is long-lived only in `next dev`, where a route
    compiles on demand while the fallback shows; in production the pages are
    prerendered and it appears only during a client-side navigation.

- **v3 mobile pass (2026-09-13).** Checked all five pages at 375px, the home
  page from 320 to 768, and the open menu, after the client sent a phone
  capture with a navy bar under the header and the page wider than the header.

  - **The navy bar was the closed mobile menu.** The panel collapses by
    animating a grid row to `0fr`, but the child the row measures carried
    `pb-4` and the panel a `border-t`, so the closed row was still 17px tall
    and showed the top of the active "Home" link. The clipping child now
    carries nothing; padding and border sit on a wrapper inside it. Closed
    height measures 0.
  - **The contact page scrolled sideways.** The map box had `aspect-4/3` with
    `min-h-[320px]`, and an aspect ratio transfers a minimum height into a
    minimum width: 427px, so at 375 the page was 446 wide and the sticky
    header sat narrower than the page — the second thing in the capture. The
    minimum height is gone; at 335 wide the map is 251 tall, at desktop 556 by 417.
  - **The services image covered its list.** Each group's intro column was
    `sticky top-24` at every width, so in the single phone column it pinned
    under the header while the list scrolled beneath the photograph. Sticky
    only from `md`, where the two columns exist.
  - **Not reproduced: the home page wider than the header.** Across 320 to 768
    in Chromium the home page never exceeded the viewport. The contact page
    was the one place that did. If it recurs on the phone, the browser and
    width are what is needed; an older Safari without `overflow: clip` would
    let the hero's shapes escape.

  None of the three has a jsdom seam, so they were verified in the browser
  and not tested.

- **v3's scroll reveals are JavaScript-driven (2026-09-13).** The same
  `RevealController` v1 mounts, mounted once in v3's layout, so every v3
  section stays a Server Component and the CSS-only path is stood down in
  favour of the observer, which runs in browsers without scroll timelines.
  v3's `.reveal`, `.reveal-x` and `.reveal-step` call sites needed no change:
  the JavaScript rules read the same classes and the same `--i` / `--from-x`.

  **It is mounted in each page, not the layout.** The first cut mounted it in
  the layout with a `usePathname()` dependency, so it could re-arm when v3
  swapped the page beneath it. That was wrong for a reason only the console
  showed: a layout hydrates before a nested page's segment does, so the
  controller swept the server HTML ahead of hydration and React then reported
  a `data-revealed` attribute it never rendered — a hydration mismatch on every
  hard load of the services and news pages. As the page's own last child the
  effect runs after that page has hydrated, and on a client-side navigation
  the old page's instance disarms while the new one arms, inside one commit.
  The pathname dependency went with it. `reveal-mount.test.ts` guards the
  placement in all six pages and both layouts; it is a guard on source, since
  jsdom has no hydration to race. Verified: three mismatches in the console
  before the change, none added by hard loads of services and news after it.

  **Next 16 keeps visited and prefetched pages in the document** as hidden
  Activity boundaries (`display: none !important`), so `querySelectorAll` on
  the visible page also finds their `.reveal` elements. Harmless: a hidden
  element never intersects and never measures as in view, and a hidden
  page's effects are unmounted, so only the visible page's controller is
  live. Worth knowing before trusting an element count.

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
  waits on an observer. The gap worth knowing about is an observer that _exists
  but never fires_ — a hidden or backgrounded tab does exactly that, and it is
  the state e.gov.ph was measured in with seven elements inside the viewport
  still invisible. A `sweep()` covers it: it reveals anything currently in the
  viewport regardless of the observer, and runs before arming, on
  `visibilitychange`, and once on a 1.2s timeout.

  **v2 still uses the CSS-only path.** Move it over the same way when its turn
  comes; the controller is variant-neutral and only needs mounting. v3 was
  moved on 2026-09-13, see the v3 pass above.

- **v1 entrance variants, and the tagline moved onto a clock.** Four changes,
  all on the JavaScript path so none depends on scroll-timeline support:

  | Variant         | Shape                              | Where                                  |
  | --------------- | ---------------------------------- | -------------------------------------- |
  | `.reveal-x`     | `translateX(--from-x)`             | Why SERBIZ photo column, from the left |
  | `.reveal-scale` | `scale(0.92)`                      | The mission band                       |
  | `.enter-x`      | `translateX(--from-x)`, no opacity | The hero photograph                    |
  | tagline         | word fill on `transition-delay`    | Replaces the scroll-linked version     |

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

- **Entrances run to completion on scroll stop, and three v1 sections were
  re-paced.** The client reported the FAQ freezing when scrolling stopped. On
  the JS path entrances already run on a clock, so the cause was the observer's
  12% bottom margin: an item sitting in that band is on screen but not yet
  "intersecting", and stopping there left it hidden. Two fixes: the margin is
  now 4%, and the controller sweeps on scroll stop (debounced 150ms), so
  anything on screen is revealed whatever the observer has reported. That is
  the fourth safety net after mount, `visibilitychange` and the 1.2s timeout,
  and the one that turns "continues once started" into a guarantee. Tested.

  `--reveal-offset` is new: it holds a whole group back so a list beside an
  intro column starts after the intro has begun. The FAQ and the permits both
  set 250ms, so the left column leads.

  The mission band's single fade was too quiet against the dark ground. It now
  assembles: the photograph settles from `scale(1.08)` over 1.2s with no fade
  (`.reveal-zoom`, transform only — a full-bleed image fading in from paper
  reads as a broken load), while the rule, eyebrow and mission rise in at
  120ms steps. `.reveal-scale` was retired with it; nothing else used it.

  The three permit cards used to land as one block; they now cascade at 100ms.

## Housekeeping

- **e.gov.ph's scroll reveal was re-examined at the client's request, and
  rejected again — this time with measurements.** Their page holds 53 elements
  at `opacity: 0` via inline styles written by Framer Motion, waiting on an
  observer. Scrolled through in a browser, **seven of those were sitting inside
  the viewport still at zero**, with a blank band on screen where the content
  should have been. (Caveat: programmatic scrolling may not trigger their
  observer the way a human scroll would. But content in the viewport held
  invisible by inline styles is the risk itself, and it is the same failure that
  left our own hero blank in a background tab.)

  What was borrowed is the travel distance only: `reveal-rise` goes from 18px to
  **32px**, measured off their `translateY(32px)`. 18px was too short to read as
  an entrance once an element was already sliding up the viewport.

  **This changes all three variants**, since `.reveal` is the shared system —
  21 uses in v1, 12 in v2, 24 in v3. That is deliberate: two travel distances
  would be a fork of a system that exists to be one thing.

- **The `.enter-*` rules in `globals.css` are unlayered**, so their `transition`
  shorthand beats any Tailwind utility whatever its specificity — layered rules
  lose to unlayered ones. A `duration-[260ms]` class on the element compiles
  fine and then loses silently. Overrides for those rules belong beside them in
  `globals.css`, not as utilities at the call site. This has now bitten twice in
  opposite directions: once clobbering a tuned hover transition on v1's hero
  caption, once failing to override one on v3's hero photograph.

- **`lint`, `typecheck` and `test` do not parse CSS.** A stray brace in
  `app/globals.css` passed all three and only surfaced as a blank page, because
  ESLint reads JS/TS, `tsc` reads types, and Vitest never imports the
  stylesheet. `npm run build` is the only command in the project that parses it.
  Run the build, not just the baseline, after editing `globals.css`.

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
