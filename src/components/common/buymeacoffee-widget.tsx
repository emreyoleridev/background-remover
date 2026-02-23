"use client";

import { siteConfig } from "@/config/site";

export function BuyMeACoffeeWidget() {
    const { id, message } = siteConfig.buyMeACoffee;

    // BMC requires a hex color, so we map the configured tailwind accent color token to its approximate hex.
    const colorMap: Record<string, string> = {
        emerald: "#10b981",
        teal: "#14b8a6",
        indigo: "#6366f1",
        blue: "#3b82f6",
        violet: "#8b5cf6"
    };

    const hexColor = colorMap[siteConfig.accentColor] || "#10b981";

    return (
        <script
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id={id}
            data-description="Support me on Buy me a coffee!"
            data-message={message}
            data-color={hexColor}
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
        ></script>
    );
}
