// app/sitemap.ts
import { MetadataRoute } from "next";
import connectDB from "@/app/backend/lib/db/db"; // your db connection
import Post from "@/app/backend/models/Post.model"; // your Mongoose post model

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  const posts = await Post.find({}, "slug updatedAt").lean();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://kernelhub-devsmrutii.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kernelhub-devsmrutii.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://kernelhub-devsmrutii.vercel.app/resources",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://kernelhub-devsmrutii.vercel.app/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}
