import Link from "next/link";
import { site } from "@/data/site";
import { products } from "@/data/products";

const U = "relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100";

export function Footer() {
  return (
    <footer className="dark-band">
      <div className="shell band-s">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display font-extrabold leading-[.95] tracking-[-.04em]" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>
              Sidrah
              <br />
              Industries
            </p>
            <p className="mono mt-4" style={{ color: "rgba(240,235,222,.5)" }}>
              {site.address.line1} · {site.address.city} · U.P.
            </p>
          </div>

          <div>
            <p className="mono mb-4" style={{ color: "rgba(240,235,222,.45)" }}>In production</p>
            <ul className="grid gap-2.5 text-[.92rem]">
              {products
                .filter((p) => p.availability === "in-production")
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} className={U}>
                      {p.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="mono mb-4" style={{ color: "rgba(240,235,222,.45)" }}>Company</p>
            <ul className="grid gap-2.5 text-[.92rem]">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={U}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono mb-4" style={{ color: "rgba(240,235,222,.45)" }}>Reach the factory</p>
            <address className="grid gap-3 text-[.92rem] not-italic" style={{ color: "rgba(240,235,222,.72)" }}>
              <span>
                {site.address.line1}, {site.address.city}
                <br />
                {site.address.state} {site.address.postalCode}, {site.address.country}
              </span>
              <span>
                <a href={`tel:${site.whatsappNumber}`} className={U}>{site.phoneDisplay}</a>
                <br />
                <a href={`mailto:${site.email}`} className={U}>{site.email}</a>
              </span>
            </address>
          </div>
        </div>

        <div
          className="mt-14 flex flex-wrap justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(240,235,222,.16)" }}
        >
          <p className="mono" style={{ color: "rgba(240,235,222,.4)" }}>© {new Date().getFullYear()} {site.legalName}</p>
          <p className="mono" style={{ color: "rgba(240,235,222,.4)" }}>Export enquiries welcome</p>
        </div>
      </div>
    </footer>
  );
}
