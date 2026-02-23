import { siteConfig } from "@/config/site";

export async function postSubscriptionEmail(email: string): Promise<void> {
    const endpoint = siteConfig.subscribe.googleSheetsEndpoint;
    if (!endpoint || endpoint === "YOUR_GOOGLE_SHEETS_ENDPOINT_HERE") {
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
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "no-cors",
    });
}
