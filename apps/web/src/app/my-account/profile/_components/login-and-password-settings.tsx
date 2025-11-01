"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginAndPasswordSettings() {
  const [cur, setCur] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [score, _setScore] = useState(0);
  const [saveDisabled, _setSaveDisabled] = useState(true);

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:bg-zinc-950/70 dark:ring-white/10">
      <div className="space-y-6">
        {/* Email/Login */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange-500" />
              <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                Login Email
              </h2>
            </div>
            <Badge>
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified
            </Badge>
          </div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-zinc-400" />
            <Input id="email" className="pl-10" type="email" />
          </div>
          <span>
            This email is used to sign in and receive security alerts.
          </span>
          <div className="mt-4 flex justify-end">
            <Button className="hover:-translate-y-0.5 rounded-xl border border-orange-300 px-4 py-2 font-medium text-orange-700 text-sm transition hover:shadow dark:border-orange-800 dark:text-orange-300">
              Update Email
            </Button>
          </div>
        </section>

        {/* Password change */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
          <div className="mb-4 flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
              Change Password
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="current">Current Password</Label>
              <div className="relative">
                <Lock className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="current"
                  type={showCur ? "text" : "password"}
                  className="pr-10 pl-10"
                  value={cur}
                  onChange={(e) => setCur(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => setShowCur((v) => !v)}
                  className="-translate-y-1/2 absolute top-1/2 right-2 rounded-md p-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label="Toggle password visibility"
                >
                  {showCur ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="new">New Password</Label>
              <div className="relative">
                <KeyRound className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="new"
                  type={showNew ? "text" : "password"}
                  className="pr-10 pl-10"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="-translate-y-1/2 absolute top-1/2 right-2 rounded-md p-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label="Toggle password visibility"
                >
                  {showNew ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <span>
                Use at least 12 characters, with a mix of letters, numbers, and
                symbols.
              </span>

              {/* Strength meter */}
              <div className="mt-3 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-full rounded-full ${
                      score > i
                        ? "bg-orange-500"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <div className="relative">
                <KeyRound className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  className="pr-10 pl-10"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="-translate-y-1/2 absolute top-1/2 right-2 rounded-md p-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label="Toggle password visibility"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              className="hover:-translate-y-0.5 inline-flex items-center justify-center rounded-xl border border-orange-300 bg-white px-5 py-2.5 font-medium text-orange-700 text-sm shadow-sm transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-60 dark:border-orange-800 dark:bg-transparent dark:text-orange-300 dark:focus:ring-orange-900/40"
              disabled={!cur && !pwd && !confirm}
            >
              Reset
            </Button>
            <Button
              disabled={saveDisabled}
              className="hover:-translate-y-0.5 inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-sm text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-60 dark:focus:ring-orange-900/40"
            >
              Save Password
            </Button>
          </div>
        </section>

        {/* 2FA */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
              Two‑Factor Authentication
            </h2>
          </div>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
            Add an extra layer of security with a code from your authenticator
            app or SMS.
          </p>
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-zinc-500" />
              <div>
                <p className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                  Authenticator App
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Time‑based one‑time codes
                </p>
              </div>
            </div>
            <Button
              onClick={() => setTwoFA((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${
                twoFA ? "bg-orange-500" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
              aria-label="Toggle 2FA"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  twoFA ? "left-6" : "left-0.5"
                }`}
              />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
