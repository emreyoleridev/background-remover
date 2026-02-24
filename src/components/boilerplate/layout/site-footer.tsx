import Link from "next/link";
import { siteConfig } from "@/config";
import { Fragment } from "react";

export function SiteFooter() {
    const author = siteConfig.author;
    const socials = [
        { name: "GitHub", href: author.socials.github },
        { name: "LinkedIn", href: author.socials.linkedin },
        { name: "Twitter", href: author.socials.twitter },
        { name: "Reddit", href: author.socials.reddit },
        { name: "Instagram", href: author.socials.instagram },
        { name: "TikTok", href: author.socials.tiktok },
        { name: "YouTube", href: author.socials.youtube },
        { name: "Product Hunt", href: author.socials.productHunt },

    ];

    const staticPolicies = [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Disclaimer", href: "/disclaimer" },
    ];

    return (
        <footer className="border-t py-6">
            <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4 md:px-6 lg:px-8 gap-6">
                <p className="text-sm leading-loose text-center text-muted-foreground">
                    Built with ❤️ by{" "}
                    <a
                        href={`${author.socials.github}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        {author.name}
                    </a>
                </p>

                {/* Social Links Separated by Dots */}
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm font-medium text-muted-foreground">
                    {socials.map((social, index) => (
                        <Fragment key={social.name}>
                            <a
                                href={`${social.href}?ref=${siteConfig.siteName.replace('_', '').toLowerCase()}`}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground transition-colors"
                            >
                                {social.name}
                            </a>
                            {index < socials.length - 1 && (
                                <span className="opacity-50 select-none">•</span>
                            )}
                        </Fragment>
                    ))}
                </div>

                {/* Separator HR */}
                <div className="w-full flex justify-center">
                    <hr className="w-full border-t border-border/50" />
                </div>

                {/* Static Policies Section */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-muted-foreground/60">
                    {staticPolicies.map((policy, index) => (
                        <Fragment key={policy.title}>
                            <Link
                                href={policy.href}
                                className="hover:text-foreground transition-colors"
                            >
                                {policy.title}
                            </Link>
                            {index < staticPolicies.length - 1 && (
                                <span className="opacity-30 select-none">|</span>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </footer>
    );
}
