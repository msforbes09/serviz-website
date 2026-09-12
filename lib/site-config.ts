/**
 * Organisation facts, taken from the SERBIZ print material in `references/`.
 * Single source for metadata, JSON-LD and the header/footer — never retype a
 * phone number or an address into a component.
 */
export const siteConfig = {
  name: "SERBIZ",
  legalName: "SERBIZ Resources Income Workers Cooperative",
  shortName: "SRI",
  tagline: "Payroll and accounting outsourcing for growing Philippine businesses",
  description:
    "SERBIZ Resources Income Workers Cooperative is a payroll and accounting outsourced cooperative serving Sole Proprietors, One Person Corporations and Small and Medium Enterprises.",
  mission:
    "To help our clients grow their business by providing high quality, compliant and cost-effective tailored outsourced services in ensuring reduced overheads and time efficiencies for our clients, so they can have a greater focus on the more profitable areas of their business.",
  vision:
    "To be one of the preferred finance and accounting process outsourcing business in various industries not only for Cooperatives but for all types of entities with business servicing needs.",
  contact: {
    email: "serbiz.mgt@gmail.com",
    phones: ["(02) 7002-1352", "(0915) 816 2433"],
  },
} as const;

export type SiteConfig = typeof siteConfig;
