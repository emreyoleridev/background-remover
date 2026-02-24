import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/config";

// Mock next/link
vi.mock("next/link", () => ({
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode;[key: string]: any }) => (
        <a href={href} {...props}>{children}</a>
    ),
}));

describe("SiteFooter", () => {
    it("renders the author name", () => {
        render(<SiteFooter />);
        expect(screen.getByText(siteConfig.author.name)).toBeInTheDocument();
    });

    it("renders a link to the author's GitHub profile", () => {
        render(<SiteFooter />);
        const authorLink = screen.getByRole("link", { name: siteConfig.author.name });
        expect(authorLink).toBeInTheDocument();
        expect(authorLink.getAttribute("href")).toContain(siteConfig.author.socials.github);
    });

    it("renders social links", () => {
        render(<SiteFooter />);
        expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Twitter/i })).toBeInTheDocument();
    });

    it("appends ref query param to social links", () => {
        render(<SiteFooter />);
        const githubLink = screen.getByRole("link", { name: /^GitHub$/i });
        expect(githubLink.getAttribute("href")).toContain("ref=");
    });

    it("renders Privacy Policy link", () => {
        render(<SiteFooter />);
        expect(screen.getByRole("link", { name: /Privacy Policy/i })).toBeInTheDocument();
    });

    it("renders Terms of Service link", () => {
        render(<SiteFooter />);
        expect(screen.getByRole("link", { name: /Terms of Service/i })).toBeInTheDocument();
    });

    it("renders Disclaimer link", () => {
        render(<SiteFooter />);
        expect(screen.getByRole("link", { name: /Disclaimer/i })).toBeInTheDocument();
    });

    it("policy links have correct hrefs", () => {
        render(<SiteFooter />);
        expect(screen.getByRole("link", { name: /Privacy Policy/i })).toHaveAttribute("href", "/privacy");
        expect(screen.getByRole("link", { name: /Terms of Service/i })).toHaveAttribute("href", "/terms");
        expect(screen.getByRole("link", { name: /Disclaimer/i })).toHaveAttribute("href", "/disclaimer");
    });
});
