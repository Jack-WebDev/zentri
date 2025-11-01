"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema, type UserProfileSchemaType } from "@zentri/schema";
import { Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ProfileSettings() {
  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      gender: undefined,
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: UserProfileSchemaType) => {
    // TODO: replace with your server call / action
    console.log("Submitting profile:", values);
  };

  const { isSubmitting, isDirty } = form.formState;

  return (
    <main className="col-span-12 lg:col-span-7">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800"
          noValidate
        >
          <h3 className="mb-4 font-semibold text-lg text-zinc-900 dark:text-zinc-100">
            Personal Information
          </h3>

          {/* Gender */}
          <div className="mb-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="gender-male" />
                        <Label htmlFor="gender-male" className="text-sm">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="gender-female" />
                        <Label htmlFor="gender-female" className="text-sm">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* First Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first">First Name</FormLabel>
                  <FormControl>
                    <Input id="first" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last">Last Name</FormLabel>
                  <FormControl>
                    <Input id="last" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email</Label>
                <Badge variant="default">Verified</Badge>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Mail className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-zinc-400" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <div className="relative">
                    <Phone className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-zinc-400" />
                    <FormControl>
                      <Input id="phone" className="pl-10" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={() => form.reset()}
              className="hover:-translate-y-0.5 inline-flex items-center justify-center rounded-xl border border-orange-300 bg-white px-5 py-2.5 font-medium text-orange-700 text-sm shadow-sm transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-200 dark:border-orange-800 dark:bg-transparent dark:text-orange-300 dark:focus:ring-orange-900/40"
              disabled={isSubmitting || !isDirty}
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="hover:-translate-y-0.5 inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-sm text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-60 dark:focus:ring-orange-900/40"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
