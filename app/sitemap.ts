import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { products } from "@/lib/products";
import { mortgageProtection } from "@/lib/mortgageProtection";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...products.map((p) => ({
      url: `${site.url}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${site.url}/${mortgageProtection.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    { url: `${site.url}/book`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/get-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
