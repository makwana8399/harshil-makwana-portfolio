"use client";

import React, { useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

export function TechSpecsSection() {
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenAccordionIdx(openAccordionIdx === idx ? null : idx);
  };

  return (
    <section id="tech-specs" className="w-full bg-[var(--bg)] py-24 lg:py-32 px-6 lg:px-16 border-t border-[var(--border-subtle)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <Kicker>TECHNICAL SPECIFICATIONS</Kicker>
          {/* Clean Heading - No Bullet Dots */}
          <h2 className="text-section-h2 font-body font-semibold text-[#FFFFFF] mt-2">
            Tech Stack & Architecture Tools
          </h2>
        </div>

        {/* Desktop View: Sticky Category Labels */}
        <div className="hidden md:flex flex-col divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {PORTFOLIO_DATA.techSpecs.map((spec, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-8 py-8 items-start">
              {/* Sticky Category Label */}
              <div className="col-span-4 sticky top-28">
                <span className="font-body text-base font-semibold text-[var(--accent)] tracking-wide uppercase">
                  {spec.category}
                </span>
              </div>

              {/* Items List */}
              <div className="col-span-8 flex flex-wrap gap-2.5">
                {spec.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="px-3.5 py-1.5 rounded-[var(--r-sm)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-body text-xs font-medium text-[#FFFFFF]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Stacked Accordion */}
        <div className="md:hidden flex flex-col divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {PORTFOLIO_DATA.techSpecs.map((spec, idx) => {
            const isOpen = openAccordionIdx === idx;
            return (
              <div key={idx} className="py-4 flex flex-col gap-3">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between font-body text-sm font-semibold text-[var(--accent)] text-left py-2 cursor-pointer"
                >
                  <span>{spec.category}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {spec.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-3 py-1 rounded-[var(--r-sm)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-body text-xs text-[#FFFFFF]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
