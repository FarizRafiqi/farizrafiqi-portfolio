import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const query = `*[_type == "article" && slug.current == $slug][0] {
      title,
      excerpt,
      mainImage
    }`;
    const article = await sanityClient.fetch(query, { slug });

    if (!article) {
      return {
        title: "Article Not Found | Fariz Rafiqi",
        description: "The requested article could not be found.",
      };
    }

    const titleText = article.title?.en || article.title?.id || "Blog Post";
    const excerptText = article.excerpt?.en || article.excerpt?.id || "";
    const imageUrl = article.mainImage
      ? urlFor(article.mainImage).width(1200).height(630).url()
      : "";

    return {
      title: `${titleText} | Fariz Rafiqi`,
      description: excerptText,
      openGraph: {
        title: titleText,
        description: excerptText,
        type: "article",
        url: `https://farizrafiqi.dev/blog/${slug}`,
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: titleText,
        description: excerptText,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog | Fariz Rafiqi",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch the article details on the server
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    content,
    tags
  }`;
  const article = await sanityClient.fetch(query, { slug });

  return <BlogDetailClient article={article} />;
}
