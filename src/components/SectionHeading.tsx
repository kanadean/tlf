import { Ornament } from "./Ornament";

type Props = {
  id: string;
  title: string;
  /** Optional Devanagari counterpart shown beside the title. */
  native?: { text: string; lang: "mr" | "hi" };
  children?: React.ReactNode;
};

/** Section heading: title, fleuron and an optional standfirst. */
export function SectionHeading({ id, title, native, children }: Props) {
  return (
    <header className="mb-10 flex flex-col items-center text-center sm:mb-14">
      <h2 id={id} className="text-4xl sm:text-5xl">
        {title}
        {native && (
          <span lang={native.lang} className="ml-3 align-middle text-3xl text-sindoor sm:text-4xl">
            {native.text}
          </span>
        )}
      </h2>
      <Ornament className="mt-5" />
      {children && <div className="mt-5 max-w-2xl text-ink-muted">{children}</div>}
    </header>
  );
}
