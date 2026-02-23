"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { setLocalStorage } from "@/lib/storage";
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
import { Loader2, Send, Sparkle, Sparkles } from "lucide-react";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

export function SubscribeSection() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const theme = getThemeClasses();
    const config = siteConfig.integrations.subscribe;

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
            form.reset();
        } catch {
            toast.error("Failed to subscribe. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!config.enabled) return null;

    return (
        <section className={cn("relative py-12 border-y border-border/40 overflow-hidden")}>
            {/* Subtle mesh-like background to avoid plain single color */}
            <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className={cn("absolute top-0 right-0 w-[40%] h-full blur-[100px]", theme.bg)} />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* Left side: Heading & Description */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase leading-tight mb-2">
                            I build a <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>new tool</span> every <span className="relative inline-block px-2 italic after:absolute after:bottom-1 after:left-0 after:h-3 after:w-full after:bg-primary/30 after:-z-10 after:-skew-x-12">single</span> day.
                        </h2>
                        <p className="text-muted-foreground leading-relaxed max-w-md">
                            Join the newsletter to get every single tool I build delivered straight to your inbox, the moment it's shipped.
                        </p>
                    </div>

                    {/* Right side: Compact Form */}
                    <div className="w-full md:max-w-md">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full space-y-0 relative">
                                            <FormControl>
                                                <div className="relative group w-full">
                                                    <Input
                                                        placeholder="Enter your email"
                                                        className="h-14 px-6 pr-16 text-lg rounded-2xl border-border bg-background focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring transition-all"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={cn(
                                                            "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm",
                                                            theme.bg,
                                                            "text-white hover:scale-105 active:scale-95 disabled:opacity-50"
                                                        )}
                                                        aria-label="Submit email"
                                                    >
                                                        {isSubmitting ? (
                                                            <Loader2 className="h-5 w-5 animate-spin" />
                                                        ) : (
                                                            <Sparkles className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="absolute -bottom-6 left-0 text-xs font-medium" />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                </div>
            </Container>
        </section>
    );
}
