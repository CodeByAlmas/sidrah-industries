"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { WeaveSwatch } from "@/components/ui/WeaveSwatch";

/**
 * A catalogue entry as a swatch-book row, not a card. The mill's own filing
 * system: index, name, one line, and the commercial fact a bulk buyer reads
 * first — the minimum order.
 */
export function ProductRow({ product, index }: { product: Product; index: number }) {
  return (
    // data-peek tells the cursor to swap its ring for this product's swatch
    <Link href={`/products/${product.slug}`} className="row" data-peek={product.slug}>
      <div className="min-w-0">
        <span className="idx block">
          {String(index + 1).padStart(2, "0")} / {product.family}
        </span>
        <span className="nm block">{product.name}</span>
        <span className="sm block">{product.summary}</span>
      </div>

      {/* on a phone this strip sits under the name; from 768px it stacks to the right */}
      <div className="rt flex items-center justify-between md:flex-col md:items-end gap-2">
        {product.availability === "in-development" ? (
          <span
            className="mono border px-1.5 py-0.5"
            style={{ fontSize: ".54rem", borderColor: "currentColor", color: "var(--color-indigo)" }}
          >
            In development
          </span>
        ) : (
          <span />
        )}
        <span className="data whitespace-nowrap">MOQ {product.moq.value}</span>
        <span
          className="h-11 w-11 shrink-0 overflow-hidden md:h-14 md:w-14 inline-block"
          style={{ border: "1px solid var(--rule)" }}
        >
          <WeaveSwatch warp={product.swatch.warp} weft={product.swatch.weft} density={9} className="h-full w-full" />
        </span>
      </div>
    </Link>
  );
}