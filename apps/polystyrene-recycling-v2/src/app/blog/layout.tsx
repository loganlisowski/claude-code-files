import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polystyrene Recycling Blog  | Articles on EPS, Foam & Styrofoam Recycling",
  description:
    "Read in-depth articles on polystyrene recycling science, EPS foam innovations, HIPS recycling policy, and practical styrofoam recycling tips.",
  openGraph: {
    title: "Polystyrene Recycling Blog  | Articles on EPS, Foam & Styrofoam Recycling",
    description:
      "Read in-depth articles on polystyrene recycling science, EPS foam innovations, HIPS recycling policy, and practical styrofoam recycling tips.",
    url: "https://polystyrene-recycling.vercel.app/blog",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polystyrene Recycling Blog  | Articles on EPS, Foam & Styrofoam Recycling",
    description:
      "In-depth articles on polystyrene recycling, EPS foam innovations, and practical styrofoam recycling tips.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
