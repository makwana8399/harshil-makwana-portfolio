"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Toast } from "@/components/ui/Toast";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { Mail, Download, Copy, MapPin, MessageSquare } from "lucide-react";

export function ContactSection() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1600);
  };

  const whatsappUrl =
    "https://wa.me/917990780309?text=Hi%20Harshil,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!";

  return (
    <section
      id="contact"
      className="relative w-full bg-[var(--bg)] py-24 lg:py-32 px-6 lg:px-16 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-14">
        <Kicker>AVAILABLE FOR WORK</Kicker>

        {/* Pure White Headline - No Bullet Dots */}
        <div className="flex flex-col gap-4 max-w-[900px]">
          <h2 className="text-hero-h1 font-body font-bold text-[#FFFFFF] tracking-tight leading-[1.02]">
            {PORTFOLIO_DATA.contact.headline}
          </h2>
          <p className="font-body text-xl text-[var(--text-secondary)] leading-relaxed max-w-[54ch]">
            {PORTFOLIO_DATA.contact.subhead}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-6 border-t border-[var(--border-subtle)]">
          {/* Left Column: Strict 9:16 Portrait Headshot Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[var(--r-lg)] overflow-hidden border border-[var(--border-subtle)] shadow-2xl bg-[var(--bg-elevated)] group hover:border-[var(--border-accent)] transition-all duration-500">
              <Image
                src="/my-dp.jpg"
                alt="Harshil Makwana"
                fill
                priority
                className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1.5 z-10">
                <span className="font-body font-semibold text-xl text-[#FFFFFF]">
                  Harshil Makwana
                </span>
                <span className="font-mono text-xs text-[var(--accent)] font-medium">
                  Generative AI Engineer
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mt-1 font-mono">
                  <MapPin size={13} className="text-[var(--accent)]" />
                  <span>Surat, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Info & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-5">
              <h3 className="font-body text-2xl md:text-3xl font-semibold text-[#FFFFFF]">
                Interested? Let&apos;s connect or discuss your next AI workflow.
              </h3>
              <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[56ch]">
                Open to Generative AI, RAG Pipeline, and AI Automation engineering roles. Feel free to message on WhatsApp, send an email, or connect via LinkedIn.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <MagneticButton href="mailto:harshilmakwana8399@gmail.com" variant="gold">
                  <Mail size={16} />
                  <span>Email Harshil</span>
                </MagneticButton>

                <MagneticButton href={whatsappUrl} target="_blank" variant="ghost" className="border-emerald-500/30 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10">
                  <MessageSquare size={16} className="text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </MagneticButton>

                <MagneticButton href="/Harshil_Makwana_Resume.pdf" download="Harshil_Makwana_Resume.pdf" variant="ghost">
                  <Download size={16} />
                  <span>Download résumé</span>
                </MagneticButton>
              </div>
            </div>

            {/* Direct Contact Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--border-subtle)]">
              {/* WhatsApp direct card */}
              <div className="flex items-center justify-between p-3.5 rounded-[var(--r-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-emerald-500 transition-all duration-300 group">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#FFFFFF] group-hover:text-emerald-400 transition-colors no-underline flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>WhatsApp (+91 7990780309)</span>
                </a>
              </div>

              {PORTFOLIO_DATA.contact.links.map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-[var(--r-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300 group"
                >
                  <a
                    href={link.href}
                    target={link.isEmail ? undefined : "_blank"}
                    rel={link.isEmail ? undefined : "noopener noreferrer"}
                    className="font-mono text-xs text-[#FFFFFF] group-hover:text-[var(--accent)] transition-colors no-underline truncate"
                  >
                    {link.label}
                  </a>

                  {link.isEmail && (
                    <button
                      onClick={() => handleCopyEmail(link.label)}
                      title="Copy email address"
                      className="p-1 text-[#9E98B9] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toast message="Copied to clipboard" isVisible={toastVisible} />
    </section>
  );
}
