"use client";

import { useRef, useState } from "react";
import type { ResolvedSession } from "@/lib/markdown";
import { SITE } from "@/lib/site";
import { SessionCard } from "./SessionCard";
import { SessionModal } from "./SessionModal";

type TabKey = 1 | 2 | 3 | "tba";
type Props = { sessions: ResolvedSession[] };

const ALL_VENUES = "all";

export function ScheduleTabs({ sessions }: Props) {
  const unscheduled = sessions.filter((s) => !s.day);
  const tabs: { key: TabKey; label: string; sub: string; sessions: ResolvedSession[] }[] = [
    ...SITE.days.map((d) => ({
      key: d.day as TabKey,
      label: d.label,
      sub: d.date,
      sessions: sessions.filter((s) => s.day === d.day),
    })),
    ...(unscheduled.length
      ? [
          {
            key: "tba" as const,
            label: "To be scheduled",
            sub: `${unscheduled.length} sessions`,
            sessions: unscheduled,
          },
        ]
      : []),
  ];

  const [activeKey, setActiveKey] = useState<TabKey>(
    () => tabs.find((t) => t.sessions.length > 0)?.key ?? 1,
  );
  const [venue, setVenue] = useState<string>(ALL_VENUES);
  const [openSession, setOpenSession] = useState<ResolvedSession | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];
  const venues = [...new Set(active.sessions.flatMap((s) => (s.venue ? [s.venue] : [])))];
  const visible =
    venue === ALL_VENUES ? active.sessions : active.sessions.filter((s) => s.venue === venue);

  function selectTab(index: number) {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setActiveKey(tab.key);
    setVenue(ALL_VENUES);
    tabRefs.current[tabs.indexOf(tab)]?.focus();
  }

  // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump to the ends
  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (e.key in moves) {
      e.preventDefault();
      selectTab(moves[e.key]);
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Festival days"
        className="grid grid-cols-2 border border-rule sm:flex"
      >
        {tabs.map((tab, i) => {
          const selected = tab.key === active.key;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={selected}
              aria-controls="schedule-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`flex-1 border-rule px-4 py-3 text-left transition-colors not-last:border-r max-sm:border-b sm:text-center ${
                selected ? "bg-sindoor text-paper" : "bg-paper hover:bg-parchment"
              }`}
            >
              <span className="block font-display text-xl">{tab.label}</span>
              <span className={`block text-sm ${selected ? "text-paper/85" : "text-ink-muted"}`}>
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="schedule-panel" aria-labelledby={`tab-${active.key}`} tabIndex={0}>
        {venues.length > 1 && (
          <div
            role="group"
            aria-label="Filter by venue"
            className="mt-6 flex flex-wrap gap-2 text-sm"
          >
            {[ALL_VENUES, ...venues].map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={venue === v}
                onClick={() => setVenue(v)}
                className={`border px-3 py-1 transition-colors ${
                  venue === v ? "border-ink bg-ink text-paper" : "border-rule hover:border-ink"
                }`}
              >
                {v === ALL_VENUES ? "All stages" : v}
              </button>
            ))}
          </div>
        )}

        {active.key === "tba" && (
          <p className="mt-6 border-l-2 border-gold bg-parchment px-4 py-3 text-sm text-ink-muted">
            The programme is being finalised. Days, timings and stages for these sessions will be
            announced soon.
          </p>
        )}

        {visible.length > 0 ? (
          <div className="mt-2">
            {visible.map((session) => (
              <SessionCard
                key={session.slug}
                session={session}
                onOpen={() => setOpenSession(session)}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-ink-muted italic">
            The programme for {active.label.toLowerCase()} will be announced soon.
          </p>
        )}
      </div>

      <SessionModal session={openSession} onClose={() => setOpenSession(null)} />
    </div>
  );
}
