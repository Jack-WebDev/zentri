import { AlertTriangle, CheckCircle2, Scale } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TermsBanner
        title="Terms of Service"
        subtitle="Please read these terms carefully before using Zentri."
      />

      <main className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-24 rounded-xl border border-muted/40 bg-card/70 p-4 text-sm backdrop-blur supports-[backdrop-filter]:bg-card/50"
            >
              <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                On this page
              </p>
              <ul className="space-y-2">
                {[
                  ["agreement", "Agreement"],
                  ["eligibility", "Eligibility"],
                  ["accounts", "Accounts"],
                  ["your-content", "Your Content"],
                  ["acceptable-use", "Acceptable Use"],
                  ["billing", "Subscriptions & Billing"],
                  ["third-party", "Third-Party Services"],
                  ["ip", "Intellectual Property"],
                  ["termination", "Termination"],
                  ["disclaimers", "Disclaimers"],
                  ["liability", "Limitation of Liability"],
                  ["indemnification", "Indemnification"],
                  ["law-disputes", "Governing Law; Disputes"],
                  ["changes", "Changes to Terms"],
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
                <IntroCallout />

                <Section id="agreement" title="1. Agreement">
                  <p>
                    By accessing or using Zentri (the “Service”), you agree to
                    be bound by these Terms of Service (“Terms”) and our Privacy
                    Policy. If you do not agree, do not use the Service.
                  </p>
                </Section>

                <Section id="eligibility" title="2. Eligibility">
                  <p>
                    You must be at least 13 years old (or the age of digital
                    consent in your jurisdiction) to use the Service.
                  </p>
                </Section>

                <Section id="accounts" title="3. Accounts">
                  <SimpleList
                    items={[
                      "You are responsible for safeguarding your account and for all activities under it.",
                      "Provide accurate information and keep it up to date.",
                    ]}
                  />
                </Section>

                <Section id="your-content" title="4. Your Content">
                  <SimpleList
                    items={[
                      "You retain ownership of content you create and upload.",
                      "By using the Service, you grant us a limited license to host, process, and display your content as necessary to operate and improve the Service.",
                      "You are responsible for ensuring you have the rights to the content you upload.",
                    ]}
                  />
                </Section>

                <Section id="acceptable-use" title="5. Acceptable Use">
                  <SimpleList
                    items={[
                      "No illegal, infringing, or harmful activities.",
                      "No abuse, malware, automated scraping, or interference with the Service.",
                      "Respect others’ rights and privacy.",
                    ]}
                  />
                </Section>

                <Section id="billing" title="6. Subscriptions & Billing">
                  <SimpleList
                    items={[
                      "Some features require a paid subscription. Prices and features are described on our Pricing page.",
                      "Fees are billed in advance on a recurring basis unless canceled. Taxes may apply.",
                      "Unless required by law, payments are non-refundable except as stated during a trial or promotion.",
                    ]}
                  />
                </Section>

                <Section id="third-party" title="7. Third-Party Services">
                  <p>
                    Integrations and links may be provided for convenience. We
                    do not control third-party services and are not responsible
                    for their content or practices.
                  </p>
                </Section>

                <Section id="ip" title="8. Intellectual Property">
                  <p>
                    The Service, including software, design, and trademarks, is
                    owned by Zentri or its licensors and protected by law. These
                    Terms do not grant you any rights to our trademarks or
                    logos.
                  </p>
                </Section>

                <Section id="termination" title="9. Termination">
                  <p>
                    We may suspend or terminate access for any violation of
                    these Terms or to protect the Service and its users. You may
                    stop using the Service at any time. Upon termination,
                    certain provisions survive (including ownership,
                    disclaimers, limitations of liability, and governing law).
                  </p>
                </Section>

                <Section
                  id="disclaimers"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      10. Disclaimers
                    </span>
                  }
                >
                  <IntroCallout tone="amber">
                    The Service is provided “as is” without warranties of any
                    kind, express or implied. We do not warrant that the Service
                    will be uninterrupted, secure, or error-free.
                  </IntroCallout>
                </Section>

                <Section id="liability" title="11. Limitation of Liability">
                  <p>
                    To the maximum extent permitted by law, Zentri and its
                    suppliers are not liable for indirect, incidental, special,
                    consequential, or punitive damages, or any loss of profits,
                    data, or goodwill.
                  </p>
                </Section>

                <Section id="indemnification" title="12. Indemnification">
                  <p>
                    You agree to defend, indemnify, and hold harmless Zentri and
                    its affiliates from claims arising out of your use of the
                    Service or violation of these Terms.
                  </p>
                </Section>

                <Section
                  id="law-disputes"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Scale className="h-5 w-5 text-teal-600" />
                      13. Governing Law; Disputes
                    </span>
                  }
                >
                  <p className="m-0">
                    These Terms are governed by the laws applicable in your
                    primary business entity’s country or, if none, the laws of
                    the jurisdiction where Zentri is organized, without regard
                    to conflicts of law. Venue and jurisdiction will lie in the
                    competent courts of that venue.
                  </p>
                </Section>

                <Section id="changes" title="14. Changes to Terms">
                  <p>
                    We may update these Terms from time to time. We’ll post the
                    new date above and, if changes are material, provide
                    additional notice. Continued use after changes constitutes
                    acceptance of the new Terms.
                  </p>
                </Section>

                <Section id="contact" title="15. Contact">
                  <p>
                    Questions about these Terms? Contact{" "}
                    <a
                      href="mailto:legal@zentri.app"
                      className="font-medium underline decoration-cyan-500 underline-offset-2"
                    >
                      legal@zentri.app
                    </a>
                    .
                  </p>
                </Section>

                <div className="mt-12 rounded-xl border bg-gradient-to-br from-cyan-50/60 to-amber-50/60 p-4 dark:from-cyan-500/10 dark:to-amber-400/10">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    By using Zentri you also agree to our{" "}
                    <Link
                      href="/legal/privacy"
                      className="font-medium underline decoration-teal-500 underline-offset-2"
                    >
                      Privacy Policy
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

function TermsBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "-z-10 pointer-events-none absolute inset-0 opacity-40",
          "bg-[radial-gradient(70rem_70rem_at_12%_12%,theme(colors.cyan.400/35),transparent_60%),radial-gradient(60rem_60rem_at_88%_8%,theme(colors.teal.400/25),transparent_60%),radial-gradient(60rem_60rem_at_50%_120%,theme(colors.amber.400/18),transparent_60%)]",
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

function IntroCallout({
  tone = "gradient",
  children,
}: {
  tone?: "gradient" | "neutral" | "amber" | "teal" | "cyan";
  children?: React.ReactNode;
}) {
  const toneMap: Record<string, string> = {
    gradient:
      "bg-gradient-to-br from-cyan-50/70 to-amber-50/60 dark:from-cyan-500/10 dark:to-amber-400/10",
    neutral: "border-muted/50 bg-muted/10",
    amber: "border-amber-500/30 bg-amber-500/5",
    teal: "border-teal-500/30 bg-teal-500/5",
    cyan: "border-cyan-500/30 bg-cyan-500/5",
  };

  return (
    <div
      className={`relative mt-6 overflow-hidden rounded-xl border p-5 text-sm ${
        toneMap[tone] ?? toneMap.gradient
      }
      `}
    >
      <p className="text-foreground/90">
        {children ?? (
          <>
            These Terms form a contract between you and Zentri. They explain
            your rights and responsibilities when using the Service. For how we
            handle data, see the{" "}
            <Link
              href="/legal/privacy"
              className="font-medium underline decoration-teal-500 underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </>
        )}
      </p>
    </div>
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
