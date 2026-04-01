import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Environmental Impact of Polystyrene Recycling  | EPS & Foam Recycling Data",
  description:
    "Explore data-driven insights on polystyrene recycling impact. Compare EPS foam vs alternatives, view styrofoam waste stats, and recycling trends.",
  openGraph: {
    title: "Environmental Impact of Polystyrene Recycling  | EPS & Foam Recycling Data",
    description:
      "Explore data-driven insights on polystyrene recycling impact. Compare EPS foam vs alternatives, view styrofoam waste stats, and recycling trends.",
    url: "https://polystyrene-recycling.vercel.app/environmental-impact",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Environmental Impact of Polystyrene Recycling  | EPS & Foam Recycling Data",
    description:
      "Data-driven insights on polystyrene recycling impact, EPS foam comparisons, and styrofoam waste statistics.",
  },
};

export default function EnvironmentalImpactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
