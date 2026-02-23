"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

/**
 * DiscoverMoreCTA Component
 * 
 * A fixed bottom-left CTA card that encourages users to discover more tools.
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
                "group relative flex flex-col gap-4 p-4 rounded-2xl select-none overflow-hidden",
                "bg-white dark:bg-zinc-900 backdrop-blur-md",
                "border border-zinc-200 dark:border-white/10 shadow-xl",
                "max-w-[320px] sm:max-w-[380px]",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-2xl",
                "cursor-pointer"
            )}
        >
            {/* Subtle Accent Glow */}
            <div className={cn(
                "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/5"
            )} />

            <div className="flex items-center gap-4">
                {/* Left accent icon block */}
                <div className={cn(
                    "relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                    theme.iconBg,
                    "shadow-sm",
                    theme.text
                )}>
                    {config.icon && <config.icon className="w-6 h-6 fill-current/10" />}
                </div>

                {/* Text block */}
                <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate tracking-tight">
                        {config.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
                        {config.subtitle}
                    </p>
                </div>
            </div>

            {/* Bottom action button: Subtle Hover */}
            <div className={cn(
                "relative z-10 flex items-center justify-center w-full px-4 py-2.5 rounded-xl transition-all duration-300",
                "bg-zinc-50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10",
                "group-hover:bg-zinc-100 dark:group-hover:bg-white/10",
                "group-hover:border-zinc-300 dark:group-hover:border-white/20",
                theme.text,
                "text-[10px] font-bold uppercase tracking-widest text-center"
            )}>
                Discover more
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
