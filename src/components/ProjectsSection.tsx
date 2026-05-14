"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { projects } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10" />
    <span className="badge">{text}</span>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/10 dark:to-white/10" />
  </div>
);

export default function ProjectsSection() {
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);

  // Group projects
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="section relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel text="Portfolio" />
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4">
            {t("projects.title").split(" ")[0]}{" "}
            <span className="gradient-text-cyan">{t("projects.title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid className="mb-4">
          {featuredProjects.map((project, i) => {
            let spanClass = "md:col-span-1 md:row-span-1";
            if (i === 0) spanClass = "md:col-span-2 md:row-span-1"; // Attendance
            if (i === 1) spanClass = "md:col-span-1 md:row-span-1"; // Flowbyte
            if (i === 2) spanClass = "md:col-span-1 md:row-span-1"; // Kaladwipa
            if (i === 3) spanClass = "md:col-span-2 md:row-span-1"; // MegaMendung
            if (i === 4) spanClass = "md:col-span-2 md:row-span-1"; // Madina
            if (i === 5) spanClass = "md:col-span-1 md:row-span-1"; // Ankersal

            return (
              <BentoCard
                key={project.id}
                project={project as any}
                index={i}
                onClick={() => setSelectedProject(project)}
                className={spanClass}
              />
            );
          })}
        </BentoGrid>

        {/* Revealable Grid for Other Projects */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <BentoGrid>
                {otherProjects.map((project, i) => (
                  <BentoCard
                    key={project.id}
                    project={project as any}
                    index={featuredProjects.length + i}
                    onClick={() => setSelectedProject(project)}
                    className={i % 3 === 0 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"}
                  />
                ))}
              </BentoGrid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300 text-sm font-bold"
          >
            {showAll ? (
              <>
                {t("projects.showLess")}
                <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                {t("projects.showMore")}
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center mt-16"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent mb-8" />
          <a
            href="https://github.com/FarizRafiqi"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {language === "en" ? "Explore more on GitHub" : "Lihat selengkapnya di GitHub"}
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
