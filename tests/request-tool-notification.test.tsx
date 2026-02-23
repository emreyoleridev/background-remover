import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RequestToolNotification } from "@/components/layout/request-tool-notification";

// Mock the siteConfig
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config/site")>();
    return {
        ...actual,
        siteConfig: {
            ...actual.siteConfig,
            cta: {
                requestTool: {
                    enabled: true,
                    label: "Have a tool idea? ✨",
                    description: "Tell me what to build next, I'll make it happen!",
                    url: "https://builtbyemre.userjot.com/",
                    icon: null,
                    delayMs: 5000,
                },
            },
        },
    };
});

describe("RequestToolNotification", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // Mock window.open
        vi.stubGlobal("open", vi.fn());
        // Mock window.scrollY
        vi.stubGlobal("scrollY", 0);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it("does not render immediately on load", () => {
        render(<RequestToolNotification />);
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("renders after 5000ms if no scroll occurred", () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5001);
        });

        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        // The title text appears twice due to the shine effect
        expect(screen.getAllByText(/Have a tool idea/i)[0]).toBeInTheDocument();
    });

    it("does not render if scroll occurs before timer ends", () => {
        render(<RequestToolNotification />);

        // Simulate scroll
        act(() => {
            vi.stubGlobal("scrollY", 100);
            fireEvent.scroll(window);
        });

        // Advance timers
        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("opens configured URL when clicked", () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5001);
        });

        const clickable = screen.getByRole("button", { name: /open request tool/i });
        fireEvent.click(clickable);

        expect(window.open).toHaveBeenCalledWith(
            "https://builtbyemre.userjot.com/",
            "_blank",
            "noopener,noreferrer"
        );
    });

    it("has correct aria-label for swipe-right dismissal", () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5001);
        });

        const alert = screen.getByRole("alert");
        expect(alert).toHaveAttribute("aria-label", expect.stringMatching(/swipe right to dismiss/i));
    });
});
