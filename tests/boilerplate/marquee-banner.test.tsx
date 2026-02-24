import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MarqueeBanner } from "@/components/boilerplate/layout/marquee-banner";
import { contentConfig } from "@/config";

vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("MarqueeBanner", () => {
    it("renders the marquee text when enabled", () => {
        render(<MarqueeBanner />);
        // Marquee text is duplicated so check at least one occurrence
        const textElements = screen.getAllByText(new RegExp(
            contentConfig.marquee.text.split(".")[0].trim(), "i"
        ));
        expect(textElements.length).toBeGreaterThan(0);
    });

    it("renders the platform link correctly", () => {
        render(<MarqueeBanner />);
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThan(0);
        const platformLink = links.find(
            (l) => l.textContent?.includes(contentConfig.marquee.platform.label)
        );
        expect(platformLink).toBeTruthy();
        expect(platformLink?.getAttribute("href")).toContain(contentConfig.marquee.platform.url);
        expect(platformLink).toHaveAttribute("target", "_blank");
    });
});
