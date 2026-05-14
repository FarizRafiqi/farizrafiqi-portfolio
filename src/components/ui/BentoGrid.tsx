"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TechIconStack } from "@/components/ui/TechIconStack";

export type Project = {
  id: string;
  title: { en: string; id: string };
  subtitle: { en: string; id: string };
  description: { en: string; id: string };
  images: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  gradient?: string;
};

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[340px] md:auto-rows-[280px] grid-flow-dense max-w-7xl mx-auto w-full", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  project,
  index,
  onClick,
  className
}: {
  project: Project;
  index: number;
  onClick: () => void;
  className?: string;
}) {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500",
        className
      )}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={project.images[0]}
          alt={project.title[language]}
          fill
          className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
        />
        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0",
          project.gradient
            ? project.gradient
            : "bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
        )} />
      </div>

      {/* Top tags */}
      <div className="absolute top-6 left-6 z-20">
        <TechIconStack tags={project.tags} variant="card" isStack={true} />
      </div>

      {/* Action buttons */}
      <div className="absolute top-6 right-6 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} className="text-white" />
          </a>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transition-all duration-500">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              {project.title[language]}
            </h3>
            <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
              {project.description[language].split(/(workfrom\.id)/g).map((part, i) => 
                part === "workfrom.id" ? (
                  <a 
                    key={i} 
                    href="https://workfrom.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {part}
                  </a>
                ) : part
              )}
            </p>
          </div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/10 backdrop-blur-md group-hover:bg-cyan-500 group-hover:border-cyan-400">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
