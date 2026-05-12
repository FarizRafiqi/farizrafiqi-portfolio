"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10" />
    <span className="badge">{text}</span>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/10 dark:to-white/10" />
  </div>
);

const experiences: TimelineItem[] = [
  {
    year: "Sep 2025 – Present",
    title: "Fullstack Engineer",
    company: "Solusi Teknologi Kreatif (STK)",
    location: "Jakarta, Indonesia · On-site",
    type: "full-time",
    isCurrent: true,
    description: [
      "Developing and maintaining full-stack web applications.",
      "Collaborating with cross-functional teams to deliver software solutions.",
      "Implementing modern frontend and backend technologies.",
    ],
    tags: ["TypeScript", "Vue.js", "Node.js", "Laravel"],
  },
  {
    year: "May 2025 – Aug 2025",
    title: "Backend Developer",
    company: "PT. Zamasco Mitra Solusindo",
    location: "Jakarta, Indonesia · Hybrid",
    type: "full-time",
    description: [
      "Designed and built RESTful APIs for internal business applications.",
      "Optimized database queries and improved system performance.",
      "Worked on integrations with third-party services.",
    ],
    tags: ["Go", "PHP", "MySQL", "REST API"],
  },
  {
    year: "2022 – 2025",
    title: "Fullstack Web Developer",
    company: "Freelance",
    type: "freelance",
    description: [
      "Built custom web applications for clients across various industries.",
      "Delivered projects including e-commerce platforms and admin dashboards.",
      "Managed projects end-to-end from requirements to deployment.",
    ],
    tags: ["Laravel", "Vue.js", "React", "Tailwind CSS"],
  },
  {
    year: "2023 – 2024",
    title: "Fullstack Web Developer Intern",
    company: "MAXY Academy",
    location: "Remote",
    type: "internship",
    description: [
      "Built and shipped multiple web application features during the internship.",
      "Worked on frontend interfaces and backend API integrations.",
      "Participated in agile sprints and code reviews.",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    year: "2022 – 2023",
    title: "Head of Academic & Web Development",
    company: "KSM Multimedia UPNVJ",
    location: "Depok, Indonesia",
    type: "leadership",
    description: [
      "Led the academic division and organized workshops and technical events.",
      "Managed the organization's web development projects and mentored members.",
      "Coordinated cross-division programs and community initiatives.",
    ],
    tags: ["Leadership", "Web Dev", "Teaching"],
  },
  {
    year: "2021 – Present",
    title: "Informatics Engineering",
    company: "Universitas Pembangunan Nasional Veteran Jakarta (UPNVJ)",
    location: "Depok, Indonesia",
    type: "education",
    description: [
      "Undergraduate student specializing in software engineering.",
      "Active in campus organizations and coding competitions.",
      "Pursuing interests in 3D design, game dev, and machine learning.",
    ],
    tags: ["Algorithms", "Software Engineering", "Databases"],
  },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "3+", label: "Companies Worked" },
  { value: "2+", label: "Internships" },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="section relative bg-neutral-50 dark:bg-neutral-950">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-black/[0.06] dark:from-white/[0.06] via-transparent to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <SectionLabel text="Experience" />
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4">
            My <span className="gradient-text-cyan">Journey</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl mx-auto">
            Professional experience, internships, freelance work, and leadership roles that shaped who I am as a developer.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 text-center border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-black/20"
            >
              <div className="text-2xl font-bold gradient-text-cyan">{s.value}</div>
              <div className="text-neutral-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <Timeline items={experiences} />

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://linkedin.com/in/fariz-rafiqi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/[0.1] dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Full Profile on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
