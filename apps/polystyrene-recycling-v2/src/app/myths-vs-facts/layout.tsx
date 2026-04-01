import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polystyrene Recycling Myths vs Facts  | Debunking Styrofoam & EPS Myths",
  description:
    "Separate truth from fiction about polystyrene recycling. Debunk common myths about styrofoam, EPS foam, and HIPS recycling with verified facts.",
  openGraph: {
    title: "Polystyrene Recycling Myths vs Facts  | Debunking Styrofoam & EPS Myths",
    description:
      "Separate truth from fiction about polystyrene recycling. Debunk common myths about styrofoam, EPS foam, and HIPS recycling with verified facts.",
    url: "https://polystyrene-recycling.vercel.app/myths-vs-facts",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polystyrene Recycling Myths vs Facts  | Debunking Styrofoam & EPS Myths",
    description:
      "Debunk common myths about polystyrene recycling, styrofoam disposal, and EPS foam recyclability.",
  },
};

export default function MythsVsFactsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
