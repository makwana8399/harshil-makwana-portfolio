"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function StatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".statement-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        { opacity: 0.2, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const statementText =
    "Ten production workflows. Five live systems. Zero manual publishing.";
  const words = statementText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative w-full min-h-[50vh] bg-[var(--bg)] flex items-center justify-center px-6 lg:px-16 py-24 md:py-36 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center gap-6">
        <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
          ENGINEERING PHILOSOPHY
        </span>

        <h2
          ref={textRef}
          className="text-statement font-body font-bold tracking-tight text-[#FFFFFF] max-w-[28ch] leading-tight"
        >
          {words.map((word, idx) => {
            const isZeroManual =
              word.toLowerCase().includes("zero") ||
              word.toLowerCase().includes("manual") ||
              word.toLowerCase().includes("publishing");

            return (
              <span
                key={idx}
                className={`statement-word inline-block mr-3 transition-colors duration-300 ${
                  isZeroManual ? "text-[var(--accent)]" : "text-[#FFFFFF]"
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
