import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomizationProvider } from "@/context/CustomizationContext";

export const metadata: Metadata = {
  title: "Fariz Rafiqi — Software Engineer | Web, Mobile & AI Specialist",
  description:
    "Portfolio of Aulia El Ihza Fariz Rafiqi — a software engineer focused on web, mobile, backend, and AI-enabled products, with professional experience at Solusi Teknologi Kreatif through September 2026.",
  keywords: [
    "Fariz Rafiqi",
    "Software Engineer",
    "Web Development",
    "Mobile Development",
    "AI & Machine Learning",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Golang",
    "NestJS",
    "Laravel",
    "Vue.js",
    "Portfolio",
  ],
  authors: [{ name: "Aulia El Ihza Fariz Rafiqi", url: "https://farizrafiqi.dev" }],
  openGraph: {
    title: "Fariz Rafiqi — Software Engineer | Web, Mobile & AI Specialist",
    description: "Engineering Intelligence in Web, Mobile & AI Solutions",
    url: "https://farizrafiqi.dev",
    siteName: "Fariz Rafiqi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariz Rafiqi — Software Engineer | Web, Mobile & AI Specialist",
    description: "Engineering Intelligence in Web, Mobile & AI Solutions",
    creator: "@rafiqi_fariz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <LanguageProvider>
            <CustomizationProvider>
              {children}
            </CustomizationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
