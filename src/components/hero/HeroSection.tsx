"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Kicker } from "@/components/ui/Kicker";
import { TypingText } from "@/components/common/TypingText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { HeroParticleField } from "@/components/common/HeroParticleField";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ArrowDown, Sparkles, Cpu, Activity, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = leftColRef.current?.querySelectorAll(".hero-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
      }

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const nameWords = PORTFOLIO_DATA.personal.name.split(" ");

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full bg-[var(--bg)] overflow-hidden flex flex-col justify-between px-6 lg:px-16 pt-28 pb-16"
    >
      {/* Interactive Antigravity.google Radial Particle Vortex */}
      <HeroParticleField />

      <div className="max-w-[1320px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto relative z-10">
        {/* Left Column: Bold Typography, Typing Text & Bio */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start gap-6">
          <Kicker>{`PORTFOLIO // ${PORTFOLIO_DATA.personal.location}`}</Kicker>

          {/* Crisp Pure White H1 Name */}
          <h1 className="text-hero-h1 font-body font-bold text-[#FFFFFF] tracking-tight">
            {nameWords.map((word, idx) => (
              <span key={idx} className="hero-word inline-block mr-4">
                {word}
              </span>
            ))}
          </h1>

          {/* Live Typing Text Subtitle */}
          <div className="font-body text-xl md:text-2xl font-semibold text-[var(--accent)] text-glow-accent">
            <TypingText
              words={[
                "Generative AI Engineer",
                "AI Automation Specialist",
                "Autonomous LLM Architect",
              ]}
            />
          </div>

          {/* Bio Box */}
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[58ch]">
            I design and deploy autonomous multi-agent pipelines, self-correcting RAG systems, and enterprise automation architectures that turn unstructured content into production-ready output with zero manual overhead.
          </p>

          {/* Competency Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-full bg-[var(--accent-glow)] border border-[var(--border-accent)] font-mono text-xs text-[var(--accent)] font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Sparkles size={13} />
              <span>Multi-Agent Orchestration</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-xs text-[#FFFFFF] flex items-center gap-1.5">
              <Cpu size={13} className="text-[var(--accent)]" />
              <span>PGVector RAG</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-xs text-[#FFFFFF] flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[var(--accent)]" />
              <span>FastAPI & Celery</span>
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <MagneticButton href="#work" variant="gold">
              <span>Explore Work</span>
              <ArrowDown size={15} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <span>Get in touch</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Live Production Telemetry Card */}
        <div ref={rightColRef} className="lg:col-span-5 w-full flex flex-col gap-4">
          <div className="w-full rounded-[var(--r-lg)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden group hover:border-[var(--border-accent)] transition-all duration-300">
            {/* Header / Status Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FFFFFF]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </span>
                <span className="font-semibold tracking-wider">AGENT_TELEMETRY // LIVE</span>
              </div>
              <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider bg-[var(--accent-glow)] px-2 py-0.5 rounded border border-[var(--border-accent)]">
                PRODUCTION OK
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-[var(--r-md)] bg-[var(--bg)] border border-[var(--border-subtle)] flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#9E98B9] uppercase">PIPELINE UPTIME</span>
                <span className="font-mono text-2xl font-bold text-[#FFFFFF] tabular-nums">99.9%</span>
                <span className="font-mono text-[10px] text-emerald-400">● Zero Downtime</span>
              </div>

              <div className="p-4 rounded-[var(--r-md)] bg-[var(--bg)] border border-[var(--border-subtle)] flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#9E98B9] uppercase">AVG RAG LATENCY</span>
                <span className="font-mono text-2xl font-bold text-[var(--accent)] tabular-nums">&lt; 420ms</span>
                <span className="font-mono text-[10px] text-[#9E98B9]">Cosine Vector Match</span>
              </div>

              <div className="p-4 rounded-[var(--r-md)] bg-[var(--bg)] border border-[var(--border-subtle)] flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#9E98B9] uppercase">EVAL ACCURACY</span>
                <span className="font-mono text-2xl font-bold text-[#FFFFFF] tabular-nums">98.4%</span>
                <span className="font-mono text-[10px] text-[#9E98B9]">Rubric Pass Rate</span>
              </div>

              <div className="p-4 rounded-[var(--r-md)] bg-[var(--bg)] border border-[var(--border-subtle)] flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#9E98B9] uppercase">MANUAL OVERHEAD</span>
                <span className="font-mono text-2xl font-bold text-[var(--accent)] tabular-nums">0%</span>
                <span className="font-mono text-[10px] text-emerald-400">100% Autonomous</span>
              </div>
            </div>

            {/* Live Terminal Log Stream */}
            <div className="p-3.5 rounded-[var(--r-md)] bg-[var(--bg)] border border-[var(--border-subtle)] font-mono text-[11px] text-[#C4C2D6] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[#9E98B9] text-[10px] pb-1 border-b border-[var(--border-subtle)]">
                <span className="flex items-center gap-1.5">
                  <Activity size={12} className="text-[var(--accent)]" />
                  <span>STREAM LOG</span>
                </span>
                <span>CELERY / REDIS</span>
              </div>
              <div className="text-emerald-400 text-[10px] truncate">
                [OK] Ingested 20 feeds -&gt; PGVector embedded
              </div>
              <div className="text-[var(--accent)] text-[10px] truncate">
                [AI] Auto-evaluated SEO 0.94 -&gt; Published
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Strip */}
      <div className="max-w-[1320px] w-full mx-auto pt-8 grid grid-cols-3 gap-6 relative z-10">
        {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="font-mono text-2xl md:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              {stat.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#9E98B9]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
