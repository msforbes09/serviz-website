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
      <div
        aria-hidden
        className={
          corner === "right"
            ? "bg-v3-rust absolute top-0 right-0 h-full w-[30%] [clip-path:polygon(60%_0,100%_0,100%_100%,20%_100%)]"
            : "bg-v3-rust absolute right-0 bottom-0 h-[60%] w-[40%] opacity-95 [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)]"
        }
      />
      <div className="relative mx-auto max-w-[1200px] px-5 pt-18 pb-16 enter-rise">
        <p className="text-v3-sky mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
          {kicker}
        </p>
        <h1 className="font-outfit mb-[18px] max-w-[760px] text-[clamp(36px,5.5vw,62px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-pretty">
          {title}
        </h1>
        {lede && (
          <p className="text-v3-on-dark max-w-[620px] text-[17px] leading-[1.65] text-pretty">
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
