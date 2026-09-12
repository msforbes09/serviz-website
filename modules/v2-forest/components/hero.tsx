import Image from "next/image";
import { heroStats, marqueeWords } from "../lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-v2-forest relative overflow-hidden text-white"
    >
      {/* Soft colour wash and the skewed brand bars from the print material. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-30%] right-[-8%] aspect-square w-[60vw] max-w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,29,.28),transparent_70%)]" />
        <div className="absolute bottom-[-40%] left-[-6%] aspect-square w-[60vw] max-w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(120,200,120,.18),transparent_70%)]" />
        <div className="absolute top-7 left-5 flex gap-2.5">
          <span className="block h-3 w-9 -skew-x-[35deg] bg-[#9aa5ad]" />
          <span className="block h-3 w-9 -skew-x-[35deg] bg-[#9aa5ad]" />
          <span className="block h-3 w-9 -skew-x-[35deg] bg-[#9aa5ad]" />
          <span className="bg-v2-orange block h-3 w-9 -skew-x-[35deg]" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-10 px-5 pt-[clamp(72px,10vw,128px)] pb-[clamp(64px,8vw,104px)]">
        <div className="flex max-w-[620px] flex-col gap-[22px]">
          <span className="text-v2-peach inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase">
            <span className="bg-v2-orange inline-block size-2 rounded-full" />
            Payroll · Accounting · Compliance · Pasig City
          </span>
          <h1 className="font-sora text-[clamp(36px,6vw,68px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-balance">
            Run your business.{" "}
            <span className="text-v2-orange">We’ll run the paperwork.</span>
          </h1>
          <p className="text-v2-on-dark max-w-[540px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-pretty">
            Payroll, books, BIR filings and government benefits — handled on
            time by a Pasig-based cooperative that works exclusively with sole
            proprietors, one-person corporations and growing SMEs.
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="bg-v2-orange hover:bg-v2-orange-bright inline-flex items-center gap-2.5 rounded-full px-[26px] py-[15px] text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97]"
            >
              Get a free consultation <span aria-hidden>→</span>
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/20 bg-white/10 px-[26px] py-[15px] text-[15px] font-medium text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:bg-white/20 active:scale-[.97]"
            >
              Explore services
            </a>
          </div>
          <dl className="mt-[18px] flex flex-wrap gap-x-9 gap-y-6 border-t border-white/15 pt-6">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <dt className="font-sora text-2xl font-bold">{stat.value}</dt>
                <dd className="text-v2-on-dark-muted text-[12.5px]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex min-h-[320px] items-center justify-center">
          <div className="border-v2-orange relative w-[min(100%,460px)] -rotate-3 overflow-hidden rounded-[28px] border-[3px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
            <Image
              src="/designs/stock/hero-advisors.jpg"
              alt="Two professionals reviewing accounts together"
              width={900}
              height={1350}
              priority
              className="block aspect-4/5 w-full scale-110 rotate-3 object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,61,31,0)_50%,rgba(11,61,31,.55))]"
            />
          </div>

          <Image
            src="/brand/serbiz-mark.png"
            alt=""
            width={130}
            height={130}
            aria-hidden
            className="pointer-events-none absolute top-[-6%] left-[-4%] w-[min(28%,130px)] drop-shadow-[0_20px_30px_rgba(0,0,0,.5)] motion-safe:animate-[v2-float_7s_ease-in-out_infinite]"
          />

          <div className="text-v2-forest absolute bottom-[6%] left-[4%] flex items-center gap-2.5 rounded-2xl bg-white p-3 text-[13px] font-medium shadow-[0_20px_40px_-18px_rgba(0,0,0,.5)]">
            <span className="bg-v2-forest font-sora grid size-[30px] place-items-center rounded-lg text-[13px] font-bold text-white">
              ₱
            </span>
            <span className="flex flex-col leading-tight">
              <span>Payroll released</span>
              <span className="text-v2-muted text-xs font-normal">
                15th &amp; 30th · on schedule
              </span>
            </span>
          </div>

          <div className="text-v2-forest absolute top-[8%] right-[2%] flex items-center gap-2.5 rounded-2xl bg-white p-3 text-[13px] font-medium shadow-[0_20px_40px_-18px_rgba(0,0,0,.5)]">
            <span className="bg-v2-orange grid size-[30px] place-items-center rounded-lg font-bold text-white">
              ✓
            </span>
            <span className="flex flex-col leading-tight">
              <span>BIR filed</span>
              <span className="text-v2-muted text-xs font-normal">
                SSS · PhilHealth · Pag-IBIG remitted
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Duplicated word list so the translate loop has no visible seam. */}
      <div className="relative overflow-hidden border-t border-white/15 py-3.5">
        <div className="inline-flex w-max motion-safe:animate-[v2-marquee_28s_linear_infinite]">
          {[...marqueeWords, ...marqueeWords].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="text-v2-peach inline-flex items-center gap-[18px] pr-[18px] text-[13px] font-medium tracking-[0.12em] whitespace-nowrap uppercase"
              aria-hidden={index >= marqueeWords.length}
            >
              {word}
              <span className="bg-v2-orange inline-block size-1.5 rounded-full" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
