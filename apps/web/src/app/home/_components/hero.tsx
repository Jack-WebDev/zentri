/** biome-ignore-all lint/correctness/useUniqueElementIds: // biome-ignore lint: false positive */
"use client";

import { InfinityIcon, Link2, Search, Tag, TimerReset } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BrainMap from "./brainMap";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GradientBlob className="top-[-10%] left-[-10%] h-[38rem] w-[38rem]" />
      <GradientBlob className="top-[20%] right-[-10%] h-[26rem] w-[26rem]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
          <div>
            <h1 className="font-semibold text-4xl tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                Notes & tasks
              </span>{" "}
              in one <span className="text-primary">fluid</span> flow
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
              Zentri merges note‑taking and task management into an adaptive
              system. Think freely, link ideas, and move from jots to action
              without breaking focus.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
              <Button className="group w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 sm:w-auto">
                Start free
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <InfinityIcon className="h-4 w-4 text-cyan-600" /> No artificial
                silos
              </div>
              <div className="flex items-center gap-1">
                <TimerReset className="h-4 w-4 text-teal-600" /> Focus timer
                built‑in
              </div>
              <div className="flex items-center gap-1">
                <Link2 className="h-4 w-4 text-amber-600" /> Smart linking
              </div>
            </div>
          </div>

          <div>
            <div className="relative rounded-2xl border bg-card shadow-xl">
              <div className="flex items-center gap-1 border-b px-3 py-2 text-muted-foreground text-xs">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2">Zentri · Daily Workspace</span>
              </div>
              <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2">
                <Card className="border-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Today</CardTitle>
                    <CardDescription>Fri, Oct 24</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Sketch landing header",
                      "Draft ‘Brain Map’ copy",
                      "Sync focus playlist",
                    ].map((t, i) => (
                      <div key={t} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-muted-foreground/30 accent-cyan-600"
                          defaultChecked={i === 0}
                        />
                        <span
                          className={cn(
                            "text-sm",
                            i === 0 && "text-muted-foreground line-through",
                          )}
                        >
                          {t}
                        </span>
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-cyan-100 text-cyan-900 dark:bg-cyan-400/20 dark:text-cyan-200"
                        >
                          #Launch
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="border-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Notes</CardTitle>
                    <CardDescription>Linked to tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="rounded-xl border p-3">
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground text-xs">
                        <Tag className="h-3.5 w-3.5" />
                        design, research
                      </div>
                      <p className="leading-relaxed">
                        Idea: make tasks live inside notes. Use{" "}
                        <code className="rounded bg-muted px-1">/todo</code> to
                        create subtasks inline. Convert both ways.
                      </p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground text-xs">
                        <Search className="h-3.5 w-3.5" />
                        global search
                      </div>
                      <p className="leading-relaxed">
                        Instant, unified search across titles, bodies, tags, and
                        subtasks. Command bar for quick actions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card id="graph" className="col-span-full border-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Brain Map</CardTitle>
                    <CardDescription>
                      See how your thinking connects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BrainMap />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GradientBlob({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "-z-10 pointer-events-none absolute opacity-40 blur-3xl",
        "bg-[radial-gradient(ellipse_at_center,theme(colors.cyan.300),transparent_60%)]",
        "dark:bg-[radial-gradient(ellipse_at_center,theme(colors.teal.400),transparent_60%)]",
        className,
      )}
    />
  );
}
