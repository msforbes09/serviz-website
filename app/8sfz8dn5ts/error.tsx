"use client";

export default function V1Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        This preview could not be loaded
      </h1>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white"
      >
        Try again
      </button>
    </section>
  );
}
