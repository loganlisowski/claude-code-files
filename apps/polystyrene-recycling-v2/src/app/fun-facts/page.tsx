"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Share2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { IconMap } from "@/components/shared/IconMap";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { useGameification } from "@/hooks/useGameification";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useInView } from "@/hooks/useInView";
import { funFacts, type FunFact } from "@/data/polystyrene-data";

// ---- Category config ----
const CATEGORIES = [
  { key: "all", label: "All", color: "bg-primary" },
  { key: "production", label: "Production", color: "bg-blue-500" },
  { key: "waste", label: "Waste", color: "bg-red-500" },
  { key: "recycling", label: "Recycling", color: "bg-green-500" },
  { key: "environment", label: "Environment", color: "bg-amber-500" },
  { key: "science", label: "Science", color: "bg-purple-500" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  production: "text-blue-400",
  waste: "text-red-400",
  recycling: "text-green-400",
  environment: "text-amber-400",
  science: "text-purple-400",
};

const CATEGORY_BG: Record<string, string> = {
  production: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  waste: "bg-red-500/10 text-red-400 border-red-500/30",
  recycling: "bg-green-500/10 text-green-400 border-green-500/30",
  environment: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  science: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

// ---- Fact Card with in-view tracking ----
function FactCard({
  fact,
  index,
  isFavorited,
  onToggleFavorite,
  onViewed,
}: {
  fact: FunFact;
  index: number;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onViewed: (id: string) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const hasTracked = useRef(false);
  const [showShare, setShowShare] = useState(false);
  const [factCopied, setFactCopied] = useState(false);

  useEffect(() => {
    if (inView && !hasTracked.current) {
      hasTracked.current = true;
      onViewed(fact.id);
    }
  }, [inView, fact.id, onViewed]);

  const shareText = `Did you know? ${fact.stat} ${fact.unit} - ${fact.description} via @PolystyreneGuy #PolyRecycle #Recycling`;

  const copyFactText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setFactCopied(true);
      toast.success("Fact copied to clipboard!");
      setTimeout(() => setFactCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const downloadFactAsImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0a3d2a");
    gradient.addColorStop(0.5, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative circle
    ctx.beginPath();
    ctx.arc(540, 500, 200, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
    ctx.fill();

    // "Did you know?" label
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "bold 36px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Did you know?", 540, 420);

    // Stat
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 96px system-ui, sans-serif";
    ctx.fillText(fact.stat, 540, 540);

    // Unit
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "32px system-ui, sans-serif";
    ctx.fillText(fact.unit, 540, 600);

    // Description (word wrap)
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "30px system-ui, sans-serif";
    const words = fact.description.split(" ");
    let line = "";
    let y = 720;
    const maxWidth = 860;
    for (const word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line.trim(), 540, y);
        line = word + " ";
        y += 46;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), 540, y);

    // Category badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "bold 24px system-ui, sans-serif";
    ctx.fillText(fact.category.toUpperCase(), 540, y + 90);

    // Footer
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "26px system-ui, sans-serif";
    ctx.fillText("@PolystyreneGuy", 540, 1780);
    ctx.font = "22px system-ui, sans-serif";
    ctx.fillText("#PolyRecycle  #Recycling", 540, 1820);

    const link = document.createElement("a");
    link.download = `polystyrene-fact-${fact.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Fact image downloaded!");
  };

  return (
    <div ref={ref}>
      <SectionReveal delay={index * 0.05}>
        <GlassCard className="h-full flex flex-col gap-4 relative group">
          {/* Icon */}
          <div
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-xl bg-muted/50",
              CATEGORY_COLORS[fact.category]
            )}
          >
            <IconMap name={fact.iconName} className="h-7 w-7" />
          </div>

          {/* Stat */}
          <div>
            <span className="text-3xl font-bold text-foreground">
              {fact.stat}
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              {fact.unit}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {fact.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <Badge
              variant="outline"
              className={cn("text-xs capitalize", CATEGORY_BG[fact.category])}
            >
              {fact.category}
            </Badge>

            <div className="flex items-center gap-1">
              {/* Share button */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowShare(!showShare)}
                  aria-label="Share fact"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <AnimatePresence>
                  {showShare && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      className="absolute bottom-full right-0 mb-2 glass rounded-lg p-3 z-10 min-w-[200px]"
                    >
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyFactText}
                          className="w-full justify-start gap-2 text-xs"
                        >
                          {factCopied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                          {factCopied ? "Copied!" : "Copy share text"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={downloadFactAsImage}
                          className="w-full justify-start gap-2 text-xs"
                        >
                          <Download className="h-3 w-3" />
                          Download as image
                        </Button>
                        <div className="border-t border-border/50 pt-1">
                          <ShareButtons
                            url={`${typeof window !== "undefined" ? window.location.origin : ""}/fun-facts#${fact.id}`}
                            title={shareText}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Favorite button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onToggleFavorite(fact.id)}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isFavorited
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  )}
                />
              </Button>
            </div>
          </div>

          {/* Source */}
          {fact.source && (
            <p className="text-xs text-muted-foreground/60 mt-1">
              Source: {fact.source}
            </p>
          )}
        </GlassCard>
      </SectionReveal>
    </div>
  );
}

