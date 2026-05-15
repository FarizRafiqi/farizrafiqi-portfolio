"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { personalData, skills } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10 max-w-16" />
    <span className="badge">{text}</span>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-black/10 dark:to-white/10 max-w-16" />
  </div>
);

export default function AboutSection() {
  const { language, t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const stats = [
    { value: "6+", label: language === "en" ? "Years Experience" : "Tahun Pengalaman" },
    { value: "3+", label: language === "en" ? "Projects Shipped" : "Proyek Selesai" },
    { value: "5+", label: language === "en" ? "Technologies" : "Teknologi" },
    { value: "∞", label: language === "en" ? "Curiosity" : "Rasa Ingin Tahu" },
  ];

  return (
    <section id="about" ref={ref} className="section bg-white dark:bg-black">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <SectionLabel text={t("about.title")} />
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4">
                Hello, I&apos;m <span className="gradient-text">{personalData.shortName}</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              {personalData.bio[language]}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {skills.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.02] text-neutral-700 dark:text-neutral-300 text-sm hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white transition-all duration-200 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white font-medium transition-colors duration-200 cursor-pointer group"
              >
                {language === "en" ? "View my GitHub" : "Lihat GitHub saya"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl p-6 border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/15 dark:hover:border-white/15 transition-all duration-300 cursor-default"
                >
                  <div className="text-3xl font-bold mb-1 gradient-text">{stat.value}</div>
                  <div className="text-neutral-500 dark:text-neutral-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl p-6 border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xl">F</div>
                <div>
                  <p className="text-black dark:text-white font-semibold">{personalData.shortName}</p>
                  <p className="text-neutral-500 text-sm">{personalData.location}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {personalData.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {personalData.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  <a href={personalData.website} className="hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer">{personalData.website}</a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
