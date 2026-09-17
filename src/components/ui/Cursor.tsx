"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { products, type Product } from "@/data/products";
import { WeaveSwatch } from "./WeaveSwatch";

/**
 * CURSOR.
 * Three states, one object:
 *   · at rest — a small cream dot in difference blend, so it stays visible on
 *     both the greige page and the dark bands, with a ring lagging behind it
 *   · over anything marked data-cursor — the ring grows into an indigo disc
 *     carrying a one-word label ("Quote", "View", "Browse")
 *   · over a catalogue row — the ring gives way to a fabric sample, the way a
 *     buyer holds a swatch up while reading the book
 *
 * Only mounted for fine pointers. Touch devices keep the native cursor and
 * none of this renders at all.
 */
export function Cursor() {
  const pathname = usePathname();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [sample, setSample] = useState<Product | null>(null);

  useEffect(() => {
    setFine(window.matchMedia("(hover:hover) and (pointer:fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine) return;
    document.body.classList.add("cursor-on");

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      const p = pos.current;
      p.rx += (p.x - p.rx) * 0.16;
      p.ry += (p.y - p.ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${p.rx}px, ${p.ry}px)`;
      if (peek.current) peek.current.style.transform = `translate(${p.rx}px, ${p.ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.body.classList.remove("cursor-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  // Delegated, so it keeps working for markup that arrives with a new route.
  useEffect(() => {
    if (!fine) return;
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor],[data-peek]") as HTMLElement | null;
      if (!el) {
        setLabel(null);
        setSample(null);
        return;
      }
      const slug = el.getAttribute("data-peek");
      if (slug) {
        setSample(products.find((p) => p.slug === slug) ?? null);
        setLabel(null);
      } else {
        setSample(null);
        setLabel(el.getAttribute("data-cursor"));
      }
    };
    document.addEventListener("pointerover", over);
    return () => document.removeEventListener("pointerover", over);
  }, [fine, pathname]);

  if (!fine) return null;

  const big = Boolean(label);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] rounded-full"
        style={{
          width: 6,
          height: 6,
          margin: "-3px 0 0 -3px",
          background: "var(--color-cloth-3)",
          mixBlendMode: "difference",
          opacity: visible && !sample ? 1 : 0,
          transition: "opacity .3s",
        }}
      />

      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] grid place-items-center rounded-full"
        style={{
          width: big ? 84 : 46,
          height: big ? 84 : 46,
          margin: big ? "-42px 0 0 -42px" : "-23px 0 0 -23px",
          border: `1px solid ${big ? "var(--color-indigo)" : "var(--color-ink)"}`,
          background: big ? "var(--color-indigo)" : "transparent",
          opacity: visible && !sample ? 1 : 0,
          transition:
            "opacity .3s, width .45s var(--ease-out), height .45s var(--ease-out), margin .45s var(--ease-out), background-color .35s, border-color .35s",
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: ".55rem",
            letterSpacing: ".12em",
            color: "var(--color-cloth-3)",
            opacity: big ? 1 : 0,
            transform: big ? "none" : "scale(.8)",
            transition: "opacity .3s, transform .3s var(--ease-out)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>

      <div
        ref={peek}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] overflow-hidden"
        style={{
          width: 170,
          height: 214,
          border: "1px solid rgba(240,235,222,.25)",
          boxShadow: "0 20px 60px rgba(20,22,19,.3)",
          opacity: sample && visible ? 1 : 0,
          transition: "opacity .35s var(--ease-out)",
        }}
      >
        {sample && (
          <WeaveSwatch
            key={sample.slug}
            warp={sample.swatch.warp}
            weft={sample.swatch.weft}
            density={sample.swatch.density}
            className="h-full w-full"
          />
        )}
      </div>
    </>
  );
}
