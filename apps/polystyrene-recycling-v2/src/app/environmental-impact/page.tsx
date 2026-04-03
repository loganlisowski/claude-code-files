"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";
import {
  materialComparison,
  wasteDestination,
  recyclingTrend,
  recyclingByMethod,
  environmentalBenefits,
} from "@/data/chart-data";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import {
  BarChart3,
  Leaf,
  Droplets,
  Zap,
  TreePine,
  Home,
  TrendingUp,
  PieChart as PieChartIcon,
  Recycle,
  Factory,
} from "lucide-react";

// ─── Icons for environmental benefits ────────────────────────────────────────

const benefitIcons: Record<string, React.ReactNode> = {
  "Energy Saved": <Zap className="h-8 w-8 text-yellow-400" />,
  "Water Saved": <Droplets className="h-8 w-8 text-blue-400" />,
  "CO\u2082 Reduced": <Leaf className="h-8 w-8 text-green-400" />,
  "Landfill Diverted": <Recycle className="h-8 w-8 text-purple-400" />,
};

const benefitColors: Record<string, string> = {
  "Energy Saved": "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
  "Water Saved": "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  "CO\u2082 Reduced": "from-green-500/20 to-green-500/5 border-green-500/30",
  "Landfill Diverted": "from-purple-500/20 to-purple-500/5 border-purple-500/30",
};

// ─── Comparison data ─────────────────────────────────────────────────────────

const savingsComparisons = [
  {
    value: 2.3,
    unit: "tons",
    label: "CO\u2082 Saved",
    equivalent: "Equivalent to planting 53 trees",
    icon: <TreePine className="h-10 w-10 text-green-400" />,
    color: "border-green-500/30 bg-green-500/10",
  },
  {
    value: 88,
    unit: "%",
    label: "Energy Saved",
    equivalent: "Powers 1 home for 6 months",
    icon: <Home className="h-10 w-10 text-yellow-400" />,
    color: "border-yellow-500/30 bg-yellow-500/10",
  },
  {
    value: 15000,
    unit: " gal",
    label: "Water Saved",
    equivalent: "73% less water vs paper alternatives",
    icon: <Droplets className="h-10 w-10 text-blue-400" />,
    color: "border-blue-500/30 bg-blue-500/10",
  },
];

// ─── Custom chart tooltip ────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="glass rounded-lg p-3 border border-border/50 text-sm">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── Custom pie label ────────────────────────────────────────────────────────

