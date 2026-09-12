"use client";

/**
 * A card that lights up under the pointer.
 *
 * The pointer position is written to two custom properties and the gradient is
 * drawn in CSS, so React re-renders nothing as the mouse moves — the style
 * property is set straight on the node. The glow itself only exists on devices
 * that actually hover; see `.v1-spotlight` in `globals.css`.
 *
 * A client component, but the card's contents are passed in as children and
 * stay server-rendered.
 */
export function SpotlightCard({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  }

  return (
    <article
      onMouseMove={handleMouseMove}
      style={style}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <span aria-hidden className="v1-spotlight" />
    </article>
  );
}
