import { AlertTriangle, CheckCircle2, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TermsBanner />
      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card className="border-muted/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>1. Agreement</h2>
            <p>
              By accessing or using Zentri (the “Service”), you agree to be
              bound by these Terms of Service (“Terms”) and our Privacy Policy.
              If you do not agree, do not use the Service.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 13 years old (or the age of digital consent
              in your jurisdiction) to use the Service.
            </p>

            <h2>3. Accounts</h2>
            <ul>
              <li>
                You are responsible for safeguarding your account and for all
                activities under it.
              </li>
              <li>Provide accurate information and keep it up to date.</li>
            </ul>

            <h2>4. Your Content</h2>
            <ul>
              <li>You retain ownership of content you create and upload.</li>
              <li>
                By using the Service, you grant us a limited license to host,
                process, and display your content as necessary to operate and
                improve the Service.
              </li>
              <li>
                You are responsible for ensuring you have the rights to the
                content you upload.
              </li>
            </ul>

            <h2>5. Acceptable Use</h2>
            <ul>
              <li>No illegal, infringing, or harmful activities.</li>
              <li>
                No abuse, malware, automated scraping, or interference with the
                Service.
              </li>
              <li>Respect others’ rights and privacy.</li>
            </ul>

            <h2>6. Subscriptions & Billing</h2>
            <ul>
              <li>
                Some features require a paid subscription. Prices and features
                are described on our Pricing page.
              </li>
              <li>
                Fees are billed in advance on a recurring basis unless canceled.
                Taxes may apply.
              </li>
              <li>
                Unless required by law, payments are non‑refundable except as
                stated during a trial or promotion.
              </li>
            </ul>

            <h2>7. Third‑Party Services</h2>
            <p>
              Integrations and links may be provided for convenience. We do not
              control third‑party services and are not responsible for their
              content or practices.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The Service, including software, design, and trademarks, is owned
              by Zentri or its licensors and protected by law. These Terms do
              not grant you any rights to our trademarks or logos.
            </p>

            <h2>9. Termination</h2>
            <p>
              We may suspend or terminate access for any violation of these
              Terms or to protect the Service and its users. You may stop using
              the Service at any time. Upon termination, certain provisions
              survive (including ownership, disclaimers, limitations of
              liability, and governing law).
            </p>

            <h2>10. Disclaimers</h2>
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-1 h-5 w-5 text-amber-600" />
              <p className="m-0">
                The Service is provided “as is” without warranties of any kind,
                express or implied. We do not warrant that the Service will be
                uninterrupted, secure, or error‑free.
              </p>
            </div>

            <h2>11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Zentri and its suppliers
              are not liable for indirect, incidental, special, consequential,
              or punitive damages, or any loss of profits, data, or goodwill.
            </p>

            <h2>12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Zentri and its
              affiliates from claims arising out of your use of the Service or
              violation of these Terms.
            </p>

            <h2>13. Governing Law; Disputes</h2>
            <div className="flex items-start gap-2">
              <Scale className="mt-1 h-5 w-5 text-teal-600" />
              <p className="m-0">
                These Terms are governed by the laws applicable in your primary
                business entity’s country or, if none, the laws of the
                jurisdiction where Zentri is organized, without regard to
                conflicts of law. Venue and jurisdiction will lie in the
                competent courts of that venue.
              </p>
            </div>

            <h2>14. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will post the new
              date above and, if changes are material, provide additional
              notice. Continued use after changes constitutes acceptance of the
              new Terms.
            </p>

            <h2>15. Contact</h2>
            <p>
              Questions about these Terms? Contact{" "}
              <a
                href="mailto:legal@zentri.app"
                className="underline decoration-2 decoration-cyan-500"
              >
                legal@zentri.app
              </a>
              .
            </p>

            <div className="mt-10 rounded-xl border bg-gradient-to-br from-cyan-50/60 to-amber-50/60 p-4 dark:from-cyan-500/10 dark:to-amber-400/10">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                By using Zentri you also agree to our{" "}
                <a
                  href="/privacy"
                  className="underline decoration-2 decoration-teal-500"
                >
                  Privacy Policy
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

function TermsBanner() {
  return (
    <div className="relative overflow-hidden">
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(60rem_60rem_at_15%_20%,theme(colors.cyan.400/40),transparent_60%),radial-gradient(50rem_50rem_at_85%_15%,theme(colors.teal.400/30),transparent_60%),radial-gradient(50rem_50rem_at_55%_120%,theme(colors.amber.400/20),transparent_60%)] opacity-30" />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-semibold text-4xl tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Please read these terms carefully before using Zentri.
        </p>
      </div>
    </div>
  );
}
