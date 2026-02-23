import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SharePill } from '@/components/layout/share-pill';
import { getLogoUrl } from '@/lib/logos';
import { siteConfig } from '@/config/site';
import { TooltipProvider } from '@/components/ui/tooltip';

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
            integrations: {
                ...original.siteConfig.integrations,
                share: {
                    ...original.siteConfig.integrations.share,
                    token: 'test_token',
                    platforms: [
                        { id: 'facebook', name: 'Facebook', domain: 'facebook.com', template: 'https://facebook.com/{url}', enabled: true },
                        { id: 'copyLink', name: 'Copy Link', domain: '', template: '', enabled: true }
                    ]
                },
            },
        },
    };
});

describe('Logos library', () => {
    it('returns correct url with token from config', () => {
        expect(getLogoUrl('facebook.com')).toBe('https://img.logo.dev/facebook.com?token=test_token&format=png');
    });
});

describe('SharePill Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete mockStorage['share_pill_dismissed'];
    });

    it('renders enabled platforms from config', async () => {
        render(
            <TooltipProvider>
                <SharePill />
            </TooltipProvider>
        );
        // Wait for mounted state
        await waitFor(() => {
            expect(screen.getByLabelText(/Share this page/i)).toBeInTheDocument();
        });

        const facebookBtn = screen.getByLabelText(/Share on Facebook/i);
        expect(facebookBtn).toBeInTheDocument();
    });

    it('opens shareUrl platforms with correct encoded URL', async () => {
        render(
            <TooltipProvider>
                <SharePill />
            </TooltipProvider>
        );
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
        render(
            <TooltipProvider>
                <SharePill />
            </TooltipProvider>
        );
        await waitFor(() => screen.getByLabelText(/Share on Copy Link/i));

        const copyBtn = screen.getByLabelText(/Share on Copy Link/i);
        fireEvent.click(copyBtn);

        expect(mockClipboard.writeText).toHaveBeenCalledWith(mockLocation.href);
        const { toast } = await import('sonner');
        expect(toast.success).toHaveBeenCalledWith('Link copied to clipboard!');
    });
});
