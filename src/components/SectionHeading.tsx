type Tone = "jamun" | "rani" | "peacock" | "marigold";

type Props = {
  id: string;
  title: string;
  /** Optional Devanagari counterpart shown beside the title. */
  native?: { text: string; lang: "mr" | "hi" };
  /** Colour of the pill behind the title. */
  tone?: Tone;
  /** Set on dark section backgrounds so the standfirst stays readable. */
  onDark?: boolean;
  children?: React.ReactNode;
};

const PILL: Record<Tone, string> = {
  jamun: "bg-jamun text-white",
  rani: "bg-rani text-white",
  peacock: "bg-peacock text-white",
  marigold: "bg-marigold text-jamun",
};

/**
 * Section heading set in a pill that runs in from the left edge of the page,
 * with an optional standfirst below.
 */
export function SectionHeading({ id, title, native, tone = "jamun", onDark, children }: Props) {
  return (
    <header className="mb-10 sm:mb-14">
      <h2 id={id} className={`pill-heading text-3xl sm:text-5xl ${PILL[tone]}`}>
        {title}
        {native && (
          <span lang={native.lang} className="ml-3 align-middle text-2xl opacity-90 sm:text-4xl">
            {native.text}
          </span>
        )}
      </h2>
      {children && (
        <div className={`mt-5 max-w-2xl text-lg ${onDark ? "text-lilac" : "text-ink-muted"}`}>
          {children}
        </div>
      )}
    </header>
  );
}
