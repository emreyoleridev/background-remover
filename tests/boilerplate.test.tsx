import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteHero } from '@/components/layout/site-hero';
import { SubscribeModal, triggerSubscribeModal } from '@/components/common/subscribe-modal';
import { BuyMeACoffeeWidget } from '@/components/common/buymeacoffee-widget';
import { siteConfig } from '@/config/site';

vi.mock('next-themes', () => ({
    useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('next/script', () => ({
    default: (props: React.HTMLAttributes<HTMLDivElement>) => <div data-testid="next-script" {...props} />
}));

vi.mock('@/components/ui/dialog', () => ({
    Dialog: ({ children, open, onOpenChange }: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => (
        <div data-testid="dialog" data-state={open ? 'open' : 'closed'}>
            {open && (
                <>
                    {children}
                    <button aria-label="close" onClick={() => onOpenChange(false)}>Close</button>
                </>
            )}
        </div>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock ResizeObserver
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.ResizeObserver = ResizeObserver;

describe('Tool Boilerplate Components', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('1) Renders header with brand name and "Fork" GitHub button', () => {
        render(<SiteHeader />);
        expect(screen.getByText(siteConfig.siteName)).toBeInTheDocument();
        expect(screen.getByText('Fork')).toBeInTheDocument();
        expect(screen.getByText('Fork').closest('a')).toHaveAttribute('href', siteConfig.githubForkUrl);
    });

    it('2) Theme toggle exists', () => {
        render(<SiteHeader />);
        expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    });

    it('3) Hero renders badge + title lines', () => {
        render(<SiteHero />);
        expect(screen.getByText(siteConfig.heroBadgeText)).toBeInTheDocument();
        expect(screen.getByText(siteConfig.heroTitleTopLine)).toBeInTheDocument();
    });

    it('4) Subscribe modal functionality', async () => {
        render(<SubscribeModal />);

        // does NOT show on initial load
        expect(screen.queryByText(/Don't miss the next one/i)).not.toBeInTheDocument();

        act(() => {
            triggerSubscribeModal();
            vi.advanceTimersByTime(siteConfig.subscribe.delaySecondsAfterSuccess * 1000 + 100);
        });

        expect(screen.getByText(/Don't miss the next one/i)).toBeInTheDocument();

        // Close the modal (dismiss)
        const closeBtn = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeBtn);

        expect(screen.queryByText(/Don't miss the next one/i)).not.toBeInTheDocument();

        // Verify localStorage flag prevents returning
        expect(localStorage.getItem(siteConfig.subscribe.localStorageKeyDismissed)).toBe('true');
    });

    it('5) Email validation with zod', async () => {
        render(<SubscribeModal />);

        act(() => {
            triggerSubscribeModal();
            vi.advanceTimersByTime(siteConfig.subscribe.delaySecondsAfterSuccess * 1000 + 100);
        });

        expect(screen.getByTestId('dialog')).toHaveAttribute('data-state', 'open');

        const input = screen.getByPlaceholderText('you@example.com');
        const submitBtn = screen.getByRole('button', { name: /Subscribe/i });

        // Invalid email
        fireEvent.change(input, { target: { value: 'invalid-email' } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
        });
    });

    it('6) BuyMeACoffee widget component renders Script', () => {
        const { container } = render(<BuyMeACoffeeWidget />);
        const script = container.querySelector('script[data-name="BMC-Widget"]');
        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('data-id', siteConfig.buyMeACoffee.id);
    });
});
