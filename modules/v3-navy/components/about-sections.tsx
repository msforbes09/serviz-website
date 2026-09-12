import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { reasons } from "../lib/content";

export function AboutIntro() {
  return (
    <section className="relative overflow-clip bg-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,var(--color-v3-navy)_0_60%,var(--color-v3-rust)_60%_100%)]"
      />
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-5 pt-18 pb-10 enter-rise">
        <div>
          <p className="text-v3-rust mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
            About SERBIZ
          </p>
          <h1 className="font-outfit text-v3-navy mb-5 text-[clamp(34px,5vw,58px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-pretty">
            Run by people who have done this work for decades.
          </h1>
          <p className="text-v3-slate-deep text-lg leading-relaxed text-pretty">
            A member-owned cooperative in Kapitolyo, Pasig — experienced women
            in payroll, accounting and HR giving small businesses big-company
            back-office support.
          </p>
        </div>

        <div className="relative min-h-[320px]">
          <div className="bg-v3-navy absolute inset-0 overflow-hidden rounded-[28px] [clip-path:polygon(0_0,80%_0,100%_20%,100%_100%,20%_100%,0_80%)]">
            <Image
              src="/designs/stock/v3-about-workspace.jpg"
              alt="An open plan office of empty desks under linear ceiling lights"
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              className="object-cover"
            />
          </div>
          <div aria-hidden className="absolute bottom-[-8px] -left-2 flex gap-2">
            <span className="bg-v3-steel block h-2.5 w-[30px] -skew-x-[35deg]" />
            <span className="bg-v3-steel block h-2.5 w-[30px] -skew-x-[35deg]" />
            <span className="bg-v3-steel block h-2.5 w-[30px] -skew-x-[35deg]" />
            <span className="bg-v3-rust block h-2.5 w-[30px] -skew-x-[35deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MissionVision() {
  return (
    <section className="bg-v3-paper">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 px-5 py-15">
        <article className="reveal bg-v3-navy relative overflow-hidden rounded-3xl p-[clamp(28px,4vw,44px)] text-white">
          <div
            aria-hidden
            className="bg-v3-rust absolute top-[-30px] right-[-30px] size-35 opacity-90 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
          />
          <h2 className="text-v3-sky mb-3.5 text-[13px] font-semibold tracking-[0.18em] uppercase">
            Mission
          </h2>
          <p className="font-outfit relative text-[clamp(20px,2.2vw,26px)] leading-[1.35] font-semibold text-pretty">
            {siteConfig.mission}
          </p>
        </article>

        <article className="reveal border-v3-navy/12 text-v3-navy relative overflow-hidden rounded-3xl border bg-white p-[clamp(28px,4vw,44px)]">
          <div
            aria-hidden
            className="bg-v3-mint absolute top-[-30px] right-[-30px] size-35 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
          />
          <h2 className="text-v3-rust mb-3.5 text-[13px] font-semibold tracking-[0.18em] uppercase">
            Vision
          </h2>
          <p className="font-outfit relative text-[clamp(20px,2.2vw,26px)] leading-[1.35] font-semibold text-pretty">
            {siteConfig.vision}
          </p>
        </article>
      </div>
    </section>
  );
}

export function WhyClientsStay() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 px-5 pt-15 pb-22">
        <div
          style={{ "--from-x": "-48px" } as React.CSSProperties}
          className="reveal reveal-x"
        >
          <p className="text-v3-rust mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
            Why clients stay
          </p>
          <h2 className="font-outfit text-v3-navy text-[clamp(28px,3.8vw,42px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-pretty">
            Payroll and accounting under one roof.
          </h2>
        </div>

        <ul className="grid list-none gap-3">
          {reasons.map((reason, index) => (
            <li
              key={reason.n}
              style={{ "--i": index } as React.CSSProperties}
              className="reveal reveal-step border-v3-navy/10 bg-v3-paper flex items-center gap-4 rounded-2xl border px-5 py-4"
            >
              <span className="bg-v3-navy text-v3-rust font-outfit grid size-9 shrink-0 place-items-center rounded-[10px] text-[15px] font-extrabold">
                {reason.n}
              </span>
              <span className="text-v3-navy font-semibold">{reason.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
