/**
 * tests/branding-assets.test.ts
 *
 * Verifies that all required favicon / PWA / manifest files exist under /public,
 * the webmanifest is valid JSON with required PWA fields, and layout.tsx exports
 * metadata with the correct manifest path and icon arrays.
 *
 * Run with: npm test
 */

import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const PUBLIC = resolve(process.cwd(), "public");

/** All files that must exist for the favicon pack to be complete */
const REQUIRED_BRANDING_FILES = [
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "mstile-150x150.png",
    "browserconfig.xml",
] as const;

// ---------------------------------------------------------------------------
// 1. File presence
// ---------------------------------------------------------------------------
describe("Branding asset presence", () => {
    for (const file of REQUIRED_BRANDING_FILES) {
        it(`public/${file} exists`, () => {
            expect(existsSync(resolve(PUBLIC, file)), `Missing: public/${file}`).toBe(true);
        });
    }
});

// ---------------------------------------------------------------------------
// 2. Webmanifest content (Dynamic via manifest.ts)
// ---------------------------------------------------------------------------
describe("manifest.ts content", () => {
    it("returns valid manifest object with required PWA fields", async () => {
        const manifestModule = await import("../src/app/manifest");
        const manifest = manifestModule.default();

        expect(manifest).toHaveProperty("name");
        expect(manifest).toHaveProperty("short_name");
        expect(manifest).toHaveProperty("icons");
        expect(Array.isArray(manifest.icons)).toBe(true);
        expect(manifest.icons!.length).toBeGreaterThan(0);
        expect(manifest).toHaveProperty("theme_color");
        expect(manifest).toHaveProperty("background_color");
        expect(manifest).toHaveProperty("display");
    });

    it("references icons that actually exist on disk", async () => {
        const manifestModule = await import("../src/app/manifest");
        const manifest = manifestModule.default();

        for (const icon of manifest.icons as Array<{ src: string }>) {
            const relativePath = icon.src.replace(/^\//, "");
            expect(
                existsSync(resolve(PUBLIC, relativePath)),
                `Manifest icon not found on disk: ${icon.src}`
            ).toBe(true);
        }
    });
});

// ---------------------------------------------------------------------------
// 3. Config-driven metadata fields
// ---------------------------------------------------------------------------
describe("siteConfig branding fields (drive Next.js metadata)", () => {
    it("has siteName field", async () => {
        const { siteConfig } = await import("../src/config/site");
        expect(typeof siteConfig.siteName).toBe("string");
        expect(siteConfig.siteName.length).toBeGreaterThan(0);
    });

    it("has themeColorHex as a valid hex color", async () => {
        const { siteConfig } = await import("../src/config/site");
        expect(siteConfig.themeColorHex).toMatch(/^#[0-9a-fA-F]{3,6}$/);
    });

    it("has backgroundColorHex as a valid hex color", async () => {
        const { siteConfig } = await import("../src/config/site");
        expect(siteConfig.backgroundColorHex).toMatch(/^#[0-9a-fA-F]{3,6}$/);
    });

    it("layout.tsx source references correct icon paths", () => {
        const layoutSrc = readFileSync(resolve(process.cwd(), "src/app/layout.tsx"), "utf-8");
        expect(layoutSrc).toContain('"/favicon-16x16.png"');
        expect(layoutSrc).toContain('"/favicon-32x32.png"');
        expect(layoutSrc).toContain('"/apple-touch-icon.png"');
        expect(layoutSrc).toContain('"/favicon.ico"');
    });
});


