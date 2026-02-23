"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";
import { getLogoUrl } from "@/lib/logos";
import { buildShareUrl, getShareData, openShare } from "@/lib/share";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "share_pill_dismissed";

export function SharePill() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(true);
    const theme = getThemeClasses();

    useEffect(() => {
        if (!siteConfig.share.enabled) return;

        if (siteConfig.share.rememberDismiss) {
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (dismissed === "1") return;
        }

        setIsDismissed(false);
        setIsVisible(true);
    }, []);

    if (isDismissed || !siteConfig.share.enabled) return null;

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsDismissed(true);
            if (siteConfig.share.rememberDismiss) {
                localStorage.setItem(STORAGE_KEY, "1");
            }
        }, 300);
    };

    const handleShare = async (platform: typeof siteConfig.share.platforms[number]) => {
        const shareData = getShareData();

        if (platform.action === "copyLink" || platform.action === "copyOnly") {
            try {
                await navigator.clipboard.writeText(shareData.url);
                if (platform.id === "copy") {
                    toast.success("Link copied to clipboard!");
                } else {
                    toast.success(`Link copied — paste it into ${platform.name}`);
                }
            } catch (err) {
                toast.error("Failed to copy link.");
            }
            return;
        }

        if (platform.action === "shareUrl" && platform.template) {
            const shareUrl = buildShareUrl(platform.template, shareData);
            openShare(shareUrl);
        }
    };

    return (
        <div className={cn(
            "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        )}>
            <div className="flex flex-col items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    {siteConfig.share.shareText}
                </span>

                <div className={cn(
                    "flex items-center gap-2 rounded-full h-14 sm:h-16 px-2 sm:px-3 shadow-2xl border border-white/10 backdrop-blur-md max-w-[92vw]",
                    siteConfig.accentColor === "emerald" ? "bg-emerald-600/90" :
                        siteConfig.accentColor === "teal" ? "bg-teal-600/90" :
                            siteConfig.accentColor === "indigo" ? "bg-indigo-600/90" :
                                siteConfig.accentColor === "blue" ? "bg-blue-600/90" :
                                    siteConfig.accentColor === "violet" ? "bg-violet-600/90" : "bg-zinc-800/90"
                )}>
                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors border border-white/5"
                        aria-label="Close share menu"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>

                    {/* Icons Row */}
                    <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto px-2 py-1 scrollbar-hide no-scrollbar">
                        {siteConfig.share.platforms.map((platform) => {
                            if (!platform.enabled) return null;
                            const logoUrl = getLogoUrl(platform.domain);

                            return (
                                <button
                                    key={platform.id}
                                    onClick={() => handleShare(platform)}
                                    className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-white/10 flex items-center justify-center transition-all active:scale-90"
                                    aria-label={`Share on ${platform.name}`}
                                >
                                    {logoUrl ? (
                                        <Image
                                            src={logoUrl}
                                            alt={platform.name}
                                            width={26}
                                            height={26}
                                            className="opacity-95 rounded-sm"
                                            unoptimized // For logo.dev external images
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                            {platform.id === "copy" ? <Copy className="h-4 w-4" /> : platform.name[0]}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
