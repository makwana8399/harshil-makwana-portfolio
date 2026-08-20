"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "@/components/ui/Kicker";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { WorkChapterCard } from "./WorkChapterCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function WorkGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  const chapters = PORTFOLIO_DATA.workChapters;
  const total = chapters.length;

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cardEls.length === 0 || !sectionRef.current) return;

      // Set initial stacking depths and z-indices
      cardEls.forEach((el, i) => {
        gsap.set(el, {
          zIndex: (total - i) * 10,
          y: i * 12,
          scale: 1 - i * 0.025,
          opacity: 1,
          rotate: 0,
          transformOrigin: "center bottom",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * (total - 0.01)));
            setActiveChapterIndex(idx);
          },
        },
      });

      // Animate card dismissal: Card 0 -> Card 1 -> Card 2 -> Card 3
      // Card 4 remains at base
      for (let i = 0; i < total - 1; i++) {
        const currentCard = cardEls[i];
        const nextCard = cardEls[i + 1];
        const rot = i % 2 === 0 ? -4 : 4;

        // Current card falls away
        tl.to(
          currentCard,
          {
            y: "110vh",
            rotate: rot,
            scale: 0.9,
            opacity: 0,
            ease: "power1.inOut",
            duration: 1,
          },
          `step-${i}`
        );

        // Next card steps forward into full focus
        if (nextCard) {
          tl.to(
            nextCard,
            {
              y: 0,
              scale: 1.0,
              opacity: 1,
              ease: "power1.out",
              duration: 0.8,
            },
            `step-${i}+=0.2`
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, total]);

  const activeChapter = chapters[activeChapterIndex] || chapters[0];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full h-screen bg-[var(--bg)] border-t border-[var(--border-subtle)] overflow-hidden flex flex-col justify-between py-8 md:py-12 px-6 lg:px-16"
    >
      {/* Top Header & Chapter Progress Indicator */}
      <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between z-30 shrink-0">
        <div className="flex flex-col gap-0.5">
          <Kicker>PRODUCTION SYSTEMS // CASE STUDIES</Kicker>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-body font-bold text-[#FFFFFF] mt-0.5">
            Autonomous Workflows & Projects
          </h2>
        </div>

        {/* Persistent Live Chapter Counter */}
        <div className="flex items-center gap-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-4 py-1.5 rounded-full shadow-lg">
          <span className="font-mono text-xs text-[#9E98B9] uppercase tracking-wider">
            CHAPTER
          </span>
          <span className="font-mono text-sm font-bold text-[var(--accent)]">
            {activeChapter.number}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_#A855F7]" />
        </div>
      </div>

      {/* Center: The Physical 5-Page Card Stack */}
      <div
        ref={stackContainerRef}
        className="relative max-w-[1100px] w-full mx-auto my-auto h-[480px] md:h-[460px] flex items-center justify-center"
      >
        {chapters.map((chapter, idx) => (
          <div
            key={chapter.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="absolute top-0 left-0 right-0 w-full will-change-transform"
            style={{
              zIndex: (total - idx) * 10,
            }}
          >
            <WorkChapterCard chapter={chapter} />
          </div>
        ))}
      </div>

      {/* Bottom Status & Scroll Cue */}
      <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between text-xs font-mono text-[#9E98B9] z-30 pt-3 border-t border-[var(--border-subtle)]/40 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)] font-semibold">{activeChapter.index}:</span>
          <span className="text-[#FFFFFF] truncate max-w-[240px] sm:max-w-md md:max-w-none">
            {activeChapter.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-[#9E98B9]">
            SCROLL TO TURN PAGES
          </span>
          {/* Progress Segment Indicator */}
          <div className="flex gap-1.5">
            {chapters.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeChapterIndex
                    ? "w-6 bg-[var(--accent)] shadow-[0_0_8px_#A855F7]"
                    : i < activeChapterIndex
                    ? "w-2 bg-[var(--accent)]/40"
                    : "w-2 bg-[var(--border-subtle)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
