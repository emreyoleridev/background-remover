import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { getThemeClasses } from "@/lib/theme";

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
                                <Button className={`w-full ${theme.bg} hover:opacity-90 text-primary-foreground border-none`} variant="default">
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
            </Container>
        </Section>
    );
}
