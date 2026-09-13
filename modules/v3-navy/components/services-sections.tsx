import Image from "next/image";
import { featuredServices, otherServices, toneClass } from "../lib/content";
import { QuickMessageDialog } from "./quick-message-dialog";

/**
 * The page's first tier: one section per featured service, same number and
 * order as the home cards. A home card links to `#<id>` here, so each section
 * is a hash target and clears the sticky header when landed on. The remaining
 * services get a card each in `OtherServices`; `services-sections.test.tsx`
 * pins that the two together cover every home card once.
 */
export function ServiceSections() {
  return (
    <div className="bg-white">
      {featuredServices.map((service, index) => (
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
              className="reveal reveal-x max-md:text-center md:sticky md:top-24"
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
              <ul className="grid list-none gap-3">
                {service.items?.map((item, itemIndex) => (
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
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * The second tier: the services the flyers present as a row of cards. Each
 * card carries the anchor its home card links to, so a visitor who clicks
 * "Business Registration" on the home page lands here, header cleared.
 */
export function OtherServices() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto max-w-[1200px] px-5 pt-18 pb-22">
        <div className="reveal reveal-down mb-9 max-w-[620px] max-md:mx-auto max-md:text-center">
          <p className="text-v3-rust mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
            More ways we help
          </p>
          <h2 className="font-outfit text-v3-navy text-[clamp(28px,3.8vw,42px)] leading-[1.05] font-extrabold tracking-[-0.02em]">
            Other services offered
          </h2>
        </div>

        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {otherServices.map((service, index) => (
            <li
              key={service.id}
              id={service.id}
              style={{ "--i": index } as React.CSSProperties}
              className={`reveal reveal-step border-v3-navy/10 relative flex scroll-mt-[calc(var(--v3-nav-height)+16px)] flex-col gap-3 overflow-hidden rounded-[20px] border px-6 py-7 ${toneClass[service.tone]}`}
            >
              {service.isNew && (
                <span className="bg-v3-rust absolute top-[18px] right-[18px] rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-white uppercase">
                  New
                </span>
              )}
              <span aria-hidden className="bg-v3-rust h-1.5 w-11 rounded-sm" />
              <h3 className="font-outfit pr-14 text-[22px] leading-tight font-bold text-pretty">
                {service.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-pretty opacity-90">
                {service.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesCta() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto max-w-[1200px] px-5 pb-16">
        <div className="reveal reveal-scale bg-v3-navy flex flex-wrap items-center justify-between gap-3 rounded-[20px] px-7 py-6 text-white max-md:justify-center max-md:text-center">
          <p className="font-outfit text-xl font-bold">
            Not sure which package fits? We’ll help you decide.
          </p>
          <QuickMessageDialog
            subject="Service inquiry"
            className="bg-v3-rust hover:bg-v3-rust-bright cursor-pointer rounded-full border-0 px-6 py-3.5 text-center font-semibold text-white transition-colors max-md:w-full"
          >
            Ask us
          </QuickMessageDialog>
        </div>
      </div>
    </section>
  );
}
