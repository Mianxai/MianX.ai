import { getSiteUrl } from "@/lib/site";

export default function sitemap() {
  const base = getSiteUrl();
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
