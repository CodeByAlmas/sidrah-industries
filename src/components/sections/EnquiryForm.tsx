"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/data/site";

/**
 * No backend, no database, no mail server to keep alive. The form composes a
 * tidy enquiry and hands it to WhatsApp, which is where the client actually
 * reads messages. Only product and quantity really matter, so nothing is
 * marked required and nobody bounces off a long form.
 */
export function EnquiryForm() {
  const [form, setForm] = useState({
    product: products[0].name,
    quantity: "",
    spec: "",
    company: "",
    country: "",
    name: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = [
    `Hello ${site.name},`,
    ``,
    `Product: ${form.product}`,
    `Quantity: ${form.quantity || "—"}`,
    form.spec ? `Specification: ${form.spec}` : null,
    form.company ? `Company: ${form.company}` : null,
    form.country ? `Delivery country: ${form.country}` : null,
    form.name ? `Contact: ${form.name}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="fade p-5 md:p-8" style={{ border: "1px solid var(--rule)" }}>
      <div className="weft">
        <h2 className="h2">Build your enquiry</h2>
      </div>
      <p className="mute mt-3.5 text-[.92rem]">
        Fill what you know. The button opens WhatsApp with the message already written.
      </p>

      <div className="mt-8 grid gap-5">
        <label>
          <span className="mono mute mb-1 block">Product</span>
          <select value={form.product} onChange={set("product")} className="field cursor-pointer">
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option>Something else — custom construction</option>
          </select>
        </label>

        <label>
          <span className="mono mute mb-1 block">Quantity</span>
          <input value={form.quantity} onChange={set("quantity")} placeholder="e.g. 20,000 metres" className="field" />
        </label>

        <label>
          <span className="mono mute mb-1 block">Delivery country</span>
          <input value={form.country} onChange={set("country")} placeholder="e.g. Germany" className="field" />
        </label>

        <label>
          <span className="mono mute mb-1 block">Company</span>
          <input value={form.company} onChange={set("company")} className="field" />
        </label>

        <label>
          <span className="mono mute mb-1 block">Your name</span>
          <input value={form.name} onChange={set("name")} className="field" />
        </label>

        <label>
          <span className="mono mute mb-1 block">Specification — width, weight, finish, end use</span>
          <textarea rows={3} value={form.spec} onChange={set("spec")} className="field resize-y" />
        </label>
      </div>

      <div className="actions mt-8">
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ind"
        data-cursor="Send"
      >
        <span className="pad">
          <span className="roll">
            <span>Send on WhatsApp</span>
            <span aria-hidden>Send on WhatsApp</span>
          </span>
          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </span>
      </a>
      </div>
    </div>
  );
}
