/**
 * SINGLE SOURCE OF TRUTH for company details.
 * Change values here and they update across the whole website.
 */

export const site = {
  name: "Sidrah Industries",
  legalName: "Sidrah Industries",
  tagline: "Industrial woven fabric and multiple-ply yarn, made in Unnao.",
  description:
    "Sidrah Industries manufactures heavy canvas, filter cloth, tarpaulin, tents and multiple-ply yarn on rapier looms at Magarwara, Unnao, Uttar Pradesh. Bulk supply and custom constructions for Indian and export buyers.",

  address: {
    line1: "Magarwara",
    city: "Unnao",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "209801", // TODO: confirm PIN code with client
  },

  /** Digits only, country code first. No +, no spaces. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 90000 00000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@sidrahindustries.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sidrahindustries.com",

  /** Shown on the home page as the production capability strip. Source: company profile. */
  capacity: {
    cloth: { value: "50,000", unit: "metres / month", label: "Woven cloth" },
    yarn: { value: "60,000–70,000", unit: "kg / month", label: "Multiple-ply yarn" },
  },

  machinery: [
    {
      name: "Nova Pignone rapier looms",
      note: "Weft insertion by rapier, suited to heavy-denier industrial constructions and wide-width canvas.",
    },
    {
      name: "Multiple-ply twisting",
      note: "In-house ply yarn production feeding the weaving floor, so warp quality stays under one roof.",
    },
    {
      name: "Dyeing and coating",
      note: "Shade matching and surface treatment for tarpaulin, tent and coated fabric orders.",
    },
  ],

  /** Export focus — used on the home page and About. */
  markets: [
    { region: "Germany & EU", note: "Filter media, canvas and coated substrate enquiries" },
    { region: "India", note: "Tarpaulin, tent fabric and industrial cloth supply" },
    { region: "Middle East & Africa", note: "Open for new distribution partners" },
  ],

  nav: [
    { label: "Products", href: "/products" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;