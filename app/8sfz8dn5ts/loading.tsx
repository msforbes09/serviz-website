/**
 * Shaped like the v1 hero it stands in for, on the same height floor, so the
 * page reads as arriving rather than missing and nothing jumps when the real
 * content lands. Decorative, so hidden from assistive tech.
 */
export default function V1Loading() {
  return (
    <div
      aria-hidden="true"
      className="bg-v1-paper mx-auto grid min-h-[calc(100svh-var(--v1-nav-height))] max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 pt-16 pb-24 min-[900px]:grid-cols-[1.35fr_1fr]"
    >
      <div className="max-w-[680px]">
        <div className="bg-v1-line h-7 w-72 animate-pulse rounded-full" />
        <div className="bg-v1-line mt-6 h-12 w-full animate-pulse rounded-lg" />
        <div className="bg-v1-line mt-3 h-12 w-11/12 animate-pulse rounded-lg" />
        <div className="bg-v1-line mt-3 h-12 w-3/4 animate-pulse rounded-lg" />
        <div className="bg-v1-line mt-6 h-5 w-5/6 animate-pulse rounded" />
        <div className="bg-v1-line mt-2 h-5 w-2/3 animate-pulse rounded" />
        <div className="mt-8 flex gap-3">
          <div className="bg-v1-line h-12 w-52 animate-pulse rounded-lg" />
          <div className="bg-v1-line h-12 w-40 animate-pulse rounded-lg" />
        </div>
      </div>
      <div className="bg-v1-line aspect-[5/4] w-full animate-pulse rounded-3xl" />
    </div>
  );
}
