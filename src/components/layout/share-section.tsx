"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";
import { Copy, Twitter, Share2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ShareSection() {
    const [url, setUrl] = useState("");
    const theme = getThemeClasses();

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    if (!siteConfig.enableShareSection) return null;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(`Check out this tool on ${siteConfig.siteName}!`);

    const shareLinks = [
        {
            name: "X",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            variant: "outline" as const,
        },
        {
            name: "Reddit",
            icon: Share2,
            href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
            variant: "outline" as const,
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            variant: "outline" as const,
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy link.");
        }
    };

    return (
        <section className="py-12 border-t border-white/5">
            <div className="container max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-muted/20 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 text-center">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
                            Share this <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>tool</span>
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            If this tool helped you, consider sharing it with others.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
                        <Button
                            onClick={copyToClipboard}
                            className={cn(
                                "h-14 px-8 rounded-xl text-lg font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 w-full sm:w-auto",
                                theme.bg,
                                "text-white"
                            )}
                        >
                            <Copy className="h-5 w-5" />
                            Copy Link
                        </Button>

                        {shareLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant={link.variant}
                                asChild
                                className="h-14 px-8 rounded-xl text-lg font-bold uppercase tracking-wider border-zinc-800 hover:bg-zinc-800/50 hover:text-white transition-all active:scale-95 flex items-center gap-2 w-full sm:w-auto"
                            >
                                <a href={link.href} target="_blank" rel="noopener noreferrer">
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
