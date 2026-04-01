import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/shared/ChatBot";
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
  metadataBase: new URL("https://polystyrene-recycling.vercel.app"),
  title: {
    default: "PolyRecycle  -  Polystyrene Recycling, EPS Recycling & Foam Recycling Education",
    template: "%s | PolyRecycle",
  },
  description:
    "Learn about polystyrene recycling, EPS recycling, and foam recycling through interactive quizzes, games, and guides. Discover how to recycle styrofoam, HIPS, and all polystyrene types.",
  openGraph: {
    title: "PolyRecycle  -  Polystyrene Recycling, EPS Recycling & Foam Recycling Education",
    description:
      "Learn about polystyrene recycling, EPS recycling, and foam recycling through interactive quizzes, games, and guides. Discover how to recycle styrofoam, HIPS, and all polystyrene types.",
    url: "https://polystyrene-recycling.vercel.app",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolyRecycle  -  Polystyrene Recycling, EPS Recycling & Foam Recycling Education",
    description:
      "Learn about polystyrene recycling, EPS recycling, and foam recycling through interactive quizzes, games, and guides.",
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
          storageKey="polystyrene-v2-theme"
        >
          <TooltipProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <ChatBot />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "glass",
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
