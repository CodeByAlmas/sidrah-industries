import type { Metadata } from "next";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { generalQuoteLink } from "@/lib/whatsapp";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a specification to Sidrah Industries, Magarwara, Unnao. Quotations are handled over WhatsApp and email for Indian and export buyers.",
};

export default function ContactPage() {
  const rows: [string, string][] = [
    ["Factory", `${site.address.factory.line1}, ${site.address.factory.city}, ${site.address.factory.state} ${site.address.factory.postalCode}, ${site.address.factory.country}`],
    ["Office", `${site.address.office.line1}, ${site.address.office.city}, ${site.address.office.state} ${site.address.office.postalCode}, ${site.address.office.country}`],
    ["WhatsApp & phone", site.phoneDisplay],
    ["Email", site.email],
    ["Hours", "Monday – Saturday, 9:00 – 18:00 IST"],
    ["Nearest airport", "Lucknow (LKO), ~1 hour by road"],
  ];

  const emailSubject = encodeURIComponent("Enquiry for Sidrah Industries — Textile Bulk Supply");
  const emailBody = encodeURIComponent(
    `Hello ${site.name},\n\nI would like to discuss a requirement for woven fabrics / yarn.\n\nProduct of interest:\nQuantity required:\nDelivery country & port:\nCompany name:\n`
  );
  const mailtoLink = `mailto:${site.email}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="shell band grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16" style={{ paddingTop: "7.5rem" }}>
      <div>
        <p className="mono fade mb-6">Contact</p>
        <h1 className="h1 max-w-[18ch]">
          <span className="mask"><span>Quotations on</span></span>
          <span className="mask"><span style={{ color: "var(--color-indigo)" }}>WhatsApp & Email.</span></span>
        </h1>
        <p className="lede fade mt-6">
          Reach out via WhatsApp for rapid responses, or send an email specification. We support international export buyers across all time zones.
        </p>
        <Actions className="fade mt-8 flex flex-wrap gap-4">
          <ButtonLink href={generalQuoteLink()} label="Open WhatsApp" variant="ind" external cursor="Quote" />
          <ButtonLink href={mailtoLink} label="Send Email Enquiry" external cursor="Email" />
        </Actions>

        <dl className="rows fade mt-12">
          {rows.map(([label, value]) => (
            <div key={label} className="dl">
              <dt className="data mute">{label}</dt>
              <dd className="text-[.93rem]">{value}</dd>
            </div>
          ))}
        </dl>

        {/* MAP SLOT — paste the Google Maps embed iframe for the factory here. */}
        <div className="fade relative mt-8 grid aspect-video place-items-center bg-ink-2">
          <span className="tex" aria-hidden />
          <p className="mono relative" style={{ color: "rgba(240,235,222,.5)", letterSpacing: ".14em" }}>
            Map embed to be added
          </p>
        </div>
      </div>

      <EnquiryForm />
    </div>
  );
}