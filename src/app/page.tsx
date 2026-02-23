import { SiteHero } from "@/components/layout/site-hero";
import { SiteFeatures } from "@/components/layout/site-features";
import { ToolShell } from "@/components/tool/tool-shell";

export default function Home() {
  return (
    <>
      <SiteHero />
      <ToolShell />
      <SiteFeatures />
    </>
  );
}
