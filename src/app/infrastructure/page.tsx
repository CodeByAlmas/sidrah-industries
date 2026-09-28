"use client";

import type { Metadata } from "next";
import React, { useState } from "react";
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
import { ButtonLink, Actions } from "@/components/ui/Button";
import { visitQuoteLink } from "@/lib/whatsapp";
import { site } from "@/data/site";

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

/**
 * PRODUCTION PROCESS STEPS & MEDIA SLOTS.
 * Following client workflow: Winding, TFO/Twisting, Warping, Weaving, Drying & Finishing.
 */
const productionSteps = [
  {
    step: "01",
    name: "Winding",
    note: "Yarn preparation and cone winding stage (4 Images slot)",
    mediaType: "images",
    items: [
      { name: "Winding Unit View 1", src: "/factory/winding-1.jpg" },
      { name: "Winding Unit View 2", src: "/factory/winding-2.jpg" },
      { name: "Winding Unit View 3", src: "/factory/winding-3.jpg" },
      { name: "Winding Unit View 4", src: "/factory/winding-4.jpg" },
    ],
  },
  {
    step: "02",
    name: "TFO / Twisting",
    note: "In-house multiple-ply twisting department (2 Images, 2 Videos)",
    mediaType: "mixed",
    images: [
      { name: "Twisting Frame Front", src: "/factory/tfo-1.jpg" },
      { name: "Ply Yarn Cones", src: "/factory/tfo-2.jpg" },
    ],
    videos: [
      { title: "TFO Twisting Operation 1", caption: "Multiple-ply twisting floor in action.", src: "/videos/tfo-1.mp4" },
      { title: "TFO Twisting Operation 2", caption: "High-speed yarn twisting process.", src: "/videos/tfo-2.mp4" },
    ],
  },
  {
    step: "03",
    name: "Warping",
    note: "Beam preparation and yarn alignment (1 Image slot)",
    mediaType: "images",
    items: [
      { name: "Warping Machine & Beam", src: "/factory/warping-1.jpg" },
    ],
  },
  {
    step: "04",
    name: "Weaving",
    note: "Nova Pignone rapier looms on the main floor (2 Videos, 2 Images)",
    mediaType: "mixed",
    images: [
      { name: "Rapier Loom Shed", src: "/factory/weaving-1.jpg" },
      { name: "Cloth Inspection on Loom", src: "/factory/weaving-2.jpg" },
    ],
    videos: [
      { title: "Rapier Loom, Full Width", caption: "Heavy canvas being woven at production speed.", src: "/videos/weaving-1.mp4" },
      { title: "Weaving Floor Operation", caption: "Continuous weft insertion and loom mechanics.", src: "/videos/weaving-2.mp4" },
    ],
  },
  {
    step: "05",
    name: "Drying & Finishing of Fabric",
    note: "Fabric treatment, dyeing, waterproofing, and finishing line",
    mediaType: "video-showcase",
    videos: [
      { title: "Fabric Drying & Finishing Line", caption: "Continuous dyeing, coating, and thermal finishing process.", src: "/videos/finishing.mp4" },
    ],
  },
];

export default function InfrastructurePage() {
  return (
    <>
      <div className="shell band" style={{ paddingTop: "7.5rem" }}>
        <p className="mono fade mb-6">Inside the unit & Production Workflow</p>
        <h1 className="disp max-w-[13ch]" style={{ fontSize: "clamp(2.4rem,7vw,6rem)" }}>
          <span className="mask"><span>1. Winding,</span></span>
          <span className="mask"><span>2. TFO,</span></span>
          <span className="mask"><span>3. Warping,</span></span>
          <span className="mask"><span>4. Weaving,</span></span>
          <span className="mask"><span>5. Finishing.</span></span>
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

      {/* Production Steps Detailed Gallery & Media Sections */}
      <div className="shell band space-y-20">
        <div className="weft">
          <h2 className="h1"><span className="mask"><span>Step-by-step</span></span> <span className="mask"><span>floor operations</span></span></h2>
        </div>

        {productionSteps.map((stepItem) => (
          <div key={stepItem.name} className="fade pt-8 border-t border-[var(--rule)]">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <span className="mono text-[var(--color-indigo)] text-sm">STEP {stepItem.step}</span>
                <h3 className="h2 mt-1">{stepItem.name}</h3>
              </div>
              <p className="mute text-sm max-w-[30ch] text-right hidden sm:block">{stepItem.note}</p>
            </div>

            {/* Render Images */}
            {stepItem.mediaType === "images" && stepItem.items && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stepItem.items.map((img, i) => (
                  <figure key={i}>
                    <div className="relative aspect-4/3 overflow-hidden bg-ink-2" style={{ border: "1px solid var(--rule)" }}>
                      {img.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img.src} alt={img.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      ) : (
                        <>
                          <span className="tex" aria-hidden />
                          <span className="stamp">Photo to be added</span>
                        </>
                      )}
                    </div>
                    <figcaption className="pt-3.5">
                      <h4 className="font-display text-[.98rem] font-semibold tracking-[-.02em]">{img.name}</h4>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {/* Render Mixed Images & Videos */}
            {stepItem.mediaType === "mixed" && (
              <div className="space-y-12">
                <div className="grid gap-6 sm:grid-cols-2">
                  {stepItem.images?.map((img, i) => (
                    <figure key={i}>
                      <div className="relative aspect-16/10 overflow-hidden bg-ink-2" style={{ border: "1px solid var(--rule)" }}>
                        {img.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.src} alt={img.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                        ) : (
                          <>
                            <span className="tex" aria-hidden />
                            <span className="stamp">Photo to be added</span>
                          </>
                        )}
                      </div>
                      <figcaption className="pt-3.5">
                        <h4 className="font-display text-[.98rem] font-semibold tracking-[-.02em]">{img.name}</h4>
                      </figcaption>
                    </figure>
                  ))}
                </div>
                {stepItem.videos && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {stepItem.videos.map((vid, vIdx) => (
                      <InteractiveVideoCard key={vIdx} src={vid.src || ""} title={vid.title} caption={vid.caption} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Render Video Showcase / Finishing Line */}
            {stepItem.mediaType === "video-showcase" && stepItem.videos && (
              <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
                {stepItem.videos.map((vid, vIdx) => (
                  <InteractiveVideoCard key={vIdx} src={vid.src || ""} title={vid.title} caption={vid.caption} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Factory Visits CTA */}
      <div className="shell band-s pb-20">
        <div className="fade p-8" style={{ border: "1px solid var(--rule)" }}>
          <h2 className="h2">Factory visits</h2>
          <p className="body-text mt-3.5">
            Buyers are welcome at the unit. Unnao is roughly an hour from Lucknow airport. Tell us when you land and we
            will arrange the visit.
          </p>
          <Actions className="mt-6">
            <ButtonLink href={visitQuoteLink()} label="Arrange a visit" external cursor="Visit" />
          </Actions>
        </div>
      </div>
    </>
  );
}