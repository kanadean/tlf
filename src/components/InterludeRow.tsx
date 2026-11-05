import type { ResolvedSession } from "@/lib/markdown";
import { KIND_LABEL } from "@/lib/programme";
import { TimeRange } from "./TimeRange";

type Props = { item: ResolvedSession };

/**
 * A programme item that isn't a talk — a reading, performance, break or ceremony.
 * Set as a slim band between the session cards; not clickable, summary inline.
 */
export function InterludeRow({ item }: Props) {
  return (
    <div className="grid gap-x-6 gap-y-1 rounded-2xl border-2 border-dashed border-jamun/40 bg-haldi px-4 py-3 sm:grid-cols-[8rem_1fr] sm:px-5">
      <p className="font-display font-bold text-jamun">
        <TimeRange item={item} />
      </p>
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-lg font-bold text-jamun italic">{item.title}</span>
          <span className="rounded-full bg-jamun px-2.5 py-0.5 text-xs font-bold tracking-[0.1em] text-white uppercase">
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
