import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DiscoverMoreCTA } from "@/components/layout/discover-more-cta";
import { siteConfig } from "@/config/site";

// Mock the siteConfig
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config/site")>();
    return {
        ...actual,
        siteConfig: {
            ...actual.siteConfig,
            cta: {
                ...actual.siteConfig.cta,
                discoverMore: {
                    enabled: true,
                    title: "Like this tool?",
                    subtitle: "Discover more.",
                    href: "https://external.com",
                    external: true
                }
            }
        },
    };
});

describe("DiscoverMoreCTA", () => {
    beforeEach(() => {
        vi.stubGlobal("open", vi.fn());
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders when enabled=true", () => {
        render(<DiscoverMoreCTA />);
        expect(screen.getByLabelText(/discover more tools/i)).toBeInTheDocument();
        expect(screen.getByText("Like this tool?")).toBeInTheDocument();
        expect(screen.getByText("Discover more.")).toBeInTheDocument();
    });

    it("does not render when enabled=false", () => {
        // @ts-ignore - modifying read-only for test
        (siteConfig.cta.discoverMore as any).enabled = false;

        const { container } = render(<DiscoverMoreCTA />);
        expect(container).toBeEmptyDOMElement();

        // Reset for other tests
        // @ts-ignore
        (siteConfig.cta.discoverMore as any).enabled = true;
    });

    it("renders as an external link with target='_blank' if external=true", () => {
        render(<DiscoverMoreCTA />);
        const link = screen.getByRole("button");
        expect(link).toHaveAttribute("href", "https://external.com");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders as Link if external=false", () => {
        // Change mock
        // @ts-ignore
        (siteConfig.cta.discoverMore as any).external = false;
        // @ts-ignore
        (siteConfig.cta.discoverMore as any).href = "/internal-page";

        render(<DiscoverMoreCTA />);
        const link = screen.getByRole("button");
        expect(link).toHaveAttribute("href", "/internal-page");
        expect(link).not.toHaveAttribute("target");

        // Reset
        // @ts-ignore
        (siteConfig.cta.discoverMore as any).external = true;
        // @ts-ignore
        (siteConfig.cta.discoverMore as any).href = "https://external.com";
    });
});
