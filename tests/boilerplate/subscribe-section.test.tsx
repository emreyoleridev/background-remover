import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SubscribeSection } from "@/components/boilerplate/layout/subscribe-section";

vi.mock("@/config/site", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/config")>();
    return {
        ...actual,
        siteConfig: {
            ...actual.siteConfig,
            integrations: {
                ...actual.siteConfig.integrations,
                subscribe: {
                    enabled: true,
                    delaySecondsAfterSuccess: 2,
                    googleSheetsEndpoint: "",
                },
            },
        },
    };
});

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("SubscribeSection", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the email input and submit button", () => {
        render(<SubscribeSection />);
        expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Submit email/i })).toBeInTheDocument();
    });

    it("renders heading text", () => {
        render(<SubscribeSection />);
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
        render(<SubscribeSection />);

        const input = screen.getByPlaceholderText(/Enter your email/i);
        const submitBtn = screen.getByRole("button", { name: /Submit email/i });

        fireEvent.change(input, { target: { value: "not-an-email" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
        });
    });

    it("shows toast error when endpoint is not configured", async () => {
        render(<SubscribeSection />);

        const input = screen.getByPlaceholderText(/Enter your email/i);
        const submitBtn = screen.getByRole("button", { name: /Submit email/i });

        fireEvent.change(input, { target: { value: "test@example.com" } });
        fireEvent.click(submitBtn);

        const { toast } = await import("sonner");
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Subscribe endpoint not configured yet.");
        });
    });

    it("does not render when enabled=false", async () => {
        const { siteConfig } = await import("@/config");
        // @ts-ignore
        siteConfig.integrations.subscribe.enabled = false;

        const { container } = render(<SubscribeSection />);
        expect(container.firstChild).toBeNull();

        // Reset
        // @ts-ignore
        siteConfig.integrations.subscribe.enabled = true;
    });
});
