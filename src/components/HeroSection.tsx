"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalData } from "@/lib/data";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/ui/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Light mode: subtle dark orbs; Dark mode: subtle white orbs */}
    <div
      className="absolute w-[800px] h-[800px] top-1/2 left-1/2 opacity-[0.06] dark:opacity-[0.06]"
      style={{
        background: "radial-gradient(ellipse at center, #000000 0%, transparent 70%)",
        animation: "aurora 12s ease-in-out infinite",
        transformOrigin: "center",
      }}
    />
    <div
      className="absolute w-[800px] h-[800px] top-1/2 left-1/2 dark:opacity-[0.04] opacity-0"
      style={{
        background: "radial-gradient(ellipse at center, #ffffff 0%, transparent 70%)",
        animation: "aurora 12s ease-in-out infinite",
        transformOrigin: "center",
      }}
    />
    <div
      className="absolute w-[600px] h-[600px] top-1/3 right-1/4 opacity-[0.03]"
      style={{
        background: "radial-gradient(ellipse at center, #888888 0%, transparent 70%)",
        animation: "aurora 16s ease-in-out infinite reverse",
        transformOrigin: "center",
      }}
    />
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.25) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Dark mode grid */}
    <div
      className="absolute inset-0 opacity-0 dark:opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const FloatingOrb = ({ size, top, left, delay }: { size: number; top: string; left: string; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none bg-black/40 dark:bg-white/50"
    style={{ width: size, height: size, top, left, filter: "blur(1px)" }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      <AuroraBackground />
      <HeroScene />

      {/* Floating orbs */}
      <FloatingOrb size={6} top="20%" left="15%" delay={0} />
      <FloatingOrb size={4} top="30%" left="80%" delay={1.5} />
      <FloatingOrb size={5} top="70%" left="10%" delay={3} />
      <FloatingOrb size={3} top="75%" left="75%" delay={2} />

      <div className="container relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col items-center gap-6"
        >

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black dark:text-white leading-none">
              {personalData.shortName.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text">{word}</span> : word}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-200 max-w-xl"
          >
            {personalData.tagline}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed"
          >
            {personalData.title} — Building digital experiences where code meets creativity.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 cursor-pointer shadow-md"
            >
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-black/[0.12] dark:border-white/10 text-black dark:text-white font-semibold text-sm hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mt-4">
            {[
              { label: "GitHub", href: personalData.socials.github, icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
              { label: "LinkedIn", href: personalData.socials.linkedin, icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
              { label: "Instagram", href: personalData.socials.instagram, icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl border border-black/[0.1] dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-black/30 dark:from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
