import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and data handling practices for ${site.name}, Magarwara, Unnao & Kanpur.`,
};

export default function PrivacyPage() {
  return (
    <main className="shell band" style={{ paddingTop: "7.5rem", paddingBottom: "5rem" }}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="mono fade mb-4 tracking-widest text-[var(--color-indigo)]">LEGAL & COMPLIANCE</p>
          <h1 className="h1 text-3xl md:text-5xl font-display font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-neutral-500 mt-2 font-mono">Last updated: {new Date().getFullYear()}</p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700 leading-relaxed text-[0.95rem]">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">1. Overview</h2>
            <p>
              {site.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as an industrial manufacturer and exporter of heavy canvas, tarpaulin, filter cloth, tents, and multiple-ply yarn based in Unnao and Kanpur, Uttar Pradesh, India. This Privacy Policy outlines how we handle communications and minimal technical data when you visit our website or submit an enquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">2. Information We Collect</h2>
            <p>
              We do not operate user accounts, databases, or password-protected systems on this website. When you submit an enquiry, the information you provide (such as your name, company, product specification, and destination country) is composed directly into a message and transmitted via external communication channels like <strong>WhatsApp</strong> or <strong>Email</strong>. We only process what you explicitly share with us to fulfill your quotation request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">3. Use of Technical Data & Cookies</h2>
            <p>
              Our hosting and infrastructure providers may automatically log standard technical telemetry (such as IP addresses, browser types, and access timestamps) for security, server performance optimization, and abuse prevention. We do not use intrusive tracking cookies for advertising or profiling.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">4. International Export Enquiries</h2>
            <p>
              As we cater to global sourcing teams across the EU, Germany, and worldwide, all communication data regarding trade specifications is kept strictly confidential and used solely for business correspondence, sampling, and manufacturing logistics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">5. Contact Us</h2>
            <p>
              If you have any questions regarding our privacy practices or export terms, you can reach us directly at:
            </p>
            <div className="p-4 bg-neutral-100 rounded-xl font-mono text-xs space-y-1 border border-neutral-200">
              <p><strong>Email:</strong> {site.email}</p>
              <p><strong>Phone:</strong> {site.phoneDisplay}</p>
              <p><strong>Address:</strong> {site.address.factory.line1}, {site.address.factory.city}, {site.address.factory.state} {site.address.factory.postalCode}, {site.address.factory.country}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}