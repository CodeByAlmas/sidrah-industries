"use client";

import { useEffect, useState } from "react";

/** A single indigo thread across the top showing how far down the page you are. */
export function ScrollThread() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-0.5 bg-indigo"
      style={{ width: `${w}%`, transition: "width .1s linear" }}
    />
  );
}
