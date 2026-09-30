import { PortfolioDesktop } from "@/components/PortfolioDesktop";
import { SeoContent } from "@/components/SeoContent";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <SeoContent data={portfolioData} />
      <PortfolioDesktop data={portfolioData} />
    </>
  );
}
