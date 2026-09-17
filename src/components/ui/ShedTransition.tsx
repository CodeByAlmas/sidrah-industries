"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * PAGE TRANSITION — the shed.
 * On a loom the shed is the gap the shuttle passes through: warps lift, then
 * close. Here the screen closes in staggered columns and reopens on the new
 * page. Skipped entirely under prefers-reduced-motion.
 */
export function ShedTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [phase, setPhase] = useState<"idle" | "close" | "open">("idle");
  // fewer, slightly slower columns on a phone — eight hairline strips on a
  // 390px screen reads as a flicker rather than a mechanism
  const [{ COLS, STEP, SPAN }, setCfg] = useState({ COLS: 8, STEP: 30, SPAN: 480 });

  useEffect(() => {
    const fit = () =>
      setCfg(window.innerWidth < 768 ? { COLS: 4, STEP: 40, SPAN: 400 } : { COLS: 8, STEP: 30, SPAN: 480 });
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setPhase("close");
    const t1 = setTimeout(() => setPhase("open"), SPAN + COLS * STEP);
    const t2 = setTimeout(() => setPhase("idle"), (SPAN + COLS * STEP) * 2);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, COLS, STEP, SPAN]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] flex" aria-hidden>
      {Array.from({ length: COLS }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-ink relative h-full"
          style={{
            transformOrigin: phase === "open" ? "top" : "bottom",
            transform: phase === "close" ? "scaleY(1)" : "scaleY(0)",
            transition:
              phase === "idle"
                ? "none"
                : `transform ${SPAN}ms cubic-bezier(.76,0,.24,1) ${(phase === "open" ? COLS - 1 - i : i) * STEP}ms`,
          }}
        >
          {/* Subtle thread hairline border between columns during transition */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-[rgba(240,235,222,0.1)]" />
        </div>
      ))}
    </div>
  );
}