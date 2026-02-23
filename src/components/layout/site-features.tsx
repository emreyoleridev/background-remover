import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function SiteFeatures() {
    const theme = getThemeClasses();

    return (
        <Section className="bg-muted/30 border-y">
            <Container>
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
