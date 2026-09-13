import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { basePath } from "../lib/content";
import { AudienceStrip } from "./home-sections";
import { QuickMessageDialog } from "./quick-message-dialog";

/**
 * The first screen: hero plus the "We work with" strip, together at least the
 * viewport less the header, so the services grid waits below the fold at any
 * window height. The hero takes the slack and centres its content; the strip
 * sits pinned at the bottom. `svh` is the small viewport, so a phone with its
 * browser chrome showing never overshoots. A floor, not a height — on a phone
 * the two already stack past one screen and simply scroll.
 */
export function HomeOpening() {
  return (
    <div
      data-testid="home-opening"
      className="flex min-h-[calc(100svh-var(--v3-nav-height))] flex-col"
    >
      <HomeHero />
      <AudienceStrip />
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="bg-v3-navy relative flex flex-1 items-center overflow-clip text-white [--v3-focus-ring:var(--color-v3-paper)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-v3-navy-deep absolute top-[-10%] right-[-8%] h-[120%] w-[60%] opacity-90 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
        {/* The wedge sweeps in from the right edge. Transform only, and its
            own transition: `.enter-x` supplies just the start position.
            Desktop only: in the single phone column it ran under the buttons
            and the photograph. */}
        <div
          style={{ "--from-x": "40%" } as React.CSSProperties}
          className="bg-v3-rust enter-x absolute top-0 right-0 hidden h-full w-[34%] opacity-95 [clip-path:polygon(70%_0,100%_0,100%_100%,40%_100%)] motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(.23,1,.32,1)] md:block"
        />
        <div className="absolute top-[22px] left-5 flex gap-2.5">
          {[0, 1, 2, 3].map((n) => (
            <span
              key={n}
              style={{ "--i": 5 + n } as React.CSSProperties}
              className="bg-v3-steel enter-rise enter-step block h-3 w-[34px] -skew-x-[35deg]"
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 px-5 pt-10 pb-14">
        <div className="max-md:text-center">
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
            className="text-v3-on-dark enter-rise enter-step mb-[34px] max-w-[540px] max-md:mx-auto text-[clamp(16px,1.6vw,19px)] leading-relaxed text-pretty"
          >
            Payroll, accounting, tax, HR and IT — handled for small businesses
            in the Philippines.
          </p>
          <div className="flex flex-wrap gap-3 max-md:flex-col max-md:items-stretch">
            {/* The entrance wrapper is a span around the trigger rather than
                on it: the `.enter-*` transition shorthand would replace the
                button's own hover transition. */}
            <span
              style={{ "--i": 3 } as React.CSSProperties}
              className="enter-rise enter-step flex max-md:w-full"
            >
              <QuickMessageDialog
                subject="Consultation request"
                className="bg-v3-rust hover:bg-v3-rust-bright w-full cursor-pointer rounded-full border-0 px-[26px] py-4 text-center text-base font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-0.5 active:scale-[.97]"
              >
                Book a free consultation
              </QuickMessageDialog>
            </span>
            <Link
              href={`${basePath}/services`}
              style={{ "--i": 4 } as React.CSSProperties}
              className="enter-rise enter-step rounded-full border-[1.5px] border-white/50 px-[26px] py-[15px] text-center text-base font-semibold text-white max-md:w-full transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:border-white hover:bg-white/10 active:scale-[.97]"
            >
              See our services
            </Link>
          </div>
        </div>

        {/* The composition slides in from the right as one piece, like v1's,
            transform only. No fade on this wrapper: it used to carry
            `enter-rise`, which faded everything inside it — including the
            `priority` photograph below, this page's LCP element. Each child
            still animates on its own terms on top of the slide: the photo
            settles without fading, the quote card slides in from the left. */}
        <div
          style={{ "--from-x": "56px" } as React.CSSProperties}
          className="enter-x relative flex min-h-[340px] items-center justify-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(.23,1,.32,1)]"
        >
          <div className="group absolute inset-x-[6%] inset-y-[8%] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_rgba(0,0,0,.35)] [clip-path:polygon(25%_0,100%_0,100%_75%,75%_100%,0_100%,0_25%)]">
            <Image
              src="/designs/stock/v3-hero-corridor.jpg"
              alt="A corridor in a modern office, with a deep blue wall and a slatted ceiling"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 560px"
              className="enter-zoom object-cover motion-safe:group-hover:[transform:scale(1.04)]"
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
        </div>
      </div>
    </section>
  );
}
