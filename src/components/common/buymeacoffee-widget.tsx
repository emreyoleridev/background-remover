"use client";

import { siteConfig } from "@/config/site";

export function BuyMeACoffeeWidget() {
    const { id, message } = siteConfig.buyMeACoffee;

    // BMC requires a hex color, so we map the configured tailwind accent color token to its approximate hex.
    const colorMap: Record<string, string> = {
        // Tailwind default palette — 500 level (medium/default shade)
        slate: "#64748b",
        gray: "#6b7280",
        zinc: "#71717a",
        neutral: "#737373",
        stone: "#78716c",
        red: "#ef4444",
        orange: "#f97316",
        amber: "#f59e0b",
        yellow: "#eab308",
        lime: "#84cc16",
        green: "#22c55e",
        emerald: "#10b981",
        teal: "#14b8a6",
        cyan: "#06b6d4",
        sky: "#0ea5e9",
        blue: "#3b82f6",
        indigo: "#6366f1",
        violet: "#8b5cf6",
        purple: "#a855f7",
        fuchsia: "#d946ef",
        pink: "#ec4899",
        rose: "#f43f5e",
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
