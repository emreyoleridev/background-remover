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
                    label: "Have a Tool Idea? ✨",
                    description: "Tell me what to build next, and I'll make it happen!",
                    url: "https://builtbyemre.userjot.com/",
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
        expect(screen.queryByLabelText(/request a tool/i)).not.toBeInTheDocument();
    });

    it("renders after 5000ms if no scroll occurred", async () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(screen.getByLabelText(/request a tool/i)).toBeInTheDocument();
        expect(screen.getByText(/Have a Tool Idea/i)).toBeInTheDocument();
    });

    it("does not render if scroll occurs before timer ends", async () => {
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

        expect(screen.queryByLabelText(/request a tool/i)).not.toBeInTheDocument();
    });

    it("opens configured URL when clicked", async () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        // The notification is now wrapped in motion.div, then a div with onClick
        const notification = screen.getByRole("alert");
        const clickable = notification.querySelector('div[class*="cursor-pointer"]');

        if (clickable) {
            fireEvent.click(clickable);
        }

        expect(window.open).toHaveBeenCalledWith(
            "https://builtbyemre.userjot.com/",
            "_blank",
            "noopener,noreferrer"
        );
    });

    it("has correct aria-label for swipe-right dismissal", async () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(screen.getByLabelText(/swipe right to dismiss/i)).toBeInTheDocument();
    });
});
