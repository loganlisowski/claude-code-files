import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polystyrene Recycling Quiz  | Test Your EPS & Foam Recycling Knowledge",
  description:
    "Take our interactive polystyrene recycling quiz. Test your knowledge of EPS recycling, styrofoam facts, and foam recycling best practices.",
  openGraph: {
    title: "Polystyrene Recycling Quiz  | Test Your EPS & Foam Recycling Knowledge",
    description:
      "Take our interactive polystyrene recycling quiz. Test your knowledge of EPS recycling, styrofoam facts, and foam recycling best practices.",
    url: "https://polystyrene-recycling.vercel.app/quiz",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polystyrene Recycling Quiz  | Test Your EPS & Foam Recycling Knowledge",
    description:
      "Take our interactive quiz and test your knowledge of polystyrene recycling, EPS, and foam recycling.",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
