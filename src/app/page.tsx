import { SiteHero } from "@/components/boilerplate/layout/site-hero";
import { SiteFeatures } from "@/components/boilerplate/layout/site-features";
import { ToolShell } from "@/components/boilerplate/layout/tool-shell";
import { SiteFaq } from "@/components/boilerplate/layout/site-faq";
import { SubscribeSection } from "@/components/boilerplate/layout/subscribe-section";
import Script from "next/script";
import { siteConfig, contentConfig } from "@/config";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.siteName.replace("_", ""),
    url: siteConfig.seo.url,
    description: siteConfig.seo.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.socials.github,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contentConfig.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHero />
      <ToolShell />
      <SiteFeatures />
      <SubscribeSection />
      <SiteFaq />
    </>
  );
}
