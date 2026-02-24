import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { MarqueeBanner } from "@/components/layout/marquee-banner";
import { DevSignature } from "@/components/layout/dev-signature";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/config";
import { ThemeProvider } from "@/components/common/theme-provider";
import { BuyMeACoffeeWidget } from "@/components/common/buymeacoffee-widget";
import { ModalProvider } from "@/components/common/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RequestToolNotification } from "@/components/layout/request-tool-notification";
import { DiscoverMoreCTA } from "@/components/layout/discover-more-cta";

import { getThemeClasses } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = getThemeClasses();

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.title,
    template: `%s — ${siteConfig.siteName.replace("_", "")}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.socials.github,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.url,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.siteName.replace("_", ""),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    creator: siteConfig.seo.twitterHandle,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  other: {
    "msapplication-TileColor": theme.hex,
    "msapplication-TileImage": "/mstile-150x150.png",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": theme.hex,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfig.defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <MarqueeBanner />
              <DevSignature />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </TooltipProvider>
          <ModalProvider />
          <Toaster position={siteConfig.toastPosition} />
        </ThemeProvider>

        <BuyMeACoffeeWidget />
        <RequestToolNotification />
        <DiscoverMoreCTA />
      </body>
    </html>
  );
}
