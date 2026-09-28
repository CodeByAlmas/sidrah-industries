"use client";

import { useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

import { Hero } from "@/components/Hero";
import { ButtonLink, Actions } from "@/components/ui/Button";
import { CatalogueGrid } from "@/components/sections/CatalogueGrid";
import { site } from "@/data/site";
import { generalQuoteLink } from "@/lib/whatsapp";

// --- Custom Video Player Components ---
export type VideoPlayerProps = ComponentProps<typeof MediaController>;
export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController style={{ ...style }} {...props} />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;
export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;
export const VideoPlayerTimeRange = ({ className, ...props }: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange
    className={cn("[--media-range-thumb-opacity:0] [--media-range-track-height:2px]", className)}
    {...props}
  />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<typeof MediaTimeDisplay>;
export const VideoPlayerTimeDisplay = ({ className, ...props }: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<typeof MediaVolumeRange>;
export const VideoPlayerVolumeRange = ({ className, ...props }: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;
export const VideoPlayerPlayButton = ({ className, ...props }: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<typeof MediaSeekBackwardButton>;
export const VideoPlayerSeekBackwardButton = ({ className, ...props }: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<typeof MediaSeekForwardButton>;
export const VideoPlayerSeekForwardButton = ({ className, ...props }: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;
export const VideoPlayerMuteButton = ({ className, ...props }: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;
export const VideoPlayerContent = ({ className, ...props }: VideoPlayerContentProps) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

// Inline interactive video card with custom tracking play cursor & fixed popup z-index
const InteractiveVideoCard = ({ src, title, caption }: { src: string; title: string; caption: string }) => {
  const [showVideoPopOver, setShowVideoPopOver] = useState(false);

  const SPRING = { mass: 0.1 };
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <>
      <figure 
        className="group relative cursor-none"
        onMouseMove={handlePointerMove}
        onMouseLeave={() => opacity.set(0)}
        onClick={() => setShowVideoPopOver(true)}
      >
        <div 
          className="relative aspect-video w-full overflow-hidden bg-ink-2"
          style={{ border: "1px solid var(--rule)" }}
        >
          <motion.div
            style={{ x, y, opacity }}
            className="pointer-events-none absolute z-30 flex w-fit select-none items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-black/80 backdrop-blur-md rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          >
            <Play className="size-3.5 fill-white" /> Play
          </motion.div>

          <video
            autoPlay
            muted
            playsInline
            loop
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
            <source src={src} />
          </video>
        </div>
        <figcaption className="pt-3.5">
          <h4 className="font-display text-[.98rem] font-semibold tracking-[-.02em]">{title}</h4>
          <p className="mute mt-0.5 text-[.88rem]">{caption}</p>
        </figcaption>
      </figure>

      <AnimatePresence>
        {showVideoPopOver && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
              onClick={() => setShowVideoPopOver(false)}
            />
            <motion.div
              initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5%)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
              exit={{
                clipPath: "inset(43.5% 43.5% 33.5% 43.5%)",
                opacity: 0,
                transition: { duration: 0.5, opacity: { duration: 0.2, delay: 0.3 } },
              }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
              className="relative aspect-video w-full max-w-5xl shadow-2xl bg-black z-[10000]"
            >
              <VideoPlayer style={{ width: "100%", height: "100%" }}>
                <VideoPlayerContent
                  src={src}
                  autoPlay
                  controls={false}
                  slot="media"
                  className="h-full w-full object-cover"
                />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideoPopOver(false);
                  }}
                  className="absolute right-5 top-5 z-[10005] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <Plus className="size-6 rotate-45" />
                </span>
                <VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-5xl -translate-x-1/2 items-center justify-center px-5 py-3 mix-blend-exclusion md:px-10">
                  <VideoPlayerPlayButton className="h-4 bg-transparent text-white" />
                  <VideoPlayerTimeRange className="bg-transparent" />
                  <VideoPlayerMuteButton className="size-4 bg-transparent text-white" />
                </VideoPlayerControlBar>
              </VideoPlayer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const MARQUEE =
  "Heavy canvas · Filter cloth · Tarpaulin · Tents · Multiple-ply yarn · Dyeing & coating · ";

export default function HomePage() {
  return (
    <>
      {/* ── Separate Compact Hero Section matching reference ── */}
      <Hero />

      {/* ── Selvedge strip ── */}
      <div
        className="overflow-hidden whitespace-nowrap py-3.5 bg-[#0b0d10] text-gray-400"
        style={{ borderBlock: "1px solid var(--rule)" }}
        aria-hidden
      >
        <div className="mono inline-block text-xs" style={{ letterSpacing: ".2em", animation: "slide 38s linear infinite" }}>
          {MARQUEE.repeat(4)}
        </div>
      </div>
      <style>{`@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      {/* ── Key stats ── */}
      <section className="band-s bg-white text-ink">
        <div className="shell">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.1fr]" style={{ borderTop: "1px solid var(--color-ink)" }}>
            {[site.capacity.cloth, site.capacity.yarn].map((c, i) => (
              <div
                key={c.label}
                className="fade py-6 md:py-10 md:pr-8"
                style={{
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <p className="font-display text-[clamp(2.4rem,8vw,4.4rem)] font-extrabold leading-[.85] tracking-[-.045em]">
                  {c.value}
                </p>
                <p className="mono mt-3.5 text-amber-600 font-semibold">{c.unit}</p>
                <p className="mute mt-1 text-[.9rem]">{c.label}</p>
              </div>
            ))}
            <div className="fade py-6 md:py-10 md:border-l md:pl-8" style={{ borderColor: "var(--rule)" }}>
              <p className="max-w-[34ch] text-[.95rem] text-gray-700">
                Twisting and weaving sit under one roof, so repeat orders match the exact warp specification.
              </p>
              <Actions className="mt-5">
                <ButtonLink href="/infrastructure" label="Inside the unit" />
              </Actions>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catalogue ── */}
      <section className="band bg-white text-ink">
        <div className="shell">
          <div className="weft">
            <h2 className="h1 max-w-[20ch]">
              <span className="mask"><span>What comes off</span></span>
              <span className="mask"><span>the looms</span></span>
            </h2>
          </div>
          <p className="lede fade mt-6 text-gray-600">
            Ten lines, six running today. Bulk manufacturing specifications for global buyers.
          </p>
          <div className="mt-11">
            <CatalogueGrid />
          </div>
        </div>
      </section>

      {/* ── Export ── */}
      <section className="dark-band bg-[#0b0d10] text-white">
        <div className="shell band grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="weft">
              <h2 className="h1">
                <span className="mask"><span>Set up for</span></span>
                <span className="mask"><span>buyers abroad</span></span>
              </h2>
            </div>
            <div className="body-text fade mt-6 text-gray-300">
              <p>
                Sourcing teams in Germany and across the EU work to strict specification sheets. We quote against written specs, send samples before bulk, and manage shipment end-to-end.
              </p>
            </div>
            <Actions className="fade mt-8">
              <ButtonLink href={generalQuoteLink()} label="Start an enquiry" variant="ind" external cursor="Quote" />
            </Actions>
          </div>

          <dl className="rows fade self-start">
            {site.markets.map((m) => (
              <div key={m.region} className="dl py-6 border-b border-gray-800">
                <dt className="h3 text-white">{m.region}</dt>
                <dd className="mute text-[.92rem] text-gray-400">{m.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Factory footage (Updated with InteractiveVideoCard) ── */}
      <section className="band bg-white text-ink">
        <div className="shell">
          <div className="weft">
            <h2 className="h1">
              <span className="mask"><span>See the floor</span></span>
              <span className="mask"><span>before you buy</span></span>
            </h2>
          </div>
          <p className="lede fade mt-6 text-gray-600">
            Watch our rapier looms and twisting floors in action.
          </p>
          <div className="fade mt-10 grid gap-6 sm:grid-cols-2">
            <InteractiveVideoCard
              src="/videos/weaving-1.mp4"
              title="Rapier loom in operation"
              caption="Weft insertion on the rapier, weaving heavy canvas at full width."
            />
            <InteractiveVideoCard
              src="/videos/tfo-1.mp4"
              title="Yarn twisting department"
              caption="Multiple-ply twisting that feeds our looms."
            />
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="dark-band bg-[#0b0d10] text-white">
        <div className="shell band">
          <h2 className="disp max-w-[16ch]" style={{ fontSize: "clamp(2.2rem,7vw,5.5rem)" }}>
            <span className="mask"><span>Tell us what the</span></span>
            <span className="mask"><span>fabric has to survive.</span></span>
          </h2>
          <p className="lede fade mt-7 text-gray-300">
            Specification, quantity, delivery country. Get a prompt quotation.
          </p>
          <Actions className="fade mt-9">
            <ButtonLink href={generalQuoteLink()} label="Message us on WhatsApp" variant="ind" external cursor="Quote" />
          </Actions>
        </div>
      </section>
    </>
  );
}