import { SiteHero } from "@/components/layout/site-hero";
import { SiteFeatures } from "@/components/layout/site-features";
import { ToolShell } from "@/components/layout/tool-shell";
import { SiteFaq } from "@/components/layout/site-faq";
import { SubscribeSection } from "@/components/layout/subscribe-section";

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
