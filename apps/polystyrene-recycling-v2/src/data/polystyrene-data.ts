// ===== INTERFACES =====

export interface FunFact {
  id: string;
  stat: string;
  unit: string;
  description: string;
  source?: string;
  iconName: string;
  category: "production" | "waste" | "recycling" | "environment" | "science";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  category: string;
  tags: string[];
  content: string;
  author?: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface MythFact {
  id: string;
  myth: string;
  fact: string;
  explanation: string;
  iconName: string;
}

export interface RecyclingMethod {
  id: string;
  name: string;
  category: "mechanical" | "chemical";
  description: string;
  steps: string[];
  pros: string[];
  cons: string[];
  iconName: string;
}

export interface PolystyreneType {
  id: string;
  name: string;
  fullName: string;
  description: string;
  characteristics: string[];
  commonUses: string[];
  recyclingDifficulty: "easy" | "moderate" | "difficult";
}

export interface EnvironmentalStat {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
  color: string;
}

export interface PolicyItem {
  state: string;
  abbreviation: string;
  description: string;
  year: number;
  type: "ban" | "restriction" | "no-ban";
  banReason?: string;
  unbanEfforts?: string;
}

// ===== FUN FACTS =====

export const funFacts: FunFact[] = [
  {
    id: "cups-per-year",
    stat: "25B",
    unit: "cups/year",
    description:
      "Americans use 25 billion polystyrene cups every year, all of which are technically recyclable through existing mechanical and chemical processes.",
    iconName: "Coffee",
    category: "waste",
  },
  {
    id: "global-production",
    stat: "15M",
    unit: "tons/year",
    description:
      "Over 15 million tons of polystyrene are produced globally each year, accounting for roughly 5% of all plastics manufactured worldwide.",
    iconName: "Factory",
    category: "production",
  },
  {
    id: "decomposition-time",
    stat: "500+",
    unit: "years",
    description:
      "Polystyrene is extremely durable, lasting over 500 years, which is why recycling it into new products makes far more sense than landfilling.",
    iconName: "Timer",
    category: "environment",
  },
  {
    id: "recycling-rate",
    stat: "~5%",
    unit: "recycled",
    description:
      "Approximately 5% of polystyrene waste is recycled in the United States, despite being technically 100% recyclable.",
    iconName: "Recycle",
    category: "recycling",
  },
  {
    id: "air-composition",
    stat: "90%",
    unit: "air",
    description:
      "Expanded polystyrene (EPS) is approximately 90-95% air by volume, making it an extremely lightweight material.",
    iconName: "Wind",
    category: "science",
  },
  {
    id: "beach-debris",
    stat: "#2",
    unit: "most common",
    description:
      "Polystyrene is commonly found during coastal cleanups, making recycling infrastructure and proper disposal critical to keeping it out of waterways.",
    iconName: "Waves",
    category: "environment",
  },
  {
    id: "landfill-volume",
    stat: "25%",
    unit: "landfill volume",
    description:
      "Because polystyrene is 95% air, it takes up significant landfill space despite being lightweight. Compaction technology solves this by reducing volume 50:1 for efficient recycling.",
    iconName: "Trash2",
    category: "waste",
  },
  {
    id: "co2-savings",
    stat: "2.3",
    unit: "tons CO\u2082 saved",
    description:
      "Recycling one ton of polystyrene saves approximately 2.3 tons of CO\u2082 emissions compared to virgin production.",
    iconName: "Leaf",
    category: "recycling",
  },
  {
    id: "daily-burial",
    stat: "1,369",
    unit: "tons/day",
    description:
      "An estimated 1,369 tons of polystyrene end up in US landfills daily, representing a massive untapped recycling opportunity worth millions in recoverable material.",
    iconName: "TrendingDown",
    category: "waste",
  },
  {
    id: "recycling-cost",
    stat: "$1,000+",
    unit: "per ton",
    description:
      "Polystyrene recycling can cost over $1,000 per ton at small scale, compared to $30-50 per ton for landfill disposal. Costs drop significantly with compaction technology and larger operations.",
    iconName: "DollarSign",
    category: "recycling",
  },
  {
    id: "landfill-rate",
    stat: "80%",
    unit: "landfilled",
    description:
      "Approximately 80% of polystyrene produced in the US goes to landfills rather than being recycled, despite the material being 100% recyclable. Better infrastructure could change this.",
    iconName: "Trash2",
    category: "waste",
  },
  {
    id: "global-waste",
    stat: "12B",
    unit: "kg/year",
    description:
      "Over 12 billion kilograms of polystyrene are produced globally each year, representing an enormous potential resource if recycling infrastructure keeps expanding.",
    iconName: "Globe",
    category: "production",
  },
  {
    id: "access-rate",
    stat: "32%",
    unit: "have access",
    description:
      "Only 32% of the US population currently has access to polystyrene recycling programs, showing the need for more infrastructure rather than bans.",
    iconName: "Users",
    category: "recycling",
  },
  {
    id: "market-value",
    stat: "$0.7B",
    unit: "market size",
    description:
      "The global EPS recycling market was valued at approximately $0.7 billion in 2025 and continues to grow.",
    iconName: "BarChart3",
    category: "recycling",
  },
  {
    id: "state-bans",
    stat: "12+",
    unit: "states",
    description:
      "More than 12 US states have enacted bans or restrictions on single-use polystyrene food containers, despite the material being 100% recyclable.",
    iconName: "Ban",
    category: "environment",
  },
  {
    id: "energy-recycled",
    stat: "10",
    unit: "MJ/kg",
    description:
      "Recycled polystyrene requires only about 10 megajoules of energy per kilogram, far less than virgin production.",
    iconName: "Zap",
    category: "science",
  },
  {
    id: "food-grade",
    stat: "2025",
    unit: "milestone",
    description:
      "In 2025, food-grade recycled polystyrene was successfully achieved for the first time at commercial scale.",
    iconName: "Award",
    category: "science",
  },
  {
    id: "invention-year",
    stat: "1839",
    unit: "discovered",
    description:
      "Polystyrene was first discovered in 1839 by German apothecary Eduard Simon, derived from a natural resin.",
    iconName: "History",
    category: "science",
  },
  {
    id: "brand-name",
    stat: "Styrofoam\u2122",
    unit: "brand name",
    description:
      "'Styrofoam' is actually a trademarked brand name by Dow Chemical, technically referring to XPS insulation, not cups.",
    iconName: "Tag",
    category: "science",
  },
  {
    id: "compression-ratio",
    stat: "1/50th",
    unit: "volume",
    description:
      "Polystyrene can be compressed to just 1/50th of its original volume, making compacted recycling highly efficient.",
    iconName: "Minimize2",
    category: "recycling",
  },
  {
    id: "marine-food",
    stat: "100K+",
    unit: "animals/year",
    description:
      "Over 100,000 marine animals are affected by plastic pollution annually. Proper polystyrene recycling keeps the material out of waterways and oceans entirely.",
    iconName: "Fish",
    category: "environment",
  },
  {
    id: "waste-volume",
    stat: "50%",
    unit: "waste stream",
    description:
      "Polystyrene and foam products can take up significant municipal waste volume, which is precisely why compaction and recycling programs are so valuable.",
    iconName: "Layers",
    category: "waste",
  },
  {
    id: "density-reduction",
    stat: "98%",
    unit: "air by volume",
    description:
      "Expanded polystyrene (EPS) is about 98% air and only 2% plastic, making it one of the lightest packaging materials and highly efficient to compact for recycling.",
    iconName: "Wind",
    category: "science",
  },
  {
    id: "thermal-insulation",
    stat: "R-4",
    unit: "per inch",
    description:
      "Polystyrene foam has an insulation value of roughly R-4 per inch, which is why it is widely used in building insulation and helps reduce energy consumption in homes.",
    iconName: "Thermometer",
    category: "science",
  },
  {
    id: "compaction-volume",
    stat: "90:1",
    unit: "compaction ratio",
    description:
      "Industrial densifiers can compact EPS foam at ratios up to 90:1, turning a truckload of loose foam into a dense block small enough to fit on a pallet.",
    iconName: "Minimize2",
    category: "recycling",
  },
  {
    id: "chemical-formula",
    stat: "C₈H₈",
    unit: "monomer",
    description:
      "Polystyrene is made from the monomer styrene (C₈H₈), a naturally occurring substance found in small amounts in foods like strawberries, cinnamon, and coffee beans.",
    iconName: "Atom",
    category: "science",
  },
  {
    id: "melting-point",
    stat: "240°C",
    unit: "melting point",
    description:
      "General-purpose polystyrene melts at around 240°C (464°F). During recycling, the material is heated just enough to be remolded into new products without degrading its quality.",
    iconName: "Flame",
    category: "science",
  },
  {
    id: "eps-resin-types",
    stat: "6",
    unit: "resin code",
    description:
      "Polystyrene is classified as resin identification code #6. Knowing this number helps consumers sort it correctly into recycling streams where programs accept it.",
    iconName: "Tag",
    category: "recycling",
  },
  {
    id: "transport-efficiency",
    stat: "40x",
    unit: "less fuel",
    description:
      "Compacted polystyrene uses up to 40 times less transport fuel than loose foam, dramatically lowering the carbon footprint of getting recycled material to processing facilities.",
    iconName: "Truck",
    category: "environment",
  },
  {
    id: "closed-loop-potential",
    stat: "100%",
    unit: "recyclable",
    description:
      "Polystyrene is a thermoplastic, meaning it can theoretically be melted and reformed an unlimited number of times without significant loss of structural properties.",
    iconName: "Recycle",
    category: "recycling",
  },
  {
    id: "drop-off-locations",
    stat: "1,000+",
    unit: "U.S. drop-off sites",
    description:
      "There are over 1,000 foam drop-off recycling locations across the United States, and the number continues to grow as communities invest in polystyrene recovery programs.",
    iconName: "Map",
    category: "recycling",
  },
  {
    id: "water-resistance",
    stat: "0%",
    unit: "water absorption",
    description:
      "Polystyrene is highly water-resistant and does not absorb moisture, which makes it ideal for protecting goods during shipping and easier to clean for recycling.",
    iconName: "Droplets",
    category: "science",
  },
  {
    id: "picture-frame-reuse",
    stat: "1,000+",
    unit: "products made",
    description:
      "Recycled polystyrene is used to make over a thousand different products including picture frames, crown molding, park benches, and seedling trays.",
    iconName: "Package",
    category: "recycling",
  },
  {
    id: "energy-content",
    stat: "16,000",
    unit: "BTU per pound",
    description:
      "Polystyrene contains roughly 16,000 BTUs per pound of energy. When mechanical recycling is not available, this energy can be recovered through waste-to-energy facilities.",
    iconName: "Zap",
    category: "science",
  },
  {
    id: "food-safety-record",
    stat: "50+",
    unit: "years of FDA approval",
    description:
      "The FDA has approved polystyrene for food-contact use for over 50 years. Recycled food-grade polystyrene can be processed back into safe food packaging.",
    iconName: "Shield",
    category: "production",
  },
  {
    id: "lightweight-savings",
    stat: "70%",
    unit: "weight reduction",
    description:
      "EPS packaging weighs up to 70% less than alternative materials like molded paper pulp, which means lower shipping emissions and reduced transportation costs.",
    iconName: "Scale",
    category: "environment",
  },
  {
    id: "global-eps-capacity",
    stat: "7M+",
    unit: "tons/year capacity",
    description:
      "Global EPS production capacity exceeds 7 million tons per year. As recycling infrastructure expands, a growing share of this material is being recovered and reprocessed.",
    iconName: "Factory",
    category: "production",
  },
  {
    id: "job-creation",
    stat: "10,000+",
    unit: "recycling jobs",
    description:
      "The polystyrene recycling industry supports tens of thousands of jobs worldwide, from collection and sorting to processing and manufacturing of recycled products.",
    iconName: "Users",
    category: "recycling",
  },
  {
    id: "school-programs",
    stat: "500+",
    unit: "school programs",
    description:
      "Over 500 schools across North America have implemented foam tray recycling programs, teaching children about sustainability while diverting waste from landfills.",
    iconName: "Award",
    category: "recycling",
  },
  {
    id: "packaging-protection",
    stat: "99%",
    unit: "damage prevention",
    description:
      "EPS packaging prevents up to 99% of product damage during shipping for fragile goods like electronics, reducing the waste and emissions caused by returns and replacements.",
    iconName: "Shield",
    category: "production",
  },
  {
    id: "dissolution-recycling",
    stat: "New",
    unit: "technology",
    description:
      "Dissolution recycling uses solvents to separate pure polystyrene from contaminants, producing near-virgin quality material and opening new pathways for hard-to-recycle foam.",
    iconName: "Beaker",
    category: "recycling",
  },
  {
    id: "styrene-natural",
    stat: "50+",
    unit: "natural sources",
    description:
      "Styrene occurs naturally in over 50 foods including wheat, peanuts, and beef. The compound is metabolized by the body and does not accumulate.",
    iconName: "Leaf",
    category: "science",
  },
  {
    id: "building-insulation",
    stat: "30%",
    unit: "energy savings",
    description:
      "Buildings insulated with EPS or XPS polystyrene foam can save up to 30% on heating and cooling costs, reducing overall energy demand and greenhouse gas emissions.",
    iconName: "Building",
    category: "environment",
  },
  {
    id: "eps-lifespan",
    stat: "50+",
    unit: "years of service",
    description:
      "EPS insulation installed in buildings can maintain its performance for over 50 years. At end of life, it can be removed and recycled into new insulation or products.",
    iconName: "Clock",
    category: "production",
  },
  {
    id: "water-savings",
    stat: "80%",
    unit: "less water used",
    description:
      "Manufacturing EPS uses up to 80% less water compared to producing equivalent paper-based packaging, making it a surprisingly water-efficient material choice.",
    iconName: "Droplets",
    category: "environment",
  },
  {
    id: "collection-growth",
    stat: "15%",
    unit: "annual increase",
    description:
      "Polystyrene recycling collection rates in the U.S. have been growing by roughly 15% per year as more municipalities add foam to their accepted materials lists.",
    iconName: "TrendingDown",
    category: "recycling",
  },
  {
    id: "recycled-pellet-value",
    stat: "$500+",
    unit: "per ton",
    description:
      "Recycled polystyrene pellets can sell for over $500 per ton on the commodity market, making foam recovery economically viable when proper infrastructure is in place.",
    iconName: "DollarSign",
    category: "recycling",
  },
  {
    id: "solar-panel-use",
    stat: "Growing",
    unit: "application",
    description:
      "Recycled polystyrene is increasingly used as lightweight backing material in solar panel installations, giving old foam a second life in renewable energy systems.",
    iconName: "Sun",
    category: "recycling",
  },
  {
    id: "greenhouse-growing",
    stat: "Millions",
    unit: "seedling trays",
    description:
      "Recycled polystyrene is widely used to make seedling trays for greenhouses and nurseries, supporting agriculture while keeping foam out of landfills.",
    iconName: "TreePine",
    category: "recycling",
  },
  {
    id: "warehouse-usage",
    stat: "60%",
    unit: "of cold storage",
    description:
      "About 60% of cold storage and refrigerated warehouse facilities use polystyrene insulation panels, and these panels can be recycled when facilities are renovated.",
    iconName: "Warehouse",
    category: "production",
  },
  {
    id: "pyrolysis-innovation",
    stat: "95%",
    unit: "styrene recovery",
    description:
      "Advanced pyrolysis technology can recover up to 95% of styrene monomer from waste polystyrene, enabling true circular recycling back into virgin-quality plastic.",
    iconName: "Lightbulb",
    category: "recycling",
  },
  {
    id: "medical-packaging",
    stat: "Critical",
    unit: "healthcare role",
    description:
      "EPS is essential for shipping temperature-sensitive vaccines and medical supplies. After use, these medical coolers can be collected and recycled through specialized programs.",
    iconName: "Heart",
    category: "production",
  },
  {
    id: "cement-additive",
    stat: "Lighter",
    unit: "concrete mix",
    description:
      "Crushed recycled EPS beads are mixed into lightweight concrete, reducing building weight by up to 25% while providing thermal insulation and giving foam waste a second life.",
    iconName: "Hammer",
    category: "recycling",
  },
];


// ===== BLOG POSTS =====

export const blogPosts: BlogPost[] = [
  {
    slug: "stop-calling-it-styrofoam",
    title: "Stop Calling It Styrofoam (And Here's Why It Matters)",
    excerpt:
      "That white foam cup in your hand is not Styrofoam. Here is why the name mix-up is actually hurting recycling efforts everywhere.",
    date: "2025-11-15",
    readingTime: 5,
    category: "Education",
    author: "@PolystyreneGuy",
    tags: ["styrofoam", "polystyrene", "EPS", "education", "naming"],
    featured: true,
    image: "https://images.unsplash.com/photo-1572949645841-094545c12947?w=1200",
    imageAlt: "White foam cups stacked together",
    content: `OK let me say this louder for the people in the back: **that white foam cup you are holding is NOT Styrofoam.** I know, I know. You have been calling it that your entire life. Your parents called it that. Your friends call it that. Even the news calls it that. But here is the thing. Getting the name wrong is actually making our recycling problem worse. Let me explain.

## So What IS Styrofoam, Then?

Styrofoam is a trademarked brand name owned by Dow Chemical Company. It has been since 1941. And here is the kicker: Dow's Styrofoam product is a type of **extruded polystyrene (XPS)** used almost exclusively for building insulation and craft materials. It is that blue or pink rigid foam board you see at construction sites. That is the real Styrofoam.

Your coffee cup? Your takeout container? The packaging peanuts in your Amazon box? None of that is Styrofoam. Not even close. Those products are made from **expanded polystyrene (EPS)**, which is a completely different form of the same base material. Think of it like this: Kleenex is a brand of tissue. Not all tissues are Kleenex. Same deal here.

Dow Chemical has actually spent decades trying to correct people on this. They have an entire page on their website explaining that their product is not used for cups or food containers. But the generic use of "Styrofoam" became so widespread that it stuck, and now we are all living with the consequences.

## Why Does the Name Actually Matter?

Here is where it gets real. When people call everything "Styrofoam," it creates a massive blind spot in recycling awareness. Let me break down why.

**Problem 1: People think it cannot be recycled.** "Styrofoam" has become synonymous with "non-recyclable waste" in most people's minds. But polystyrene, the actual material, is 100% recyclable. When you lump everything under a brand name that sounds industrial and disposable, people assume it is trash. Full stop.

**Problem 2: It confuses the recycling conversation.** When cities pass "Styrofoam bans," they are actually banning EPS food service containers. But because the terminology is wrong, people do not understand what is actually being regulated. Some think ALL foam products are banned. Others think the bans cover materials they do not. The confusion makes it harder to build public support for smart recycling policies.

**Problem 3: It erases the material science.** Polystyrene is a fascinating and versatile material with a resin code (#6) and specific recycling pathways. When you call it all "Styrofoam," you lose the ability to talk about what the material actually is, how it is made, and most importantly, how it can be recycled or reused. You would not call every car a "Ford," right? Same principle.

## The Real Material: Polystyrene 101

Let me give you the quick rundown on what you are actually dealing with.

**Polystyrene** is a synthetic polymer made from the monomer styrene. Fun fact: styrene occurs naturally in foods like strawberries, cinnamon, and coffee beans. The material comes in several forms.

- **EPS (Expanded Polystyrene):** The lightweight, white, beaded foam. This is your cups, takeout containers, coolers, and packaging. It is about 95% air by volume.
- **XPS (Extruded Polystyrene):** Denser foam boards used in construction. This is the actual Styrofoam brand product.
- **GPPS (General Purpose Polystyrene):** Clear, rigid plastic used in lab equipment and CD cases.
- **HIPS (High Impact Polystyrene):** Tougher, opaque plastic used in appliance housings and toys.

All of these are polystyrene. All of them carry the #6 resin code. And all of them have recycling pathways available today.

## What You Can Do About It

Start by changing your vocabulary. I know it feels like a small thing, but language shapes how we think about problems. When you call it polystyrene, you are already framing it as a material with properties, a recycling code, and a path back into the economy.

Here are some practical steps:

1. **Correct yourself (gently).** Next time you catch yourself saying "Styrofoam," pause and say "polystyrene foam" or just "EPS." It feels weird at first, but it becomes natural fast.

2. **Educate your circle.** Share this knowledge casually. "Did you know that is not actually Styrofoam?" is a great conversation starter. People find this genuinely surprising and interesting.

3. **Use the right terms online.** When you post about recycling or sustainability, use "polystyrene" instead of "Styrofoam." It helps the algorithm connect people to accurate recycling information instead of myths.

4. **Look for the #6.** Flip over your foam containers and look for the recycling symbol with the number 6 inside. That tells you it is polystyrene, and it tells you the material has a dedicated recycling stream.

5. **Support polystyrene recycling programs.** Now that you know the material is recyclable, seek out drop-off locations in your area. The EPS Industry Alliance has a recycling locator that makes this easy.

## The Bigger Picture

The naming problem is really a symptom of a larger issue: we do not teach people about the materials they use every day. We toss things in the trash or the recycling bin based on vibes and assumptions, not actual knowledge.

Polystyrene is a perfect example. It is one of the most recyclable plastics on the planet. Chemical recycling can break it all the way back down to its original monomer and rebuild it into food-grade material. Mechanical recycling can compress it to 1/50th of its volume and turn it into picture frames, park benches, and insulation. The technology exists. The infrastructure is growing.

But none of that matters if people think it is just "Styrofoam" that belongs in the trash.

So please, for me, for the planet, for the sake of accurate recycling. Stop calling it Styrofoam. Call it what it is: polystyrene. And then go recycle it.

*Your move.*`,
  },
  {
    slug: "polystyrene-lifecycle-oil-well-to-coffee-cup",
    title: "The Polystyrene Lifecycle: From Oil Well to Your Coffee Cup and Back Again",
    excerpt:
      "Ever wonder how that foam cup in your hand went from crude oil underground to your morning latte? Let me walk you through the whole journey.",
    date: "2025-10-28",
    readingTime: 6,
    category: "Science",
    author: "@PolystyreneGuy",
    tags: ["lifecycle", "science", "manufacturing", "circular economy", "EPS"],
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1200",
    imageAlt: "Industrial manufacturing process with foam materials",
    content: `I think one of the coolest things about polystyrene is its origin story. This material that you casually sip your coffee from every morning has been on an absolutely wild journey to get to your hand. And if we do things right, its journey does not end when you finish that latte. Let me take you through the entire lifecycle, from deep underground to your cup and (hopefully) back again.

## Chapter 1: It All Starts With Oil

Polystyrene begins its life as crude oil. Yep, the same stuff that powers your car and heats your home. Deep underground, petroleum deposits have been forming for millions of years from ancient organic matter. When crude oil is extracted and sent to a refinery, it gets separated into different components through a process called fractional distillation. One of those components is a chemical called ethylbenzene.

Ethylbenzene is then put through a process called dehydrogenation, where hydrogen atoms are stripped away. What you are left with is **styrene monomer**, the fundamental building block of polystyrene. Styrene has the chemical formula C8H8, and here is a fun piece of trivia: it actually occurs naturally in small amounts in foods like strawberries, cinnamon, coffee beans, and peanuts. Nature got there first.

## Chapter 2: From Monomer to Polymer

Now comes the magic. Styrene monomer is a liquid, and on its own, it is not particularly useful for making cups. To turn it into polystyrene, manufacturers use a process called **polymerization**. Essentially, they chain thousands of individual styrene molecules together into long molecular strands, like snapping together an incredibly long chain of tiny building blocks.

The result is polystyrene resin, which comes in the form of small, clear pellets that look a lot like fish tank gravel. These pellets are the raw material that gets shipped to manufacturers around the world. At this stage, the material is solid, clear, and relatively dense. It does not look anything like that foam cup yet.

## Chapter 3: The Expansion

Here is where things get really interesting. To make expanded polystyrene (EPS), those little pellets get infused with a blowing agent, typically pentane gas. When heat is applied (usually steam), the pentane inside each bead expands dramatically, puffing up the pellets to 40 to 50 times their original volume. Imagine a popcorn kernel popping, but in slow motion and with plastic instead of corn.

These expanded beads are then placed into a mold, and more steam is applied. The heat causes the outer surfaces of the beads to soften and fuse together, creating a single solid piece of foam in whatever shape the mold dictates. A cup, a takeout container, a cooler, a block of protective packaging. The final product is roughly 95% air and only 5% actual polystyrene by volume. That is why it is so incredibly lightweight.

For **extruded polystyrene (XPS)**, the process is different. Instead of expanding individual beads, the molten polystyrene is pushed through a die (like a pasta machine) with the blowing agent mixed in. This creates a continuous sheet of foam with a uniform, closed-cell structure. XPS is denser and stronger than EPS, which is why it is used primarily for building insulation.

## Chapter 4: The Product Life

Once manufactured, polystyrene products head out into the world. Your EPS coffee cup might keep your drink hot for your entire commute. A set of EPS packaging inserts might protect a new television during a cross-country shipment. An XPS insulation board might spend 50 years inside the walls of a building, saving energy by keeping heat in during winter and out during summer.

The product life of polystyrene varies enormously. A disposable cup might be used for 30 minutes. A cooler might last a summer. Building insulation can perform for decades. But eventually, every polystyrene product reaches its end of life. And this is where the story gets critical.

## Chapter 5: End of Life (The Crossroads)

When a polystyrene product is done being used, it faces one of several fates.

**Path 1: Landfill.** This is unfortunately the most common outcome today. About 80% of polystyrene in the US ends up in landfills, where it will sit for 500+ years without breaking down. Because EPS is 95% air, it takes up a massive amount of landfill space relative to its weight. This is the worst possible outcome.

**Path 2: Incineration.** Some polystyrene goes to waste-to-energy facilities, where it is burned to generate electricity. Polystyrene has a high energy content (about 16,000 BTUs per pound), so it burns efficiently. Modern incinerators have emission controls, but this path still releases CO2 and destroys the material permanently.

**Path 3: Litter.** Lightweight EPS is easily carried by wind and water. When it escapes the waste stream, it breaks down into smaller and smaller fragments called microplastics that contaminate soil, waterways, and oceans. This is the environmental nightmare scenario.

**Path 4: Recycling.** And here is the good news. This path is growing. Polystyrene can be recycled through mechanical processes (compaction, shredding, extrusion) or chemical processes (pyrolysis, depolymerization). Both approaches recover the material and keep it in the economy.

## Chapter 6: The Circular Dream

The ultimate vision for polystyrene is a fully circular lifecycle. Here is what that looks like.

You drink your coffee from an EPS cup. You rinse it out and drop it at a polystyrene recycling location. The cup gets collected and sent to a processing facility. There, it is either mechanically compressed and turned into pellets for new products, or chemically broken down all the way back to styrene monomer.

That recovered styrene monomer gets purified and re-polymerized into brand new polystyrene resin. That resin gets shipped to a cup manufacturer. And a new cup gets made. The same material, going around and around, never touching a landfill, never reaching the ocean.

This is not science fiction. In 2025, food-grade recycled polystyrene was achieved at commercial scale for the first time. A polystyrene cup can now be recycled back into another polystyrene cup. The technology is real and it is scaling up right now.

## What Needs to Happen

The circular economy for polystyrene is technically possible today. What is missing is infrastructure and participation. We need more collection points, more processing facilities, more public awareness, and more demand for recycled polystyrene products.

Every cup you recycle instead of trashing is a vote for the circular path. Every time you seek out a drop-off location, you are proving that the demand exists. And every time you choose products made with recycled polystyrene content, you are closing the loop.

The lifecycle of polystyrene does not have to end in a landfill. It can be a circle. And honestly? That is pretty beautiful for a material most people still call "Styrofoam."

*Let us close the loop together.*`,
  },
  {
    slug: "5-things-you-can-do-today-to-recycle-more-polystyrene",
    title: "5 Things You Can Do TODAY to Recycle More Polystyrene",
    excerpt:
      "Practical, no-excuses tips for recycling polystyrene right now, even if your city does not have curbside pickup for it.",
    date: "2025-10-10",
    readingTime: 5,
    category: "How-To",
    author: "@PolystyreneGuy",
    tags: ["how-to", "recycling", "tips", "actionable", "drop-off"],
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200",
    imageAlt: "Person sorting recyclable materials into bins",
    content: `Let me be real with you. I get messages every single week from people saying, "I want to recycle my polystyrene, but I have no idea how." And honestly, I get it. It is not like aluminum cans where you just toss them in the blue bin and call it a day. Polystyrene recycling takes a little more effort, but I promise it is not hard once you know what to do.

Here are five things you can start doing literally today. No special equipment needed. No degree in environmental science required. Just practical, real-world steps that actually make a difference.

## 1. Learn to Clean It (It Takes 30 Seconds)

The number one reason polystyrene gets rejected at recycling facilities is contamination. We are talking food residue, grease, sauces, and all that stuff left over from your takeout order. But cleaning polystyrene is way easier than most people think.

Here is the process:

- **Rinse with warm water.** A quick rinse under the faucet handles most food residue. You do not need soap for light contamination.
- **Wipe stubborn grease.** For greasier containers, a quick wipe with a paper towel before rinsing does the trick.
- **Let it dry.** Shake off the excess water and let your containers air dry. Wet polystyrene is fine for recycling, but drier material is easier to handle and store.
- **Remove non-polystyrene parts.** Peel off any paper labels or tape. Remove plastic lids that might be a different resin type. You want clean, pure polystyrene.

That is it. The whole process takes less time than checking your Instagram notifications. If a container is so contaminated with grease that you cannot get it clean (think: a container that held extra saucy buffalo wings), then it is OK to trash that one. But most EPS food containers clean up just fine.

**Pro tip:** Keep a small bag or bin next to your regular recycling specifically for clean polystyrene. When it fills up, that is your signal to make a drop-off run.

## 2. Find Your Nearest Drop-Off Location

Since most curbside recycling programs do not accept polystyrene (it can jam sorting equipment and contaminate other recyclables), you will need to find a dedicated drop-off point. This sounds harder than it is.

**Your best resources:**

- **The EPS Industry Alliance Recycling Locator:** This is the gold standard. They maintain a searchable map of polystyrene recycling drop-off locations across the entire United States. Just enter your zip code and see what pops up.
- **Earth911.com:** Another solid database. Search for "polystyrene" or "EPS foam" recycling in your area.
- **Local shipping stores:** Many UPS Store locations, FedEx stores, and local packaging shops accept clean EPS packaging for reuse. Call ahead to confirm.
- **Big box retailers:** Some Home Depot and Lowe's locations accept EPS packaging, especially the rigid insulation foam from construction projects.

There are over 1,000 foam drop-off recycling locations across the US, and that number is growing every year. Chances are good that there is one within a reasonable drive from where you live.

**Pro tip:** Turn your drop-off into a regular errand. Combine it with grocery shopping or other weekly trips so it does not feel like an extra burden. Once it becomes part of your routine, it is automatic.

## 3. Use Mail-Back Programs

OK, here is one most people do not even know exists. Several organizations and companies run mail-back programs where you can ship your clean polystyrene to a recycling facility. You collect it at home, pack it into a box, and mail it off.

**How to find mail-back programs:**

- Check the EPS Industry Alliance website for current mail-back options in your region.
- Some foam manufacturers include return-shipping information on their packaging. Look for it next time you unbox something.
- Local environmental organizations sometimes coordinate group mail-backs to reduce shipping costs per person.

The economics of mailing lightweight EPS foam actually work surprisingly well because the material weighs almost nothing. A large box stuffed with EPS cups and containers might weigh just a couple of pounds. Shipping costs are minimal.

**Pro tip:** Coordinate with neighbors or coworkers. If everyone in your office collects their clean polystyrene for a week, you can fill a large box quickly and share the (already small) shipping cost.

## 4. Break It Down (But Do Not Ball It Up)

Space is the enemy of polystyrene recycling. Because EPS is 95% air, it takes up a ridiculous amount of room. A bag of foam cups and containers can fill your entire trunk while weighing almost nothing.

Here is how to manage the bulk:

- **Break large pieces into smaller ones.** Snap packaging blocks in half. Crush cups flat. The goal is to reduce the air space so you can fit more material into each bag or bin.
- **Do NOT compress EPS into tight balls.** I see people do this all the time, and it actually makes the material harder for recycling facilities to process. The machinery works best with flat or loosely broken pieces, not compressed wads.
- **Remove tape and labels.** This is also a good time to pull off any stickers, tape, or non-polystyrene attachments.
- **Bag it loosely.** A large clear garbage bag works great for collecting broken-down EPS. Recycling facilities prefer to see what is inside the bag, so clear or translucent bags are better than opaque ones.

**Pro tip:** Dedicate a spot in your garage, laundry room, or closet for your polystyrene collection bag. Out of the kitchen, out of the way, but not forgotten.

## 5. Advocate for Local Recycling Programs

This is the big one. The reason most of us do not have convenient polystyrene recycling is not because the technology does not exist. It is because our local waste management programs have not adopted it yet. You can change that.

**Here is how to advocate effectively:**

- **Contact your city council or waste management department.** Send an email or attend a public meeting. Ask specifically about adding polystyrene to the accepted materials list or establishing dedicated drop-off events.
- **Share the facts.** Many decision-makers still believe polystyrene cannot be recycled. Arm yourself with data. Polystyrene is 100% recyclable. Compaction technology reduces volume by 50:1. Chemical recycling can produce food-grade material. The global EPS recycling market is worth $0.7 billion and growing.
- **Point to success stories.** Cities and counties across the country have launched successful polystyrene recycling programs. If they can do it, your community can too.
- **Rally your neighbors.** The more voices asking for the same thing, the harder it is to ignore. Start a petition. Post on your neighborhood social media group. Get people talking about it.
- **Support existing programs.** If your area already has a polystyrene recycling option, USE IT. Nothing kills a recycling program faster than low participation rates. The best way to keep a program running (and expand it) is to show up.

## The Bottom Line

Look, I am not going to pretend polystyrene recycling is as easy as tossing a can in the blue bin. It takes a little more effort. But that effort matters. Every piece of polystyrene you recycle is one less piece sitting in a landfill for 500 years or floating in the ocean as microplastic.

These five steps are not revolutionary. They are not complicated. They are just practical things that real people can do in their real lives starting right now.

So rinse that cup. Find a drop-off. Break down that packaging. And maybe, just maybe, send an email to your city council while you are at it.

The recycling infrastructure gets better every time someone participates. Be that someone.

*Now go recycle something.*`,
  },
  {
    slug: "polystyrene-bans-good-bad-complicated",
    title: "Polystyrene Bans: The Good, The Bad, and The Complicated",
    excerpt:
      "Over a dozen states have banned polystyrene food containers. But are bans actually solving the problem, or are they making things worse?",
    date: "2025-09-20",
    readingTime: 6,
    category: "Policy",
    author: "@PolystyreneGuy",
    tags: ["policy", "bans", "legislation", "environment", "business"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200",
    imageAlt: "Government building representing policy and legislation",
    content: `If you have been following the polystyrene conversation at all, you have probably noticed that bans are everywhere. Maryland did it first in 2020. Then Oregon. Then Vermont, New York, New Jersey, Colorado, and more. As of 2025, over a dozen US states have enacted some form of polystyrene ban or restriction.

And I have thoughts. Lots of them. Because this issue is way more nuanced than most people realize. So let me break it down honestly: the good, the bad, and the genuinely complicated parts of polystyrene bans.

## The Good: Why Bans Appeal to People

Let me start by being fair. I understand why bans are popular. The arguments in favor are straightforward and emotionally compelling.

**Bans reduce litter immediately.** When a city stops using EPS food containers, those containers stop showing up in parks, streets, and waterways. The effect is visible and quick. For communities struggling with foam litter, this is a real, tangible improvement.

**Bans force innovation.** When businesses cannot use polystyrene, they have to find alternatives. This pushes the market toward new materials and designs. Some of those alternatives are genuinely better for certain applications.

**Bans send a signal.** Even if the direct environmental impact is modest, bans communicate that a community takes waste seriously. They can shift cultural attitudes and make people more conscious about single-use materials in general.

**Bans are easy to understand.** "We banned Styrofoam" is a simple message that anyone can grasp. Compare that to "We implemented an extended producer responsibility framework with recycled content mandates and infrastructure investment incentives." Which one fits on a bumper sticker?

## The Bad: Where Bans Fall Short

Here is where I start to push back, and I think this is where the conversation gets important.

**The alternatives are not always better.** This is the dirty secret of polystyrene bans. When restaurants switch from EPS containers to paper or molded fiber alternatives, the environmental math does not always work out the way you would expect. Paper cups require trees, bleaching chemicals, and significantly more energy and water to manufacture. Many paper containers are lined with plastic coatings that make them difficult to recycle. Compostable containers frequently end up in landfills where they do not break down as intended because they need specific industrial composting conditions. A lifecycle analysis by the Danish Environmental Protection Agency found that an EPS cup needs to be reused just once to have a lower environmental impact than a paper cup used the same number of times.

**Bans hit small businesses hard.** A large fast-food chain can absorb the cost of switching to alternative containers. A family-owned taqueria operating on thin margins? That switch can cost thousands of dollars annually. Alternative containers typically cost 2 to 5 times more than EPS equivalents. For small food businesses, that is a real financial burden that gets passed on to customers or absorbed as lower profits.

**Bans remove the incentive to build recycling infrastructure.** This one is counterintuitive, but important. When you ban a material, you eliminate the economic case for investing in recycling facilities for that material. Why would a company build a polystyrene recycling plant in a state that has banned the product? Bans and recycling infrastructure work against each other.

**Bans do not address the root problem.** Polystyrene litter is a waste management failure, not a material failure. The material itself is 100% recyclable. The problem is that we have not built adequate collection and processing infrastructure. Banning the material is like banning cars because roads have potholes. Fix the roads.

## The Complicated: The Gray Area Nobody Talks About

Now here is where it gets really interesting. Some aspects of the polystyrene ban debate do not fit neatly into "good" or "bad."

**The patchwork problem.** When individual states and cities pass their own bans, it creates a confusing patchwork of regulations. A food distributor operating across state lines has to manage different packaging requirements for different jurisdictions. A restaurant chain with locations in banned and non-banned areas needs multiple supply chains. This complexity adds cost and waste to the system.

**Timing matters.** Five years ago, the recycling infrastructure for polystyrene was genuinely inadequate, and bans seemed like the only practical option. Today, chemical recycling can produce food-grade polystyrene from waste at commercial scale. Compaction technology makes collection economically viable. The calculus has changed, but many bans were written before these technologies matured.

**Not all polystyrene is equal.** Most bans target EPS food service containers, which makes sense since those are the items most likely to become litter. But some bans sweep more broadly, covering packaging, coolers, and other applications where polystyrene has clear functional advantages and where alternatives may actually be worse for the environment.

**Environmental justice dimensions.** Polystyrene bans disproportionately affect food businesses in lower-income communities, where the cost of alternative containers hits harder and where customers are more price-sensitive. At the same time, these same communities often bear the brunt of polystyrene litter. The equity implications cut both ways.

## What I Think Should Happen Instead

I am not going to pretend I am neutral on this. I think the better path is investing in recycling infrastructure rather than banning a recyclable material. Here is what that looks like.

**Expand collection access.** Only 32% of Americans currently have access to polystyrene recycling programs. That number needs to be 100%. Fund more drop-off locations, mobile collection events, and eventually curbside pickup.

**Invest in processing capacity.** Build more compaction facilities, mechanical recycling plants, and chemical recycling operations. The technology is proven. It just needs scale.

**Create demand for recycled content.** Instead of banning polystyrene, require that polystyrene products contain a minimum percentage of recycled content. This creates a market pull that drives recycling investment.

**Fund public education.** Most people do not know that polystyrene is recyclable, or how to prepare it for recycling. Education campaigns can dramatically increase participation in existing programs.

**Hold producers responsible.** Extended producer responsibility (EPR) programs make manufacturers responsible for the end-of-life management of their products. This creates a financial incentive for companies to design for recyclability and fund collection infrastructure.

## The Bottom Line

Polystyrene bans are popular, politically easy, and emotionally satisfying. But they are a blunt instrument for a nuanced problem. They create their own set of unintended consequences, from higher costs for small businesses to perverse incentives that undermine recycling infrastructure.

The material is not the villain here. Inadequate waste management is. And banning a recyclable material is a strange way to solve a recycling problem.

I would rather see us build the infrastructure to recycle polystyrene than ban it and pretend the problem is solved. Because the alternative materials are not magic. They have their own environmental costs. And switching from one imperfect material to another imperfect material is not progress. It is just a lateral move.

*Real progress is building systems that handle materials responsibly. Let us focus on that.*`,
  },
  {
    slug: "chemical-recycling-future-of-polystyrene",
    title: "Chemical Recycling: The Future of Polystyrene is Here",
    excerpt:
      "Chemical recycling is not some far-off dream. It is happening right now, and it is about to change everything about how we handle polystyrene waste.",
    date: "2025-09-05",
    readingTime: 6,
    category: "Innovation",
    author: "@PolystyreneGuy",
    tags: ["chemical recycling", "pyrolysis", "depolymerization", "innovation", "technology"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200",
    imageAlt: "Advanced recycling technology and laboratory equipment",
    content: `I am going to tell you about something that genuinely excites me. Like, keeps-me-up-at-night-reading-research-papers excited. Chemical recycling is not just some futuristic concept that scientists talk about in academic journals. It is real, it is scaling, and it is fundamentally changing the game for polystyrene recycling.

Let me break it all down for you.

## First, the Problem With Traditional Recycling

Before we get into the cool stuff, let me explain why chemical recycling matters so much. Traditional mechanical recycling, the kind most people think of, involves physically processing polystyrene. You collect it, clean it, shred it, melt it, and reform it into pellets. Those pellets become new products like picture frames, crown molding, or park benches.

Mechanical recycling works, and it is important. But it has limitations.

- **Quality degrades over time.** Each time polystyrene is mechanically recycled, the polymer chains get a little shorter and the material gets a little weaker. After several cycles, the quality drops enough that the material can only be used for lower-value products.
- **Contamination is a dealbreaker.** Food residue, labels, adhesives, and other contaminants can ruin an entire batch of mechanically recycled polystyrene. The feedstock has to be relatively clean.
- **No food-grade output.** Until recently, mechanically recycled polystyrene could never go back into food packaging because contaminants from the first use could not be fully removed.

Chemical recycling solves all three of these problems. And that is a big deal.

## How Chemical Recycling Actually Works

There are two main approaches, and both are fascinating in different ways.

### Pyrolysis: Breaking It Down With Heat

Pyrolysis is the more commercially mature method. Here is the process in plain English.

You take polystyrene waste and load it into a sealed reactor, basically a high-tech oven. Then you heat it to between 400 and 500 degrees Celsius. The critical detail is that there is no oxygen in the reactor. Without oxygen, the material cannot burn. Instead, the heat breaks the long polymer chains apart into shorter hydrocarbon molecules.

These molecules rise as vapor, get collected, and condense into a liquid called styrene oil. This oil can be used directly as a fuel (similar to diesel), or it can be further refined into chemical feedstocks for manufacturing.

The conversion rates are impressive. Modern pyrolysis systems can convert up to 90% of the input polystyrene into useful output. And here is the best part: pyrolysis can handle contaminated material that mechanical recycling would reject. That greasy takeout container? Pyrolysis can process it. Mixed polystyrene waste with labels and adhesives? No problem.

Companies like Agilyx have been operating commercial-scale pyrolysis facilities for years, processing thousands of tons of polystyrene waste annually. This is not lab-scale experimentation. It is industrial reality.

### Depolymerization: Rewinding the Clock

Depolymerization is the more elegant approach, and in my opinion, the more exciting one. Instead of just breaking polystyrene into generic hydrocarbons, depolymerization breaks it all the way back to its original building block: **styrene monomer.**

Think about what that means. You are essentially rewinding the manufacturing process. You take a used polystyrene cup and convert it back into the exact same molecule that was used to make the cup in the first place. Then you can re-polymerize that monomer into brand new polystyrene that is chemically identical to virgin material.

The process uses carefully controlled heat and specialized catalysts to "unzip" the polymer chains link by link. The recovered styrene monomer is then purified through distillation until it reaches extraordinary purity levels, measured in parts per billion.

This is how food-grade recycled polystyrene was finally achieved. Companies like Styrenyx developed depolymerization processes that produce styrene monomer pure enough to meet FDA food-contact standards. A cup becomes a cup becomes a cup, infinitely. True circular recycling.

## Why This Changes Everything

Let me count the ways.

**1. Infinite recyclability.** Unlike mechanical recycling, where quality degrades over time, chemical recycling produces virgin-quality output every single cycle. There is no limit to how many times the material can go around.

**2. Contamination tolerance.** Chemical recycling can handle dirty, mixed, and contaminated polystyrene that would be rejected by mechanical processes. This dramatically expands the amount of material that can actually be recycled.

**3. Food-grade output.** Depolymerization produces polystyrene pure enough for food packaging. This is the holy grail of recycling because it means the material can return to its highest-value application.

**4. Economic viability.** Recovered styrene monomer sells for $1,000 to $1,500 per ton, comparable to virgin styrene prices. The output is genuinely valuable, which makes the business case work.

**5. Carbon reduction.** Using recycled styrene monomer instead of petroleum-derived feedstock significantly reduces the carbon footprint of polystyrene production. Estimates suggest a 50-70% reduction in greenhouse gas emissions.

## Who is Leading the Charge?

Several companies are at the forefront of this revolution.

**Agilyx** operates one of the most established pyrolysis operations for polystyrene, with commercial facilities processing thousands of tons annually. They have partnerships with major chemical companies to scale their technology further.

**Styrenyx** (formerly Polystyvert) has developed a proprietary depolymerization process that achieves food-grade styrene monomer recovery. Their technology represents the cutting edge of circular polystyrene recycling.

**GreenMantra Technologies** takes a different angle with catalytic upcycling, using specialized catalysts to convert polystyrene waste into specialty waxes, lubricants, and other high-value chemicals worth more than the original material.

**INEOS Styrolution**, one of the world's largest polystyrene producers, has invested heavily in chemical recycling partnerships and has committed to incorporating recycled content into their production.

Major petrochemical companies are also entering the space, bringing the capital and engineering expertise needed to build large-scale facilities. When companies that produce millions of tons of virgin polystyrene start investing in recycling technology, you know the shift is real.

## What This Means for You

As a consumer, chemical recycling changes the value proposition of your polystyrene waste. That cup you are about to throw away? It is not trash. It is feedstock. It contains valuable styrene molecules that can be recovered and reused infinitely.

Here is what you can do:

- **Keep recycling your polystyrene.** The more material that enters the recycling stream, the more feedstock is available for chemical recycling facilities. Your participation matters.
- **Support companies using recycled content.** As more manufacturers incorporate chemically recycled polystyrene into their products, vote with your wallet by choosing those products.
- **Spread the word.** Most people have no idea that chemical recycling exists or that polystyrene can be recycled back into food-grade material. Share this knowledge.

## The Road Ahead

Chemical recycling is not a silver bullet. The facilities are expensive to build, they require significant energy input, and the industry needs more feedstock to reach optimal scale. But the trajectory is clear. The technology works. The economics are improving. The investment is flowing.

Within the next decade, I believe chemical recycling will transform polystyrene from one of the most criticized plastics into one of the most circular materials in our economy. The building blocks are all there. We just need to keep building.

*The future of polystyrene is not the landfill. It is the loop.*`,
  },
  {
    slug: "environmental-truth-about-polystyrene",
    title: "The Environmental Truth About Polystyrene (It's Not What You Think)",
    excerpt:
      "Everything you thought you knew about polystyrene and the environment is probably wrong. Let me show you the actual data.",
    date: "2025-08-18",
    readingTime: 6,
    category: "Environment",
    author: "@PolystyreneGuy",
    tags: ["environment", "lifecycle analysis", "misconceptions", "alternatives", "data"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
    imageAlt: "Green forest representing environmental considerations",
    content: `I need to have an honest conversation with you about polystyrene and the environment. Because there is a story that most people believe, and then there is what the data actually shows. And those two things are not the same.

The popular narrative goes something like this: polystyrene is an environmental disaster, it is terrible for the planet, we should ban it everywhere and switch to paper or compostable alternatives. Simple, right? Feels good, sounds right, and is supported by a general vibe that foam equals bad.

But I deal in facts, not vibes. And the facts are more interesting (and more complicated) than the bumper sticker version.

## Misconception 1: Polystyrene Has the Worst Environmental Footprint

This is the big one, and it is the most wrong. When you look at actual lifecycle analyses (LCAs), which measure the total environmental impact of a product from raw material extraction through manufacturing, use, and disposal, polystyrene frequently outperforms its alternatives.

Let me give you some specific comparisons.

**Polystyrene vs. Paper Cups:**
- Paper cups require 2 to 3 times more energy to manufacture than EPS cups.
- Paper cup production uses significantly more water, largely because trees need to be pulped and the pulp needs to be processed.
- Paper cups are heavier, meaning higher transportation emissions per unit.
- Most paper cups have a thin plastic (polyethylene) lining that makes them difficult or impossible to recycle in standard paper recycling streams.
- A study by the Danish Environmental Protection Agency found that a paper cup needs to be used multiple times to match the environmental performance of a single-use EPS cup.

**Polystyrene vs. PLA (Compostable Plastic):**
- PLA, the plant-based "compostable" plastic that many businesses switched to after polystyrene bans, requires industrial composting facilities operating at 140 degrees Fahrenheit or higher to actually break down.
- When PLA ends up in a regular landfill (which is where most of it goes), it behaves essentially like conventional plastic and does not decompose.
- PLA production requires significant agricultural inputs, including land, water, fertilizer, and pesticides for the corn or sugarcane feedstock.
- PLA cannot currently be recycled at scale through existing infrastructure.

**Polystyrene vs. Molded Fiber:**
- Molded fiber (the pressed paper-pulp containers) requires roughly twice the energy to produce as equivalent EPS containers.
- The manufacturing process uses large quantities of water and generates wastewater that needs treatment.
- Molded fiber is heavier than EPS, increasing shipping weight and fuel consumption.

None of this means polystyrene is perfect. It means the comparison is more nuanced than "foam bad, paper good."

## Misconception 2: Polystyrene Manufacturing is Uniquely Harmful

Polystyrene manufacturing does use petroleum as a feedstock and does consume energy. But compared to alternative materials, the manufacturing impact is actually quite moderate.

EPS manufacturing uses up to 80% less water than equivalent paper packaging production. The expansion process that creates EPS foam is relatively energy-efficient because you are essentially using steam to puff up small beads into a material that is 95% air. You are getting a lot of product from very little raw material.

The total energy embedded in an EPS cup is roughly 50% of the energy embedded in a paper cup of the same size. For food containers, the difference can be even larger.

## Misconception 3: Polystyrene is the Biggest Plastic Pollution Problem

Polystyrene gets a disproportionate share of public attention when it comes to plastic pollution, but it is not the largest contributor to the problem. Polyethylene (the plastic used in bags, films, and bottles) and polypropylene (used in food containers and automotive parts) together make up a much larger share of plastic pollution globally.

Polystyrene accounts for roughly 5% of global plastic production. It is visible and recognizable when it becomes litter, which is partly why it gets so much attention. But the visibility of the problem should not be confused with the scale of the problem.

## The REAL Problem: Littering and Waste Management

Here is what I want everyone to understand: **the environmental problem with polystyrene is not the material itself. It is how we manage it at end of life.**

When polystyrene is properly recycled, it has one of the lowest environmental footprints of any packaging material. The manufacturing is efficient. The material is lightweight, reducing transportation emissions. And it can be recycled infinitely through chemical processes.

The environmental damage happens when polystyrene escapes the waste stream. When it becomes litter. When it fragments into microplastics. When it sits in a landfill for centuries instead of being recycled. These are waste management failures, not material failures.

Consider this comparison: aluminum cans are universally praised as a recycling success story. But if we dumped 80% of aluminum cans into landfills and let them litter our streets and waterways, aluminum would have an environmental PR problem too. The material did not change. The system around it did.

## What the Data Actually Tells Us

When researchers compare materials on a level playing field, accounting for manufacturing, transportation, use, and end-of-life management, here is what they consistently find:

- **EPS foam has a lower carbon footprint than paper alternatives** for equivalent food service applications.
- **EPS manufacturing uses less water and energy** than paper or molded fiber manufacturing.
- **EPS is lighter than all common alternatives**, resulting in lower transportation emissions.
- **EPS is the only common food service material that can be chemically recycled back to food-grade quality** through depolymerization.
- **The primary environmental liability of EPS is litter and improper disposal**, which are problems of infrastructure and behavior, not material chemistry.

## What Should Actually Happen

Instead of demonizing polystyrene based on vibes and replacing it with alternatives that often have worse lifecycle impacts, here is what would actually help the environment:

**1. Build recycling infrastructure.** Expand polystyrene recycling access from 32% to 100% of the population. Fund drop-off locations, collection programs, and processing facilities.

**2. Invest in chemical recycling.** Scale up pyrolysis and depolymerization to capture polystyrene waste that mechanical recycling cannot handle.

**3. Tackle littering directly.** Enforce existing litter laws. Improve public waste bin availability. Fund community cleanup programs. Address the behavior, not the material.

**4. Demand honest lifecycle comparisons.** Before switching from polystyrene to any alternative, require a full lifecycle analysis that accounts for manufacturing, transportation, use, and actual (not theoretical) end-of-life outcomes.

**5. Support extended producer responsibility.** Make manufacturers financially responsible for the end-of-life management of their products. This creates the right incentives without banning materials.

## The Bottom Line

I am not here to tell you that polystyrene is perfect. No material is. But I am here to tell you that the popular narrative about polystyrene being uniquely terrible for the environment does not hold up when you look at the data.

The real environmental story is about systems, not materials. Give polystyrene proper recycling infrastructure, and it performs as well or better than its alternatives on almost every environmental metric.

The enemy is not foam. The enemy is a broken waste management system. Let us fix the system instead of shooting the messenger.

*Facts over vibes. Always.*`,
  },
  {
    slug: "how-one-ton-recycled-polystyrene-saves-the-planet",
    title: "How One Ton of Recycled Polystyrene Saves the Planet",
    excerpt:
      "The numbers are staggering. Here is exactly what happens when we recycle one ton of polystyrene instead of trashing it.",
    date: "2025-08-01",
    readingTime: 5,
    category: "Impact",
    author: "@PolystyreneGuy",
    tags: ["impact", "environment", "savings", "data", "recycling"],
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200",
    imageAlt: "Beautiful natural landscape representing environmental impact",
    content: `Numbers can be abstract. "We saved 2.3 tons of CO2" does not hit the same way as "we took 5 cars off the road for a year." So today I want to make the impact of polystyrene recycling feel real. Tangible. Something you can picture.

Let me walk you through exactly what happens when we recycle one single ton of polystyrene instead of sending it to a landfill. And I am going to translate every number into something you can actually visualize.

## The Energy Savings

Recycling one ton of polystyrene saves approximately **88% of the energy** that would be required to produce the same amount of polystyrene from virgin petroleum feedstock.

In real numbers, that is roughly **23,000 kilowatt-hours of electricity saved.**

What does 23,000 kWh look like?

- That is enough electricity to power an average American home for **about 2 years.**
- It is the equivalent of keeping your refrigerator running for **over 20 years.**
- It could charge an electric vehicle for roughly **80,000 miles of driving.**
- It is the energy produced by burning about **7 tons of coal.**

Every ton of polystyrene that goes into a recycling facility instead of a landfill saves enough energy to keep the lights on in your house for two full years. Let that sink in.

## The Carbon Reduction

Recycling one ton of polystyrene prevents approximately **2.3 tons of carbon dioxide emissions** compared to virgin production.

What does 2.3 tons of CO2 look like?

- That is the equivalent of driving an average car for roughly **5,700 miles**, or from New York City to Los Angeles and back.
- It is the CO2 absorbed by approximately **38 mature trees over the course of a year.**
- It equals the emissions from burning about **250 gallons of gasoline.**
- It is roughly the annual carbon footprint of one person's home electricity use.

Every ton recycled is like planting 38 trees. Or taking a car off the road for half a year.

## The Water Conservation

Manufacturing polystyrene from raw petroleum requires water at multiple stages of the process, from refining crude oil to cooling reactors to processing the final product. Recycling drastically reduces water consumption because you are skipping the resource extraction and primary processing steps.

Recycling one ton of polystyrene conserves an estimated **7,000 to 10,000 gallons of water** compared to virgin production.

What does that look like?

- It is enough water to fill a residential swimming pool.
- It is the amount of water an average person drinks over the course of **10 to 14 years.**
- It is approximately **170 full bathtubs.**
- It could supply a household's water needs for about **2 months.**

## The Landfill Space

Here is where polystyrene recycling really shines, because this material takes up an absurd amount of landfill space relative to its weight.

Remember, EPS is 95% air. One ton of uncompacted EPS foam takes up roughly **400 to 500 cubic yards of landfill space.** That is the volume of about **2 to 3 standard shipping containers.**

Now, polystyrene does not biodegrade. It will sit in that landfill for over 500 years, slowly fragmenting into microplastics that can leach into groundwater and surrounding soil. Every ton diverted from the landfill is 500 cubic yards of space saved, permanently.

And with modern compaction technology, that same ton of EPS can be compressed down to just **8 to 10 cubic yards**, a volume small enough to fit on a single pallet. The compacted material is then worth $200 to $400 per ton to recycling processors.

## The Petroleum Savings

Polystyrene is made from petroleum. Recycling one ton of polystyrene conserves approximately **1.5 to 2 barrels of crude oil** that would otherwise need to be extracted, refined, and processed into styrene monomer.

That is oil that stays in the ground. Resources that are not consumed. Drilling, transportation, and refining impacts that are completely avoided.

## The Microplastic Prevention

This is the one that keeps me up at night. Every ton of polystyrene that goes to a landfill or becomes litter will eventually fragment into billions of microplastic particles. These particles are smaller than 5 millimeters and are virtually impossible to clean up once dispersed into the environment.

Microplastics from polystyrene have been found in:

- Ocean water on every continent
- Freshwater lakes and rivers
- Agricultural soil
- The digestive systems of marine animals
- Human blood samples

One ton of polystyrene that is recycled instead of landfilled or littered means **billions of microplastic particles that never enter the ecosystem.** You cannot put a simple number on this, but the impact is enormous.

## Scaling Up: What if We Recycled ALL of It?

Currently, the United States generates approximately **2.5 million tons** of polystyrene waste per year. Of that, roughly 5% gets recycled.

If we recycled 100% of it, here is what the annual impact would look like:

- **Energy saved:** 57.5 billion kWh, enough to power 5 million homes for a year
- **CO2 prevented:** 5.75 million tons, equivalent to taking 1.25 million cars off the road
- **Water conserved:** 17.5 to 25 billion gallons
- **Landfill space saved:** 1 to 1.25 billion cubic yards
- **Petroleum conserved:** 3.75 to 5 million barrels of crude oil

Those numbers are staggering. And they are achievable. The technology exists. The economics are improving. What is missing is infrastructure and participation.

## What Your Individual Impact Looks Like

The average American generates about 2 to 3 pounds of polystyrene waste per year from food packaging and consumer products alone.

If you recycled all of your personal polystyrene waste for 10 years, you would:

- Save enough energy to run your microwave for about 6 months
- Prevent about 5 pounds of CO2 emissions
- Keep approximately 50 cubic feet of material out of landfills
- Prevent millions of potential microplastic particles from entering the environment

On its own, those numbers seem small. But multiply them by 330 million Americans, and the impact is transformative.

## The Math is Clear

Every single ton matters. Every cup matters. Every packaging insert matters. The environmental savings from polystyrene recycling are real, measurable, and significant.

We do not need a breakthrough technology. We do not need a miracle material. We just need to recycle the polystyrene we already have instead of burying it or letting it blow into the ocean.

One ton at a time. One cup at a time. The math adds up.

*Start with your next cup.*`,
  },
  {
    slug: "complete-guide-polystyrene-types-eps-xps-gpps-hips",
    title: "Your Complete Guide to Polystyrene Types: EPS vs XPS vs GPPS vs HIPS",
    excerpt:
      "Not all polystyrene is created equal. Here is your guide to the four main types, what they are used for, and how to recycle each one.",
    date: "2025-07-15",
    readingTime: 7,
    category: "Education",
    author: "@PolystyreneGuy",
    tags: ["EPS", "XPS", "GPPS", "HIPS", "types", "education", "guide"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200",
    imageAlt: "Different types of polystyrene materials and products",
    content: `One of the most common questions I get is: "Is this polystyrene?" And my answer is usually: "Which kind?" Because here is the thing most people do not realize. Polystyrene is not just one material. It is a family of materials, and the different members of that family look, feel, and behave in completely different ways.

Understanding the four main types of polystyrene is not just nerdy trivia (although it IS great nerdy trivia). It is genuinely useful knowledge that will help you identify what you are holding, figure out if it can be recycled in your area, and understand why certain polystyrene products behave the way they do.

Let me introduce you to the family.

## EPS: Expanded Polystyrene

**What it is:** EPS is the polystyrene type that most people picture when they hear the word. It is the white, lightweight, beaded foam that makes up coffee cups, takeout containers, packaging peanuts, protective packaging inserts, coolers, and ice chests.

**How it is made:** Small polystyrene beads are infused with a blowing agent (usually pentane gas) and then steamed. The heat causes the beads to expand to 40-50 times their original volume. The expanded beads are then placed in a mold and steamed again, which causes them to fuse together into a solid piece of foam.

**Key characteristics:**
- Roughly 95-98% air by volume, making it incredibly lightweight
- White, with a visible beaded structure (you can see the individual fused beads)
- Excellent thermal insulation, keeps hot things hot and cold things cold
- Brittle, breaks apart into individual beads when snapped
- Floats on water
- Very poor UV resistance, degrades in sunlight over time

**Common uses:**
- Disposable coffee cups and drink containers
- Takeout food containers and clamshells
- Packaging peanuts (the loose-fill kind)
- Protective inserts for electronics, appliances, and fragile goods
- Foam coolers and ice chests
- Seedling trays for gardening
- Insulated shipping containers for food and medicine

**How to identify it:** Look for white, lightweight foam with a visible beaded texture. Check the bottom for the #6 recycling symbol. When you break it, it snaps into individual beads rather than tearing cleanly.

**Recycling difficulty: Moderate.** EPS is widely recyclable through both mechanical (compaction, extrusion) and chemical (pyrolysis, depolymerization) processes. The main challenge is its bulk. Because it is 95% air, it takes up enormous space relative to its weight, making collection and transportation expensive. Compaction technology solves this by reducing volume 50:1. Most dedicated polystyrene recycling programs accept EPS. It just usually cannot go in your curbside bin because it jams sorting equipment.

## XPS: Extruded Polystyrene

**What it is:** XPS is the denser, colored foam board used primarily in construction for insulation. This is the material that the brand name "Styrofoam" actually refers to. If you have ever seen blue, pink, or green rigid foam boards at a construction site or home improvement store, that is XPS.

**How it is made:** Unlike EPS, which uses pre-expanded beads, XPS is made by melting polystyrene resin and mixing it with a blowing agent, then forcing (extruding) it through a die. This creates a continuous sheet of foam with a uniform, closed-cell structure. The extrusion process produces a denser, more consistent product than the bead-fusion process used for EPS.

**Key characteristics:**
- Denser and heavier than EPS (but still lightweight compared to most materials)
- Smooth, uniform texture without visible beads
- Colored by manufacturer: Dow's Styrofoam is blue, Owens Corning's Foamular is pink, Kingspan's GreenGuard is green
- Higher compressive strength than EPS
- Better moisture resistance with its closed-cell structure
- Better UV resistance than EPS (but still degrades in prolonged sunlight)
- Excellent thermal insulation, often rated at R-5 per inch

**Common uses:**
- Building foundation insulation
- Roofing insulation boards
- Basement and crawl space insulation
- Cold storage facility insulation
- Craft and hobby projects
- Architectural models
- Highway and bridge construction (as lightweight fill material)
- Structural insulated panels

**How to identify it:** Look for colored (blue, pink, or green) rigid foam boards with a smooth, uniform texture. XPS will feel denser and more rigid than EPS. It does not have the beaded structure of EPS and tears rather than snapping into beads.

**Recycling difficulty: Difficult.** XPS is technically recyclable, but finding facilities that accept it is harder than for EPS. Construction and demolition recycling facilities are the most likely options. Because XPS is primarily used in construction, it tends to come in large pieces from renovation or demolition projects rather than everyday consumer waste. Some XPS contains flame retardants that complicate recycling. If you have XPS waste from a construction project, contact your local C&D recycling facility to ask about acceptance.

## GPPS: General Purpose Polystyrene

**What it is:** GPPS is the clear, rigid, glass-like form of polystyrene. If EPS is the foam and XPS is the board, GPPS is the transparent hard plastic. You have definitely encountered it, but you probably did not realize it was polystyrene.

**How it is made:** GPPS is produced by standard polymerization of styrene monomer without any blowing agents or impact modifiers. The result is a transparent, amorphous thermoplastic that is easy to mold and relatively inexpensive to produce.

**Key characteristics:**
- Crystal clear transparency (like glass)
- Rigid and brittle, shatters rather than bending
- Smooth, glossy surface
- Good dimensional stability
- Low moisture absorption
- Excellent for optical clarity applications
- Relatively easy to machine, cut, and fabricate
- Lower impact resistance than HIPS (breaks easily if dropped)

**Common uses:**
- Clear food containers and clamshells (deli containers, bakery packaging)
- Laboratory petri dishes and disposable labware
- CD and DVD cases (the jewel cases)
- Disposable cutlery (the clear, rigid forks and knives)
- Medical diagnostic equipment
- Optical lenses and light diffusers
- Display cases and packaging windows
- Smoke detector housings

**How to identify it:** Look for clear, rigid, glass-like plastic that is relatively brittle. Check for the #6 recycling symbol. GPPS items tend to crack or shatter rather than flex when stressed. Tap it with your fingernail and it produces a bright, high-pitched sound, similar to glass.

**Recycling difficulty: Moderate.** GPPS is recyclable through standard mechanical recycling processes (grinding, melting, pelletizing). Because it is a solid plastic rather than a foam, it does not have the bulk and transportation challenges of EPS. However, GPPS is less commonly collected by dedicated recycling programs because the volume of GPPS in the consumer waste stream is smaller than EPS. When recycled, it is typically processed alongside other #6 plastics.

## HIPS: High Impact Polystyrene

**What it is:** HIPS is polystyrene that has been modified with rubber (polybutadiene) to make it tougher and more impact-resistant. Where GPPS shatters, HIPS flexes and absorbs impact. It is the workhorse polystyrene for durable applications.

**How it is made:** HIPS is produced by polymerizing styrene in the presence of dissolved polybutadiene rubber. The rubber particles become embedded throughout the polystyrene matrix, creating a material that absorbs impact energy instead of transmitting it as cracks. The rubber content typically ranges from 5% to 15% of the total material.

**Key characteristics:**
- Opaque (the rubber particles scatter light, so it is not transparent like GPPS)
- Significantly tougher than GPPS, resists cracking and breaking
- Good dimensional stability
- Easy to machine, thermoform, and print on
- Matte or semi-gloss surface finish
- Available in white or can be pigmented to any color
- Lower rigidity than GPPS but much better impact performance
- Good for vacuum forming and thermoforming applications

**Common uses:**
- Refrigerator liners (the white plastic interior of your fridge)
- Appliance housings (blenders, coffee makers, printers)
- Toys and game components
- Disposable razors
- Yogurt cups and dairy containers (some brands)
- Point-of-sale displays and signage
- Protective cases and housings
- Automotive interior trim pieces

**How to identify it:** Look for opaque, rigid plastic that is tougher than you would expect. HIPS flexes slightly before breaking rather than shattering like GPPS. It usually has a matte finish and is white or colored. Check for the #6 recycling symbol. If you tap it, it produces a duller, lower-pitched sound than GPPS.

**Recycling difficulty: Moderate to Difficult.** HIPS can be mechanically recycled, but the rubber content adds complexity. The rubber must be accounted for in the recycling process, as it affects the properties of the recycled material. Some recyclers prefer to keep HIPS separate from pure polystyrene streams. Chemical recycling through pyrolysis can handle HIPS effectively, as the process breaks down both the polystyrene and rubber components. Check with your local recycling programs for acceptance. Appliance recyclers are often the best outlet for HIPS waste from discarded appliances.

## Quick Reference: How to Tell Them Apart

Here is your at-a-glance identification guide:

| Feature | EPS | XPS | GPPS | HIPS |
|---------|-----|-----|------|------|
| **Appearance** | White, beaded foam | Colored foam board | Clear, rigid plastic | Opaque, tough plastic |
| **Weight** | Very light | Light | Medium | Medium |
| **Breaks how?** | Snaps into beads | Tears/crumbles | Shatters like glass | Flexes, then breaks |
| **Touch** | Rough, beaded | Smooth, firm | Smooth, glossy | Smooth, matte |
| **Sound** | Squeaky | Dull thud | High-pitched tap | Low-pitched tap |
| **Recycling** | Moderate | Difficult | Moderate | Moderate-Difficult |

## The Bottom Line

All four types of polystyrene share the #6 resin code and are technically recyclable. But they have different properties, different applications, and different recycling pathways. Knowing which type you are dealing with helps you make smarter recycling decisions and understand the material landscape better.

The more you know about what is in your hands, the better equipped you are to keep it out of the landfill. And that is what we are all here for, right?

*Now go flip something over and look for that #6.*`,
  },
];

// ===== MYTHS & FACTS =====

export const mythsFacts: MythFact[] = [
  {
    id: "not-recyclable",
    myth: "Polystyrene cannot be recycled",
    fact: "Polystyrene is 100% recyclable through both mechanical and chemical processes",
    explanation:
      "While it's true that most curbside programs don't accept polystyrene, it can absolutely be recycled. Specialized facilities use compaction, shredding, and chemical processes to break down EPS into reusable raw materials. The challenge is infrastructure and collection, not the material itself.",
    iconName: "Recycle",
  },
  {
    id: "curbside-ok",
    myth: "You can put polystyrene in your curbside recycling bin",
    fact: "Most curbside programs do NOT accept polystyrene, so it requires specialized drop-off locations",
    explanation:
      "Due to contamination issues and the material's lightweight nature, most municipal recycling programs exclude polystyrene. It can jam sorting equipment and contaminate other recyclables. Instead, look for dedicated EPS drop-off points at retailers, packaging stores, or specialized recycling centers.",
    iconName: "Trash2",
  },
  {
    id: "toxic",
    myth: "Recycling polystyrene releases dangerous toxins",
    fact: "Modern recycling facilities process polystyrene safely with proper emission controls",
    explanation:
      "While burning polystyrene can release harmful chemicals, proper recycling methods like mechanical compaction and chemical depolymerization are conducted in controlled environments with appropriate safety measures. Advanced pyrolysis systems include emission scrubbing technology.",
    iconName: "Shield",
  },
  {
    id: "no-food-grade",
    myth: "Recycled polystyrene can never be food-safe",
    fact: "Food-grade recycled polystyrene was achieved at commercial scale in 2025",
    explanation:
      "A major breakthrough in 2025 demonstrated that advanced depolymerization can produce polystyrene pure enough for FDA food-contact approval. This means recycled PS can now go back into food packaging, creating a true circular economy for the material.",
    iconName: "UtensilsCrossed",
  },
  {
    id: "biodegradable",
    myth: "Polystyrene eventually biodegrades in landfills",
    fact: "Polystyrene takes 500+ years to decompose and breaks into harmful microplastics",
    explanation:
      "Unlike organic materials, polystyrene doesn't truly biodegrade. Instead, it photodegrades, breaking into smaller and smaller pieces called microplastics over centuries. These microplastics contaminate soil, waterways, and enter the food chain, causing ongoing environmental harm.",
    iconName: "Clock",
  },
  {
    id: "too-expensive",
    myth: "It's too expensive to ever make polystyrene recycling viable",
    fact: "New compaction and chemical technologies are rapidly reducing recycling costs",
    explanation:
      "While small-scale recycling can cost $1,000+/ton at small scale compared to $30-50 for landfill disposal, innovations like on-site compaction (reducing volume by 50:1), improved collection logistics, and chemical recycling are dramatically improving the economics. Costs drop significantly with scale, and the $0.7B market is growing annually.",
    iconName: "DollarSign",
  },
  {
    id: "worse-than-paper",
    myth: "Polystyrene is always worse for the environment than paper alternatives",
    fact: "Life-cycle analyses show polystyrene can have lower energy and water footprints than paper",
    explanation:
      "While polystyrene has serious end-of-life issues, its production requires less energy and water than paper alternatives. Paper cups need trees, bleaching chemicals, and more energy to manufacture. The key issue is ensuring proper recycling infrastructure. When recycled, PS has significant environmental advantages.",
    iconName: "Scale",
  },
  {
    id: "all-same",
    myth: "All Styrofoam and polystyrene products are the same",
    fact: "There are distinct types (EPS and XPS) with different properties and recycling processes",
    explanation:
      "Expanded Polystyrene (EPS), the white beaded foam in packaging and cups, is different from Extruded Polystyrene (XPS), the colored, denser foam boards used in construction. They have different manufacturing processes, properties, and recycling requirements. 'Styrofoam' technically only refers to Dow's XPS brand.",
    iconName: "Layers",
  },
];

// ===== RECYCLING METHODS =====

export const recyclingMethods: RecyclingMethod[] = [
  {
    id: "compaction",
    name: "Compaction & Densification",
    category: "mechanical",
    description:
      "Polystyrene is compressed using hydraulic or screw-type compactors to reduce volume by up to 50:1, creating dense logs or blocks for efficient transport and reprocessing.",
    steps: [
      "Collection and sorting of clean EPS",
      "Feeding into compactor or densifier machine",
      "Compression at high pressure (no heat) or thermal densification",
      "Output: dense blocks or logs at 1/50th original volume",
      "Transport to reprocessing facility",
      "Pelletizing for manufacturing new products",
    ],
    pros: [
      "Reduces volume dramatically (50:1 ratio)",
      "Relatively low energy consumption",
      "Simple technology, easy to operate",
      "Densified material has market value",
      "Can be done on-site at large facilities",
    ],
    cons: [
      "Requires clean, uncontaminated feedstock",
      "Initial equipment investment ($15K-$50K)",
      "Cannot handle food-contaminated material",
      "Limited to EPS foam types",
      "Densified material still needs further processing",
    ],
    iconName: "Minimize2",
  },
  {
    id: "shredding-extrusion",
    name: "Shredding & Extrusion",
    category: "mechanical",
    description:
      "Polystyrene is shredded into small pieces, melted, and extruded into pellets that can be used as raw material for new products like picture frames, crown molding, and park benches.",
    steps: [
      "Collection and contaminant removal",
      "Shredding into small flakes",
      "Washing and drying of shredded material",
      "Melting in extruder at 200-230\u00B0C",
      "Filtering out remaining impurities",
      "Pelletizing into uniform granules",
      "Quality testing for reuse applications",
    ],
    pros: [
      "Produces high-quality recycled pellets",
      "Pellets can replace virgin PS in many products",
      "Well-established industrial process",
      "Can process large volumes continuously",
      "Multiple end-use applications",
    ],
    cons: [
      "High energy input for melting",
      "Some material degradation each cycle",
      "Cannot produce food-grade output (until recently)",
      "Requires pre-sorting and cleaning",
      "Equipment maintenance costs",
    ],
    iconName: "Cog",
  },
  {
    id: "solvent-recycling",
    name: "Solvent-Based Recycling",
    category: "mechanical",
    description:
      "Uses limonene (derived from orange peels) or other solvents to dissolve polystyrene, separating it from contaminants, then recovering clean polystyrene through evaporation.",
    steps: [
      "Dissolving PS waste in limonene solvent",
      "Contaminants settle out or are filtered",
      "Solvent evaporation recovers pure polystyrene",
      "Solvent is recaptured and reused (95%+ recovery)",
      "Clean PS is dried and pelletized",
      "Quality testing for purity",
    ],
    pros: [
      "Can handle contaminated material",
      "Produces very pure polystyrene",
      "Solvent is natural and non-toxic (limonene)",
      "High solvent recovery rate (95%+)",
      "Good for mixed PS waste streams",
    ],
    cons: [
      "Relatively new technology at scale",
      "Solvent costs and supply considerations",
      "Slower processing speed than extrusion",
      "Limited commercial operations currently",
      "Requires specialized equipment",
    ],
    iconName: "Droplets",
  },
  {
    id: "pyrolysis",
    name: "Pyrolysis",
    category: "chemical",
    description:
      "Polystyrene is heated to 400-500\u00B0C in the absence of oxygen, breaking it down into styrene oil and other hydrocarbon fuels that can be used as fuel or chemical feedstock.",
    steps: [
      "Pre-treatment and size reduction of PS waste",
      "Loading into oxygen-free pyrolysis reactor",
      "Heating to 400-500\u00B0C (thermal decomposition)",
      "Vapor collection and condensation",
      "Separation of styrene monomer from other hydrocarbons",
      "Purification of recovered styrene oil",
      "Testing and quality control",
    ],
    pros: [
      "Can process contaminated and mixed PS waste",
      "Produces valuable styrene oil",
      "High conversion rate (up to 90%)",
      "Reduces dependency on fossil feedstocks",
      "Handles materials other methods cannot",
    ],
    cons: [
      "High energy input required",
      "Capital-intensive facilities",
      "Emissions require careful management",
      "Complex process control needed",
      "Variable output quality",
    ],
    iconName: "Flame",
  },
  {
    id: "depolymerization",
    name: "Depolymerization",
    category: "chemical",
    description:
      "Advanced chemical process that breaks polystyrene back into its original styrene monomer, which can then be repolymerized into virgin-quality polystyrene, enabling true circular recycling.",
    steps: [
      "Cleaning and preparation of PS feedstock",
      "Catalytic or thermal depolymerization reaction",
      "Breaking polymer chains back to styrene monomer",
      "Purification of recovered styrene",
      "Quality verification (purity testing)",
      "Re-polymerization into new polystyrene",
      "FDA testing for food-grade applications",
    ],
    pros: [
      "Produces virgin-quality styrene monomer",
      "Enables true circular recycling",
      "Can achieve food-grade output",
      "Infinite recyclability potential",
      "Highest value recovery method",
    ],
    cons: [
      "Most expensive recycling method",
      "Requires high purity feedstock",
      "Energy intensive process",
      "Limited commercial scale currently",
      "Complex chemical engineering required",
    ],
    iconName: "Atom",
  },
  {
    id: "catalytic-upcycling",
    name: "Catalytic Upcycling",
    category: "chemical",
    description:
      "Uses specialized catalysts to convert polystyrene waste into higher-value chemicals and materials, potentially worth more than the original product.",
    steps: [
      "PS waste preparation and sizing",
      "Introduction of specialized catalysts",
      "Controlled reaction at moderate temperatures",
      "Breaking down into valuable chemical building blocks",
      "Separation and purification of products",
      "Catalyst recovery and reuse",
      "Product testing and certification",
    ],
    pros: [
      "Creates higher-value products than original",
      "Novel catalyst systems improve efficiency",
      "Can work with degraded/mixed waste",
      "Potential for carbon nanomaterials",
      "Growing research and investment",
    ],
    cons: [
      "Still largely in research/pilot phase",
      "Catalyst costs can be significant",
      "Scale-up challenges remain",
      "Limited commercial examples",
      "Process optimization ongoing",
    ],
    iconName: "Sparkles",
  },
];

// ===== POLYSTYRENE TYPES =====

export const polystyreneTypes: PolystyreneType[] = [
  {
    id: "eps",
    name: "EPS",
    fullName: "Expanded Polystyrene",
    description:
      "The familiar white, lightweight foam made of pre-expanded polystyrene beads fused together. Contains up to 98% air, making it extremely lightweight but bulky. Most commonly seen in disposable cups, food containers, and packaging peanuts.",
    characteristics: [
      "98% air by volume",
      "White, beaded appearance",
      "Very lightweight",
      "Good insulation properties",
      "Brittle and breaks into beads",
      "Resin identification code #6",
      "Floats on water",
      "Poor UV resistance",
    ],
    commonUses: [
      "Disposable coffee cups",
      "Food takeout containers",
      "Packaging peanuts",
      "Protective product packaging",
      "Coolers and ice chests",
      "Seedling trays",
      "Craft and hobby materials",
      "Insulated shipping containers",
    ],
    recyclingDifficulty: "moderate",
  },
  {
    id: "xps",
    name: "XPS",
    fullName: "Extruded Polystyrene",
    description:
      "A denser, more rigid foam produced through an extrusion process. Typically colored (blue, pink, or green depending on manufacturer). Primarily used in construction for insulation boards and structural applications.",
    characteristics: [
      "Denser than EPS",
      "Smooth, uniform cell structure",
      "Colored (blue/pink/green by brand)",
      "Higher compressive strength",
      "Better moisture resistance",
      "Excellent thermal insulation",
      "More UV resistant than EPS",
      "Closed-cell structure",
    ],
    commonUses: [
      "Building insulation boards",
      "Foundation waterproofing",
      "Roofing insulation",
      "Cold storage facilities",
      "Crafting and modeling",
      "Structural insulated panels",
      "Highway and bridge construction",
      "Geotechnical fill material",
    ],
    recyclingDifficulty: "difficult",
  },
];

// ===== ENVIRONMENTAL STATS =====

export const environmentalStats: EnvironmentalStat[] = [
  {
    id: "landfill-share",
    label: "Landfill Volume",
    value: "~25%",
    description:
      "Foam plastics including polystyrene take up significant landfill volume, representing untapped recycling potential that compaction technology can address by reducing volume 50:1.",
    iconName: "Trash2",
    color: "#EF4444",
  },
  {
    id: "decompose-time",
    label: "Decomposition Time",
    value: "500+ Years",
    description:
      "Polystyrene is extremely durable, lasting over 500 years, making it ideal for recycling into long-lasting products rather than landfilling.",
    iconName: "Clock",
    color: "#F59E0B",
  },
  {
    id: "daily-waste",
    label: "Daily Landfill Burial",
    value: "1,369 Tons",
    description:
      "Every day, 1,369 tons of recyclable polystyrene go to American landfills, representing a massive opportunity for expanded recycling programs.",
    iconName: "TrendingDown",
    color: "#EF4444",
  },
  {
    id: "co2-benefit",
    label: "CO\u2082 Saved per Ton Recycled",
    value: "2.3 Tons",
    description:
      "Recycling one ton of polystyrene prevents 2.3 tons of carbon dioxide emissions.",
    iconName: "Leaf",
    color: "#10B981",
  },
  {
    id: "ocean-debris",
    label: "Beach Debris Ranking",
    value: "#2 Most Common",
    description:
      "Polystyrene is commonly found during beach cleanups, underscoring why proper recycling infrastructure is the key to keeping it out of the environment.",
    iconName: "Waves",
    color: "#3B82F6",
  },
  {
    id: "marine-deaths",
    label: "Marine Animal Deaths",
    value: "100,000+/year",
    description:
      "Over 100,000 marine animals are affected by plastic pollution annually. Proper recycling infrastructure prevents polystyrene from ever reaching the ocean.",
    iconName: "Fish",
    color: "#EF4444",
  },
  {
    id: "energy-savings",
    label: "Energy Reduction",
    value: "88%",
    description:
      "Recycled polystyrene production uses 88% less energy than manufacturing from virgin materials.",
    iconName: "Zap",
    color: "#10B981",
  },
  {
    id: "recycling-access",
    label: "Population with Access",
    value: "32%",
    description:
      "Only about one-third of Americans currently have access to polystyrene recycling, showing the enormous growth opportunity for recycling infrastructure.",
    iconName: "Users",
    color: "#F59E0B",
  },
];

// ===== POLICY DATA =====

export const policyData: PolicyItem[] = [
  // ===== BANNED STATES =====
  {
    state: "Maine",
    abbreviation: "ME",
    description:
      "Banned EPS food containers statewide, with exemptions for raw meat and seafood trays.",
    year: 2021,
    type: "ban",
    banReason:
      "Concerns over marine pollution along Maine's coastline, where EPS fragments were among the most common litter items found during beach cleanups, threatening wildlife and the fishing industry.",
    unbanEfforts:
      "The EPS Industry Alliance has lobbied for chemical recycling exemptions, arguing that advanced recycling technologies can divert EPS from landfills. Industry groups have also funded pilot drop-off programs to demonstrate recyclability.",
  },
  {
    state: "Maryland",
    abbreviation: "MD",
    description:
      "First state to enact a statewide ban on EPS food service products, effective October 2020.",
    year: 2020,
    type: "ban",
    banReason:
      "Chesapeake Bay pollution was a primary driver, as EPS foam was identified as a leading pollutant in waterways feeding into the bay, harming aquatic ecosystems and contributing to persistent litter.",
    unbanEfforts:
      "Packaging manufacturers have challenged the ban through legislative lobbying, proposing amendments that would allow recycled-content EPS products. Industry-funded studies on chemical recycling viability have been presented to state legislators.",
  },
  {
    state: "Vermont",
    abbreviation: "VT",
    description:
      "Comprehensive ban on single-use EPS food containers as part of broader single-use plastics legislation.",
    year: 2021,
    type: "ban",
    banReason:
      "Environmental stewardship and landfill reduction goals drove the legislation, as EPS was identified as a non-recyclable material in most municipal waste streams, persisting in landfills for centuries.",
    unbanEfforts:
      "Industry advocates have pushed for recognition of emerging chemical recycling processes that could convert EPS back into styrene monomer, arguing the ban is premature given technological advances in polystyrene recycling.",
  },
  {
    state: "New York",
    abbreviation: "NY",
    description:
      "Banned EPS foam containers and loose-fill packaging peanuts statewide.",
    year: 2022,
    type: "ban",
    banReason:
      "Severe litter and sanitation issues in New York City, where EPS containers clogged storm drains, contaminated waterways, and were a persistent source of street litter that proved nearly impossible to clean up effectively.",
    unbanEfforts:
      "The Restaurant Action Alliance and packaging industry filed lawsuits challenging the ban, arguing EPS is recyclable and that the ban unfairly burdens small businesses. Industry groups continue to advocate for recycling infrastructure investment as an alternative to prohibition.",
  },
  {
    state: "New Jersey",
    abbreviation: "NJ",
    description:
      "Broad single-use plastics law including EPS food container ban alongside plastic bag restrictions.",
    year: 2022,
    type: "ban",
    banReason:
      "Shoreline pollution and coastal tourism impacts were key motivators, as EPS debris on New Jersey beaches posed environmental and economic threats to the state's significant beach tourism industry.",
    unbanEfforts:
      "Industry coalitions have lobbied for phased exemptions and promoted investment in EPS recycling infrastructure. Chemical recycling companies have proposed pilot facilities in the state as alternatives to outright bans.",
  },
  {
    state: "Colorado",
    abbreviation: "CO",
    description:
      "Phased ban on polystyrene food containers, with full implementation by 2024 for all food service.",
    year: 2024,
    type: "ban",
    banReason:
      "Landfill space concerns and mountain watershed protection drove the legislation, as lightweight EPS was frequently found in rivers and streams feeding into Colorado's reservoirs and recreational waterways.",
    unbanEfforts:
      "The Foodservice Packaging Institute has advocated for recycling-based alternatives and sought exemptions for facilities near certified EPS recycling centers. Industry groups have funded community recycling pilot programs to demonstrate EPS can be diverted from landfills.",
  },
  {
    state: "Washington",
    abbreviation: "WA",
    description:
      "Expanded existing restrictions to include all EPS food service ware and coolers by 2025.",
    year: 2025,
    type: "ban",
    banReason:
      "Protection of Puget Sound marine ecosystems was a central concern, as EPS microplastics were detected in salmon habitats and shellfish beds, threatening both wildlife and the state's commercial fishing industry.",
    unbanEfforts:
      "Recycling industry stakeholders have proposed amendments allowing EPS products made with recycled content. Lobbyists have also pushed for recognition of densification technology that compacts EPS for more efficient recycling and transport.",
  },
  {
    state: "Oregon",
    abbreviation: "OR",
    description:
      "Banned EPS food containers for restaurants and food vendors, with allowances for wholesale packaging.",
    year: 2020,
    type: "ban",
    banReason:
      "Pacific Ocean pollution and coastal ecosystem damage prompted the ban, with studies showing EPS as one of the top five debris items collected during Oregon coastal cleanups year after year.",
    unbanEfforts:
      "Industry groups have promoted mechanical recycling programs and lobbied for wholesale packaging exemptions to remain in place. The EPS Industry Alliance has also funded beach cleanup events to demonstrate corporate responsibility while arguing for recycling over bans.",
  },
  {
    state: "Rhode Island",
    abbreviation: "RI",
    description:
      "Banned single-use EPS food containers statewide as part of a comprehensive plastics reduction effort.",
    year: 2024,
    type: "ban",
    banReason:
      "Narragansett Bay water quality concerns and general litter reduction goals drove the legislation, as EPS fragments were a persistent contaminant in the bay's watershed and surrounding communities.",
    unbanEfforts:
      "Packaging manufacturers have lobbied for delayed implementation timelines and promoted industry-funded recycling collection programs as proof that EPS diversion is achievable without outright prohibition.",
  },
  {
    state: "Hawaii",
    abbreviation: "HI",
    description:
      "De facto ban through county-level ordinances covering all major islands and food service operations.",
    year: 2022,
    type: "ban",
    banReason:
      "Island ecosystems are especially vulnerable to plastic pollution, and EPS was identified as a top marine debris item washing up on Hawaiian beaches, threatening sea turtles, seabirds, and coral reef systems.",
    unbanEfforts:
      "Given the county-level structure of the bans, industry advocates have focused on individual county councils, proposing recycling pilot programs and seeking exemptions for specific EPS applications where alternatives are cost-prohibitive.",
  },
  {
    state: "Virginia",
    abbreviation: "VA",
    description:
      "Banned polystyrene food containers statewide, with the ban taking effect July 2023.",
    year: 2021,
    type: "ban",
    banReason:
      "Chesapeake Bay watershed protection and litter reduction in Virginia's waterways were primary motivators, as EPS was consistently found among the most prevalent debris items in tributary cleanups.",
    unbanEfforts:
      "Industry groups have advocated for amendments that would exempt EPS products with demonstrated recyclability. Lobbyists have also proposed chemical recycling facility investments in Virginia as a job-creating alternative to bans.",
  },
  {
    state: "Connecticut",
    abbreviation: "CT",
    description:
      "Banned EPS food service containers as part of broader packaging reduction legislation.",
    year: 2024,
    type: "ban",
    banReason:
      "Long Island Sound pollution and municipal waste reduction goals drove the legislation, as EPS was a significant contributor to litter in coastal towns and a persistent contaminant in the state's waste stream.",
    unbanEfforts:
      "The plastics industry has lobbied for extended producer responsibility frameworks that would fund EPS recycling rather than banning the material outright. Industry advocates have pointed to successful European EPS recycling programs as models.",
  },

  // ===== RESTRICTED STATES =====
  {
    state: "California",
    abbreviation: "CA",
    description:
      "Over 130 cities have local EPS ordinances. Statewide polystyrene reduction targets established under SB 54, requiring significant source reduction of single-use packaging by 2032.",
    year: 2023,
    type: "restriction",
  },
  {
    state: "Delaware",
    abbreviation: "DE",
    description:
      "Restricted EPS food containers in food service establishments, with a phase-in period granting small businesses additional time to transition to alternative materials.",
    year: 2022,
    type: "restriction",
  },
  {
    state: "Massachusetts",
    abbreviation: "MA",
    description:
      "Over 100 municipalities have enacted local EPS food container bans. No statewide ban exists yet, but multiple bills have been introduced in the state legislature seeking comprehensive polystyrene restrictions.",
    year: 0,
    type: "restriction",
  },
  {
    state: "Minnesota",
    abbreviation: "MN",
    description:
      "Minneapolis and St. Paul have enacted bans on polystyrene food containers. Statewide legislation has been proposed multiple times but has not yet passed, with ongoing debate between environmental groups and industry advocates.",
    year: 0,
    type: "restriction",
  },
  {
    state: "Illinois",
    abbreviation: "IL",
    description:
      "Chicago has banned EPS food containers within city limits. No statewide ban exists, but industry-supported recycling programs are active in several metropolitan areas, and legislative discussions continue.",
    year: 0,
    type: "restriction",
  },
  {
    state: "Pennsylvania",
    abbreviation: "PA",
    description:
      "Philadelphia has enacted local EPS restrictions on food service containers. Statewide preemption debates are ongoing, with state legislators divided on whether municipalities should have authority to enact their own bans.",
    year: 0,
    type: "restriction",
  },
  {
    state: "Michigan",
    abbreviation: "MI",
    description:
      "Several municipalities have adopted local EPS restrictions. Statewide recycling incentive programs are being explored, with industry groups promoting expanded drop-off infrastructure as an alternative to bans.",
    year: 0,
    type: "restriction",
  },
  {
    state: "Florida",
    abbreviation: "FL",
    description:
      "Some local jurisdictions have attempted EPS restrictions, but a state preemption law limits the ability of municipalities to enact their own bans on polystyrene products. Legislative efforts to repeal preemption have been introduced.",
    year: 0,
    type: "restriction",
  },

  // ===== NO-BAN STATES =====
  {
    state: "Alabama",
    abbreviation: "AL",
    description:
      "No statewide ban or restrictions on polystyrene. Alabama relies on voluntary recycling efforts and industry-led collection programs. Some communities participate in regional EPS drop-off events organized by packaging manufacturers.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Alaska",
    abbreviation: "AK",
    description:
      "No ban or restrictions in place. Alaska's remote geography and small population centers make EPS recycling infrastructure challenging. The state focuses on general waste reduction initiatives rather than material-specific bans.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Arizona",
    abbreviation: "AZ",
    description:
      "No statewide ban or restrictions. Arizona has a market-driven approach to EPS management, with several private recycling facilities accepting clean EPS in the Phoenix metropolitan area. Industry groups have promoted voluntary collection programs.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Arkansas",
    abbreviation: "AR",
    description:
      "No ban or significant restrictions on polystyrene. Arkansas hosts some EPS manufacturing operations and favors industry self-regulation. Voluntary recycling programs exist on a limited basis in larger cities like Little Rock.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Georgia",
    abbreviation: "GA",
    description:
      "No statewide ban on polystyrene. Georgia has a growing number of private EPS recycling drop-off locations, particularly in the Atlanta metro area. The state supports industry-led recycling initiatives rather than regulatory approaches.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Idaho",
    abbreviation: "ID",
    description:
      "No ban or restrictions in place. Idaho takes a market-driven approach to polystyrene waste management. Limited recycling infrastructure exists, though some private haulers accept clean EPS foam in the Boise area.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Indiana",
    abbreviation: "IN",
    description:
      "No statewide ban or restrictions. Indiana has several EPS recycling facilities operating in the Indianapolis region. The state favors voluntary industry programs and has not pursued polystyrene-specific legislation.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Iowa",
    abbreviation: "IA",
    description:
      "No ban or restrictions on polystyrene products. Iowa's approach emphasizes general recycling education and voluntary participation. Some university campuses have independently moved away from EPS food service containers.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Kansas",
    abbreviation: "KS",
    description:
      "No statewide ban or restrictions. Kansas relies on market-based solutions for EPS waste management. A small number of recycling facilities accept clean expanded polystyrene, mainly in the Kansas City and Wichita areas.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Kentucky",
    abbreviation: "KY",
    description:
      "No ban or restrictions in place. Kentucky has minimal EPS-specific recycling infrastructure but participates in broader regional recycling programs. The state has not considered polystyrene-specific legislation to date.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Louisiana",
    abbreviation: "LA",
    description:
      "No statewide ban or restrictions on polystyrene. Louisiana's petrochemical industry presence influences the policy landscape, favoring recycling and reuse initiatives over material bans. Some voluntary collection events occur in New Orleans and Baton Rouge.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Mississippi",
    abbreviation: "MS",
    description:
      "No ban or restrictions in place. Mississippi has limited EPS recycling infrastructure and no pending legislation targeting polystyrene. The state focuses on general litter reduction and waste management improvements.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Missouri",
    abbreviation: "MO",
    description:
      "No statewide ban or restrictions. Missouri has a handful of private EPS recycling operations, primarily in the St. Louis and Kansas City metro areas. Industry groups have promoted voluntary drop-off programs rather than regulatory measures.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Montana",
    abbreviation: "MT",
    description:
      "No ban or restrictions on polystyrene. Montana's rural character and dispersed population make centralized recycling infrastructure difficult. The state emphasizes general waste reduction and relies on voluntary recycling participation.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Nebraska",
    abbreviation: "NE",
    description:
      "No statewide ban or restrictions in place. Nebraska takes a voluntary approach to EPS management, with some recycling options available through private haulers in Omaha and Lincoln. No polystyrene-specific legislation has been proposed.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Nevada",
    abbreviation: "NV",
    description:
      "No ban or restrictions on polystyrene products. Nevada's hospitality industry is a significant EPS consumer, and the state has favored industry-led recycling solutions. Some Las Vegas resorts have voluntarily transitioned away from EPS food containers.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "New Hampshire",
    abbreviation: "NH",
    description:
      "No statewide ban or restrictions. New Hampshire has a tradition of limited government regulation and relies on voluntary recycling programs. Some communities have independently explored local EPS reduction initiatives.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "New Mexico",
    abbreviation: "NM",
    description:
      "No ban or restrictions in place. New Mexico has limited EPS recycling infrastructure, though Albuquerque has some private drop-off options. The state has focused on broader solid waste management improvements rather than material-specific bans.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "North Carolina",
    abbreviation: "NC",
    description:
      "No statewide ban on polystyrene. North Carolina has several industry-supported EPS recycling drop-off locations in the Charlotte and Raleigh-Durham areas. The EPS Industry Alliance has been active in expanding collection infrastructure.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "North Dakota",
    abbreviation: "ND",
    description:
      "No ban or restrictions in place. North Dakota has minimal EPS-specific recycling programs due to its small population and rural geography. The state has not pursued polystyrene-specific legislation.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Ohio",
    abbreviation: "OH",
    description:
      "No ban or restrictions in place. Ohio relies on voluntary industry recycling programs, and the EPS Industry Alliance has been expanding drop-off locations throughout the state, particularly in Columbus, Cleveland, and Cincinnati.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Oklahoma",
    abbreviation: "OK",
    description:
      "No statewide ban or restrictions on polystyrene. Oklahoma favors a market-driven approach and has not considered material-specific bans. Limited private recycling options exist in the Oklahoma City and Tulsa metropolitan areas.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "South Carolina",
    abbreviation: "SC",
    description:
      "No ban or restrictions in place. South Carolina has some industry-sponsored EPS collection events, particularly in coastal communities concerned about marine debris. The state has not pursued statewide polystyrene legislation.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "South Dakota",
    abbreviation: "SD",
    description:
      "No ban or restrictions on polystyrene. South Dakota has very limited EPS recycling infrastructure and no pending legislation. The state takes a general approach to waste management without material-specific regulations.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Tennessee",
    abbreviation: "TN",
    description:
      "No statewide ban or restrictions. Tennessee has a few private EPS recycling facilities, primarily in the Nashville and Memphis areas. The state supports voluntary recycling initiatives and industry-led collection programs.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Texas",
    abbreviation: "TX",
    description:
      "No statewide ban or restrictions. Texas has a market-driven approach with several EPS recycling facilities operating in the Houston and Dallas areas. Industry-supported drop-off programs are expanding, and the state's large manufacturing base favors recycling over bans.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Utah",
    abbreviation: "UT",
    description:
      "No ban or restrictions in place. Utah has limited EPS recycling options, though some private facilities in Salt Lake City accept clean polystyrene foam. The state has not pursued material-specific legislation.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "West Virginia",
    abbreviation: "WV",
    description:
      "No ban or restrictions on polystyrene. West Virginia has minimal EPS recycling infrastructure and no legislative proposals targeting polystyrene. The state focuses on broader waste management and landfill diversion goals.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Wisconsin",
    abbreviation: "WI",
    description:
      "No statewide ban or restrictions. Wisconsin has some private EPS recycling operations in the Milwaukee and Madison areas. Industry groups have promoted voluntary collection programs and recycling education campaigns throughout the state.",
    year: 0,
    type: "no-ban",
  },
  {
    state: "Wyoming",
    abbreviation: "WY",
    description:
      "No ban or restrictions in place. Wyoming's small population and rural character result in very limited EPS recycling infrastructure. The state has not pursued polystyrene-specific regulations and relies on general waste management practices.",
    year: 0,
    type: "no-ban",
  },
];
