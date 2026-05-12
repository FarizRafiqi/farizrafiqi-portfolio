"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  gradient?: string;
};

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[380px]", className)}>
      {children}
    </div>
  );
}

export function BentoCard({ project, index }: { project: Project; index: number }) {
  const isLarge = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/8 bg-black/30 backdrop-blur-md cursor-pointer",
        isLarge && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
        />
        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0",
          project.gradient
            ? project.gradient
            : "bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        )} />
      </div>

      {/* Top tags */}
      <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-white/15 bg-black/50 text-slate-300 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} className="text-white" />
          </a>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-white/10 backdrop-blur-sm">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
