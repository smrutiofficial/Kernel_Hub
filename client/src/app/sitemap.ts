// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your blog posts (replace with your API or DB call)
  const res = await fetch("https://kernelhub-devsmrutii.vercel.app/api/posts");
  const posts: { slug: string; updatedAt: string }[] = await res.json();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://kernelhub-devsmruti.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kernelhub-devsmruti.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://kernelhub-devsmruti.vercel.app/resources",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://kernelhub-devsmruti.vercel.app/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}
