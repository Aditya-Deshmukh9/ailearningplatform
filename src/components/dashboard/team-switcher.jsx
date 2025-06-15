"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";

export function TeamSwitcher({ teams }) {
  const [activeTeam, setActiveTeam] = useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem className={"flex items-center gap-2 my-2"}>
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <activeTeam.logo className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{teams[0].name}</span>
          <span className="truncate text-xs">{teams[0].plan}</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
