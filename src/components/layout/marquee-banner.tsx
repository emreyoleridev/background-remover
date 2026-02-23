"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

export function MarqueeBanner() {
    const { marquee } = siteConfig;
    const theme = getThemeClasses();

    if (!marquee.enabled) return null;

    // Split text to highlight @emreyoleridev
    const parts = marquee.text.split(/(@\w+)/);

    const marqueeContent = (
        <div className="flex shrink-0 items-center">
            {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="flex items-center">
                    <span className="inline-flex items-center whitespace-nowrap px-8 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        {parts.map((part, index) =>
                            part.startsWith("@") ? (
                                <span key={index} className={cn("font-bold mx-1", theme.text)}>
                                    {part}
                                </span>
                            ) : (
                                <span key={index}>{part}</span>
                            )
                        )}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                </span>
            ))}
        </div>
    );

    return (
        <div
            className="relative flex h-10 w-full items-center overflow-hidden border-b border-white/5 bg-muted/40 backdrop-blur-sm"
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
