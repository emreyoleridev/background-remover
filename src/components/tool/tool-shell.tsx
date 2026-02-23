"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { getThemeClasses } from "@/lib/theme";
import { triggerSubscribeModal } from "@/components/common/subscribe-modal";
import { triggerShareModal } from "@/components/share/share-modal";
import { triggerDiscoverMoreCTA } from "@/components/layout/discover-more-cta";
import { cn } from "@/lib/utils";
import { contentConfig } from "@/config/site";

export function ToolShell() {
    const theme = getThemeClasses();

    return (
        <Section className="pt-0 md:pt-0 lg:pt-0 pb-20">
            <Container className="max-w-3xl">
                <Card className="w-full shadow-lg border-border bg-card">
                    <CardHeader>
                        <CardTitle>{contentConfig.tool.demo.title}</CardTitle>
                        <CardDescription>
                            {contentConfig.tool.demo.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="input" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="input">Input</TabsTrigger>
                                <TabsTrigger value="output">Output</TabsTrigger>
                            </TabsList>
                            <TabsContent value="input" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="demo-input">Sample Input</Label>
                                    <Input id="demo-input" placeholder="Type something to generate..." />
                                </div>
                                <Button
                                    className={`w-full ${theme.bg} hover:opacity-90 text-primary-foreground border-none`}
                                    variant="default"
                                    onClick={() => {
                                        triggerSubscribeModal();
                                        triggerDiscoverMoreCTA();
                                    }}
                                >
                                    Generate Output
                                </Button>
                            </TabsContent>
                            <TabsContent value="output" className="space-y-4">
                                <div className="rounded-md bg-muted p-4 min-h-[120px] flex items-center justify-center border border-dashed rounded-xl">
                                    <span className="text-muted-foreground">Generated output will appear here.</span>
                                </div>
                                <Button variant="outline" className="w-full border-border">
                                    Copy to Clipboard
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Share Trigger */}
                <div className="mt-8 flex w-full justify-center">
                    <button
                        onClick={() => triggerShareModal()}
                        className={cn(
                            "group relative flex flex-col gap-4 p-4 rounded-2xl select-none overflow-hidden",
                            "bg-white dark:bg-zinc-900 backdrop-blur-md",
                            "border border-zinc-200 dark:border-white/10 shadow-xl",
                            "w-full max-w-[320px] sm:max-w-[380px]",
                            "transition-all duration-500 ease-out",
                            "hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-2xl",
                            "cursor-pointer text-left"
                        )}
                    >
                        {/* Subtle Accent Glow */}
                        <div className={cn(
                            "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                            "bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/5"
                        )} />



                        <div className="flex items-center gap-4">
                            {/* Left accent icon block */}
                            <div className={cn(
                                "relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                                theme.iconBg,
                                "shadow-sm",
                                theme.text
                            )}>
                                {contentConfig.tool.sharePrompt.icon && <contentConfig.tool.sharePrompt.icon className="w-6 h-6 fill-current/10" />}
                            </div>

                            {/* Text block */}
                            <div className="relative z-10 flex-1 min-w-0 flex flex-col">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white  tracking-tight">
                                    {contentConfig.tool.sharePrompt.title}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 ">
                                    {contentConfig.tool.sharePrompt.description}
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </Container>
        </Section>
    );
}
