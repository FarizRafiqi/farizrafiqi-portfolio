"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Layers,
  Cpu,
  ShieldAlert,
  Database,
  Terminal,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TechIconStack } from "@/components/ui/TechIconStack";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type LocalizedText = { en: string; id: string };

export type ProjectData = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  images: string[];
  tags: string[];
  githubUrl?: string;
  githubUrls?: { label: string; url: string }[];
  oldRepoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  role?: LocalizedText;
  organization?: LocalizedText;
  contributionHighlights?: { en: string[]; id: string[] };
  contributors?: number;
  isLead?: boolean;
};

interface ProjectModalProps {
  readonly project: ProjectData | null;
  readonly onClose: () => void;
}

interface ArchitectureCard {
  label: { en: string; id: string };
  title: { en: string; id: string };
  description: { en: string; id: string };
  category: "concurrency" | "data" | "resilience" | "security" | "architecture";
}

const projectArchitectures: Record<string, ArchitectureCard[]> = {
  "satria-muda-indonesia-platform": [
    {
      category: "concurrency",
      label: { en: "DIGITAL SCORING ENGINE", id: "ENGINE SCORING DIGITAL" },
      title: { en: "Real-Time Tanding & Seni Scoring Sync", id: "Sinkronisasi Real-Time Skor Tanding & Seni" },
      description: {
        en: "Replaced legacy paper judging sheets with a real-time digital state machine connecting mat judges, referee council, and public TV displays with instant winner resolution.",
        id: "Menggantikan lembar kertas manual dengan sistem penilaian digital real-time yang menghubungkan juri gelanggang, dewan wasit, dan layar publik dengan penentuan pemenang instan.",
      },
    },
    {
      category: "security",
      label: { en: "SEAMLESS AUTH & ROLES", id: "AUTENTIKASI & DELEGASI PERAN" },
      title: { en: "Rapid Ring Transition & Delegated Auth", id: "Delegasi Peran & Transisi Cepat Gelanggang" },
      description: {
        en: "Designed smooth role delegation allowing judges and match officials to switch rings and shift duties instantly without authentication delays or session drops.",
        id: "Merancang delegasi peran dinamis yang memungkinkan juri dan wasit bertukar gelanggang dan jadwal tugas tanpa jeda sesi atau kendala autentikasi.",
      },
    },
    {
      category: "resilience",
      label: { en: "OFFLINE TOURNAMENT RUNTIME", id: "OPERASIONAL TURNAMEN OFFLINE" },
      title: { en: "Offline Sync CLI & Match Reports", id: "Sinkronisasi Offline & Rekap Pertandingan" },
      description: {
        en: "Built an offline tournament synchronization seeder and official high-density printable recap sheet generator for uninterrupted championship execution in limited connectivity venues.",
        id: "Membangun sinkronisasi data turnamen offline dan generator lembar rekap resmi siap cetak agar operasional kejuaraan tetap berjalan lancar di venue minim sinyal.",
      },
    },
  ],
  "hemdal-sentiment-analysis": [
    {
      category: "concurrency",
      label: { en: "COMMAND CENTER", id: "PUSAT KOMANDO" },
      title: { en: "Real-Time Incident & Crisis Alerts", id: "Pemantauan Insiden & Notifikasi Krisis" },
      description: {
        en: "Engineered a live incident monitoring hub integrated with instant Telegram alerts, empowering communication teams to detect and respond to negative media surges immediately.",
        id: "Membangun pusat pemantauan insiden real-time dengan integrasi alert Telegram instan untuk respons cepat tim humas terhadap lonjakan isu media negatif.",
      },
    },
    {
      category: "architecture",
      label: { en: "AI ASSIST & RAG", id: "ASISTEN AI & RAG" },
      title: { en: "Knowledge Base RAG Intelligence", id: "Kecerdasan Media Berbasis RAG" },
      description: {
        en: "Connected AI Assist directly to Knowledge Base Core to perform RAG-driven contextual searches, sentiment summaries, and topic analysis across news and social media archives.",
        id: "Menghubungkan asisten cerdas AI Assist langsung ke Knowledge Base Core untuk penelusuran arsip berbasis RAG, perangkuman sentimen, dan analisis tren isu secara mendalam.",
      },
    },
    {
      category: "resilience",
      label: { en: "EXECUTIVE REPORTING", id: "PELAPORAN EKSEKUTIF" },
      title: { en: "Automated Multi-Channel PDF Reports", id: "Laporan PDF Multi-Channel Otomatis" },
      description: {
        en: "Built automated digest engines and high-fidelity PDF report exports for decision-makers, cleanly visualizing sentiment shifts and cross-platform comparisons.",
        id: "Membangun generator ringkasan berkala dan ekspor laporan PDF berkualitas tinggi untuk manajemen, menyajikan tren sentimen dan komparasi media secara rapi.",
      },
    },
  ],
  "smart-booking-room": [
    {
      category: "concurrency",
      label: { en: "CONCURRENCY LOCKING", id: "PENGUNCIAN KONKURENSI" },
      title: { en: "Anti-Collision Room Reservation Engine", id: "Engine Reservasi Ruangan Anti Tabrakan Jadwal" },
      description: {
        en: "Implemented database-level pessimistic locks and time slot collision detectors to guarantee zero double-booking during high-frequency parliamentary meetings.",
        id: "Menerapkan penguncian database pesimistik dan deteksi tabrakan waktu untuk menjamin tidak ada jadwal ganda pada rapat DPR RI.",
      },
    },
    {
      category: "architecture",
      label: { en: "GOVERNANCE & APPROVAL", id: "TATA KELOLA & PERSETUJUAN" },
      title: { en: "Multi-Tier Secretariat Approval Workflows", id: "Alur Kerja Persetujuan Sekretariat Bertingkat" },
      description: {
        en: "Engineered hierarchical approval states for committee heads, facilities management, and administrative secretariats with audit logging.",
        id: "Merekayasa status persetujuan berjenjang untuk pimpinan komisi, biro fasilitas, dan sekretariat dengan pencatatan jejak audit.",
      },
    },
  ],
  "knowledge-base-api-core": [
    {
      category: "resilience",
      label: { en: "CIRCUIT BREAKER EMBEDDING", id: "CIRCUIT BREAKER EMBEDDING" },
      title: { en: "Milvus Vector Search Resilience & Fallback", id: "Resiliensi Pencarian Vektor Milvus & Fallback" },
      description: {
        en: "Designed dynamic timeout handling and graceful degraded search that falls back to PostgreSQL Full-Text Search whenever vector latency spikes.",
        id: "Merancang penanganan timeout dinamis dan degradasi anggun yang beralih ke Full-Text Search PostgreSQL saat latensi vektor meningkat.",
      },
    },
    {
      category: "architecture",
      label: { en: "CONTRACT FIRST", id: "DESAIN BERBASIS KONTRAK" },
      title: { en: "OpenAPI 3.0 Spec & Automated Swagger Documentation", id: "Spesifikasi OpenAPI 3.0 & Dokumentasi Swagger Otomatis" },
      description: {
        en: "Established typed DTO validation and automated OpenAPI schema compilation for seamless client SDK generation and cross-team integration.",
        id: "Menerapkan validasi DTO bertipe dan kompilasi schema OpenAPI otomatis untuk integrasi antartim yang konsisten.",
      },
    },
  ],
};

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "concurrency":
      return Cpu;
    case "data":
      return Database;
    case "resilience":
      return ShieldAlert;
    case "security":
      return Terminal;
    default:
      return Layers;
  }
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "gallery">("overview");
  const [imageSelection, setImageSelection] = useState({ projectId: "", index: 0 });

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  const rawSourceLinks = project.githubUrls?.length
    ? project.githubUrls
    : project.githubUrl
      ? [{ label: t("projects.sourceCode"), url: project.githubUrl }]
      : [];
  const sourceLinks = rawSourceLinks.filter(
    (link) => !link.url.includes("productzillaacademy.com") && !link.url.includes("localhost")
  );
  const highlights = project.contributionHighlights?.[language] ?? [];
  const imageCount = project.images?.length ?? 0;
  const currentImageIndex = imageSelection.projectId === project.id ? imageSelection.index : 0;
  const architectureCards = projectArchitectures[project.id] ?? [];

  const nextImage = () => {
    if (imageCount > 1) {
      setImageSelection({ projectId: project.id, index: (currentImageIndex + 1) % imageCount });
    }
  };

  const prevImage = () => {
    if (imageCount > 1) {
      setImageSelection({ projectId: project.id, index: (currentImageIndex - 1 + imageCount) % imageCount });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="hm-modal-overlay"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="hm-project-modal relative w-[min(92vw,860px)] max-h-[90vh] overflow-y-auto scrollbar-hide"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button onClick={onClose} className="hm-modal-close" aria-label="Close project details">
            <X size={18} aria-hidden="true" />
          </button>

          {/* Gallery Banner */}
          <div className="hm-modal-gallery relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.24 }}
                className="absolute inset-0"
              >
                {project.images?.[currentImageIndex] ? (
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={`${project.title[language]} project screen`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 860px) 92vw, 860px"
                    priority
                  />
                ) : (
                  <div className="hm-project-placeholder h-full flex items-center justify-center">
                    <span>No project image available</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {imageCount > 1 && (
              <>
                <button onClick={prevImage} className="hm-gallery-control left-4" aria-label="Previous project image">
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button onClick={nextImage} className="hm-gallery-control right-4" aria-label="Next project image">
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2" aria-label="Project images">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImageSelection({ projectId: project.id, index })}
                      className={`hm-gallery-dot ${index === currentImageIndex ? "hm-gallery-dot-active" : ""}`}
                      aria-label={`Show image ${index + 1}`}
                      aria-current={index === currentImageIndex}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Modal Header & Navigation Tabs */}
          <div className="hm-modal-content">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap items-center gap-2">
                {project.organization && <span className="hm-modal-org">{project.organization[language]}</span>}
                <TechIconStack tags={project.tags} variant="modal" isStack={false} />
              </div>

              {/* Segmented Detail Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer",
                    activeTab === "overview"
                      ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                      : "text-neutral-500 hover:text-black dark:hover:text-white"
                  )}
                >
                  {language === "en" ? "Overview" : "Ringkasan"}
                </button>
                {architectureCards.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("architecture")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer",
                      activeTab === "architecture"
                        ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                        : "text-neutral-500 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {language === "en" ? "Architecture" : "Arsitektur"}
                  </button>
                )}
                {imageCount > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("gallery")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer",
                      activeTab === "gallery"
                        ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                        : "text-neutral-500 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {language === "en" ? `Gallery (${imageCount})` : `Galeri (${imageCount})`}
                  </button>
                )}
              </div>
            </div>

            <h2 id="project-modal-title" className="hm-modal-title">{project.title[language]}</h2>
            <p className="hm-modal-subtitle">{project.subtitle[language]}</p>

            {(project.role || project.contributors !== undefined) && (
              <div className="hm-modal-meta">
                {project.role && (
                  <div>
                    <span className="hm-meta-label">{language === "en" ? "My role & scope" : "Peran & cakupan"}</span>
                    <span className="hm-meta-value">{project.role[language]}</span>
                  </div>
                )}
                {project.contributors !== undefined && (
                  <div>
                    <span className="hm-meta-label">{language === "en" ? "Collaboration" : "Kolaborasi"}</span>
                    <span className="hm-meta-value">
                      {project.contributors === 1
                        ? (language === "en" ? "Solo project" : "Proyek mandiri")
                        : (language === "en" ? `Team of ${project.contributors}${project.isLead ? " · lead" : ""}` : `Tim ${project.contributors} orang${project.isLead ? " · lead" : ""}`)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Overview */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="hm-modal-description">{project.description[language]}</p>

                {highlights.length > 0 && (
                  <section className="hm-contribution-panel" aria-labelledby="project-contributions-title">
                    <p id="project-contributions-title" className="hm-modal-section-label">{t("projects.contributions")}</p>
                    <ul className="space-y-3">
                      {highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed">
                          <span className="hm-highlight-check" aria-hidden="true"><Check size={13} /></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </motion.div>
            )}

            {/* TAB CONTENT: Architecture */}
            {activeTab === "architecture" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 my-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {architectureCards.map((card, idx) => {
                    const Icon = getCategoryIcon(card.category);
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded flex items-center justify-center bg-black dark:bg-white text-white dark:text-black">
                            <Icon size={13} />
                          </div>
                          <span className="text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                            {card.label[language]}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                          {card.title[language]}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {card.description[language]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: Gallery Grid */}
            {activeTab === "gallery" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 my-4"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImageSelection({ projectId: project.id, index: idx });
                      }}
                      className={cn(
                        "relative aspect-video rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer group",
                        idx === currentImageIndex
                          ? "border-black dark:border-white ring-2 ring-black/20 dark:ring-white/20"
                          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
                      )}
                    >
                      <Image
                        src={imgSrc}
                        alt={`Screenshot ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Eye size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Links */}
            <div className="hm-modal-links mt-6">
              {sourceLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="hm-modal-link">
                  <ExternalLink size={16} aria-hidden="true" />
                  {link.label}
                </a>
              ))}
              {project.oldRepoUrl && (
                <a href={project.oldRepoUrl} target="_blank" rel="noopener noreferrer" className="hm-modal-link hm-modal-link-muted">
                  <ExternalLink size={16} aria-hidden="true" />
                  {language === "en" ? "Older repository" : "Repositori lama"}
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hm-modal-link hm-modal-link-primary">
                  <ExternalLink size={16} aria-hidden="true" />
                  {t("projects.liveDemo")}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
