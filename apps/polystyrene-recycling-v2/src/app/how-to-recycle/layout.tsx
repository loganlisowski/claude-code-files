import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Recycle Polystyrene  -  Step-by-Step EPS & Foam Recycling Guide",
  description:
    "Complete guide to polystyrene recycling: mechanical and chemical methods, step-by-step EPS foam recycling, and styrofoam drop-off locations near you.",
  openGraph: {
    title: "How to Recycle Polystyrene  -  Step-by-Step EPS & Foam Recycling Guide",
    description:
      "Complete guide to polystyrene recycling: mechanical and chemical methods, step-by-step EPS foam recycling, and styrofoam drop-off locations near you.",
    url: "https://polystyrene-recycling.vercel.app/how-to-recycle",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Recycle Polystyrene  -  Step-by-Step EPS & Foam Recycling Guide",
    description:
      "Complete guide to polystyrene recycling: mechanical and chemical methods, step-by-step foam recycling instructions.",
  },
};

export default function HowToRecycleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
