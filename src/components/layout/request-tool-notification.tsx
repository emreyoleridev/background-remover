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
                    "group relative flex items-center gap-4 p-4 pr-10 rounded-2xl cursor-pointer select-none overflow-hidden",
                    "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl",
                    "border border-zinc-200 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)]",
                    "hover:translate-y-[-2px] hover:border-primary/30 transition-all duration-300",
                    "active:scale-[0.98]"
                )}
            >
                {/* Minimalist Left Section */}
                <div className="relative">
                    <div className={cn(
                        "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                        "bg-zinc-100 dark:bg-white/5",
                        "text-zinc-600 dark:text-zinc-400 group-hover:text-primary"
                    )}>
                        <Wand2 className="w-5 h-5" />
                    </div>
                </div>

                {/* Text Content: Focused and Clean */}
                <div className="flex flex-col gap-0.5">
                    <h3 className={cn(
                        "text-[15px] font-semibold tracking-tight leading-tight transition-colors group-hover:text-primary",
                        "text-zinc-900 dark:text-zinc-100"
                    )}>
                        {config.label}
                    </h3>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-medium leading-normal">
                        {/* @ts-ignore - added description to config */}
                        {config.description || "Tell me what to build next"}
                    </p>
                </div>

                {/* Static Minimal Arrow */}
                <div className="flex items-center ml-1">
                    <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-primary transition-colors" />
                </div>

                {/* Manual Close Button - Integrated */}
                <button
                    onClick={handleDismiss}
                    aria-label="Dismiss notification"
                    className="absolute top-2 right-2 p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-300 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-400 transition-all duration-200"
                >
                    <X className="w-3.5 h-3.5" />
                </button>

                {/* Bottom line - Very thin and subtle */}
                <div className={cn(
                    "absolute bottom-0 left-0 h-[1px] w-full bg-zinc-200 dark:bg-white/10 group-hover:bg-primary transition-colors",
                )} />
            </div>
        </div>
    );
}
