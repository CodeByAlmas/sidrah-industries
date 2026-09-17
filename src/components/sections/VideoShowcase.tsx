"use client";

import { useState } from "react";

/**
 * FACTORY VIDEO SLOT.
 * The client is filming the looms and the finishing line. Until those files
 * exist this renders a poster frame with a working play control, so dropping
 * the real footage in is a one-line change:
 *
 *   /public/videos/<name>.mp4     — the clip
 *   /public/factory/<name>.jpg    — the poster frame
 *
 * Then pass src and poster below. Nothing about the layout changes.
 */
export type Clip = { title: string; caption: string; src?: string; poster?: string };

export function VideoShowcase({ clips }: { clips: Clip[] }) {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {clips.map((clip, i) => (
        <figure key={clip.title} className="group">
          <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-ink-2">
            {clip.src && playing === i ? (
              <video src={clip.src} poster={clip.poster} controls autoPlay playsInline className="h-full w-full object-cover" />
            ) : (
              <>
                {clip.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={clip.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="tex" aria-hidden />
                )}

                <button
                  type="button"
                  onClick={() => clip.src && setPlaying(i)}
                  disabled={!clip.src}
                  aria-label={clip.src ? `Play ${clip.title}` : `${clip.title} — footage coming soon`}
                  className="relative grid h-18 w-18 place-items-center overflow-hidden text-cloth-3 disabled:cursor-default"
                  style={{ width: "4.5rem", height: "4.5rem", border: "1px solid rgba(240,235,222,.4)" }}
                >
                  {/* the fill blooms outward on hover, then the glyph inverts */}
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-cloth-3 transition-transform duration-500 group-hover:scale-[1.6]"
                    style={{ transform: "scale(0)", transitionTimingFunction: "var(--ease)" }}
                  />
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="relative transition-colors duration-500 group-hover:text-ink">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                {!clip.src && <span className="stamp">Footage being filmed</span>}
              </>
            )}
          </div>
          <figcaption className="pt-4">
            <h3 className="h3">{clip.title}</h3>
            <p className="mute mt-1.5 text-[.92rem]">{clip.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
