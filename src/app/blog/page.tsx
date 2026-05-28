"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Globe, Sun, Moon, Search, Calendar, Tag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "@/lib/data";
import { cn } from "@/lib/utils";

type Article = {
  _id: string;
  title: { en: string; id: string };
  slug: { current: string };
  publishedAt: string;
  mainImage: any;
  excerpt: { en: string; id: string };
  tags: string[];
};

export default function BlogListing() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
    // Fetch articles from Sanity
    const fetchArticles = async () => {
      try {
        const query = `*[_type == "article"] | order(publishedAt desc) {
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
        console.error("Error fetching articles from Sanity:", err);
      }
    };
    fetchArticles();
  }, []);

  const isDark = theme === "dark";

  // Filter articles based on search and selected tag
  const filteredArticles = articles.filter((article) => {
    const titleText = article.title[language] || article.title.en || "";
    const excerptText = article.excerpt[language] || article.excerpt.en || "";
    const matchesSearch =
      titleText.toLowerCase().includes(search.toLowerCase()) ||
      excerptText.toLowerCase().includes(search.toLowerCase());

    const matchesTag = !selectedTag || article.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Get all unique tags from articles
  const allTags = Array.from(
    new Set(articles.flatMap((article) => article.tags || []))
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 pb-20">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm group-hover:scale-110 transition-transform duration-200">
              F
            </div>
            <span className="font-bold text-sm text-black dark:text-white tracking-tight hidden sm:block">
              {personalData.shortName}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200"
            >
              <ArrowLeft size={12} />
              {language === "en" ? "Back to Home" : "Kembali"}
            </Link>

            {/* Language */}
            <button
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className="px-2 h-8 rounded-full flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
            >
              <Globe size={14} />
              <span className="text-[11px] font-bold uppercase">{language}</span>
            </button>

            {/* Theme */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mt-4">
            {t("blog.title").split(" ")[0]}{" "}
            <span className="gradient-text-cyan">{t("blog.title").split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Search and Filter panel */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-10 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02] text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center justify-end w-full md:w-auto">
              <button
                onClick={() => setSelectedTag(null)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                  selectedTag === null
                    ? "bg-black dark:bg-white text-white dark:text-black border-transparent"
                    : "border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 hover:text-black dark:hover:text-white"
                )}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                    selectedTag === tag
                      ? "bg-black dark:bg-white text-white dark:text-black border-transparent"
                      : "border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 hover:text-black dark:hover:text-white"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid articles */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredArticles.map((article, index) => {
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group flex flex-col rounded-3xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-neutral-900/50 overflow-hidden hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                      {article.mainImage ? (
                        <Image
                          src={urlFor(article.mainImage).width(500).url()}
                          alt={titleText}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700">
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
                        <h2 className="text-xl font-bold text-black dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                          <Link href={`/blog/${article.slug?.current || "#"}`}>
                            {titleText}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                          {excerptText}
                        </p>
                      </div>

                      {/* Tags & Action */}
                      <div className="mt-6 pt-4 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between flex-wrap gap-2">
                        <div className="flex flex-wrap gap-1">
                          {article.tags?.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-neutral-400 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/blog/${article.slug?.current || "#"}`}
                          className="text-xs font-semibold text-black dark:text-white hover:underline hover:text-cyan-500 dark:hover:text-cyan-400"
                        >
                          {t("blog.readMore")} →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 rounded-3xl border border-dashed border-black/10 dark:border-white/10"
            >
              <p className="text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
                {language === "en" ? "No articles found" : "Tidak ada artikel ditemukan"}
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-600">
                {language === "en"
                  ? "Write articles in Sanity Studio (/studio) to show them here."
                  : "Tulis artikel baru di Sanity Studio (/studio) agar muncul di halaman ini."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
