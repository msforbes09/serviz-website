/**
 * Copy for the v3 layout, transcribed from `Serbiz Landing Page v4.dc.html`.
 *
 * Service names and descriptions come from the flyers. The news items, the
 * event calendar and the response-time promise came from the design and are
 * NOT confirmed — see the sign-off checklist in `TODO.md`.
 */

/**
 * Route prefix for this preview. Deliberately unguessable: the three layouts
 * go to the client as three separate links and nothing should lead from one
 * to another. The slug appears once, here — when the winning variant is
 * promoted to the site root this becomes an empty string.
 */
export const basePath = "/4sjhdc5awq";

export const navItems = [
  { href: basePath, label: "Home" },
  { href: `${basePath}/services`, label: "Services" },
  { href: `${basePath}/about`, label: "About" },
  { href: `${basePath}/news`, label: "News & Events" },
  { href: `${basePath}/contact`, label: "Contact" },
];

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

/**
 * The services page walks the home grid: one section per card, same number,
 * same title, same order. `details` adds what each section says below its
 * heading — a detail list for the two the flyers itemise, a one-line body
 * for the rest — and `serviceSections` zips the two, so the page cannot drift
 * from the grid. `content.test.ts` pins the mirror. The tax line used to sit
 * as item four of Accounting; it is card 03 on the home page, so it gets its
 * own section here.
 */
export type ServiceSection = ServiceCard & {
  /** Anchor the matching home card links to. */
  id: string;
  body?: string;
  image?: { src: string; alt: string };
  items?: { n: string; title: string; body: string }[];
};

const details: Record<string, Omit<ServiceSection, keyof ServiceCard>> = {
  "01": {
    id: "payroll",
    image: {
      src: "/designs/stock/v3-payroll-planner.jpg",
      alt: "A blank monthly planner on a desk beside a laptop",
    },
    items: [
      { n: "1", title: "Timekeeping & Attendance", body: "Accurate hours, monitored and reported." },
      { n: "2", title: "Payroll Processing", body: "Correct pay, released on time — every cut-off." },
      { n: "3", title: "Government Benefits", body: "SSS, PhilHealth, Pag-IBIG remittances and claims." },
      { n: "4", title: "Employee Web Portal", body: "Payslips, leaves and records online." },
    ],
  },
  "02": {
    id: "accounting",
    image: {
      src: "/designs/stock/accounting-reports.jpg",
      alt: "Financial charts on a laptop screen",
    },
    items: [
      { n: "1", title: "Bookkeeping", body: "Books of accounts and daily transactions." },
      { n: "2", title: "Accounts Receivable", body: "Billed and collected on time." },
      { n: "3", title: "Accounts Payable", body: "Classified, computed and reported." },
    ],
  },
  "03": { id: "tax", body: "Every BIR report filed and paid on schedule." },
  "04": { id: "hr", body: "Recruitment papers, records and benefits admin." },
  "05": { id: "registration", body: "Paperwork and agency liaison, done right." },
  "06": { id: "it", body: "Systems, cloud and data security for small teams." },
  "07": { id: "packages", body: "Mix and match to fit your business." },
};

export const serviceSections: ServiceSection[] = serviceCards.map((card) => ({
  ...card,
  ...details[card.num],
}));

/**
 * `image: null` means the scan has not been supplied yet and the card renders a
 * labelled placeholder. Deliberately not a stock photo: an unrelated document
 * under the caption "BIR Certificate of Registration" would read as the
 * genuine article. Drop the file in `public/designs/v3/` and restore the path.
 */
export const permits: { image: string | null; title: string; detail: string }[] = [
  {
    image: null,
    title: "BIR Certificate of Registration",
    detail: "Bureau of Internal Revenue",
  },
  {
    image: null,
    title: "CDA Certificate of Compliance",
    detail: "Cooperative Development Authority · registered 2021",
  },
  {
    image: null,
    title: "Mayor's Permit",
    detail: "City Government of Pasig",
  },
];

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
    image: "/designs/stock/v3-news-ledgers.jpg",
    alt: "Budget sheets and a pen laid out on a desk",
  },
  {
    tag: "Community",
    date: "Ongoing",
    title: "Weekly reminders on Facebook",
    body: "Filing dates and agency advisories, posted every week.",
    image: "/designs/stock/v3-news-desk.jpg",
    alt: "Stacked ledgers and a calculator on a sunlit desk",
  },
] as const;

/** UNVERIFIED — recurring dates the design invented. */
export const events = [
  { day: "10", month: "Monthly", title: "BIR monthly filings", body: "Withholding tax returns and remittances." },
  { day: "15", month: "Monthly", title: "Payroll release", body: "Mid-month payroll for semi-monthly clients." },
  { day: "31", month: "Monthly", title: "SSS · PhilHealth · Pag-IBIG", body: "Contribution deadlines — we track yours." },
] as const;
