"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { siteConfig, contentConfig } from "@/config";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";

export const TRIGGER_DISCOVER_MORE_EVENT = "trigger-discover-more";

export function triggerDiscoverMoreCTA() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(TRIGGER_DISCOVER_MORE_EVENT));
    }
}

/**
 * DiscoverMoreCTA Component
 * 
 * A fixed bottom-left CTA card that encourages users to discover more tools.
 */
export function DiscoverMoreCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const config = contentConfig.cta.discoverMore;
    const feedbackConfig = contentConfig.cta.requestTool;
    const theme = getThemeClasses();

    const x = useMotionValue(0);
    const dragOpacity = useTransform(x, [0, -150], [1, 0]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTrigger = () => {
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);
        };

        window.addEventListener(TRIGGER_DISCOVER_MORE_EVENT, handleTrigger);
        return () => {
            window.removeEventListener(TRIGGER_DISCOVER_MORE_EVENT, handleTrigger);
            if (timer) clearTimeout(timer);
        };
    }, []);

    if (!config.enabled || isDismissed || !isVisible) {
        return null;
    }

    const content = (
        <div
            className={cn(
                "group relative flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl select-none overflow-hidden",
                "bg-white dark:bg-zinc-900 backdrop-blur-md",
                "border border-zinc-200 dark:border-white/10 shadow-xl",
                "w-full sm:w-[380px]",
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
                    "relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300",
                    theme.iconBg,
                    "shadow-sm",
                    theme.text
                )}>
                    {config.icon && <config.icon className="w-5 h-5 sm:w-6 sm:h-6 fill-current/10" />}
                </div>

                {/* Text block */}
                <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-0.5">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                        {config.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
                        {config.subtitle}
                    </p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="relative z-10 flex gap-2 w-full mt-2">
                <a
                    href={`${feedbackConfig.url}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className={cn(
                        "flex-1 flex items-center justify-center px-3 py-2 rounded-sm transition-all duration-300",
                        "bg-zinc-100 dark:bg-white/10 border border-zinc-200/50 dark:border-white/10",
                        "hover:bg-zinc-200 dark:hover:bg-white/20",
                        "text-zinc-700 dark:text-zinc-300 text-xs font-semibold"
                    )}
                    onClick={() => setIsDismissed(true)}
                >
                    Give Feedback
                </a>
                <a
                    href={`${config.href}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className={cn(
                        "flex-1 flex items-center justify-center px-3 py-2 rounded-sm transition-all duration-300",
                        theme.bg,
                        "text-white hover:opacity-90",
                        "text-xs font-bold"
                    )}
                    onClick={() => setIsDismissed(true)}
                >
                    Discover more
                </a>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {!isDismissed && isVisible && (
                <motion.div
                    role="alert"
                    aria-label="Discover more tools notification. Swipe left to dismiss."
                    initial={{ opacity: 0, x: -100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -200, scale: 0.95, transition: { duration: 0.2 } }}
                    drag="x"
                    dragConstraints={{ left: -300, right: 0 }}
                    dragElastic={0.05}
                    onDragEnd={(_, info) => {
                        if (info.offset.x < -80) {
                            setIsDismissed(true);
                        }
                    }}
                    style={{ x, opacity: dragOpacity }}
                    className={cn(
                        "fixed z-40",
                        "left-4 right-4 bottom-4",
                        "sm:left-8 sm:right-auto sm:bottom-8",
                        "cursor-grab active:cursor-grabbing"
                    )}
                >
                    {content}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
