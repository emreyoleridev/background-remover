"use client";

import { siteConfig } from "@/config";
import { getThemeClasses } from "@/lib/theme";

export function BuyMeACoffeeWidget() {
    const { id, message } = siteConfig.integrations.buyMeACoffee;
    const theme = getThemeClasses();
    const hexColor = theme.hex;

    return (
        <script
            key={hexColor} // Forces re-render of the script tag when the color changes
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
