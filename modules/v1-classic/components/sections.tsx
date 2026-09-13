import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  MessagesSquare,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { HeroTilt } from "@/components/motion/hero-tilt";
import { DocumentPlaceholder } from "@/components/ui/document-placeholder";
import { siteConfig } from "@/lib/site-config";
import {
  certificates,
  heroBadges,
  posts,
  reasons,
  services,
  steps,
  taglineWords,
} from "../lib/content";
import { BrandLockup } from "./brand-lockup";
import { Icon } from "./icon";
import { SectionLink } from "./section-link";

// Two even columns left the headline 552px to work in while its own
// `max-w-[680px]` said it wanted 680px, so 60px type broke into six lines, two
// of them barely half width. Giving the text column the room it was written for
// puts the headline back to five full lines at the same size. Below 900px the
// columns stack, so auto-fit still governs.
//
// 1.35fr, not 1.6fr, because 1.6 was more than the headline needed and the
// difference came out of the photograph. Measured at 1440: the headline holds
// five lines down to 634px of text column and breaks to six below it. 1.35fr
// gives it 634px exactly and hands the remaining 45px back to the image.
//
// The photograph stays a centred card rather than stretching to the text
// column's full 608px. 5:4 at a 468px column is 374px tall, which lands it
// within a few pixels of the 552x323 the original even-column design gave it:
// the width the headline freed up is spent on presence, not on height. Filling
// the column and a square were both tried and read too heavy.
//
// The aspect ratio is also what gives the box a definite height. A centred grid
// column has none, so `h-full` inside it has nothing to resolve against.
//
// The floor is the viewport less the nav, so the hero owns the first screen and
// the services band waits below the fold instead of poking in, at any window
// height. `svh` is the small viewport: on a phone it is the height with the
// browser chrome showing, so the hero never overshoots when the chrome is in.
// A floor, not a height, so a short window still gets the whole hero.
export function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-var(--v1-nav-height))] max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 pt-8 pb-16 min-[900px]:grid-cols-[1.35fr_1fr]">
      {/* Centred on a phone, where the column is the full width and a left
          edge has nothing to align with; left from `md`, beside the photo. */}
      <div className="max-w-[680px] max-md:text-center">
        <p
          style={{ "--i": 0 } as React.CSSProperties}
          className="text-v1-forest enter-rise enter-step inline-flex items-center gap-2 rounded-full bg-[#eaf4ec] px-3 py-1 text-sm font-semibold"
        >
          <BadgeCheck aria-hidden className="shrink-0 size-4" />
          {/* The full sentence wrapped "2021" onto its own line on a phone.
              The city goes below `md`, where the pill then holds one line at
              375px; `text-balance` covers a narrower phone, splitting the
              sentence evenly rather than orphaning the year. */}
          <span className="text-balance">
            A workers cooperative
            <span className="max-md:hidden"> in Pasig City,</span> since 2021
          </span>
        </p>
        {/* No hard line breaks: the designed three-line shape only holds at
            desktop width, and forcing it left "handled by" stranded on its own
            line on a phone. `text-balance` lets the browser even the lines out
            at whatever width it actually gets.

            The floor is 32px rather than 36px for the same reason. At 36px on
            a 375px screen the line count goes to six, two of them barely half
            width; 32px fits it into five even lines. Nothing above 720px
            changes, so the desktop composition is untouched.

            Solid ink with the payoff phrase in orange, rather than a gradient
            clipped to the glyphs. The gradient read as texture instead of
            emphasis, and because it made the text itself transparent it also
            needed rescuing in forced-colours modes. This says the same thing
            with colour that is actually there. */}
        <h1
          style={{ "--i": 1 } as React.CSSProperties}
          className="text-v1-forest enter-rise enter-step mt-6 text-[clamp(32px,5vw,60px)] leading-[1.05] font-bold tracking-[-0.02em] text-balance"
        >
          Payroll, books and compliance, handled by{" "}
          <span className="text-v1-orange">people who care</span> about your
          small business.
        </h1>
        <p
          style={{ "--i": 2 } as React.CSSProperties}
          className="enter-rise enter-step mt-6 max-w-[560px] text-lg leading-7 text-[#3f4b43]"
        >
          SERBIZ runs the back office for sole proprietors, one person
          corporations and SMEs. Payslips out on time, BIR filings on schedule,
          reports you can read. You get your evenings back.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch">
          <SectionLink
            href="#contact"
            style={{ "--i": 3 } as React.CSSProperties}
            className="enter-rise enter-step v1-shine bg-v1-orange hover:bg-v1-forest rounded-lg px-6 py-3 text-center text-base font-semibold text-white max-md:w-full transition-[background-color,transform] duration-200 hover:-translate-y-0.5"
          >
            Book a free consultation
          </SectionLink>
          <a
            href={`tel:${siteConfig.contact.mobileTel}`}
            style={{ "--i": 4 } as React.CSSProperties}
            className="enter-rise enter-step text-v1-forest inline-flex items-center gap-2 px-4 py-3 text-base font-semibold max-md:justify-center"
          >
            <Phone aria-hidden className="size-5" />{" "}
            {siteConfig.contact.phones.mobile}
          </a>
        </div>
        <ul className="mt-8 flex list-none flex-wrap gap-x-6 gap-y-4 text-sm text-[#3f4b43] max-md:justify-center">
          {heroBadges.map((badge, index) => (
            <li
              key={badge}
              style={{ "--i": 5 + index } as React.CSSProperties}
              className="enter-rise enter-step inline-flex items-center gap-2"
            >
              <CircleCheck aria-hidden className="text-v1-forest size-[18px]" />
              {badge}
            </li>
          ))}
        </ul>
      </div>

      {/* A `group`, so the photo and the caption card respond to a hover
          anywhere over the composition rather than each on its own. The
          orange block behind them holds still; it used to shift with them
          and the user asked for that to go. Everything
          that moves is behind `motion-safe:`, and Tailwind already wraps every
          `hover:` utility in a hover media query, so a touch device gets the
          still image with no extra gating. Nothing is hidden behind the hover,
          so there is no keyboard equivalent to owe. */}
      <HeroTilt
        style={{ "--from-x": "56px" } as React.CSSProperties}
        className="enter-x v1-parallax group relative motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(.23,1,.32,1)]"
      >
        <div
          aria-hidden
          className="bg-v1-orange absolute -right-3 -bottom-3 left-6 top-6 rounded-3xl"
        />
        {/* The clip lives here and not on the parent: the parent also holds the
            orange block and a caption that deliberately overhangs the bottom
            edge, and both would be cut off. */}
        {/* The frame follows the pointer a few pixels (`.v1-parallax-photo`)
            and the photo inside zooms slowly as the hero scrolls out
            (`.v1-hero-zoom`); the caption card below moves the other way. */}
        <div className="border-v1-line v1-parallax-photo relative block aspect-[5/4] w-full overflow-hidden rounded-3xl border">
          <Image
            src="/designs/stock/hero-workspace.jpg"
            alt="A quiet office room with a long white desk, monitors, a tall plant and a wooden ceiling"
            width={940}
            height={752}
            priority
            className="v1-hero-zoom block size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
          />
        </div>
        <p className="v1-parallax-card bg-v1-forest absolute bottom-[-4px] left-4 max-w-[260px] rounded-xl p-4 text-sm leading-5 text-white motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[0_18px_40px_rgba(11,74,36,.32)]">
          <strong className="block text-xl leading-7">
            7 services, one team
          </strong>
          Payroll to web development, priced for small teams.
        </p>
      </HeroTilt>
    </section>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="border-v1-line scroll-mt-4 border-y bg-white"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="reveal max-w-[680px] max-md:mx-auto max-md:text-center">
          <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
            What we do
          </p>
          <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
            Everything tedious about running a business,{" "}
            <span className="text-v1-orange">taken off your desk.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              style={{ "--i": index } as React.CSSProperties}
              className="reveal reveal-step border-v1-line bg-v1-paper hover:border-v1-forest flex flex-col gap-5 rounded-2xl border p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,74,36,.08)]"
            >
              {/* Icon-led: the tile is what carries the card and the words sit
                  under it as a caption. Seven cards of icon / title / paragraph
                  read as seven identical text blocks however the three bands
                  are arranged, so the fix is to change what leads the card, not
                  to reshuffle the same parts.

                  This only works because the bodies were trimmed to 9-17 words.
                  At paragraph length a caption treatment is just small
                  paragraphs. The `--i` ramp on the parent gives each of the
                  seven tiles its own step from forest to orange, which is what
                  makes the grid read as a set rather than a repetition. */}
              <div className="flex items-start justify-between gap-3">
                <span className="v1-icon-tint grid size-16 place-items-center rounded-2xl">
                  <Icon name={service.icon} className="size-8" />
                </span>
                {service.isNew && (
                  <span className="bg-v1-orange shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-white">
                    New
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-lg leading-6 font-semibold">
                  {service.title}
                </h3>
                {/* 14px, and measured: #3f4b43 on the paper card is 8.74:1,
                    well clear of the 4.5:1 that small text owes. */}
                <p className="mt-1.5 text-sm leading-5 text-[#3f4b43]">
                  {service.body}
                </p>
              </div>
            </article>
          ))}

          <SectionLink
            href="#contact"
            style={{ "--i": services.length } as React.CSSProperties}
            className="reveal reveal-step bg-v1-forest hover:bg-v1-orange flex min-h-[200px] flex-col justify-between gap-3 rounded-2xl p-6 text-white transition-[background-color,transform] duration-200 hover:-translate-y-1"
          >
            <MessagesSquare aria-hidden className="size-6" />
            <span className="text-xl leading-7 font-semibold">
              Not sure what you need? Tell us what keeps piling up and we will
              suggest a package.
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              Start the conversation{" "}
              <ArrowRight aria-hidden className="size-4" />
            </span>
          </SectionLink>
        </div>
      </div>
    </section>
  );
}

