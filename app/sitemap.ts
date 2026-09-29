import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";
import { getBaseSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseSiteUrl();
  const currentDate = new Date().toISOString();

  // Core static routes for both Arabic & English
  const staticRoutes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/en", priority: 1.0, changeFrequency: "daily" },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" },
    { path: "/en/gallery", priority: 0.8, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.8, changeFrequency: "weekly" },
    { path: "/en/faq", priority: 0.8, changeFrequency: "weekly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic project routes for both Arabic & English
  const projectSlugs = Object.keys(projectsData);
  const projectEntries: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]);

  return [...staticEntries, ...projectEntries];
}
