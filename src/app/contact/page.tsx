import type { Metadata } from "next";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { generalQuoteLink } from "@/lib/whatsapp";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a specification to Sidrah Industries, Magarwara, Unnao. Quotations are handled over WhatsApp for Indian and export buyers.",
};

export default function ContactPage() {
  const rows: [string, string][] = [
    ["Factory", `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}, ${site.address.country}`],
    ["WhatsApp & phone", site.phoneDisplay],
    ["Email", site.email],
    ["Hours", "Monday – Saturday, 9:00 – 18:00 IST"],
    ["Nearest airport", "Lucknow (LKO), ~1 hour by road"],
  ];

  return (
    <div className="shell band grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16" style={{ paddingTop: "7.5rem" }}>
      <div>
        <p className="mono fade mb-6">Contact</p>
        <h1 className="disp max-w-[12ch]" style={{ fontSize: "clamp(2.2rem,6vw,4.6rem)" }}>
          <span className="mask"><span>Quotations</span></span>
          <span className="mask"><span>run on</span></span>
          <span className="mask"><span style={{ color: "var(--color-indigo)" }}>WhatsApp.</span></span>
        </h1>
        <p className="lede fade mt-7">
          Faster than email for both of us, it works across time zones, and you can send a photo of the fabric you are
          trying to match.
        </p>
        <Actions className="fade mt-8">
          <ButtonLink href={generalQuoteLink()} label="Open WhatsApp" variant="ind" external cursor="Quote" />
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
