"use client";

import * as React from "react";
import { siteConfig, contentConfig } from "@/config";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getThemeClasses } from "@/lib/boilerplate/theme";
import { cn } from "@/lib/boilerplate/utils";
import { Copy } from "lucide-react";
import { buildShareUrl, openShare } from "@/lib/boilerplate/share";
import { toast } from "sonner";

export const TRIGGER_SHARE_EVENT = "trigger-share";

export function triggerShareModal(url?: string) {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(TRIGGER_SHARE_EVENT, { detail: { url } }));
    }
}

export function ShareModal() {
    const [open, setOpen] = React.useState(false);
    const [shareUrl, setShareUrl] = React.useState("");
    const theme = getThemeClasses();
    const config = siteConfig.integrations.share;
    const content = contentConfig.modals.share;

    const handleCopy = async () => {
        if (!shareUrl) return;
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
        } catch {
            toast.error("Failed to copy link.");
        }
    };

    const renderTitle = (text: string, theme: any) => {
        if (!text) return null;
        const parts = text.split(/(\*[^*\n]+\*|_[^_\n]+_|\n)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <span key={index} className={cn("text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>{part.slice(1, -1)}</span>;
            }
            if (part.startsWith('_') && part.endsWith('_')) {
                return <span key={index} className="relative inline-block px-3 italic after:absolute after:bottom-1 after:left-0 after:h-4 md:after:h-6 after:w-full after:bg-zinc-200/60 dark:after:bg-primary/30 after:-z-10 after:-skew-x-12">{part.slice(1, -1)}</span>;
            }
            if (part === '\n') {
                return <br key={index} />;
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
        });
    };

    const handleShare = (platform: any) => {
        if (!shareUrl) return;
        const cleanName = siteConfig.siteName.replace("_", "");
        const shareData = {
            url: shareUrl,
            text: `${config.shareText} — ${cleanName}`,
            title: cleanName,
        };
        openShare(buildShareUrl(platform.template, shareData));
    };

    React.useEffect(() => {
        if (!config.enabled) return;

        const handleTrigger = (e: Event) => {
            const customEvent = e as CustomEvent<{ url?: string }>;
            if (customEvent.detail?.url) {
                setShareUrl(customEvent.detail.url);
            } else {
                setShareUrl(window.location.href);
            }
            setOpen(true);
        };

        window.addEventListener(TRIGGER_SHARE_EVENT, handleTrigger);
        return () => {
            window.removeEventListener(TRIGGER_SHARE_EVENT, handleTrigger);
        };
    }, [config.enabled]);

    if (!config.enabled) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="!max-w-[95vw] sm:!max-w-[1000px] w-full p-0 overflow-hidden border-0 bg-transparent shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] max-h-[90vh]"
            >
                <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-6 sm:p-10 md:p-16 shadow-2xl h-full flex flex-col sm:block">
                    {/* Background Glow - Theme aware */}
                    <div className={cn("absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-10 dark:opacity-20 blur-[100px] pointer-events-none", theme.bg)}></div>

                    <div className="relative z-10 flex flex-col items-start text-left w-full h-full sm:h-auto">
                        <DialogHeader className="space-y-2 md:space-y-4 mb-6 md:mb-10 text-left items-start w-full shrink-0">
                            <DialogTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.05] uppercase">
                                {renderTitle(content.title, theme)}
                            </DialogTitle>
                            <DialogDescription className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-2">
                                {content.description}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="w-full space-y-6 mt-0 flex-1 sm:flex-none">
                            {/* Platform Buttons */}
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">Choose a platform</p>
                                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                                    {config.platforms.filter((p: any) => p.enabled).map((platform: any) => (
                                        <button
                                            key={platform.id}
                                            onClick={() => handleShare(platform)}
                                            className={cn(
                                                "group relative cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-2 rounded-xl bg-black/5 dark:bg-white/5 p-2 sm:p-3 shadow-sm transition-all active:scale-95 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10",
                                                `hover:${theme.border}`
                                            )}
                                            aria-label={`Share on ${platform.name}`}
                                        >
                                            <div className="relative h-8 w-8 sm:h-10 sm:w-10 flex flex-shrink-0 items-center justify-center rounded-md bg-transparent overflow-hidden">
                                                {platform.id === "x" ? (
                                                    <>
                                                        <img
                                                            src="/logos/x_dark.svg"
                                                            alt={platform.name}
                                                            className="hidden dark:block h-5 w-5 sm:h-7 sm:w-7 object-contain"
                                                        />
                                                        <img
                                                            src="/logos/x_light.svg"
                                                            alt={platform.name}
                                                            className="block dark:hidden h-5 w-5 sm:h-7 sm:w-7 object-contain"
                                                        />
                                                    </>
                                                ) : (
                                                    <img
                                                        src={`/logos/${platform.id}.svg`}
                                                        alt={platform.name}
                                                        className="h-5 w-5 sm:h-7 sm:w-7 object-contain"
                                                    />
                                                )}
                                            </div>
                                            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block">
                                                {platform.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Copy Link Input */}
                            <div className="space-y-3 sm:space-y-4 mt-auto pt-4 pb-2">
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">Or copy the link</p>
                                <div className="relative group w-full">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shareUrl}
                                        onClick={handleCopy}
                                        tabIndex={-1}
                                        className="cursor-pointer select-none w-full h-12 sm:h-14 md:h-16 px-4 sm:px-5 md:px-6 pr-14 sm:pr-16 md:pr-20 text-sm sm:text-base md:text-lg font-medium rounded-2xl border border-border bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground text-ellipsis transition-all"
                                        placeholder={typeof window !== "undefined" ? window.location.href : "Generating link..."}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className={cn(
                                            "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all shadow-sm",
                                            theme.bg,
                                            "text-white hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                        )}
                                        aria-label="Copy link"
                                        title="Copy link"
                                    >
                                        <Copy className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
