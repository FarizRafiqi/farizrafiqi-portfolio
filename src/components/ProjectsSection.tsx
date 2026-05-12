"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectModal, type ProjectData } from "@/components/ui/ProjectModal";
import { TechIconStack } from "@/components/ui/TechIconStack";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10" />
    <span className="badge">{text}</span>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/10 dark:to-white/10" />
  </div>
);

const projects: ProjectData[] = [
  {
    id: "kaladwipa",
    title: "Kaladwipa",
    description:
      "Local Arts Engagement Platform built for GEMASTIK (ICT Student Exhibition). Users can support local artists and browse artworks. Built with Laravel + Inertia.js + Bootstrap 5 and integrated with Midtrans payment gateway.",
    image: "/img/portfolio/kaladwipa.png",
    tags: ["Bootstrap 5", "Laravel", "Inertia", "Midtrans"],
    featured: true,
  },
  {
    id: "kania-jaya",
    title: "Kania Jaya E-Shop Admin",
    description:
      "Full-featured admin panel for clothing e-commerce. Manages products, orders, payments, and users. Built with Laravel + Vue.js + Tailwind CSS.",
    image: "/img/portfolio/kania-jaya.png",
    tags: ["Vue.js", "Laravel", "Tailwind CSS"],
  },
  {
    id: "megamendung",
    title: "MegaMendung PPOB",
    description:
      "Payment Point Online Bank (PPOB) for electric bill payments, integrated with Midtrans payment gateway. 3-month solo project as vocational final project.",
    image: "/img/portfolio/megamendung.png",
    tags: ["Vue.js", "Laravel", "Capacitor"],
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section id="projects" ref={ref} className="section relative bg-neutral-50 dark:bg-neutral-950">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-80 h-80 rounded-full opacity-[0.03] dark:opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #000000, transparent)" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel text="Portfolio" />
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4">
            Featured <span className="gradient-text-cyan">Projects</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl mx-auto">
            Real-world applications I&apos;ve built — from arts platforms to e-commerce admin panels.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.06] bg-white dark:bg-black/30 cursor-pointer h-[380px] shadow-sm hover:shadow-md dark:shadow-none transition-shadow duration-300 ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              {/* Top tags — overlapping circle stack */}
              <div className="absolute top-4 left-4 z-10">
                <TechIconStack tags={project.tags} variant="card" />
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neutral-200 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-white/15 backdrop-blur-sm">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10 gap-4"
        >
          <a
            href="https://github.com/FarizRafiqi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/[0.1] dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View All on GitHub
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
