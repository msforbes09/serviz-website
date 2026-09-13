"use client";

import type { ComponentProps } from "react";

/**
 * Pointer-tracking wrapper for the hero composition. Writes `--tilt-x` and
 * `--tilt-y`, each -1..1 across the element, onto its own element; the CSS
 * (`.v3-tilt*` in globals.css) turns them into a few degrees of tilt on the
 * photo. Leaving sets both to 0 and the
 * CSS transition eases everything back. Nothing runs on a touch screen or
 * under reduced motion — the CSS is gated, and the variables are harmless.
 *
 * Writes go straight to the DOM rather than through state: a pointer move
 * arrives every frame, and a re-render per frame for two custom properties
 * would be the expensive way to do nothing.
 */
export function HeroTilt(props: ComponentProps<"div">) {
  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    el.style.setProperty("--tilt-x", String(Math.max(-1, Math.min(1, x))));
    el.style.setProperty("--tilt-y", String(Math.max(-1, Math.min(1, y))));
  }

  function handleLeave(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0");
    event.currentTarget.style.setProperty("--tilt-y", "0");
  }

  return (
    <div {...props} onPointerMove={handleMove} onPointerLeave={handleLeave} />
  );
}
