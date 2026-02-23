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
import { Share2 } from "lucide-react";

export function ToolShell() {
    const theme = getThemeClasses();

    return (
        <Section className="pt-0 md:pt-0 pb-20">
            <Container className="max-w-3xl">
                <Card className="w-full shadow-lg border-border bg-card">
                    <CardHeader>
                        <CardTitle>Interactive Tool Demo</CardTitle>
                        <CardDescription>
                            Tool Content Goes Here. Replace this shell with your actual tool components.
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
                                    onClick={() => triggerSubscribeModal()}
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
                <div className="mt-8 flex justify-center w-full">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 group hover:bg-muted/50 rounded-full px-6 py-6 text-muted-foreground hover:text-foreground transition-all"
                        onClick={() => triggerShareModal()}
                    >
                        <span className="flex items-center justify-center p-2 rounded-full bg-muted group-hover:bg-background shadow-sm border border-border group-hover:scale-105 transition-all">
                            <Share2 className="h-4 w-4" />
                        </span>
                        <span className="font-medium">Share this tool</span>
                    </Button>
                </div>
            </Container>
        </Section>
    );
}
