"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TechIconStack } from "@/components/ui/TechIconStack";
import { useLanguage } from "@/context/LanguageContext";

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
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language, t } = useLanguage();
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

  const sourceLinks = project.githubUrls?.length
    ? project.githubUrls
    : project.githubUrl
      ? [{ label: t("projects.sourceCode"), url: project.githubUrl }]
      : [];
  const highlights = project.contributionHighlights?.[language] ?? [];
  const imageCount = project.images?.length ?? 0;
  const currentImageIndex = imageSelection.projectId === project.id ? imageSelection.index : 0;

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

          <div className="hm-modal-content">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {project.organization && <span className="hm-modal-org">{project.organization[language]}</span>}
              <TechIconStack tags={project.tags} variant="modal" isStack={false} />
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

            <div className="hm-modal-links">
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
