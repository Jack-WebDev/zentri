import { Database, FileText, Info, Mail, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Banner
        title="Privacy Policy"
        subtitle="We respect your privacy. This policy explains what we collect, why we collect it, and how you can control your information."
      />

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card className="border-muted/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20">
            <h2 id="overview" className="mt-8">
              Overview
            </h2>
            <p>
              Zentri is a workspace for notes and tasks. We collect only what we
              need to provide the service, improve it, and keep it secure. We do
              not sell your data.
            </p>

            <h2 id="info-we-collect" className="mt-8 flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-600" /> Information we
              collect
            </h2>
            <ul>
              <li>
                <strong>Account data</strong>: name, email, password (hashed),
                and settings.
              </li>
              <li>
                <strong>Content</strong>: notes, tasks, attachments you upload.
              </li>
              <li>
                <strong>Usage</strong>: app interactions, device & browser
                metadata, approximate location derived from IP.
              </li>
              <li>
                <strong>Billing</strong>: if you subscribe, we process payments
                via our payment provider and store limited billing details.
              </li>
            </ul>

            <h2 id="how-we-use" className="mt-8 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-teal-600" /> How we use
              information
            </h2>
            <ul>
              <li>Provide, maintain, and improve Zentri features.</li>
              <li>Personalize your experience and remember preferences.</li>
              <li>Prevent abuse, detect outages, and ensure security.</li>
              <li>Communicate about updates, security alerts, and support.</li>
              <li>Comply with legal obligations.</li>
            </ul>

            <h2 id="sharing" className="mt-8">
              Sharing
            </h2>
            <p>
              We share data with service providers (e.g., hosting, analytics,
              payments) under contracts that limit their use to providing
              services to us. We may disclose information if required by law, to
              protect rights and safety, or in connection with a merger,
              acquisition, or asset sale. We do not sell personal information.
            </p>

            <h2 id="your-controls" className="mt-8">
              Your controls
            </h2>
            <ul>
              <li>
                <strong>Access & export</strong>: download your data or request
                a copy.
              </li>
              <li>
                <strong>Correction</strong>: update profile details at any time.
              </li>
              <li>
                <strong>Deletion</strong>: delete content or close your account
                to remove data, subject to legal retention.
              </li>
              <li>
                <strong>Preferences</strong>: manage marketing emails and in‑app
                notifications.
              </li>
            </ul>

            <h2 id="data-retention" className="mt-8">
              Data retention
            </h2>
            <p>
              We retain personal data only as long as necessary for the purposes
              described above, or as required by law. Backups and logs are
              periodically purged on a rolling schedule.
            </p>

            <h2 id="security" className="mt-8">
              Security
            </h2>
            <p>
              We use industry‑standard safeguards including encryption in
              transit (TLS), access controls, and monitoring. No method of
              transmission or storage is 100% secure, but we work to protect
              your data continuously.
            </p>

            <h2 id="international" className="mt-8">
              International transfers
            </h2>
            <p>
              Your information may be processed in countries other than your
              own. Where required, we rely on appropriate safeguards for
              cross‑border transfers.
            </p>

            <h2 id="children" className="mt-8">
              Children
            </h2>
            <p>
              Zentri is not intended for children under 13 (or the minimum age
              in your jurisdiction). We do not knowingly collect data from
              children.
            </p>

            <h2 id="changes" className="mt-8 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-600" /> Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. We will post the new
              date above and, if changes are material, provide additional
              notice.
            </p>

            <h2 id="contact" className="mt-8 flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-600" /> Contact
            </h2>
            <p>
              Questions? Reach us at{" "}
              <a
                href="mailto:privacy@zentri.app"
                className="underline decoration-2 decoration-cyan-500"
              >
                privacy@zentri.app
              </a>
              .
            </p>

            <div className="mt-10 rounded-xl border bg-gradient-to-br from-cyan-50/60 to-amber-50/60 p-4 dark:from-cyan-500/10 dark:to-amber-400/10">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" />
                Looking for our Terms of Service? See{" "}
                <a
                  href="/terms"
                  className="underline decoration-2 decoration-teal-500"
                >
                  /terms
                </a>
                .
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Banner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "-z-10 absolute inset-0 opacity-30",
          "bg-[radial-gradient(60rem_60rem_at_10%_20%,theme(colors.cyan.400/40),transparent_60%),radial-gradient(50rem_50rem_at_90%_10%,theme(colors.teal.400/30),transparent_60%),radial-gradient(50rem_50rem_at_50%_120%,theme(colors.amber.400/20),transparent_60%)]",
        )}
      />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-semibold text-4xl tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
