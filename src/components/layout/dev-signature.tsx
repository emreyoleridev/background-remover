"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getThemeClasses } from "@/lib/theme";
import { Container } from "@/components/common/container";

/**
 * DevSignature Component
 * 
 * Renders a large-scale ASCII-art version of "// EMREYOLERI"
 * as an absolute overlay under the marquee banner.
 */
export function DevSignature() {
    const { brand } = siteConfig as any;
    const theme = getThemeClasses();

    if (!brand?.signatureEnabled) {
        return null;
    }

    // Exact ASCII provided by USER - Escaped backslashes for TS compatibility
    const asciiChunk = `
   /$$ /$$  
  / $$/ $$  
 /$$$$$$$$$$
|   $$  $$_/
 /$$$$$$$$$$
|_  $$  $$_/
  | $$| $$  
  |__/|__/  
            
            
            
`;

    const asciiMiddle = `
       /$$$$$$$$ /$$      /$$ /$$$$$$$  /$$$$$$$$ /$$     /$$ /$$$$$$  /$$       /$$$$$$$$ /$$$$$$$  /$$$$$$
      | $$_____/| $$$    /$$$| $$__  $$| $$_____/|  $$   /$$//$$__  $$| $$      | $$_____/| $$__  $$|_  $$_/
      | $$      | $$$$  /$$$$| $$  \\ $$| $$       \\  $$ /$$/| $$  \\ $$| $$      | $$      | $$  \\ $$  | $$  
      | $$$$$   | $$ $$/$$ $$| $$$$$$$/| $$$$$     \\  $$$$/ | $$  | $$| $$      | $$$$$   | $$$$$$$/  | $$  
      | $$__/   | $$  $$$| $$| $$__  $$| $$__/      \\  $$/  | $$  | $$| $$      | $$__/   | $$__  $$  | $$  
      | $$      | $$\\  $ | $$| $$  \\ $$| $$          | $$   | $$  | $$| $$      | $$      | $$  \\ $$  | $$  
      | $$$$$$$$| $$ \\/  | $$| $$  | $$| $$$$$$$$    | $$   |  $$$$$$/| $$$$$$$$| $$$$$$$$| $$  | $$ /$$$$$$
      |________/|__/     |__/|__/  |__/|________/    |__/    \\______/ |________/|________/|__/  |__/|______/
                                                                                                            
                                                                                                            
                                                                                                            
`;

    const asciiEnd = `
     /$$$$$$$  /$$$$$$$$ /$$    /$$
    | $$__  $$| $$_____/| $$   | $$
    | $$  \\ $$| $$      | $$   | $$
    | $$  | $$| $$$$$   |  $$ / $$/
    | $$  | $$| $$__/    \\  $$ $$/ 
    | $$  | $$| $$        \\  $$$/  
 /$$| $$$$$$$/| $$$$$$$$   \\  $/   
|__/|_______/ |________/    \\_/    
                                   
                                   
                                   
`;



    return (
        <div className="relative h-0 w-full z-20 pointer-events-none">
            <Container className="relative pointer-events-none">
                <div className="absolute top-[6px] left-4 md:left-6 lg:left-8 pointer-events-auto">
                    <Link
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "group flex items-end max-w-fit",
                            "text-foreground/80 hover:text-foreground transition-all duration-300",
                            "cursor-pointer select-none [text-shadow:0_0_10px_rgba(0,0,0,0.6)]"
                        )}
                    >
                        <div className="flex">

                            <pre className={cn("whitespace-pre font-mono text-[5.5px] sm:text-[7px] leading-[1.05] tracking-tighter antialiased opacity-80 brightness-125 italic animate-blink", theme.text)} >
                                {asciiChunk}
                            </pre>

                            <pre className="whitespace-pre font-mono text-[5.5px] sm:text-[7px] leading-[1.05] tracking-tighter antialiased">
                                {asciiMiddle}
                            </pre>

                            <pre className={cn("whitespace-pre font-mono text-[5.5px] sm:text-[7px] leading-[1.05] tracking-tighter antialiased opacity-80 brightness-125 italic", theme.text)} >
                                {asciiEnd}
                            </pre>
                        </div>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
