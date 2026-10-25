import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

/** Registration call to action. Shows "opens soon" until SITE.registrationUrl is set. */
export function RegistrationSection() {
  return (
    <section
      aria-labelledby="registration-title"
      id="registration"
      className="scroll-mt-20 bg-sindoor px-4 py-20 text-paper sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="registration-title" className="text-4xl sm:text-6xl">
          Entry is <em>free</em> for all
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-paper/90">
          Seats are limited, so prior registration is required for every visitor. Register once to
          attend any session across all three days.
        </p>

        <div className="mt-10">
          {SITE.registrationUrl ? (
            <a
              href={SITE.registrationUrl}
              className="inline-flex items-center gap-2 bg-paper px-8 py-4 text-lg text-sindoor shadow-[4px_4px_0_var(--color-gold)] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-gold)]"
            >
              Register for Free <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          ) : (
            <p className="inline-block border border-paper/60 px-8 py-4 font-display text-xl italic">
              Registration opens soon
            </p>
          )}
        </div>

        <p className="mt-10 text-sm text-paper/85">
          Questions? Write to us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-1 underline underline-offset-4"
          >
            <Mail className="size-4" aria-hidden="true" />
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
