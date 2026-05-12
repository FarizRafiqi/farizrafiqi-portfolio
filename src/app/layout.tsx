import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Fariz Rafiqi — Software Engineer & 3D Designer",
  description:
    "Portfolio of Aulia El Ihza Fariz Rafiqi — a software engineer passionate about full-stack web development, 3D design, game development, and emerging technologies like AR/VR.",
  keywords: [
    "Fariz Rafiqi",
    "Software Engineer",
    "Full Stack Developer",
    "3D Designer",
    "Laravel",
    "Vue.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Aulia El Ihza Fariz Rafiqi", url: "https://farizrafiqi.dev" }],
  openGraph: {
    title: "Fariz Rafiqi — Software Engineer & 3D Designer",
    description: "Engineering Worlds in Code & Dimension",
    url: "https://farizrafiqi.dev",
    siteName: "Fariz Rafiqi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariz Rafiqi — Software Engineer & 3D Designer",
    description: "Engineering Worlds in Code & Dimension",
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
