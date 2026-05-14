"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { useLanguage } from "@/context/LanguageContext";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10" />
    <span className="badge">{text}</span>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/10 dark:to-white/10" />
  </div>
);

const frontendTechs = [
  { name: "Vue.js", slug: "vuedotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Ionic", slug: "ionic" },
  { name: "Bootstrap", slug: "bootstrap" },
  { name: "JavaScript", slug: "javascript" },
];

const backendTechs = [
  { name: "Laravel", slug: "laravel" },
  { name: "PHP", slug: "php" },
  { name: "NestJS", slug: "nestjs" },
  { name: "Elasticsearch", slug: "elasticsearch" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express", slug: "express" },
  { name: "Go", slug: "go" },
  { name: "Python", slug: "python" },
  { name: "MySQL", slug: "mysql" },
  { name: "MongoDB", slug: "mongodb" },
];

const toolsTechs = [
  { name: "Linux", slug: "linux" },
  { name: "Ubuntu", slug: "ubuntu" },
  { name: "Debian", slug: "debian" },
  { name: "Proxmox", slug: "proxmox" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "Figma", slug: "figma" },
  { name: "Blender", slug: "blender" },
  { name: "Three.js", slug: "threedotjs" },
  { name: "Unity", slug: "unity" },
  { name: "Postman", slug: "postman" },
];

const exploringTechs = [
  { name: "Linux", slug: "linux" },
  { name: "Docker", slug: "docker" },
  { name: "NestJS", slug: "nestjs" },
  { name: "Proxmox", slug: "proxmox" },
];

export default function SkillsSection() {
  const { language, t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="section relative bg-white dark:bg-black">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #000, transparent)" }}
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
          <SectionLabel text={t("nav.skills")} />
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4">
            {language === "en" ? "Tech " : "Keahlian "}
            <span className="gradient-text-cyan">{language === "en" ? "Stack" : "Teknologi"}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Scrolling rows */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >

            <InfiniteMovingCards items={frontendTechs} direction="left" speed="normal" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >

            <InfiniteMovingCards items={backendTechs} direction="right" speed="normal" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >

            <InfiniteMovingCards items={toolsTechs} direction="left" speed="slow" />
          </motion.div>
        </div>

        {/* Currently Exploring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl p-8 border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]"
        >
          <p className="text-neutral-400 dark:text-neutral-500 text-xs text-center mb-6 uppercase tracking-widest">
            {language === "en" ? "Currently Exploring" : "Sedang Dipelajari"}
          </p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {exploringTechs.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-200 cursor-default"
              >
                <img
                  src={`https://cdn.simpleicons.org/${item.slug}/000000`}
                  alt={item.name}
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain opacity-40 dark:hidden"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <img
                  src={`https://cdn.simpleicons.org/${item.slug}/ffffff`}
                  alt={item.name}
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain opacity-40 hidden dark:block"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
