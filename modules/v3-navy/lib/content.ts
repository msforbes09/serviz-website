/**
 * Copy for the v3 layout, transcribed from `Serbiz Landing Page v4.dc.html`.
 *
 * Service names and descriptions come from the flyers. The news items, the
 * event calendar and the response-time promise came from the design and are
 * NOT confirmed — see the sign-off checklist in `TODO.md`.
 */

export const navItems = [
  { href: "/v3", label: "Home" },
  { href: "/v3/services", label: "Services" },
  { href: "/v3/about", label: "About" },
  { href: "/v3/news", label: "News & Events" },
  { href: "/v3/contact", label: "Contact" },
] as const;

/** Card tones, mirroring the design's dark / light / mint rotation. */
export type Tone = "dark" | "light" | "mint";

export const toneClass: Record<Tone, string> = {
  dark: "bg-v3-navy text-white",
  light: "bg-white text-v3-ink",
  mint: "bg-v3-mint text-v3-navy",
};

export type ServiceCard = {
  num: string;
  title: string;
  sub: string;
  tone: Tone;
  isNew?: boolean;
};

export const serviceCards: ServiceCard[] = [
  { num: "01", title: "Payroll & Benefits Outsourcing", sub: "Paid on time, every cut-off.", tone: "dark" },
  { num: "02", title: "Accounting Outsourcing", sub: "Books that balance.", tone: "light" },
  { num: "03", title: "Tax Compliance", sub: "BIR filings, never late.", tone: "light" },
  { num: "04", title: "HR Support", sub: "Records, papers, benefits admin.", tone: "mint" },
  { num: "05", title: "Business Registration", sub: "Paperwork and agency liaison.", tone: "light" },
  { num: "06", title: "IT Consultant", sub: "Systems, cloud, data security.", tone: "light", isNew: true },
  { num: "07", title: "Customized Service Packages", sub: "Mix and match to fit you.", tone: "dark" },
];

export const reasons = [
  { n: "1", title: "Built for SPs, OPCs and SMEs" },
  { n: "2", title: "Payroll and accounting, one team" },
  { n: "3", title: "Compliance handled ahead of deadlines" },
  { n: "4", title: "Member-owned — we share your stake" },
] as const;

export const audiences = [
  "Sole Proprietors",
  "One Person Corporations",
  "Small & Medium Enterprises",
  "Cooperatives",
] as const;

export type ServiceGroup = {
  num: string;
  kicker: string;
  title: string;
  image: string;
  alt: string;
  items: { n: string; title: string; body: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    num: "1",
    kicker: "Payroll & Benefits",
    title: "Payroll and Benefits",
    image: "/designs/stock/payroll-desk.jpg",
    alt: "Paperwork and a calculator on a desk",
    items: [
      { n: "1", title: "Timekeeping & Attendance", body: "Accurate hours, monitored and reported." },
      { n: "2", title: "Payroll Processing", body: "Correct pay, released on time — every cut-off." },
      { n: "3", title: "Government Benefits", body: "SSS, PhilHealth, Pag-IBIG remittances and claims." },
      { n: "4", title: "Employee Web Portal", body: "Payslips, leaves and records online." },
    ],
  },
  {
    num: "2",
    kicker: "Accounting",
    title: "Accounting",
    image: "/designs/stock/accounting-reports.jpg",
    alt: "Financial charts on a laptop screen",
    items: [
      { n: "1", title: "Bookkeeping", body: "Books of accounts and daily transactions." },
      { n: "2", title: "Accounts Receivable", body: "Billed and collected on time." },
      { n: "3", title: "Accounts Payable", body: "Classified, computed and reported." },
      { n: "4", title: "Tax Compliance", body: "Every BIR report filed and paid on schedule." },
    ],
  },
];

export const otherServices: { title: string; body: string; tone: Tone; isNew?: boolean }[] = [
  { title: "HR Support", body: "Recruitment papers, records and benefits admin.", tone: "light" },
  { title: "Business Registration", body: "Paperwork and agency liaison, done right.", tone: "light" },
  { title: "IT Consultant", body: "Systems, cloud and data security for small teams.", tone: "dark", isNew: true },
  { title: "Customized Packages", body: "Mix and match to fit your business.", tone: "mint" },
];

export const permits = [
  {
    image: "/designs/v3/permit-bir.jpg",
    title: "BIR Certificate of Registration",
    detail: "Bureau of Internal Revenue",
  },
  {
    image: "/designs/v3/permit-cda.jpg",
    title: "CDA Certificate of Compliance",
    detail: "Cooperative Development Authority · registered 2021",
  },
  {
    image: "/designs/v3/permit-pasig.jpg",
    title: "Mayor's Permit",
    detail: "City Government of Pasig",
  },
] as const;

/** UNVERIFIED — written by the design tool, not supplied by the cooperative. */
export const news = [
  {
    tag: "New service",
    date: "September 2026",
    title: "IT Consultant services now available",
    body: "Systems set-up, cloud records and data security for small teams.",
    image: "/designs/stock/news-laptops.jpg",
    alt: "Open laptops on a shared desk",
  },
  {
    tag: "Compliance",
    date: "Year-end season",
    title: "Get ahead of year-end payroll and BIR annualization",
    body: "13th-month pay, annualized tax and alphalist — start early.",
    image: "/designs/stock/news-paperwork.jpg",
    alt: "A person signing documents",
  },
  {
    tag: "Community",
    date: "Ongoing",
    title: "Weekly reminders on Facebook",
    body: "Filing dates and agency advisories, posted every week.",
    image: "/designs/stock/news-handshake.jpg",
    alt: "Two people shaking hands across a desk",
  },
] as const;

/** UNVERIFIED — recurring dates the design invented. */
export const events = [
  { day: "10", month: "Monthly", title: "BIR monthly filings", body: "Withholding tax returns and remittances." },
  { day: "15", month: "Monthly", title: "Payroll release", body: "Mid-month payroll for semi-monthly clients." },
  { day: "31", month: "Monthly", title: "SSS · PhilHealth · Pag-IBIG", body: "Contribution deadlines — we track yours." },
] as const;
