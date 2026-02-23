"use client";

import { siteConfig } from "@/config/site";

export function BuyMeACoffeeWidget() {
    const { id, message, color } = siteConfig.buyMeACoffee;

    return (
        <script
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id={id}
            data-description="Support me on Buy me a coffee!"
            data-message={message}
            data-color={color}
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
        ></script>
    );
}
