import { SiteHero } from "@/components/layout/site-hero";
import { SiteFeatures } from "@/components/layout/site-features";
import { ToolShell } from "@/components/tool/tool-shell";
import { SiteFaq } from "@/components/layout/site-faq";

export default function Home() {
  return (
    <>
      <SiteHero />
      <ToolShell />
      <SiteFeatures />
      <SiteFaq />
    </>
  );
}
