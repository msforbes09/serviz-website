import { ServiceCards } from "./service-cards";

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,8vw,112px)]"
    >
      <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div className="flex max-w-[620px] flex-col gap-3">
          <span className="text-v2-orange text-xs font-semibold tracking-[0.14em] uppercase">
            What we take off your plate
          </span>
          <h2 className="font-sora text-v2-forest text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
            Six services. One team that knows your business.
          </h2>
        </div>
        <p className="text-v2-muted max-w-[380px] text-[15px] leading-relaxed text-pretty">
          Start with one service or bundle several into a package priced for
          your size. Open a card to see what’s included.
        </p>
      </div>

      <ServiceCards />
    </section>
  );
}
