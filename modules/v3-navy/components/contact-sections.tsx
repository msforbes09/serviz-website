import { officeAddress, siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

const rows = [
  {
    key: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    badge: "@",
  },
  {
    key: "Mobile",
    value: siteConfig.contact.phones.mobile,
    href: `tel:${siteConfig.contact.mobileTel}`,
    badge: "☏",
  },
  {
    key: "Facebook",
    value: siteConfig.contact.facebookHandle,
    href: siteConfig.contact.facebook,
    badge: "f",
    external: true,
  },
];

export function ContactDetails() {
  return (
    <div>
      <p className="text-v3-rust mb-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
        Contact
      </p>
      <h1 className="font-outfit text-v3-navy mb-[18px] text-[clamp(34px,5vw,58px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-pretty">
        Let’s talk about your business — no strings attached.
      </h1>
      <p className="text-v3-slate-deep mb-8 text-[17px] leading-[1.7]">
        We reply within one working day.
      </p>

      <ul className="grid list-none gap-3">
        {rows.map((row) => (
          <li key={row.key}>
            <a
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noopener" } : {})}
              className="border-v3-navy/10 bg-v3-paper hover:border-v3-rust flex items-center gap-4 rounded-2xl border px-5 py-[18px] transition-colors"
            >
              <span
                aria-hidden
                className="bg-v3-navy text-v3-rust font-outfit flex size-11 shrink-0 items-center justify-center rounded-xl font-extrabold"
              >
                {row.badge}
              </span>
              <span>
                <span className="text-v3-slate block text-xs font-semibold tracking-[0.1em] uppercase">
                  {row.key}
                </span>
                <span className="block text-[17px] font-semibold break-all">
                  {row.value}
                </span>
              </span>
            </a>
          </li>
        ))}

        <li className="border-v3-navy/10 bg-v3-paper flex items-start gap-4 rounded-2xl border px-5 py-[18px]">
          <span
            aria-hidden
            className="bg-v3-navy text-v3-rust font-outfit flex size-11 shrink-0 items-center justify-center rounded-xl font-extrabold"
          >
            ⌖
          </span>
          <span>
            <span className="text-v3-slate block text-xs font-semibold tracking-[0.1em] uppercase">
              Office
            </span>
            <span className="text-v3-navy block text-[17px] leading-snug font-semibold">
              {officeAddress}
            </span>
            <span className="text-v3-slate mt-1 block text-[13px]">
              {siteConfig.office.hours}
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export function ContactAside() {
  return (
    <div className="grid gap-4">
      <div className="border-v3-navy/12 aspect-4/3 min-h-[320px] overflow-hidden rounded-3xl border bg-[#eef4fa]">
        <iframe
          title="Map to the SERBIZ office"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.office.mapsQuery)}&z=16&output=embed`}
          loading="lazy"
          className="block size-full border-0"
        />
      </div>
      <ContactForm />
    </div>
  );
}
