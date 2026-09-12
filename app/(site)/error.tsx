"use client";

import { Button } from "@/components/ui/button";

export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">
        This page could not be loaded. Try again, or contact us if it keeps
        happening.
      </p>
      <Button onClick={reset}>Try again</Button>
    </section>
  );
}