export function Tagline() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-32">
      <p className="tagline text-v1-forest max-w-[900px] max-md:text-center text-[clamp(36px,5vw,60px)] leading-[1.1] font-bold tracking-[-0.02em]">
        {taglineWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            style={{ "--i": index } as React.CSSProperties}
            className="mr-[0.26em] inline-block"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}

export function WhySerbiz() {
  return (
    <section id="why" className="bg-v1-forest scroll-mt-4 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 py-24">
        <div
          style={{ "--from-x": "-48px" } as React.CSSProperties}
          className="reveal reveal-x group relative"
        >
          {/* A small shop rather than the glass towers that used to sit here.
              The heading beside it says SERBIZ is not scaled down from a big
              firm, and a photograph of a corporate skyline argued the
              opposite. */}
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/designs/stock/small-shop.jpg"
              alt="The sunlit interior of a small shop, with wooden shelves, stocked goods and a street beyond the window"
              width={1100}
              height={1000}
              className="block max-h-[520px] min-h-[360px] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
            />
          </div>
          <p className="text-v1-forest absolute right-4 bottom-4 flex items-center gap-3 rounded-xl bg-white p-4 motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[0_18px_40px_rgba(0,0,0,.28)]">
            <Image
              src="/designs/v1/logo-mark.png"
              alt=""
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <span className="text-sm leading-5 font-semibold">
              Empowering excellence
              <br />
              through collaboration
            </span>
          </p>
        </div>

        <div>
          <div className="max-md:text-center">
            <p className="text-sm font-semibold tracking-[0.08em] text-[#ffb784] uppercase">
              Why SERBIZ
            </p>
            <h2 className="mt-3 max-w-[680px] text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
              Built for SPs, OPCs and SMEs,{" "}
              <span className="text-[#ffb784]">not scaled down</span> from a big
              firm.
            </h2>
          </div>
          <div className="mt-12 grid gap-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                style={{ "--i": index } as React.CSSProperties}
                className="reveal reveal-step grid grid-cols-[48px_1fr] items-start gap-4"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-[#ffb784]">
                  <Icon name={reason.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl leading-7 font-semibold">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-base leading-6 text-[#cfe0d4]">
                    {reason.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1200px] scroll-mt-4 px-6 py-24">
      <div className="reveal max-w-[680px] max-md:mx-auto max-md:text-center">
        <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
          How it works
        </p>
        <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
          From first call to first payslip{" "}
          <span className="text-v1-orange">in under two weeks.</span>
        </h2>
      </div>
      <div className="relative mt-12">
        {/* The rule that turns three cards into one sequence. It runs between
            the first and last node centres, which in a three-column grid is a
            sixth in from each edge, and fades out at both ends so it reads as
            a connection rather than a border. Decorative, and gone entirely
            once the columns stack. */}
        <div
          aria-hidden
          className="via-v1-line absolute top-7 right-[16.67%] left-[16.67%] hidden h-px bg-gradient-to-r from-transparent to-transparent md:block"
        />

        <ol className="grid list-none gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <li
              key={step.n}
              style={{ "--i": index } as React.CSSProperties}
              className="reveal reveal-step md:text-center"
            >
              {/* Positioned, so it sits over the rule rather than under it,
                  and filled with the page colour so the rule stops at its
                  edge instead of striking through the number. */}
              <span className="border-v1-line bg-v1-paper text-v1-orange relative grid size-14 place-items-center rounded-full border text-lg font-bold md:mx-auto">
                {step.n}
              </span>
              <h3 className="mt-5 text-xl leading-7 font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-6 text-[#3f4b43]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * A full-bleed pause between the step grid and the permits grid.
 *
 * Services, How it works and Permits run back to back as three card grids with
 * no photograph between them, which is most of why the middle of this page
 * reads heavier than its word count deserves. This breaks that run.
 *
 * It carries the mission rather than decoration. The mission comes from the
 * flyers in `references/Images/`, it is one of the few confirmed facts about
 * the cooperative, and until now it appeared nowhere on v1 — so the band earns
 * its height instead of just filling it.
 */
export function Mission() {
  return (
    <section className="relative isolate overflow-clip">
      <Image
        src="/designs/stock/metro-manila.jpg"
        alt=""
        width={1800}
        height={640}
        className="reveal reveal-zoom absolute inset-0 -z-10 size-full object-cover"
      />
      {/* A flat forest tint, not a gradient. The photograph's brightness varies
          across the frame, so a gradient would give the text a different
          contrast ratio depending on where a line happened to fall; a flat tint
          makes it a constant.

          78% is the lightest that still clears 4.5:1 for white against the
          brightest pixel in this particular photograph, a near-white cloud at
          rgb(244, 247, 241). Measured, not guessed. Re-measure if the picture
          is ever swapped — the number belongs to the image, not to the design.

          The eyebrow is white rather than the peach used on the other dark
          section. At 14px peach needs 4.5:1 and never reaches it over this
          photograph at any tint worth using, so the brand accent here is the
          rule above it, which carries no text and owes no ratio. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[color-mix(in_srgb,var(--color-v1-forest)_78%,transparent)]"
      />
      {/* The band assembles: the photograph settles while the rule, the
          eyebrow and the mission rise in one after another. A single fade on
          the whole block was too quiet to register against the dark ground. */}
      <div
        style={{ "--reveal-gap": "120ms" } as React.CSSProperties}
        className="mx-auto max-w-[1200px] px-6 py-16 sm:py-28"
      >
        <span
          aria-hidden
          style={{ "--i": 0 } as React.CSSProperties}
          className="reveal reveal-step bg-v1-orange block h-1 w-14 rounded-full"
        />
        <p
          style={{ "--i": 1 } as React.CSSProperties}
          className="reveal reveal-step mt-5 text-sm font-semibold tracking-[0.08em] text-white uppercase"
        >
          Our mission
        </p>
        <p
          style={{ "--i": 2 } as React.CSSProperties}
          className="reveal reveal-step mt-4 max-w-[900px] text-[clamp(22px,3vw,32px)] leading-[1.35] font-semibold text-balance text-white"
        >
          {siteConfig.mission}
        </p>
      </div>
    </section>
  );
}

export function Permits() {
  return (
    <section
      id="proof"
      className="border-v1-line scroll-mt-4 border-y bg-white"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-12 px-6 py-24">
        <div className="reveal max-w-[480px] max-md:mx-auto max-md:text-center">
          <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
            Permits and licenses
          </p>
          <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
            Registered, compliant and{" "}
            <span className="text-v1-orange">inspectable.</span>
          </h2>
          <p className="mt-4 text-base leading-6 text-[#3f4b43]">
            We hold our own paperwork to the standard we hold yours. SERBIZ is
            registered with the {siteConfig.registration.authority} (Reg. No.{" "}
            {siteConfig.registration.number}, issued{" "}
            {siteConfig.registration.registeredOn}), the Bureau of Internal
            Revenue and the City of Pasig.
          </p>
        </div>
        {/* Two columns on a phone, three from `sm` up. Three at every width
            squeezed each card to about 110px and the labels spilled out of
            their own borders. */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {certificates.map((certificate, index) =>
            certificate.src ? (
              <Image
                key={certificate.alt}
                style={
                  {
                    "--i": index,
                    "--reveal-offset": "250ms",
                    "--reveal-gap": "100ms",
                  } as React.CSSProperties
                }
                src={certificate.src}
                alt={certificate.alt}
                width={600}
                height={800}
                className="reveal reveal-step border-v1-line block aspect-3/4 w-full rounded-lg border object-cover"
              />
            ) : (
              <div
                key={certificate.alt}
                style={
                  {
                    "--i": index,
                    "--reveal-offset": "250ms",
                    "--reveal-gap": "100ms",
                  } as React.CSSProperties
                }
                className="reveal reveal-step text-v1-forest"
              >
                <DocumentPlaceholder label={certificate.alt} />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export function News() {
  return (
    <section
      id="news"
      className="mx-auto max-w-[1200px] scroll-mt-4 px-6 py-24"
    >
      <div className="reveal flex flex-wrap items-end justify-between gap-4 max-md:justify-center max-md:text-center">
        <div className="max-w-[680px]">
          <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
            News and events
          </p>
          <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold">
            What the{" "}
            <span className="text-v1-orange">cooperative is up to.</span>
          </h2>
        </div>
        <a
          href={siteConfig.contact.facebook}
          target="_blank"
          rel="noopener"
          className="text-v1-forest inline-flex items-center gap-2 text-sm font-semibold"
        >
          Follow us on Facebook <ArrowRight aria-hidden className="size-4" />
        </a>
      </div>

      <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        {posts.map((post, index) => (
          <article
            key={post.title}
            style={{ "--i": index } as React.CSSProperties}
            className="reveal reveal-step border-v1-line flex flex-col overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,74,36,.08)]"
          >
            <Image
              src={post.image}
              alt=""
              width={520}
              height={300}
              className="block h-[150px] w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-v1-orange tracking-[0.08em] uppercase">
                  {post.kind}
                </span>
                <span className="text-[#6b7a70]">{post.date}</span>
              </div>
              <h3 className="text-lg leading-7 font-semibold">{post.title}</h3>
              <p className="text-sm leading-5 text-[#3f4b43]">{post.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    // `--v1-focus-ring` restated because `outline-offset` draws the ring on
    // this footer's forest background, where the default forest ring is
    // invisible. See the focus block in globals.css.
    <footer className="bg-v1-forest text-[#cfe0d4] [--v1-focus-ring:var(--color-v1-paper)]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6 px-6 py-12 text-sm leading-5 max-md:justify-center max-md:text-center">
        {/* The header's lockup, nothing more; the address lives in the
            contact section. On a phone the block centres. */}
        <div className="flex items-center gap-2.5">
          <BrandLockup tone="paper" />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 max-md:justify-center">
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Privacy%20policy%20request`}
            className="text-[#cfe0d4] hover:text-white"
          >
            Privacy
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Terms%20of%20service%20request`}
            className="text-[#cfe0d4] hover:text-white"
          >
            Terms
          </a>
          <a
            href={siteConfig.contact.facebook}
            target="_blank"
            rel="noopener"
            className="text-[#cfe0d4] hover:text-white"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
