"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { getLocalStorage, setLocalStorage } from "@/lib/storage";
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
import { subscribeSchema, SubscribeInput } from "@/lib/validators";
import { postSubscriptionEmail } from "@/lib/sheets";
import { getThemeClasses } from "@/lib/theme";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
    const config = siteConfig.subscribe;

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
                <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0f0f1a] p-10 md:p-16 shadow-2xl">
                    {/* Background Glow */}
                    <div className={`absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full ${theme.bg} opacity-10 blur-[100px] pointer-events-none`}></div>

                    <div className="relative z-10 flex flex-col items-start text-left w-full">
                        <DialogHeader className="space-y-4 mb-10 text-left items-start w-full">
                            <DialogTitle className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] uppercase">
                                I build a <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>new tool</span> <br />
                                every single day.
                            </DialogTitle>
                            <DialogDescription className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mt-2">
                                Never miss a release! Subscribe to my daily newsletter <br className="hidden md:block" />
                                to get every tool delivered to your inbox instantly.
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
                                                        className="h-20 px-8 text-xl md:text-2xl font-medium rounded-2xl border-2 border-zinc-800 bg-black/40 backdrop-blur-md focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-white/10 text-white placeholder:text-zinc-600 transition-all group-hover:border-zinc-700"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={`absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-xl ${theme.text} hover:bg-white/5 transition-all disabled:opacity-50`}
                                                        aria-label="Submit email"
                                                    >
                                                        {isSubmitting ? (
                                                            <Loader2 className="h-8 w-8 animate-spin" />
                                                        ) : (
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="h-8 w-8"
                                                            >
                                                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400 text-lg mt-3" />
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
