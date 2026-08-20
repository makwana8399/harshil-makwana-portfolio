"use client";

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface AgentLoopCanvasRef {
  setScrollProgress: (progress: number) => void;
}

interface LogLine {
  id: string;
  time: string;
  stage: string;
  message: string;
  status?: "rejected" | "passed" | "info";
}

const NODES = [
  { id: "ingest", label: "DATA INGEST", xRatio: 0.1, yRatio: 0.5 },
  { id: "rag", label: "RAG VECTOR", xRatio: 0.3, yRatio: 0.5 },
  { id: "reason", label: "LLM REASON", xRatio: 0.5, yRatio: 0.5 },
  { id: "evaluate", label: "EVALUATE RUBRIC", xRatio: 0.7, yRatio: 0.5 },
  { id: "publish", label: "AUTO PUBLISH", xRatio: 0.9, yRatio: 0.5 },
];

export const AgentLoopCanvas = forwardRef<AgentLoopCanvasRef, { isPinned?: boolean }>(
  ({ isPinned = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scrollProgressRef = useRef<number | null>(null);
    const prefersReduced = usePrefersReducedMotion();
    const [logs, setLogs] = useState<LogLine[]>([]);

    useImperativeHandle(ref, () => ({
      setScrollProgress: (progress: number) => {
        scrollProgressRef.current = Math.max(0, Math.min(1, progress));
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let startTime = performance.now();
      let currentIteration = 0;
      let lastLogTime = 0;

      const fullCycleDuration = 8000;

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const generateLog = (stage: string, iteration: number) => {
        const now = new Date();
        const timeStr = now.toTimeString().split(" ")[0];
        let msg = "";
        let status: "rejected" | "passed" | "info" = "info";

        if (stage === "ingest") {
          msg = "20 sources scanned · 3 relevant items ingested";
        } else if (stage === "rag") {
          msg = "PGVector cosine similarity query < 1s latency";
        } else if (stage === "reason") {
          msg = iteration === 0 ? "drafting article via GPT-4o" : `regenerating revision ${iteration}/2`;
        } else if (stage === "evaluate") {
          if (iteration === 0) {
            msg = "seo rubric score: 0.61 · REJECTED";
            status = "rejected";
          } else if (iteration === 1) {
            msg = "seo rubric score: 0.74 · REJECTED";
            status = "rejected";
          } else {
            msg = "seo rubric score: 0.93 · PASSED";
            status = "passed";
          }
        } else if (stage === "publish") {
          msg = "dual-dispatch publish complete (website + instagram)";
          status = "passed";
        }

        const newLog: LogLine = {
          id: Math.random().toString(),
          time: timeStr,
          stage,
          message: msg,
          status,
        };

        setLogs((prev) => [...prev.slice(-4), newLog]);
      };

      const render = (time: number) => {
        const width = canvas.getBoundingClientRect().width;
        const height = canvas.getBoundingClientRect().height;

        ctx.clearRect(0, 0, width, height);
        if (width === 0 || height === 0) return;

        let overallProgress = 0;
        if (scrollProgressRef.current !== null) {
          overallProgress = scrollProgressRef.current;
        } else {
          const elapsed = (time - startTime) % fullCycleDuration;
          overallProgress = elapsed / fullCycleDuration;
        }

        const effectiveT = overallProgress * 3;
        let packetX = 0;
        let packetY = 0;
        let activeNodeId = "ingest";

        const nodeCoords = NODES.map((n) => ({
          ...n,
          x: n.xRatio * width,
          y: n.yRatio * height,
        }));

        if (effectiveT < 0.8) {
          const t = effectiveT / 0.8;
          packetX = nodeCoords[0].x + (nodeCoords[3].x - nodeCoords[0].x) * t;
          packetY = nodeCoords[0].y;
          activeNodeId = t < 0.25 ? "ingest" : t < 0.5 ? "rag" : t < 0.75 ? "reason" : "evaluate";
          currentIteration = 0;
        } else if (effectiveT < 1.1) {
          const t = (effectiveT - 0.8) / 0.3;
          const startX = nodeCoords[3].x;
          const endX = nodeCoords[2].x;
          packetX = startX + (endX - startX) * t;
          packetY = nodeCoords[3].y + Math.sin(t * Math.PI) * (height * 0.28);
          activeNodeId = "reason";
          currentIteration = 1;
        } else if (effectiveT < 1.8) {
          const t = (effectiveT - 1.1) / 0.7;
          packetX = nodeCoords[2].x + (nodeCoords[3].x - nodeCoords[2].x) * t;
          packetY = nodeCoords[2].y;
          activeNodeId = t < 0.5 ? "reason" : "evaluate";
          currentIteration = 1;
        } else if (effectiveT < 2.1) {
          const t = (effectiveT - 1.8) / 0.3;
          const startX = nodeCoords[3].x;
          const endX = nodeCoords[2].x;
          packetX = startX + (endX - startX) * t;
          packetY = nodeCoords[3].y + Math.sin(t * Math.PI) * (height * 0.28);
          activeNodeId = "reason";
          currentIteration = 2;
        } else {
          const t = (effectiveT - 2.1) / 0.9;
          packetX = nodeCoords[2].x + (nodeCoords[4].x - nodeCoords[2].x) * t;
          packetY = nodeCoords[2].y;
          activeNodeId = t < 0.33 ? "reason" : t < 0.66 ? "evaluate" : "publish";
          currentIteration = 2;
        }

        if (Math.floor(time / 1600) !== lastLogTime) {
          lastLogTime = Math.floor(time / 1600);
          generateLog(activeNodeId, currentIteration);
        }

        // 1. Pipeline Connection Line (Electric Purple Gradient)
        ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodeCoords[0].x, nodeCoords[0].y);
        ctx.lineTo(nodeCoords[4].x, nodeCoords[4].y);
        ctx.stroke();

        // 2. Regenerate Arc Line (Curved Dashed Line)
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(168, 85, 247, 0.45)";
        ctx.beginPath();
        ctx.moveTo(nodeCoords[3].x, nodeCoords[3].y);
        ctx.quadraticCurveTo(
          (nodeCoords[3].x + nodeCoords[2].x) / 2,
          nodeCoords[3].y + height * 0.28,
          nodeCoords[2].x,
          nodeCoords[2].y
        );
        ctx.stroke();
        ctx.restore();

        // Arc Label
        ctx.font = "10px var(--font-jetbrains-mono), monospace";
        ctx.fillStyle = "rgba(196, 194, 214, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText("auto-regenerate (max 2)", (nodeCoords[3].x + nodeCoords[2].x) / 2, nodeCoords[3].y + height * 0.18);

        // 3. Render Graph Nodes (Crisp White Labels + Neon Purple Glow when Active)
        const nodeWidth = Math.min(108, width * 0.17);
        const nodeHeight = 36;
        const cornerRadius = 8;

        nodeCoords.forEach((node) => {
          const isActive = node.id === activeNodeId;

          ctx.save();

          if (isActive) {
            ctx.shadowColor = "#A855F7";
            ctx.shadowBlur = 16;
          }

          ctx.fillStyle = isActive ? "#0F0E17" : "#050508";
          ctx.strokeStyle = isActive ? "#A855F7" : "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = isActive ? 1.5 : 1;

          const nx = node.x - nodeWidth / 2;
          const ny = node.y - nodeHeight / 2;

          ctx.beginPath();
          ctx.roundRect(nx, ny, nodeWidth, nodeHeight, cornerRadius);
          ctx.fill();
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.font = "11px var(--font-poppins), sans-serif";
          ctx.fillStyle = isActive ? "#FFFFFF" : "#C4C2D6";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, node.x, node.y);

          // Metric Badge above active node
          if (isActive) {
            const badgeText =
              node.id === "ingest"
                ? "20 Sources"
                : node.id === "rag"
                ? "Latency <1s"
                : node.id === "reason"
                ? "GPT-4o 42 t/s"
                : node.id === "evaluate"
                ? currentIteration === 2
                  ? "SEO 0.93 Passed"
                  : "SEO 0.61 Retry"
                : "Dual Dispatch OK";

            ctx.font = "9px var(--font-jetbrains-mono), monospace";
            ctx.fillStyle = "#A855F7";
            ctx.fillText(badgeText, node.x, node.y - 24);
          }

          ctx.restore();
        });

        // 4. Single Traveling Neon Purple Pulse Packet
        if (!prefersReduced) {
          ctx.save();
          ctx.shadowColor = "#A855F7";
          ctx.shadowBlur = 14;
          ctx.fillStyle = "#A855F7";
          ctx.beginPath();
          ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        if (!scrollProgressRef.current) {
          animationFrameId = requestAnimationFrame(render);
        }
      };

      if (prefersReduced) {
        render(0);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resizeCanvas);
      };
    }, [prefersReduced]);

    return (
      <div className="relative w-full flex flex-col items-center">
        <p className="sr-only">
          Autonomous Generative AI Agent execution node graph: Data Ingest, RAG Vector, LLM Reason, Evaluate Rubric, Auto Publish.
        </p>

        {/* Canvas Element */}
        <canvas ref={canvasRef} aria-hidden="true" className="w-full h-[220px] md:h-[280px] block cursor-default" />

        {/* Live Terminal Log Rail */}
        <div
          aria-hidden="true"
          className="w-full mt-2 px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[var(--r-md)] font-mono text-[11px] leading-relaxed select-none min-h-[96px] flex flex-col justify-end overflow-hidden shadow-inner"
        >
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[var(--border-subtle)] text-[#9E98B9] text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>AGENT_EXECUTION_LOG // STDOUT_RAIL</span>
          </div>

          <div className="flex flex-col gap-1">
            {logs.map((log, idx) => {
              const isLatest = idx === logs.length - 1;
              return (
                <div
                  key={log.id}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    isLatest ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="text-[#9E98B9] shrink-0">{log.time}</span>
                  <span className="text-[var(--accent)] uppercase tracking-wider text-[10px] w-20 shrink-0 font-semibold">
                    {log.stage}
                  </span>
                  <span className={`truncate ${log.status === "passed" ? "text-[#FFFFFF] font-semibold" : "text-[var(--text-secondary)]"}`}>
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

AgentLoopCanvas.displayName = "AgentLoopCanvas";
