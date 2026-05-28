import { sanityClient } from "@/sanity/client";
import { notFound } from "next/navigation";
import { CustomizationProvider } from "@/context/CustomizationContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import LatestArticles from "@/components/LatestArticles";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const query = `*[_type == "pitch" && slug.current == $slug][0] {
      companyName,
      role
    }`;
    const pitch = await sanityClient.fetch(query, { slug });

    if (!pitch) {
      return {
        title: "Page Not Found | Fariz Rafiqi",
        description: "The requested page could not be found.",
      };
    }

    return {
      title: `Special Pitch for ${pitch.companyName} | Fariz Rafiqi`,
      description: `Personalized application pitch for the ${pitch.role} position at ${pitch.companyName}.`,
      robots: {
        index: false, // Do not index recruiter-specific application pitches
        follow: true,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for apply page:", error);
    return {
      title: "Application Pitch | Fariz Rafiqi",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;

  const query = `*[_type == "pitch" && slug.current == $slug][0] {
    companyName,
    slug,
    role,
    greeting,
    selectedProjects[]-> {
      _id,
      title,
      slug
    }
  }`;
  const pitch = await sanityClient.fetch(query, { slug });

  if (!pitch) {
    notFound();
  }

  return (
    <CustomizationProvider initialPitch={pitch} initialRole={pitch.role}>
      <main className="relative">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <LatestArticles />
        <ContactSection />
        <Footer />
        <Chatbot />
      </main>
    </CustomizationProvider>
  );
}
