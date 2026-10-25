import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import { Marigold } from "./Marigold";

/** Registration call to action. Shows "opens soon" until SITE.registrationUrl is set. */
export function RegistrationSection() {
  return (
    <section
      aria-labelledby="registration-title"
      id="registration"
      className="relative scroll-mt-20 overflow-hidden bg-rani px-4 py-20 text-white sm:px-8 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Marigold className="absolute -top-8 -left-8 size-36 opacity-90 sm:size-48" />
        <Marigold className="absolute -right-10 -bottom-10 size-40 sm:size-56" tone="lilac" />
        <Marigold className="absolute top-12 right-[12%] hidden size-14 sm:block" tone="peacock" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 id="registration-title" className="text-4xl sm:text-6xl">
          Entry is <em className="text-marigold">free</em> for all
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg">
          Seats are limited, so prior registration is required for every visitor. Register once to
          attend any session across all three days.
        </p>

        <div className="mt-10">
          {SITE.registrationUrl ? (
            <a
              href={SITE.registrationUrl}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-rani shadow-[5px_5px_0_var(--color-jamun)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-jamun)]"
            >
              Register for Free <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          ) : (
            <p className="inline-block rounded-full bg-jamun px-8 py-4 font-display text-xl font-semibold shadow-[5px_5px_0_var(--color-marigold)]">
              Registration opens soon
            </p>
          )}
        </div>

        <p className="mt-10">
          Questions? Write to us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-1 font-bold underline underline-offset-4"
          >
            <Mail className="size-4" aria-hidden="true" />
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
