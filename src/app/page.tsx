import { HeroBackground } from "@/components/three/HeroBackground";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { CatalogueGrid } from "@/components/sections/CatalogueGrid";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { site } from "@/data/site";
import { generalQuoteLink } from "@/lib/whatsapp";

const MARQUEE =
  "Heavy canvas · Filter cloth · Tarpaulin · Tents · Multiple-ply yarn · Dyeing & coating · ";

export default function HomePage() {
  return (
    <>
      {/* ── Hero: the cloth runs full bleed behind the type, and follows the pointer ── */}
      <section className="hero" id="hero">
        <HeroBackground />
        <div className="shell">
          <p className="mono fade mb-4" style={{ color: "rgba(240,235,222,.6)" }}>
            Magarwara, Unnao — since the first beam
          </p>
          <h1 className="disp max-w-[15ch]">
            <span className="mask"><span>Cloth that</span></span>
            <span className="mask"><span>has to hold</span></span>
            <span className="mask"><span style={{ color: "#8fa9d8" }}>up.</span></span>
          </h1>
          <p className="lede fade mt-6">
            Heavy canvas, filter cloth and tarpaulin woven on rapier looms — from multiple-ply yarn we twist
            ourselves. Bulk quantities, custom constructions, and a straight answer on what we can and cannot make.
          </p>
          <Actions className="fade mt-8">
            <ButtonLink href={generalQuoteLink()} label="Request a quote" variant="ind" external cursor="Quote" />
            <ButtonLink href="/products" label="See the catalogue" cursor="Browse" />
          </Actions>
        </div>

        <div className="hero-meta mono" aria-hidden>
          <span className="scrollcue">
            <i />
            Scroll
          </span>
          <span>Plain weave · loom state · 100 in.</span>
        </div>
      </section>

      {/* ── Selvedge strip: what the looms actually make ── */}
      <div
        className="overflow-hidden whitespace-nowrap py-3.5"
        style={{ borderBlock: "1px solid var(--rule)" }}
        aria-hidden
      >
        <div className="mono mute inline-block" style={{ letterSpacing: ".2em", animation: "slide 38s linear infinite" }}>
          {MARQUEE.repeat(4)}
        </div>
      </div>
      <style>{`@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      {/* ── The two numbers buyers ask first ── */}
      <section className="band-s">
        <div className="shell">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.1fr]" style={{ borderTop: "1px solid var(--color-ink)" }}>
            {[site.capacity.cloth, site.capacity.yarn].map((c, i) => (
              <div
                key={c.label}
                className="fade py-6 md:py-10 md:pr-8"
                style={{
                  borderBottom: "1px solid var(--rule)",
                  ...(i === 1 ? { borderLeft: "none", paddingLeft: "0", md: { borderLeft: "1px solid var(--rule)", paddingLeft: "2rem" } } : {}),
                }}
              >
                <p className="font-display text-[clamp(2.4rem,8vw,4.4rem)] font-extrabold leading-[.85] tracking-[-.045em]">
                  {c.value}
                </p>
                <p className="mono mt-3.5" style={{ color: "var(--color-indigo)" }}>{c.unit}</p>
                <p className="mute mt-1 text-[.9rem]">{c.label}</p>
              </div>
            ))}
            <div className="fade py-6 md:py-10 md:border-l md:pl-8" style={{ borderColor: "var(--rule)" }}>
              <p className="max-w-[34ch] text-[.95rem]" style={{ color: "rgba(20,22,19,.72)" }}>
                Twisting and weaving sit under one roof, so a repeat order comes off the same warp specification as
                the first. That is the part filtration and tarpaulin buyers care about.
              </p>
              <Actions className="mt-5">
                <ButtonLink href="/infrastructure" label="Inside the unit" />
              </Actions>
            </div>
          </div>
        </div>
      </section>

      {/* ── The catalogue, as a swatch book ── */}
      <section className="band">
        <div className="shell">
          <div className="weft">
            <h2 className="h1 max-w-[20ch]">
              <span className="mask"><span>What comes off</span></span>
              <span className="mask"><span>the looms</span></span>
            </h2>
          </div>
          <p className="lede fade mt-6">
            Ten lines, six running today. Every one carries its minimum order quantity on the face of it — we work in
            bulk and you should know that before you write to us.
          </p>
          <div className="mt-11">
            <CatalogueGrid />
          </div>
        </div>
      </section>

      {/* ── Export ── */}
      <section className="dark-band">
        <div className="shell band grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="weft">
              <h2 className="h1">
                <span className="mask"><span>Set up for</span></span>
                <span className="mask"><span>buyers abroad</span></span>
              </h2>
            </div>
            <div className="body-text fade mt-6">
              <p>
                Sourcing teams in Germany and across the EU work to a specification sheet, not to a phone call. We
                quote against written specs, send samples before bulk, and keep one person on your file from enquiry
                to shipment.
              </p>
              <p>Documentation, packing lists and port handling are arranged for FOB or CIF as you prefer.</p>
            </div>
            <Actions className="fade mt-8">
              <ButtonLink href={generalQuoteLink()} label="Start an enquiry" variant="ind" external cursor="Quote" />
            </Actions>
          </div>

          <dl className="rows fade self-start">
            {site.markets.map((m) => (
              <div key={m.region} className="dl py-6">
                <dt className="h3">{m.region}</dt>
                <dd className="mute text-[.92rem]">{m.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Factory footage ── */}
      <section className="band">
        <div className="shell">
          <div className="weft">
            <h2 className="h1">
              <span className="mask"><span>See the floor</span></span>
              <span className="mask"><span>before you buy</span></span>
            </h2>
          </div>
          <p className="lede fade mt-6">
            Rather than take our word for the capacity, watch the looms run. Walkthroughs are being filmed now.
          </p>
          <div className="fade mt-10">
            <VideoShowcase
              clips={[
                {
                  title: "Rapier loom in operation",
                  caption: "Weft insertion on the rapier, weaving heavy canvas at full width.",
                  // src: "/videos/loom-running.mp4",
                },
                {
                  title: "Yarn twisting department",
                  caption: "Multiple-ply twisting that feeds our looms and outside weavers.",
                  // src: "/videos/twisting.mp4",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="dark-band">
        <div className="shell band">
          <h2 className="disp max-w-[16ch]" style={{ fontSize: "clamp(2.2rem,7vw,5.5rem)" }}>
            <span className="mask"><span>Tell us what the</span></span>
            <span className="mask"><span>fabric has to survive.</span></span>
          </h2>
          <p className="lede fade mt-7">
            Specification, quantity, delivery country. You will get a quotation — or an honest no.
          </p>
          <Actions className="fade mt-9">
            <ButtonLink href={generalQuoteLink()} label="Message us on WhatsApp" variant="ind" external cursor="Quote" />
          </Actions>
        </div>
      </section>
    </>
  );
}
