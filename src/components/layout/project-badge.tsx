"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";

export function ProjectBadge() {
    const { buildMeta } = siteConfig;
    const theme = getThemeClasses();
    const [day, setDay] = useState<number>(buildMeta.buildDay);

    useEffect(() => {
        if (buildMeta.autoCalculateDay && buildMeta.startedAt) {
            const start = new Date(buildMeta.startedAt);
            const today = new Date();
            // Calculate difference in days (Day 1 is the start date)
            const diffTime = Math.max(0, today.getTime() - start.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setDay(diffDays);
        }
    }, [buildMeta.autoCalculateDay, buildMeta.startedAt]);

    if (!buildMeta.enabled) return null;

    return (
        <div
            aria-label={`Project number ${buildMeta.projectNumber}, build day ${day}`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm transition-opacity hover:opacity-80"
        >
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
                Project #{buildMeta.projectNumber}
            </span>
            <span className="text-xs font-bold text-muted-foreground/40">·</span>
            <span className={`text-xs font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                Day {day}
            </span>
        </div>
    );
}
