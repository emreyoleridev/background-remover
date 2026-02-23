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
            if (!config.googleSheetsEndpoint || config.googleSheetsEndpoint === "YOUR_GOOGLE_SHEETS_ENDPOINT_HERE") {
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
                className="!max-w-[95vw] sm:!max-w-[1200px] w-full p-0 overflow-hidden border-0 bg-transparent shadow-[0_0_150px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-12 md:p-24 text-center shadow-2xl`}>

                    {/* Decorative gradient orb */}
                    <div className={`absolute -top-32 -right-32 h-96 w-96 rounded-full ${theme.bg} opacity-20 blur-[100px] pointer-events-none`}></div>
                    <div className={`absolute -bottom-32 -left-32 h-96 w-96 rounded-full ${theme.bg} opacity-20 blur-[100px] pointer-events-none`}></div>

                    <DialogHeader className="space-y-6 mb-10 text-center relative z-10">
                        <DialogTitle className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                            Don&apos;t miss the <br className="hidden md:block" />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>next free tool.</span>
                        </DialogTitle>
                        <DialogDescription className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
                            I build a new free, fast, and secure client-side tool every single day.
                            Subscribe to get notified. If you close this, we won&apos;t ask again.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10 max-w-lg mx-auto w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="you@awesome.com"
                                                className="h-16 px-6 text-lg md:text-xl rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-zinc-600 text-white placeholder:text-zinc-500 shadow-inner"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-base" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className={`w-full h-16 text-lg md:text-xl font-bold rounded-xl ${theme.bg} text-white shadow-lg transition-transform hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] border border-white/10`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-3 h-6 w-6 animate-spin" />}
                                {isSubmitting ? "Subscribing..." : "Join the Daily List"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
