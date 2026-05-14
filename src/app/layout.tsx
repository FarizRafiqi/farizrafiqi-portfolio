import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Fariz Rafiqi — Software Engineer | AI & Server Specialist",
  description:
    "Portfolio of Aulia El Ihza Fariz Rafiqi — a software engineer focused on AI, Server Infrastructure, and Linux systems. Currently working at Solusi Teknologi Kreatif.",
  keywords: [
    "Fariz Rafiqi",
    "Software Engineer",
    "AI Specialist",
    "Server Infrastructure",
    "Linux Engineer",
    "Proxmox",
    "NestJS",
    "Full Stack Developer",
    "Laravel",
    "Vue.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Aulia El Ihza Fariz Rafiqi", url: "https://farizrafiqi.dev" }],
  openGraph: {
    title: "Fariz Rafiqi — Software Engineer | AI & Server Specialist",
    description: "Engineering Intelligence in Code & Infrastructure",
    url: "https://farizrafiqi.dev",
    siteName: "Fariz Rafiqi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariz Rafiqi — Software Engineer | AI & Server Specialist",
    description: "Engineering Intelligence in Code & Infrastructure",
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
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
