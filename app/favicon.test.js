import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const root = process.cwd();

const ICO = "public/brand/mx-favicon-v2.ico";
const ICON = "public/brand/mx-icon-v2.png";
const APPLE = "public/brand/mx-apple-touch-v2.png";

describe("browser-tab-optimized MX favicon assets", () => {
  it("ships versioned brand favicon assets under public/brand/", () => {
    expect(existsSync(join(root, ICO))).toBe(true);
    expect(existsSync(join(root, ICON))).toBe(true);
    expect(existsSync(join(root, APPLE))).toBe(true);
    // App Router auto-icon files must be absent to avoid duplicate declarations.
    expect(existsSync(join(root, "app/favicon.ico"))).toBe(false);
    expect(existsSync(join(root, "app/icon.png"))).toBe(false);
    expect(existsSync(join(root, "app/apple-icon.png"))).toBe(false);
  });

  it("packs valid 16×16, 32×32 and 48×48 PNG frames into the ICO", () => {
    const data = readFileSync(join(root, ICO));
    expect(data.readUInt16LE(0)).toBe(0);
    expect(data.readUInt16LE(2)).toBe(1);
    const count = data.readUInt16LE(4);
    expect(count).toBe(3);
    const sizes = [];
    for (let i = 0; i < count; i++) {
      const off = 6 + i * 16;
      sizes.push(data.readUInt8(off));
      const frameOff = data.readUInt32LE(off + 12);
      expect(
        data
          .subarray(frameOff, frameOff + 8)
          .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
      ).toBe(true);
    }
    expect(sizes.sort((a, b) => a - b)).toEqual([16, 32, 48]);
  });

  it("has genuine transparency: corners alpha=0 and no opaque outer border", async () => {
    for (const [file, size] of [
      [ICON, 512],
      [APPLE, 180],
    ]) {
      const meta = await sharp(join(root, file)).metadata();
      expect(meta.width).toBe(size);
      expect(meta.height).toBe(size);
      expect(meta.hasAlpha).toBe(true);
      expect(meta.channels).toBeGreaterThanOrEqual(4);

      const { data, info } = await sharp(join(root, file))
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const alphaAt = (x, y) => data[(y * info.width + x) * info.channels + 3];

      for (const [x, y] of [
        [0, 0],
        [info.width - 1, 0],
        [0, info.height - 1],
        [info.width - 1, info.height - 1],
      ]) {
        expect(alphaAt(x, y)).toBe(0);
      }

      // Outer border must not be an opaque connected background.
      let opaqueBorder = 0;
      for (let x = 0; x < info.width; x++) {
        if (alphaAt(x, 0) > 0) opaqueBorder++;
        if (alphaAt(x, info.height - 1) > 0) opaqueBorder++;
      }
      for (let y = 0; y < info.height; y++) {
        if (alphaAt(0, y) > 0) opaqueBorder++;
        if (alphaAt(info.width - 1, y) > 0) opaqueBorder++;
      }
      expect(opaqueBorder).toBe(0);

      // Alpha bounding box should occupy most of the canvas width (landscape MX).
      let minX = info.width;
      let minY = info.height;
      let maxX = 0;
      let maxY = 0;
      let transparent = 0;
      let partial = 0;
      for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {
          const a = alphaAt(x, y);
          if (a === 0) transparent++;
          else if (a < 255) partial++;
          if (a > 20) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }
      const fillX = (maxX - minX + 1) / info.width;
      const fillY = (maxY - minY + 1) / info.height;
      // Fail if everything is opaque (grey square).
      expect(transparent / (info.width * info.height)).toBeGreaterThan(0.2);
      // Real alpha variation required.
      expect(partial + transparent).toBeGreaterThan(0);
      // Optical size: long axis ~90–94% (tiny canvases may be ~87.5% with 1px pad).
      expect(fillX).toBeGreaterThanOrEqual(0.87);
      expect(fillX).toBeLessThanOrEqual(0.96);
      expect(fillY).toBeGreaterThan(0.55);
    }
  });

  it("composites cleanly on dark navy without a grey rectangle", async () => {
    const navy = { r: 6, g: 8, b: 20 };
    const { data, info } = await sharp(join(root, ICON))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Sample four corner composites: must equal navy (fully transparent source).
    for (const [x, y] of [
      [0, 0],
      [info.width - 1, 0],
      [0, info.height - 1],
      [info.width - 1, info.height - 1],
    ]) {
      const i = (y * info.width + x) * info.channels;
      const a = data[i + 3] / 255;
      const r = Math.round(data[i] * a + navy.r * (1 - a));
      const g = Math.round(data[i + 1] * a + navy.g * (1 - a));
      const b = Math.round(data[i + 2] * a + navy.b * (1 - a));
      expect(r).toBe(navy.r);
      expect(g).toBe(navy.g);
      expect(b).toBe(navy.b);
    }
  });
});

describe("layout icon metadata (single authoritative config)", () => {
  it("points only at versioned brand assets and does not duplicate favicon.ico", async () => {
    const mod = await import("./layout.jsx");
    const icons = mod.metadata?.icons;
    expect(icons).toBeTruthy();
    const iconUrls = (icons.icon || []).map((i) => (typeof i === "string" ? i : i.url));
    const appleUrls = (icons.apple || []).map((i) => (typeof i === "string" ? i : i.url));
    expect(iconUrls).toEqual([
      "/brand/mx-favicon-v2.ico",
      "/brand/mx-icon-v2.png",
    ]);
    expect(appleUrls).toEqual(["/brand/mx-apple-touch-v2.png"]);
    // No unversioned /favicon.ico or /icon.png that collide with App Router files.
    expect(iconUrls.some((u) => u === "/favicon.ico" || u === "/icon.png")).toBe(false);
  });
});
