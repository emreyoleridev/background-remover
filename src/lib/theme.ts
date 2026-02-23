import { siteConfig } from "@/config/site";

type ThemeColorMap = {
    text: string;
    bg: string;
    border: string;
    glow: string;
    gradientText: string;
    badge: string;
    iconBg: string;
    hex: string; // The primary hex color for branding/manifest
};

// Global branding constants
export const BRANDING = {
    backgroundHex: "#0a0a0a", // Near-black background used across all themes
} as const;

const colors: Record<string, ThemeColorMap> = {
    // Neutrals
    slate: {
        text: "text-slate-500",
        bg: "bg-slate-500",
        border: "border-slate-500/30",
        glow: "shadow-slate-500/20",
        gradientText: "from-slate-400 to-slate-600 dark:from-slate-400 dark:to-slate-200",
        badge: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
        iconBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
        hex: "#64748b",
    },
    gray: {
        text: "text-gray-500",
        bg: "bg-gray-500",
        border: "border-gray-500/30",
        glow: "shadow-gray-500/20",
        gradientText: "from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-200",
        badge: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
        iconBg: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
        hex: "#6b7280",
    },
    zinc: {
        text: "text-zinc-500",
        bg: "bg-zinc-500",
        border: "border-zinc-500/30",
        glow: "shadow-zinc-500/20",
        gradientText: "from-zinc-400 to-zinc-600 dark:from-zinc-400 dark:to-zinc-200",
        badge: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
        iconBg: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
        hex: "#71717a",
    },
    neutral: {
        text: "text-neutral-500",
        bg: "bg-neutral-500",
        border: "border-neutral-500/30",
        glow: "shadow-neutral-500/20",
        gradientText: "from-neutral-400 to-neutral-600 dark:from-neutral-400 dark:to-neutral-200",
        badge: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20",
        iconBg: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
        hex: "#737373",
    },
    stone: {
        text: "text-stone-500",
        bg: "bg-stone-500",
        border: "border-stone-500/30",
        glow: "shadow-stone-500/20",
        gradientText: "from-stone-400 to-stone-600 dark:from-stone-400 dark:to-stone-200",
        badge: "bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-500/20",
        iconBg: "bg-stone-500/10 text-stone-600 dark:text-stone-400",
        hex: "#78716c",
    },
    // Colors
    red: {
        text: "text-red-500",
        bg: "bg-red-500",
        border: "border-red-500/30",
        glow: "shadow-red-500/20",
        gradientText: "from-red-400 to-red-600 dark:from-red-400 dark:to-red-200",
        badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        iconBg: "bg-red-500/10 text-red-600 dark:text-red-400",
        hex: "#ef4444",
    },
    orange: {
        text: "text-orange-500",
        bg: "bg-orange-500",
        border: "border-orange-500/30",
        glow: "shadow-orange-500/20",
        gradientText: "from-orange-400 to-orange-600 dark:from-orange-400 dark:to-orange-200",
        badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
        iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
        hex: "#f97316",
    },
    amber: {
        text: "text-amber-500",
        bg: "bg-amber-500",
        border: "border-amber-500/30",
        glow: "shadow-amber-500/20",
        gradientText: "from-amber-400 to-amber-600 dark:from-amber-400 dark:to-amber-200",
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        hex: "#f59e0b",
    },
    yellow: {
        text: "text-yellow-500",
        bg: "bg-yellow-500",
        border: "border-yellow-500/30",
        glow: "shadow-yellow-500/20",
        gradientText: "from-yellow-400 to-yellow-600 dark:from-yellow-400 dark:to-yellow-200",
        badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
        iconBg: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        hex: "#eab308",
    },
    lime: {
        text: "text-lime-500",
        bg: "bg-lime-500",
        border: "border-lime-500/30",
        glow: "shadow-lime-500/20",
        gradientText: "from-lime-400 to-lime-600 dark:from-lime-400 dark:to-lime-200",
        badge: "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20",
        iconBg: "bg-lime-500/10 text-lime-600 dark:text-lime-400",
        hex: "#84cc16",
    },
    green: {
        text: "text-green-500",
        bg: "bg-green-500",
        border: "border-green-500/30",
        glow: "shadow-green-500/20",
        gradientText: "from-green-400 to-green-600 dark:from-green-400 dark:to-green-200",
        badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        iconBg: "bg-green-500/10 text-green-600 dark:text-green-400",
        hex: "#22c55e",
    },
    emerald: {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        gradientText: "from-emerald-400 to-emerald-600 dark:from-emerald-400 dark:to-emerald-200",
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        hex: "#10b981",
    },
    teal: {
        text: "text-teal-500",
        bg: "bg-teal-500",
        border: "border-teal-500/30",
        glow: "shadow-teal-500/20",
        gradientText: "from-teal-400 to-teal-600 dark:from-teal-400 dark:to-teal-200",
        badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
        iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
        hex: "#14b8a6",
    },
    cyan: {
        text: "text-cyan-500",
        bg: "bg-cyan-500",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/20",
        gradientText: "from-cyan-400 to-cyan-600 dark:from-cyan-400 dark:to-cyan-200",
        badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
        iconBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
        hex: "#06b6d4",
    },
    sky: {
        text: "text-sky-500",
        bg: "bg-sky-500",
        border: "border-sky-500/30",
        glow: "shadow-sky-500/20",
        gradientText: "from-sky-400 to-sky-600 dark:from-sky-400 dark:to-sky-200",
        badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
        iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
        hex: "#0ea5e9",
    },
    blue: {
        text: "text-blue-500",
        bg: "bg-blue-500",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/20",
        gradientText: "from-blue-400 to-blue-600 dark:from-blue-400 dark:to-blue-200",
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        hex: "#3b82f6",
    },
    indigo: {
        text: "text-indigo-500",
        bg: "bg-indigo-500",
        border: "border-indigo-500/30",
        glow: "shadow-indigo-500/20",
        gradientText: "from-indigo-400 to-indigo-600 dark:from-indigo-400 dark:to-indigo-200",
        badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
        iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        hex: "#6366f1",
    },
    violet: {
        text: "text-violet-500",
        bg: "bg-violet-500",
        border: "border-violet-500/30",
        glow: "shadow-violet-500/20",
        gradientText: "from-violet-400 to-violet-600 dark:from-violet-400 dark:to-violet-200",
        badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
        iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
        hex: "#8b5cf6",
    },
    purple: {
        text: "text-purple-500",
        bg: "bg-purple-500",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
        gradientText: "from-purple-400 to-purple-600 dark:from-purple-400 dark:to-purple-200",
        badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        hex: "#a855f7",
    },
    fuchsia: {
        text: "text-fuchsia-500",
        bg: "bg-fuchsia-500",
        border: "border-fuchsia-500/30",
        glow: "shadow-fuchsia-500/20",
        gradientText: "from-fuchsia-400 to-fuchsia-600 dark:from-fuchsia-400 dark:to-fuchsia-200",
        badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
        iconBg: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
        hex: "#d946ef",
    },
    pink: {
        text: "text-pink-500",
        bg: "bg-pink-500",
        border: "border-pink-500/30",
        glow: "shadow-pink-500/20",
        gradientText: "from-pink-400 to-pink-600 dark:from-pink-400 dark:to-pink-200",
        badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
        iconBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
        hex: "#ec4899",
    },
    rose: {
        text: "text-rose-500",
        bg: "bg-rose-500",
        border: "border-rose-500/30",
        glow: "shadow-rose-500/20",
        gradientText: "from-rose-400 to-rose-600 dark:from-rose-400 dark:to-rose-200",
        badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
        iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        hex: "#f43f5e",
    },
};

export function getThemeClasses() {
    const accent = siteConfig.accentColor;
    return colors[accent] || colors.emerald;
}
