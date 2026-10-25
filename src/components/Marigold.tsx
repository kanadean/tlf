type Props = { className?: string; tone?: "marigold" | "rani" | "lilac" | "peacock" };

const TONES = {
  marigold: ["#f7b52c", "#e98a14"],
  rani: ["#ef4f93", "#c8155f"],
  lilac: ["#d9c8f0", "#a98bd6"],
  peacock: ["#3fb5a6", "#0a6b6b"],
} as const;

const OUTER = Array.from({ length: 12 }, (_, i) => i * 30);
const INNER = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);

/** Decorative marigold (zendu) flower. Size it with `className`. */
export function Marigold({ className = "", tone = "marigold" }: Props) {
  const [light, dark] = TONES[tone];
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      {OUTER.map((deg) => (
        <ellipse key={deg} rx="11" ry="22" cy="-24" fill={light} transform={`rotate(${deg})`} />
      ))}
      {INNER.map((deg) => (
        <ellipse key={deg} rx="8" ry="15" cy="-14" fill={dark} transform={`rotate(${deg})`} />
      ))}
      <circle r="9" fill={light} />
      <circle r="4" fill={dark} />
    </svg>
  );
}
