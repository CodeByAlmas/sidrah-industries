"use client";

import { useEffect, useRef } from "react";

/**
 * A drawn fabric swatch, used on catalogue tiles until the client's own
 * product photography is in /public/products.
 * Each product carries its own warp/weft colour and thread density, so the
 * tiles read as different materials rather than as coloured placeholders.
 */
export function WeaveSwatch({
  warp,
  weft,
  density,
  className = "",
}: {
  warp: string;
  weft: string;
  density: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = Math.max(4, rect.width / density);
      ctx.fillStyle = "#12150f";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const cols = Math.ceil(rect.width / step) + 1;
      const rows = Math.ceil(rect.height / step) + 1;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const warpOnTop = (x + y) % 2 === 0;
          const px = x * step;
          const py = y * step;
          const inset = step * 0.14;

          // under thread first, then the one that floats over it
          ctx.fillStyle = warpOnTop ? weft : warp;
          if (warpOnTop) ctx.fillRect(px, py + inset, step, step - inset * 2);
          else ctx.fillRect(px + inset, py, step - inset * 2, step);

          ctx.fillStyle = warpOnTop ? warp : weft;
          if (warpOnTop) ctx.fillRect(px + inset, py, step - inset * 2, step);
          else ctx.fillRect(px, py + inset, step, step - inset * 2);

          // round the floating thread with a soft highlight
          const g = ctx.createLinearGradient(
            px,
            py,
            warpOnTop ? px + step : px,
            warpOnTop ? py : py + step,
          );
          g.addColorStop(0, "rgba(0,0,0,.34)");
          g.addColorStop(0.5, "rgba(255,255,255,.14)");
          g.addColorStop(1, "rgba(0,0,0,.34)");
          ctx.fillStyle = g;
          ctx.fillRect(px, py, step, step);
        }
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [warp, weft, density]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
