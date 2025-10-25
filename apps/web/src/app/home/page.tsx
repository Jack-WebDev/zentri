"use client";

import { TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CTA from "./_components/cta";
import Feature from "./_components/feature";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section
        id="focus"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border bg-card/70 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-lg">Jump into Focus</h3>
              <p className="text-muted-foreground text-sm">
                Start a 25‑minute session and keep your notes & tasks
                side‑by‑side.
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Input placeholder="What will you focus on?" className="flex-1" />
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90">
                <TimerReset className="mr-2 h-4 w-4" /> Start
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="principles"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Pill>Fluidity</Pill>
          <Pill>Connectedness</Pill>
          <Pill>Clarity</Pill>
          <Pill>Insight</Pill>
          <Pill>Joy</Pill>
        </div>
      </section>
      <Feature />
      <CTA />
      <Pricing />
    </>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-muted-foreground text-xs">
      {children}
    </span>
  );
}
