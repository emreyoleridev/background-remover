import Link from "next/link";
import { Shield } from "lucide-react";
import { siteConfig } from "@/config/site";
import { GithubForkButton } from "@/components/common/github-fork-button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { getThemeClasses } from "@/lib/theme";

export function SiteHeader() {
    const theme = getThemeClasses();
    const HeaderIcon = siteConfig.headerIcon;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 text-foreground">
                        <HeaderIcon className="h-5 w-5" />
                        <span className="font-bold sm:inline-block">
                            {siteConfig.siteName.split("_")[0]}
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                                {siteConfig.siteName.split("_")[1]}
                            </span>
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <GithubForkButton />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
