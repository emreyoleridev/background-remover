"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getThemeClasses } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { buildShareUrl, openShare } from "@/lib/share";
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

    const handleCopy = async () => {
        if (!shareUrl) return;
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
        } catch {
            toast.error("Failed to copy link.");
        }
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
                className="!max-w-[95vw] sm:!max-w-[850px] w-full p-0 overflow-hidden border-0 bg-transparent shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-10 md:p-16 shadow-2xl">
                    {/* Background Glow - Theme aware */}
                    <div className={cn("absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-10 dark:opacity-20 blur-[100px] pointer-events-none", theme.bg)}></div>

                    <div className="relative z-10 flex flex-col items-start text-left w-full">
                        <DialogHeader className="space-y-4 mb-10 text-left items-start w-full">
                            <DialogTitle className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05] uppercase">
                                <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>SHARE</span> THIS TOOL WITH YOUR <span className="relative inline-block px-3 italic after:absolute after:bottom-1 after:left-0 after:h-4 md:after:h-6 after:w-full after:bg-zinc-200/60 dark:after:bg-primary/30 after:-z-10 after:-skew-x-12">FRIENDS</span>.
                            </DialogTitle>
                            <DialogDescription className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-2">
                                Everything is free, unlimited, and runs locally in your browser. Share it anywhere in seconds.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="w-full space-y-6 mt-0">
                            {/* Platform Buttons */}
                            <div className="space-y-4">
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Choose a platform</p>
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[40vh] md:max-h-none overflow-y-auto pr-1 pb-1">
                                    {config.platforms.filter((p: any) => p.enabled).map((platform: any) => (
                                        <button
                                            key={platform.id}
                                            onClick={() => handleShare(platform)}
                                            className={cn(
                                                "group relative flex flex-col items-center justify-center gap-2 rounded-xl bg-black/5 dark:bg-white/5 p-3 shadow-sm transition-all active:scale-95 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10",
                                                `hover:${theme.border}`
                                            )}
                                            aria-label={`Share on ${platform.name}`}
                                        >
                                            <div className="relative h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-md bg-transparent overflow-hidden">
                                                {platform.id === "x" ? (
                                                    <>
                                                        <img
                                                            src="/logos/x_dark.svg"
                                                            alt={platform.name}
                                                            className="hidden dark:block h-7 w-7 object-contain"
                                                        />
                                                        <img
                                                            src="/logos/x_light.svg"
                                                            alt={platform.name}
                                                            className="block dark:hidden h-7 w-7 object-contain"
                                                        />
                                                    </>
                                                ) : (
                                                    <img
                                                        src={`/logos/${platform.id}.svg`}
                                                        alt={platform.name}
                                                        className="h-7 w-7 object-contain"
                                                    />
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                {platform.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Copy Link Input */}
                            <div className="space-y-4">
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Or copy the link</p>
                                <div className="relative group w-full">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shareUrl}
                                        onClick={handleCopy}
                                        tabIndex={-1}
                                        className="cursor-pointer select-none w-full h-14 md:h-16 px-5 md:px-6 pr-16 md:pr-20 text-base md:text-lg font-medium rounded-2xl border border-border bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground text-ellipsis transition-all"
                                        placeholder="Generating link..."
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className={cn(
                                            "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all shadow-sm",
                                            theme.bg,
                                            "text-white hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                        )}
                                        aria-label="Copy link"
                                        title="Copy link"
                                    >
                                        <Copy className="h-4 w-4 md:h-5 md:w-5" />
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
