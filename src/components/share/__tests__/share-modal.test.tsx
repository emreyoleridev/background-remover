import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ShareModal, triggerShareModal } from "../share-modal";
import { act } from "react";

// Mock matchMedia for Dialog
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock ResizeObserver for Dialog
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

describe("ShareModal", () => {
    beforeEach(() => {
        // Mock clipboard API
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
        });
    });

    it("should open when triggerShareModal is called", async () => {
        render(<ShareModal />);

        expect(screen.queryByText(/Share this tool/i)).not.toBeInTheDocument();

        await act(async () => {
            triggerShareModal("https://example.com");
        });

        expect(await screen.findByText((content, element) => {
            return element?.tagName.toLowerCase() === 'h2' && /Share this tool/i.test(element.textContent || '');
        })).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        expect(input).toHaveValue("https://example.com");
    });

    it("should open with window location if no url passed", async () => {
        // Mock window location
        Object.defineProperty(window, "location", {
            value: { href: "http://localhost:3000/" },
            writable: true,
        });

        render(<ShareModal />);

        await act(async () => {
            triggerShareModal();
        });

        expect(await screen.findByRole("textbox")).toHaveValue("http://localhost:3000/");
    });

    it("should copy text to clipboard when copy button is clicked", async () => {
        render(<ShareModal />);

        await act(async () => {
            triggerShareModal("https://example.com");
        });

        const copyBtn = await screen.findByRole("button", { name: "Copy link" });
        fireEvent.click(copyBtn);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://example.com");
    });
});
