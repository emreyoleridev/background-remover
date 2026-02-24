import { siteConfig } from "@/config";

export async function postSubscriptionEmail(email: string): Promise<void> {
    const payload = {
        email,
        source: window.location.href,
        toolName: siteConfig.siteName.replace("_", ""),
        timestamp: new Date().toISOString(),
    };

    const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to subscribe");
    }
}
