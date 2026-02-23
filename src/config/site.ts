import { Shield, Zap, Lock } from "lucide-react";

export const siteConfig = {
    // Brand
    siteName: "SecureStudio",
    headerIcon: Shield, // The icon to use in the header
    headerNamePart1: "Secure", // First part of header name (standard text)
    headerNamePart2: "Studio", // Second part of header name (accent color)

    // SEO
    seo: {
        title: "SecureStudio - Premium Client-Side Security Tools",
        description: "Free, private, and 100% secure client-side tools. No data ever leaves your browser.",
        keywords: ["security tools", "privacy", "client-side", "free tools", "developer toolkit"],
        url: "https://securestudio.com",
        ogImage: "/og-image.png",
        twitterHandle: "@emreyoleri",
    },

    // Hero Section
    heroBadgeText: "100% SECURE & CLIENT-SIDE",
    heroTitleTopLine: "The Ultimate",
    heroTitleAccentLine: "Security Toolkit",
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
        googleSheetsEndpoint: "https://script.google.com/macros/s/AKfycbzg4doiboFM2vl0DoEMSRXcUoWdyaiIiZEmz5PEQ-1btat9FzS96yyF0jM690XhJIwnvg/exec",
    },

    // Share Section
    enableShareSection: true,

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
