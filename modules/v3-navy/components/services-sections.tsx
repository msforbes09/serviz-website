import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { otherServices, serviceGroups, toneClass } from "../lib/content";

export function ServiceGroups() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-20 px-5 py-18">
        {serviceGroups.map((group) => (
          <div
            key={group.num}
            className="reveal grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-10"
          >
            {/* Sticky only from `md`, where the grid has two columns and the
                intro can sit beside the list. In the single phone column it
                pinned under the header and the list scrolled up beneath the
                photograph. */}
            <div className="md:sticky md:top-24">
              <p className="bg-v3-mint mb-[18px] inline-flex items-center gap-3 rounded-full py-2 pr-4 pl-2">
                <span className="bg-v3-navy text-v3-rust font-outfit flex size-8 items-center justify-center rounded-full text-base font-extrabold">
                  {group.num}
                </span>
                <span className="text-v3-navy text-[13px] font-semibold tracking-[0.08em] uppercase">
                  {group.kicker}
                </span>
              </p>
              <h2 className="font-outfit text-v3-navy mb-4 text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-pretty">
                {group.title}
              </h2>
              <Image
                src={group.image}
                alt={group.alt}
                width={1120}
                height={840}
                className="aspect-4/3 w-full max-w-[460px] rounded-[20px] object-cover"
              />
            </div>

            <ul className="grid list-none gap-3">
              {group.items.map((item) => (
                <li
                  key={item.n}
                  className="border-v3-navy/10 bg-v3-paper hover:border-v3-rust flex gap-[18px] rounded-[18px] border p-[22px] transition-[border-color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:translate-x-1"
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
        ))}
      </div>
    </section>
  );
}

export function OtherServices() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto max-w-[1200px] px-5 pt-18 pb-22">
        <div className="reveal mb-9 max-w-[620px]">
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
              key={service.title}
              style={{ "--i": index } as React.CSSProperties}
              className={`reveal reveal-step border-v3-navy/10 relative flex flex-col gap-3 overflow-hidden rounded-[20px] border px-6 py-7 ${toneClass[service.tone]}`}
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

        <div className="reveal bg-v3-navy mt-10 flex flex-wrap items-center justify-between gap-3 rounded-[20px] px-7 py-6 text-white">
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
