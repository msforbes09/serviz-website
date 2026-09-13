/**
 * Copy for the v1 layout, transcribed from `serbiz-v1-classic.html`.
 *
 * Services, mission and permit facts come from the flyers. The news posts are
 * the shared list in `lib/news.ts`, transcribed from Facebook. The FAQ answers
 * came from the design and are NOT confirmed — see the sign-off checklist in
 * `TODO.md`.
 *
 * Icons are named, not imported, so this stays a plain data module: the
 * component maps each name onto a Lucide icon. The design used Phosphor from a
 * CDN; Lucide is already in the project and ships nothing extra.
 */

import { format, parseISO } from "date-fns";
import { newsPosts } from "@/lib/news";
export type IconName =
  | "banknote"
  | "book"
  | "receipt"
  | "users"
  | "building"
  | "package"
  | "laptop"
  | "layers"
  | "calendar"
  | "coins"
  | "heart";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why SERBIZ" },
  { href: "#news", label: "News and events" },
  { href: "#faq", label: "FAQ" },
] as const;

export const heroBadges = [
  "CDA registered cooperative",
  "BIR registered",
  "Pasig business permit",
] as const;

export type Service = {
  icon: IconName;
  title: string;
  body: string;
  isNew?: boolean;
};

export const services: Service[] = [
  {
    icon: "banknote",
    title: "Payroll and benefits outsourcing",
    body: "Timekeeping, payslips, 13th month, SSS, PhilHealth and Pag-IBIG remittances and claims.",
  },
  {
    icon: "book",
    title: "Accounting outsourcing",
    body: "Bookkeeping, accounts receivable and payable, and monthly financial reports.",
  },
  {
    icon: "receipt",
    title: "Tax compliance",
    body: "BIR periodic returns prepared, filed and paid on schedule, online or onsite.",
  },
  {
    icon: "users",
    title: "HR support",
    body: "Recruitment documentation, 201 files, employee records and benefits administration.",
  },
  {
    icon: "building",
    title: "Business registration assistance",
    body: "DTI or SEC, BIR, Mayor's permit and agency registrations handled end to end.",
  },
  {
    icon: "package",
    title: "Customized service packages",
    body: "Mix payroll, accounting, HR and more into one monthly package sized to your headcount and volume.",
  },
  {
    icon: "laptop",
    title: "IT consulting",
    body: "Practical systems advice for small teams: payroll and accounting software setup, web portals, backups and basic security.",
    isNew: true,
  },
];

export const taglineWords =
  "Why worry about the small stuff when you can leave it to us?".split(" ");

export const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "layers",
    title: "One team for payroll and books",
    body: "Your payroll figures and your ledgers come from the same people, so nothing falls between two vendors.",
  },
  {
    icon: "calendar",
    title: "Compliance on the calendar",
    body: "Every BIR, SSS, PhilHealth and Pag-IBIG deadline is scheduled at onboarding. You are told before it is due, not after.",
  },
  {
    icon: "coins",
    title: "Cooperative pricing",
    body: "Members own the cooperative. Lower overheads than a firm, passed on as lower monthly fees.",
  },
  {
    icon: "heart",
    title: "People who have done this for decades",
    body: "Our members spent their careers in compensation, benefits and accounting departments. Now they do it for you.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Tell us about your business",
    body: "A free 30 minute call. Headcount, entity type, what is piling up.",
  },
  {
    n: "02",
    title: "Get a package and quote",
    body: "Within three working days you receive a written scope and monthly fee. No obligation.",
  },
  {
    n: "03",
    title: "We take over month to month",
    body: "Records handed over, calendar set, first payroll or filing done under your review.",
  },
] as const;

/**
 * `src: null` means the scan has not been supplied yet and the card renders a
 * labelled placeholder instead. Deliberately not a stock photo: an unrelated
 * document under the caption "BIR Certificate of Registration" would read as
 * the genuine article. Drop the file in `public/designs/v1/` and restore the
 * path to publish it.
 */
export const certificates: { src: string | null; alt: string }[] = [
  { src: null, alt: "BIR Certificate of Registration" },
  { src: null, alt: "CDA Certificate of Compliance" },
  { src: null, alt: "Pasig City Mayor's Permit" },
];

/** The shared Facebook list, dated in this layout's short form. */
export const posts = newsPosts.map((post) => ({
  kind: post.tag,
  date: format(parseISO(post.date), "MMM d, yyyy"),
  title: post.title,
  body: post.body,
  image: post.image,
}));

/** UNVERIFIED — the answers make commitments the cooperative has not confirmed. */
export const faqs = [
  {
    q: "Who do you work with?",
    a: "Sole proprietors, one person corporations, small and medium enterprises and other cooperatives.",
  },
  {
    q: "Do we have to be in Pasig?",
    a: "No. We work remotely with clients across Metro Manila and the rest of the Philippines, and go onsite within NCR when a filing or audit needs it.",
  },
  {
    q: "How is pricing set?",
    a: "By headcount and transaction volume. You receive a written quote after the free consultation with no obligation to proceed.",
  },
  {
    q: "Can you take over in the middle of the year?",
    a: "Yes. We reconcile the records from your previous provider or in house team first, then continue from the next cutoff.",
  },
  {
    q: "What is a workers cooperative?",
    a: "A business owned and run by the people who work in it, registered with the Cooperative Development Authority. It keeps overheads low and the team accountable.",
  },
  {
    q: "Is our data safe with you?",
    a: "Records live on access controlled systems, we sign a non disclosure agreement at engagement, and only your assigned members see your files.",
  },
  {
    q: "What does IT consulting cover?",
    a: "Choosing and setting up payroll and accounting software, simple web portals, backups and basic security for small teams. No jargon, priced per project.",
  },
] as const;
