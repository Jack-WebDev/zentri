import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={"/zentri_logo_dark.png"}
                alt={"Zentri Logo"}
                width={80}
                height={80}
                className="hidden cursor-pointer rounded-xl dark:inline-flex"
              />
              <Image
                src={"/zentri_logo.png"}
                alt={"Zentri Logo"}
                width={80}
                height={80}
                className="inline-flex cursor-pointer rounded-xl dark:hidden"
              />{" "}
            </div>
            <p className="mt-3 max-w-sm text-muted-foreground text-sm">
              A fluid workspace that merges note‑taking and task management into
              one adaptive system.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-medium">Product</div>
              <a
                className="block text-muted-foreground hover:text-foreground"
                href="#features"
              >
                Features
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground"
                href="#pricing"
              >
                Pricing
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground"
                href="#focus"
              >
                Focus Mode
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-border/60 border-t pt-6 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Zentri, Inc.</span>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
