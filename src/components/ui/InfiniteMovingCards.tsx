"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

type TechItem = {
  name: string;
  slug: string;
};

const brandColors: Record<string, string> = {
  vuedotjs: "#42B883",
  react: "#61DAFB",
  typescript: "#3178C6",
  nextdotjs: "#000000",
  tailwindcss: "#06B6D4",
  ionic: "#3880FF",
  bootstrap: "#7952B3",
  javascript: "#F7DF1E",
  laravel: "#FF2D20",
  php: "#777BB4",
  go: "#00ADD8",
  python: "#3776AB",
  nodedotjs: "#339933",
  express: "#000000",
  mysql: "#4479A1",
  mongodb: "#47A248",
  git: "#F05032",
  docker: "#2496ED",
  figma: "#F24E1E",
  blender: "#E87D0D",
  threedotjs: "#000000",
  unity: "#000000",
  postman: "#FF6C37",
  capacitor: "#119EFF",
};

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: TechItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getSpeed = useCallback(() => {
    if (speed === "fast") return "20s";
    if (speed === "normal") return "35s";
    return "50s";
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(clone);
        }
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty("--animation-duration", getSpeed());
      setStart(true);
    }
  }, [direction, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          start
            ? ({
              "--animation-duration": getSpeed(),
              "--animation-direction":
                direction === "left" ? "forwards" : "reverse",
            } as React.CSSProperties)
            : undefined
        }
      >
        {items.map((item, idx) => {
          const color = brandColors[item.slug] || "#000000";
          const hex = color.replace("#", "");

          return (
            <li
              key={`${item.name}-${idx}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-black/[0.07] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] hover:border-black/15 dark:hover:border-white/[0.15] transition-all duration-300 cursor-default select-none relative"
              style={{
                "--hover-bg": `${color}15`,
                "--hover-border": `${color}40`,
                "--brand-color": color,
              } as React.CSSProperties}
            >
              {/* Using CSS variables for hover effects ensures it works on cloned nodes */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border dark:hidden"
                style={{
                  backgroundColor: "var(--hover-bg)",
                  borderColor: "var(--hover-border)"
                }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <div className="relative w-5 h-5">
                  <img
                    src={`https://cdn.simpleicons.org/${item.slug}/000000`}
                    alt={item.name}
                    className="w-5 h-5 object-contain opacity-40 group-hover:opacity-0 transition-all duration-300 dark:hidden"
                    loading="lazy"
                  />
                  <img
                    src={`https://cdn.simpleicons.org/${item.slug}/${hex}`}
                    alt={item.name}
                    className="absolute inset-0 w-5 h-5 object-contain opacity-0 group-hover:opacity-100 transition-all duration-300 dark:hidden"
                    loading="lazy"
                  />
                  <img
                    src={`https://cdn.simpleicons.org/${item.slug}/ffffff`}
                    alt={item.name}
                    className="w-5 h-5 object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
                    loading="lazy"
                  />
                </div>

                <span
                  className="text-sm font-medium whitespace-nowrap transition-colors duration-300 text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--brand-color)] dark:group-hover:text-white"
                >
                  {item.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
