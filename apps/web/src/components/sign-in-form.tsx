"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
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
import { Separator } from "./ui/separator";

export default function SignInForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Signed in. Welcome back!");
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
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="relative mx-auto grid min-h-[100vh] w-full place-items-center overflow-hidden px-4 py-10 lg:min-h-full">
      <Card className="w-full max-w-xl border border-border/60 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center font-bold text-3xl tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
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
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-9"
                        autoComplete="email"
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

            <div>
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <div className="relative">
                      <Lock
                        aria-hidden
                        className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 opacity-60"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                        className="pr-10 pl-9"
                        autoComplete="current-password"
                        aria-invalid={field.state.meta.errors.length > 0}
                        aria-describedby={
                          field.state.meta.errors.length
                            ? "password-error"
                            : undefined
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="-translate-y-1/2 absolute top-1/2 right-2 rounded-md p-2 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 opacity-70" />
                        ) : (
                          <Eye className="h-4 w-4 opacity-70" />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        id="password-error"
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

            <div className="flex items-center justify-between">
              <div className="text-muted-foreground text-sm">
                <span>Forgot your password?</span>{" "}
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Reset it
                </Link>
              </div>
            </div>

            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  disabled={!state.canSubmit || state.isSubmitting}
                  className="group relative w-full overflow-hidden"
                >
                  <span className="-z-10 absolute inset-0 bg-accent opacity-90 transition-opacity group-hover:opacity-100" />
                  <span className="relative">
                    {state.isSubmitting ? "Signing you in…" : "Sign in"}
                  </span>
                </Button>
              )}
            </form.Subscribe>

            <Separator className="my-2" />

            <div className="text-center text-muted-foreground text-sm">
              Need an account?{" "}
              <Link
                href="/auth/register"
                className="px-1 font-medium text-primary underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
