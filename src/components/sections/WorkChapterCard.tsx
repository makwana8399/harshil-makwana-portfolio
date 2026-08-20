"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/constants";

type ChapterData = (typeof PORTFOLIO_DATA.workChapters)[number];

/* Detail Visual Component 1: Dual-Platform Lane Retry */
function DualPlatformVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const instaStatus =
    step === 0 ? "idle" : step === 1 ? "error" : step === 2 ? "retrying" : "success";

  return (
    <div className="w-full h-full min-h-[230px] bg-[var(--bg)] rounded-[var(--r-md)] border border-[var(--border-subtle)] p-5 flex flex-col justify-between font-mono text-xs select-none shadow-inner">
      <div className="flex items-center justify-between text-[#9E98B9] text-[10px]">
        <span>ORCHESTRATOR // RETRY</span>
        <span className="text-[var(--accent)] animate-pulse font-semibold">● LIVE</span>
      </div>

      <div className="grid grid-cols-2 gap-3 my-auto w-full">
        {/* Lane A: Website */}
        <div className="p-3.5 rounded border border-[var(--border-accent)] bg-[var(--accent-glow)] flex flex-col gap-1.5 min-w-0">
          <span className="text-[#FFFFFF] font-medium text-[11px] truncate">LANE A: WEB</span>
          <div className="flex items-center justify-between text-[10px] gap-1">
            <span className="text-[var(--text-secondary)] shrink-0">State:</span>
            <span className="text-[var(--accent)] font-semibold truncate">200 OK</span>
          </div>
          <div className="w-full h-1 bg-[var(--accent)] rounded-full mt-1" />
        </div>

        {/* Lane B: Instagram */}
        <div
          className={`p-3.5 rounded border transition-all duration-300 flex flex-col gap-1.5 min-w-0 ${
            instaStatus === "error" || instaStatus === "retrying"
              ? "border-[var(--accent)] bg-[var(--accent-glow)]"
              : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
          }`}
        >
          <span className="text-[#FFFFFF] font-medium text-[11px] truncate">LANE B: INSTA</span>
          <div className="flex items-center justify-between text-[10px] gap-1">
            <span className="text-[var(--text-secondary)] shrink-0">State:</span>
            <span className="text-[var(--accent)] font-semibold truncate">
              {instaStatus === "idle"
                ? "IDLE"
                : instaStatus === "error"
                ? "500 RETRY"
                : instaStatus === "retrying"
                ? "RETRYING"
                : "200 OK"}
            </span>
          </div>
          <div
            className={`w-full h-1 rounded-full mt-1 ${
              instaStatus === "error" || instaStatus === "retrying"
                ? "bg-[var(--accent)] animate-pulse"
                : "bg-[var(--accent)]"
            }`}
          />
        </div>
      </div>

      <div className="text-[10px] text-[#9E98B9] text-center truncate">
        {instaStatus === "error"
          ? "Rate limit -> Isolating retry"
          : instaStatus === "retrying"
          ? "Retrying Instagram publish..."
          : "Dual execution synchronized"}
      </div>
    </div>
  );
}

