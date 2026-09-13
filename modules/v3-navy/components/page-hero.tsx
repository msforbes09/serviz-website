/** The navy banner that opens every v3 page except Home. */
export function PageHero({
  kicker,
  title,
  lede,
  corner = "right",
}: {
  kicker: string;
  title: string;
  lede?: React.ReactNode;
  corner?: "right" | "bottom";
}) {
  return (
    <section className="bg-v3-navy relative overflow-clip text-white">
      {/* The rust corner sweeps in from its edge while the text steps in;
          `.enter-x` gives only the start, the transition is its own. */}
      <div
        aria-hidden
        style={{ "--from-x": "40%" } as React.CSSProperties}
        className={`enter-x motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(.23,1,.32,1)] ${
          corner === "right"
            ? "bg-v3-rust absolute top-0 right-0 h-full w-[30%] [clip-path:polygon(60%_0,100%_0,100%_100%,20%_100%)]"
            : "bg-v3-rust absolute right-0 bottom-0 h-[60%] w-[40%] opacity-95 [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)]"
        }`}
      />
      <div className="relative mx-auto max-w-[1200px] px-5 pt-18 pb-16 max-md:text-center">
        <p
          style={{ "--i": 0 } as React.CSSProperties}
          className="text-v3-sky enter-rise enter-step mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase"
        >
          {kicker}
        </p>
        <h1
          style={{ "--i": 1 } as React.CSSProperties}
          className="font-outfit enter-rise enter-step mb-[18px] max-w-[760px] max-md:mx-auto text-[clamp(36px,5.5vw,62px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-pretty"
        >
          {title}
        </h1>
        {lede && (
          <p
            style={{ "--i": 2 } as React.CSSProperties}
            className="text-v3-on-dark enter-rise enter-step max-w-[620px] text-[17px] max-md:mx-auto leading-[1.65] text-pretty"
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
