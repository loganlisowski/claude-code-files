"use client";

import { useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { ReadingProgressBar } from "@/components/shared/ReadingProgressBar";
import { useGameification } from "@/hooks/useGameification";
import { blogPosts } from "@/data/polystyrene-data";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { progress, isLoaded, recordArticleRead } = useGameification();
  const hasTrackedRead = useRef(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  // Related posts: same category or overlapping tags
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        let score = 0;
        if (p.category === post.category) score += 3;
        const tagOverlap = p.tags.filter((t) => post.tags.includes(t)).length;
        score += tagOverlap;
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [post]);

  // Parse content into sections (split by ## headings or double newlines)
  const contentSections = useMemo(() => {
    if (!post) return [];
    return post.content.split("\n\n").filter((s) => s.trim());
  }, [post]);

  // Extract headings for sidebar TOC
  const headings = useMemo(() => {
    return contentSections
      .filter((section) => section.startsWith("## "))
      .map((section, i) => ({
        id: `section-${i}`,
        text: section.replace("## ", "").trim(),
      }));
  }, [contentSections]);

  // Track reading progress at 75%
  useEffect(() => {
    if (!post || !isLoaded || hasTrackedRead.current) return;

    const handleScroll = () => {
      if (hasTrackedRead.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent >= 0.75) {
        hasTrackedRead.current = true;
        const alreadyRead = progress.articlesRead.includes(post.slug);
        recordArticleRead(post.slug);
        if (!alreadyRead) {
          toast.success("+20 XP", {
            description: "Article read!",
            duration: 2000,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post, isLoaded, progress.articlesRead, recordArticleRead]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render a content section (paragraph or heading)
  const renderSection = (section: string, index: number) => {
    const trimmed = section.trim();

    // Heading
    if (trimmed.startsWith("## ")) {
      const headingIndex = contentSections
        .filter((s) => s.startsWith("## "))
        .indexOf(trimmed);
      return (
        <h2
          key={index}
          id={`section-${headingIndex}`}
          className="text-2xl font-bold mt-10 mb-4 scroll-mt-20"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    // Bold paragraph starting (like **Step 1:** ...)
    if (trimmed.startsWith("**")) {
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((part, pi) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pi} className="text-foreground font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pi}>{part}</span>;
          })}
        </p>
      );
    }

    // Regular paragraph - handle inline bold
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    const hasInlineBold = parts.length > 1;

    if (hasInlineBold) {
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((part, pi) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pi} className="text-foreground font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pi}>{part}</span>;
          })}
        </p>
      );
    }

    return (
      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  };

  // Not found state
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you are looking for does not exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />

      {/* Article Header */}
      <section className="relative overflow-hidden pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button */}
            <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="text-primary border-primary/30">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      {post.image && (
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </motion.div>
        </section>
      )}

      {/* Article Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <article ref={articleRef} className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose-custom"
            >
              {contentSections.map((section, i) => renderSection(section, i))}
            </motion.div>

            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Share this article
              </h3>
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Article Info */}
              <GlassCard className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Article Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{post.category}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </GlassCard>

              {/* Table of Contents */}
              {headings.length > 0 && (
                <GlassCard className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 border-l-2 border-border/50 pl-3 hover:border-primary"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </GlassCard>
              )}

              {/* Share */}
              <GlassCard className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Share
                </h3>
                <ShareButtons
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                  title={post.title}
                />
              </GlassCard>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <SectionReveal className="mt-20">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related, i) => (
                <SectionReveal key={related.slug} delay={i * 0.1}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="block group h-full"
                  >
                    <GlassCard className="h-full flex flex-col p-0 overflow-hidden">
                      {related.image ? (
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={related.image}
                            alt={related.imageAlt || related.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-primary/20 to-green-500/10 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-primary/30" />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <Badge variant="outline" className="w-fit mb-2 text-xs">
                          {related.category}
                        </Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.readingTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <ChevronRight className="h-3 w-3" />
                            Read more
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}
