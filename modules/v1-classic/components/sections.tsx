import { ArrowRight, BadgeCheck, CircleCheck, MessagesSquare, Phone } from "lucide-react";
import Image from "next/image";
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
import { Icon } from "./icon";
import { SpotlightCard } from "./spotlight-card";

// Two even columns left the headline 552px to work in while its own
// `max-w-[680px]` said it wanted 680px, so 60px type broke into six lines, two
// of them barely half width. Giving the text column the room it was written for
// puts the headline back to five full lines at the same size. Below 900px the
// columns stack, so auto-fit still governs.
export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 pt-16 pb-12 min-[900px]:grid-cols-[1.6fr_1fr]">
      <div className="max-w-[680px]">
        <p className="text-v1-forest inline-flex items-center gap-2 rounded-full bg-[#eaf4ec] px-3 py-1 text-sm font-semibold">
          <BadgeCheck aria-hidden className="size-4" />A workers cooperative in
          Pasig City, since 2021
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
        <h1 className="text-v1-forest mt-6 text-[clamp(32px,5vw,60px)] leading-[1.05] font-bold tracking-[-0.02em] text-balance">
          Payroll, books and compliance, handled by{" "}
          <span className="text-v1-orange">
            people who care about your small business.
          </span>
        </h1>
        <p className="mt-6 max-w-[560px] text-lg leading-7 text-[#3f4b43]">
          SERBIZ runs the back office for sole proprietors, one person
          corporations and SMEs. Payslips out on time, BIR filings on schedule,
          reports you can read. You get your evenings back.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="bg-v1-orange hover:bg-v1-forest rounded-lg px-6 py-3 text-base font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5"
          >
            Book a free consultation
          </a>
          <a
            href={`tel:${siteConfig.contact.mobileTel}`}
            className="text-v1-forest inline-flex items-center gap-2 px-4 py-3 text-base font-semibold"
          >
            <Phone aria-hidden className="size-5" /> 0915 816 2433
          </a>
        </div>
        <ul className="mt-8 flex list-none flex-wrap gap-x-6 gap-y-4 text-sm text-[#3f4b43]">
          {heroBadges.map((badge) => (
            <li key={badge} className="inline-flex items-center gap-2">
              <CircleCheck aria-hidden className="text-v1-forest size-[18px]" />
              {badge}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-[320px]">
        <div
          aria-hidden
          className="bg-v1-orange absolute -right-3 -bottom-3 left-6 top-6 rounded-3xl"
        />
        <Image
          src="/designs/v1/office.jpg"
          alt="SERBIZ team members working together at the office"
          width={900}
          height={700}
          priority
          className="border-v1-line relative block h-full min-h-[320px] w-full rounded-3xl border object-cover object-[60%_40%]"
        />
        <p className="bg-v1-forest absolute bottom-[-4px] left-4 max-w-[260px] rounded-xl p-4 text-sm leading-5 text-white">
          <strong className="block text-xl leading-7">
            7 services, one team
          </strong>
          Payroll to IT consulting, priced for small teams.
        </p>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="border-v1-line scroll-mt-20 border-y bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="reveal max-w-[680px]">
          <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
            What we do
          </p>
          <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
            Everything tedious about running a business,{" "}
            <span className="text-v1-orange">taken off your desk.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
          {services.map((service, index) => (
            <SpotlightCard
              key={service.title}
              style={{ "--i": index } as React.CSSProperties}
              className="reveal reveal-step border-v1-line bg-v1-paper hover:border-v1-forest flex flex-col gap-3 rounded-2xl border p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,74,36,.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="v1-icon-tint grid size-12 place-items-center rounded-xl">
                  <Icon name={service.icon} className="size-6" />
                </span>
                {service.isNew && (
                  <span className="bg-v1-orange rounded-full px-2 py-0.5 text-xs font-semibold text-white">
                    New
                  </span>
                )}
              </div>
              <h3 className="text-xl leading-7 font-semibold">{service.title}</h3>
              <p className="text-base leading-6 text-[#3f4b43]">{service.body}</p>
            </SpotlightCard>
          ))}

          <a
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
              Start the conversation <ArrowRight aria-hidden className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Tagline() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <p className="tagline text-v1-forest max-w-[900px] text-[clamp(36px,5vw,60px)] leading-[1.1] font-bold tracking-[-0.02em]">
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
    <section id="why" className="bg-v1-forest scroll-mt-20 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 py-20">
        <div className="reveal relative">
          <Image
            src="/designs/stock/office-tower.jpg"
            alt="Office towers in Metro Manila"
            width={900}
            height={1000}
            className="block max-h-[520px] min-h-[360px] w-full rounded-3xl object-cover"
          />
          <p className="text-v1-forest absolute right-4 bottom-4 flex items-center gap-3 rounded-xl bg-white p-4">
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
          <p className="text-sm font-semibold tracking-[0.08em] text-[#ffb784] uppercase">
            Why SERBIZ
          </p>
          <h2 className="mt-3 max-w-[680px] text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
            Built for SPs, OPCs and SMEs,{" "}
            <span className="text-[#ffb784]">
              not scaled down from a big firm.
            </span>
          </h2>
          <div className="mt-10 grid gap-6">
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
    <section id="how" className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-20">
      <div className="reveal max-w-[680px]">
        <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
          How it works
        </p>
        <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
          From first call to first payslip{" "}
          <span className="text-v1-orange">in under two weeks.</span>
        </h2>
      </div>
      <div className="relative mt-14">
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

export function Permits() {
  return (
    <section id="proof" className="border-v1-line scroll-mt-20 border-y bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-12 px-6 py-20">
        <div className="reveal max-w-[480px]">
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
          {certificates.map((certificate) =>
            certificate.src ? (
              <Image
                key={certificate.alt}
                src={certificate.src}
                alt={certificate.alt}
                width={600}
                height={800}
                className="reveal border-v1-line block aspect-3/4 w-full rounded-lg border object-cover"
              />
            ) : (
              <div key={certificate.alt} className="reveal text-v1-forest">
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
    <section id="news" className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-20">
      <div className="reveal flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[680px]">
          <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
            News and events
          </p>
          <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold">
            What the cooperative is{" "}
            <span className="text-v1-orange">up to.</span>
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

      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {posts.map((post, index) => (
          <SpotlightCard
            key={post.title}
            style={{ "--i": index } as React.CSSProperties}
            className="reveal reveal-step border-v1-line flex flex-col rounded-2xl border bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,74,36,.08)]"
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
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-v1-forest text-[#cfe0d4]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6 px-6 py-12 text-sm leading-5">
        <div className="flex items-center gap-3">
          <Image
            src="/designs/v1/logo-mark.png"
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain"
          />
          <span>
            <strong className="block text-white">
              {siteConfig.legalName} ({siteConfig.shortName})
            </strong>
            {siteConfig.office.street}, {siteConfig.office.city}{" "}
            {siteConfig.office.postalCode}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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
