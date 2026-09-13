import Image from "next/image";
import { events, news } from "../lib/content";

export function NewsList() {
  return (
    <div className="grid gap-5">
      <h2 className="reveal reveal-down font-outfit text-v3-navy m-0 text-[28px] font-extrabold">
        Latest news
      </h2>
      {news.map((post, index) => (
        <article
          key={post.title}
          style={{ "--i": index } as React.CSSProperties}
          className="reveal reveal-step border-v3-navy/10 overflow-hidden rounded-[20px] border bg-white transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(15,42,68,.1)]"
        >
          <div className="bg-v3-navy relative aspect-[16/8]">
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              className="object-cover"
            />
          </div>
          <div className="px-6 pt-[22px] pb-[26px]">
            <p className="text-v3-rust mb-2.5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.1em] uppercase">
              <span>{post.tag}</span>
              <span aria-hidden className="bg-v3-steel size-1 rounded-full" />
              <span className="text-v3-slate">{post.date}</span>
            </p>
            <h3 className="font-outfit text-v3-navy mb-2.5 text-[22px] leading-tight font-bold text-pretty">
              {post.title}
            </h3>
            <p className="text-v3-slate-deep text-[15px] leading-relaxed text-pretty">
              {post.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function UpcomingEvents() {
  return (
    <div className="sticky top-24 grid gap-5">
      <h2 className="reveal reveal-down font-outfit text-v3-navy m-0 text-[28px] font-extrabold">
        Upcoming
      </h2>
      {events.map((event, index) => (
        <div
          key={event.title}
          style={{ "--i": index } as React.CSSProperties}
          className="reveal reveal-step border-v3-navy/10 flex items-start gap-[18px] rounded-[18px] border bg-white px-5 py-[18px]"
        >
          <div className="bg-v3-navy w-16 shrink-0 rounded-xl px-0 pt-2.5 pb-2 text-center text-white">
            <div className="font-outfit text-v3-rust text-2xl leading-none font-extrabold">
              {event.day}
            </div>
            <div className="mt-1 text-[11px] tracking-[0.12em] uppercase">
              {event.month}
            </div>
          </div>
          <div>
            <p className="text-v3-navy mb-1 text-base font-semibold text-pretty">
              {event.title}
            </p>
            <p className="text-v3-slate text-[13.5px] leading-normal">
              {event.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
