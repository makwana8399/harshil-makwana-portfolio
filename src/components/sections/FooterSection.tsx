"use client";

import React from "react";

export function FooterSection() {
  return (
    <footer className="w-full bg-[var(--bg)] py-10 px-6 lg:px-16 border-t border-[var(--border-subtle)] font-body text-xs text-[#9E98B9]">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col gap-1">
          <span className="font-body font-semibold text-sm text-[#FFFFFF]">
            Code by Harshil Makwana
          </span>
          <span className="font-body text-xs text-[var(--text-secondary)]">
            Generative AI & AI Automation Engineer · Autonomous Systems & Agents
          </span>
        </div>

        <div className="max-w-[54ch] text-xs text-[#9E98B9] leading-relaxed md:text-right font-mono">
          Designed & engineered as an autonomous showcase of generative AI systems, self-evaluating loops, and enterprise workflow architectures.
        </div>
      </div>
    </footer>
  );
}
