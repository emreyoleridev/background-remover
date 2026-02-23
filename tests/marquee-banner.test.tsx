import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MarqueeBanner } from "@/components/layout/marquee-banner";

// Mock the siteConfig
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config/site")>();
    return {
        ...actual,
        siteConfig: {
            ...actual.siteConfig,
            marquee: {
                enabled: true,
                text: "I build free tools every day. I build. I learn. I share. @emreyoleridev",
            },
        },
    };
});

describe("MarqueeBanner", () => {
    it("renders the marquee text when enabled", () => {
        render(<MarqueeBanner />);

        // The text is repeated, so we check if it's there
        // Since we split the text to highlight @emreyoleridev, we check for parts
        expect(screen.getAllByText(/I build free tools every day/i)).toHaveLength(6); // 3 repeats in content, 2 content copies = 6
        expect(screen.getAllByText(/@emreyoleridev/i)).toHaveLength(6);
    });

    it("does not render when disabled", async () => {
        // Re-mock for this specific test
        const { siteConfig } = await import("@/config/site");
        // @ts-ignore - modifying read-only property for test
        siteConfig.marquee.enabled = false;

        const { container } = render(<MarqueeBanner />);
        expect(container.firstChild).toBeNull();

        // Reset for other tests if any
        // @ts-ignore
        siteConfig.marquee.enabled = true;
    });
});
