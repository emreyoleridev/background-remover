import { Shield, Zap, Lock, Rocket, ImageIcon, Sparkles, Share2, Download } from "lucide-react";

export const siteConfig = {
    // ---------------------------------------------------------------------------
    // 1. Brand & Identity
    // ---------------------------------------------------------------------------
    pk: "background-remover",
    siteName: "Background Remover Pro",
    headerIcon: ImageIcon,

    // ---------------------------------------------------------------------------
    // 2. Brand Identity
    // ---------------------------------------------------------------------------
    brand: {
        signatureEnabled: true,
        signatureText: "// emreyoleri.dev",
        url: "https://emreyoleri.dev"
    },

    // ---------------------------------------------------------------------------
    // 3. SEO & Metadata
    // ---------------------------------------------------------------------------
    seo: {
        title: "Background Remover Pro – Free AI Background Removal, 100% In-Browser",
        description: "Remove image backgrounds instantly with AI-powered WebAssembly. No uploads, no servers, no signups. Completely private and free.",
        keywords: ["background remover", "remove background", "ai background removal", "transparent png", "free background remover", "browser-based", "no upload", "privacy"],
        url: "https://bgremover.pro",
        twitterHandle: "@emreyoleridev",
    },

    // ---------------------------------------------------------------------------
    // 5. Theme & Styling
    // ---------------------------------------------------------------------------
    accentColor: "violet" as const,
    defaultTheme: "dark" as "light" | "dark" | "system",
    toastPosition: "top-center" as "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center",

    // ---------------------------------------------------------------------------
    // 6. Links & Author
    // ---------------------------------------------------------------------------
    author: {
        name: "Emre Yoleri",
        email: "emreyoleridev@gmail.com",
        socials: {
            instagram: "https://instagram.com/emreyoleridev",
            tiktok: "https://tiktok.com/@emreyoleridev",
            youtube: "https://youtube.com/@emreyoleridev",
            linkedin: "https://linkedin.com/in/emreyoleridev",
            twitter: "https://twitter.com/emreyoleridev",
            reddit: "https://reddit.com/u/emreyoleridev",
            productHunt: "https://www.producthunt.com/@emreyoleridev",
            github: "https://github.com/emreyoleridev",
        },
    },

    // ---------------------------------------------------------------------------
    // 7. Integrations & Functional Features
    // ---------------------------------------------------------------------------
    integrations: {
        buyMeACoffee: {
            id: "emreyoleridev",
            message: "I build free tools every day. Support the next one ☕",
        },
        subscribe: {
            enabled: true,
            delaySecondsAfterSuccess: 2,
            googleSheetsEndpoint: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT || "",
        },
        share: {
            enabled: true,
            shareText: "Remove image backgrounds for free, right in your browser — no uploads needed!",
            platforms: [
                { id: "facebook", name: "Facebook", domain: "facebook.com", template: "https://www.facebook.com/sharer/sharer.php?u={url}", enabled: true },
                { id: "x", name: "X", domain: "x.com", template: "https://twitter.com/intent/tweet?text={text}&url={url}", enabled: true },
                { id: "reddit", name: "Reddit", domain: "reddit.com", template: "https://www.reddit.com/submit?url={url}&title={title}", enabled: true },
                { id: "whatsapp", name: "WhatsApp", domain: "whatsapp.com", template: "https://wa.me/?text={text}%20{url}", enabled: true },
                { id: "telegram", name: "Telegram", domain: "telegram.org", template: "https://t.me/share/url?url={url}&text={text}", enabled: true },
                { id: "linkedin", name: "LinkedIn", domain: "linkedin.com", template: "https://www.linkedin.com/sharing/share-offsite/?url={url}", enabled: true },
                { id: "pinterest", name: "Pinterest", domain: "pinterest.com", template: "https://pinterest.com/pin/create/button/?url={url}&description={text}", enabled: true },
                { id: "vk", name: "VK", domain: "vk.com", template: "https://vk.com/share.php?url={url}", enabled: true },
            ],
        },
    },

    // ---------------------------------------------------------------------------
    // 11. Project & Build Meta
    // ---------------------------------------------------------------------------
    buildMeta: {
        enabled: true,
        buildDay: 42,
        startedAt: "2025-01-01",
    },
} as const;

