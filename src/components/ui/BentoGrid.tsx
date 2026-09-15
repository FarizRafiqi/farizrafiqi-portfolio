"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TechIconStack } from "@/components/ui/TechIconStack";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type LocalizedText = { en: string; id: string };

export type Project = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  images: string[];
  tags: string[];
  category?: LocalizedText;
  githubUrl?: string;
  githubUrls?: { label: string; url: string }[];
  liveUrl?: string;
  featured?: boolean;
  gradient?: string;
  organization?: LocalizedText;
  contributionHighlights?: { en: string[]; id: string[] };
  role?: LocalizedText;
  oldRepoUrl?: string;
  contributors?: number;
  isLead?: boolean;
};

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("hm-bento-layout grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[340px] md:auto-rows-[280px] grid-flow-dense max-w-7xl mx-auto w-full", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  project,
  index,
  onClick,
  className,
}: {
  project: Project;
  index: number;
  onClick: () => void;
  className?: string;
}) {
  const { language, t } = useLanguage();
  const image = project.images?.[0];
  const sourceUrl = project.githubUrl ?? project.githubUrls?.[0]?.url;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <SpotlightCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${t("projects.caseStudy")}: ${project.title[language]}`}
      className={cn("hm-project-card group relative overflow-hidden cursor-pointer", className)}
      enableTilt={true}
      tiltMaxAngle={3.5}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
          />
        ) : (
          <div className="w-full h-full hm-project-placeholder" />
        )}
        <div className={cn("hm-project-scrim absolute inset-0", project.gradient)} />
      </div>

      <div className="absolute top-5 left-5 right-5 z-20 flex items-start justify-between gap-3">
        <div className="flex flex-col items-start gap-2">
          {project.organization && (
            <span className="hm-project-org">{project.organization[language]}</span>
          )}
          <TechIconStack tags={project.tags} variant="card" isStack={true} />
        </div>
        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("projects.sourceCode")}: ${project.title[language]}`}
              className="hm-project-icon-button"
              onClick={(event) => event.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("projects.liveDemo")}: ${project.title[language]}`}
              className="hm-project-icon-button"
              onClick={(event) => event.stopPropagation()}
            >
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            {project.category && (
              <span className="hm-project-category">{project.category[language]}</span>
            )}
            <h3 className="hm-project-card-title mt-2">{project.title[language]}</h3>
            <p className="hm-project-card-description mt-2">{project.description[language]}</p>
          </div>
          <div className="hm-project-arrow flex-shrink-0" aria-hidden="true">
            <ArrowUpRight size={19} />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
