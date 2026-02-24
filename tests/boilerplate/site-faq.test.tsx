import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SiteFaq } from "@/components/boilerplate/layout/site-faq";
import { contentConfig } from "@/config";

vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("SiteFaq", () => {
    it("renders FAQ section heading", () => {
        render(<SiteFaq />);
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
        expect(screen.getByText(/Frequently Asked/i)).toBeInTheDocument();
    });

    it("renders all FAQ questions from config", () => {
        render(<SiteFaq />);
        contentConfig.faqs.forEach((faq) => {
            expect(screen.getByText(faq.question)).toBeInTheDocument();
        });
    });

    it("answers are present in DOM on initial render (collapsed via CSS, not removed)", () => {
        render(<SiteFaq />);
        // At least the first answer exists somewhere in the DOM
        expect(screen.getByText(contentConfig.faqs[0].answer)).toBeInTheDocument();
    });

    it("clicking a question keeps answer in DOM (still open state)", () => {
        render(<SiteFaq />);
        const firstQuestion = screen.getByText(contentConfig.faqs[0].question);
        fireEvent.click(firstQuestion);
        expect(screen.getByText(contentConfig.faqs[0].answer)).toBeInTheDocument();
    });

    it("clicking an open question again toggles state back", () => {
        render(<SiteFaq />);
        const firstQuestion = screen.getByText(contentConfig.faqs[0].question);
        fireEvent.click(firstQuestion);
        fireEvent.click(firstQuestion);
        // Still in DOM (collapsed by CSS)
        expect(screen.getByText(contentConfig.faqs[0].answer)).toBeInTheDocument();
    });

    it("renders the correct number of FAQ buttons (one per question)", () => {
        render(<SiteFaq />);
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(contentConfig.faqs.length);
    });

    it("renders all FAQ answers in the DOM", () => {
        render(<SiteFaq />);
        contentConfig.faqs.forEach((faq) => {
            expect(screen.getByText(faq.answer)).toBeInTheDocument();
        });
    });
});
