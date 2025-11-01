import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../index.css";
import { headers } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Zentri",
  description:
    "Zentri – A modern productivity app combining tasks, subtasks, and notes into one seamless workspace.",
  icons: { icon: "/zentri_favicon.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const res = await authClient.getSession({
    fetchOptions: {
      headers: { cookie: h.get("cookie") ?? "" },
      cache: "no-store",
    },
  });
  const isAuthed = !!res.data?.user;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} antialiased`}>
        <Providers>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            {isAuthed ? <AppSidebar variant="inset" /> : null}

            <SidebarInset>
              {isAuthed ? <SiteHeader /> : null}
              <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
