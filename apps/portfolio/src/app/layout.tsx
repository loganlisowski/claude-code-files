import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loganlisowski.com"),
  title: {
    default: "Logan Lisowski - Full-Stack Developer, Builder, Finance",
    template: "%s | Logan Lisowski",
  },
  description:
    "Full-stack developer with 40+ production apps spanning AI tools, trading analytics, SaaS platforms, and fintech. Rollins College 2026. Building at the intersection of software and finance.",
  openGraph: {
    title: "Logan Lisowski - Full-Stack Developer, Builder, Finance",
    description:
      "Full-stack developer with 40+ production apps spanning AI tools, trading analytics, SaaS platforms, and fintech.",
    url: "https://loganlisowski.com",
    siteName: "Logan Lisowski",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logan Lisowski - Full-Stack Developer, Builder, Finance",
    description:
      "Full-stack developer with 40+ production apps. AI tools, trading analytics, SaaS, fintech.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
          storageKey="portfolio-theme"
        >
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
