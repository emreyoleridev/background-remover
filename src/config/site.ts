import { Shield, Zap, Lock } from "lucide-react";

export const siteConfig = {
    // Brand
    siteName: "Secure_Studio",
    headerIcon: Shield, // The icon to use in the header

    // SEO
    seo: {
        title: "SecureStudio - Premium Client-Side Security Tools",
        description: "Free, private, and 100% secure client-side tools. No data ever leaves your browser.",
        keywords: ["security tools", "privacy", "client-side", "free tools", "developer toolkit"],
        url: "https://securestudio.com",
        twitterHandle: "@emreyoleri",
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
        placement: "underTool",
        rememberDismiss: true,
        shareText: "Check out this free tool",
        logoProvider: {
            type: "logodev",
            token: process.env.NEXT_PUBLIC_LOGODEV_TOKEN || "",
        },
        platforms: [
            {
                id: "facebook",
                name: "Facebook",
                domain: "facebook.com",
                action: "shareUrl",
                template: "https://www.facebook.com/sharer/sharer.php?u={url}",
                enabled: true,
            },
            {
                id: "x",
                name: "X",
                domain: "x.com",
                action: "shareUrl",
                template: "https://twitter.com/intent/tweet?text={text}&url={url}",
                enabled: true,
            },
            {
                id: "reddit",
                name: "Reddit",
                domain: "reddit.com",
                action: "shareUrl",
                template: "https://www.reddit.com/submit?url={url}&title={title}",
                enabled: true,
            },
            {
                id: "whatsapp",
                name: "WhatsApp",
                domain: "whatsapp.com",
                action: "shareUrl",
                template: "https://wa.me/?text={text}%20{url}",
                enabled: true,
            },
            {
                id: "telegram",
                name: "Telegram",
                domain: "telegram.org",
                action: "shareUrl",
                template: "https://t.me/share/url?url={url}&text={text}",
                enabled: true,
            },
            {
                id: "linkedin",
                name: "LinkedIn",
                domain: "linkedin.com",
                action: "shareUrl",
                template: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
                enabled: true,
            },
            {
                id: "hn",
                name: "Hacker News",
                domain: "ycombinator.com",
                action: "shareUrl",
                template: "https://news.ycombinator.com/submitlink?u={url}&t={title}",
                enabled: true,
            },
            {
                id: "email",
                name: "Email",
                domain: "gmail.com",
                action: "shareUrl",
                template: "mailto:?subject={title}&body={text}%0A%0A{url}",
                enabled: true,
            },
            {
                id: "pinterest",
                name: "Pinterest",
                domain: "pinterest.com",
                action: "shareUrl",
                template: "https://pinterest.com/pin/create/button/?url={url}&description={text}",
                enabled: true,
            },
            {
                id: "line",
                name: "LINE",
                domain: "line.me",
                action: "shareUrl",
                template: "https://social-plugins.line.me/lineit/share?url={url}",
                enabled: true,
            },
            {
                id: "vk",
                name: "VK",
                domain: "vk.com",
                action: "shareUrl",
                template: "https://vk.com/share.php?url={url}",
                enabled: true,
            },
            {
                id: "discord",
                name: "Discord",
                domain: "discord.com",
                action: "copyOnly",
                enabled: true,
            },
            {
                id: "instagram",
                name: "Instagram",
                domain: "instagram.com",
                action: "copyOnly",
                enabled: true,
            },
            {
                id: "copy",
                name: "Copy Link",
                domain: "linktr.ee",
                action: "copyLink",
                enabled: true,
            },
        ],
    },

    // Features Section
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
