import { siteConfig } from "@/config/site";

export function getLogoDevToken(): string | null {
    return siteConfig.share.logoProvider.token || null;
}

export function getLogoUrl(domain: string): string | null {
    const token = getLogoDevToken();
    if (!token) return null;
    return `https://img.logo.dev/${domain}?token=${token}&format=png`;
}
