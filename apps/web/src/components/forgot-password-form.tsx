"use client";

import { useForm } from "@tanstack/react-form";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import Loader from "./loader";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.requestPasswordReset(
        { email: value.email },
        {
          onSuccess: () => {
            toast.success("Password reset link sent. Check your email!");
            router.push("/auth/login");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Please enter a valid email address"),
      }),
    },
  });

  if (isPending) return <Loader />;

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10 lg:min-h-full">
      <Card className="w-full max-w-xl rounded-2xl border border-white/10 bg-background/60 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center font-bold text-3xl tracking-tight">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we’ll send you a reset link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <div>
              <form.Field name="email">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <div className="relative">
                      <Mail
                        aria-hidden
                        className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 opacity-60"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border-white/10 bg-black/40 pl-9 transition-all hover:border-white/15 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                        aria-invalid={field.state.meta.errors.length > 0}
                        aria-describedby={
                          field.state.meta.errors.length
                            ? "email-error"
                            : undefined
                        }
                      />
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        id="email-error"
                        className="text-red-500 text-sm"
                        role="alert"
                      >
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  disabled={!state.canSubmit || state.isSubmitting}
                  className="group relative w-full overflow-hidden rounded-md"
                >
                  <span className="-z-10 absolute inset-0 bg-accent opacity-90 transition-opacity group-hover:opacity-100" />
                  <span className="relative">
                    {state.isSubmitting
                      ? "Sending reset link…"
                      : "Send reset link"}
                  </span>
                </Button>
              )}
            </form.Subscribe>

            <p className="text-center text-muted-foreground text-sm">
              Remembered your password?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Go back to login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
