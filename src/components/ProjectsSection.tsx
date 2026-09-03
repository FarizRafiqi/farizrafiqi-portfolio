"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { BentoGrid, BentoCard, type Project as BentoProject } from "@/components/ui/BentoGrid";
import { projects } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useCustomization } from "@/context/CustomizationContext";
import { cn } from "@/lib/utils";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="hm-section-kicker">
    <span className="hm-kicker-line" aria-hidden="true" />
    <span>{text}</span>
    <span className="hm-kicker-line" aria-hidden="true" />
  </div>
);

type TabType = "all" | "web" | "mobile" | "3d";

export default function ProjectsSection() {
  const { language, t } = useLanguage();
  const { role, pitch } = useCustomization();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<BentoProject | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Map role params to default tab categories
  const defaultTab = useMemo<TabType>(() => {
    if (!role) return "all";
    if (["backend", "frontend", "fullstack", "web"].includes(role)) return "web";
    if (role === "mobile") return "mobile";
    if (["3d", "game"].includes(role)) return "3d";
    return "all";
  }, [role]);

  const [manualTab, setManualTab] = useState<TabType | null>(null);
  const activeTab = manualTab ?? defaultTab;

  const mainTabs = [
    { type: "all" as const, labelKey: "projects.tab.all" },
    { type: "web" as const, labelKey: "projects.tab.web" },
    { type: "mobile" as const, labelKey: "projects.tab.mobile" },
    { type: "3d" as const, labelKey: "projects.tab.3d" },
  ];

  // Logic for dynamic spans in filtered bento grids
  const getSpanClass = (index: number, total: number) => {
    if (total === 1) return "md:col-span-3 md:row-span-1";
    if (total === 2) {
      return index === 0 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1";
    }
    
    // Last item, starts a new row alone (starts at index % 2 === 0)
    if (index === total - 1 && index % 2 === 0) {
      return "md:col-span-3 md:row-span-1";
    }
    
    // Alternating patterns: [2, 1] then [1, 2]
    const rowIndex = Math.floor(index / 2);
    if (rowIndex % 2 === 0) {
      return index % 2 === 0 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1";
    } else {
      return index % 2 === 0 ? "md:col-span-1 md:row-span-1" : "md:col-span-2 md:row-span-1";
    }
  };

  // Reorder/feature projects based on Custom Pitch selections
  const customizedProjects = useMemo(() => {
    let list = [...projects];
    if (pitch?.selectedProjects && pitch.selectedProjects.length > 0) {
      const matched: typeof projects = [];
      const remaining: typeof projects = [];
      
      projects.forEach((proj) => {
        const isSelected = pitch.selectedProjects?.some((sp) => {
          const slugLower = sp.slug.current.toLowerCase();
          const projIdLower = proj.id.toLowerCase();
          return slugLower === projIdLower ||
                 slugLower.includes(projIdLower) ||
                 projIdLower.includes(slugLower) ||
                 sp.title.en.toLowerCase() === proj.title.en.toLowerCase();
        });
        
        if (isSelected) {
          matched.push({ ...proj, featured: true }); // Move to featured to display in top Bento grid
        } else {
          remaining.push(proj);
        }
      });
      
      // Sort matched projects by the order specified in Sanity CMS
      matched.sort((a, b) => {
        const indexA = pitch.selectedProjects!.findIndex(sp => 
          sp.slug.current.toLowerCase().includes(a.id.toLowerCase()) || a.id.toLowerCase().includes(sp.slug.current.toLowerCase())
        );
        const indexB = pitch.selectedProjects!.findIndex(sp => 
          sp.slug.current.toLowerCase().includes(b.id.toLowerCase()) || b.id.toLowerCase().includes(sp.slug.current.toLowerCase())
        );
        return indexA - indexB;
      });

      list = [...matched, ...remaining];
    }
    return list;
  }, [pitch]);

  // Group projects for default "all" tab
  const featuredProjects = customizedProjects.filter((p) => p.featured);
  const otherProjects = customizedProjects.filter((p) => !p.featured);

  // Filtered projects list for active tab (if not "all")
  const filteredList = customizedProjects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "web") {
      return p.categoryType === "fullstack" || p.categoryType === "frontend" || p.categoryType === "backend" || p.categoryType === "web";
    }
    if (activeTab === "mobile") {
      return p.categoryType === "mobile" || p.tags.includes("Ionic") || p.tags.includes("Capacitor");
    }
    if (activeTab === "3d") {
      return p.categoryType === "3d" || p.categoryType === "game" || p.categoryType === "others";
    }
    return false;
  });

  return (
    <section id="projects" ref={sectionRef} className="section hm-projects-shell relative overflow-hidden">
      <div className="hm-section-grid" aria-hidden="true" />

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="hm-projects-intro mb-10"
        >
          <div>
            <SectionLabel text={t("projects.verifiedWork")} />
            <h2 className="hm-projects-title mt-4">
              {t("projects.title")}
            </h2>
          </div>
          <p className="hm-projects-lede">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hm-project-tabs mb-12"
          role="tablist"
          aria-label={language === "en" ? "Project categories" : "Kategori proyek"}
        >
          {mainTabs.map((tab) => {
            const isActive = activeTab === tab.type;
            return (
              <button
                key={tab.type}
                onClick={() => {
                  setManualTab(tab.type);
                  setShowAll(false); // Reset reveal grid on tab change
                }}
                className={cn(
                  "hm-project-tab",
                  isActive && "hm-project-tab-active"
                )}
                role="tab"
                aria-selected={isActive}
              >
                {t(tab.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="hm-project-tab-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Bento Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "all" ? (
              <motion.div
                key="all-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {/* Featured Projects Bento Grid */}
                <BentoGrid className="hm-bento-grid mb-4">
                  {featuredProjects.map((project, i) => {
                    return (
                      <BentoCard
                        key={project.id}
                        project={project as BentoProject}
                        index={i}
                        onClick={() => setSelectedProject(project as BentoProject)}
                        className={getSpanClass(i, featuredProjects.length)}
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
                      <BentoGrid className="hm-bento-grid">
                        {otherProjects.map((project, i) => (
                          <BentoCard
                            key={project.id}
                            project={project as BentoProject}
                            index={featuredProjects.length + i}
                            onClick={() => setSelectedProject(project as BentoProject)}
                            className={getSpanClass(i, otherProjects.length)}
                          />
                        ))}
                      </BentoGrid>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle Button */}
                {otherProjects.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-8"
                  >
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="hm-secondary-button group flex items-center gap-2"
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
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-grid`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {filteredList.length > 0 ? (
                  <BentoGrid className="hm-bento-grid">
                    {filteredList.map((project, i) => (
                      <BentoCard
                        key={project.id}
                        project={project as BentoProject}
                        index={i}
                        onClick={() => setSelectedProject(project as BentoProject)}
                        className={getSpanClass(i, filteredList.length)}
                      />
                    ))}
                  </BentoGrid>
                ) : (
                  <div className="hm-empty-projects text-center py-20">
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                      {language === "en" ? "No projects found in this category" : "Tidak ada proyek di kategori ini"}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="hm-projects-footer flex flex-col items-center mt-16"
        >
          <div className="hm-footer-rule mb-8" />
          <a
            href="https://github.com/FarizRafiqi"
            target="_blank"
            rel="noopener noreferrer"
            className="hm-github-link group flex items-center gap-3"
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
