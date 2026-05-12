"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const tagToSlug: Record<string, string> = {
  "Vue.js": "vuedotjs",
  "Laravel": "laravel",
  "Inertia": "inertia",
  "Ionic": "ionic",
  "Capacitor": "capacitor",
  "Tailwind CSS": "tailwindcss",
  "Bootstrap 5": "bootstrap",
  "Livewire": "livewire",
  "React": "react",
  "Node.js": "nodedotjs",
};

export const tagToColor: Record<string, string> = {
  "Vue.js": "#42B883",
  "Laravel": "#FF2D20",
  "Inertia": "#9553E9",
  "Ionic": "#3880FF",
  "Capacitor": "#119EFF",
  "Tailwind CSS": "#06B6D4",
  "Bootstrap 5": "#7952B3",
  "Livewire": "#FB70A9",
  "Midtrans": "#003F6B",
  "React": "#61DAFB",
  "Node.js": "#339933",
};

type Variant = "card" | "modal";

interface TechIconStackProps {
  tags: string[];
  variant?: Variant;
  isStack?: boolean;
}

function IconContent({
  tag,
  isHovered,
  variant,
  isDark,
}: {
  tag: string;
  isHovered: boolean;
  variant: Variant;
  isDark: boolean;
}) {
  const slug = tagToSlug[tag];
  const brandColor = tagToColor[tag];
  const showBrandMode = isHovered && !isDark && !!brandColor;

  if (tag === "Midtrans") {
    return (
      <span
        className="text-[9px] font-black leading-none"
        style={{
          color: showBrandMode
            ? "#ffffff"
            : variant === "card" ? "#ffffff" : isDark ? "#ffffff" : "#000000",
        }}
      >
        MID
      </span>
    );
  }

  if (!slug) return null;

  if (showBrandMode) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={tag}
        className="w-full h-full object-contain"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    );
  }

  if (variant === "card") {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={tag}
        className="w-full h-full object-contain"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    );
  }

  const hex = isDark ? "ffffff" : "000000";
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${hex}`}
      alt={tag}
      className="w-full h-full object-contain"
      onError={(e) => (e.currentTarget.style.display = "none")}
    />
  );
}

export function TechIconStack({ tags, variant = "card", isStack = true }: TechIconStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`flex items-center ${isStack ? "" : "gap-2 flex-wrap"}`}>
      {tags.map((tag, i) => {
        const brandColor = tagToColor[tag];
        const isHovered = hoveredIndex === i;
        const showBrandMode = isHovered && !isDark && !!brandColor;

        const translateX =
          isStack && hoveredIndex !== null && hoveredIndex !== i
            ? i < hoveredIndex ? -6 : 6
            : 0;

        const bgColor = showBrandMode
          ? brandColor
          : variant === "card"
            ? "rgba(0,0,0,0.75)"
            : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

        const borderColor = showBrandMode
          ? brandColor
          : variant === "card"
            ? "rgba(255,255,255,0.2)"
            : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

        return (
          <motion.div
            key={tag}
            className="relative cursor-default"
            style={{
              marginLeft: isStack && i !== 0 ? -10 : 0,
              zIndex: isHovered ? 50 : tags.length - i,
            }}
            animate={{ x: translateX, scale: isHovered ? 1.35 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            title={tag}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center p-1.5 border-2 overflow-hidden transition-all duration-200 ${isHovered ? "shadow-lg shadow-black/20" : ""
                }`}
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
              }}
            >
              <IconContent
                tag={tag}
                isHovered={isHovered}
                variant={variant}
                isDark={isDark}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
