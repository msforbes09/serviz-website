/**
 * Organisation facts. Single source for metadata, JSON-LD and every layout —
 * never retype a phone number or an address into a component.
 *
 * `source` on each block says where the fact came from. Anything marked
 * `design` was introduced by a Claude Design layout rather than by the print
 * material in `references/Images/`, and is on the sign-off checklist in
 * `TODO.md`. Do not treat those as confirmed.
 */
export const siteConfig = {
  name: "SERBIZ",
  legalName: "SERBIZ Resources Income Workers Cooperative",
  shortName: "SRI",
  tagline: "Payroll and accounting outsourcing for growing Philippine businesses",
  description:
    "SERBIZ Resources Income Workers Cooperative is a payroll and accounting outsourced cooperative serving Sole Proprietors, One Person Corporations and Small and Medium Enterprises.",
  motto: "Empowering Excellence through Collaboration",
  mission:
    "To help our clients grow their business by providing high quality, compliant and cost-effective tailored outsourced services in ensuring reduced overheads and time efficiencies for our clients, so they can have a greater focus on the more profitable areas of their business.",
  vision:
    "To be one of the preferred finance and accounting process outsourcing business in various industries not only for Cooperatives but for all types of entities with business servicing needs.",
  contact: {
    /** source: flyer */
    email: "serbiz.mgt@gmail.com",
    /**
     * source: flyer — each number named, so a layout reads `phones.mobile`
     * rather than indexing a position it has to know about. Every variant
     * shows the mobile; these are the printed forms, not the dialable ones.
     */
    phones: {
      landline: "(02) 7002-1352",
      mobile: "(0915) 816 2433",
    },
    /** source: flyer — the mobile number in dialable form */
    mobileTel: "+639158162433",
    /** source: design — unverified */
    facebook: "https://www.facebook.com/SerbizWorkersCoop",
    /** source: design — unverified */
    facebookHandle: "facebook.com/SerbizWorkersCoop",
  },
  /** source: design — unverified */
  office: {
    street: "18 Philam Rd., Brgy. Kapitolyo",
    city: "Pasig City",
    region: "Metro Manila",
    postalCode: "1600",
    country: "PH",
    hours: "Mon–Fri, 9:00 AM – 6:00 PM",
    mapsQuery: "18 Philam Road, Kapitolyo, Pasig City",
  },
  /** source: design — unverified, and a registration number is worth checking twice */
  registration: {
    authority: "Cooperative Development Authority",
    number: "9520-10130003 1448",
    registeredOn: "1 February 2021",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Full office address on one line. */
export const officeAddress = `${siteConfig.office.street}, ${siteConfig.office.city} ${siteConfig.office.postalCode}`;
