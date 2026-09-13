"use client";

import type { ComponentProps, MouseEvent } from "react";

/**
 * Two things a fragment jump does that a scripted one has to do by hand: land
 * the section under `scroll-margin-top`, which `scrollIntoView` honours, and
 * move focus there, so the next Tab continues from the section rather than
 * from the link just used. Sections are not focusable on their own, hence the
 * tabindex.
 */
export function jumpTo(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  // No `behavior`, so this defers to the CSS `scroll-behavior`: smooth
  // normally, instant for a visitor who asked for reduced motion.
  target.scrollIntoView({ block: "start" });
}

/**
 * Returns the section when the link points at one on this page, having taken
 * over the click. Anything else is left to the browser.
 */
export function sectionFor(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById(event.currentTarget.hash.slice(1));
  if (target) event.preventDefault();
  return target;
}

/**
 * An in-page link that scrolls from script instead of letting the fragment
 * navigate. A fragment navigation writes `#contact` into the address bar, and
 * a refresh then reopens the page part way down, past the hero and its
 * entrance. The href stays, so a visitor without scripting still gets the
 * jump. A leaf client component, so the sections that use it stay
 * server-rendered.
 */
export function SectionLink(props: ComponentProps<"a">) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = sectionFor(event);
    if (target) jumpTo(target);
  }

  return <a {...props} onClick={handleClick} />;
}
