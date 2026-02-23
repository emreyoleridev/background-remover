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
                text: "I build free tools every day. I build. I learn. I share.",
                platform: {
                    label: "@emreyoleridev",
                    url: "https://x.com/emreyoleridev"
                }
            },
        },
    };
});

describe("MarqueeBanner", () => {
    it("renders the marquee text when enabled", () => {
        render(<MarqueeBanner />);

        // We check for the main text
        expect(screen.getAllByText(/I build free tools every day/i).length).toBeGreaterThan(0);

        // Check for the platform link
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
        expect(links[0]).toHaveTextContent("@emreyoleridev");
        expect(links[0]).toHaveAttribute("href", "https://x.com/emreyoleridev");
        expect(links[0]).toHaveAttribute("target", "_blank");
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
