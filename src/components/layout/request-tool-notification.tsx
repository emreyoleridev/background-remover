"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { siteConfig, contentConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

/**
 * RequestToolNotification Component
 * 
 * A premium, interactive floating CTA built with Framer Motion.
 */
export function RequestToolNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const theme = getThemeClasses();
    const config = contentConfig.cta.requestTool;

    const handleScroll = useCallback(() => {
        if (typeof window !== "undefined" && window.scrollY > 0) {
            setHasScrolled(true);
        }
    }, []);

    useEffect(() => {
        if (!config.enabled || isDismissed) return;

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

    const x = useMotionValue(0);
    const dragOpacity = useTransform(x, [0, 150], [1, 0]);

    const handleOpen = () => {
        window.open(`${config.url}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`, "_blank", "noopener,noreferrer");
        setIsDismissed(true);
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
                        if (info.offset.x > 80) {
                            setIsDismissed(true);
                        }
                    }}
                    style={{ x, opacity: dragOpacity }}
                    className={cn(
                        "fixed z-[100]",
                        "top-20 right-4 left-4 sm:left-auto sm:right-6",
                        "sm:w-[360px]",
                        "cursor-grab active:cursor-grabbing"
                    )}
                >
                    <div
                        onClick={handleOpen}
                        role="button"
                        aria-label="Open request tool"
                        className={cn(
                            "group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 pr-6 sm:pr-8 rounded-2xl select-none overflow-hidden",
                            "bg-white dark:bg-zinc-900 backdrop-blur-md",
                            "border border-zinc-200 dark:border-white/10 shadow-xl w-full",
                            "transition-all duration-300",
                            "hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20",
                            "cursor-pointer"
                        )}
                    >
                        {/* Subtle Accent Glow */}
                        <div className={cn(
                            "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                            "bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/5"
                        )} />

                        {/* Iconic Section */}
                        <div className="relative z-10 pointer-events-none">
                            <div className={cn(
                                "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                                theme.iconBg,
                                "shadow-sm",
                                theme.text
                            )}>
                                {config.icon && <config.icon className="w-5 h-5 fill-current/10" />}
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-0.5 relative z-10 pointer-events-none">
                            <h3 className={cn(
                                "text-sm font-semibold tracking-tight leading-tight",
                                "text-zinc-900 dark:text-white"
                            )}>
                                <span className="relative inline-block overflow-hidden">
                                    <span className="relative z-10">{config.label}</span>
                                    <span
                                        className="absolute inset-0 z-20 animate-text-shimmer select-none"
                                        aria-hidden="true"
                                    >
                                        {config.label}
                                    </span>
                                </span>
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                                {/* @ts-ignore */}
                                {config.description || "Tell me what to build next!"}
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
