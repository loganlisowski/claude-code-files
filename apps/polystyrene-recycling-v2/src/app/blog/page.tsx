"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  ArrowUpDown,
  BookOpen,
  X,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { blogPosts } from "@/data/polystyrene-data";

type SortOption = "newest" | "oldest" | "shortest" | "longest";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "shortest", label: "Shortest Read" },
  { value: "longest", label: "Longest Read" },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Derive unique categories from blogPosts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ["all", ...cats];
  }, []);

  // Featured post
  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured);
  }, []);

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter((post) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort
    switch (sortBy) {
      case "newest":
        posts = [...posts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "oldest":
        posts = [...posts].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "shortest":
        posts = [...posts].sort((a, b) => a.readingTime - b.readingTime);
        break;
      case "longest":
        posts = [...posts].sort((a, b) => b.readingTime - a.readingTime);
        break;
    }

    return posts;
  }, [searchQuery, activeCategory, sortBy]);

  // Non-featured posts for the grid (exclude featured if showing prominently)
  const gridPosts = useMemo(() => {
    if (!featuredPost || activeCategory !== "all" || searchQuery) {
      return filteredPosts;
    }
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost, activeCategory, searchQuery]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {blogPosts.length} articles
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Recycling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Knowledge Hub
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In-depth articles about polystyrene recycling science, policy,
              innovations, and practical tips for making a difference.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Featured Post */}
        {featuredPost && activeCategory === "all" && !searchQuery && (
          <SectionReveal className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="glass rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                    {featuredPost.image ? (
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.imageAlt || featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-green-500/20 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
                    <Badge className="absolute top-4 left-4">Featured</Badge>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <Badge
                      variant="outline"
                      className="w-fit mb-4 text-primary border-primary/30"
                    >
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readingTime} min read
                      </span>
                    </div>
                    <Button className="w-fit group/btn">
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </SectionReveal>
        )}

        {/* Search, Sort, Filter */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles by title, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                className="w-full sm:w-auto gap-2"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <ArrowUpDown className="h-4 w-4" />
                {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              </Button>
              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-48 glass rounded-lg overflow-hidden z-20"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/50",
                          sortBy === option.value &&
                            "text-primary bg-primary/10"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full capitalize transition-all",
                  activeCategory === cat
                    ? "shadow-lg shadow-primary/25"
                    : "hover:bg-muted"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => (
              <SectionReveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <GlassCard className="h-full flex flex-col p-0 overflow-hidden">
                    {/* Post Image */}
                    {post.image ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <Badge className="absolute top-3 left-3">
                          {post.category}
                        </Badge>
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-green-500/10 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-primary/30" />
                        <Badge className="absolute top-3 left-3">
                          {post.category}
                        </Badge>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readingTime} min
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] px-2 py-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-2 py-0"
                            >
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </SectionReveal>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search query or category filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
