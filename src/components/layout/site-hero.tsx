import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";
import { Shield } from "lucide-react";
import { Container } from "@/components/common/container";

export function SiteHero() {
    const theme = getThemeClasses();

    return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
            {/* Subtle background glow */}
            <div className="absolute inset-x-0 top-32 -z-10 flex justify-center opacity-30 dark:opacity-20 pointer-events-none">
                <div className={`h-[300px] w-[500px] sm:w-[800px] rounded-full blur-[100px] md:blur-[120px] ${theme.bg}`} />
            </div>

            <Container className="flex flex-col items-center text-center">
                <div className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-8 ${theme.badge}`}>
                    <Shield className="mr-2 h-4 w-4" />
                    {siteConfig.hero.badgeText}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                    <span className="block text-foreground">{siteConfig.hero.title.split("_")[0]}</span>
                    <span className={`block mt-2 bg-gradient-to-r bg-clip-text text-transparent ${theme.gradientText}`}>
                        {siteConfig.hero.title.split("_")[1]}
                    </span>
                </h1>

                <p className="max-w-[42rem] mx-auto leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    {siteConfig.hero.subtitle}
                </p>
            </Container>
        </section>
    );
}
