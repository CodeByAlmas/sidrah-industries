import { site } from "@/data/site";
import type { Product } from "@/data/products";

/** Builds a wa.me deep link with a pre-written enquiry the buyer can send in one tap. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productQuoteLink(product: Product) {
  return whatsappLink(
    [
      `Hello ${site.name},`,
      ``,
      `I would like a quotation for: ${product.name}`,
      `Listed MOQ: ${product.moq.value}`,
      ``,
      `Quantity required: `,
      `Specification / width / GSM: `,
      `Delivery country & port: `,
      `Company name: `,
    ].join("\n"),
  );
}

export function generalQuoteLink() {
  return whatsappLink(
    [
      `Hello ${site.name},`,
      ``,
      `I found your website and would like to discuss a requirement.`,
      ``,
      `Product of interest: `,
      `Quantity: `,
      `Company & country: `,
    ].join("\n"),
  );
}
