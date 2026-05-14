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
    "about.title": "About Me",
    "about.subtitle": "Software Engineer & 3D Designer based in Bekasi, Indonesia.",
    "skills.title": "Tech Stack",
    "skills.subtitle": "Tools and technologies I use to bring ideas to life.",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's build something amazing together.",
  },
  id: {
    "nav.home": "Beranda",
    "nav.projects": "Proyek",
    "nav.about": "Tentang",
    "nav.skills": "Keahlian",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
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
    "about.title": "Tentang Saya",
    "about.subtitle": "Software Engineer & 3D Designer yang berbasis di Bekasi, Indonesia.",
    "skills.title": "Keahlian Teknologi",
    "skills.subtitle": "Alat dan teknologi yang saya gunakan untuk menghidupkan ide.",
    "contact.title": "Hubungi Saya",
    "contact.subtitle": "Mari membangun sesuatu yang luar biasa bersama.",
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
