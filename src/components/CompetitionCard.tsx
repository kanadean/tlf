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
      className={`grid scroll-mt-24 items-start gap-8 border-t border-rule py-14 sm:py-20 md:gap-14 ${
        flip
          ? "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          : "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      <a
        href={c.poster.src}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block border border-rule bg-paper p-2 shadow-[6px_6px_0_var(--color-rule)] ${
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
          className="mx-auto h-auto w-full"
        />
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 bg-ink/80 px-2.5 py-1 text-xs text-paper opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-3.5" aria-hidden="true" /> View full poster
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>

      <div>
        <p className="text-xs tracking-[0.3em] text-gold-deep uppercase">
          {String(index + 1).padStart(2, "0")} · {c.kind}
        </p>
        <h2 id={`${c.slug}-title`} className="mt-3 text-4xl sm:text-5xl">
          {c.title}
        </h2>
        {c.taglineNative && (
          <p lang={c.taglineNative.lang} className="mt-2 text-2xl text-sindoor">
            {c.taglineNative.text}
          </p>
        )}
        <p className="mt-3 text-lg text-ink-muted italic">{c.tagline}</p>

        {c.intro?.map((p) => (
          <p key={p} className="mt-5">
            {p}
          </p>
        ))}

        {c.prompt && (
          <div className="mt-6 border-l-2 border-sindoor bg-parchment px-5 py-4">
            <p className="text-xs tracking-[0.2em] text-sindoor uppercase">{c.prompt.label}</p>
            {c.prompt.text.length === 1 ? (
              <p className="mt-2 font-display text-lg italic">{c.prompt.text[0]}</p>
            ) : (
              <p className="mt-2 font-display text-xl">
                {c.prompt.text.map((t, i) => (
                  <span key={t}>
                    {i > 0 && <span className="mx-3 text-base text-ink-muted italic">or</span>}
                    {t}
                  </span>
                ))}
              </p>
            )}
          </div>
        )}

        <dl className="mt-6 grid gap-x-8 gap-y-4 border-y border-rule py-5 sm:grid-cols-2">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs tracking-[0.2em] text-gold-deep uppercase">{f.label}</dt>
              <dd className="mt-1">{f.value}</dd>
            </div>
          ))}
          {c.eligibility && (
            <div>
              <dt className="text-xs tracking-[0.2em] text-gold-deep uppercase">Eligibility</dt>
              <dd className="mt-1">{c.eligibility}</dd>
            </div>
          )}
        </dl>

        {c.guidelines.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs tracking-[0.2em] text-gold-deep uppercase">
              {c.guidelines.length > 1 ? "Submission guidelines" : "Please note"}
            </h3>
            <ul className="mt-3 space-y-2 text-ink-muted">
              {c.guidelines.map((g) => (
                <li key={g} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.7em] left-0 size-1.5 rotate-45 bg-gold"
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
              className="inline-flex items-center gap-2 bg-sindoor px-5 py-3 text-paper shadow-[4px_4px_0_var(--color-gold)] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-gold)]"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              Submit your entry
              <span className="sr-only"> by email to {c.email}</span>
            </a>
          ) : (
            <p className="inline-block border border-rule px-5 py-3 font-display italic">
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
