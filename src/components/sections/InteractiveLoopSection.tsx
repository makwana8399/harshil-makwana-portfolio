"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Kicker } from "@/components/ui/Kicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Play, RotateCcw } from "lucide-react";

interface RubricItem {
  id: "keyword" | "structure" | "readability" | "originality";
  label: string;
  target: number;
}

const RUBRIC_CRITERIA: RubricItem[] = [
  { id: "keyword", label: "KEYWORD COVERAGE", target: 85 },
  { id: "structure", label: "SEMANTIC STRUCTURE", target: 90 },
  { id: "readability", label: "READABILITY SCORE", target: 88 },
  { id: "originality", label: "ORIGINALITY INDEX", target: 92 },
];

export function InteractiveLoopSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [currentDraftStep, setCurrentDraftStep] = useState(0);
  const [scores, setScores] = useState({ keyword: 52, structure: 64, readability: 58, originality: 61 });
  const [statusLog, setStatusLog] = useState<string[]>([]);

  const runScriptedLoop = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentDraftStep(1);
    setStatusLog(["14:08:01  evaluator    initializing draft 1 rubric scan"]);
    setScores({ keyword: 52, structure: 64, readability: 58, originality: 61 });

    setTimeout(() => {
      setStatusLog((prev) => [
        ...prev,
        "14:08:04  evaluate    draft 1 score: 0.61 - REJECTED (keyword and structure below threshold)",
        "14:08:05  reason      triggering revision 1/2 with feedback prompt",
      ]);
      setCurrentDraftStep(2);
      setScores({ keyword: 74, structure: 78, readability: 81, originality: 72 });
    }, 3500);

    setTimeout(() => {
      setStatusLog((prev) => [
        ...prev,
        "14:08:08  evaluate    draft 2 score: 0.76 - REJECTED (keyword coverage 74% below target)",
        "14:08:09  reason      triggering revision 2/2 for final optimization",
      ]);
      setCurrentDraftStep(3);
      setScores({ keyword: 89, structure: 93, readability: 91, originality: 94 });
    }, 7500);

    setTimeout(() => {
      setStatusLog((prev) => [
        ...prev,
        "14:08:12  evaluate    draft 3 score: 0.93 - PASSED ALL RUBRIC CRITERIA",
        "14:08:13  publish     auto-selecting draft 3 -> dual dispatch complete",
      ]);
      setIsRunning(false);
      setHasRun(true);
    }, 11500);
  };

  return (
    <section
      id="the-loop"
      className="w-full bg-[var(--bg)] py-24 lg:py-32 px-6 lg:px-16 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Kicker>SIGNATURE SYSTEM</Kicker>
            <h2 className="text-section-h2 font-body font-semibold text-[#FFFFFF] mt-3">
              The Self-Evaluation Loop
            </h2>
          </div>

          <MagneticButton
            onClick={runScriptedLoop}
            variant="gold"
            className="self-start md:self-auto"
          >
            {isRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[var(--bg)] animate-ping" />
                <span>Running...</span>
              </>
            ) : hasRun ? (
              <>
                <RotateCcw size={16} />
                <span>Run again</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Run the loop</span>
              </>
            )}
          </MagneticButton>
        </div>

        <div className="w-full bg-[var(--bg-elevated)] rounded-[var(--r-lg)] border border-[var(--border-subtle)] p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-xl">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-xs text-[#9E98B9] uppercase tracking-wider">
              DRAFT_REVISION_STACK // REVISION EVALUATION
            </span>

            <div className="relative min-h-[300px] flex flex-col gap-4">
              <motion.div
                animate={{
                  opacity: currentDraftStep >= 2 ? 0.4 : currentDraftStep === 1 ? 1 : 0.6,
                }}
                className={
                  currentDraftStep >= 2
                    ? "p-5 rounded-[var(--r-md)] border transition-all duration-300 border-[var(--border-subtle)] bg-[var(--bg)]/60 text-[#9E98B9]"
                    : currentDraftStep === 1
                    ? "p-5 rounded-[var(--r-md)] border transition-all duration-300 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "p-5 rounded-[var(--r-md)] border transition-all duration-300 border-[var(--border-subtle)] bg-[var(--bg)]/40"
                }
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-[#FFFFFF] font-medium">DRAFT #01 (INITIAL GENERATION)</span>
                  <span className={currentDraftStep >= 2 ? "text-[var(--accent)] font-semibold" : "text-[#9E98B9]"}>
                    {currentDraftStep >= 2 ? "REJECTED (0.61)" : "IDLE"}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--text-secondary)] line-clamp-2">
                  Autonomous LLM models ingest structured inputs and generate draft content with rapid iteration.
                </p>
              </motion.div>

              <motion.div
                animate={{
                  opacity: currentDraftStep >= 3 ? 0.4 : currentDraftStep === 2 ? 1 : 0.5,
                }}
                className={
                  currentDraftStep >= 3
                    ? "p-5 rounded-[var(--r-md)] border transition-all duration-300 border-[var(--border-subtle)] bg-[var(--bg)]/60 text-[#9E98B9]"
                    : currentDraftStep === 2
                    ? "p-5 rounded-[var(--r-md)] border transition-all duration-300 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "p-5 rounded-[var(--r-md)] border transition-all duration-300 border-[var(--border-subtle)] bg-[var(--bg)]/30"
                }
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-[#FFFFFF] font-medium">DRAFT #02 (REVISION 1/2)</span>
                  <span className={currentDraftStep >= 3 ? "text-[var(--accent)] font-semibold" : "text-[#9E98B9]"}>
                    {currentDraftStep >= 3 ? "REJECTED (0.76)" : currentDraftStep === 2 ? "EVALUATING..." : "WAITING"}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--text-secondary)] line-clamp-2">
                  Autonomous agentic pipelines streamline SEO content production by iterating on key topics before publishing.
                </p>
              </motion.div>

              <motion.div
                animate={{
                  opacity: currentDraftStep === 3 ? 1 : 0.4,
                }}
                className={
                  currentDraftStep === 3
                    ? "relative p-5 rounded-[var(--r-md)] border transition-all duration-300 overflow-hidden border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_24px_rgba(168,85,247,0.25)]"
                    : "relative p-5 rounded-[var(--r-md)] border transition-all duration-300 overflow-hidden border-[var(--border-subtle)] bg-[var(--bg)]/20"
                }
              >
                {currentDraftStep === 3 ? (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] animate-pulse" />
                ) : null}
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-[#FFFFFF] font-semibold">DRAFT #03 (REVISION 2/2 - WINNER)</span>
                  <span className={currentDraftStep === 3 ? "text-[var(--accent)] font-bold" : "text-[#9E98B9]"}>
                    {currentDraftStep === 3 ? "PASSED AND SELECTED (0.93)" : "PENDING"}
                  </span>
                </div>
                <p className="font-body text-xs text-[#FFFFFF] line-clamp-2">
                  Production-grade generative AI orchestration leverages self-correcting evaluation loops to achieve 95% publishing efficiency.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)] pt-6 lg:pt-0 lg:pl-10">
            <div>
              <span className="font-mono text-xs text-[#9E98B9] uppercase tracking-wider block mb-4">
                RUBRIC_EVALUATOR // LIVE CRITERIA
              </span>

              <div className="flex flex-col gap-4 font-mono text-xs">
                {RUBRIC_CRITERIA.map((crit) => {
                  const val = scores[crit.id];
                  const isPassed = val >= crit.target;

                  return (
                    <div key={crit.id} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--text-secondary)]">{crit.label}</span>
                        <span className={isPassed ? "tabular-nums text-[var(--accent)] font-semibold" : "tabular-nums text-[#9E98B9]"}>
                          {val}% / {crit.target}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                        <motion.div
                          animate={{ width: val + "%" }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-[var(--accent)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full p-4 rounded-[var(--r-md)] bg-[var(--bg)] border border-[var(--border-subtle)] font-mono text-[11px] text-[#9E98B9] min-h-[90px] flex flex-col justify-end">
              {statusLog.length === 0 ? (
                <span>Press &apos;Run the loop&apos; to initiate 12s self-evaluation test.</span>
              ) : (
                statusLog.slice(-2).map((log, idx) => (
                  <div key={idx} className="text-[var(--accent)] truncate font-medium">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <p className="font-body text-xs text-[var(--text-secondary)] text-center max-w-[70ch] mx-auto">
          The same self-evaluation pattern runs in production, regenerating up to two revisions before auto-selecting the best draft.
        </p>
      </div>
    </section>
  );
}
