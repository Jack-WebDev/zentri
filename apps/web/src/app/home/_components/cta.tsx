"use client";

import { Quote } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-cyan-500/10 via-amber-400/10 to-teal-500/10 p-6 sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-2xl tracking-tight">
              Make productivity feel calm, intuitive, and inspiring
            </h3>
            <p className="mt-2 text-muted-foreground">
              Start capturing seeds, grow ideas, and watch your thinking garden
              bloom.
            </p>
          </div>
          <div className="rounded-2xl border bg-background/80 p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Quote className="h-4 w-4" />
              Loved by people who think with their hands
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                "Notes can become tasks and back again without friction.",
                "The Brain Map makes relationships obvious at a glance.",
                "Focus Mode + music keeps me in deep work.",
                "Daily pages + Digest give me a sense of progress.",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-xl border bg-gradient-to-br from-cyan-50/40 to-amber-50/40 p-3 text-sm leading-relaxed dark:from-cyan-500/5 dark:to-amber-400/5"
                >
                  “{t}”
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
