"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type * as React from "react";
import AMSLOGO from "/assets/images/school-r.png";
import { LayoutSidebarFoot } from "./layout-sidebar-foot";
import { LayoutSidebarNav } from "./layout-sidebar-nav";
import hamburger from "/assets/icons/hamburger.svg";
import { getMenu } from "@/lib/get-menu";
import { useState } from "react";

export const LayoutSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { open, setOpen } = useSidebar();
  const [menuAccessItems, setMenuAccessItems] = useState<any[]>([]);

  return (
    <Sidebar className="absolute bg-[#0B1A33]" collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-white/10">
        <SidebarMenu className="px-3 py-4">
          <SidebarMenuItem
            className={cn(
              "flex items-center w-full",
              open ? "justify-between" : "justify-center"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <img
                  src={AMSLOGO}
                  alt="logo"
                  className="w-6 h-6 object-contain"
                />
              </div>

              <div className={cn("flex flex-col", !open && "hidden")}>
                <span className="text-white font-semibold text-sm">
                  SD Warakas
                </span>
                <span className="text-white/60 text-xs">
                  E-Learning
                </span>
              </div>
            </div>

            <button onClick={() => setOpen(!open)}>
              <img
                src={hamburger}
                alt="hamburger"
                className="invert brightness-0 w-5 h-5"
              />
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-4" onClick={() => setOpen(true)}>
        <LayoutSidebarNav items={getMenu(menuAccessItems).navMain} />
      </SidebarContent>

      <SidebarFooter
        style={{
          marginBottom: "var(--navbar-height, 55px)",
        }}
      >
        <LayoutSidebarFoot items={getMenu(menuAccessItems).info} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};