import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harshil Makwana — Generative AI & AI Automation Engineer",
  description:
    "Generative AI & AI Automation Engineer building autonomous LLM agents, RAG pipelines, and production automation. 10+ production workflows shipped.",
  keywords: [
    "Harshil Makwana",
    "Generative AI Engineer",
    "AI Automation Engineer",
    "Autonomous Agents",
    "LLM Pipelines",
    "RAG",
    "FastAPI",
    "Python AI Engineer",
  ],
  authors: [{ name: "Harshil Makwana" }],
  openGraph: {
    title: "Harshil Makwana — Generative AI & AI Automation Engineer",
    description:
      "Generative AI & AI Automation Engineer building autonomous LLM agents, RAG pipelines, and production automation. 10+ production workflows shipped.",
    url: "https://harshilmakwana.com",
    siteName: "Harshil Makwana Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshil Makwana — Generative AI & AI Automation Engineer",
    description:
      "Generative AI & AI Automation Engineer building autonomous LLM agents, RAG pipelines, and production automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] font-body antialiased selection:bg-[var(--accent)]/30 selection:text-[var(--text-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--text-primary)] focus:font-mono focus:text-xs focus:rounded-[var(--r-sm)] focus:outline-none"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
