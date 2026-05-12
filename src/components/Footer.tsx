"use client";

import { personalData, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.07] dark:border-white/[0.06] py-10 bg-white dark:bg-black">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm">
              F
            </div>
            <span className="font-bold text-black dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {personalData.shortName}
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            © {year} {personalData.shortName}
          </p>
        </div>
      </div>
    </footer>
  );
}
