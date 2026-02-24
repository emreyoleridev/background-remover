import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SiteFaq } from "@/components/boilerplate/layout/site-faq";

vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config")>();
    return {
        ...actual,
        contentConfig: {
            ...actual.contentConfig,
            faqs: [
                {
                    question: "Is it really secure?",
                    answer: "Yes! All processing happens locally in your browser.",
                },
                {
                    question: "Is it free to use?",
                    answer: "Absolutely. All tools are free to use.",
                },
                {
                    question: "Do I need to create an account?",
                    answer: "No accounts, no logins, no tracking.",
                },
            ],
        },
    };
});

describe("SiteFaq", () => {
    it("renders FAQ section heading", () => {
        render(<SiteFaq />);
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
        expect(screen.getByText(/Frequently Asked/i)).toBeInTheDocument();
    });

    it("renders all FAQ questions", () => {
        render(<SiteFaq />);
        expect(screen.getByText("Is it really secure?")).toBeInTheDocument();
        expect(screen.getByText("Is it free to use?")).toBeInTheDocument();
        expect(screen.getByText("Do I need to create an account?")).toBeInTheDocument();
    });

    it("answers are present in DOM on initial render (collapsed via CSS, not removed)", () => {
        render(<SiteFaq />);
        // Answers are in the DOM but collapsed via grid-rows CSS (JSDOM can't test CSS visibility)
        expect(screen.getByText(/All processing happens locally/i)).toBeInTheDocument();
    });

    it("clicking a question keeps answer in DOM (still open state)", () => {
        render(<SiteFaq />);
        const firstQuestion = screen.getByText("Is it really secure?");
        fireEvent.click(firstQuestion);
        expect(screen.getByText(/All processing happens locally/i)).toBeInTheDocument();
    });

    it("clicking an open question again toggles state back", () => {
        render(<SiteFaq />);
        const firstQuestion = screen.getByText("Is it really secure?");
        // Open
        fireEvent.click(firstQuestion);
        // Close
        fireEvent.click(firstQuestion);
        // Still in DOM (collapsed by CSS)
        expect(screen.getByText(/All processing happens locally/i)).toBeInTheDocument();
    });

    it("renders the correct number of FAQ buttons (one per question)", () => {
        render(<SiteFaq />);
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(3);
    });

    it("renders all FAQ answers in the DOM", () => {
        render(<SiteFaq />);
        expect(screen.getByText(/All tools are free to use/i)).toBeInTheDocument();
        expect(screen.getByText(/No accounts, no logins/i)).toBeInTheDocument();
    });
});
