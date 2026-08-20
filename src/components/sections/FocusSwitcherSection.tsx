"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Kicker } from "@/components/ui/Kicker";
import { PORTFOLIO_DATA } from "@/lib/constants";

export function FocusSwitcherSection() {
  const [activeTabId, setActiveTabId] = useState(PORTFOLIO_DATA.focusAreas[0].id);

  const activeFocus =
    PORTFOLIO_DATA.focusAreas.find((f) => f.id === activeTabId) || PORTFOLIO_DATA.focusAreas[0];

  return (
    <section id="focus" className="relative w-full bg-[var(--bg)] py-24 lg:py-32 px-6 lg:px-16 border-t border-[var(--border-subtle)] overflow-hidden">
      {/* Background Electric Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1320px] mx-auto flex flex-col gap-12">
        <div>
          <Kicker>AREAS OF FOCUS</Kicker>
          {/* Clean Heading - No Bullet Dots */}
          <h2 className="text-section-h2 font-body font-semibold text-[#FFFFFF] mt-3">
            Core Technical Specialties
          </h2>
        </div>

        {/* Tab Pills in Poppins */}
        <div className="flex flex-wrap gap-3">
          {PORTFOLIO_DATA.focusAreas.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-200 cursor-pointer select-none border ${
                  isActive
                    ? "bg-[var(--accent)] text-[#FFFFFF] border-[var(--accent)] font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                    : "bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[#9E98B9] hover:text-[#FFFFFF]"
                }`}
              >
                <span className="relative z-10">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Cross-fading Content Panel */}
        <div className="w-full bg-[var(--bg-elevated)] rounded-[var(--r-lg)] border border-[var(--border-subtle)] p-8 md:p-14 min-h-[220px] flex items-center shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFocus.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 max-w-[72ch]"
            >
              <h3 className="font-body text-2xl font-semibold text-[#FFFFFF]">
                {activeFocus.title}
              </h3>
              <p className="font-body text-lg text-[var(--text-secondary)] leading-relaxed">
                {activeFocus.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
