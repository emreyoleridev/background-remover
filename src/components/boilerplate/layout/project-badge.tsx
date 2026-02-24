"use client";

import { siteConfig } from "@/config";
import { getThemeClasses } from "@/lib/boilerplate/theme";
import { cn } from "@/lib/boilerplate/utils";

export function ProjectBadge() {
    const { buildMeta } = siteConfig;
    const theme = getThemeClasses();

    if (!buildMeta.enabled) return null;

    // Date formatter to convert YYYY-MM-DD to 'DD Month YYYY' (e.g., 17 May 2025)
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const formattedDate = formatDate(buildMeta.startedAt);

    return (
        <div
            aria-label={`Project ${buildMeta.buildDay}, Date: ${formattedDate}`}
            className={cn(
                "hidden md:flex items-center h-9 gap-3 px-3 rounded-md border border-border bg-muted/50 transition-colors hover:bg-muted"
            )}
        >
            <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    Project NO
                </span>
                <span className={cn("text-sm font-black tracking-tight", theme.text)}>
                    {buildMeta.buildDay}
                </span>
            </div>

            <div className="w-[1px] h-4 bg-border/60" />

            <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    Date
                </span>
                <span className={cn("text-sm font-bold tracking-tight", theme.text)}>
                    {formattedDate}
                </span>
            </div>
        </div>
    );
}
