"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

type HoverCard = {
  title: string;
  description: string;
  link?: string;
  icon: React.ReactNode;
  className?: string;
};

export function HoverEffect({
  items,
  className,
}: {
  items: HoverCard[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "relative group flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/8 bg-black/20 backdrop-blur-sm cursor-default transition-all duration-300",
            "hover:border-cyan-500/30 hover:bg-white/5",
            item.className
          )}
        >
          {/* Glow effect behind icon */}
          {hovered === i && (
            <motion.div
              layoutId="hoverGlow"
              className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/20 transition-colors duration-300">
            {item.icon}
          </div>
          <div className="relative z-10 text-center">
            <p className="text-white text-sm font-medium group-hover:text-cyan-300 transition-colors duration-200">
              {item.title}
            </p>
            {item.description && (
              <p className="text-slate-600 text-[10px] mt-0.5 leading-tight">{item.description}</p>
            )}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ExternalLink size={10} className="text-slate-500" />
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}
