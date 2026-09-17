"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PRELOADER — threading the loom.
 * Warp threads drop in one by one, a shuttle passes a single weft across,
 * then the curtain lifts in columns.
 *
 * It runs on EVERY page load, including a refresh. Client-side navigation
 * between pages does not remount it, so it never interrupts browsing — only
 * a genuine load plays it.
 *
 * Phones get fewer threads, fewer curtain columns and a shorter run, because
 * the same sequence at the same length feels slow on a small screen.
 */

export function Preloader() {
  const [pct, setPct] = useState(0);
  const [lift, setLift] = useState(false);
  const [gone, setGone] = useState(false);
  const [shuttle, setShuttle] = useState(false);
  const [threads, setThreads] = useState(17);
  const [columns, setColumns] = useState(8);
  const raf = useRef<number>(0);

  useEffect(() => {
    const small = window.innerWidth < 640;
    setThreads(small ? 9 : 21);
    setColumns(small ? 4 : 8);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : small ? 1350 : 1650;
    const t0 = performance.now();

    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / total);
      // Custom easing curve for smoother progression feel
      const eased = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
      setPct(Math.round(eased * 100));
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);

    const t1 = setTimeout(() => setShuttle(true), reduce ? 0 : Math.round(total * 0.3));
    const t2 = setTimeout(() => {
      document.body.classList.add("ready");
      setLift(true);
    }, total);
    const t3 = setTimeout(() => setGone(true), total + (reduce ? 60 : 850));

    return () => {
      cancelAnimationFrame(raf.current);
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[99] grid place-items-center bg-ink text-cloth-3 overflow-hidden"
      style={{ pointerEvents: lift ? "none" : "auto" }}
      aria-hidden
    >
      {/* Subtle loom warp background grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(240,235,222,.03) 1px, transparent 1px)",
          backgroundSize: "40px 100%"
        }}
      />

      <div className="absolute inset-0 flex justify-between px-[6vw]">
        {Array.from({ length: threads }).map((_, i) => (
          <i
            key={i}
            className="block w-px"
            style={{
              background: "rgba(240,235,222,.18)",
              transformOrigin: "top",
              animation: `thread .8s var(--ease-out) ${i * 35}ms forwards`,
              transform: "scaleY(0)",
            }}
          />
        ))}
      </div>

      <div
        className="absolute left-0 h-px w-full bg-cloth-3 shadow-[0_0_12px_rgba(240,235,222,0.4)]"
        style={{
          top: "50%",
          transformOrigin: "left",
          transform: shuttle ? "scaleX(1)" : "scaleX(0)",
          transition: "transform .65s cubic-bezier(.16,1,.3,1)",
        }}
      />

      <div
        className="relative px-6 text-center z-10"
        style={{ opacity: lift ? 0 : 1, transition: "opacity .3s ease, transform .4s ease", transform: lift ? "translateY(-10px)" : "none" }}
      >
        <div className="overflow-hidden font-display text-[clamp(2.5rem,13vw,5rem)] font-extrabold leading-none tracking-[-.05em]">
          <span style={{ display: "inline-block", transform: "translateY(115%)", animation: "rise .85s var(--ease-out) forwards" }}>
            SIDRAH
          </span>
        </div>
        <p className="mono mt-4" style={{ letterSpacing: ".28em", color: "rgba(240,235,222,.6)" }}>
          Industrial Woven Fabric · Unnao
        </p>
      </div>

      <div
        className="data absolute right-[8vw] z-10"
        style={{
          bottom: "calc(6vh + var(--safe-b))",
          color: "rgba(240,235,222,.7)",
          opacity: lift ? 0 : 1,
          transition: "opacity .3s",
        }}
      >
        {pct}%
      </div>

      <div className="absolute inset-0 flex pointer-events-none">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-ink relative h-full"
            style={{
              transformOrigin: "top",
              transform: lift ? "scaleY(0)" : "scaleY(1)",
              transition: `transform .75s cubic-bezier(.76,0,.24,1) ${i * 40}ms`,
            }}
          >
            {/* Luminous thread edge on closing/opening columns */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-[rgba(240,235,222,0.12)]" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes thread{to{transform:scaleY(1)}}
        @keyframes rise{to{transform:none}}
      `}</style>
    </div>
  );
}