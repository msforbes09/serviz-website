import { LoadingAtTop } from "@/modules/v3-navy/components/route-top";

/**
 * Shaped like the home hero it stands in for, on the same height floor, so a
 * page that is still arriving looks like a page rather than a navy hole, and
 * nothing jumps when the real content lands. Decorative, so hidden from
 * assistive tech.
 */
export default function V3Loading() {
  return (
    <div
      aria-hidden="true"
      className="bg-v3-navy relative flex min-h-[calc(100svh-var(--v3-nav-height))] flex-col overflow-clip"
    >
      {/* Scrolls to the top on mount after a link press; see route-top.tsx. */}
      <LoadingAtTop />
      <div className="bg-v3-rust absolute top-0 right-0 h-full w-[34%] opacity-95 [clip-path:polygon(70%_0,100%_0,100%_100%,40%_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 px-5 pt-18 pb-20">
        <div>
          <div className="mb-5 h-3 w-64 animate-pulse rounded bg-white/15" />
          <div className="mb-3 h-14 w-full animate-pulse rounded-lg bg-white/15" />
          <div className="mb-3 h-14 w-5/6 animate-pulse rounded-lg bg-white/15" />
          <div className="mb-8 h-14 w-2/3 animate-pulse rounded-lg bg-white/15" />
          <div className="mb-9 h-5 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="flex gap-3">
            <div className="h-14 w-56 animate-pulse rounded-full bg-white/20" />
            <div className="h-14 w-44 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
        <div className="relative min-h-[340px]">
          <div className="absolute inset-x-[6%] inset-y-[8%] animate-pulse rounded-[28px] bg-white/10 [clip-path:polygon(25%_0,100%_0,100%_75%,75%_100%,0_100%,0_25%)]" />
        </div>
      </div>
      <div className="h-[76px] bg-white" />
    </div>
  );
}
