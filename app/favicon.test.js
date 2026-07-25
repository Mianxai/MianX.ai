import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const root = process.cwd();

describe("crystal-clear MX favicon assets", () => {
  it("ships favicon.ico, icon.png and apple-icon.png under app/", () => {
    expect(existsSync(join(root, "app/favicon.ico"))).toBe(true);
    expect(existsSync(join(root, "app/icon.png"))).toBe(true);
    expect(existsSync(join(root, "app/apple-icon.png"))).toBe(true);
  });

  it("packs 16×16, 32×32 and 48×48 PNG frames into favicon.ico", () => {
    const data = readFileSync(join(root, "app/favicon.ico"));
    expect(data.readUInt16LE(0)).toBe(0);
    expect(data.readUInt16LE(2)).toBe(1);
    const count = data.readUInt16LE(4);
    expect(count).toBe(3);
    const sizes = [];
    for (let i = 0; i < count; i++) {
      const off = 6 + i * 16;
      sizes.push(data.readUInt8(off));
      const frameOff = data.readUInt32LE(off + 12);
      expect(data.subarray(frameOff, frameOff + 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    }
    expect(sizes.sort((a, b) => a - b)).toEqual([16, 32, 48]);
  });

  it("keeps square transparent icon.png and apple-icon.png", async () => {
    for (const [file, size] of [
      ["app/icon.png", 512],
      ["app/apple-icon.png", 180],
    ]) {
      const meta = await sharp(join(root, file)).metadata();
      expect(meta.width).toBe(size);
      expect(meta.height).toBe(size);
      expect(meta.hasAlpha).toBe(true);

      const { data, info } = await sharp(join(root, file))
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      for (const [x, y] of [
        [0, 0],
        [info.width - 1, 0],
        [0, info.height - 1],
        [info.width - 1, info.height - 1],
      ]) {
        const i = (y * info.width + x) * info.channels;
        expect(data[i + 3]).toBe(0);
      }
    }
  });
});

describe("layout icon metadata", () => {
  it("declares an authoritative icons block pointing at the MX assets", async () => {
    const mod = await import("./layout.jsx");
    const icons = mod.metadata?.icons;
    expect(icons).toBeTruthy();
    const iconUrls = (icons.icon || []).map((i) => (typeof i === "string" ? i : i.url));
    expect(iconUrls).toContain("/favicon.ico");
    expect(iconUrls).toContain("/icon.png");
    const appleUrls = (icons.apple || []).map((i) => (typeof i === "string" ? i : i.url));
    expect(appleUrls).toContain("/apple-icon.png");
  });
});
