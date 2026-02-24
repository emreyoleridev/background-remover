import { siteConfig } from "@/config";
import { MetadataRoute } from "next";
import { getThemeClasses, BRANDING } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
    const cleanName = siteConfig.siteName.replace("_", "");
    const theme = getThemeClasses();

    return {
        name: cleanName,
        short_name: cleanName,
        description: siteConfig.seo.description,
        start_url: "/",
        display: "standalone",
        background_color: BRANDING.backgroundHex,
        theme_color: theme.hex,
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
