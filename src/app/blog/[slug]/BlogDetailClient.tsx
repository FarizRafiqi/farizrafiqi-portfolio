"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Globe, Sun, Moon, Calendar, ArrowLeft, Clock, Tag } from "lucide-react";
import { personalData } from "@/lib/data";

type Article = {
  _id: string;
  title: { en: string; id: string };
  publishedAt: string;
  mainImage: any;
  excerpt: { en: string; id: string };
  content: { en: any[]; id: any[] };
  tags: string[];
};

export default function BlogDetailClient({ article }: { article: Article | null }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          {language === "en" ? "Article Not Found" : "Artikel Tidak Ditemukan"}
        </h2>
        <Link
          href="/blog"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-95 transition-opacity"
        >
          <ArrowLeft size={16} />
          {language === "en" ? "Back to Articles" : "Kembali ke Artikel"}
        </Link>
      </div>
    );
  }

  const titleText = article.title[language] || article.title.en || "";
  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(
        language === "en" ? "en-US" : "id-ID",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  // Dynamic PortableText rendering components
  const ptComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <figure className="my-8 space-y-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08]">
              <Image
                src={urlFor(value).width(900).url()}
                alt={value.alt || "Article image"}
                fill
                className="object-cover"
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-xs text-neutral-400 dark:text-neutral-500 italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-4 text-black dark:text-white leading-tight">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black dark:text-white leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-black dark:text-white leading-tight">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 text-base md:text-lg">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 my-6 italic text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/40 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li>{children}</li>,
      number: ({ children }: any) => <li>{children}</li>,
    },
  };

  const richContent = article.content[language] || article.content.en || [];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
            <ArrowLeft size={14} />
            {t("blog.backToBlog")}
          </Link>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className="px-2 h-8 rounded-full flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
            >
              <Globe size={14} />
              <span className="text-[11px] font-bold uppercase">{language}</span>
            </button>

            {/* Theme Toggle */}
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
      <main className="max-w-3xl mx-auto px-6 pt-16">
        {/* Article Info */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span
                key={tag}
                className="badge text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight leading-tight">
            {titleText}
          </h1>

          <div className="flex items-center gap-6 text-sm text-neutral-400 dark:text-neutral-500 font-mono">
            {dateStr && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {dateStr}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {Math.max(1, Math.round(JSON.stringify(richContent).length / 2500))}{" "}
              {language === "en" ? "min read" : "menit baca"}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {article.mainImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/[0.08] mb-12 bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={urlFor(article.mainImage).width(1200).url()}
              alt={titleText}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Content Render */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <PortableText value={richContent} components={ptComponents} />
        </div>
      </main>
    </div>
  );
}
