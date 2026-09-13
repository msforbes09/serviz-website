/**
 * Copy for the v3 layout, transcribed from `Serbiz Landing Page v4.dc.html`.
 *
 * Service names and descriptions come from the flyers. The news posts are the
 * shared list in `lib/news.ts`, transcribed from Facebook. The response-time
 * promise came from the design and is NOT confirmed — see the sign-off
 * checklist in `TODO.md`.
 */

import { format, parseISO } from "date-fns";
import { newsPosts, ongoing } from "@/lib/news";

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
  {
    num: "01",
    title: "Payroll & Benefits Outsourcing",
    sub: "Paid on time, every cut-off.",
    tone: "dark",
  },
  {
    num: "02",
    title: "Accounting Outsourcing",
    sub: "Books that balance.",
    tone: "light",
  },
  {
    num: "03",
    title: "Tax Compliance",
    sub: "BIR filings, never late.",
    tone: "light",
  },
  {
    num: "04",
    title: "HR Support",
    sub: "Records, papers, benefits admin.",
    tone: "mint",
  },
  {
    num: "05",
    title: "Business Registration",
    sub: "Paperwork and agency liaison.",
    tone: "light",
  },
  {
    num: "06",
    title: "Web & Software Development",
    sub: "Websites, systems, integrations.",
    tone: "light",
    isNew: true,
  },
  {
    num: "07",
    title: "Customized Service Packages",
    sub: "Mix and match to fit you.",
    tone: "dark",
  },
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
      {
        n: "1",
        title: "Timekeeping & Attendance",
        body: "Accurate hours, monitored and reported.",
      },
      {
        n: "2",
        title: "Payroll Processing",
        body: "Correct pay, released on time — every cut-off.",
      },
      {
        n: "3",
        title: "Government Benefits",
        body: "SSS, PhilHealth, Pag-IBIG remittances and claims.",
      },
      {
        n: "4",
        title: "Employee Web Portal",
        body: "Payslips, leaves and records online.",
      },
    ],
  },
  "02": {
    id: "accounting",
    image: {
      src: "/designs/stock/accounting-reports.jpg",
      alt: "Financial charts on a laptop screen",
    },
    items: [
      {
        n: "1",
        title: "Bookkeeping",
        body: "Books of accounts and daily transactions.",
      },
      {
        n: "2",
        title: "Accounts Receivable",
        body: "Billed and collected on time.",
      },
      {
        n: "3",
        title: "Accounts Payable",
        body: "Classified, computed and reported.",
      },
    ],
  },
  // The tax and HR items are split from the flyers' one-paragraph descriptions
  // rather than transcribed from a list: the print material does not itemise
  // either. Queued for sign-off in `TODO.md`.
  "03": {
    id: "tax",
    body: "Every BIR report filed and paid on schedule.",
    image: {
      src: "/designs/stock/news-paperwork.jpg",
      alt: "Hands signing a printed form with a pen",
    },
    items: [
      {
        n: "1",
        title: "Reportorial Requirements",
        body: "Accurate reports, prepared for every filing period.",
      },
      {
        n: "2",
        title: "BIR Periodic Filings",
        body: "Monthly, quarterly and annual returns filed on time.",
      },
      {
        n: "3",
        title: "Payment on Schedule",
        body: "Taxes due are paid before the deadline, not after.",
      },
      {
        n: "4",
        title: "Online or Onsite",
        body: "Filed through eBIR or at the revenue office, whichever your case needs.",
      },
    ],
  },
  "04": {
    id: "hr",
    body: "Recruitment papers, records and benefits admin.",
    image: {
      src: "/designs/stock/hero-workspace.jpg",
      alt: "Two empty desks with monitors beside a tall plant",
    },
    items: [
      {
        n: "1",
        title: "Recruitment Documentation",
        body: "Offer letters, contracts and onboarding papers prepared.",
      },
      {
        n: "2",
        title: "Employee Records",
        body: "201 files kept complete and current.",
      },
      {
        n: "3",
        title: "Benefits Administration",
        body: "Enrolment, updates and claims handled for your staff.",
      },
    ],
  },
  "05": {
    id: "registration",
    body: "Paperwork and agency liaison, done right.",
  },
  // Proposed by the user, a full-stack web developer, as a service delivered
  // through the cooperative with them as its development partner. Names the
  // partnership, not the partner, until the cooperative agrees — see TODO.md.
  "06": {
    id: "web",
    body: "Custom websites, online portals and the systems behind a business — inventory, billing, records — built with our development partner, a full-stack web developer focused on backend systems, and supported after launch.",
  },
  "07": { id: "packages", body: "Mix and match to fit your business." },
};

export const serviceSections: ServiceSection[] = serviceCards.map((card) => ({
  ...card,
  ...details[card.num],
}));

/**
 * The services page is two tiers. The first four services — the ones the
 * flyers describe at length — get a full section each with an image and a
 * list. The last three sit in the compact "Other services offered" grid, the
 * way the print material presents them. Both are slices of `serviceSections`,
 * so the order and anchors stay the home grid's.
 */
export const featuredServices = serviceSections.filter((s) => s.items);
export const otherServices = serviceSections.filter((s) => !s.items);

/**
 * `image: null` means the scan has not been supplied yet and the card renders a
 * labelled placeholder. Deliberately not a stock photo: an unrelated document
 * under the caption "BIR Certificate of Registration" would read as the
 * genuine article. Drop the file in `public/designs/v3/` and restore the path.
 */
export const permits: {
  image: string | null;
  title: string;
  detail: string;
}[] = [
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

/** The shared Facebook list, dated in this layout's long form. */
export const news = newsPosts.map((post) => ({
  tag: post.tag,
  date: format(parseISO(post.date), "MMMM d, yyyy"),
  title: post.title,
  body: post.body,
  image: post.image,
  alt: post.alt,
}));

/** The standing item beside the list. */
export const events = [
  { day: "M–F", month: "Weekly", title: ongoing.title, body: ongoing.body },
] as const;
