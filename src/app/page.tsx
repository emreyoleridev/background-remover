import { SiteHero } from "@/components/boilerplate/layout/site-hero";
import { SiteFeatures } from "@/components/boilerplate/layout/site-features";
import { ToolShell } from "@/components/boilerplate/layout/tool-shell";
import { SiteFaq } from "@/components/boilerplate/layout/site-faq";
import { SubscribeSection } from "@/components/boilerplate/layout/subscribe-section";

export default function Home() {
  return (
    <>
      <SiteHero />
      <ToolShell />
      <SiteFeatures />
      <SubscribeSection />
      <SiteFaq />
    </>
  );
}
