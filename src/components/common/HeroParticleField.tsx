"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface VortexParticle {
  baseRadius: number;
  radius: number;
  angle: number;
  angularSpeed: number;
  size: number;
  length: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

const PALETTE = [
  "rgba(168, 85, 247, ", // Electric Purple
  "rgba(192, 132, 252, ", // Neon Lavender
  "rgba(129, 140, 248, ", // Soft Indigo
  "rgba(56, 189, 248, ",  // Sky Blue
  "rgba(255, 255, 255, ", // Pure White
];

export function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, targetX: 0, targetY: 0 });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    let centerX = 0;
    let centerY = 0;
    let currentCenterX = 0;
    let currentCenterY = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      centerX = width * 0.58;
      centerY = height * 0.48;
      if (currentCenterX === 0) {
        currentCenterX = centerX;
        currentCenterY = centerY;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Generate Antigravity.google Radial Vortex Particles
    const particleCount = 240;
    const particles: VortexParticle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const maxR = Math.max(width, height) * 0.75;

      for (let i = 0; i < particleCount; i++) {
        // Logarithmic / exponential radial distribution
        const rNorm = Math.pow(Math.random(), 0.65);
        const baseRadius = 40 + rNorm * maxR;
        const angle = Math.random() * Math.PI * 2;
        // Outer particles move slower, inner move faster
        const angularSpeed = (0.0018 + (1 - rNorm) * 0.004) * (Math.random() > 0.1 ? 1 : -1);
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const baseAlpha = Math.random() * 0.35 + 0.15;
        const size = Math.random() * 2.2 + 1.2;
        const length = Math.random() * 8 + 3;

        particles.push({
          baseRadius,
          radius: baseRadius,
          angle,
          angularSpeed,
          size,
          length,
          color,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    initParticles();

    const render = () => {
      if (!isVisible || width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth Lerp of Vortex Center towards cursor on hover
      const mouse = mouseRef.current;
      const targetX = mouse.active ? mouse.x : centerX;
      const targetY = mouse.active ? mouse.y : centerY;

      currentCenterX += (targetX - currentCenterX) * 0.045;
      currentCenterY += (targetY - currentCenterY) * 0.045;

      const cursorInfluenceRadius = 240;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          p.angle += p.angularSpeed;
        }

        // Calculate Position relative to current dynamic vortex center
        let px = currentCenterX + Math.cos(p.angle) * p.radius;
        let py = currentCenterY + Math.sin(p.angle) * p.radius;

        let alpha = p.baseAlpha;
        let currentLength = p.length;

        // Interactive Cursor Hover Swirl Physics
        if (mouse.active) {
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < cursorInfluenceRadius) {
            const factor = 1 - dist / cursorInfluenceRadius;
            // Swirl acceleration on hover
            if (!prefersReduced) {
              p.angle += p.angularSpeed * factor * 2.8;
            }
            alpha = Math.min(1, p.baseAlpha + factor * 0.6);
            currentLength = p.length + factor * 6;

            // Subtle radial push/pull
            px += (dx / dist) * factor * 14;
            py += (dy / dist) * factor * 14;
          }
        }

        // Draw Antigravity Orientated Dash / Capsule Particle
        ctx.save();
        ctx.translate(px, py);
        // Rotate along orbital tangent
        ctx.rotate(p.angle + Math.PI / 2);

        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.shadowColor = p.color === "rgba(255, 255, 255, " ? "rgba(255, 255, 255, 0.4)" : "rgba(168, 85, 247, 0.5)";
        ctx.shadowBlur = alpha > 0.4 ? 8 : 0;

        ctx.beginPath();
        ctx.roundRect(-p.size / 2, -currentLength / 2, p.size, currentLength, p.size / 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
