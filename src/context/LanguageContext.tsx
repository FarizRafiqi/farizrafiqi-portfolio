"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.blog": "Articles",
    "hero.title": "Building digital experiences where code meets creativity.",
    "hero.viewProjects": "View Projects",
    "hero.getInTouch": "Get in Touch",
    "projects.title": "Featured Projects",
    "projects.subtitle": "A collection of my recent work and personal experiments.",
    "projects.showMore": "Show More Projects",
    "projects.showLess": "Show Less",
    "projects.viewProject": "View Project",
    "projects.sourceCode": "Source Code",
    "projects.liveDemo": "Live Demo",
    "projects.tab.all": "All",
    "projects.tab.web": "Web Apps",
    "projects.tab.mobile": "Mobile Apps",
    "projects.tab.3d": "3D & VR",
    "about.title": "About Me",
    "about.subtitle": "Software Engineer & 3D Designer based in Bekasi, Indonesia.",
    "skills.title": "Tech Stack",
    "skills.subtitle": "Tools and technologies I use to bring ideas to life.",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's build something amazing together.",
    "blog.title": "My Articles",
    "blog.subtitle": "Thoughts, tutorials, and guides on software engineering and server infrastructure.",
    "blog.readMore": "Read Article",
    "blog.backToBlog": "Back to Articles",
    "blog.searchPlaceholder": "Search articles...",
    "blog.latestTitle": "Latest Articles",
    "blog.latestSubtitle": "Read my latest thoughts and technical write-ups.",
  },
  id: {
    "nav.home": "Beranda",
    "nav.projects": "Proyek",
    "nav.about": "Tentang",
    "nav.skills": "Keahlian",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.blog": "Artikel",
    "hero.title": "Membangun pengalaman digital di mana kode bertemu kreativitas.",
    "hero.viewProjects": "Lihat Proyek",
    "hero.getInTouch": "Hubungi Saya",
    "projects.title": "Proyek Unggulan",
    "projects.subtitle": "Koleksi pekerjaan terbaru dan eksperimen pribadi saya.",
    "projects.showMore": "Tampilkan Proyek Lainnya",
    "projects.showLess": "Tampilkan Lebih Sedikit",
    "projects.viewProject": "Lihat Proyek",
    "projects.sourceCode": "Kode Sumber",
    "projects.liveDemo": "Demo Langsung",
    "projects.tab.all": "Semua",
    "projects.tab.web": "Aplikasi Web",
    "projects.tab.mobile": "Aplikasi Mobile",
    "projects.tab.3d": "3D & VR",
    "about.title": "Tentang Saya",
    "about.subtitle": "Software Engineer & 3D Designer yang berbasis di Bekasi, Indonesia.",
    "skills.title": "Keahlian Teknologi",
    "skills.subtitle": "Alat dan teknologi yang saya gunakan untuk menghidupkan ide.",
    "contact.title": "Hubungi Saya",
    "contact.subtitle": "Mari membangun sesuatu yang luar biasa bersama.",
    "blog.title": "Artikel Saya",
    "blog.subtitle": "Pemikiran, tutorial, dan panduan seputar rekayasa perangkat lunak dan infrastruktur server.",
    "blog.readMore": "Baca Artikel",
    "blog.backToBlog": "Kembali ke Artikel",
    "blog.searchPlaceholder": "Cari artikel...",
    "blog.latestTitle": "Artikel Terbaru",
    "blog.latestSubtitle": "Baca pemikiran terbaru dan tulisan teknis saya.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "id")) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
