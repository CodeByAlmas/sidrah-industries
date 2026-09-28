"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProduct, relatedProducts } from "@/data/products";
import { productQuoteLink } from "@/lib/whatsapp";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { WeaveSwatch } from "@/components/ui/WeaveSwatch";
import { ProductRow } from "@/components/ProductRow";
import { site } from "@/data/site";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const product = getProduct(slug);
  if (!product) notFound();

  // Directly uses product.images array defined in products.ts for all products/variants
  const displayImages = product.images;

  // State for interactive active main image selection from thumbnails
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <article>
      <div className="shell" style={{ paddingTop: "6rem" }}>
        <Link href="/products" className="mono mute inline-block" data-cursor="Back">
          ← Catalogue
        </Link>
      </div>

      <div className="shell grid items-start gap-10 pb-16 pt-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        {/* Left Side: Interactive Gallery Layout with Click-to-Change Main Preview */}
        <div className="space-y-4">
          <div className="relative aspect-4/5 overflow-hidden bg-ink-2 shadow-lg" style={{ border: "1px solid var(--rule)" }}>
            {displayImages[activeImageIndex] ? (
              <Image 
                src={displayImages[activeImageIndex]} 
                alt={`${product.name} preview ${activeImageIndex + 1}`} 
                fill 
                priority 
                sizes="(max-width:1024px) 100vw, 55vw" 
                className="object-cover transition-all duration-500 ease-out hover:scale-105" 
              />
            ) : (
              <>
                <WeaveSwatch warp={product.swatch.warp} weft={product.swatch.weft} density={product.swatch.density} className="h-full w-full" />
                <span className="stamp">Weave illustration · photography to follow</span>
              </>
            )}
            <div className="absolute top-4 left-4 z-10 bg-ink/75 backdrop-blur-md px-3 py-1 text-[.7rem] mono text-cloth-3 border border-cloth-3/20">
              {displayImages.length > 0 ? `FACTORY LIVE VIEW · ${activeImageIndex + 1} / ${displayImages.length}` : "WEAVE SWATCH"}
            </div>
          </div>

          {/* Thumbnail Grid: Clicking any thumbnail instantly updates the main big block */}
          {displayImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {displayImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square overflow-hidden bg-ink-2 text-left cursor-pointer group transition-all duration-300 ${
                    activeImageIndex === idx ? "ring-2 ring-[var(--color-indigo)] scale-[0.98]" : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ border: "1px solid var(--rule)" }}
                >
                  <Image 
                    src={imgSrc} 
                    alt={`${product.name} thumbnail ${idx + 1}`} 
                    fill 
                    sizes="(max-width:768px) 25vw, 15vw" 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className={`absolute inset-0 transition-colors ${activeImageIndex === idx ? "bg-indigo-950/10" : "bg-black/10 group-hover:bg-transparent"}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div>
          <p className="mono fade" style={{ color: "var(--color-indigo)" }}>
            {product.family}
            {product.availability === "in-development" && " — in development"}
          </p>
          <h1 className="h1 mt-4">
            <span className="mask"><span>{product.name}</span></span>
          </h1>
          <p className="lede fade mt-5">{product.summary}</p>

          {/* The one commercial fact a bulk buyer looks for */}
          <div className="moq fade relative mt-8 overflow-hidden p-6" style={{ border: "1px solid var(--color-indigo)" }}>
            <span className="absolute inset-0" style={{ background: "var(--color-indigo)", opacity: 0.05 }} aria-hidden />
            <p className="mono relative" style={{ color: "var(--color-indigo)" }}>Minimum order quantity</p>
            <p className="relative mt-2 font-display font-extrabold leading-none tracking-[-.04em]" style={{ fontSize: "clamp(1.9rem,4vw,2.6rem)" }}>
              {product.moq.value}
            </p>
            {product.moq.note && <p className="mute relative mt-2 text-[.9rem]">{product.moq.note}</p>}
          </div>

          <Actions className="fade mt-6">
            <ButtonLink href={productQuoteLink(product)} label="Quote on WhatsApp" variant="ind" external cursor="Quote" />
            <ButtonLink href="/contact" label="Other ways to reach us" cursor="Contact" />
          </Actions>
          <p className="mute fade mt-4 max-w-[40ch] text-[.82rem]">
            The message opens pre-written with this product and its MOQ. Add your quantity and country, and send.
          </p>

          <div className="body-text fade mt-10">
            {product.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="dark-band">
        <div className="shell band-s grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <div className="weft">
              <h2 className="h2"><span className="mask"><span>Specification</span></span></h2>
            </div>
            <p className="mute fade mt-4 max-w-[30ch] text-[.92rem]">
              Anything here can be changed to order. Send a sample or a drawing and we will quote against it.
            </p>
            <h3 className="h3 fade mt-10">Typical applications</h3>
            <ul className="fade mt-4 grid gap-2.5">
              {product.applications.map((a) => (
                <li key={a} className="flex gap-3.5 text-[.93rem]" style={{ color: "rgba(240,235,222,.72)" }}>
                  <span className="mt-2.5 h-px w-4 shrink-0" style={{ background: "var(--color-indigo-2)" }} aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <dl className="rows fade">
            {product.specs.map((row) => (
              <div key={row.label} className="dl">
                <dt className="data" style={{ color: "rgba(240,235,222,.5)" }}>{row.label}</dt>
                <dd className="data">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell band-s">
        <p className="mono mute mb-4">Also from this floor</p>
        <div className="book">
          {relatedProducts(product.slug).map((p, i) => (
            <ProductRow key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </article>
  );
}