"use client";

import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";

export function ProjectBadge() {
    const { buildMeta } = siteConfig;
    const theme = getThemeClasses();

    if (!buildMeta.enabled) return null;

    // Simple date formatter to convert YYYY-MM-DD (or any valid date string) to DD-MM-YYYY
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;

        const d = String(date.getDate()).padStart(2, "0");
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    };

    const formattedDate = formatDate(buildMeta.startedAt);

    return (
        <div
            aria-label={`Project ${buildMeta.buildDay}, Date: ${formattedDate}`}
            className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm transition-all hover:bg-black/10 dark:hover:bg-white/10"
        >
            <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                    Project
                </span>
                <span className={`text-xs font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                    {buildMeta.buildDay}
                </span>
            </div>

            <div className="w-[1px] h-3 bg-muted-foreground/20" />

            <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                    Date
                </span>
                <span className={`text-xs font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                    {formattedDate}
                </span>
            </div>
        </div>
    );
}
