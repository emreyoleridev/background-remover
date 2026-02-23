"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { getThemeClasses } from "@/lib/theme";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteFaq() {
    const theme = getThemeClasses();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-white/5 backdrop-blur-sm border-y border-white/5">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest bg-white/5 border border-white/10",
                        theme.text
                    )}>
                        <HelpCircle className="h-4 w-4" />
                        Common Questions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                        Frequently Asked <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", theme.gradientText)}>Questions</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Everything you need to know about our privacy-first tools and how we operate.
                    </p>
                </div>

                <div className="space-y-4">
                    {siteConfig.faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group rounded-2xl border transition-all duration-300 overflow-hidden",
                                openIndex === index
                                    ? "bg-white/[0.03] border-white/20 shadow-lg"
                                    : "bg-white/[0.01] border-white/5 hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left px-8 py-6 flex items-center justify-between gap-4"
                            >
                                <span className={cn(
                                    "text-xl font-bold transition-colors",
                                    openIndex === index ? "text-white" : "text-zinc-300 group-hover:text-white"
                                )}>
                                    {faq.question}
                                </span>
                                <ChevronDown className={cn(
                                    "h-6 w-6 text-zinc-500 transition-transform duration-300 flex-shrink-0",
                                    openIndex === index && "rotate-180 text-white"
                                )} />
                            </button>

                            <div className={cn(
                                "grid transition-all duration-300 ease-in-out",
                                openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}>
                                <div className="overflow-hidden">
                                    <div className="px-8 pb-8 text-lg text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
