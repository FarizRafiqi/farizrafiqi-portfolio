"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { useLanguage } from "@/context/LanguageContext";

type Article = {
  _id: string;
  title: { en: string; id: string };
  slug: { current: string };
  publishedAt: string;
  mainImage: any;
  excerpt: { en: string; id: string };
  tags: string[];
};

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10" />
    <span className="badge">{text}</span>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/10 dark:to-white/10" />
  </div>
);

export default function LatestArticles() {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const query = `*[_type == "article"] | order(publishedAt desc)[0...3] {
          _id,
          title,
          slug,
          publishedAt,
          mainImage,
          excerpt,
          tags
        }`;
        const data = await sanityClient.fetch(query);
        setArticles(data || []);
      } catch (err) {
        console.error("Error fetching latest articles:", err);
      }
    };
    fetchLatest();
  }, []);

  // If no articles are published, we don't display this section
  if (articles.length === 0) return null;

  return (
    <section id="blog-preview" ref={ref} className="section relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel text={t("nav.blog")} />
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4">
            {t("blog.latestTitle").split(" ")[0]}{" "}
            <span className="gradient-text-cyan">{t("blog.latestTitle").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl mx-auto">
            {t("blog.latestSubtitle")}
          </p>
        </motion.div>

        {/* Grid list */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {articles.map((article, i) => {
            const titleText = article.title[language] || article.title.en || "";
            const excerptText = article.excerpt[language] || article.excerpt.en || "";
            const dateStr = article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString(
                  language === "en" ? "en-US" : "id-ID",
                  { year: "numeric", month: "short", day: "numeric" }
                )
              : "";

            return (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col rounded-3xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-neutral-900/40 overflow-hidden hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                  {article.mainImage ? (
                    <Image
                      src={urlFor(article.mainImage).width(450).url()}
                      alt={titleText}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500 mb-3 font-mono">
                      {dateStr && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {dateStr}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${article.slug?.current || "#"}`}>
                        {titleText}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {excerptText}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-neutral-400 font-medium font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${article.slug?.current || "#"}`}
                      className="text-xs font-semibold text-black dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 flex items-center gap-0.5"
                    >
                      {language === "en" ? "Read" : "Baca"} →
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/blog"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300 text-sm font-bold cursor-pointer"
          >
            {language === "en" ? "View All Articles" : "Lihat Semua Artikel"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
