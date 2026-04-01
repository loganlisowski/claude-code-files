import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Polystyrene  | Types, History & Science of EPS and HIPS Recycling",
  description:
    "Explore polystyrene types including EPS, XPS, and HIPS. Learn the science, history, and recycling properties of foam and styrofoam materials.",
  openGraph: {
    title: "About Polystyrene  | Types, History & Science of EPS and HIPS Recycling",
    description:
      "Explore polystyrene types including EPS, XPS, and HIPS. Learn the science, history, and recycling properties of foam and styrofoam materials.",
    url: "https://polystyrene-recycling.vercel.app/about",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Polystyrene  | Types, History & Science of EPS and HIPS Recycling",
    description:
      "Explore polystyrene types including EPS, XPS, and HIPS. Learn the science, history, and recycling properties of foam materials.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
