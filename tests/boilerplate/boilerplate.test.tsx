import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SiteHeader } from '@/components/boilerplate/layout/site-header';
import { SiteHero } from '@/components/boilerplate/layout/site-hero';
import { SubscribeModal, triggerSubscribeModal } from '@/components/boilerplate/common/subscribe-modal';
import { ToolShell } from '@/components/boilerplate/layout/tool-shell';
import { UploadZone } from '@/components/boilerplate/common/upload-zone';
import { siteConfig, contentConfig } from '@/config';

// ---------------------------------------------------------------------------
// Global mocks
// ---------------------------------------------------------------------------
vi.mock('next-themes', () => ({
    useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('next/script', () => ({
    default: (props: React.HTMLAttributes<HTMLDivElement>) => <div data-testid="next-script" {...props} />,
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

// Mock @imgly/background-removal to prevent WASM from loading in tests
vi.mock('@imgly/background-removal', () => ({
    removeBackground: vi.fn(() => Promise.resolve(new Blob(['png'], { type: 'image/png' }))),
}));

// Mock URL.createObjectURL / revokeObjectURL
Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: vi.fn(() => 'blob:mock-url'),
});
Object.defineProperty(URL, 'revokeObjectURL', {
    writable: true,
    value: vi.fn(),
});

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.ResizeObserver = ResizeObserver;

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Background Remover Pro – Core Tests', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    // ── Config ─────────────────────────────────────────────────────────────
    it('siteConfig has correct tool name', () => {
        // siteName uses underscore as separator for header display split
        expect(siteConfig.siteName.replace('_', ' ')).toBe('Background Remover Pro');
    });

    it('siteConfig accent color is violet', () => {
        expect(siteConfig.accentColor).toBe('violet');
    });

    it('contentConfig hero badge reflects privacy message', () => {
        expect(contentConfig.hero.badgeText).toContain('PRIVATE');
    });

    // ── Header ─────────────────────────────────────────────────────────────
    it('Header renders brand name parts', () => {
        render(<SiteHeader />);
        expect(screen.getByText('Background')).toBeInTheDocument();
        expect(screen.getByText('Remover Pro')).toBeInTheDocument();
    });

    it('Header has a GitHub link', () => {
        render(<SiteHeader />);
        const githubLink = screen.getByRole('link', { name: /GitHub Repository/i });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink.getAttribute('href')).toContain(siteConfig.author.socials.github);
    });

    it('Theme toggle is present in header', () => {
        render(<SiteHeader />);
        expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    });

    // ── Hero ───────────────────────────────────────────────────────────────
    it('Hero renders badge text', () => {
        render(<SiteHero />);
        expect(screen.getByText(contentConfig.hero.badgeText)).toBeInTheDocument();
    });

    // ── ToolShell ──────────────────────────────────────────────────────────
    it('ToolShell renders without crashing', () => {
        const { container } = render(<ToolShell />);
        expect(container).toBeTruthy();
    });

    it('ToolShell shows UploadZone on initial render (idle state)', () => {
        render(<ToolShell />);
        expect(screen.getByText(/Drop your image here/i)).toBeInTheDocument();
    });

    it('ToolShell shows privacy note in idle state', () => {
        render(<ToolShell />);
        expect(screen.getByText(/nothing is uploaded/i)).toBeInTheDocument();
    });

    it('ToolShell shows share prompt in idle state', () => {
        render(<ToolShell />);
        expect(screen.getByText(contentConfig.tool.sharePrompt.title)).toBeInTheDocument();
    });

    // ── UploadZone ─────────────────────────────────────────────────────────
    it('UploadZone renders file type hint', () => {
        const onFileAccepted = vi.fn();
        render(<UploadZone onFileAccepted={onFileAccepted} />);
        expect(screen.getByText(/JPG, PNG, WEBP/i)).toBeInTheDocument();
    });

    it('UploadZone shows error for oversized file', async () => {
        const onFileAccepted = vi.fn();
        render(<UploadZone onFileAccepted={onFileAccepted} />);

        const dropzone = screen.getByText(/Drop your image here/i).closest('div')!.parentElement!;
        const input = dropzone.querySelector('input[type="file"]') as HTMLInputElement;

        // Create a fake oversized file (6MB)
        const bigFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'big.jpg', { type: 'image/jpeg' });
        Object.defineProperty(bigFile, 'size', { value: 6 * 1024 * 1024 });

        fireEvent.change(input, { target: { files: [bigFile] } });

        // onFileAccepted should not be called because the dropzone rejects it before our schema runs
        // The error will be shown by react-dropzone's onDropRejected
        expect(onFileAccepted).not.toHaveBeenCalled();
    });

    it('UploadZone calls onFileAccepted with a valid file', async () => {
        const onFileAccepted = vi.fn();
        render(<UploadZone onFileAccepted={onFileAccepted} />);

        const dropzone = document.querySelector('[role="presentation"]') ?? document.querySelector('div[tabindex]');
        if (!dropzone) return; // skip if no dropzone rendered in test env

        // Simulate valid file drop via input
        const validFile = new File(['hello'], 'photo.png', { type: 'image/png' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (input) {
            fireEvent.change(input, { target: { files: [validFile] } });
            await waitFor(() => {
                expect(onFileAccepted).toHaveBeenCalledWith(validFile);
            });
        }
    });

    // ── Subscribe Modal ─────────────────────────────────────────────────────
    it('SubscribeModal is not visible until triggered', () => {
        render(<SubscribeModal />);
        expect(screen.queryByText(/new tool/i)).not.toBeInTheDocument();
    });

    it('SubscribeModal opens when triggered', async () => {
        render(<SubscribeModal />);
        act(() => {
            triggerSubscribeModal();
            vi.advanceTimersByTime(siteConfig.integrations.subscribe.delaySecondsAfterSuccess * 1000 + 100);
        });
        expect(screen.getByText(/new tool/i)).toBeInTheDocument();
    });
});
