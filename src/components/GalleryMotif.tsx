import type { Motif } from "@/lib/galleries";

type Props = { motif: Motif; className?: string };

/**
 * Flat, hand-drawn line illustration for each gallery flyer. Strokes use the
 * flyer's tone (currentColor); `fill-gold` adds the festival's gold accent.
 */
export function GalleryMotif({ motif, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {motif === "proverbs" && (
        <>
          {/* Unrolled scroll with lines of text */}
          <path d="M40 30h120a10 10 0 0 1 0 20H40z" />
          <path d="M40 30a10 10 0 0 0 0 20M50 50v70h110V50" />
          <path d="M50 120a10 10 0 0 1-10 10 10 10 0 0 1 0-20h10" />
          <path d="M64 66h70M64 80h82M64 94h58M64 108h74" strokeWidth="2" />
          {/* Large quotation marks */}
          <path
            d="M176 64c-8 2-12 8-12 16h10v12h-14V80c0-12 6-20 16-22zM196 64c-8 2-12 8-12 16h10v12h-14V80c0-12 6-20 16-22z"
            className="fill-gold"
            stroke="none"
          />
          {/* Small QR code */}
          <rect x="168" y="102" width="30" height="30" rx="2" />
          <path
            d="M173 107h7v7h-7zM186 107h7v7h-7zM173 120h7v7h-7zM187 121h3v3h-3zM191 125h2v2h-2zM186 127h2"
            className="fill-current"
            stroke="none"
          />
        </>
      )}
      {motif === "films" && (
        <>
          {/* Open book */}
          <path d="M110 128c-18-10-42-12-66-8V64c24-4 48-2 66 8 18-10 42-12 66-8v56c-24-4-48-2-66 8z" />
          <path d="M110 72v56" />
          <path
            d="M58 80c14-2 28 0 40 4M58 94c14-2 28 0 40 4M122 84c12-4 26-6 40-4M122 98c12-4 26-6 40-4"
            strokeWidth="2"
          />
          {/* Film strip rising from the pages */}
          <g transform="rotate(-14 130 40)">
            <rect x="86" y="14" width="96" height="34" rx="3" className="fill-gold/30" />
            <path d="M86 22h96M86 40h96" strokeWidth="2" />
            <path d="M94 17v2M106 17v2M118 17v2M130 17v2M142 17v2M154 17v2M166 17v2M94 43v2M106 43v2M118 43v2M130 43v2M142 43v2M154 43v2M166 43v2" />
            <path d="M118 24v14M150 24v14" strokeWidth="2" />
          </g>
          {/* Play mark */}
          <path d="M100 44l12 6-12 6z" className="fill-current" stroke="none" />
        </>
      )}
      {motif === "frames" && (
        <>
          {/* Viewfinder corners */}
          <path d="M34 34v-14h18M186 34v-14h-18M34 116v14h18M186 116v14h-18" strokeWidth="3" />
          {/* Ten frames: 5 × 2 */}
          {[0, 1].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={50 + c * 25}
                y={44 + r * 32}
                width="20"
                height="26"
                rx="1.5"
                strokeWidth="2"
                className={(r + c) % 3 === 0 ? "fill-gold/40" : undefined}
              />
            )),
          )}
          {/* Lake ripple under the frames — Thane, City of Lakes */}
          <path d="M44 120c10-5 20 5 30 0s20 5 30 0 20 5 30 0 20 5 30 0" strokeWidth="2" />
        </>
      )}
      {motif === "manuscripts" && (
        <>
          {/* Bundle of palm-leaf manuscripts tied with string */}
          <rect x="30" y="52" width="130" height="16" rx="8" className="fill-gold/30" />
          <rect x="36" y="70" width="130" height="16" rx="8" />
          <rect x="30" y="88" width="130" height="16" rx="8" className="fill-gold/30" />
          <path d="M58 52v52M132 52v52" strokeWidth="2" />
          <path d="M58 104c-4 10-14 14-20 12M132 104c4 10 14 14 20 12" strokeWidth="2" />
          <path d="M70 60h44M76 78h48M70 96h40" strokeWidth="1.5" />
          {/* Old bound book beside it */}
          <path d="M170 40h26a4 4 0 0 1 4 4v72a4 4 0 0 1-4 4h-26z" />
          <path d="M176 40v80M184 54h10M184 62h10" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
