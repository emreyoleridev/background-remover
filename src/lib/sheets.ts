import { siteConfig } from "@/config/site";

export async function postSubscriptionEmail(email: string): Promise<void> {
    const endpoint = siteConfig.subscribe.googleSheetsEndpoint;
    if (!endpoint) {
        throw new Error("Google Sheets endpoint not configured.");
    }

    const payload = {
        email,
        source: window.location.href,
        toolName: siteConfig.siteName,
        timestamp: new Date().toISOString(),
    };

    await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8", // JSON yerine text/plain güvenlik için daha iyidir
        },
        body: JSON.stringify(payload),
        mode: "no-cors",
    });

}
