import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polystyrene Sorting Game  -  Learn Foam & EPS Recycling by Playing",
  description:
    "Play our interactive polystyrene sorting game. Learn which foam and EPS items are recyclable while earning points and building streaks.",
  openGraph: {
    title: "Polystyrene Sorting Game  -  Learn Foam & EPS Recycling by Playing",
    description:
      "Play our interactive polystyrene sorting game. Learn which foam and EPS items are recyclable while earning points and building streaks.",
    url: "https://polystyrene-recycling.vercel.app/games",
    siteName: "PolyRecycle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polystyrene Sorting Game  -  Learn Foam & EPS Recycling by Playing",
    description:
      "Play our interactive sorting game and learn which polystyrene and foam items are recyclable.",
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
