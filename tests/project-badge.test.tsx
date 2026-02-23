import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectBadge } from "@/components/layout/project-badge";
import { siteConfig } from "@/config/site";

// Mock the siteConfig
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config/site")>();
    return {
        ...actual,
        siteConfig: {
            ...actual.siteConfig,
            buildMeta: {
                enabled: true,
                projectNumber: 27,
                buildDay: 42,
                startedAt: "2025-01-01",
                autoCalculateDay: false
            },
        },
    };
});

describe("ProjectBadge", () => {
    beforeEach(() => {
        vi.useRealTimers();
        // Reset siteConfig values for each test
        // @ts-ignore
        siteConfig.buildMeta.enabled = true;
        // @ts-ignore
        siteConfig.buildMeta.autoCalculateDay = false;
        // @ts-ignore
        siteConfig.buildMeta.buildDay = 42;
    });

    it("renders the correct project number and day from config", () => {
        render(<ProjectBadge />);
        expect(screen.getByText(/Project #27/i)).toBeDefined();
        expect(screen.getByText(/Day 42/i)).toBeDefined();
    });

    it("does not render when disabled", () => {
        // @ts-ignore
        siteConfig.buildMeta.enabled = false;
        const { container } = render(<ProjectBadge />);
        expect(container.firstChild).toBeNull();
    });

    it("calculates day correctly when autoCalculateDay is true", () => {
        // Set fixed "today" to 2025-01-10
        const mockDate = new Date("2025-01-10T12:00:00Z");
        vi.useFakeTimers();
        vi.setSystemTime(mockDate);

        // @ts-ignore
        siteConfig.buildMeta.autoCalculateDay = true;
        // @ts-ignore
        siteConfig.buildMeta.startedAt = "2025-01-01";

        render(<ProjectBadge />);

        // Jan 1 to Jan 10 is 9 days diff + 1 = Day 10
        expect(screen.getByText(/Day 10/i)).toBeDefined();

        vi.useRealTimers();
    });
});
