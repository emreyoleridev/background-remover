"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Copy, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getLogoUrl } from "@/lib/logos";
import { buildShareUrl, getShareData, openShare } from "@/lib/share";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getThemeClasses } from "@/lib/theme";

export function SharePill() {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [triggerHovered, setTriggerHovered] = useState(false);
    const pillRef = useRef<HTMLDivElement>(null);

    const theme = getThemeClasses();

    useEffect(() => { setMounted(true); }, []);

    if (!mounted || !siteConfig.integrations.share.enabled) return null;

    const enabledPlatforms = siteConfig.integrations.share.platforms.filter((p: any) => p.enabled);

    const handleShare = async (platform: any) => {
        if (platform.id === "copyLink") {
            handleCopy();
            return;
        }

        const shareData = getShareData();
        openShare(buildShareUrl(platform.template, shareData));
    };

    const handleCopy = async () => {
        const shareData = getShareData();
        try {
            await navigator.clipboard.writeText(shareData.url);
            toast.success("Link copied to clipboard!");
        } catch {
            toast.error("Failed to copy link.");
        }
    };

    const logoRadius = (platform: any) => {
        if (platform.domain === "linkedin.com") {
            return "rounded-sm";
        }
        return "rounded-full";
    };

    return (
        <div
            ref={pillRef}
            className="fixed z-[9998] flex flex-col items-end"
            style={{ bottom: "calc(18px + 56px + 24px)", right: "18px" }}
            onBlur={(e) => {
                if (!pillRef.current?.contains(e.relatedTarget as Node)) {
                    setOpen(false);
                }
            }}
        >
            {/* Single connected pill containing all icons + trigger at bottom */}
            <div className={cn(
                "flex flex-col items-center rounded-full shadow-2xl overflow-hidden transition-transform duration-300",
                triggerHovered && !open && "scale-110",
                theme.bg
            )}>
                {/* Expandable icon rows — slide open via max-h */}
                <div
                    className={cn(
                        "flex flex-col gap-3 items-center overflow-hidden transition-all duration-500 ease-in-out w-full",
                        open ? "max-h-[800px]" : "max-h-0"
                    )}
                >
                    {[...enabledPlatforms].map((platform) => {
                        const logoUrl = getLogoUrl(platform.domain);
                        return (
                            <Tooltip key={platform.id}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => handleShare(platform)}
                                        title={platform.name}
                                        className="cursor-pointer flex items-center justify-center flex-shrink-0 first:mt-4 last:mb-2"
                                        aria-label={`Share on ${platform.name}`}
                                    >
                                        {logoUrl ? (
                                            <div className="w-9 h-9 rounded-sm p-1.5 bg-white flex items-center justify-center shadow-sm overflow-hidden">
                                                <Image
                                                    src={logoUrl}
                                                    alt={platform.name}
                                                    width={28}
                                                    height={28}
                                                    className={cn("object-contain", logoRadius(platform))}
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-zinc-800 uppercase">
                                                <Copy className="h-4 w-4 text-zinc-700" />
                                            </div>
                                        )}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="left" sideOffset={12}>
                                    <p>Share on {platform.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>

                {/* FAB trigger — same width, bottom of pill */}
                <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
                    {/* Broadcast rings — only visible when closed */}
                    {!open && (
                        <>
                            <span className="absolute inset-0 rounded-full border-2" style={{ borderColor: theme.hex, opacity: 0.5, animation: "shareRing 2.2s ease-out infinite" }} />
                            <span className="absolute inset-0 rounded-full border-2" style={{ borderColor: theme.hex, opacity: 0.3, animation: "shareRing 2.2s ease-out infinite", animationDelay: "0.75s" }} />
                            <span className="absolute inset-0 rounded-full border-2" style={{ borderColor: theme.hex, opacity: 0.15, animation: "shareRing 2.2s ease-out infinite", animationDelay: "1.5s" }} />
                        </>
                    )}
                    <style>{`
                        @keyframes shareRing {
                            0%   { transform: scale(0.5); opacity: 0.9; }
                            100% { transform: scale(2.4); opacity: 0; }
                        }
                    `}</style>
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        onMouseEnter={() => setTriggerHovered(true)}
                        onMouseLeave={() => setTriggerHovered(false)}
                        className={cn(
                            "w-16 h-16 flex items-center justify-center flex-shrink-0",
                            "rounded-full transition-all duration-300 cursor-pointer hover:bg-black/20",
                            "focus-visible:outline-none relative z-10",
                            open && "rotate-[135deg]"
                        )}
                        aria-label="Share this page"
                    >
                        <Share2 className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
