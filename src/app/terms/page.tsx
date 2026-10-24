import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Commercial terms, export guidelines, and quotation conditions for ${site.name}, Unnao & Kanpur.`,
};

export default function TermsPage() {
  return (
    <main className="shell band" style={{ paddingTop: "7.5rem", paddingBottom: "5rem" }}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="mono fade mb-4 tracking-widest text-[var(--color-indigo)]">COMMERCIAL COMPLIANCE</p>
          <h1 className="h1 text-3xl md:text-5xl font-display font-bold tracking-tight">Terms & Conditions</h1>
          <p className="text-sm text-neutral-500 mt-2 font-mono">Last updated: {new Date().getFullYear()}</p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700 leading-relaxed text-[0.95rem]">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">1. Scope of Business</h2>
            <p>
              {site.name} manufactures and supplies industrial woven fabrics, heavy canvas, tarpaulin, filter cloth, tents, and multiple-ply yarn from our production unit in Magarwara, Unnao, and corporate office in Kanpur, Uttar Pradesh. All orders and quotations are subject to these standard commercial terms unless explicitly agreed otherwise in a written contract.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">2. Quotations & Enquiries</h2>
            <p>
              Enquiries submitted via WhatsApp or email are reviewed against current raw material costs, loom capacity, and specific buyer requirements (GSM, width, ply, and finishing). Quotations remain valid for the period specified in the formal proforma invoice or written message.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">3. Sampling & Quality Specifications</h2>
            <p>
              For bulk and export orders (including EU and international shipments), pre-shipment samples or technical specification sheets can be provided and approved prior to full-scale production on our rapier looms to ensure complete compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">4. Dispatch & Logistics</h2>
            <p>
              Delivery timelines depend on volume, custom dyeing, or coating requirements. Dispatch is organized from our Unnao/Kanpur facilities or via designated ports with proper export packing (HDPE wrap / bales / rolls as per buyer specifications).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">5. Governing Law</h2>
            <p>
              Any commercial disputes or legal interpretations arising from business transactions with {site.name} shall be subject to the exclusive jurisdiction of the courts located in Unnao / Kanpur, Uttar Pradesh, India.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}