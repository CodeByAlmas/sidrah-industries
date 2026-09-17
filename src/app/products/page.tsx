import type { Metadata } from "next";
import { CatalogueGrid } from "@/components/sections/CatalogueGrid";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Heavy canvas, filter cloth, tarpaulin, tents, multiple-ply yarn, and dyeing & coating. Minimum order quantity stated on every product.",
};

export default function ProductsPage() {
  return (
    <div className="shell band" style={{ paddingTop: "7.5rem" }}>
      <p className="mono fade mb-6">Catalogue — ten lines</p>
      <h1 className="disp max-w-[14ch]" style={{ fontSize: "clamp(2.4rem,7vw,6rem)" }}>
        <span className="mask"><span>Minimum order,</span></span>
        <span className="mask"><span>stated up front.</span></span>
      </h1>
      <p className="lede fade mt-8">
        We supply in bulk, so the MOQ sits on the face of each product rather than three emails deep. Below-MOQ trial
        quantities can still be discussed.
      </p>
      <div className="mt-11">
        <CatalogueGrid />
      </div>
    </div>
  );
}
