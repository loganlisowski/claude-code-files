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
    slug: "the-complete-guide-to-polystyrene-recycling",
    title: "The Complete Guide to Polystyrene Recycling",
    excerpt:
      "Everything you need to know about recycling polystyrene, from identification to finding drop-off locations near you.",
    date: "2025-02-15",
    readingTime: 8,
    category: "Guide",
    tags: ["recycling", "guide", "how-to", "EPS"],
    featured: true,
    content: `Polystyrene, identified by the resin code #6 on plastic products, is one of the most widely used plastics in the world. From the foam cups that keep your coffee hot to the protective packaging that cushions your new electronics, polystyrene is everywhere. Yet despite its ubiquity, recycling this material remains one of the biggest challenges in modern waste management.

## Why Is Polystyrene Hard to Recycle?

The difficulties begin with the material itself. Expanded polystyrene (EPS) is roughly 95% air by volume, meaning a truckload of foam cups contains very little actual recyclable material relative to the space it occupies. Transportation costs become prohibitively expensive when you are essentially hauling air across long distances. Contamination is another major hurdle. Food residue from takeout containers and coffee cups makes the material difficult to process without thorough cleaning. Finally, the economics are stark: recycling polystyrene can cost over $1,000 per ton at small scale, while landfill disposal costs just $30-50 per ton.

## How to Identify Polystyrene

Look for the #6 recycling symbol stamped on the bottom of containers. Polystyrene comes in two main forms: expanded polystyrene (EPS), which is the white, beaded foam used in cups and packaging, and extruded polystyrene (XPS), which is the denser, colored foam board used in building insulation. Both are recyclable, but through different processes and at different facilities.

## The 4-Step Consumer Recycling Process

**Step 1: Identify.** Check for the #6 resin code and determine whether you have EPS or solid polystyrene. Remove any labels or tape if possible.

**Step 2: Clean.** Rinse food containers thoroughly with water. Remove any food residue, as contamination is the number one reason polystyrene loads get rejected at recycling facilities. Allow items to dry completely.

**Step 3: Find a Location.** Since most curbside programs do not accept polystyrene, you will need to locate a specialized drop-off point. The EPS Industry Alliance maintains an online recycling locator map that helps you find the nearest facility. Many shipping stores, packaging retailers, and dedicated recycling centers accept clean EPS.

**Step 4: Transport.** Gather your clean polystyrene and bring it to the drop-off location. If possible, break larger pieces into smaller ones to save space in your vehicle, but do not compress EPS into a ball as this can make it harder to process.

## Mechanical vs. Chemical Recycling

Mechanical recycling involves physically processing polystyrene through compaction, shredding, and extrusion. The material is compressed to as little as 1/50th of its original volume, then melted and reformed into pellets. These pellets become new products like picture frames, park benches, and crown molding.

Chemical recycling takes a fundamentally different approach by breaking polystyrene down at the molecular level. Methods like pyrolysis heat the material to 400-500 degrees Celsius in an oxygen-free environment, converting it back into styrene oil. Depolymerization goes even further, recovering the original styrene monomer that can be repolymerized into virgin-quality polystyrene.

## Finding Recycling Locations

The EPS Industry Alliance operates a comprehensive map of drop-off locations across the United States. Additionally, many mail and packaging stores accept clean EPS packaging materials for reuse. Some municipalities have begun adding polystyrene collection to their special recycling events, even if they do not include it in regular curbside pickup.

The infrastructure for polystyrene recycling is growing every year. New facilities are opening, chemical recycling technologies are scaling up, and the 2025 milestone of food-grade recycled polystyrene has given the industry renewed momentum. By taking the time to properly recycle your polystyrene waste, you are contributing to a system that gets stronger with every participant.`,
    image: "/images/recycling-guide.jpg",
    imageAlt: "Polystyrene recycling bins and containers",
  },
  {
    slug: "5-myths-about-styrofoam-debunked",
    title: "5 Myths About Styrofoam Recycling, Debunked",
    excerpt:
      "Think Styrofoam can\u2019t be recycled? Think again. We bust the biggest misconceptions about polystyrene waste.",
    date: "2025-01-28",
    readingTime: 6,
    category: "Education",
    tags: ["myths", "recycling", "styrofoam", "facts"],
    content: `Polystyrene recycling is surrounded by misconceptions that discourage people from making the effort. These myths persist because polystyrene recycling is genuinely different from recycling aluminum cans or cardboard boxes. But different does not mean impossible. Let us separate fact from fiction.

## Myth 1: Polystyrene Cannot Be Recycled

This is the most pervasive myth, and it is flatly wrong. Polystyrene is 100% recyclable through both mechanical and chemical processes. Mechanical recycling compresses and melts the material into pellets that become picture frames, crown molding, and other durable goods. Chemical recycling breaks it down into styrene monomer that can be made into brand-new polystyrene. The real issue is not the material's recyclability. It is the lack of convenient collection infrastructure in most communities. Only about 32% of Americans have access to polystyrene recycling programs, which creates the false impression that the material simply cannot be recycled.

## Myth 2: Recycling Polystyrene Releases Dangerous Toxins

While it is true that burning polystyrene in an uncontrolled setting can release harmful chemicals including styrene gas and carbon monoxide, modern recycling facilities are not bonfires. Mechanical recycling methods like compaction and densification use pressure rather than combustion. Even thermal processes like extrusion and pyrolysis take place in enclosed, controlled environments with emission scrubbing systems. Advanced chemical recycling operations are designed with rigorous environmental safeguards, and commercial facilities must meet strict air quality regulations. Properly recycling polystyrene is far safer for the environment than letting it accumulate in landfills and oceans.

## Myth 3: You Can Put Polystyrene in Your Curbside Bin

Unfortunately, this well-intentioned assumption causes real problems. Most municipal curbside programs explicitly exclude polystyrene because it can jam sorting equipment, contaminate bales of other recyclables, and break apart into tiny beads that scatter throughout the facility. Placing polystyrene in your curbside bin is a form of "wish-cycling" that actually hinders the recycling process. Instead, look for dedicated EPS drop-off locations at shipping stores, packaging retailers, or specialized recycling centers. The EPS Industry Alliance maintains a searchable locator to help you find the nearest option.

## Myth 4: Polystyrene Biodegrades Eventually

Some people assume that polystyrene will simply break down over time like a banana peel or a newspaper. The reality is sobering. Polystyrene takes over 500 years to decompose in a landfill, and it never truly disappears. Instead, it undergoes photodegradation, slowly fragmenting into smaller and smaller pieces known as microplastics. These microplastics enter waterways, soil, and the ocean food chain, causing environmental damage for centuries. Polystyrene does not biodegrade. It just becomes a less visible and more insidious pollutant.

## Myth 5: Polystyrene Recycling Is Too Expensive to Ever Work

The economics are challenging but rapidly improving. Small-scale polystyrene recycling can cost over $1,000 per ton, compared to roughly $30-50 per ton for landfill disposal. However, several innovations are changing the equation. On-site compaction machines reduce EPS volume by 50:1, dramatically cutting transportation costs. Chemical recycling produces valuable styrene monomer that commands higher market prices. The global EPS recycling market has already reached $0.7 billion and is growing annually. As more facilities open and technology improves, the cost gap will continue to narrow. History has shown that recycling economics improve with scale, and the same trajectory that made aluminum and paper recycling commonplace is now underway for polystyrene.`,
    image: "/images/myths-debunked.jpg",
    imageAlt: "Research and fact-checking about styrofoam recycling",
  },
  {
    slug: "creative-ways-to-reuse-styrofoam-at-home",
    title: "15 Creative Ways to Reuse Styrofoam at Home",
    excerpt:
      "Before tossing that packaging foam, discover clever DIY ways to give polystyrene a second life.",
    date: "2025-01-10",
    readingTime: 7,
    category: "DIY",
    tags: ["reuse", "DIY", "upcycling", "home"],
    content: `Before that polystyrene packaging heads to the landfill, consider giving it a second life. Reusing polystyrene at home reduces waste, saves money, and often solves everyday problems in surprisingly clever ways. Here are fifteen practical ideas that anyone can try.

## In the Garden

**1. Seed Starters.** Cut EPS cups or containers into small pots, poke drainage holes in the bottom, and fill with potting soil. They insulate tender roots and are perfect for starting seeds indoors before transplanting.

**2. Drainage Layer for Planters.** Break polystyrene into chunks and place a layer at the bottom of large planters. This improves drainage, reduces the amount of soil needed, and keeps heavy pots lighter and easier to move.

**3. Garden Markers.** Cut flat polystyrene pieces into stakes and write plant names with a permanent marker. They resist moisture far better than popsicle sticks or paper labels and last an entire growing season.

## Around the House

**4. Packing Material Reuse.** Save packing peanuts and foam inserts for your own shipping needs. Many mail and packaging stores also accept clean packing materials for reuse, keeping them in circulation longer.

**5. Insulation Patches.** Small pieces of polystyrene can fill gaps around pipes, window frames, or drafty spots in basements and attics. While not a substitute for professional insulation, they provide a quick, free improvement.

**6. Tool Organizer.** Press screwdrivers, drill bits, chisels, and other pointed tools into a thick block of polystyrene to keep them upright and organized in a drawer or on a workbench.

**7. Cooler Repairs.** If your foam cooler has cracks or chips, use small pieces of polystyrene and a dab of waterproof adhesive to patch them up and extend the cooler's useful life.

**8. Soundproofing.** While not as effective as professional acoustic panels, sheets of polystyrene placed behind furniture or inside closets can help dampen sound transfer between rooms. Every layer helps in noisy households.

## Arts and Crafts

**9. Paint Palette.** A clean polystyrene tray makes an excellent disposable paint palette for watercolors, acrylics, or tempera paints. The smooth surface keeps colors separated and cleans up easily.

**10. Art Projects.** Polystyrene blocks can be carved, painted, and shaped into sculptures, architectural models, and dioramas. Many school art programs already use this material extensively.

**11. Craft Stamps.** Carve simple designs into flat pieces of polystyrene using a pencil or stylus, then use them as printing stamps with ink or paint. Children especially enjoy this technique for making cards and wrapping paper.

**12. Holiday Ornaments.** Polystyrene balls and shapes, available at craft stores but also salvageable from packaging, serve as the base for countless ornament projects, covered with fabric, sequins, glitter, or decoupage.

## Practical Solutions

**13. Floating Devices.** Small polystyrene pieces placed inside waterproof bags or containers add buoyancy to homemade fishing bobbers, kayak gear holders, or dock bumpers.

**14. Science Experiments.** Polystyrene is a fantastic material for home science experiments. Demonstrate static electricity, test insulation properties, explore density with water experiments, or show how acetone dissolves it (a dramatic demonstration of solvent chemistry).

**15. Shipping Protection.** When you need to mail fragile items, custom-cut polystyrene pieces provide better protection than crumpled newspaper. Shape it to cradle the item snugly inside the box for professional-quality packing at zero cost.

These ideas represent just the beginning. The key principle is to think of polystyrene as a resource rather than waste. Each reuse delays the material's journey to the landfill and reduces demand for new packaging materials. And when your polystyrene finally reaches the end of its useful life at home, remember to seek out a dedicated recycling drop-off location rather than placing it in your curbside bin.`,
    image: "/images/diy-reuse.jpg",
    imageAlt: "Creative DIY projects reusing styrofoam materials",
  },
  {
    slug: "state-by-state-polystyrene-bans-2025",
    title: "State-by-State Polystyrene Bans: 2025 Update",
    excerpt:
      "A comprehensive look at which US states have banned or restricted polystyrene and what it means for consumers.",
    date: "2025-02-01",
    readingTime: 7,
    category: "Policy",
    tags: ["policy", "bans", "legislation", "states"],
    content: `The legislative landscape around polystyrene has shifted dramatically in recent years. More than a dozen US states have enacted bans or restrictions on single-use polystyrene food containers, reflecting growing public awareness of the material's environmental impact. Here is where things stand as of 2025.

## The Pioneers

**Maryland** made history in 2020 as the first state to implement a statewide ban on expanded polystyrene food service products. The law prohibits restaurants, cafeterias, and food trucks from using EPS containers for takeout and leftovers. Maryland's bold move established a template that many other states would follow.

**Oregon** passed its own ban in 2020, targeting EPS food containers used by restaurants and food vendors. The Oregon law includes allowances for wholesale packaging, recognizing that food service and bulk distribution have different needs and alternatives.

## The Wave of 2021-2022

**Maine** enacted a comprehensive ban on polystyrene food containers in 2021, with targeted exemptions for raw meat and seafood trays where alternatives were deemed insufficient. The state's strong environmental tradition made the legislation broadly popular with residents.

**Vermont** also acted in 2021, passing a sweeping ban on single-use EPS food containers as part of broader legislation targeting single-use plastics. Vermont's approach was comprehensive, addressing polystyrene alongside plastic bags and stirrers.

**New York** joined the movement in 2022 with a ban on EPS foam containers and loose-fill packaging peanuts in food service establishments. Given New York's massive food service industry, this ban removed an enormous volume of polystyrene from the waste stream.

**New Jersey** passed one of the broadest single-use plastics laws in the country in 2022, folding an EPS food container ban into legislation that also restricted plastic bags and paper bags. The state's comprehensive approach addressed multiple waste streams simultaneously.

**Hawaii**, while lacking a single statewide law, achieved a de facto ban through county-level ordinances that cover all major islands and food service operations, effectively making it a statewide prohibition by 2022.

**Delaware** restricted EPS food containers in food service in 2022, implementing a phase-in period to give small businesses time to find affordable alternatives and adjust their operations.

## Recent Action: 2023-2025

**California** has taken a multi-pronged approach. Over 130 cities and counties have enacted local polystyrene ordinances, and the statewide SB 54 legislation established polystyrene reduction targets as part of a broader plastics sustainability framework signed into effect in 2023.

**Colorado** implemented a phased ban that reached full effect in 2024, prohibiting polystyrene food containers across all food service operations in the state.

**Rhode Island** enacted a statewide ban on single-use EPS food containers in 2024, joining the growing list of northeastern states committed to polystyrene reduction as part of comprehensive plastics reform.

**Washington** expanded its existing restrictions in 2025 to include all EPS food service ware and coolers, making it one of the most comprehensive state-level polystyrene laws in the nation.

**Virginia** has taken a more moderate path, implementing partial restrictions in certain localities while establishing statewide recycling incentive programs designed to encourage proper disposal and recycling of polystyrene rather than outright prohibition.

## Why Recycling Makes Bans Unnecessary

The polystyrene industry has responded to these bans by investing heavily in recycling infrastructure, and the results speak for themselves. Advanced chemical recycling now produces food-grade recycled polystyrene at commercial scale. Compaction technology reduces EPS volume by 50:1, making collection and transport economically viable. The global EPS recycling market has already reached $0.7 billion and continues to grow.

These bans, while well-intentioned, are increasingly misguided. They eliminate a material that is 100% recyclable, force businesses to switch to alternatives that often have higher environmental footprints, and remove the economic incentive to build recycling infrastructure. Rather than banning polystyrene, states should invest in recycling programs that capture this valuable material and turn it into new products. The technology exists. The market demand exists. What is needed is infrastructure investment, not prohibition.`,
    image: "/images/state-bans.jpg",
    imageAlt: "US Capitol building representing polystyrene policy",
  },
  {
    slug: "chemical-recycling-breakthroughs-turning-waste-into-fuel",
    title:
      "Chemical Recycling Breakthroughs: Turning Polystyrene Waste Into Fuel",
    excerpt:
      "New chemical recycling technologies are transforming polystyrene waste into valuable fuel and raw materials.",
    date: "2024-12-15",
    readingTime: 6,
    category: "Innovation",
    tags: ["chemical recycling", "pyrolysis", "innovation", "technology"],
    content: `While mechanical recycling has long been the standard approach for processing polystyrene waste, a new generation of chemical recycling technologies is opening up possibilities that were unimaginable just a decade ago. These methods break polystyrene down at the molecular level, producing valuable fuels, chemical feedstocks, and even virgin-quality styrene monomer.

## Pyrolysis: Heat Without Oxygen

Pyrolysis is the most commercially advanced chemical recycling method for polystyrene. The process heats polystyrene waste to temperatures between 400 and 500 degrees Celsius inside a sealed reactor with no oxygen present. Without oxygen, the material cannot burn. Instead, the polymer chains break apart into smaller hydrocarbon molecules that condense into a liquid styrene oil. This oil can serve directly as a fuel similar to diesel, or it can be further refined into chemical feedstocks for manufacturing.

Companies like Agilyx have been at the forefront of pyrolysis technology, operating commercial-scale facilities that can process thousands of tons of polystyrene waste annually. Their systems achieve conversion rates of up to 90%, meaning that the vast majority of the input material becomes useful output. Agilyx has demonstrated that even contaminated polystyrene, material that would be rejected by mechanical recycling, can be successfully processed through pyrolysis.

## Depolymerization: Back to the Beginning

Depolymerization takes chemical recycling a step further by breaking polystyrene all the way back to its original styrene monomer. This is the molecular building block from which polystyrene is made, and recovering it means you can produce brand-new polystyrene that is chemically identical to virgin material. The process uses carefully controlled heat and catalysts to unzip the polymer chains link by link.

Styrenyx, a company spun out of academic research, has developed a proprietary depolymerization process that produces high-purity styrene monomer from post-consumer polystyrene waste. Their technology achieves purity levels sufficient for food-grade applications, a milestone that was considered nearly impossible just five years ago. This means that a polystyrene cup could theoretically be recycled back into another polystyrene cup indefinitely, creating a truly circular material loop.

## Catalytic Upcycling: Creating Greater Value

The newest frontier in chemical recycling is catalytic upcycling, which uses specialized catalysts to convert polystyrene waste into materials and chemicals worth more than the original product. GreenMantra Technologies has developed catalytic processes that transform polystyrene into specialty waxes, lubricants, and chemical intermediates used in coatings and adhesives.

Researchers at various universities have also demonstrated the conversion of polystyrene into carbon nanotubes and other high-value carbon materials using novel catalyst systems. While these approaches are still largely in the research and pilot phase, they represent a paradigm shift in thinking about plastic waste, from a disposal problem to a resource opportunity.

## Challenges Ahead

Despite these breakthroughs, chemical recycling faces real challenges. Energy input requirements are significant, as heating reactors to 400-plus degrees consumes substantial power. The capital cost of building commercial facilities runs into tens of millions of dollars. Emissions management requires sophisticated scrubbing and monitoring systems. And the variable quality of waste feedstock means that process control must be highly adaptive.

The economics are improving, however. As landfill costs rise, polystyrene bans spread, and virgin styrene prices increase, the business case for chemical recycling strengthens. Major petrochemical companies have begun investing in these technologies, providing the capital and engineering expertise needed to scale up. The promise of a circular economy for polystyrene, where waste becomes feedstock in an endless loop, is no longer a theoretical concept but an emerging industrial reality.`,
    image: "/images/chemical-recycling.jpg",
    imageAlt: "Chemical recycling laboratory equipment",
  },
  {
    slug: "food-grade-recycled-polystyrene-2025-milestone",
    title: "Food-Grade Recycled Polystyrene: A 2025 Milestone",
    excerpt:
      "For the first time, recycled polystyrene has been approved for food-contact applications at commercial scale.",
    date: "2025-02-20",
    readingTime: 5,
    category: "Innovation",
    tags: ["food-grade", "milestone", "2025", "recycled PS"],
    content: `In a development that the polystyrene recycling industry has pursued for decades, 2025 marked the year that recycled polystyrene achieved food-grade certification at commercial scale. This milestone has the potential to fundamentally transform how we think about polystyrene waste, turning it from a disposal headache into a valuable circular resource.

## What Food-Grade Actually Means

Food-grade certification means that a material meets the stringent standards set by the FDA for direct contact with food and beverages. These standards exist to ensure that no harmful chemicals migrate from the packaging into the food. For recycled materials, meeting this bar is especially challenging because the recycling process must remove not only the original additives and processing chemicals but also any contaminants absorbed during the product's first use, including food residues, cleaning agents, inks, adhesives, and environmental pollutants.

The FDA's requirements for recycled food-contact materials demand that contaminant levels fall below extremely conservative thresholds, measured in parts per billion. This means the recycling process must produce polystyrene of extraordinary purity, essentially indistinguishable from material made fresh from petroleum feedstocks.

## How It Was Achieved

The breakthrough came through advanced depolymerization technology. Unlike mechanical recycling, which melts and reshapes the plastic (potentially carrying contaminants along), depolymerization breaks polystyrene all the way back to its fundamental building block: styrene monomer. This molecular-level deconstruction effectively strips away all impurities, since only styrene molecules are recovered and everything else is left behind.

The recovered styrene monomer is then purified through distillation and re-polymerized into fresh polystyrene. Multiple rounds of analytical testing confirm that the resulting material meets FDA purity standards. Companies at the forefront of this technology invested years in optimizing the process to achieve consistent, reliable purity at throughput volumes suitable for commercial production.

## Why It Matters

This milestone closes the loop on polystyrene in a way that mechanical recycling alone never could. Previously, recycled polystyrene could only be used in non-food applications like picture frames, insulation, office supplies, and park benches. While these are valuable uses, they represent downcycling rather than true circular recycling because the material can never return to its original high-value application.

With food-grade certification, a polystyrene yogurt cup can now be recycled back into another yogurt cup. A coffee cup lid can become a new coffee cup lid. This circular pathway dramatically increases the economic value of polystyrene recycling, because food-grade polystyrene commands the highest market price. The improved economics, in turn, provide stronger financial incentives for collection, sorting, and recycling infrastructure.

## What Comes Next

Industry analysts expect food-grade recycled polystyrene to begin appearing in consumer packaging within the next twelve to eighteen months as production scales up and supply chains develop. Several major food and beverage companies have already announced commitments to incorporate recycled polystyrene into their packaging portfolios, driven by both sustainability goals and consumer demand.

The success of food-grade recycled polystyrene also serves as a proof of concept for other plastics. If depolymerization can achieve food-grade purity for polystyrene, similar approaches may work for other polymer types, potentially unlocking circular recycling pathways across the plastics industry. What started as a polystyrene-specific breakthrough could catalyze a broader transformation in how we recover and reuse plastic materials.`,
    image: "/images/food-grade.jpg",
    imageAlt: "Food-grade recycled polystyrene packaging",
  },
  {
    slug: "polystyrene-and-ocean-pollution-the-hidden-crisis",
    title: "Why Recycling Is the Answer to Polystyrene Pollution",
    excerpt:
      "How recycling infrastructure, not bans, is the real solution to keeping polystyrene out of our oceans.",
    date: "2024-11-20",
    readingTime: 7,
    category: "Environment",
    tags: ["ocean", "pollution", "marine", "environment"],
    content: `Polystyrene pollution in the ocean is a real problem, but the solution is not banning a 100% recyclable material. The real answer lies in building the recycling infrastructure that captures polystyrene before it ever reaches waterways. Here is why recycling works, and why bans fall short.

## Understanding the Problem

When polystyrene is not properly disposed of or recycled, it can end up in waterways and oceans. Ultraviolet radiation from sunlight causes the material to become brittle and fragment over time. These fragments can break down into microplastics, pieces smaller than five millimeters, that are difficult to clean up once dispersed in the water.

Global coastal cleanup data shows polystyrene among the most commonly found debris on beaches. This is not an indictment of the material itself. It is an indictment of inadequate recycling infrastructure. Every piece of polystyrene found on a beach is a piece that should have been recycled.

## Why Marine Pollution Happens

Over 100,000 marine animals are affected by plastic pollution annually, and polystyrene is among the materials found in ocean debris. But this pollution does not happen because polystyrene exists. It happens because only 32% of Americans have access to polystyrene recycling programs. When people have no way to recycle, materials end up in the wrong places.

The root cause is a lack of collection and processing infrastructure. Banning the material does not address the systemic waste management failures that allow any plastic to reach the ocean. Countries and states with strong recycling programs see dramatically less plastic pollution regardless of what materials they use.

## Recycling Is the Real Solution

Modern recycling technology can handle polystyrene efficiently and economically. Compaction machines reduce EPS volume by 50:1, making collection and transport cost-effective. Chemical recycling through pyrolysis and depolymerization breaks polystyrene down to its original styrene monomer, producing virgin-quality material that can be used again and again. In 2025, food-grade recycled polystyrene was achieved at commercial scale, proving that true circular recycling is possible.

Every piece of polystyrene that enters a recycling facility is one less piece that could end up in the ocean. The technology exists. The market demand exists. What is needed is investment in recycling programs, not bans that eliminate a recyclable material.

## Why Bans Fall Short

Bans on polystyrene often push businesses toward alternative materials like paper and compostable plastics that have their own environmental problems. Paper cups require more energy and water to produce, generate higher carbon emissions, and often contain plastic linings that make them difficult to recycle. Compostable alternatives frequently end up in landfills where they do not decompose as intended.

Meanwhile, banning polystyrene removes the economic incentive to build recycling infrastructure for the material. Instead of investing in collection and processing systems that would keep polystyrene out of the environment permanently, bans simply shift the problem to other materials.

## The Path Forward

The solution to polystyrene ocean pollution is clear: expand recycling access from 32% to 100% of the population, invest in compaction and chemical recycling facilities, and create convenient collection programs that make recycling easier than littering. The global EPS recycling market has already reached $0.7 billion and is growing every year. The industry is investing, the technology is proven, and the economics are improving rapidly.

Polystyrene is a valuable, recyclable resource. The answer is not to ban it. The answer is to recycle it.`,
    image: "/images/ocean-recycling.jpg",
    imageAlt: "Ocean conservation and polystyrene recycling",
  },
  {
    slug: "the-economics-of-polystyrene-recycling",
    title: "The Economics of Polystyrene Recycling: Is It Worth It?",
    excerpt:
      "Breaking down the costs, challenges, and economic opportunities in the polystyrene recycling industry.",
    date: "2024-12-28",
    readingTime: 6,
    category: "Business",
    tags: ["economics", "business", "cost", "industry"],
    content: `The economics of polystyrene recycling present a fascinating paradox. On one hand, the material is technically recyclable and the end products have real market value. On the other hand, the cost of collecting and processing polystyrene waste has historically made recycling far more expensive than simply throwing it away. Understanding this economic landscape is essential for anyone interested in whether polystyrene recycling can become a viable, self-sustaining industry.

## The Cost Gap

The numbers are striking. Recycling polystyrene can cost over $1,000 per ton at small scale, while disposing of it in a landfill costs roughly $30-50 per ton. That significant cost difference is the central challenge facing the industry. The expense comes from several factors. Transportation is the biggest culprit. Expanded polystyrene is 95% air, meaning trucks carry mostly empty space. A full trailer of uncompacted EPS foam cups might contain just a few hundred pounds of actual material. Sorting and contamination removal add further costs, as food-soiled containers must be cleaned before processing. The specialized equipment needed for recycling, whether compactors, extruders, or chemical reactors, requires significant capital investment.

## Why Volume Matters

The lightweight nature of polystyrene creates a vicious cycle. Because it takes up enormous space relative to its weight, collection is expensive. Because collection is expensive, fewer facilities invest in it. Because fewer facilities exist, people have fewer options for recycling, which means less material is collected. Breaking this cycle requires increasing the density of the collected material as early as possible in the supply chain.

## The Compaction Revolution

This is where compaction technology has become a game-changer. Modern compaction machines compress EPS foam to just 1/50th of its original volume, transforming bulky waste into dense blocks or logs that are economically viable to transport. An on-site compactor at a distribution center or retail store can process thousands of pounds of EPS packaging per day, producing densified material that commands prices of $200 to $400 per ton from recycling processors. When compaction is performed at the source, transportation costs plummet and the economics shift dramatically.

## Chemical Recycling Economics

Chemical recycling offers a different economic equation. While the capital costs of building pyrolysis or depolymerization facilities are substantial, often $10 million or more, the output products are significantly more valuable. Recovered styrene monomer can sell for $1,000 to $1,500 per ton, comparable to virgin styrene prices. For facilities processing contaminated or mixed polystyrene waste that mechanical recyclers cannot handle, chemical recycling opens up feedstock sources that were previously worthless.

## The Market Opportunity

The global EPS recycling market was valued at approximately $0.7 billion in 2025 and is projected to grow significantly over the next decade. This growth is driven by tightening regulations, corporate sustainability commitments, and the development of higher-value output products like food-grade recycled polystyrene. For entrepreneurs and investors, the market opportunity lies in the gap between where infrastructure is today and where demand is heading.

## Job Creation and Community Impact

Polystyrene recycling facilities create jobs in collection, sorting, machine operation, logistics, and sales. A mid-sized mechanical recycling operation might employ 20 to 40 workers, while a chemical recycling plant could support 50 or more positions. These tend to be local jobs that cannot be outsourced, providing economic benefits to the communities where facilities are located.

## The Business Case

Is polystyrene recycling worth it? The honest answer is that it depends on the specific operation, technology, and scale. Small-scale operations relying solely on manual collection of uncompacted EPS will struggle economically. But facilities that combine efficient collection with compaction technology, process guaranteed feedstock from commercial sources, and sell into growing markets for recycled polystyrene products can and do operate profitably. The trajectory of the industry, with rising landfill costs, expanding regulations, improving technology, and growing demand, points toward increasingly favorable economics for those who invest now.`,
    image: "/images/economics.jpg",
    imageAlt: "Economics and financial analysis of recycling",
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
