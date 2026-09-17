"use client";

import { useState } from "react";
import { ProductRow } from "@/components/ProductRow";
import { products, productFamilies, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

const filters = ["All", ...productFamilies] as const;

export function CatalogueGrid() {
  const [family, setFamily] = useState<(typeof filters)[number]>("All");

  const match = (p: Product) => family === "All" || p.family === family;
  const running = products.filter((p) => p.availability === "in-production" && match(p));
  const developing = products.filter((p) => p.availability === "in-development" && match(p));

  return (
    <>
      {/* the rail scrolls sideways on a phone instead of wrapping into a block */}
      <div className="filters fade">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFamily(f)}
            className={cn("fl", family === f && "on")}
          >
            {f}
            <span
              className="absolute inset-x-0 h-px"
              style={{
                bottom: -1,
                background: family === f ? "var(--color-indigo)" : "var(--color-ink)",
                transform: family === f ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform .45s var(--ease)",
              }}
            />
          </button>
        ))}
      </div>

      {running.length > 0 && (
        <section className="mt-12">
          <p className="mono mute mb-4">In production</p>
          <div className="book">
            {running.map((p, i) => (
              <ProductRow key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {developing.length > 0 && (
        <section className="mt-14">
          <p className="mono mute mb-2">In development</p>
          <p className="mute mb-5 max-w-[52ch] text-[.92rem]">
            Value-added lines we are building toward. Taken as sampling projects — we will tell you plainly where the
            capability stands.
          </p>
          <div className="book">
            {developing.map((p, i) => (
              <ProductRow key={p.slug} product={p} index={running.length + i} />
            ))}
          </div>
        </section>
      )}

      {running.length === 0 && developing.length === 0 && (
        <p className="mute mt-12">
          Nothing under {family} yet. Send the specification — custom constructions are a large part of what we do.
        </p>
      )}
    </>
  );
}