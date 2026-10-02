"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export function ProductRow({ product, index }: { product: Product; index: number }) {
  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link href={`/products/${product.slug}`} className="row group" data-peek={product.slug}>
      <div className="min-w-0">
        <span className="idx block">
          {String(index + 1).padStart(2, "0")} / {product.family}
        </span>
        <span className="nm block">{product.name}</span>
        <span className="sm block">{product.summary}</span>
      </div>

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
        <span
          className="h-11 w-11 shrink-0 overflow-hidden md:h-14 md:w-14 inline-block relative rounded transition-transform duration-300 group-hover:scale-105"
          style={{ border: "1px solid var(--rule)" }}
        >
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <span />
          )}
        </span>
      </div>
    </Link>
  );
}