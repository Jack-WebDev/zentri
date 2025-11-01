import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import HomePage from "./home/page";
import LandingPage from "./landing/page";

export default async function Home() {
  const h = await headers();
  const session = await authClient.getSession({
    fetchOptions: {
      headers: { cookie: h.get("cookie") ?? "" },
      cache: "no-store",
    },
  });
  const isAuthed = !!session.data?.user;

  return isAuthed ? (
    <main className="p-6">
      <HomePage />
    </main>
  ) : (
    <div className="relative min-h-screen text-foreground">
      <main>
        <LandingPage />
      </main>
    </div>
  );
}
