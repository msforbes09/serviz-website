/**
 * News and events, transcribed from the cooperative's Facebook page and
 * rendered by every layout. Newest first. `date` is ISO so each layout formats
 * it in its own voice; `tag` is the short label the card shows.
 *
 * The photographs are free Unsplash placeholders chosen to match each post,
 * not the cooperative's own — see the sign-off list in TODO.md. The bodies
 * are condensed from the captions, not written fresh.
 */
export type NewsPost = {
  date: string;
  tag: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const newsPosts: NewsPost[] = [
  {
    date: "2026-08-24",
    tag: "Community",
    title: "Onsite validation for the Galing Kooperatiba Awards 2026",
    body: "Grateful to the Pasig City Cooperative Development Office for including SERBIZ in the awards’ onsite validation.",
    image: "/designs/stock/news-handshake.jpg",
    alt: "Two people shaking hands across a table",
  },
  {
    date: "2026-08-10",
    tag: "SERBIZ Cares",
    title: "A little help for families after the Kapitolyo fire",
    body: "Preloved clothes from our members and hygiene kits from our Community Development Fund, turned over to the Everest Fire Rescue Team on July 31.",
    image: "/designs/stock/news-donation.jpg",
    alt: "A stack of folded jeans held in someone’s arms",
  },
  {
    date: "2026-08-06",
    tag: "Sustainability",
    title: "E-waste drop box open Monday to Friday",
    body: "Bring old gadgets and broken electronics to our collection box, in support of the SM Cares e-waste programme.",
    image: "/designs/stock/news-ewaste.jpg",
    alt: "A pile of old circuit boards and computer parts",
  },
  {
    date: "2026-07-07",
    tag: "Team",
    title: "Strategic planning and our 5th anniversary in Thailand",
    body: "April 29 to May 3: members mapped out goals for the years ahead, then celebrated five years as one cooperative.",
    image: "/designs/stock/news-thailand.jpg",
    alt: "Wat Arun temple on the Chao Phraya river in Bangkok",
  },
];

/** The one standing item on the list: the drop box is open every working week. */
export const ongoing = {
  title: "E-waste drop box",
  body: "Open Monday to Friday at the Kapitolyo office. Old gadgets and broken electronics welcome.",
} as const;
