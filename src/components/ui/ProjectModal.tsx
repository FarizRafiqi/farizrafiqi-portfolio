"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { TechIconStack } from "@/components/ui/TechIconStack";
import { useLanguage } from "@/context/LanguageContext";

export type ProjectData = {
  id: string;
  title: { en: string; id: string };
  subtitle: { en: string; id: string };
  description: { en: string; id: string };
  images: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0); // Reset index when project changes
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl scrollbar-hide"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Project Gallery */}
            <div className="relative w-full aspect-[16/10] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {project.images && project.images[currentImageIndex] ? (
                    <Image
                      src={project.images[currentImageIndex]}
                      alt={project.title[language]}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 90vw, 720px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                      <span className="text-neutral-400 text-sm">No image available</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dots */}
              {project.images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                  {project.images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-8 -mt-10 relative z-10">
              <div className="flex gap-0 flex-wrap mb-4">
                <TechIconStack tags={project.tags} variant="modal" isStack={false} />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                {project.title[language]}
              </h3>
              <p className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-4">
                {project.subtitle[language]}
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base mb-8">
                {project.description[language].split(/(workfrom\.id)/g).map((part, i) => 
                  part === "workfrom.id" ? (
                    <a 
                      key={i} 
                      href="https://workfrom.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:underline font-medium"
                    >
                      {part}
                    </a>
                  ) : part
                )}
              </p>

              {/* Action Links */}
              <div className="flex items-center gap-3 flex-wrap">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-black/[0.1] dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 text-sm font-semibold cursor-pointer shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    {t("projects.sourceCode")}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 text-sm font-semibold cursor-pointer shadow-lg"
                  >
                    <ExternalLink size={16} />
                    {t("projects.liveDemo")}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
