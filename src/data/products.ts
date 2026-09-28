/**
 * PRODUCT CATALOGUE — edit this file to add, remove or re-price products.
 * Everything on /products and /products/[slug] is generated from here.
 *
 * ⚠️ MOQ, width, GSM and lead-time values below are PLACEHOLDERS so the pages
 * render realistically. Replace each one marked `// confirm` with the real
 * figure from the factory before the site goes live.
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
  /** Minimum order quantity — shown prominently, this is a bulk supplier. */
  moq: { value: string; note?: string };
  applications: string[];
  /** Images go in /public/products/<slug>-1.png etc. Empty array = weave swatch is drawn instead. */
  images: string[];
  /** Controls the generated weave swatch: thread colour + coarseness. */
  swatch: { warp: string; weft: string; density: number };
};

export const products: Product[] = [
  /* ---------------- Heavy Canvas Variants (1 to 10) ---------------- */
  {
    slug: "heavy-canvas",
    name: "Heavy Canvas — Standard Greige",
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
    moq: { value: "3,000 metres", note: "Per shade and construction" },
    applications: ["Truck and goods covers", "Tent bodies", "Industrial bags", "Machine covers"],
    images: [
      "/products/heavy-canvas-1.png",
      "/products/heavy-canvas-2.png",
      "/products/heavy-canvas-3.png",
      "/products/heavy-canvas-4.png",
    ],
    swatch: { warp: "#C9BCA0", weft: "#B3A588", density: 26 },
  },
  {
    slug: "heavy-canvas-v2-textured-weave",
    name: "Heavy Canvas — Textured Weave",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Open-edge textured weave heavy canvas engineered for superior tactile grip and custom dyeing.",
    body: [
      "Featuring a prominent textured selvedge and basket weave texture, this variant offers exceptional dimensional stability.",
      "Fully custom-dyeable to match any buyer color requirement for interior or exterior industrial applications.",
    ],
    specs: [
      { label: "Construction", value: "Textured basket weave" },
      { label: "Fibre", value: "100% Cotton" },
      { label: "Weight range", value: "350 – 600 GSM" },
      { label: "Width", value: "Up to 95 inches" },
      { label: "Finish", value: "Custom dyeable greige" },
      { label: "Packing", value: "Standard roll packing" },
      { label: "Lead time", value: "20 – 25 days" },
    ],
    moq: { value: "3,000 metres", note: "Custom colors available" },
    applications: ["Upholstery backing", "Heavy bags", "Industrial decor"],
    images: [
      "/products/heavy-canvas-v2-1.png",
      "/products/heavy-canvas-v2-2.png",
      "/products/heavy-canvas-v2-3.png",
      "/products/heavy-canvas-v2-4.png",
    ],
    swatch: { warp: "#D4C7B0", weft: "#BFB29A", density: 24 },
  },
  {
    slug: "heavy-canvas-v3-dense-duck",
    name: "Heavy Canvas — Dense Duck Weave",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Tightly packed dense duck weave heavy canvas built for maximum abrasion resistance and dye retention.",
    body: [
      "A tightly packed construction where warp and weft yarns lock firmly together, offering high tensile strength.",
      "Can be custom-dyed in vibrant or earthy tones according to buyer specifications.",
    ],
    specs: [
      { label: "Construction", value: "Dense plain duck weave" },
      { label: "Fibre", value: "Heavy cotton duck" },
      { label: "Weight range", value: "400 – 700 GSM" },
      { label: "Width", value: "Up to 100 inches" },
      { label: "Finish", value: "Unfinished / Dyeable" },
      { label: "Packing", value: "HDPE roll wrap" },
      { label: "Lead time", value: "20 – 30 days" },
    ],
    moq: { value: "3,000 metres", note: "Per shade" },
    applications: ["Tool bags", "Tarps", "Heavy duty aprons"],
    images: [
      "/products/heavy-canvas-v3-1.png",
      "/products/heavy-canvas-v3-2.png",
      "/products/heavy-canvas-v3-3.png",
      "/products/heavy-canvas-v3-4.png",
    ],
    swatch: { warp: "#B8AC93", weft: "#A3977F", density: 30 },
  },
  {
    slug: "heavy-canvas-v4-speckled-natural",
    name: "Heavy Canvas — Speckled Natural",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Natural unbleached organic-look cotton canvas featuring characteristic organic specks, fully dyeable.",
    body: [
      "Retains natural cotton seed particles for an authentic rustic look while maintaining industrial-grade strength.",
      "Accepts custom dyeing seamlessly to produce rich solid colors for apparel and premium utility goods.",
    ],
    specs: [
      { label: "Construction", value: "Plain weave with natural slubs" },
      { label: "Fibre", value: "Natural raw cotton" },
      { label: "Weight range", value: "340 – 520 GSM" },
      { label: "Width", value: "Up to 90 inches" },
      { label: "Finish", value: "Raw natural / Dyeable" },
      { label: "Packing", value: "Rolled on cores" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    moq: { value: "2,500 metres", note: "Per construction" },
    applications: ["Eco-friendly bags", "Artist canvas", "Casual utility wear"],
    images: [
      "/products/heavy-canvas-v4-1.png",
      "/products/heavy-canvas-v4-2.png",
      "/products/heavy-canvas-v4-3.png",
      "/products/heavy-canvas-v4-4.png",
    ],
    swatch: { warp: "#CFC5B2", weft: "#BAAF9B", density: 25 },
  },
  {
    slug: "heavy-canvas-v5-fine-grain-twill",
    name: "Heavy Canvas — Fine Grain Duck",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Smooth, uniform fine-grain heavy canvas designed for clean printing and precise custom dyeing.",
    body: [
      "Engineered with a smoother surface profile, making it ideal for screen printing, branding, and flawless solid dyeing.",
      "Maintains high breaking strength despite its refined surface texture.",
    ],
    specs: [
      { label: "Construction", value: "Uniform fine-grain plain weave" },
      { label: "Fibre", value: "Combed cotton yarn" },
      { label: "Weight range", value: "320 – 500 GSM" },
      { label: "Width", value: "Up to 100 inches" },
      { label: "Finish", value: "Prepared for dyeing / printing" },
      { label: "Packing", value: "Standard export rolls" },
      { label: "Lead time", value: "20 – 25 days" },
    ],
    moq: { value: "3,000 metres", note: "Per color specification" },
    applications: ["Printed tote bags", "Apparel lining", "Exhibition displays"],
    images: [
      "/products/heavy-canvas-v5-1.png",
      "/products/heavy-canvas-v5-2.png",
      "/products/heavy-canvas-v5-3.png",
      "/products/heavy-canvas-v5-4.png",
    ],
    swatch: { warp: "#D9CFBC", weft: "#C2B8A5", density: 28 },
  },
  {
    slug: "heavy-canvas-v6-soft-hand-cotton",
    name: "Heavy Canvas — Soft Hand Organic",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Washed-feel soft-hand heavy canvas offering enhanced flexibility without losing structural durability.",
    body: [
      "Specially processed for a softer hand feel while retaining multi-ply warp strength. Excellent for consumer-facing soft goods.",
      "Available in greige or custom-dyed shades according to buyer preferences.",
    ],
    specs: [
      { label: "Construction", value: "Soft-finish plain weave" },
      { label: "Fibre", value: "100% Cotton ring-spun" },
      { label: "Weight range", value: "300 – 480 GSM" },
      { label: "Width", value: "Up to 96 inches" },
      { label: "Finish", value: "Enzyme softened / Dyeable" },
      { label: "Packing", value: "Folded or rolled" },
      { label: "Lead time", value: "15 – 20 days" },
    ],
    moq: { value: "2,000 metres", note: "Custom shade matching available" },
    applications: ["Garments", "Hats", "Soft luggage and pouches"],
    images: [
      "/products/heavy-canvas-v6-1.png",
      "/products/heavy-canvas-v6-2.png",
      "/products/heavy-canvas-v6-3.png",
      "/products/heavy-canvas-v6-4.png",
    ],
    swatch: { warp: "#E2D9C8", weft: "#CBC3B2", density: 22 },
  },
  {
    slug: "heavy-canvas-v7-striped-utility",
    name: "Heavy Canvas — Multi-Stripe Utility",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Structured heavy canvas featuring fine woven contrasting warp stripes, fully customizable on request.",
    body: [
      "Built with integrated multi-color warp lines for aesthetic utility applications, workwear, and maritime gear.",
      "The base and stripe colors can be custom-dyed to match corporate or brand identities.",
    ],
    specs: [
      { label: "Construction", value: "Woven warp-stripe heavy canvas" },
      { label: "Fibre", value: "Cotton / synthetic blend" },
      { label: "Weight range", value: "380 – 580 GSM" },
      { label: "Width", value: "Up to 90 inches" },
      { label: "Finish", value: "Sanforized and dyed" },
      { label: "Packing", value: "Roll form in protective wrap" },
      { label: "Lead time", value: "25 – 30 days" },
    ],
    moq: { value: "3,000 metres", note: "Custom stripe layout on request" },
    applications: ["Deck chairs", "Maritime covers", "Heavy workwear aprons"],
    images: [
      "/products/heavy-canvas-v7-1.png",
      "/products/heavy-canvas-v7-2.png",
      "/products/heavy-canvas-v7-3.png",
      "/products/heavy-canvas-v7-4.png",
    ],
    swatch: { warp: "#9E968B", weft: "#857D74", density: 32 },
  },
  {
    slug: "heavy-canvas-v8-ribbed-industrial",
    name: "Heavy Canvas — Ribbed Industrial",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Reinforced ribbed-texture heavy canvas built for high-load industrial suspension and protective coverings.",
    body: [
      "Features micro-ribbed ridges across the warp direction to disperse physical impact and tension stress efficiently.",
      "Fully compatible with our dyeing and coating division for specialized outdoor deployment.",
    ],
    specs: [
      { label: "Construction", value: "Rib-reinforced weave" },
      { label: "Fibre", value: "High-tenacity cotton blend" },
      { label: "Weight range", value: "450 – 720 GSM" },
      { label: "Width", value: "Up to 100 inches" },
      { label: "Finish", value: "Industrial grade / Dyeable" },
      { label: "Packing", value: "Heavy-duty roll packing" },
      { label: "Lead time", value: "20 – 30 days" },
    ],
    moq: { value: "3,000 metres", note: "Per construction" },
    applications: ["Industrial curtains", "Heavy equipment slings", "Protective pads"],
    images: [
      "/products/heavy-canvas-v8-1.png",
      "/products/heavy-canvas-v8-2.png",
      "/products/heavy-canvas-v8-3.png",
      "/products/heavy-canvas-v8-4.png",
    ],
    swatch: { warp: "#757068", weft: "#5E5953", density: 35 },
  },
  {
    slug: "heavy-canvas-v9-charcoal-weave",
    name: "Heavy Canvas — Charcoal Dark Weave",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Deep charcoal-toned heavy canvas woven from multi-ply dark core yarns for rugged outdoor gear.",
    body: [
      "Pre-dyed dark charcoal aesthetic that hides dirt and wear exceptionally well in outdoor and industrial environments.",
      "Can also be custom-dyed to other dark tones or special color requirements.",
    ],
    specs: [
      { label: "Construction", value: "Multi-ply tight plain weave" },
      { label: "Fibre", value: "Cotton / poly-cotton core" },
      { label: "Weight range", value: "400 – 650 GSM" },
      { label: "Width", value: "Up to 98 inches" },
      { label: "Finish", value: "Charcoal dyed / Water-resistant option" },
      { label: "Packing", value: "HDPE wrap rolls" },
      { label: "Lead time", value: "20 – 25 days" },
    ],
    moq: { value: "3,000 metres", note: "Per shade" },
    applications: ["Camping gear", "Heavy duffel bags", "Outdoor furniture covers"],
    images: [
      "/products/heavy-canvas-v9-1.png",
      "/products/heavy-canvas-v9-2.png",
      "/products/heavy-canvas-v9-3.png",
      "/products/heavy-canvas-v9-4.png",
    ],
    swatch: { warp: "#4A4743", weft: "#363430", density: 29 },
  },
  {
    slug: "heavy-canvas-v10-premium-roll",
    name: "Heavy Canvas — Premium Roll Grade",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Flagship premium-grade heavy canvas roll offering supreme tensile strength and flawless dye absorption.",
    body: [
      "Our premier export-grade heavy canvas, woven under strict quality controls for high-end international buyers.",
      "Accepts custom dyeing with absolute color uniformity across large batch production runs.",
    ],
    specs: [
      { label: "Construction", value: "Premium balanced plain weave" },
      { label: "Fibre", value: "100% Superior grade cotton" },
      { label: "Weight range", value: "420 – 680 GSM" },
      { label: "Width", value: "Up to 100 inches" },
      { label: "Finish", value: "Export ready / Custom dyeable" },
      { label: "Packing", value: "Core wound in waterproof HDPE" },
      { label: "Lead time", value: "20 – 30 days" },
    ],
    moq: { value: "3,000 metres", note: "Export standard" },
    applications: ["Export tents", "Heavy architectural canvas", "Industrial covers"],
    images: [
      "/products/heavy-canvas-v10-1.png",
      "/products/heavy-canvas-v10-2.png",
      "/products/heavy-canvas-v10-3.png",
      "/products/heavy-canvas-v10-4.png",
    ],
    swatch: { warp: "#D1C6AF", weft: "#BAB09A", density: 27 },
  },

  /* ---------------- Other Products ---------------- */
  {
    slug: "filter-cloth",
    name: "Filter cloth",
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
    moq: { value: "2,000 metres", note: "Lower trial quantities considered for a first order" },
    applications: [
      "Filter press plates",
      "Vacuum belt filters",
      "Sugar and distillery filtration",
      "Chemical and mineral dewatering",
    ],
    images: [
      "/products/filter-cloth-1.png",
      "/products/filter-cloth-2.png",
      "/products/filter-cloth-3.png",
      "/products/filter-cloth-4.png",
    ],
    swatch: { warp: "#D2C9B4", weft: "#9EA492", density: 44 },
  },
  {
    slug: "multiple-ply-yarn",
    name: "Multiple-ply yarn",
    family: "Yarn",
    availability: "in-production",
    summary:
      "Two-, three- and multi-ply twisted yarn supplied on cones for weaving, stitching and rope work.",
    body: [
      "The twisting department runs at 60,000 to 70,000 kg a month. A share feeds our own looms; the balance is sold to weavers, stitchers and rope makers who need a dependable ply yarn without minimum-lot politics.",
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
    moq: { value: "1,000 kg", note: "Per count and ply combination" },
    applications: ["Industrial weaving", "Heavy stitching thread", "Rope and cordage", "Webbing"],
    images: [
      "/products/multiple-ply-yarn-1.png",
      "/products/multiple-ply-yarn-2.png",
      "/products/multiple-ply-yarn-3.png",
      "/products/multiple-ply-yarn-4.png",
    ],
    swatch: { warp: "#E0D6BE", weft: "#CBBE9F", density: 18 },
  },

  /* ---------------- Tarpaulin Variants (1 to 5) ---------------- */
  {
    slug: "heavy-duty-tarpaulin",
    name: "Heavy Duty Tarpaulin",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Plain green heavy-duty coated tarpaulin built for rugged outdoor protection and industrial stacking.",
    body: [
      "Heavy Duty Tarpaulin is supplied as finished sheets — cut to size, hemmed, rope-reinforced along the edge and fitted with robust eyelets at the pitch you specify.",
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
    moq: { value: "500 pieces", note: "Or 5,000 sq. m, whichever is reached first" },
    applications: ["Truck and trailer covers", "Grain and cement stacking", "Site sheeting", "Temporary roofing"],
    images: [
      "/products/heavy-duty-tarpaulin-1.png",
      "/products/heavy-duty-tarpaulin-2.png",
      "/products/heavy-duty-tarpaulin-3.png",
      "/products/heavy-duty-tarpaulin-4.png",
    ],
    swatch: { warp: "#4A6B52", weft: "#354E3A", density: 30 },
  },
  {
    slug: "reinforced-grid-tarpaulin",
    name: "Reinforced Grid Tarpaulin",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Green tarpaulin with an embedded white grid pattern offering superior tear strength and structural rigidity.",
    body: [
      "Engineered with a high-strength white grid reinforcement matrix embedded within green protective layers, preventing tear propagation under high wind loads.",
      "Ideal for demanding construction sites, scaffolding enclosures, and long-term industrial yard covers.",
    ],
    specs: [
      { label: "Base fabric", value: "Woven fabric with white grid reinforcement" },
      { label: "Weight range", value: "180 – 320 GSM" },
      { label: "Tear Resistance", value: "Enhanced multi-directional grid lock" },
      { label: "Edge", value: "Heat-sealed with reinforced pp rope hem" },
      { label: "Eyelets", value: "Rust-proof metal eyelets at intervals" },
      { label: "Lead time", value: "15 – 20 days" },
    ],
    moq: { value: "500 pieces", note: "Custom dimensions available on request" },
    applications: ["Scaffolding enclosures", "Construction site safety", "Industrial open-yard storage"],
    images: [
      "/products/reinforced-grid-tarpaulin-1.png",
      "/products/reinforced-grid-tarpaulin-2.png",
      "/products/reinforced-grid-tarpaulin-3.png",
      "/products/reinforced-grid-tarpaulin-4.png",
    ],
    swatch: { warp: "#5F7C65", weft: "#455E4C", density: 34 },
  },
  {
    slug: "heavy-canvas-tarpaulin",
    name: "Heavy Canvas Tarpaulin",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Brown / khaki canvas-type heavy protective sheet combining natural breathability with weather resistance.",
    body: [
      "Crafted in a distinctive brown and khaki canvas aesthetic, offering superior heat insulation and breathability to prevent moisture condensation underneath.",
      "Widely preferred for machinery protection, agricultural produce covering, and rugged outdoor camping applications.",
    ],
    specs: [
      { label: "Base fabric", value: "Heavy cotton blend duck canvas" },
      { label: "Weight range", value: "400 – 650 GSM" },
      { label: "Treatment", value: "Water-repellent and rot-proof finished" },
      { label: "Edge", value: "Stitched hem with reinforced patch corners" },
      { label: "Eyelets", value: "Solid brass eyelets securely fitted" },
      { label: "Lead time", value: "20 – 25 days" },
    ],
    moq: { value: "300 pieces", note: "Per grade and thickness" },
    applications: ["Machinery protection", "Agricultural produce covers", "Outdoor expedition & camping"],
    images: [
      "/products/heavy-canvas-tarpaulin-1.png",
      "/products/heavy-canvas-tarpaulin-2.png",
      "/products/heavy-canvas-tarpaulin-3.png",
      "/products/heavy-canvas-tarpaulin-4.png",
    ],
    swatch: { warp: "#8C7A65", weft: "#6B5C4B", density: 28 },
  },
  {
    slug: "tarpaulin-multi-color-swatch",
    name: "Tarpaulin — Multi-Color Swatch",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Customizable multi-color sample swatch collection demonstrating our complete range of vibrant dye options for tarpaulin covers.",
    body: [
      "Showcases our extensive in-house dyeing capability across multiple shades and bright chromatic options for tailored industrial and commercial requirements.",
      "Buyers can select any custom shade from our palette or provide a Pantone reference for large-batch production runs.",
    ],
    specs: [
      { label: "Base fabric", value: "Coated woven fabric / Canvas" },
      { label: "Color Range", value: "Full chromatic custom dye palette" },
      { label: "Customization", value: "Exact shade matching on request" },
      { label: "Packing", value: "Swatch sample pack or roll production" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    moq: { value: "500 pieces", note: "Custom shade matching available" },
    applications: ["Branded transport covers", "Event marquees", "Color-coded site sheeting"],
    images: [
      "/products/tarpaulin-multi-color-swatch-1.png",
      "/products/tarpaulin-multi-color-swatch-2.png",
      "/products/tarpaulin-multi-color-swatch-3.png",
      "/products/tarpaulin-multi-color-swatch-4.png",
    ],
    swatch: { warp: "#7A658C", weft: "#5B4B6B", density: 30 },
  },
  {
    slug: "tarpaulin-textured-grid-weave",
    name: "Tarpaulin — Textured Grid Weave",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Advanced textured grid-weave tarpaulin offering enhanced surface traction and heavy-duty structural reinforcement.",
    body: [
      "Engineered with a specialized textured grid weave that provides superior anti-slip characteristics and high tensile endurance against stretching.",
      "Designed specifically for high-stress outdoor exposure and demanding industrial protection environments.",
    ],
    specs: [
      { label: "Base fabric", value: "Reinforced textured woven HDPE" },
      { label: "Weight range", value: "200 – 350 GSM" },
      { label: "Surface Texture", value: "Anti-slip grid matrix" },
      { label: "Edge", value: "Heat-sealed with heavy-duty rope hem" },
      { label: "Eyelets", value: "Rust-resistant reinforced eyelets" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    moq: { value: "500 pieces", note: "Custom sizing available" },
    applications: ["Heavy transport flooring", "Industrial yard covers", "Advanced site protection"],
    images: [
      "/products/tarpaulin-textured-grid-weave-1.png",
      "/products/tarpaulin-textured-grid-weave-2.png",
      "/products/tarpaulin-textured-grid-weave-3.png",
      "/products/tarpaulin-textured-grid-weave-4.png",
    ],
    swatch: { warp: "#657C72", weft: "#4B5E55", density: 33 },
  },

  /* ---------------- Finished Goods & Canvas Tota Bags ---------------- */
  {
    slug: "tents",
    name: "Tents",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Canvas tents and tent fabric — frame tents, relief shelters and event structures, stitched in-house.",
    body: [
      "Tents are made from our own canvas, which means the fabric and the finished shelter come from one place and one quality record.",
      "We make to a drawing or to a standard pattern: frame tents, ridge tents, relief and disaster-shelter tents, and event marquee panels. Waterproofing, fire-retardant treatment and printing are available as add-ons.",
    ],
    specs: [
      { label: "Fabric", value: "In-house heavy canvas, treated" },
      { label: "Types", value: "Frame, ridge, relief shelter, event marquee" },
      { label: "Treatments", value: "Water-repellent, rot-proof, FR on request" },
      { label: "Stitching", value: "Double-lock seam with reinforced corners" },
      { label: "Lead time", value: "30 – 45 days depending on quantity" },
    ],
    moq: { value: "100 units", note: "Fabric-only orders start at 3,000 metres" },
    applications: ["Relief and disaster shelter", "Defence and field camps", "Events and weddings", "Storage shelters"],
    images: [],
    swatch: { warp: "#CFC3A6", weft: "#A79877", density: 22 },
  },
  {
    slug: "canvas-tota-bags",
    name: "Canvas Tota Bags",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Premium crafted canvas tote and utility bags featuring vibrant multi-color panels, structural prints, and robust handles.",
    body: [
      "Stitched directly from our in-house heavy canvas weaves, these tote bags combine high load-bearing capacity with aesthetic versatility.",
      "Available in customized color blocking, printed floral motifs, striped patterns, and drawstring variants tailored for retail and corporate buyers.",
    ],
    specs: [
      { label: "Material", value: "In-house heavy cotton canvas / duck weave" },
      { label: "Varieties", value: "Color-blocked, printed floral, striped & drawstring bags" },
      { label: "Handles", value: "Reinforced cotton webbing straps" },
      { label: "Lead time", value: "15 – 25 days" },
    ],
    moq: { value: "500 pieces", note: "Custom branding and designs supported" },
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
    slug: "wax-proof-cloth",
    name: "Wax-proof cloth",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Wax-coated industrial canvas featuring heavy-duty brass eyelets and reinforced stitched hems for ultimate weather resistance.",
    body: [
      "A premium wax-coated variant of our heavy canvas, engineered specifically for rugged outdoor covers and shelters where superior water and moisture protection is required.",
      "Fitted with robust metal eyelets along double-stitched reinforced hems, making it ready for immediate heavy-duty deployment.",
    ],
    specs: [
      { label: "Construction", value: "Heavy duck canvas with wax coating" },
      { label: "Treatment", value: "Waterproof wax finish with reinforced hems" },
      { label: "Fittings", value: "Heavy-duty brass eyelets pre-installed" },
      { label: "Weight range", value: "450 – 700 GSM" },
      { label: "Lead time", value: "20 – 30 days" },
    ],
    moq: { value: "300 pieces or 2,000 metres", note: "Custom sizes available" },
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
    name: "PU-Coated Technical Fabric",
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
    moq: { value: "2,000 metres", note: "Per color or camouflage pattern" },
    applications: ["Tactical and outdoor gear", "Protective equipment covers", "Specialized utility bags"],
    images: [
      "/products/pu-coated-cloth-1.png",
      "/products/pu-coated-cloth-2.png",
      "/products/pu-coated-cloth-3.png",
      "/products/pu-coated-cloth-4.png",
    ],
    swatch: { warp: "#596652", weft: "#3F4A38", density: 31 },
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