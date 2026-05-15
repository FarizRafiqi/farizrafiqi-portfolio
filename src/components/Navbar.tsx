"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import { personalData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorNear = useRef(false);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => { setMounted(true); }, []);

  const showNavbar = () => setVisible(true);

  const scheduleHide = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!cursorNear.current) setVisible(false);
    }, 2000);
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    if (!mounted) return;
    setScrolled(current > 60);

    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(hover: hover)").matches;
    if (!isDesktop) return;

    if (current <= 60) {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      showNavbar();
    } else {
      showNavbar();
      scheduleHide();
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(hover: hover)").matches;
    if (!isDesktop) return;

    const PROXIMITY = 80;
    const onMouseMove = (e: MouseEvent) => {
      const atTop = window.scrollY <= 60;
      if (e.clientY <= PROXIMITY) {
        cursorNear.current = true;
        showNavbar();
        if (idleTimer.current) clearTimeout(idleTimer.current);
      } else {
        cursorNear.current = false;
        if (!atTop) scheduleHide();
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "experience", "contact"];

      // Check if we are at the bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      for (const section of sections.slice().reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div
          className={cn(
            "pointer-events-auto relative rounded-full px-6 py-2.5 flex items-center gap-6 transition-shadow duration-500",
            scrolled
              ? "shadow-lg dark:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
              : "shadow-sm",
            "bg-white/90 border border-black/[0.08] backdrop-blur-xl",
            "dark:bg-black/90 dark:border-white/[0.12] dark:backdrop-blur-xl"
          )}
        >
          <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xs group-hover:scale-110 transition-transform duration-200">
              F
            </div>
            <span
              className="font-bold text-sm text-black dark:text-white hidden sm:block tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {personalData.shortName}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "text-black dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-black/[0.07] dark:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.1]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            {mounted && (
              <>
                {/* Language Toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLanguage(language === "en" ? "id" : "en")}
                  className="px-2 h-8 rounded-full flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                  aria-label="Toggle language"
                >
                  <Globe size={14} />
                  <span className="text-[11px] font-bold uppercase">{language}</span>
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                      <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <SunIcon className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <MoonIcon className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </>
            )}

            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[13px] font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 cursor-pointer shadow-sm"
            >
              {t("nav.contact")}
            </a>

            <button
              className="md:hidden w-8 h-8 rounded-full flex flex-col gap-1 items-center justify-center hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="w-4 h-0.5 bg-black dark:bg-white block rounded-full" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 h-0.5 bg-black dark:bg-white block rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="w-4 h-0.5 bg-black dark:bg-white block rounded-full" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-2xl p-3 bg-white/95 dark:bg-black/95 border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-xl shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                  activeSection === link.href.slice(1)
                    ? "text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.08]"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-semibold text-center cursor-pointer hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200"
            >
              {t("nav.contact")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
