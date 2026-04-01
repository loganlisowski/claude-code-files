import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fun Facts About Polystyrene  | Surprising EPS & Styrofoam Recycling Stats",
  description:
    "Discover surprising facts about polystyrene recycling, EPS foam production, and styrofoam waste. Explore stats on foam recycling and its impact.",
  openGraph: {
    title: "Fun Facts About Polystyrene  | Surprising EPS & Styrofoam Recycling Stats",
    description:
      "Discover surprising facts about polystyrene recycling, EPS foam production, and styrofoam waste. Explore stats on foam recycling and its impact.",
    url: "https://polystyrene-recycling.vercel.app/fun-facts",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun Facts About Polystyrene  | Surprising EPS & Styrofoam Recycling Stats",
    description:
      "Discover surprising facts about polystyrene, EPS foam, and styrofoam recycling statistics.",
  },
};

export default function FunFactsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
