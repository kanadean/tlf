/*
 * A scalloped (cusped) arch, like the doorways of old Thane wadas and temples,
 * outlined in marigold and rani bands. The cap is an SVG; the body below is a
 * plain box whose borders continue the same bands, so the arch can grow with
 * its content.
 */

// Cap geometry in viewBox units: shoulders at y = H, apex at y = 0
const W = 1000;
const H = 380;
const SCALLOPS = 7;

function capPath() {
  const points: [number, number][] = [];
  for (let i = 0; i <= SCALLOPS; i++) {
    const phi = (i / SCALLOPS) * (Math.PI / 2);
    // Quarter-ellipse from the left shoulder up to just below the apex
    points.push([(W / 2) * (1 - Math.cos(phi)) * 0.97, H - (H - 40) * Math.sin(phi)]);
  }
  const arcs = (pts: [number, number][]) =>
    pts
      .slice(1)
      .map(([x, y], i) => {
        const [px, py] = pts[i];
        const r = Math.hypot(x - px, y - py) / 2;
        return `A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  const right = points.map(([x, y]) => [W - x, y] as [number, number]).reverse();
  const [lx, ly] = points[0];
  return [
    `M ${lx} ${H + 60} L ${lx} ${ly}`,
    arcs(points),
    `L ${W / 2} 0 L ${right[0][0].toFixed(1)} ${right[0][1].toFixed(1)}`,
    arcs(right),
    `L ${W} ${H + 60} Z`,
  ].join(" ");
}

const PATH = capPath();

type Props = { children: React.ReactNode; cap?: React.ReactNode; className?: string };

export function ArchFrame({ children, cap, className = "" }: Props) {
  return (
    <div className={`relative pt-[22px] ${className}`}>
      {/* Strokes don't scale, so the bands stay 10px + 12px wide at any size */}
      <div className="relative mx-[22px]" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          <path
            d={PATH}
            fill="none"
            stroke="var(--color-marigold)"
            strokeWidth="44"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={PATH}
            fill="var(--color-cream)"
            stroke="var(--color-rani)"
            strokeWidth="24"
            vectorEffect="non-scaling-stroke"
          />
          <path d={PATH} fill="var(--color-cream)" />
        </svg>
        {cap && <div className="absolute inset-x-0 bottom-0 flex justify-center">{cap}</div>}
      </div>
      <div className="relative -mt-px border-x-[10px] border-marigold">
        <div className="border-x-[12px] border-rani bg-cream">{children}</div>
      </div>
    </div>
  );
}
