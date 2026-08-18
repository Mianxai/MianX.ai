import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { DEFAULT_SITE_URL, getSiteUrl, SITE_NAME } from "@/lib/site";
import { buildOrganizationJsonLd, metadata } from "@/lib/seo";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import manifest from "@/app/manifest";

describe("public launch SEO helpers", () => {
  it("falls back to the controlled Vercel production host", () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    const previousVercel = process.env.VERCEL_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;
    expect(getSiteUrl()).toBe(DEFAULT_SITE_URL);
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
    if (previousVercel === undefined) delete process.env.VERCEL_URL;
    else process.env.VERCEL_URL = previousVercel;
  });

  it("exposes canonical metadataBase, robots, openGraph and twitter cards", () => {
    expect(metadata.metadataBase).toBeInstanceOf(URL);
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.robots?.index).toBe(true);
    expect(metadata.openGraph?.images?.[0]?.url).toBe("/opengraph-image");
    expect(metadata.twitter?.card).toBe("summary_large_image");
    expect(metadata.icons?.icon?.map((i) => i.url)).toEqual([
      "/brand/mx-favicon-v2.ico",
      "/brand/mx-icon-v2.png",
    ]);
  });

  it("builds factual Organization/WebSite JSON-LD without invented ratings", () => {
    const json = buildOrganizationJsonLd();
    const blob = JSON.stringify(json);
    expect(json["@graph"]?.[0]?.["@type"]).toBe("Organization");
    expect(json["@graph"]?.[0]?.name).toBe(SITE_NAME);
    expect(blob).not.toMatch(/aggregateRating|reviewRating|telephone|streetAddress/i);
  });

  it("publishes robots.txt and sitemap helpers", () => {
    const robotsDoc = robots();
    expect(robotsDoc.rules.disallow).toEqual(
      expect.arrayContaining(["/admin", "/admin/", "/api/"])
    );
    expect(robotsDoc.sitemap).toMatch(/sitemap\.xml$/);
    const map = sitemap();
    expect(map[0].url).toMatch(/\/$/);
  });

  it("publishes a truthful web manifest", () => {
    const doc = manifest();
    expect(doc.name).toBe(SITE_NAME);
    expect(doc.theme_color).toBe("#060814");
    expect(doc.icons?.[0]?.src).toBe("/brand/mx-icon-v2.png");
  });

  it("ships Open Graph / Twitter image route modules and error pages", () => {
    const root = process.cwd();
    expect(existsSync(join(root, "app/opengraph-image.jsx"))).toBe(true);
    expect(existsSync(join(root, "app/twitter-image.jsx"))).toBe(true);
    expect(existsSync(join(root, "app/not-found.jsx"))).toBe(true);
    expect(existsSync(join(root, "app/error.jsx"))).toBe(true);
    expect(existsSync(join(root, "app/global-error.jsx"))).toBe(true);
  });
});
