"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole document. Headings reveal line by line behind a
 * mask; everything else fades once. Re-runs on route change because the App
 * Router keeps the DOM alive between pages.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".fade,.weft,.mask").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const masks = el.querySelectorAll(".mask");
          if (masks.length) {
            masks.forEach((m, i) => setTimeout(() => m.classList.add("in"), i * 90));
          }
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    const targets = document.querySelectorAll(".fade,.weft,.disp,.h1,.h2");
    targets.forEach((t) => io.observe(t));

    // anything already in the first fold reveals straight away
    const kick = requestAnimationFrame(() => {
      targets.forEach((t) => {
        if (t.getBoundingClientRect().top < window.innerHeight) {
          const masks = t.querySelectorAll(".mask");
          masks.forEach((m, i) => setTimeout(() => m.classList.add("in"), 120 + i * 90));
          setTimeout(() => t.classList.add("in"), 200);
        }
      });
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(kick);
    };
  }, [pathname]);

  return null;
}
