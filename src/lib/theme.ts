import { siteConfig } from "@/config/site";

type ThemeColorMap = {
    text: string;
    bg: string;
    border: string;
    glow: string;
    gradientText: string;
    badge: string;
    iconBg: string;
};

const colors: Record<string, ThemeColorMap> = {
    emerald: {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        gradientText: "from-emerald-400 to-emerald-600 dark:from-emerald-400 dark:to-emerald-200",
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    teal: {
        text: "text-teal-500",
        bg: "bg-teal-500",
        border: "border-teal-500/30",
        glow: "shadow-teal-500/20",
        gradientText: "from-teal-400 to-teal-600 dark:from-teal-400 dark:to-teal-200",
        badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
        iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    },
    indigo: {
        text: "text-indigo-500",
        bg: "bg-indigo-500",
        border: "border-indigo-500/30",
        glow: "shadow-indigo-500/20",
        gradientText: "from-indigo-400 to-indigo-600 dark:from-indigo-400 dark:to-indigo-200",
        badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
        iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    blue: {
        text: "text-blue-500",
        bg: "bg-blue-500",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/20",
        gradientText: "from-blue-400 to-blue-600 dark:from-blue-400 dark:to-blue-200",
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    violet: {
        text: "text-violet-500",
        bg: "bg-violet-500",
        border: "border-violet-500/30",
        glow: "shadow-violet-500/20",
        gradientText: "from-violet-400 to-violet-600 dark:from-violet-400 dark:to-violet-200",
        badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
        iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
};

export function getThemeClasses() {
    const accent = siteConfig.accentColor;
    return colors[accent] || colors.emerald;
}
