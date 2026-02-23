import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
    return (
        <footer className="border-t py-8">
            <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4 md:px-6 lg:px-8 gap-4">
                <p className="text-sm leading-loose text-center text-muted-foreground">
                    Built with ❤️ by{" "}
                    <a
                        href={siteConfig.authorGithubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        {siteConfig.authorName}
                    </a>
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                    <span>•</span>
                    <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                    <span>•</span>
                    <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
                </div>
            </div>
        </footer>
    );
}
