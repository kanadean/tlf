import type { ResolvedSession } from "@/lib/markdown";
import { KIND_LABEL } from "@/lib/programme";
import { TimeRange } from "./TimeRange";

type Props = { item: ResolvedSession };

/**
 * A programme item that isn't a talk — a reading, performance, break or ceremony.
 * Set quieter than a session card and not clickable; any summary shows inline.
 */
export function InterludeRow({ item }: Props) {
  return (
    <div className="grid gap-x-8 gap-y-1 border-b border-rule bg-parchment/60 py-3 sm:grid-cols-[8rem_1fr] sm:px-3">
      <p className="font-display text-base text-ink-muted">
        <TimeRange item={item} />
      </p>
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-lg italic">{item.title}</span>
          <span className="text-xs tracking-[0.25em] text-gold-deep uppercase">
            {KIND_LABEL[item.kind]}
          </span>
        </p>
        {item.summaryHtml && (
          <div
            className="prose-tlf text-sm text-ink-muted"
            dangerouslySetInnerHTML={{ __html: item.summaryHtml }}
          />
        )}
      </div>
    </div>
  );
}