function renderPieLabel(props: PieLabelRenderProps) {
  const cx = (props.cx as number) ?? 0;
  const cy = (props.cy as number) ?? 0;
  const midAngle = (props.midAngle as number) ?? 0;
  const innerRadius = (props.innerRadius as number) ?? 0;
  const outerRadius = (props.outerRadius as number) ?? 0;
  const percent = (props.percent as number) ?? 0;
  const name = (props.name as string) ?? "";

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--foreground))"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function EnvironmentalImpactPage() {
  // Recharts needs client-side rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--data))/0.15] via-transparent to-primary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionReveal>
            <Badge className="w-fit mb-4 bg-[hsl(var(--data))/0.15] text-[hsl(var(--data))] border-[hsl(var(--data))/0.3] hover:bg-[hsl(var(--data))/0.2]">
              <BarChart3 className="h-3 w-3 mr-1" />
              Data & Research
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Environmental{" "}
              <span className="text-[hsl(var(--data))]">Impact</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Data-driven insights into polystyrene recycling, its environmental
              benefits, and how it compares to alternatives.
            </p>
          </SectionReveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-16">
        {/* ─── Environmental Benefits ───────────────────────────────── */}
        <section>
          <SectionReveal>
            <h2 className="text-3xl font-bold text-center mb-2">
              Recycling Benefits
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              When polystyrene is recycled instead of sent to landfills, the
              environmental savings are significant.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {environmentalBenefits.map((benefit, i) => (
              <SectionReveal key={benefit.benefit} delay={i * 0.1}>
                <div
                  className={cn(
                    "rounded-xl border p-6 bg-gradient-to-b",
                    benefitColors[benefit.benefit] ?? "border-border"
                  )}
                >
                  <div className="mb-4">
                    {benefitIcons[benefit.benefit] ?? (
                      <Leaf className="h-8 w-8" />
                    )}
                  </div>
                  <AnimatedCounter
                    value={benefit.value}
                    suffix={benefit.unit}
                    className="text-4xl mb-1"
                  />
                  <div className="font-semibold text-lg">{benefit.benefit}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {benefit.description}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ─── Material Comparison Chart ────────────────────────────── */}
        <SectionReveal>
          <GlassCard>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-5 w-5 text-[hsl(var(--data))]" />
              <h2 className="text-2xl font-bold">
                Polystyrene vs Alternatives
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Per-unit comparison of environmental impact across packaging
              materials.
            </p>

            {mounted ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={materialComparison}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="metric"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 13, paddingTop: 10 }}
                  />
                  <Bar
                    dataKey="polystyrene"
                    name="Polystyrene"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="paper"
                    name="Paper"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="moldedFiber"
                    name="Molded Fiber"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Loading chart...
              </div>
            )}
          </GlassCard>
        </SectionReveal>

        {/* ─── Charts Row: Pie + Line ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Waste Destination */}
          <SectionReveal>
            <GlassCard className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <PieChartIcon className="h-5 w-5 text-[hsl(var(--data))]" />
                <h2 className="text-xl font-bold">
                  Where Does Polystyrene Waste Go?
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 text-sm">
                Current breakdown of polystyrene waste destinations in the US.
              </p>

              {mounted ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={wasteDestination}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={renderPieLabel}
                      labelLine={false}
                    >
                      {wasteDestination.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-muted-foreground">
                  Loading chart...
                </div>
              )}
            </GlassCard>
          </SectionReveal>

          {/* Recycling Trend */}
          <SectionReveal delay={0.1}>
            <GlassCard className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--data))]" />
                <h2 className="text-xl font-bold">
                  Polystyrene Recycling Rate Over Time
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 text-sm">
                Historical rates and projected growth. Dashed line shows
                projections.
              </p>

              {mounted ? (
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart
                    data={recyclingTrend}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="year"
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      unit="%"
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      name="Recycling Rate (%)"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={(props: Record<string, unknown>) => {
                        const { cx, cy, payload } = props as {
                          cx: number;
                          cy: number;
                          payload: { projected: boolean };
                        };
                        return (
                          <circle
                            key={`dot-${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r={4}
                            fill={payload.projected ? "transparent" : "#10B981"}
                            stroke="#10B981"
                            strokeWidth={2}
                            strokeDasharray={
                              payload.projected ? "3 3" : undefined
                            }
                          />
                        );
                      }}
                      strokeDasharray=""
                    />
                    {/* Overlay dashed line for projected data */}
                    <Line
                      type="monotone"
                      data={recyclingTrend.filter((d) => d.projected || d.year === 2024)}
                      dataKey="rate"
                      name="Projected"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="6 4"
                      dot={false}
                      connectNulls
                    />
                    <Legend wrapperStyle={{ fontSize: 13, paddingTop: 10 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-muted-foreground">
                  Loading chart...
                </div>
              )}
            </GlassCard>
          </SectionReveal>
        </div>

        {/* ─── Recycling Methods Breakdown ─────────────────────────── */}
        <SectionReveal>
          <GlassCard>
            <div className="flex items-center gap-2 mb-1">
              <Factory className="h-5 w-5 text-[hsl(var(--data))]" />
              <h2 className="text-2xl font-bold">Recycling by Method</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Breakdown of how polystyrene is recycled across different
              processing methods.
            </p>

            {mounted ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={recyclingByMethod}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    unit="%"
                  />
                  <YAxis
                    type="category"
                    dataKey="method"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 13,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={75}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" name="Share" radius={[0, 4, 4, 0]}>
                    {recyclingByMethod.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading chart...
              </div>
            )}
          </GlassCard>
        </SectionReveal>

        {/* ─── 1 Ton Comparison Slider ─────────────────────────────── */}
        <section>
          <SectionReveal>
            <h2 className="text-3xl font-bold text-center mb-2">
              1 Ton of Polystyrene Recycled
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Here is what recycling just one ton of polystyrene saves compared
              to producing it from raw materials.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savingsComparisons.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={cn(
                    "rounded-xl border p-6 text-center transition-all",
                    item.color
                  )}
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <AnimatedCounter
                    value={item.value}
                    suffix={item.unit}
                    className="text-4xl mb-1"
                  />
                  <div className="font-semibold text-lg mb-2">
                    {item.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.equivalent}
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
