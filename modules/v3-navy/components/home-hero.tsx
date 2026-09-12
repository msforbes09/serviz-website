import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { basePath } from "../lib/content";

export function HomeHero() {
  return (
    <section className="bg-v3-navy relative overflow-hidden text-white [--v3-focus-ring:var(--color-v3-paper)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-v3-navy-deep absolute top-[-10%] right-[-8%] h-[120%] w-[60%] opacity-90 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
        <div className="bg-v3-rust absolute top-0 right-0 h-full w-[34%] opacity-95 [clip-path:polygon(70%_0,100%_0,100%_100%,40%_100%)]" />
        <div className="absolute top-[22px] left-5 flex gap-2.5">
          <span className="bg-v3-steel block h-3 w-[34px] -skew-x-[35deg]" />
          <span className="bg-v3-steel block h-3 w-[34px] -skew-x-[35deg]" />
          <span className="bg-v3-steel block h-3 w-[34px] -skew-x-[35deg]" />
          <span className="bg-v3-steel block h-3 w-[34px] -skew-x-[35deg]" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 px-5 pt-18 pb-20">
        <div>
          <p
            style={{ "--i": 0 } as React.CSSProperties}
            className="text-v3-sky enter-rise enter-step mb-[18px] text-[13px] font-semibold tracking-[0.18em] uppercase"
          >
            Payroll · Accounting · Tax · HR · IT — Pasig City
          </p>
          <h1
            style={{ "--i": 1 } as React.CSSProperties}
            className="font-outfit enter-rise enter-step mb-[22px] text-[clamp(38px,6vw,68px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-pretty"
          >
            Why worry about the small stuff when you can leave it to us?
          </h1>
          <p
            style={{ "--i": 2 } as React.CSSProperties}
            className="text-v3-on-dark enter-rise enter-step mb-[34px] max-w-[540px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-pretty"
          >
            Payroll, accounting, tax, HR and IT — handled for small businesses
            in the Philippines.
          </p>
          <div
            style={{ "--i": 3 } as React.CSSProperties}
            className="enter-rise enter-step flex flex-wrap gap-3"
          >
            <a
              href={`mailto:${siteConfig.contact.email}?subject=Consultation%20request`}
              className="bg-v3-rust hover:bg-v3-rust-bright rounded-full px-[26px] py-4 text-base font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-0.5 active:scale-[.97]"
            >
              Book a free consultation
            </a>
            <Link
              href={`${basePath}/services`}
              className="rounded-full border-[1.5px] border-white/50 px-[26px] py-[15px] text-base font-semibold text-white transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:border-white hover:bg-white/10 active:scale-[.97]"
            >
              See our services
            </Link>
          </div>
        </div>

        {/* No entrance on this wrapper. It used to carry `enter-rise`, which fades
            everything inside it — including the `priority` photograph below, which
            is this page's LCP element. Each child now animates on its own terms:
            the photo scales without fading, the quote card slides, the logo drifts. */}
        <div className="relative flex min-h-[340px] items-center justify-center">
          <div className="absolute inset-x-[6%] inset-y-[8%] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_rgba(0,0,0,.35)] [clip-path:polygon(25%_0,100%_0,100%_75%,75%_100%,0_100%,0_25%)]">
            <Image
              src="/designs/stock/v3-hero-corridor.jpg"
              alt="A corridor in a modern office, with a deep blue wall and a slatted ceiling"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 560px"
              className="enter-zoom object-cover"
            />
          </div>

          <div className="bg-v3-navy absolute bottom-[2%] left-0 max-w-[280px] rounded-2xl border border-white/10 px-5 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,.35)] enter-slide">
            <p className="text-v3-sky mb-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
              Our promise
            </p>
            <p className="font-outfit text-lg leading-tight font-bold">
              “{siteConfig.motto}”
            </p>
          </div>

          <Image
            src="/designs/v3/logo-mark.png"
            alt=""
            width={96}
            height={96}
            aria-hidden
            className="absolute top-0 right-[2%] size-24 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,.35)] motion-safe:animate-[v3-drift_6s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </section>
  );
}
