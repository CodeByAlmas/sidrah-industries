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

        {/* Google Maps Embed Slot with Exact Coordinates from User Link */}
        <div className="fade relative mt-8 aspect-video w-full overflow-hidden bg-ink-2 shadow-md rounded-lg" style={{ border: "1px solid var(--rule)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.7423!2d80.4405625!3d26.5113125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c3f2cf8de463d%3A0x24c8576c67651f21!2sSidrah%20Industries!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sidrah Industries Factory Location Map - Magarwara Unnao"
            aria-label="Sidrah Industries Factory Location Map"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <EnquiryForm />
    </div>
  );
}