import { SiteHero } from "@/components/layout/site-hero";
import { SiteFeatures } from "@/components/layout/site-features";
import { ToolShell } from "@/components/tool/tool-shell";
import { SiteFaq } from "@/components/layout/site-faq";
import { SharePill } from "@/components/layout/share-pill";
import { SubscribeSection } from "@/components/layout/subscribe-section";

export default function Home() {
  return (
    <>
      <SiteHero />
      <ToolShell />
      <SharePill />
      <SiteFeatures />
      <SubscribeSection />
      <SiteFaq />
    </>
  );
}
