"use client";

import * as React from "react";
import { siteConfig, contentConfig } from "@/config";
import { getLocalStorage, setLocalStorage } from "@/lib/boilerplate/storage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema, SubscribeInput } from "@/lib/boilerplate/validators";
import { postSubscriptionEmail } from "@/lib/boilerplate/sheets";
import { getThemeClasses } from "@/lib/boilerplate/theme";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/boilerplate/utils";

export const TRIGGER_SUBSCRIBE_EVENT = "trigger-subscribe";

export function triggerSubscribeModal() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(TRIGGER_SUBSCRIBE_EVENT));
    }
}

export function SubscribeModal() {
    const [open, setOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const theme = getThemeClasses();
    const config = siteConfig.integrations.subscribe;
    const content = contentConfig.modals.subscribe;

    React.useEffect(() => {
        if (!config.enabled) return;

        const handleTrigger = () => {
            const dismissed = getLocalStorage("bp_subscribe_dismissed");
            const submitted = getLocalStorage("bp_subscribe_submitted");
            if (dismissed || submitted) return;

            setTimeout(() => {
                setOpen(true);
            }, config.delaySecondsAfterSuccess * 1000);
        };

        window.addEventListener(TRIGGER_SUBSCRIBE_EVENT, handleTrigger);
        return () => {
            window.removeEventListener(TRIGGER_SUBSCRIBE_EVENT, handleTrigger);
        };
    }, [config]);

    const form = useForm<SubscribeInput>({
        resolver: zodResolver(subscribeSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: SubscribeInput) => {
        try {
            setIsSubmitting(true);
            if (!config.googleSheetsEndpoint) {
                toast.error("Subscribe endpoint not configured yet.");
                setIsSubmitting(false);
                return;
            }

            await postSubscriptionEmail(data.email);
            setLocalStorage("bp_subscribe_submitted", "true");
            toast.success("Thanks for subscribing!");
            setOpen(false);
        } catch {
            toast.error("Failed to subscribe. Please try again later.");
        } finally {
            setIsSubmitting(false);
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

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen && !isSubmitting) {
            setLocalStorage("bp_subscribe_dismissed", "true");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="!max-w-[95vw] sm:!max-w-[850px] w-full p-0 overflow-hidden border-0 bg-transparent shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-6 sm:p-10 md:p-16 shadow-2xl">
                    {/* Background Glow - Theme aware */}
                    <div className={cn("absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-10 dark:opacity-20 blur-[100px] pointer-events-none", theme.bg)}></div>

                    <div className="relative z-10 flex flex-col items-start text-left w-full">
                        <DialogHeader className="space-y-2 md:space-y-4 mb-6 md:mb-10 text-left items-start w-full">
                            <DialogTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.05] uppercase">
                                {renderTitle(content.title, theme)}
                            </DialogTitle>
                            <DialogDescription className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-2">
                                {content.description}
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <div className="relative group w-full">
                                                    <Input
                                                        placeholder="Email address"
                                                        className="h-14 sm:h-16 md:h-20 px-4 sm:px-6 md:px-8 text-base sm:text-lg md:text-xl md:text-2xl font-medium rounded-2xl border-border bg-muted/30 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring text-foreground placeholder:text-muted-foreground transition-all pr-[72px] sm:pr-[84px] md:pr-[100px]"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={cn(
                                                            "absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 flex items-center justify-center rounded-xl transition-all shadow-sm",
                                                            theme.bg,
                                                            "text-white hover:scale-105 active:scale-95 disabled:opacity-50"
                                                        )}
                                                        aria-label="Submit email"
                                                    >
                                                        {isSubmitting ? (
                                                            <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-spin" />
                                                        ) : (
                                                            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-destructive text-lg mt-3" />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
