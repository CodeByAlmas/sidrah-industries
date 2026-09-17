"use client";

import { useEffect, useState } from "react";

/**
 * The warp: hairlines held under tension down the full height of the page,
 * on the same column positions the content sits on. It is the one structural
 * device the whole site is built around, so it is drawn once, globally.
 */
export function Warp() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 mx-auto flex max-w-[88rem] justify-between"
      style={{ paddingInline: "var(--pad)" }}
    >
      {Array.from({ length: 13 }).map((_, i) => (
        <i
          key={i}
          className={
            // four threads on a phone, seven from 640px, all thirteen on desktop
            i >= 7 ? "hidden w-px lg:block" : i >= 4 ? "hidden w-px sm:block" : "block w-px"
          }
          style={{
            background: "var(--rule-soft)",
            transformOrigin: "top",
            transform: ready ? "scaleY(1)" : "scaleY(0)",
            transition: `transform 1.1s var(--ease-out) ${i * 30}ms`,
          }}
        />
      ))}
    </div>
  );
}
