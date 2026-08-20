"use client";

import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATUS_LOGS = [
  "INITIALIZING NEURAL RUNTIME...",
  "CONNECTING MULTI-AGENT PIPELINES...",
  "CALIBRATING PGVECTOR RAG INDICES...",
  "OPTIMIZING AUTONOMOUS TELEMETRY...",
  "SYSTEM ONLINE // LAUNCHING FORGE",
];

export function BootSequence() {
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setShouldRender(false);
      return;
    }

    const startTime = performance.now();
    const duration = 1600; // 1.6s smooth loader animation

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateLoader);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setShouldRender(false);
          }, 600);
        }, 200);
      }
    };

    requestAnimationFrame(updateLoader);
  }, [prefersReduced]);

  if (!shouldRender || prefersReduced) return null;

  // Determine current status message
  const statusIdx = Math.min(
    STATUS_LOGS.length - 1,
    Math.floor((progress / 100) * STATUS_LOGS.length)
  );
  const currentStatus = STATUS_LOGS[statusIdx];

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center pointer-events-none transition-all duration-700 ease-in-out ${
        isExiting ? "opacity-0 scale-[1.03] blur-sm pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle Radial Purple Glow in Center */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[420px] w-full px-6 flex flex-col items-center gap-6 z-10 select-none">
        {/* Brand Display Name */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.3em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span>AUTONOMOUS SYSTEMS</span>
          </div>

          <h1 className="font-body font-bold text-2xl md:text-3xl text-[#FFFFFF] tracking-tight">
            Harshil Makwana
          </h1>

          <span className="font-mono text-xs text-[#9E98B9] tracking-wider">
            GENERATIVE AI ENGINEER
          </span>
        </div>

        {/* Progress Bar & Track */}
        <div className="w-full flex flex-col gap-2 pt-2">
          <div className="w-full h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#818CF8] via-[var(--accent)] to-[#C084FC] rounded-full transition-all duration-75 shadow-[0_0_12px_#A855F7]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Real-time Telemetry Status & Number */}
          <div className="flex items-center justify-between font-mono text-[11px] text-[#9E98B9] pt-1">
            <span className="text-[var(--accent)] truncate max-w-[280px]">
              {currentStatus}
            </span>
            <span className="font-bold text-[#FFFFFF] tabular-nums tracking-widest shrink-0">
              {progress.toString().padStart(2, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
