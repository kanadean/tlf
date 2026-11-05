import type { ResolvedSession } from "@/lib/markdown";

type Props = { item: Pick<ResolvedSession, "timeStart" | "timeEnd"> };

/** Start and end times that wrap between, never inside, e.g. "10:50 AM / – 11:35 AM". */
export function TimeRange({ item }: Props) {
  if (!item.timeStart) return <>Time TBA</>;
  return (
    <>
      <span className="whitespace-nowrap">{item.timeStart}</span>
      {item.timeEnd && (
        <>
          {" "}
          <span className="whitespace-nowrap">– {item.timeEnd}</span>
        </>
      )}
    </>
  );
}
