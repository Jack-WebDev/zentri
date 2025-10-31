import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/">All</Link>
            </li>
            <li>
              <Link href="/">Notes</Link>
            </li>
            <li>
              <Link href="/">Tasks</Link>
            </li>
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="default" className="hidden sm:flex">
            <PlusCircle className="h-4 w-4" />
            New Item
          </Button>
        </div>
      </div>
    </header>
  );
}
