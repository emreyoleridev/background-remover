import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SiteFeatures } from "@/components/layout/site-features";

// contentConfig is used internally by SiteFeatures
vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config")>();
    return {
        ...actual,
        contentConfig: {
            ...actual.contentConfig,
            features: {
                badge: "Why Choose Us",
                title: "Built for *Privacy*",
                subtitle: "Every tool runs entirely in your browser\nno servers, no tracking.",
                items: [
                    { title: "Client-Side Only", description: "Everything runs in your browser. No data is sent to a server.", icon: () => null },
                    { title: "Lightning Fast", description: "No loading screens. Instant execution.", icon: () => null },
                    { title: "100% Private", description: "No accounts, no tracking cookies, no data collection.", icon: () => null },
                ],
            },
        },
    };
});

describe("SiteFeatures", () => {
    it("renders the features badge", () => {
        render(<SiteFeatures />);
        expect(screen.getByText("Why Choose Us")).toBeInTheDocument();
    });

    it("renders the section heading", () => {
        render(<SiteFeatures />);
        // The title is split around asterisks; "Privacy" is the highlighted word
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
        expect(screen.getByText("Privacy")).toBeInTheDocument();
    });

    it("renders all feature card titles", () => {
        render(<SiteFeatures />);
        expect(screen.getByText("Client-Side Only")).toBeInTheDocument();
        expect(screen.getByText("Lightning Fast")).toBeInTheDocument();
        expect(screen.getByText("100% Private")).toBeInTheDocument();
    });

    it("renders all feature card descriptions", () => {
        render(<SiteFeatures />);
        expect(screen.getByText(/Everything runs in your browser/i)).toBeInTheDocument();
        expect(screen.getByText(/No loading screens/i)).toBeInTheDocument();
        expect(screen.getByText(/No accounts, no tracking cookies/i)).toBeInTheDocument();
    });

    it("renders the correct number of feature cards", () => {
        render(<SiteFeatures />);
        // 3 h3 headings = 3 feature card titles
        const headings = screen.getAllByRole("heading", { level: 3 });
        expect(headings).toHaveLength(3);
    });
});
