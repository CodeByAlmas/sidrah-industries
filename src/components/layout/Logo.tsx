import Link from "next/link";
import Image from "next/image";

/**
 * LOGO SLOT — updated with your brand icon and styling matching the reference.
 */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Sidrah Industries — home"
      className="group flex shrink-0 items-center gap-2.5 md:gap-3"
      style={{ minHeight: 44 }}
    >
      {/* Brand Logo Image replacing the SVG */}
      <span className="h-[2rem] w-[2rem] shrink-0 overflow-hidden md:h-9 md:w-9 flex items-center justify-center relative rounded">
        <Image
          src="/logo/logo.png" // Apni image ka path yahan daal dena (e.g. /logo.png ya /logo.svg)
          alt="Sidrah Industries Logo"
          fill
          className="object-contain"
          priority
        />
      </span>
      <span className="leading-none text-white">
        <span className="block font-display text-[.95rem] font-bold tracking-[-.03em] md:text-base">Sidrah Industries</span>
        <span className="mono mt-1 block" style={{ fontSize: ".5rem", letterSpacing: ".14em", color: "#fbbf24", opacity: 0.8 }}>
          UNNAO · UTTAR PRADESH
        </span>
      </span>
    </Link>
  );
}