import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RequestToolNotification } from "@/components/boilerplate/layout/request-tool-notification";
import { contentConfig } from "@/config";

vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("RequestToolNotification", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.stubGlobal("open", vi.fn());
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

    it("renders after configured delay if no scroll occurred", () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime((contentConfig.cta.requestTool.delayMs ?? 5000) + 100);
        });

        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(screen.getAllByText(new RegExp(contentConfig.cta.requestTool.label.split("?")[0], "i"))[0]).toBeInTheDocument();
    });

    it("does not render immediately without timer advancing", () => {
        render(<RequestToolNotification />);
        // Without advancing timers, the notification should not appear
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("opens configured URL when clicked", () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime((contentConfig.cta.requestTool.delayMs ?? 5000) + 100);
        });

        const clickable = screen.getByRole("button", { name: /open request tool/i });
        fireEvent.click(clickable);

        expect(window.open).toHaveBeenCalledWith(
            expect.stringContaining(contentConfig.cta.requestTool.url),
            "_blank",
            "noopener,noreferrer"
        );
    });

    it("has correct aria-label for swipe-right dismissal", () => {
        render(<RequestToolNotification />);

        act(() => {
            vi.advanceTimersByTime((contentConfig.cta.requestTool.delayMs ?? 5000) + 100);
        });

        const alert = screen.getByRole("alert");
        expect(alert).toHaveAttribute("aria-label", expect.stringMatching(/swipe right to dismiss/i));
    });
});
