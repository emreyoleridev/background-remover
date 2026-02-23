import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteFeatures() {
    const theme = getThemeClasses();

    return (
        <Section className="bg-muted/30 border-y">
            <Container>
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest bg-muted border border-border",
                        theme.text
                    )}>
                        <Sparkles className="h-4 w-4" />
                        Why Choose Us
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
                        Built for{" "}
                        <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>
                            Privacy
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Every tool is engineered to run entirely in your browser <br />no servers, no tracking, no compromises.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid gap-8 md:grid-cols-3">
                    {siteConfig.features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm transition-all hover:shadow-md">
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${theme.iconBg}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
