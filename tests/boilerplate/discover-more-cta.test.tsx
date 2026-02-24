import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DiscoverMoreCTA, triggerDiscoverMoreCTA } from "@/components/boilerplate/layout/discover-more-cta";
import { contentConfig } from "@/config";

vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

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

    it("renders after trigger event + delay", () => {
        render(<DiscoverMoreCTA />);

        act(() => {
            triggerDiscoverMoreCTA();
            vi.advanceTimersByTime(5001);
        });

        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(screen.getByText(contentConfig.cta.discoverMore.title)).toBeInTheDocument();
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
        expect(discoverLink.getAttribute("href")).toContain(contentConfig.cta.discoverMore.href);
        expect(discoverLink).toHaveAttribute("target", "_blank");
    });

    it("renders Give Feedback link pointing to requestTool url", () => {
        render(<DiscoverMoreCTA />);

        act(() => {
            triggerDiscoverMoreCTA();
            vi.advanceTimersByTime(5001);
        });

        const feedbackLink = screen.getByText("Give Feedback");
        expect(feedbackLink.getAttribute("href")).toContain(contentConfig.cta.requestTool.url);
    });
});
