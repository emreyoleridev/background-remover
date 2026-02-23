import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row md:px-6 lg:px-8">
                <p className="text-sm leading-loose text-center md:text-left text-muted-foreground">
                    Built with ❤️ by{" "}
                    <a
                        href={siteConfig.authorGithubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        {siteConfig.authorName}
                    </a>
                </p>
                <div className="flex items-center space-x-4">
                    <a href={siteConfig.githubRepoUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
