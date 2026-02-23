import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShareSection } from '@/components/layout/share-section';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import DisclaimerPage from '@/app/disclaimer/page';
import { siteConfig } from '@/config/site';

// Mock window.location
const mockLocation = {
    href: 'http://localhost:3000/',
};
vi.stubGlobal('location', mockLocation);

// Mock navigator.clipboard
const mockClipboard = {
    writeText: vi.fn().mockResolvedValue(undefined),
};
vi.stubGlobal('navigator', { clipboard: mockClipboard });

// Mock sonner toast
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('Legal Pages', () => {
    it('renders Privacy Policy heading', () => {
        render(<PrivacyPage />);
        expect(screen.getByRole('heading', { name: /Privacy Policy/i, level: 1 })).toBeInTheDocument();
    });

    it('renders Terms of Use heading', () => {
        render(<TermsPage />);
        expect(screen.getByRole('heading', { name: /Terms of Use/i, level: 1 })).toBeInTheDocument();
    });

    it('renders Disclaimer heading', () => {
        render(<DisclaimerPage />);
        expect(screen.getByRole('heading', { name: /Disclaimer/i, level: 1 })).toBeInTheDocument();
    });
});

describe('ShareSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders share section when enabled', () => {
        render(<ShareSection />);
        expect(screen.getByText(/Share this/i)).toBeInTheDocument();
        expect(screen.getByText(/Copy Link/i)).toBeInTheDocument();
    });

    it('copies link to clipboard when clicked', async () => {
        render(<ShareSection />);
        const copyBtn = screen.getByText(/Copy Link/i);
        fireEvent.click(copyBtn);
        expect(mockClipboard.writeText).toHaveBeenCalledWith(mockLocation.href);
    });

    it('has correct social share links', () => {
        render(<ShareSection />);
        const xLink = screen.getByRole('link', { name: /X/i });
        const redditLink = screen.getByRole('link', { name: /Reddit/i });
        const waLink = screen.getByRole('link', { name: /WhatsApp/i });

        const encodedUrl = encodeURIComponent(mockLocation.href);

        expect(xLink).toHaveAttribute('href', expect.stringContaining(encodedUrl));
        expect(redditLink).toHaveAttribute('href', expect.stringContaining(encodedUrl));
        expect(waLink).toHaveAttribute('href', expect.stringContaining(encodedUrl));
    });
});
