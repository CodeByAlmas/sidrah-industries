"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const WeaveCloth = dynamic(() => import("./WeaveCloth"), { ssr: false, loading: () => null });

/**
 * HERO BACKGROUND — Desert tent video background matching the reference design.
 */
const HERO_VIDEO = "/videos/Tent_swaying_in_desert_wind_20260927180538.mp4";

export function HeroBackground() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = { x: 0, y: 0 };
    const c = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      t.x = e.clientX / window.innerWidth - 0.5;
      t.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      c.x += (t.x - c.x) * 0.055;
      c.y += (t.y - c.y) * 0.055;
      el.style.transform = `translate3d(${c.x * -15}px, ${c.y * -10}px, 0) scale(1.04)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={layer} className="hero-bg" aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
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
      {/* Cinematic dark scrim overlay matching the reference theme */}
      <div className="hero-scrim" aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,12,15,0.85) 0%, rgba(10,12,15,0.45) 60%, rgba(10,12,15,0.2) 100%)", zIndex: 1 }} />
    </>
  );
}