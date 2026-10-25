import Image from "next/image";
import { Mail, Maximize2 } from "lucide-react";
import type { Competition } from "@/lib/competitions";

type Props = { competition: Competition; index: number };

/** One competition: its poster beside the transcribed details. Alternates sides on desktop. */
export function CompetitionCard({ competition: c, index }: Props) {
  const flip = index % 2 === 1;

  return (
    <article
      id={c.slug}
      aria-labelledby={`${c.slug}-title`}
      className={`grid scroll-mt-24 items-start gap-8 border-t-2 border-dashed border-jamun/20 py-14 first:border-t-0 sm:py-20 md:gap-14 ${
        flip
          ? "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          : "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      <a
        href={c.poster.src}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block rounded-2xl border-4 border-jamun bg-white p-2 shadow-[8px_8px_0_var(--color-marigold)] ${
          flip ? "md:order-2" : ""
        }`}
      >
        <Image
          src={c.poster.src}
          alt={`${c.title} competition poster`}
          width={c.poster.width}
          height={c.poster.height}
          sizes="(min-width: 1152px) 420px, (min-width: 768px) 40vw, 100vw"
          // Never upscale a small poster past its native size
          style={{ maxWidth: c.poster.width }}
          className="mx-auto h-auto w-full rounded-lg"
        />
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-jamun px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-3.5" aria-hidden="true" /> View full poster
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>

      <div>
        <p className="inline-block rounded-full bg-haldi px-3 py-0.5 text-sm font-bold tracking-[0.1em] text-jamun uppercase">
          {String(index + 1).padStart(2, "0")} · {c.kind}
        </p>
        <h2 id={`${c.slug}-title`} className="mt-3 text-4xl text-jamun sm:text-5xl">
          {c.title}
        </h2>
        {c.taglineNative && (
          <p lang={c.taglineNative.lang} className="mt-2 text-2xl text-rani">
            {c.taglineNative.text}
          </p>
        )}
        <p className="mt-3 font-display text-lg text-peacock italic">{c.tagline}</p>

        {c.intro?.map((p) => (
          <p key={p} className="mt-5">
            {p}
          </p>
        ))}

        {c.prompt && (
          <div className="mt-6 rounded-2xl bg-jamun px-5 py-4 text-white">
            <p className="text-xs font-bold tracking-[0.2em] text-marigold uppercase">
              {c.prompt.label}
            </p>
            {c.prompt.text.length === 1 ? (
              <p className="mt-2 font-display text-lg italic">{c.prompt.text[0]}</p>
            ) : (
              <p className="mt-2 font-display text-xl">
                {c.prompt.text.map((t, i) => (
                  <span key={t}>
                    {i > 0 && <span className="mx-3 text-base text-lilac italic">or</span>}
                    {t}
                  </span>
                ))}
              </p>
            )}
          </div>
        )}

        <dl className="mt-6 grid gap-x-8 gap-y-4 rounded-2xl bg-haldi px-5 py-5 sm:grid-cols-2">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-bold tracking-[0.2em] text-rani uppercase">{f.label}</dt>
              <dd className="mt-1">{f.value}</dd>
            </div>
          ))}
          {c.eligibility && (
            <div>
              <dt className="text-xs font-bold tracking-[0.2em] text-rani uppercase">
                Eligibility
              </dt>
              <dd className="mt-1">{c.eligibility}</dd>
            </div>
          )}
        </dl>

        {c.guidelines.length > 0 && (
          <div className="mt-6">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-rani uppercase">
              {c.guidelines.length > 1 ? "Submission guidelines" : "Please note"}
            </h3>
            <ul className="mt-3 space-y-2 text-ink-muted">
              {c.guidelines.map((g) => (
                <li key={g} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.6em] left-0 size-2 rounded-full bg-marigold"
                  />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          {c.email ? (
            <a
              href={`mailto:${c.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-rani px-6 py-3 font-bold text-white shadow-[4px_4px_0_var(--color-jamun)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--color-jamun)]"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              Submit your entry
              <span className="sr-only"> by email to {c.email}</span>
            </a>
          ) : (
            <p className="inline-block rounded-full border-2 border-jamun px-5 py-3 font-display text-jamun italic">
              Submission details to be announced
            </p>
          )}
          {/* Shown as text so long addresses wrap instead of truncating the button */}
          {c.email && (
            <p className="mt-4 text-sm break-all text-ink-muted" aria-hidden="true">
              {c.email}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
