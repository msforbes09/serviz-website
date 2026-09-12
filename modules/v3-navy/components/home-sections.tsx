import Image from "next/image";
import Link from "next/link";
import { DocumentPlaceholder } from "@/components/ui/document-placeholder";
import { siteConfig } from "@/lib/site-config";
import {
  audiences,
  basePath,
  permits,
  reasons,
  serviceCards,
  toneClass,
} from "../lib/content";

export function AudienceStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-7">
        <h2 className="text-v3-slate text-[13px] font-semibold tracking-[0.14em] uppercase">
          We work with
        </h2>
        {audiences.map((audience, index) => (
          <span key={audience} className="flex items-center gap-x-8">
            <span className="font-outfit text-v3-navy text-lg font-bold">
              {audience}
            </span>
            {index < audiences.length - 1 && (
              <span aria-hidden className="bg-v3-rust size-1.5 rounded-full" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto max-w-[1200px] px-5 py-20">
        <div className="reveal mb-11 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[620px]">
            <p className="text-v3-rust mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
              What we do
            </p>
            <h2 className="font-outfit text-v3-navy text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-pretty">
              Seven services. One team.
            </h2>
          </div>
          <Link
            href={`${basePath}/services`}
            className="border-v3-navy text-v3-navy hover:bg-v3-navy rounded-full border-[1.5px] px-[22px] py-3 text-sm font-semibold transition-colors hover:text-white"
          >
            Full service details →
          </Link>
        </div>

        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-4">
          {serviceCards.map((service, index) => (
            <li key={service.num}>
              <Link
                href={`${basePath}/services`}
                style={{ "--i": index } as React.CSSProperties}
                className={`reveal reveal-step border-v3-navy/10 relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[20px] border px-6 pt-[26px] pb-7 transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,42,68,.12)] ${toneClass[service.tone]}`}
              >
                <span className="flex items-center justify-between">
                  <span className="font-outfit text-v3-rust text-[34px] leading-none font-extrabold">
                    {service.num}
                  </span>
                  {service.isNew && (
                    <span className="bg-v3-rust rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-white uppercase">
                      New
                    </span>
                  )}
                </span>
                <span className="font-outfit text-[21px] leading-tight font-bold text-pretty">
                  {service.title}
                </span>
                <span className="text-sm leading-normal opacity-80">
                  {service.sub}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="bg-v3-navy relative overflow-clip text-white [--v3-focus-ring:var(--color-v3-paper)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-v3-rust absolute bottom-[-20%] left-[-6%] h-[70%] w-[45%] opacity-90 [clip-path:polygon(0_30%,60%_0,100%_100%,0_100%)]" />
        <div className="bg-v3-navy-deep absolute bottom-[-10%] left-[-6%] h-[50%] w-[40%] [clip-path:polygon(0_40%,55%_0,100%_100%,0_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-12 px-5 py-22">
        <div
          style={{ "--from-x": "-48px" } as React.CSSProperties}
          className="reveal reveal-x"
        >
          <p className="text-v3-sky mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
            Why SERBIZ
          </p>
          <h2 className="font-outfit mb-[22px] text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-pretty">
            Small-business heart. Big-firm discipline.
          </h2>
          <p className="text-v3-on-dark text-[17px] leading-[1.7] text-pretty">
            A cooperative of seasoned professionals who treat your deadlines as
            their own.
          </p>
        </div>

        <ul className="grid list-none gap-3.5">
          {reasons.map((reason, index) => (
            <li
              key={reason.n}
              style={{ "--i": index } as React.CSSProperties}
              className="reveal reveal-step flex items-center gap-[18px] rounded-[18px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-[6px]"
            >
              <span className="bg-v3-rust font-outfit grid size-11 shrink-0 place-items-center rounded-xl text-lg font-extrabold">
                {reason.n}
              </span>
              <span className="font-outfit text-[19px] font-bold">
                {reason.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Permits() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20">
        <div className="reveal mx-auto mb-10 max-w-[640px] text-center">
          <p className="text-v3-rust mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
            Registered &amp; compliant
          </p>
          <h2 className="font-outfit text-v3-navy mb-3.5 text-[clamp(28px,3.8vw,42px)] leading-[1.08] font-extrabold tracking-[-0.02em]">
            Our permits and licenses
          </h2>
          <p className="text-v3-slate text-base">
            Registered with the BIR, CDA and City of Pasig.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {permits.map((permit, index) => (
            <figure
              key={permit.title}
              style={{ "--i": index } as React.CSSProperties}
              className="reveal reveal-step border-v3-navy/10 bg-v3-paper m-0 flex flex-col gap-3.5 rounded-[20px] border p-4 transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,42,68,.12)]"
            >
              {permit.image ? (
                <Image
                  src={permit.image}
                  alt={permit.title}
                  width={600}
                  height={800}
                  className="block aspect-3/4 w-full rounded-xl bg-white object-cover"
                />
              ) : (
                <div className="text-v3-navy">
                  <DocumentPlaceholder label={permit.title} />
                </div>
              )}
              <figcaption className="flex flex-col gap-0.5">
                <span className="text-v3-navy text-[15px] font-semibold">
                  {permit.title}
                </span>
                <span className="text-v3-slate text-[13px]">
                  {permit.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-22">
        <div className="reveal bg-v3-rust relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-7 overflow-hidden rounded-[28px] p-[clamp(36px,5vw,64px)] text-white">
          <div
            aria-hidden
            className="bg-v3-navy absolute top-[-30%] right-[-5%] h-[160%] w-[45%] opacity-95 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]"
          />
          <div className="relative">
            <h2 className="font-outfit mb-3 text-[clamp(28px,3.8vw,44px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-pretty">
              Ready to stop worrying about the small stuff?
            </h2>
            <p className="max-w-[420px] text-base leading-relaxed text-[#fbe3da]">
              First consultation is free.
            </p>
          </div>
          <div className="relative flex flex-col items-start gap-3">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-v3-navy rounded-full bg-white px-[26px] py-4 text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.mobileTel}`}
              className="rounded-full border-[1.5px] border-white/50 bg-white/15 px-[26px] py-[15px] text-base font-semibold text-white transition-colors hover:bg-white/30"
            >
              {siteConfig.contact.phones.mobile}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
