import {
  Database,
  FileText,
  Globe,
  Info,
  Lock,
  type LucideIcon,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Banner
        title="Privacy Policy"
        subtitle="We respect your privacy. Here’s exactly what we collect, why we collect it, and how you stay in control."
      />

      <main className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-24 rounded-xl border border-muted/40 bg-card/70 p-4 backdrop-blur supports-[backdrop-filter]:bg-card/50"
            >
              <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["overview", "Overview"],
                  ["info-we-collect", "Information we collect"],
                  ["how-we-use", "How we use information"],
                  ["sharing", "Sharing"],
                  ["your-controls", "Your controls"],
                  ["data-retention", "Data retention"],
                  ["security", "Security"],
                  ["international", "International transfers"],
                  ["children", "Children"],
                  ["changes", "Changes to this policy"],
                  ["contact", "Contact"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 transition-colors group-hover:bg-foreground" />
                      <span className="text-foreground/80 group-hover:text-foreground">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <section>
            <Card className="border-muted/40 bg-card/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/60">
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24">
                <div className="relative mt-6 overflow-hidden rounded-xl border bg-gradient-to-br from-cyan-50/70 to-amber-50/60 p-5 dark:from-cyan-500/10 dark:to-amber-400/10">
                  <p className="text-foreground/90 text-sm">
                    Zentri is a workspace for notes and tasks. We collect only
                    what’s needed to provide the service, improve it, and keep
                    it secure. <strong>We never sell your data.</strong>
                  </p>
                </div>

                <Section id="overview" title="Overview">
                  <p>
                    This policy describes how Zentri handles your information
                    and the choices you have. It applies to all Zentri products
                    and services where it’s linked.
                  </p>
                </Section>

                <Section
                  id="info-we-collect"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Database className="h-5 w-5 text-cyan-600" />
                      Information we collect
                    </span>
                  }
                >
                  <FancyList
                    items={[
                      {
                        head: "Account data",
                        body: "name, email, password (hashed), and settings.",
                      },
                      {
                        head: "Content",
                        body: "notes, tasks, and attachments you upload.",
                      },
                      {
                        head: "Usage",
                        body: "app interactions, device & browser metadata, approximate location derived from IP.",
                      },
                      {
                        head: "Billing",
                        body: "if you subscribe, payments are processed by our payment provider; we store limited billing details.",
                      },
                    ]}
                  />
                </Section>

                <Section
                  id="how-we-use"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-teal-600" />
                      How we use information
                    </span>
                  }
                >
                  <SimpleList
                    items={[
                      "Provide, maintain, and improve Zentri features.",
                      "Personalize your experience and remember preferences.",
                      "Prevent abuse, detect outages, and ensure security.",
                      "Communicate about updates, security alerts, and support.",
                      "Comply with legal obligations.",
                    ]}
                  />
                </Section>

                <Section id="sharing" title="Sharing">
                  <p>
                    We share data with service providers (e.g., hosting,
                    analytics, payments) under contracts that restrict use to
                    providing services to us. We may disclose information if
                    required by law, to protect rights and safety, or in
                    connection with a merger, acquisition, or asset sale.{" "}
                    <strong>We do not sell personal information.</strong>
                  </p>
                </Section>

                <Section id="your-controls" title="Your controls">
                  <GridCards
                    items={[
                      {
                        icon: FileText,
                        title: "Access & export",
                        body: "Download your data or request a copy at any time.",
                      },
                      {
                        icon: Info,
                        title: "Correction",
                        body: "Update profile details whenever you need.",
                      },
                      {
                        icon: Trash2,
                        title: "Deletion",
                        body: "Delete content or close your account to remove data, subject to legal retention.",
                      },
                      {
                        icon: Mail,
                        title: "Preferences",
                        body: "Manage marketing emails and in-app notifications.",
                      },
                    ]}
                  />
                </Section>

                <Section id="data-retention" title="Data retention">
                  <p>
                    We retain personal data only as long as necessary for the
                    purposes described above, or as required by law. Backups and
                    logs are periodically purged on a rolling schedule.
                  </p>
                </Section>

                <Section id="security" title="Security">
                  <p>
                    We use industry-standard safeguards including encryption in
                    transit (TLS), access controls, and monitoring. No method of
                    transmission or storage is 100% secure, but we work to
                    protect your data continuously.
                  </p>
                  <div className="mt-4 rounded-lg border border-teal-500/30 bg-teal-500/5 p-3 text-sm">
                    <p className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>
                        Key practices: least-privilege access, audit logging,
                        and regular security reviews.
                      </span>
                    </p>
                  </div>
                </Section>

                <Section id="international" title="International transfers">
                  <p className="flex items-start gap-2">
                    <Globe className="mt-1 h-5 w-5 text-cyan-600" />
                    <span>
                      Your information may be processed in countries other than
                      your own. Where required, we rely on appropriate
                      safeguards for cross-border transfers.
                    </span>
                  </p>
                </Section>

                <Section id="children" title="Children">
                  <p>
                    Zentri is not intended for children under 13 (or the minimum
                    age in your jurisdiction). We do not knowingly collect data
                    from children.
                  </p>
                </Section>

                <Section
                  id="changes"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Info className="h-5 w-5 text-amber-600" />
                      Changes to this policy
                    </span>
                  }
                >
                  <p>
                    We may update this policy from time to time. We’ll post the
                    new date above and, if changes are material, provide
                    additional notice.
                  </p>
                </Section>

                <Section
                  id="contact"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-5 w-5 text-cyan-600" />
                      Contact
                    </span>
                  }
                >
                  <p>
                    Questions? Reach us at{" "}
                    <a
                      href="mailto:privacy@zentri.app"
                      className="font-medium underline decoration-cyan-500 underline-offset-2"
                    >
                      privacy@zentri.app
                    </a>
                    .
                  </p>
                </Section>

                <div className="mt-12 rounded-xl border bg-gradient-to-br from-cyan-50/60 to-amber-50/60 p-4 dark:from-cyan-500/10 dark:to-amber-400/10">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    Looking for our Terms of Service? See{" "}
                    <Link
                      href="/legal/terms"
                      className="font-medium underline decoration-teal-500 underline-offset-2"
                    >
                      terms
                    </Link>
                    .
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function Banner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "-z-10 pointer-events-none absolute inset-0 opacity-40",
          "bg-[radial-gradient(70rem_70rem_at_10%_10%,theme(colors.cyan.400/35),transparent_60%),radial-gradient(60rem_60rem_at_90%_0%,theme(colors.teal.400/25),transparent_60%),radial-gradient(60rem_60rem_at_50%_120%,theme(colors.amber.400/18),transparent_60%)]",
        )}
      />
      <div className="-z-10 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-semibold text-4xl tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 first:mt-8">
      <div className="group inline-flex scroll-mt-24 items-center gap-2">
        <h2 className="font-semibold text-xl tracking-tight">{title}</h2>
        <a
          href={`#${id}`}
          aria-label="Copy link"
          className="opacity-0 transition group-hover:opacity-100"
        >
          <span className="text-muted-foreground">#</span>
        </a>
      </div>
      <div className="mt-4 space-y-4 leading-relaxed">{children}</div>
      <Divider />
    </section>
  );
}

function Divider() {
  return (
    <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-muted to-transparent" />
  );
}

function FancyList({ items }: { items: { head: string; body: string }[] }) {
  return (
    <ul className="not-prose grid gap-3 pl-0 sm:grid-cols-2">
      {items.map((it) => (
        <li
          key={it.head}
          className="rounded-lg border border-muted/50 bg-muted/10 p-4"
        >
          <p className="text-sm">
            <strong className="font-medium">{it.head}</strong>: {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 marker:text-muted-foreground/70">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

function GridCards({
  items,
}: {
  items: { icon: LucideIcon; title: string; body: string }[];
}) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="group rounded-xl border border-muted/50 bg-gradient-to-b from-card to-card/80 p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-2 flex items-center gap-2">
            <Icon className="h-5 w-5 text-cyan-600" />
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{body}</p>
        </div>
      ))}
    </div>
  );
}
