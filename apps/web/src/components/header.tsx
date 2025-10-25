"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#graph", label: "Brain Map" },
  { href: "#focus", label: "Focus" },
  { href: "#pricing", label: "Pricing" },
] as const;

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-slate-900/10 border-b bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-white/10 dark:bg-slate-950/60">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <Image
              src={"/zentri_logo_dark.png"}
              alt={"Zentri Logo"}
              width={80}
              height={80}
              onClick={() => router.push("/")}
              className="hidden cursor-pointer rounded-xl dark:inline-flex"
            />
            <Image
              src={"/zentri_logo.png"}
              alt={"Zentri Logo"}
              width={80}
              height={80}
              onClick={() => router.push("/")}
              className="inline-flex cursor-pointer rounded-xl dark:hidden"
            />
          </button>

          <div className="hidden items-center gap-6 text-sm md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle />
            <UserMenu />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <UserMenu />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          <div
            className={`absolute top-full right-0 left-0 mx-auto w-full max-w-7xl px-4 transition-all duration-300 ease-out md:hidden ${
              open
                ? "pointer-events-auto translate-y-20"
                : "-translate-y-400 pointer-events-none"
            }`}
          >
            <div className="mt-2 space-y-1 rounded-lg border border-slate-900/10 bg-white p-2 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`block rounded-md px-4 py-3 font-medium text-slate-700 text-sm transition-all hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-200 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300 ${
                    open ? "animate-slideIn" : ""
                  }`}
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: "both",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}

              <div className="mt-3 flex flex-col gap-2 px-2">
                <Button
                  className="w-full bg-emerald-500 text-white hover:bg-emerald-400 dark:text-slate-900"
                  onClick={() => setOpen(false)}
                >
                  Get started
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to avoid content underlap */}
      <div aria-hidden className="h-16 sm:h-16" />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
