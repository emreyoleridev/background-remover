"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

/**
 * DiscoverMoreCTA Component
 * 
 * A fixed bottom-left CTA card that encourages users to discover more tools.
 * Fully config-driven from siteConfig.cta.discoverMore.
 */
export function DiscoverMoreCTA() {
    const config = siteConfig.cta.discoverMore;
    const theme = getThemeClasses();

    if (!config.enabled) {
        return null;
    }

    const content = (
        <div
            className={cn(
                "group relative flex items-center gap-4 p-4 rounded-2xl select-none overflow-hidden",
                "bg-background/90 backdrop-blur-md",
                "border border-white/10 shadow-xl",
                "max-w-[300px] sm:max-w-[360px]",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:border-white/20",
                "cursor-pointer"
            )}
        >
            {/* Subtle Accent Glow */}
            <div className={cn(
                "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br from-white/5 via-white/0 to-white/5"
            )} />

            {/* Left accent icon block */}
            <div className={cn(
                "relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                "bg-accent/20 shadow-sm",
                theme.text // Use theme's primary color for the icon
            )}>
                <Rocket className="w-6 h-6 fill-current/10" />
            </div>

            {/* Right text block */}
            <div className="relative z-10 flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-foreground">
                    {config.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">
                    {config.subtitle}
                </p>
            </div>
        </div>
    );

    return (
        <div className={cn(
            "fixed z-40",
            "left-6 bottom-6",
            "sm:left-8 sm:bottom-8"
        )}>
            {config.external ? (
                <a
                    href={config.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block outline-none"
                    role="button"
                    aria-label="Discover more tools"
                >
                    {content}
                </a>
            ) : (
                <Link
                    href={config.href}
                    className="block outline-none"
                    role="button"
                    aria-label="Discover more tools"
                >
                    {content}
                </Link>
            )}
        </div>
    );
}
