"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Instagram,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { cn } from "@/lib/utils";
import { useState } from "react";

// ─── Contact Info ───
const contactInfo = [
  {
    icon: Instagram,
    label: "Instagram DM",
    value: "@PolystyreneGuy",
    href: "https://instagram.com/polystyreneguy",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@polystyreneguy.com",
    href: "mailto:hello@polystyreneguy.com",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "United States",
    href: null,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/polystyreneguy",
    svgPath: null,
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@polystyreneguy",
    svgPath:
      "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.82a4.84 4.84 0 01-1-.13z",
    icon: null,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@polystyreneguy",
    svgPath:
      "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    icon: null,
  },
];

// ─── FAQ Data ───
const faqs = [
  {
    question: "Is Styrofoam the same as polystyrene?",
    answer:
      "Not exactly. \"Styrofoam\" is actually a brand name owned by Dow Chemical for their blue insulation boards. The white foam cups and takeout containers you see everywhere are technically called Expanded Polystyrene (EPS). People use the word Styrofoam for everything, but now you know the difference.",
  },
  {
    question: "Can I recycle polystyrene at home?",
    answer:
      "Unfortunately, most curbside recycling programs do not accept polystyrene. But that does not mean it cannot be recycled. You just need to take it to a specialized drop-off location. There are over 1,000 of these across the US. Check the EPS Industry Alliance locator at www.epspackaging.org to find the one closest to you.",
  },
  {
    question: "Where is the nearest drop-off point?",
    answer:
      "The best way to find your nearest polystyrene drop-off location is through the EPS Industry Alliance recycling locator at www.epspackaging.org. You can search by zip code and it will show you all the collection points in your area. Many shipping stores, recycling centers, and packaging companies accept clean EPS.",
  },
  {
    question: "What happens after I drop off my polystyrene?",
    answer:
      "Great question. Your polystyrene gets compacted using a densifier, which squeezes out the air and reduces its volume by up to 50 times. The dense blocks are then shipped to manufacturers who melt them down and remake them into new products like picture frames, crown molding, and even new packaging. It is a true circular process.",
  },
  {
    question: "Why should I care about polystyrene recycling?",
    answer:
      "Because 25 billion foam cups are used in the US every year, and most end up in landfills where they sit for 500+ years. When they break apart, they become microplastics that contaminate water and soil. Recycling polystyrene saves 88% of the energy compared to making it new, and prevents 2.3 tons of CO2 per ton recycled. It is one of the easiest environmental wins out there, if people just know how to do it.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="px-5 pb-5"
        >
          <p className="text-muted-foreground text-sm leading-relaxed">
            {answer}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function ContactPageContent() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, hsla(160, 84%, 39%, 0.15), transparent)",
          }}
        />
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Say Hi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Got a question about recycling? Want to collaborate? Just want to nerd out about
            polystyrene? I&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Contact Form  - takes 3 cols */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar  - takes 2 cols */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Card */}
              <SectionReveal>
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-1">@PolystyreneGuy</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Educating the world about polystyrene recycling, one post at a time.
                    Follow along on Instagram for daily tips, myth-busting, and recycling facts.
                  </p>
                  <h3 className="text-lg font-bold mb-1">
                    The Mission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Making polystyrene recycling common knowledge. Because the biggest
                    barrier to recycling this stuff is that most people don&apos;t even
                    know they can.
                  </p>
                </div>
              </SectionReveal>

              {/* Contact Info */}
              <SectionReveal delay={0.1}>
                <div className="glass rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold">Best Ways to Reach Me</h3>
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* Social Links */}
              <SectionReveal delay={0.2}>
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Follow Along</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        {link.icon ? (
                          <link.icon className="h-5 w-5 text-primary" />
                        ) : (
                          <svg
                            className="h-5 w-5 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d={link.svgPath!} />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 md:pb-28">
        <SectionReveal className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Questions Everyone Asks
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              No such thing as a dumb question. Here are the ones that come up the most.
            </p>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
