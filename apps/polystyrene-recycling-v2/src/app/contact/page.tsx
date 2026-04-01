import type { Metadata } from "next";
import { ContactPageContent } from "./content";

export const metadata: Metadata = {
  title: "Contact Us | PolyRecycle",
  description:
    "Get in touch with the PolyRecycle team. Inquire about recycling consultations, partnerships, educational resources, and speaking engagements.",
  openGraph: {
    title: "Contact Us | PolyRecycle",
    description:
      "Connect with PolyRecycle for polystyrene recycling consultations, partnerships, and educational resources.",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
