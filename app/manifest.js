import { getSiteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#060814",
    theme_color: "#060814",
    icons: [
      {
        src: "/brand/mx-icon-v2.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/mx-apple-touch-v2.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    id: getSiteUrl(),
  };
}
