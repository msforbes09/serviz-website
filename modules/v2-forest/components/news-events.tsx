"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { posts, type PostType } from "../lib/content";

const filters = ["All", "News", "Event"] as const;
type Filter = (typeof filters)[number];

function matches(filter: Filter, type: PostType) {
  return filter === "All" || filter === type;
}

/**
 * Client component because the filter is local, ephemeral UI state — the kind
 * `useState` is for. If these posts ever become real, shareable content the
 * filter should move into the URL instead, per the house rules.
 */
export function NewsEvents() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = posts.filter((post) => matches(filter, post.type));

  return (
    <section id="news" className="border-v2-forest/10 border-y bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9 px-5 py-[clamp(64px,8vw,112px)]">
        <div className="reveal flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-v2-orange text-xs font-semibold tracking-[0.14em] uppercase">
              Stay in the loop
            </span>
            <h2 className="font-sora text-v2-forest text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.02em]">
              News &amp; Events
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter posts"
            className="inline-flex gap-0.5 rounded-full bg-[#eef1ee] p-1"
          >
            {filters.map((option) => {
              const active = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-full px-4 py-2.5 text-[13.5px] font-medium transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.96] ${active ? "bg-v2-forest text-white shadow-[0_6px_14px_-8px_rgba(11,61,31,.6)]" : "text-v2-ink bg-transparent"}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {visible.map((post) => (
            <article
              key={post.title}
              className="reveal border-v2-forest/10 bg-v2-cream group flex flex-col overflow-hidden rounded-[20px] border transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(11,61,31,.4)]"
            >
              <div className="relative h-[170px] overflow-hidden bg-[#e2e8e3]">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, 380px"
                  className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase ${post.type === "Event" ? "bg-v2-orange" : "bg-v2-forest"}`}
                >
                  {post.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
                <span className="text-v2-orange text-[12.5px] font-semibold">
                  {post.date}
                </span>
                <h3 className="font-sora text-v2-forest text-lg leading-snug font-semibold tracking-[-0.01em]">
                  {post.title}
                </h3>
                <p className="text-v2-muted text-sm leading-relaxed text-pretty">
                  {post.body}
                </p>
                <a
                  href={siteConfig.contact.facebook}
                  target="_blank"
                  rel="noopener"
                  className="text-v2-forest mt-auto inline-flex items-center gap-1.5 pt-2 text-[13.5px] font-semibold"
                >
                  Read on Facebook <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
