"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export type TimelineItem = {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  type: "full-time" | "internship" | "freelance" | "education" | "leadership";
  description: string[];
  tags?: string[];
  isCurrent?: boolean;
};

const typeConfig: Record<TimelineItem["type"], { label: string }> = {
  "full-time":  { label: "Full-time"  },
  "internship": { label: "Internship" },
  "freelance":  { label: "Freelance"  },
  "education":  { label: "Education"  },
  "leadership": { label: "Leadership" },
};

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-black/20 dark:from-white/20 via-black/8 dark:via-white/8 to-transparent md:-translate-x-px" />

      <div className="space-y-10">
        {items.map((item, i) => {
          const cfg = typeConfig[item.type];
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative flex items-start gap-6 md:gap-0",
                "md:grid md:grid-cols-2"
              )}
            >
              {/* Desktop Left side */}
              <div className={cn("hidden md:flex", isLeft ? "justify-end pr-12" : "order-2 pl-12")}>
                {isLeft ? (
                  <CardContent item={item} cfg={cfg} />
                ) : (
                  <div className="text-right">
                    <span className="text-neutral-400 dark:text-neutral-600 text-sm font-mono">{item.year}</span>
                  </div>
                )}
              </div>

              {/* Dot — blinks when isCurrent */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center mt-1.5 z-10">
                <div className="relative">
                  {item.isCurrent && (
                    <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-black/20 dark:bg-white/30 animate-blink-dot" />
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    className={cn(
                      "w-3.5 h-3.5 rounded-full border-2",
                      item.isCurrent
                        ? "border-black dark:border-white bg-black dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] dark:shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                        : "border-black/20 dark:border-white/20 bg-white dark:bg-neutral-950 shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                    )}
                  />
                </div>
              </div>

              {/* Desktop Right side */}
              <div className={cn("hidden md:flex", isLeft ? "order-2 pl-12" : "justify-end pr-12")}>
                {isLeft ? (
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-600 text-sm font-mono">{item.year}</span>
                  </div>
                ) : (
                  <CardContent item={item} cfg={cfg} align="right" />
                )}
              </div>

              {/* Mobile layout */}
              <div className="md:hidden pl-12">
                <span className="text-neutral-400 dark:text-neutral-600 text-xs font-mono block mb-2">{item.year}</span>
                <CardContent item={item} cfg={cfg} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CardContent({
  item,
  cfg,
  align,
}: {
  item: TimelineItem;
  cfg: { label: string };
  align?: "right";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 w-full max-w-sm transition-all duration-300 bg-white dark:bg-transparent",
        item.isCurrent
          ? "border-black/15 dark:border-white/20 shadow-sm dark:shadow-none dark:bg-white/[0.04] hover:border-black/25 dark:hover:border-white/30"
          : "border-black/[0.07] dark:border-white/[0.06] hover:border-black/15 dark:hover:border-white/15",
        align === "right" && "text-right"
      )}
    >
      <div className={cn("flex items-center gap-2 mb-3", align === "right" && "justify-end")}>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border",
            item.isCurrent
              ? "bg-black/[0.07] dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white"
              : "bg-black/[0.03] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-500"
          )}
        >
          {cfg.label}
        </span>
        {item.isCurrent && (
          <span className="flex items-center gap-1 text-[10px] text-neutral-700 dark:text-neutral-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
            Current
          </span>
        )}
      </div>
      <h3 className="text-black dark:text-white font-semibold text-base leading-snug">{item.title}</h3>
      <p className={cn("font-medium mt-0.5 text-sm", item.isCurrent ? "text-black/60 dark:text-white/70" : "text-neutral-500")}>
        {item.companyUrl ? (
          <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
            {item.company}
          </a>
        ) : item.company}
      </p>
      {item.location && <p className="text-neutral-400 dark:text-neutral-600 text-xs mt-0.5">{item.location}</p>}
      <ul className={cn("mt-3 space-y-1", align === "right" && "text-right")}>
        {item.description.map((d, di) => (
          <li key={di} className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed flex gap-1.5">
            {align !== "right" && <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-neutral-300 dark:bg-neutral-600" />}
            <span>{d}</span>
            {align === "right" && <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-neutral-300 dark:bg-neutral-600" />}
          </li>
        ))}
      </ul>
      {item.tags && item.tags.length > 0 && (
        <div className={cn("flex flex-wrap gap-1.5 mt-3", align === "right" && "justify-end")}>
          {item.tags.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-neutral-500">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
