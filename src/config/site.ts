import { Shield, Zap, Lock } from "lucide-react";

export const siteConfig = {
    // ---------------------------------------------------------------------------
    // 1. Brand & Identity
    // ---------------------------------------------------------------------------
    siteName: "Secure_Studio",
    headerIcon: Shield,

    // ---------------------------------------------------------------------------
    // 2. SEO & Metadata
    // ---------------------------------------------------------------------------
    seo: {
        title: "SecureStudio - Premium Client-Side Security Tools",
        description: "Free, private, and 100% secure client-side tools. No data ever leaves your browser.",
        keywords: ["security tools", "privacy", "client-side", "free tools", "developer toolkit"],
        url: "https://securestudio.com",
        twitterHandle: "@emreyoleridev",
    },

    // ---------------------------------------------------------------------------
    // 3. Hero Section
    // ---------------------------------------------------------------------------
    hero: {
        badgeText: "100% SECURE & CLIENT-SIDE",
        title: "The Ultimate_Security Toolkit",
        subtitle: "I build free tools every day. No signups, no tracking. Fast, private, and 100% secure client-side tools.",
    },

    // ---------------------------------------------------------------------------
    // 4. Theme & Styling
    // ---------------------------------------------------------------------------
    // Accent Color Options:
    // - Neutrals: "slate", "gray", "zinc", "neutral", "stone"
    // - Colors: "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"
    // Note: Ensure the color is defined in src/lib/theme.ts to apply specific styles.
    accentColor: "teal" as const,

    // ---------------------------------------------------------------------------
    // 5. Links & Author
    // ---------------------------------------------------------------------------
    links: {
        githubRepo: "https://github.com/emreyoleri/boilerplate",
        authorName: "Emre Yoleri",
        authorGithub: "https://github.com/emreyoleri",
        authorEmail: "emreyoleridev@gmail.com",
    },

    // ---------------------------------------------------------------------------
    // 6. Integrations & Functional Features
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
            shareText: "Check out this free tool",
            token: process.env.NEXT_PUBLIC_LOGODEV_TOKEN || "",
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
    // 7. Site Content (Features & FAQ)
    // ---------------------------------------------------------------------------
    features: {
        badge: "Why Choose Us",
        title: "Built for *Privacy*",
        subtitle: "Every tool is engineered to run entirely in your browser\nno servers, no tracking, no compromises.",
        items: [
            { title: "Client-Side Only", description: "Everything runs entirely in your browser. No data is ever sent to a server, ensuring your privacy.", icon: Shield },
            { title: "Lightning Fast", description: "No loading screens, no spinners. Instant execution the moment you click.", icon: Zap },
            { title: "100% Private", description: "No accounts, no tracking cookies, and absolutely no data collection.", icon: Lock },
        ],
    },
    faqs: [
        {
            question: "Is it really secure?",
            answer: "Yes! All processing happens locally in your browser. We never see your data, and it never leaves your device.",
        },
        {
            question: "Is it free to use?",
            answer: "Absolutely. All tools on SecureStudio are free to use, and they will stay that way forever.",
        },
        {
            question: "Do I need to create an account?",
            answer: "No accounts, no logins, no tracking. Just open the tool and start using it instantly.",
        },
        {
            question: "Will you add more tools?",
            answer: "Yes! I build and release a new tool every single day to make your digital life easier and more secure.",
        },
    ],
    // ---------------------------------------------------------------------------
    // 8. Marquee Banner
    // ---------------------------------------------------------------------------
    marquee: {
        enabled: true,
        text: "I build free tools every day. I build. I learn. I share. @emreyoleridev",
    },
    // ---------------------------------------------------------------------------
    // 9. CTA configuration
    // ---------------------------------------------------------------------------
    cta: {
        requestTool: {
            enabled: true,
            label: "Request a Tool",
            url: "https://builtbyemre.userjot.com/",
            delayMs: 5000,
        },
    },
    // ---------------------------------------------------------------------------
    // 10. Project & Build Meta
    // ---------------------------------------------------------------------------
    buildMeta: {
        enabled: true,
        buildDay: 42,
        startedAt: "2025-01-01",
    },
} as const;

export type SiteConfig = typeof siteConfig;
