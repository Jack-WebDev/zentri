"use client";

import {
  Brain,
  Calendar,
  Database,
  FileStack,
  Focus,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { NavStacks } from "@/components/nav-stacks";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavTags } from "./nav-tags";
import { NavSecondary } from "./secondary-nav";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "All Items",
      url: "#",
      icon: FileStack,
    },

    {
      title: "Today",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Brain Map",
      url: "#",
      icon: Brain,
    },
    {
      title: "Focus",
      url: "#",
      icon: Focus,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle,
    },
  ],
  navStacks: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
  ],
  navTags: [
    {
      name: "Tags",
      url: "#",
      icon: Tag,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="flex justify-center hover:bg-transparent data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <Image
                  src={"/zentri_logo_dark.png"}
                  alt={"Zentri Logo"}
                  width={80}
                  height={80}
                  className="hidden cursor-pointer rounded-xl dark:inline-flex"
                />
                <Image
                  src={"/zentri_logo.png"}
                  alt={"Zentri Logo"}
                  width={80}
                  height={80}
                  className="inline-flex cursor-pointer rounded-xl dark:hidden"
                />{" "}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavStacks items={data.navStacks} />
        <NavTags items={data.navTags} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
