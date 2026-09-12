/**
 * Stands in for a scanned document that has not been supplied yet.
 *
 * Deliberately not a stock photo. Any photograph of an official-looking
 * document, placed under a caption naming a specific certificate, reads as
 * that certificate — and placeholders have a way of surviving to launch. This
 * cannot be mistaken for the real thing at any size.
 *
 * The 3:4 ratio matches the scans it replaces, so swapping the real file in
 * does not move the layout.
 */
export function DocumentPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — scan not yet supplied`}
      className="flex aspect-3/4 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-current/25 bg-current/5 p-4 text-center"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-8 opacity-40"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8M8 17h5" />
      </svg>
      <span className="text-xs leading-snug font-medium opacity-70 text-balance">
        {label}
      </span>
      <span className="text-[11px] leading-snug opacity-50">
        Scan to follow
      </span>
    </div>
  );
}
