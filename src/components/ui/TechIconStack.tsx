"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const tagToSlug: Record<string, string> = {
  "Vue.js": "vuedotjs",
  "Laravel": "laravel",
  "Inertia": "inertia",
  "Ionic": "ionic",
  "Ionic React": "ionic",
  "Capacitor": "capacitor",
  "Tailwind CSS": "tailwindcss",
  "Bootstrap 5": "bootstrap",
  "Livewire": "livewire",
  "React": "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "TypeScript": "typescript",
  "JavaScript": "javascript",
  "PHP": "php",
  "MySQL": "mysql",
  "PostgreSQL": "postgresql",
  "MongoDB": "mongodb",
  "Firebase": "firebase",
  "Figma": "figma",
  "Three.js": "threedotjs",
  "Framer Motion": "framer",
  "Git": "git",
  "GitHub": "github",
  "Docker": "docker",
  "Python": "python",
  "Java": "java",
  "Kotlin": "kotlin",
  "Android": "android",
  "Android Studio": "androidstudio",
  "Swift": "swift",
  "SQLite": "sqlite",
  "FastAPI": "fastapi",
  "Prisma": "prisma",
  "Vite": "vite",
  "Redux": "redux",
  "Expo": "expo",
  "React Native": "react",
  "Spotify API": "spotify",
  "NestJS": "nestjs",
  "Elasticsearch": "elasticsearch",
  "Linux": "linux",
  "Ubuntu": "ubuntu",
  "Debian": "debian",
  "Proxmox": "proxmox",
};

export const tagToColor: Record<string, string> = {
  "Vue.js": "#42B883",
  "Laravel": "#FF2D20",
  "Inertia": "#9553E9",
  "Ionic": "#3880FF",
  "Ionic React": "#3880FF",
  "Capacitor": "#119EFF",
  "Tailwind CSS": "#06B6D4",
  "Bootstrap 5": "#7952B3",
  "Livewire": "#FB70A9",
  "Midtrans": "#003F6B",
  "React": "#61DAFB",
  "Next.js": "#000000",
  "Node.js": "#339933",
  "TypeScript": "#3178C6",
  "JavaScript": "#F7DF1E",
  "PHP": "#777BB4",
  "MySQL": "#4479A1",
  "PostgreSQL": "#4169E1",
  "MongoDB": "#47A248",
  "Firebase": "#FFCA28",
  "Figma": "#F24E1E",
  "Three.js": "#000000",
  "Framer Motion": "#0055FF",
  "Git": "#F05032",
  "GitHub": "#181717",
  "Docker": "#2496ED",
  "Python": "#3776AB",
  "Java": "#007396",
  "Kotlin": "#7F52FF",
  "Android": "#3DDC84",
  "Android Studio": "#3DDC84",
  "Swift": "#F05138",
  "SQLite": "#003B57",
  "FastAPI": "#05998B",
  "Prisma": "#2D3748",
  "Vite": "#646CFF",
  "Redux": "#764ABC",
  "Expo": "#000020",
  "React Native": "#61DAFB",
  "Spotify API": "#1DB954",
  "NestJS": "#E0234E",
  "Elasticsearch": "#005571",
  "Linux": "#FCC624",
  "Ubuntu": "#E9430F",
  "Debian": "#A81D33",
  "Proxmox": "#E57000",
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
  const showBrandMode = isHovered && !!brandColor;

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
        const slug = tagToSlug[tag];
        if (!slug && tag !== "Midtrans") return null;

        const brandColor = tagToColor[tag];
        const isHovered = hoveredIndex === i;
        const showBrandMode = isHovered && !!brandColor;

        const translateX =
          isStack && hoveredIndex !== null && hoveredIndex !== i
            ? i < hoveredIndex ? -6 : 6
            : 0;

        const bgColor = showBrandMode
          ? brandColor
          : variant === "card"
            ? "rgba(0,0,0,0.8)"
            : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

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
