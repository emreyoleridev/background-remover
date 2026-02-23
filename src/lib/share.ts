import { siteConfig } from "@/config/site";

export function getCurrentUrl(): string {
    if (typeof window === "undefined") return "";
    return window.location.href;
}

interface ShareData {
    url: string;
    text: string;
    title: string;
}

export function buildShareUrl(template: string, data: ShareData): string {
    return template
        .replace(/{url}/g, encodeURIComponent(data.url))
        .replace(/{text}/g, encodeURIComponent(data.text))
        .replace(/{title}/g, encodeURIComponent(data.title));
}

export function openShare(url: string): void {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
}

export const getShareData = () => {
    const currentUrl = getCurrentUrl();
    const cleanName = siteConfig.siteName.replace("_", "");
    return {
        url: currentUrl,
        text: `${siteConfig.integrations.share.shareText} — ${cleanName}`,
        title: cleanName,
    };
};
