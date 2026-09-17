"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { generalQuoteLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const MENU = [{ label: "Home", href: "/" }, ...site.nav];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [lift, setLift] = useState(false);
  const [invert, setInvert] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  // The bar sits over the dark hero on the home page, so it inverts to cream
  // until the hero has scrolled past.
  useEffect(() => {
    const onScroll = () => {
      setLift(window.scrollY > 16);
      const hero = document.getElementById("hero");
      setInvert(Boolean(hero) && window.scrollY < (hero as HTMLElement).offsetHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Lock the page behind the sheet without losing the reading position —
  // position:fixed alone would jump iOS back to the top on close.
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    document.body.style.top = `-${y}px`;
    document.body.classList.add("locked");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("locked");
      document.body.style.top = "";
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60]"
        style={{
          color: invert ? "var(--color-cloth-3)" : "var(--color-ink)",
          background: lift ? (invert ? "rgba(20,22,19,.72)" : "rgba(221,214,196,.9)") : "transparent",
          backdropFilter: lift ? "blur(14px) saturate(1.2)" : "none",
          transition: "background-color .5s var(--ease), color .4s var(--ease)",
        }}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.75rem] md:gap-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("nl", active && "on")}
                  data-cursor={item.label}
                  style={{ position: "relative", padding: ".55rem .8rem", fontSize: ".85rem", fontWeight: 500 }}
                >
                  <span className="roll" style={{ display: "block", overflow: "hidden", height: "1.25em" }}>
                    <span style={{ display: "block", lineHeight: "1.25em" }}>{item.label}</span>
                    <span aria-hidden style={{ display: "block", lineHeight: "1.25em" }}>
                      {item.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={generalQuoteLink()}
              label="Request a quote"
              variant="ind"
              external
              cursor="Quote"
              className="hidden lg:inline-flex [&_.pad]:px-[1rem] [&_.pad]:py-[.65rem]"
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-sheet"
              className="grid h-11 w-11 shrink-0 place-items-center lg:hidden"
              style={{ border: "1px solid currentColor" }}
            >
              <span className="block">
                {[0, 1, 2].map((i) => (
                  <i
                    key={i}
                    className="block h-px w-[15px] bg-current"
                    style={{
                      marginTop: i ? 4 : 0,
                      transition: "transform .4s var(--ease), opacity .3s",
                      transform: open
                        ? i === 0
                          ? "translateY(5px) rotate(45deg)"
                          : i === 2
                            ? "translateY(-5px) rotate(-45deg)"
                            : "none"
                        : "none",
                      opacity: open && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
        <span
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: "currentColor",
            opacity: 0.16,
            transform: lift ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .6s var(--ease)",
          }}
        />
      </header>

      {/* Full-bleed sheet, clipped open from the top. It scrolls if the list
          ever outgrows a short handset, and the links sit low so they fall
          under the thumb rather than up by the notch. */}
      <div
        id="mobile-sheet"
        aria-hidden={!open}
        className="fixed inset-0 z-[58] flex flex-col overflow-y-auto bg-ink text-cloth-3"
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path .7s var(--ease)",
          overscrollBehavior: "contain",
          paddingTop: "4rem",
          paddingBottom: "calc(1.5rem + var(--safe-b))",
        }}
      >
        <nav className="shell mt-auto">
          {MENU.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3.5 font-display text-[clamp(2rem,11vw,3.2rem)] font-bold leading-[1.3] tracking-[-.04em]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(18px)",
                transition: `opacity .5s ${0.24 + i * 0.06}s, transform .5s ${0.24 + i * 0.06}s`,
              }}
            >
              <span>{item.label}</span>
              <em className="mono not-italic" style={{ fontSize: ".55rem", opacity: 0.45, fontWeight: 400 }}>
                {String(i + 1).padStart(2, "0")}
              </em>
            </Link>
          ))}
        </nav>

        <div
          className="shell mt-10 pt-6"
          style={{
            borderTop: "1px solid rgba(240,235,222,.16)",
            opacity: open ? 1 : 0,
            transition: "opacity .5s .56s",
          }}
        >
          <a
            href={generalQuoteLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full"
            style={{ borderColor: "var(--color-cloth-3)", color: "var(--color-cloth-3)" }}
          >
            <span className="pad">
              <span className="roll">
                <span>Request a quote</span>
                <span aria-hidden>Request a quote</span>
              </span>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <p className="mono mt-5" style={{ color: "rgba(240,235,222,.45)" }}>
            {site.address.line1}, {site.address.city} · {site.phoneDisplay}
          </p>
        </div>
      </div>

      <style>{`
        .nl::after{content:"";position:absolute;left:.8rem;right:.8rem;bottom:.3rem;height:1px;
          background:currentColor;transform:scaleX(0);transform-origin:right;
          transition:transform .45s var(--ease)}
        .nl .roll span{transition:transform .45s var(--ease)}
        @media(hover:hover){
          .nl:hover::after{transform:scaleX(1);transform-origin:left}
          .nl:hover .roll span{transform:translateY(-1.25em)}
        }
        .nl.on{color:var(--color-indigo-2)}
        .nl.on::after{transform:scaleX(1)}
        #mobile-sheet .btn::before{background:var(--color-cloth-3)}
        @media(hover:hover){#mobile-sheet .btn:hover{color:var(--color-ink)}}
      `}</style>
    </>
  );
}