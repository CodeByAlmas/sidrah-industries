import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProduct, relatedProducts } from "@/data/products";
import { productQuoteLink } from "@/lib/whatsapp";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { WeaveSwatch } from "@/components/ui/WeaveSwatch";
import { ProductRow } from "@/components/ProductRow";
import { site } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    openGraph: { title: `${product.name} — ${site.name}`, description: product.summary },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article>
      <div className="shell" style={{ paddingTop: "6rem" }}>
        <Link href="/products" className="mono mute inline-block" data-cursor="Back">
          ← Catalogue
        </Link>
      </div>

      <div className="shell grid items-start gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="relative aspect-4/5 overflow-hidden bg-ink-2">
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          ) : (
            <>
              <WeaveSwatch warp={product.swatch.warp} weft={product.swatch.weft} density={product.swatch.density} className="h-full w-full" />
              <span className="stamp">Weave illustration · photography to follow</span>
            </>
          )}
        </div>

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
