# SERBIZ Website Proposal

Pitch and pricing for presenting the website to SERBIZ Resources Income Workers
Cooperative. Internal reference for the client meeting; prices are suggestions
and the final figures are set at the meeting. Prepared 13 September 2026.

## The pitch

Open with their problem, not the website. SERBIZ sells trust and compliance to
sole proprietors, one person corporations and SMEs. Today its only online
presence is a Facebook page and printed flyers. A prospect who searches for the
cooperative finds nothing they can verify, and a referral has nowhere to send a
link.

What the site does for them, in four points:

- **Credibility.** A professional domain, the CDA registration, the office
  address and the mission and vision on one page a prospect can check before
  calling.
- **Enquiries around the clock.** Every layout has a contact form and a
  quick-message option that works from a phone, so a lead lands even outside
  office hours.
- **Found on Google.** Structured data, a sitemap and per-page metadata are
  already in place. A Facebook page alone is not indexed the same way.
- **One place to update.** Services, news and contact details live in one
  content layer. A new service or number changes once and appears everywhere.

### Demo flow for the meeting

1. Walk the three preview links (see `TODO.md` for the URLs) in the order v3,
   v1, v2, and ask them to pick one. That choice unblocks everything else.
2. Walk the pages of the chosen layout on a phone, since that is how their
   clients will see it.
3. Open the sign-off checklist in `TODO.md` and ask them to confirm the
   unverified facts, especially the office address and the registration number.

## What they are buying

Present the scope as one package so the price reads as a whole, not a parts
list.

- Custom-designed five-page site: home, about, services, news, contact. Three
  design directions were produced and one is selected.
- Mobile-first, accessible, fast. Built on a current framework with automated
  tests, so changes do not silently break pages.
- Search engine setup: metadata, sitemap, robots and organisation structured
  data.
- Contact form and quick-message dialog. The current form opens the visitor's
  mail app; reliable server-side delivery is a queued item in `TODO.md` and is
  included in the build price, not sold separately.
- Visitor analytics, already wired in.
- Deployment, domain setup and handover.

## Pricing

Three-part structure. The one-time fee covers the build, the retainer keeps it
alive, and third-party costs are passed through so the retainer stays honest.

| Item | Suggested price | Notes |
| --- | --- | --- |
| One-time build fee | PHP 65,000 to 85,000 | Three design directions, custom build, tests, SEO, contact form delivery, launch. Mid-market for a custom site of this quality. Below 50k undersells three full layouts. |
| Payment terms | 50% on signing, 50% at launch | Signing also means they have picked a layout and signed off the facts. |
| Care plan, monthly | PHP 2,500 to 3,500 | Hosting management, security and dependency updates, uptime monitoring, up to two hours of content changes a month. Quote it annually with one month free. |
| Domain | PHP 1,000 to 1,500 per year | Pass through at cost. Recommend serbiz.ph or serbiz.com.ph, registered in their name, not ours. |
| Hosting | USD 0 to 20 per month | Vercel's free tier is not licensed for commercial sites. Budget the Pro plan or absorb it inside the care plan. |
| Additional pages or sections | PHP 5,000 to 8,000 each | Priced per request after launch. A pricing or packages section for their own customers falls here. |

If they push back on the build fee, discount the second half rather than the
deposit, and only in exchange for a twelve-month care plan commitment.

## Decisions to get from them in the meeting

1. Which layout.
2. Sign-off on every fact marked unverified in `lib/site-config.ts` and the
   `TODO.md` checklist.
3. Domain name, and who owns the registrar account.
4. One email address where contact form enquiries should go.
5. Care plan yes or no, because that changes the hosting arrangement.

## Assumptions

Priced as an individual or small studio, not an agency, for a small
cooperative rather than a corporate buyer. If either differs, the build fee
moves up, not the structure.
