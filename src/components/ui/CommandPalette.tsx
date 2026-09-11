"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  FolderGit2,
  Compass,
  Sparkles,
  Sun,
  Moon,
  Globe,
  MessageSquare,
  CornerDownLeft,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Actions" | "Connect";
  icon: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
  external?: boolean;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Listen for global keyboard shortcuts (Cmd+K, Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollTo = useCallback((id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const openProjectModal = useCallback((projectId: string) => {
    setIsOpen(false);
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Dispatch custom event that ProjectsSection listens to
    window.dispatchEvent(new CustomEvent("open-project-modal", { detail: { projectId } }));
  }, []);

  // Build searchable items
  const items: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      // Navigation
      {
        id: "nav-home",
        title: t("nav.home"),
        subtitle: language === "en" ? "Hero & Introduction" : "Beranda & Pengenalan",
        category: "Navigation",
        icon: Compass,
        onSelect: () => scrollTo("home"),
      },
      {
        id: "nav-about",
        title: t("nav.about"),
        subtitle: language === "en" ? "Biography, engineering stack & career" : "Biografi & profil pengembang",
        category: "Navigation",
        icon: Compass,
        onSelect: () => scrollTo("about"),
      },
      {
        id: "nav-projects",
        title: t("nav.projects"),
        subtitle: language === "en" ? "Featured platforms & production systems" : "Proyek unggulan & studi kasus",
        category: "Navigation",
        icon: FolderGit2,
        onSelect: () => scrollTo("projects"),
      },
      {
        id: "nav-skills",
        title: t("nav.skills"),
        subtitle: language === "en" ? "Tech stack & system engineering capabilities" : "Keahlian & instrumen teknologi",
        category: "Navigation",
        icon: Sparkles,
        onSelect: () => scrollTo("skills"),
      },
      {
        id: "nav-experience",
        title: t("nav.experience"),
        subtitle: language === "en" ? "Work history at STK, Zamasco, & Freelance" : "Pengalaman kerja & kontribusi industri",
        category: "Navigation",
        icon: Compass,
        onSelect: () => scrollTo("experience"),
      },
      {
        id: "nav-contact",
        title: t("nav.contact"),
        subtitle: language === "en" ? "Direct inquiry, email & socials" : "Hubungi langsung & informasi kontak",
        category: "Navigation",
        icon: Compass,
        onSelect: () => scrollTo("contact"),
      },
      // Actions
      {
        id: "action-theme",
        title:
          theme === "dark"
            ? (language === "en" ? "Switch to Light Mode" : "Ubah ke Mode Terang")
            : (language === "en" ? "Switch to Dark Mode" : "Ubah ke Mode Gelap"),
        subtitle: language === "en" ? "Toggle interface monochrome palette" : "Ganti palet tampilan antarmuka",
        category: "Actions",
        icon: theme === "dark" ? Sun : Moon,
        onSelect: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setIsOpen(false);
        },
      },
      {
        id: "action-language",
        title: language === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English",
        subtitle: language === "en" ? "Aktifkan bahasa Indonesia" : "Enable English content",
        category: "Actions",
        icon: Globe,
        onSelect: () => {
          setLanguage(language === "en" ? "id" : "en");
          setIsOpen(false);
        },
      },
      {
        id: "action-chat",
        title: language === "en" ? "Ask Fariz AI Assistant" : "Tanya Asisten AI Fariz",
        subtitle: language === "en" ? "Interactive conversation about experience & skills" : "Percakapan interaktif tentang keahlian & proyek",
        category: "Actions",
        icon: MessageSquare,
        onSelect: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent("open-chatbot"));
        },
      },
      // Connect
      {
        id: "connect-github",
        title: "GitHub (@FarizRafiqi)",
        subtitle: "https://github.com/FarizRafiqi",
        category: "Connect",
        icon: ExternalLink,
        external: true,
        onSelect: () => {
          window.open("https://github.com/FarizRafiqi", "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      },
      {
        id: "connect-linkedin",
        title: "LinkedIn",
        subtitle: "Aulia El Ihza Fariz Rafiqi",
        category: "Connect",
        icon: ExternalLink,
        external: true,
        onSelect: () => {
          window.open("https://www.linkedin.com/in/fariz-rafiqi-574246237/", "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      },
      {
        id: "connect-email",
        title: "Email",
        subtitle: "farizrafiqi@gmail.com",
        category: "Connect",
        icon: ExternalLink,
        external: true,
        onSelect: () => {
          window.open("mailto:farizrafiqi@gmail.com", "_self");
          setIsOpen(false);
        },
      },
    ];

    // Append flagship projects
    projects.forEach((proj) => {
      list.push({
        id: `project-${proj.id}`,
        title: proj.title[language],
        subtitle: proj.subtitle[language],
        category: "Projects",
        icon: FolderGit2,
        onSelect: () => openProjectModal(proj.id),
      });
    });

    return list;
  }, [language, t, theme, setTheme, setLanguage, scrollTo, openProjectModal]);

  // Filter based on search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) current.onSelect();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-2xl rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-neutral-200/60 dark:border-neutral-800/60 gap-3">
              <Search className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === "en"
                    ? "Type a command or search projects, actions, docs..."
                    : "Ketik perintah atau cari proyek, navigasi, aksi..."
                }
                className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none"
              />
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div ref={listRef} className="overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  {language === "en" ? "No results found for" : "Tidak ditemukan hasil untuk"} &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 group",
                        isSelected
                          ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0",
                            isSelected
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2.5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded">
                    ↑
                  </kbd>
                  <kbd className="px-1 py-0.5 font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded">
                    ↓
                  </kbd>{" "}
                  {language === "en" ? "Navigate" : "Navigasi"}
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded">
                    ↵
                  </kbd>{" "}
                  {language === "en" ? "Select" : "Pilih"}
                </span>
              </div>
              <span className="font-mono text-[10px]">
                {filteredItems.length} {language === "en" ? "items" : "opsi"}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
