import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
    return (
        <footer className="border-t py-8">
            <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4 md:px-6 lg:px-8 gap-4">
                <div className="flex flex-col items-center gap-2">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground/80">
                        <span>Built with</span>
                        <span className="inline-block animate-pulse text-red-500 group-hover:scale-110 transition-transform cursor-default">❤️</span>
                        <span>by</span>
                        <a
                            href={siteConfig.authorGithubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="relative group transition-all duration-300"
                        >
                            <span className="relative z-10 text-foreground font-semibold px-1 group-hover:text-primary transition-colors">
                                {siteConfig.authorName}
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20 group-hover:h-full group-hover:bg-primary/5 transition-all duration-300 rounded-sm"></span>
                        </a>
                    </p>
                </div>
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
