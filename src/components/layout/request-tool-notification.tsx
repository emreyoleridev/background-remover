"use client";

import { useEffect, useState, useCallback } from "react";
import { Wand2 } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

/**
 * RequestToolNotification Component
 * 
 * A premium, interactive floating CTA built with Framer Motion.
 * Features:
 * - Delayed entry (5s)
 * - Swipe-right to dismiss
 * - Sharp "Blade" shine effect exclusively on the title text
 * - Theme-consistent colors with a vibrant glowing icon
 * - Persistent bottom accent border and "New" badge
 */
export function RequestToolNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const theme = getThemeClasses();
    const config = siteConfig.cta.requestTool;

    // Detect scroll to prevent appearance
    const handleScroll = useCallback(() => {
        if (typeof window !== "undefined" && window.scrollY > 0) {
            setHasScrolled(true);
        }
    }, []);

    useEffect(() => {
        if (!config.enabled || isDismissed) return;

        // Initial check
        if (typeof window !== "undefined" && window.scrollY > 0) {
            setHasScrolled(true);
            return;
        }

        window.addEventListener("scroll", handleScroll, { passive: true });

        const timer = setTimeout(() => {
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

    // Motion values for swipe-right dismissal
    const x = useMotionValue(0);
    const dragOpacity = useTransform(x, [0, 150], [1, 0]);

    const handleOpen = () => {
        // Only trigger click if it wasn't a significant drag
        const currentX = typeof x.get === "function" ? x.get() : 0;
        if (Math.abs(currentX) < 5) {
            window.open(config.url, "_blank", "noopener,noreferrer");
        }
    };

    if (!config.enabled || isDismissed || (hasScrolled && !isVisible)) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    role="alert"
                    aria-label="New tool request notification. Swipe right to dismiss."
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 0.95, transition: { duration: 0.2 } }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    dragElastic={0.05}
                    onDragEnd={(_, info) => {
                        // Dismiss if swiped more than 80px to the RIGHT
                        if (info.offset.x > 80) {
                            setIsDismissed(true);
                        }
                    }}
                    style={{ x, opacity: dragOpacity }}
                    className={cn(
                        "fixed z-[100]",
                        "top-[112px] right-6 md:right-8",
                        "cursor-grab active:cursor-grabbing"
                    )}
                >
                    <div
                        onClick={handleOpen}
                        className={cn(
                            "group relative flex items-center gap-4 p-4 pr-8 rounded-2xl select-none overflow-hidden",
                            "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl",
                            "border border-zinc-200 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]",
                            "transition-colors duration-300"
                        )}
                    >
                        {/* Iconic Section: Using site's primary accent color */}
                        <div className="relative pointer-events-none">
                            <div className={cn(
                                "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                                theme.bg, // Sites primary accent color (Amber)
                                "text-white shadow-lg",
                                "animate-glow-blue" // This class name is generic enough for the pulse effect
                            )}>
                                <Wand2 className="w-5 h-5 fill-white/10" />
                            </div>
                            {/* NEW Badge - Using site's theme accent */}
                            <span className={cn(
                                "absolute -top-1.5 -left-1.5 px-2 py-0.5 rounded-full",
                                theme.bg,
                                "text-[9px] font-black text-white uppercase tracking-tighter shadow-lg ring-1 ring-white/20"
                            )}>
                                New
                            </span>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-0.5 relative z-10 pointer-events-none">
                            <h3 className={cn(
                                "text-[16px] font-extrabold tracking-tight leading-tight",
                                "text-zinc-900 dark:text-zinc-50"
                            )}>
                                <span className="relative inline-block overflow-hidden">
                                    <span className="relative z-10">{config.label}</span>
                                    {/* Sharp Blade Shine Effect exclusively on title */}
                                    <span
                                        className="absolute inset-0 z-20 animate-text-shimmer select-none"
                                        aria-hidden="true"
                                    >
                                        {config.label}
                                    </span>
                                </span>
                            </h3>
                            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold leading-normal">
                                {/* @ts-ignore */}
                                {config.description || "Tell me what to build next"}
                            </p>
                        </div>

                        {/* Bold Primary Gradient Bottom Border */}
                        <div className={cn(
                            "absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r transition-all duration-500 z-20",
                            theme.gradientText
                        )} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
