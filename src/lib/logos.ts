export function getLogoDevToken(): string | null {
    return process.env.NEXT_PUBLIC_LOGODEV_TOKEN || null;
}

export function getLogoUrl(domain: string): string | null {
    const token = getLogoDevToken();
    if (!token) return null;
    return `https://img.logo.dev/${domain}?token=${token}`;
}
