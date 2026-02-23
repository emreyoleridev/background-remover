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

export const subscribeEventTarget = new EventTarget();
export const TRIGGER_SUBSCRIBE_EVENT = "trigger-subscribe";

export function triggerSubscribeModal() {
    subscribeEventTarget.dispatchEvent(new Event(TRIGGER_SUBSCRIBE_EVENT));
}

export function SubscribeModal() {
    const [open, setOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const theme = getThemeClasses();
    const config = siteConfig.subscribe;

    React.useEffect(() => {
        if (!config.enabled) return;

        const handleTrigger = () => {
            const dismissed = getLocalStorage(config.localStorageKeyDismissed);
            const submitted = getLocalStorage(config.localStorageKeySubmitted);
            if (dismissed || submitted) return;

            setTimeout(() => {
                setOpen(true);
            }, config.delaySecondsAfterSuccess * 1000);
        };

        subscribeEventTarget.addEventListener(TRIGGER_SUBSCRIBE_EVENT, handleTrigger);
        return () => {
            subscribeEventTarget.removeEventListener(TRIGGER_SUBSCRIBE_EVENT, handleTrigger);
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
            setLocalStorage(config.localStorageKeySubmitted, "true");
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
            setLocalStorage(config.localStorageKeyDismissed, "true");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Don&apos;t miss the next one.</DialogTitle>
                    <DialogDescription>
                        I build a new free tool every day. Get notified when the next one drops.
                        If you close this, we won&apos;t ask again.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className={`w-full ${theme.bg} text-primary-foreground hover:opacity-90 transition-opacity`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
