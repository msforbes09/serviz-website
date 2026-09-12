/**
 * Copy for the v2 layout, transcribed from `Serbiz Landing.dc.html`.
 *
 * Kept as data rather than inline JSX so the sign-off checklist in `TODO.md`
 * has one place to point at. Service lists are drawn from the flyers; the news
 * items came from the design and are NOT confirmed.
 */

export type Service = {
  title: string;
  blurb: string;
  items: string[];
};

export const services: Service[] = [
  {
    title: "Payroll & Benefits Outsourcing",
    blurb:
      "Timekeeping to payslip to government remittance — processed on time, every cut-off.",
    items: [
      "Timekeeping & attendance monitoring",
      "Payroll computation and release",
      "SSS, PhilHealth & Pag-IBIG remittances and claims",
      "Maternity, sickness, leave and loan processing",
      "Employee self-service web portals",
    ],
  },
  {
    title: "Accounting Outsourcing",
    blurb: "Clean books and reports you can actually make decisions with.",
    items: [
      "Bookkeeping & day-to-day recording",
      "Accounts receivable — billing and collections",
      "Accounts payable and expense classification",
      "Monthly financial reports for management",
    ],
  },
  {
    title: "Tax Compliance",
    blurb: "Every BIR return filed and paid on schedule — online or onsite.",
    items: [
      "Monthly, quarterly and annual BIR filings",
      "Withholding tax computation and remittance",
      "Books of accounts and reportorial requirements",
      "Support during BIR inquiries",
    ],
  },
  {
    title: "HR Support & Custom Packages",
    blurb: "The HR desk you don’t have headcount for, sized to your team.",
    items: [
      "Recruitment documentation assistance",
      "Employee records and 201 file management",
      "Benefits administration",
      "Mix-and-match packages across payroll, accounting and HR",
    ],
  },
  {
    title: "Business Registration Assistance",
    blurb: "From DTI or SEC to BIR and Mayor’s Permit — we handle the queues.",
    items: [
      "DTI / SEC / CDA registration",
      "BIR registration and books stamping",
      "Barangay clearance and Mayor’s Permit",
      "SSS, PhilHealth and Pag-IBIG employer registration",
    ],
  },
  {
    title: "IT Consulting",
    blurb:
      "Practical tech for small teams: the right tools, set up properly, kept secure.",
    items: [
      "Payroll, accounting and POS software selection",
      "Cloud email, storage and backups",
      "Website, domain and social setup",
      "Data privacy and basic cybersecurity hygiene",
    ],
  },
];

/** Short labels for the quote form's service chips. */
export const serviceChips = services.map((service) =>
  service.title.replace(" Outsourcing", "").replace(" Assistance", ""),
);

export const heroStats = [
  { value: "Since 2021", label: "CDA-registered cooperative" },
  { value: "6 services", label: "One accountable team" },
  { value: "Zero", label: "Missed cut-offs is the goal" },
] as const;

export const marqueeWords = [
  "Payroll",
  "Bookkeeping",
  "BIR Filing",
  "SSS · PhilHealth · Pag-IBIG",
  "HR Support",
  "Business Registration",
  "IT Consulting",
] as const;

export const reasons = [
  {
    n: "01",
    title: "Deadlines you never have to remember",
    body: "BIR returns filed and paid on schedule. SSS, PhilHealth and Pag-IBIG remitted and claims processed — maternity, sickness, loans — before anyone has to ask.",
  },
  {
    n: "02",
    title: "Payroll on time, every time",
    body: "Correct pay released on the day is a Labor Code mandate and the clearest sign of a good employer. We treat every cut-off as non-negotiable.",
  },
  {
    n: "03",
    title: "A cooperative, not a call center",
    body: "SERBIZ is owned and run by its members — seasoned women professionals in Pasig. The person who answers your message is the same person who keeps your books.",
  },
] as const;

export const permits = [
  {
    title: "CDA Certificate of Compliance",
    detail: "Cooperative Development Authority · registered 01 Feb 2021",
  },
  {
    title: "BIR Certificate of Registration",
    detail: "Bureau of Internal Revenue · Pasig RDO",
  },
  {
    title: "Mayor's Business Permit",
    detail: "City Government of Pasig · renewed annually",
  },
] as const;

export type PostType = "News" | "Event";

export type Post = {
  type: PostType;
  date: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

/**
 * UNVERIFIED. Every item below was written by the design tool, not supplied by
 * the cooperative. Dates, claims and the events themselves need confirming
 * before this page is public — see the sign-off checklist in `TODO.md`.
 */
export const posts: Post[] = [
  {
    type: "News",
    date: "Sep 2026",
    title: "SERBIZ now offers IT Consulting",
    body: "The same team that runs your payroll and books can now help you pick, set up and secure the software behind them.",
    image: "/designs/stock/news-it.jpg",
    alt: "A laptop and notebook on a desk",
  },
  {
    type: "Event",
    date: "Oct 2026",
    title: "Free clinic: Year-end BIR & alphalist prep for SMEs",
    body: "A morning session in Kapitolyo for owners and bookkeepers. Bring your questions; leave with a checklist.",
    image: "/designs/stock/news-clinic.jpg",
    alt: "People seated at a workshop table",
  },
  {
    type: "News",
    date: "Feb 2026",
    title: "Five years as a registered cooperative",
    body: "Registered with the CDA on 1 February 2021, SERBIZ marks five years of serving sole proprietors, OPCs and SMEs.",
    image: "/designs/stock/news-anniversary.jpg",
    alt: "Colleagues talking in an office",
  },
  {
    type: "Event",
    date: "Jan 2026",
    title: "Business permit renewal drive",
    body: "We assisted clients with Mayor’s Permit renewals in Pasig before the January deadline.",
    image: "/designs/stock/payroll-desk.jpg",
    alt: "Paperwork and a calculator on a desk",
  },
];

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why SERBIZ" },
  { href: "#about", label: "About" },
  { href: "#news", label: "News & Events" },
] as const;
