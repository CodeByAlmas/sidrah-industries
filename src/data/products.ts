/**
 * PRODUCT CATALOGUE — edit this file to add, remove or re-price products.
 * Everything on /products and /products/[slug] is generated from here.
 */

export type Availability = "in-production" | "in-development";

export type Product = {
  slug: string;
  name: string;
  family: "Cloth" | "Yarn" | "Finished goods" | "Processing";
  availability: Availability;
  /** One line used on the catalogue tile. */
  summary: string;
  /** Two or three paragraphs for the detail page. */
  body: string[];
  /** Technical spec rows, rendered as a spec table. */
  specs: { label: string; value: string }[];
  applications: string[];
  /** Images go in /public/products/<slug>-1.png etc. Empty array = weave swatch is drawn instead. */
  images: string[];
  /** Controls the generated weave swatch: thread colour + coarseness. */
  swatch: { warp: string; weft: string; density: number };
};

export const products: Product[] = [
  {
    slug: "heavy-canvas",
    name: "Heavy Canvas",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Tightly woven high-GSM cotton canvas for covers, bags, industrial protection and tent bodies. Fully custom-dyeable to any shade.",
    body: [
      "Heavy canvas is the fabric the weaving floor was set up around. It is woven on rapier looms in a plain construction from multiple-ply yarn spun and twisted in-house, which keeps warp strength consistent from beam to beam.",
      "We run it in a range of weights so buyers can match cover weight to handling requirements. Moreover, buyers can offer this fabric to their clients in any custom dyed color of their choice through our in-house dyeing facility.",
      "Loom-state (greige) supply is standard. Dyed and water-repellent finished canvas is available through our in-house dyeing and coating line.",
    ],
    specs: [
      { label: "Construction", value: "Plain weave, multiple-ply warp and weft" },
      { label: "Fibre", value: "Cotton / cotton blend" },
      { label: "Weight range", value: "320 – 680 GSM" },
      { label: "Width", value: "Up to 100 inches" },
      { label: "Finish", value: "Greige, custom dyed, or water-repellent" },
      { label: "Packing", value: "Rolls in HDPE wrap, roll length to buyer spec" },
      { label: "Lead time", value: "20 – 30 days from order confirmation" },
    ],
    applications: ["Truck and goods covers", "Tent bodies", "Industrial bags", "Machine covers"],
    images: [
      "/products/heavy-canvas-1.png",
      "/products/heavy-canvas-v2-1.png",
      "/products/heavy-canvas-v3-1.png",
      "/products/heavy-canvas-v4-1.png",
      "/products/heavy-canvas-v5-1.png",
      "/products/heavy-canvas-v6-1.png",
      "/products/heavy-canvas-v7-1.png",
      "/products/heavy-canvas-v8-1.png",
      "/products/heavy-canvas-v9-1.png",
      "/products/heavy-canvas-v10-1.png",
    ],
    swatch: { warp: "#C9BCA0", weft: "#B3A588", density: 26 },
  },
  {
    slug: "multiple-ply-yarn",
    name: "Multiple Yarn",
    family: "Yarn",
    availability: "in-production",
    summary:
      "Two-, three- and multi-ply twisted yarn supplied on cones for weaving, stitching and rope work.",
    body: [
      "The twisting department runs at 60,000 to 70,000 kg a month. A share feeds our own looms; the balance is sold to weavers, stitchers and rope makers who need a dependable ply yarn without complications.",
      "Count, ply and twist direction are set to order. Send a sample or a specification and we will match it.",
    ],
    specs: [
      { label: "Ply", value: "2-ply, 3-ply and multi-ply" },
      { label: "Count range", value: "Quoted to buyer specification" },
      { label: "Twist", value: "S or Z, TPM to order" },
      { label: "Monthly capacity", value: "60,000 – 70,000 kg" },
      { label: "Packing", value: "Cones, in cartons or bags" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    applications: ["Industrial weaving", "Heavy stitching thread", "Rope and cordage", "Webbing"],
    images: [
      "/products/multiple-ply-yarn-1.png",
      "/products/multiple-ply-yarn-2.png",
      "/products/multiple-ply-yarn-3.png",
      "/products/multiple-ply-yarn-4.png",
    ],
    swatch: { warp: "#E0D6BE", weft: "#CBBE9F", density: 18 },
  },
  {
    slug: "heavy-duty-tarpaulin",
    name: "Tarpaulin",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Plain green heavy-duty coated tarpaulin built for rugged outdoor protection and industrial stacking.",
    body: [
      "Tarpaulin is supplied as finished sheets — cut to size, hemmed, rope-reinforced along the edge and fitted with robust eyelets at the pitch you specify.",
      "Plain green finish designed for discreet stacking, agricultural coverage, and heavy transport protection against harsh weather elements.",
    ],
    specs: [
      { label: "Base fabric", value: "Woven HDPE / Canvas, heavy coated" },
      { label: "Weight range", value: "150 – 300 GSM" },
      { label: "Sheet size", value: "Cut to buyer's size" },
      { label: "Edge", value: "Hemmed with rope reinforcement" },
      { label: "Eyelets", value: "Brass or aluminium, pitch to order" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    applications: ["Truck and trailer covers", "Grain and cement stacking", "Site sheeting", "Temporary roofing"],
    images: [
      "/products/heavy-duty-tarpaulin-1.png",
      "/products/heavy-canvas-tarpaulin-1.png",
      "/products/reinforced-grid-tarpaulin-1.png",
      "/products/tarpaulin-multi-color-swatch-1.png",
      "/products/tarpaulin-textured-grid-weave-1.png",
    ],
    swatch: { warp: "#4A6B52", weft: "#354E3A", density: 30 },
  },
  {
    slug: "wax-proof-cloth",
    name: "Wax Coated Canvas",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Wax-coated industrial canvas featuring heavy-duty brass eyelets and reinforced stitched hems for ultimate weather resistance.",
    body: [
      "A premium wax-coated variant of our heavy canvas, engineered specifically for rugged outdoor covers and shelters where superior water and moisture protection is required.",
      "Fitted with robust metal eyelets along double-stitched reinforced hems, making it ready for immediate heavy-duty deployment.",
    ],
    specs: [
      { label: "Construction", value: "Heavy canvas with wax coating" },
      { label: "Fittings", value: "Heavy-duty brass eyelets pre-installed" },
      { label: "Weight range", value: "450 – 700 GSM" },
      { label: "Lead time", value: "20 – 30 days" },
    ],
    applications: ["All-weather outdoor covers", "Heavy equipment protection", "Rugged tent and canopy panels"],
    images: [
      "/products/wax-proof-cloth-1.png",
      "/products/wax-proof-cloth-2.png",
      "/products/wax-proof-cloth-3.png",
      "/products/wax-proof-cloth-4.png",
    ],
    swatch: { warp: "#A8834E", weft: "#8C6A3B", density: 26 },
  },
  {
    slug: "pu-coated-cloth",
    name: "PU Coated",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Multi-color and camouflage PU-coated high-performance technical fabric engineered for supreme waterproofing and durability.",
    body: [
      "Our PU-coated technical fabric line features a wide variety of solid finishes and tactical camouflage patterns, designed for demanding outdoor gear, covers, and specialized utility products.",
      "Engineered with a robust woven base substrate and a high-grade polyurethane surface coating to ensure exceptional tear strength, weather resistance, and flexibility.",
    ],
    specs: [
      { label: "Construction", value: "High-density woven substrate with PU surface coating" },
      { label: "Varieties", value: "Solid color palette & tactical camouflage patterns" },
      { label: "Weight range", value: "350 – 600 GSM" },
      { label: "Water Resistance", value: "100% waterproof polyurethane finish" },
      { label: "Lead time", value: "20 – 30 days" },
    ],
    applications: ["Tactical and outdoor gear", "Protective equipment covers", "Specialized utility bags"],
    images: [
      "/products/pu-coated-cloth-1.png",
      "/products/pu-coated-cloth-2.png",
      "/products/pu-coated-cloth-3.png",
      "/products/pu-coated-cloth-4.png",
    ],
    swatch: { warp: "#596652", weft: "#3F4A38", density: 31 },
  },
  {
    slug: "fire-proof-canvas",
    name: "Fire Proof Canvas",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Specialized flame-retardant heavy canvas engineered to withstand high temperatures and prevent spark propagation.",
    body: [
      "Fire Proof Canvas is treated and woven specifically for industrial welding curtains, foundry covers, and high-heat safety environments where flame retardancy is mandatory.",
      "Maintains its structural integrity and multi-ply warp strength under extreme thermal exposure.",
    ],
    specs: [
      { label: "Construction", value: "Heavy duck weave with flame-retardant impregnation" },
      { label: "Fibre", value: "Treated cotton / high-heat blend" },
      { label: "Weight range", value: "450 – 750 GSM" },
      { label: "Width", value: "Up to 95 inches" },
      { label: "Lead time", value: "25 – 35 days" },
    ],
    applications: ["Welding blankets and curtains", "Foundry protective barriers", "Industrial fire safety covers"],
    images: [
      "/products/heavy-canvas-v8-1.png",
      "/products/heavy-canvas-v8-2.png",
      "/products/heavy-canvas-v8-3.png",
      "/products/heavy-canvas-v8-4.png",
    ],
    swatch: { warp: "#8C4A4A", weft: "#6B3535", density: 32 },
  },
  {
    slug: "tents",
    name: "Tents",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Canvas tents and tent fabric — frame tents, relief shelters and event structures, stitched in-house.",
    body: [
      "Tents are made from our own canvas, which means the fabric and the finished shelter come from one place and one quality record.",
      "We make to a drawing or to a standard pattern: frame tents, ridge tents, relief and disaster-shelter tents, and event marquee panels. Waterproofing and printing are available as add-ons.",
    ],
    specs: [
      { label: "Fabric", value: "In-house heavy canvas" },
      { label: "Types", value: "Frame, ridge, relief shelter, event marquee" },
      { label: "Stitching", value: "Double-lock seam with reinforced corners" },
      { label: "Lead time", value: "30 – 45 days depending on quantity" },
    ],
    applications: ["Relief and disaster shelter", "Defence and field camps", "Events and weddings", "Storage shelters"],
    images: [
      "/products/tents-1.png",
      "/products/tents-2.png",
      "/products/tents-3.png",
      "/products/tents-4.png",
    ],
    swatch: { warp: "#CFC3A6", weft: "#A79877", density: 22 },
  },
  {
    slug: "canvas-tota-bags",
    name: "Canvas Tota Bag",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Premium crafted canvas tote and utility bags featuring vibrant multi-color panels, structural prints, and robust handles.",
    body: [
      "Stitched directly from our in-house canvas weaves, these tote bags combine high load-bearing capacity with aesthetic versatility.",
      "Available in customized color blocking, printed floral motifs, striped patterns, and drawstring variants tailored for retail and corporate buyers.",
    ],
    specs: [
      { label: "Material", value: "In-house cotton canvas / duck weave" },
      { label: "Varieties", value: "Color-blocked, printed floral, striped & drawstring bags" },
      { label: "Handles", value: "Reinforced cotton webbing straps" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    applications: ["Retail shopping & lifestyle", "Corporate gifting", "Exhibitions and promotional events"],
    images: [
      "/products/canvas-tota-bags-1.png",
      "/products/canvas-tota-bags-2.png",
      "/products/canvas-tota-bags-3.png",
      "/products/canvas-tota-bags-4.png",
    ],
    swatch: { warp: "#D4C7B0", weft: "#A38F75", density: 28 },
  },
  {
    slug: "filter-cloth",
    name: "Filter Cloth",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Woven filter media for press, belt and rotary filtration, built to a stated air or cake-release requirement.",
    body: [
      "Filter cloth is woven to a filtration requirement rather than to a generic catalogue number. Buyers share the slurry, the press type and the target particle retention, and we quote a construction against it.",
      "Because the yarn is twisted in-house we can hold ply and twist consistent across a repeat order, which is what keeps cake release and cycle times predictable on a running press.",
      "Cut-and-sewn filter plates, belts and sleeves can be supplied against a drawing.",
    ],
    specs: [
      { label: "Construction", value: "Plain, twill or satin, to filtration spec" },
      { label: "Fibre", value: "Cotton, polypropylene or polyester" },
      { label: "Air permeability", value: "Quoted against buyer's requirement" },
      { label: "Width", value: "Up to 100 inches" },
      { label: "Supply form", value: "Roll goods, or cut and stitched to drawing" },
      { label: "Lead time", value: "25 – 35 days from approved sample" },
    ],
    applications: [
      "Filter press plates",
      "Vacuum belt filters",
      "Sugar and distillery filtration",
      "Chemical and mineral dewatering",
    ],
    images: [
      "/products/filter-cloth.png",
    ],
    swatch: { warp: "#D2C9B4", weft: "#9EA492", density: 44 },
  },
];

export const productFamilies = ["Cloth", "Yarn", "Finished goods", "Processing"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3) {
  const current = products.find((p) => p.slug === slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.family === current.family) - Number(a.family === current.family))
    .slice(0, limit);
}