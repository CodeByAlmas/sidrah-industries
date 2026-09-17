import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/products", "/infrastructure", "/about", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.siteUrl}${route}`,
      lastModified: now,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.siteUrl}/products/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
