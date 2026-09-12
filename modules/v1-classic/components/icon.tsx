import {
  Banknote,
  BookOpenText,
  Building2,
  CalendarCheck,
  HandCoins,
  Heart,
  Laptop,
  Layers,
  Package,
  Receipt,
  UsersRound,
} from "lucide-react";
import type { IconName } from "../lib/content";

// The design pulled Phosphor from a CDN. Lucide is already a dependency, so
// this maps the design's icon names onto it rather than adding a second icon
// set and an external stylesheet to every page load.
const icons = {
  banknote: Banknote,
  book: BookOpenText,
  receipt: Receipt,
  users: UsersRound,
  building: Building2,
  package: Package,
  laptop: Laptop,
  layers: Layers,
  calendar: CalendarCheck,
  coins: HandCoins,
  heart: Heart,
} as const satisfies Record<IconName, unknown>;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];

  return <Component aria-hidden className={className} />;
}
