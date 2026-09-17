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
  /** Images go in /public/products/<slug>-1.jpg etc. Empty array = weave swatch is drawn instead. */
  images: string[];
  /** Controls the generated weave swatch: thread colour + coarseness. */
  swatch: { warp: string; weft: string; density: number };
};

export const products: Product[] = [
  {
    slug: "heavy-canvas",
    name: "Heavy canvas",
    family: "Cloth",
    availability: "in-production",
    summary:
      "Tightly woven high-GSM cotton canvas for covers, bags, industrial protection and tent bodies.",
    body: [
      "Heavy canvas is the fabric the weaving floor was set up around. It is woven on rapier looms in a plain construction from multiple-ply yarn spun and twisted in-house, which keeps warp strength consistent from beam to beam.",
      "We run it in a range of weights so buyers can match cover weight to handling requirements — lighter for goods covers and bags, heavier for tent bodies and outdoor structures that stay up through a season.",
      "Loom-state (greige) supply is standard. Dyed and water-repellent finished canvas is available through our in-house dyeing and coating line.",
    ],
    specs: [
      { label: "Construction", value: "Plain weave, multiple-ply warp and weft" },
      { label: "Fibre", value: "Cotton / cotton blend" }, // confirm
      { label: "Weight range", value: "320 – 680 GSM" }, // confirm
      { label: "Width", value: "Up to 100 inches" }, // confirm
      { label: "Finish", value: "Greige, dyed, or water-repellent" },
      { label: "Packing", value: "Rolls in HDPE wrap, roll length to buyer spec" },
      { label: "Lead time", value: "20 – 30 days from order confirmation" }, // confirm
    ],
    moq: { value: "3,000 metres", note: "Per shade and construction" }, // confirm
    applications: ["Truck and goods covers", "Tent bodies", "Industrial bags", "Machine covers"],
    images: [],
    swatch: { warp: "#C9BCA0", weft: "#B3A588", density: 26 },
  },
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
      { label: "Fibre", value: "Cotton, polypropylene or polyester" }, // confirm
      { label: "Air permeability", value: "Quoted against buyer's requirement" },
      { label: "Width", value: "Up to 100 inches" }, // confirm
      { label: "Supply form", value: "Roll goods, or cut and stitched to drawing" },
      { label: "Lead time", value: "25 – 35 days from approved sample" }, // confirm
    ],
    moq: { value: "2,000 metres", note: "Lower trial quantities considered for a first order" }, // confirm
    applications: [
      "Filter press plates",
      "Vacuum belt filters",
      "Sugar and distillery filtration",
      "Chemical and mineral dewatering",
    ],
    images: [],
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
      { label: "Lead time", value: "15 – 25 days" }, // confirm
    ],
    moq: { value: "1,000 kg", note: "Per count and ply combination" }, // confirm
    applications: ["Industrial weaving", "Heavy stitching thread", "Rope and cordage", "Webbing"],
    images: [],
    swatch: { warp: "#E0D6BE", weft: "#CBBE9F", density: 18 },
  },
  {
    slug: "tarpaulin",
    name: "Tarpaulin",
    family: "Finished goods",
    availability: "in-production",
    summary:
      "Coated and laminated tarpaulin, hemmed and eyeleted to size for covers, sheeting and site protection.",
    body: [
      "Tarpaulin is supplied as finished sheets — cut to size, hemmed, rope-reinforced along the edge and fitted with eyelets at the pitch you specify.",
      "Fabric base, coating and colour are chosen against where the sheet will live: truck covers, grain and cement stacking, site sheeting or temporary roofing.",
    ],
    specs: [
      { label: "Base fabric", value: "Woven canvas or HDPE, coated" }, // confirm
      { label: "Weight range", value: "90 – 300 GSM" }, // confirm
      { label: "Sheet size", value: "Cut to buyer's size" },
      { label: "Edge", value: "Hemmed with rope reinforcement" },
      { label: "Eyelets", value: "Brass or aluminium, pitch to order" },
      { label: "Lead time", value: "15 – 25 days" }, // confirm
    ],
    moq: { value: "500 pieces", note: "Or 5,000 sq. m, whichever is reached first" }, // confirm
    applications: ["Truck and trailer covers", "Grain and cement stacking", "Site sheeting", "Temporary roofing"],
    images: [],
    swatch: { warp: "#7E8C74", weft: "#5F6B58", density: 30 },
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
      "We make to a drawing or to a standard pattern: frame tents, ridge tents, relief and disaster-shelter tents, and event marquee panels. Waterproofing, fire-retardant treatment and printing are available as add-ons.",
    ],
    specs: [
      { label: "Fabric", value: "In-house heavy canvas, treated" },
      { label: "Types", value: "Frame, ridge, relief shelter, event marquee" },
      { label: "Treatments", value: "Water-repellent, rot-proof, FR on request" },
      { label: "Stitching", value: "Double-lock seam with reinforced corners" },
      { label: "Lead time", value: "30 – 45 days depending on quantity" }, // confirm
    ],
    moq: { value: "100 units", note: "Fabric-only orders start at 3,000 metres" }, // confirm
    applications: ["Relief and disaster shelter", "Defence and field camps", "Events and weddings", "Storage shelters"],
    images: [],
    swatch: { warp: "#CFC3A6", weft: "#A79877", density: 22 },
  },
  {
    slug: "dyeing-and-coating",
    name: "Dyeing & coating",
    family: "Processing",
    availability: "in-production",
    summary:
      "Shade matching, water-repellent finishing and surface coating — on our fabric or on yours.",
    body: [
      "Our finishing line handles shade matching against a swatch or a Pantone reference, plus water-repellent, rot-proof and coated finishes.",
      "Job work is accepted: send greige fabric and we will dye, finish or coat it and return it to your rolling specification.",
    ],
    specs: [
      { label: "Services", value: "Dyeing, water-repellent finish, surface coating" },
      { label: "Shade matching", value: "Against physical swatch or Pantone reference" },
      { label: "Max width", value: "Up to 100 inches" }, // confirm
      { label: "Job work", value: "Accepted on buyer-supplied greige" },
      { label: "Lead time", value: "10 – 20 days" }, // confirm
    ],
    moq: { value: "2,000 metres", note: "Per shade" }, // confirm
    applications: ["Shade matching for repeat orders", "Water-repellent canvas", "Coated substrate prep"],
    images: [],
    swatch: { warp: "#B9A98C", weft: "#8C7F65", density: 34 },
  },

  /* ---------------- In development ---------------- */

  {
    slug: "wax-proof-cloth",
    name: "Wax-proof cloth",
    family: "Cloth",
    availability: "in-development",
    summary:
      "Wax-treated industrial canvas for weather resistance while keeping a breathable woven hand.",
    body: [
      "A wax-treated version of our heavy canvas, aimed at buyers who want weather resistance without the stiffness of a full coating.",
      "This is a development line. Processing capacity and the exact treatment are being finalised, so we take enquiries as sampling projects rather than stock orders — share your specification and we will tell you honestly where we stand.",
    ],
    specs: [
      { label: "Status", value: "In development — sampling on enquiry" },
      { label: "Base fabric", value: "In-house heavy canvas" },
      { label: "Treatment", value: "Wax finish, subject to processing availability" },
      { label: "Performance", value: "To be established against buyer's application" },
    ],
    moq: { value: "Sampling first", note: "Bulk MOQ set after the sample is approved" },
    applications: ["Weatherproof covers", "Outdoor gear fabric", "Heritage and marine canvas"],
    images: [],
    swatch: { warp: "#A89372", weft: "#7C6A4E", density: 24 },
  },
  {
    slug: "chemical-resistant-cloth",
    name: "Chemical-resistant cloth",
    family: "Cloth",
    availability: "in-development",
    summary:
      "Fabric built against a named chemical, concentration and temperature — not a generic claim.",
    body: [
      "Chemical resistance is only meaningful against a specific chemical at a specific concentration and temperature. We will not publish a blanket resistance claim.",
      "Tell us the medium, the concentration, the working temperature and the contact time. We will propose a fibre and construction, sample it, and let the test result decide.",
    ],
    specs: [
      { label: "Status", value: "In development — specification-led" },
      { label: "Resistance", value: "Established against the buyer's named application" },
      { label: "Fibre options", value: "Polypropylene, polyester and blends under evaluation" },
      { label: "Validation", value: "Sample testing before any bulk commitment" },
    ],
    moq: { value: "Sampling first", note: "Bulk MOQ set after test results" },
    applications: ["Chemical process filtration", "Plant covers in corrosive areas", "Bund and spill containment"],
    images: [],
    swatch: { warp: "#9FAFA4", weft: "#6F8076", density: 40 },
  },
  {
    slug: "pu-coated-cloth",
    name: "PU-coated cloth",
    family: "Cloth",
    availability: "in-development",
    summary:
      "Woven industrial base cloth engineered as a substrate for polyurethane coating.",
    body: [
      "Polyurethane coating only performs as well as the cloth underneath it. We are developing base constructions with the tear strength, evenness and surface finish a PU line needs.",
      "Buyers who coat in-house can take the base cloth alone. Buyers who want a finished coated fabric should share coat weight and end use so we can quote the full route.",
    ],
    specs: [
      { label: "Status", value: "In development — base cloth available for trials" },
      { label: "Base construction", value: "Plain or twill, engineered for coat adhesion" },
      { label: "Coating", value: "Polyurethane, coat weight to buyer spec" },
      { label: "Supply options", value: "Base cloth only, or coated finished fabric" },
    ],
    moq: { value: "Sampling first", note: "Base-cloth trial rolls available" },
    applications: ["Coated industrial fabric", "Inflatables and liners", "Technical upholstery substrate"],
    images: [],
    swatch: { warp: "#B0B7B2", weft: "#79837C", density: 36 },
  },
  {
    slug: "process-based-fabrics",
    name: "Process-based fabrics",
    family: "Cloth",
    availability: "in-development",
    summary:
      "Special-purpose fabric developed around one industrial process, from your drawing or sample.",
    body: [
      "Some fabrics exist only for one machine, one process or one plant. Conveyor sleeving, dryer fabric, lining cloth, guard cloth — the requirement comes from the process, not from a catalogue.",
      "Send a sample, a drawing or a description of what the fabric has to survive. We will tell you whether our looms can make it, and we will say so plainly if they cannot.",
    ],
    specs: [
      { label: "Status", value: "Made to order against a specification" },
      { label: "Input needed", value: "Sample, drawing or process description" },
      { label: "Loom capability", value: "Rapier, heavy-denier, up to 100 inches" }, // confirm
      { label: "Route", value: "Feasibility review → sample → bulk" },
    ],
    moq: { value: "Project-based", note: "Agreed at the feasibility stage" },
    applications: ["Process machinery fabric", "Conveyor and dryer cloth", "Guard and lining cloth"],
    images: [],
    swatch: { warp: "#C2BAA8", weft: "#8A8578", density: 32 },
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
