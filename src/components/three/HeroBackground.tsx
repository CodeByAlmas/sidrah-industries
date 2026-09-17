"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const WeaveCloth = dynamic(() => import("./WeaveCloth"), { ssr: false, loading: () => null });

/**
 * HERO BACKGROUND — one full-bleed layer, two possible fills.
 *
 * TO PUT THE FACTORY FOOTAGE BEHIND THE HERO:
 *   1. Save the clip at /public/videos/factory-hero.mp4 (and a poster frame
 *      at /public/factory/hero-poster.jpg)
 *   2. Set HERO_VIDEO below to that path.
 * Until then the WebGL cloth fills the same layer, so the hero is never an
 * empty black box while filming is still happening.
 *
 * Keep the clip short, muted and roughly 4–8 MB. Anything heavier and a buyer
 * on mobile data in Germany waits on it. For a longer walkthrough, host it on
 * Mux or Cloudflare Stream and swap the <video> for their player.
 *
 * The layer is inset by 6% so pointer parallax never exposes an edge.
 */
const HERO_VIDEO = "";
const HERO_POSTER = "";

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
    // phones have no pointer to follow, so the handset's own tilt drives it
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      t.x = Math.max(-1, Math.min(1, e.gamma / 45)) * 0.5;
      t.y = Math.max(-1, Math.min(1, (e.beta - 45) / 45)) * 0.5;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt, { passive: true });

    let raf = 0;
    const loop = () => {
      c.x += (t.x - c.x) * 0.055;
      c.y += (t.y - c.y) * 0.055;
      el.style.transform = `translate3d(${c.x * -26}px, ${c.y * -20}px, 0) scale(1.02)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={layer} className="hero-bg" aria-hidden>
        {HERO_VIDEO ? (
          <video src={HERO_VIDEO} poster={HERO_POSTER || undefined} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <WeaveCloth />
        )}
      </div>
      <div className="hero-scrim" aria-hidden />
    </>
  );
}
