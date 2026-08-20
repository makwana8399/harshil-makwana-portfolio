"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "The Loop", href: "#the-loop" },
  { label: "Focus", href: "#focus" },
  { label: "Specs", href: "#tech-specs" },
  { label: "Trajectory", href: "#timeline" },
];

export function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 100);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalHeight)));
      }

      const sections = ["hero", "work", "the-loop", "focus", "tech-specs", "timeline", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16 flex justify-center">
          <nav
            className={`relative flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? "w-full max-w-[960px] px-6 py-2.5 rounded-full bg-[var(--bg-elevated)]/85 backdrop-blur-[20px] border border-[var(--border-subtle)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
                : "w-full px-0 py-0 bg-transparent border-transparent"
            }`}
          >
            {/* Left: Brand Name in Poppins */}
            <a
              href="#hero"
              className="font-body font-semibold text-sm tracking-tight text-[#FFFFFF] hover:text-[var(--accent)] transition-colors no-underline select-none"
            >
              Harshil Makwana
            </a>

            {/* Center Anchors (Desktop >= 900px) in Poppins */}
            <div className="hidden md:flex items-center gap-8 relative">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative font-body text-xs transition-colors duration-200 no-underline py-1 select-none ${
                      isActive
                        ? "text-[#FFFFFF] font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[#FFFFFF]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] rounded-full shadow-[0_0_8px_#A855F7]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: Primary CTA */}
            <div className="hidden md:flex items-center gap-4">
              <MagneticButton href="#contact" variant="gold" className="text-xs px-4 py-2">
                Get in touch
              </MagneticButton>
            </div>

            {/* Hamburger Button (Mobile < 900px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 text-[#FFFFFF] hover:text-[var(--accent)] focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Bottom Scroll Progress Indicator (Strictly Clipped Inside Pill Bounds) */}
            {isScrolled && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden pointer-events-none">
                <div
                  className="h-full bg-[var(--accent)] shadow-[0_0_8px_#A855F7] transition-all duration-75 rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col justify-between p-8 md:hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-6">
            <span className="font-body font-semibold text-lg text-[var(--accent)]">Harshil Makwana</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#FFFFFF] hover:text-[var(--accent)] cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-body text-3xl font-semibold text-[#FFFFFF] hover:text-[var(--accent)] transition-colors no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-4">
            <MagneticButton
              href="#contact"
              variant="gold"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center"
            >
              Get in touch
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  );
}
