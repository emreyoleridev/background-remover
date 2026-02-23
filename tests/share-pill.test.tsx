import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SharePill } from '@/components/layout/share-pill';
import { getLogoUrl } from '@/lib/logos';
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

// Mock window.open
const mockOpen = vi.fn();
vi.stubGlobal('open', mockOpen);

// Mock localStorage
const mockStorage: Record<string, string> = {};
vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => mockStorage[key] || null),
    setItem: vi.fn((key, value) => { mockStorage[key] = value }),
});

// Mock siteConfig for testing different logo scenarios
vi.mock('@/config/site', async (importOriginal) => {
    const original: any = await importOriginal();
    return {
        ...original,
        siteConfig: {
            ...original.siteConfig,
            share: {
                ...original.siteConfig.share,
                logoProvider: {
                    ...original.siteConfig.share.logoProvider,
                    token: 'test_token',
                },
            },
        },
    };
});

describe('Logos library', () => {
    it('returns correct url with token from config', () => {
        expect(getLogoUrl('facebook.com')).toBe('https://img.logo.dev/facebook.com?token=test_token');
    });
});

describe('SharePill Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete mockStorage['share_pill_dismissed'];
    });

    it('renders enabled platforms from config', async () => {
        render(<SharePill />);
        // Wait for useEffect
        await waitFor(() => {
            expect(screen.getByText(/Check out this free tool/i)).toBeInTheDocument();
        });

        const facebookBtn = screen.getByLabelText(/Share on Facebook/i);
        expect(facebookBtn).toBeInTheDocument();
    });

    it('opens shareUrl platforms with correct encoded URL', async () => {
        render(<SharePill />);
        await waitFor(() => screen.getByLabelText(/Share on Facebook/i));

        const facebookBtn = screen.getByLabelText(/Share on Facebook/i);
        fireEvent.click(facebookBtn);

        expect(mockOpen).toHaveBeenCalledWith(
            expect.stringContaining(encodeURIComponent(mockLocation.href)),
            '_blank',
            'noopener,noreferrer'
        );
    });

    it('copies link and shows toast for copyLink', async () => {
        render(<SharePill />);
        await waitFor(() => screen.getByLabelText(/Share on Copy Link/i));

        const copyBtn = screen.getByLabelText(/Share on Copy Link/i);
        fireEvent.click(copyBtn);

        expect(mockClipboard.writeText).toHaveBeenCalledWith(mockLocation.href);
        const { toast } = await import('sonner');
        expect(toast.success).toHaveBeenCalledWith('Link copied to clipboard!');
    });

    it('hides pill on dismiss', async () => {
        render(<SharePill />);
        await waitFor(() => screen.getByLabelText(/Close share menu/i));

        const closeBtn = screen.getByLabelText(/Close share menu/i);
        fireEvent.click(closeBtn);

        // Should be hidden after timeout (using waitFor to handle the setTimeout in component)
        await waitFor(() => {
            expect(screen.queryByLabelText(/Close share menu/i)).not.toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('does not render if dismissed in localStorage', async () => {
        mockStorage['share_pill_dismissed'] = '1';
        render(<SharePill />);

        // Wait a bit to ensure useEffect had time
        await new Promise(r => setTimeout(r, 100));
        expect(screen.queryByText(/Check out this free tool/i)).not.toBeInTheDocument();
    });
});
