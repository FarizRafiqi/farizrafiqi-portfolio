"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDownRight, Mail } from "lucide-react";
import { experienceSummary, personalData, projects } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useCustomization } from "@/context/CustomizationContext";

const HeroScene = dynamic(() => import("@/components/ui/HeroScene"), {
  ssr: false,
  loading: () => <div className="hm-scene-loading" aria-hidden="true" />,
});

const roleTitles: Record<string, { en: string; id: string }> = {
  frontend: { en: "Frontend Engineer · React, Next.js, TypeScript & Ionic", id: "Frontend Engineer · React, Next.js, TypeScript & Ionic" },
  backend: { en: "Backend Engineer · Go, NestJS, Laravel & Kubernetes", id: "Backend Engineer · Go, NestJS, Laravel & Kubernetes" },
  fullstack: { en: "Fullstack Engineer · Next.js, Go, NestJS & cloud infrastructure", id: "Fullstack Engineer · Next.js, Go, NestJS & infrastruktur cloud" },
  mobile: { en: "Mobile Engineer · Kotlin, Ionic React & Capacitor", id: "Mobile Engineer · Kotlin, Ionic React & Capacitor" },
  "3d": { en: "3D & VR Developer · Unity, C#, Three.js & Blender", id: "Pengembang 3D & VR · Unity, C#, Three.js & Blender" },
};

const roleTaglines: Record<string, { en: string; id: string }> = {
  frontend: { en: "Engineering premium, interactive user interfaces", id: "Merekayasa antarmuka pengguna yang premium dan interaktif" },
  backend: { en: "Designing scalable APIs and dependable server architecture", id: "Merancang API terukur dan arsitektur server yang andal" },
  fullstack: { en: "Connecting backend clarity with polished product experiences", id: "Menghubungkan kejelasan backend dengan pengalaman produk yang matang" },
  mobile: { en: "Building native and multiplatform mobile products", id: "Membangun produk mobile native dan multiplatform" },
  "3d": { en: "Creating immersive 3D experiences and virtual realities", id: "Menciptakan pengalaman 3D imersif dan virtual reality" },
};

const socialLinks = [
  { label: "GitHub", href: personalData.socials.github, path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { label: "LinkedIn", href: personalData.socials.linkedin, path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
  { label: "Instagram", href: personalData.socials.instagram, path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.073 4.849-.073zm0 5.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zm0 6.875a2.713 2.713 0 110-5.426 2.713 2.713 0 010 5.426z" },
];

export default function HeroSection() {
  const { language, t } = useLanguage();
  const { role, pitch } = useCustomization();
  const reducedMotion = useReducedMotion();
  const featuredCount = projects.filter((project) => project.featured).length;

  const displayedTitle = role && roleTitles[role] ? roleTitles[role][language] : personalData.title[language];
  const displayedTagline = role && roleTaglines[role] ? roleTaglines[role][language] : personalData.tagline[language];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reducedMotion ? { duration: 0 } : { staggerChildren: 0.11, delayChildren: 0.12 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="hm-hero-shell relative overflow-hidden">
      <div className="hm-hero-grid-lines" aria-hidden="true" />
      <div className="hm-hero-glow" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="hm-hero-topline">
          <span className="hm-mono-label">FARIZ RAFIQI / 2026</span>
          <span className="hm-mono-label hm-mono-label-muted">{t("hero.stkPeriod")}</span>
        </div>

        <div className="hm-hero-layout">
          <motion.div
            className="hm-hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={itemVariants} className="hm-hero-eyebrow">
              <span className="hm-status-dot" aria-hidden="true" />
              {t("hero.eyebrow")}
            </motion.p>

            {pitch && (
              <motion.aside variants={itemVariants} className="hm-pitch-note">
                <span className="hm-pitch-label">{language === "en" ? `Prepared for ${pitch.companyName}` : `Disiapkan untuk ${pitch.companyName}`}</span>
                <p>“{pitch.greeting[language] || pitch.greeting.en}”</p>
              </motion.aside>
            )}

            <motion.h1 variants={itemVariants} className="hm-hero-title">
              <span>Fariz</span>
              <span>Rafiqi</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hm-hero-tagline">
              {displayedTagline}
            </motion.p>
            <motion.p variants={itemVariants} className="hm-hero-lede">
              {displayedTitle}. {t("hero.title")}
            </motion.p>

            <motion.div variants={itemVariants} className="hm-hero-actions">
              <a href="#projects" className="hm-primary-button">
                {t("hero.viewProjects")}
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" className="hm-text-button">
                <Mail size={16} aria-hidden="true" />
                {t("hero.getInTouch")}
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hm-social-row">
              {socialLinks.map(({ label, href, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hm-social-link" aria-label={label}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                  <span>{label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hm-hero-stage-column"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hm-hero-stage">
              <div className="hm-stage-corner hm-stage-corner-tl" aria-hidden="true" />
              <div className="hm-stage-corner hm-stage-corner-br" aria-hidden="true" />
              <HeroScene reducedMotion={Boolean(reducedMotion)} />
              <div className="hm-stage-header">
                <span className="hm-mono-label">01 / SIGNAL OBJECT</span>
                <span className="hm-live-indicator"><span aria-hidden="true" /> LIVE BUILD</span>
              </div>
              <div className="hm-stage-caption">
                <span className="hm-stage-caption-title">Systems · interfaces · intelligence</span>
                <span className="hm-stage-caption-copy">A small visual index of the disciplines behind the work.</span>
              </div>
            </div>

            <div className="hm-proof-strip" aria-label={t("hero.proof")}>
              <div className="hm-proof-item">
                <span className="hm-proof-value">{experienceSummary.professional[language]}</span>
                <span className="hm-proof-label">{t("hero.professional")}</span>
              </div>
              <div className="hm-proof-item">
                <span className="hm-proof-value">{experienceSummary.journey[language]}</span>
                <span className="hm-proof-label">{t("hero.journey")}</span>
              </div>
              <div className="hm-proof-item">
                <span className="hm-proof-value">{featuredCount}</span>
                <span className="hm-proof-label">{t("hero.featured")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <a href="#projects" className="hm-scroll-cue">
          <span>{t("hero.scroll")}</span>
          <span className="hm-scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
