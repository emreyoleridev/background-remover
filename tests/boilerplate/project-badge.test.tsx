import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectBadge } from "@/components/layout/project-badge";
import { siteConfig } from "@/config";

// Mock the siteConfig
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config")>();
    return {
        ...actual,
        siteConfig: {
            ...actual.siteConfig,
            buildMeta: {
                enabled: true,
                buildDay: 42,
                startedAt: "2024-12-12",
            },
        },
    };
});

describe("ProjectBadge", () => {
    beforeEach(() => {
        // Reset siteConfig values for each test
        // @ts-ignore
        siteConfig.buildMeta.enabled = true;
        // @ts-ignore
        siteConfig.buildMeta.buildDay = 42;
        // @ts-ignore
        siteConfig.buildMeta.startedAt = "2024-12-12";
    });

    it("renders the correct project number and formatted date from config", () => {
        render(<ProjectBadge />);
        // Use regex to find text regardless of casing/tags
        expect(screen.getByText(/42/)).toBeDefined();
        // 2024-12-12 should be formatted as 12 December 2024
        expect(screen.getByText(/12 December 2024/)).toBeDefined();
    });

    it("does not render when disabled", () => {
        // @ts-ignore
        siteConfig.buildMeta.enabled = false;
        const { container } = render(<ProjectBadge />);
        expect(container.firstChild).toBeNull();
    });
});
