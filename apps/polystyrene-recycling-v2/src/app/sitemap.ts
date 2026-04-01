import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://polystyrene-recycling.vercel.app";
  const pages = ["/", "/about", "/how-to-recycle", "/quiz", "/games", "/fun-facts", "/blog", "/myths-vs-facts", "/environmental-impact", "/contact"];
  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
