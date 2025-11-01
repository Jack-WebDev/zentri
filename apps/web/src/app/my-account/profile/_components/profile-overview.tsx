"use client";

import { KeyRound, ShieldCheck, User } from "lucide-react";
import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import LoginAndPasswordSettings from "./login-and-password-settings";
import ProfileSettings from "./profile-settings";

export default function ProfileOverview() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <Loader />;
  if (!session) return null;

  const user = session.user;

  return (
    // ONE Tabs wraps BOTH columns
    <Tabs defaultValue="personal" orientation="vertical" className="w-full">
      <div className="flex gap-8">
        {/* Left column: avatar, name, and tabs */}
        <div className="flex w-72 flex-col items-center space-y-6">
          <div className="relative">
            <Avatar className="h-28 w-28 rounded-xl grayscale">
              <AvatarImage
                src={user.image as string}
                alt={user.name ?? "User"}
              />
              <AvatarFallback className="rounded-xl font-semibold text-lg">
                {(user.name?.[0] ?? "?").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button className="absolute right-1 bottom-1 grid h-8 w-8 place-items-center rounded-xl bg-orange-500 text-white shadow">
              <ShieldCheck className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center">
            <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
              {user.name}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Cashier</p>
          </div>

          {/* TabsList + Triggers live inside the SAME Tabs */}
          <TabsList className="flex w-full flex-col space-y-2 bg-transparent">
            <TabsTrigger
              value="personal"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-zinc-600 hover:bg-zinc-50 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 data-[state=active]:ring-1 data-[state=active]:ring-orange-200 dark:text-zinc-300 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-200 dark:data-[state=active]:ring-orange-700/40 dark:hover:bg-zinc-900"
            >
              <User className="h-4 w-4" /> Personal Information
            </TabsTrigger>

            <TabsTrigger
              value="login"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-zinc-600 hover:bg-zinc-50 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 data-[state=active]:ring-1 data-[state=active]:ring-orange-200 dark:text-zinc-300 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-200 dark:data-[state=active]:ring-orange-700/40 dark:hover:bg-zinc-900"
            >
              <KeyRound className="h-4 w-4" /> Login & Password
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Right column: tab content (NO extra Tabs here) */}
        <div className="flex-1">
          <TabsContent value="personal">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="login">
            <LoginAndPasswordSettings />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
