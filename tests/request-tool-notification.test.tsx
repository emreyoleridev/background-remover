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
                    label: "Request a Tool",
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
        expect(screen.getByText("Request a Tool")).toBeInTheDocument();
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

        // The clickable area is the first div inside the wrapper
        const clickable = screen.getByText("Request a Tool").closest('div[class*="cursor-pointer"]');
        if (clickable) {
            fireEvent.click(clickable);
        }

        expect(window.open).toHaveBeenCalledWith(
            "https://builtbyemre.userjot.com/",
            "_blank",
            "noopener,noreferrer"
        );
    });

    it("dismisses when X is clicked", async () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        const closeButton = screen.getByLabelText(/dismiss notification/i);
        fireEvent.click(closeButton);

        expect(screen.queryByLabelText(/request a tool/i)).not.toBeInTheDocument();
    });
});
