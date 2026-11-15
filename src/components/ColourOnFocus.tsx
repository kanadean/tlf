"use client";

import { useEffect } from "react";

/**
 * Touch screens have no hover, so photos that colour up on hover on desktop would stay
 * sepia on phones. On devices without hover, this marks each `[data-colour-on-focus]`
 * element with `data-in-focus` while it sits in the middle band of the screen, so its
 * photo colours up as you scroll past (see SpeakerPortrait). Renders nothing.
 */
export function ColourOnFocus() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-in-focus", e.isIntersecting);
      },
      // Only the middle ~30% of the viewport counts as "in focus"
      { rootMargin: "-35% 0px -35% 0px" },
    );
    const watch = () =>
      document.querySelectorAll("[data-colour-on-focus]").forEach((el) => io.observe(el));
    watch();
    // Lineup filters re-render the cards; pick up new ones
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
