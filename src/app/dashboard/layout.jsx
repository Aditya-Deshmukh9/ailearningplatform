import { AppSidebar } from "@/components/dashboard/app-sidebar";
import BreadcrumbComp from "@/components/dashboard/Breadcrumb";
import { Darkmode } from "@/components/dashboard/darkmode";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center lg:gap-2 lg:px-6 gap-1 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* Breadcrumb */}
            <BreadcrumbComp />
          </div>
          <Darkmode />
        </header>
        {children}{" "}
      </SidebarInset>
    </SidebarProvider>
  );
}
