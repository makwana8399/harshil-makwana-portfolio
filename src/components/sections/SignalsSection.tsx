"use client";

import React, { useEffect, useRef, useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function CountUpNumber({ targetNumber, symbol }: { targetNumber: string; symbol: string }) {
  const [current, setCurrent] = useState(0);
  const target = parseInt(targetNumber, 10);
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || isNaN(target)) {
      setCurrent(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 900;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - (1 - progress) * (1 - progress);
            const val = Math.floor(eased * target);
            setCurrent(val);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrent(target);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, prefersReduced]);

  return (
    <span ref={ref} className="font-mono text-5xl lg:text-7xl font-semibold tracking-tight text-[#FFFFFF] tabular-nums flex items-baseline">
      {isNaN(target) ? targetNumber : current}
      <span className="text-[var(--accent)] text-3xl lg:text-4xl font-medium ml-1">{symbol}</span>
    </span>
  );
}

export function SignalsSection() {
  return (
    <section id="signals" className="w-full bg-[var(--bg)] py-24 lg:py-32 px-6 lg:px-16 border-t border-[var(--border-subtle)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <Kicker>MEASURED OUTCOMES</Kicker>
          {/* Clean Heading - No Bullet Dots */}
          <h2 className="text-section-h2 font-body font-semibold text-[#FFFFFF] mt-2">
            Quantifiable Engineering Impact
          </h2>
        </div>

        {/* Clean 3-Col Desktop / 2-Col Mobile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PORTFOLIO_DATA.signals.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 p-6 md:p-8 rounded-[var(--r-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--border-accent)] transition-all duration-300"
            >
              <CountUpNumber targetNumber={item.number} symbol={item.symbol} />
              <h3 className="font-body text-base md:text-lg font-medium text-[#FFFFFF] mt-1">
                {item.label}
              </h3>
              <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
