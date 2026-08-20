import React from "react";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)] inline-flex items-center gap-3 select-none">
      {/* Animated Glowing Neon Purple Pulse Dot (Replaces --- Dashed Lines) */}
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)] shadow-[0_0_10px_#A855F7]" />
      </span>
      <span className={className}>{children}</span>
    </div>
  );
}