// ---- Main Page ----
export default function FunFactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [favorites, setFavorites, favoritesLoaded] = useLocalStorage<string[]>(
    "polystyrene-fun-fact-favorites",
    []
  );
  const [showFavorites, setShowFavorites] = useState(true);
  const { progress, isLoaded, recordFactViewed } = useGameification();

  // Track which facts have had XP toasts shown this session
  const toastedRef = useRef<Set<string>>(new Set());

  const handleFactViewed = useCallback(
    (factId: string) => {
      if (!isLoaded) return;
      const alreadyViewed = progress.factsViewed.includes(factId);
      recordFactViewed(factId);
      if (!alreadyViewed && !toastedRef.current.has(factId)) {
        toastedRef.current.add(factId);
        toast.success("+5 XP", {
          description: "New fact discovered!",
          duration: 2000,
        });
      }
    },
    [isLoaded, progress.factsViewed, recordFactViewed]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  // Filtered facts
  const filteredFacts = useMemo(() => {
    return funFacts.filter((fact) => {
      const matchesSearch =
        searchQuery === "" ||
        fact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fact.stat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fact.unit.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || fact.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Favorite facts
  const favoriteFacts = useMemo(() => {
    return funFacts.filter((f) => favorites.includes(f.id));
  }, [favorites]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {funFacts.length} facts to explore
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Fun Facts About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">
                Polystyrene
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover surprising statistics, science, and stories about one of
              the world&apos;s most common plastics and its recycling journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Favorites Section */}
        {favoritesLoaded && favoriteFacts.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="flex items-center gap-2 mb-6 group"
            >
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              <h2 className="text-xl font-semibold">
                Your Favorites ({favoriteFacts.length})
              </h2>
              {showFavorites ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </button>

            <AnimatePresence>
              {showFavorites && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteFacts.map((fact, i) => (
                      <FactCard
                        key={fact.id}
                        fact={fact}
                        index={i}
                        isFavorited={true}
                        onToggleFavorite={toggleFavorite}
                        onViewed={handleFactViewed}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* Search & Filter */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search facts..."
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
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "rounded-full transition-all",
                  activeCategory === cat.key
                    ? "shadow-lg shadow-primary/25"
                    : "hover:bg-muted"
                )}
              >
                {cat.label}
                {activeCategory === cat.key && cat.key !== "all" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    (
                    {
                      funFacts.filter((f) => f.category === cat.key).length
                    }
                    )
                  </span>
                )}
              </Button>
            ))}
          </div>
        </section>

        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredFacts.length} of {funFacts.length} facts
          {searchQuery && (
            <span>
              {" "}
              matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* Facts Grid */}
        {filteredFacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacts.map((fact, i) => (
              <FactCard
                key={fact.id}
                fact={fact}
                index={i}
                isFavorited={favorites.includes(fact.id)}
                onToggleFavorite={toggleFavorite}
                onViewed={handleFactViewed}
              />
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
            <h3 className="text-lg font-medium mb-2">No facts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters.
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

        {/* Stats bar */}
        {isLoaded && (
          <SectionReveal className="mt-16">
            <div className="glass rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Facts Discovered
                </p>
                <p className="text-2xl font-bold">
                  {progress.factsViewed.length}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    / {funFacts.length}
                  </span>
                </p>
              </div>
              <div className="w-full sm:w-64 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(progress.factsViewed.length / funFacts.length) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">Total XP Earned</p>
                <p className="text-2xl font-bold text-primary">
                  {progress.xp} XP
                </p>
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}
