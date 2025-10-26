"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Lock, Mail, User as UserIcon } from "lucide-react";
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

export default function SignUpForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Account created. Welcome!");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) return <Loader />;

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10 lg:min-h-full">
      <Card className="w-full max-w-xl rounded-2xl border border-white/10 bg-background/60 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center font-bold text-3xl tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Start your journey in seconds
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
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Name</Label>
                    <div className="relative">
                      <UserIcon
                        aria-hidden
                        className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 opacity-60"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Jane Doe"
                        className="border-white/10 bg-black/40 pl-9 transition-all hover:border-white/15 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                        autoComplete="name"
                        aria-invalid={field.state.meta.errors.length > 0}
                        aria-describedby={
                          field.state.meta.errors.length
                            ? "name-error"
                            : undefined
                        }
                      />
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        id="name-error"
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
                        className="border-white/10 bg-black/40 pl-9 transition-all hover:border-white/15 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
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
                        className="border-white/10 bg-black/40 pr-10 pl-9 transition-all hover:border-white/15 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                        autoComplete="new-password"
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
                      ? "Creating account…"
                      : "Create account"}
                  </span>
                </Button>
              )}
            </form.Subscribe>

            <Separator />

            <div className="text-center text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href={"/auth/login"} className="px-1">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
