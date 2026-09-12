import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      {/* Base UI composes via `render`, not shadcn/Radix's `asChild`. */}
      <Button render={<Link href="/">Back to home</Link>} />
    </section>
  );
}
