// Shown while a dynamic hole in this segment streams in. Match the real
// content's dimensions so the page does not shift when it resolves.
export default function SiteLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-6 py-24">
      <div className="bg-muted h-4 w-40 animate-pulse rounded" />
      <div className="bg-muted h-10 w-full animate-pulse rounded" />
      <div className="bg-muted h-20 w-full animate-pulse rounded" />
    </div>
  );
}
