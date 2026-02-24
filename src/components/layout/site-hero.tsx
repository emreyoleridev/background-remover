import { siteConfig, contentConfig } from "@/config";
import { getThemeClasses } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/common/container";

export function SiteHero() {
    const theme = getThemeClasses();

    return (
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 lg:pb-16">
            {/* Subtle background glow */}
            <div className="absolute inset-x-0 top-32 -z-10 flex justify-center opacity-30 dark:opacity-20 pointer-events-none">
                <div className={`h-[300px] w-[500px] sm:w-[800px] rounded-full blur-[100px] md:blur-[120px] ${theme.bg}`} />
            </div>

            <Container className="flex flex-col items-center text-center">
                <div className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-8 ${theme.badge}`}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {contentConfig.hero.badgeText}
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                    <span className="block text-zinc-900 dark:text-white leading-[1.1]">{contentConfig.hero.title.split("_")[0]}</span>
                    <span className={cn("block mt-2 text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>
                        {contentConfig.hero.title.split("_")[1]}
                    </span>
                </h1>

                <p className="max-w-[42rem] mx-auto leading-normal text-zinc-600 dark:text-zinc-400 sm:text-xl sm:leading-8">
                    {contentConfig.hero.subtitle}
                </p>
            </Container>
        </section>
    );
}
