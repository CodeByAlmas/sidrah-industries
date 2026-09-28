import Link from "next/link";
import { site } from "@/data/site";
import { products } from "@/data/products";

const U = "relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-amber-400 after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100";

export function Footer() {
  return (
    <footer className="dark-band relative overflow-hidden border-t border-neutral-800">
      {/* Subtle background grid texture overlay for industrial depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="shell band-s relative z-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <p className="font-display font-extrabold leading-[.92] tracking-[-.04em] text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 2.8rem)" }}>
              Sidrah
              <br />
              <span className="text-amber-400">Industries</span>
            </p>
            <p className="mono text-xs tracking-widest text-neutral-400 uppercase">
              {site.address.factory.line1} · {site.address.factory.city} · U.P.
            </p>
            <p className="text-sm text-neutral-300 max-w-xs leading-relaxed pt-2">
              Heavy canvas, filter cloth, tarpaulin, tents and multiple-ply yarn manufactured on rapier looms for global buyers.
            </p>
          </div>

          {/* In production (Dropdown list) */}
          <div>
            <p className="mono mb-5 text-amber-400/90 tracking-wider text-xs uppercase flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              In production
            </p>
            <details className="group border border-neutral-800 rounded-lg bg-neutral-900/50 p-3 transition-colors hover:border-neutral-700">
              <summary className="mono cursor-pointer select-none text-[0.8rem] tracking-wider text-neutral-200 flex items-center justify-between">
                <span>Active lines ({products.filter((p) => p.availability === "in-production").length})</span>
                <span className="transition-transform group-open:rotate-180 text-amber-400">↓</span>
              </summary>
              <ul className="grid gap-2.5 text-[0.880rem] pt-3 mt-3 border-t border-neutral-800 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {products
                  .filter((p) => p.availability === "in-production")
                  .map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className={`${U} text-neutral-300 hover:text-white block py-0.5`}>
                        {p.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </details>
          </div>

          {/* Company Nav */}
          <div>
            <p className="mono mb-5 text-amber-400/90 tracking-wider text-xs uppercase">Company</p>
            <ul className="grid gap-3 text-[0.92rem]">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={`${U} text-neutral-300 hover:text-white inline-block`}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Factory & Office */}
          <div>
            <p className="mono mb-5 text-amber-400/90 tracking-wider text-xs uppercase">Reach Factory & Office</p>
            <address className="grid gap-4 text-[0.88rem] not-italic text-neutral-300">
              <div className="bg-neutral-900/40 border border-neutral-800/80 p-3 rounded-lg">
                <strong className="block text-[0.65rem] uppercase tracking-widest font-mono text-amber-400 mb-1">Factory Floor</strong>
                <span className="text-neutral-300 leading-snug">
                  {site.address.factory.line1}, {site.address.factory.city}
                  <br />
                  {site.address.factory.state} {site.address.factory.postalCode}, {site.address.factory.country}
                </span>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-800/80 p-3 rounded-lg">
                <strong className="block text-[0.65rem] uppercase tracking-widest font-mono text-amber-400 mb-1">Corporate Office</strong>
                <span className="text-neutral-300 leading-snug">
                  {site.address.office.line1}, {site.address.office.city}
                  <br />
                  {site.address.office.state}, {site.address.office.postalCode}, {site.address.office.country}
                </span>
              </div>
              <div className="pt-1 space-y-1">
                <a href={`tel:${site.whatsappNumber}`} className={`${U} text-white font-mono text-sm inline-block`}>{site.phoneDisplay}</a>
                <br />
                <a href={`mailto:${site.email}`} className={`${U} text-neutral-400 hover:text-white text-sm inline-block`}>{site.email}</a>
              </div>
            </address>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="mt-14 flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-neutral-400"
          style={{ borderTop: "1px solid rgba(240,235,222,.1)" }}
        >
          <p className="mono">© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="mono text-amber-400/80 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">Export enquiries welcome worldwide</p>
        </div>
      </div>
    </footer>
  );
}