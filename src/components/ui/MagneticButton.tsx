"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "gold" | "ghost" | "secondary";
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "gold",
  className = "",
  download,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const maxDisplacement = 6;
    const x = Math.max(-maxDisplacement, Math.min(maxDisplacement, distanceX * 0.25));
    const y = Math.max(-maxDisplacement, Math.min(maxDisplacement, distanceY * 0.25));
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden group hover:scale-[1.02]";

  const variantStyles = {
    gold: "bg-[var(--accent)] text-[#FFFFFF] font-semibold shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:bg-[var(--accent-hover)] hover:shadow-[0_0_32px_rgba(168,85,247,0.55)]",
    ghost: "bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    secondary: "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]",
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={prefersReduced ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
        className="inline-block no-underline"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className="inline-block bg-transparent border-0 p-0 cursor-pointer">
      {content}
    </button>
  );
}
