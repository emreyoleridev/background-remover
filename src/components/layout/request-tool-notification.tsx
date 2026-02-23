"use client";

import { useEffect, useState, useCallback } from "react";
import { Sparkles, X, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * RequestToolNotification Component
 * 
 * A premium, delayed notification that appears in the top-right corner.
 * - Appears after a delay (default 5s)
 * - Prevented from appearing if the user scrolls before the delay ends
 * - Features smooth animations and glassmorphism styling
 */
export function RequestToolNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const config = siteConfig.cta.requestTool;

    // Detect scroll to prevent appearance
    const handleScroll = useCallback(() => {
        if (window.scrollY > 0) {
            setHasScrolled(true);
        }
    }, []);

    useEffect(() => {
        // Skip if disabled or already dismissed for this session
        if (!config.enabled || isDismissed) return;

        // If user already scrolled, don't show
        if (window.scrollY > 0) {
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
                "fixed z-[100] transition-all duration-700 ease-out",
                // Positioned below Header (56px) + Marquee (40px) + Gap
                "top-[112px] right-6",
                isAnimating ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                "motion-reduce:transition-none motion-reduce:translate-x-0"
            )}
        >
            <div
                onClick={handleOpen}
                className={cn(
                    "group relative flex items-center gap-4 p-4 pr-10 rounded-2xl cursor-pointer select-none",
                    "bg-background/90 dark:bg-black/60 backdrop-blur-xl",
                    "border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)]",
                    "hover:translate-y-[-2px] hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]",
                    "active:scale-[0.98] transition-all duration-300"
                )}
            >
                {/* Icon with soft accent square */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/20 ring-4 ring-primary/5">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground leading-none">
                        {config.label}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                        Tell me what to build next
                    </p>
                </div>

                {/* Right Action / Button */}
                <div className="flex items-center ml-4">
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-colors">
                        Open
                        <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Manual Close Button */}
                <button
                    onClick={handleDismiss}
                    aria-label="Dismiss notification"
                    className="absolute top-2.5 right-2.5 p-1 rounded-full hover:bg-white/5 text-muted-foreground/40 hover:text-muted-foreground transition-all duration-200"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
