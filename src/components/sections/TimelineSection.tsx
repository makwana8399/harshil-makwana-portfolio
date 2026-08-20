"use client";

import React from "react";
import { Kicker } from "@/components/ui/Kicker";
import { PORTFOLIO_DATA } from "@/lib/constants";

export function TimelineSection() {
  return (
    <section id="timeline" className="w-full bg-[var(--bg)] py-24 lg:py-32 px-6 lg:px-16 border-t border-[var(--border-subtle)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <Kicker>TRAJECTORY</Kicker>
          {/* Clean Heading - No Bullet Dots */}
          <h2 className="text-section-h2 font-body font-semibold text-[#FFFFFF] mt-2">
            Career History & Internships
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-[var(--accent)]/40 flex flex-col gap-12">
          {PORTFOLIO_DATA.timeline.map((item, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              {/* Vertical Trajectory Line Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full border-2 border-[var(--bg)] transition-all duration-300 ${
                  item.isCurrent
                    ? "bg-[var(--accent)] shadow-[0_0_14px_#A855F7] animate-pulse"
                    : "bg-[var(--accent)]"
                }`}
              />

              {/* Period / Date */}
              <div className="w-48 shrink-0 font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                {item.period}
              </div>

              {/* Content in Poppins */}
              <div className="flex-1 flex flex-col gap-1 max-w-[65ch]">
                <h3 className="font-body text-lg font-semibold text-[#FFFFFF]">
                  {item.role}
                </h3>
                <span className="font-body text-sm font-medium text-[var(--text-secondary)]">
                  {item.company}
                </span>
                <p className="font-mono text-xs text-[#9E98B9] mt-1 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
