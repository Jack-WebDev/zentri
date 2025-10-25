/** biome-ignore-all lint/correctness/useUniqueElementIds: // biome-ignore lint: false positive */
"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
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

type TierProps = {
  name: string;
  price: string;
  blurb: string;
  cta: string;
  popular?: boolean;
  perks: string[];
};

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 text-muted-foreground">
          Start free. Upgrade anytime.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Tier
          name="Starter"
          price="$0"
          blurb="Capture ideas and tasks with essentials"
          cta="Get started"
          perks={[
            "Unlimited notes & tasks",
            "Brain Map (basic)",
            "Mobile quick capture",
            "Light/Dark themes",
          ]}
        />
        <Tier
          name="Pro"
          price="$8/mo"
          blurb="Deep focus and automation for power users"
          cta="Try Pro"
          popular
          perks={[
            "Focus Mode + playlists",
            "Temporal Workspaces",
            "Idea Incubation garden",
            "Automation rules",
            "Custom Lenses",
          ]}
        />
        <Tier
          name="Teams"
          price="$12/user"
          blurb="Collaborative stacks & shared graphs"
          cta="Contact sales"
          perks={[
            "Shared Stacks & Threads",
            "Advanced permissions",
            "SAML SSO",
            "Priority support",
          ]}
        />
      </div>
    </section>
  );
}

function Tier({ name, price, blurb, cta, popular, perks }: TierProps) {
  return (
    <Card
      className={cn(
        "relative border-muted/40 bg-card/80 pt-12 backdrop-blur supports-[backdrop-filter]:bg-card/60",
        popular && "shadow-xl ring-2 ring-primary",
      )}
    >
      {popular && (
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow">
          Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="flex items-end justify-between">
          <span>{name}</span>
          <span className="font-semibold text-3xl">{price}</span>
        </CardTitle>
        <CardDescription>{blurb}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {perks.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground text-sm">{p}</span>
            </li>
          ))}
        </ul>
        <Button className="group w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90">
          {cta}
          <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
