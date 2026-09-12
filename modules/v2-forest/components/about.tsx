import { siteConfig } from "@/lib/site-config";
import { permits } from "../lib/content";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-[1180px] flex-col gap-12 px-5 py-[clamp(64px,8vw,112px)]"
    >
      <div className="reveal flex max-w-[640px] flex-col gap-3">
        <span className="text-v2-orange text-xs font-semibold tracking-[0.14em] uppercase">
          About the cooperative
        </span>
        <h2 className="font-sora text-v2-forest text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
          Fully registered — and here to keep you that way
        </h2>
        <p className="text-v2-muted text-base leading-[1.7] text-pretty">
          We help companies navigate the labour and tax rules issued by
          Philippine government agencies, so timely compliance becomes routine
          instead of a scramble. We hold ourselves to the same standard: SERBIZ
          operates fully licensed from Kapitolyo, Pasig.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        <article className="reveal border-v2-forest/10 flex flex-col gap-3 rounded-[20px] border bg-white px-[26px] py-7">
          <h3 className="bg-v2-orange font-sora self-start rounded-md px-3 py-1.5 text-[13px] font-bold tracking-[0.06em] text-white">
            MISSION
          </h3>
          <p className="text-v2-ink text-[15.5px] leading-[1.7] text-pretty">
            {siteConfig.mission}
          </p>
        </article>

        <article className="reveal border-v2-forest/10 flex flex-col gap-3 rounded-[20px] border bg-white px-[26px] py-7">
          <h3 className="bg-v2-forest font-sora self-start rounded-md px-3 py-1.5 text-[13px] font-bold tracking-[0.06em] text-white">
            VISION
          </h3>
          <p className="text-v2-ink text-[15.5px] leading-[1.7] text-pretty">
            {siteConfig.vision}
          </p>
        </article>

        <article className="reveal border-v2-forest/10 bg-v2-mist flex flex-col gap-3.5 rounded-[20px] border px-[26px] py-7">
          <h3 className="font-sora text-v2-forest text-[13px] font-bold tracking-[0.06em]">
            PERMITS &amp; LICENSES
          </h3>
          <ul className="flex list-none flex-col gap-3 text-[14.5px] leading-normal">
            {permits.map((permit) => (
              <li key={permit.title} className="flex gap-2.5">
                <span aria-hidden className="text-v2-orange font-bold">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold">{permit.title}</strong>
                  <br />
                  <span className="text-v2-muted">{permit.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
