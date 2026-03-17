export const materialComparison = [
  { metric: "Water Usage (L)", polystyrene: 15, paper: 56, moldedFiber: 42 },
  { metric: "Energy (MJ)", polystyrene: 10, paper: 36, moldedFiber: 28 },
  { metric: "CO\u2082 Emissions (kg)", polystyrene: 0.2, paper: 0.5, moldedFiber: 0.4 },
  { metric: "Weight per Unit (g)", polystyrene: 5, paper: 18, moldedFiber: 14 },
  { metric: "Transport Emissions", polystyrene: 8, paper: 22, moldedFiber: 18 },
];

export const wasteDestination = [
  { name: "Landfilled", value: 80, fill: "#EF4444" },
  { name: "Recycled", value: 5, fill: "#10B981" },
  { name: "Incinerated", value: 10, fill: "#F59E0B" },
  { name: "Littered/Other", value: 5, fill: "#6B7280" },
];

export const recyclingTrend = [
  { year: 2015, rate: 1.5, projected: false },
  { year: 2016, rate: 1.7, projected: false },
  { year: 2017, rate: 2.0, projected: false },
  { year: 2018, rate: 2.3, projected: false },
  { year: 2019, rate: 2.8, projected: false },
  { year: 2020, rate: 2.5, projected: false },
  { year: 2021, rate: 3.5, projected: false },
  { year: 2022, rate: 3.8, projected: false },
  { year: 2023, rate: 4.2, projected: false },
  { year: 2024, rate: 4.8, projected: false },
  { year: 2025, rate: 5.5, projected: true },
  { year: 2026, rate: 6.5, projected: true },
  { year: 2027, rate: 7.5, projected: true },
  { year: 2028, rate: 9.0, projected: true },
  { year: 2029, rate: 10.5, projected: true },
  { year: 2030, rate: 12.0, projected: true },
];

export const recyclingByMethod = [
  { method: "Compaction", percentage: 45, fill: "#10B981" },
  { method: "Shredding", percentage: 25, fill: "#3B82F6" },
  { method: "Chemical", percentage: 15, fill: "#8B5CF6" },
  { method: "Pyrolysis", percentage: 10, fill: "#F59E0B" },
  { method: "Other", percentage: 5, fill: "#6B7280" },
];

export const environmentalBenefits = [
  { benefit: "Energy Saved", value: 88, unit: "%", description: "vs producing new material" },
  { benefit: "Water Saved", value: 73, unit: "%", description: "vs paper alternatives" },
  { benefit: "CO\u2082 Reduced", value: 60, unit: "%", description: "vs paper cup lifecycle" },
  { benefit: "Landfill Diverted", value: 95, unit: "%", description: "with proper compaction" },
];
