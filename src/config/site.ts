import { Shield, Zap, Lock } from "lucide-react";

export const siteConfig = {
    // Brand
    siteName: "SecureStudio",
    headerName: "SecureStudio", // Optional override, otherwise falls back to siteName

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
        googleSheetsEndpoint: "YOUR_GOOGLE_SHEETS_ENDPOINT_HERE",
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
} as const;

export type SiteConfig = typeof siteConfig;
