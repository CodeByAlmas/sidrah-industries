import Link from "next/link";

/**
 * LOGO SLOT — reserved at 172 × 44 px on desktop, 148 × 44 px on a phone,
 * with clear space already allowed.
 *
 * TO SWAP IN THE REAL ARTWORK:
 *   1. Save it as /public/logo/sidrah-logo.svg
 *   2. Uncomment the <Image> block, delete the typographic block below it.
 * Nothing else on the page moves.
 *
 * The mark is a plain weave: three warps held vertically, three wefts crossing.
 * Its wefts shift a little on hover, the way a shuttle passes.
 */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Sidrah Industries — home"
      className="group flex shrink-0 items-center gap-2.5 md:gap-3"
      style={{ minHeight: 44 }}
    >
      {/*
      <Image src="/logo/sidrah-logo.svg" alt="Sidrah Industries" width={172} height={44} priority className="h-11 w-auto" />
      */}
      <span className="h-[1.7rem] w-[1.7rem] shrink-0 overflow-hidden md:h-8 md:w-8" aria-hidden>
        <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
          <path d="M8 2v28M16 2v28M24 2v28" stroke="currentColor" strokeWidth="1.2" opacity=".45" />
          <g
            className="transition-transform duration-500 group-hover:translate-x-[2px]"
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            <path d="M2 9h28M2 16h28M2 23h28" stroke="currentColor" strokeWidth="2.4" />
          </g>
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[.92rem] font-bold tracking-[-.03em] md:text-base">Sidrah Industries</span>
        <span className="mono mt-1 block" style={{ fontSize: ".5rem", letterSpacing: ".14em", opacity: 0.6 }}>
          Est. Unnao · U.P.
        </span>
      </span>
    </Link>
  );
}
