import { SiteHero } from "@/components/layout/site-hero";
import { SiteFeatures } from "@/components/layout/site-features";
import { ToolShell } from "@/components/tool/tool-shell";
import { SiteFaq } from "@/components/layout/site-faq";
import { ShareSection } from "@/components/layout/share-section";

export default function Home() {
  return (
    <>
      <SiteHero />
      <ToolShell />
      <ShareSection />
      <SiteFeatures />
      <SiteFaq />
    </>
  );
}