export const contentConfig = {
    // ---------------------------------------------------------------------------
    // 4. Hero Section
    // ---------------------------------------------------------------------------
    hero: {
        badgeText: "100% IN-BROWSER · NO UPLOADS · PRIVATE",
        title: "Remove Backgrounds_Instantly with AI",
        subtitle: "Drop any image and our AI — powered by WebAssembly — removes the background in seconds. No server, no account, no data ever leaves your device.",
    },

    // ---------------------------------------------------------------------------
    // 8. Site Content (Features & FAQ)
    // ---------------------------------------------------------------------------
    features: {
        badge: "Why It's Different",
        title: "Truly *Private* Background Removal",
        subtitle: "All AI processing happens inside your browser.\nNo cloud uploads. No privacy risks. No subscriptions.",
        items: [
            { title: "100% In-Browser AI", description: "Powered by WebAssembly, the AI model runs entirely on your device. Your images never leave your computer.", icon: Shield },
            { title: "Instant Processing", description: "No waiting for server round-trips. The result is generated directly on your machine, as fast as your hardware allows.", icon: Zap },
            { title: "Free & Unlimited", description: "No account, no subscription, no watermarks. Remove as many backgrounds as you want, completely free.", icon: Lock },
        ],
    },
    faqs: [
        {
            question: "Does my image get uploaded to a server?",
            answer: "Absolutely not. All processing is done entirely in your browser using WebAssembly. Your image never leaves your device.",
        },
        {
            question: "What image formats are supported?",
            answer: "You can upload JPG, PNG, and WEBP images. The result is always downloaded as a transparent PNG.",
        },
        {
            question: "Is there a file size limit?",
            answer: "For best performance in the browser, we recommend images under 5MB. Larger images may take longer to process.",
        },
        {
            question: "Is it really free?",
            answer: "Yes. No paywalls, no watermarks, no sign-ups. Just open the page and start removing backgrounds.",
        },
    ],
    // ---------------------------------------------------------------------------
    // 9. Marquee Banner
    // ---------------------------------------------------------------------------
    marquee: {
        enabled: true,
        text: "Remove backgrounds for free. No uploads. No servers. Just pure browser AI magic.",
        platform: {
            label: "@emreyoleridev",
            url: "https://x.com/emreyoleridev"
        }
    },
    // ---------------------------------------------------------------------------
    // 10. CTA configuration
    // ---------------------------------------------------------------------------
    cta: {
        requestTool: {
            enabled: true,
            label: "Have a tool idea? ✨",
            description: "Tell me what to build next and I'll build it!",
            url: "https://builtbyemre.userjot.com/",
            icon: Sparkles,
            delayMs: 2000,
        },
        discoverMore: {
            enabled: true,
            title: "Like this tool? 👀",
            subtitle: "I build a new one every day. Discover more of my total collection.",
            href: "https://emreyoleri.dev",
            icon: Rocket,
            external: true
        }
    },
    // ---------------------------------------------------------------------------
    // 11. Tool Component (Marketing texts)
    // ---------------------------------------------------------------------------
    tool: {
        demo: {
            title: "AI Background Remover",
            description: "Upload your image and remove the background instantly — 100% in your browser.",
        },
        sharePrompt: {
            title: "Found it useful?",
            description: "Share it with your friends and colleagues.",
            icon: Share2
        }
    },
    // ---------------------------------------------------------------------------
    // 12. Modals (Marketing texts)
    // ---------------------------------------------------------------------------
    modals: {
        subscribe: {
            title: "I build a *new tool* every _single_ day.",
            description: "Join the newsletter to get every single tool I build delivered straight to your inbox, the moment it's shipped."
        },
        share: {
            title: "*SHARE* THIS TOOL WITH YOUR _FRIENDS_.",
            description: "Remove backgrounds for free, right in your browser. No uploads. No servers. Share with anyone!"
        }
    }
} as const;

export type SiteConfig = typeof siteConfig;
