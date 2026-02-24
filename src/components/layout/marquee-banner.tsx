"use client";

import React from "react";
import { siteConfig, contentConfig } from "@/config";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

export function MarqueeBanner() {
    const { marquee } = contentConfig;
    const theme = getThemeClasses();

    if (!marquee.enabled) return null;

    const marqueeContent = (
        <div className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center">
                    <span className="inline-flex items-center whitespace-nowrap px-10 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                        <span>{marquee.text}</span>
                        {marquee.platform && (
                            <a
                                href={`${marquee.platform.url}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "font-bold ml-2 hover:opacity-80 transition-opacity",
                                    theme.text
                                )}
                            >
                                {marquee.platform.label}
                            </a>
                        )}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                </span>
            ))}
        </div>
    );

    return (
        <div
            className="group relative flex h-10 w-full items-center overflow-hidden border-b border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-muted/40 backdrop-blur-sm"
            aria-label="Daily tools updates marquee"
        >
            {/* Left Fade */}
            <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />

            {/* Right Fade */}
            <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            {/* Marquee Track */}
            <div className="flex w-full motion-reduce:justify-center">
                <div className="flex animate-marquee motion-reduce:animate-none">
                    {marqueeContent}
                    {marqueeContent}
                </div>
            </div>
        </div>
    );
}
