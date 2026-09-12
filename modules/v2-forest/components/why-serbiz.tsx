import { siteConfig } from "@/lib/site-config";
import { reasons } from "../lib/content";

export function WhySerbiz() {
  return (
    <section id="why" className="bg-v2-forest relative overflow-clip text-white">
      <div aria-hidden className="pointer-events-none absolute top-7 right-5 flex gap-2.5">
        <span className="block h-3 w-9 -skew-x-[35deg] bg-[#9aa5ad]" />
        <span className="block h-3 w-9 -skew-x-[35deg] bg-[#9aa5ad]" />
        <span className="bg-v2-orange block h-3 w-9 -skew-x-[35deg]" />
      </div>

      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-12 px-5 py-[clamp(64px,8vw,112px)]">
        <div className="reveal flex flex-col gap-[18px]">
          <span className="text-v2-peach text-xs font-semibold tracking-[0.14em] uppercase">
            Why SERBIZ
          </span>
          <h2 className="font-sora text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
            Big-firm discipline, small-business attention
          </h2>
          <p className="text-v2-on-dark text-base leading-[1.7] text-pretty">
            Large providers are built for large clients. {siteConfig.legalName} (
            {siteConfig.shortName}) is built for the sole proprietor, the
            one-person corporation and the SME — businesses where the owner is
            still signing every cheque. Because payroll and accounting sit with
            one team, nothing falls between the cracks: your books, your people
            and your compliance calendar all speak to each other.
          </p>
          <blockquote className="border-v2-orange rounded-r-2xl border-l-[3px] bg-white/5 px-5 py-[18px] text-[15px] leading-relaxed text-white italic">
            “{siteConfig.motto}”
          </blockquote>
        </div>

        <div className="grid gap-3.5">
          {reasons.map((reason) => (
            <div
              key={reason.n}
              className="reveal flex items-start gap-4 rounded-[18px] border border-white/10 bg-white/5 p-[22px]"
            >
              <span className="font-sora text-v2-orange w-9 shrink-0 text-[22px] leading-none font-extrabold">
                {reason.n}
              </span>
              <div className="flex flex-col gap-1.5">
                <strong className="font-sora text-[17px] font-semibold">
                  {reason.title}
                </strong>
                <span className="text-v2-on-dark text-[14.5px] leading-relaxed">
                  {reason.body}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
