import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SiteFeatures } from "@/components/boilerplate/layout/site-features";
import { contentConfig } from "@/config";

vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("SiteFeatures", () => {
    it("renders the features badge", () => {
        render(<SiteFeatures />);
        expect(screen.getByText(contentConfig.features.badge)).toBeInTheDocument();
    });

    it("renders the section heading", () => {
        render(<SiteFeatures />);
        const heading = screen.getByRole("heading", { level: 2 });
        expect(heading).toBeInTheDocument();
        // The word is "Private" in config, not "Privacy"
        expect(heading.textContent).toContain("Private");
    });

    it("renders all feature card titles", () => {
        render(<SiteFeatures />);
        contentConfig.features.items.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });

    it("renders all feature card descriptions", () => {
        render(<SiteFeatures />);
        contentConfig.features.items.forEach((item) => {
            expect(screen.getByText(item.description)).toBeInTheDocument();
        });
    });

    it("renders the correct number of feature cards", () => {
        render(<SiteFeatures />);
        const headings = screen.getAllByRole("heading", { level: 3 });
        expect(headings).toHaveLength(contentConfig.features.items.length);
    });
});