/* Detail Visual Component 2: Sports Content Scoring Loop */
function SportsAgentVisual() {
  const [scoreIdx, setScoreIdx] = useState(0);
  const scores = [
    { score: "0.58", status: "REJECTED", pass: false },
    { score: "0.72", status: "REJECTED", pass: false },
    { score: "0.94", status: "PASSED", pass: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScoreIdx((prev) => (prev + 1) % scores.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [scores.length]);

  const current = scores[scoreIdx];

  return (
    <div className="w-full h-full min-h-[230px] bg-[var(--bg)] rounded-[var(--r-md)] border border-[var(--border-subtle)] p-5 flex flex-col justify-between font-mono text-xs select-none shadow-inner">
      <div className="flex items-center justify-between text-[#9E98B9] text-[10px]">
        <span>YOUTUBE_SCORER // EVALUATOR</span>
        <span className="text-[var(--accent)] font-semibold">REV {scoreIdx + 1}/3</span>
      </div>

      <div className="flex flex-col items-center justify-center my-auto gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[#9E98B9]">SEO_SCORE:</span>
          <span className="text-3xl font-bold tabular-nums text-[var(--accent)]">
            {current.score}
          </span>
        </div>

        <div className="px-3 py-1 rounded text-[11px] font-semibold tracking-wider bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--border-accent)]">
          {current.status}
        </div>
      </div>

      <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${parseFloat(current.score) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* Detail Visual Component 3: Vector RAG Latency Query */
function VectorRagVisual() {
  const [activeVector, setActiveVector] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVector((prev) => (prev + 1) % 6);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[230px] bg-[var(--bg)] rounded-[var(--r-md)] border border-[var(--border-subtle)] p-5 flex flex-col justify-between font-mono text-xs select-none shadow-inner">
      <div className="flex items-center justify-between text-[#9E98B9] text-[10px]">
        <span>PGVECTOR_SEARCH // RAG</span>
        <span className="text-[var(--accent)] font-semibold">&lt; 1s LATENCY</span>
      </div>

      <div className="relative w-full h-24 my-auto flex items-center justify-around">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const isTopMatch = idx === activeVector;
          const isNeighbor = Math.abs(idx - activeVector) === 1;

          return (
            <div key={idx} className="flex flex-col items-center gap-2 transition-all duration-300">
              <div
                className={`rounded-full transition-all duration-300 ${
                  isTopMatch
                    ? "w-5 h-5 bg-[var(--accent)] shadow-[0_0_14px_#A855F7]"
                    : isNeighbor
                    ? "w-3.5 h-3.5 bg-[var(--accent)]/60"
                    : "w-2 h-2 bg-[var(--border-subtle)]"
                }`}
              />
              <span
                className={`text-[9px] ${
                  isTopMatch ? "text-[var(--accent)] font-semibold" : "text-[#9E98B9]"
                }`}
              >
                {isTopMatch ? "0.98" : isNeighbor ? "0.82" : "0.31"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-2">
        <span>Query: &quot;video_transcript_summary&quot;</span>
        <span className="text-[var(--accent)] font-semibold">Match Found</span>
      </div>
    </div>
  );
}

/* Detail Visual Component 4: Commerce Onboarding Generator */
function CommerceVisual() {
  const [fieldStep, setFieldStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFieldStep((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const fields = [
    { label: "TITLE", val: "Pro Carbon Fiber Helmet", ok: fieldStep >= 1 },
    { label: "DESC", val: "Aero dynamic ultra-light shell...", ok: fieldStep >= 2 },
    { label: "PRICE", val: "$189.99 (Auto-priced)", ok: fieldStep >= 3 },
  ];

  return (
    <div className="w-full h-full min-h-[230px] bg-[var(--bg)] rounded-[var(--r-md)] border border-[var(--border-subtle)] p-5 flex flex-col justify-between font-mono text-xs select-none shadow-inner">
      <div className="flex items-center justify-between text-[#9E98B9] text-[10px]">
        <span>VISION_PARSER // E-COMMERCE</span>
        <span className="text-[var(--accent)] font-semibold">n8n AUTOMATION</span>
      </div>

      <div className="flex flex-col gap-2.5 my-auto">
        {fields.map((f, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded border transition-all duration-300 flex items-center justify-between ${
              f.ok
                ? "border-[var(--border-accent)] bg-[var(--accent-glow)] text-[#FFFFFF]"
                : "border-[var(--border-subtle)] text-[#9E98B9]"
            }`}
          >
            <span className="text-[10px] text-[var(--accent)] w-12 font-semibold">{f.label}:</span>
            <span className="truncate max-w-[170px] text-[11px]">{f.ok ? f.val : "parsing..."}</span>
            <span className="text-[10px]">{f.ok ? "✓" : "..."}</span>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-[#9E98B9] text-center">
        ~85% manual upload reduction · WooCommerce ready
      </div>
    </div>
  );
}

/* Detail Visual Component 5: Enterprise Agentic Orchestrator */
function EnterpriseOrchestratorVisual() {
  const [activeWorker, setActiveWorker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorker((prev) => (prev + 1) % 3);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const workers = [
    { name: "CELERY_WORKER_01", job: "Telegram Dispatch", status: "BUSY" },
    { name: "CELERY_WORKER_02", job: "PGVector Embedding", status: "IDLE" },
    { name: "CELERY_WORKER_03", job: "SEO Evaluator Loop", status: "BUSY" },
  ];

  return (
    <div className="w-full h-full min-h-[230px] bg-[var(--bg)] rounded-[var(--r-md)] border border-[var(--border-subtle)] p-5 flex flex-col justify-between font-mono text-xs select-none shadow-inner">
      <div className="flex items-center justify-between text-[#9E98B9] text-[10px]">
        <span>REDIS_QUEUE // WORKER_CLUSTER</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3 ACTIVE</span>
        </span>
      </div>

      <div className="flex flex-col gap-2.5 my-auto">
        {workers.map((w, idx) => {
          const isHighlighted = idx === activeWorker;
          return (
            <div
              key={idx}
              className={`p-2.5 rounded border transition-all duration-300 flex items-center justify-between ${
                isHighlighted
                  ? "border-[var(--border-accent)] bg-[var(--accent-glow)] text-[#FFFFFF]"
                  : "border-[var(--border-subtle)] text-[#9E98B9] bg-[var(--bg-elevated)]"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[var(--accent)]">{w.name}</span>
                <span className="text-[11px] text-[#FFFFFF]">{w.job}</span>
              </div>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-semibold ${
                  w.status === "BUSY"
                    ? "bg-purple-500/20 text-[var(--accent)] border border-[var(--border-accent)]"
                    : "bg-white/5 text-[#9E98B9]"
                }`}
              >
                {w.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-[10px] text-emerald-400 text-center flex items-center justify-center gap-1.5">
        <span>Zero Human Intervention · 99.9% Telemetry Uptime</span>
      </div>
    </div>
  );
}

export function WorkChapterCard({ chapter }: { chapter: ChapterData }) {
  return (
    <div className="w-full bg-[var(--bg-elevated)] rounded-[var(--r-lg)] border border-[var(--border-subtle)] p-5 md:p-7 lg:p-8 flex flex-col justify-between gap-5 shadow-[0_24px_64px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 relative overflow-hidden">
      {/* Subtle Top Glowing Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />

      {/* Top Header: Number Badge & Tagline */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-[var(--accent)] px-2.5 py-1 rounded bg-[var(--accent-glow)] border border-[var(--border-accent)]">
            {chapter.number}
          </span>
          <span className="font-mono text-xs text-[#9E98B9] uppercase tracking-wider font-semibold">
            {chapter.company}
          </span>
        </div>

        <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-[#9E98B9]">
          {chapter.tagline}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h3 className="font-body font-bold text-[#FFFFFF] tracking-tight text-xl md:text-2xl leading-snug">
            {chapter.title}
          </h3>

          <div className="flex flex-col gap-3 text-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--accent)] tracking-widest block mb-0.5 font-semibold">
                PROBLEM
              </span>
              <p className="font-body text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                {chapter.problem}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--accent)] tracking-widest block mb-0.5 font-semibold">
                SYSTEM ARCHITECTURE
              </span>
              <p className="font-body text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {chapter.system}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--accent)] tracking-widest block mb-0.5 font-semibold">
                MEASURED OUTCOME
              </span>
              <p className="font-mono text-xs text-[#FFFFFF] font-semibold leading-relaxed">
                {chapter.outcome}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full h-full flex items-center justify-center overflow-hidden">
          {chapter.type === "dual-platform" && <DualPlatformVisual />}
          {chapter.type === "sports-agent" && <SportsAgentVisual />}
          {chapter.type === "rag-vector" && <VectorRagVisual />}
          {chapter.type === "commerce-pipeline" && <CommerceVisual />}
          {chapter.type === "orchestrator-core" && <EnterpriseOrchestratorVisual />}
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
        {chapter.stack.map((tech, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded-[var(--r-sm)] bg-[var(--bg)] border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-secondary)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
