"use client";

import { useEffect, useState, useCallback } from "react";
import { Wand2, X, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { getThemeClasses } from "@/lib/theme";

/**
 * RequestToolNotification Component
 * 
 * A premium, delayed notification that appears in the top-right corner.
 * - Appears after a delay (default 5s)
 * - Prevented from appearing if the user scrolls before the delay ends
 * - Features smooth animations, glassmorphism, and theme-aware gradients
 */
export function RequestToolNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const theme = getThemeClasses();
    const config = siteConfig.cta.requestTool;

    // Detect scroll to prevent appearance
    const handleScroll = useCallback(() => {
        setHasScrolled(true);
    }, []);

    useEffect(() => {
        // Skip if disabled or already dismissed for this session
        if (!config.enabled || isDismissed) return;

        // If user already scrolled, don't show
        if (typeof window !== "undefined" && window.scrollY > 0) {
            setHasScrolled(true);
            return;
        }

        // Add scroll listener
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Start delay timer
        const timer = setTimeout(() => {
            // Only show if user hasn't scrolled yet
            if (!hasScrolled && window.scrollY === 0) {
                setIsVisible(true);
            }
            window.removeEventListener("scroll", handleScroll);
        }, config.delayMs || 5000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, [config.enabled, config.delayMs, hasScrolled, handleScroll, isDismissed]);

    // Handle entry animation once mounted
    useEffect(() => {
        if (isVisible) {
            // Small delay to ensure the transition triggers after mount
            const timer = setTimeout(() => setIsAnimating(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    // Handle opening the link
    const handleOpen = () => {
        window.open(config.url, "_blank", "noopener,noreferrer");
    };

    // Handle dismissal
    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDismissed(true);
    };

    // Don't render if it's disabled, dismissed, or scroll prevented it
    if (!config.enabled || isDismissed || !isVisible) {
        return null;
    }

    return (
        <div
            role="alert"
            aria-live="polite"
            aria-label="Request a tool"
            className={cn(
                "fixed z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                // Positioned below Header (56px) + Marquee (40px) + Gap
                "top-[112px] right-6 md:right-8",
                isAnimating ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
                "motion-reduce:transition-none motion-reduce:translate-x-0"
            )}
        >
            <div
                onClick={handleOpen}
                className={cn(
                    "group relative flex items-center gap-4 p-4 pr-12 rounded-2xl cursor-pointer select-none overflow-hidden",
                    "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl",
                    "border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
                    "hover:translate-y-[-4px] hover:border-primary/50 transition-all duration-500",
                    "active:scale-[0.97]"
                )}
            >
                {/* Subtle Inner Glow */}
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-primary",
                )} />

                {/* Left Section: Icon within a clean container */}
                <div className="relative">
                    <div className={cn(
                        "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500",
                        theme.badge,
                        "ring-1 ring-primary/20",
                        "group-hover:scale-105 group-hover:ring-primary/40"
                    )}>
                        <Wand2 className="w-5 h-5 transition-transform" />
                    </div>
                </div>

                {/* Text Content: Clearer hierarchy and more color */}
                <div className="flex flex-col gap-1 max-w-[200px]">
                    <h3 className={cn(
                        "text-base font-bold tracking-tight leading-tight",
                        "text-transparent bg-clip-text bg-gradient-to-r",
                        theme.gradientText
                    )}>
                        {config.label}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium leading-normal dark:text-zinc-400">
                        {/* @ts-ignore - added description to config */}
                        {config.description || "Tell me what to build next"}
                    </p>
                </div>

                {/* Interaction Feedback - Arrow */}
                <div className="flex items-center ml-2">
                    <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full",
                        "bg-zinc-100 dark:bg-zinc-800 text-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                        "shadow-inner transition-all duration-300"
                    )}>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Premium Close Button */}
                <button
                    onClick={handleDismiss}
                    aria-label="Dismiss notification"
                    className="absolute top-3 right-3 p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground/30 hover:text-muted-foreground transition-all duration-300"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Subtle border accent */}
                <div className={cn(
                    "absolute bottom-0 left-0 h-[2px] w-full bg-primary/20 group-hover:bg-primary transition-colors",
                )} />
            </div>
        </div>
    );
}
