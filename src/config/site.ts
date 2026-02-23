import { Shield, Zap, Lock } from "lucide-react";

export const siteConfig = {
    // Brand
    siteName: "Secure_Studio",
    headerIcon: Shield,              // The icon to use in the header

    // SEO
    seo: {
        title: "SecureStudio - Premium Client-Side Security Tools",
        description: "Free, private, and 100% secure client-side tools. No data ever leaves your browser.",
        keywords: ["security tools", "privacy", "client-side", "free tools", "developer toolkit"],
        url: "https://securestudio.com",
        twitterHandle: "@emreyoleridev",
    },

    // Hero Section
    heroBadgeText: "100% SECURE & CLIENT-SIDE",
    heroTitle: "The Ultimate_Security Toolkit",
    heroSubtitle: "I build free tools every day. No signups, no tracking. Fast, private, and 100% secure client-side tools.",

    // Theme & Styling
    // Tailwind color token (e.g., "emerald", "teal", "indigo", "blue")
    accentColor: "emerald",

    // Links
    githubRepoUrl: "https://github.com/emreyoleri/boilerplate",
    authorName: "Emre Yoleri",
    authorGithubUrl: "https://github.com/emreyoleri",

    // Buy Me a Coffee Widget
    buyMeACoffee: {
        id: "emreyoleridev",
        message: "I build free tools every day. Support the next one ☕",
    },

    // Subscribe Modal
    subscribe: {
        enabled: true,
        delaySecondsAfterSuccess: 2, // Changed from 10 so it's noticeably faster
        googleSheetsEndpoint: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT || "",
    },

    // Share Section
    share: {
        enabled: true,
        shareText: "Check out this free tool",
        token: process.env.NEXT_PUBLIC_LOGODEV_TOKEN || "",
        platforms: [
            {
                id: "facebook",
                name: "Facebook",
                domain: "facebook.com",
                template: "https://www.facebook.com/sharer/sharer.php?u={url}",
                enabled: true,
            },
            {
                id: "x",
                name: "X",
                domain: "x.com",
                template: "https://twitter.com/intent/tweet?text={text}&url={url}",
                enabled: true,
            },
            {
                id: "reddit",
                name: "Reddit",
                domain: "reddit.com",
                template: "https://www.reddit.com/submit?url={url}&title={title}",
                enabled: true,
            },
            {
                id: "whatsapp",
                name: "WhatsApp",
                domain: "whatsapp.com",
                template: "https://wa.me/?text={text}%20{url}",
                enabled: true,
            },
            {
                id: "telegram",
                name: "Telegram",
                domain: "telegram.org",
                template: "https://t.me/share/url?url={url}&text={text}",
                enabled: true,
            },
            {
                id: "linkedin",
                name: "LinkedIn",
                domain: "linkedin.com",
                template: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
                enabled: true,
            },
            {
                id: "pinterest",
                name: "Pinterest",
                domain: "pinterest.com",
                template: "https://pinterest.com/pin/create/button/?url={url}&description={text}",
                enabled: true,
            },
            {
                id: "vk",
                name: "VK",
                domain: "vk.com",
                template: "https://vk.com/share.php?url={url}",
                enabled: true,
            },


        ],
    },

    // Features Section
    featuresSection: {
        badge: "Why Choose Us",
        title: "Built for *Privacy*",
        subtitle: "Every tool is engineered to run entirely in your browser\nno servers, no tracking, no compromises.",
    },
    features: [
        {
            title: "Client-Side Only",
            description: "Everything runs entirely in your browser. No data is ever sent to a server, ensuring your privacy.",
            icon: Shield,
        },
        {
            title: "Lightning Fast",
            description: "No loading screens, no spinners. Instant execution the moment you click.",
            icon: Zap,
        },
        {
            title: "100% Private",
            description: "No accounts, no tracking cookies, and absolutely no data collection.",
            icon: Lock,
        },
    ],

    // FAQ Section
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
} as const;

export type SiteConfig = typeof siteConfig;
