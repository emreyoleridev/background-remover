import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import DisclaimerPage from '@/app/disclaimer/page';

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
