import type { Metadata } from "next";
import { CatalogueGrid } from "@/components/sections/CatalogueGrid";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Heavy canvas, filter cloth, tarpaulin, tents, multiple-ply yarn, and dyeing & coating. Manufactured in bulk at Unnao & Kanpur.",
};

export default function ProductsPage() {
  return (
    <div className="shell band" style={{ paddingTop: "7.5rem" }}>
      <p className="mono fade mb-6">Catalogue — running lines</p>
      <h1 className="h1 max-w-[18ch]">
        <span className="mask"><span>Industrial woven fabrics</span></span>
        <span className="mask"><span>and bulk supplies.</span></span>
      </h1>
      <p className="lede fade mt-6">
        Manufactured on rapier looms in Unnao with in-house twisting and dyeing. Custom constructions and bulk export enquiries welcome.
      </p>
      <div className="mt-11">
        <CatalogueGrid />
      </div>
    </div>
  );
}