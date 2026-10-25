type Props = { className?: string };

/** Fleuron divider — a typographic rule with a central diamond, drawn in muted gold. */
export function Ornament({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 240 16"
      className={`h-4 w-48 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M0 8h96M144 8h96" strokeWidth="1" />
      <path d="M102 8l6-5 6 5-6 5z" strokeWidth="1" />
      <path d="M126 8l6-5 6 5-6 5z" strokeWidth="1" />
      <path d="M120 2l6 6-6 6-6-6z" fill="currentColor" stroke="none" />
      <circle cx="90" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="150" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
