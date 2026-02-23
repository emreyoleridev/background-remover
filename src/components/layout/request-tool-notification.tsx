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

    // Swipe state
    const [startX, setStartX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

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
        if (Math.abs(offsetX) < 10) { // Only open if not swiping
            window.open(config.url, "_blank", "noopener,noreferrer");
        }
    };

    // Swipe Logic
    const onStart = (clientX: number) => {
        setStartX(clientX);
        setIsDragging(true);
    };

    const onMove = (clientX: number) => {
        if (!isDragging) return;
        const diff = clientX - startX;
        // Only allow swiping left (negative diff) as per "sola kaydırmak"
        if (diff < 0) {
            setOffsetX(diff);
        }
    };

    const onEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        // If swiped more than 100px to the left, dismiss
        if (offsetX < -100) {
            setIsDismissed(true);
        } else {
            setOffsetX(0); // Reset position if not dismissed
        }
    };

    // Don't render if it's disabled, dismissed, or scroll prevented it
    if (!config.enabled || isDismissed || !isVisible) {
        return null;
    }

    return (
        <div
            role="alert"
            aria-live="polite"
            aria-label="Request a tool. Swipe left to dismiss."
            onMouseDown={(e) => onStart(e.clientX)}
            onMouseMove={(e) => onMove(e.clientX)}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={(e) => onStart(e.touches[0].clientX)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            onTouchEnd={onEnd}
            style={{
                transform: `translateX(${isAnimating ? offsetX : 48}px)`, // Initial position 48px right, then controlled by offsetX
                opacity: isAnimating ? Math.max(0, 1 + offsetX / 200) : 0, // Fade out as it swipes left
                transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)" // No transition during drag
            }}
            className={cn(
                "fixed z-[100]",
                // Positioned below Header (56px) + Marquee (40px) + Gap
                "top-[112px] right-6 md:right-8",
                "motion-reduce:transition-none"
            )}
        >
            <div
                onClick={handleOpen}
                className={cn(
                    "group relative flex items-center gap-4 p-4 pr-6 rounded-2xl cursor-pointer select-none overflow-hidden",
                    "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl",
                    "border border-zinc-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]",
                    "hover:border-primary/50 transition-all duration-300"
                )}
            >
                {/* Elegant Blade Shine Effect (Lighter & Stylish) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-shimmer-elegant" />
                </div>

                {/* Left Section: Glowing Blue Icon with NEW badge */}
                <div className="relative pointer-events-none">
                    <div className={cn(
                        "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                        "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
                        "text-white shadow-lg animate-glow-blue"
                    )}>
                        <Wand2 className="w-5 h-5 fill-white/20" />
                    </div>
                    {/* NEW Badge - Restored */}
                    <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-full bg-orange-500 text-[9px] font-black text-white uppercase tracking-tighter shadow-lg shadow-orange-500/40 animate-pulse">
                        New
                    </span>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-0.5 relative z-10 pointer-events-none">
                    <h3 className={cn(
                        "text-[15px] font-extrabold tracking-tight leading-tight",
                        "text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors"
                    )}>
                        {config.label}
                    </h3>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold leading-normal">
                        {/* @ts-ignore */}
                        {config.description || "Tell me what to build next"}
                    </p>
                </div>

                {/* Bold Bottom Decorative Accent - Restored */}
                <div className={cn(
                    "absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r transition-all duration-500 z-20",
                    theme.gradientText
                )} />
            </div>

            {/* Tooltip hint for swipe (optional, but good for UX) */}
            <div className="mt-2 text-[10px] text-center text-zinc-400/50 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                ← Swipe to dismiss
            </div>
        </div>
    );
}
