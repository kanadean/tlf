import Image from "next/image";
import { GALLERY_INFO, type Gallery, type Tone } from "@/lib/galleries";
import { SITE } from "@/lib/site";
import { GalleryMotif } from "./GalleryMotif";

// Ground, accent text and footer band for each tone — every text pair passes WCAG AA
const TONE: Record<Tone, { ground: string; accent: string; band: string }> = {
  sindoor: { ground: "bg-blush", accent: "text-sindoor", band: "bg-sindoor" },
  peacock: { ground: "bg-teal-soft", accent: "text-peacock", band: "bg-peacock" },
  green: { ground: "bg-haldi", accent: "text-tlf-green", band: "bg-tlf-green" },
  gold: { ground: "bg-parchment", accent: "text-gold-deep", band: "bg-gold-deep" },
};

type Props = { gallery: Gallery; headingLevel?: "h2" | "h3"; titleId?: string };

/**
 * A poster-style flyer (4:5) for one gallery: TLF logo, title, motif, tagline and the
 * festival dates/venue. Self-contained so it can also be exported as an image.
 */
export function GalleryFlyer({ gallery: g, headingLevel: H = "h2", titleId }: Props) {
  const t = TONE[g.tone];
  return (
    <div
      data-flyer={g.slug}
      className={`relative flex w-full flex-col border border-ink/70 p-1.5 sm:aspect-[4/5] ${t.ground}`}
    >
      {/* Double rule, like the hero's title page */}
      <div className="flex flex-1 flex-col border border-ink/25">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
          <Image
            src="/images/logos/tlf-logo.png"
            alt=""
            width={96}
            height={96}
            className="size-12 sm:size-14"
          />
          <p className="text-right text-[0.65rem] leading-tight tracking-[0.25em] text-ink-muted uppercase sm:text-xs">
            {SITE.name}
            <br />
            <span className={t.accent}>Galleries · {SITE.year}</span>
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-5 py-6 text-center sm:px-8 sm:py-0">
          <p className={`text-[0.7rem] tracking-[0.25em] uppercase sm:text-xs ${t.accent}`}>
            {g.kicker}
          </p>
          <H id={titleId} className="mt-2 text-[clamp(1.75rem,4.2vw,2.6rem)] leading-tight">
            {g.title}
            {g.native && (
              <span lang={g.native.lang} className={`ml-2 ${t.accent}`}>
                {g.native.text}
              </span>
            )}
          </H>
          <GalleryMotif motif={g.motif} className={`my-3 w-4/5 max-w-72 sm:my-5 ${t.accent}`} />
          <p className="font-display text-base text-ink-muted italic sm:text-lg">{g.tagline}</p>
        </div>

        <div className={`px-5 py-3 text-center text-paper sm:px-7 sm:py-4 ${t.band}`}>
          <p className="font-display text-base sm:text-lg">{SITE.datesLabel}</p>
          <p className="mt-0.5 text-[0.7rem] tracking-[0.15em] uppercase opacity-90 sm:text-xs">
            {GALLERY_INFO.where.split(" · ")[0]} · {GALLERY_INFO.venue.split(",")[0]} · Free entry
          </p>
        </div>
      </div>
    </div>
  );
}
