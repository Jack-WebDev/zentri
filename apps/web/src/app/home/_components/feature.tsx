/** biome-ignore-all lint/correctness/useUniqueElementIds: // biome-ignore lint: false positive */

import {
  BrainCircuit,
  CalendarClock,
  Cloud,
  LayoutGrid,
  MessageSquare,
  Music,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
};

export default function Feature() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
          Think, link, and act—seamlessly
        </h2>
        <p className="mt-3 text-muted-foreground">
          Dual‑linked notes & tasks, a living graph, and temporal workspaces
          that keep momentum calm and focused.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<LayoutGrid className="h-5 w-5" />}
          title="Dual‑linked Notes & Tasks"
          desc="Add tasks inside notes, notes inside tasks. Convert either way and keep everything in sync."
          tag="Core"
        />
        <FeatureCard
          icon={<BrainCircuit className="h-5 w-5" />}
          title="Knowledge Graph"
          desc="Visual map of notes, tasks, and tags. Expand relationships and preview content in place."
          tag="Brain Map"
        />
        <FeatureCard
          icon={<CalendarClock className="h-5 w-5" />}
          title="Temporal Workspaces"
          desc="Auto daily & weekly pages with due tasks, recent notes, focus stats, and reflections."
        />
        <FeatureCard
          icon={<Music className="h-5 w-5" />}
          title="Focus Mode"
          desc="Distraction‑free writing with timer, ambient music, and after‑session summaries."
          tag="Flow"
        />
        <FeatureCard
          icon={<MessageSquare className="h-5 w-5" />}
          title="Conversations & Reflections"
          desc="Comment anywhere. Keep an inner monologue and auto‑stack threads by topic."
        />
        <FeatureCard
          icon={<Cloud className="h-5 w-5" />}
          title="Integrations"
          desc="Calendar, email, web clipper, files, and music. Everything connected."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, tag }: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden border-muted/40 bg-card/80 backdrop-blur transition-all hover:shadow-lg supports-[backdrop-filter]:bg-card/60">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-amber-400/0 to-teal-500/0 group-hover:from-cyan-500/5 group-hover:via-amber-400/5 group-hover:to-teal-500/5" />
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2.5 text-primary ring-1 ring-primary/20 group-hover:bg-primary/15">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {tag ? (
          <div className="mt-3">
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200"
            >
              {tag}
            </Badge>
          </div>
        ) : null}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
