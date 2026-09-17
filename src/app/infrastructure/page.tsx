import type { Metadata } from "next";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { generalQuoteLink } from "@/lib/whatsapp";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Rapier weaving, in-house multiple-ply twisting, and dyeing & coating at Magarwara, Unnao. Machine photographs and video of the floor in operation.",
};

/**
 * FACTORY PHOTO SLOTS.
 * Drop images at /public/factory/<name>.jpg and fill `src` below.
 * The grid is already sized; adding images changes nothing else.
 */
const gallery = [
  { name: "Weaving shed", note: "Rapier looms on the main floor", src: "" },
  { name: "Twisting department", note: "Ply yarn in production", src: "" },
  { name: "Finishing line", note: "Dyeing and coating", src: "" },
  { name: "Roll godown", note: "Packed rolls awaiting dispatch", src: "" },
  { name: "Quality check", note: "Inspection table and lamp", src: "" },
  { name: "Cutting & stitching", note: "Tarpaulin hemming and eyeleting", src: "" },
];

export default function InfrastructurePage() {
  return (
    <>
      <div className="shell band" style={{ paddingTop: "7.5rem" }}>
        <p className="mono fade mb-6">Inside the unit</p>
        <h1 className="disp max-w-[13ch]" style={{ fontSize: "clamp(2.4rem,7vw,6rem)" }}>
          <span className="mask"><span>Rapier looms,</span></span>
          <span className="mask"><span>our own twisting,</span></span>
          <span className="mask"><span>one roof.</span></span>
        </h1>

        <dl className="rows fade mt-14">
          {site.machinery.map((m) => (
            <div key={m.name} className="dl py-7">
              <dt className="h3">{m.name}</dt>
              <dd className="mute max-w-[48ch]">{m.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="dark-band">
        <div className="shell band-s">
          <div className="weft">
            <h2 className="h1"><span className="mask"><span>The floor, running</span></span></h2>
          </div>
          <div className="fade mt-10">
            <VideoShowcase
              clips={[
                { title: "Rapier loom, full width", caption: "Heavy canvas being woven at production speed." },
                { title: "Twisting frames", caption: "Ply yarn coming off the twisting department." },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="shell band">
        <div className="weft">
          <h2 className="h1">
            <span className="mask"><span>Machine and floor</span></span>
            <span className="mask"><span>photographs</span></span>
          </h2>
        </div>
        <div className="fade mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <figure key={g.name}>
              <div className="relative aspect-4/3 overflow-hidden bg-ink-2">
                {g.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.src} alt={g.name} className="h-full w-full object-cover" />
                ) : (
                  <>
                    <span className="tex" aria-hidden />
                    <span className="stamp">Photo to be added</span>
                  </>
                )}
              </div>
              <figcaption className="pt-3.5">
                <h3 className="font-display text-[.98rem] font-semibold tracking-[-.02em]">{g.name}</h3>
                <p className="mute mt-0.5 text-[.88rem]">{g.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="fade mt-14 p-8" style={{ border: "1px solid var(--rule)" }}>
          <h2 className="h2">Factory visits</h2>
          <p className="body-text mt-3.5">
            Buyers are welcome at the unit. Unnao is roughly an hour from Lucknow airport. Tell us when you land and we
            will arrange the visit.
          </p>
          <Actions className="mt-6">
            <ButtonLink href={generalQuoteLink()} label="Arrange a visit" external cursor="Visit" />
          </Actions>
        </div>
      </div>
    </>
  );
}
