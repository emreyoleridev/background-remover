import { Github } from "lucide-react";
import { siteConfig } from "@/config";

export function GithubForkButton() {
    return (
        <a
            href={`${siteConfig.author.socials.github}/${siteConfig.pk}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border bg-muted/50 hover:bg-muted hover:text-accent-foreground h-9 w-9"
            aria-label="GitHub Repository"
        >
            <Github className="h-5 w-5" />
        </a>
    );
}
