import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DiscoverMoreCTA, triggerDiscoverMoreCTA } from "@/components/boilerplate/layout/discover-more-cta";

// Mock contentConfig.cta.discoverMore and requestTool
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config")>();
    return {
        ...actual,
        contentConfig: {
            ...actual.contentConfig,
            cta: {
                requestTool: {
                    enabled: true,
                    label: "Have a tool idea? ✨",
                    description: "Tell me what to build next, I'll make it happen!",
                    url: "https://builtbyemre.userjot.com/",
                    icon: null,
                    delayMs: 5000,
                },
                discoverMore: {
                    enabled: true,
                    title: "Like this tool?",
                    subtitle: "I build a new one every day. Discover more of my total collection.",
                    href: "https://external.com",
                    icon: null,
                    external: true
                }
            }
        },
    };
});

describe("DiscoverMoreCTA", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.stubGlobal("open", vi.fn());
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("does not render on initial load (before trigger)", () => {
        render(<DiscoverMoreCTA />);
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("renders after trigger event + 5 second delay", () => {
        render(<DiscoverMoreCTA />);

        act(() => {
            triggerDiscoverMoreCTA();
            vi.advanceTimersByTime(5001);
        });

        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(screen.getByText("Like this tool?")).toBeInTheDocument();
        expect(screen.getByText(/Discover more of my total collection/i)).toBeInTheDocument();
    });

    it("does not render without trigger even after delay", () => {
        render(<DiscoverMoreCTA />);

        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("renders Discover more link with href from config", () => {
        render(<DiscoverMoreCTA />);

        act(() => {
            triggerDiscoverMoreCTA();
            vi.advanceTimersByTime(5001);
        });

        const discoverLink = screen.getByText("Discover more");
        expect(discoverLink.getAttribute("href")).toContain("https://external.com");
        expect(discoverLink).toHaveAttribute("target", "_blank");
        expect(discoverLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders Give Feedback link pointing to requestTool url", () => {
        render(<DiscoverMoreCTA />);

        act(() => {
            triggerDiscoverMoreCTA();
            vi.advanceTimersByTime(5001);
        });

        const feedbackLink = screen.getByText("Give Feedback");
        expect(feedbackLink.getAttribute("href")).toContain("https://builtbyemre.userjot.com/");
    });
});
