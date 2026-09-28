"use client";

import dynamic from "next/dynamic";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { generalQuoteLink } from "@/lib/whatsapp";

const WeaveCloth = dynamic(() => import("./three/WeaveCloth"), {
  ssr: false,
  loading: () => null,
});

const HERO_VIDEO = "/videos/Tent_swaying_in_desert_wind_20260927180538.mp4";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between text-white bg-black pt-20 pb-12 px-6 md:px-16"
    >
      {/* 🔥 Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_VIDEO ? (
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          <WeaveCloth />
        )}
      </div>

      {/* 🔥 Reduced Cinematic Gradient Overlay (less black blur) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(10,12,15,0.75) 0%,
              rgba(10,12,15,0.55) 40%,
              rgba(10,12,15,0.25) 70%,
              rgba(10,12,15,0.05) 100%
            )
          `,
        }}
      />

      {/* 🔥 Main Content Layout */}
      <div className="relative z-[2] max-w-4xl my-auto w-full">
        
        {/* Top yellow accent line + subhead */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-[2px] bg-amber-400" />
          <p className="text-gray-300 text-[11px] md:text-xs tracking-[0.2em] uppercase font-semibold font-mono">
            KANPUR · UNNAO — SINCE THE FIRST BEAM
          </p>
        </div>

        {/* Heading with "Tomorrow" in yellow */}
        <h1
          className="font-display font-extrabold tracking-tight text-white"
          style={{
            fontSize: "clamp(1.9rem, 3.8vw, 3.6rem)",
            lineHeight: "1.1",
            maxWidth: "16ch",
          }}
        >
          <span className="block">Industrial</span>
          <span className="block">Cloth for a</span>
          <span className="block">Stronger</span>
          <span className="block text-amber-400">Tomorrow.</span>
        </h1>

        {/* Paragraph */}
        <p className="mt-3 max-w-[42ch] text-xs md:text-sm text-gray-200 font-normal leading-relaxed">
          Heavy canvas, filter cloth and tarpaulin woven on rapier looms — from multiple-ply yarn we twist ourselves. Bulk quantities, custom constructions, and a straight answer on what we can and cannot make.
        </p>

        {/* Both Yellow Buttons with rolling hover effect and white text on hover */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={generalQuoteLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ind group"
            style={{
              background: "#fbbf24",
              borderColor: "#fbbf24",
              color: "#111",
              borderRadius: "4px",
            }}
          >
            <span className="pad">
              <span className="roll">
                <span className="group-hover:text-white group-focus-visible:text-white transition-colors">
                  Request a Quote
                </span>
                <span className="group-hover:text-white group-focus-visible:text-white transition-colors">
                  Request a Quote
                </span>
              </span>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a
            href="/products"
            className="btn btn-ind group"
            style={{
              background: "#fbbf24",
              borderColor: "#fbbf24",
              color: "#111",
              borderRadius: "4px",
            }}
          >
            <span className="pad">
              <span className="roll">
                <span className="group-hover:text-white group-focus-visible:text-white transition-colors">
                  See the Catalogue
                </span>
                <span className="group-hover:text-white group-focus-visible:text-white transition-colors">
                  See the Catalogue
                </span>
              </span>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* 🔥 3 Stats Blocks */}
        <div className="mt-8 pt-5 border-t border-white/20 flex flex-wrap items-center gap-6 font-mono w-full">
          <div className="flex items-center gap-6 md:gap-8 flex-wrap">
            <div>
              <p className="text-white text-lg md:text-xl font-bold font-display">25+</p>
              <p className="text-[10px] md:text-[11px] text-gray-300 tracking-wider mt-0.5">YEARS OF EXPERIENCE</p>
            </div>
            <div className="h-6 w-[1px] bg-white/30 hidden sm:block" />
            <div>
              <p className="text-white text-lg md:text-xl font-bold font-display">100+</p>
              <p className="text-[10px] md:text-[11px] text-gray-300 tracking-wider mt-0.5">INDUSTRIAL CLIENTS</p>
            </div>
            <div className="h-6 w-[1px] bg-white/30 hidden sm:block" />
            <div>
              <p className="text-white text-lg md:text-xl font-bold font-display">PREMIUM</p>
              <p className="text-[10px] md:text-[11px] text-gray-300 tracking-wider mt-0.5">QUALITY FABRICS</p>
            </div>
          </div>
        </div>

      </div>

      {/* 🔥 Scroll Bar placed precisely at the extreme right edge matching reference image */}
      <div className="absolute bottom-8 right-6 md:right-16 z-[2] flex items-center gap-2 text-xs text-gray-300 font-mono">
        <span>Scroll to explore</span>
        <div className="w-4 h-6 border border-white/60 rounded-full flex justify-center p-1">
          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}