import { officeAddress, siteConfig } from "@/lib/site-config";
import { QuoteForm } from "./quote-form";

const contactRows = [
  {
    key: "Mobile",
    label: siteConfig.contact.phones.mobile,
    href: `tel:${siteConfig.contact.mobileTel}`,
    badge: "TEL",
    badgeClass: "text-[11px]",
  },
  {
    key: "Email",
    label: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    badge: "@",
    badgeClass: "text-[15px]",
  },
  {
    key: "Facebook",
    label: siteConfig.contact.facebookHandle,
    href: siteConfig.contact.facebook,
    badge: "f",
    badgeClass: "text-base",
    external: true,
  },
  {
    key: "Office",
    label: officeAddress,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.office.mapsQuery)}`,
    badge: "MAP",
    badgeClass: "text-[11px]",
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-10 px-5 py-[clamp(64px,8vw,112px)]"
    >
      <div className="reveal flex flex-col gap-[22px]">
        <span className="text-v2-orange text-xs font-semibold tracking-[0.14em] uppercase">
          Let’s talk
        </span>
        <h2 className="font-sora text-v2-forest text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
          Tell us about your business. We’ll tell you what we can take off your
          hands.
        </h2>
        <p className="text-v2-muted text-[15.5px] leading-[1.7] text-pretty">
          A short call is usually enough to scope a package. No commitment —
          just a clear picture of what outsourcing would cost and save you.
        </p>

        <ul className="flex list-none flex-col gap-0.5">
          {contactRows.map((row, index) => (
            <li key={row.key}>
              <a
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noopener" } : {})}
                className={`text-v2-ink hover:text-v2-orange flex items-center gap-3.5 py-3.5 transition-colors ${index < contactRows.length - 1 ? "border-v2-forest/10 border-b" : ""}`}
              >
                <span
                  aria-hidden
                  className={`bg-v2-forest grid size-10 shrink-0 place-items-center rounded-xl font-bold text-white ${row.badgeClass}`}
                >
                  {row.badge}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-v2-muted text-xs">{row.key}</span>
                  <span className="text-base leading-snug font-semibold break-words">
                    {row.label}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <QuoteForm />
    </section>
  );
}
