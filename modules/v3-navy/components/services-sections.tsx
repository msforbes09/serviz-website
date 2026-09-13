import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { serviceSections } from "../lib/content";

/**
 * One section per home card, same number, same order. A home card links to
 * `#<id>` here, so each section is a hash target and clears the sticky header
 * when landed on. `services-sections.test.tsx` pins the mirror.
 */
export function ServiceSections() {
  return (
    <div className="bg-white">
      {serviceSections.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`scroll-mt-[calc(var(--v3-nav-height)+16px)] ${index > 0 ? "border-v3-navy/10 border-t" : ""}`}
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-x-10 gap-y-7 px-5 py-14 md:grid-cols-[1fr_1.15fr]">
            {/* Sticky only from `md`, where the grid has two columns and the
                intro can sit beside the list. In the single phone column it
                pinned under the header and the list scrolled up beneath it. */}
            <div
              style={{ "--from-x": "-48px" } as React.CSSProperties}
              className="reveal reveal-x md:sticky md:top-24"
            >
              <p className="bg-v3-mint mb-[18px] inline-flex items-center gap-3 rounded-full py-2 pr-4 pl-2">
                <span className="bg-v3-navy text-v3-rust font-outfit flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-base font-extrabold">
                  {service.num}
                </span>
                <span className="text-v3-navy text-[13px] font-semibold tracking-[0.08em] uppercase">
                  {service.isNew ? "New service" : "Service"}
                </span>
              </p>
              <h2 className="font-outfit text-v3-navy mb-3 text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-pretty">
                {service.title}
              </h2>
              <p className="text-v3-slate-deep text-[17px] leading-[1.65] text-pretty">
                {service.sub}
              </p>
            </div>

            <div className="grid gap-4">
              {service.image && (
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={1120}
                  height={840}
                  className="reveal reveal-scale aspect-[2/1] w-full rounded-[20px] object-cover"
                />
              )}
              {service.items ? (
                <ul className="grid list-none gap-3">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={item.n}
                      style={{ "--i": itemIndex, "--reveal-gap": "90ms" } as React.CSSProperties}
                      className="reveal reveal-step border-v3-navy/10 bg-v3-paper hover:border-v3-rust flex gap-[18px] rounded-[18px] border p-[22px] transition-[border-color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:translate-x-1"
                    >
                      <span className="bg-v3-navy text-v3-rust font-outfit flex h-16 w-13 shrink-0 items-center justify-center rounded-lg text-[26px] font-extrabold">
                        {item.n}
                      </span>
                      <span>
                        <span className="font-outfit text-v3-navy mb-1.5 block text-xl font-bold">
                          {item.title}
                        </span>
                        <span className="text-v3-slate-deep block text-[14.5px] leading-normal text-pretty">
                          {item.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="reveal reveal-scale border-v3-navy/10 bg-v3-paper text-v3-navy rounded-[18px] border p-[22px] text-[17px] leading-[1.65] text-pretty">
                  <span aria-hidden className="bg-v3-rust mb-4 block h-1.5 w-11 rounded-sm" />
                  {service.body}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export function ServicesCta() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto max-w-[1200px] px-5 py-16">
        <div className="reveal reveal-scale bg-v3-navy flex flex-wrap items-center justify-between gap-3 rounded-[20px] px-7 py-6 text-white">
          <p className="font-outfit text-xl font-bold">
            Not sure which package fits? We’ll help you decide.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Service%20inquiry`}
            className="bg-v3-rust hover:bg-v3-rust-bright rounded-full px-6 py-3.5 font-semibold text-white transition-colors"
          >
            Ask us
          </a>
        </div>
      </div>
    </section>
  );
}
