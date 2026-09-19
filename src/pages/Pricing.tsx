import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingCards } from "@/components/pricing/PricingCards";
import { PricingModules } from "@/components/pricing/PricingModules";
import { PricingDetailedTable } from "@/components/pricing/PricingDetailedTable";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingSavingsCalculator } from "@/components/pricing/PricingSavingsCalculator";
import { PricingMigrationBanner } from "@/components/pricing/PricingMigrationBanner";
import { PricingDianSection } from "@/components/pricing/PricingDianSection";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";
import { DemoModal } from "@/components/DemoModal";

export default function Pricing() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const cycleParam = searchParams.get("ciclo");
  const billingCycle = cycleParam === "mensual" ? "monthly" : "annual";

  const setBillingCycle = (cycle: "monthly" | "annual") => {
    setSearchParams({ ciclo: cycle === "monthly" ? "mensual" : "anual" }, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <Navbar onDemo={() => setShowDemoModal(true)} />

      <main className="flex-1">
        <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        <PricingCards billingCycle={billingCycle} onDemo={() => setShowDemoModal(true)} />
        <PricingModules />
        <PricingDetailedTable />

        <div className="bg-[#FAF9F6] pb-24 px-6">
          <div className="mx-auto max-w-6xl">
            <PricingComparison />
            <PricingSavingsCalculator />
            <PricingMigrationBanner />
            <PricingDianSection />
          </div>
        </div>

        <PricingFAQ />
        <PricingCTA onDemo={() => setShowDemoModal(true)} />
      </main>

      <Footer />

      <DemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
