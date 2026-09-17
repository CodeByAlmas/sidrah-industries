import type { Metadata } from "next";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { generalQuoteLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sidrah Industries is an industrial textile manufacturer at Magarwara, Unnao, producing woven fabric and multiple-ply yarn for Indian and export buyers.",
};

const steps: [string, string][] = [
  ["Specification", "You send the construction, width, weight and end use — or a physical sample."],
  ["Feasibility & quotation", "We confirm what our looms can hold and quote against it."],
  ["Sample approval", "A lab-dip or hanger sample goes out before any bulk commitment."],
  ["Bulk production", "Scheduled on the floor with your lead time confirmed in writing."],
  ["Inspection & dispatch", "Roll inspection, packing to your spec, documents for FOB or CIF."],
];

export default function AboutPage() {
  return (
    <>
      <div className="shell band" style={{ paddingTop: "7.5rem" }}>
        <p className="mono fade mb-6">About</p>
        <h1 className="disp max-w-[14ch]" style={{ fontSize: "clamp(2.4rem,7vw,6rem)" }}>
          <span className="mask"><span>A weaving unit</span></span>
          <span className="mask"><span>that answers</span></span>
          <span className="mask"><span>straight.</span></span>
        </h1>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="body-text fade">
            <p>
              Sidrah Industries manufactures industrial woven fabric and multiple-ply yarn at Magarwara, Unnao. Heavy
              canvas and filter cloth are the lines we are known for.
            </p>
            <p>
              The unit was built around rapier weaving and in-house ply twisting. Those two things together are the
              whole argument for working with us: the yarn in your cloth is made here, so a second order matches the
              first.
            </p>
            <p>
              We work in bulk. Every product carries a minimum order quantity so nobody wastes a week discovering we
              are not a retail supplier. For a first trial order we are usually willing to go below it — ask.
            </p>
            <p>
              Where a capability is still being developed — wax-proof, chemical-resistant and PU-coated cloth — the
              site says so on the product page rather than implying it is on the shelf.
            </p>
          </div>

          <div className="fade">
            <div className="weft">
              <h2 className="h2">How an order runs</h2>
            </div>
            {/* numbered because this genuinely is a sequence */}
            <ol className="rows mt-6">
              {steps.map(([title, note], i) => (
                <li key={title} className="dl py-5" style={{ gridTemplateColumns: "2.5rem 1fr", gap: "1.2rem" }}>
                  <span className="data" style={{ color: "var(--color-indigo)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="h3 block">{title}</span>
                    <span className="mute mt-1 block text-[.92rem]">{note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="dark-band">
        <div className="shell band-s flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="h1 max-w-[16ch]">Have a specification ready?</h2>
            <p className="mute mt-3">We will tell you whether this is the right unit for it.</p>
          </div>
          <Actions>
            <ButtonLink href={generalQuoteLink()} label="Send it over" variant="ind" external cursor="Quote" />
            <ButtonLink href="/products" label="Browse products" cursor="Browse" />
          </Actions>
        </div>
      </div>
    </>
  );
}
