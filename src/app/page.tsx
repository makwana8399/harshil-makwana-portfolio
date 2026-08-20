import React from "react";
import { BootSequence } from "@/components/common/BootSequence";
import { StickyNav } from "@/components/common/StickyNav";
import { GlobalParticleCanvas } from "@/components/common/GlobalParticleCanvas";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatementSection } from "@/components/sections/StatementSection";
import { SignalsSection } from "@/components/sections/SignalsSection";
import { WorkGallerySection } from "@/components/sections/WorkGallerySection";
import { InteractiveLoopSection } from "@/components/sections/InteractiveLoopSection";
import { FocusSwitcherSection } from "@/components/sections/FocusSwitcherSection";
import { TechSpecsSection } from "@/components/sections/TechSpecsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main id="main-content" className="relative w-full bg-[var(--bg)] min-h-screen">
      <GlobalParticleCanvas />
      <BootSequence />
      <StickyNav />
      <HeroSection />
      <StatementSection />
      <SignalsSection />
      <WorkGallerySection />
      <InteractiveLoopSection />
      <FocusSwitcherSection />
      <TechSpecsSection />
      <TimelineSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
